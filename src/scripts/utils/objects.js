export const getMeshArray = (mesh) => mesh.geometry.attributes.position.array;
export const getMeshCount = (mesh) => mesh.geometry.attributes.position.count;

export const getXIndex = (index) => index;
export const getYIndex = (index) => index + 1;
export const getZIndex = (index) => index + 2;

export const loopMeshGeometry = (mesh, callback) => {
  const array = getMeshArray(mesh);
  for (let index = 0; index < array.length; index += 3) {
    callback({
      x: array[getXIndex(index)],
      y: array[getYIndex(index)],
      z: array[getZIndex(index)],
      index,
    });
  }
};

export const range = (range, callback) => {
  for (let index = 0; index < range; index += 1) {
    callback(index);
  }
};

export const rangeMap = (range, callback) => {
  let returnArray = [];
  for (let index = 0; index < range; index += 1) {
    returnArray = [...returnArray, callback(index)];
  }

  return returnArray;
};

export const rangeReduce = (range, callback, initialValue) => {
  let returnItem = initialValue;
  for (let index = 0; index < range; index += 1) {
    returnItem = callback(returnItem, index);
  }

  return returnItem;
};

export const generateRandomVerticesArray = (count) => {
  let returnArray = [];
  range(count, () => {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = Math.random() * 800;

    returnArray.push(x, y, z);
  });

  return returnArray;
};

export const normalizeXCoordinate = (x, width) => (x / width) * 2 - 1;
export const normalizeYCoordinate = (y, height) => -(y / height) * 2 + 1;
