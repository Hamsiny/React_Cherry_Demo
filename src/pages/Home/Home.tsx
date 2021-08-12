import React, { Component } from 'react'
import MediaCard from '../../components/MediaCard/MediaCard'

export class Home extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center">
                <MediaCard />
            </div>
        )
    }
}

export default Home
