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
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Divider from 'material-ui/Divider';

/* component styles */
import { styles } from './styles.scss';
import * as uiActionCreators   from 'core/actions/actions-ui';
import * as userActionCreators   from 'core/actions/actions-user';
import { Login as LoginAction, GetRegional as GetRegionalAction } from '../../api'
import { 
  getKota as getKotaAction,
  UpdateProfile as updateProfileAction,
  GetProfile as getProfileAction
} from '../../api';
import ImageUploader from '../../components/ImageUploader';
import { listKota, listKampus } from '../../helpers'

class Achievement extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    listKota: listKota,
    born_date: '2018-01-01',
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

  componentWillMount = () => {
    const token = _.result(this, 'props.user.token', '');
    const content = { token }
    getProfileAction(content)
      .then(response => {
        this.setState({
          full_name: _.result(response, 'user_profile.full_name', '') || '',
          address: _.result(response, 'user_profile.address', '') || '',
          phone: _.result(response, 'user_profile.phone', '') || '',
          gender: _.result(response, 'user_profile.gender', '') || '',
          city: _.result(response, 'user_profile.city', '') || '',
          blood: _.result(response, 'user_profile.blood', '') || '',
          institution: _.result(response, 'user_profile.institution', '') || '',
          majors: _.result(response, 'user_profile.majors', '') || '',
          generation: _.result(response, 'user_profile.generation', '') || '',
          born_date: _.result(response, 'user_profile.born_date', '') || '2018-01-01',
          born_city: _.result(response, 'user_profile.born_city', '') || '',
          marriage_status: _.result(response, 'user_profile.marriage_status', '') || '',
          religion: _.result(response, 'user_profile.religion', '') || '',
          disease_history: _.result(response, 'user_profile.disease_history', '') || '',
          facebook: _.result(response, 'user_profile.facebook', '') || '',
          blog: _.result(response, 'user_profile.blog', '') || '',
          line: _.result(response, 'user_profile.line', '') || '',
          instagram: _.result(response, 'user_profile.instagram', '') || '',
          imageURL: _.result(response, 'user_profile.ktp_link', '') || '',
          imageURLProfile: _.result(response, 'user_profile.photo_profile_link', '') || '',
        })
      })
    
    GetRegionalAction(content)
      .then(res => {
        const regionals = res.regionals.map(regional => regional.regional_name)
        this.setState({ listKota: regionals })
      })
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
      }}, () => {
        this.handleUpload()
      })
    } else {
      console.log('failed');
    }
  }

  handleImageLoadProfile = (path, stream, error) => {
    if(error === '') {
      this.setState({imageProfile: {
        loadProfile: path, 
        streamProfile: stream
      }}, () => {
        this.handleUploadProfile()
      })
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
    this.setState({
      [key]: value
    })
  }

  handleSaveData = () => {
    const { actions } = this.props
    const { 
      full_name,
      institution,
      majors,
      generation,
      address,
      city,
      phone,
      gender,
      imageURLProfile,
      imageURL,
      blood,
      born_date,
      born_city,
      marriage_status,
      facebook,
      instagram,
      blog,
      line,
      disease_history,
      video_profile,
      religion,
    } = this.state
    const token = _.result(this, 'props.user.token', '');

    const content = {
      token,
      full_name,
      institution,
      majors,
      generation,
      address,
      city,
      phone,
      gender,
      photo_profile_link: imageURLProfile,
      ktp_link: imageURL,
      blood,
      born_date,
      born_city,
      marriage_status,
      facebook,
      instagram,
      blog,
      line,
      disease_history,
      religion,
      is_ready: 0,
    }
    actions.ui.toggleProgressbar(true);
    updateProfileAction(content)
      .then(response => {
        const resUserID = _.result(response, 'user_profile.user_id', 0)
        if (resUserID !== 0) {
          this.showToaster('Sukses Menyimpan')
          this.handleChangeRoute('/')()
        } else {
          const errorMessage = _.result(response, 'message', '')
          this.showToaster(errorMessage)
        }
        actions.ui.toggleProgressbar(false);
      })
      .catch(err => {
        actions.ui.toggleProgressbar(false);
      }) 
  }

  showToaster = (message) => {
    this.props.actions.ui.toggleNotification({
      isOpen: true,
      text: message
    });
  }

  handleUpload = () => {
    const cloudName = 'fim-indonesia';
    const unsignedUploadPreset = 'ID_card';
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
      this.setState({ imageURL: result.secure_url })
    })
  }

  handleUploadProfile = () => {
    const cloudName = 'fim-indonesia';
    const unsignedUploadPreset = 'profile_photo';
    const HOST = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    let fd = new FormData()

    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', this.state.imageProfile.loadProfile);

    
    fetch(HOST,{
      body: fd,
      method: 'POST'
    }).then((response) => {
      return response.json()
    }).then((result) => {
      this.setState({ imageURLProfile: result.secure_url })
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
    const {
      listKota,
      email,
      password,
      isProcessLogin,
      image,
      full_name,
      institution,
      majors,
      generation,
      address,
      city,
      phone,
      gender,
      photo_profile_link,
      ktp_link,
      blood,
      born_date,
      born_city,
      marriage_status,
      facebook,
      instagram,
      blog,
      line,
      disease_history,
      religion,
      imageURL,
      imageURLProfile,
    } = this.state
    const isDisabledLogin = email === '' || password === '' || isProcessLogin
    const labelButtonLogin = isProcessLogin ? 'Process' : 'Login'

    const year = parseInt(born_date.split('-')[0], 10)
    const month = parseInt(born_date.split('-')[1], 10)
    const day = parseInt(born_date.split('-')[2], 10)
    const oldDate = new Date(year,month,day);

    const styleDivider = { marginBottom: '20px', marginTop: '20px' }
    return (
      <div className={styles}>
        <h1>PENCAPAIAN</h1>
        <br />
        <br />
        <br />
        <h1>Pencapaian 1</h1>
        <br />
        <h2>Nama Pencapaian</h2>
        <TextField
          hintText="Nama Pencapaian"
          floatingLabelText="Nama Pencapaian"
          onChange = {(e, newValue) => this.handleInput('achievement', newValue)}/>
        <br />
        <h2>Tanggal Mulai</h2>
        <br />
        <DatePicker
          hintText="Tanggal Mulai"
          onChange={(_, date) => {
            const yyyy = date.getFullYear().toString();
            const mm = (date.getMonth()+1).toString();
            const dd  = date.getDate().toString();
            this.handleInput('date_from', `${yyyy}-${mm}-${dd}`)
          }}
          container="inline" />
        <br />
        <h2>Tanggal Selesai</h2>
        <br />
        <DatePicker
          hintText="Tanggal Selesai"
          onChange={(_, date) => {
            const yyyy = date.getFullYear().toString();
            const mm = (date.getMonth()+1).toString();
            const dd  = date.getDate().toString();
            this.handleInput('date_end', `${yyyy}-${mm}-${dd}`)
          }}
          container="inline" />
        <br />
        <h2>Nama Posisi</h2>
        <TextField
          hintText="Nama Posisi"
          floatingLabelText="Nama Posisi"
          onChange = {(e, newValue) => this.handleInput('position_name', newValue)}/>
        <br />
        <h2>Nomor Telpon Atasan</h2>
        <br />
        <TextField
          hintText="Nomor Telpon Atasan"
          floatingLabelText="Nomor Telpon Atasan"
          type="number"
          onChange = {(e, newValue) => this.handleInput('phone_leader', newValue)}/>
        <br />
        <h2>Email Atasan</h2>
        <br />
        <TextField
          hintText="Email Atasan"
          floatingLabelText="Email Atasan"
          type="number"
          onChange = {(e, newValue) => this.handleInput('email_leader', newValue)}/>
        <br />
        <h2>Deskripsi</h2>
        <TextField
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="Deskripsi"
          onChange = {(e, newValue) => this.handleInput('description', newValue)}/>
        <br />

        <Divider style={styleDivider} />

        <h1>Pencapaian 2</h1>
        <br />
        <h2>Nama Pencapaian</h2>
        <TextField
          hintText="Nama Pencapaian"
          floatingLabelText="Nama Pencapaian"
          onChange = {(e, newValue) => this.handleInput('achievement_2', newValue)}/>
        <br />
        <h2>Tanggal Mulai</h2>
        <br />
        <DatePicker
          hintText="Tanggal Mulai"
          onChange={(_, date) => {
            const yyyy = date.getFullYear().toString();
            const mm = (date.getMonth()+1).toString();
            const dd  = date.getDate().toString();
            this.handleInput('date_from_2', `${yyyy}-${mm}-${dd}`)
          }}
          container="inline" />
        <br />
        <h2>Tanggal Selesai</h2>
        <br />
        <DatePicker
          hintText="Tanggal Selesai"
          onChange={(_, date) => {
            const yyyy = date.getFullYear().toString();
            const mm = (date.getMonth()+1).toString();
            const dd  = date.getDate().toString();
            this.handleInput('date_end_2', `${yyyy}-${mm}-${dd}`)
          }}
          container="inline" />
        <br />
        <h2>Nama Posisi</h2>
        <TextField
          hintText="Nama Posisi"
          floatingLabelText="Nama Posisi"
          onChange = {(e, newValue) => this.handleInput('position_name_2', newValue)}/>
        <br />
        <h2>Nomor Telpon Atasan</h2>
        <br />
        <TextField
          hintText="Nomor Telpon Atasan"
          floatingLabelText="Nomor Telpon Atasan"
          type="number"
          onChange = {(e, newValue) => this.handleInput('phone_leader_2', newValue)}/>
        <br />
        <h2>Email Atasan</h2>
        <br />
        <TextField
          hintText="Email Atasan"
          floatingLabelText="Email Atasan"
          type="number"
          onChange = {(e, newValue) => this.handleInput('email_leader_2', newValue)}/>
        <br />
        <h2>Deskripsi</h2>
        <TextField
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="Deskripsi"
          onChange = {(e, newValue) => this.handleInput('description_2', newValue)}/>
        <br />

        <Divider style={styleDivider} />

        <h1>Pencapaian 3</h1>
        <br />
        <h2>Nama Pencapaian</h2>
        <TextField
          hintText="Nama Pencapaian"
          floatingLabelText="Nama Pencapaian"
          onChange = {(e, newValue) => this.handleInput('achievement_3', newValue)}/>
        <br />
        <h2>Tanggal Mulai</h2>
        <br />
        <DatePicker
          hintText="Tanggal Mulai"
          onChange={(_, date) => {
            const yyyy = date.getFullYear().toString();
            const mm = (date.getMonth()+1).toString();
            const dd  = date.getDate().toString();
            this.handleInput('date_from_3', `${yyyy}-${mm}-${dd}`)
          }}
          container="inline" />
        <br />
        <h2>Tanggal Selesai</h2>
        <br />
        <DatePicker
          hintText="Tanggal Selesai"
          onChange={(_, date) => {
            const yyyy = date.getFullYear().toString();
            const mm = (date.getMonth()+1).toString();
            const dd  = date.getDate().toString();
            this.handleInput('date_end_3', `${yyyy}-${mm}-${dd}`)
          }}
          container="inline" />
        <br />
        <h2>Nama Posisi</h2>
        <TextField
          hintText="Nama Posisi"
          floatingLabelText="Nama Posisi"
          onChange = {(e, newValue) => this.handleInput('position_name_3', newValue)}/>
        <br />
        <h2>Nomor Telpon Atasan</h2>
        <br />
        <TextField
          hintText="Nomor Telpon Atasan"
          floatingLabelText="Nomor Telpon Atasan"
          type="number"
          onChange = {(e, newValue) => this.handleInput('phone_leader_3', newValue)}/>
        <br />
        <h2>Email Atasan</h2>
        <br />
        <TextField
          hintText="Email Atasan"
          floatingLabelText="Email Atasan"
          type="number"
          onChange = {(e, newValue) => this.handleInput('email_leader_3', newValue)}/>
        <br />
        <h2>Deskripsi</h2>
        <TextField
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="Deskripsi"
          onChange = {(e, newValue) => this.handleInput('description_3', newValue)}/>
        <br />
        
        <br />
        <br />
        <br />
        <RaisedButton label="Save" primary={true} onClick={this.handleSaveData}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Achievement);
