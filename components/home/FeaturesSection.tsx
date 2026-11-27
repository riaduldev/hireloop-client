import {
  Search,
  ChartNoAxesCombined,
  Building2,
  Bookmark,
  MousePointerClick,
  FileText,
  Hexagon,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Find your ideal job with advanced filters.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Salary Insights",
    description:
      "Get real salary data to negotiate confidently.",
  },
  {
    icon: Building2,
    title: "Top Companies",
    description:
      "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description:
      "Manage apps & favorites on your dashboard.",
  },
  {
    icon: MousePointerClick,
    title: "One-Click Apply",
    description:
      "Simplify your job applications for an easier process!",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description:
      "Create professional resumes with modern templates.",
  },
  {
    icon: Hexagon,
    title: "Skill-Based Matching",
    description:
      "Discover jobs that match your skills and experience.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth Resources",
    description:
      "Boost your career with quick interview tips.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-[#151515] px-4 py-20 text-white sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto w-full">
        {/* Section heading */}
        <div className="mx-auto mb-16 max-w-xl text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-2 w-2 bg-violet-500" />

            <p className="text-sm font-medium uppercase tracking-[0.15em] text-zinc-300 sm:text-base">
              Features
            </p>

            <span className="h-2 w-2 bg-violet-500" />
          </div>

          <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Everything you need
            <br />
            to succeed
          </h2>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-12">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group flex flex-row items-start gap-5 border-0 bg-transparent p-0 text-white shadow-none"
              >
                {/* Icon box */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-gradient-to-br from-black to-zinc-900 transition-all duration-300 group-hover:border-violet-500/50 group-hover:bg-zinc-900">
                  <Icon
                    className="h-7 w-7 text-fuchsia-300 transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Feature content */}
                <CardContent className="min-w-0 p-0">
                  <h3 className="mb-2 text-lg font-medium tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-7 text-zinc-400 sm:text-[15px]">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}