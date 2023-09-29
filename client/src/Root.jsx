import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
export default function Root({account}) {
    return (
        <>
            <Navbar account={account}/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}