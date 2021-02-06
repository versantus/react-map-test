import React from 'react'
class Record extends React.Component {


    render =() => {
        console.log(this.props.selectedRecord)
        return (
            <>
                <h2>Hello</h2>
                {this.props.selectedRecord != null ?
                    (
                        <>
                        <p>You selected record: {this.props.selectedRecord.name}</p>
                            <p>It has a population of {this.props.selectedRecord.population}</p>
                        <p>You can read more about this city on <a href={'https://www.wikipedia.org/wiki/' + this.props.selectedRecord.name}>its Wikipedia page</a></p>
                        </>
                    )
                    :
                    (
                    <p>No record selected. Go to the <a href="/map">map</a> to choose one </p>
                    )

                }
            </>
        )
    }
}
export default Record;