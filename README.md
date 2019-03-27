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

Memoize the function by using the cached result. If `hashFn` is passed it is used to compute the hash key. default hash function is using `JSON.stringify` on the original function arguments.

##### Declaration

``function Memoize(hashFn?: (...args: any[]) => string)``

##### Usage

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
  

##### Declaration
``function TimedMemoize(timeoutMs: number, hashFn?: (...args: any[]) => string)``

##### Usage
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

Least-recently-used memoization, similar to [Memoize](#memoize), requires an additional parameter `maxRecords` of the number of records to keep in cache.
  
##### Declaration

``function LruMemoize(maxRecords: number, hashFn?: (...args: any[]) => string)``

##### Usage

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

### Retry

@Todo


### Once

@Todo


### Delay

@todo 

### After

@todo 

### Before

@todo
