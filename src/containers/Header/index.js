import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar                 from 'components/AppBar';
import { push } from 'react-router-redux';
import LinearProgress from 'material-ui/LinearProgress';

/* actions */
import * as uiActionCreators from 'core/actions/actions-ui';

/* component styles */
import { styles } from './styles.scss';
import Snackbar from 'material-ui/Snackbar';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleToggle=() => {
    this.props.actions.ui.openNav();
  }

  handleToHome = () => {
    this.props.push('/');
  }

  render() {
    const { ui } = this.props
    return (
      <div className={styles}>
        <header>
          <AppBar onLeftIconButtonClick={this.handleToggle} title="Forum Indonesia Muda" onTitleClick={this.handleToHome} />
          {
            ui.isRunProgressBar && <LinearProgress mode="indeterminate" color="red" />
          }
          <Snackbar
            open={ui.snackBarOptions.isOpen}
            message={"this.state.message"}
            action="undo"
            autoHideDuration={ui.snackBarOptions.autoHideDuration}
            onActionClick={this.handleActionClick}
            onRequestClose={this.handleRequestClose}
          />
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    ui: state.ui
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    },
    push:  bindActionCreators(push, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);