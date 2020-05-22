import React, {useState} from 'react';
import axios from 'axios';

function Regform() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');

    const nameHandler = (event) => {
        setName(event.target.value);
    }
    const emailHandler = (event) => {
        setEmail(event.target.value);
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }
    const confirmPasswordHandler = (event) => {
        setConfirmPassword(event.target.value);
    }
    const phoneHandler = (event) => {
        setPhone(event.target.value);
    }
    const submitHandler = (event) => {
        event.preventDefault()
        // alert(`${name}`)

        const newUser = {
            fullName: name,
            email: email,
            password: password,
            phone: phone,
        }

        axios.post('http://localhost:4000/userdata/add', newUser)
            .then(res =>{
                console.log("Voila! User added")
            }
            )
            .catch(error => {
                console("Damn, didnt work!")
            }
            )

        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
    }

    return (
        <div>
        <form className="form" onSubmit={submitHandler}>
        <div className="form-header">SIGN UP</div>
        <input className="input" type="text" value={name} onChange={nameHandler} placeholder="Full name" required/>
        <input className="input" type="email" value={email} onChange={emailHandler} placeholder="Email" required/>
        <input className="input" type="password" value={password} onChange={passwordHandler} placeholder="Password" required/>
        <input className="input" type="password" value={confirmPassword} onChange={confirmPasswordHandler} pattern={password} placeholder="Confirm Password" required/>
        <input className="input" type="text" value={phone} onChange={phoneHandler} placeholder="Phone" required/>
        <input className="submit" type="submit"placeholder="SUBMIT" />
        </form>

        </div>
    )
}

export default Regform
