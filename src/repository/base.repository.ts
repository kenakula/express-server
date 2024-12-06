export abstract class BaseRepository<T> {
  public getAll: () => Promise<T[]>;
  public create: (data: T) => Promise<T>;
}
