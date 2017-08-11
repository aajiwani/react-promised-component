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
      value => this.setState({loading: false, value: value}),
      error => this.setState({loading: false, error: error})
    );
  }

  getParams(props)
  {
    var hasParams = R.has(promiseProp + '_params');
    if (hasParams(props))
    {
      return (props[promiseProp + '_params'])();
    }
    return null;
  }

  retryPromise()
  {
    this.executePromise(this.getParams(this.props));
  }

  componentWillMount()
  {
    this.executePromise(this.getParams(this.props));
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
      var hasParams = R.has(promiseProp + '_params');
      if (hasParams(propsWithoutThePromise))
      {
        propsWithoutThePromise = R.dissoc(promiseProp + '_params', propsWithoutThePromise);
      }

      return (
        <SuccessComponent {...propsWithoutThePromise} result={this.state.value} />
      );
    }
  }
};

export default ReactPromisedComponent;
