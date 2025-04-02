import { useState, useEffect } from "react";
import { Facebook, Linkedin, Instagram, Twitter, Youtube, Github, MessageCircle, Send, X, Loader2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { sendChatMessage, getChatMessages, markMessagesAsRead, ChatMessage } from "@/services/ChatService";
import { useAuth } from "@/contexts/AuthContext";

const Footer = () => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const [chatEmail, setChatEmail] = useState("");
  const [chatQuestion, setChatQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string>("");
  const [chatInitialized, setChatInitialized] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [pollInterval, setPollInterval] = useState<number | null>(null);
  const [messageCountBadge, setMessageCountBadge] = useState<number>(0);
  const isMobile = useIsMobile();
  const { user } = useAuth();

  // Check for saved conversation ID in localStorage
  useEffect(() => {
    const savedConversationId = localStorage.getItem("chatConversationId");
    if (savedConversationId) {
      setConversationId(savedConversationId);
      // If we have a conversation ID, we can load messages
      loadChatMessages(savedConversationId);
      setChatInitialized(true);
    }

    // Pre-fill user info if logged in
    if (user) {
      setChatName(user.firstName || "");
      setChatEmail(user.email || "");
    }
  }, [user]);

  // Set up polling for new messages when chat is open
  useEffect(() => {
    if (chatOpen && conversationId) {
      // Poll for new messages every 10 seconds
      const interval = window.setInterval(() => {
        loadChatMessages(conversationId);
      }, 10000);
      
      setPollInterval(interval);
      
      // Mark messages as read when chat is opened
      if (hasUnreadMessages) {
        markMessagesAsRead(conversationId, false)
          .then(() => {
            setHasUnreadMessages(false);
            setMessageCountBadge(0);
          })
          .catch(console.error);
      }
    } else {
      // Clear interval when chat is closed
      if (pollInterval) {
        window.clearInterval(pollInterval);
        setPollInterval(null);
      }
    }
    
    return () => {
      if (pollInterval) {
        window.clearInterval(pollInterval);
      }
    };
  }, [chatOpen, conversationId, hasUnreadMessages]);

  // Check for new messages periodically even when chat is closed
  useEffect(() => {
    if (conversationId && !chatOpen) {
      const checkInterval = window.setInterval(() => {
        checkForNewMessages(conversationId);
      }, 30000); // Every 30 seconds
      
      return () => {
        window.clearInterval(checkInterval);
      };
    }
  }, [conversationId, chatOpen]);

  const loadChatMessages = async (convId: string) => {
    try {
      const messages = await getChatMessages(convId);
      setChatMessages(messages);
      
      // Check for unread admin messages
      const unreadMessages = messages.filter(msg => msg.is_admin_reply && !msg.is_read);
      setHasUnreadMessages(unreadMessages.length > 0);
      setMessageCountBadge(unreadMessages.length);
    } catch (error) {
      console.error("Failed to load chat messages", error);
    }
  };

  const checkForNewMessages = async (convId: string) => {
    try {
      const messages = await getChatMessages(convId);
      const unreadMessages = messages.filter(msg => msg.is_admin_reply && !msg.is_read);
      setHasUnreadMessages(unreadMessages.length > 0);
      setMessageCountBadge(unreadMessages.length);
      
      // If there are unread messages, notify the user
      if (unreadMessages.length > 0 && !chatOpen) {
        toast({
          title: "New message",
          description: "You have a new reply in your chat",
        });
      }
    } catch (error) {
      console.error("Failed to check for new messages", error);
    }
  };

  const handleChatSubmit = async () => {
    if (!chatName || !chatEmail || !chatQuestion) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // If we don't have a conversation ID yet, this will be a new conversation
      const messageData = {
        user_id: user?.email || 'anonymous',
        username: chatName,
        email: chatEmail,
        message: chatQuestion,
        conversation_id: conversationId || '' // API will generate if empty
      };
      
      const response = await sendChatMessage(messageData);
      
      // If this is a new conversation, save the conversation ID
      if (!conversationId) {
        setConversationId(response.conversation_id);
        localStorage.setItem("chatConversationId", response.conversation_id);
        setChatInitialized(true);
      }
      
      // Reload messages to show the new one
      loadChatMessages(response.conversation_id);
      
      toast({
        title: "Message sent",
        description: "We'll get back to you shortly",
      });
      
      // Clear message input but keep name and email
      setChatQuestion("");
    } catch (error) {
      console.error("Failed to send message", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChatButtonClick = () => {
    setChatOpen(true);
    // Mark messages as read when chat is opened
    if (hasUnreadMessages && conversationId) {
      markMessagesAsRead(conversationId, false)
        .then(() => {
          setHasUnreadMessages(false);
          setMessageCountBadge(0);
        })
        .catch(console.error);
    }
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
        <div className="fixed right-6 bottom-6 z-40">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={`${hasUnreadMessages ? 'animate-pulse bg-green-600' : 'bg-red-600'} text-white p-3 rounded-full shadow-lg flex items-center justify-center relative`}
                  onClick={handleChatButtonClick}
                >
                  {hasUnreadMessages ? <Bell size={24} /> : <MessageCircle size={24} />}
                  {messageCountBadge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {messageCountBadge}
                    </span>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Start a chat with us</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {/* Mobile chat button */}
      {isMobile && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            className={`${hasUnreadMessages ? 'animate-pulse bg-green-600' : 'bg-red-600'} text-white p-3 rounded-full shadow-lg flex items-center justify-center relative`}
            onClick={handleChatButtonClick}
          >
            {hasUnreadMessages ? <Bell size={24} /> : <MessageCircle size={24} />}
            {messageCountBadge > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {messageCountBadge}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Chat Dialog */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="bg-white p-0 border-none max-w-md mx-4">
          <div className="bg-red-600 p-4 text-white flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">Live Chat</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-red-700"
              onClick={() => setChatOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>

          {/* Chat messages area */}
          {chatInitialized && (
            <div className="bg-gray-50 p-4 max-h-60 overflow-y-auto">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  Start chatting with us!
                </div>
              ) : (
                <div className="space-y-3">
                  {chatMessages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`${
                        msg.is_admin_reply 
                          ? "bg-blue-100 ml-12" 
                          : "bg-gray-200 mr-12"
                      } p-3 rounded-lg relative`}
                    >
                      <div className="font-semibold text-xs">
                        {msg.is_admin_reply ? "Admin" : msg.username || "You"}
                      </div>
                      <div>{msg.message}</div>
                      <div className="text-xs text-right text-gray-500 mt-1">
                        {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Chat input form */}
          <div className="p-4 space-y-4">
            {!chatInitialized ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    value={chatName}
                    onChange={(e) => setChatName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    value={chatEmail}
                    onChange={(e) => setChatEmail(e.target.value)}
                  />
                </div>
              </>
            ) : null}
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={chatQuestion}
                onChange={(e) => setChatQuestion(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
            
            <Button 
              onClick={handleChatSubmit}
              className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Send Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
