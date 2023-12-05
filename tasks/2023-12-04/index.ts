type TFunction<T> = (...args: any[]) => T;

export function memoize<T>(fn: TFunction<T>): TFunction<T> {
  if (typeof fn !== "function") {
    throw "Function to be memoized must be a function.";
  }
  const cache: Record<string, T> = {};

  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];

    const result = fn(...args);
    cache[key] = result;

    return result;
  };
}
