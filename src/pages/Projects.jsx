import { Link } from 'react-router-dom';
import fm from 'front-matter';
import { useEffect } from 'react';

const projectFiles = import.meta.glob('../content/projects/*.md', { 
  query: '?raw', 
  import: 'default', 
  eager: true 
});

const projects = Object.keys(projectFiles).map((path) =>
{
  const content = projectFiles[path];
  const { attributes } = fm(content);
  const slug = path.split('/').pop().replace('.md', '');
  return { ...attributes, slug };
});

export default function Projects() {
  return (
    <div id="Projects">
      <title>Joseph Kenyon | Projects</title>
      {projects.map((project) => (
        <Link to={`/projects/${project.slug}`} >
          <h4>{project.title}</h4>
          <p>{project.description}</p>
          {project.tags && 
            (
              <div className='tagBox'>
                {project.tags.map(tag =>( <p key={tag}>{tag}</p> ) )}
              </div>
              
            )
            
          }
        </Link>
        
      ))}
    </div>
  );
}