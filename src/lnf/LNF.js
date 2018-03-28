const ResizeSensor = require('css-element-queries/src/ResizeSensor');

let count = 0;
const nodes = [];

const init = (node) => {
  const elements = document.getElementsByClassName('LNF');
  for (var i = 0; i < elements.length; i++) {
    console.log(elements[i].parentNode);
  }
  console.log(elements);
};


const update = () => {
  //count = count + 1;
  //console.log('Count it out', uid, count, nodes);
};

const updateCSS = (css) => {
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.type = 'text/css';
  style.styleSheet.cssText = css;
};

export { init, update };
