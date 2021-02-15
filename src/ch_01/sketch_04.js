/*
 * chapter_01
 * sketch_04
 * cameras
 * 34.41
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
  OrthographicCamera,
  Vector3,
} from "three";

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

// Scene
const scene = new Scene();

// Base
const mesh = new Mesh(
  new BoxGeometry(1, 1, 1, 5, 5, 5),
  new MeshBasicMaterial({ color: 0xfffd01 })
);

scene.add(mesh);

// Axes helper
const ah = new AxesHelper(1);
scene.add(ah);

// sizes for temp aspect ratio
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const aspectRatio = sizes.width / sizes.height;
const cam = new PerspectiveCamera(75, aspectRatio, 0.1, 100);
// const cam = new OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
cam.position.set(0, 0, 3);
cam.lookAt(mesh.position);
scene.add(cam);

// Renderer
const canvas = document.querySelector("canvas.webgl");
// console.log(canvas);
const renderer = new WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animation
const clock = new Clock();

const tick = () => {
  // time
  const elapsedTime = clock.getElapsedTime();

  // update objects
  // mesh.rotation.y = elapsedTime;

  // update camera
  cam.position.x = cursor.x * 3;
  cam.position.y = cursor.y * 3;
  cam.lookAt(mesh.position);

  // render
  renderer.render(scene, cam);
  window.requestAnimationFrame(tick);
};

tick();
