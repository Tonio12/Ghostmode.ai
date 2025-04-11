import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const PricingTier = ({ name, price, description, features, highlighted = false, cta }: PricingTierProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col h-full rounded-2xl p-8 shadow-sm",
        highlighted 
          ? "bg-primary text-primary-foreground ring-1 ring-primary/10" 
          : "bg-card text-card-foreground border border-border"
      )}
    >
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold tracking-tight">{price}</span>
          {price !== "Free" && <span className="ml-1 text-sm font-medium">/month</span>}
        </div>
        <p className="mt-4 text-sm opacity-80">{description}</p>
        <ul className="mt-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="mr-2 h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <Button 
          className={cn(
            "w-full",
            highlighted ? "bg-background text-foreground hover:bg-background/90" : ""
          )}
        >
          {cta}
        </Button>
      </div>
    </div>
  );
};

export default function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "Free",
      description: "Perfect for trying out Ghostmode.ai and setting basic boundaries.",
      features: [
        "AI Message Replier (5 uses/month)",
        "Basic Boundary Templates",
        "Tone Coach (3 uses/month)",
        "Ghostmode Timer (30 min/day)",
      ],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "$9.99",
      description: "For those who need more control over their digital boundaries.",
      features: [
        "Unlimited AI Message Replier",
        "Custom Boundary Templates",
        "Unlimited Tone Coach",
        "Ghostmode Timer (3 hours/day)",
        "Priority Support",
      ],
      highlighted: true,
      cta: "Start Free Trial",
    },
    {
      name: "Team",
      price: "$19.99",
      description: "For teams and organizations that need to manage communication boundaries.",
      features: [
        "Everything in Pro",
        "Team Dashboard",
        "Admin Controls",
        "Unlimited Ghostmode Timer",
        "API Access",
        "Dedicated Support",
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <section id="pricing" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-accent">Pricing</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl lg:text-balance">
            Choose the plan that works for you
          </p>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            Simple, transparent pricing that grows with you. Try Ghostmode.ai free today and upgrade when you need more features.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <PricingTier key={tier.name} {...tier} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
} 