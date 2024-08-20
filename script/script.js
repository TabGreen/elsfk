const blockSize = 250;//单个方块的大小25像素
const heigh = 20;//y轴方向方块个数最多20个
const width = 10;//x轴方向方块个数最多10个
const colors = [
    "#00FFFF",
    "#FFFF00",
    "#FF8C00",
    "#00FF00",
    "#FF0000",
    "#0000FF",
    "#800080"
];const borderOfBlock = 0.2;//边框方块的百分比
const colorChange = [0.6,0.05,0.05];//方块周围的梯形颜色增减值的数组
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var gameCVS = document.getElementsByTagName('canvas')[0];
var gameCTX = gameCVS.getContext("2d");

var bufferCVS = document.createElement("canvas");
var bufferCTX = bufferCVS.getContext("2d");

function setGameCVSSize(){
    gameCVS.width = blockSize * width;
    gameCVS.height = blockSize * heigh;
    bufferCVS.width = gameCVS.width;
    bufferCVS.height = gameCVS.height;
}setGameCVSSize();

function update(){

}
function drawBlock(ctx,x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    ctx.strokeStyle = color;
    ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
}drawBlock(gameCTX,0,0,colors[0]);
drawBlock(gameCTX,1,0,colors[1]);
function drawBlock(ctx,x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect((x+borderOfBlock) * blockSize, (y+borderOfBlock) * blockSize, blockSize *(1-borderOfBlock*2), blockSize * (1-borderOfBlock*2));
    ctx.strokeStyle = color;
    ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
    //绘制第一个梯形
    gameCTX.beginPath();
    gameCTX.moveTo(x * blockSize, y * blockSize);
    gameCTX.lineTo((x+1)* blockSize, y * blockSize);
    gameCTX.lineTo((x+1-borderOfBlock) * blockSize, (y+borderOfBlock) * blockSize);
    gameCTX.lineTo((x+borderOfBlock) * blockSize, (y+borderOfBlock) * blockSize);
    gameCTX.closePath();
    gameCTX.strokeStyle = adjustColorBrightness(color,colorChange[0]);
    gameCTX.fillStyle = adjustColorBrightness(color,colorChange[0]);
    gameCTX.fill();
    gameCTX.stroke();

}

function adjustColorBrightness(hexColor, percent) {//改变颜色亮度,使方块更灵动
    var r = parseInt(hexColor.substring(1, 3), 16);
    var g = parseInt(hexColor.substring(3, 5), 16);
    var b = parseInt(hexColor.substring(5, 7), 16);
    var color = [r,g,b];
    if(percent > 0){
        for(let i = 0;i<color.length;i++){
            if(color[i]>=255){
                continue;
            }if(color[i]<=0){
                color[i]=Math.floor(255*percent);
                continue;
            }color[i] += color[i] * percent;
            if(color[i]>255){
                color[i]=255;
            }
        }
    }if(percent<0){
        percent = Math.abs(percent);
        for(let i = 0;i<color.length;i++){
            if(color[i]<=0){
                continue;
            }if(color[i]>=255){
                color[i]=Math.floor(255* percent);
                continue;
            }
            color[i] -= color[i] * percent;
            if(color[i]<=0){
                color[i]=0;
            }
        }
    }
    var newColor =   `#${color[0].toString(16).padStart(2, '0')}${color[1].toString(16).padStart(2, '0')}${color[2].toString(16).padStart(2, '0')}`;
    
    return newColor;
}