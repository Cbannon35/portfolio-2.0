"use client"
import React, { useState, useEffect } from "react";
import Key from "./key"
const Controls = () => {
    const [mouseUp, setMouseUp] = useState(false);
    const [keyPressed, setKeyPressed] = useState('');

    useEffect(() => {
        const handleMouseUp = () => {
            setMouseUp(true);
        };
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            setKeyPressed(e.key);
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const handleKeyUp = (e) => {
            setKeyPressed('');
        };
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className="">
            Test Key <Key char={keyPressed} keyToListen={'a'} mouseUp={mouseUp} setMouseUp={setMouseUp}>A</Key>
        </div>
    )
}

export default Controls;