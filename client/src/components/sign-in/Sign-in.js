import React, {useState} from 'react';
import "./Sign-in.css";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {SignInAction} from "../../actions/user";
import homeImage from "../../assets/home-image.jpeg";
import crossIcon from "../../assets/close-window-icon.svg";


const SignIn = () => {

    const [redirect, setRedirect] = useState(false);

    const dispatch = useDispatch();

    const {formState: {errors, isValid}, handleSubmit, reset, register} = useForm({
        mode: 'all'
    });

    const onSubmit = (formData) => {
        dispatch(SignInAction(formData.email, formData.password));

    }

    const handleInputError = (nodeId) => {
        const node = document.getElementById(nodeId);
        if (node) {
            node.className = "input input-error";
        }
    }

    const handleInputValid = (nodeId) => {
        const node = document.getElementById(nodeId);
        if (node) {
            node.className = "input";
        }
    }

    return (
        <div className={"sign-in"}>
            <img src={homeImage} alt={"Cloud Storage home page"} id={"background-img"}/>
            <div className="sign-in-container shadow scale-up-ver-center">
                <div className={"sign-in-container-header"}>
                    <Link to={"../"} replace={true} className={"close-icon-link"}>
                        <img src={crossIcon} className={"close-icon"} alt={"Close window"}/>
                    </Link>
                </div>

                <div className={"sign-in-header"}>Sign In</div>

                <form autoComplete={"off"} className={"sign-in-form"} onSubmit={handleSubmit(onSubmit)}>

                    <input id="email" type={"text"} placeholder={"Enter your email"} className={"input"}
                           {...register("email", {
                               required: {
                                   value: true,
                                   message: "This field cannot be empty",
                               },
                               pattern: {
                                   value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/,
                                   message: "Invalid email"
                               }
                           })}
                    />
                    {errors?.email ? handleInputError("email") : handleInputValid("email")}

                    <div className={'input-error-container'}>
                        {errors?.email &&
                            <small className="input-error">{errors?.email?.message}</small>
                        }
                    </div>

                    <input id="password" type={"password"} placeholder={"Enter your password"} className={"input"}
                           {...register("password", {
                               required: {
                                   value: true,
                                   message: "This field cannot be empty"
                               },
                               minLength: {
                                   value: 6,
                                   message: "Password must be longer than 5"
                               },
                               maxLength: {
                                   value: 16,
                                   message: "Password must be shorter than 16",
                               },
                           })}
                    />
                    {errors?.password ? handleInputError("password") : handleInputValid("password")}


                    <div className={'input-error-container'}>
                        {errors?.password &&
                            <small className="input-error">{errors?.password?.message}</small>
                        }
                    </div>

                    <button type="submit" className={"btn shadow sign-in-btn"} disabled={!isValid}>Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
