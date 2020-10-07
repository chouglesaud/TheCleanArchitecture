import { IDomainEvent } from './IDomainEvent';
import { AggregateRoot } from '../AggregateRoot';
import { UniqueEntityID } from '../UniqueEntityID';

export class DomainEvents {
  private static handlers = new Map();
  private static markedAggregates: AggregateRoot<any>[] = [];

  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }
  public static register(
    callback: (event: IDomainEvent) => void,
    eventClassName: string
  ): void {
    if (!this.handlers.has(eventClassName)) {
      this.handlers.set(eventClassName, []);
    }
    this.handlers.get(eventClassName).push(callback);
  }
  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) => {
      this.dispatch(event);
    });
  }
  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<any>
  ): void {
    const index = this.markedAggregates.findIndex((aggr) =>
      aggr.equals(aggregate)
    );
    this.markedAggregates.splice(index, 1);
  }
  public static findMarkedAggregateByID(
    id: UniqueEntityID
  ): AggregateRoot<any> {
    let found: AggregateRoot<any> = null;

    this.markedAggregates.forEach((aggregate) => {
      if (aggregate.id.equals(id)) {
        found = aggregate;
      }
    });
    return found;
  }
  public static dispatchEventsForAggregate(id: UniqueEntityID): void {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  private static dispatch(event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (this.handlers.has(eventClassName)) {
      const handlers: any[] = this.handlers.get(eventClassName);
      handlers.forEach((handler) => {
        handler(event);
      });
    }
  }
  public static clearHandler(): void {
    this.handlers.clear();
  }
  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }
}
