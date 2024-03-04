"use client"
import React, { useState, useEffect } from "react";
import { UpArrow, RightArrow, LeftArrow, DownArrow } from "@/app/utils/symbols";
import Key from "./key"

/* Keys we use */
const keys = ["a", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

/**
 * Controls component.
 * @param {{incrementSectionPointer: function, decrementSectionPointer: function, incrementSubSectionPointer: function, decrementSubSectionPointer: function}} props - The component props.
 * @returns {JSX.Element} - The Controls component.
 */
const Controls = (props) => {
    const { incrementSectionPointer, decrementSectionPointer, incrementSubSectionPointer, decrementSubSectionPointer } = props;
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
            if (keys.includes(e.key)) e.preventDefault();
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
        <div className="flex flex-row">
            <div className="">
                Test Key <Key char={keyPressed} keyToListen={'a'} mouseUp={mouseUp} setMouseUp={setMouseUp}>A</Key>
            </div>
            <div className="">
                Navigate
                <Key char={keyPressed} keyToListen={'ArrowLeft'} mouseUp={mouseUp} setMouseUp={setMouseUp} fn={decrementSectionPointer}>{LeftArrow}</Key>
                <Key char={keyPressed} keyToListen={'ArrowRight'} mouseUp={mouseUp} setMouseUp={setMouseUp} fn={incrementSectionPointer}>{RightArrow}</Key>
            </div>
            <div className="">
                Scroll
                <Key char={keyPressed} keyToListen={'ArrowUp'} mouseUp={mouseUp} setMouseUp={setMouseUp} fn={decrementSubSectionPointer}>{UpArrow}</Key>
                <Key char={keyPressed} keyToListen={'ArrowDown'} mouseUp={mouseUp} setMouseUp={setMouseUp} fn={incrementSubSectionPointer}>{DownArrow}</Key>
            </div>
        </div>
    )
}

export default Controls;