"use client"
import { useEffect, useState } from 'react';

const keyPressedClasses = "px-1 pb-1 pt-[.2rem] bg-white text-primary-blue"
const keyClasses = "p-1 border-t-[0.0625rem]"

/**
 * Key component representing a keyboard key.
 * @param {Object} props - The component props.
 * @param {string} props.char - The character associated with the key.
 * @param {string} props.keyToListen - The key code to listen for.
 * @param {function} props.fn - The function to call when the key is clicked.
 * @param {boolean} props.mouseUp - Indicates if the mouse button is released.
 * @param {function} props.setMouseUp - Function to update the mouseUp state.
 * @param {*} props.children - The content to be rendered within the Key component.
 * @returns {JSX.Element} - The Key component.
 */
export default function Key({ children, char, keyToListen, fn, mouseUp, setMouseUp }) {

    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        if (mouseUp) setPressed(false);
    }, [mouseUp])

    useEffect(() => {
        if (char === keyToListen) {
            setPressed(true);
            fn();
            return;
        }
        setPressed(false);
    }, [char])

    return (
        <div className={`inline border-white border-b-[0.125rem] border-x-[0.0625rem] leading-[.85] cursor-pointer select-none ${pressed ? keyPressedClasses : keyClasses}`}
            onMouseDown={() => { setPressed(true); setMouseUp(false) }}
            onClick={fn}
        >
            {children}
        </div>
    );
}