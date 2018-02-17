import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as _ from 'lodash';

/* component styles */
import { styles } from './styles.scss';
import * as uiActionCreators   from 'core/actions/actions-ui';
import * as userActionCreators   from 'core/actions/actions-user';
import { Login as LoginAction } from '../../api'

class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: '',
    password: '',
    isProcessLogin: false
  }

  handleInput = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  handleChangeRoute = (path) => () => {
    this.props.push(path)
  }

  toggleDisableButton = () => {
    this.setState({
      isProcessLogin: !this.state.isProcessLogin
    })
  }

  showToaster = (message) => {
    this.props.actions.ui.toggleNotification({
      isOpen: true,
      text: message
    });
  }

  handleClick = () => {
    const { actions } = this.props
    const { email, password } = this.state
    actions.ui.toggleProgressbar(true);

    const content = {
      email,
      password
    }
    this.toggleDisableButton()
    LoginAction(content)
      .then(res => {
        const userID = _.result(res, 'user.id', 0)
        if (userID !== 0) {
          actions.user.changeUserData({
            isLoggedIn: true,
            userID,
            email: _.result(res, 'user.email', ''),
            token: _.result(res, 'token.original.access_token', '')
          })
          this.showToaster('Sukses Login')
        } else {
          this.showToaster('Gagal Login')
        }
        actions.ui.toggleProgressbar(false);
        this.toggleDisableButton()
      })
      .catch(_ => {
        this.showToaster('Gagal Login')
        actions.ui.toggleProgressbar(false);
        this.toggleDisableButton()
      })
  }

  render() {
    const { email, password, isProcessLogin } = this.state
    const isDisabledLogin = email === '' || password === '' || isProcessLogin
    const labelButtonLogin = isProcessLogin ? 'Process' : 'Login'

    return (
      <div className={styles}>
        <TextField
          hintText="Enter your Email"
          floatingLabelText="Email"
          onChange = {(e, newValue) => this.handleInput('email', newValue)}
          />
        <br/>
        <TextField
          type="password"
          hintText="Enter your Password"
          floatingLabelText="Password"
          onChange = {(e, newValue) => this.handleInput('password', newValue)}
          />
        <br/>
        <br/>
        <br/>
        <RaisedButton disabled={isDisabledLogin} label={labelButtonLogin} primary={true} onClick={(event) => this.handleClick(event)}/>
        <br />
        <br />
        <br />
        <div>Belum mendaftar ? Daftarkan diri anda sekarang!</div>
        <RaisedButton label="Daftar" primary={true} onClick={this.handleChangeRoute('/sign_up')}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      ui   : bindActionCreators(uiActionCreators, dispatch),
      user   : bindActionCreators(userActionCreators, dispatch)
    },
    push:  bindActionCreators(push, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Login);
