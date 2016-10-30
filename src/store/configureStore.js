/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const middleware = compose(
    applyMiddleware(thunk),
    process.env.NODE_ENV === 'development' ? devTools() : f => f,
  );

  const store = createStore(rootReducer, initialState, middleware);

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        const nextReducer = require('../reducers').default;

        store.replaceReducer(nextReducer);
      });
    }
  }

  return store;
}
