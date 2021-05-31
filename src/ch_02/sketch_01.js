/*
 * chapter_02
 * sketch_01
 * lights
 */

import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import * as dat from 'dat.gui';

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

const hemLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1.0);
scene.add(hemLight);

const pLight = new THREE.PointLight(0xff9000, 0.5, 10, 2);
pLight.position.set(1, -0.5, 1);
scene.add(pLight);

const recaLight = new THREE.RectAreaLight(0x4c00ff, 2, 1, 1);
recaLight.position.set(-1.5, 0, 1.5);
recaLight.lookAt(new THREE.Vector3());
scene.add(recaLight);

const spot = new THREE.SpotLight(0x7bff00, 0.5, 10, Math.PI * 0.1, 0.25, 1);
spot.position.set(0, 2, 3);
scene.add(spot);
spot.target.position.x = -0.75;
scene.add(spot.target);

gui.add(hemLight, 'intensity').min(0).max(1).step(0.01);

// Light Helpers
const hemLightHelper = new THREE.HemisphereLightHelper(hemLight, 0.2);
scene.add(hemLightHelper);

const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
scene.add(dirLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pLight, 0.2);
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spot);
scene.add(spotLightHelper);
window.requestAnimationFrame(() => {
  spotLightHelper.update();
});

const recaLightHelper = new RectAreaLightHelper(recaLight);
scene.add(recaLightHelper);

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

// Meshes & Materials
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 32, 32),
  material
);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(0.75, 0.75, 0.75),
  material
);

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(5, 5),
  material
);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

// Axes helper
const ah = new THREE.AxesHelper(2);
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
const cam = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
// const cam = new OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
cam.position.set(1, 1, 2);
cam.lookAt(cube.position);
scene.add(cam);

// Controls
const ctrl = new OrbitControls(cam, canvas);
ctrl.enableDamping = true;
// ctrl.enabled = false;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animation
const clock = new THREE.Clock();

const tick = () => {
  // time
  const elapsedTime = clock.getElapsedTime();

  // update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // update controls
  ctrl.update();

  // render
  renderer.render(scene, cam);

  // tick on the next frame
  window.requestAnimationFrame(tick);
};

tick();
