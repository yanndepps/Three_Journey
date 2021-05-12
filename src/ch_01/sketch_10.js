/*
 * chapter_01
 * sketch_10
 * 3D Text
 */

import "./style.css";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json';
import matcaTex from '../../assets/textures/matcaps/7.png';

// Debug
const gui = new dat.GUI;

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Textures
const loadingManager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(loadingManager);
const matcapTex = loader.load(matcaTex);

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

// add objects
// Fonts
const font = new THREE.Font(typefaceFont);
const textGeom = new THREE.TextBufferGeometry(
  'Yann Depps',
  {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4
  }
);
// translate geom to the center
// textGeom.computeBoundingBox();
// textGeom.translate(
//   -(textGeom.boundingBox.max.x - 0.02) * 0.5,
//   -(textGeom.boundingBox.max.y - 0.02) * 0.5,
//   -(textGeom.boundingBox.max.z - 0.03) * 0.5
// );
// a simpler way
textGeom.center();
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTex });
const text = new THREE.Mesh(textGeom, material);
scene.add(text);

console.time('donuts');
// add more geoms
const donutGeom = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);

for (let i = 0; i < 300; i++) {
  const donut = new THREE.Mesh(donutGeom, material);

  donut.position.x = (Math.random() - 0.5) * 10;
  donut.position.y = (Math.random() - 0.5) * 10;
  donut.position.z = (Math.random() - 0.5) * 10;

  donut.rotation.x = Math.random() * Math.PI;
  donut.rotation.y = Math.random() * Math.PI;

  const scale = Math.random();
  donut.scale.set(scale, scale, scale);

  scene.add(donut);
}
console.timeEnd('donuts');

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
cam.position.set(0, 0, 3);
cam.lookAt(text.position);
scene.add(cam);

// Controls
const ctrl = new OrbitControls(cam, canvas);
ctrl.enableDamping = true;
// ctrl.enabled = false;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animation
const clock = new THREE.Clock();

const tick = () => {
  // time
  const elapsedTime = clock.getElapsedTime();

  // update objects
  // cube.rotation.y = 0.1 * elapsedTime;

  // update controls
  ctrl.update();

  // render
  renderer.render(scene, cam);

  // tick on the next frame
  window.requestAnimationFrame(tick);
};

tick();
