import React from 'react';
import CountriesList from './CountriesList.react';
import { Line } from 'react-chartjs-2';

export default class Countries extends React.Component {
    constructor(props) {
        super(props);
        this.getStats = this.getStats.bind(this);
        this.state = {
            retrieval_status: 'None', countries: [], requestedCountry: { Country: false, Slug: false },
            requestedCountryStats: {}
        };
        this.getCountries();
    }

    getCountries() {
        axios.get('https://api.covid19api.com/countries')
            .then((response) => {
                // handle success
                this.setState({
                    retrieval_status: 'OK',
                    countries: _.orderBy(response.data, '[Country]')
                });
            })
            .catch((error) => {
                // handle error
                console.log(error);
                alert('Error retrieving information')
            })
            .then(() => {
                // always executed
            });
    }

    formatNumber(number) {
        //If false, return false
        if (!number) {
            return false;
        }

        //Otherwise, format number
        var formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
        });
        return formatter.format(number);
    }

    getStats(country) {
        console.log('getStats');
        console.log(country);

        //Clear existing stats
        this.setState({
            requestedCountryStats: {
                confirmed: false,
                active: false,
                deaths: false
            },
            requestedCountry: false,
            error: false,
            chartData: false
        });

        //Trigger displaying modal
        $('#myModal').modal();

        axios.get('https://api.covid19api.com/total/country/' + country.Slug)
            .then((response) => {
                // handle success
                console.log(response.data);
                this.setState({
                    requestedCountry: country
                });
                //Get last item in array
                if (response.data[response.data.length - 1]) {
                    console.log(response.data[response.data.length - 1].Confirmed);
                    this.setState({
                        requestedCountryStats: {
                            confirmed: response.data[response.data.length - 1].Confirmed,
                            active: response.data[response.data.length - 1].Active,
                            deaths: response.data[response.data.length - 1].Deaths
                        }
                    })

                    //Chart data
                    const chartLabels = response.data.map(item => {
                        const timestamp = Date.parse(item.Date);
                        return new Date(timestamp).toDateString();
                    })
                    const chartData_confirmed = response.data.map(item => {
                        return item.Confirmed
                    })
                    const chartData_active = response.data.map(item => {
                        return item.Active
                    })
                    const chartData_deaths = response.data.map(item => {
                        return item.Deaths
                    })

                    this.setState({
                        chartData: {
                            labels: chartLabels,
                            datasets: [
                                {
                                    label: 'Active',
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: 'rgba(75,192,192,0.4)',
                                    borderColor: 'rgba(15,60,166,1)',
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: 'rgba(75,192,192,1)',
                                    pointBackgroundColor: '#fff',
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: chartData_active
                                },
                                {
                                    label: 'Deaths',
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: 'rgba(75,192,192,0.4)',
                                    borderColor: 'rgba(255,66,66,1)',
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: 'rgba(75,192,192,1)',
                                    pointBackgroundColor: '#fff',
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: chartData_deaths
                                },
                            ]
                        }
                    });

                } else {
                    console.log('No data');
                    this.setState({ error: true });
                }

            })
            .catch((error) => {
                // handle error
                console.log(error);
                alert('Error retrieving information')
            })
            .then(() => {
                // always executed
            });
    }

    displayError() {
        if (this.state.error) {
            return (
                <div className="alert alert-danger" role="alert">
                    No statistics are available for this country.
                </div>
            )
        }
    }

    displayProgressSpinner() {
        if (this.state.requestedCountryStats.active === false && !this.state.error) {
            return (
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }
    }

    showChart() {
        if (this.state.chartData) {
            return (
                <Line data={this.state.chartData} />
            )
        }
    }

    render() {
        return (
            <div>

                <div className="modal fade" tabIndex="-1" role="dialog" id="myModal">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">COVID-19 Statistics for {this.state.requestedCountry.Country}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    {this.displayError()}
                                </div>
                                <p>
                                    Total confirmed cases: {this.formatNumber(this.state.requestedCountryStats.confirmed)}
                                    <br />
                                    Total active cases: {this.formatNumber(this.state.requestedCountryStats.active)}
                                    <br />
                                    Total deaths: {this.formatNumber(this.state.requestedCountryStats.deaths)}
                                </p>
                                <p>
                                    {this.showChart()}
                                </p>
                            </div>
                            <div className="modal-footer">
                                {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                                {this.displayProgressSpinner()}
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <CountriesList retrieval_status={this.state.retrieval_status} countries={this.state.countries} onGetStats={this.getStats} />
            </div>
        );
    }
}