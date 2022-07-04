import React from 'react';
import "./Sign-up.css";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {SignUpAction} from "../../actions/user";
import homeImage from "../../assets/home-image.jpeg";

import crossIcon from "../../assets/close-window-icon.svg";

const SignUp = () => {

    const {
        formState: {errors, isValid},
        handleSubmit,
        getValues,
        register,
    } = useForm({
            mode: 'all'
        }
    );

    const onSubmit = (formData) => {
        SignUpAction(formData?.email, formData?.password).then();
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
        <div className={"sign-up"}>
            <img src={homeImage} alt={"Cloud Storage home page"} id={"background-img"}/>
            <div className="sign-up-container shadow scale-up-ver-center">
                <div className={"sign-up-container-header"}>
                    <Link to={"../"} replace={true}>
                        <img src={crossIcon} className={"close-icon"} alt={"Close window"}/>
                    </Link>
                </div>

                <div className={"sign-up-header"}>Sign Up</div>

                <form autoComplete={"off"} className={"sign-up-form"} onSubmit={handleSubmit(onSubmit)}>

                    <input id="email" type={"text"} placeholder={"Enter your email"} className={"input"}
                           {...register("email", {
                               required: {
                                   value: true,
                                   message: "This field cannot be empty",
                               },
                               pattern: {
                                   value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
                                   value: 3,
                                   message: "Password must be longer than 3"
                               },
                               maxLength: {
                                   value: 12,
                                   message: "Password must be shorter than 12",
                               },
                           })}
                    />
                    {errors?.password ? handleInputError("password") : handleInputValid("password")}


                    <div className={'input-error-container'}>
                        {errors?.password &&
                            <small className="input-error">{errors?.password?.message}</small>
                        }
                    </div>

                    <input id="repeatPassword" type={"password"} placeholder={"Repeat your password"}
                           className={"input"}
                           {...register("repeatPassword", {
                               required: {
                                   value: true,
                                   message: "This field cannot be empty",
                               },
                               minLength: {
                                   value: 3,
                                   message: "Password must be longer than 3"
                               },
                               maxLength: {
                                   value: 12,
                                   message: "Password must be shorter than 12",
                               },
                               validate: {
                                   isMatch: (value) => {
                                       return value === getValues("password") || "Passwords do not match"
                                   }
                               }
                           })}
                    />
                    {errors?.repeatPassword ? handleInputError("repeatPassword") : handleInputValid("repeatPassword")}


                    <div className={'input-error-container'}>
                        {errors?.repeatPassword &&
                            <small className="input-error">{errors?.repeatPassword?.message}</small>
                        }
                    </div>

                    <button type="submit" className={"btn shadow"} disabled={!isValid}>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
