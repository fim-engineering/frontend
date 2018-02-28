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
} from '../../api';
import ImageUploader from '../../components/ImageUploader';
import { listKota, listKampus } from '../../helpers'

class Personality extends Component {
  constructor(props) {
    super(props);
  }

  state = {
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
    role_model_2: '',
    role_model_3: '',
    problem_solver: '',
    problem_solver_2: '',
    problem_solver_3: '',

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
          role_model_2: _.result(response, 'personality.role_model_2', '') || '',
          role_model_3: _.result(response, 'personality.role_model_3', '') || '',
          problem_solver: _.result(response, 'personality.problem_solver', '') || '',
          problem_solver_2: _.result(response, 'personality.problem_solver_2', '') || '',
          problem_solver_3: _.result(response, 'personality.problem_solver_3', '') || '',
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
      role_model_2,
      role_model_3,
      problem_solver,
      problem_solver_2,
      problem_solver_3,
      mbti,
    } = this.state
    const token = _.result(this, 'props.user.token', '');

    const content = {
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
      role_model_2,
      role_model_3,
      problem_solver,
      problem_solver_2,
      problem_solver_3,
      token,
      mbti,
    }
    actions.ui.toggleProgressbar(true);
    updatePersonalityAction(content)
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
      role_model_2,
      role_model_3,
      problem_solver,
      problem_solver_2,
      problem_solver_3,
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
        <h1>PERSONALITY</h1>
        <br />
        <br />
        <h2>MBTI</h2>
        <DropDownMenu value={mbti} onChange={(e, index, newValue) => this.handleInput('mbti', newValue)}>
          {
            listMBTI.map(mbti => {
              return <MenuItem value={mbti} primaryText={mbti} />
            })
          }
        </DropDownMenu>
        <br />
        <h2>Best Performance</h2>
        <DropDownMenu value={best_performance} onChange={(e, index, newValue) => this.handleInput('best_performance', newValue)}>
          {
            listBest.map(mbti => {
              return <MenuItem value={mbti} primaryText={mbti} />
            })
          }
        </DropDownMenu>

        <h2>Kekuatan</h2>
        <TextField
          value={strength}
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="strength"
          onChange = {(e, newValue) => this.handleInput('strength', newValue)}/>
        <br />

        <h2>Kelemahan</h2>
        <TextField
          value={weakness}
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="weakness"
          onChange = {(e, newValue) => this.handleInput('weakness', newValue)}/>
        <br />

        <h2>Role Model</h2>
        <TextField
          value={role_model}
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="role model"
          onChange = {(e, newValue) => this.handleInput('role_model', newValue)}/>
        <br />

        <h2>Problem Solver</h2>
        <TextField
          value={problem_solver}
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="problem solver"
          onChange = {(e, newValue) => this.handleInput('problem_solver', newValue)}/>
        <br />

        <h2>Role Model 2</h2>
        <TextField
          value={role_model_2}
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="role model"
          onChange = {(e, newValue) => this.handleInput('role_model_2', newValue)}/>
        <br />

        <h2>Problem Solver 2</h2>
        <TextField
          value={problem_solver_2}
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="problem solver"
          onChange = {(e, newValue) => this.handleInput('problem_solver_2', newValue)}/>
        <br />

        <h2>Role Model 3</h2>
        <TextField
          value={role_model_3}
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="role model"
          onChange = {(e, newValue) => this.handleInput('role_model_3', newValue)}/>
        <br />

        <h2>Problem Solver 3</h2>
        <TextField
          value={problem_solver_3}
          multiLine={true}
          rows={2}
          rowsMax={5}
          hintText="problem solver"
          onChange = {(e, newValue) => this.handleInput('problem_solver_3', newValue)}/>
        <br />

        <h2>Cinta Kasih</h2>
        <DropDownMenu value={cintakasih} onChange={(e, index, newValue) => this.handleInput('cintakasih', newValue)}>
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
        </DropDownMenu>

        <h2>Integritas</h2>
        <DropDownMenu value={integritas} onChange={(e, index, newValue) => this.handleInput('integritas', newValue)}>
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
        </DropDownMenu>

        <h2>kebersahajaan</h2>
        <DropDownMenu value={kebersahajaan} onChange={(e, index, newValue) => this.handleInput('kebersahajaan', newValue)}>
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
        </DropDownMenu>

        <h2>totalitas</h2>
        <DropDownMenu value={totalitas} onChange={(e, index, newValue) => this.handleInput('totalitas', newValue)}>
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
        </DropDownMenu>

        <h2>solidaritas</h2>
        <DropDownMenu value={solidaritas} onChange={(e, index, newValue) => this.handleInput('solidaritas', newValue)}>
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
        </DropDownMenu>

        <h2>keadilan</h2>
        <DropDownMenu value={keadilan} onChange={(e, index, newValue) => this.handleInput('keadilan', newValue)}>
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
        </DropDownMenu>

        <h2>keteladanan</h2>
        <DropDownMenu value={keteladanan} onChange={(e, index, newValue) => this.handleInput('keteladanan', newValue)}>
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
        </DropDownMenu>
        
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

export default connect(mapStateToProps, mapDispatchToProps)(Personality);
