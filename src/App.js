
import React from 'react'
import './App.css'
import axios from 'axios'
import Map from './components/Map'


// https://data.sfgov.org/profile/edit/developer_settings
const APP_TOKEN='2Ln4McSNi6CXpPglXM6q9wBlS'

class App extends React.Component {

    state = {
        markers: null
    }


    render = () => {
        return (
            <Map markers={this.state.markers}/>
        )
    }

    async componentDidMount() {
        var Airtable = require('airtable');

        var base = new Airtable({apiKey: 'keyvZA1JqfskH8YZf'}).base('appXbtqrahtJ2TU33');

        var cities = [];

        var _t = this;
        base('alldata').select({
            // Selecting the first 3 records in Grid view:
            maxRecords: 1000,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.

            records.forEach(function(record) {
                cities.push(
                    {
                        id: record.getId(),
                        latlng: [record.get('lat'),record.get('lng')],
                        name: record.get('city'),
                        url: 'https://www.wikipedia.org/'
                    })
                // console.log('Retrieved', record.get('lat'));
            });

            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();

        }, function done(err) {
            if (err) { console.error(err); return; }
            _t.setState({markers: cities});
        });

        // const res = await axios.get('https://data.sfgov.org/resource/wr8u-xric.json', {
        //     params: {
        //         "$limit": 500,
        //         "$$app_token": APP_TOKEN
        //     }
        // })
        // const markers = res.data;
        // console.log(markers);
        // this.setState({markers: markers });
    };

}

export default App;
