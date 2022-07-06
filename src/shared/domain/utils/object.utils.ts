export function deepFreeze<T>(obj: T) {
  const propName = Object.getOwnPropertyNames(obj);
  for (const name of propName) {
    const value = obj[name as keyof T];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(obj);
}
