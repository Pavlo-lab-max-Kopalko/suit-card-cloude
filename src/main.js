import './style.css'
import counter from './modules/counter';

const newGame = new counter();
const rows = document.getElementsByClassName("game-field")[0].children;
const gameField = document.getElementsByClassName("game-field")[0];
let copySymbol = null;

const getPositionOfEelemBelow = (elemBelow) => {
  const x = Array.from(rows).findIndex(row => {
    return row === elemBelow.parentElement;
  });

  let y = Array.from(Array.from(rows)[x].children).findIndex(row => {
    return row === elemBelow;
  });

  return { x, y };
}

const getSuitOfIcon = (iconSuit) => {
  return iconSuit.getAttribute('alt');
};

const onHoverIcon = (element) => {
  let activePositions = [];

  element.onmouseenter = function (event) {
    const positionOfSlot = getPositionOfEelemBelow(element);

    activePositions = newGame.getBounderySuits(positionOfSlot) || [];

    activePositions.forEach(coords => {
      const [x, y] = coords;

      gameField.children[x].children[y].style.backgroundColor = 'grey';
    });
  }

  element.onmouseleave = function () {
    activePositions.forEach(coords => {
      const [x, y] = coords;

      gameField.children[x].children[y].style.backgroundColor = '';
    });

  };

  element.onclick = function () {
    activePositions.forEach(coords => {
      const [x, y] = coords;

      const slot = gameField.children[x].children[y];

      const img = slot.querySelector('img');

      if (img) {
        img.remove();
        slot.style.backgroundColor = '';
      }
    });
  }
};

const onMouseDown = (element) => {
  const parentElement = element.parentElement;

  element.onmousedown = function (event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    copySymbol = element.cloneNode(false);
    copySymbol.style.position = 'absolute';
    copySymbol.style.zIndex = 1000;

    document.body.append(copySymbol);

    function moveAt(pageX, pageY) {
      copySymbol.style.left = pageX - shiftX + 'px';
      copySymbol.style.top = pageY - shiftY + 'px';
    }

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
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    copySymbol.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      copySymbol.onmouseup = null;

      copySymbol.remove();

      if (prevElement && prevElement.children.length === 0) {
        prevElement.append(copySymbol);
        const coordinates = getPositionOfEelemBelow(prevElement);

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
document.querySelectorAll('.series div').forEach(onHoverIcon); 
