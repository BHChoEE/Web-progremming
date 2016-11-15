import React, { Component } from 'react';

class HomePage extends Component {
  constructor(props) {
  	super(props);
  	this.addUser = this.addUser.bind(this);
  	this.addUserForm = this.addUserForm.bind(this);
  }
  addUserForm() {
    const formStyle = {
    	color: 'blue'
    };
	const inputStyle = {
		display: 'block'
	};
    return (<div style={formStyle}>
	        	<p>Add User</p>
        		avator: <input type="text" style={inputStyle} />
        		name: <input type="text" style={inputStyle} />
        		age: <input type="text" style={inputStyle} />
        		<button onClick={this.addUser}>ssss</button>
        	</div>);
  }
  addUser(e) {
  	const childrenList = e.target.parentElement.childNodes;

  	console.log(childrenList);
  	const avator = childrenList[4].value;
  	const name = childrenList[8].value;
  	const age = childrenList[12].value;
  	const u = {
  		avator:avator,
  		name:name,
  		age:age  
  	};


    console.log('u str=', JSON.stringify(u));

  	this.props.addAnUser(u);


fetch('api/userss', {
  method: 'post',
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
  }),
})
    .then( res =>{console.log(res);return res.json();} , err =>console.log(err,'err'))
    .then(json=>console.log(json));

    console.log('hI');
  }
  render() {
    return this.addUserForm();
  }
}

// App.propTypes = {
//    propArray: React.PropTypes.array.isRequired,
//    propBool: React.PropTypes.bool.isRequired,
//    propFunc: React.PropTypes.func,
//    propNumber: React.PropTypes.number,
//    propString: React.PropTypes.string,
//    propObject: React.PropTypes.object
// }

HomePage.propTypes = {
  addAnUser:React.PropTypes.func
};


export default HomePage;
