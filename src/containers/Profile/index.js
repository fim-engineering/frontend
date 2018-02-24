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
import { GetProfile as getProfileAction } from '../../api'

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    userProfile: {},
    isLoadedProfile: false
  }

  handleRedirect = () => {
    this.props.push('/profile')
  }

  componentWillMount = () => {
    const token = _.result(this.props, 'user.token', '');
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

  renderLoggedInUser = () => {
    const { user } = this.props
    const { userProfile } = this.state
    console.log("userProfile: ", userProfile);
    return (
      <div>
        Hallo {userProfile.full_name}
        <br />
        <br />
        <br />
        <img src={userProfile.photo_profile_link} />
      </div>
    )
  }

  render() {
    const { user } = this.props
    const isLogin = user.isLoggedIn

    return (
      <div className={styles}>
        Data Profile
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
