import Game from '../shared/game'
import { MenuState } from './menu.state'
import { State } from './state'

export class GameState extends State
{
  public static game: Game

  public enter(): void 
  {
    //cunado entro al juego
    MenuState.diorama.dispose();
    GameState.game.start();
  }

  public exit(): void 
  {
  }
}