import { HandleParamConfig, setHandleParamConfigs } from '../utils/handle-param-metadata';

export type ParamPayload = {
  paramName: string;
}

export const param = (paramName: string) => (target: Object, _: string | symbol, parameterIndex: number) => {
  const config: HandleParamConfig<ParamPayload> = {
    type: 'param',
    index: parameterIndex,
    payload: { paramName },
  }
  
  setHandleParamConfigs(config, target);
};