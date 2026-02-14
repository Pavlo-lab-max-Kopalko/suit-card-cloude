import './style.css'

const item = document.getElementsByClassName("game-field");
const options = document.getElementsByClassName("options")[0];
const spadeWrapper = document.getElementsByClassName("spade")[0];
let spade = spadeWrapper.firstElementChild;
const heart = document.getElementsByClassName("heart")[0];
const diamond = document.getElementsByClassName("diamond")[0];
const club = document.getElementsByClassName("club")[0];

// const fieldsSqaud = document.querySelectorAll('.')

console.log(item[0].getBoundingClientRect().left);
console.log(item[0].getBoundingClientRect().right);
console.log(spade);

let copySymbol = null;

const onMouseDown = (element) => {
  const parentElement = element.parentElement;

  element.onmousedown = function (event) {
    // (1) prepare to moving: make absolute and on top by z-index
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    copySymbol = element.cloneNode(false);
    copySymbol.style.position = 'absolute';
    copySymbol.style.zIndex = 1000;

    document.body.append(copySymbol);

    // centers the spade at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
      copySymbol.style.left = pageX - shiftX + 'px';
      copySymbol.style.top = pageY - shiftY + 'px';
    }

    // move our absolutely positioned spade under the pointer
    moveAt(event.pageX, event.pageY);

    let prevElement = null;

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);

      copySymbol.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      copySymbol.hidden = false;

      if (!elemBelow) return;

      if (prevElement) {
        console.log(prevElement);

        prevElement.style.backgroundColor = '';
      }

      if (elemBelow.classList.contains('squadItem')) {
        console.log(elemBelow.classList.contains('squadItem'));
        elemBelow.style.backgroundColor = 'red';
        prevElement = elemBelow;
      } else {
        prevElement = null;
      }

      if (prevElement) {
        // copySymbol.style.position = 'relative';
        // prevElement.append(copySymbol);
      }
    }

    // (2) move the spade on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // (3) drop the spade, remove unneeded handlers
    copySymbol.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      copySymbol.onmouseup = null;
      
      copySymbol.remove();
      prevElement.append(copySymbol);
      copySymbol.style.position = 'static';

      prevElement.style.backgroundColor = '';
    };

    copySymbol.ondragstart = function () {
      return false;
    };
  };

  element.ondragstart = function () {
    return false;
  };
}

// spade.onmouseover

document.querySelectorAll('.options img').forEach(onMouseDown);

console.log(document.querySelectorAll('.options img'));

options.addEventListener("click", (event) => {
  console.log(event.target);
  console.log(options);
  console.log(event.target === spade);
});
