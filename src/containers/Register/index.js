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
import { SignUp as SignUpAction } from '../../api'

class Register extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: '',
    password: '',
    name: '',
    isProcessLogin: false
  }

  handleInput = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  handleChangeRoute = (path) => {
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
    const { email, password, name } = this.state
    actions.ui.toggleProgressbar(true);

    const content = {
      email,
      password,
      name,
    }
    this.toggleDisableButton()
    SignUpAction(content)
      .then(res => {
        console.log('res==: ', res);
        const userID = _.result(res, 'id', 0)
        if (userID !== 0) {
          this.showToaster('Sukses Daftar')
          this.handleChangeRoute('/sign_in')
        } else {
          const errorMessage = _.result(res, 'user.message_error', '')
          this.showToaster(errorMessage)
        }
        actions.ui.toggleProgressbar(false);
        this.toggleDisableButton()
      })
      .catch(() => {
        this.showToaster('Gagal Daftar')
        actions.ui.toggleProgressbar(false);
        this.toggleDisableButton()
      })
  }

  render() {
    const { email, password, isProcessLogin, name } = this.state
    const isDisabledLogin = email === '' || password === '' || name === '' || isProcessLogin
    const labelButtonLogin = isProcessLogin ? 'Process' : 'Daftar'

    return (
      <div className={styles}>
        <TextField
          hintText="Name"
          floatingLabelText="Name"
          onChange = {(e, newValue) => this.handleInput('name', newValue)}
          />
        <br />
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

export default connect(null, mapDispatchToProps)(Register);
