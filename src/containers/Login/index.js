import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

/* component styles */
import { styles } from './styles.scss';
import * as uiActionCreators   from 'core/actions/actions-ui';

class Login extends Component {
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

  handleClick = () => {
    this.props.actions.ui.toggleProgressbar(true);
    this.props.actions.ui.toggleNotification({
      isOpen: true
    });
  }

  render() {
    
    return (
      <div className={styles}>
        <TextField
          hintText="Enter your Username"
          floatingLabelText="Username"
          onChange = {(event,newValue) => this.setState({username:newValue})}
          />
        <br/>
        <TextField
          type="password"
          hintText="Enter your Password"
          floatingLabelText="Password"
          onChange = {(event,newValue) => this.setState({password:newValue})}
          />
        <br/>
        <br/>
        <br/>
        <RaisedButton label="Login" primary={true} style={styles} onClick={(event) => this.handleClick(event)}/>
        <br />
        <br />
        <br />
        <div>Belum mendaftar ? Daftarkan diri anda sekarang!</div>
        <RaisedButton label="Daftar" primary={true} style={styles} onClick={this.handleChangeRoute('/sign_up')}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      ui   : bindActionCreators(uiActionCreators, dispatch)
    },
    push:  bindActionCreators(push, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Login);
