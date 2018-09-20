let i = 0;

const notes = (state = [], action) => {
  switch (action.type) {
    case 'STORAGE_CALL_SUCCESS':
      return action.res;
    case 'CREATE_NOTE':
      return [
        ...state,
        {
          eTag: i++,
          key: `${action.title}.txt`,
          createdAt: Date.now(), // => AMPLIFY CALL
          lastModified: Date.now(),
          subnotes: [] // => AMPLIFY CALL
        }
      ];
    case 'ADD_SUBNOTE':
      return state;
    default:
      return state;
  }
};

const notesLoading = (state = false, action) => {
  switch (action.type) {
    case 'STORAGE_CALL_LOADING':
      return action.bool;
    default:
      return state;
  }
};

const notesError = (state = false, action) => {
  switch (action.type) {
    case 'STORAGE_CALL_ERROR':
      return action.bool;
    default:
      return state;
  }
};

export { notes, notesLoading, notesError };

// AMPLIFY GET CALLS

// Storage.list():
// notes: [ { eTag: "", key: "", lastModified: AWS_DATE, size: 1 }, ... ]

// Storage.get(filename):
// activeNote: { createdAt: DATE.NOW, subnotes: [ "Hello", "World" ] } => CHAIN ON TO STORAGE.LIST CALL

// Storage.put(title.txt, { createdAt: DATE.NOW, subnotes: [] })
