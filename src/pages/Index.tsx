
import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductDisplay from '@/components/ProductDisplay';
import BecomeAgent from '@/components/BecomeAgent';
import Footer from '@/components/Footer';

const Index = () => {
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
            top: element.offsetTop - 80, // Offset for fixed header
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <Header />
      <Hero />
      <ProductDisplay />
      <BecomeAgent />
      <Footer />
    </div>
  );
};

export default Index;
