import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

/* component styles */
import { styles } from './styles.scss';

const listPeople = [
  {
    urlPath: 'pahleviauliya',
    imgSrc: 'https://media.licdn.com/media/p/6/005/023/15e/0d3cdc9.jpg',
    Name: 'Pahlevi Fikri Auliya'
  },
  {
    urlPath: 'ihsansatriawan',
    imgSrc: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAzTAAAAJDk3ZjNmMDE2LTU5MzgtNDllMi1hMWRlLThmNzU4MGI3ODczOA.jpg',
    Name: 'Ihsan Satriawan'
  },
  {
    urlPath: 'almasshabrina',
    imgSrc: 'https://media.licdn.com/media/AAIA_wDGAAAAAQAAAAAAAA0dAAAAJGZkYWU1YTIxLWIyMDYtNGFmNi1hOGY2LWU3ZmMzMmQxNDc1ZQ.jpg',
    Name: 'Almas Shabrina'
  },
  {
    urlPath: 'febrianimanda',
    imgSrc: 'https://media.licdn.com/media/AAEAAQAAAAAAAA1uAAAAJDQyODEzYTRkLTlhOGUtNDdhZS1hMTcxLWY3MTk1ZDA0Y2EyMQ.jpg',
    Name: 'Febrian Imanda E.'
  },
  {
    urlPath: 'bagus-dwi-utama-9244ab97',
    imgSrc: 'https://media.licdn.com/media/AAEAAQAAAAAAAAlbAAAAJDQxNDA2Zjc3LTk5YzMtNGVjZS1hZTg2LTVjNGU0MjdmZjIzNw.jpg',
    Name: 'Bagus Dwi Utama'
  },
]

export default class About extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (url) => () => {
    window.open(`https://www.linkedin.com/in/${url}`)
  }

  renderCard = (urlPath, imgSrc, Name) => {
    const styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
    return (
      <li>
        <Chip
            onClick={this.handleClick(urlPath)}
            style={styles.chip}
            style={{margin: 'auto', marginBottom:10}}
        >
          <Avatar src={imgSrc} />
          {Name}
        </Chip>
      </li>
    )
  }

  render() {

    return (
      <div className={styles} style={{maxWidth: 380, maxHeight: 400, margin: 'auto', padding:10}}>
      <p>
      Portal Sistem Informasi FIM dibangun sejak tahun 2013, awalnya sebagai portal pendaftaran peserta FIM 14.
      </p>

      <p>
      Saat ini, portal direncanakan untuk menjadi pusat data bagi organisasi FIM secara keseluruhan, dan akan dibangun secara bertahap.
      </p>

      <p style={{marginBottom: 20}}>
      Kontributor Portal 2013 - 2018 :


      </p>

      <ul>
      {
        listPeople.map(people => this.renderCard(people.urlPath, people.imgSrc, people.Name))
      }
      </ul>
      </div>
    );
  }
}
