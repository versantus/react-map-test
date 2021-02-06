
import React from 'react'
import './App.css'
import Map from './components/Map'
import Record from './components/Record'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

// https://data.sfgov.org/profile/edit/developer_settings
const APP_TOKEN='2Ln4McSNi6CXpPglXM6q9wBlS'

class App extends React.Component {

    state = {
        records: null,
        selectedRecord: null,
        recordsById: []
    }


    render = () => {


        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Record</Link>
                            </li>
                            <li>
                                <Link to="/map">Map</Link>
                            </li>


                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/map">
                            <Map markers={this.state.records}/>
                        </Route>


                        <Route path="/record/:id">
                            <LoadRecord recordsById={this.state.recordsById}/>
                        </Route>
                        <Route path="/">
                            <p>No record selected.</p>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );

    }


    async componentDidMount() {

        if (! this.state.records) {

            console.log("reloading")
            var Airtable = require('airtable');

            var base = new Airtable({apiKey: 'keyvZA1JqfskH8YZf'}).base('appXbtqrahtJ2TU33');

            var cities = [];
            var recordsById = [];

            var _t = this;
            base('alldata').select({
                // Selecting the first 3 records in Grid view:
                maxRecords: 1000,
                view: "Grid view"
            }).eachPage(function page(records, fetchNextPage) {
                // This function (`page`) will get called for each page of records.

                records.forEach(function (record) {
                    var r = {
                        id: record.getId(),
                        latlng: [record.get('lat'), record.get('lng')],
                        name: record.get('city'),
                        url: 'https://www.wikipedia.org/',
                        population: record.get('population')
                    }
                    cities.push(r)
                    recordsById[r.id] = r;
                    // console.log('Retrieved', record.get('lat'));
                });

                // To fetch the next page of records, call `fetchNextPage`.
                // If there are more records, `page` will get called again.
                // If there are no more records, `done` will get called.
                fetchNextPage();

            }, function done(err) {
                if (err) {
                    console.error(err);
                    return;
                }
                // console.log("Data loaded")
                _t.setState({records: cities, recordsById: recordsById});
                // console.log(_t.state.records)

            });
        }
    };

}



function LoadRecord(params){
    let { id } = useParams();
    console.log(params);

    let recordsById = params.recordsById;

    if (recordsById) {
        console.log(recordsById)
        let selected = recordsById[id];
        return (<Record selectedRecord={selected} />)
    } else {
        return (<p>No record selected</p>)
    }
}
export default App;