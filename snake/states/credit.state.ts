import { GUIManager } from '../gui.manager'
import { State } from './state'

export class CreditState extends State
{
  public enter(): void 
  {
    GUIManager.creditButtons()
    GUIManager.showHtml('panel')
  }

  public exit(): void 
  {
    GUIManager.clearButtons()
    GUIManager.hideHtml('panel')
  }
}