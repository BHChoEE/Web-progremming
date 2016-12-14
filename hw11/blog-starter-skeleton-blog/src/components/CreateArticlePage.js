import 'isomorphic-fetch';
import React, { Component } from 'react';

class CreateArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: [],
    };
    this.title = this.title.bind(this);
    this.content = this.content.bind(this);
    this.tags = this.tags.bind(this);
  }

  handleSubmitClick = () => {
    const confirm = window.confirm('確定要新增文章嗎？');
    console.log('POST!');
    if (confirm) {
      fetch('/api/articles/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.state.title,
          content: this.state.content,
          tags: this.state.tags,
        })
      }).then(document.location.href = '#/articles');
    }
    console.log('PEND!');
  }

  title() {
    return (<div>
      <input
        type="text" placeholder="title" value={this.state.title} onChange={e => {
          this.setState({ title: e.target.value });
        }}
      />
    </div>);
  }

  content() {
    return (<textarea
      className="form-control" rows="30" placeholder="content"
      value={this.state.content}
      onChange={e => {
        console.log(this.state.content);
        this.setState({ content: e.target.value });
      }}
    />);
  }

  tags() {
    return (<div>
      {
        this.state.tags.map((v, i) => <button type="button" 
        className="btn btn-primary" key={i}>
        {this.state.tags[i]}</button>)
      }

    </div>);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {this.title()}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input
            type="text" onKeyPress={
              e => {
                if (e.key == 'Enter') {
                  this.state.tags.push(e.target.value);
                  e.target.value = '';
                  this.setState({ tags: this.state.tags });
                }
              }
            } placeholder="add tags"
            />
            {this.tags()}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.content()}
          </div>
          <div className="row">
            <div className="col-md-12">
              <button
                className="btn btn-info pull-right"
                role="button"
                onClick={this.handleSubmitClick}
              >送出</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateArticlePage;
