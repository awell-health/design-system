/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlateElement } from '@udecode/plate/react';

/**
 * Custom media components for the rich text editor
 */

export const SimpleImage = (props: any) => {
  const url = props.element.url || '';
  const alt = props.element.alt || '';
  
  return (
    <PlateElement {...props}>
      <div contentEditable={false}>
        {url && (
          <img 
            src={url} 
            alt={alt} 
            className="max-w-full h-auto rounded-sm my-2"
            onError={(e) => {
              console.warn('Failed to load image:', url);
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
      </div>
      {props.children}
    </PlateElement>
  );
};

export const SimpleVideo = (props: any) => {
  const url = props.element.url || '';
  
  return (
    <PlateElement {...props}>
      <div contentEditable={false}>
        <video 
          src={url} 
          controls
          className="max-w-full rounded-sm my-2"
        />
      </div>
      {props.children}
    </PlateElement>
  );
};

export const SimpleAudio = (props: any) => {
  const url = props.element.url || '';
  
  return (
    <PlateElement {...props}>
      <div contentEditable={false}>
        <audio 
          src={url} 
          controls
          className="w-full my-2"
        />
      </div>
      {props.children}
    </PlateElement>
  );
};

export const SimpleFile = (props: any) => {
  const url = props.element.url || '';
  const name = props.element.name || 'Download file';
  
  return (
    <PlateElement {...props}>
      <div contentEditable={false}>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-2 border border-gray-200 rounded my-2 text-blue-500 hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          {name}
        </a>
      </div>
      {props.children}
    </PlateElement>
  );
};

export const SimpleMediaEmbed = (props: any) => {
  const url = props.element.url || '';
  
  // Simple YouTube embed handling
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('v=') 
        ? url.split('v=')[1].split('&')[0]
        : url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };
  
  const embedUrl = getEmbedUrl(url);
  
  return (
    <PlateElement {...props}>
      <div contentEditable={false}>
        <div className="relative pt-[56.25%] my-2"> {/* 16:9 aspect ratio */}
          <iframe
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full rounded-sm"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {props.children}
    </PlateElement>
  );
}; 