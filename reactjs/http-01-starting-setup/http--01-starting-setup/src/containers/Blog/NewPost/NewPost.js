import React, { Component } from 'react';

import './NewPost.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted:false
    }
    postDateHandler =()=>{
        const post ={
            title: 'This State title',
            content: 'this state content',
            author: 'Max'
        }
        axios.post('/posts',post).then((response)=>{
            console.log(response);
            this.setState({submitted:true});
            this.props.history.push('/');
        })
    }
    render () {
        // let redirect = null;
        // if(this.state.submitted){
        //     redirect = <Redirect to="/" />;
        // }
        return (
           
            <div className="NewPost">
                {/* {redirect} */}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDateHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;