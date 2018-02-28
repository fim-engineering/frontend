import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

export default class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles}>
      <p>
      Portal Sistem Informasi FIM dibangun sejak tahun 2013, awalnya sebagai portal pendaftaran peserta FIM 14.
      </p>

      <p>
      Saat ini, portal direncanakan untuk menjadi pusat data bagi organisasi FIM secara keseluruhan, dan akan dibangun secara bertahap.
      </p>

      <p>
      Kontributor Portal 2013 - 2018 :
      </p>
      <ul>
        <li>Pahlevi Fikri Aulia</li>
        <li>Ihsan Satriawan</li>
        <li>Almas Shabrina</li>
        <li>Febrian Imanda</li>
        <li>Bagus Dwi Utama</li>
        <li>Alim</li>
        <li>Habibie</li>
      </ul>
      </div>
    );
  }
}
