import React, { useState, useEffect } from "react";
import axios from "axios"
export default function Table({ loading,setLoading }) {
    const API_URL = 'https://quadb-tech-g0nf.onrender.com'
    const [tickers, setTickers] = useState([]);
    
    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/tickers`)
            setTickers(response.data)
            console.log(response)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div sclassName="table">
            <table>
                <thead>
                    <tr>
                        <th className="headid">#</th>
                        <th className="name">Name</th>
                        <th>Last Traded Price</th>
                        <th>Buy / Sell Price</th>
                        <th className="volume">Volume</th>
                        <th className="base">Base Unit</th>
                    </tr>
                </thead>
                {
                    !loading &&
                    <tbody>
                        {tickers.length > 0 ? (
                            tickers.map((ticker, index) => (
                                <tr key={ticker.id}>
                                    <td>{ticker.id}</td>
                                    <td>{ticker.name}</td>
                                    <td>₹ {parseFloat(ticker.last).toFixed(2)}</td>
                                    <td>₹ {parseFloat(ticker.buy).toFixed(2)} / ₹ {parseFloat(ticker.sell).toFixed(2)}</td>
                                    <td style={{paddingLeft:'20px',color:'#3dc6c1'}}>{parseFloat(ticker.volume).toFixed(2)}</td>
                                    <td style={{color:'rgb(218, 87, 87)'}}>{ticker.base_unit}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No data available</td>
                            </tr>
                        )}
                    </tbody>
                }


            </table>

        </div>
    )
}