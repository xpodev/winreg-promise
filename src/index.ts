import { default as _Registry } from "winreg";

function promisify<T>(fn: (...args: any[]) => void) {
  return function (this: any, ...args: unknown[]) {
    return new Promise<T>((resolve, reject) => {
      fn.apply(this, [
        ...args,
        (err: Error, result: T) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        },
      ]);
    });
  };
}

class Registry extends _Registry {}

for (const key of Object.getOwnPropertyNames(_Registry.prototype)) {
  const method = _Registry.prototype[key];
  if (key === "constructor") {
    continue;
  }
  if (typeof method === "function") {
    Registry.prototype[key] = promisify(method);
  } else {
    Registry.prototype[key] = method;
  }
}

export default Registry;