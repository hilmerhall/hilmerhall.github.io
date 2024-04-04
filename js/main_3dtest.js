// Scene, camera, renderer
var scene;
var camera;
var renderer;
var colorSchemes;
var selectedScheme = null;

function initPage() {
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
        //createSVG(section);
    });
}function randomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
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

function handleMediaQueryChange(mediaQuery) {
    if (mediaQuery.matches) {
       // console.log('Media query condition met. Perform action here.');

    } else {
       // console.log('Media query condition not met. Revert or clean up here.');
    }
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight); 
    //createBackground();
    const sectSearch = document.getElementsByClassName('secTitle');
    for( var i=0; i<sectSearch.length; i++){
        //createSVG( sectSearch[i] ); 
    } 

}

// changes in the@ media query state
const mediaQuery = window.matchMedia('(max-width: 768px)');
//handleMediaQueryChange(mediaQuery);

mediaQuery.addEventListener('change', function (event) {
    handleMediaQueryChange(event.target);
});

var planes = [];

function createBackground() {
    planes = [];
    var width = window.innerWidth;
    var height = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas') , alpha: true});

    //const light = new THREE.PointLight(0xffffff, 1, 100);
    const light = new THREE.AmbientLight(0xffffff, 1);
    light.position.set(100, 100, 500);
    scene.background = null;
    scene.add(light);

    /*const composer = new THREE.effectComposer(renderer);
    const bokehPass = new THREE.bokehPass(scene, camera, {
        focus: 10.0,
        aperture: 0.1,
        maxblur: 0.01,
    });
    */
    camera.position.set(0, 0, 50); // Move camera back to see scene
    camera.lookAt(0, 0, -5);
    //camera.rotateY(0.01);

   renderer.setSize(width, height);


    let distY = 0;
    //for (let i = 0; distY < (window.innerHeight + 200); i++) {
        let rect = {};
        rect.width = 20;//Math.floor(Math.random() * 150 + (backDrop.clientWidth * .6));
        rect.height = 10; //Math.floor(Math.random() * 150 + 80);

        rect.x = 0;//Math.floor(Math.random() * (((window.innerWidth/2) - rect.width) + Math.floor(Math.random() * 100 - 50)));
        rect.y = 0;//distY + Math.floor(Math.random() * 80 + 10);
        rect.z = Math.floor(Math.random() * -100);
        console.log(rect.z)
        rect.color = lightenHexColor(selectedScheme.colors[Math.floor(Math.random() * selectedScheme.colors.length)], 70);
        rect.speedY = ('mySpeed', (Math.floor(Math.random() * 4) + 1) * .2);
        //ctx.fillStyle = rect.color;
        distY = rect.y + rect.height;
        create3dPlane(rect);
   // }
    renderer.setAnimationLoop(() => {
        animatePlanes();
        renderer.render(scene, camera);


    });
};

function create3dPlane(elem) {
    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(elem.width, elem.height);

    // Increase material opacity to make planes visible
    const material = new THREE.MeshBasicMaterial({
        color: selectedScheme.colors[2],
        side: THREE.DoubleSide,
        opacity: 1,
        transparent: true
    });

    // Create mesh
    const plane = new THREE.Mesh(geometry, material);

    // Position
    plane.position.set(elem.x, elem.y, elem.z);

    // Add to scene
    scene.add(plane);
    planes.push(plane);
}


// background Anim Sequence

function animatePlanes() {
    for (const plane of planes) {
        //plane.position.y -= plane.speedY;

        // Optional: Check for boundary and reverse direction
        if (plane.position.y < -plane.height) {
            plane.position.y = canvas.height + 100;
        }
    }
};


// Render loop

