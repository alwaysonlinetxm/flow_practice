// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Actions from '../actions/CommonActions';
import Text from './Text';
import './reset.css';

type DefaultProps = {
  text: string,
  total: number,
  list: Array<string>
};

type Props = {
  text: string,
  total: number,
  list: Array<string>,
  setText: () => mixed,
  getList: () => mixed
};

type State = {
  text: string
};

class Root extends PureComponent<DefaultProps, Props, State> {
  static defaultProps = {
    text: '',
    total: 0,
    list: []
  }

  state = {
    text: 'lalala'
  }

  // will check type by flow
  test: HTMLParagraphElement

  updateState = () => {
    this.setState({
      text: 'demaxiya' // will check type by flow
    });
  }

  setText = () => {
    this.props.setText('demaxiya');
  }

  componentWillMount() {
    this.props.getList();
  }

  render() {
    const { list, text } = this.props;

    return (
      <div>
        <div ref={ref => this.test = ref}>list: </div>
        { list.map((node, i) => <p key={ i }>{ node }</p>) }
        <div onClick={ this.setText }>SetText</div>
        <Text text={ text } />
        <div onClick={ this.updateState }>UpdateState</div>
        <p>State: { this.state.text }</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list, total, text } = state.common;
  return {
    text,
    total,
    list
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// $Unknown
export default connect(mapStateToProps, mapDispatchToProps)(Root);
