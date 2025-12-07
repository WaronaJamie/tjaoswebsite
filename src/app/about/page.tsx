'use client';

import { Header } from "@/components/header"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { imagePaths } from "@/utils/image"

export default function About() {
  const [displayText, setDisplayText] = useState("")
  const [showTypewriter, setShowTypewriter] = useState(false)

  const fullText = "We Know How You Feel!"

  useEffect(() => {
    // Trigger typewriter effect when component mounts
    setShowTypewriter(true)
  }, [])

  // Typewriter effect
  useEffect(() => {
    if (!showTypewriter) return

    let currentIndex = 0
    const typingSpeed = 50 // milliseconds per character

    const typeWriter = () => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
        setTimeout(typeWriter, typingSpeed)
      }
    }

    typeWriter()
  }, [showTypewriter])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Main About Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            
            {/* Left Column - Text Content */}
            <div className="space-y-8 md:space-y-12">
              {/* Main Heading with Typewriter Effect */}
              <div className="min-h-[120px] sm:min-h-[140px] md:min-h-40">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                  {displayText}
                  {showTypewriter && displayText.length < fullText.length && (
                    <span className="ml-1 animate-pulse">|</span>
                  )}
                </h1>
              </div>

              {/* Description Paragraph */}
              <div className="max-w-2xl">
                <p className="text-lg sm:text-xl md:text-2xl text-slate-700 leading-relaxed">
                  Behind every architectural vision is a dream of creating lasting spaces for your family and community. 
                  We understand that deeply, because we've navigated the same challenges and aspirations as our clients here in Botswana. 
                  That's why we came together as TJAO Architects—to be your trusted partner in building with confidence and clarity.
                </p>
              </div>

              {/* Black Background Container with Values and CTA */}
              <div className="bg-black rounded-2xl p-6 sm:p-8 md:p-10 text-white max-w-2xl">
                <div className="space-y-6 md:space-y-8">
                  {/* Values Text */}
                  <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
                    We're a growing collective built on family values, trusted for our integrity and known for our professional approach.
                  </p>
                  
                  {/* CTA Button - Same styling as header */}
                  <Link 
                    href="/contact"
                    className="inline-block bg-white text-slate-900 px-6 py-3 sm:px-8 sm:py-4 font-semibold uppercase tracking-wider hover:bg-slate-100 transition-colors duration-300 text-sm sm:text-base text-center"
                  >
                    Start Your Journey
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Taller Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl h-full min-h-[600px] sm:min-h-[700px] md:min-h-[800px] overflow-hidden">
                <Image
                  src={imagePaths.about.main}
                  alt="TJAO Architects - About Us"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Purpose Section with Black Background */}
      <section className="py-16 sm:py-20 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              OUR PURPOSE
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
              We believe better architectural decisions can unlock lasting value for Batswana families and businesses.
              Too often, clients are overwhelmed by complex designs, conflicting advice, or fear of costly mistakes. 
              We cut through that complexity with clear, strategic guidance so you can build with confidence and create spaces that serve generations to come.
            </p>
          </div>

          {/* Four Feature Containers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Feature 1: Clarity */}
            <div className="bg-slate-800 rounded-2xl p-6 sm:p-8 hover:bg-slate-700 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-slate-900 rounded-lg p-3 shrink-0">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">We bring clarity to complex architectural challenges</h3>
                  <p className="text-slate-300 text-sm sm:text-base">
                    Transforming overwhelming design decisions into clear, actionable plans that make sense for your vision and budget.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2: Trust */}
            <div className="bg-slate-800 rounded-2xl p-6 sm:p-8 hover:bg-slate-700 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-slate-900 rounded-lg p-3 shrink-0">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">We build trust through integrity and transparency</h3>
                  <p className="text-slate-300 text-sm sm:text-base">
                    Honest communication and ethical practices form the foundation of every relationship and project we undertake.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3: Strategy */}
            <div className="bg-slate-800 rounded-2xl p-6 sm:p-8 hover:bg-slate-700 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-slate-900 rounded-lg p-3 shrink-0">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">We provide strategic solutions for real results</h3>
                  <p className="text-slate-300 text-sm sm:text-base">
                    Turning your architectural dreams into practical, buildable designs that deliver both beauty and functionality.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4: Care */}
            <div className="bg-slate-800 rounded-2xl p-6 sm:p-8 hover:bg-slate-700 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-slate-900 rounded-lg p-3 shrink-0">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">We treat every project with personal commitment</h3>
                  <p className="text-slate-300 text-sm sm:text-base">
                    Giving your architectural vision the same careful attention and dedication we would give to our own family's projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section - Exact same as homepage */}
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

          {/* Team Members Grid - 2 members only */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
            
            {/* Team Member 1 */}
            <div className="text-center">
              {/* Image */}
              <div className="aspect-square max-w-xs mx-auto mb-6 bg-slate-200 rounded-lg overflow-hidden">
                <Image
                  src={imagePaths.team.lead}
                  alt="Lead Architect & Founder"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
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
                <Image
                  src={imagePaths.team.senior}
                  alt="Senior Project Architect"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
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

         
        </div>
      </section>

      {/* Footer Section - Exact same as homepage */}
      <footer className="bg-slate-900 text-slate-200 pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            
            {/* Company Info Column */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="w-32 h-10 bg-slate-700 rounded flex items-center justify-center mb-6">
                  <span className="text-slate-300 text-sm font-light">TJAO ARCHITECTS</span>
                </div>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Transforming visions into timeless spaces across Botswana. Creating environments that inspire and endure for generations.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    <span className="sr-only">Facebook</span>
                    <div className="w-6 h-6 bg-slate-700 rounded"></div>
                  </a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    <span className="sr-only">Instagram</span>
                    <div className="w-6 h-6 bg-slate-700 rounded"></div>
                  </a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <div className="w-6 h-6 bg-slate-700 rounded"></div>
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
                    <div className="w-4 h-4 bg-slate-700 rounded-sm mr-3"></div>
                  </div>
                  <p className="text-slate-400">Tutume, Botswana</p>
                </div>
                <div className="flex items-start">
                  <div className="shrink-0 mt-1">
                    <div className="w-4 h-4 bg-slate-700 rounded-sm mr-3"></div>
                  </div>
                  <p className="text-slate-400">+267 76 090 399</p>
                </div>
                <div className="flex items-start">
                  <div className="shrink-0 mt-1">
                    <div className="w-4 h-4 bg-slate-700 rounded-sm mr-3"></div>
                  </div>
                  <p className="text-slate-400">info@tjaoarchitects.com</p>
                </div>
                <div className="flex items-start">
                  <div className="shrink-0 mt-1">
                    <div className="w-4 h-4 bg-slate-700 rounded-sm mr-3"></div>
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