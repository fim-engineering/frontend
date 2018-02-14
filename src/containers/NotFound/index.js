import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
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
        <RaisedButton label="Daftar" primary={true} style={styles} onClick={this.handleChangeRoute('/sign_up')}/>
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
