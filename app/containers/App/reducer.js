/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_TO_DO,
  EDIT_TO_DO,
  SAVE_EDIT_TO_DO,
  DELETE_TO_DO,
  CANCEL_TO_DO,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  isVisible: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  todos: [
    {
      text: 'hello',
      isEditable: false,
    },
    {
      text: 'hi',
      isEditable: false,
    }
  ],
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_TO_DO:
      var todos = state.get('todos');
      return state
        .set('todos', todos.push(fromJS({text: action.text.text,isEditable: false,})));
    case EDIT_TO_DO:
      return state
        .setIn(['todos', action.index,'isEditable'], true);
    case SAVE_EDIT_TO_DO:
      return state
        .setIn(['todos',  action.index,'text'], action.text)
        .setIn(['todos',action.index,'isEditable'], false);
    case DELETE_TO_DO:
      return state
        .deleteIn(['todos',action.index]);
    case CANCEL_TO_DO:
      return state
        .setIn(['todos',action.index,'isEditable'], false);
    default:
      return state;
  }
}

export default appReducer;
