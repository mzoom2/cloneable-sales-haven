
import { useEffect } from 'react';

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  useEffect(() => {
    // Update document title when component mounts or title changes
    document.title = `UE EPHONE | ${title}`;
    
    // Reset to default when component unmounts
    return () => {
      document.title = 'UE EPHONE';
    };
  }, [title]);
  
  // This component doesn't render anything visible
  return null;
};

export default Title;
