import React, {Fragment} from "react";
import "./styles.css";
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
        <Fragment>
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
        </div>
        </Fragment>
    </Provider>
  );
}
