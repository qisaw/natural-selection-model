export class DeepSet<T> {
  private map: Map<string, T>;
  readonly [Symbol.iterator]: () => IterableIterator<T>;
  constructor(values: T[] = []) {
    this.map = new Map();
    values.forEach(value => {
      this.map.set(JSON.stringify(value), value);
    });
    this[Symbol.iterator] = this.values;
  }
  get size(): number {
    return this.map.size;
  }

  add(item: T): DeepSet<T> {
    this.map.set(JSON.stringify(item), item);
    return this;
  }

  values(): IterableIterator<T> {
    return this.map.values();
  }

  delete(item: T): boolean {
    return this.map.delete(JSON.stringify(item));
  }
  clear(): void {
    this.map.clear();
  }
  forEach(callback: (value: T) => void): void {
    this.map.forEach(value => callback(value));
  }
  has(value: T): boolean {
    return !!this.map.get(JSON.stringify(value));
  }
}
