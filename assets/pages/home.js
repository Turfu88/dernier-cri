import React from 'react'
import {useState, useEffect} from 'react'
import request from '../components/request'
import SportCard from '../components/sportCard'

export default function Home(){
    const [sports, setSports] = useState(null)

    // console.log("Sports :",sports)

    useEffect(() => {
        if(sports === null){
            request(`/api/sports`, "GET").then((res)=>{
                if(res.status === 200){
                    setSports(res.json)
                }else{
                    setSports([])
                }
                return
            })
        }
    }, [sports])
    

    return(
        <div className='px-5'>
            <h1 className='text-center text-2xl mt-10 font-bold'>Sports API</h1>
            {sports === null?
                    <div className="w-full">
                        <p className="text-center mt-40">Loading...</p>
                    </div>
                :
                    <>
                        {sports.length > 0 &&
                            <>
                                <h2 className="text-2xl">All sports</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 my-5">
                                    {sports.map((sport, index) => (
                                        <div key={index}>
                                            <SportCard sport={sport} />
                                        </div>
                                        
                                    ))}
                                </div>
                            </>
                        }
                    </>
                }

        </div>
    )
}