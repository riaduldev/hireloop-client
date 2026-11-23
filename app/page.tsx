
import FeaturesSection from "@/components/home/FeaturesSection"
import { Hero } from "@/components/home/hero"
import PricingSection from "@/components/home/PricingSection"
import SmartJobDiscovery from "@/components/home/SmartJobDiscovery"

export default function Page() {
  return (
    <main>
      <Hero />
      <SmartJobDiscovery></SmartJobDiscovery>
      <FeaturesSection/>
      <PricingSection/>
      
    </main>
  )
}
