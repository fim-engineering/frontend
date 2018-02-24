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
import Profile       from 'containers/Profile';

injectTapEventPlugin();

export class App extends Component {
  constructor(props) {
    super(props);
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