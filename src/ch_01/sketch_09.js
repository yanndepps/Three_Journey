/*
 * chapter_01
 * sketch_09
 * materials
 */

import "./style.css";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import all textures
import colorTex from '../../assets/textures/door/color.jpg';
import alphaTex from '../../assets/textures/door/alpha.jpg';
import heightTex from '../../assets/textures/door/height.jpg';
import normalTex from '../../assets/textures/door/normal.jpg';
import aoTex from '../../assets/textures/door/ambientOcclusion.jpg';
import metalTex from '../../assets/textures/door/metalness.jpg';
import roughTex from '../../assets/textures/door/roughness.jpg';
import gradTex from '../../assets/textures/gradients/5.jpg';
import matcaTex from '../../assets/textures/matcaps/7.png';
// import environment maps
import envMaps_0 from '../../assets/textures/environmentMaps/3/px.jpg';
import envMaps_1 from '../../assets/textures/environmentMaps/3/nx.jpg';
import envMaps_2 from '../../assets/textures/environmentMaps/3/py.jpg';
import envMaps_3 from '../../assets/textures/environmentMaps/3/ny.jpg';
import envMaps_4 from '../../assets/textures/environmentMaps/3/pz.jpg';
import envMaps_5 from '../../assets/textures/environmentMaps/3/nz.jpg';

// import debug panel
import * as dat from 'dat.gui';

// Textures
const loadingManager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(loadingManager);
const cubeLoader = new THREE.CubeTextureLoader(loadingManager);

const colorTexture = loader.load(colorTex);
const alphaTexture = loader.load(alphaTex);
const heightTexture = loader.load(heightTex);
const normalTexture = loader.load(normalTex);
const aoTexture = loader.load(aoTex);
const metalTexture = loader.load(metalTex);
const roughTexture = loader.load(roughTex);
const gradTexture = loader.load(gradTex);
const matcaTexture = loader.load(matcaTex);

gradTexture.minFilter = THREE.NearestFilter;
gradTexture.magFilter = THREE.NearestFilter;
gradTexture.generateMipmaps = false;

const envMapTexture = cubeLoader.load([
  envMaps_0,
  envMaps_1,
  envMaps_2,
  envMaps_3,
  envMaps_4,
  envMaps_5
]);

// Debug
const gui = new dat.GUI;

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

// Objects & Materials
//
// MeshBasicMaterial
// const mat = new MeshBasicMaterial();
// mat.color.set(0xfffd01);
// mat.color.set('#BFF128');
// mat.color = new Color(0xffff14);
// mat.map = colorTexture;
// mat.wireframe = true;
// mat.transparent = true;
// mat.opacity = 0.1;
// mat.alphaMap = alphaTexture;

// MeshNormalMaterial
// const mat = new MeshNormalMaterial();
// mat.flatShading = true;

// MeshMatcapMaterial
// const mat = new MeshMatcapMaterial();
// mat.matcap = matcaTexture;

// MeshDepthMaterial
// const mat = new MeshDepthMaterial();

// MeshLambertMaterial
// const mat = new MeshLambertMaterial();

// MeshPhongMaterial
// const mat = new MeshPhongMaterial();
// mat.shininess = 100;
// mat.specular = new Color(0x1188ff);

// MeshToonMaterial
// const mat = new MeshToonMaterial();
// mat.gradientMap = gradTexture;

// MeshStandardMaterial
// const mat = new THREE.MeshStandardMaterial();
// mat.map = colorTexture;
// mat.aoMap = aoTexture;
// mat.displacementMap = heightTexture;
// mat.displacementScale = 0.05;
// mat.metalnessMap = metalTexture;
// mat.roughnessMap = roughTexture;
// mat.normalMap = normalTexture;
// mat.normalScale.set(0.8, 0.8);
// mat.transparent = true;
// mat.alphaMap = alphaTexture;

// Env Map
const mat = new THREE.MeshStandardMaterial();
mat.metalness = 0.7;
mat.roughness = 0.2;
mat.envMap = envMapTexture;

// add debug params
gui.add(mat, 'metalness')
  .min(0)
  .max(1)
  .step(0.0001);

gui.add(mat, 'roughness')
  .min(0)
  .max(1)
  .step(0.0001);

// gui.add(mat, 'aoMapIntensity')
//   .min(0)
//   .max(5)
//   .step(0.0001);

// gui.add(mat, 'displacementScale')
//   .min(0)
//   .max(1)
//   .step(0.0001);

// add objects
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  mat
);

// add uv's in order to place ambient occlusion on the texture
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2));

sphere.position.x = -1.5;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 100, 100),
  mat
);

// add uv's in order to place ambient occlusion on the texture
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2));

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  mat
);

// add uv's in order to place ambient occlusion on the texture
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2));


torus.position.x = 1.5;

scene.add(sphere, plane, torus);

// Axes helper
const ah = new THREE.AxesHelper(2);
scene.add(ah);

// Lights
const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambLight);

const poLight = new THREE.PointLight(0xffffff, 0.5);
poLight.position.set(2, 3, 4);
scene.add(poLight);

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
cam.lookAt(plane.position);
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
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;
  sphere.rotation.y = 0.1 * elapsedTime;

  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;
  sphere.rotation.x = 0.15 * elapsedTime;

  // update controls
  ctrl.update();

  // render
  renderer.render(scene, cam);
  window.requestAnimationFrame(tick);
};

tick();
