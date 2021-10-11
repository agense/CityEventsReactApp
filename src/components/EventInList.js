import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class EventInList extends Component {
    render() {
        const {id, title, location, startDate, startTime} = this.props.event;
        return (   
            <Link to={`/events/${id}`} key={id}>
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{location}</h6>
                        <small className="card-subtitle mb-2 text-muted">{startDate} {startTime}</small>
                    </div>
                </div>
            </Link>
        )
    }
}

export default EventInList
