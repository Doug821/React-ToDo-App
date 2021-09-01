import React from 'react';
import './App.css';
import Routes from './Routes';
// import Todo from './Components/ToDo';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Routes />
        {/* <Todo /> */}
      </div>
    );
  }
}

export default App;
