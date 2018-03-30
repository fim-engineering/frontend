import React, { Component }       from 'react';
import { connect }                from 'react-redux';
import injectTapEventPlugin       from 'react-tap-event-plugin';
import getMuiTheme                from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider           from 'material-ui/styles/MuiThemeProvider';
import { Route, Switch }      from 'react-router-dom'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import ReactGA from 'react-ga';
import CircularProgress from 'material-ui/CircularProgress';

// global styles for entire app
import './styles/app.scss';

/* application containers */
import Header     from 'containers/Header';
import LeftNavBar from 'containers/LeftNavBar';
import Home       from 'containers/Home';
import About       from 'containers/About';
import Login       from 'containers/Login';
import NotFound       from 'containers/NotFound';
import Register       from 'containers/Register';
import ResetPassword       from 'containers/ResetPassword';
import ChangePassword       from 'containers/ChangePassword';
import DataUmum       from 'containers/DataUmum';
import Achievement       from 'containers/Achievement';
import Personality       from 'containers/Personality';
import AboutFIM       from 'containers/AboutFIM';
import Profile       from 'containers/Profile';
import FAQ       from 'containers/FAQ';
import ForgotPassword       from 'containers/ForgotPassword';
import Statistik       from 'containers/Statistik';

import * as uiActionCreators   from 'core/actions/actions-ui';
import * as userActionCreators   from 'core/actions/actions-user';

import { GetStatusFinal as getStatusFinalAction } from '../../api'

injectTapEventPlugin();

export class App extends Component {
  constructor(props) {
    super(props);

    // Add your tracking ID created from https://analytics.google.com/analytics/web/#home/
    ReactGA.initialize('UA-46836193-2');
    // This just needs to be called once since we have no routes in this case.
    ReactGA.pageview(window.location.pathname);
  }

  state = {
    isLoaded: false
  }

  componentDidMount = () => {
    
    // var Tawk_API = window.Tawk_API || {}, Tawk_LoadStart=new Date();
    // (function(){
    //   var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    //   s1.async=true;
    //   s1.src='https://embed.tawk.to/5a95d926d7591465c70814a0/default';
    //   s1.charset='UTF-8';
    //   s1.setAttribute('crossorigin','*');
    //   s0.parentNode.insertBefore(s1,s0);
    //   })();
  }

  componentWillUpdate = (nextProps, nextState) => {
    const { user } = nextProps
    console.log("user di APP: ", user);
    const isLogin = user.isLoggedIn
    console.log("isLogin: ", isLogin);

    if (isLogin && !this.state.isLoaded) {
      const token = _.result(nextProps, 'user.token', '');
      const content = { token }
      getStatusFinalAction(content)
        .then(response => {
          console.log("response: ", response);
          this.setState({ isLoaded: true })
          this.props.actions.user.changeUserData({
            statusSubmit: response,
          })
        })
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Header />
          <Helmet>
            <meta charSet="utf-8" />
            <title>Forum Indonesia Muda</title>
            <link rel="icon" href="http://www.forumindonesiamuda.org/wp-content/uploads/2016/02/cropped-logofim-32x32.png" sizes="32x32" />
          </Helmet>
          <div className="container">
            <Router history={this.props.history} >
              <div>
                {
                  this.props.ui.isLoading && <div>
                    <h1>Sedang Proses..mohon tunggu sebentar</h1>
                    <CircularProgress size={80} thickness={5} />
                  </div>
                }
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path="/about" component={About}/>
                  <Route path="/sign_in" component={Login}/>
                  <Route path="/sign_up" component={Register}/>
                  <Route path="/account/reset_password/:token" component={ResetPassword}/>
                  <Route path="/account/change_password" component={ChangePassword}/>
                  <Route path="/profile" component={DataUmum}/>
                  <Route path="/achievement" component={Achievement}/>
                  <Route path="/personality" component={Personality}/>
                  <Route path="/me-fim" component={AboutFIM}/>
                  <Route path="/myprofile" component={Profile}/>
                  <Route path="/forgot-password" component={ForgotPassword}/>
                  <Route path="/faq" component={FAQ}/>
                  <Route path="/statistik" component={Statistik}/>

                  <Route path="/*" component={NotFound}/>
                </Switch>
              </div>
            </Router>
          </div>
          <LeftNavBar />
        </div>
      </MuiThemeProvider>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);