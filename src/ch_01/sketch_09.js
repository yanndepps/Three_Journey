/*
 * chapter_01
 * sketch_09
 * materials
 */

import "./style.css";
import {
  Scene,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  Clock,
  SphereGeometry,
  PlaneGeometry,
  TorusGeometry,
  Texture,
  TextureLoader,
  LoadingManager,
  Color,
  MeshNormalMaterial,
} from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import all textures
import colorTex from '../../assets/textures/door/color.jpg';
import alphaTex from '../../assets/textures/door/alpha.jpg';
import heightTex from '../../assets/textures/door/height.jpg';
import normalTex from '../../assets/textures/door/normal.jpg';
import aoTex from '../../assets/textures/door/ambientOcclusion.jpg';
import metalTex from '../../assets/textures/door/metalness.jpg';
import roughTex from '../../assets/textures/door/roughness.jpg';
import gradTex from '../../assets/textures/gradients/3.jpg';
import matcaTex from '../../assets/textures/matcaps/4.png';


/*
 * Textures
 */

const loadingManager = new LoadingManager();
const loader = new TextureLoader(loadingManager);

const colorTexture = loader.load(colorTex);
const alphaTexture = loader.load(alphaTex);
const heightTexture = loader.load(heightTex);
const normalTexture = loader.load(normalTex);
const aoTexture = loader.load(aoTex);
const metalTexture = loader.load(metalTex);
const roughTexture = loader.load(roughTex);
const gradTexture = loader.load(gradTex);
const matcaTexture = loader.load(matcaTex);

/*
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new Scene();

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

/*
 * Objects
 */
// MeshBasicMaterial
// const mat = new MeshBasicMaterial();
// mat.color.set(0xfffd01);
// mat.color.set('#BFF128');
// mat.color = new Color(0xffff14);
// mat.map = colorTexture;
// mat.wireframe = true;
// mat.transparent = true;
// mat.opacity = 0.1;
// mat.alphaMap = alphaTexture;

// MeshNormalMaterial
const mat = new MeshNormalMaterial();

const sphere = new Mesh(
  new SphereGeometry(0.5, 16, 16),
  mat
);

sphere.position.x = -1.5;

const plane = new Mesh(
  new PlaneGeometry(1, 1),
  mat
);

const torus = new Mesh(
  new TorusGeometry(0.3, 0.2, 16, 32),
  mat
);

torus.position.x = 1.5;

scene.add(sphere, plane, torus);

// Axes helper
const ah = new AxesHelper(2);
scene.add(ah);

// Debug
// ---
// sizes of the viewport
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Resize viewport
window.addEventListener('resize', () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera aspect ratio
  cam.aspect = sizes.width / sizes.height;
  cam.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Handle fullscreen
window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Camera
const aspectRatio = sizes.width / sizes.height;
const cam = new PerspectiveCamera(75, aspectRatio, 0.1, 100);
// const cam = new OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
cam.position.set(0, 0, 3);
cam.lookAt(plane.position);
scene.add(cam);

// Controls
const ctrl = new OrbitControls(cam, canvas);
ctrl.enableDamping = true;
// ctrl.enabled = false;

// Renderer
const renderer = new WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animation
const clock = new Clock();

const tick = () => {
  // time
  const elapsedTime = clock.getElapsedTime();

  // update objects
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;
  sphere.rotation.y = 0.1 * elapsedTime;

  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;
  sphere.rotation.x = 0.15 * elapsedTime;

  // update controls
  ctrl.update();

  // render
  renderer.render(scene, cam);
  window.requestAnimationFrame(tick);
};

tick();
