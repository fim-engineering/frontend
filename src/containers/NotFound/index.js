import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

/* component styles */
import { styles } from './styles.scss';

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    username: '',
    password: ''
  }

  handleChangeRoute = (path) => () => {
    this.props.push(path)
  }

  render() {
    
    return (
      <div className={styles}>
        <div>Nyasar ????</div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    push:  bindActionCreators(push, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(NotFound);
