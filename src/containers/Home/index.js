import React, { Component } from 'react';
import { connect }            from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as _ from 'lodash'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

/* component styles */
import { styles } from './styles.scss';

import * as uiActionCreators   from 'core/actions/actions-ui';
import * as userActionCreators   from 'core/actions/actions-user';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import { GetProfile as getProfileAction } from '../../api'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
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
  }

  renderNonLoggedInUser = () => {
    return (<div><span>Please </span>
      <RaisedButton 
        primary={true}
        onClick={this.handleRedirect('/sign_up')}
        label="Register" fullWidth={false} />
      <span>to get started</span>
    </div>)
  }

  renderLoggedInUser = (stepIndex) => {
    const { user } = this.props
    const { userProfile } = this.state
    console.log("userProfile: ", userProfile);

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
                  primary={true}
                  onClick={this.handleRedirect('/profile')}
                  icon={<ActionAndroid />}
                  label="Isi Data Diri" fullWidth={false} />
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.props.actions.ui.jumpToStep(1)}>
                  Capaian
              </StepButton>
              <StepContent>
                <RaisedButton 
                  primary={true}
                  onClick={this.handleRedirect('/achievement')}
                  icon={<FlightTakeoff />}
                  label="Isi Capaian" fullWidth={false} />
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.props.actions.ui.jumpToStep(2)}>
                Personality
              </StepButton>
              <StepContent>
                <RaisedButton 
                  primary={true}
                  onClick={this.handleRedirect('/personality')}
                  icon={<FlightTakeoff />}
                  label="Isi Personality" fullWidth={false} />
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.props.actions.ui.jumpToStep(3)}>
                Tentang Aku dan FIM
              </StepButton>
              <StepContent>
                <RaisedButton 
                  primary={true}
                  onClick={this.handleRedirect('/me-fim')}
                  icon={<FlightTakeoff />}
                  label="Isi Tentang Aku dan FIM" fullWidth={false} />
                {this.renderStepActions(3)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.props.actions.ui.jumpToStep(4)}>
                Konfirmasi
              </StepButton>
              <StepContent>
                <RaisedButton 
                  primary={true}
                  onClick={this.toggleModal}
                  icon={<FlightTakeoff />}
                  label="Submit ?" fullWidth={false} />
                <Dialog
                  title="Kamu yakin akan submit pendaftaran kamu ?"
                  actions={actions}
                  modal={true}
                  contentStyle={customModalStyle}
                  open={this.state.isOpen}
                >
                  Setelah melakukan submit, tidak bisa merubah isian formulir kembali
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

    return (
      <div className={styles}>
        Welcome to FIM Information System
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
