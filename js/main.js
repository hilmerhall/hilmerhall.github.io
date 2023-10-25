var colorSchemes;
var selectedScheme;

function loadColors(){
    fetch('js/colors.json')
    .then(response => response.json())
    .then(data => {
        // Access and use the JSON data.
        colorSchemes = data.colorSchemes;
        selectedScheme = colorSchemes[Math.floor( Math.random() * (colorSchemes.length-1) )];
/*      const colorSchemesContainer = document.getElementById('color-schemes-container');

        colorSchemes.forEach((scheme, index) => {
            const schemeDiv = document.createElement('div');
            console.log('adding color - ', index + 1, ' - ', scheme.name);
            schemeDiv.innerHTML = `
                <p>Scheme ${index + 1}: ${scheme.name}</p>
                <p>Colors: ${scheme.colors.join(', ')}</p>
                <hr>
            `;
            colorSchemesContainer.appendChild(schemeDiv);
        }); */

    
        colorize();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        selectedScheme = {
            "name": "Golden Sunset",
            "colors": ["#D0AC32", "#FFD700", "#FFA500", "#FF5733", "#6B4226"]
        };
        colorize();
    });

}
function isColorDark( hexColor) {
    // Remove the "#" symbol if present
    hexColor = hexColor.replace(/^#/, '');

    // Convert the hex color to RGB components
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);

    // Calculate the relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Use a threshold to determine if the color is dark or light
    const threshold = 0.6; // You can adjust this threshold as needed

    return luminance <= threshold ? 'dark' : 'light';
}
function lightenHexColor(hex, percent) {
    // Remove the # symbol if it's present

    hex = hex.replace(/^#/, '');
  
    // Parse the hex value into its RGB components
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
  
    // Calculate the new RGB values by adding a percentage of white
    const newR = Math.min(255, r + (255 - r) * (percent / 100));
    const newG = Math.min(255, g + (255 - g) * (percent / 100));
    const newB = Math.min(255, b + (255 - b) * (percent / 100));
  
    // Convert the new RGB values back to a hex color
    const newHex = `#${Math.round(newR).toString(16).padStart(2, '0')}${Math.round(newG).toString(16).padStart(2, '0')}${Math.round(newB).toString(16).padStart(2, '0')}`;
  
    return newHex;
  }
function colorize(){
    const schemeDiv = document.getElementsByClassName("scheme")[0];
    //const themeName = themeDiv.querySelector("p");
    schemeDiv.querySelector("p").textContent = "Theme : " + selectedScheme.name;
    //console.log("theme", themeName.textContent);

    const tColor = isColorDark( selectedScheme.colors[0] ) === 'dark' ? 'white' : 'black';
    // head and nav
    document.getElementsByClassName('nameTitle')[0].style.backgroundColor = selectedScheme.colors[0];
    document.getElementsByClassName('nameTitle')[0].style.color = tColor;
    document.getElementsByClassName('navBar')[0].style.backgroundColor = selectedScheme.colors[1];

    // -background-
    createBackground();

    // section titles
    const sectSearch = document.getElementsByClassName('secTitle');
    for( var i=0; i<sectSearch.length; i++){
        //sectSearch[i].style.color = tColor;
        document.getElementsByClassName('navLink')[i].style.color = isColorDark( selectedScheme.colors[1] ) === 'dark' ? 'white' : 'black';
        createSVG( sectSearch[i] ); 
    } 
 
   
    // Nav links
    
/*     const linkSearch = document.getElementsByClassName('secTitle');
    for( var i=0; i<linkSearch.length; i++){
        document.getElementsByClassName('navLink')[i].style.color = tColor;
    }  */
   
    
}
function handleMediaQueryChange(mediaQuery) {
    if (mediaQuery.matches) {
       // console.log('Media query condition met. Perform action here.');
    } else {
       // console.log('Media query condition not met. Revert or clean up here.');
    }
    const sectSearch = document.getElementsByClassName('secTitle');
    for( var i=0; i<sectSearch.length; i++){
        createSVG( sectSearch[i] ); 
    } 
}

// changes in the@ media query state
const mediaQuery = window.matchMedia('(max-width: 768px)');
handleMediaQueryChange(mediaQuery);

mediaQuery.addEventListener('change', function (event) {
    handleMediaQueryChange(event.target);
});


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
    //polygon.setAttribute('fill-opacity', 0.8);
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
function svgEncode( svg ){
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgDataUri = 'data:image/svg+xml,' + encodeURIComponent(svgData);

    return `url("${svgDataUri}")`;
};
// background Anim Sequence

var rect1Array = [];
var rect2Array = [];
const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
function createBackground(){
    const backDrop  = document.getElementById("background");

    const layer1 = document.getElementById("layer1");
    layer1.style.filter = "drop-shadow(4px 4px 2px rgba(0, 0, 0, 0.25)";
    const boxCount = 15;
    let distY = 0;
    for( let i=0; distY < (backDrop.clientHeight +100); i++){
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        
        let newWidth =  Math.floor( Math.random()*150 + 350 );
        let newHeight = Math.floor(Math.random()*100 + 60);
        
        let newX = Math.floor(Math.random() * 80 - 40);
        newX = newX < 0 ? newX : backDrop.clientWidth - newWidth + newX;
        
        let newY = distY + Math.floor(Math.random()*80 + 10);
        
        let color = lightenHexColor( selectedScheme.colors[Math.floor(Math.random()*selectedScheme.colors.length)] , 80);
        rect.setAttribute("id","box"+i);
        rect.setAttribute("x", newX)
        rect.setAttribute("y", newY)
        rect.setAttribute("width", newWidth);
        rect.setAttribute("height", newHeight);
        rect.setAttribute("fill", color);
        rect.setAttribute('fill-opacity', 0.9);
        rect.setAttribute('mySpeed', Math.floor(Math.random()*4) + 1);
        svg1.appendChild(rect);
        distY = newY + newHeight;
        rect1Array[i] = rect;
    }

    layer1.style.backgroundImage = svgEncode( svg1 );

    // secondlayer
    const layer2 = document.getElementById("layer2");
    layer2.style.filter = "drop-shadow(8px 8px 4px rgba(0, 0, 0, 0.25)";

    distY = 0;
    for( let i=0; distY < (backDrop.clientHeight +100); i++){
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        
        let newWidth =  Math.floor( Math.random()*50 + 100 );
        let newHeight = Math.floor( Math.random()*60 + 40 );
        
        let newX = Math.floor(Math.random() * 80 - 40);
        newX = newX > 0 ? newX : backDrop.clientWidth - newWidth + newX;
        
        let newY = distY + Math.floor(Math.random()*80 + 10);
        
        let color = lightenHexColor( selectedScheme.colors[Math.floor(Math.random()*selectedScheme.colors.length)] , 90);
        //rect.setAttribute("id","box"+i);
        rect.setAttribute("x", newX)
        rect.setAttribute("y", newY)
        rect.setAttribute("width", newWidth);
        rect.setAttribute("height", newHeight);
        rect.setAttribute("fill", color);
        rect.setAttribute('fill-opacity', 0.9);
        rect.setAttribute('mySpeed', ((Math.random()*6) + 2));
        svg2.appendChild(rect);
        distY = newY + newHeight;
        rect2Array[i] = rect;
    }

    layer2.style.backgroundImage = svgEncode( svg2);

    // Start the animation loop
    requestAnimationFrame(mainLoop);        
};

function animateRect(){
    rect1Array.forEach((rect) => {
        let newY = rect.getAttribute('y') - (rect.getAttribute('mySpeed')/12);
        if(newY + rect.getAttribute('height') < -10){
            newY = backDrop.clientHeight+100;
        }
        rect.setAttribute('y', newY);
        layer1.style.backgroundImage = svgEncode( svg1 );
    });

    rect2Array.forEach((rect) => {
        let newY = rect.getAttribute('y') - (rect.getAttribute('mySpeed')/5);

        if(newY + rect.getAttribute('height') < -10){
            newY = backDrop.clientHeight+100;
        }
        rect.setAttribute('y', newY);
        layer2.style.backgroundImage = svgEncode( svg2 );
    });

};


const targetFPS = 24;
const frameDuration = 1000 / targetFPS;
let lastFrameTime = 0;
let startTime = 0;
function mainLoop(timestamp) {

  // Initialize the start time on the first frame
  if (startTime === 0) {
    startTime = timestamp;
  }
  if (timestamp - startTime >= 10000) {
    // Stop the animation after 1 minute (60,000 milliseconds)
    return;
  }

  if (timestamp - lastFrameTime >= frameDuration) {
    // Your animation logic goes here
    animateRect();
    // Update last frame time
    lastFrameTime = timestamp;
  }

  // Request the next frame
  requestAnimationFrame(mainLoop);
}

