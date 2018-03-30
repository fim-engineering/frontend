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
  GetMBTI as getMBTIAction,
  GetAchievement as getAchievementAction,
  GetBestPerformance as getBestPerformanceAction,
  UpdatePersonality as updatePersonalityAction,
  GetPersonality as getPersonalityAction,
  GetFIMReference as getFIMReferenceAction,
  GetMeFIM as getMeFIMAction,
  UpdateMeFIM as updateMeFIMAction,
} from '../../api';
import ImageUploader from '../../components/ImageUploader';
import { listKota, listKampus } from '../../helpers'

class AboutFIM extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    listReference: [],

    listMBTI: [],
    listBest: [],
    best_performance: '',
    mbti: '',
    cintakasih: '',
    integritas: '',
    kebersahajaan: '',
    totalitas: '',
    solidaritas: '',
    keadilan: '',
    keteladanan: '',
    strength: '',
    weakness: '',
    role_model: '',
    problem_solver: '',

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
    this.props.actions.ui.changeLoadingStatus(true);
    getPersonalityAction(content)
      .then(response => {
        console.log("response di willMpunt: ", response);
        this.setState({
          best_performance: _.result(response, 'personality.best_performance', '') || '',
          mbti: _.result(response, 'personality.mbti', '') || '',
          cintakasih: _.result(response, 'personality.cintakasih', '') || '',
          integritas: _.result(response, 'personality.integritas', '') || '',
          kebersahajaan: _.result(response, 'personality.kebersahajaan', '') || '',
          totalitas: _.result(response, 'personality.totalitas', '') || '',
          solidaritas: _.result(response, 'personality.solidaritas', '') || '',
          keadilan: _.result(response, 'personality.keadilan', '') || '',
          keteladanan: _.result(response, 'personality.keteladanan', '') || '',
          strength: _.result(response, 'personality.strength', '') || '',
          weakness: _.result(response, 'personality.weakness', '') || '',
          role_model: _.result(response, 'personality.role_model', '') || '',
          problem_solver: _.result(response, 'personality.problem_solver', '') || '',
        }, () => {
          this.props.actions.ui.changeLoadingStatus(false);
        })
      })

    getMBTIAction(content)
      .then(res => {
        console.log("res: ", res);
        this.setState({ listMBTI: res.mbti })
      })

    getBestPerformanceAction(content)
      .then(res => {
        this.setState({ listBest: res.best_performance })
      })

    getFIMReferenceAction(content)
      .then(res => {
        this.setState({ listReference: res.fim_references })
      })

    getMeFIMAction(content)
      .then(res => {
        this.setState({
          fim_reference: _.result(res, 'meandfim.fim_reference', '') || '',
          why_join_fim: _.result(res, 'meandfim.why_join_fim', '') || '',
          skill_for_fim: _.result(res, 'meandfim.skill_for_fim', '') || '',
          performance_apiekspresi: _.result(res, 'meandfim.performance_apiekspresi', '') || '',
        })
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
      fim_reference,
      why_join_fim,
      skill_for_fim,
      performance_apiekspresi,
    } = this.state
    const token = _.result(this, 'props.user.token', '');

    const content = {
      fim_reference,
      why_join_fim,
      skill_for_fim,
      performance_apiekspresi,
      token,
    }
    actions.ui.toggleProgressbar(true);
    updateMeFIMAction(content)
      .then(response => {
        console.log("response==: ", response);
        const resUserID = _.result(response, 'user_profile.user_id', 0)
        this.showToaster('Sukses Menyimpan')
        this.handleChangeRoute('/')()
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

      listMBTI,
      mbti,
      listBest,
      best_performance,
      cintakasih,
      integritas,
      kebersahajaan,
      totalitas,
      solidaritas,
      keadilan,
      keteladanan,
      strength,
      weakness,
      role_model,
      problem_solver,

      listReference,
      fim_reference,
      why_join_fim,
      skill_for_fim,
      performance_apiekspresi,
    } = this.state

    const year_date_from = parseInt(date_from.split('-')[0], 10)
    const month_date_from = parseInt(date_from.split('-')[1], 10)
    const day_date_from = parseInt(date_from.split('-')[2], 10)
    const oldDate_date_from = new Date(year_date_from,month_date_from,day_date_from);

    const year_date_end = parseInt(date_end.split('-')[0], 10)
    const month_date_end = parseInt(date_end.split('-')[1], 10)
    const day_date_end = parseInt(date_end.split('-')[2], 10)
    const oldDate_date_end = new Date(year_date_end,month_date_end,day_date_end);

    const year_date_from_2 = parseInt(date_from_2.split('-')[0], 10)
    const month_date_from_2 = parseInt(date_from_2.split('-')[1], 10)
    const day_date_from_2 = parseInt(date_from_2.split('-')[2], 10)
    const oldDate_date_from_2 = new Date(year_date_from_2,month_date_from_2,day_date_from_2);

    const year_date_end_2 = parseInt(date_end_2.split('-')[0], 10)
    const month_date_end_2 = parseInt(date_end_2.split('-')[1], 10)
    const day_date_end_2 = parseInt(date_end_2.split('-')[2], 10)
    const oldDate_date_end_2 = new Date(year_date_end_2,month_date_end_2,day_date_end_2);


    const year_date_from_3 = parseInt(date_from_3.split('-')[0], 10)
    const month_date_from_3 = parseInt(date_from_3.split('-')[1], 10)
    const day_date_from_3 = parseInt(date_from_3.split('-')[2], 10)
    const oldDate_date_from_3 = new Date(year_date_from_3,month_date_from_3,day_date_from_3);

    const year_date_end_3 = parseInt(date_end_3.split('-')[0], 10)
    const month_date_end_3 = parseInt(date_end_3.split('-')[1], 10)
    const day_date_end_3 = parseInt(date_end_3.split('-')[2], 10)
    const oldDate_date_end_3 = new Date(year_date_end_3,month_date_end_3,day_date_end_3);

    const styleDivider = { marginBottom: '20px', marginTop: '20px' }
    return (
      <div className={styles}>
        <h1>Tentang Aku dan FIM</h1>
        <br />
        <br />
        <h2>Mengetahui FIM dari mana ?</h2>
        <DropDownMenu value={fim_reference} onChange={(e, index, newValue) => this.handleInput('fim_reference', newValue)}>
          {
            listReference.map(mbti => {
              return <MenuItem value={mbti} primaryText={mbti} />
            })
          }
        </DropDownMenu>
        <br />

        <h2>Ceritakan mengapa kamu ingin menjadi bagian dari FIM ?</h2>
        <TextField
          value={why_join_fim}
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="Alasan ikut FIM"
          onChange = {(e, newValue) => this.handleInput('why_join_fim', newValue)}/>
        <br />

        <h2>Skill/sumberdaya apa yang bisa dikontribusikan ke FIM ?</h2>
        <TextField
          value={skill_for_fim}
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="Skill/sumberdaya untuk kontribusi di FIM"
          onChange = {(e, newValue) => this.handleInput('skill_for_fim', newValue)}/>
        <br />

        <h2>Bakat apa yang bisa ditampilkan pada saat api ekspresi pelatihan FIM?</h2>
        <TextField
          value={performance_apiekspresi}
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="Bakat untuk API ekspresi"
          onChange = {(e, newValue) => this.handleInput('performance_apiekspresi', newValue)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutFIM);
