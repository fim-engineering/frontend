import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as _ from 'lodash';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';

/* component styles */
import { styles } from './styles.scss';
import * as uiActionCreators   from 'core/actions/actions-ui';
import * as userActionCreators   from 'core/actions/actions-user';
import { Login as LoginAction } from '../../api'
import { getKota as getKotaAction } from '../../api'

import ImageUploader from '../../components/ImageUploader';
import { listKota, listKampus } from '../../helpers'

class DataUmum extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    gender: 'Male',
    city: 'Dki Jakarta',
    email: '',
    password: '',
    isProcessLogin: false,
    imageURL: '',
    image: {
      load: '',
      stream: ''
    },
    imageURLProfile: '',
    imageProfile: {
      loadProfile: '',
      streamProfile: ''
    }
  }

  componentDidMount = () => {
    const isLoggedIn = _.result(this, 'props.user.isLoggedIn', false);
    if (!isLoggedIn) {
      this.handleChangeRoute('/')()
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const isLoggedIn = _.result(nextProps, 'user.isLoggedIn', false);
    if (!isLoggedIn) {
      this.handleChangeRoute('/')()
    }
  }

  handleInput = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  handleChangeRoute = (path) => () => {
    this.props.push(path)
  }

  toggleDisableButton = () => {
    this.setState({
      isProcessLogin: !this.state.isProcessLogin
    })
  }

  showToaster = (message) => {
    this.props.actions.ui.toggleNotification({
      isOpen: true,
      text: message
    });
  }

  handleClick = () => {
    const { actions } = this.props
    const { email, password } = this.state
    actions.ui.toggleProgressbar(true);

    const content = {
      email,
      password
    }
    this.toggleDisableButton()
    LoginAction(content)
      .then(res => {
        const userID = _.result(res, 'user.id', 0)
        if (userID !== 0) {
          actions.user.changeUserData({
            isLoggedIn: true,
            userID,
            email: _.result(res, 'user.email', ''),
            token: _.result(res, 'token.original.access_token', '')
          })
          this.showToaster('Sukses Login')
          actions.ui.toggleProgressbar(false);
          this.toggleDisableButton()
          this.handleChangeRoute('/')()
        } else {
          this.showToaster('Gagal Login')
          actions.ui.toggleProgressbar(false);
          this.toggleDisableButton()
        }
      })
      .catch(() => {
        this.showToaster('Gagal Login')
        actions.ui.toggleProgressbar(false);
        this.toggleDisableButton()
      })
  }

  handleImageLoad = (path, stream, error) => {
    if(error === '') {
      this.setState({image: {
        load: path, 
        stream: stream
      }})
    } else {
      console.log('failed');
    }
  }

  handleImageLoadProfile = (path, stream, error) => {
    if(error === '') {
      this.setState({imageProfile: {
        loadProfile: path, 
        streamProfile: stream
      }})
    } else {
      console.log('failed');
    }
  }

  handleRemoveImage = () => {
    this.setState({
      imageURL:'',
      image: {
        load: '',
        stream: ''
      }
    })
  }

  handleRemoveImageProfile = () => {
    this.setState({
      imageURLProfile:'',
      imageProfile: {
        loadProfile: '',
        streamProfile: ''
      }
    })
  }

  handleInput = (key, value) => {
    console.log("key: ", key, " | value: ", value);
    this.setState({
      [key]: value
    })
  }

  handleUpload = () => {
    const cloudName = 'fim-indonesia';
    const unsignedUploadPreset = 'profile_photo';
    const HOST = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    let fd = new FormData()

    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', this.state.image.load);

    
    fetch(HOST,{
      body: fd,
      method: 'POST'
    }).then((response) => {
      return response.json()
    }).then((result) => {
      console.log('result===: ', result);
      console.log('result===image: ', result.secure_url);
      alert(`Your URL image: ${result.secure_url}`)
    })
  }

  handleRemoveImage = () => {
    this.setState({
      imageURL:'',
      image: {
        load: '',
        stream: ''
      }
    })
  }

  render() {
    const { email, password, isProcessLogin, image } = this.state
    const isDisabledLogin = email === '' || password === '' || isProcessLogin
    const labelButtonLogin = isProcessLogin ? 'Process' : 'Login'
    console.log('this.state.city===: ', this.state.city);
    console.log('this.state.gender===: ', this.state.gender);
    console.log('this.state.institution===: ', this.state.institution);
    console.log('this.state.blood===: ', this.state.blood);
    console.log('this.state.born_date===: ', this.state.born_date);
    console.log('this.state.born_city===: ', this.state.born_city);
    console.log('this.state.marriage_status===: ', this.state.marriage_status);
    return (
      <div className={styles}>
        <h2>Nama Lengkap</h2>
        <TextField
          hintText="Full Name"
          floatingLabelText="Full Name"
          onChange = {(e, newValue) => this.handleInput('full_name', newValue)}/>
        <br />

        <h2>Alamat</h2>
        <TextField
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="Address"
          onChange = {(e, newValue) => this.handleInput('address', newValue)}/>
        <br />

        <h2>Nomor Telpon</h2>
        <br />
        <TextField
          hintText="Phone"
          floatingLabelText="Phone"
          type="number"
          onChange = {(e, newValue) => this.handleInput('phone', newValue)}/>
        <br />

        <h2>Jenis Kelamin</h2>
        <DropDownMenu value={this.state.gender} onChange={(e, index, newValue) => this.handleInput('gender', newValue)}>
          <MenuItem value={'Male'} primaryText="Male" />
          <MenuItem value={'Female'} primaryText="Female" />
        </DropDownMenu>
        <br />

        <h2>Regional</h2>
        <DropDownMenu value={this.state.city} onChange={(e, index, newValue) => this.handleInput('city', newValue)}>
          {
            listKota.map(kota => {
              return <MenuItem value={kota} primaryText={kota} />
            })
          }
        </DropDownMenu>

        <br />
        <TextField
          hintText="Angkatan"
          floatingLabelText="Angkatan"
          type="number"
          onChange = {(e, newValue) => this.handleInput('generations', newValue)}/>
        <br />

        <br />
        <TextField
          hintText="Jurusan"
          floatingLabelText="Jurusan"
          type="text"
          onChange = {(e, newValue) => this.handleInput('majors', newValue)}/>
        <br />

        <br />
        <AutoComplete
          floatingLabelText="Kampus"
          onUpdateInput={(searchText, dataSource) => this.handleInput('institution', searchText)}
          filter={AutoComplete.fuzzyFilter}
          dataSource={_.uniq(listKampus)}
          maxSearchResults={5}
        />
        
        <h2>Upload KTP</h2>
        <ImageUploader 
          onLoadFile={this.handleImageLoad} 
          valueImage={this.state.image.stream} 
          onRemoveImage={this.handleRemoveImage}/>
        <br />

        <h2>Upload Photo</h2>
        <ImageUploader 
          onLoadFile={this.handleImageLoadProfile} 
          valueImage={this.state.imageProfile.streamProfile} 
          onRemoveImage={this.handleRemoveImageProfile}/>
        <br />

        <h2>Golongan Darah</h2>
        <br />
        <AutoComplete
          floatingLabelText="Golongan Darah"
          onUpdateInput={(searchText, dataSource) => this.handleInput('blood', searchText)}
          filter={AutoComplete.fuzzyFilter}
          dataSource={['A', 'B', 'O', 'AB']}
          maxSearchResults={5}
        />
        <br />

        <h2>Tanggal Kelahiran</h2>
        <br />
        <DatePicker
          hintText="Tanggal Lahir"
          onChange={(_, date) => {
            console.log("date: ", date)
            const yyyy = date.getFullYear().toString();
            const mm = (date.getMonth()+1).toString();
            const dd  = date.getDate().toString();
            console.log("yyyy: ", yyyy)
            console.log("mm: ", mm)
            console.log("dd: ", dd)
            this.handleInput('born_date', `${yyyy}-${mm}-${dd}`)
          }}
          container="inline" />
        <br />

        <h2>Kota Kelahiran</h2>
        <br />
        <AutoComplete
          floatingLabelText="Kota Lahir"
          onUpdateInput={(searchText, dataSource) => this.handleInput('born_city', searchText)}
          filter={AutoComplete.fuzzyFilter}
          dataSource={_.uniq(listKota)}
          maxSearchResults={5}
        />
        <br />

        <h2>Status Menikah</h2>
        <br />
        <DropDownMenu value={this.state.marriage_status} onChange={(e, index, newValue) => this.handleInput('marriage_status', newValue)}>
          <MenuItem value={1} primaryText="Menikah" />
          <MenuItem value={0} primaryText="Belum Menikah" />
        </DropDownMenu>
        <br />

        <h2>Agama</h2>
        <br />
        <DropDownMenu value={this.state.religion} onChange={(e, index, newValue) => this.handleInput('religion', newValue)}>
          <MenuItem value={"Islam"} primaryText="Islam" />
          <MenuItem value={"Kristen Protestan"} primaryText="Kristen Protestan" />
          <MenuItem value={"Kristen Katolik"} primaryText="Kristen Katolik" />
          <MenuItem value={"Hindu"} primaryText="Hindu" />
          <MenuItem value={"Buddha"} primaryText="Buddha" />
          <MenuItem value={"Khonghucu"} primaryText="Khonghucu" />
        </DropDownMenu>
        <br />

        <h2>Media Sosial</h2>
        <TextField
          hintText="Facebook"
          floatingLabelText="Facebook"
          onChange = {(e, newValue) => this.handleInput('facebook', newValue)}/>
        <br />
        <TextField
          hintText="Instagram"
          floatingLabelText="Instagram"
          onChange = {(e, newValue) => this.handleInput('instagram', newValue)}/>
        <br />
        <TextField
          hintText="Blog"
          floatingLabelText="Blog"
          onChange = {(e, newValue) => this.handleInput('blog', newValue)}/>
        <br />
        <TextField
          hintText="Line"
          floatingLabelText="Line"
          onChange = {(e, newValue) => this.handleInput('line', newValue)}/>
        <br />

        <h2>Riwayat Penyakit</h2>
        <TextField
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="Riwayat Penyakit"
          onChange = {(e, newValue) => this.handleInput('disease_history', newValue)}/>
        <br />

        <RaisedButton label="Upload" primary={true} onClick={this.handleUpload}/>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      ui   : bindActionCreators(uiActionCreators, dispatch),
      user   : bindActionCreators(userActionCreators, dispatch)
    },
    push:  bindActionCreators(push, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataUmum);
