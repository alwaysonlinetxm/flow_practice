// @flow
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { bindActionCreators } from 'redux';

import Actions from '../actions/CommonActions';
import Text from './Text';
import './reset.css';

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

class Root extends Component {
  props: Props

  state: State

  constructor(props) {
    super(props);
    this.state = {
      text: 'lalala' // will check type by flow
    };
  }

  updateState = () => {
    this.setState({
      text: 234 // won't check type by flow, actually， it should be a string
    });
  }

  setText = (event: Event & { currentTarget: HTMLDivElement }) => {
    this.props.setText('demaxiya');
    console.log(event.target); // will check type by flow
  }

  componentWillMount() {
    this.props.getList();
  }

  // will check type by flow
  componentDidUpdate(prevProps: Props, prevState: State) {
    console.log(prevProps, prevState);
  }

  render() {
    const { list, text } = this.props;

    // the ref won't check type by flow
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

export default connect(mapStateToProps, mapDispatchToProps)(Root);
