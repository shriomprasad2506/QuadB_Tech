import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import Timer from "./Timer"

export default function Header() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('darkMode', !isDarkMode);
    };

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== 'true') {
            setIsDarkMode(true);
        }
    }, []);
    return (
        <div className="header">
            <img src="/HODLINFO_ICON.png" className="header-img" />
            <div style={{ display: "flex", gap: '20px' }}>
                <div className="dropdown">
                    <select className="first">
                        <option value="INR">INR</option>
                    </select>
                    <span>
                        <FaCaretDown />
                    </span>
                </div>
                <div className="dropdown" >
                    <select className="first">
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="USDT">USDT</option>
                        <option value="XRP">XRP</option>
                        <option value="TRX">TRX</option>
                        <option value="DASH">DASH</option>
                        <option value="ZEC">ZEC</option>
                        <option value="XEM">XEM</option>
                        <option value="IOST">IOST</option>
                        <option value="WIN">WIN</option>
                        <option value="BTT">BTT</option>
                        <option value="WRX">WRX</option>
                    </select>
                    <span>
                        <FaCaretDown />
                    </span>
                </div>
                <div  className="buybtc">
                    <button>BUY BTC</button>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center",gap:'6px' }}>
                <Timer/>
                <div className="connect" style={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'5px'}}>
                    <FaTelegramPlane/> &nbsp;
                    Connect Telegram
                </div>
                <input type="checkbox" checked={isDarkMode} id="switch" onChange={()=>{}} />
                <label htmlFor="switch" onClick={toggleDarkMode}></label>
            </div>
        </div>
    )
}