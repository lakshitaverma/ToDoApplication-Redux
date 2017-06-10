/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const LOAD_TO_DO = 'boilerplate/App/LOAD_TO_DO';
export const EDIT_TO_DO = 'boilerplate/App/EDIT_TO_DO';
export const SAVE_EDIT_TO_DO = 'boilerplate/App/SAVE_EDIT_TO_DO';
export const DELETE_TO_DO = 'boilerplate/App/DELETE_TO_DO';
export const CANCEL_TO_DO = 'boilerplate/App/CANCEL_TO_DO';
export const DEFAULT_LOCALE = 'en';
