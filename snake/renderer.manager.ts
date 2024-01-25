import { Vector2, WebGLRenderer } from 'three'
import { SceneManager } from './scene.manager'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { GUIManager } from './gui.manager'

export class RendererManager
{
  private static renderer: WebGLRenderer
  public static canvas: HTMLCanvasElement
  private static composer: EffectComposer

  private constructor()
  {
    SceneManager.init()
    RendererManager.init()
    GUIManager.createScore()
    window.addEventListener('resize', RendererManager.resize)
    RendererManager.renderLoop()
  }

  private static init(): void
  {
    RendererManager.getCanvas()
    RendererManager.createRenderer()
    RendererManager.postProcessing()
  }

  private static renderLoop(): void
  {
    requestAnimationFrame(RendererManager.renderLoop)
    RendererManager.renderer.render(SceneManager.scene, SceneManager.camera)
    RendererManager.composer.render()
  }

  private static getCanvas(): void
  {
    RendererManager.canvas = document.getElementById('game') as HTMLCanvasElement
  }

  private static createRenderer(): void
  {
    RendererManager.renderer = new WebGLRenderer({ antialias: true, canvas: RendererManager.canvas })
    RendererManager.renderer.setPixelRatio(window.devicePixelRatio)
    RendererManager.renderer.setSize(window.innerWidth, window.innerHeight)
    RendererManager.renderer.toneMappingExposure = 2
  }

  private static postProcessing(): void
  {
    const width = window.innerWidth
    const height = window.innerHeight
    const renderScene = new RenderPass(SceneManager.scene, SceneManager.camera)
    const bloomPass = new UnrealBloomPass(new Vector2(width, height), 1.5, 0.4, 0.85)
    bloomPass.threshold = 0
    bloomPass.strength = 1
    bloomPass.radius = 0
    bloomPass.renderToScreen = true
    RendererManager.composer = new EffectComposer(RendererManager.renderer)
    RendererManager.composer.setSize(width, height)
    RendererManager.composer.addPass(renderScene)
    RendererManager.composer.addPass(bloomPass)
    RendererManager.renderer.toneMappingExposure = Math.pow(0.9,4.0)
  }

  private static resize(): void
  {
    const width = window.innerWidth
    const height = window.innerHeight
    SceneManager.camera.aspect = width / height
    SceneManager.camera.updateProjectionMatrix()
    RendererManager.renderer.setSize(width, height)
    RendererManager.renderer.setPixelRatio(2)
  }

  public static startGame(): void
  {
    if (!RendererManager.renderer)
    {
      new RendererManager()
    }
  }
}