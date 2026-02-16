import './style.css'
import counter from './modules/counter';

const newGame = new counter();
const rows = document.getElementsByClassName("game-field")[0].children;
const gameField = document.getElementsByClassName("game-field")[0];
let copySymbol = null;

console.log(rows);

const getPositionOfEelemBelow = (elemBelow) => {
  const x = Array.from(rows).findIndex(row => {
    return row === elemBelow.parentElement;
  });

  let y = Array.from(Array.from(rows)[x].children).findIndex(row => {
    return row === elemBelow;
  });

  // console.log({ x, y });

  return { x, y };
}

const getSuitOfIcon = (iconSuit) => {
  console.log(iconSuit.getAttribute('alt'));

  return iconSuit.getAttribute('alt');
};

const onHoverIcon = (element) => {
  element.onmouseenter = function(event) {
    const positionOfSlot = getPositionOfEelemBelow(element);

    const activePositions = newGame.getBounderySuits(positionOfSlot) || [];

    const [x, y] = activePositions;

    console.log(activePositions);

    gameField.forEach(element => {
      // element.children[x].children[y].style.backgroundColor = 'grey';
    });
  }
};

const onMouseDown = (element) => {
  const parentElement = element.parentElement;

  element.onmousedown = function(event) {
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
        prevElement.style.backgroundColor = '';
      }

      if (elemBelow.classList.contains('squadItem') && elemBelow.children.length === 0) {
        elemBelow.style.backgroundColor = 'red';
        prevElement = elemBelow;
      } else {
        prevElement = null;
      }

      if (elemBelow.children.length > 1 && elemBelow.classList.contains('squadItem')) {
        elemBelow.style.backgroundColor = 'blue';

        console.log('blue');
      }
    }

    // (2) move the spade on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // (3) drop the spade, remove unneeded handlers
    copySymbol.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      copySymbol.onmouseup = null;
      
      copySymbol.remove();

      // console.log(prevElement.children.length);

      if (prevElement && prevElement.children.length === 0) {
        prevElement.append(copySymbol);
        const coordinates = getPositionOfEelemBelow(prevElement);

        console.log(coordinates);

        const suit = getSuitOfIcon(copySymbol);
        newGame.toPushSuitToTheSquare(coordinates, suit);
      }

      if (prevElement) {
        prevElement.style.backgroundColor = '';
      }

      copySymbol.style.position = 'static';
    };

    copySymbol.ondragstart = function () {
      return false;
    };
  };

  element.ondragstart = function () {
    return false;
  };
}

document.querySelectorAll('.options img').forEach(onMouseDown);
document.querySelectorAll('.series div').forEach(onHoverIcon); // onMouseDown
