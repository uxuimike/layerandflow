const ResizeSensor = require('css-element-queries/src/ResizeSensor');
const uid = require('uid');

let needsInit = true;
let styleLNF = null;
const pins = {};

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
  Object.keys(pins).forEach((key) => {
    Object.keys(pins[key]).forEach((pinKey) => {
      let thisPin = {};
      let thisPinPoint = {};
      let linkedPin = {};
      try {
        thisPin = pins[key];
        thisPinPoint = thisPin[pinKey];
        linkedPin = pins[thisPinPoint.pin];
        if (linkedPin[pinKey]) {
          console.log('The value', key, pinKey, linkedPin[pinKey].value);
          // thisPinPoint.value = linkedPin[pinKey].value;
        }
      } catch (error) {
        thisPinPoint.value = '0px';
        console.log(key);
      }
    });
  });
  console.log('The pins', pins);
};

const calculatePin = () => {

}

const lnf = (obj) => {
  init();
  let key = '';
  const formatedObj = {};
  // Set Element ID
  if (!('id' in obj)) {
    console.error('LNF elements require an id to be supplied');
    key = uid();
  } else {
    key = obj.id;
  }

  // TODO For Object.keys and vlidate in fucntion
  // Set Top
  if (typeof obj.top === 'object') {
    formatedObj.top = {
      pin: obj.top.pin,
      point: obj.top.point,
      offset: obj.top.offset,
      value: null,
    };
  }

  // Set Right
  if (typeof obj.left === 'object') {
    formatedObj.left = {
      pin: obj.left.pin,
      point: obj.left.point,
      offset: obj.left.offset,
      value: null,
    };
  }
  pins[key] = formatedObj;
  update();
  return obj.id;
};


export { init, lnf, update };
