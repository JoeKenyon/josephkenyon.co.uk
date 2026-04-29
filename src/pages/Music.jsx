import musicData from '../assets/generatedMusic.json';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Music()
{  
  return (
    <div id="Music">
      <title>Joseph Kenyon | Music</title>
    {
        musicData.map((release) => 
        (
            <Link to={`/music/${release.slug}`}>
                <img src={release.imageUrl} alt={release.title} className='w-full'/>
                <h6>{release.title}</h6>
            </Link>
        ))
    }
    </div>
  );
}