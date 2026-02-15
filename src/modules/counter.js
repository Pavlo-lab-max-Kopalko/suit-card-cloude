export default class FieldGame {
  constructor(
    initialFields = [
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ]
  ) {
    this.initialFields = initialFields;
    this.coordsOfSquares = [];

    for (let i = 0; i < initialFields.length; i++) {
      for (let j = 0; j < initialFields[i].length; j++) {
        this.coordsOfSquares.push([i, j]);
      }
    }
  }

  getState() {
    return this.initialFields;
  };

  getBounderySuits(
    { x, y } = positionOfSlot
  ) {
    const suitOfSlot = this.initialFields[x][y];

    if (suitOfSlot === '') {
      return;
    }

    let xAxis = x;
    let yAxis = y;
    const coordsAllslotsWithSuit = [[x, y]];

    const verticalAxisSuitsBack = (x, y, suit) => {
      console.log({ suit, x, y });

      if (x > 6 || x < 0) {
        return;
      }

      if (y > 5 || y < 0) {
        return;
      }

      if (suit === '') {
        return 'suit is empty string';
      }

      // let slotAllreadyCalculated = this.initialFields[x][y] === suit ?
      //   coordsAllslotsWithSuit.find(element => {
      //     return element[0] === x && element[1] === y;
      //   }) : false;

      // console.log(slotAllreadyCalculated);

      if (this.initialFields[x][y] === suit) {
        console.log(this.initialFields[x][y] === suit);
        coordsAllslotsWithSuit.push([x, y])
      }

      verticalAxisSuitsBack(x - 1, y, suit);
    };

    const verticalAxisSuitsForward = (x, y, suit) => {
      console.log({ suit, x, y });

      if (x > 6 || x < 0) {
        return;
      }

      if (y > 5 || y < 0) {
        return;
      }

      if (suit === '') {
        return 'suit is empty string';
      }

      // let slotAllreadyCalculated = this.initialFields[x][y] === suit ?
      //   coordsAllslotsWithSuit.find(element => {
      //     return element[0] === x && element[1] === y;
      //   }) : false;

      // console.log(slotAllreadyCalculated);

      if (this.initialFields[x][y] === suit) {
        console.log(this.initialFields[x][y] === suit);
        coordsAllslotsWithSuit.push([x, y])
      }

      verticalAxisSuitsForward(x + 1, y, suit);
    };

    const gorizontalAxisSuitsBack = (x, y, suit) => {
      console.log({ suit, x, y });

      if (x > 6 || x < 0) {
        return;
      }

      if (y > 5 || y < 0) {
        return;
      }

      if (suit === '') {
        return 'suit is empty string';
      }

      // let slotAllreadyCalculated = this.initialFields[x][y] === suit ?
      //   coordsAllslotsWithSuit.find(element => {
      //     return element[0] === x && element[1] === y;
      //   }) : false;

      // console.log(slotAllreadyCalculated);

      if (this.initialFields[x][y] === suit) {
        console.log(this.initialFields[x][y] === suit);
        coordsAllslotsWithSuit.push([x, y])
      }

      gorizontalAxisSuitsBack(x, y - 1, suit);
    }

    const gorizontalAxisSuitsForward = (x, y, suit) => {
      console.log({ suit, x, y });

      if (x > 6 || x < 0) {
        return;
      }

      if (y > 5 || y < 0) {
        return;
      }

      if (suit === '') {
        return 'suit is empty string';
      }

      // let slotAllreadyCalculated = this.initialFields[x][y] === suit ?
      //   coordsAllslotsWithSuit.find(element => {
      //     return element[0] === x && element[1] === y;
      //   }) : false;

      // console.log(slotAllreadyCalculated);

      if (this.initialFields[x][y] === suit) {
        console.log(this.initialFields[x][y] === suit);
        coordsAllslotsWithSuit.push([x, y])
      }

      const lengthOfCoordsArray = coordsAllslotsWithSuit.length;

      verticalAxisSuitsForward(x + 1, y, suit);
      // verticalAxisSuitsBack(x - 1, y, suit);
      // gorizontalAxisSuitsBack(x, y - 1, suit);
      // gorizontalAxisSuitsForward(x, y + 1, suit);

      // if (coordsAllslotsWithSuit.length === lengthOfCoordsArray) {
      //   return;
      // }
    }

    // gorizontalAxisSuitsForward(x, y, suit);

    console.log(suitOfSlot);

    const isSiutNear = (x, y, suit) => {
      if (x > 6 || x < 0) {
        return;
      }

      if (y > 5 || y < 0) {
        return;
      }

      coordsAllslotsWithSuit.forEach(element => {
        const currentX = element[0];
        const currentY = element[1];

        console.log(element);

        verticalAxisSuitsForward(currentX + 1, currentY, suit);
        verticalAxisSuitsBack(currentX - 1, currentY, suit);
        gorizontalAxisSuitsBack(currentX, currentY - 1, suit);
        gorizontalAxisSuitsForward(currentX, currentY + 1, suit);
      });

      let slotAllreadyCalculated = this.initialFields[x][y] === suit ?
        coordsAllslotsWithSuit.find(element => {
          return element[0] === x && element[1] === y;
        }) : false;

      console.log(slotAllreadyCalculated);

      const lengthOfCoordsArray = coordsAllslotsWithSuit.length;

      if (this.initialFields[x][y] === suit) {
        console.log(this.initialFields[x][y] === suit);
        coordsAllslotsWithSuit.push([x, y])
      }

      if (coordsAllslotsWithSuit.length === lengthOfCoordsArray) {
        return;
      }
    }

    // isSiutNear(x, y, suitOfSlot);

    const isSuitOnTable = (x, y, suit) => {
      const allCoordsWithSuit = [];

      this.initialFields.forEach((coords, i) => {
        console.log(coords);

        coords.forEach((element, j) => {
          if (element === suit) {
            allCoordsWithSuit.push([i, j])
          }
        });
      });

      console.log(allCoordsWithSuit);

      coordsAllslotsWithSuit.push([x, y]);

      const filteredCoords = allCoordsWithSuit.filter(coord => {
        const suitX = coord[0];
        const suitY = coord[1];

        console.log(coord);

        if (this.initialFields[suitX + 1][suitY] === suit) {
          coordsAllslotsWithSuit.push([suitX + 1, suitY]);

          console.log(coord);

          return true;
        }

        if (this.initialFields[suitX - 1][suitY] === suit) {
          coordsAllslotsWithSuit.push([suitX - 1, suitY]);

          console.log(coord);

          return true;
        }
        
        if (this.initialFields[suitX][suitX + 1] === suit) {
          coordsAllslotsWithSuit.push([suitX, suitY + 1]);

          console.log(coord);

          return true;
        }

        if (this.initialFields[suitX][suitY - 1] === suit) {
          coordsAllslotsWithSuit.push([suitX, suitY - 1]);

          console.log(coord);

          return true;
        } 

        return false;
      });

      console.log(filteredCoords);
    }

    isSuitOnTable(x, y, suitOfSlot);

    const filteredCoords = coordsAllslotsWithSuit.filter(item => item !== undefined);

    console.log(filteredCoords);
  }

  toPushSuitToTheSquare(
    { x, y } = positionOfSlot,
    suit
  ) {
    this.initialFields[x][y] = suit;
  }
};
