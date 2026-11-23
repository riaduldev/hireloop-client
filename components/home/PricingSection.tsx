
"use client";

import { useState } from "react";
import {
  Check,
  Crown,
  BarChart3,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const pricingPlans = [
  {
    name: "Starter",
    icon: Crown,
    priceMonthly: 0,
    priceYearly: 0,
    description: "Everything you need to start your career journey.",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    highlighted: false,
    buttonText: "Get Started",
  },
  {
    name: "Growth",
    icon: BarChart3,
    priceMonthly: 17,
    priceYearly: 12,
    description: "Powerful tools to accelerate your career growth.",
    features: [
      "Everything in Starter",
      "Advanced AI job matching",
      "Unlimited salary insights",
      "Priority job recommendations",
      "Personal career analytics",
    ],
    highlighted: true,
    buttonText: "Choose Growth",
  },
  {
    name: "Premium",
    icon: Zap,
    priceMonthly: 99,
    priceYearly: 74,
    description: "Advanced tools for ambitious professionals.",
    features: [
      "Everything in Growth",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
      "Exclusive career resources",
    ],
    highlighted: false,
    buttonText: "Go Premium",
  },
];

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<
    "monthly" | "yearly"
  >("monthly");

  return (
    <section
      id="pricing"
      className="w-full bg-[#050505] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px]">

        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">

          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-2 w-2 rounded-full bg-violet-500" />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 sm:text-sm">
              Pricing
            </p>

            <span className="h-2 w-2 rounded-full bg-violet-500" />
          </div>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Pay for the leverage,
            <br className="hidden sm:block" /> not the listings
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
            Choose the perfect plan to unlock smarter job discovery
            and accelerate your career.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-zinc-800 bg-[#111111] p-1">

            <Button
              type="button"
              variant="ghost"
              aria-pressed={billingCycle === "monthly"}
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-full px-5 text-sm transition-all duration-300 sm:px-7 ${
                billingCycle === "monthly"
                  ? "bg-white text-black hover:bg-zinc-200 hover:text-black"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              Monthly
            </Button>

            <Button
              type="button"
              variant="ghost"
              aria-pressed={billingCycle === "yearly"}
              onClick={() => setBillingCycle("yearly")}
              className={`flex items-center gap-2 rounded-full px-5 text-sm transition-all duration-300 sm:px-7 ${
                billingCycle === "yearly"
                  ? "bg-white text-black hover:bg-zinc-200 hover:text-black"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              Yearly

              <Badge className="border-0 bg-violet-600 px-2 py-0.5 text-[10px] text-white">
                -25%
              </Badge>
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">

          {pricingPlans.map((plan) => {
            const Icon = plan.icon;

            const price =
              billingCycle === "monthly"
                ? plan.priceMonthly
                : plan.priceYearly;

            return (
              <Card
                key={plan.name}
                className={`group relative flex h-full flex-col overflow-visible rounded-2xl border p-0 text-white transition-all duration-300 hover:-translate-y-2 ${
                  plan.highlighted
                    ? "border-violet-500/60 bg-[#15121d] shadow-xl shadow-violet-950/20"
                    : "border-zinc-800 bg-[#101010] hover:border-zinc-600"
                }`}
              >
                {/* Popular Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                    <Badge className="flex items-center gap-1 rounded-full border-0 bg-violet-600 px-4 py-1.5 text-xs text-white shadow-lg">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Card Header */}
                <CardHeader className="p-6 pb-2 sm:p-7">

                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                        plan.highlighted
                          ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                          : "border-zinc-800 bg-zinc-900 text-zinc-300"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">
                        {plan.name}
                      </h3>

                      <p className="text-xs text-zinc-500">
                        {plan.highlighted
                          ? "Best value plan"
                          : "Flexible plan"}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-7">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tight sm:text-5xl">
                        ${price}
                      </span>

                      <span className="text-sm text-zinc-500">
                        /month
                      </span>
                    </div>

                    {billingCycle === "yearly" && price > 0 && (
                      <p className="mt-2 text-xs text-zinc-500">
                        Billed annually (${price * 12}/year)
                      </p>
                    )}

                    {price === 0 && (
                      <p className="mt-2 text-xs text-zinc-500">
                        Free forever
                      </p>
                    )}
                  </div>

                  <p className="mt-5 text-sm leading-6 text-zinc-400">
                    {plan.description}
                  </p>
                </CardHeader>

                {/* Features */}
                <CardContent className="flex-grow px-6 py-6 sm:px-7">

                  <div className="mb-5 h-px w-full bg-zinc-800" />

                  <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    What&apos;s included
                  </p>

                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-zinc-300"
                      >
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            plan.highlighted
                              ? "text-violet-400"
                              : "text-zinc-500"
                          }`}
                        />

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                {/* Card Footer */}
                <CardFooter className="p-6 pt-0 sm:p-7 sm:pt-0">
                  <Button
                    type="button"
                    className={`group/btn h-12 w-full rounded-xl text-sm font-semibold transition-all duration-300 ${
                      plan.highlighted
                        ? "bg-violet-600 text-white hover:bg-violet-500"
                        : "border border-zinc-800 bg-[#202020] text-white hover:border-zinc-600 hover:bg-zinc-800"
                    }`}
                  >
                    {plan.buttonText}

                    <ArrowRight className="ml-auto h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
