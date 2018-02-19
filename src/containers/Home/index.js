import React, { Component } from 'react';
import { connect }            from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/* component styles */
import { styles } from './styles.scss';

import * as uiActionCreators   from 'core/actions/actions-ui';
import * as userActionCreators   from 'core/actions/actions-user';
import ActionAndroid from 'material-ui/svg-icons/action/android';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  handleRedirect = () => {
    this.props.push('/profile')
  }

  renderLoggedInUser = () => {
    const { user } = this.props
    return (
      <div>
        Hallo {user.email}
        <br />
        <br />
        <br />
        <RaisedButton 
          primary={true}
          onClick={this.handleRedirect}
          icon={<ActionAndroid />}
          label="Isi Data Diri" fullWidth={false} />
      </div>
    )
  }

  render() {
    const { user } = this.props
    const isLogin = user.isLoggedIn
    return (
      <div className={styles}>
        Welcome to FIM Information System
        {
          isLogin && this.renderLoggedInUser()
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui   : bindActionCreators(uiActionCreators, dispatch),
      user   : bindActionCreators(userActionCreators, dispatch)
    },
    push:  bindActionCreators(push, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
