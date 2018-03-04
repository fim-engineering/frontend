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

class DataUmum extends Component {
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
    return (
      <div className={styles}>
        <br />
        <br />
        <h2>Nama Lengkap</h2>
        <TextField
          value={full_name}
          hintText="Full Name"
          floatingLabelText="Full Name"
          onChange = {(e, newValue) => this.handleInput('full_name', newValue)}/>
        <br />

        <h2>Alamat</h2>
        <TextField
          value={address}
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="Address"
          onChange = {(e, newValue) => this.handleInput('address', newValue)}/>
        <br />

        <h2>Nomor Telpon</h2>
        <br />
        <TextField
          value={phone}
          hintText="Phone"
          floatingLabelText="Phone"
          type="number"
          onChange = {(e, newValue) => this.handleInput('phone', newValue)}/>
        <br />

        <h2>Jenis Kelamin</h2>
        <DropDownMenu value={gender} onChange={(e, index, newValue) => this.handleInput('gender', newValue)}>
          <MenuItem value={'Male'} primaryText="Laki-Laki" />
          <MenuItem value={'Female'} primaryText="Perempuan" />
        </DropDownMenu>
        <br />

        <h2>Saya mendaftar untuk menjadi kader next gen di regional :</h2>
        <br />
        <h6>Tanda * merupakan regional baru, jika daftar FIM Regional di atas <br /> tidak ada yang sesuai dengan domisili kamu pilihlah domisili paling dekat dengan domisilimu </h6>

        <DropDownMenu value={city} onChange={(e, index, newValue) => this.handleInput('city', newValue)}>
          {
            listKota.map(kota => {
              return <MenuItem value={kota} primaryText={kota} />
            })
          }
        </DropDownMenu>

        <br />

          <AutoComplete
            searchText={institution}
            floatingLabelText="Kampus"
            onUpdateInput={(searchText, dataSource) => this.handleInput('institution', searchText)}
            filter={AutoComplete.fuzzyFilter}
            dataSource={_.uniq(listKampus.map(kampus => _.startCase(_.toLower(kampus))))}
            maxSearchResults={5}
            />

            <br />
            <TextField
              value={majors}
              hintText="Jurusan"
              floatingLabelText="Jurusan"
              type="text"
              onChange = {(e, newValue) => this.handleInput('majors', newValue)}/>
            <br />

        <TextField
          value={generation}
          hintText="Angkatan"
          floatingLabelText="Angkatan"
          type="number"
          onChange = {(e, newValue) => this.handleInput('generation', newValue)}/>
        <br />


        <br />




        <h2>Upload KTP</h2>
        {
          imageURL === '' ? <ImageUploader
            onLoadFile={this.handleImageLoad}
            valueImage={this.state.image.stream}
            onRemoveImage={this.handleRemoveImage}/>
          :
            <div>
              <img style={{ maxWidth: '200px', maxHeight: '200px' }} src={imageURL} />
              <br />
              <DeleteIcon
                onClick={this.handleRemoveImage}/>
            </div>
        }
        <br />

        <h2>Upload Photo</h2>
        {
          imageURLProfile === '' ? <ImageUploader
            onLoadFile={this.handleImageLoadProfile}
            valueImage={this.state.imageProfile.streamProfile}
            onRemoveImage={this.handleRemoveImageProfile}/>
          :
            <div>
              <img style={{ maxWidth: '200px', maxHeight: '200px' }} src={imageURLProfile} />
              <br />
              <DeleteIcon
                onClick={this.handleRemoveImageProfile}/>
            </div>
        }
        <br />

        <h2>Golongan Darah</h2>
        <br />
        <AutoComplete
          searchText={blood}
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
          value={oldDate}
          hintText="Tanggal Lahir"
          onChange={(_, date) => {
            const yyyy = date.getFullYear().toString();
            const mm = (date.getMonth()+1).toString();
            const dd  = date.getDate().toString();
            this.handleInput('born_date', `${yyyy}-${mm}-${dd}`)
          }}
          container="inline" />
        <br />

        <h2>Kota Kelahiran</h2>
        <br />
        <AutoComplete
          searchText={born_city}
          floatingLabelText="Kota Lahir"
          onUpdateInput={(searchText, dataSource) => this.handleInput('born_city', searchText)}
          filter={AutoComplete.fuzzyFilter}
          dataSource={_.uniq(listKota)}
          maxSearchResults={5}
        />
        <br />

        <h2>Status Pernikahan</h2>
        <br />
        <DropDownMenu value={marriage_status} onChange={(e, index, newValue) => this.handleInput('marriage_status', newValue)}>
          <MenuItem value={0} primaryText="Belum Menikah" />
          {/* <MenuItem value={1} primaryText="Menikah" />*/}
        </DropDownMenu>
        <br />

        <h2>Agama</h2>
        <br />
        <DropDownMenu value={religion} onChange={(e, index, newValue) => this.handleInput('religion', newValue)}>
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
          value={facebook}
          hintText="Facebook"
          floatingLabelText="Facebook"
          onChange = {(e, newValue) => this.handleInput('facebook', newValue)}/>
        <br />
        <TextField
          value={instagram}
          hintText="Instagram"
          floatingLabelText="Instagram"
          onChange = {(e, newValue) => this.handleInput('instagram', newValue)}/>
        <br />
        <TextField
          value={blog}
          hintText="Blog"
          floatingLabelText="Blog"
          onChange = {(e, newValue) => this.handleInput('blog', newValue)}/>
        <br />
        <TextField
          value={line}
          hintText="Line"
          floatingLabelText="Line"
          onChange = {(e, newValue) => this.handleInput('line', newValue)}/>
        <br />

        <h2>Riwayat Penyakit</h2>
        <TextField
          value={disease_history}
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="Riwayat Penyakit"
          onChange = {(e, newValue) => this.handleInput('disease_history', newValue)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DataUmum);
