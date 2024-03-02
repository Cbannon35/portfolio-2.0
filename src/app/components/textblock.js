import React from 'react';

/**
 * A simple text block component.
 * @param {string} text - The text content of the block.
 * @param {boolean} active - If the block is active: if the blocks background color is the color of the page's text -> text is color of page's background.
 * @returns {JSX.Element} - Returns the JSX element representing the TextBlock component.
 */
const TextBlock = ({text, active}) => {
    
    return (
        <span className={`p-3 ${active ? 'text-white bg-black' : 'text-black bg-white'}`}>
            {text}
        </span>
    );

};

export default TextBlock;