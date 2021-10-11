import React from 'react';
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">City Events</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-1 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/create" className="nav-link">Add Event</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/manage" className="nav-link">Manage Events</Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}
