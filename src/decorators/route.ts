import { singleton } from 'tsyringe';
import { Endpoint } from '../endpoint';
import { EndpointClass } from '../endpoint/endpoint';
import { registerEndpoint } from '../endpoint/registered-endpoints';

type RouteMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type RouteOpts = {
  path: string,
  method: RouteMethods,
};

/**
 * Used to register an endpoint at the specified route
 * @param opts route options
 * @param opts.path path to endpoint
 * @param opts.method method of endpoint
 */
export const route = (opts: RouteOpts) => (target: EndpointClass) => {
  registerEndpoint(target, opts);

  // register with di container
  return singleton()(target);
};