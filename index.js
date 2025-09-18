let mainCanvas = document.getElementById("mainCanvas");
let stepText = document.getElementById("step");

let ctx = mainCanvas.getContext("2d");

let selected = document.querySelector('input[name="Disc"]:checked');

mainCanvas.width = window.innerWidth*(3/4)*(3/4);
mainCanvas.height = window.innerHeight*(3/4)*(3/4);

ctx.fillStyle = 'black';
ctx.fillRect(0,0,mainCanvas.width,mainCanvas.height);


let width = mainCanvas.width;
let height = mainCanvas.height;

color = ["red","green","blue","yellow","orange"];   

col=[[],[],[]];

let step =0;

let a= "";


function HaNoiTower(Disc,pos,des,free){
    if(Disc > 0) {
        HaNoiTower(Disc-1,pos,free,des);
        a+= pos.toString() + des.toString();
        HaNoiTower(Disc-1,free,des,pos);
    }
}

function DrawDisc(number,x,y){
    ctx.save();
    const h = 60;
    const w= h +(number)*12 +50;
    const r = h/2;
    const left = x - w/2, 
    right = x + w/2, 
    top = y - r, 
    bottom = y + r;
    
    
    ctx.beginPath();
    ctx.moveTo(left+r,top);
    ctx.lineTo(right-r,top);
    ctx.arc(right-r,y,r,-Math.PI/2,Math.PI/2,false);
    ctx.lineTo(left+r,bottom);
    ctx.strokeStyle='black';
    ctx.lineWidth=3;
    ctx.stroke();
    
    ctx.fillStyle = color[number-1];
    ctx.fill();
    
    ctx.beginPath();
    
    ctx.arc(left+r,y,r,-Math.PI/2,Math.PI/2,true);
    ctx.strokeStyle='black';
    ctx.lineWidth=3;
    ctx.stroke();
    
    ctx.fillStyle = color[number-1];
    ctx.fill();
    
    
    ctx.restore();
}

function DrawDes(number,pos){
    ctx.save();
    
    ctx.beginPath();
    ctx.moveTo(pos+width/16,height);
    ctx.lineTo(pos+width/16,height-30);
    ctx.lineTo(pos+width/3-width/16,height-30);
    ctx.lineTo(pos+width/3- width/16,height);
    
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = 'brown';
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(pos+width/6-15,height-30);
    ctx.lineTo(pos+width/6-15,height-number*60-60);
    ctx.lineTo(pos+width/6+15,height-number*60-60);
    ctx.lineTo(pos+width/6+15,height-30);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = 'brown';
    ctx.fill();
    
    ctx.restore();
}

let timer;

function startBut(){
    let selected = document.querySelector('input[name="Disc"]:checked');
    resetBut();
    HaNoiTower(selected.value,1,3,2);
    let i = 0;
    timer = setInterval(() =>{
        ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        let pos = parseInt( a[i]);
        let des = parseInt(a[i+1]);
        let disc = col[pos-1].pop();
        col[des-1].push(disc);
        for(let i = 0 ; i < 3;i++){
            DrawDes(selected.value,i*width/3);
        }
        for(let i = 0 ; i < 3;i++){
            for(let j = 0 ; j < col[i].length;j++){
                DrawDisc(col[i][j],width/6+i*width/3,height-60-j*60);
            }
        }
        i+=2;
        if(i >= a.length-1) clearInterval(timer);
        step++;
        stepText.innerText = `step : ${step}`;
    },1000);
}

function resetBut(){
    a= "";
    let selected = document.querySelector('input[name="Disc"]:checked');
    for(let i = 0 ; i <3;i++){
        col[i]= [];
    }
    for(let i = selected.value;i >0;i--){
        col[0].push(i);
    }
    ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    for(let i = 0 ; i < 3;i++){
            DrawDes(selected.value,i*width/3);
        }
        for(let i = 0 ; i < 3;i++){
            for(let j = 0 ; j < col[i].length;j++){
                DrawDisc(col[i][j],width/6+i*width/3,height-60-j*60);
            }
        }
    step = 0;
    clearInterval(timer);
}


