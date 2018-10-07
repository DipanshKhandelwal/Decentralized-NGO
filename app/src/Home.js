import React, { Component } from 'react';
import './App.css';
import { List, Avatar, Button, Spin, Menu, Icon } from 'antd';
import { Row, Col } from 'antd';

class Home extends Component {
  render() {
    return (
      <div>
        <img src={require('../src/image/back.jpg')} width="100%" style={{
          opacity: .9
        }}/>
      </div>
    );
  }
}


export default Home;
