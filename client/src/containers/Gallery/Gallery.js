import $ from 'jQuery';
import i18n from 'i18n';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, compose } from 'redux';
import ReactTestUtils from 'react-addons-test-utils';
import Config from 'lib/Config';
import Dropzone from 'components/AssetDropzone/AssetDropzone';
import File from 'components/GalleryItem/GalleryItem';
import BulkActions from 'components/BulkActions/BulkActions';
import CONSTANTS from 'constants/index';
import * as galleryActions from 'state/gallery/GalleryActions';
import * as queuedFilesActions from 'state/queuedFiles/QueuedFilesActions';
import { graphql, withApollo} from 'react-apollo';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

function getComparator(field, direction) {
  return (a, b) => {
    const fieldA = a[field].toLowerCase();
    const fieldB = b[field].toLowerCase();

    if (direction === 'asc') {
      if (fieldA < fieldB) {
        return -1;
      }

      if (fieldA > fieldB) {
        return 1;
      }
    } else {
      if (fieldA > fieldB) {
        return -1;
      }

      if (fieldA < fieldB) {
        return 1;
      }
    }

    return 0;
  };
}

export class Gallery extends Component {

  constructor(props) {
    super(props);

    this.sort = 'name';
    this.direction = 'asc';

    this.sorters = [
      {
        field: 'title',
        direction: 'asc',
        label: i18n._t('AssetAdmin.FILTER_TITLE_ASC'),
      },
      {
        field: 'title',
        direction: 'desc',
        label: i18n._t('AssetAdmin.FILTER_TITLE_DESC'),
      },
      {
        field: 'created',
        direction: 'desc',
        label: i18n._t('AssetAdmin.FILTER_DATE_DESC'),
      },
      {
        field: 'created',
        direction: 'asc',
        label: i18n._t('AssetAdmin.FILTER_DATE_ASC'),
      },
    ];

    this.handleFolderActivate = this.handleFolderActivate.bind(this);
    this.handleFileActivate = this.handleFileActivate.bind(this);
    this.handleToggleSelect = this.handleToggleSelect.bind(this);
    this.handleAddedFile = this.handleAddedFile.bind(this);
    this.handleCancelUpload = this.handleCancelUpload.bind(this);
    this.handleRemoveErroredUpload = this.handleRemoveErroredUpload.bind(this);
    this.handleUploadProgress = this.handleUploadProgress.bind(this);
    this.handleSending = this.handleSending.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleMoreClick = this.handleMoreClick.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSuccessfulUpload = this.handleSuccessfulUpload.bind(this);
    this.handleFailedUpload = this.handleFailedUpload.bind(this);
    this.handleCreateFolder = this.handleCreateFolder.bind(this);
  }

  componentDidMount() {
    this.initSortDropdown();
  }

  componentDidUpdate() {
    this.initSortDropdown();
  }

  getNoItemsNotice() {
    if (this.props.files.length < 1 && this.props.queuedFiles.items.length < 1 && !this.props.loading) {
      return <p className="gallery__no-item-notice">{i18n._t('AssetAdmin.NOITEMSFOUND')}</p>;
    }

    return null;
  }

  getBackButton() {
    const classes = [
      'btn',
      'btn-secondary',
      'btn--no-text',
      'font-icon-level-up',
      'btn--icon-large',
      'gallery__back',
    ].join(' ');
    if (this.props.folder.parentID !== null) {
      return (
        <button
          className={classes}
          onClick={this.handleBackClick}
          ref="backButton"
        >
        </button>
      );
    }

    return null;
  }

  getBulkActionsComponent() {
    const deleteAction = (items) => {
      items.forEach(item => this.props.onDelete(item.id));
    };
    const editAction = (items) => {
      this.props.onOpenFile(items[0]);
    };
    const actions = CONSTANTS.BULK_ACTIONS.map(action => {
      if (action.value === 'delete' && !action.callback) {
        return Object.assign({}, action, { callback: deleteAction });
      }
      if (action.value === 'edit' && !action.callback) {
        return Object.assign({}, action, { callback: editAction });
      }
      return action;
    });
    const selectedFileObjs = this.props.selectedFiles.map(id => this.props.files.find(file => id === file.id));

    if (selectedFileObjs.length > 0 && this.props.bulkActions) {
      return (
        <BulkActions
          actions={actions}
          items={selectedFileObjs}
          key={selectedFileObjs.length > 0}
        />
      );
    }

    return null;
  }

  getMoreButton() {
    if (this.props.count > this.props.files.length) {
      return (
        <button
          className="gallery__load-more"
          onClick={this.handleMoreClick}
        >
          {i18n._t('AssetAdmin.LOADMORE')}
        </button>
      );
    }

    return null;
  }

  initSortDropdown() {
    const $select = $(ReactDOM.findDOMNode(this)).find('.gallery__sort .dropdown');

    // We opt-out of letting the CMS handle Chosen because it doesn't
    // re-apply the behaviour correctly.
    // So after the gallery has been rendered we apply Chosen.
    $select.chosen({
      allow_single_deselect: true,
      disable_search_threshold: 20,
    });

    // Chosen stops the change event from reaching React so we have to simulate a click.
    $select.off('change');
    $select.on('change', () => ReactTestUtils.Simulate.click($select.find(':selected')[0]));
  }

  /**
   * Handler for when the user changes the sort order.
   *
   * @param {Object} event - Click event.
   */
  handleSort(event) {
    const data = event.target.dataset;
    this.props.actions.queuedFiles.purgeUploadQueue();
    this.props.actions.gallery.sortFiles(getComparator(data.field, data.direction));
  }

  handleCancelUpload(fileData) {
    // abort wasn't defined..?
    fileData.xhr.abort();
    this.props.actions.queuedFiles.removeQueuedFile(fileData.queuedAtTime);
  }

  handleRemoveErroredUpload(fileData) {
    this.props.actions.queuedFiles.removeQueuedFile(fileData.queuedAtTime);
  }

  handleAddedFile(data) {
    this.props.actions.queuedFiles.addQueuedFile(data);
  }

  /**
   * Triggered just before the xhr request is sent.
   *
   * @param {Object} file - File interface. See https://developer.mozilla.org/en-US/docs/Web/API/File
   * @param {Object} xhr
   */
  handleSending(file, xhr) {
    this.props.actions.queuedFiles.updateQueuedFile(file._queuedAtTime, { xhr });
  }

  handleUploadProgress(file, progress) {
    this.props.actions.queuedFiles.updateQueuedFile(file._queuedAtTime, { progress });
  }

  /**
   * Handler for when the user changes clicks the add folder button
   *
   * @param {Object} event - Click event.
   */
  handleCreateFolder(event) {
    const name = this.promptFolderName();
    const parentId = parseInt(this.props.folder.id, 10);
    if (name) {
      const dataId = this.props.client.dataId({
        __typename: 'Folder',
        id: parentId,
      });
      this.props.mutate({
        mutation: 'CreateFolder',
        variables: {
          folder: {
            parentId,
            name,
          },
        },
        resultBehaviors: [
          {
            type: 'ARRAY_INSERT',
            resultPath: ['createFolder'],
            storePath: [dataId, 'children'],
            where: 'PREPEND',
          },
        ],
      });
    }
    event.preventDefault();
  }

  /**
   * Handles successful file uploads.
   *
   * @param {Object} file - File interface. See https://developer.mozilla.org/en-US/docs/Web/API/File
   */
  handleSuccessfulUpload(file) {
    const json = JSON.parse(file.xhr.response);

    // SilverStripe send back a success code with an error message sometimes...
    if (typeof json[0].error !== 'undefined') {
      this.handleFailedUpload(file);
      return;
    }

    this.props.actions.queuedFiles.removeQueuedFile(file._queuedAtTime);
    this.props.actions.gallery.addFiles(json, this.props.count + 1);
  }

  handleFailedUpload(file, response) {
    this.props.actions.queuedFiles.failUpload(file._queuedAtTime, response);
  }

  /**
   * Handles deleting a file or folder.
   *
   * @param {Object} event
   * @param {Object} item - The file or folder to delete.
   */
  handleItemDelete(event, item) {
    this.props.onDelete([item.id]);
  }

	/**
   * @return {String}
   */
  promptFolderName() {
    // eslint-disable-next-line no-alert
    return prompt(i18n._t('AssetAdmin.PROMPTFOLDERNAME'));
  }

  /**
   * Checks if a file or folder is currently selected.
   *
   * @param {Number} id - The id of the file or folder to check.
   * @return {Boolean}
   */
  itemIsSelected(id) {
    return this.props.selectedFiles.indexOf(id) > -1;
  }

  /**
   * Checks if a file or folder is currently highlighted,
   * which typically means its own for viewing or editing.
   *
   * @param {Number} id - The id of the file or folder to check.
   * @return {Boolean}
   */
  itemIsHighlighted(id) {
    return this.props.highlightedFiles.indexOf(id) > -1;
  }

  /**
   * Handles a user drilling down into a folder.
   *
   * @param {Object} event - Event object.
   * @param {Object} folder - The folder that's being activated.
   */
  handleFolderActivate(event, folder) {
    event.preventDefault();
    this.props.onOpenFolder(folder.id, folder);
  }

  /**
   * Handles a user activating the file editor.
   *
   * @param {Object} event - Event object.
   * @param {Object} file - The file that's being activated.
   */
  handleFileActivate(event, file) {
    event.preventDefault();
    // Disable file editing if the file has not finished uploading
    // or the upload has errored.
    if (file.created === null) {
      return;
    }

    this.props.onOpenFile(file);
  }

  /**
   * Handles the user toggling the selected/deselected state of a file or folder.
   *
   * @param {Object} event - Event object.
   * @param {Object} item - The item being selected/deselected
   */
  handleToggleSelect(event, item) {
    if (this.props.selectedFiles.indexOf(item.id) === -1) {
      this.props.actions.gallery.selectFiles([item.id]);
    } else {
      this.props.actions.gallery.deselectFiles([item.id]);
    }
  }

  handleMoreClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.actions.gallery.deselectFiles();

    // TO DO: Load more
  }

  handleBackClick(event) {
    event.preventDefault();
    const base = this.props.sectionConfig.url;
    this.props.router.push(`/${base}/show/${this.props.folder.parentID}`);
  }

  render() {
    if (!this.props.folder) {
      if (this.props.errorMessage) {
        return (
          <div className="gallery__error">
            <div className="gallery__error-message">
              <h3>{ this.props.errorMessage &&
                i18n._t('AssetAdmin.DROPZONE_RESPONSE_ERROR', 'Server responded with an error.')
              }</h3>
              <p>{ this.props.errorMessage }</p>
            </div>
          </div>
        );
      }
      return <div />;
    }

    const dimensions = {
      height: CONSTANTS.THUMBNAIL_HEIGHT,
      width: CONSTANTS.THUMBNAIL_WIDTH,
    };
    const dropzoneOptions = {
      url: this.props.createFileApiUrl,
      method: this.props.createFileApiMethod,
      paramName: 'Upload',
      clickable: '#upload-button',
    };
    // TODO Use this.props.config once the store is consolidated with framework
    const securityID = Config.get('SecurityID');
    const canEdit = this.props.folder.canEdit;

    return (
      <div className="flexbox-area-grow gallery__outer">
        <ReactCSSTransitionGroup
          transitionName="bulk-actions"
          transitionEnterTimeout={CONSTANTS.CSS_TRANSITION_TIME}
          transitionLeaveTimeout={CONSTANTS.CSS_TRANSITION_TIME}
        >
          {this.getBulkActionsComponent()}
        </ReactCSSTransitionGroup>

        <div className="panel panel--padded panel--scrollable gallery__main">
          <div className="gallery__sort fieldholder-small">
            <select
              className="dropdown no-change-track no-chzn"
              tabIndex="0"
              style={{ width: '160px' }}
            >
              {this.sorters.map((sorter, i) =>
                (
                  <option
                    key={i}
                    onClick={this.handleSort}
                    data-field={sorter.field}
                    data-direction={sorter.direction}
                  >
                    {sorter.label}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="toolbar--content toolbar--space-save">

            {this.getBackButton()}

            <button
              id="upload-button"
              className="btn btn-secondary font-icon-upload btn--icon-xl"
              type="button"
              disabled={!canEdit}
            >
              <span className="btn__text">{i18n._t('AssetAdmin.DROPZONE_UPLOAD')}</span>
            </button>

            <button
              id="add-folder-button"
              className="btn btn-secondary font-icon-folder-add btn--icon-xl "
              type="button"
              onClick={this.handleCreateFolder}
              disabled={!canEdit}
            >
              <span className="btn__text">{i18n._t('AssetAdmin.ADD_FOLDER_BUTTON')}</span>
            </button>
          </div>

          <Dropzone
            canUpload={canEdit}
            handleAddedFile={this.handleAddedFile}
            handleError={this.handleFailedUpload}
            handleSuccess={this.handleSuccessfulUpload}
            handleSending={this.handleSending}
            handleUploadProgress={this.handleUploadProgress}
            preview={dimensions}
            folderId={this.props.folder.id}
            options={dropzoneOptions}
            securityID={securityID}
            uploadButton={false}
          >

            <div className="gallery__folders">
              {this.props.files.map((file, i) => {
                let component = null;
                if (file.type === 'folder') {
                  component = (<File
                    key={i}
                    item={file}
                    selected={this.itemIsSelected(file.id)}
                    highlighted={this.itemIsHighlighted(file.id)}
                    handleDelete={this.handleItemDelete}
                    handleToggleSelect={this.handleToggleSelect}
                    handleActivate={this.handleFolderActivate}
                  />);
                }
                return component;
              })}
            </div>

            <div className="gallery__files">
              {this.props.queuedFiles.items.map((file, i) =>
                (<File
                  key={`queued_file_${i}`}
                  item={file}
                  selected={this.itemIsSelected(file.id)}
                  highlighted={this.itemIsHighlighted(file.id)}
                  handleDelete={this.handleItemDelete}
                  handleToggleSelect={this.handleToggleSelect}
                  handleActivate={this.handleFileActivate}
                  handleCancelUpload={this.handleCancelUpload}
                  handleRemoveErroredUpload={this.handleRemoveErroredUpload}
                  message={file.message}
                  uploading
                />)
              )}
              {this.props.files.map((file, i) => {
                let component = null;
                if (file.type !== 'folder') {
                  component = (<File
                    key={`file_${i}`}
                    item={file}
                    selected={this.itemIsSelected(file.id)}
                    highlighted={this.itemIsHighlighted(file.id)}
                    handleDelete={this.handleItemDelete}
                    handleToggleSelect={this.handleToggleSelect}
                    handleActivate={this.handleFileActivate}
                  />);
                }
                return component;
              })}
            </div>

            {this.getNoItemsNotice()}

            <div className="gallery__load">
              {this.getMoreButton()}
            </div>
          </Dropzone>
        </div>
      </div>
    );
  }
}

Gallery.defaultProps = {
  bulkActions: true,
  files: [],
  selectedFiles: [],
  highlightedFiles: [],
};

Gallery.propTypes = {
  client: React.PropTypes.instanceOf(ApolloClient).isRequired,
  mutate: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  count: React.PropTypes.number,
  folder: React.PropTypes.shape({
    id: React.PropTypes.number,
    parentID: React.PropTypes.number,
    canView: React.PropTypes.bool,
    canEdit: React.PropTypes.bool,
  }),
  files: React.PropTypes.array, // all files as full objects (incl. ids)
  highlightedFiles: React.PropTypes.arrayOf(React.PropTypes.number), // ids only
  selectedFiles: React.PropTypes.arrayOf(React.PropTypes.number), // ids only
  bulkActions: React.PropTypes.bool,
  limit: React.PropTypes.number,
  page: React.PropTypes.number,
  queuedFiles: React.PropTypes.shape({
    items: React.PropTypes.array.isRequired,
  }),
  onOpenFile: React.PropTypes.func.isRequired,
  onOpenFolder: React.PropTypes.func.isRequired,
  createFileApiUrl: React.PropTypes.string,
  createFileApiMethod: React.PropTypes.string,
  onDelete: React.PropTypes.func,
  actions: React.PropTypes.object,
  sectionConfig: React.PropTypes.shape({
    url: React.PropTypes.string,
  }),
  router: React.PropTypes.object,
  errorMessage: React.PropTypes.string,
};

function mapStateToProps(state) {
  const {
    count,
    selectedFiles,
    page,
    errorMessage,
  } = state.assetAdmin.gallery;
  return {
    count,
    selectedFiles,
    page,
    queuedFiles: state.assetAdmin.queuedFiles,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      gallery: bindActionCreators(galleryActions, dispatch),
      queuedFiles: bindActionCreators(queuedFilesActions, dispatch),
    },
  };
}

// TODO Resolve fragment duplication with AssetAdmin
const createFolderMutation = gql`mutation CreateFolder($folder:FolderInput!) {
  createFolder(folder: $folder) {
	  ...allFields
	  ...allFileFields
  }
}
fragment allFields on FileInterface {
	__typename
	id
	parentId
	title
	type
	category
	exists
	name
	filename
	url
	canView
	canEdit
	canDelete
}
fragment allFileFields on File {
	__typename
	extension
	size
}`;

export { Gallery };

export default compose(
  graphql(createFolderMutation),
  (component) => withApollo(component),
  (component) => withRouter(component),
  connect(mapStateToProps, mapDispatchToProps)
)(Gallery);
