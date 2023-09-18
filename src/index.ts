import 'reflect-metadata';

import { registerPluginFn } from './register-plugin';
export { JetRegistrationOptions, AddBindingsFn } from './register-plugin';
export { Endpoint } from './endpoint';
export { route, param, body } from './decorators';

export default registerPluginFn;
