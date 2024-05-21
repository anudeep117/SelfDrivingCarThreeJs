import Controls from './controls.js';

/*
    inputs: throttle and steeringAngle
    outputs: Vx, Vy, yawRate (3 dof kinematic model)
*/
class VehicleDynamics {
    constructor() {
        this.mass = 1000; // kg
        this.wheelBase = 2.5; // m
        this.Lr = this.wheelBase / 2; // m

        this.acceleration = 0.2; // m/s^2
        this.speed = 0; // m/s
        
        this.steeringAngle = 0; // degrees
        this.maxSpeed = 10; // m/s
        this.maxSteeringAngle = 45; // degrees

        this.friction = 0.1; // m/s^2
        
        this.Vx = 0;
        this.Vy = 0;
        this.yawRate = 0;
        this.yaw = 0;

        this.controls = new Controls();
        this.throttle = 0;
    }

    drive(prevYaw) {
        // apply throttle
        if (this.controls.forward) {
            this.throttle = 1;
        } else if (this.controls.reverse) {
            this.throttle = -1;
        } else {
            this.throttle = 0;
        }

        this.speed += this.throttle * this.acceleration;

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }

        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }
        
        // apply friction
        if (this.speed > 0) {
            this.speed -= this.friction;
        } 
        if (this.speed < 0) {
            this.speed += this.friction;
        }

        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        // apply steering
        if (this.speed != 0) {
            if (this.controls.left) {
                this.steeringAngle += 0.1;
            } else if (this.controls.right) {
                this.steeringAngle -= 0.1;
            } else {
                this.steeringAngle = 0;
            }
        }

        if (this.steeringAngle > this.maxSteeringAngle) {
            this.steeringAngle = this.maxSteeringAngle;
        }
        if (this.steeringAngle < -this.maxSteeringAngle) {
            this.steeringAngle = -this.maxSteeringAngle;
        }

        console.log(this.steeringAngle);

        this.sideSlip = Math.atan2(
            this.Lr * Math.tan(this.steeringAngle * Math.PI / 180)
            , this.wheelBase
        ); // rad

        this.yawRate = (this.speed / this.wheelBase) 
        * Math.cos(this.sideSlip)
        * Math.tan(this.steeringAngle * Math.PI / 180); // rad/s

        if (prevYaw > Math.PI * 2 || prevYaw < -Math.PI * 2) {
            prevYaw = 0;
        }
        console.log(prevYaw)

        this.Vx = this.speed * Math.cos(this.sideSlip + prevYaw);
        this.Vy = this.speed * Math.sin(this.sideSlip + prevYaw);
    }
}

export default VehicleDynamics;