
import { useState } from "react";
import { Facebook, Linkedin, Instagram, Twitter, Youtube, Github, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Footer = () => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const [chatEmail, setChatEmail] = useState("");
  const [chatQuestion, setChatQuestion] = useState("");
  const isMobile = useIsMobile();

  const handleChatSubmit = () => {
    if (!chatName || !chatEmail || !chatQuestion) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Chat initiated",
      description: "Our team will get back to you shortly",
    });
    
    setChatOpen(false);
    setChatName("");
    setChatEmail("");
    setChatQuestion("");
  };

  const handleChatButtonClick = () => {
    setChatOpen(true);
  };

  return (
    <footer className="bg-[#0c0027] text-white pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6 pt-4">
          {/* Open contact dialog when Contact Us is clicked */}
          <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
            <DialogTrigger asChild>
              <button className="text-sm hover:underline">Contact Us</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Navigation</DialogTitle>
                <DialogDescription>
                  Quick links to our main pages
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <Link 
                  to="/" 
                  onClick={() => setIsContactDialogOpen(false)}
                  className="flex items-center gap-2 hover:text-blue-500"
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  onClick={() => setIsContactDialogOpen(false)}
                  className="flex items-center gap-2 hover:text-blue-500"
                >
                  About Us
                </Link>
                <Link 
                  to="/contact" 
                  onClick={() => setIsContactDialogOpen(false)}
                  className="flex items-center gap-2 hover:text-blue-500"
                >
                  Contact Us
                </Link>
                <Link 
                  to="/ordering-guide" 
                  onClick={() => setIsContactDialogOpen(false)}
                  className="flex items-center gap-2 hover:text-blue-500"
                >
                  Support
                </Link>
              </div>
            </DialogContent>
          </Dialog>
          
          <Link to="/grading-scale" className="text-sm hover:underline">Grading Scale</Link>
          <Link to="/return-policy" className="text-sm hover:underline">Return Policy</Link>
          <Link to="/shipping-policy" className="text-sm hover:underline">Shipping Policy</Link>
          <Link to="/track" className="text-sm hover:underline">Track Order</Link>
          <Link to="/faq" className="text-sm hover:underline">FAQ</Link>
          <Link to="/blog" className="text-sm hover:underline">Blog</Link>
          <Link to="/become-agent" className="text-sm hover:underline">Become an Agent</Link>
          <Link to="/ordering-guide" className="text-sm hover:underline">Ordering Guide</Link>
        </div>
        
        <div className="flex justify-center space-x-4 mb-8">
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
        
        <div className="text-center text-xs opacity-70 mb-2">
          <p>© 2012-2025 Uephone. All Right Reserved.</p>
        </div>
      </div>

      {/* Chat button - fixed to bottom right */}
      {!isMobile && (
        <div className="fixed right-0 bottom-6 z-40">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="bg-red-600 text-white p-3 flex items-center justify-center"
                  onClick={handleChatButtonClick}
                >
                  <MessageCircle size={24} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Start a live chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {/* Mobile floating chat button */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-40">
          <button
            className="bg-red-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
            onClick={handleChatButtonClick}
          >
            <MessageCircle size={24} />
          </button>
        </div>
      )}

      {/* Chat Dialog */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="bg-white p-0 border-none max-w-md mx-4">
          <div className="bg-red-600 p-4 text-white">
            <DialogTitle className="text-xl font-bold text-center">Live Chat</DialogTitle>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Name"
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div>
                <Input
                  placeholder="Email"
                  type="email"
                  value={chatEmail}
                  onChange={(e) => setChatEmail(e.target.value)}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div>
                <Input
                  placeholder="Question"
                  value={chatQuestion}
                  onChange={(e) => setChatQuestion(e.target.value)}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <Button 
                onClick={handleChatSubmit}
                className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
              >
                <span className="text-white">▶</span> Start Chat
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
