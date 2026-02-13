"use client"
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Upload, X, ChevronRight, ChevronLeft } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import SuccessModal from './SuccessModal';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  service: string;
  message: string;
  contactMethod: string;
  contactTime: string;
  agreeToTerms: boolean;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    service: '',
    message: '',
    contactMethod: '',
    contactTime: '',
    agreeToTerms: false
  });
  
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formDataToSend = new FormData();
      
      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });
      
      // Append files
      files.forEach((file) => {
        formDataToSend.append('files', file);
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setShowSuccessModal(true);
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        address: '',
        city: '',
        zip: '',
        service: '', 
        message: '',
        contactMethod: '',
        contactTime: '',
        agreeToTerms: false
      });
      setFiles([]);
      setCurrentStep(1);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      // Phone number validation - only allow numbers and format
      if (name === 'phone') {
        const cleaned = value.replace(/\D/g, ''); // Remove non-digits
        if (cleaned.length <= 10) {
          setFormData({ ...formData, [name]: cleaned });
        }
      }
      // ZIP code validation - only allow numbers, max 5 digits
      else if (name === 'zip') {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length <= 5) {
          setFormData({ ...formData, [name]: cleaned });
        }
      }
      // Default for other fields
      else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return phone.length === 10;
  };

  const formatPhoneForDisplay = (phone: string): string => {
    if (phone.length === 0) return '';
    if (phone.length <= 3) return phone;
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles = newFiles.filter(file => {
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        const isUnder10MB = file.size <= 10 * 1024 * 1024;
        
        if (!isImage && !isVideo) {
          alert(`${file.name} is not an image or video`);
          return false;
        }
        if (!isUnder10MB) {
          alert(`${file.name} is larger than 10MB`);
          return false;
        }
        return true;
      });
      
      setFiles(prev => [...prev, ...validFiles].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate all required fields are filled
      if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.zip) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Validate email format
      if (!validateEmail(formData.email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Validate phone number
      if (!validatePhone(formData.phone)) {
        alert('Please enter a valid 10-digit phone number');
        return;
      }
      
      // Validate ZIP code
      if (formData.zip.length !== 5) {
        alert('Please enter a valid 5-digit ZIP code');
        return;
      }
    }
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  return (
    <>
      <section id="contact" className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="min-w-0">
              <AnimatedSection className='' animation='fade-up'>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Get Your Free Quote</h2>
                <p className="text-gray-600 mb-8">Ready to start your project? Fill out the form and we&apos;ll get back to you within 24 hours.</p>
              
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-[#ccb78a] flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-black">Phone</p>
                      <a
                        href="tel:512-999-4366"
                        className="text-gray-600 hover:text-[#ccb78a] transition"
                      >
                        (512) 999-4366
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-[#ccb78a] flex-shrink-0" />
                    <div className="min-w-0 break-words">
                      <p className="font-semibold text-black">Email</p>
                      <a
                        href='mailto:ptroofingandrenovations.info@gmail.com'
                        className='text-gray-600 hover:text-[#ccb78a] transition break-all'
                      >
                        ptroofingandrenovations.info@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-[#ccb78a] flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-black">Address</p>
                      <a
                        href="https://www.google.com/maps/place/2500+W+William+Cannon+Dr,+Suite+607,+Austin,+TX+78745"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:underline"
                      >
                        <p>2500 W William Cannon Dr.</p>
                        <p>Suite 607</p>
                        <p>Austin, TX 78745</p>
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection className="bg-white p-8 rounded-lg shadow-lg min-w-0" animation='fade-left'>
              <div className="flex items-center justify-between mb-6">
                <button 
                  type='button'
                  onClick={() => currentStep === 2 && prevStep()}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 disabled:cursor-not-allowed"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${currentStep === 1 ? 'bg-[#ccb78a] text-white' : 'bg-gray-200 text-gray-600'}`}>
                    1
                  </div>
                  <span className={`text-sm hidden sm:inline ${currentStep === 1 ? 'text-[#ccb78a] font-semibold' : 'text-gray-600'}`}>
                    Contact Info
                  </span>
                </button>
                <div className="flex-1 h-1 bg-gray-200 mx-2 sm:mx-4">
                  <div className={`h-full transition-all duration-300 ${currentStep >= 2 ? 'bg-[#ccb78a] w-full' : 'bg-gray-200 w-0'}`} />
                </div>
                <button 
                  type='button'
                  onClick={() => currentStep === 1 && nextStep()}
                  disabled={currentStep === 2}
                  className="flex items-center gap-2 disabled:cursor-not-allowed"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${currentStep >= 2 ? 'bg-[#ccb78a] text-white' : 'bg-gray-200 text-gray-600'}`}>
                    2
                  </div>
                  <span className={`text-sm hidden sm:inline ${currentStep >= 2 ? 'text-[#ccb78a] font-semibold' : 'text-gray-600'}`}>
                    Project Details
                  </span>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">Name*</label>
                      <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder='John Doe'
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccb78a]"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">Email*</label>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        title="Please enter a valid email address"
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccb78a]"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">Phone*</label>
                      <input 
                        type="tel"
                        name="phone"
                        value={formatPhoneForDisplay(formData.phone)}
                        onChange={handleChange}
                        required
                        placeholder="(555) 123-4567"
                        title="Please enter a 10-digit phone number"
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccb78a]"
                      />
                      {formData.phone && !validatePhone(formData.phone) && (
                        <p className="text-red-500 text-sm mt-1">Phone number must be 10 digits</p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">Address*</label>
                      <input 
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder='123 main st.'
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccb78a]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">City*</label>
                        <input 
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          placeholder='Austin'
                          className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccb78a]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">ZIP Code*</label>
                        <input 
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          required
                          placeholder="12345"
                          maxLength={5}
                          pattern="[0-9]{5}"
                          title="Please enter a 5-digit ZIP code"
                          className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccb78a]"
                        />
                        {formData.zip && formData.zip.length !== 5 && formData.zip.length > 0 && (
                          <p className="text-red-500 text-sm mt-1">ZIP code must be 5 digits</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full bg-[#ccb78a] text-white py-3 rounded-lg font-semibold hover:bg-[#a1916e] transition flex items-center justify-center gap-2"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">Service*</label>
                      <select 
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccb78a]"
                      >
                        <option value="">Select a service</option>
                        <option value="roofing">Roofing</option>
                        <option value="siding">Siding</option>
                        <option value="painting">Painting</option>
                        <option value="windows">Windows</option>
                        <option value="interior">Interior</option>
                        <option value="patio">Patio</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">Project Details*</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        required
                        className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccb78a]"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">Preferred Contact Method*</label>
                      <select 
                        name="contactMethod"
                        value={formData.contactMethod}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccb78a]"
                      >
                        <option value="">Select contact method</option>
                        <option value="call">Call</option>
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">Preferred Contact Time*</label>
                      <select 
                        name="contactTime"
                        value={formData.contactTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ccb78a]"
                      >
                        <option value="">Select contact time</option>
                        <option value="morning">Morning (8am - 12pm)</option>
                        <option value="afternoon">Afternoon (12pm - 5pm)</option>
                        <option value="evening">Evening (5pm - 8pm)</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Photos/Videos (Optional)
                        <span className="text-sm font-normal text-gray-500 ml-2">Max 5 files, 10MB each</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#ccb78a] transition">
                        <input 
                          type="file"
                          id="file-upload"
                          multiple
                          accept="image/*,video/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-gray-600">Click to upload or drag and drop</p>
                          <p className="text-sm text-gray-500">Images or videos only</p>
                        </label>
                      </div>
                      
                      {files.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <span className="text-sm text-gray-700 truncate flex-1 min-w-0">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="ml-2 text-red-500 hover:text-red-700 flex-shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input 
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          required
                          className="mt-1 w-4 h-4 text-[#ccb78a] border-gray-300 rounded focus:ring-[#ccb78a] flex-shrink-0"
                        />
                        <span className="text-sm text-gray-700">
                          I agree to the <a href="/terms" className="text-[#ccb78a] hover:underline">terms and conditions</a> and consent to being contacted about my project.*
                        </span>
                      </label>
                    </div>
                    
                    {submitStatus === 'error' && (
                      <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        Something went wrong. Please try again or call us directly.
                      </div>
                    )}

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center gap-2"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Back
                      </button>
                      <button 
                        type="submit"
                        disabled={isSubmitting || !formData.agreeToTerms}
                        className="flex-1 bg-[#ccb78a] text-white py-3 rounded-lg font-semibold hover:bg-[#a1916e] transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Submit Request'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </AnimatedSection>            
          </div>
        </div>
      </section>

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </>
  );
}