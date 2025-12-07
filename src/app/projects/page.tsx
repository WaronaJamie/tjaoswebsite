'use client'

import { Header } from "@/components/header"
import { useState } from "react"
import Image from "next/image"
import { imagePaths } from "@/utils/image"

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0)

  const projects = [
    {
      id: 1,
      title: "Gaborone Modern Residence",
      description: "A contemporary family home that seamlessly blends modern architectural principles with traditional Botswana design elements. This project showcases how contemporary living can harmonize with local cultural context through thoughtful material selection and spatial planning.",
      image: imagePaths.projects.residential,
      processes: [
        {
          name: "Client Consultation & Site Analysis",
          description: "Comprehensive meetings with the family to understand their lifestyle needs and detailed analysis of the Gaborone site context."
        },
        {
          name: "Concept Development & Cultural Integration", 
          description: "Developing architectural concepts that blend modern aesthetics with traditional Botswana design motifs and spatial arrangements."
        },
        {
          name: "Sustainable Design Implementation",
          description: "Integrating passive cooling systems, natural ventilation, and locally sourced materials for environmental sustainability."
        },
        {
          name: "Construction & Quality Assurance",
          description: "Overseeing the construction process to ensure design integrity and high-quality craftsmanship throughout."
        }
      ],
      outcome: {
        location: "Gaborone, Botswana",
        timeline: "14 Months",
        features: [
          "4-bedroom family residence with separate living zones",
          "Natural stone feature walls using local materials",
          "Passive cooling system reducing energy consumption by 40%",
          "Seamless indoor-outdoor transition with covered patio areas",
          "Traditional courtyard design for family gatherings"
        ]
      }
    },
    {
      id: 2,
      title: "Francistown Commercial Complex",
      description: "A mixed-use development combining retail spaces with professional offices, designed to create a vibrant community hub while addressing the specific needs of Francistown's growing business district. The project emphasizes community interaction and sustainable commercial practices.",
      image: imagePaths.projects.commercial,
      processes: [
        {
          name: "Market Analysis & Community Needs Assessment",
          description: "Researching local business needs and community requirements to inform the commercial development strategy."
        },
        {
          name: "Zoning Strategy & Circulation Planning",
          description: "Developing optimal layout for retail and office integration with efficient customer and employee flow."
        },
        {
          name: "Facade Design & Local Character Integration",
          description: "Creating a distinctive architectural expression that reflects Francistown's urban character while maintaining modern functionality."
        },
        {
          name: "Sustainable Infrastructure Implementation",
          description: "Incorporating rainwater harvesting, energy-efficient systems, and sustainable waste management solutions."
        }
      ],
      outcome: {
        location: "Francistown, Botswana", 
        timeline: "18 Months",
        features: [
          "5,000 sqm mixed-use development with 12 retail units",
          "8 professional office spaces with modern amenities",
          "Central courtyard for community gatherings and events",
          "Sustainable features reducing operational costs by 30%",
          "Accessible design with ramp access and family facilities"
        ]
      }
    },
    {
      id: 3, 
      title: "Maun Cultural Retreat",
      description: "A respectful architectural response to the Okavango Delta context, creating a retreat that celebrates Botswana's cultural heritage while providing modern comfort and environmental sensitivity. The project demonstrates how tourism architecture can honor local traditions.",
      image: imagePaths.projects.heritage,
      processes: [
        {
          name: "Cultural Consultation & Community Engagement",
          description: "Working with local community leaders and cultural experts to ensure design respects traditional values and practices."
        },
        {
          name: "Traditional Design Interpretation",
          description: "Adapting traditional Botswana compound layouts and building techniques for contemporary retreat use."
        },
        {
          name: "Environmental Impact Assessment",
          description: "Conducting thorough environmental studies to minimize ecological impact in the sensitive Delta region."
        },
        {
          name: "Local Material Sourcing & Craft Integration",
          description: "Utilizing locally sourced thatch, timber, and stone while integrating traditional craftsmanship."
        }
      ],
      outcome: {
        location: "Maun, Okavango Delta, Botswana",
        timeline: "12 Months",
        features: [
          "6-suite cultural retreat with central gathering space",
          "Traditional thatch roofing with modern insulation technology",
          "Natural wastewater treatment and recycling system",
          "Community skills development program integration",
          "Solar-powered lighting and water heating systems"
        ]
      }
    },
    {
      id: 4,
      title: "Palapye Sustainable Community", 
      description: "An eco-conscious residential community designed around sustainable principles, creating affordable housing that respects the environment while fostering community connections. This project addresses urban growth with environmentally responsible solutions.",
      image: imagePaths.projects.sustainable,
      processes: [
        {
          name: "Community Workshops & Resident Engagement",
          description: "Extensive community consultation to identify resident priorities and develop community-led design solutions."
        },
        {
          name: "Sustainable Site Planning",
          description: "Master planning that maximizes natural ventilation, solar orientation, and green space integration."
        },
        {
          name: "Affordable Material Research",
          description: "Researching and testing locally available, sustainable materials for cost-effective construction."
        },
        {
          name: "Community Infrastructure Development",
          description: "Designing shared facilities, community gardens, and sustainable infrastructure systems."
        }
      ],
      outcome: {
        location: "Palapye, Botswana", 
        timeline: "24 Months",
        features: [
          "20-unit sustainable housing community with varied typologies",
          "Community garden and shared agricultural spaces",
          "Solar power integration for common area lighting",
          "Rainwater harvesting serving 80% of non-potable water needs",
          "Pedestrian-friendly layout with green corridors"
        ]
      }
    },
    {
      id: 5,
      title: "Serowe Heritage Renovation",
      description: "A sensitive restoration and modernization of a historical building in Serowe, preserving its cultural significance while adapting it for contemporary community use. This project demonstrates our commitment to heritage conservation.",
      image: imagePaths.projects.hillside,
      processes: [
        {
          name: "Historical Research & Building Assessment",
          description: "Detailed historical research and structural assessment to understand the building's original construction and current condition."
        },
        {
          name: "Conservation Strategy Development",
          description: "Creating a balanced approach that preserves historical elements while introducing necessary modern upgrades."
        },
        {
          name: "Traditional Craftsmanship Revival",
          description: "Working with local artisans to revive traditional building techniques and craftsmanship."
        },
        {
          name: "Modern Integration & Accessibility Upgrades",
          description: "Carefully integrating modern services, accessibility features, and safety systems without compromising historical integrity."
        }
      ],
      outcome: {
        location: "Serowe, Botswana", 
        timeline: "10 Months",
        features: [
          "Restored historical facade using original materials and techniques",
          "Modernized interior spaces for community and educational use",
          "Accessibility upgrades including ramp access and facilities",
          "Energy-efficient lighting and climate control systems",
          "Cultural interpretation center showcasing local history"
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
              <h1 className="text-2xl sm:text-3xl font-light text-black mb-4">
                OUR PROJECTS
              </h1>
              <div className="w-16 sm:w-20 h-0.5 bg-black"></div>
            </div>
            
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-black leading-tight mb-6">
                Transforming visions into architectural reality across Botswana.
              </h2>
              
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-6">
                Each project represents a unique collaboration between our architectural vision and our clients' aspirations. 
                We believe in creating spaces that not only serve their purpose but also contribute positively to Botswana's 
                built environment and cultural landscape.
              </p>
              
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
                From residential sanctuaries to commercial hubs and community developments, our portfolio showcases 
                the diversity of our architectural approach and our commitment to excellence in every detail.
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
              src={imagePaths.projects.main}
              alt="TJAO Architects Projects Portfolio"
              width={1200}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Projects Showcase - Same Layout as Services */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Projects Navigation */}
          <div className="flex flex-wrap gap-4 mb-12 sm:mb-16">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(index)}
                className={`px-6 py-3 font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeProject === index
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-slate-100'
                } rounded-md text-sm sm:text-base`}
              >
                {project.title.split(' ').slice(0, 2).join(' ')}
              </button>
            ))}
          </div>

          {/* Projects Content */}
          <div className="space-y-16 sm:space-y-20">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start transition-all duration-500 ${
                  activeProject === index
                    ? 'opacity-100 translate-y-0'
                    : 'hidden'
                }`}
              >
                {/* Left Column - Project Process */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
                      {project.title}
                    </h3>
                    <div className="w-16 sm:w-20 h-0.5 bg-black mb-6"></div>
                    <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Project Process */}
                  <div className="space-y-6">
                    <h4 className="text-xl sm:text-2xl font-semibold text-black mb-4">
                      Project Approach
                    </h4>
                    <div className="space-y-4">
                      {project.processes.map((process, processIndex) => (
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

                {/* Right Column - Project Outcome & Image */}
                <div className="space-y-8">
                  {/* Image */}
                  <div className="w-full aspect-4/3 rounded-lg overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Project Outcome Section */}
                  <div className="bg-white rounded-lg p-6 border border-slate-200">
                    <h4 className="text-xl sm:text-2xl font-semibold text-black mb-6">
                      Project Outcome
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-slate-600 uppercase tracking-wider mb-2">Location</p>
                        <p className="text-lg font-semibold text-black">{project.outcome.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 uppercase tracking-wider mb-2">Project Timeline</p>
                        <p className="text-lg font-semibold text-black">{project.outcome.timeline}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 uppercase tracking-wider mb-3">Key Features</p>
                      <ul className="space-y-2">
                        {project.outcome.features.map((feature, featureIndex) => (
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
              Inspired by Our Work?
            </h2>
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-8">
              Let's collaborate to create something extraordinary for your next project. Our architectural expertise 
              and passion for innovative design are ready to bring your vision to life.
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