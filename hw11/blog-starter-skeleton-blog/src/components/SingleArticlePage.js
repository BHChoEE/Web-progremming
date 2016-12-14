import 'isomorphic-fetch';
import React, { Component, PropTypes } from 'react';

class SingleArticlePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: [],
      isEditing: false,
    };
  }

  componentDidMount() {
    fetch(`api/articles/${this.props.id}`)
    .then(res =>  res.json(),
          err => console.log(err)
    )
    .then(res => {
      this.setState({
        title: res.title,
        content: res.content,
        tags: res.tags
      });
    });
  }

  componentDidUpdate() {
    // fetch with id
  }

  handleTagsChange = e => {
    if (!this.state.isEditing) { }
  };

  handleTitleChange = e => {
    if (!this.state.isEditing) {
      return;
    }
    this.setState({ title: e.target.value });
  };

  handleContentChange = e => {
    console.log('handleContentChange');
    if (!this.state.isEditing) {
      return;
    }
    this.setState({ content: e.target.value });
  }

  handleDelClick = () => {
    const confirm = window.confirm('確定要刪除文章嗎？');
    if (confirm) {
      fetch(`/api/articles/${this.props.id}`, {
        method: 'DELETE'
      }).then(document.location.href = '#/articles');
    }
  };

  handleEditClick = () => { 
    if(this.state.isEditing) {
      fetch(`/api/articles/${this.props.id}`,{
        method: 'PUT',
        body: JSON.stringify({
          title: this.state.title,
          content: this.state.content,
          tags: this.state.tags,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
    }
    this.setState({ isEditing: !this.state.isEditing }); 
  };

  renderTitle = () => (<div>
    <input
      type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)}
    />
  </div>);
  // why not bind this
  renderTags = () => (<div>
    {this.state.tags.map((v, i) => <button
      type="button" className="btn btn-primary" key={i} id={i}
      onChange={this.handleTagsChange.bind(this)}
      onClick={e => {
        this.state.tags.splice(e.target.id, 1);
        this.setState({ tags: this.state.tags });
      }}
    >{this.state.tags[i]}</button>)}
    <input
      type="text" onKeyPress={
        e => {
          if (e.key == 'Enter') {
            this.state.tags.push(e.target.value);
            e.target.value = '';
            this.setState({ tags: this.state.tags });
          }
        }
      }
    />
  </div>);


  renderContent = () => (<textarea
    className="form-control" rows="30" value={this.state.content}
    onChange={this.handleContentChange.bind(this)}
  />);

  render() {
    const { isEditing } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="page-header">
              {this.renderTitle()}
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-md-12">
            {this.renderTags()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {this.renderContent()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <button
              className="btn btn-info"
              role="button"
              onClick={this.handleEditClick}
            >{isEditing ? '確認' : '編輯'}</button>
            {isEditing ? null :
            <button
              className="btn btn-warning"
              role="button"
              onClick={this.handleDelClick}
            >刪除</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SingleArticlePage;
