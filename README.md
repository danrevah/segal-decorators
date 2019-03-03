<p align="center">
<img 
    src="assets/ngx-logo.png" width="160" border="0" alt="NGX-PIPES">
<br/><br/>
<a href="https://www.npmjs.com/package/ngx-pipes"><img src="https://img.shields.io/npm/v/ngx-pipes.svg?style=flat-square" alt="npm"></a>
<a href="http://packagequality.com/#?package=ngx-pipes"><img src="https://npm.packagequality.com/shield/ngx-pipes.svg?style=flat-square" alt="Package Quality"></a>
<a href="https://travis-ci.org/danrevah/ngx-pipes"><img src="https://img.shields.io/travis/danrevah/ngx-pipes.svg?style=flat-square" alt="Travis"></a>
<a href="https://coveralls.io/github/danrevah/ngx-pipes?branch=master"><img src="https://img.shields.io/coveralls/danrevah/ngx-pipes.svg?style=flat-square" alt="Coveralls"></a>
<a href="https://www.npmjs.com/package/ngx-pipes"><img src="https://img.shields.io/npm/dm/ngx-pipes.svg?style=flat-square" alt="npm"></a>
<a href="https://github.com/danrevah/ngx-pipes/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="MIT licensed"></a>
<br/><br/>
 Useful pipes for Angular with no external dependencies
<br/><br/>
</p>

<b><a href="https://github.com/danrevah/typeserializer" target="_blank">TypeSerializer</a> - Another library you might find interesting. Serializer / Deserializer, designed to make prettier code while using decorators (Can be used both with Angular or Node.js).</b>

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
