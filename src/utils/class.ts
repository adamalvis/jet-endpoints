import { type Constructor } from '../types/constructor';

/**
 * Determines if provided object is a class
 * @param obj plain javascript object
 * @returns true if object is a class
 */
export function isClass (obj: any): boolean {
  const isCtorClass = obj.constructor !== undefined &&
      obj.constructor.toString().substring(0, 5) === 'class';
  if (obj.prototype === undefined) {
    return isCtorClass;
  }
  const isPrototypeCtorClass = obj.prototype.constructor?.toString !== undefined &&
    obj.prototype.constructor.toString().substring(0, 5) === 'class';
  return isCtorClass || isPrototypeCtorClass;
}

/**
 * Converts object to class of provided type
 * @param obj plain javascript object
 * @param Cls target class
 * @returns class with properties from obj
 */
export function convertObjToClass<
  T extends Constructor<any>
> (obj: Record<string, any>, Cls: T): T {
  const target = new Cls();

  for (const [key, val] of Object.entries(obj)) {
    target[key] = val;
  }

  return target;
}
