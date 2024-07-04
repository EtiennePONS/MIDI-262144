import "./ProgressBar.css";
import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

function VideoPlayer({ reference }) {
  const videoRef = reference;
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };
    video.addEventListener("timeupdate", updateTime);
    return () => {
      video.removeEventListener("timeupdate", updateTime);
    };
  });
  function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

  return (
    <div>
      {" "}
      <div className="progress progress-fat" style={{ height: `30px` }}>
        <div
          className="progress-bar progress-bar-striped orange "
          role="progressbar"
          style={{ width: `${(currentTime / duration) * 100}% ` }}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <h5 className="pourcentage">
            {" "}
            {Math.round((currentTime / duration) * 100)}%
          </h5>
        </div>
      </div>{" "}
      <p className="donnees">
        {formatTime(currentTime)} / {formatTime(duration)}
      </p>
    </div>
  );
}
export default VideoPlayer;
