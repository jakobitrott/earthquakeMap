//zoom levels and width height variables
var mapimg;



var centreLatitude = 0;
var centreLongitude = 0;

var latitude = 31.2304;
var longitude = 121.4737;

var zoom = 1;
var earthquake;

function preload(){
mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoiamFrb2Jpc2FhYyIsImEiOiJjajZnaWpwNmQwOXl2MzNwMDFhOXd1a3AzIn0.EbtuVJcN38PNAimpv25qzg');
earthquake = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv');
}


//web mercator formula
function webMercatorX(longitude){
  longitude = radians(longitude);
var a = (256/PI) * pow(2,zoom);
var b = longitude + PI;

return a*b;
}

function webMercatorY(latitude){
  latitude = radians(latitude);
var a = (256/PI) * pow(2,zoom);
var b = tan(PI/4 + latitude/2);
var c = PI - log(b);

return a*c;
}


function setup() {
  createCanvas(1024,512);
  translate(width/2, height/2); //origin centre of screen
  imageMode(CENTER);
  image(mapimg,0,0);

  var centreX = webMercatorX(centreLongitude);
  var centreY = webMercatorY(centreLatitude);

  for(var i = 0; i < earthquake.length; i++){
    var data = earthquake[i].split(/,/);
    console.log(data);
    var latitude = data[1];
    var longitude = data[2];
    var magnitude = data[4];
    var x = webMercatorX(longitude) - centreX;
    var y = webMercatorY(latitude) - centreY;

    magnitude = pow( 10, magnitude / 2 );

    var magnitudeMax = sqrt(pow(10,10));

    var diameter = map(magnitude,0,magnitudeMax,0,1000);

  fill(204,102,0);
  ellipse(x,y,diameter,diameter);

  }



}
