// // const initialState = {
//   notes: [],
// };

let i = 0;

const testNotesState = [
  {
    eTag: i++,
    key: 'Title One.txt',
    createdAt: Date.now(),
    lastModified: Date.now(),
    subnotes: ['Hello', 'World']
  },
  {
    eTag: i++,
    key: 'Title Two.txt',
    createdAt: Date.now(),
    lastModified: Date.now(),
    subnotes: ['Goodbye']
  }
];

const notes = (state = testNotesState, action) => {
  switch (action.type) {
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

export default notes;

// AMPLIFY GET CALLS

// Storage.list():
// notes: [ { eTag: "", key: "", lastModified: AWS_DATE, size: 1 }, ... ]

// Storage.get(filename):
// activeNote: { createdAt: DATE.NOW, subnotes: [ "Hello", "World" ] } => CHAIN ON TO STORAGE.LIST CALL

// Storage.put(title.txt, { createdAt: DATE.NOW, subnotes: [] })
