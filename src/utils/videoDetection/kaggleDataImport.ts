
export const processKaggleData = async (dataFile: File) => {
  console.log("Processing Kaggle data:", dataFile.name);
  return {
    players: 22,
    teams: 2,
    matches: 1
  };
};
