import { Entity } from './Entity';
import { UniqueEntityID } from './UniqueEntityID';
import { IDomainEvent } from './events/IDomainEvent';
import { DomainEvents } from './events/DomainEvents';

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];

  get id(): UniqueEntityID {
    return this._id;
  }
  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }
  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
    // log the domain event if you want
  }
  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
}
