/*
 * chapter_01
 * sketch_03
 * animations
 */

import './style.css';

import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  Group,
  Clock,
} from 'three';

import gsap from 'gsap';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new Scene();

/*
 * Objects - Group
 */

const mesh = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 0xFFFD01 })
);

scene.add(mesh);

// Axes helper
const ah = new AxesHelper(1);
scene.add(ah);

// sizes for temp aspect ratio
const sizes = {
  width: 800,
  height: 600
};

// Camera
const cam = new PerspectiveCamera(75, sizes.width / sizes.height);
cam.position.set(0, 0, 3);
scene.add(cam);

// Renderer
const canvas = document.querySelector('canvas.webgl');
// console.log(canvas);
const renderer = new WebGLRenderer({
  canvas
});
renderer.setSize(sizes.width, sizes.height);

// Time
// let time = Date.now();

// Clock
// const clock = new Clock();

// Twean with GSAP
gsap.to(mesh.position, { duration: 2, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 2, delay: 2, x: 0 });

// Animation
const tick = () => {
  // Time
  // let currentTime = Date.now();
  // let deltaTime = currentTime - time;
  // time = currentTime;
  // console.log(deltaTime);

  // Clock
  // const elapsedTime = clock.getElapsedTime();

  // update objects
  // mesh.rotation.y += 0.02 * deltaTime;

  // update objects using Clock
  // mesh.rotation.y = elapsedTime;

  // on revolution per second
  // mesh.rotation.y = elapsedTime * Math.PI * 2;

  // sine & cosine
  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.position.x = Math.cos(elapsedTime);

  // animate the camera
  // cam.position.y = Math.sin(elapsedTime);
  // cam.position.x = Math.cos(elapsedTime);
  // cam.lookAt(mesh.position);

  // render
  renderer.render(scene, cam);
  window.requestAnimationFrame(tick);
}

tick();
