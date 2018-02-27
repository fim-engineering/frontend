import React, { Component }       from 'react';
import { connect }                from 'react-redux';
import injectTapEventPlugin       from 'react-tap-event-plugin';
import getMuiTheme                from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider           from 'material-ui/styles/MuiThemeProvider';
import { Route, Switch }      from 'react-router-dom'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Helmet } from 'react-helmet';


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

injectTapEventPlugin();

export class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    
    var Tawk_API = window.Tawk_API || {}, Tawk_LoadStart=new Date();
    (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/5a95d926d7591465c70814a0/default';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();
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

export default connect(null)(App);