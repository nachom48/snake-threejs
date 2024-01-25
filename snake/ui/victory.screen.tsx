import { Component, ReactNode } from "react";
import { State } from "../states/state";
import { States } from "../states/states";

export default class VictoryScreen extends Component
{
  public render(): ReactNode 
  {
    return (
      <div id="victory">
        <h3 className="victory_title">Ganaste</h3>
        <button onClick={()=>State.setCurrent(States.menu)} className='button'>MENU</button>
      </div>
    )  
  }
}