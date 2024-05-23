import * as THREE from 'three';

class Road {
    constructor(length) {
        this.thickness = 0.1;
        this.geometry = new THREE.BoxGeometry(length, 30, this.thickness);
        this.material = new THREE.MeshPhongMaterial({color: "black"});

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 0, -this.thickness);
    }
}

export default Road;