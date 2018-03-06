import React, { Component } from 'react';
import { connect }            from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as _ from 'lodash'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';

/* component styles */
import { styles } from './styles.scss';

import * as uiActionCreators   from 'core/actions/actions-ui';
import * as userActionCreators   from 'core/actions/actions-user';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import RegIcon from 'material-ui/svg-icons/action/account-box';
import ActIcon from 'material-ui/svg-icons/maps/local-activity';
import PersIcon from 'material-ui/svg-icons/editor/bubble-chart';
import MeandFIcon from 'material-ui/svg-icons/hardware/toys';
import FlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import {
  GetProfile as getProfileAction,
  SubmitFinal as submitFinalAction
} from '../../api'
import { GTM } from '../../helpers';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isConfirm: false,
    userProfile: {},
    isLoadedProfile: false,
    isOpen: false,
    stepIndex: 0,
  }

  handleRedirect = (path) => () => {
    this.props.push(path)
  }

  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        {step > 0 && step < 4 && (
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={() => this.props.actions.ui.jumpToStep(step - 1)}
          />
        )}
        {step < 4 && (<RaisedButton
            label="Next"
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onClick={() => this.props.actions.ui.jumpToStep(step + 1)}
            style={{marginRight: 12}}
          />
        )}
      </div>
    );
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

  toggleModal = () => {
    console.log("trigger modal");
    this.setState({isOpen: !this.state.isOpen});
  };

  handleFinalSubmit = () => {
    console.log("handleFinalSubmit");
    const token = _.result(this, 'props.user.token', '');
    const content = { token }
    submitFinalAction(content)
      .then(res => {
        if (res.code === 200) {
          GTM.pushEvent('FIM20', 'Home', 'Submit Final', '')
          this.props.actions.user.changeUserData({
            statusSubmit: {
              final: 1
            }
          })
          this.toggleModal()
          this.showToaster('Sukses Submit')
        } else {
          this.toggleModal()
          this.showToaster('Gagal Submit')
        }
      })
      .catch(() => this.showToaster('Gagal Submit'))
  }

  showToaster = (message) => {
    this.props.actions.ui.toggleNotification({
      isOpen: true,
      text: message
    });
  }

  renderNonLoggedInUser = () => {
    return (<div style={{marginTop: 30}}><span>Please </span>
      <RaisedButton
        primary={true}
        onClick={this.handleRedirect('/sign_up')}
        label="Register" fullWidth={false} />
      <span>to get started</span>
    </div>)
  }

  updateConfirm = () => {
    this.setState({
      isConfirm: !this.state.isConfirm
    })
  }

  renderLoggedInUser = (stepIndex) => {
    const { user } = this.props
    const { userProfile } = this.state
    console.log("userProfile: ", userProfile);

    const isSubmitFinalSubmit = _.result(user, 'statusSubmit.final', 0) === 1

    const customModalStyle = {
      width: '100%',
      maxWidth: 'none',
    };

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.toggleModal}
      />,
      <FlatButton
        disabled={!this.state.isConfirm}
        label="Submit"
        primary={true}
        onClick={this.handleFinalSubmit}
      />,
    ];

    return (
      <div>
        Hallo {user.email}
        <br />
        <br />
        {
          isSubmitFinalSubmit && <h1>Terima Kasih sudah mendaftar, tunggu kabar dari kami ya</h1>
        }
        <br />
        <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
          <Stepper
            activeStep={stepIndex}
            linear={false}
            orientation="vertical"
          >
            <Step>
              <StepButton onClick={() => this.props.actions.ui.jumpToStep(0)}>
                Data Diri
              </StepButton>
              <StepContent>
                <RaisedButton
                  disabled={isSubmitFinalSubmit}
                  primary={true}
                  onClick={this.handleRedirect('/profile')}
                  icon={<RegIcon />}
                  label="Isi Data Diri" fullWidth={false} />
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.props.actions.ui.jumpToStep(1)}>
                  Aktivitas dan Kepribadian
              </StepButton>
              <StepContent>
                <RaisedButton
                  disabled={isSubmitFinalSubmit}
                  primary={true}
                  onClick={this.handleRedirect('/achievement')}
                  icon={<ActIcon />}
                  label="Aktivitas dan Kepribadian" fullWidth={false} />
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.props.actions.ui.jumpToStep(2)}>
                Personality
              </StepButton>
              <StepContent>
                <RaisedButton
                  disabled={isSubmitFinalSubmit}
                  primary={true}
                  onClick={this.handleRedirect('/personality')}
                  icon={<PersIcon />}
                  label="Personality" fullWidth={false} />
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.props.actions.ui.jumpToStep(3)}>
                Tentang aku dan FIM
              </StepButton>
              <StepContent>
                <RaisedButton
                  disabled={isSubmitFinalSubmit}
                  primary={true}
                  onClick={this.handleRedirect('/me-fim')}
                  icon={<MeandFIcon />}
                  label="Tentang aku dan FIM" fullWidth={false} />
                {this.renderStepActions(3)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.props.actions.ui.jumpToStep(4)}>
                Konfirmasi
              </StepButton>
              <StepContent>
                <RaisedButton
                  disabled={isSubmitFinalSubmit}
                  primary={true}
                  onClick={this.toggleModal}
                  icon={<FlightTakeoff />}
                  label="Submit ?" fullWidth={false} />
                <Dialog
                  title="Kamu yakin akan submit pendaftaran kamu ?"
                  actions={actions}
                  modal={true}
                  contentStyle={customModalStyle}
                  autoScrollBodyContent={true}
                  open={this.state.isOpen}
                >
                  Setelah melakukan submit, tidak bisa merubah isian formulir kembali
                  <br />
                  <br />
                  <Checkbox
                    label="Saya mengkonfirmasi kebenaran bahwa data yang diisi adalah data sebenarnya, dan jika saya diterima sebagai kader next gen FIM regional, saya akan berkontribusi selama minimal 1 tahun ke depan"
                    checked={this.state.isConfirm}
                    onCheck={this.updateConfirm}
                    style={{
                      marginBottom: 16,
                    }}
                  />
                </Dialog>
                {this.renderStepActions(4)}
              </StepContent>
            </Step>
          </Stepper>
        </div>
      </div>
    )
  }

  render() {
    const { user, ui } = this.props
    const isLogin = user.isLoggedIn
    const isSubmitFinalSubmit = _.result(user, 'statusSubmit.final', 0) === 1
    return (
      <div className={styles}>
        <span style={{fontSize: '30pt', maxHeight: 400, margin: 'auto'}}> Selamat Datang pada Portal Pendaftaran FIM </span>
        {
          isLogin && this.renderLoggedInUser(ui.stepIndex)
        }
        {
          !isLogin && this.renderNonLoggedInUser()
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
