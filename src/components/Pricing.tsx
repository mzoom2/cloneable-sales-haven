
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingPlanProps {
  title: string;
  price: string;
  storage: string;
  features: string[];
  popular?: boolean;
  delay?: number;
}

const PricingPlan = ({ title, price, storage, features, popular = false, delay = 0 }: PricingPlanProps) => {
  const planRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100');
              entry.target.classList.remove('translate-y-10');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (planRef.current) {
      observer.observe(planRef.current);
    }
    
    return () => {
      if (planRef.current) {
        observer.unobserve(planRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={planRef}
      className={`
        relative rounded-2xl overflow-hidden transition-all duration-700 opacity-0 translate-y-10
        ${popular 
          ? 'bg-primary text-primary-foreground shadow-xl scale-105 z-10' 
          : 'bg-card text-card-foreground border shadow-sm'
        }
      `}
    >
      {popular && (
        <div className="absolute top-0 right-0">
          <div className="text-xs font-medium py-1 px-3 bg-yellow-400 text-yellow-950 uppercase transform rotate-0 origin-bottom-right">
            Most Popular
          </div>
        </div>
      )}
      
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-bold">{price}</span>
            <span className={`ml-1 text-sm ${popular ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
              /month
            </span>
          </div>
          <p className={`mt-2 text-sm ${popular ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
            {storage} storage
          </p>
        </div>
        
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check size={16} className={`mr-2 ${popular ? 'text-primary-foreground' : 'text-green-500'}`} />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`w-full ${
            popular 
              ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90' 
              : 'animated-button'
          }`}
        >
          Choose Plan
        </Button>
      </div>
    </div>
  );
};

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-full h-1/2 bg-gradient-to-r from-blue-50/40 to-purple-50/40 dark:from-blue-950/20 dark:to-purple-950/20 -z-10 transform -skew-y-6"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan that fits your needs with our flexible payment options.
          </p>
          
          <div className="mt-8 inline-flex p-1 bg-muted rounded-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-background shadow-sm' 
                  : 'text-muted-foreground'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annually')}
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                billingCycle === 'annually' 
                  ? 'bg-background shadow-sm' 
                  : 'text-muted-foreground'
              }`}
            >
              Annual Billing
              <span className="ml-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 lg:gap-8 max-w-5xl mx-auto">
          <PricingPlan
            title="Basic"
            price={billingCycle === 'monthly' ? '$39.99' : '$31.99'}
            storage="256GB"
            features={[
              "Full HD Display",
              "48MP Main Camera",
              "Basic AI Features",
              "5G Connectivity",
              "24-month Warranty"
            ]}
            delay={100}
          />
          
          <PricingPlan
            title="Premium"
            price={billingCycle === 'monthly' ? '$49.99' : '$39.99'}
            storage="512GB"
            features={[
              "Quad HD+ Display",
              "50MP Main Camera System",
              "Advanced AI Assistant",
              "Extended Battery Life",
              "Premium Support",
              "36-month Warranty"
            ]}
            popular={true}
            delay={200}
          />
          
          <PricingPlan
            title="Ultimate"
            price={billingCycle === 'monthly' ? '$59.99' : '$47.99'}
            storage="1TB"
            features={[
              "Ultra HD Display",
              "Professional Camera System",
              "Unlimited Cloud Storage",
              "Priority Software Updates",
              "24/7 Concierge Support",
              "Lifetime Warranty"
            ]}
            delay={300}
          />
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include free shipping and 30-day money-back guarantee.
          </p>
          <Button variant="outline" className="animated-button">
            Compare All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
