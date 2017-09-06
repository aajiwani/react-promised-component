# react-promised-component [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> I need a component when a promise succeeds, fails or during loading
> This package would come handy in that case.

##### Surpise: It has a yeoman generator as well!

## Installation

[npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)). We assume, you have a running React project as well.

```bash
npm install react-promised-component --save
```

Leave the rest for Yeoman to take care of

```bash
yo react-promised-component
```

If you want to have a look at generator
[generator-react-promised-component](https://github.com/aajiwani/generator-react-promised-component)

## Usage

```js
  <PromisedComponent
      promise_prop={this.promiseGenerator.bind(this)}
      promise_prop_params={this.promiseParams.bind(this)}
      onError={(error) => { /* Do somethig with error */ }}
      onSuccess={(result) => { /* Do somethig with result */ }}
    />

  // promise_prop (required): the method that generates a new promise
  // promise_prop_params (optional): the method that can generate parameters and magically supply it to promise creator
  // onError (optional): callback to notify error case with error as parameter
  // onSuccess (optional): callback to notify success case with result as parameter
```

## Surprise

You can leverage a retry on promise if you want to without any fuss.

```js
  <PromisedReactComponent
    promise_name={() => Promise.resolve(true)}
    ref={inst => (this.scrInst = inst)}
  />

  // Later in the code
  this.scrInst.retryPromise();
```

## License

MIT © [Amir Ali Jiwani](mailto:amirali.jiwani89@gmail.com)


[npm-image]: https://badge.fury.io/js/react-promised-component.svg
[npm-url]: https://npmjs.org/package/react-promised-component
[travis-image]: https://travis-ci.org/aajiwani/react-promised-component.svg?branch=master
[travis-url]: https://travis-ci.org/aajiwani/react-promised-component
[daviddm-image]: https://david-dm.org/aajiwani/react-promised-component.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/aajiwani/react-promised-component
[coveralls-image]: https://coveralls.io/repos/aajiwani/react-promised-component/badge.svg
[coveralls-url]: https://coveralls.io/r/aajiwani/react-promised-component
