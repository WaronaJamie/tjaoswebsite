// components/discovery-call-modal.tsx
'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Calendar } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

interface DiscoveryCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DiscoveryCallModal({ isOpen, onClose }: DiscoveryCallModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedTimezone, setSelectedTimezone] = useState('Africa/Gaborone');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    projectDescription: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update current date in real-time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  // Timezone options
  const timezones = [
    { value: 'Africa/Gaborone', label: 'Botswana Time (GMT+2)' },
    { value: 'Europe/London', label: 'GMT / UK Time (GMT+0)' },
    { value: 'Europe/Paris', label: 'Central European (GMT+1)' },
    { value: 'America/New_York', label: 'Eastern Time (GMT-5)' },
    { value: 'Asia/Dubai', label: 'Gulf Standard (GMT+4)' },
    { value: 'Asia/Singapore', label: 'Singapore Time (GMT+8)' }
  ];

  // Filter out weekends and past dates
  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // No weekends
  };

  const filterPassedTime = (time: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  // Format date to display like "Tue, Nov 25, 2025"
  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Handle time slot selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowForm(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !agreeToTerms) {
      alert('Please fill in all required fields and agree to the terms.');
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = new FormData();
      
      // Append form data
      submissionData.append('firstName', formData.firstName);
      submissionData.append('lastName', formData.lastName);
      submissionData.append('email', formData.email);
      submissionData.append('projectDescription', formData.projectDescription);
      submissionData.append('selectedDate', selectedDate ? formatDisplayDate(selectedDate) : '');
      submissionData.append('selectedTime', selectedTime || '');
      submissionData.append('selectedTimezone', timezones.find(tz => tz.value === selectedTimezone)?.label || '');
      
      // Append FormSubmit configuration
      submissionData.append('_subject', 'New Discovery Call Booking - TJAO Architects');
      submissionData.append('_captcha', 'false');
      submissionData.append('_template', 'table');
      submissionData.append('_replyto', formData.email);

      const response = await fetch('https://formsubmit.co/ajax/jamiewarona@gmail.com', {
        method: 'POST',
        body: submissionData,
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert('Thank you for booking a discovery call! We have received your request and will send you a calendar invitation shortly.');
        
        // Reset form and close modal
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          projectDescription: ''
        });
        setSelectedDate(null);
        setSelectedTime(null);
        setAgreeToTerms(false);
        setShowForm(false);
        onClose();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Sorry, there was an error scheduling your call. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="relative bg-black text-white w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800">
        
        {/* Close Button - Black and Always Visible */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 z-10 p-3 bg-black hover:bg-slate-800 rounded-full transition-all duration-200 border border-white/20 shadow-lg"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
          
          {/* Left Panel - Branding (White Background) */}
          <div className="bg-white text-black p-8 lg:p-12 flex flex-col justify-between rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-8 lg:mb-12 leading-tight">
                BOOK A DISCOVERY CALL
              </h1>
              
              {/* Logo Section */}
              <div className="mb-8">
                <div className="w-32 h-32 bg-slate-900 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-lg">TJAO LOGO</span>
                </div>
                
                <div className="space-y-2 text-slate-700">
                  <h3 className="text-xl font-semibold text-slate-900">
                    Architectural Design Consultation
                  </h3>
                  <p className="text-lg">Discovery Call - TJAO Architects</p>
                  <p className="text-lg">30 Mins</p>
                  <p className="text-lg font-medium text-slate-900">
                    {formatDisplayDate(currentDate)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-slate-600">
              <p>Professional architectural consultation for your dream project</p>
            </div>
          </div>

          {/* Center Panel - Calendar & Timezone (White Background) */}
          <div className="bg-white text-black p-8 border-t lg:border-t-0 lg:border-x border-slate-200">
            <div className="space-y-8">
              {/* Calendar Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900">Select a Date</h3>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minDate={new Date()}
                    filterDate={isWeekday}
                    filterTime={filterPassedTime}
                    inline
                    showTimeSelect={false}
                    dateFormat="MMMM d, yyyy"
                    className="w-full react-datepicker-custom"
                  />
                </div>
              </div>
              
              {/* Timezone Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900">Timezone</h3>
                <select 
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                >
                  {timezones.map(tz => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-slate-600 mt-2">
                  Current time: {new Date().toLocaleTimeString('en-US', { timeZone: selectedTimezone })}
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Time Slots & Form (White Background) */}
          <div className="bg-white text-black p-8 border-t lg:border-t-0 lg:rounded-r-2xl">
            {!showForm ? (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-slate-900">
                  {selectedDate ? `Available Times for ${formatDisplayDate(selectedDate)}` : 'Available Times'}
                </h3>
                
                {!selectedDate ? (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">Please select a date first to see available times</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg py-4 px-6 text-left transition-all duration-200 hover:border-slate-900 hover:shadow-md"
                      >
                        <span className="text-lg font-medium text-slate-900">{time}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-slate-900">Your Information</h3>
                <div className="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-700">
                    <strong>Selected Time:</strong> {selectedTime} on {selectedDate && formatDisplayDate(selectedDate)}
                  </p>
                  <p className="text-slate-700">
                    <strong>Timezone:</strong> {timezones.find(tz => tz.value === selectedTimezone)?.label}
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        First Name *
                      </label>
                      <input 
                        type="text" 
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name *
                      </label>
                      <input 
                        type="text" 
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Project Description
                    </label>
                    <textarea 
                      rows={3}
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      placeholder="Tell us about your project, budget, and timeline..."
                    />
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <input 
                      type="checkbox" 
                      id="terms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 text-slate-900 bg-white border-slate-300 rounded focus:ring-slate-900 focus:ring-2"
                    />
                    <label htmlFor="terms" className="text-sm text-slate-700">
                      I confirm that I want to receive content from TJAO Architects using any contact information I provide.
                    </label>
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={!agreeToTerms || isSubmitting}
                    className="w-full bg-slate-900 text-white hover:bg-slate-800 font-semibold py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Scheduling...' : 'Schedule Discovery Call'}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}