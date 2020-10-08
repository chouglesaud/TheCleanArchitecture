export interface IDatabase {
  insert(key: any, value: any): Promise<void>;
  has(key: any): Promise<boolean>;
  find(key: any): Promise<any>;
  findAndUpdate(key: any, value: any): Promise<void>;
  remove(key: any): Promise<void>;
}

export class Database<T> implements IDatabase {
  protected _document = new Map();
  async insert(key: any, value: any): Promise<void> {
    this._document.set(key, value);
  }
  async has(key: any): Promise<boolean> {
    return this._document.has(key);
  }
  async find(key: any): Promise<any> {
    return this._document.get(key);
  }
  async findAndUpdate(key: any, value: any): Promise<void> {
    this._document.set(key, value);
  }
  async remove(key: any): Promise<void> {
    this._document.delete(key);
  }
}
