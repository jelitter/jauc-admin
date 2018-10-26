export const randomFromInterval = (min, max) => {
  // return (Math.random() * (max - min + 1) + min).toFixed(6);
  return (Math.random() * (max - min) + min).toFixed(6) * 1;
};

export const corkArea = {
  minlat: 51.848,
  maxlat: 51.93,
  minlon: -8.6,
  maxlon: -8.3
};

export const randomCorkCoords = () => {
  console.log('Random');

  const { minlat, maxlat, minlon, maxlon } = corkArea;
  return {
    lat: Number(randomFromInterval(minlat, maxlat)),
    lon: Number(randomFromInterval(minlon, maxlon))
  };
};
