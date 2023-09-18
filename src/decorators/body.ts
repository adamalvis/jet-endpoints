import { Constructor } from '../types/constructor';
import { HandleParamConfig, setHandleParamConfigs } from '../utils/handle-param-metadata';

export type BodyPayload = {
  /** Retrieves body at specified key, can use dot syntax for heavily nested properties */
  key?: string;
  /** Serializes body into provided class, validates if using class-validator */
  validatorCls?: Constructor<any>;
}

export const body = (opts?: BodyPayload) => (target: Object, _: string | symbol, parameterIndex: number) => {
  const config: HandleParamConfig<BodyPayload> = {
    type: 'body',
    index: parameterIndex,
    payload: opts ?? {},
  }
  
  setHandleParamConfigs(config, target);
};