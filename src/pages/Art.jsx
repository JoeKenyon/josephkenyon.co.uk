import { artData, getFileName } from "../assets/MyArt"
import { useEffect } from 'react';

export default function Art()
{
  return (
    <div id="Art">
      <title>Joseph Kenyon | Art</title>
      {artData.map((art, index) => (
        <div key={art.path} >
          <div style={{ aspectRatio: `${art.width} / ${art.height}`}}>
            <img src={art.path} loading="lazy" decoding="async" alt={getFileName(art.name)}/>
          </div>
        </div>
      ))}
    </div>
  );
}