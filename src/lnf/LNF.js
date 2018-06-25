const ResizeSensor = require('css-element-queries/src/ResizeSensor');
const uid = require('uid');

let needsInit = true;
let styleLNF = null;
let styleString = '';
let cnt = 0;
const pins = {};

const update = () => {
  const theKeys = Object.keys(pins);
  if (theKeys.length === 0) {
    setTimeout(update, 1);
  }
  for (let i = 0; i < theKeys.length; i += 1) {
    // console.log('Update', theKeys.length);
    Object.keys(pins).forEach((pin) => { // eslint-disable-line no-loop-func
      // console.log(needsUpdate,pin, index);
      // Get obj from pins Object
      const obj = pins[pin];
      // If obj does not have a value
      if (!obj.value) {
        // Concatinate to get look up key
        const pinPoint = `${obj.pinTo}${obj.pinToPoint}`;
        if (!obj.pinTo) {
          obj.value = obj.offset;
          // If the object obj is pinned to exsists
        } else if (pins[pinPoint] && pins[pinPoint].value) {
          // Assign the value plus the offset
          obj.value = Number(pins[pinPoint].value) + Number(obj.offset);
        } else {
          obj.value = null;
        }
      }
    });
    cnt += 1;
    console.log(pins, cnt);
  }
  updateCss();
};

const init = () => {
  // Create styleSheet
  if (needsInit) {
    needsInit = false;
    const head = document.head || document.getElementsByTagName('head')[0];
    styleLNF = document.createElement('style');
    styleLNF.type = 'text/css';
    styleLNF.title = 'LayerandFlow';
    head.appendChild(styleLNF);
    update();
  }
};

const updateCss = () => {
  console.log("Lets Ride");
  const ocss = 'h1 { background: blue; } h2 {color: red}';
  if (styleLNF.firstChild) {
    styleLNF.removeChild(styleLNF.firstChild);
  }
  styleLNF.appendChild(document.createTextNode(ocss));
  console.log(pins.length);
  const theKeys = Object.keys(pins);
  if (theKeys.length === 0) {
    setTimeout(update, 1);
  }
  for (let i = 0; i < theKeys.length; i += 1) {
    console.log(theKeys[i]);
  }
};

const lnf = (obj) => {
  init();
  let id = '';

  // Set Element ID
  if (!('id' in obj)) {
    console.error('LNF elements require an id to be supplied');
    id = uid();
  } else {
    id = obj.id;
  }

  // Set Top
  if (typeof obj.top === 'object') {
    pins[`${id}top`] = {
      id,
      point: 'top',
      pinTo: obj.top.pinTo,
      pinToPoint: obj.top.pinToPoint,
      offset: obj.top.offset,
    };
  }

  // Set Left
  if (typeof obj.left === 'object') {
    pins[`${id}left`] = {
      id,
      point: 'left',
      pinTo: obj.left.pinTo,
      pinToPoint: obj.left.pinToPoint,
      offset: obj.left.offset,
    };
  }

  // Set Bottom
  if (typeof obj.bottom === 'object') {
    pins[`${id}bottom`] = {
      id,
      point: 'bottom',
      pinTo: obj.bottom.pinTo,
      pinToPoint: obj.bottom.pinToPoint,
      offset: obj.bottom.offset,
    };
  } else {
    pins[`${id}bottom`] = {
      id,
      point: 'bottom',
      pinTo: id,
      pinToPoint: 'top',
      offset: obj.height,
    };
  }

  // Set Right
  if (typeof obj.right === 'object') {
    pins[`${id}right`] = {
      id,
      point: 'right',
      pinTo: `${obj.right.pinTo}${obj.right.pinToPoint}`,
      offset: obj.right.offset,
    };
  } else {
    pins[`${id}right`] = {
      id,
      point: 'right',
      pinTo: id,
      pinToPoint: 'left',
      offset: obj.width,
    };
  }

  return String(obj.id);
};


export { init, lnf, update };
