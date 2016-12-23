import React, { Component } from 'react';

import HomePage from './HomePage';
import ArticlesPage from './ArticlesPage';
import SingleArticlePage from './SingleArticlePage';
import CreateArticlePage from './CreateArticlePage';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import './App.css';

class App extends Component {
  state = {
    route: window.location.hash.substr(1),
    userId: '26',//string type

  };

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1),
      });
    });
  }

  renderRoute() {
    if (this.state.route === '/articles') {
      return <ArticlesPage userId={this.state.userId} />;
    } else if (this.state.route === '/articles/new') {
      return <CreateArticlePage userId={this.state.userId} />;
    } else if (this.state.route.startsWith('/articles/')) {
      const id = this.state.route.split('/articles/')[1];
      return <SingleArticlePage id={id} />;
    } else if (this.state.route === '/signup') {
      return <SignUpPage />;
    } else if (this.state.route === '/signin') {
      return <SignInPage setID={(e)=>this.setState({userId:e})} />;
    }


    return <HomePage />;
  }

  renderBreadcrumb() {
    if (this.state.route === '/articles') {
      return (
        <ol className="breadcrumb">
          <li><a href="#/">Home</a></li>
          <li><a href="#/articles">Articles</a></li>
        </ol>
      );
    }

    if (this.state.route.startsWith('/articles/')) {
      const id = this.state.route.split('/articles/')[1];
      return (
        <ol className="breadcrumb">
          <li><a href="#/">Home</a></li>
          <li><a href="#/articles">Articles</a></li>
          <li><a href={`#/articles/${id}`}>{id}</a></li>

        </ol>
      );
    }

    return (
      <ol className="breadcrumb">
        <li><a href="#/">Home</a></li>
      </ol>
    );
  }
  log(){
      if(this.state.userId==='-1')
        return(
          <div className={'nav navbar-nav right'}>
            <li>
              <p><a className="btn btn-default  sign" href="#/signin" role="button">Sign in</a></p>
            </li>
            <li>
              <p><a className="btn btn-success  sign" href="#/signup" role="button">Sign up</a></p>
            </li>
          </div>
          );
      else
        return(
          <li>
            <p><a className="btn btn-success  sign" href="#" role="button"
            onClick={()=>{
              this.setState({userId:'-1'});
            }}
            >Log out</a></p>
          </li>
          );
    }

  render() {

    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#/">Web Seminar - Blog</a>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <a href="#/">Home</a>
              </li>
              <li>
                <a href="#/articles">Articles</a>
              </li>
              <li>
                <a href={`#/myarticles/${this.state.userId}`}>My Articles</a>
              </li>
            </ul>
            <ul className="nav navbar-nav right">
            { this.log.bind(this)() }
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.renderBreadcrumb()}
            </div>
          </div>
        </div>
        {this.renderRoute()}
      </div>
    );
  }
}


export default App;
