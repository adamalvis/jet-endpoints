import { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';
import { type EndpointConfig } from './registered-endpoints';
import { container } from '../container';
import { type ParamPayload } from '../decorators/param';
import { type HandleParamConfig, getHandleParamConfigs } from '../utils/handle-param-metadata';
import { type BodyPayload } from '../decorators/body';
import { convertObjToClass, isClass } from '../utils/class';
import { type Constructor } from '../types/constructor';
import { validateOrReject } from 'class-validator';

export class EndpointBuilder {
  constructor (
    private readonly config: EndpointConfig,
    private readonly fastifyInstance: FastifyInstance
  ) {}

  build (): any {
    this.fastifyInstance[this.config.method](this.config.path, async (request, reply) => {
      const endpoint = container.resolve(this.config.endpoint);
      const handleParamConfigs = getHandleParamConfigs(endpoint);
      const params = this.buildParameters(request, handleParamConfigs);

      if (!(await this.validateParams(params, reply))) return;

      // set request/reply parameters
      endpoint.request = request;
      endpoint.reply = reply;

      return await endpoint.handle(...params);
    });
  }

  private buildParameters (request: FastifyRequest, configs: HandleParamConfig[]): any[] {
    const params = [];

    configs.sort((a, b) => a.index > b.index ? 1 : -1);

    for (const config of configs) {
      switch (config.type) {
        case 'param':
          params.push(this.buildRouteParam(config.payload, request));
          break;
        case 'body':
          params.push(this.buildBodyParam(config.payload, request));
          break;
      }
    }

    return params;
  }

  private buildRouteParam (payload: ParamPayload, request: FastifyRequest): string | undefined {
    return (request.params as Record<string, string>)[payload.paramName];
  }

  private buildBodyParam (
    payload: BodyPayload,
    request: FastifyRequest
  ): Record<string, any> | Constructor<any> {
    const target: Record<string, any> = payload.key === undefined
      ? request.body
      : payload.key.split('.').reduce<any>((currentValue, currentKey) => {
        return currentValue?.[currentKey];
      }, request.body);

    if (payload.validatorCls !== undefined) {
      return convertObjToClass(target, payload.validatorCls);
    }

    return target;
  }

  private async validateParams (params: Array<Record<string, any> | Constructor<any>>, reply: FastifyReply): Promise<boolean> {
    // validate all classes with class-validator

    for (const param of params) {
      if (isClass(param)) {
        try {
          await validateOrReject(param);
        } catch (errors) {
          await reply.code(422).send({
            message: 'Invalid Request',
            errors
          });
        }
      }
    }

    return true;
  }
}
