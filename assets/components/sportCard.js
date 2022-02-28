import React from 'react'
import { Link } from 'react-router-dom'

export default function SportCard(props){

    return(
        <Link to={`/sports/${props.sport.id}`}>
        <div className="border border-gray-800 rounded px-2 pt-2 pb-4 bg-white">
            
                <div>
                    <img src={props.sport.thumbnail} alt="image" className="w-full vertical-contain"/>
                </div>
                <p className="my-2 text-center">{props.sport.name}</p>

            
        </div>
        </Link>
    )
}