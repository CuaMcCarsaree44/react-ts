import React, {ReactNode} from "react";
import logo from './../assets/logo.svg';
import './../stylesheets/App.css';
import dotenv from 'dotenv';
import {HomeHandler} from "../../main/handler/HomeHandler";
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


  private homeHandler = new HomeHandler();

  // Catch kinthil button click event
  private handleKinthilButtonClick = async () => {
    await this.homeHandler.testSendMessage();
  }

  private handleInputTextboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      "input_textbox": e.target.value
    });
  }

  private handleCustomMessageSend = async () => {
    await this.homeHandler.sendMessageWithString(this.state.input_textbox);
  }

  public render = (): ReactNode => {
    return (
      <div className="App">

        <button onClick={this.handleKinthilButtonClick}>Kinthil</button>

        <div>
          <input type="text" id="input-textbox" onChange={this.handleInputTextboxChange} />
          <button onClick={this.handleCustomMessageSend}>Send Message</button>
        </div>

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