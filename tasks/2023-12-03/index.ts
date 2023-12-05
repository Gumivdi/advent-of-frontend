export interface Lokalizacja {
  x: number;
  y: number;
  z: number;
  czas: number;
}

export type MapaCzasoprzestrzenna = (
  x: number,
  y: number,
  z: number,
  czas: number
) => number;

export function znajdzWorek(
  lokalizacje: Lokalizacja[],
  mapa: MapaCzasoprzestrzenna
): Lokalizacja | null {
  if (!lokalizacje.length) return null;

  const locationStrength = lokalizacje.map((location) => {
    const { x, y, z, czas } = location;
    return mapa(x, y, z, czas);
  });
  const locationsSum = locationStrength.reduce((a, b) => a + b, 0);

  if (!isFinite(locationsSum)) return null;

  const strongestLocationIndex = locationStrength.indexOf(
    Math.max(...locationStrength)
  );

  return lokalizacje[strongestLocationIndex];
}
