import YouTube from "react-youtube";
import React from "react";

type PropsType = {
  trailerURL: string;
  isPlaying?: boolean | null;
};

const TrailerBlock: React.FC<PropsType> = ({ trailerURL, isPlaying }) => {
  const opts = {
    playerVars: {
      autoplay: isPlaying ? true : false,
    },
  };

  return trailerURL ? <YouTube videoId={trailerURL} opts={opts} /> : null;
};

export default TrailerBlock;
