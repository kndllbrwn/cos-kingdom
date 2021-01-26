import React, { useState } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


const Bio = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div className=" mt-5 row">
            <div className="col-xs-9 col-md-7" >
            <div className="card border-primary ml-5" style={{maxWidth: "20rem"}}>
            <div className="card-body">
            <span>Username</span>
                <br/>
                <span>Location</span>
                <br/>
                    <span>Bio</span>
            </div>
            </div>
            </div>
            <div className="col-xs-3 col-md-5">
            <ul className="list-group mr-5">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Instagram
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Twitter
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Facebook
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    TikTok
                </li>
            </ul>
            <Calendar
                onChange={onChange}
                value={value}
            />
            </div>
        </div>
    )
}

export default Bio
