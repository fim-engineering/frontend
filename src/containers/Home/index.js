import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

/* component styles */
import { styles } from './styles.scss';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles}>
        Welcome to FIM Information System
      </div>
    );
  }
}
