import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Stakeholders from '@/components/Stakeholders'
import HooksSection from '@/components/HooksSection'
import Narrative from '@/components/Narrative'
import Platform from '@/components/Platform'
import Scenarios from '@/components/Scenarios'
import BlackPlatform from '@/components/BlackPlatform'
import Brain from '@/components/Brain'
import Trust from '@/components/Trust'
import Proof from '@/components/Proof'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Drawers from '@/components/Drawers'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stakeholders />
        <HooksSection />
        <Narrative />
        <Platform />
        <Scenarios />
        <BlackPlatform />
        <Brain />
        <Trust />
        <Proof />
        <Contact />
      </main>
      <Footer />
      <Drawers />
      <ScrollToTop />
    </>
  )
}

