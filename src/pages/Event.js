import React, { Component } from 'react'
import Axios from '../Axios';
import SingleEvent from '../components/SingleEvent';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';

export class Event extends Component {
    state = {
        event : null,
        isLoading: false
    }

    componentDidMount() {
        this.getEvent();
    }

    getEvent = () => {
        this.setState({isLoading: true});
        Axios.get(`Events/${this.props.id}`)
        .then((response) => {
            this.setState({event : response.data, isLoading: false});
        })
        .catch((e) => {
            this.setState({isLoading: false});
        });
    }
    
    render() {
        if (this.state.isLoading) {
            return (
                <Loader/>
            )
        }else {
            if(this.state.event == null){
                return <NotFound />
            }
            else{
                return (
                    <SingleEvent event={this.state.event}/>
                )
            }
        }  
    }
}
export default Event
