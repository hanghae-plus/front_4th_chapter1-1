class Store<T> {
  private key: string;
  private value: T;

  constructor(key: string) {
    this.key = key;
    const stored = localStorage.getItem(this.key) || "{}";
    this.value = JSON.parse(stored);
  }

  get(): T {
    const stored = localStorage.getItem(this.key) || "{}";
    this.value = JSON.parse(stored);
    return this.value;
  }

  set(value: T): void {
    localStorage.setItem(this.key, JSON.stringify(value));
    this.value = value;
  }

  clear(): void {
    localStorage.removeItem(this.key);
    this.value = {} as T;
  }
}

export default Store;
