import * as THREE from 'three';
import VehicleDynamics from './vehicleDynamics.js';

class Car {
    constructor(position) {      
        this.position = position;
        this.length = 4; // m
        this.width = 2; // m
        this.height = 1.8; // m

        const boxWidth = this.length; // m
        const boxHeight = this.width; // m
        const boxDepth =  this.height; // m

        // Set car on x-y plane.
        this.position.z = boxDepth;

        // boxWidth -> x, boxHeight -> y, boxDepth = z
        this.geometry = new THREE.BoxGeometry(
            boxWidth
            , boxHeight
            , boxDepth
        );
        this.material = new THREE.MeshPhongMaterial({color: "blue"});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        
        this.mesh.position.set(...this.position);
        this.yaw = this.mesh.rotation.z; // rad

        this.carCameraPosition = new THREE.Vector3();
        this.carCameraLookAt = new THREE.Vector3();

        this.dynamics = new VehicleDynamics();
    }

    update() {
        this.#move();
        this.#updateMeshPosition();
        this.#updateCameraPosition();
    }

    #updateMeshPosition() {
        this.mesh.position.set(
            this.position.x
            , this.position.y
            , this.position.z
        );
        this.mesh.rotation.z = this.yaw; // rad
        // this.mesh.rotation.z = 45 * Math.PI / 180; // rad
    }

    #updateCameraPosition() {
        this.carCameraPosition.set(
            this.position.x - this.length * 1
            , this.position.y
            , this.position.z + this.height * 3
        );

        this.carCameraLookAt.set(
            this.position.x  + this.length / 2
            , this.position.y
            , this.position.z + this.height / 2
        );
    }

    #move() {
        this.dynamics.drive(this.position, this.yaw);
        this.position.x += this.dynamics.Vx;
        this.position.y += this.dynamics.Vy;
        this.yaw += this.dynamics.yawRate;
        console.table(this.dynamics.yaw);
    }
}

export default Car;