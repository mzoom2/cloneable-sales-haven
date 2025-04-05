
import React, { useEffect } from 'react';

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  useEffect(() => {
    // Set the document title when the component mounts or title changes
    document.title = `${title} | UEEphone`;
    
    // Cleanup: reset title when component unmounts
    return () => {
      document.title = 'UEEphone';
    };
  }, [title]);

  // This component doesn't render anything visible
  return null;
};

export default Title;
