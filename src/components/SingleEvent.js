import React, { Component } from 'react'

export class SingleEvent extends Component {
    render() {
        return (
        <>
            <div className="event-holder">
                <div className="event-description">
                    <h1>{this.props.event.title}</h1>
                    <p>{this.props.event.description}</p>
                </div>
                <div className="event-info">
                    <div className="event-detail">
                        <span className="event-detail-title">Date</span>
                        <div className="event-details-dates">
                            <span className="event-detail-title">Start</span>
                            <span className="event-date">{this.props.event.startDate} {this.props.event.startTime}</span>
                        </div>
                        <div className="event-details-dates">
                            <span className="event-detail-title">End</span>
                            <span className="event-date">{this.props.event.endDate} {this.props.event.endTime}</span>
                        </div>
                    </div>

                    <div className="event-detail">
                        <span className="event-detail-title">Tickets Price</span>
                        <span>{this.props.event.priceFrom}€ - {this.props.event.priceTo}€</span>
                    </div>
                    <div className="event-detail">
                        <span className="event-detail-title">Location</span>
                        <span>{this.props.event.location}</span>
                    </div>
                    <div className="event-detail">
                        <span className="event-detail-title">More Information</span>
                        <span>
                            <a href="{this.props.event.website}" target="_blank">{this.props.event.website}</a>
                        </span>
                    </div>
                </div>
            </div>
        </>
        )
    }
}

export default SingleEvent
