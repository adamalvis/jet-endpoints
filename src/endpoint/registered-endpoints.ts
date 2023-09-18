import { RouteOpts } from '../decorators/route';
import { Endpoint, EndpointClass } from './endpoint';

export type EndpointConfig = RouteOpts & {
  endpoint: EndpointClass;
}

// holds all registered endpoints
export const registeredEndpoints: EndpointConfig[] = [];

/**
 * Registers an endpoint by route
 * @param routeOpts route options
 * @param endpoint endpoint handler class
 */
export function registerEndpoint(endpoint: EndpointClass, routeOpts: RouteOpts,) {
  registeredEndpoints.push({
    ...routeOpts,
    endpoint,
  });
}