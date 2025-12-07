'use client';

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';


// Image paths utility
const imagePaths = {

   logo: {
    withText: '/images/logo/logo-with-text.webp',
    withoutText: '/images/logo/logo-without-text.webp',
  },
  hero: {
    background: '/images/hero/hero-background.webp',
    cardImage: '/images/hero/hero-card-image.webp'
  },
  about: {
    excellence: '/images/about/architectural-excellence.webp',
    expertise: '/images/about/professional-expertise.webp',
    integrity: '/images/about/integrity-values.webp'
  },
  clients: {
    client1: '/images/clients/client-1.webp',
    client2: '/images/clients/client-2.webp',
    client3: '/images/clients/client-3.webp',
    client4: '/images/clients/client-4.webp',
    client5: '/images/clients/client-5.webp',
    client6: '/images/clients/client-6.webp',
    client7: '/images/clients/client-7.webp',
    client8: '/images/clients/client-8.webp'
  },
  projects: {
    residential: '/images/projects/residential-villa-1.webp',
    commercial: '/images/projects/commercial-complex-1.webp',
    heritage: '/images/projects/heritage-residence-1.webp',
    eco: '/images/projects/eco-development-1.webp',
    luxury: '/images/projects/hillside-villa-1.webp',
    office: '/images/projects/office-complex-1.webp'
  },
  team: {
    lead: '/images/team/lead-architect.webp',
    senior: '/images/team/senior-architect.webp'
  }
};

// Client companies data with actual image paths
const companies = [
  { id: 1, name: "Botswana Construction Ltd", image: imagePaths.clients.client1 },
  { id: 2, name: "Gaborone Properties", image: imagePaths.clients.client2 },
  { id: 3, name: "Heritage Builders", image: imagePaths.clients.client3 },
  { id: 4, name: "Sustainable Developments", image: imagePaths.clients.client4 },
  { id: 5, name: "Urban Design Group", image: imagePaths.clients.client5 },
  { id: 6, name: "Modern Living Co.", image: imagePaths.clients.client6 },
  { id: 7, name: "Traditional Craftsmen", image: imagePaths.clients.client7 },
  { id: 8, name: "Innovation Builders", image: imagePaths.clients.client8 }
];

// Success stories with image paths
const successStories = [
  {
    id: 1,
    title: "Gaborone Family Residence",
    description: "A contemporary family home blending modern aesthetics with traditional Botswana design elements, featuring sustainable materials.",
    type: "Modern Residential Villa",
    link: "/projects/residential-villa",
    image: imagePaths.projects.residential
  },
  {
    id: 2,
    title: "Francistown Business Center",
    description: "Mixed-use development combining retail spaces with office facilities, designed to promote community interaction.",
    type: "Commercial Complex",
    link: "/projects/commercial-complex",
    image: imagePaths.projects.commercial
  },
  {
    id: 3,
    title: "Maun Cultural Retreat",
    description: "A respectful integration of traditional architectural forms with modern comfort, celebrating cultural heritage.",
    type: "Heritage Residence",
    link: "/projects/heritage-residence",
    image: imagePaths.projects.heritage
  },
  {
    id: 4,
    title: "Sustainable Community Project",
    description: "Environmentally conscious design featuring passive cooling and community-focused spatial planning.",
    type: "Eco Development",
    link: "/projects/eco-development",
    image: imagePaths.projects.eco
  },
  {
    id: 5,
    title: "Luxury Hillside Villa",
    description: "Modern architectural masterpiece with panoramic views, featuring innovative sustainable design solutions.",
    type: "Luxury Residential",
    link: "/projects/hillside-villa",
    image: imagePaths.projects.luxury
  },
  {
    id: 6,
    title: "Urban Office Complex",
    description: "Contemporary office space designed for collaboration and productivity with energy-efficient systems.",
    type: "Commercial Office",
    link: "/projects/office-complex",
    image: imagePaths.projects.office
  }
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showTypewriter, setShowTypewriter] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const [activeProcess, setActiveProcess] = useState(1)
  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State for tracking image loading errors
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (imageKey: string) => {
    setImageErrors(prev => ({ ...prev, [imageKey]: true }))
  }

  const fullText = "We work with Batswana who want to build their legacy but don't have the time, expertise, or confidence to do it alone."

  // Duplicate companies for seamless infinite scroll
  const duplicatedCompanies = [...companies, ...companies]

  // Duplicate projects for seamless infinite scroll
  const duplicatedProjects = [...successStories, ...successStories]

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollDirection = scrollY > lastScrollY ? 'down' : 'up'
      lastScrollY = scrollY

      // Trigger hero animation
      setIsScrolled(scrollY > 50)

      // Handle typewriter effect based on scroll direction
      if (aboutSectionRef.current) {
        const rect = aboutSectionRef.current.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight * 0.8
        
        if (scrollDirection === 'down' && isInView && !showTypewriter && !isDeleting) {
          // Scrolling down into view - start typing
          setShowTypewriter(true)
          setIsDeleting(false)
        } else if (scrollDirection === 'up' && (!isInView || scrollY < 100) && showTypewriter && !isDeleting) {
          // Scrolling up out of view - start deleting
          setIsDeleting(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial check
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showTypewriter, isDeleting])

  // Typewriter effect - both typing and deleting
  useEffect(() => {
    if (!showTypewriter && !isDeleting) return

    let currentIndex = isDeleting ? displayText.length : 0
    const typingSpeed = isDeleting ? 20 : 30 // Faster when deleting
    const pauseBeforeDelete = 1000 // Pause before starting to delete

    const typeWriter = () => {
      if (isDeleting) {
        // Deleting mode
        if (currentIndex >= 0) {
          setDisplayText(fullText.slice(0, currentIndex))
          currentIndex--
          setTimeout(typeWriter, typingSpeed)
        } else {
          // Finished deleting
          setIsDeleting(false)
          setShowTypewriter(false)
        }
      } else {
        // Typing mode
        if (currentIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex))
          currentIndex++
          setTimeout(typeWriter, typingSpeed)
        }
      }
    }

    // Add a pause before starting to delete
    if (isDeleting) {
      setTimeout(typeWriter, pauseBeforeDelete)
    } else {
      typeWriter()
    }
  }, [showTypewriter, isDeleting, fullText])

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200">
      <Header />
      
      {/* Hero Section - Entire section transitions */}
      <section 
        ref={heroSectionRef}
        className={`scroll-transition pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 relative ${
          isScrolled 
            ? 'opacity-0 translate-y-6 scale-98'
            : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          {imageErrors['hero-background'] ? (
            <div className="w-full h-full bg-linear-to-br from-slate-100 to-slate-200"></div>
          ) : (
            <Image 
              src={imagePaths.hero.background}
              alt="Architectural background"
              fill
              className="object-cover"
              placeholder="blur"
              priority={true}
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
              onError={() => handleImageError('hero-background')}
            />
          )}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            
            {/* Left Column - Main Text */}
            <div className="space-y-6 md:space-y-8">
             {/* Logo */}
<div className="mb-4">
  <div className="relative w-48 h-16 md:w-56 md:h-20">
    <Image 
      src={imagePaths.logo.withText}
      alt="TJAO Architects"
      fill
      className="object-contain"
      sizes="(max-width: 768px) 192px, 224px"
      priority
    />
  </div>
</div>
              
              {/* Hero Text */}
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                  Your trusted partner in architectural design.
                </h1>
                <p className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed">
                  We transform visions into timeless spaces, creating environments that inspire and endure for generations.
                </p>
              </div>
              
              {/* CTA Link */}
              <div className="pt-2 md:pt-4">
                <a href="#" className="text-base sm:text-lg font-medium text-white uppercase tracking-wider hover:text-white/80 border-b-2 border-white pb-1 transition-colors">
                  Start Your Project
                </a>
              </div>
            </div>

            {/* Right Column - Smaller Styled Card with CTA */}
            <div className="flex justify-center lg:justify-end">
              <Card className="w-full max-w-xs sm:max-w-sm bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <CardContent className="p-3 sm:p-4">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="aspect-4/3 bg-slate-200 rounded-md overflow-hidden">
                      {imageErrors['hero-card'] ? (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                          <span className="text-slate-500 text-sm">Project Image</span>
                        </div>
                      ) : (
                        <Image 
                          src={imagePaths.hero.cardImage}
                          alt="Architectural project showcase"
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                          onError={() => handleImageError('hero-card')}
                        />
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm sm:text-base font-medium text-white">
                        We're architectural experts with decades of experience.
                      </h3>
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                        Delivering innovative designs and exceptional results.
                      </p>
                      <div className="pt-1">
                        <a 
                          href="#" 
                          className="inline-block text-xs sm:text-sm font-medium text-white uppercase tracking-wider hover:text-white/80 border-b border-white pb-1 transition-colors"
                        >
                          Our Services
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* About TJAO Architects Section */}
      <section ref={aboutSectionRef} className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl">
            <div className="mb-12 sm:mb-16 text-left">
              <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4 sm:mb-6">
                ABOUT TJAO ARCHITECTS
              </h2>
              <div className="w-16 sm:w-20 h-0.5 bg-slate-900"></div>
            </div>
            
            <div className="max-w-3xl">
              <div className="space-y-6 sm:space-y-8">
                {/* Typewriter text with larger font and bold styling */}
                <p className="text-xl sm:text-2xl md:text-2xl text-slate-700 leading-relaxed min-h-[120px] sm:min-h-[100px]">
                  <span className="font-semibold text-slate-900">
                    {displayText}
                    {(showTypewriter && !isDeleting && displayText.length < fullText.length) && (
                      <span className="ml-1 animate-pulse">|</span>
                    )}
                    {(isDeleting && displayText.length > 0) && (
                      <span className="ml-1 animate-pulse">|</span>
                    )}
                  </span>
                </p>
                <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
                  With end-to-end guidance, we simplify the architectural process and stay focused on creating spaces that honor Botswana's rich heritage while embracing modern innovation. By uniting traditional design principles with contemporary expertise, we help you cut through the complexity, avoid costly mistakes, and build with clarity.
                </p>
                <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
                  Our approach respects the unique landscape and culture of Botswana, creating structures that stand the test of time while serving the needs of future generations.
                </p>
              </div>
            </div>
          </div>

          {/* Three Cards Section - Larger Images Without Card Containers - Fully Responsive */}
          <div 
            ref={cardsRef}
            className={`mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 transition-all duration-700 ease-out ${
              cardsInView 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Card 1: 4 Years of Trusted Guidance */}
            <div className="bg-white group cursor-pointer">
              <div className="aspect-4/3 bg-slate-100 rounded-lg overflow-hidden mb-4 sm:mb-6">
                {imageErrors['about-excellence'] ? (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <span className="text-slate-500 text-sm">Architectural Excellence Image</span>
                  </div>
                ) : (
                  <Image 
                    src={imagePaths.about.excellence}
                    alt="Architectural excellence and trusted guidance"
                    width={600}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                    onError={() => handleImageError('about-excellence')}
                  />
                )}
              </div>
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900">
                  4 YEARS OF TRUSTED GUIDANCE
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Markets change and trends evolve. What remains constant is our commitment to helping Batswana build legacies with architectural strategies that honor tradition while embracing innovation.
                </p>
              </div>
            </div>

            {/* Card 2: Expertise You Can Count On */}
            <div className="bg-white group cursor-pointer">
              <div className="aspect-4/3 bg-slate-100 rounded-lg overflow-hidden mb-4 sm:mb-6">
                {imageErrors['about-expertise'] ? (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <span className="text-slate-500 text-sm">Professional Expertise Image</span>
                  </div>
                ) : (
                  <Image 
                    src={imagePaths.about.expertise}
                    alt="Professional architectural expertise"
                    width={600}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                    onError={() => handleImageError('about-expertise')}
                  />
                )}
              </div>
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900">
                  EXPERTISE YOU CAN COUNT ON
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Whether it's design innovation, project management, or regulatory guidance, our team brings every piece together so you can build with confidence and clarity.
                </p>
              </div>
            </div>

            {/* Card 3: Integrity at the Core */}
            <div className="bg-white group cursor-pointer">
              <div className="aspect-4/3 bg-slate-100 rounded-lg overflow-hidden mb-4 sm:mb-6">
                {imageErrors['about-integrity'] ? (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <span className="text-slate-500 text-sm">Integrity & Values Image</span>
                  </div>
                ) : (
                  <Image 
                    src={imagePaths.about.integrity}
                    alt="Integrity and values in architecture"
                    width={600}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pV2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                    onError={() => handleImageError('about-integrity')}
                  />
                )}
              </div>
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900">
                  INTEGRITY AT THE CORE
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                  We value honesty, transparency, and mutual respect. We build trusted relationships that support you through every phase of your architectural journey.
                </p>
                <p className="text-slate-700 italic border-l-4 border-slate-300 pl-3 sm:pl-4 py-1 sm:py-2 text-sm sm:text-base">
                  "It's more than just buildings—it's about creating meaningful spaces that enrich lives."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Clients Across Botswana Section */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              Trusted by Clients Across Botswana
            </h2>
            <div className="w-24 h-0.5 bg-slate-900 mx-auto"></div>
          </div>

          {/* Infinite Horizontal Scroll Container */}
          <div className="relative">
            <div className="overflow-hidden">
              <div className="animate-infinite-scroll flex space-x-8 sm:space-x-12 md:space-x-16 lg:space-x-20">
                {duplicatedCompanies.map((company, index) => (
                  <div
                    key={`${company.id}-${index}`}
                    className="shrink-0 flex items-center justify-center"
                  >
                    {/* Client logo with image */}
                    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 w-40 h-24 sm:w-48 sm:h-28 md:w-56 md:h-32 lg:w-64 lg:h-36 flex items-center justify-center border border-slate-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                      <Image 
                        src={company.image}
                        alt={company.name}
                        width={200}
                        height={100}
                        className="w-full h-full object-contain p-2"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Larger gradient overlays for bigger logos */}
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 md:w-40 bg-linear-to-r from-slate-50 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 md:w-40 bg-linear-to-l from-slate-50 to-transparent z-10"></div>
          </div>

          {/* Optional: Stats below the scrolling logos */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">50+</div>
              <div className="text-sm sm:text-base text-slate-600 mt-2">Projects Completed</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">4</div>
              <div className="text-sm sm:text-base text-slate-600 mt-2">Years Experience</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">100%</div>
              <div className="text-sm sm:text-base text-slate-600 mt-2">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Processes Section */}
      <section className="py-12 sm:py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header and CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center mb-12 sm:mb-16">
            {/* Left Side - Heading and Description */}
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black uppercase tracking-tight">
                OUR PROCESSES
              </h2>
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl">
                A comprehensive approach to transforming your vision into architectural reality.
              </p>
            </div>

            {/* Right Side - CTA Button */}
            <div className="flex justify-start lg:justify-end">
              <a 
                href="/contact" 
                className="bg-black text-white px-6 py-3 sm:px-8 sm:py-4 font-semibold uppercase tracking-wider hover:bg-slate-800 transition-colors duration-300 text-sm sm:text-base inline-block text-center rounded-md"
              >
                Start Your Journey
              </a>
            </div>
          </div>

          {/* Manual Process Slider - Using #474545 grey with white text */}
          <div className="bg-[#474545] rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border border-slate-600">
            {/* Process Cards Slider */}
            <div className="relative h-96 sm:h-96 md:h-[450px] mb-6 sm:mb-8">
              {/* Process 1: Consultation & Briefing */}
              <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                activeProcess === 1 
                  ? 'opacity-100 translate-x-0 scale-100 z-10' 
                  : 'opacity-0 translate-x-full scale-95 z-0'
              }`}>
                <div className="bg-[#474545] rounded-2xl shadow-2xl h-full p-4 sm:p-6 md:p-8 lg:p-10 text-white border border-slate-600 overflow-y-auto">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white text-[#474545] rounded-full flex items-center justify-center font-bold text-base sm:text-lg md:text-xl">
                          1
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Consultation & Briefing</h3>
                      </div>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-4 sm:mb-6">
                        We begin by deeply understanding your vision, requirements, and site context to establish a comprehensive design brief.
                      </p>
                      <ul className="space-y-2 sm:space-y-3 text-white/80">
                        <li className="flex items-center gap-2 sm:gap-3">
                          <span className="w-2 h-2 bg-white rounded-full shrink-0"></span>
                          <span className="text-sm sm:text-base">Site analysis and context assessment</span>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <span className="w-2 h-2 bg-white rounded-full shrink-0"></span>
                          <span className="text-sm sm:text-base">Client needs and vision discovery</span>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <span className="w-2 h-2 bg-white rounded-full shrink-0"></span>
                          <span className="text-sm sm:text-base">Budget and timeline establishment</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-4 sm:pt-6 border-t border-slate-600 mt-4">
                      <p className="text-white/70 text-xs sm:text-sm md:text-base">
                        Foundation phase where we align on your architectural aspirations
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Process 2: Conceptual Design */}
              <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                activeProcess === 2 
                  ? 'opacity-100 translate-x-0 scale-100 z-10' 
                  : 'opacity-0 translate-x-full scale-95 z-0'
              }`}>
                <div className="bg-[#474545] rounded-2xl shadow-2xl h-full p-4 sm:p-6 md:p-8 lg:p-10 text-white border border-slate-600 overflow-y-auto">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white text-[#474545] rounded-full flex items-center justify-center font-bold text-base sm:text-lg md:text-xl">
                          2
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Conceptual Design</h3>
                      </div>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-4 sm:mb-6">
                        Transforming your vision into initial architectural concepts with spatial layouts and design principles.
                      </p>
                      <ul className="space-y-2 sm:space-y-3 text-white/80">
                        <li className="flex items-center gap-2 sm:gap-3">
                          <span className="w-2 h-2 bg-white rounded-full shrink-0"></span>
                          <span className="text-sm sm:text-base">Initial sketches and spatial planning</span>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <span className="w-2 h-2 bg-white rounded-full shrink-0"></span>
                          <span className="text-sm sm:text-base">Material and form exploration</span>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <span className="w-2 h-2 bg-white rounded-full shrink-0"></span>
                          <span className="text-sm sm:text-base">Client feedback and concept refinement</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-4 sm:pt-6 border-t border-slate-600 mt-4">
                      <p className="text-white/70 text-xs sm:text-sm md:text-base">
                        Creative phase where your vision takes shape through architectural exploration
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Process 3: Design Development */}
              <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                activeProcess === 3 
                  ? 'opacity-100 translate-x-0 scale-100 z-10' 
                  : 'opacity-0 translate-x-full scale-95 z-0'
              }`}>
                <div className="bg-[#474545] rounded-2xl shadow-2xl h-full p-4 sm:p-6 md:p-8 lg:p-10 text-white border border-slate-600 overflow-y-auto">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white text-[#474545] rounded-full flex items-center justify-center font-bold text-base sm:text-lg md:text-xl">
                          3
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Design Development</h3>
                      </div>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-4 sm:mb-6">
                        Detailed technical development of the approved concept into comprehensive architectural documentation.
                      </p>
                      <ul className="space-y-2 sm:space-y-3 text-white/80">
                        <li className="flex items-center gap-2 sm:gap-3">
                          <span className="w-2 h-2 bg-white rounded-full shrink-0"></span>
                          <span className="text-sm sm:text-base">Detailed technical drawings</span>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <span className="w-2 h-2 bg-white rounded-full shrink-0"></span>
                          <span className="text-sm sm:text-base">Material specifications and selections</span>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <span className="w-2 h-2 bg-white rounded-full shrink-0"></span>
                          <span className="text-sm sm:text-base">Regulatory compliance and approvals</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-4 sm:pt-6 border-t border-slate-600 mt-4">
                      <p className="text-white/70 text-xs sm:text-sm md:text-base">
                        Technical phase transforming concepts into buildable architectural solutions
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Process 4: Implementation & Support */}
              <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                activeProcess === 4 
                  ? 'opacity-100 translate-x-0 scale-100 z-10' 
                  : 'opacity-0 translate-x-full scale-95 z-0'
              }`}>
                <div className="bg-[#474545] rounded-2xl shadow-2xl h-full p-4 sm:p-6 md:p-8 lg:p-10 text-white border border-slate-600 overflow-y-auto">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white text-[#474545] rounded-full flex items-center justify-center font-bold text-base sm:text-lg md:text-xl">
                          4
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Implementation & Support</h3>
                      </div>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-4 sm:mb-6">
                        Guiding your project through construction with ongoing support and quality assurance.
                      </p>
                      <ul className="space-y-2 sm:space-y-3 text-white/80">
                        <li className="flex items-center gap-2 sm:gap-3">
                          <span className="w-2 h-2 bg-white rounded-full shrink-0"></span>
                          <span className="text-sm sm:text-base">Construction documentation and tendering</span>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <span className="w-2 h-2 bg-white rounded-full shrink-0"></span>
                          <span className="text-sm sm:text-base">Site supervision and quality control</span>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <span className="w-2 h-2 bg-white rounded-full shrink-0"></span>
                          <span className="text-sm sm:text-base">Project handover and post-completion support</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-4 sm:pt-6 border-t border-slate-600 mt-4">
                      <p className="text-white/70 text-xs sm:text-sm md:text-base">
                        Execution phase ensuring your vision becomes reality with architectural excellence
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls - Black Buttons and Dots */}
            <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6">
              <button
                onClick={() => setActiveProcess(prev => prev === 1 ? 4 : prev - 1)}
                className="bg-black text-white p-2 sm:p-3 md:p-4 rounded-full hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex gap-2 sm:gap-3 md:gap-4 mx-3 sm:mx-4 md:mx-6">
                {[1, 2, 3, 4].map((dot) => (
                  <button
                    key={dot}
                    onClick={() => setActiveProcess(dot)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                      activeProcess === dot ? 'bg-white scale-110 shadow-md' : 'bg-slate-500 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveProcess(prev => prev === 4 ? 1 : prev + 1)}
                className="bg-black text-white p-2 sm:p-3 md:p-4 rounded-full hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section with Horizontal Scroll */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            
            {/* Left Column - Header and Text */}
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4">
                  SUCCESS STORIES
                </h2>
                <div className="w-16 sm:w-20 h-0.5 bg-slate-900"></div>
              </div>
              
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
                Discover the homes and commercial spaces we've brought to life—each project 
                representing our clients' vision transformed into enduring architectural legacy.
              </p>
              
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
                From residential sanctuaries to strategic business investments, every space 
                tells a unique story of collaboration, innovation, and architectural excellence.
              </p>
            </div>

            {/* Right Column - Horizontal Scroll Container */}
            <div className="w-full">
              <div className="relative">
                <div className="overflow-hidden">
                  <div className="animate-infinite-scroll flex space-x-6 sm:space-x-8">
                    {duplicatedProjects.map((project, index) => (
                      <div
                        key={`${project.id}-${index}`}
                        className="shrink-0 flex items-center justify-center"
                      >
                        <a href={project.link} className="block group">
                          <Card className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full w-72 sm:w-80">
                            <CardContent className="p-0 h-full flex flex-col">
                              <div className="aspect-5/4 bg-slate-100 rounded-t-lg overflow-hidden">
                                <Image 
                                  src={project.image}
                                  alt={project.title}
                                  width={400}
                                  height={320}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  placeholder="blur"
                                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                                />
                              </div>
                              <div className="p-4 sm:p-5 flex-1">
                                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                                  {project.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                  {project.description}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gradient overlays for scroll indication */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-linear-to-r from-white to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-linear-to-l from-white to-transparent z-10"></div>
              </div>

              {/* Scroll instruction */}
              <div className="text-center mt-6">
                <p className="text-slate-500 text-sm">← Scroll horizontally to view more projects →</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Header - Centered */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4">
              MEET THE TEAM
            </h2>
            <div className="w-16 sm:w-20 h-0.5 bg-slate-900 mx-auto"></div>
          </div>

          {/* Team Description */}
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-6">
              For over 4 years, TJAO has guided Batswana through the complexities of architectural design and construction. 
              Now leading a growing collective, our team is here to provide innovative design solutions, practical architectural 
              strategies, and long-term support you can trust.
            </p>
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
              Our leadership brings together decades of combined experience in creating spaces that honor Botswana's heritage 
              while embracing contemporary design excellence.
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
            
            {/* Team Member 1 */}
            <div className="text-center">
              {/* Image */}
              <div className="aspect-square max-w-xs mx-auto mb-6 bg-slate-200 rounded-lg overflow-hidden">
                {imageErrors['team-lead'] ? (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <span className="text-slate-500 text-sm">Team Member Image</span>
                  </div>
                ) : (
                  <Image 
                    src={imagePaths.team.lead}
                    alt="Lead Architect & Founder"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgDRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                    onError={() => handleImageError('team-lead')}
                  />
                )}
              </div>
              
              {/* Quote */}
              <div className="bg-white rounded-lg p-6 shadow-lg border border-slate-200">
                <p className="text-slate-700 italic text-lg leading-relaxed mb-4">
                  "Great architecture isn't just about creating buildings—it's about crafting spaces that tell stories and create lasting legacies for generations to come."
                </p>
                <div className="w-12 h-0.5 bg-slate-300 mx-auto mb-3"></div>
                <p className="text-slate-600 font-medium">Lead Architect & Founder</p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              {/* Image */}
              <div className="aspect-square max-w-xs mx-auto mb-6 bg-slate-200 rounded-lg overflow-hidden">
                {imageErrors['team-senior'] ? (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <span className="text-slate-500 text-sm">Team Member Image</span>
                  </div>
                ) : (
                  <Image 
                    src={imagePaths.team.senior}
                    alt="Senior Project Architect"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgDRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pV2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                    onError={() => handleImageError('team-senior')}
                  />
                )}
              </div>
              
              {/* Quote */}
              <div className="bg-white rounded-lg p-6 shadow-lg border border-slate-200">
                <p className="text-slate-700 italic text-lg leading-relaxed mb-4">
                  "We believe in architecture that respects its context while pushing boundaries—creating spaces that are both functional and inspiring for the people who use them."
                </p>
                <div className="w-12 h-0.5 bg-slate-300 mx-auto mb-3"></div>
                <p className="text-slate-600 font-medium">Senior Project Architect</p>
              </div>
            </div>

          </div>

          {/* Optional CTA */}
          <div className="text-center mt-12 sm:mt-16">
            <a 
              href="/about" 
              className="bg-black text-white px-6 py-3 sm:px-8 sm:py-4 font-semibold uppercase tracking-wider hover:bg-slate-800 transition-colors duration-300 text-sm sm:text-base inline-block text-center rounded-md"
            >
              Learn More About Our Team
            </a>
          </div>
        </div>
      </section>

      {/* Footer Section - Black Background */}
      <footer className="bg-black text-slate-200 pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            
            {/* Company Info Column */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="w-32 h-10 bg-slate-800 rounded flex items-center justify-center mb-6">
                  <span className="text-slate-300 text-sm font-light">TJAO ARCHITECTS</span>
                </div>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Transforming visions into timeless spaces across Botswana. Creating environments that inspire and endure for generations.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    <span className="sr-only">Facebook</span>
                    {/* Icon would go here */}
                    <div className="w-6 h-6 bg-slate-800 rounded"></div>
                  </a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    <span className="sr-only">Instagram</span>
                    {/* Icon would go here */}
                    <div className="w-6 h-6 bg-slate-800 rounded"></div>
                  </a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    {/* Icon would go here */}
                    <div className="w-6 h-6 bg-slate-800 rounded"></div>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
              <ul className="space-y-4">
                <li><a href="/" className="text-slate-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="/about" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/services" className="text-slate-400 hover:text-white transition-colors">Our Services</a></li>
                <li><a href="/projects" className="text-slate-400 hover:text-white transition-colors">Projects</a></li>
                <li><a href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-6 text-lg">Services</h3>
              <ul className="space-y-4">
                <li><a href="/services" className="text-slate-400 hover:text-white transition-colors">Residential Design</a></li>
                <li><a href="/services" className="text-slate-400 hover:text-white transition-colors">Commercial Architecture</a></li>
                <li><a href="/services" className="text-slate-400 hover:text-white transition-colors">Building Renovation</a></li>
                <li><a href="/services" className="text-slate-400 hover:text-white transition-colors">Space Planning</a></li>
                <li><a href="/services" className="text-slate-400 hover:text-white transition-colors">Design Consultation</a></li>
              </ul>
            </div>

            {/* Contact Info Column */}
            <div className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-6 text-lg">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="shrink-0 mt-1">
                    {/* Location icon placeholder */}
                    <div className="w-4 h-4 bg-slate-800 rounded-sm mr-3"></div>
                  </div>
                  <p className="text-slate-400">Tutume, Botswana</p>
                </div>
                <div className="flex items-start">
                  <div className="shrink-0 mt-1">
                    {/* Phone icon placeholder */}
                    <div className="w-4 h-4 bg-slate-800 rounded-sm mr-3"></div>
                  </div>
                  <p className="text-slate-400">+267 76 090 399</p>
                </div>
                <div className="flex items-start">
                  <div className="shrink-0 mt-1">
                    {/* Email icon placeholder */}
                    <div className="w-4 h-4 bg-slate-800 rounded-sm mr-3"></div>
                  </div>
                  <p className="text-slate-400">info@tjaoarchitects.com</p>
                </div>
                <div className="flex items-start">
                  <div className="shrink-0 mt-1">
                    {/* Time icon placeholder */}
                    <div className="w-4 h-4 bg-slate-800 rounded-sm mr-3"></div>
                  </div>
                  <p className="text-slate-400">Mon - Fri: 8:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 mt-8 border-t border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-slate-500 text-sm">
                © {new Date().getFullYear()} TJAO Architects. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="/privacy" className="text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a>
                <a href="/terms" className="text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</a>
                <a href="/sitemap" className="text-slate-500 hover:text-slate-300 transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}