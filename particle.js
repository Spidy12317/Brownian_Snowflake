class particle{
  
  constructor(){
  
    this.pos = createVector(x_var,random(0,-(width/2)*tan(angle_alpha) ));
    this.color = [210, 100.0, 65];
     
  }
  
  finished(){
    
    return(this.pos.x <= 1);
    
    
  }
  move(){
    
    if(!this.finished()){
      
      this.pos.x -=1;
      this.pos.y += random(-step_size,step_size);

      this.constraint();
    }
  }
  
  S
  constraint(){
    
    let angle = this.pos.heading();
    angle = constrain(angle, 0, angle_alpha)
    this.pos = p5.Vector.fromAngle(angle,this.pos.mag());
  }
  
  
  check_col(){
  
  let len = snowflake.length;  
  let flake_height;
  for(let i = len-1; i >= 0; i--){
    
    if( (snowflake[i].pos.x - par.pos.x)**2 + (snowflake[i].pos.y - par.pos.y)**2 < (2*rp)**2 ){
      
      return(true);
      }
    }
    return(false);
    
  }

  
  show(){
    colorMode(HSL);
    // noStroke();
    fill(this.color);
    stroke(255, 150);
    strokeWeight(0.35);
    ellipse(this.pos.x, this.pos.y, rp * 2);
    
  }
  
}