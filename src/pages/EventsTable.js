import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Axios from '../Axios';
import Loader from '../components/Loader';

export class EventsTable extends Component {
    state = {
        events : [],
        isLoading : false,
    }

    componentDidMount() {
        this.getEvents();
    }
    
    getEvents = () => {
        this.setState({isLoading: true});
        Axios.get("/Events")
        .then((response) => {
          this.setState({events : response.data, isLoading: false});
        })
        .catch((err) => {
          this.setState({isLoading: false});
        });
    }

    deleteEvent =(id) => {
        Axios.delete(`events/${id}`)
        .then( (res) => {
            this.setState({ events: [...this.state.events.filter(ev => ev.id !== id)]});
            this.props.deleteEvent(id);
        })
        .catch( (err) => { })
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Loader/>
            )
        }else{
            return (
                <div>
                    <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th className="text-start">Title</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Location</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.events.map((ev) => (
                        <tr key={ev.id}>
                        <td>{ev.id}</td>
                        <td className="text-start">{ev.title}</td>
                        <td>{ev.startDate} {ev.startTime}</td>
                        <td>{ev.endDate} {ev.endTime}</td>
                        <td>{ev.location}</td>
                        <td className="text-end">
                            <Link to={`/events/${ev.id}/update`} className="btn btn-sm btn-secondary me-1">Update</Link>
                            <button className="btn btn-sm btn-danger" onClick={this.deleteEvent.bind(this, ev.id)}>Delete</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default EventsTable
