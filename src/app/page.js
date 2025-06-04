import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import ProblemSolution from '@/components/sections/ProblemSolution';
import Features from '@/components/sections/Features';
import Pricing from '@/components/sections/Pricing';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
