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
  }

  getState() {
    return this.initialFields;
  };

  delete(activePositions) {
    for (const ch of activePositions) {
      this.initialFields[ch[0]][ch[1]] = '';
    }

    console.log(this.initialFields);
  }

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

        isCloud(x + 1, y, suit);
        isCloud(x - 1, y, suit);
        isCloud(x, y + 1, suit);
        isCloud(x, y - 1, suit);
      }
    }

    isCloud(x, y, suitOfSlot);

    return arr;
  }

  toPushSuitToTheSquare(
    { x, y } = positionOfSlot,
    suit
  ) {
    this.initialFields[x][y] = suit;
  }
};
