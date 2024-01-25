import { BoxGeometry, Color, Mesh, MeshStandardMaterial } from 'three'
import { LifeCycle } from '../types/helpers'
import { SceneManager } from '../scene.manager'
import { Ground } from './ground'

export class Food implements LifeCycle
{
  private mesh: Mesh
  private geometry: BoxGeometry
  private material: MeshStandardMaterial
  public x: number = 4
  public z: number = 4

  constructor()
  {
    this.start()
  }

  public start(): void
  {
    this.geometry = new BoxGeometry(1,1,1)
    this.material = new MeshStandardMaterial({
      color: new Color(0,1,0),
      emissive: new Color(0,1,0),
      metalness: 0.5,
      roughness: 0.55,
    })
    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.position.set(this.x, 0, this.z)
    SceneManager.scene.add(this.mesh)
  }

  public update(): void
  {
    
  }

  public dispose(): void
  {
        //limpiamos la geometria el material y el mesh
        this.geometry.dispose();
        this.material.dispose();
        //aca eliminamos el mesh
        SceneManager.scene.remove(this.mesh)
  }

  public respawn(mesh:Mesh,tail:Array<Mesh>):void{
    this.x = Math.round(Math.random()* Ground.size - Ground.size/2)
    this.z = Math.round(Math.random()* Ground.size - Ground.size/2)
    this.mesh.position.set(this.x,0,this.z);
    if(mesh.position.x === this.x && this.mesh.position.z === this.z) this.respawn(mesh,tail)
 
    for (const t of tail) {
      //aca reviso sie l cuerpo esta en la posicion de la fruta nueva
      if(t.position.x === this.x && t.position.z === this.z) this.respawn(mesh,tail)
    }

  }
}