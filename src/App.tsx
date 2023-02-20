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
import { cc } from './allocate/utils';
import { ret, ret1, walkTree } from './allocate/run';
import {cloneDeep} from 'lodash';
// import { Tree } from './components/Tree';

const App = (()=> {
  return (
    <div className="App">

        <pre>
          {
            cc.log("source=>target is \n", cloneDeep(ret))
          }
          {
            cc.log("source=>target is \n", walkTree(ret))
          }
          {/* {
            cc.log("target=>source is \n", cloneDeep(ret1))
          }
          {
            cc.log("target=>source is \n", walkTree(ret1))
          } */}
        </pre>
        {/* <Tree></Tree> */}
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
        {/* <Delay></Delay>
        <RunIAction></RunIAction> */}
      </div>

  );
})

export default App;
