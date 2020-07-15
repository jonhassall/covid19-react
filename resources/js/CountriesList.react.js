import React from 'react';
import Country from './Country.react'

export default class CountriesList extends React.Component {
    constructor(props) {
        super(props);
        this.getStats = this.getStats.bind(this);
    }

    componentDidUpdate(prevProps) {
        console.log('Countries list updated');
        console.log(this.props);

    }

    getStats(country) {
        console.log('getStats');
        console.log(country);
        this.props.onGetStats(country);
    }

    countriesList(props) {
        if (this.props.countries) {
            console.log('countriesList');
        }
        return (
            <div>
                {this.props.countries.map((item, index) => (
                    <Country key={index} item={item} onGetStats={this.getStats} className="country" />
                ))}
            </div>
        )
    }

    render() {
        return (
            <div>
                Press a country to retrieve infection statistics:
                {/* Retrieval status: { this.props.retrieval_status} */}

                <br />
                {this.countriesList()}
            </div>
        );
    }
}