"use client"
import React, { useState, useEffect } from "react";
import Key from "./key"
const Controls = () => {
    const [mouseUp, setMouseUp] = useState(false);

    function test() {
        console.log("testing")
    }

    useEffect(() => {
        const handleMouseUp = () => {
            setMouseUp(true);
        };
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div className="">
            Test Key <Key char="A" fn={test} mouseUp={mouseUp} setMouseUp={setMouseUp} />
        </div>
    )
}

export default Controls;