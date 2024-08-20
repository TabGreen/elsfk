const blockSize = 25;//单个方块的大小25像素
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
];const shapes = [
    [
        [1, 1, 1, 1]
    ],[
        [0, 0, 1],
        [1, 1, 1]
    ],[
        [1, 0, 0],
        [1, 1, 1]
    ],[
        [1, 1],
        [1, 1]
    ],[
        [0, 1, 1],
        [1, 1, 0]
    ],[
        [0, 1, 0],
        [1, 1, 1]
    ],[
        [1, 1, 0],
        [0, 1, 1]
    ]];
const borderOfBlock = 0.2;//边框方块的百分比
const colorChange = [0.6,0.7,-0.5,-0.6];//方块周围的梯形颜色增减值的数组

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
}
function drawBlock(ctx,x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect((x+borderOfBlock) * blockSize, (y+borderOfBlock) * blockSize, blockSize *(1-borderOfBlock*2), blockSize * (1-borderOfBlock*2));
    ctx.strokeStyle = color;
    ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
    //绘制第一个梯形
    ctx.beginPath();
    ctx.moveTo(x * blockSize, y * blockSize);
    ctx.lineTo((x+1)* blockSize, y * blockSize);
    ctx.lineTo((x+1-borderOfBlock) * blockSize, (y+borderOfBlock) * blockSize);
    ctx.lineTo((x+borderOfBlock) * blockSize, (y+borderOfBlock) * blockSize);
    ctx.closePath();
    ctx.strokeStyle = adjustColorBrightness(color,colorChange[0]);
    ctx.fillStyle = adjustColorBrightness(color,colorChange[0]);
    ctx.fill();
    ctx.stroke();
    //绘制第二个梯形
    ctx.beginPath();
    ctx.moveTo((x+1)* blockSize, y * blockSize);
    ctx.lineTo((x+1)* blockSize, (y+1) * blockSize);
    ctx.lineTo((x+1-borderOfBlock) * blockSize, (y+1-borderOfBlock) * blockSize);
    ctx.lineTo((x+1-borderOfBlock) * blockSize, (y+borderOfBlock) * blockSize);
    ctx.closePath();
    ctx.strokeStyle = adjustColorBrightness(color,colorChange[1]);
    ctx.fillStyle = adjustColorBrightness(color,colorChange[1]);
    ctx.fill();
    ctx.stroke();
    //绘制第三个梯形
    ctx.beginPath();
    ctx.moveTo(x* blockSize, (y+1) * blockSize);
    ctx.lineTo((x+1)* blockSize, (y+1) * blockSize);
    ctx.lineTo((x+1-borderOfBlock) * blockSize, (y+1-borderOfBlock) * blockSize);
    ctx.lineTo((x+borderOfBlock) * blockSize, (y+1-borderOfBlock) * blockSize);
    ctx.closePath();
    ctx.strokeStyle = adjustColorBrightness(color,colorChange[2]);
    ctx.fillStyle = adjustColorBrightness(color,colorChange[2]);
    ctx.fill();
    ctx.stroke();
    //绘制第四个梯形
    ctx.beginPath();
    ctx.moveTo(x* blockSize, y * blockSize);
    ctx.lineTo(x * blockSize, (y+1) * blockSize);
    ctx.lineTo((x+borderOfBlock) * blockSize, (y+1-borderOfBlock) * blockSize);
    ctx.lineTo((x+borderOfBlock) * blockSize, (y+borderOfBlock) * blockSize);
    ctx.closePath();
    ctx.strokeStyle = adjustColorBrightness(color,colorChange[3]);
    ctx.fillStyle = adjustColorBrightness(color,colorChange[3]);
    ctx.fill();
    ctx.stroke();
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
function drawShape(ctx, shapeID, x, y, color, rotation = 0) {
    const shape = shapes[shapeID];
    const height = shape.length;
    const width = shape[0].length;

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let newX, newY;

            // 根据旋转角度计算新的位置
            switch (rotation) {
                case 0: // 无旋转
                    newX = x + j;
                    newY = y + i;
                    break;
                case 1: // 顺时针旋转90度
                    newX = x + height - 1 - i;
                    newY = y + j;
                    break;
                case 2: // 旋转180度
                    newX = x + width - 1 - j;
                    newY = y + height - 1 - i;
                    break;
                case 3: // 逆时针旋转90度
                    newX = x + i;
                    newY = y + width - 1 - j;
                    break;
            }

            if (shape[i % height][j % width] === 1) {
                drawBlock(ctx, newX, newY, color);
            }
        }
    }
}
drawShape(gameCTX,1,1,1,colors[1],3);