import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            toHome: false,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.setState({toHome: true});
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        if (this.state.toHome === true) {
            return <Redirect to="/home" />
        }
        return (
            <div className="Login container">
                <h1> Forstap</h1>
                <div className="col-lg-6 offset-lg-3">
                    <form onSubmit={this.handleSubmit} className="form-signin">
                        <div className="form-group form-row">
                            <label> Email </label>
                            <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.handleChange} />
                        </div>
                        <div className="form-group form-row">
                            <label> password </label>
                            <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleChange} />
                        </div>
                        <button className="btn btn-primary" type="submit"> Signin </button>
                    </form>
                </div>
            </div>
        );
    }
}