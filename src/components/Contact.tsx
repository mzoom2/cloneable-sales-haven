
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sendTelegramNotification } from "@/services/TelegramService";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send notification to telegram
      await sendTelegramNotification(
        name,
        email,
        `${subject}: ${message}`,
        `contact_${Date.now()}`
      );
      
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('translate-y-10');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="py-24 bg-gray-50/50 dark:bg-gray-900/20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100/50 dark:to-gray-900/30 -z-10"></div>
      
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 transition-all duration-700 opacity-0 translate-y-10"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about the UEEPhones? Our team is here to help you make the right choice.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          {/* Contact form */}
          <div className="w-full lg:w-2/3 glass-card rounded-2xl p-6 md:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/50 dark:bg-black/10 border-gray-200 dark:border-gray-800"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/50 dark:bg-black/10 border-gray-200 dark:border-gray-800"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-white/50 dark:bg-black/10 border-gray-200 dark:border-gray-800"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Your message here..."
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-white/50 dark:bg-black/10 border-gray-200 dark:border-gray-800 resize-none"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full animated-button"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
          
          {/* Contact info */}
          <div className="w-full lg:w-1/3 space-y-8">
            <div className="glass-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/5 rounded-full mr-4 mt-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Phone</h4>
                    <p className="text-sm text-muted-foreground">+85246297806</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/5 rounded-full mr-4 mt-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Email</h4>
                    <p className="text-sm text-muted-foreground">support@ueephones.com</p>
                    <p className="text-sm text-muted-foreground">sales@ueephones.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/5 rounded-full mr-4 mt-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Address</h4>
                    <p className="text-sm text-muted-foreground">UEEPhones Headquarters</p>
                    <p className="text-sm text-muted-foreground">123 Tech Plaza, Suite 400</p>
                    <p className="text-sm text-muted-foreground">San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Monday - Friday</span>
                  <span className="text-sm font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Saturday</span>
                  <span className="text-sm font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Sunday</span>
                  <span className="text-sm font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
