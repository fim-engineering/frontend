import React, { Component } from 'react';
import { connect }            from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as _ from 'lodash'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/* component styles */
import { styles } from './styles.scss';

import * as uiActionCreators   from 'core/actions/actions-ui';
import * as userActionCreators   from 'core/actions/actions-user';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import { GetProfile as getProfileAction } from '../../api'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    userProfile: {},
    isLoadedProfile: false
  }

  handleRedirect = (path) => () => {
    this.props.push(path)
  }

  componentWillUpdate = (nextProps, nextState) => {
    const { user } = nextProps
    const { userProfile, isLoadedProfile } = this.state
    const isLogin = user.isLoggedIn
    console.log("trigger: ", isLogin);
    
    if (isLogin && !isLoadedProfile ) {
      const token = _.result(nextProps, 'user.token', '');
      const content = { token }
      getProfileAction(content)
        .then(response => {
          console.log("response: ", response);
          this.setState({
            userProfile: response.user_profile,
            isLoadedProfile: true
          })
        })
    }
  }

  renderLoggedInUser = () => {
    const { user } = this.props
    const { userProfile } = this.state
    console.log("userProfile: ", userProfile);
    return (
      <div>
        Hallo {user.email}
        <br />
        <br />
        <br />
        <RaisedButton 
          primary={true}
          onClick={this.handleRedirect('/profile')}
          icon={<ActionAndroid />}
          label="Isi Data Diri" fullWidth={false} />
        <br />
        <br />
        <br />
        <RaisedButton 
          primary={true}
          onClick={this.handleRedirect('/achievement')}
          icon={<FlightTakeoff />}
          label="Isi Capaian" fullWidth={false} />
        <br />
        <br />
        <RaisedButton 
          primary={true}
          onClick={this.handleRedirect('/personality')}
          icon={<FlightTakeoff />}
          label="Isi Personality" fullWidth={false} />
        <br />
        <br />
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
