import fp from 'fastify-plugin';
import { registeredEndpoints } from './endpoint/registered-endpoints';
import { EndpointBuilder } from './endpoint/endpoint-builder';
import { container } from './container';
import { DependencyContainer } from 'tsyringe';

export type AddBindingsFn = (container: DependencyContainer) => void;

export type JetRegistrationOptions = {
  addBindings: AddBindingsFn;
}

export const registerPluginFn = fp(function (fastify, opts: JetRegistrationOptions, done) {
  // configure endpoints
  for (const endpointConfig of registeredEndpoints) {
    const endpointBuilder = new EndpointBuilder(endpointConfig, fastify);
    endpointBuilder.build();
  }

  opts.addBindings(container);

  fastify

  done();
});