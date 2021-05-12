/*
 * chapter_02
 * sketch_01
 * lights
 */

import './style.css';

import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new THREE.Scene();

// Mesh
const geo = new THREE.BoxGeometry(1, 1, 1);
const mat = new THREE.MeshBasicMaterial({ color: 0xFFFD01 });
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

// sizes for temp aspect ratio
const sizes = {
  width: 800,
  height: 600
};

// Camera
const cam = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
cam.position.z = 3;
scene.add(cam);

// Renderer
const canvas = document.querySelector('.webgl');
// console.log(canvas);
const renderer = new THREE.WebGLRenderer({
  canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, cam);
