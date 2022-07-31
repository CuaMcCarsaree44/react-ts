import React, {ReactNode} from 'react';
import '../res/stylesheets/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "../res/view/Home";

class App extends React.Component {
  public render = (): ReactNode => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;