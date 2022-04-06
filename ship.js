class Ship {
    constructor(){
        this.pos = createVector(width/2, height/2);
        this.r = 50;
        this.heading = -PI/2;
        this.rotation = 0;
        this.vel = createVector(0,0);
        this.isPropelling = false;
    }

    propelling(bool){
        this.isPropelling = bool;
    }

    update() {
        if(this.isPropelling){
            this.propel();
        }
        this.vel.mult(0.99);
        this.pos.add(this.vel);
        
        
        
    }

    propel() {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.add(force);
    }

    render() {
        push();
        fill(0);
        stroke(250);
        translate(this.pos.x, this.pos.y);
        rotate(this.heading);
        triangle(-this.r, -this.r, -this.r, this.r, this.r, 0);
        pop();
    }

    setRotation(a) {
        this.rotation = a;
    }

    turn() {
        this.heading += this.rotation;
    }

    
    edges() {
        if (this.pos.x > width + this.r) {
          this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
          this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
          this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
          this.pos.y = height + this.r;
        }
      };

}