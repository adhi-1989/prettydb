export function waitFor(
  condition: () => boolean,
  interval = 1000,
  attemptLimit = 8
): Promise<void> {
  if (condition()) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    let attempt = 0;
    const id = setInterval(() => {
      if (condition()) {
        clearInterval(id);
        resolve();
      } else if (attemptLimit >= 0) {
        attempt++;
        if (attempt >= attemptLimit) {
          reject("The number of attempts exceeded the limit");
        }
      }
    }, interval);
  });
}

export const systems = Object.freeze({
  waitFor,
});
