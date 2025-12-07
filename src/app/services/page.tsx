'use client'

import { Header } from "@/components/header"
import { useState } from "react"
import Image from "next/image"
import { imagePaths } from "@/utils/image"

export default function Services() {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      id: 1,
      title: "Residential Architecture",
      description: "Custom home designs that reflect your lifestyle while honoring Botswana's architectural heritage and environmental considerations.",
      image: imagePaths.services.residential,
      processes: [
        {
          name: "Initial Consultation & Site Analysis",
          description: "We begin by understanding your vision, requirements, and site context to establish a comprehensive design brief."
        },
        {
          name: "Concept Development & Spatial Planning", 
          description: "Transforming your vision into initial architectural concepts with functional layouts and design principles."
        },
        {
          name: "Design Development & Technical Documentation",
          description: "Detailed technical development of approved concepts into comprehensive architectural documentation."
        },
        {
          name: "Construction Oversight & Project Realization",
          description: "Guiding your project through construction with ongoing support and quality assurance."
        }
      ],
      outcome: {
        location: "Gaborone, Botswana",
        timeline: "12-18 Months",
        features: [
          "Custom family residences with personalized spaces",
          "Sustainable material selection and passive cooling systems",
          "Seamless indoor-outdoor living integration",
          "Local material integration and cultural sensitivity"
        ]
      }
    },
    {
      id: 2,
      title: "Commercial Architecture",
      description: "Innovative commercial spaces designed for functionality, brand identity, and long-term business success across Botswana.",
      image: imagePaths.services.commercial,
      processes: [
        {
          name: "Business Needs Assessment & Zoning Analysis",
          description: "Comprehensive analysis of commercial requirements and regulatory compliance."
        },
        {
          name: "Commercial Space Planning & Circulation",
          description: "Strategic layout planning for optimal customer flow and operational efficiency."
        },
        {
          name: "Facade Design & Brand Integration",
          description: "Creating distinctive exteriors that reflect brand identity while respecting local context."
        },
        {
          name: "Commercial Compliance & Project Delivery",
          description: "Ensuring all commercial standards are met while delivering on time and budget."
        }
      ],
      outcome: {
        location: "Multiple Locations, Botswana",
        timeline: "18-24 Months", 
        features: [
          "Mixed-use developments and retail complexes",
          "Professional office spaces and business centers",
          "Community-focused commercial hubs",
          "Sustainable commercial infrastructure"
        ]
      }
    },
    {
      id: 3, 
      title: "Heritage Restoration & Renovation",
      description: "Breathing new life into existing structures while preserving their historical significance and cultural value.",
      image: imagePaths.services.heritage,
      processes: [
        {
          name: "Historical Assessment & Cultural Consultation",
          description: "Working with local communities to understand historical significance and preservation needs."
        },
        {
          name: "Restoration Strategy & Material Sourcing",
          description: "Developing respectful restoration approaches using traditional and modern materials."
        },
        {
          name: "Adaptive Reuse Planning",
          description: "Transforming historical structures for contemporary use while preserving character."
        },
        {
          name: "Cultural Preservation & Modern Integration",
          description: "Balancing historical authenticity with modern functionality and safety standards."
        }
      ],
      outcome: {
        location: "Historic Sites, Botswana",
        timeline: "12-24 Months",
        features: [
          "Cultural heritage preservation and restoration",
          "Traditional building technique integration",
          "Modern comfort and safety upgrades",
          "Community cultural space activation"
        ]
      }
    },
    {
      id: 4,
      title: "Sustainable Community Development", 
      description: "Eco-conscious residential communities designed around sustainable principles and community connectivity.",
      image: imagePaths.services.sustainable,
      processes: [
        {
          name: "Community Workshops & Needs Assessment",
          description: "Engaging future residents to identify priorities and community requirements."
        },
        {
          name: "Sustainable Site Planning & Environmental Integration",
          description: "Maximizing natural ventilation, solar orientation, and environmental sensitivity."
        },
        {
          name: "Affordable Material Research & Local Sourcing",
          description: "Identifying sustainable, locally-available materials for cost-effective construction."
        },
        {
          name: "Community Infrastructure & Shared Facilities Planning",
          description: "Designing shared spaces and community infrastructure that fosters connection."
        }
      ],
      outcome: {
        location: "Various Communities, Botswana", 
        timeline: "24-36 Months",
        features: [
          "Eco-friendly housing communities",
          "Shared community facilities and gardens",
          "Solar power and rainwater harvesting systems",
          "Affordable, sustainable living solutions"
        ]
      }
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4">
                OUR SERVICES
              </h1>
              <div className="w-16 sm:w-20 h-0.5 bg-slate-900"></div>
            </div>
            
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 leading-tight mb-6">
                Architectural excellence tailored for Botswana's unique landscape.
              </h2>
              
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-6">
                We don't believe in one-size-fits-all solutions. Each project is a unique collaboration blending 
                creative vision with practical expertise to create spaces that serve their purpose while honoring 
                Botswana's rich cultural and environmental context.
              </p>
              
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
                From residential sanctuaries to commercial hubs, our approach remains consistent: 
                listen deeply, design thoughtfully, and execute precisely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Big Full Width Image Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="w-full aspect-3/1 rounded-lg overflow-hidden">
            <Image
              src={imagePaths.services.main}
              alt="TJAO Architects Services Overview"
              width={1200}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Services Showcase - Somerstone Inspired */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Services Navigation */}
          <div className="flex flex-wrap gap-4 mb-12 sm:mb-16">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveService(index)}
                className={`px-6 py-3 font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeService === index
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-slate-100'
                } rounded-md text-sm sm:text-base`}
              >
                {service.title}
              </button>
            ))}
          </div>

          {/* Services Content */}
          <div className="space-y-16 sm:space-y-20">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start transition-all duration-500 ${
                  activeService === index
                    ? 'opacity-100 translate-y-0'
                    : 'hidden'
                }`}
              >
                {/* Left Column - Process Steps */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
                      {service.title}
                    </h3>
                    <div className="w-16 sm:w-20 h-0.5 bg-black mb-6"></div>
                    <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Process Steps */}
                  <div className="space-y-6">
                    <h4 className="text-xl sm:text-2xl font-semibold text-black mb-4">
                      Our Process
                    </h4>
                    <div className="space-y-4">
                      {service.processes.map((process, processIndex) => (
                        <div key={processIndex} className="flex items-start">
                          <div className="shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                            {processIndex + 1}
                          </div>
                          <div>
                            <h5 className="text-lg font-semibold text-black mb-2">
                              {process.name}
                            </h5>
                            <p className="text-slate-700 leading-relaxed">
                              {process.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Outcome & Image */}
                <div className="space-y-8">
                  {/* Image */}
                  <div className="w-full aspect-4/3 rounded-lg overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Outcome Section */}
                  <div className="bg-white rounded-lg p-6 border border-slate-200">
                    <h4 className="text-xl sm:text-2xl font-semibold text-black mb-6">
                      Project Outcome
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-slate-600 uppercase tracking-wider mb-2">Typical Location</p>
                        <p className="text-lg font-semibold text-black">{service.outcome.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 uppercase tracking-wider mb-2">Project Timeline</p>
                        <p className="text-lg font-semibold text-black">{service.outcome.timeline}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 uppercase tracking-wider mb-3">Key Features</p>
                      <ul className="space-y-2">
                        {service.outcome.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-slate-700">
                            <svg className="w-5 h-5 text-black mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-light text-black mb-6">
              Ready to Start Your Architectural Project?
            </h2>
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-8">
              Let's discuss how we can bring your vision to life with the same expertise and care showcased in our services.
            </p>
            <a 
              href="/contact" 
              className="bg-black text-white hover:bg-slate-800 font-light text-sm sm:text-base px-6 py-3 rounded-md transition-colors duration-300 inline-block"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Updated to black background with white text */}
      <footer className="bg-black text-white pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            
            {/* Company Info Column */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="w-32 h-10 bg-slate-800 rounded flex items-center justify-center mb-6">
                  <span className="text-white text-sm font-light">TJAO ARCHITECTS</span>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Transforming visions into timeless spaces across Botswana. Creating environments that inspire and endure for generations.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-slate-300 hover:text-white transition-colors">
                    <span className="sr-only">Facebook</span>
                    <div className="w-6 h-6 bg-slate-800 rounded"></div>
                  </a>
                  <a href="#" className="text-slate-300 hover:text-white transition-colors">
                    <span className="sr-only">Instagram</span>
                    <div className="w-6 h-6 bg-slate-800 rounded"></div>
                  </a>
                  <a href="#" className="text-slate-300 hover:text-white transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <div className="w-6 h-6 bg-slate-800 rounded"></div>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
              <ul className="space-y-4">
                <li><a href="/" className="text-slate-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="/about" className="text-slate-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/services" className="text-slate-300 hover:text-white transition-colors">Our Services</a></li>
                <li><a href="/projects" className="text-slate-300 hover:text-white transition-colors">Projects</a></li>
                <li><a href="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-6 text-lg">Services</h3>
              <ul className="space-y-4">
                <li><a href="/services" className="text-slate-300 hover:text-white transition-colors">Residential Design</a></li>
                <li><a href="/services" className="text-slate-300 hover:text-white transition-colors">Commercial Architecture</a></li>
                <li><a href="/services" className="text-slate-300 hover:text-white transition-colors">Building Renovation</a></li>
                <li><a href="/services" className="text-slate-300 hover:text-white transition-colors">Space Planning</a></li>
                <li><a href="/services" className="text-slate-300 hover:text-white transition-colors">Design Consultation</a></li>
              </ul>
            </div>

            {/* Contact Info Column */}
            <div className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-6 text-lg">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="shrink-0 mt-1">
                    <div className="w-4 h-4 bg-slate-800 rounded-sm mr-3"></div>
                  </div>
                  <p className="text-slate-300">Tutume, Botswana</p>
                </div>
                <div className="flex items-start">
                  <div className="shrink-0 mt-1">
                    <div className="w-4 h-4 bg-slate-800 rounded-sm mr-3"></div>
                  </div>
                  <p className="text-slate-300">+267 76 090 399</p>
                </div>
                <div className="flex items-start">
                  <div className="shrink-0 mt-1">
                    <div className="w-4 h-4 bg-slate-800 rounded-sm mr-3"></div>
                  </div>
                  <p className="text-slate-300">info@tjaoarchitects.com</p>
                </div>
                <div className="flex items-start">
                  <div className="shrink-0 mt-1">
                    <div className="w-4 h-4 bg-slate-800 rounded-sm mr-3"></div>
                  </div>
                  <p className="text-slate-300">Mon - Fri: 8:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 mt-8 border-t border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-slate-400 text-sm">
                © {new Date().getFullYear()} TJAO Architects. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="/sitemap" className="text-slate-400 hover:text-white transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer> 
    </div>
  )
}