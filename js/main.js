
var colorSchemes;
var selectedScheme;


function initColorScheme() {
    backDrop = document.getElementById("background");

    selectedScheme = colorObj.colorSchemes[randomIndex(colorObj.colorSchemes)];
    const background = document.getElementById("background");
    const themeName = document.querySelector(".scheme p");

    themeName.textContent = `Theme: ${selectedScheme.name}`;

    const [backgroundColour, foregroundColour] = selectedScheme.colors;
    document.querySelector(".nameTitle").style.setProperty("--background", backgroundColour);
    document.querySelector(".nameTitle").style.setProperty("--text", isColorDark(backgroundColour) === "dark" ? "white" : "black");
    document.querySelector(".navBar").style.setProperty("--background", foregroundColour);

    createBackground();

    const sectionTitles = document.querySelectorAll(".secTitle");
    sectionTitles.forEach((section, index) => {
        section.style.setProperty("--text", isColorDark(foregroundColour) === "dark" ? "white" : "black");
        createSVG(section);
    });
}
function createProjectItems() {
  const projectCount = 3;
  const container = document.querySelector('.portfolio-item');
  for (let i = 2; i < projectCount; i++) {
    const item = document.createElement('div');
    item.className = 'portfolio-item';
    const img = document.createElement('img');
    img.src = `project${i}.jpg`;
    img.alt = `Project ${i}`;
    const p = document.createElement('p');
    p.textContent = `Description of Project ${i}`;
    item.append(img, p);
    container.append(item);
  }
}
/* function handleMediaQueryChange(mediaQuery) {
    console.log('changed media Query');
    if (mediaQuery.matches) {
       // console.log('Media query condition met. Perform action here.');
 
    } else {
       // console.log('Media query condition not met. Revert or clean up here.');
    }
    createBackground();
    const sectSearch = document.getElementsByClassName('secTitle');
    for( var i=0; i<sectSearch.length; i++){
        createSVG( sectSearch[i] ); 
    } 

}

// changes in the@ media query state
const mediaQuery = window.matchMedia('(max-width: 768px)can I do ');
//handleMediaQueryChange(mediaQuery);
mediaQuery.addEventListener('change', function (event) {
    handleMediaQueryChange(event.target);
}); */
// Initialize the previous window width
let previousWidth = window.innerWidth;
window.addEventListener('resize', function() {
  
  const currentWidth = window.innerWidth;
  if (Math.abs(currentWidth - previousWidth) > 100) {
    updateBackground();
    previousWidth = currentWidth;
  }
  
});

// Function to perform a specific action
function updateBackground() {
    createBackground();
    const sectSearch = document.getElementsByClassName('secTitle');
    for( var i=0; i<sectSearch.length; i++){
        createSVG( sectSearch[i] ); 
    } 
}

function createSVG( elem ){
    elem.style.backgroundImage = 'none';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', elem.clientWidth);
    svg.setAttribute('height', elem.clientHeight);
    svg.setAttribute('viewBox', 0 + ' ' + 0 + ' ' + elem.clientWidth + ' ' + elem.clientHeight);

    // Define the points for the rectangle
    // top-left corner
    const x1 = 1;
    const y1 = 4;
    // top-right
    const x2 = Math.round(svg.getAttribute('width') -20);
    const y2 = 4;
    // bottom-right
    const x3 = svg.getAttribute('width')-4;
    const y3 = svg.getAttribute('height')-5;
    // bottom-left
    const x4 = 1; // X-coordinate of the bottom-left corner
    const y4 = svg.getAttribute('height')-5; // Y-coordinate of the bottom-left corner

    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`);
    polygon.setAttribute('fill', selectedScheme.colors[2]);
    //polygon.setAttribute('fill-opacity', 0.6);
    polygon.setAttribute('stroke', selectedScheme.colors[0]);
    polygon.setAttribute('stroke-width', '1px');

    svg.appendChild(polygon);
    
    // Set the data URI as a background image for the container
    elem.style.backgroundImage = svgEncode( svg );
    elem.style.backgroundRepeat = 'no-repeat';
    elem.style.backgroundSize = 'auto';

    elem.style.color = isColorDark( selectedScheme.colors[2] ) === 'dark' ? 'white' : 'black';

    // shadow offset - experimaent with depth
    let depth = 5;//Math.floor( Math.random() * 6) + 3;
    elem.style.filter = "drop-shadow(" + depth + "px " + depth + "px 2px rgba(0, 0, 0, 0.25))";
}
// background Anim Sequence
var rect1Array = [];
var canvas;
var ctx;
function createBackground(){
    rect1Array = [];
    canvas = document.getElementById("myCanvas");
    canvas.width = document.getElementById("background").clientWidth;
    canvas.height = document.getElementById("background").clientHeight;
    ctx = canvas.getContext("2d"); 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let zValues = [];
    for (let j = 0; j < 2; j++) {
        let distY = 0;
        for( let i=0; distY < (backDrop.clientHeight +200); i++){
            let rect = {};
            rect.width =  Math.floor( Math.random()* 120 + (backDrop.clientWidth *.4) );
            rect.height = Math.floor( Math.random()*150 + 80);
            rect.x = Math.floor(Math.random() * (((backDrop.clientWidth) -  rect.width) + Math.floor(Math.random()*100 - 50) ));
            rect.y = distY + Math.floor(Math.random()*80 + 10);
            let newZ;
            do {
                newZ = Math.floor(Math.random()*80 + 1);
            } while (zValues.includes(newZ));
            zValues.push(newZ);
            rect.z = newZ;
            // Speed Ranges
            if (rect.z < 33) {
                rect.speedY = (Math.random() * .2) + .2 *.4;
            } else if (rect.z > 32 && rect.z < 66) {
                // 2nd range 
                rect.speedY = (Math.random() * .6) + .6 * .55;
            } else {
                // 3rd range 
                rect.speedY = (Math.random() * 1.1) + 1.2 *.7;
            }
            //Washes out Color a little for background
            rect.color = lightenHexColor( selectedScheme.colors[randomIndex(selectedScheme.colors)] , 70);
            rect.shadowColor = "rgba(0, 0, 0, 0.2)";
            rect.shadowBlur = 2;
            const blurDist =  findNumberInRange(rect.z, 1, 100, 2, 15);
            rect.shadowOffsetX = blurDist;
            rect.shadowOffsetY = blurDist;;
            ctx.fillStyle = rect.color;
            distY = rect.y + rect.height;
            rect1Array.push(rect);
        }
    }
    // now sort the array by z-index
    rect1Array.sort(function(a, b){
        return a.z - b.z;
    });

    drawRect();
   //requestAnimationFrame(mainLoop);        
};
function drawRect(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const rect of rect1Array) {
      ctx.fillStyle = rect.color;
  
      // Apply unique shadow settings for each rectangle
      ctx.shadowColor = rect.shadowColor;
      ctx.shadowBlur = rect.shadowBlur;
      ctx.shadowOffsetX = rect.shadowOffsetX;
      ctx.shadowOffsetY = rect.shadowOffsetY;
  
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  
      // Reset shadow settings to avoid affecting other elements
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
};

function animateRect(){
    for (const rect of rect1Array) {
        rect.y -= rect.speedY;
    
        // Optional: Check for boundary and reverse direction
        if ( (rect.y + rect.height) < 0 ) {
          rect.y = canvas.height + 100;
        }
    }
    drawRect();
};
let frameIndex = 0;
const frameCount = 100; // Total number of frames
const frameInterval = 1000 / 30; // 30 FPS (1000ms / 30)
function updateFrame() {
    // Update the frame logic here
    frameIndex++;
    animateRect();
    if (frameIndex >= frameCount) {
        frameIndex = 0;
    }
}

setInterval(updateFrame, frameInterval);