import React, { Component } from 'react';
import EventItem from '../components/EventInList';
import Loader from '../components/Loader';

export class Events extends Component {
    render() {
        if (this.props.isLoading) {
            return (
                <Loader/>
            )
        }else{
            return (
            <React.Fragment>
                <div className="event-container d-grid">
                    {this.props.events.map((ev) => (
                        <EventItem key={ev.id} event={ev}/>
                    ))}
                </div>
            </React.Fragment>
            )
        }
    }
}

export default Events
