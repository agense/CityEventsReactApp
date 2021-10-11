import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Axios from '../Axios';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';

export class EventForm extends Component {
    state ={
        event: {
            "title": "",
            "description": "",
            "startDate": "",
            "startTime": "",
            "endDate": "",
            "endTime": "",
            "location": "",
            "website": "",
            "priceFrom": 0,
            "priceTo": 0,
            "categories": []
        },
        categories:[],
        redirect: false,
        isLoading: false,
        eventLoaded : false,
        errors : {},
    }

    componentDidMount() {
        this.getEvent();
        this.getCategories();
    }

    getCategories = () => {
        Axios.get("Categories")
        .then((res) => {
            this.setState({categories : res.data});
        })
        .catch((e) => {});
    }

    getEvent = () => {
        if(this.props.id){
            this.setState({isLoading: true});
            Axios.get(`events/${this.props.id}`)
            .then((response) => {
                this.setState({ event : response.data, isLoading: false, eventLoaded: true});
            })
            .catch((e) => {
                this.setState({isLoading: false});
            });
        } 
    }

    categoryApplies = (category) => {
        return this.state.event.categories.includes(this.state.event.categories.find(c=>c.id === category.id));
    }

    onChange = (e) => this.setState({
        event: {...this.state.event,
            [e.target.name]: e.target.value
        }
    });

    onCategoryChange = (e) => {
        let eventCategories = [...this.state.event.categories];

        if(e.target.checked === true){
            const category = this.state.categories.find(ev => ev.id == e.target.value);
            if(!eventCategories.includes(category) ){
                eventCategories.push(category);
            }
        }else{
            eventCategories = eventCategories.filter(cat => cat.id != e.target.value);
        }
        this.setState({
        event: {...this.state.event, categories : [...eventCategories] }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const evt = {...this.state.event, 
            start : `${this.state.event.startDate}T${this.state.event.startTime}`,
            end : `${this.state.event.endDate}T${this.state.event.endTime}`,
            website : (!this.state.event.website || this.state.event.website.length === 0) ? null :this.state.event.website
        }
        if(this.props.id){
            return this.updateEvent(evt);
        }else{
            return this.createEvent(evt);
        }
    };

    updateEvent = (evt) => {
        this.setState({isLoading: true});
        Axios.put(`events/${this.props.id}`, evt)
        .then(async res => {
            await this.props.onEventUpdate(res.data);
            this.setState({ isLoading:false, redirect: true })
        })
        .catch(err => {
            this.setState({isLoading: false});
            this.handleErrors(err.response);
        })
    }

    createEvent = (evt) => {
        this.setState({isLoading: true});
        Axios.post('events/', evt)
        .then(async res => {
            await this.props.onEventCreate(res.data);
            this.setState({ isLoading:false, redirect: true })
        })
        .catch(err => {
            this.setState({isLoading: false});
            this.handleErrors(err.response);
        })
    }

    handleErrors = (resp) => {
        if(resp.status == 400){
            if(resp.data.errors){
                this.setState({
                    errors: resp.data.errors
                });
            }else{
                console.log(resp);
            }
        }
    }

    errorInField = (field) => {
        return field in this.state.errors;
    }

    render() {
        if (this.state.isLoading) {
            return (<Loader/>)
        }
        else if(this.props.id && !this.state.eventLoaded){
            return (<NotFound />)
        }
        else if(this.state.redirect)
        {
            return ( this.props.id ?  <Redirect to='/manage' /> : <Redirect to='/' />)
        }
        else {
            return (
                <>
                    <h1>{this.props.title}</h1>
                    <div className="card form-card">
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" 
                            name="title" 
                            value={this.state.event.title} 
                            onChange={this.onChange}
                            className="form-control" 
                            id="title" 
                            />
                            {this.errorInField("Title") ? <div className="error">{this.state.errors.Title}</div> : ""}
                        </div>
                        <div className="grid-justified">
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">Location</label>
                                <input type="text"
                                value={this.state.event.location} 
                                onChange={this.onChange} 
                                className="form-control" 
                                name="location"
                                id="location"
                                />
                                {this.errorInField("Location") ? <div className="error">{this.state.errors.Location}</div> : ""}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="website" className="form-label">Website</label>
                                <input type="text" 
                                className="form-control" 
                                id="website"
                                name="website" 
                                value={this.state.event.website} 
                                onChange={this.onChange}
                                />
                                {this.errorInField("Website") ? <div className="error">{this.state.errors.Website}</div> : ""}
                            </div>
                        </div>
                        <div className="grid-justified">
                            <div className="mb-3">
                                <div className="flex-row">
                                    <div>
                                        <label htmlFor="start_date" className="form-label">Start Date</label>
                                        <input type="date" 
                                        className="form-control" 
                                        id="start_date"
                                        name="startDate"
                                        value={this.state.event.startDate}
                                        onChange={this.onChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="start_time" className="form-label">Start Time</label>
                                        <input type="time" 
                                        className="form-control" 
                                        id="start_time"
                                        name="startTime"
                                        value={this.state.event.startTime}
                                        onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                 {this.errorInField("Start") ? <div className="error">{this.state.errors.Start}</div> : ""}
                            </div>
                           
                            <div className="mb-3">
                                <div className="flex-row">
                                    <div>
                                        <label htmlFor="end_date" className="form-label">End Date</label>
                                        <input type="date" 
                                        className="form-control" 
                                        id="end_date"
                                        name="endDate"
                                        value={this.state.event.endDate}
                                        onChange={this.onChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="end_time" className="form-label">End Time</label>
                                        <input type="time" 
                                        className="form-control" 
                                        id="end_time"
                                        name="endTime"
                                        value={this.state.event.endTime}
                                        onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                {this.errorInField("End") ? <div className="error">{this.state.errors.End}</div> : ""}
                            </div>
                        </div>                       
                        <div className="grid-justified">
                            <div className="mb-3">
                                <label htmlFor="price_from" className="form-label">Tickets From</label>
                                <input type="number" 
                                min="0" className="form-control" 
                                id="price_from"
                                name="priceFrom" 
                                value={this.state.event.priceFrom} 
                                onChange={this.onChange}
                                />
                                {this.errorInField("PriceFrom") ? <div className="error">{this.state.errors.PriceFrom}</div> : ""}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price_to" className="form-label">Tickets To</label>
                                <input type="number" 
                                min="0" 
                                className="form-control" 
                                id="price_to"
                                name="priceTo" 
                                value={this.state.event.priceTo} 
                                onChange={this.onChange}
                                />
                                {this.errorInField("PriceTo") ? <div className="error">{this.state.errors.PriceTo}</div> : ""}
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-subtitle">Categories</div>
                             {this.errorInField("Categories") ? <div className="error">{this.state.errors.Categories}</div> : ""}
                            <div className="flex-list">
                            {
                                this.state.categories.map(category => {
                                    return (
                                        <div className="form-check" key={category.id}>
                                            <input className="form-check-input" 
                                            type="checkbox" 
                                            value={category.id} 
                                            id={category.name} 
                                            name="categories[]"
                                            onChange={this.onCategoryChange}
                                            checked = {this.categoryApplies(category) ? "checked" : ""}
                                            />
                                            <label className="form-check-label" htmlFor="">{category.name}</label>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea 
                            className="form-control" 
                            id="description" 
                            rows="5"
                            name="description" 
                            value={this.state.event.description} 
                            onChange={this.onChange}
                            >
                            </textarea>
                             {this.errorInField("Description") ? <div className="error">{this.state.errors.Description}</div> : ""}
                        </div>
                        <input type="submit" value={this.props.title} className="btn btn-success"/>
                        </form>
                    </div>
                    </div>    
                </>
            )
        }
    }
}

export default EventForm
