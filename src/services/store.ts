import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware';
import { wsActions } from './actions/ws-actions';
import { wsAuthActions } from './actions/ws-auth-actions';
import { WS_URL, WS_AUTH_URL} from '../utils/api';

import { compose } from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(WS_URL, wsActions, false), socketMiddleware(WS_AUTH_URL, wsAuthActions, true)));

export const store = createStore(rootReducer, enhancer);
