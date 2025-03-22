
import { Facebook, Linkedin, Instagram, Twitter, Youtube, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-[#1a0050] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-6 mb-6 pt-4">
          <a href="#" className="text-sm hover:underline">Contact Us</a>
          <a href="#" className="text-sm hover:underline">Grading Scale</a>
          <a href="#" className="text-sm hover:underline">Return Policy</a>
          <a href="#" className="text-sm hover:underline">Shipping Policy</a>
          <a href="#" className="text-sm hover:underline">FAQ</a>
          <a href="#" className="text-sm hover:underline">Blog</a>
          <a href="#" className="text-sm hover:underline">Become an Agent</a>
          <a href="#" className="text-sm hover:underline">Ordering Guide</a>
        </div>
        
        <div className="flex justify-center space-x-4 mb-6">
          <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10 rounded-full">
            <Linkedin size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10 rounded-full">
            <Youtube size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10 rounded-full">
            <Facebook size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10 rounded-full">
            <Twitter size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10 rounded-full">
            <Instagram size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10 rounded-full">
            <Github size={20} />
          </Button>
        </div>
        
        <div className="text-center text-xs opacity-70">
          <p>© 2023-2024 UEEphone, All Right Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
