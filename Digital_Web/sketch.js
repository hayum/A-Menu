var serial;
var portName='/dev/cu.usbmodem1421';
var inData=0;

var capture;

var gif_food=[]; 
var pageNum=-1;

function preload(){

  gif_food[0] = createImg("assets/Smell.gif"); 
  gif_food[1] = createImg("assets/Drink.gif"); 
  gif_food[2] = createImg("assets/Food.gif"); 

  for(var i=0; i<3; i++){
      gif_food[i].position(0,0);
      gif_food[i].size(windowWidth, windowHeight);
  }	
}

function setup() {
  serial = new p5.SerialPort(); 
  // serial.on('list', printList); 
  // serial.list(); 
  serial.open(portName); 
  serial.on('data', serialEvent);     
  
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide();

}


function serialEvent() {
  inData = Number(serial.read());
 }


function draw() {
	background(220);
	image(capture, 0, 0,windowWidth, windowHeight);

	pageNum=inData;
	// console.log("pageNum"+ pageNum);

	for(var i=0; i<3; i++){
		if(i==pageNum){
      		gif_food[i].show();
  		}
  		else{
  			gif_food[i].hide();
  		}
    }	
	
}

/*------Use mouse for testing------*/
function mousePressed() {
	if(pageNum<1){
		pageNum++;
	}
	else{
		pageNum=-1;
	}
	console.log(pageNum);
}


// function printList(portList) {
//  for (var i = 0; i < portList.length; i++) {
//     console.log(i + " " + portList[i]);
//  }
// }