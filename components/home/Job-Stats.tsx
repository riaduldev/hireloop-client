
import {
  BriefcaseBusiness,
  Users,
  Building2,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    icon: BriefcaseBusiness,
    number: "50K",
    title: "Active Jobs",
  },
  {
    icon: Users,
    number: "15K+",
    title: "Job Seekers",
  },
  {
    icon: Building2,
    number: "2K+",
    title: "Top Companies",
  },
  {
    icon: TrendingUp,
    number: "95%",
    title: "Success Rate",
  },
];

export default function JobStats() {
  return (
    <section className="w-full px-0 py-6 text-white sm:px-8 sm:py-8">
      <div className="mx-auto w-full max-w-[1320px]">

        {/* Section title */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <h2 className="text-2xl font-medium leading-snug tracking-tight sm:text-3xl lg:text-4xl">
            Assisting over{" "}
            <span className="text-violet-400">15,000</span>{" "}
            job seekers find their dream positions.
          </h2>
        </div>

        {/* Statistics cards */}
        <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="flex items-center justify-center gap-4 rounded-2xl border border-white/10 bg-[#101014] p-5 text-left transition-all duration-300 hover:border-violet-400/30 hover:bg-[#181818] sm:gap-5 sm:p-6"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#222222] sm:h-14 sm:w-14">
                  <Icon
                    className="h-6 w-6 text-fuchsia-300 sm:h-7 sm:w-7"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Statistic */}
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {stat.number}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    {stat.title}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
