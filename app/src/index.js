import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from "./Register";
import About from "./About";
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'

  import { List, Avatar, Button, Spin, Menu, Icon } from 'antd';



ReactDOM.render(
    <Router>
        <div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                style={{ lineHeight: '64px' }}
                breakpoint="lg"
                collapsedWidth="0"
            >
                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/projects">Project List</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/">About Us</Link></Menu.Item>
                <Menu.Item key="6"><Link to="/">Contact Us</Link></Menu.Item>
                <Menu.Item key="4"><Icon spin={true} type="plus-circle" className="publish-btn" /></Menu.Item>
                <Menu.Item key="5"><Icon spin={true} type="login" className="loggin-btn" /></Menu.Item>
            </Menu>
          <Route exact path="/" component={App}/>
          <Route exact path="/projects" component={App}/>
          <Route exact path="/addproject"  component={Register} />
          <Route exact path="/about" component={About} />
          <Route exact path="/details" component={App} />
        </div>
    </Router>
    
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
