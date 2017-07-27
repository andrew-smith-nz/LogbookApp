export function updateTitle (state = '', action) {
  switch (action.type) {
    case 'UPDATE_TITLE':
    console.log('updating title to ' + action.title);
        return { title: action.title };
    default:
        return state;
  }
}