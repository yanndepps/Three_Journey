/*
 * chapter_01
 * sketch_02
 * transform object
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
} from 'three';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new Scene();

/*
 * Objects - Group
 */

const group = new Group();
group.position.set(-1.5, -0.5, 0);
scene.add(group);

const cube1 = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 0xFFFD01 })
);

group.add(cube1);
cube1.rotation.set(0, 0, Math.PI * 0.25);

const cube2 = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 0x6D5ACF })
);

group.add(cube2);
cube2.rotation.set(0, 0, Math.PI * 0.50);

// Axes helper
const ah = new AxesHelper(2);
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

// Look straight at the object
// cam.lookAt(mesh.position);

// get the distance between camera and object

// Renderer
const canvas = document.querySelector('.webgl');
// console.log(canvas);
const renderer = new WebGLRenderer({
  canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, cam);
