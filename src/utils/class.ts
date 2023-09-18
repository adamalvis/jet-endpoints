import { type Constructor } from '../types/constructor'

/**
 * Determines if provided object is a class
 * @param obj plain javascript object
 * @returns true if object is a class
 */
export function isClass (obj: any) {
  const isCtorClass = obj.constructor &&
      obj.constructor.toString().substring(0, 5) === 'class'
  if (obj.prototype === undefined) {
    return isCtorClass
  }
  const isPrototypeCtorClass = obj.prototype.constructor?.toString &&
    obj.prototype.constructor.toString().substring(0, 5) === 'class'
  return isCtorClass || isPrototypeCtorClass
}

/**
 * Converts object to class of provided type
 * @param obj plain javascript object
 * @param cls target class
 * @returns class with properties from obj
 */
export function convertObjToClass<
  T extends Constructor<any>
> (obj: Record<string, any>, cls: T): T {
  const target = new cls()

  for (const [key, val] of Object.entries(obj)) {
    target[key] = val
  }

  return target
}
