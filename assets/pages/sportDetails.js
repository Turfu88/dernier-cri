import React from 'react'
import {useState, useEffect} from 'react'
import SportCardDetailed from '../components/sportCardDetailed'
import request from '../components/request'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

export default function SportDetails(){
    let {id} = useParams()
    const [sport, setSport] = useState(null)

    // console.log("Sport details :",sport)

    useEffect(() => {
        if(sport === null){
            request(`/api/sports/${id}`, "GET").then((res)=>{
                if(res.status === 200){
                    setSport(res.json)
                }else{
                    setSport([])
                }
                return
            })
        }
    }, [sport])
    
    return(
        <div className='px-5'>
            <Link to="/" className='absolute top-4 p-1 border  border-black rounded shadow-md'>Retour</Link>
            <h1 className='text-center text-2xl mt-10 font-bold mb-5'>Sports API</h1>
            {sport === null?
                <div className="w-full">
                    <p className="text-center mt-40">Chargement...</p>
                </div>
            :
                <>
                    <SportCardDetailed sport={sport} />        
                </>
            }
        </div>
    )
}