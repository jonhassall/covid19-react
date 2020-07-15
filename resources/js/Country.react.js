import React from 'react';

export default class Country extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        console.log('The button was clicked.');
        console.log(this.props.item.Slug);
        this.props.onGetStats(this.props.item);
    }

    render() {
        return (
            <span>
                <button type="button" className="btn btn-primary btn-sm m-1" onClick={this.handleClick}>{this.props.item.Country}</button>
            </span>
        );
    }
}