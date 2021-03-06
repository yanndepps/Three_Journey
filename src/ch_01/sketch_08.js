/*
 * chapter_01
 * sketch_08
 * textures
 */

import "./style.css";
import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  Clock,
  BufferAttribute,
  BufferGeometry,
  BoxBufferGeometry,
  Texture,
  TextureLoader,
  LoadingManager,
} from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import gsap from 'gsap';
import colorTex from '../../assets/textures/door/color.jpg';
import alphaTex from '../../assets/textures/door/alpha.jpg';
import heightTex from '../../assets/textures/door/height.jpg';
import normalTex from '../../assets/textures/door/normal.jpg';
import aoTex from '../../assets/textures/door/ambientOcclusion.jpg';
import metalTex from '../../assets/textures/door/metalness.jpg';
import roughTex from '../../assets/textures/door/roughness.jpg';

/*
 * Textures
 */

const loadingManager = new LoadingManager();

// loadingManager.onStart = () => {
//   console.log('onStart');
// };

// loadingManager.onLoad = () => {
//   console.log('onLoad');
// };

// loadingManager.onProgress = () => {
//   console.log('onProgress');
// };

// loadingManager.onError = () => {
//   console.log('onError');
// };

const loader = new TextureLoader(loadingManager);
const colorTexture = loader.load(colorTex);
const alphaTexture = loader.load(alphaTex);
const heightTexture = loader.load(heightTex);
const normalTexture = loader.load(normalTex);
const aoTexture = loader.load(aoTex);
const metalTexture = loader.load(metalTex);
const roughTexture = loader.load(roughTex);

/*
 * Debug
 */
const gui = new dat.GUI({ closed: true, width: 250 });
// press 'H' to show/hide GUI
// gui.hide();

const parameters = {
  color: 0xfffd01,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  }
};

gui
  .addColor(parameters, 'color')
  .onChange(() => {
    mat.color.set(parameters.color);
  });

gui
  .add(parameters, 'spin')
  .name('spin da mesh')

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
// Mesh

const geo = new BoxBufferGeometry(1, 1, 1);
// console.log(geo.attributes.uv);
const mat = new MeshBasicMaterial({
  map: colorTexture,
  wireframe: false
});

const mesh = new Mesh(geo, mat);
scene.add(mesh);

// Axes helper
const ah = new AxesHelper(2);
scene.add(ah);

// Debug
gui
  .add(mesh.position, 'y')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('elevation');

gui
  .add(mesh, 'visible')
  .name('show mesh');

gui
  .add(ah, 'visible')
  .name('show axes');

gui
  .add(mat, 'wireframe')
  .name('wireframe');

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
cam.lookAt(mesh.position);
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
  // mesh.rotation.y = elapsedTime;

  // update controls
  ctrl.update();

  // render
  renderer.render(scene, cam);
  window.requestAnimationFrame(tick);
};

tick();
