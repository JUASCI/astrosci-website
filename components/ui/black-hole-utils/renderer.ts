type RendererOptions = {
  canvas: HTMLCanvasElement;
};

type Renderer = {
  ready: Promise<void>;
  dispose: () => void;
};

type Particle = {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  alpha: number;
  warmth: number;
};

const TAU = Math.PI * 2;

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const radius = 0.11 + Math.pow(Math.random(), 0.62) * 0.45;
    return {
      angle: Math.random() * TAU,
      radius,
      speed: 0.14 + (1 - radius) * 0.7 + Math.random() * 0.1,
      size: 0.45 + Math.random() * 1.8,
      alpha: 0.12 + Math.random() * 0.68,
      warmth: Math.min(1, Math.max(0, radius * 1.8 + (index % 7) / 24)),
    };
  });
}

export function createRenderer({ canvas }: RendererOptions): Renderer {
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) {
    return { ready: Promise.resolve(), dispose: () => undefined };
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: 0.52, y: 0.48, targetX: 0.52, targetY: 0.48 };
  const particles = createParticles(260);
  let frame = 0;
  let animationFrame = 0;
  let disposed = false;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let lastTime = performance.now();

  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.floor(bounds.width));
    height = Math.max(1, Math.floor(bounds.height));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const updatePointer = (event: PointerEvent) => {
    const bounds = canvas.getBoundingClientRect();
    pointer.targetX = (event.clientX - bounds.left) / Math.max(1, bounds.width);
    pointer.targetY = (event.clientY - bounds.top) / Math.max(1, bounds.height);
  };

  const resetPointer = () => {
    pointer.targetX = 0.52;
    pointer.targetY = 0.48;
  };

  const render = (now: number) => {
    if (disposed) return;
    const delta = Math.min(40, now - lastTime) / 1000;
    lastTime = now;
    const motionScale = reducedMotion.matches ? 0 : 1;
    frame += delta * motionScale;

    pointer.x += (pointer.targetX - pointer.x) * 0.035;
    pointer.y += (pointer.targetY - pointer.y) * 0.035;

    const centerX = width * (0.53 + (pointer.x - 0.52) * 0.035);
    const centerY = height * (0.51 + (pointer.y - 0.48) * 0.025);
    const scale = Math.min(width, height);
    const diskX = scale * 0.34;
    const diskY = scale * 0.115;
    const horizon = scale * 0.11;

    context.clearRect(0, 0, width, height);
    const background = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, scale * 0.72);
    background.addColorStop(0, "rgba(103, 52, 20, 0.12)");
    background.addColorStop(0.34, "rgba(45, 25, 13, 0.08)");
    background.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(centerX, centerY);
    context.rotate(-0.11 + (pointer.x - 0.5) * 0.08);
    context.globalCompositeOperation = "lighter";

    for (const particle of particles) {
      particle.angle += particle.speed * delta * motionScale;
      const wobble = Math.sin(frame * 0.7 + particle.angle * 3) * 0.012;
      const radius = particle.radius + wobble;
      const x = Math.cos(particle.angle) * diskX * radius;
      const y = Math.sin(particle.angle) * diskY * radius;
      const glow = context.createRadialGradient(x, y, 0, x, y, particle.size * 5);
      const color = particle.warmth > 0.55 ? "255, 175, 90" : "218, 224, 234";
      glow.addColorStop(0, `rgba(${color}, ${particle.alpha})`);
      glow.addColorStop(1, `rgba(${color}, 0)`);
      context.fillStyle = glow;
      context.beginPath();
      context.arc(x, y, particle.size * 5, 0, TAU);
      context.fill();
    }

    const disk = context.createRadialGradient(0, 0, horizon * 0.7, 0, 0, diskX);
    disk.addColorStop(0, "rgba(255, 207, 139, 0.82)");
    disk.addColorStop(0.18, "rgba(213, 101, 35, 0.62)");
    disk.addColorStop(0.48, "rgba(128, 44, 17, 0.26)");
    disk.addColorStop(1, "rgba(22, 9, 4, 0)");
    context.fillStyle = disk;
    context.beginPath();
    context.ellipse(0, 0, diskX, diskY, 0, 0, TAU);
    context.fill();

    context.globalCompositeOperation = "source-over";
    context.shadowColor = "rgba(255, 145, 53, 0.65)";
    context.shadowBlur = scale * 0.025;
    context.strokeStyle = "rgba(255, 187, 99, 0.8)";
    context.lineWidth = Math.max(1, scale * 0.004);
    context.beginPath();
    context.ellipse(0, 0, horizon * 1.65, horizon * 0.53, 0, 0, TAU);
    context.stroke();
    context.shadowBlur = 0;

    const shadow = context.createRadialGradient(0, 0, horizon * 0.72, 0, 0, horizon * 1.12);
    shadow.addColorStop(0, "#000000");
    shadow.addColorStop(0.76, "#000000");
    shadow.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = shadow;
    context.beginPath();
    context.arc(0, 0, horizon * 1.14, 0, TAU);
    context.fill();
    context.restore();

    animationFrame = window.requestAnimationFrame(render);
  };

  resize();
  window.addEventListener("resize", resize);
  canvas.addEventListener("pointermove", updatePointer, { passive: true });
  canvas.addEventListener("pointerleave", resetPointer);
  animationFrame = window.requestAnimationFrame(render);

  return {
    ready: Promise.resolve(),
    dispose: () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", updatePointer);
      canvas.removeEventListener("pointerleave", resetPointer);
    },
  };
}
