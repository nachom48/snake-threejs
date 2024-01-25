import { Component, ReactNode } from "react";

export default class Panel extends Component
{
  public render(): ReactNode 
  {
    return (
      <div id="panel">
        <h3 className="title">Creditos</h3>
        <div className="text">
          <p>Proyecto creado por Luis Enrique</p>
          <p>basado en https://github.com/BabylonJs/SpacePirates pero realizado en three js</p>
          <p>hecho con fines educativos</p>
        </div>
        <img src="/ui/textPanel.png" alt="" />
      </div>
    )  
  }
}