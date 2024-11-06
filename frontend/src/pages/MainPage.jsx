import React, { useState } from "react";
import Header from "../components/Header";
import Body from "../components/Body"
import Table from "../components/Table"

export default function MainPage() {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <Header />
            {
                loading &&
                <div className='loader' style={{ position: 'absolute', top: '70%', left: '45%' }}></div>
            }
            <Body/>
            <Table setLoading={setLoading} loading={loading}/>
        </>
    )
}