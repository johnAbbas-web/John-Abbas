"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const noiseGLSL = `
vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v){
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

const vertexShader = `
uniform float uTime;
uniform float uAmp;
uniform float uScroll;
uniform float uPointScale;
uniform vec2 uPointer;
attribute float aSeed;
varying float vNoise;
varying float vSeed;

${noiseGLSL}

void main() {
  vec3 pos = position;

  float t = uTime * 0.18;
  float n = snoise(pos * 0.85 + vec3(t, t * 0.7, -t * 0.4));
  float n2 = snoise(pos * 2.1 - vec3(t * 1.3, -t, t * 0.6));
  float displacement = (n * 0.75 + n2 * 0.25) * uAmp;

  vec3 pointerPos = vec3(uPointer * 2.2, 1.4);
  float pull = 1.0 - clamp(distance(pos, pointerPos) / 3.0, 0.0, 1.0);
  displacement += pull * pull * 0.45;

  pos += normalize(pos) * displacement;
  pos.y -= uScroll * 1.4;

  vNoise = n * 0.5 + 0.5;
  vSeed = aSeed;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float flicker = 0.7 + 0.3 * sin(uTime * 1.6 + aSeed * 42.0);
  gl_PointSize = uPointScale * (1.0 + vNoise * 1.6) * flicker * (9.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const fragmentShader = `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uOpacity;
varying float vNoise;
varying float vSeed;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.02, d);

  vec3 col = mix(uColorA, uColorB, smoothstep(0.42, 0.98, vNoise));
  col = mix(col, uColorC, smoothstep(0.82, 1.0, vSeed) * 0.85);

  gl_FragColor = vec4(col, alpha * uOpacity);
}
`;

function fibonacciSphere(count, radius) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const jitter = radius * (0.88 + Math.random() * 0.16);
    positions[i * 3] = Math.cos(theta) * r * jitter;
    positions[i * 3 + 1] = y * jitter;
    positions[i * 3 + 2] = Math.sin(theta) * r * jitter;
    seeds[i] = Math.random();
  }
  return { positions, seeds };
}

export default function HeroScene({ theme = "dark" }) {
  const hostRef = useRef(null);
  const apiRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch (error) {
      return undefined;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(host.clientWidth || 1, host.clientHeight || 1);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, (host.clientWidth || 1) / (host.clientHeight || 1), 0.1, 100);
    camera.position.set(0, 0, 6.4);

    const group = new THREE.Group();
    scene.add(group);

    const count = coarse ? 9000 : 22000;
    const { positions, seeds } = fibonacciSphere(count, 1.75);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const uniforms = {
      uTime: { value: 0 },
      uAmp: { value: 0.34 },
      uScroll: { value: 0 },
      uOpacity: { value: 0 },
      uPointScale: { value: coarse ? 2.1 : 2.6 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color("#2f6fd0") },
      uColorB: { value: new THREE.Color("#8fc4ff") },
      uColorC: { value: new THREE.Color("#eef4fd") },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    group.add(points);

    const shellGeo = new THREE.IcosahedronGeometry(2.55, 1);
    const shellMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#4d94ff"),
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    group.add(shell);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (event) => {
      pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    if (!coarse) window.addEventListener("pointermove", onPointerMove, { passive: true });

    let scrollNorm = 0;
    const onScroll = () => {
      scrollNorm = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      if (!host.clientWidth || !host.clientHeight) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
      // On wide screens the headline owns the left column, so bias the cloud right.
      group.position.x = host.clientWidth > 1080 ? 1.5 : 0;
    };
    onResize();
    const observer = new ResizeObserver(onResize);
    observer.observe(host);

    let raf = 0;
    let running = true;
    const clock = new THREE.Clock();

    const render = () => {
      // getElapsedTime() consumes the delta internally, so derive the fade from elapsed time.
      const elapsed = clock.getElapsedTime();

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      uniforms.uTime.value = reduced ? 2.4 : elapsed;
      uniforms.uScroll.value += (scrollNorm - uniforms.uScroll.value) * 0.06;
      uniforms.uPointer.value.set(pointer.x, pointer.y);
      uniforms.uOpacity.value = Math.min(1, Math.max(0, (elapsed - 0.15) / 1.4));

      group.rotation.y += (pointer.x * 0.42 - group.rotation.y) * 0.04 + (reduced ? 0 : 0.0016);
      group.rotation.x += (-pointer.y * 0.28 - group.rotation.x) * 0.04;
      shell.rotation.y -= reduced ? 0 : 0.0009;
      shell.rotation.z += reduced ? 0 : 0.0006;

      camera.position.z = 6.4 + uniforms.uScroll.value * 1.6;

      renderer.render(scene, camera);
      if (running) raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    apiRef.current = { uniforms, shellMat };

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
      apiRef.current = null;
    };
  }, []);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const light = theme === "light";
    api.uniforms.uColorA.value.set(light ? "#1e4fa3" : "#2f6fd0");
    api.uniforms.uColorB.value.set(light ? "#4a90e2" : "#8fc4ff");
    api.uniforms.uColorC.value.set(light ? "#8fa8c8" : "#eef4fd");
    api.shellMat.color.set(light ? "#1e4fa3" : "#4d94ff");
    api.shellMat.opacity = light ? 0.14 : 0.08;
  }, [theme]);

  return <div ref={hostRef} className="hero-canvas" aria-hidden="true" />;
}
