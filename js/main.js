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

    // section titles

    const sectSearch = document.getElementsByClassName('secTitle');
    for( var i=0; i<sectSearch.length; i++){
        //sectSearch[i].style.color = tColor;
        document.getElementsByClassName('navLink')[i].style.color = isColorDark( selectedScheme.colors[1] ) === 'dark' ? 'white' : 'black';
        createSVG( sectSearch[i] ); 
    } 
    drawRect();
   
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

function drawRect(){
    const backDrop  = document.getElementById("backDrop");
    const tri1 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const tri2 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const tri3 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const tri4 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const masterSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    masterSvg.appendChild(tri1);
    masterSvg.appendChild(tri2);
    masterSvg.appendChild(tri3);
    masterSvg.appendChild(tri4);

    tri1.setAttribute('fill', selectedScheme.colors[1]);
    tri2.setAttribute('fill', selectedScheme.colors[2]);
    tri3.setAttribute('fill', selectedScheme.colors[3]);
    tri4.setAttribute('fill', selectedScheme.colors[4]);

    tri1.setAttribute('fill-opacity', 0.2);
    tri2.setAttribute('fill-opacity', 0.2);
    tri3.setAttribute('fill-opacity', 0.2);
    tri4.setAttribute('fill-opacity', 0.2);



    var centerPt = [backDrop.clientWidth /2, backDrop.clientHeight /2];
    const boxW = backDrop.clientWidth;
    const boxH = backDrop.clientHeight;

    tri1.setAttribute('points' , `0,0 ${centerPt[0]},${centerPt[1]} ${boxW},0`);
    tri2.setAttribute('points' , `${boxW},0 ${centerPt[0]},${centerPt[1]} ${boxW},${boxH}`);
    tri3.setAttribute('points' , `${boxW},${boxH} ${centerPt[0]},${centerPt[1]} 0,${boxH}`);
    tri4.setAttribute('points' , `0,${boxH} ${centerPt[0]},${centerPt[1]} 0,0`);

    backDrop.style.backgroundImage = svgEncode( masterSvg );
    //console.log('points' , `0,0 ${centerPt[0]},${centerPt[1]} ${boxW},${boxH}`);
}


const targetFPS = 30;
const frameDuration = 1000 / targetFPS;
let lastFrameTime = 0;

function mainLoop(timestamp) {
  if (timestamp - lastFrameTime >= frameDuration) {
    // Your animation logic goes here
    drawRect();
    // Update last frame time
    lastFrameTime = timestamp;
  }

  // Request the next frame
  requestAnimationFrame(mainLoop);
}

// Start the animation loop
//requestAnimationFrame(mainLoop);