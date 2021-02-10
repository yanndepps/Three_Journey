/*
 * chapter_01
 * sketch_01
 * basic scene
 */

import './style.css';

import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new Scene();

// Mesh
const geo = new BoxGeometry(1, 1, 1);
const mat = new MeshBasicMaterial({ color: 0xFFFD01 });
const mesh = new Mesh(geo, mat);
scene.add(mesh);

// sizes for temp aspect ratio
const sizes = {
  width: 800,
  height: 600
};

// Camera
const cam = new PerspectiveCamera(75, sizes.width / sizes.height);
cam.position.z = 3;
scene.add(cam);

// Renderer
const canvas = document.querySelector('.webgl');
// console.log(canvas);
const renderer = new WebGLRenderer({
  canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, cam);
