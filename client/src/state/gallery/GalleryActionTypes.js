// Action type constants, of the form
// GALLERY.ADD_FILES === 'GALLERY.ADD_FILES'

export default [
  'ADD_FILES',
  'DESELECT_FILES',
  'REMOVE_FILES',
  'SELECT_FILES',
  'SORT_FILES',
  'LOAD_FILE_REQUEST',
  'LOAD_FILE_SUCCESS',
  'CREATE_FOLDER_REQUEST',
  'CREATE_FOLDER_SUCCESS',
  'CREATE_FOLDER_FAILURE',
  'HIGHLIGHT_FILES',
  'UPDATE_BATCH_ACTIONS',
].reduce((obj, item) => Object.assign(obj, { [item]: `GALLERY.${item}` }), {});
