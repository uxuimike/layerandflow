const ResizeSensor = require('css-element-queries/src/ResizeSensor');
const uid = require('uid');

let needsInit = true;
let styleLNF = null;
const pins = [];

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

const updateTest = () => {
  console.log("Lets Ride");
  const ocss = 'h1 { background: blue; } h2 {color: red}';
  if (styleLNF.firstChild) {
    styleLNF.removeChild(styleLNF.firstChild);
  }
  styleLNF.appendChild(document.createTextNode(ocss));
};

const update = () => {
  console.log('Update');
  // Loop through each pin's anchor points
  pins.forEach((pin) => {
    pin.anchorPoints.forEach((anchorPoint) => {
      const pinTo = pins.find(p1 => p1.id === anchorPoint.pinTo);
      // If we find the pin it is pinned to, check to see if it has a
      // value for the pinned to anchor point refrenced
      if (pinTo) {
        const pinToAnchorPoint = pinTo.anchorPoints.find(p2 =>
          p2.anchorPoint === anchorPoint.pinToAnchorPoint);
        // If pinToAnchorPoint has value assign it to anchorPoint value + offset
        // otherwise calculate it
        if (pinToAnchorPoint) {
          anchorPoint.value = pinToAnchorPoint.value;
        }
      }
    });
  });
  console.log(pins);
};

const lnf = (obj) => {
  init();
  let id = '';
  const formatedObj = {};
  // Set Element ID
  if (!('id' in obj)) {
    console.error('LNF elements require an id to be supplied');
    id = uid();
  } else {
    id = obj.id;
  }
  formatedObj.id = id;

  // TODO For Object.keys and vlidate in fucntion
  formatedObj.anchorPoints = [];
  // Set Top
  if (typeof obj.top === 'objects') {
    formatedObj.anchorPoints.push({
      anchorPoint: 'top',
      pinTo: obj.top.pinTo,
      pinToAnchorPoint: obj.top.pinToAnchorPoint,
      offset: obj.top.offset,
      value: null,
    });
  } else if (obj.width) {
    console.log(obj.width);
  }

  // Set Right
  if (typeof obj.left === 'object') {
    formatedObj.anchorPoints.push({
      anchorPoint: 'left',
      pinTo: obj.left.pinTo,
      pinToAnchorPoint: obj.left.pinToAnchorPoint,
      offset: obj.left.offset,
      value: null,
    });
  }
  pins.push(formatedObj);
  update();
  return String(obj.id);
};


export { init, lnf, update };
