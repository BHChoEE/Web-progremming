import 'isomorphic-fetch';
import React, { Component, PropTypes } from 'react';
import ReactQuill from 'react-quill';
import TagsInput from 'react-tagsinput';

import "babel-polyfill";
import 'react-tagsinput/react-tagsinput.css';
import 'quill/dist/quill.snow.css';

import './style.css';
var bcrypt = require('bcryptjs');
class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'za8244@gmail.com.tw',
      password: '123456',
      name: 'yoyochen',
    };
  }


  render() {
    const p = {

    };
    return (
      <div className="container">
        <div className="row" >
          <div className="col-md-12">
            <div className="input-group">
              <p style={p}>Username:</p>
              <input
                type="text" className="form-control" style={{ width: '50em' }}
                value={this.state.name} onChange={
                e => this.setState({ name: e.target.value })
              }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
              <p>Mail:</p>
              <input
                type="text" className="form-control" style={{ width: '50em' }}
                value={this.state.email} onChange={
                e => this.setState({ email: e.target.value })
              }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
              <p>Password:</p>
              <input
                type="password" className="form-control" style={{ width: '50em' }}
                value={this.state.password} onChange={
                e => this.setState({ password: e.target.value })
              }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <button
            className="btn btn-primary marginleft"
            role="button"
            onClick={ () => {
              var coded_password ;
              Promise.resolve().then(
                ()=>{
                var salt = bcrypt.genSaltSync(10);
                coded_password = bcrypt.hashSync(this.state.password, salt);
                return coded_password
              }).then((coded_password)=>{
              const body = {
                email:this.state.email,
                password:coded_password,
                name:this.state.name,
              };
              fetch('/api/auth/signup', {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(body),
              }).then(result => {
                this.setState({
                  title: '',
                  content: '',
                  tags: [],
                });
              });
            })}}

          >確認</button>
        </div>
      </div>
    );
  }
}

export default SignupPage;
