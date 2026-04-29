import musicData from '../assets/generatedMusic.json';
import { useParams } from 'react-router-dom';
import { useLayoutEffect } from 'react'; // Change the import

export default function Release() 
{
    const { musicSlug } = useParams();
    const release = musicData.find(m => m.slug === musicSlug);

    if (release) { document.title = `Joseph Kenyon | ${release.title}`; }

    if (!release) return <>404</>;

    useLayoutEffect(() =>
    {
            if (release) { document.title = `Joseph Kenyon | ${release.title}`; }
            return () => { document.title = "Joseph Kenyon | Music"; };
    }, [release, musicSlug]);

    return (
        <div id="Release">
            <h2>{release.title}</h2>    
            <div>

                <img src={release.imageUrl}  alt={release.title}/>
               
                <div>
                {
                    release.tracks?.map((track, i) => 
                    (
                        <div>
                            <h5><span>{(i + 1).toString().padStart(2, '0')}.</span>{track.title}</h5>
                            <iframe className="song" src={`https://bandcamp.com/EmbeddedPlayer/track=${track.id}/size=small/bgcol=ffffff/linkcol=000000/transparent=true/`}/>
                        </div>
                    ))
                }
                </div>
            
            </div>
        </div>
    );
}