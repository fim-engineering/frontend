import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

/* component styles */
import { styles } from './styles.scss';

class ChangePassword extends Component {
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
        <RaisedButton label="Change Password" primary={true} style={styles} onClick={(event) => this.handleClick(event)}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    push:  bindActionCreators(push, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(ChangePassword);
