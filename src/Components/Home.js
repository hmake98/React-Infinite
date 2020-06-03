import React, { Component } from 'react';
import Card from './Card';
import { Link, Redirect } from "react-router-dom";
import ClipLoader from "react-spinners/BeatLoader";
import InfiniteScroll from 'react-infinite-scroller';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toLogin: false,
            user: {},
            users: [],
            total: 0,
            loading: false,
            page: 1,
            lastPage: false,
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        this.setState({ user });
        if (!user) {
            this.setState({ toLogin: true });
        }
        this.getDetails();
        this.setState({ page: 1 }, () => {
            window.onscroll = () => {
                if ((window.innerHeight + (window.scrollY)) >= (document.body.offsetHeight - 3)) {
                    if (this.state.users.length < this.state.total) {
                        !this.state.loading && this.getNext();
                    } else {
                        this.setState({ lastPage: true });
                        this.setState({ loader: false });
                    }
                }
            };
        });
    }

    getDetails = () => {
        this.setState({ loading: true });
        let { page } = this.state;
        fetch(`https://reqres.in/api/users?page=${page}`).then(res => res.json()).then(json => {
            if (json.data) {
                this.setState({ total: json.total });
                this.setState({ users: json.data });
                this.setState({ loading: false });
            }
        });
    }

    getNext = () => {
        this.setState({ loading: true });
        let { page } = this.state;
        this.setState({ page: page + 1 }, () => {
            fetch(`https://reqres.in/api/users?page=${this.state.page}`).then(res => res.json()).then(json => {
                if (json.data) {
                    this.setState({ users: this.state.users.concat(json.data) });
                    this.setState({ loading: false });
                } else {
                    this.setState({ loading: false });
                }
            });
        });
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
                        {this.state.users && this.state.users.map((item, index) => {
                            return <Card key={index} avatar={item.avatar} email={item.email} first_name={item.first_name} id={item.id} last_name={item.last_name} />
                        })}
                        {this.state.loading &&
                            <div className="Loader">
                                <ClipLoader
                                    size={20}
                                    color={"#ffffff"}
                                    loading={this.state.loading} />
                            </div>
                        }
                        {this.state.page && !this.state.loading &&
                            <div className="alert alert-warning w-100">
                                All caught up!
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}