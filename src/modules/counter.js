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

    const arr = [];
    const calculatedSlots = new Set();

    const isCloud = (x, y, suit) => {
      if (x < 0 || y < 0 || x >= 7 || y >= 6) {
        return;
      }

      const key = `${x},${y}`;

      if (calculatedSlots.has(key)) {
        return;
      }

      calculatedSlots.add(key);

      if (this.initialFields[x]?.[y] === suit) {
        arr.push([x, y]);

        console.log(this.initialFields[x + 1]?.[y], x, y);
        console.log(this.initialFields[x - 1]?.[y], x, y);
        console.log(this.initialFields[x]?.[y + 1], x, y);
        console.log(this.initialFields[x]?.[y - 1], x, y);

        isCloud(x + 1, y, suit);
        isCloud(x - 1, y, suit);
        isCloud(x, y + 1, suit);
        isCloud(x, y - 1, suit);
      }
    }

    isCloud(x, y, suitOfSlot);

    console.log(arr);
    console.log(calculatedSlots);

    return arr;
  }

  toPushSuitToTheSquare(
    { x, y } = positionOfSlot,
    suit
  ) {
    this.initialFields[x][y] = suit;
  }
};
