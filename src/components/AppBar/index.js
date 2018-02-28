/**
 * AppBar
 */

import React                   from 'react';
import MuiAppBar               from 'material-ui/AppBar';

/* component styles */
import { styles } from './styles.scss';

export default function AppBar(props) {
  return (
    <div className={styles}>
      <MuiAppBar {...props} className="app-bar" />
    </div>
  );
}
