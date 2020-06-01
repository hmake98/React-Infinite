import React, { Component } from 'react';

export default class Card extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-6 p-5">
                <div className="card">
                    <div className="card-header">
                        <img src={this.props.avatar} className="rounded-circle img-responsive" />
                    </div>
                    <div className="card-body">
                        <h4> {this.props.first_name} {this.props.last_name} </h4>
                        <h5> Email : {this.props.email} </h5>
                    </div>
                </div>
            </div>
        );
    }
}
