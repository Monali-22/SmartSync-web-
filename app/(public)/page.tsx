import React from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import {
  LandingHero,
  LandingFeatures,
  LandingCTA,
} from "@/components/landing/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingCTA />
      </main>
      <Footer />
    </div>
  );
}
