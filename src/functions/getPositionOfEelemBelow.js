const getPositionOfEelemBelow = (elemBelow, rows) => {
  const x = Array.from(rows).findIndex(row => {
    return row === elemBelow.parentElement;
  });

  let y = Array.from(Array.from(rows)[x].children).findIndex(row => {
    return row === elemBelow;
  });

  return { x, y };
};

export default getPositionOfEelemBelow;
