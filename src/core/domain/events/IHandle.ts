import { IDomainEvent } from './IDomainEvent';

export interface IHandle<IDomainEvent> {
  setupSubscriptioins(): void;
}
