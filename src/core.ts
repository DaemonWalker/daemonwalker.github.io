let targets: number[][][];
let results: number[][];
let resultCount = 0;
let height: number;
let width: number;
let gearCount: number;

export const check = (
  gc: number,
  ts: number[][][],
  map: number[][]
): { results: number[][]; resultCount: number } => {
  results = [];
  resultCount = 0;
  height = map.length;
  width = map[0].length;
  targets = ts;
  gearCount = gc;

  console.log(map);

  for (let i = 0; i < height; i++) {
    results.push(Array.from({ length: width }, () => 0));
  }

  searchResults(map, 0);
  return { results, resultCount };
};

const searchResults = (map: number[][], targetIdx: number) => {
  if (targetIdx >= targets.length) {
    let count = 0;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (map[i][j] === 9) {
          count++;
        }
        if (map[i][j] == 1) {
          return;
        }
      }
    }
    if (count === gearCount) {
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (map[i][j] === 9) {
            results[i][j] = results[i][j] + 1;
          }
        }
      }
      resultCount++;
    }
    return;
  }
  const target = targets[targetIdx];
  for (let i = 0; i <= height - 3; i++) {
    for (let j = 0; j <= width - 3; j++) {
      if (!checkTarget(map, target, i, j)) {
        continue;
      }
      const newMap = copyTo(map, target, i, j);
      searchResults(newMap, targetIdx + 1);
    }
  }
};

const copyArray = <T>(array: T[][]): T[][] => {
  const copy = array.map((item) => [...item]);
  return copy;
};

const copyTo = (
  map: number[][],
  target: number[][],
  x: number,
  y: number
): number[][] => {
  const newMap = copyArray(map);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (newMap[x + i][y + j] !== 2) {
        newMap[x + i][y + j] = target[i][j] === 0 ? 7 : 9;
      }
    }
  }
  return newMap;
};

const checkTarget = (
  map: number[][],
  target: number[][],
  x: number,
  y: number
): boolean => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        (map[x + i][y + j] === 1 || map[x + i][y + j] === 9) &&
        target[i][j] !== 1
      ) {
        return false;
      }
      if (
        (map[x + i][y + j] === 2 || map[x + i][y + j] === 7) &&
        target[i][j] !== 0
      ) {
        return false;
      }
    }
  }
  return true;
};
