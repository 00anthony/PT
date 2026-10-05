import type { ComponentType } from "react";
import { PhoneCall, Search, Hammer, CheckCircle2 } from "lucide-react";

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
};

// TODO(client): confirm what's included at each step (e.g. photos with the
// inspection, written estimates) before adding specifics here.
export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Call or Request an Estimate",
    description:
      "Call, text, or send the form. We get back to every request within 24 hours to set up a time.",
    icon: PhoneCall,
  },
  {
    step: "02",
    title: "Free Inspection",
    description:
      "We come out, look at the roof or the project, and give you an honest recommendation and a price.",
    icon: Search,
  },
  {
    step: "03",
    title: "The Work",
    description:
      "Our crew does the job with clear communication from the owner throughout, and cleans up every day.",
    icon: Hammer,
  },
  {
    step: "04",
    title: "Final Walkthrough",
    description:
      "We walk the finished project with you, sweep for nails, and make sure you're happy before we call it done.",
    icon: CheckCircle2,
  },
];

export const whyChooseUs = [
  {
    title: "Family Owned",
    description:
      "A family-owned business that treats every home as if it were our own — and stays reachable after the job is done.",
  },
  {
    title: "Owner Communication",
    description:
      "Customers consistently call out the clear communication and follow-up from the owner, from the first call to the final walkthrough.",
  },
  {
    title: "Clean Job Sites",
    description:
      "Daily cleanup on every project, and magnetic nail sweeps on every roofing job — important when you have kids or pets.",
  },
  {
    title: "Roofing to Remodeling",
    description:
      "Roof, siding, paint, windows, and interiors under one roof, so bigger projects are coordinated by one crew instead of three.",
  },
];
