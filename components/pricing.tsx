"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, BarChart3, Zap, ArrowRight } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    icon: Crown,
    priceMonthly: 0,
    priceYearly: 0,
    description: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    highlighted: false,
    buttonText: "Choose This Plan",
  },
  {
    name: "Growth",
    icon: BarChart3,
    priceMonthly: 17,
    priceYearly: 12,
    description: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    highlighted: true,
    buttonText: "Choose This Plan",
  },
  {
    name: "Premium",
    icon: Zap,
    priceMonthly: 99,
    priceYearly: 74,
    description: "Start building your insights hub:",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    highlighted: false,
    buttonText: "Choose This Plan",
  },
];

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="min-h-screen bg-[#050505] text-white py-20 px-4 flex flex-col items-center justify-center font-sans">
      {/* Header Area */}
      <div className="text-center mb-12 flex flex-col items-center">
        {/* Top Label */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-zinc-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgb(30,64,175)]"></span>
          PRICING
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgb(30,64,175)]"></span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">
          Pay for the leverage,
          not the listings
        </h1>

        {/* Billing Toggle */}
        <div className="inline-flex items-center bg-[#121212] border border-zinc-800 rounded-full p-1">
          <Button
            variant="ghost"
            onClick={() => setBillingCycle("monthly")}
            className={`
              rounded-full px-6 transition-all
              ${billingCycle === "monthly"
                ? "bg-white text-black hover:bg-zinc-200 hover:text-black"
                : "text-zinc-400 hover:text-zinc-300"}
            `}
          >
            Monthly
          </Button>
          <Button
            variant="ghost"
            onClick={() => setBillingCycle("yearly")}
            className={`
              rounded-full px-6 flex items-center gap-2 transition-all
              ${billingCycle === "yearly"
                ? "bg-white text-black hover:bg-zinc-200 hover:text-black"
                : "text-zinc-400 hover:text-zinc-300"}
            `}
          >
            Yearly
            <Badge
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-none text-[10px] px-2 py-0.5 rounded-full"
            >
              Save 25%
            </Badge>
          </Button>
        </div>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {pricingPlans.map((plan) => {
          const Icon = plan.icon;
          const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly;

          return (
            <Card
              key={plan.name}
              className={`
                bg-zinc-950 border-zinc-800 rounded-2xl flex flex-col justify-between
                transition-transform duration-300 hover:-translate-y-1
                ${plan.highlighted
                  ? "bg-zinc-900 border-zinc-700 shadow-xl shadow-zinc-500/50"
                  : ""}
              `}
            >
              <CardHeader className="p-6 pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 text-zinc-300 font-medium">
                    <Icon className="w-5 h-5" />
                    {plan.name}
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-semibold tracking-tighter">
                      {price}
                    </span>
                    <span className="text-xs text-zinc-500 font-normal ml-1">
                      /month
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-4 flex-grow">
                <p className="text-sm text-zinc-400 mb-6">{plan.description}</p>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button
                  className={`
                    w-full justify-between py-6 rounded-lg text-sm font-medium transition-colors
                    ${plan.highlighted
                      ? "bg-white text-black hover:bg-zinc-200"
                      : "bg-zinc-950 text-white hover:bg-zinc-800 border border-zinc-800"}
                  `}
                >
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}