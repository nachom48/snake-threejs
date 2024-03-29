import { Component, ReactNode } from "react";
import { State } from "../states/state";
import { States } from "../states/states";

export default class DefeatScreen extends Component
{
  public render(): ReactNode 
  {
    return (
      <div id="defeat">
        <h3 className="defeat_title">Perdiste</h3>
        <button onClick={()=>State.setCurrent(States.menu)} className='button'>MENU</button>
      </div>
    )  
  }
}