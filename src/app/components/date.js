"use client";
import React, { useEffect, useState } from 'react';

/**
 * Takes in the date object and returns the date in mm/dd/yyyy format
 * @param {Date} date
 * @returns Formatted date string
 */
function calculateDate(date) {
  return (
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + date.getDate()).slice(-2) +
    "/" +
    date.getFullYear()
  );
}

/**
 * Takes in the date object and returns the time in hh:mm:ss format
 * @param {Date} date 
 * @returns Formatted time string
 */
function calculateTime(date) {
  return (
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2) +
    ":" +
    ("0" + date.getSeconds()).slice(-2)
  );
}

const DateTime = () => {
    const [test, setTest] = useState(false);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setTest(true);
        var timerID = setInterval(() => tick(), 1000);
        return function cleanup() {
            clearInterval(timerID);
        };
    }, []);

    function tick() {
        setDate(new Date());
    }

    /* Seems to fix mismatch between server and client rendering... delay is good? */
    if (!test) {
        return <div>Loading...</div>;
    }

    return (
        <div id="DateTime" className="flex-col">
            {calculateDate(date)}
            <br />
            {calculateTime(date)}
        </div>
    );
}

export default DateTime;