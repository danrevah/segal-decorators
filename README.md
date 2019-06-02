# Segal Decorators

:dizzy: Bunch of highly useful decorators, helps in writing a more concise code while improving readability.

<p align="center">
<br/>
<a href="https://www.npmjs.com/package/segal-decorators"><img src="https://img.shields.io/npm/v/segal-decorators.svg?style=flat-square" alt="npm"></a>
<a href="https://travis-ci.org/danrevah/segal-decorators"><img src="https://travis-ci.org/danrevah/segal-decorators.svg?branch=master" alt="Build Status"></a>
<a href="https://github.com/danrevah/segal-decorators/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="MIT licensed"></a>
</p> 


## Table of contents

 - [Installation](#installation)
 - [Contributing](CONTRIBUTING.md)
 - [Changelog](CHANGELOG.md)
 - [Decorators](#decorators)   
    - [Memoize](#memoize)
    - [Time Memoize](#time-memoize)
    - [Lru Memoize](#lru-memoize)
    - [Debounce](#debounce)
    - [Throttle](#throttle)
    - [Async Retry](#async-retry)
    - [Bind](#bind)
    - [Once](#once)

## Installation

Use npm to install the package

  ```terminal
  $ npm install segal-decorators --save 
  ```

## Decorators

### Memoize

Memoize the function by using the cached result. If `hashFn` is passed it is used to compute the hash key. default hash function is using `JSON.stringify` on the original function arguments.

##### Declaration

``function Memoize(hashFn?: (...args: any[]) => string)``

##### Alias

`@memoize`

##### Usage

```typescript
import { Memoize } from 'segal-decorators';

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

### Time Memoize

Time memoization, similar to [Memoize](#memoize), requires an additional parameter `timeoutMs` to determine the amount of time in milliseconds to cache the result.
  

##### Declaration
``function TimeMemoize(timeoutMs: number, hashFn?: (...args: any[]) => string)``

##### Alias

`@timeMemoize`

##### Usage
```typescript
import { TimeMemoize } from 'segal-decorators';

class Foo {
  counter = 0;
  
  @TimeMemoize(2000)
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

##### Alias

`@lruMemoize`

##### Usage

```typescript
import { LruMemoize } from 'segal-decorators';

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

##### Alias

`@debounce`

##### Usage

```typescript
import { Debounce } from 'segal-decorators';

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

##### Alias

`@throttle`

##### Usage

```typescript
import { Throttle } from 'segal-decorators';

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
  console.log(test.call()); // Outputs: 1 (AFTER ADDITIONAL 1 SECOND) 
}, 1000)
```


### Async Retry

In-case an exception has been thrown, it will retry the action up to `retries` amount of times with a `restMs` delay between attempts.

##### Declaration

``function AsyncRetry(retries: number, restMs: number = 100)``

##### Alias

`@asyncRetry`

##### Usage

```typescript
import { AsyncRetry } from 'segal-decorators';

class Foo {
  counter = 0;
  
  @AsyncRetry(2)
  doSomething() {
    return requestServerSomething()
  }
}

// in-case of a failure will try twice before throwing an exception
test.doSomething().then((response) => {
  // Reach here if succeed in one of the 2 attempts
}).catch(() => {
  // Reach here if failed after 2 attempts
})
```


### Bind

Binding methods to instance, making sure `this` is always set properly.

##### Declaration

``function Bind()`` 

##### Alias

`@bind`

##### Usage

```typescript
import { bind } from 'segal-decorators';

class Foo {
  counter = 0;
  
  countWithout() {
    console.log(++this.counter)
  }
  
  @bind
  count() {
    console.log(++this.counter)
  }
}

const foo = new Foo();

setTimeout(foo.countWithout); // throws an error ('this' is undefined)
setTimeout(foo.count); // Outputs: 1
```


### Once

Called exactly once. Repeated calls will have no effect, returning the value from the first call.

##### Declaration

``function Once()``

##### Alias

`@once`

##### Usage

```typescript
import { Once } from 'segal-decorators';

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

