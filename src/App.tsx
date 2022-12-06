import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider, observer, Observer } from 'mobx-react';
import {store} from "./store";
import Hooks from "./components/Hooks";
import { LocalStore } from './components/LocalStore';
import { ShowName } from './components/ShowName';
import {Delay} from './components/Delay';
import { RunIAction } from './components/RunIAction';

const App = (()=> {
  return (
    <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Delay></Delay>
          <LocalStore></LocalStore>
          <ShowName></ShowName>
        </header> */}
        <Delay></Delay>
        <RunIAction></RunIAction>
      </div>

  );
})

export default App;
