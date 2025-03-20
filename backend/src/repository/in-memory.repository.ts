export class InMemoryRepository<T> {
  private data: T[] = [];

  getAll(): T[] {
    return this.data;
  }

  findById(id: string): T | undefined {
    return this.data.find((item) => item['id'] === id);
  }

  add(item: T): void {
    this.data.push(item);
  }
}
