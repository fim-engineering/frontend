import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as _ from 'lodash';

/* component styles */
import { styles } from './styles.scss';
import * as uiActionCreators   from 'core/actions/actions-ui';
import * as userActionCreators   from 'core/actions/actions-user';
import { Login as LoginAction } from '../../api'

import ImageUploader from '../../components/ImageUploader';

class DataUmum extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: '',
    password: '',
    isProcessLogin: false,
    imageURL: '',
    image: {
      load: '',
      stream: ''
    }
  }

  componentDidMount = () => {
    const isLoggedIn = _.result(this, 'props.user.isLoggedIn', false);
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

  handleRemoveImage = () => {
    this.setState({
      imageURL:'',
      image: {
        load: '',
        stream: ''
      }
    })
  }

  handleUpload = () => {
    const cloudName = 'fim-indonesia';
    const unsignedUploadPreset = 'jugqbeem';
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
    })
  }

  render() {
    const { email, password, isProcessLogin, image } = this.state
    const isDisabledLogin = email === '' || password === '' || isProcessLogin
    const labelButtonLogin = isProcessLogin ? 'Process' : 'Login'
    console.log('image===: ', image);
    return (
      <div className={styles}>
        <ImageUploader 
          onLoadFile={this.handleImageLoad} 
          valueImage={this.state.image.stream} 
          onRemoveImage={this.handleRemoveImage}/>
        <RaisedButton label="Upload" primary={true} onClick={this.handleUpload}/>
        <br />
        <br />
        <br />
        <div>Belum mendaftar ? Daftarkan diri anda sekarang!</div>
        <RaisedButton label="Daftar" primary={true} onClick={this.handleChangeRoute('/sign_up')}/>
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
