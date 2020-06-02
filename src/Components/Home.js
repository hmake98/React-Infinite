import React, { Component } from 'react';
import Card from './Card';
import { Link, Redirect } from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toLogin: false,
            user: {},
            users: [],
            loading: false,
            page: 1,
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        this.setState({ user });
        if (!user) {
            this.setState({ toLogin: true });
        }
        this.getDetails();
        window.onscroll = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1) {
                this.getNext();
            }
        };
    }

    getDetails = () => {
        this.setState({ loading: true });
        let { page } = this.state;
        fetch(`https://reqres.in/api/users?page=${page}`).then(res => res.json()).then(json => {
            if (json.data) {
                this.setState({ users: json.data });
                this.setState({ loading: false });
            }
        });
    }

    getNext = () => {
        this.setState({ loading: true });
        let { page } = this.state;
        page++;
        this.setState({ page });
        setInterval(() => {
            fetch(`https://reqres.in/api/users?page=${page}`).then(res => res.json()).then(json => {
                if (json.data) {
                    this.setState({ users: this.state.users.concat(json.data) });
                    this.setState({ loading: false });
                } else {
                    this.setState({ loading: false });
                }
            });
        }, 4000);
    }

    handleLogout = () => {
        localStorage.removeItem('user');
        this.setState({ toLogin: true });
    }

    render() {
        if (this.state.toLogin) {
            return <Redirect to="/login" />
        }
        return (
            <div className="Home">
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand" href="#"> Forstap </a>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link"> Hello, {this.state.user.email} </a>
                        </li>
                    </ul>
                    <a href="" onClick={this.handleLogout}> Logout </a>
                </nav>
                <div className="container">
                    <div className="row">
                        {this.state.loading ? <div className="text-white"> Loading... </div> : 
                        this.state.users.map((item, index) => {
                            return <Card key={index} avatar={item.avatar} email={item.email} first_name={item.first_name} id={item.id} last_name={item.last_name} />
                        })}
                    </div>
                </div>
            </div>
        );
    }
}