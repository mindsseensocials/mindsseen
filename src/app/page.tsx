import { FourExperiences } from "@/components/four-experiences";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { JoinUs } from "@/components/join-us";
import { Story } from "@/components/story";
import { ThePlatform } from "@/components/the-platform";
import { WhatsNext } from "@/components/whats-next";
import { WhyItMatters } from "@/components/why-it-matters";

export default function Home() {
  return (
    <Story header={<Header />}>
      <Hero />
      <WhyItMatters />
      <ThePlatform />
      <FourExperiences />
      <WhatsNext />
      <JoinUs />
    </Story>
  );
}
