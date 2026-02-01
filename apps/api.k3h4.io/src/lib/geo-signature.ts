export const clampDecimals = (value: number, places = 5) =>
    Number(value.toFixed(places));

export function routeSignature(
    origin: {lat: number; lng: number},
    destination: {lat: number; lng: number}) {
  return [
    clampDecimals(origin.lat),
    clampDecimals(origin.lng),
    clampDecimals(destination.lat),
    clampDecimals(destination.lng),
  ].join(':');
}
