import React from 'react';
import Countries from './Countries.react';

export default class Infections extends React.Component {
    render() {
        return (
            <div>
                <h1>COVID 19 Statistics by Country</h1>
                <small>Using React (JavaScript) - <a href="https://www.jonhassall.com">By Jonathan Hassall</a></small>
                <div>
                    <Countries />
                </div>
            </div>
        );
    }
}