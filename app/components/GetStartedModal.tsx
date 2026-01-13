'use client';

import { useState, useEffect, FormEvent } from 'react';
import { X } from 'lucide-react';
import { ShootingStars } from './ui/shooting-stars';
import { HoverButton } from './ui/hover-button';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    business_name: '',
    phone_country_code: '+1',
    phone_number: '',
    email: '',
    website: '',
    services: [] as string[],
    other_info: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const serviceOptions = [
    'Website',
    'Software',
    'AI Automations',
    'Marketing & Branding',
    'Other'
  ];

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
      // Reset form when closing
      setFormData({
        first_name: '',
        last_name: '',
        business_name: '',
        phone_country_code: '+1',
        phone_number: '',
        email: '',
        website: '',
        services: [],
        other_info: ''
      });
      setSubmitStatus({ type: null, message: '' });
    }, 200);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate services selection
    if (formData.services.length === 0) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please select at least one service of interest.' 
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/get-started', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you for your interest! We\'ll get back to you soon.' 
      });
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          first_name: '',
          last_name: '',
          business_name: '',
          phone_country_code: '+1',
          phone_number: '',
          email: '',
          website: '',
          services: [],
          other_info: ''
        });
        setTimeout(() => {
          handleClose();
        }, 1500);
      }, 2000);
    } catch (error) {
      console.error('Get started form error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Sorry, there was an error sending your message. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-200 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
      aria-hidden={!isOpen}
    >
      {/* Background with Shooting Stars - Same as Contact Page */}
      <div className="fixed inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0)_80%)]" />
        <div className="stars absolute inset-0" />
        <ShootingStars
          starColor="#9E00FF"
          trailColor="#2EB9DF"
          minSpeed={15}
          maxSpeed={35}
          minDelay={1000}
          maxDelay={3000}
        />
        <ShootingStars
          starColor="#FF0099"
          trailColor="#FFB800"
          minSpeed={10}
          maxSpeed={25}
          minDelay={2000}
          maxDelay={4000}
        />
        <ShootingStars
          starColor="#00FF9E"
          trailColor="#00B8FF"
          minSpeed={20}
          maxSpeed={40}
          minDelay={1500}
          maxDelay={3500}
        />
        <style dangerouslySetInnerHTML={{__html: `
          .stars {
            background-image: 
              radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
            background-repeat: repeat;
            background-size: 200px 200px;
            animation: twinkle 5s ease-in-out infinite;
            opacity: 0.5;
          }

          @keyframes twinkle {
            0% { opacity: 0.5; }
            50% { opacity: 0.8; }
            100% { opacity: 0.5; }
          }
        `}} />
      </div>

      {/* Modal Content */}
      <div
        className={`relative z-10 w-full max-w-2xl bg-black border border-white/20 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.3)] max-h-[90vh] overflow-y-auto transition-transform duration-200 ${
          isAnimating ? 'scale-100' : 'scale-95'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="get-started-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 md:p-10">
          {/* Header */}
          <h2
            id="get-started-modal-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8"
            style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
          >
            Get Started
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name and Last Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="first_name" className="block text-white mb-2 text-sm" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                  First Name <span className="text-gray-400">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-base bg-transparent border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-white focus:border-opacity-60 transition-all"
                  placeholder=""
                  style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-white mb-2 text-sm" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                  Last Name <span className="text-gray-400">*</span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-base bg-transparent border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-white focus:border-opacity-60 transition-all"
                  placeholder=""
                  style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                />
              </div>
            </div>

            {/* Business Name */}
            <div>
              <label htmlFor="business_name" className="block text-white mb-2 text-sm" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                Business Name <span className="text-gray-400">*</span>
              </label>
              <input
                type="text"
                id="business_name"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-base bg-transparent border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-white focus:border-opacity-60 transition-all"
                placeholder=""
                style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone_number" className="block text-white mb-2 text-sm" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                Phone Number <span className="text-gray-400">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  id="phone_country_code"
                  name="phone_country_code"
                  value={formData.phone_country_code}
                  onChange={handleChange}
                  className="px-3 sm:px-4 py-3 bg-transparent border border-white border-opacity-30 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-white focus:border-opacity-60 transition-all"
                  style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                >
                  <option value="+1" className="bg-gray-900">US +1</option>
                  <option value="+44" className="bg-gray-900">UK +44</option>
                  <option value="+33" className="bg-gray-900">FR +33</option>
                  <option value="+49" className="bg-gray-900">DE +49</option>
                  <option value="+81" className="bg-gray-900">JP +81</option>
                </select>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 bg-transparent border border-white border-opacity-30 rounded-lg text-white text-base placeholder-white placeholder-opacity-50 focus:outline-none focus:border-white focus:border-opacity-60 transition-all"
                  placeholder=""
                  style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-white mb-2 text-sm" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                Email <span className="text-gray-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-base bg-transparent border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-white focus:border-opacity-60 transition-all"
                placeholder=""
                style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
              />
            </div>

            {/* Website (Optional) */}
            <div>
              <label htmlFor="website" className="block text-white mb-2 text-sm" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                Website <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-3 text-base bg-transparent border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-white focus:border-opacity-60 transition-all"
                placeholder="https://"
                style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
              />
            </div>

            {/* Services Checklist */}
            <div>
              <label className="block text-white mb-3 text-sm" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                Services of Interest <span className="text-gray-400">*</span>
              </label>
              <div className="space-y-2">
                {serviceOptions.map((service) => (
                  <label
                    key={service}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceChange(service)}
                      className="w-5 h-5 rounded border-white border-opacity-30 bg-transparent text-white focus:ring-2 focus:ring-white focus:ring-opacity-50 cursor-pointer accent-white"
                      style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                    />
                    <span
                      className="text-white text-base group-hover:text-gray-200 transition-colors"
                      style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                    >
                      {service}
                    </span>
                  </label>
                ))}
              </div>
              {formData.services.length === 0 && (
                <p className="text-red-400 text-xs mt-1" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                  Please select at least one service
                </p>
              )}
            </div>

            {/* Any Other Information */}
            <div>
              <label htmlFor="other_info" className="block text-white mb-2 text-sm" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                Any Other Information
              </label>
              <textarea
                id="other_info"
                name="other_info"
                value={formData.other_info}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 text-base bg-transparent border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-white focus:border-opacity-60 transition-all resize-none"
                placeholder=""
                style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
              />
            </div>

            {/* Status Messages */}
            {submitStatus.type && (
              <div
                className={`p-4 rounded-lg ${
                  submitStatus.type === 'success'
                    ? 'bg-gray-700 bg-opacity-50 border border-gray-500 text-gray-200'
                    : 'bg-red-900 bg-opacity-50 border border-red-700 text-red-200'
                }`}
                style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
              >
                {submitStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <HoverButton
              type="submit"
              disabled={isSubmitting || formData.services.length === 0}
              className="w-full text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  Submit
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </HoverButton>
          </form>
        </div>
      </div>
    </div>
  );
}
