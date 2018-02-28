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
  UpdateAchievement as updateAchievementAction,
  GetProfile as getProfileAction,
  GetAchievement as getAchievementAction,
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
    date_from: '2018-01-01',
    date_end: '2018-01-01',
    date_from_2: '2018-01-01',
    date_end_2: '2018-01-01',
    date_from_3: '2018-01-01',
    date_end_3: '2018-01-01',
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
    getAchievementAction(content)
      .then(response => {
        console.log("response di willMpunt: ", response);
        if (_.result(response, 'code', 200) == 401) return;
        const date = _.result(response, 'achie_best.date_end_2', '')
        console.log("date di willMpunt: ", date);
        const date_end_2 = date === null ? "lolo" : date
        console.log("date_end_2 di willmount: ", date_end_2);
        this.setState({
          achievement: _.result(response, 'achie_best.achievement', '') || '',
          date_from: _.result(response, 'achie_best.date_from', '') || '2018-01-01',
          date_end: _.result(response, 'achie_best.date_end', '') || '2018-01-01',
          position_name: _.result(response, 'achie_best.position_name', '') || '',
          phone_leader: _.result(response, 'achie_best.phone_leader', '') || '',
          email_leader: _.result(response, 'achie_best.email_leader', '') || '',
          description: _.result(response, 'achie_best.description', '') || '',
          achievement_2: _.result(response, 'achie_best.achievement_2', '') || '',
          date_from_2: _.result(response, 'achie_best.date_from_2', '') || '2018-01-01',
          date_end_2: _.result(response, 'achie_best.date_end_2', '') || '2018-01-01',
          position_name_2: _.result(response, 'achie_best.position_name_2', '') || '',
          phone_leader_2: _.result(response, 'achie_best.phone_leader_2', '') || '',
          email_leader_2: _.result(response, 'achie_best.email_leader_2', '') || '',
          description_2: _.result(response, 'achie_best.description_2', '') || '',
          achievement_3: _.result(response, 'achie_best.achievement_3', '') || '',
          date_from_3: _.result(response, 'achie_best.date_from_3', '') || '2018-01-01',
          date_end_3: _.result(response, 'achie_best.date_end_3', '') || '2018-01-01',
          position_name_3: _.result(response, 'achie_best.position_name_3', '') || '',
          phone_leader_3: _.result(response, 'achie_best.phone_leader_3', '') || '',
          email_leader_3: _.result(response, 'achie_best.email_leader_3', '') || '',
          description_3: _.result(response, 'achie_best.description_3', '') || '',
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

  handleClickData = () => {
    const { actions } = this.props
    const {
      achievement,
      date_from,
      date_end,
      position_name,
      phone_leader,
      email_leader,
      description,
      achievement_2,
      date_from_2,
      date_end_2,
      position_name_2,
      phone_leader_2,
      email_leader_2,
      description_2,
      achievement_3,
      date_from_3,
      date_end_3,
      position_name_3,
      phone_leader_3,
      email_leader_3,
      description_3,
    } = this.state
    const token = _.result(this, 'props.user.token', '');

    const content = {
      achievement,
      date_from,
      date_end,
      position_name,
      phone_leader,
      email_leader,
      description,
      achievement_2,
      date_from_2,
      date_end_2,
      position_name_2,
      phone_leader_2,
      email_leader_2,
      description_2,
      achievement_3,
      date_from_3,
      date_end_3,
      position_name_3,
      phone_leader_3,
      email_leader_3,
      description_3,
      token,
    }
    actions.ui.toggleProgressbar(true);
    updateAchievementAction(content)
      .then(response => {
        console.log("response==: ", response);
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

  renderAchievementForm = (index, achievement, date_from ,date_end, position_name, phone_leader, email_leader, description) => {
    const year_date_from = parseInt(date_from.split('-')[0], 10)
    const month_date_from = parseInt(date_from.split('-')[1], 10)
    const day_date_from = parseInt(date_from.split('-')[2], 10)
    const oldDate_date_from = new Date(year_date_from,month_date_from,day_date_from);

    const year_date_end = parseInt(date_end.split('-')[0], 10)
    const month_date_end = parseInt(date_end.split('-')[1], 10)
    const day_date_end = parseInt(date_end.split('-')[2], 10)
    const oldDate_date_end = new Date(year_date_end,month_date_end,day_date_end);

    return (<div>
      <h2>Nama Pencapaian</h2>
      <TextField
        value={achievement}
        hintText="Nama Pencapaian"
        floatingLabelText="Nama Pencapaian"
        onChange = {(e, newValue) => this.handleInput(`achievement${index}`, newValue)}/>
      <br />
      <h2>Tanggal Mulai</h2>
      <br />
      <DatePicker
        value={oldDate_date_from}
        hintText="Tanggal Mulai"
        onChange={(_, date) => {
          const yyyy = date.getFullYear().toString();
          const mm = (date.getMonth()+1).toString();
          const dd  = date.getDate().toString();
          this.handleInput(`date_from${index}`, `${yyyy}-${mm}-${dd}`)
        }}
        container="inline" />
      <br />
      <h2>Tanggal Selesai</h2>
      <br />
      <DatePicker
        value={oldDate_date_end}
        hintText="Tanggal Selesai"
        onChange={(_, date) => {
          const yyyy = date.getFullYear().toString();
          const mm = (date.getMonth()+1).toString();
          const dd  = date.getDate().toString();
          this.handleInput(`date_end${index}`, `${yyyy}-${mm}-${dd}`)
        }}
        container="inline" />
      <br />
      <h2>Nama Posisi</h2>
      <TextField
        value={position_name}
        hintText="Nama Posisi"
        floatingLabelText="Nama Posisi"
        onChange = {(e, newValue) => this.handleInput(`position_name${index}`, newValue)}/>
      <br />
      <h2>Nomor Telpon Atasan</h2>
      <br />
      <TextField
        value={phone_leader}
        hintText="Nomor Telpon Atasan"
        floatingLabelText="Nomor Telpon Atasan"
        type="number"
        onChange = {(e, newValue) => this.handleInput(`phone_leader${index}`, newValue)}/>
      <br />
      <h2>Email Atasan</h2>
      <br />
      <TextField
        value={email_leader}
        hintText="Email Atasan"
        floatingLabelText="Email Atasan"
        type="text"
        onChange = {(e, newValue) => this.handleInput(`email_leader${index}`, newValue)}/>
      <br />
      <h2>Deskripsi</h2>
      <TextField
        value={description}
        multiLine={true}
        rows={2}
        rowsMax={5}
        hintText="Deskripsi"
        onChange = {(e, newValue) => this.handleInput(`description${index}`, newValue)}/>
      <br />
    </div>)
  }

  render() {
    const {
      achievement,
      date_from,
      date_end,
      position_name,
      phone_leader,
      email_leader,
      description,
      achievement_2,
      date_from_2,
      date_end_2,
      position_name_2,
      phone_leader_2,
      email_leader_2,
      description_2,
      achievement_3,
      date_from_3,
      date_end_3,
      position_name_3,
      phone_leader_3,
      email_leader_3,
      description_3,
    } = this.state
    console.log("date_end_2: ", date_end_2);
    const styleDivider = { marginBottom: '20px', marginTop: '20px' }
    return (
      <div className={styles}>
        <h1>PENCAPAIAN</h1>
        <br />
        <h3> sebutkan 3 aktivitas atau pencapaian terbaikmu dalam berorganisasi,<br /> yang sekiranya relevan dengan rencana kontribusimu di FIM Regional</h3>
        <br />
        <br />

        <h1>Pencapaian 1</h1>
        <br />
        {this.renderAchievementForm('', achievement, date_from, date_end, position_name, phone_leader, email_leader, description)}
        <Divider style={styleDivider} />

        <h1>Pencapaian 2</h1>
        <br />
        {this.renderAchievementForm('_2', achievement_2, date_from_2, date_end_2, position_name_2, phone_leader_2, email_leader_2, description_2)}
        <Divider style={styleDivider} />

        <h1>Pencapaian 3</h1>
        <br />
        {this.renderAchievementForm('_3', achievement_3, date_from_3, date_end_3, position_name_3, phone_leader_3, email_leader_3, description_3)}

        <br />
        <br />
        <br />
        <RaisedButton label="Save" primary={true} onClick={this.handleClickData}/>
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
