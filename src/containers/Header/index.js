import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar                 from 'components/AppBar';
import { push } from 'react-router-redux';
import LinearProgress from 'material-ui/LinearProgress';
import SweetAlert from 'react-bootstrap-sweetalert';

/* actions */
import * as uiActionCreators from 'core/actions/actions-ui';

/* component styles */
import { styles } from './styles.scss';
import { redA700 } from 'material-ui/styles/colors';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleToggle=() => {
    this.props.actions.ui.openNav();
  }

  handleCloseSnackbar = () => {
    this.props.actions.ui.toggleNotification({ isOpen: false });
  }

  handleToHome = () => {
    this.props.push('/');
  }

  render() {
    const { ui } = this.props
    return (
      <div className={styles}>
        <header>
          {
            ui.isRunProgressBar && <LinearProgress mode="indeterminate" color="red" />
          }
          <AppBar style={{backgroundColor: redA700}} onLeftIconButtonClick={this.handleToggle} title="Forum Indonesia Muda" onTitleClick={this.handleToHome} />
          {/*<Snackbar
            open={ui.snackBarOptions.isOpen}
            message={ui.snackBarOptions.text}
            autoHideDuration={ui.snackBarOptions.autoHideDuration}
            onRequestClose={this.handleCloseSnackbar}
          />*/}
          <SweetAlert
            success
            show={ui.snackBarOptions.isOpen}
            title="Perhatian!"
            onConfirm={this.handleCloseSnackbar}>
            {ui.snackBarOptions.text}
          </SweetAlert>
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
