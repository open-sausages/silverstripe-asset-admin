import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router';
import SilverStripeComponent from 'lib/SilverStripeComponent';
import backend from 'lib/Backend';
import Config from 'lib/Config';
import i18n from 'i18n';
import * as galleryActions from 'state/gallery/GalleryActions';
import * as editorActions from 'state/editor/EditorActions';
import * as breadcrumbsActions from 'state/breadcrumbs/BreadcrumbsActions';
import Editor from 'containers/Editor/Editor';
import Gallery from 'containers/Gallery/Gallery';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import Toolbar from 'components/Toolbar/Toolbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class AssetAdmin extends SilverStripeComponent {

  constructor() {
    super();
    this.handleOpenFile = this.handleOpenFile.bind(this);
    this.handleCloseFile = this.handleCloseFile.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmitEditor = this.handleSubmitEditor.bind(this);
    this.handleOpenFolder = this.handleOpenFolder.bind(this);
    this.createEndpoint = this.createEndpoint.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleFolderIcon = this.handleFolderIcon.bind(this);
    this.compare = this.compare.bind(this);

    // Build API callers from the URLs provided in configuration.
    // In time, something like a GraphQL endpoint might be a better way to run.
    const sectionConfig = Config.getSection('SilverStripe\\AssetAdmin\\Controller\\AssetAdmin');
    this.endpoints = {
      updateFolderApi: this.createEndpoint(sectionConfig.updateFolderEndpoint),
    };
  }

  /**
   * Create a new endpoint
   *
   * @param {Object} endpointConfig
   * @param {Boolean} includeToken
   * @returns {Function}
     */
  createEndpoint(endpointConfig, includeToken = true) {
    return backend.createEndpointFetcher(Object.assign(
      {},
      endpointConfig,
      includeToken ? { defaultData: { SecurityID: Config.get('SecurityID') } } : {}
    ));
  }

  componentWillReceiveProps(props) {
    const viewChanged = this.compare(this.props.folder, props.folder);
    if (viewChanged) {
      this.setBreadcrumbs(props.folder);
    }
  }

  /**
   * Navigate to parent folder
   *
   * @param {Object} event
   */
  handleBackButtonClick(event) {
    event.preventDefault();
    if (this.props.folder) {
      this.handleOpenFolder(this.props.folder.parentId || 0);
    } else {
      this.handleOpenFolder(0);
    }
  }

  /**
   * Assign breadcrumbs from selected folder
   *
   * @param {Object} folder
     */
  setBreadcrumbs(folder) {
    const base = this.props.sectionConfig.url;

    // Set root breadcrumb
    const breadcrumbs = [{
      text: i18n._t('AssetAdmin.FILES', 'Files'),
      href: `/${base}/`,
    }];

    if (folder && folder.id) {
      // Add parent folders
      if (folder.parents) {
        folder.parents.forEach((parent) => {
          breadcrumbs.push({
            text: parent.title,
            href: `/${base}/show/${parent.id}`,
          });
        });
      }

      // Add current folder
      breadcrumbs.push({
        text: folder.title,
        href: `/${base}/show/${folder.id}`,
        icon: {
          className: 'icon font-icon-edit-list',
          action: this.handleFolderIcon,
        },
      });
    }

    this.props.actions.breadcrumbsActions.setBreadcrumbs(breadcrumbs);
  }

  /**
   * Check if either of the two objects differ
   *
   * @param {Object} left
   * @param {Object} right
     */
  compare(left, right) {
    // Check for falsiness
    if (left && !right || right && !left) {
      return true;
    }

    // Fall back to object comparison
    return left && right && (left.id !== right.id || left.name !== right.name);
  }

  handleFolderIcon(event) {
    this.handleOpenFile(this.props.folder.id);

    event.preventDefault();
  }

  handleOpenFile(fileId) {
    const base = this.props.sectionConfig.url;
    this.props.router.push(`/${base}/show/${this.props.folder.id}/edit/${fileId}`);
  }

  handleSubmitEditor(event, fieldValues, submitFn) {
    event.preventDefault();
    submitFn()
      .then((response) => {
        this.props.actions.gallery.loadFile(this.props.file.id, response.record);

        return response;
      });
  }

  handleCloseFile() {
    this.handleOpenFolder(this.props.folder.id);
  }

  handleOpenFolder(folderId) {
    const base = this.props.sectionConfig.url;
    this.props.router.push(`/${base}/show/${folderId}`);
  }

  /**
   * Delete a file or folder
   *
   * @param {number} fileId
   */
  handleDelete(fileId) {
    let file = this.props.files.find((next) => next.id === fileId);
    if (!file && this.props.folder && this.props.folder.id === fileId) {
      file = this.props.folder;
    }
    if (!file) {
      throw new Error('File selected for deletion cannot be found');
    }
    const parentId = file.parent ? file.parent.id : 0;

    this.props.mutate({
      mutation: 'DeleteFile',
      variables: {
        id: file.id,
      },
      resultBehaviors: [
        {
          type: 'DELETE',
          dataId: `File:${file.id}`,
        },
      ],
    }).then(() => {
      this.props.actions.gallery.deselectFiles([file.id]);

      // Route to parent folder (in case the currently viewed file was deleted)
      const base = this.props.sectionConfig.url;
      this.props.router.push(`/${base}/show/${parentId}`);
    });
  }

  render() {
    const sectionConfig = this.props.sectionConfig;
    const createFileApiUrl = sectionConfig.createFileEndpoint.url;
    const createFileApiMethod = sectionConfig.createFileEndpoint.method;

    // Loading indicator
    const $sectionWrapper = $('.cms-content.AssetAdmin');
    if(this.props.loading) {
      $sectionWrapper.addClass('loading');
    } else {
      $sectionWrapper.removeClass('loading');
    }

    const editor = (this.props.file &&
      <Editor
        file={this.props.file}
        onClose={this.handleCloseFile}
        editFileSchemaUrl={sectionConfig.form.FileEditForm.schemaUrl}
        actions={this.props.actions.editor}
        onSubmit={this.handleSubmitEditor}
        onDelete={this.handleDelete}
        addToCampaignSchemaUrl={sectionConfig.form.AddToCampaignForm.schemaUrl}
      />
    );
    const gallery = (this.props.folder &&
      <Gallery
        files={this.props.files}
        fileId={this.props.params.fileId}
        folder={this.props.folder}
        name={this.props.name}
        limit={this.props.limit}
        page={this.props.page}
        bulkActions={this.props.bulkActions}
        createFileApiUrl={createFileApiUrl}
        createFileApiMethod={createFileApiMethod}
        updateFolderApi={this.endpoints.updateFolderApi}
        onDelete={this.handleDelete}
        onOpenFile={this.handleOpenFile}
        onOpenFolder={this.handleOpenFolder}
        sectionConfig={this.props.sectionConfig}
      />
    );

    const showBackButton = !!(this.props.folder && this.props.folder.id);

    return (
      <div className="fill-height cms-gallery no-preview collapse in">
        <Toolbar showBackButton={showBackButton} handleBackButtonClick={this.handleBackButtonClick}>
          <Breadcrumb multiline crumbs={this.props.breadcrumbs} />
        </Toolbar>
        <div className="flexbox-area-grow fill-width gallery">
          {editor}
          {gallery}
        </div>
      </div>
    );
  }
}

AssetAdmin.propTypes = {
  mutate: React.PropTypes.func.isRequired,
  config: React.PropTypes.shape({
    forms: React.PropTypes.shape({
      editForm: React.PropTypes.shape({
        schemaUrl: React.PropTypes.string,
      }),
    }),
  }),
  sectionConfig: React.PropTypes.shape({
    url: React.PropTypes.string,
  }),
  file: React.PropTypes.object,
  files: React.PropTypes.array, // all files as full objects (incl. ids)
  folder: React.PropTypes.shape({
    id: React.PropTypes.number,
    title: React.PropTypes.string,
    parents: React.PropTypes.array,
    parentID: React.PropTypes.number,
    canView: React.PropTypes.bool,
    canEdit: React.PropTypes.bool,
  }),
};

function mapStateToProps(state, ownProps) {
  const sectionConfigKey = 'SilverStripe\\AssetAdmin\\Controller\\AssetAdmin';
  const sectionConfig = state.config.sections[sectionConfigKey];
  const file = (ownProps.params.fileId && ownProps.files &&
    ownProps.files.find((next) => next.id === parseInt(ownProps.params.fileId, 10))
  );

  return {
    file,
    breadcrumbs: state.breadcrumbs,
    sectionConfig,
    limit: sectionConfig.limit,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      gallery: bindActionCreators(galleryActions, dispatch),
      editor: bindActionCreators(editorActions, dispatch),
      breadcrumbsActions: bindActionCreators(breadcrumbsActions, dispatch),
    },
  };
}

// GraphQL Query
const readFilesQuery = gql`query ReadFiles($id:ID!) {
  readFiles(id: $id) {
    ...allFields
    ...allFileFields
    ...on Folder {
      children {
        ...allFields
	      ...allFileFields
      },
      parents {
        __typename
        id
        title
      }
    }
  }
}
fragment allFields on FileInterface {
  __typename
  id
  parentId
  title
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
	type
	extension
	size
}
`;
const updateFileMutation = gql`mutation UpdateFile($id:ID!, $file:FileInput!) {
  updateFile(id: $id, file: $file) {
    id
  }
}`;
const deleteFileMutation = gql`mutation DeleteFile($id:ID!) {
  deleteFile(id: $id)
}`;

export default compose(
  graphql(readFilesQuery, {
    options(props) {
      return { variables: { id: props.params.folderId }};
    },
    props({ data: { loading, readFiles } }) {
      return {
        loading,
        // Uses same query as search and file list to return a single result (the containing folder)
        folder: (readFiles && readFiles[0]) ? readFiles[0] : null,
        files: (readFiles && readFiles[0]) ? readFiles[0].children : [],
      };
    },
  }),
  graphql(updateFileMutation),
  graphql(deleteFileMutation),
  (component) => withRouter(component),
  connect(mapStateToProps, mapDispatchToProps)
)(AssetAdmin);
