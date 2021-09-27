let snowflake =[];
let step_size = 3;

let angle_alpha;
let par;
let rp = 2.5;
let x_var;
let flake_height

let show = false;
let var_col = false;

let can;
let interact;
let complexity=0.5;


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function setup() {
  can = createCanvas(600, 600);
  can.parent("#canvas");
  
  par = new particle();
  interact = selectAll(".btn-check");
  complexity = select(".slider");
  noLoop();
  
  interact[1].mouseClicked(start_stop);
  interact[2].mouseClicked(pause_play);
  
}

function draw() {
  
  background(0);
  translate(width/2,height/2);
  rotate(PI/6);

  let pt = p5.Vector.fromAngle(angle_alpha,width/2);

  for(let j=0; j<6;j++){
    
    rotate(PI/3);
    
    for(let i = 0;i<snowflake.length;i++){
      snowflake[i].show();   

      push();
      scale(1,-1);
      snowflake[i].show();  
      pop();
      
    }
    
    if(show){
      update();
    }
    
  }
    if(!show){
      update();
    }

  
  if(snowflake[snowflake.length-1].pos.x >= width/2){
    alert("Snow Flake Done");
    document.getElementById("start").click();
    
  }
}

function start(){
  able(0);
  select("#st").html("Stop");  

  show = interact[0].checked();
  var_col = interact[3].checked();
  
  
  x_var = 0*width*complexity.value();
  angle_alpha  = PI*complexity.value();
  
  
  loop();
  
}

async function stop(){
  
  able(1);
  select("#st").html("Start");
  
  document.getElementById("show").click();

  
  if(interact[0].checked()){
    stop();
  }
  
  noLoop();
  
  await sleep(10);
  snowflake.splice(0,snowflake.length);
}

function pause_play(){
  
  if(interact[2].checked()){
    
    select("#ps").html("Play");
    noLoop();  
    
  }
  else{ 
    
    select("#ps").html("Pause");
    loop();
    
  }
  
  
}


function start_stop(){

  if(interact[1].checked()){
    stop();  
  }
  else{ 
    start();
  }

}


function able(f){
  
  if(f==0){
    
    interact[2].removeAttribute('disabled');
  }
  else{
    
    if(interact[2].checked()){
          document.getElementById("pause").click();
      }
      interact[2].attribute('disabled', '');    
  }
}




function update(){
  
  show = interact[0].checked();
  var_col = interact[3].checked();
  
  
  angle_alpha  = PI*(complexity.value()/2);
  x_var = width*complexity.value();
  
  
  if(snowflake.length){
    if(snowflake[snowflake.length-1].pos.x >= width/2.07){
      snowflake[snowflake.length-1].pos.x +=rp;
      return;
    }
  } 
  
  
  while(!(par.finished() || par.check_col())){
    par.move();
    if(show){par.show();}
    
    }
  
  flake_height = par.pos.mag();
  
  if(var_col){
    par.color = [(map(flake_height,1,width/2,15,300)),100,50,0.75];
  }

  snowflake.push(par);
  par = new particle();
}
