import React from 'react'
import * as dayjs from 'dayjs'

export default function SportCardDetailed(props){
    
    function formatDate(date){
        return dayjs(date).format('DD/MM/YYYY  H:m')
    }

    return(
        <div className="border border-gray-800 rounded px-2 pt-2 pb-4 bg-white">
            <div>
                <img src={props.sport.image} alt="image" className="w-full vertical-contain"/>
            </div>
            <p className="my-2 text-center font-bold">{props.sport.name}</p>
            <p className="my-2">{props.sport.description}</p>
            <p>Added: {formatDate(props.sport.created_at)}</p> 
        </div>
    )
}