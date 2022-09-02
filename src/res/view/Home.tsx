import React, {ReactNode} from "react";
import logo from './../assets/logo.svg';
import './../stylesheets/App.css';
import './../stylesheets/dist/main.css'
import dotenv from 'dotenv';
import {CatFactServices} from "../../main/services/CatFactServices";
dotenv.config();

interface Props {}
interface State {
  "input_textbox": string,
  "cat_fact": string
}

export class Home extends React.Component<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = {
      "input_textbox": "",
      "cat_fact": ""
    };

    this.initializeState();
  }

  private initializeState = async () => {
    this.setState({
      "input_textbox": "",
      "cat_fact": (await new CatFactServices().getNewFact()).fact
    })
  }

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

          <p>
            New Cat Fact: {this.state.cat_fact === "" ? "Loading... " : this.state.cat_fact}
          </p>
        </header>
      </div>
    );
  }

}