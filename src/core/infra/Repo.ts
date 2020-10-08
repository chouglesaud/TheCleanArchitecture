export interface Repo<T> {
  exists(t: T | string): Promise<boolean>;
  save(t: T): Promise<void>;
}
