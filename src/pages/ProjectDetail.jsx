import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import fm from 'front-matter';

export default function ProjectDetail() 
{
  const { slug } = useParams();
  const navigate = useNavigate(); // Initialize navigation
  const [post, setPost] = useState({ data: {}, content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function loadPost() {
        try {
          const modules = import.meta.glob('../content/projects/*.md', { 
            query: '?raw', 
            import: 'default' 
          });

          const path = `../content/projects/${slug}.md`;
          
          // If project file doesn't exist in the glob
          if (!modules[path]) {
            console.warn("Project not found, returning home.");
            navigate('/', { replace: true }); // Bounces the user back to the root
            return;
          }

          const fileContent = await modules[path]();
          const { attributes, body } = fm(fileContent);

          document.title = `Joseph Kenyon | ${attributes.title || 'Project'}`;
          setPost({ data: attributes, content: body });
          setLoading(false);
        } catch (e) {
          console.error("Error loading project:", e);
          navigate('/', { replace: true });
        }
      }
      loadPost();
    }, [slug, navigate]);

  if (loading) return <>Loading...</>;

  return (
    <div id="ProjectDetail">
      <h1>{post.data.title}</h1>
      
        
      { 
        post.data.tags && 
        (
          <div className='tagBox'>
            {post.data.tags.map(tag => (<p key={tag}>{tag}</p>))}
          </div>
        )
      }

      {
        post.data.videoUrl && 
        (
        <div key={post.data.title}>
          <iframe src={post.data.videoUrl} className="w-full h-full" title={`Video ${post.data.title}`}/>
        </div>
        )
      }
      
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  );
}