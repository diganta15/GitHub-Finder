import React,{Component} from 'react';
import Navbar from './components/layout/Navbar';
import UserItem from './components/users/UserItem';

import './App.css'

class App extends React.Component {
  render(){
    return (
      <div className="app">
        <Navbar icon="fab fa-github" title="Github Finder" />
        <UserItem />
      </div>
    );
  }
}

export default App;
