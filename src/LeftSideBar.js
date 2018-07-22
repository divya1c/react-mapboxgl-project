import React, { Component } from 'react';
import './App.css';

class LeftSideBar extends Component {

  createList = () => {
    const listItems = this.props.infrastructure.map((infra) =>
      <ul key={infra.name}>
        {infra.name}
      </ul>
    );
    return listItems;
  }

  render() {
    return (
      <div className="leftbar">
        {this.createList()}
      </div>
    );
  }
}

export default LeftSideBar;