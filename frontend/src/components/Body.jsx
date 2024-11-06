import React, { useState } from "react";

export default function MainPage() {
    return (
        <div className="body" style={{display:'flex',justifyContent:"center",flexDirection:'column',alignItems:'center'}}>
            <p className="BTT">Best Price To Trade</p>
            <div style={{display:'flex', justifyContent:'space-around',width:'100vw',alignItems:'center'}}>
                <div>
                    <p className="text-body">0.1 %</p>
                    <p className="text-bottom">5 Mins</p>
                </div>
                <div>
                    <p className="text-body">0.96 %</p>
                    <p className="text-bottom">1 Hour</p>
                </div>

                <div>
                    <p className="text-main">₹ 2,656,110</p>
                    <p className="text-bottom">Average BTC/INR net price including commission</p>
                </div>

                <div>
                    <p className="text-body">2.73 %</p>
                    <p className="text-bottom">1 Day</p>
                </div>
                <div>
                    <p className="text-body">7.51 %</p>
                    <p className="text-bottom">7 Days</p>
                </div>
                
            </div>
        </div>
    )
}