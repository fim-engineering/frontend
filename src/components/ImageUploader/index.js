import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class ImageUploader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      picture: '',
      notAcceptedFileType: [],
      notAcceptedFileSize: []
    };
    this.inputElement = '';
    this.handleOnDropFile = this.handleOnDropFile.bind(this);
    this.handleTriggerFileUpload = this.handleTriggerFileUpload.bind(this);
    this.handleRemoveImage = this.handleRemoveImage.bind(this);
  }

  /*
	 On button click, trigger input file to open
	 */
  handleTriggerFileUpload() {
    this.removeImage();
    this.inputElement.click();
  }

  /*
	 Handle file validation
	 */
  //TODO Surya: please fix this with https://eslint.org/docs/2.0.0/rules/no-cond-assign
  /* eslint-disable no-cond-assign */
  handleOnDropFile(e) {
    const target = e.target;
    const files = target.files;
    const _this = this;

    _this.setState({
      picture: '',
      notAcceptedFileType: [],
      notAcceptedFileSize: []
    });
    // If callback giving, fire.
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(files);
    }
    // Iterate over all uploaded files
    let f = files[0];
    // Check for file extension
    if (!this.hasExtension(f.name)) {
      const newArray = _this.state.notAcceptedFileType.slice();
      newArray.push(f.name);
      _this.setState({ notAcceptedFileType: newArray });
    }
    // Check for file size
    if (f.size > this.props.maxFileSize) {
      const newArray = _this.state.notAcceptedFileSize.slice();
      newArray.push(f.name);
      _this.setState({ notAcceptedFileSize: newArray });
    }

    const reader = new FileReader();
    // Read the image via FileReader API and save image result in state.
    reader.onload = (function() {
      return function(e) {
        _this.setState({ picture: e.target.result }, () => {
          _this.props.onLoadFile(f, e.target.result, _this.loadError());
        });
        console.log(`e onLoad${e.target.value}`);
      };
    })(f);
    target.value = null;
    reader.readAsDataURL(f);
  }

  /*
	 Check file extension (handleOnDropFile)
	 */
  hasExtension(fileName) {
    return new RegExp(
      `(${this.props.imgExtension.join('|').replace(/\./g, '\\.')})$`
    ).test(fileName);
	}
	
	handleClose = () => {
		console.log("close");
	}

  /*
	 Remove the image from state
	 */
  removeImage() {
    this.setState({ picture: '' });
  }

  /*
	 Check if any errors && render
	 */
  renderErrors() {
    let notAccepted = '';
    if (this.state.notAcceptedFileType.length > 0) {
      notAccepted = this.state.notAcceptedFileType.map((error, index) => {
        return (
          <div
            className={`errorMessage${this.props.errorClass}`}
            key={index}
            style={this.props.errorStyle}
          >
            * {error} {this.props.fileTypeError}
          </div>
        );
      });
    }
    if (this.state.notAcceptedFileSize.length > 0) {
      notAccepted = this.state.notAcceptedFileSize.map((error, index) => {
        return (
          <div
            className={`errorMessage${this.props.errorClass}`}
            key={index}
            style={this.props.errorStyle}
          >
            * {error} {this.props.fileSizeError}
          </div>
        );
      });
    }
    return notAccepted;
  }

  loadError() {
    let notAccepted = '';
    if (this.state.notAcceptedFileType.length > 0) {
      notAccepted = this.state.notAcceptedFileType.map(error => {
        return `${error} ${this.props.fileTypeError}`;
      });
    }

    if (this.state.notAcceptedFileSize.length > 0) {
      notAccepted = this.state.notAcceptedFileSize.map(error => {
        return `${error} ${this.props.fileTypeError}`;
      });
    }

    return notAccepted;
  }

  /*
	 Render preview images
	 */
  renderPreview() {
    return <div>{this.renderPreviewPictures()}</div>;
  }

  handleRemoveImage() {
    if (this.props.onRemoveImage()) {
      this.removeImage();
    }
  }

  renderPreviewPictures() {
    if (this.props.valueImage === '') {
      return <div />;
    } else {
      return (
        <div key="0" className="uploadPictureContainer container-bottom">
          <span className="deleteImage" onClick={this.handleRemoveImage}>
            <i className="kol_post__close_img svg_icon__cross_circle" />
          </span>
          <img
            style={{ maxWidth: '200px', maxHeight: '200px' }}
            src={this.props.valueImage}
            className="uploadPicture"
            alt="preview"
          />
        </div>
      );
    }
  }

  renderButtonPictures() {
    return (
      <div className="row img-group-fixed-bottom row-border border-fixed-bottom">
        <div className="feed__container">
          <div className="u-col u-col-9">
            <label className="pic-label">Tambahkan</label>
          </div>
          <div className="u-col u-col-3">
            <span className="img-group" onClick={this.handleTriggerFileUpload}>
              <i className="svg_icon__foto" />
              Foto
            </span>
          </div>
        </div>
      </div>
    );
  }

  renderFinal() {
    return <div />;
  }

  render() {
    const { valueImage } = this.props;
    return (
      <div className="fileUploader" style={this.props.style}>
        <div className="fileContainer">
          <div className="row errorsContainer feed__container">
            {this.renderErrors()}
          </div>
          {this.renderPreview()}
          {valueImage === '' ? (
            <RaisedButton
              containerElement="label"
              icon={<FileUpload />} // material-ui-icons
              labelColor="white"
              primary
              style={{ minWidth: 40, width: 40 }}
            >
              <input
                type="file"
                ref={input => (this.inputElement = input)}
                name={this.props.name}
                onChange={this.handleOnDropFile}
                accept={this.props.accept}
                style={{ display: 'none' }}
                className={this.props.className}
              />
            </RaisedButton>
          ): (
						<DeleteIcon
						onClick={this.handleRemoveImage}/>
					) }
        </div>
      </div>
    );
  }
}

ImageUploader.defaultProps = {
  className: '',
  buttonClassName: {},
  buttonStyles: {},
  withPreview: false,
  accept: 'image/*',
  name: '',
  withIcon: false,
  buttonText: 'Choose images',
  withLabel: true,
  label: 'Max file size: 5mb, accepted: jpg|gif|png|gif',
  labelStyles: {},
  labelClass: '',
  imgExtension: [
    '.jpg',
    '.gif',
    '.png',
    '.jpeg',
    '.JPG',
    '.JPEG',
    '.PNG',
    '.GIF'
  ],
  maxFileSize: 5242880,
  fileSizeError: ' file size is too big',
  fileTypeError: ' is not supported file extension',
  errorClass: '',
  style: {},
  errorStyle: {},
  valueImage: '',
  onRemoveImage: {}
};

ImageUploader.propTypes = {
  style: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  buttonClassName: PropTypes.object,
  buttonStyles: PropTypes.object,
  withPreview: PropTypes.bool,
  accept: PropTypes.string,
  name: PropTypes.string,
  withIcon: PropTypes.bool,
  buttonText: PropTypes.string,
  withLabel: PropTypes.bool,
  label: PropTypes.string,
  labelStyles: PropTypes.object,
  labelClass: PropTypes.string,
  imgExtension: PropTypes.arrayOf(PropTypes.string),
  maxFileSize: PropTypes.number,
  fileSizeError: PropTypes.string,
  fileTypeError: PropTypes.string,
  errorClass: PropTypes.string,
  errorStyle: PropTypes.object,
  valueImage: PropTypes.string,
  onRemoveImage: PropTypes.func
};
export default ImageUploader;
