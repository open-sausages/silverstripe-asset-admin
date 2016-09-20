import GALLERY from './GalleryActionTypes';

/**
 * Adds files to state.
 *
 * @param array files - Array of file objects.
 * @param number [count] - The number of files in the current view.
 */
export function addFiles(files, count) {
  // TODO: Refactor this away - will be part of "load folder" and "search" actions
  return (dispatch) =>
    dispatch({
      type: GALLERY.ADD_FILES,
      payload: { files, count },
    });
}

/**
 * Updates a file with new data.
 *
 * @param number id - The id of the file to update.
 * @param object updates - The new values.
 */
export function loadFile(id, file) {
  return (dispatch) => {
    dispatch({
      type: GALLERY.LOAD_FILE_SUCCESS,
      payload: {
        id,
        file,
      },
    });
  };
}

/**
 * Selects files. If no param is passed all files are selected.
 *
 * @param Array ids - Array of file ids to select.
 */
export function selectFiles(ids = null) {
  return (dispatch) =>
    dispatch({
      type: GALLERY.SELECT_FILES,
      payload: { ids },
    });
}

/**
 * Deselects files. If no param is passed all files are deselected.
 *
 * @param Array ids - Array of file ids to deselect.
 */
export function deselectFiles(ids = null) {
  return (dispatch) =>
    dispatch({
      type: GALLERY.DESELECT_FILES,
      payload: { ids },
    });
}

/**
 * Sorts files in some order.
 *
 * @param func comparator - Used to determine the sort order.
 */
export function sortFiles(comparator) {
  return (dispatch) =>
    dispatch({
      type: GALLERY.SORT_FILES,
      payload: { comparator },
    });
}

/**
 * Create a new folder as a sub-folder of the current and open it for viewing.
 * Triggers an asyncrhonous back-end requests and changes view after the request
 * has completed.
 *
 * @param {Function} createFolderApi
 * @param {Number} parentId
 * @param {String} name - the name of the folder
 */
export function createFolder(createFolderApi, parentId, name) {
  return (dispatch) => {
    // Start message
    dispatch({
      type: GALLERY.CREATE_FOLDER_REQUEST,
      payload: { name },
    });

    return createFolderApi({ ParentID: isNaN(parentId) ? 0 : parentId, Name: name })
    .then((json) => {
      dispatch({
        type: GALLERY.CREATE_FOLDER_SUCCESS,
        payload: { name },
      });
      return json;
    })
    .catch((err) => {
      // Failure finish message
      dispatch({
        type: GALLERY.CREATE_FOLDER_FAILURE,
        payload: { error: `Couldn\'t create ${name}: ${err}` },
      });
    });
  };
}
