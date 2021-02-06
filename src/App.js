
import React from 'react'
import './App.css'
import axios from 'axios'
import Map from './components/Map'


// https://data.sfgov.org/profile/edit/developer_settings
const APP_TOKEN='2Ln4McSNi6CXpPglXM6q9wBlS'

class App extends React.Component {

    state = {
        incidents: [],
    }


    render = () => {
        return (
            <Map incidents={this.state.incidents}/>
        )
    }

    async componentDidMount() {
        const res = await axios.get('https://data.sfgov.org/resource/wr8u-xric.json', {
            params: {
                "$limit": 500,
                "$$app_token": APP_TOKEN
            }
        })
        const incidents = res.data;
        console.log(incidents);
        this.setState({incidents: incidents });
    };

}

export default App;
