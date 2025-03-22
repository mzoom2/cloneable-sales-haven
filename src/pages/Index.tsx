
import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductDisplay from '@/components/ProductDisplay';
import BecomeAgent from '@/components/BecomeAgent';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  // Add smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        
        if (element) {
          window.scrollTo({
            top: element.offsetTop - (isMobile ? 60 : 80), // Adjust offset for fixed header based on device
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [isMobile]);

  return (
    <div className="overflow-x-hidden">
      <Header />
      <Hero />
      <ProductDisplay />
      <BecomeAgent />
      <Footer />
    </div>
  );
};

export default Index;
