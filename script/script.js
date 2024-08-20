const blockSize = 25;//单个方块的大小25像素
const heigh = 20;//y轴方向方块个数最多20个
const width = 10;//x轴方向方块个数最多10个

var gameCVS = document.getElementById("gameCVS");
var gameCTX = gameCVS.getContext("2d");

var bufferCVS = document.createElement("canvas");
var bufferCTX = bufferCVS.getContext("2d");

function setGameCVSSize(){
    gameCVS.width = blockSize * width;
    gameCVS.height = blockSize * heigh;
    bufferCVS.width = gameCVS.width;
    bufferCVS.height = gameCVS.height;
}setGameCVSSize();