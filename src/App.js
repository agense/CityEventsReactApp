import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Axios from './Axios';
import Header from './components/Header';
import Events from './pages/Events';
import EventForm from './pages/EventForm';
import CityEvent from './pages/Event';
import EventsTable from './pages/EventsTable';
import CategoryList from './components/CategoryList';
import BannerImage from './components/BannerImage';

export class App extends Component {
  state = {
    events : [],
    categories : [],
    isLoading : false,
  }
  componentDidMount() {
    this.getEvents();
    this.getCategories();
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

  getCategories = () => {
    Axios.get("Categories")
    .then((res) => {
      this.setState({categories : [{id:null, name: "All"}, ...res.data]});
    })
    .catch((err) => {});
  }

  getCategoryEvents = (catId) => {
  
    let uri = (catId !== null) ? `Categories/${catId}/Events` : `/events`
    this.setState({isLoading: true});
    Axios.get(uri)
    .then((res) => {
      this.setState({events : res.data, isLoading: false});
    })
    .catch((e) => { });
  }

  onEventDelete=(id) => {
    Axios.delete(`events/${id}`)
    .then( (res) => {
        this.setState({ events: [...this.state.events.filter(ev => ev.id !== id)]});
    })
    .catch( (err) => { })
  }

  onEventUpdate = (updated) => {
    const modifiedEventIndex = this.state.events.findIndex((obj => obj.id == updated.id));
        this.setState({
        events: [...this.state.events.map(ev => (ev.id === updated.id ? updated : ev) )]
      })
  }

  onEventCreate = (created) => {
    this.setState({
      events: [...this.state.events, created]
    })
  }

  render() {
        return (
          <Router>
            <div className="App">
                <Header/>
                <div className="container body-container">
                    <Route exact path="/" render={props => (
                      <React.Fragment>
                        <BannerImage />
                        <CategoryList categories = {this.state.categories} onSelect = {this.getCategoryEvents}/>
                        <Events events={this.state.events} isLoading={this.state.isLoading}/>
                      </React.Fragment>
                    )} />
                    <Route path="/create" render={props => (
                      <React.Fragment>
                        <EventForm title="Create Event" onEventCreate={this.onEventCreate}/>
                      </React.Fragment>
                    )} />
                    <Route exact path="/events/:id/update" render={props => (
                      <React.Fragment>
                        <EventForm title="Update Event Info"  
                        id={props.match.params.id} 
                        onEventUpdate={this.onEventUpdate}
                        />
                      </React.Fragment>
                    )} />
                    <Route exact path="/events/:id" render={props => (
                      <React.Fragment>
                        <CityEvent id={props.match.params.id} />
                      </React.Fragment>
                    )} />
                    <Route exact path="/manage" render={props => (
                      <React.Fragment>
                        <EventsTable deleteEvent={this.onEventDelete}/>
                      </React.Fragment>
                    )} />
                    
                </div>
            </div>
          </Router>
          
        )
  }
}
export default App;
