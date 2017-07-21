var _filter = ['/muse/elements/alpha_relative','/muse/elements/beta_relative']


function setup() {
  // create canvas
  var c = createCanvas(710, 400);
  background(100);
  // Add an event for when a file is dropped onto the canvas
  c.drop(gotFile);
}

function draw() {
  fill(255);
  noStroke();
  textSize(18);
  textAlign(CENTER);
  text('Drag and drop csv file with muse data', width/2, height/2);
  noLoop();
}

function gotFile(file) {
  // If it's an image file
 /* if (file.type === 'image') {
    // Create an image DOM element but don't show it
    var img = createImg(file.data).hide();
    // Draw the image onto the canvas
    image(img, 0, 0, width, height);
  } else {
    println('Not an image file!');
  }*/

  console.log('file',file);
 console.log('gotFile. File type: ' + file.type);

 var newname = split(file.name,'.')[0] + '_filtered.txt';

  if(file.type === 'text'){
  	console.log('we have a text file, looks good');
  //	console.log(file.data);
    var lines =  parseData(file.data);
    saveStrings(lines,newname);
  }


 
}

function parseData(data){
  console.log('parseData');
  var lines = data.split('\n');

  //remove last line 
  lines = lines.slice(0,lines.length-1);
  var alphas = filterData(lines,_filter[0]);
  var betas = filterData(lines,_filter[1]);
  console.log(betas);

  //try to save memory
  lines = null;

  //make lines as such
  //alpha_relative_0 alpha_relative_1 alpha_relative_2 alpha_relative_3 beta_relative_0 beta_relative_1 beta_relative_2 beta_relative_3

  //make sure that same length
  var len = min(alphas.length,betas.length);
  console.log('len ' + len);

  alphas = alphas.slice(0,len);
  betas = betas.slice(0,len);

  var newlines = [];
  var firstline = 'time,category,left ear,left front,right front,right ear';
  newlines.push(firstline);

  for(var i=0; i<len; i++){

    if(i % 100 == 0){
      console.log('creating line ' + i);
    }

    var _alphatokens = split(alphas[i],',');
    var _betatokens = split(betas[i],',');
    _alphatokens = _alphatokens.map(function(s){
      return trim(s);
    });

    _betatokens = _betatokens.map(function(s){
      return trim(s);
    });

    //remove timestamp
    var alphavals = _alphatokens.slice(0);
    var betavals = _betatokens.slice(0);

    var alphastring = alphavals.join(',');
    var betastring = betavals.join(',');

    newlines.push(alphastring);
    newlines.push(betastring);

  }

  return newlines;

 /* var firstline = 'alpha_relative_0,alpha_relative_1,alpha_relative_2,alpha_relative_3,beta_relative_0,beta_relative_1,beta_relative_2,beta_relative_3';
  newlines.push(firstline);
  for(var i=0; i<len; i++){

    if(i % 100 == 0){
      console.log('creating line ' + i);
    }

    var _alphatokens = split(alphas[i],',');
    var _betatokens = split(betas[i],',');

    _alphatokens = _alphatokens.map(function(s){
      return trim(s);
    });

    _betatokens = _betatokens.map(function(s){
      return trim(s);
    });

    var alphavals = _alphatokens.slice(2);
    var betavals = _alphatokens.slice(2);

    var allvals = alphavals.concat(betavals);
    var linestring = allvals.join(',');
    console.log('linestring',linestring);
    newlines.push(linestring);
  } */
  return newlines;
}

function filterData(lines,filt){
  console.log('filterData');
  return lines.filter(function(l,i){
      if(i%100 == 0){
        console.log('filter line ' + i);
      }
     var tokens = l.split(',');
     var type = tokens[1].trim();
    return filt === type;
  });
}