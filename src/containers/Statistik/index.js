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
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

/* component styles */
import { styles } from './styles.scss';
import * as uiActionCreators   from 'core/actions/actions-ui';
import * as userActionCreators   from 'core/actions/actions-user';
import { Login as LoginAction, GetRegional as GetRegionalAction } from '../../api'
import {
  getKota as getKotaAction,
  UpdateProfile as updateProfileAction,
  GetProfile as getProfileAction,
  RegisterByRegional as registerByRegionalAction,
} from '../../api';
import ImageUploader from '../../components/ImageUploader';
import { listKota, listKampus, regionalMapping } from '../../helpers'

class Statistik extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    registeredByRegional: [],
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
    registerByRegionalAction(content)
      .then(res => {
        console.log("res di stat: ", res);
        const registered = res.registered
        const submited = res.submited
        const newKey = []
        Object.keys(registered).map((key) => {
          newKey.push({
            name: key,
            registered: registered[key],
            submited: submited[key],
            wilayah: regionalMapping.find(x => x.regional === key) && regionalMapping.find(x => x.regional === key).wilayah
          })
        })
        console.log("newKey: ", newKey);
        this.setState({ registeredByRegional: newKey })
      })
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

  fancyDate = (input) => {

    var input = new Date(input)
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var monthName = monthNames[input.getMonth()]
    var day = input.getDate()
    var date = ""
    if (day > 3 && day < 21) {
      date = day + "th"
    } else {
      switch (day % 10) {
        case 1:
          date = day + "st"
          break;
        case 2:
          date = day + "nd"
          break;
        case 3:
          date = day + "rd"
          break;
        default:
          date = day + "th"
          break;
      }
    }

    var year = input.getFullYear()
    var seconds = input.getSeconds();
    var minutes = input.getMinutes();
    var hour = input.getHours();
    return `${monthName} ${date}, ${year}  ${hour}:${minutes}:${seconds}`
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

      registeredByRegional
    } = this.state
    const isDisabledLogin = email === '' || password === '' || isProcessLogin
    const labelButtonLogin = isProcessLogin ? 'Process' : 'Login'

    const year = parseInt(born_date.split('-')[0], 10)
    const month = parseInt(born_date.split('-')[1], 10)
    const day = parseInt(born_date.split('-')[2], 10)
    const oldDate = new Date(year,month,day);

    const data = [{
      label: "A",
      values: registeredByRegional
    }]

    const groupByWilayah = registeredByRegional.length > 0 && _.groupBy(registeredByRegional, (regional) => regional.wilayah)
    const showWilayah = []
    Object.keys(groupByWilayah).map((key) => {
      showWilayah.push({
        name: key,
        registered: groupByWilayah[key].reduce((accum, current) => accum + current.registered, 0),
        submited: groupByWilayah[key].reduce((accum, current) => accum + current.submited, 0),
      })
    })
    console.log("showWilayah: ", showWilayah);
    return (
      <div className={styles}>
        <br />
        <br />
        <h1>Statistik {this.fancyDate(Date.now())} </h1>
        <br />
        <br />

        <h2>Per Regional</h2>
        <Table selectable={false} style={{maxWidth: 1000, maxHeight: 400, margin: 'auto', padding: 10}}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Regional</TableHeaderColumn>
              <TableHeaderColumn>Jumlah Pendaftar</TableHeaderColumn>
              <TableHeaderColumn>Jumlah Submit</TableHeaderColumn>
              <TableHeaderColumn>Conversion Rate</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody style={{ textAlign: 'center' }} displayRowCheckbox={false} >
            {
              registeredByRegional.length > 0 && _.sortBy(registeredByRegional, (regional) => -regional.registered).map(regional => {
                const convRate = ((regional.submited / regional.registered) * 100).toFixed(2)
                return <TableRow>
                  <TableRowColumn>{regional.name}</TableRowColumn>
                  <TableRowColumn>{regional.registered}</TableRowColumn>
                  <TableRowColumn>{regional.submited}</TableRowColumn>
                  <TableRowColumn>{`${convRate}%`}</TableRowColumn>
                </TableRow>
              })
            }
          </TableBody>
        </Table>
        <br />
        <br />

        <h2>Per Wilayah</h2>
        <Table selectable={false} style={{maxWidth: 1000, maxHeight: 400, margin: 'auto', padding: 10}}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Wilayah</TableHeaderColumn>
              <TableHeaderColumn>Jumlah Pendaftar</TableHeaderColumn>
              <TableHeaderColumn>Jumlah Submit</TableHeaderColumn>
              <TableHeaderColumn>Conversion Rate</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody style={{ textAlign: 'center' }} displayRowCheckbox={false} >
            {
              showWilayah.length > 0 && _.sortBy(showWilayah, (regional) => -regional.registered).map(regional => {
                const convRate = ((regional.submited / regional.registered) * 100).toFixed(2)
                return <TableRow>
                  <TableRowColumn>{regional.name}</TableRowColumn>
                  <TableRowColumn>{regional.registered}</TableRowColumn>
                  <TableRowColumn>{regional.submited}</TableRowColumn>
                  <TableRowColumn>{`${convRate}%`}</TableRowColumn>
                </TableRow>
              })
            }
          </TableBody>
        </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Statistik);
