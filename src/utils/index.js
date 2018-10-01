const noteTitleRegExp = /(.+).txt/;

export const isNoteActive = activePage => {
  return noteTitleRegExp.test(activePage) ? true : false;
};

export const getNoteTitle = filename => {
  return noteTitleRegExp.exec(filename)[1];
};

export const getActiveNote = (notes, filename) => {
  return notes.reduce((acc, el) => {
    if (el.key === filename) acc = el;
    return acc;
  }, {});
};
