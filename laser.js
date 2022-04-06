class Laser {

    constructor(spos, angle){
        this.pos = createVector(spos.x, spos.y);
        this.vel = p5.Vector.fromAngle(angle);
        this.vel.mult(10);  

        
    }

    hits(blasteroid) {
        let d = dist(this.pos.x, this.pos.y, blasteroid.pos.x, blasteroid.pos.y);
        if(d < blasteroid.r){
            return true;
        } else {
            return false;
        }
    }

    update() {
        this.pos.add(this.vel);
    }

    render() {
        push();
        stroke(255);
        strokeWeight(5);
        translate(this.pos.x, this.pos.y);
        point(0,0);
        pop();
    }
}