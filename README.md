# Essential Decorators

Useful helpers and utilities as TypeScript decorators

## Table of contents

 - [Installation](#installation)
 - [Contributing](CONTRIBUTING.md)
 - [Changelog](CHANGELOG.md)
 - [Decorators](#decorators)   
    - [Memoize](#memoize)
    - [Timed Memoize](#timed-memoize)
    - [Lru Memoize](#lru-memoize)

## Installation

Use npm to install the package

  ```terminal
  $ npm install essential-decorators --save 
  ```

## Decorators

### Memoize

Memoize the function by using the cached result. if hashFn is passed it is used to compute the hash key. default hash function is using `JSON.stringify` on the original function arguments.

``function Memoize(hashFn?: (...args: any[]) => string)``

```typescript
import { Memoize } from 'essential-decorators';

class Foo {
  counter = 0;
  
  @Memoize()
  count(...args: any[]) {
    return ++this.counter;
  }
}

console.log(test.count(1)); // Outputs: 1
console.log(test.count(2)); // Outputs: 2
console.log(test.count(1)); // Outputs: 1
console.log(test.count(1, 2)); // Outputs: 3
console.log(test.count(2)); // Outputs: 2
```

### Timed Memoize

Timed memoization, similar to [Memoize](#memoize), requires an additional parameter `timeoutMs` to determine the amount of time in milliseconds to cache the result.
  

``function TimedMemoize(timeoutMs: number, props: ITimedMemoizeProps = {})``
```
interface ITimedMemoizeProps {
  hashFn?: (...args: any[]) => string;
  invalidateOnTimeout?: boolean;
}
```

##### Props
`invalidateOnTimeout` (default=false): If set to true it will invoke a setTimeout() function after timeoutMs to remove the cached result. Otherwise it will keep and ignore it after timeout passed. 

```typescript
import { TimedMemoize } from 'essential-decorators';

class Foo {
  counter = 0;
  
  @TimedMemoize(2000)
  count(...args: any[]) {
    return ++this.counter;
  }
}

console.log(test.count(1)); // Outputs: 1
console.log(test.count(2)); // Outputs: 2
console.log(test.count(1)); // Outputs: 1
console.log(test.count(2)); // Outputs: 2

setTimeout(() => {
  console.log(test.count(1)); // Outputs: 3
  console.log(test.count(2)); // Outputs: 4
}, 3000);
```


### Lru Memoize

Least-recently-used memoization, similar to [Memoize](#memoize), requires an additional parameter `maxStorage` of the number of records to keep in cache.
  

``function LruMemoize(maxStorage: number, hashFn?: (...args: any[]) => string)``

```typescript
import { LruMemoize } from 'essential-decorators';

class Foo {
  counter = 0;
  
  @LruMemoize(2)
  count(...args: any[]) {
    return ++this.counter;
  }
}

console.log(test.count(1)); // State of LRU Cache=[1], Outputs: 1 
console.log(test.count(2)); // State of LRU Cache=[2, 1], Outputs: 2
console.log(test.count(3)); // State of LRU Cache=[3, 2], Outputs: 3
console.log(test.count(2)); // State of LRU Cache=[2, 3], Outputs: 2
console.log(test.count(1)); // State of LRU Cache=[1, 2], Outputs: 4
```
