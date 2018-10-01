export const getNoteTitle = noteObj => {
  const titleRegExp = /(.+).txt/;
  return titleRegExp.exec(noteObj.key)[1];
};
