import { Snake } from '../shared/snake'
import { Directions } from '../types/helpers'

export class InputManager
{
  public input: Directions = Directions.right

  constructor()
  {
    this.handleKey = this.handleKey.bind(this)
    document.addEventListener('keydown', this.handleKey)
  }

  private handleKey(e: KeyboardEvent): void
  {
    switch (e.key) 
    {
      case 'w':
        if (Snake.direction !== Directions.down) this.input = Directions.up
        break
      case 's':
        if (Snake.direction !== Directions.up) this.input = Directions.down
        break
      case 'a':
        if (Snake.direction !== Directions.right) this.input = Directions.left
        break
      case 'd':
        if (Snake.direction !== Directions.left) this.input = Directions.right
        break
    }
  }

  public dispose(): void
  {
    document.removeEventListener('keydown', this.handleKey)
  }
}