import { Clock } from "three";
import { SceneManager } from "../scene.manager";
import { LifeCycle } from "../types/helpers";
import { Food } from "./food";
import { Snake } from "./snake";
import { Ground } from "./ground";
import { State } from "../states/state";
import { States } from "../states/states";
import { GUIManager } from "../gui.manager";
import { VictoryState } from "../states/victory.state";

export default class Game implements LifeCycle {

    private snake: Snake
    private food: Food
    public stop: boolean = false;
    private clock: Clock = new Clock()
    private ground: Ground
    private score: number = 0


    public start(): void {
        GUIManager.showHtml('score')
        GUIManager.score.innerHTML = `score: ${this.score}`
        this.score = 0;
        this.stop = false
        this.snake = new Snake();
        this.food = new Food();
        this.ground = new Ground()

        SceneManager.camera.position.set(0, 26, -8);
        SceneManager.camera.lookAt(0, 0, 0);
        this.update();

    }

    public update(): void {
        if (this.stop) return
        requestAnimationFrame(this.update.bind(this))
        const delta = this.clock.getDelta()
        this.checkDefeat();
        this.handleFood();
        this.checkVictory();
        //antes de actualizar snake vemos si perdimos
        this.snake.update(delta)
    }

    public dispose(): void {
        this.stop = true;
        this.snake.dispose();
        this.food.dispose();
        this.ground.dispose();
        GUIManager.hideHtml('score')

    }

    public checkDefeat(): void {
        //si snake en el eje x se pasa del tamaño del suelo dividido por 2 porque el suelo tiene
        //un tamaño de 15 hace 7.5 para cada lado 
        for(const tail of this.snake.tail){
            if(tail.position.x === this.snake.x && tail.position.z === this.snake.z) this.defeat();
        }
        if (this.snake.x >= Ground.size / 2) this.defeat();
        if (this.snake.x <= -Ground.size / 2) this.defeat();
        if (this.snake.z >= Ground.size / 2) this.defeat();
        if (this.snake.z <= -Ground.size / 2) this.defeat();

    }

    public defeat(): void {
        this.stop = true;
        State.setCurrent(States.defeat)
    }

    private handleFood():void{
        //comparar condiciones de la comida y la snake
        if((this.snake.x === this.food.x) && (this.snake.z === this.food.z)){
            //ahi se la come
            this.score +=1;
            GUIManager.score.innerHTML = `score: ${this.score}`
            //para q reaparezca la comida
            this.food.respawn(this.snake.head,this.snake.tail);
            //para qa crezca la serpeitne
            this.snake.grow()
        }
    }

    private checkVictory ():void{
        if(this.score > 5){
            this.stop=true;
            State.setCurrent(States.victory)
        }
    }
}