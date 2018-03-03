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
import { ForgotPassword as ForgotPasswordAction } from '../../api'

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: '',
    password: '',
    isProcessLogin: false
  }

  componentWillMount = () => {
    const isLoggedIn = _.result(this, 'props.user.isLoggedIn', false);
    if (isLoggedIn) {
      this.handleChangeRoute('/')()
    }
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
      email: email.toLowerCase(),
      password
    }
    this.toggleDisableButton()
    ForgotPasswordAction(content)
      .then(res => {
        if (res.code === 200) {
          this.showToaster('Sukses! Silahkan cek email kamu')
          actions.ui.toggleProgressbar(false);
          this.toggleDisableButton()
          this.handleChangeRoute('/')()
        } else {
          this.showToaster('Gagal Forgot Password')
          actions.ui.toggleProgressbar(false);
          this.toggleDisableButton()
        }
      })
      .catch(() => {
        this.showToaster('Gagal Forgot Password')
        actions.ui.toggleProgressbar(false);
        this.toggleDisableButton()
      })
  }

  render() {
    const { email, password, isProcessLogin } = this.state
    const isDisabledLogin = email === '' || isProcessLogin
    const labelButtonLogin = isProcessLogin ? 'Process' : 'Forgot Password'

    return (
      <div className={styles}>
        <h1>Forgot Password</h1>
        <TextField
          hintText="Enter your Email"
          floatingLabelText="Email"
          onChange = {(e, newValue) => this.handleInput('email', newValue)}
          />
        <br/>
        <br/>
        <br/>
        <br/>
        <RaisedButton disabled={isDisabledLogin} label={labelButtonLogin} primary={true} onClick={(event) => this.handleClick(event)}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    user: state.user
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
