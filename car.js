import * as THREE from 'three';

class Car {
    constructor(position) {      
        this.position = position;  
        this.boxWidth = 2; // m
        this.boxHeight = 4; // m
        this.boxDepth = 1.8; // m
        this.position.z = this.boxDepth;
        this.geometry = new THREE.BoxGeometry(
            this.boxWidth
            , this.boxHeight
            , this.boxDepth
        );
        this.material = new THREE.MeshPhongMaterial({color: "blue"});

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(...this.position);

        this.carCameraPosition = new THREE.Vector3(
            this.position.x
            , this.position.y - this.boxHeight * 1
            , this.position.z + this.boxDepth * 3
        );

        this.carCameraLookAt = new THREE.Vector3(
            this.position.x
            , this.position.y + this.boxHeight / 2
            , this.position.z + this.boxDepth  / 2
        );
    }
}

export default Car;