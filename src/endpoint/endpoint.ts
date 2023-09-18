import { type FastifyReply, type FastifyRequest } from 'fastify';
import { type Constructor } from '../types/constructor';

export type EndpointClass = Constructor<Endpoint<any>>;

export abstract class Endpoint<T extends Record<string, any>> {
  /**
   * Fastify request object
   * @info injected by EndpointBuilder
   */
  request: FastifyRequest;

  /**
   * Fastify reply object
   * @info injected by EndpointBuilder
   */
  reply: FastifyReply;

  abstract handle (...args: any[]): Promise<T>;
}
