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
    - [Debounce](#debounce)
    - [Throttle](#throttle)
    - [Async Retry](#async-retry)
    - [Once](#once)

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


### Debounce

Postpone its execution until after `timeMs` have elapsed since the last time it was invoked.

##### Declaration

``function Debounce(timeMs: number)``

##### Usage

```typescript
import { Debounce } from 'essential-decorators';

class Foo {
  counter = 0;
  
  @Debounce(2000)
  call() {
    return ++this.counter;
  }
}

console.log(test.call()); // Does not output anything since it's called again with-in the 2 second time-frame.
console.log(test.call()); // Outputs: 1 (AFTER 2 SECONDS)

setTimeout(() => {
  console.log(test.call()); // Outputs: 1 (AFTER ADDITIONAL 2 SECONDS)
}, 3000)
```

### Throttle

When invoked repeatedly, will only call the original function at most once per every `timeMs`.
 
##### Declaration

``function Throttle(timeMs: number)``

##### Usage

```typescript
import { Throttle } from 'essential-decorators';

class Foo {
  counter = 0;
  
  @Throttle(2000)
  call() {
    return ++this.counter;
  }
}

console.log(test.call()); // Outputs: 1
console.log(test.call()); // Does not output anything since it's called again with-in the 2 second time-frame.

setTimeout(() => {
  console.log(test.call());
  // Outputs: 1 
}, 3000)
```


### AsyncRetry

In-case an exception has been thrown, it will retry the action up to `retries` amount of times with a `restMs` delay between attempts.

##### Declaration

``function AsyncRetry(retries: number, restMs: number = 100)``

##### Usage

```typescript
import { AsyncRetry } from 'essential-decorators';

class Foo {
  counter = 0;
  
  @AsyncRetry(2)
  doSomething() {
    return requestServerSomething()
  }
}

// in-case of a failure will try twice before throwing an exception
console.log(test.doSomething()); 
```


### Once

Called exactly once. Repeated calls will have no effect, returning the value from the first call.

##### Declaration

``function Once()``

##### Usage

```typescript
import { Once } from 'essential-decorators';

class Foo {
  counter = 0;
  
  @Once()
  count(...args: string[]) {
    return ++this.counter;
  }
}

console.log(test.count()); // Outputs: 1
console.log(test.count()); // Outputs: 1
console.log(test.count(1)); // Outputs: 1
console.log(test.count(1, 2)); // Outputs: 1
```

