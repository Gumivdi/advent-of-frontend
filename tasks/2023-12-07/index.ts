type Letter = { [key: string]: number };

export function createTrackedLetter(
  letter: Letter,
  fn: (key: string, value: number) => void
): Letter {
  const trackedObject = new Proxy(letter, {
    set: function (target, key, value) {
      fn(key as string, value);
      target[key as string] = value;
      return true;
    },
  });
  return trackedObject as Letter;
}
