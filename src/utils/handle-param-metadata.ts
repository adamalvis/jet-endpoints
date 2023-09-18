export interface HandleParamConfig<T = any> {
  type: 'param' | 'body' | 'query'
  index: number
  payload: T
}

const handleParametersKey = 'HandleParameters'
const propertyKey = 'handle'

export function setHandleParamConfigs (config: HandleParamConfig<any>, target: Object) {
  const currentConfigs: HandleParamConfig[] = getHandleParamConfigs(target)

  Reflect.defineMetadata(handleParametersKey, [...currentConfigs, config], target, propertyKey)
}

export function getHandleParamConfigs (target: Object): HandleParamConfig[] {
  return Reflect.getMetadata(handleParametersKey, target, propertyKey) ?? []
}
