import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import * as _ from 'lodash';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import HomeIcon from 'material-ui/svg-icons/action/home';
import AssistanIcon from 'material-ui/svg-icons/image/assistant';
import AboutIcon from 'material-ui/svg-icons/action/supervisor-account';
import RegIcon from 'material-ui/svg-icons/action/account-box';
import FaqIcon from 'material-ui/svg-icons/action/speaker-notes';

import { push } from 'react-router-redux';
// import { Link } from 'react-router-dom';
/* component styles */
import { styles } from './styles.scss';
import { Logout as LogoutAction } from '../../api'

/* actions */
import * as uiActionCreators   from 'core/actions/actions-ui';
import * as userActionCreators   from 'core/actions/actions-user';
import { redA700 } from 'material-ui/styles/colors';

class LeftNavBar extends Component {
  constructor(props) {
    super(props);
  }

  closeNav=() => {
    this.props.actions.ui.closeNav();
  }

  handleRedirect = (path) => () => {
    this.closeNav()
    this.props.push(path);
  }

  showToaster = (message) => {
    this.props.actions.ui.toggleNotification({
      isOpen: true,
      text: message
    });
  }

  handleLogut = () => {
    const { actions } = this.props
    const content = _.result(this, 'props.user.token', '');
    actions.ui.toggleProgressbar(true);
    LogoutAction(content)
      .then(res => {
        console.log('res===: ', res);
        actions.ui.toggleProgressbar(false);
        this.showToaster(res.message);
        actions.user.resetUserData();
        this.closeNav()
        this.handleRedirect('/')
      })
      .catch(() => {
        actions.ui.toggleProgressbar(false);
        this.showToaster('Gagal Logount');
        actions.user.resetUserData();
        this.closeNav()
      })
  }

  render() {
    const { user } = this.props
    const isLogin = user.isLoggedIn
    const textAppBar = `Hello ${isLogin ? user.email : ''}`
    return (
      <div className={styles} >
        <Drawer
          docked={false}
          open={this.props.ui.leftNavOpen}
          onRequestChange={this.closeNav}>
          <AppBar style={{backgroundColor: redA700}}  title={textAppBar} />
          <Divider />
          <Menu>
            <MenuItem onClick={this.handleRedirect('/')} primaryText="Home" leftIcon={<HomeIcon />} />
            <MenuItem onClick={this.handleRedirect('/about')} primaryText="About" leftIcon={<AboutIcon />} />
            <MenuItem onClick={this.handleRedirect('/faq')} primaryText="FAQ" leftIcon={<FaqIcon />} />
            {/*
              !isLogin && <MenuItem onClick={this.handleRedirect('/sign_up')} primaryText="Register" leftIcon={<RegIcon />} />
            */}
            {/*
              !isLogin && <MenuItem onClick={this.handleRedirect('/sign_in')} primaryText="Login" leftIcon={<FileUpload />} />
            */}
            {
              !isLogin && <MenuItem onClick={this.handleRedirect('/forgot-password')} primaryText="Forgot Password" leftIcon={<FileUpload />} />
            }
            {/*
              isLogin && <MenuItem onClick={this.handleRedirect('/account/change_password')} primaryText="Change" leftIcon={<FileUpload />} />
            */}
            {
              isLogin && <MenuItem onClick={this.handleLogut} primaryText="Logout" leftIcon={<FileUpload />} />
            }
            {/*
              isLogin && <MenuItem onClick={this.handleRedirect('/profile')} primaryText="Profile" leftIcon={<FileUpload />} />
            */}
          </Menu>
        </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavBar);
