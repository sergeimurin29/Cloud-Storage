import React, {useState} from 'react';
import "./Sign-up.css";
import {SignUpAction} from "../../actions/user";
import Input from "../../utils/input/Input";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");


    return (
        <div className={"sign-up"}>
            <div className={"sign-up-header"}>Sign Up</div>
            <Input type={"text"} placeholder={"Enter your email"} value={email} setValue={setEmail}/>
            <Input type={"password"} placeholder={"Enter your password"} value={password} setValue={setPassword}/>
            <Input type={"password"} placeholder={"Repeat your password"} value={passwordRepeat}
                   setValue={setPasswordRepeat}/>
            <button className="sign-up-btn" onClick={() => SignUpAction(email, password)}>Sign Up</button>
        </div>
    );
};

export default SignUp;
