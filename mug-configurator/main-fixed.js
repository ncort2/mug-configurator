console.log("✅ main-fixed.js loaded");

import * as THREE from 'https://esm.sh/three@0.152.2';
import { OrbitControls } from 'https://esm.sh/three@0.152.2/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://esm.sh/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';




let scene, camera, renderer, controls, loader;
let currentMug;

init();
loadMug('models/mug-white-handle.glb');

document.getElementById('whiteBtn').addEventListener('click', () => {
  switchMug('models/mug-white-handle.glb');
});
document.getElementById('blueBtn').addEventListener('click', () => {
  switchMug('models/mug-blue-handle.glb');
});

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1, 3);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  loader = new GLTFLoader();

  const light1 = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
  scene.add(light1);

  animate();
}

function loadMug(path) {
  loader.load(path, (gltf) => {
    currentMug = gltf.scene;
 currentMug.scale.set(5, 5, 5); // Adjust scale as needed
    scene.add(currentMug);
  });
}


function switchMug(path) {
  if (currentMug) {
    scene.remove(currentMug);
    currentMug.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
  }
  loadMug(path);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
