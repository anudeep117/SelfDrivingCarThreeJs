import * as THREE from 'three';
import { Timer } from 'three/addons/misc/Timer.js';
import Car from './car.js';
import Road from './road.js';

const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

// add scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('gray');

// add camera
// camera.position.x // Right +ve
// camera.position.y // Up +ve
// camera.position.z // Out of screen +ve
const camera = new THREE.PerspectiveCamera(
    75
    , 2
    , 0.1
    , 2000
);

// const orbitControls = new OrbitControls(camera, renderer.domElement);

// debug
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(20, 20, 'white', 'white');
gridHelper.rotation.x=Math.PI/2;
scene.add(gridHelper);
// const cameraHelper = new THREE.CameraHelper(camera);
// scene.add(cameraHelper);

// add road
const road = new Road(1000);
scene.add(road.mesh);

// add car
const car = new Car(new THREE.Vector3(0, 0, 0));
scene.add(car.mesh);


// add light
const light = createLight();
scene.add(light);
const ambientLight = createAmbientLight();
scene.add(ambientLight);

// Render
requestAnimationFrame(render);

// Helper functions
function createLight() {
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-5, -7, 5);
    return light;
}

function createAmbientLight() {
    return new THREE.AmbientLight( 0xFFFFFF );
}

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function render(time) {
    requestAnimationFrame(render);

    car.update();
    camera.position.set(...car.carCameraPosition);
    camera.rotation.set(...car.lookAtThis);
    
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
}
