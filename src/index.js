import React from 'react';
import R from 'ramda';

var ReactPromisedComponent = (
  promiseProp, LoadingComponent, ErrorComponent, SuccessComponent
) => class extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {loading: true, error: null, value: null};
  }

  executePromise(params)
  {
    this.setState({loading: true, error: null, value: null});

    this.props[promiseProp](params).then(
      value => this.setState({loading: false, value: value})
      error => this.setState({loading: false, error: error})
    );
  }

  componentWillUpdate(nextProps, nextState)
  {
    if (nextProps[promiseProp + '_params'] !== this.props[promiseProp + '_params'])
    {
      // We are detecting a params change, we need to recall the promise
      this.executePromise(nextProps[promiseProp + '_params']());
    }
  }

  retryPromise()
  {
    this.executePromise(this.props[promiseProp + '_params']());
  }

  componentWillMount()
  {
    this.executePromise(this.props[promiseProp + '_params']());
  }

  render()
  {
    if (this.state.loading)
    {
      return (
        <LoadingComponent />
      );
    }
    else if (this.state.error !== null)
    {
      return (
        <ErrorComponent error={this.state.error} retry={this.retryPromise.bind(this)} />
      );
    }
    else
    {
      var propsWithoutThePromise = R.dissoc(promiseProp, this.props);
      var result = { 'result': Object.assign({}, this.state.value) };
      return (
        <SuccessComponent {...propsWithoutThePromise} {...result} />
      );
    }
  }
};

export default ReactPromisedComponent;
