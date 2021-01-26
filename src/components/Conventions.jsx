import React from 'react'
import moment from "moment"

const Cosplays = () => {
    return (
        <>
        <h2>Cons</h2>
        <div className="row">
            <div className="col-xs-9 col-md-7 ml-3" >
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <h3>BlerdCon (*****)</h3>
                    <span>{moment('12/06/2019', 'DD/MM/YYYY', true).format("MMMM DD, YYYY")}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <h3>AwesomeCon (*****)</h3>
                    <span>{moment('31/03/2018', 'DD/MM/YYYY', true).format("MMMM DD, YYYY")}</span>
                </li>
            </ul>
            </div>
        </div>
        </>
    )
}

export default Cosplays
