/* global jest, describe, it, expect */

jest.mock('i18n');
jest.unmock('deep-freeze-strict');
jest.unmock('../GalleryActionTypes.js');
jest.unmock('../GalleryReducer.js');
jest.unmock('constants/index');

import galleryReducer from '../GalleryReducer.js';
import GALLERY from '../GalleryActionTypes.js';

describe('galleryReducer', () => {
  describe('ADD_FILES', () => {
    const type = GALLERY.ADD_FILES;
    const initialState = {
      count: 0,
      files: [],
    };

    it('should add a single file to state', () => {
      const nextState = galleryReducer(initialState, {
        type,
        payload: {
          files: [{ id: 1 }],
        },
      });

      expect(nextState.files.length).toBe(1);
    });

    it('should add multiple files to state', () => {
      const nextState = galleryReducer(initialState, {
        type,
        payload: {
          files: [{ id: 1 }, { id: 2 }],
        },
      });

      expect(nextState.files.length).toBe(2);
    });

    it('should set `count` if passed as a param', () => {
      const nextState = galleryReducer(initialState, {
        type,
        payload: {
          count: 1,
          files: [{ id: 1 }],
        },
      });

      expect(nextState.count).toBe(1);
    });

    it('should not update `count` if the param is not passed', () => {
      const nextState = galleryReducer(initialState, {
        type,
        payload: {
          count: 1,
          files: [{ id: 1 }],
        },
      });

      expect(nextState.count).toBe(1);

      const nextNextState = galleryReducer(nextState, {
        type,
        payload: {
          files: [{ id: 2 }],
        },
      });

      expect(nextNextState.count).toBe(1);
    });

    it('should not add the same file twice', () => {
      const nextState = galleryReducer(initialState, {
        type,
        payload: {
          count: 1,
          files: [{ id: 1 }],
        },
      });

      expect(nextState.files.length).toBe(1);

      const nextNextState = galleryReducer(nextState, {
        type,
        payload: {
          count: 1,
          files: [{ id: 1 }],
        },
      });

      expect(nextNextState.files.length).toBe(1);
    });
  });

  describe('LOAD_FILE', () => {
    const type = GALLERY.LOAD_FILE_SUCCESS;

    it('should update an existing file value', () => {
      const payload = { id: 1, file: { title: 'updated' } };
      const initialState = {
        files: [{ id: 1, title: 'initial' }],
      };

      const nextState = galleryReducer(initialState, { type, payload });

      expect(nextState.files.length).toBe(1);
      expect(nextState.files[0].title).toBe('updated');
    });

    it('should update an existing file value', () => {
      const payload = { id: 1, file: { name: 'updated' } };
      const initialState = {
        folder: { id: 1, name: 'initial' },
        files: [],
      };

      const nextState = galleryReducer(initialState, { type, payload });

      expect(nextState.folder.name).toBe('updated');
    });
  });

  describe('SELECT_FILES', () => {
    const type = GALLERY.SELECT_FILES;
    const baseState = {
      files: [
        { id: 1, type: 'file' },
        { id: 2, type: 'file' },
        { id: 3, type: 'folder' },
        { id: 4, type: 'folder' },
      ],
      selectedFiles: [],
    };

    it('should select all files when no param is passed', () => {
      const initialState = Object.assign({}, baseState, {
        selectedFiles: [1],
      });
      const payload = { ids: null };
      const nextState = galleryReducer(initialState, { type, payload });

      expect(nextState.selectedFiles.length).toBe(4);
    });

    it('should select a single file when a file id is passed', () => {
      const initialState = { selectedFiles: [] };
      const payload = { ids: [1] };
      const nextState = galleryReducer(initialState, { type, payload });

      expect(nextState.selectedFiles.length).toBe(1);
    });

    it('should not select an already selected file', () => {
      const initialState = { selectedFiles: [1] };
      const payload = { ids: [1] };
      const nextState = galleryReducer(initialState, { type, payload });

      expect(nextState.selectedFiles.length).toBe(1);
    });

    it('should select multiple files when an array of ids is passed', () => {
      const initialState = { selectedFiles: [1] };
      const payload = { ids: [1, 2] };
      const nextState = galleryReducer(initialState, { type, payload });

      expect(nextState.selectedFiles.length).toBe(2);
    });
  });

  describe('DESELECT_FILES', () => {
    const type = GALLERY.DESELECT_FILES;
    const initialState = {
      files: [
        { id: 1, type: 'folder' },
        { id: 2, type: 'folder' },
        { id: 3, type: 'folder' },
      ],
      selectedFiles: [1, 2, 3],
    };

    it('should deselect all files when no param is passed', () => {
      const payload = { ids: null };
      const nextState = galleryReducer(initialState, { type, payload });

      expect(nextState.selectedFiles.length).toBe(0);
    });

    it('should deselect a single file when a file id is passed', () => {
      const payload = { ids: [2] };
      const nextState = galleryReducer(initialState, { type, payload });

      expect(nextState.selectedFiles.length).toBe(2);
      expect(nextState.selectedFiles[0]).toBe(1);
      expect(nextState.selectedFiles[1]).toBe(3);
    });

    it('should deselect multiple files when an array of ids is passed', () => {
      const payload = { ids: [1, 3] };
      const nextState = galleryReducer(initialState, { type, payload });

      expect(nextState.selectedFiles.length).toBe(1);
      expect(nextState.selectedFiles[0]).toBe(2);
    });
  });

  describe('SORT_FILES', () => {
    const initialState = {
      files: [
        {
          id: 1,
          title: 'a',
          created: '1',
        },
        {
          id: 2,
          title: 'b',
          created: '2',
        }],
    };

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

    it('should sort files by title ascending order', () => {
      const nextState = galleryReducer(initialState, {
        type: GALLERY.SORT_FILES,
        payload: {
          comparator: getComparator('title', 'asc'),
        },
      });

      expect(nextState.files[0].title).toBe('a');
    });

    it('should sort files by title ascending order', () => {
      const nextState = galleryReducer(initialState, {
        type: GALLERY.SORT_FILES,
        payload: {
          comparator: getComparator('title', 'desc'),
        },
      });

      expect(nextState.files[0].title).toBe('b');
    });

    it('should sort files by created date ascending order', () => {
      const nextState = galleryReducer(initialState, {
        type: GALLERY.SORT_FILES,
        payload: {
          comparator: getComparator('created', 'asc'),
        },
      });

      expect(nextState.files[0].created).toBe('1');
    });

    it('should sort files by created date descending order', () => {
      const nextState = galleryReducer(initialState, {
        type: GALLERY.SORT_FILES,
        payload: {
          comparator: getComparator('created', 'desc'),
        },
      });

      expect(nextState.files[0].created).toBe('2');
    });
  });
});
