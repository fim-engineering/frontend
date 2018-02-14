import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

/* component styles */
import { styles } from './styles.scss';

export default class Login extends Component {
  constructor(props) {
    super(props);
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
        <RaisedButton label="Submit" primary={true} style={styles} onClick={(event) => this.handleClick(event)}/>
      </div>
    );
  }
}
