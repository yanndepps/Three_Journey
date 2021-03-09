/*
 * chapter_01
 * sketch_06
 * geometries
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
  BoxBufferGeometry,
  BufferAttribute,
  BufferGeometry,
} from "three";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

const geo = new BufferGeometry();
const count = 50;
const positionArray = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 2;
}

const positionAttribute = new BufferAttribute(positionArray, 3);
geo.setAttribute('position', positionAttribute);

const mat = new MeshBasicMaterial({ color: 0xfffd01, wireframe: true });

const mesh = new Mesh(geo, mat);
scene.add(mesh);

// Axes helper
const ah = new AxesHelper(2);
scene.add(ah);

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
