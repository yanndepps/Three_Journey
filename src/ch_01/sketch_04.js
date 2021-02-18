/*
 * chapter_01
 * sketch_04
 * cameras
 * 40.36
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

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Canvas
const canvas = document.querySelector("canvas.webgl");

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
const ah = new AxesHelper(2);
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

// Controls
const ctrl = new OrbitControls(cam, canvas);
ctrl.enableDamping = true;
// Renderer
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
  // cam.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // cam.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // cam.position.y = cursor.y * 5;
  // cam.lookAt(mesh.position);

  // update controls
  ctrl.update();

  // render
  renderer.render(scene, cam);
  window.requestAnimationFrame(tick);
};

tick();
