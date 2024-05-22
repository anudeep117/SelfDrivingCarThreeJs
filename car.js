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
        this.prevYaw = this.yaw;

        this.carCameraPosition = new THREE.Vector3();
        this.lookAtThis = new THREE.Euler(53 * Math.PI / 180, 0, -Math.PI / 2, 'ZXY');

        const dt = 0.1;
        this.dynamics = new VehicleDynamics(dt);
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
        // console.log(this.mesh.rotation.z);
    }

    #updateCameraPosition() {
        this.carCameraPosition.set(
            this.position.x - this.length * 1
            , this.position.y
            , this.position.z + this.height * 3
        );
    }

    #move() {
        this.dynamics.drive(this.yaw);
        this.position.x += this.dynamics.Vx * this.dynamics.dt;
        this.position.y += this.dynamics.Vy * this.dynamics.dt;
        this.yaw += this.dynamics.yawRate * this.dynamics.dt;

        if (this.yaw > Math.PI * 2 || this.yaw < -Math.PI * 2) {
            this.yaw = 0;
        }
    }
}

export default Car;