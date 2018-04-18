const ResizeSensor = require('css-element-queries/src/ResizeSensor');

let needsInit = true;
let styleLNF = null;
const nodes = [];

const init = () => {
  // Create styleSheet
  if (needsInit) {
    needsInit = false;
    const head = document.head || document.getElementsByTagName('head')[0];
    styleLNF = document.createElement('style');
    styleLNF.type = 'text/css';
    styleLNF.title = 'LayerandFlow';
    head.appendChild(styleLNF);
  }
};

const lnf = () => {
  init();
  return 'LAYERANDFLOW';
};

const update = (css) => {
  console.log("Lets Ride");
  const ocss = 'h1 { background: blue; } h2 {color: red}';
  if (styleLNF.firstChild) {
    styleLNF.removeChild(styleLNF.firstChild);
  }
  styleLNF.appendChild(document.createTextNode(ocss));
};

export { init, lnf, update };
