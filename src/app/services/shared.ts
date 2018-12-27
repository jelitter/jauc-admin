import { Location } from '../models/location';

export const randomFromInterval = (min, max) => {
    // return (Math.random() * (max - min + 1) + min).toFixed(6);
    return (Math.random() * (max - min) + min).toFixed(6) * 1;
};

export const corkArea = {
    minlat: 51.848,
    maxlat: 51.93,
    minlon: -8.6,
    maxlon: -8.3,
};

export const randomCorkCoords = () => {
    console.log('Random');

    const { minlat, maxlat, minlon, maxlon } = corkArea;
    return {
        lat: Number(randomFromInterval(minlat, maxlat)),
        lon: Number(randomFromInterval(minlon, maxlon)),
    };
};

export const getDistance = (origin: Location, destination: Location) => {
    const toRadian = degree => (degree * Math.PI) / 180;

    // return distance in meters
    const lon1 = toRadian(origin.lon),
        lat1 = toRadian(origin.lat),
        lon2 = toRadian(destination.lon),
        lat2 = toRadian(destination.lat);

    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    const a =
        Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    const c = 2 * Math.asin(Math.sqrt(a));
    const EARTH_RADIUS = 6371;
    return Math.floor(c * EARTH_RADIUS * 1000);
};
