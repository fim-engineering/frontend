import React, { Component }         from 'react';
import { connect }                  from 'react-redux';
import { bindActionCreators }       from 'redux';
import { AppBar, Avatar, FontIcon } from 'material-ui';

/* actions */
import * as uiActionCreators from 'actions/actions-ui';

/* component styles */
import { styles } from './styles.scss';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles}>
        footer goes here
      </div>
    );
  }
}


export default connect(null, null)(Footer);