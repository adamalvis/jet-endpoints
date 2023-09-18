import { Constructor } from '../types/constructor';

export type EndpointClass = Constructor<Endpoint<any>>;

export abstract class Endpoint<T extends Record<string, any>> {
  abstract handle(...args: any[]): Promise<T>;
}