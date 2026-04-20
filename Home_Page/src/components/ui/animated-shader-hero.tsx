import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

const defaultShaderSource = `#version 300 es
precision highp float;

uniform vec2 resolution;
uniform float time;
uniform vec2 move;
uniform vec2 touch;

out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p *= 2.02;
    amplitude *= 0.5;
  }

  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= resolution.x / resolution.y;

  vec2 pointer = touch / resolution;
  pointer = pointer * 2.0 - 1.0;
  pointer.x *= resolution.x / resolution.y;
  pointer.y *= -1.0;

  float t = time * 0.22;

  float smokeA = fbm(p * 1.35 + vec2(t * 0.12, -t * 0.05));
  float smokeB = fbm(p * 2.4 - vec2(t * 0.08, t * 0.1));
  float smoke = smokeA * 0.7 + smokeB * 0.3;

  float bandA = exp(-abs(p.y + 0.26 + 0.05 * sin(p.x * 2.3 + t * 1.8)) * 16.0);
  float bandB = exp(-abs(p.y + 0.02 + 0.04 * sin(p.x * 3.1 - t * 1.35)) * 22.0);
  float bandC = exp(-abs(p.y - 0.3 + 0.025 * sin(p.x * 4.0 + t * 0.9)) * 36.0);
  float lightBands = bandA * 0.18 + bandB * 0.42 + bandC * 0.8;

  vec2 orbPos = vec2(0.42 + 0.08 * sin(t * 0.7), -0.04 + 0.05 * cos(t * 0.9));
  float orb = exp(-length((p - orbPos) * vec2(1.0, 1.65)) * 6.0);

  float pointerGlow = exp(-length((p - pointer) * vec2(0.9, 1.3)) * 4.2);
  pointerGlow *= 0.35 + min(length(move) * 0.0035, 0.45);

  vec3 coffeeBlack = vec3(0.07, 0.035, 0.012);
  vec3 coffeeDeep = vec3(0.10, 0.05, 0.02);
  vec3 burntOrange = vec3(0.76, 0.25, 0.05);
  vec3 mintSand = vec3(0.79, 0.66, 0.49);
  vec3 cloudWhite = vec3(0.98, 0.95, 0.88);

  vec3 color = mix(coffeeBlack, coffeeDeep, smoke);
  color += burntOrange * lightBands * 0.85;
  color += mintSand * lightBands * 0.22;
  color += burntOrange * orb * 1.15;
  color += cloudWhite * bandC * 0.16;
  color += mintSand * pointerGlow * 0.22;

  float haze = smoothstep(0.28, 1.15, smoke);
  color += vec3(0.08, 0.035, 0.01) * haze * 0.4;

  float vignette = smoothstep(1.45, 0.2, length(p));
  color *= vignette;

  fragColor = vec4(color, 1.0);
}
`

type UniformMap = {
  resolution: WebGLUniformLocation | null
  time: WebGLUniformLocation | null
  move: WebGLUniformLocation | null
  touch: WebGLUniformLocation | null
}

class WebGLRenderer {
  private canvas: HTMLCanvasElement
  private gl: WebGL2RenderingContext
  private program: WebGLProgram | null = null
  private vertexShader: WebGLShader | null = null
  private fragmentShader: WebGLShader | null = null
  private buffer: WebGLBuffer | null = null
  private shaderSource = defaultShaderSource
  private move = [0, 0]
  private touch = [0, 0]
  private uniforms: UniformMap = {
    resolution: null,
    time: null,
    move: null,
    touch: null,
  }

  private readonly vertexSource = `#version 300 es
precision highp float;
in vec4 position;
void main() {
  gl_Position = position;
}`

  private readonly vertices = [-1, 1, -1, -1, 1, 1, 1, -1]

  constructor(canvas: HTMLCanvasElement, scale: number) {
    this.canvas = canvas
    const context = canvas.getContext('webgl2', { alpha: false })

    if (!context) {
      throw new Error('WebGL2 is not supported in this browser.')
    }

    this.gl = context
    this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale)
  }

  updateShader(source: string) {
    this.reset()
    this.shaderSource = source
    this.setup()
    this.init()
  }

  updateMove(move: number[]) {
    this.move = move
  }

  updateTouch(touch: number[]) {
    this.touch = touch
  }

  updateScale(scale: number) {
    void scale
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
  }

  test(source: string) {
    const shader = this.gl.createShader(this.gl.FRAGMENT_SHADER)

    if (!shader) {
      return 'Unable to create fragment shader.'
    }

    this.gl.shaderSource(shader, source)
    this.gl.compileShader(shader)

    const error = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)
      ? null
      : this.gl.getShaderInfoLog(shader)

    this.gl.deleteShader(shader)
    return error
  }

  private compile(shader: WebGLShader, source: string) {
    this.gl.shaderSource(shader, source)
    this.gl.compileShader(shader)

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      throw new Error(this.gl.getShaderInfoLog(shader) || 'Shader compilation failed.')
    }
  }

  setup() {
    const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER)
    const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER)
    const program = this.gl.createProgram()

    if (!vertexShader || !fragmentShader || !program) {
      throw new Error('Unable to create WebGL resources.')
    }

    this.compile(vertexShader, this.vertexSource)
    this.compile(fragmentShader, this.shaderSource)

    this.gl.attachShader(program, vertexShader)
    this.gl.attachShader(program, fragmentShader)
    this.gl.linkProgram(program)

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      throw new Error(this.gl.getProgramInfoLog(program) || 'Program linking failed.')
    }

    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader
    this.program = program
  }

  init() {
    if (!this.program) {
      return
    }

    this.buffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW)

    const position = this.gl.getAttribLocation(this.program, 'position')
    this.gl.enableVertexAttribArray(position)
    this.gl.vertexAttribPointer(position, 2, this.gl.FLOAT, false, 0, 0)

    this.uniforms = {
      resolution: this.gl.getUniformLocation(this.program, 'resolution'),
      time: this.gl.getUniformLocation(this.program, 'time'),
      move: this.gl.getUniformLocation(this.program, 'move'),
      touch: this.gl.getUniformLocation(this.program, 'touch'),
    }
  }

  render(now = 0) {
    if (!this.program) {
      return
    }

    this.gl.clearColor(0, 0, 0, 1)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    this.gl.useProgram(this.program)
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer)

    this.gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height)
    this.gl.uniform1f(this.uniforms.time, now * 0.001)
    this.gl.uniform2f(this.uniforms.move, this.move[0], this.move[1])
    this.gl.uniform2f(this.uniforms.touch, this.touch[0], this.touch[1])
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
  }

  reset() {
    if (this.program) {
      if (this.vertexShader) {
        this.gl.detachShader(this.program, this.vertexShader)
        this.gl.deleteShader(this.vertexShader)
      }

      if (this.fragmentShader) {
        this.gl.detachShader(this.program, this.fragmentShader)
        this.gl.deleteShader(this.fragmentShader)
      }

      this.gl.deleteProgram(this.program)
    }

    if (this.buffer) {
      this.gl.deleteBuffer(this.buffer)
    }

    this.program = null
    this.vertexShader = null
    this.fragmentShader = null
    this.buffer = null
  }
}

class PointerHandler {
  private scale: number
  private move = [0, 0]
  private touch = [0, 0]
  private element: HTMLCanvasElement

  constructor(element: HTMLCanvasElement, scale: number) {
    this.element = element
    this.scale = scale

    const map = (clientX: number, clientY: number) => [
      clientX * this.scale,
      element.height - clientY * this.scale,
    ]

    element.addEventListener('pointermove', (event) => {
      this.touch = map(event.clientX, event.clientY)
      this.move = [
        this.move[0] * 0.92 + event.movementX * 0.08,
        this.move[1] * 0.92 + event.movementY * 0.08,
      ]
    })

    element.addEventListener('pointerleave', () => {
      this.move = [0, 0]
    })
  }

  updateScale(scale: number) {
    this.scale = scale
    void this.element
  }

  getMove() {
    return this.move
  }

  getTouch() {
    return this.touch
  }
}

interface AnimatedShaderHeroBackgroundProps {
  className?: string
}

export function AnimatedShaderHeroBackground({
  className,
}: AnimatedShaderHeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const rendererRef = useRef<WebGLRenderer | null>(null)
  const pointersRef = useRef<PointerHandler | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const resize = () => {
      const dpr = Math.max(1, Math.min(window.devicePixelRatio, 1.5))

      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr

      rendererRef.current?.updateScale(dpr)
      pointersRef.current?.updateScale(dpr)
    }

    try {
      const dpr = Math.max(1, Math.min(window.devicePixelRatio, 1.5))
      const renderer = new WebGLRenderer(canvas, dpr)
      const pointerHandler = new PointerHandler(canvas, dpr)

      const shaderError = renderer.test(defaultShaderSource)
      if (shaderError) {
        console.error(shaderError)
        return
      }

      renderer.setup()
      renderer.init()

      rendererRef.current = renderer
      pointersRef.current = pointerHandler

      resize()

      const frame = (now: number) => {
        renderer.updateTouch(pointerHandler.getTouch())
        renderer.updateMove(pointerHandler.getMove())
        renderer.render(now)
        animationFrameRef.current = requestAnimationFrame(frame)
      }

      animationFrameRef.current = requestAnimationFrame(frame)
      window.addEventListener('resize', resize)

      return () => {
        window.removeEventListener('resize', resize)

        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current)
        }

        renderer.reset()
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-90 [filter:saturate(115%)_contrast(108%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,243,224,0.04),transparent_22%),linear-gradient(180deg,rgba(10,5,2,0.16)_0%,rgba(10,5,2,0.12)_38%,rgba(10,5,2,0.26)_100%)]" />
    </div>
  )
}
