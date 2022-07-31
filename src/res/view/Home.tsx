import React, {ReactNode} from "react";
import logo from './../assets/logo.svg';
import './../stylesheets/App.css';

export class Home extends React.Component {

  public render = (): ReactNode => {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/res/view/Home.tsx</code> and save to hot reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

}