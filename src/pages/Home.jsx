import { useEffect } from 'react';

export default function Home() 
{
    const skills = 
    [
        "C++", "C", "C#", "Embedded Systems", "DSA", "STM32",
        "DSP", "Audio Programming", "JUCE", "HTML/CSS", "JS", "ReactJS"
    ]

    return (
        <div>
            <title>Joseph Kenyon | Home</title>
            <div className=" bg-gray-100 overflow-hidden">
                <img src="/imgs/art/dsasdsad.jpg" className="object-contain w-full h-full"/>
            </div>
            <div>
                <h2>Joseph Kenyon</h2>
                <p>Artist, musician, and developer based in Cambridge, UK.</p>
            </div>



            <div>
                <h3>MSc Sound & Music Computing</h3>
                <p className="opacity-80">Queen Mary University of London</p>
            </div>
            <div>
                <h3>BEng Computer Systems Engineering</h3>
                <p className="opacity-80">University of East Anglia</p>
            </div>



            <div>

            <h3>Skills</h3>

            <div className="grid grid-cols-2 gap-y-2 sm:grid-cols-4">

            {

            skills.map( (skill) =>(<p key={skill} className="w-fit h-fit px-1 py-0 text-wrap">{skill}</p>))

            }

            </div>

            </div>
        </div>
    );
}