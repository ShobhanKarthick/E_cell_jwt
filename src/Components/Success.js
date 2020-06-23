import React, {useState, useEffect} from 'react'
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'

function Success() {


    const jwt = require('jsonwebtoken');
    const[users, setUsers] = useState([])
    const[posts, setPosts] = useState([])
    const[title, setTitle] = useState('');
    const[body, setBody] = useState('');
    const TOKEN = localStorage.getItem("TOKEN");
    const decoded = jwt.verify(TOKEN, "secret")
    let loggedIn = true;

    const Postvalues = (props) => (
        <div style={{display: "flex", flexDirection: "column", width: "100%",}}>
        <tr style={{backgroundColor: "#999999"}}>
        <td><h2 style={{margin: 0}}>{props.post.title}</h2></td><br/>
        <td><h4 style={{margin: 0, fontWeight:"normal"}}>{props.post.body}</h4></td><br />
        <td><button className="logout-button" onClick={() => axios.get("localhost:5000/posts/delete/" + props.post._id)}>Delete</button></td>
        </tr><br/>
        </div>
    )

    useEffect(() => {
        axios.get("http://localhost:4000/userdata/" + decoded.id)
        .then(response => {
            setUsers(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [decoded.id])

    if(TOKEN == null){
        loggedIn = false;
    }
    
    const remove = () => {
        localStorage.removeItem("TOKEN");
    }
    const check = () => {   
    if(!loggedIn){
        return <Redirect to="/login" />
    }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/posts/')
            .then((response) => {
                setPosts(response.data);
                })
            .catch(error => {
                console.log(error);
            })

            PostList()
    }, [PostList])


    // eslint-disable-next-line react-hooks/exhaustive-deps
    function PostList() {
        return posts.map(function(current, i){
            return <Postvalues post = {current} key={i} />
        })
    }

    const titleHandler = (event) => {
        setTitle(event.target.value);
    }

    const bodyHandler = (event) => {
        setBody(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const newPost = {
            title: title,
            body: body,
        }

        axios.post("http://localhost:5000/posts/add/", newPost)

        setTitle('')
        setBody('');
    }
        return (
            <div className="success-page">
            <div className="success-header">
            <div className="success-head">
            Hello {users.fullName}
            </div>
            <Link to="/login" onClick={remove}>
            <button className="logout-button">Logout {check()}</button>
            </Link>
            </div>
            <h1 style={{color:"#ffffff"}}>Add Notes</h1>
            <form onSubmit={submitHandler}>
            <input className="success-input" placeholder="Title" value={title} onChange={titleHandler} required />
            <textarea rows="7" className="success-input" placeholder="Notes" value={body} onChange={bodyHandler} required/>
            <button type="submit" className="add-button">ADD</button>
            </form>

            <h1 style={{color:"#ffffff"}}>Notes</h1>
            {PostList()}
            </div>
            )
        }
        
export default Success
