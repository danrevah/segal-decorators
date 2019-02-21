import { isUndefined } from './general';

interface Node<T> {
  prev?: Node<T>
  next?: Node<T>
  value: T,
  key: string
}

export class LRU<T> {
  private totalStorage = 0;
  private cache: { [key: string]: Node<T> } = {};
  private head: Node<T> | undefined;
  private tail: Node<T> | undefined;

  constructor(private maxStorage: number) {}

  get(key: string): T | undefined {
    return !isUndefined(this.cache[key])
      ? this.cache[key].value
      : undefined;
  }

  insert(key: string, value: T): void {
    if (this.totalStorage >= this.maxStorage) {

      if (!isUndefined(this.get(key))) {
        this.remove(key);
      } else {
        const { key } = <Node<T>>this.tail;
        this.remove(key);
      }

    }

    const node: Node<T> = { key, value, next: this.head };
    this.add(key, node);
  }

  remove(key: string): void {
    const node = this.cache[key];

    if (!node) return;

    const { prev, next } = node;

    if (prev) {
      prev.next = next;
    } else {
      this.head = next;
    }

    if (node === this.tail) {
      this.tail = prev || this.head;
    }

    if (next) {
      next.prev = prev;
    }

    delete this.cache[key];
    --this.totalStorage;
  }

  toString() {
    const out: any[] = [];
    for (let node = this.head; node; out.push(node.value), node = node.next);
    return out.join(', ');
  }

  private add(key: string, node: Node<T>) {
    if (this.head) {
      this.head.prev = node;
    }

    if (!this.tail) {
      this.tail = node;
    }

    this.cache[key] = this.head = node;

    ++this.totalStorage;
  }
}
