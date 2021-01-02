import React from "react";
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = React.useState("");

  const fetchData = React.useCallback(async() => {
    axios
    .get("https://z-wallet.candy.mn:443/rest/achcandytobank/banklist")
    .then((response) => console.log(response.data));
  }, []);
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://www.mendamar.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.exampleMessage}
        </a>
      </header>
    </div>
  );
}

export default App;
