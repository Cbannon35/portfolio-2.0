"use client"
import React, {useState, useEffect} from "react";

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

const SongBox = ({song, loading, displaySong}) => {
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
    const [song, setSong] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchSong = async () => {
        try {
            const response = await fetch('/api/now-playing');
            const song = await response.json();
            setSong(song);
        } catch (e) {
            console.error(e);
            setSong({isPlaying: false});
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (displaySong) fetchSong();
        }, 30 * 1000);

        return () => clearInterval(interval);
  }, [displaySong]);

    return (
        <div className="p-4 border-white border-2">
            <button onClick={
                async () => {
                    setLoading(true);
                    if (!displaySong) await fetchSong();
                    setDisplaySong(!displaySong)
                    setLoading(false);
                }}
                >
                    Toggle
            </button>
            <SongBox song={song} loading={loading} displaySong={displaySong} />
        </div>
    )
}

export default SpotifyWrapper;