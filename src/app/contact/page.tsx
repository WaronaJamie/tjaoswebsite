'use client'

import { Header } from "@/components/header"
import { useState, useEffect } from "react"

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  projectDescription: string;
  projectLocation: string;
  plotSize: string;
  existingBuilding: string;
  files: FileList | null;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    projectDescription: '',
    projectLocation: '',
    plotSize: '',
    existingBuilding: '',
    files: null
  })

  // Typewriter effect state
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const fullText = "Let's Bring Your Vision to Life"

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 100)
      
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullText])

  const services = [
    'Residential Design',
    'Commercial Architecture', 
    'Building Renovation',
    'Space Planning',
    'Design Consultation',
    'Not Sure Yet'
  ]

  const budgets = [
    'Under BWP 500,000',
    'BWP 500,000 - BWP 1,000,000',
    'BWP 1,000,000 - BWP 2,500,000',
    'BWP 2,500,000 - BWP 5,000,000',
    'BWP 5,000,000 - BWP 10,000,000',
    'Over BWP 10,000,000',
    'To be discussed'
  ]

  const timelines = [
    'Immediately (0-3 months)',
    'Short-term (3-6 months)',
    'Medium-term (6-12 months)',
    'Long-term (1-2 years)',
    'Future planning (2+ years)',
    'Flexible timeline'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    setFormData(prev => ({
      ...prev,
      files: files
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData object
    const submissionData = new FormData();
    
    // Append all form data
    submissionData.append('firstName', formData.firstName);
    submissionData.append('lastName', formData.lastName);
    submissionData.append('email', formData.email);
    submissionData.append('phone', formData.phone);
    submissionData.append('company', formData.company);
    submissionData.append('service', formData.service);
    submissionData.append('budget', formData.budget);
    submissionData.append('timeline', formData.timeline);
    submissionData.append('projectDescription', formData.projectDescription);
    submissionData.append('projectLocation', formData.projectLocation);
    submissionData.append('plotSize', formData.plotSize);
    submissionData.append('existingBuilding', formData.existingBuilding);
    
    // Append FormSubmit configuration
    submissionData.append('_subject', 'New Project Inquiry from TJAO Architects Website');
    submissionData.append('_captcha', 'false');
    submissionData.append('_template', 'table');
    submissionData.append('_replyto', formData.email);

    try {
      const response = await fetch('https://formsubmit.co/ajax/jamiewarona@gmail.com', {
        method: 'POST',
        body: submissionData,
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert('Thank you for your inquiry! We will get back to you within 24-48 hours.');
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          budget: '',
          timeline: '',
          projectDescription: '',
          projectLocation: '',
          plotSize: '',
          existingBuilding: '',
          files: null
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-light text-black mb-4">
                CONTACT US
              </h1>
              <div className="w-16 sm:w-20 h-0.5 bg-black"></div>
            </div>
            
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-black leading-tight mb-6 min-h-[1.2em]">
                {displayText}
                {currentIndex < fullText.length && (
                  <span className="ml-1 animate-pulse">|</span>
                )}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold text-black mb-6">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                        placeholder="+267 XXX-XXXX"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                      placeholder="Your company name (if applicable)"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <h3 className="text-xl font-semibold text-black mb-6">Project Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">
                        Service Required *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                      >
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-slate-700 mb-2">
                        Estimated Budget *
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        required
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                      >
                        <option value="">Select budget range</option>
                        {budgets.map((budget, index) => (
                          <option key={index} value={budget}>{budget}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-slate-700 mb-2">
                        Project Timeline *
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        required
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((timeline, index) => (
                          <option key={index} value={timeline}>{timeline}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="projectLocation" className="block text-sm font-medium text-slate-700 mb-2">
                        Project Location *
                      </label>
                      <input
                        type="text"
                        id="projectLocation"
                        name="projectLocation"
                        required
                        value={formData.projectLocation}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                        placeholder="City/Town, Botswana"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label htmlFor="plotSize" className="block text-sm font-medium text-slate-700 mb-2">
                        Plot Size (if known)
                      </label>
                      <input
                        type="text"
                        id="plotSize"
                        name="plotSize"
                        value={formData.plotSize}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                        placeholder="e.g., 500 sqm, 1 acre"
                      />
                    </div>
                    <div>
                      <label htmlFor="existingBuilding" className="block text-sm font-medium text-slate-700 mb-2">
                        Existing Building (for renovations)
                      </label>
                      <input
                        type="text"
                        id="existingBuilding"
                        name="existingBuilding"
                        value={formData.existingBuilding}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                        placeholder="Type of existing structure"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="projectDescription" className="block text-sm font-medium text-slate-700 mb-2">
                    Project Description & Requirements *
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    required
                    rows={6}
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                    placeholder="Please describe your project vision, requirements, specific needs, and any other relevant details..."
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label htmlFor="fileUpload" className="block text-sm font-medium text-slate-700 mb-2">
                    Attach Files (Optional)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="fileUpload"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.dwg,.skp,.rvt"
                    />
                    <label htmlFor="fileUpload" className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <div className="text-slate-600">
                          <span className="font-medium text-slate-900">Click to upload</span> or drag and drop
                        </div>
                        <p className="text-sm text-slate-500">
                          PDF, DOC, images, CAD files (MAX. 10MB each)
                        </p>
                      </div>
                    </label>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    You can attach site plans, sketches, reference images, or any other relevant documents.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-4 px-6 font-semibold rounded-lg hover:bg-slate-800 transition-colors duration-300 text-lg"
                  >
                    Submit Your Project Inquiry
                  </button>
                  <p className="text-sm text-slate-500 mt-3 text-center">
                    We'll get back to you within 24-48 hours to discuss your project.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black">Our Office</h3>
                <p className="text-slate-600">Tutume, Botswana</p>
              </div>
              
              <div className="space-y-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black">Call Us</h3>
                <p className="text-slate-600">+267 76 090 399</p>
              </div>
              
              <div className="space-y-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black">Email Us</h3>
                <p className="text-slate-600">info@tjaoarchitects.com</p>
              </div>
            </div>
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