import * as THREE from 'three';

class Road {
    constructor(length) {
        this.geometry = new THREE.BoxGeometry(length, 30, 0.1);
        this.material = new THREE.MeshPhongMaterial({color: "black"});

        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}

export default Road;