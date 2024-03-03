"use client"
import React, { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const displayCurrentSong = (song) => {
    if (!song.isPlaying) {
        return (
            <div>
                <p>I'm Currently Offline</p>
            </div>
        )
    }
    if (song.songType === "ad") {
        return (
            <div>
                <p>An ad got to me :'(</p>
            </div>
        );
    }
    return (
        <div>
            <p>Listening To{" "}</p>
            <a href={song.songUrl} target="_blank">
                {song.title}
            </a>
        </div>
    );
}

const SongBox = ({ song, loading, displaySong }) => {
    if (loading) {
        return (
            <div>
                <p>Fetching from Spotify...</p>
            </div>
        );
    }
    if (displaySong) {
        return displayCurrentSong(song);
    }
    return <p>(^_-)-☆</p>;
}

const SpotifyWrapper = (props) => {
    const [displaySong, setDisplaySong] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data, error, mutate, isLoading } = useSWR('/api/now-playing', fetcher);

    useEffect(() => {
        const interval = setInterval(() => {
            if (displaySong) mutate();
        }, 30 * 1000);

        return () => clearInterval(interval);
    }, [displaySong]);

    return (
        <div className="p-4 border-white border-2">
            <button onClick={
                async () => {
                    setLoading(true);
                    if (!displaySong) await mutate();
                    setDisplaySong(!displaySong)
                    setLoading(false);
                }}
            >
                Toggle
            </button>
            {!error ? <SongBox song={data} loading={loading} displaySong={displaySong} /> : <div>An error occured</div>}
        </div>
    )
}

export default SpotifyWrapper;