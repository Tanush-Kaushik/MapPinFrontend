import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import { format } from 'timeago.js'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../styles.css'
import Navbar from './Navbar';

export default function LiveMap() {

    const [points, setPoints] = useState([])
    const [curPlaceId, setCurPlaceId] = useState(null)
    const [newPoint, setNewPoint] = useState(null)

    const [title, setTitle] = useState(null)
    const [des, setDes] = useState(null)
    const [rating, setRating] = useState(0)
    const [loading,setLoading] = useState(false)


    const getPoints = async () => {
        try {

            let response = await fetch('https://mappinbackend.onrender.com/api/getAllPoints', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            let res = await response.json()

            setPoints(res.points)
            // console.log(points[0])

        } catch (error) {
            console.log(error)
        }
    }

    const handleMarkerClick = (id) => {
        setCurPlaceId(id)
        // console.log(curPlaceId)
    }


    const handleDblClick = (e) => {
        // console.log(e.lngLat.lng)
        setNewPoint({
            lon: e.lngLat.lng,
            lat: e.lngLat.lat
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            if(!localStorage.getItem('userEmail')){
                return alert("login first")
            }

            let response1 = await fetch('https://mappinbackend.onrender.com/api/find', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email:localStorage.getItem('userEmail')
                })
            })

            let res1 = await response1.json()
            const name = res1.name  


            let response = await fetch('https://mappinbackend.onrender.com/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email:localStorage.getItem('userEmail'),
                    title,
                    desc: des, 
                    rating,
                    lon: newPoint.lon,
                    lat: newPoint.lat
                })
            })

            let res = await response.json()

            setPoints([...points, res.newPoint])

            setNewPoint(null)
            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPoints()
    }, [])


    return (
        <div>
            <div><Navbar /></div>
            <Map
                mapboxAccessToken='pk.eyJ1Ijoic2FmYWsiLCJhIjoiY2tubmFvdHVwMTM0bDJ2bnh3b3g5amdsYiJ9.fhCd-5dCeop0Jjn3cBV9VA'
                initialViewState={{
                    longitude: 78.042068,
                    latitude: 27.173891,
                    zoom: 3.5
                }}
                style={{ width: '100vw', height: '91.7vh' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onDblClick={handleDblClick}
                doubleClickZoom={false}
            >
                {
                    points.map(p => {
                        return (
                            <>
                                <Marker longitude={p.lon} latitude={p.lat} onClick={() => handleMarkerClick(p._id, p.lon, p.lat)}>
                                    <PlaceIcon style={{ color: p.email === localStorage.getItem('userEmail') ? 'red' : 'blue', cursor: 'default' }} />
                                </Marker>

                                {
                                    p._id === curPlaceId ? (
                                        <Popup longitude={p.lon} latitude={p.lat}
                                            anchor="left"
                                            closeOnClick={false}
                                            closeButton={true}
                                            onClose={() => setCurPlaceId(null)}
                                            transition="flyTo"
                                        >
                                            <div className='card'>
                                                <label>Place</label>
                                                <h1 className='location'>{p.title}</h1>
                                                <label>Review</label>
                                                <p style={{ fontSize: '15px' }}>{p.desc}</p>
                                                <label>Rating</label>
                                                <div>
                                                    {Array(p.rating)
                                                        .fill(true)
                                                        .map(() => (
                                                            <StarIcon style={{ color: "gold" }} />
                                                        ))}
                                                </div>
                                                <label>Information</label>
                                                <p style={{ fontSize: '15px' }}>Created by <b>{p.name}</b></p>
                                                <span style={{ fontSize: '12px' }}>{format(p.createdAt)}</span>
                                            </div>
                                        </Popup>) : (<></>)
                                }
                            </>
                        )

                    })
                }

                {newPoint &&
                    <Popup longitude={newPoint.lon} latitude={newPoint.lat}
                        anchor="left"
                        closeOnClick={false}
                        closeButton={true}
                        onClose={() => setNewPoint(null)}
                    >
                        <form className='card' style={{ height: "290px" }} onSubmit={handleSubmit}>
                            <label>Place</label>
                            <input placeholder='Enter place name' style={{ border: "none", borderBottom: "1px solid rgb(164, 162, 162)", marginTop: "20px", marginBottom: "20px", color: "grey" }} onChange={(e) => setTitle(e.target.value)} />
                            <label>Review</label>
                            <textarea placeholder="Enter review" style={{ border: "none", borderBottom: "1px solid grey", marginTop: "20px", marginBottom: "10px" }} onChange={(e) => setDes(e.target.value)} />
                            <label>Rating</label>
                            <select style={{ marginTop: "20px", marginBottom: "10px", fontSize: "17px" }} onChange={(e) => setRating(e.target.value)}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                            <button type='submit' style={{ marginTop: "15px" }} onClick={()=>setLoading(true)}>Save</button>
                            {loading && <div style={{textAlign:"center"}}>Loading</div>}
                        </form>
                    </Popup>
                }
            </Map>
        </div>
    );
} 
