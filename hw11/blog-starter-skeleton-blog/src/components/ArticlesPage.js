import 'isomorphic-fetch';
import React, { Component } from 'react';
import SingleArticlePage from './SingleArticlePage';

class ArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [{ title: 'sss', content: 'coo', tags: 'cmeko' }, { title: 'sss', content: 'coo', tags: 'cmeko' }],
    };
  }

  componentWillMount() {
    fetch('/api/articles')
    .then(r => r.json())
    .then(r => this.setState({ articles: r }));
  }

  render() {
    console.log('this.state.articles', this.state.articles);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {
              this.state.articles.map((v, i) => (
                <a href={`#/articles/${v._id}`} key={i}>
                  <div>
                    {v.title}
                  </div>
                </a>))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesPage;
