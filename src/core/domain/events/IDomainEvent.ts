import { UniqueEntityID } from '../UniqueEntityID';
export interface IDomainEvent {
  dateTimeOccured: Date;
  getAggregateID: UniqueEntityID;
}
