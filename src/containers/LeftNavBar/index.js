import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer, AppBar, Divider } from 'material-ui';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import HomeIcon from 'material-ui/svg-icons/action/home';
import AssistanIcon from 'material-ui/svg-icons/image/assistant';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
/* component styles */
import { styles } from './styles.scss';

/* actions */
import * as uiActionCreators   from 'core/actions/actions-ui';

class LeftNavBar extends Component {
  constructor(props) {
    super(props);
  }

  closeNav=() => {
    this.props.actions.ui.closeNav();
  }

  handleRedirect = (path) => () => {
    this.props.push(path);
    this.closeNav()
  }

  render() {
    return (
      <div className={styles} >
        <Drawer
          docked={false}
          open={this.props.ui.leftNavOpen}
          onRequestChange={this.closeNav}>
          <AppBar title="FIM" />
          <Divider />
          <Menu>
            <MenuItem onClick={this.handleRedirect('/')} primaryText="Home" leftIcon={<HomeIcon />} />
            <MenuItem onClick={this.handleRedirect('/about')} primaryText="About" leftIcon={<AssistanIcon />} />
            <MenuItem onClick={this.handleRedirect('/login')} primaryText="Login" leftIcon={<FileUpload />} />
          </Menu>
        </Drawer>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    ui: state.ui
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui   : bindActionCreators(uiActionCreators, dispatch)
    },
    push:  bindActionCreators(push, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavBar);