import { type Constructor } from '../types/constructor';

export interface HandleParamConfig<T = any> {
  type: 'param' | 'body' | 'query'
  index: number
  payload: T
}

const handleParametersKey = 'HandleParameters';
const propertyKey = 'handle';

export function setHandleParamConfigs (
  config: HandleParamConfig<any>,
  target: Constructor<any>
): void {
  const currentConfigs: HandleParamConfig[] = getHandleParamConfigs(target);

  Reflect.defineMetadata(
    handleParametersKey,
    [...currentConfigs, config],
    target,
    propertyKey
  );
}

export function getHandleParamConfigs (target: any): HandleParamConfig[] {
  return Reflect.getMetadata(handleParametersKey, target, propertyKey) ?? [];
}
