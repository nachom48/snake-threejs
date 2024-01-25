import { GUIManager } from '../gui.manager'
import { GameState } from './game.state'
import { MenuState } from './menu.state'
import { State } from './state'

export class VictoryState extends State
{
  public enter(): void 
  {
    GUIManager.showHtml('victory','flex')

  }

  public exit(): void 
  {
   GUIManager.hideHtml('victory')
   //para q elimine los elementos el game
   GameState.game.dispose();
   //para q muestre el menu
   MenuState.diorama.start();
  }
}