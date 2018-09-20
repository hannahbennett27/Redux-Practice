export const changePage = page => ({
  type: 'CHANGE_PAGE',
  page
});

export const createNote = title => ({
  type: 'CREATE_NOTE',
  title
});

export const callError = bool => ({
  type: 'STORAGE_CALL_ERROR',
  bool
});

export const callLoading = bool => ({
  type: 'STORAGE_CALL_LOADING',
  bool
});

export const callSuccess = res => ({
  type: 'STORAGE_CALL_SUCCESS',
  res
});
