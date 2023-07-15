import React, {useState} from 'react';
import './App.css';
import internal from 'stream';
import MovementTable from './MovementTable';
import FarmForm from './FarmForm';
import MovementForm from './MovementForm';
import FarmTable from './FarmTable';

interface MyProps {
};

interface MyState {
  search: string;
  submit: boolean;
  addFarm: boolean;
  addMovement: boolean;
};

type FormState = {
  [key: string]: string;
};

class App extends React.Component<MyProps,MyState>{
  constructor(props : MyProps){
    super(props);

    this.state = {
      search : "",
      addFarm: false,
      addMovement: false,
      submit:false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFarmClick = this.handleFarmClick.bind(this);
    this.handleMovementClick = this.handleMovementClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(event: React.FormEvent<HTMLInputElement>){
    const {name,value} = event.currentTarget;
    
    this.setState({
      search: value
    })
    
    
  }

  handleFarmClick(){
    this.setState((state)=>({
      addFarm: !state.addFarm
    }));
  }

  handleMovementClick(){
    this.setState((state)=>({
      addMovement: !state.addMovement
    }));
  }

  handleSubmit(){
    this.setState({
      submit: true
    })
  }

  render(): React.ReactNode {

    return( 
      <div className="app">
        <div className="header">

          <div className="pure-menu pure-menu-horizontal">

            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <a href="#" className="pure-button pure-button-primary" onClick={this.handleFarmClick}>Add Farm</a>
              </li>
              <li className="pure-menu-item">
                <a href="#" className="pure-button pure-button-primary" onClick={this.handleMovementClick}>Add Movement</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          {this.state.addFarm ? <FarmForm/> : null}
          {this.state.addMovement ? <MovementForm/> : null}
        </div>
        <div>
          <legend><h2>Movement Data</h2></legend>
          <MovementTable searchValue=""/>
        </div>
        <div>
          <legend><h2>List of Farms</h2></legend>
          <FarmTable/>
        </div>
      </div>
    )
  }
}
export default App;
