import {persistStore} from 'redux-persist';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from '../sagas/root.saga';

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);
const persistor = persistStore(store);

export {store, persistor};
