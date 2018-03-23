// module "my-module.js"
let count = 0;
let nodes = [];

const init = (uid) => {
  nodes.push(uid);
  return uid;
};


const update = (uid) => {
  count = count + 1;
  console.log('Count it out', uid, count, nodes);
  const css = 'h1 { background: red; }';
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
};

export { init, update };
