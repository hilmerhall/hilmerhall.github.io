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
};
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
  function svgEncode( svg ){
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgDataUri = 'data:image/svg+xml,' + encodeURIComponent(svgData);

    return `url("${svgDataUri}")`;
};
function randomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
};
function findNumberInRange(number, a, b, c, d) {
    return ((number - a) * (d - c)) / (b - a) + c;
};



