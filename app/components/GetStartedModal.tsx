'use client';

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ShootingStars } from './ui/shooting-stars';
import { Confetti, type ConfettiRef } from './ui/confetti';
import confetti from 'canvas-confetti';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { id: 'personal', title: 'Personal Info' },
  { id: 'business', title: 'Business Details' },
  { id: 'services', title: 'Services' },
  { id: 'additional', title: 'Additional Info' },
];

interface FormData {
  first_name: string;
  last_name: string;
  business_name: string;
  phone_country_code: string;
  phone_number: string;
  email: string;
  website: string;
  services: string[];
  other_info: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

const serviceOptions = ['Website', 'Software', 'AI Automations', 'Marketing & Branding', 'Other'];

export default function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    business_name: '',
    phone_country_code: '+1',
    phone_number: '',
    email: '',
    website: '',
    services: [],
    other_info: '',
  });

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
        other_info: '',
      });
      setCurrentStep(0);
      setShowSuccess(false);
    }, 200);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const services = [...prev.services];
      if (services.includes(service)) {
        return { ...prev, services: services.filter((s) => s !== service) };
      } else {
        return { ...prev, services: [...services, service] };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

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

      // Show success screen
      setShowSuccess(true);
      setIsSubmitting(false);
      
      // Trigger confetti animation
      setTimeout(() => {
        // Fireworks effect
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        const randomInRange = (min: number, max: number) =>
          Math.random() * (max - min) + min;

        const interval = window.setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          });
        }, 250);

        // Also fire from center
        confettiRef.current?.fire({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }, 100);
      
      // Reset form after showing success
      setFormData({
        first_name: '',
        last_name: '',
        business_name: '',
        phone_country_code: '+1',
        phone_number: '',
        email: '',
        website: '',
        services: [],
        other_info: '',
      });
      setCurrentStep(0);
    } catch (error: any) {
      console.error('Get started form error:', error);
      toast.error('Sorry, there was an error sending your message. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Check if step is valid for next button
  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.first_name.trim() !== '' && formData.last_name.trim() !== '' && formData.email.trim() !== '';
      case 1:
        return formData.business_name.trim() !== '' && formData.phone_number.trim() !== '';
      case 2:
        return formData.services.length > 0;
      default:
        return true;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-200',
        isAnimating ? 'opacity-100' : 'opacity-0'
      )}
      onClick={handleBackdropClick}
      aria-hidden={!isOpen}
    >
      {/* Background with Shooting Stars */}
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
        className={cn(
          'relative z-10 w-full max-w-2xl bg-black border border-white/20 rounded-3xl shadow-[0_0_20px_rgba(255,255,255,0.3)] max-h-[90vh] overflow-y-auto transition-transform duration-200',
          isAnimating ? 'scale-100' : 'scale-95'
        )}
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

        {/* Confetti canvas - positioned absolutely behind content */}
        {showSuccess && (
          <Confetti
            ref={confettiRef}
            className="absolute left-0 top-0 z-[1] w-full h-full pointer-events-none"
            manualstart={true}
          />
        )}

        <div className="p-6 sm:p-8 md:p-10">
          {showSuccess ? (
            /* Success Screen */
            <motion.div
              className="flex flex-col items-center justify-center py-8 min-h-[400px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src="/images/BottomHomePage.svg"
                alt="Success"
                className="w-full max-w-[600px] mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <motion.p
                className="text-white text-xl md:text-2xl text-center"
                style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Will be in touch with you shortly
              </motion.p>
            </motion.div>
          ) : (
            <>
              {/* Progress indicator */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    className={cn(
                      'w-4 h-4 rounded-full cursor-pointer transition-colors duration-300',
                      index < currentStep
                        ? 'bg-white'
                        : index === currentStep
                          ? 'bg-white ring-4 ring-white/20'
                          : 'bg-white/30',
                    )}
                    onClick={() => {
                      // Only allow going back or to completed steps
                      if (index <= currentStep) {
                        setCurrentStep(index);
                      }
                    }}
                    whileTap={{ scale: 0.95 }}
                  />
                  <motion.span
                    className={cn(
                      'text-sm md:text-base mt-1.5 hidden sm:block text-white',
                      index === currentStep
                        ? 'font-medium'
                        : 'opacity-70',
                    )}
                    style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                  >
                    {step.title}
                  </motion.span>
                </motion.div>
              ))}
            </div>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-white/20 shadow-md rounded-3xl overflow-hidden bg-transparent text-white">
              <div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                  >
                    {/* Step 1: Personal Info */}
                    {currentStep === 0 && (
                      <>
                        <CardHeader>
                          <CardTitle className="text-white" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                            Tell us about yourself
                          </CardTitle>
                          <CardDescription className="text-white/70" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                            Let&apos;s start with some basic information
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label htmlFor="first_name" className="text-white" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                              First Name <span className="text-gray-400">*</span>
                            </Label>
                            <Input
                              id="first_name"
                              placeholder="John"
                              value={formData.first_name}
                              onChange={(e) => updateFormData('first_name', e.target.value)}
                              className="bg-transparent border-white/30 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/20 focus:border-white transition-all"
                              style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                            />
                          </motion.div>
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label htmlFor="last_name" className="text-white" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                              Last Name <span className="text-gray-400">*</span>
                            </Label>
                            <Input
                              id="last_name"
                              placeholder="Doe"
                              value={formData.last_name}
                              onChange={(e) => updateFormData('last_name', e.target.value)}
                              className="bg-transparent border-white/30 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/20 focus:border-white transition-all"
                              style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                            />
                          </motion.div>
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label htmlFor="email" className="text-white" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                              Email Address <span className="text-gray-400">*</span>
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={(e) => updateFormData('email', e.target.value)}
                              className="bg-transparent border-white/30 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/20 focus:border-white transition-all"
                              style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                            />
                          </motion.div>
                        </CardContent>
                      </>
                    )}

                    {/* Step 2: Business Details */}
                    {currentStep === 1 && (
                      <>
                        <CardHeader>
                          <CardTitle className="text-white" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                            Business Details
                          </CardTitle>
                          <CardDescription className="text-white/70" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                            Tell us about your business
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label htmlFor="business_name" className="text-white" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                              Business Name <span className="text-gray-400">*</span>
                            </Label>
                            <Input
                              id="business_name"
                              placeholder="Your Company"
                              value={formData.business_name}
                              onChange={(e) => updateFormData('business_name', e.target.value)}
                              className="bg-transparent border-white/30 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/20 focus:border-white transition-all"
                              style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                            />
                          </motion.div>

                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label htmlFor="phone_number" className="text-white" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                              Phone Number <span className="text-gray-400">*</span>
                            </Label>
                            <div className="flex gap-2">
                              <Select
                                value={formData.phone_country_code}
                                onValueChange={(value) => updateFormData('phone_country_code', value)}
                              >
                                <SelectTrigger className="w-[120px] bg-transparent border-white/30 text-white focus:ring-2 focus:ring-white/20 focus:border-white" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-black border-white/30 text-white max-h-[300px]" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                                  <SelectItem value="+1" className="focus:bg-white/10">US/CA +1</SelectItem>
                                  <SelectItem value="+44" className="focus:bg-white/10">UK +44</SelectItem>
                                  <SelectItem value="+33" className="focus:bg-white/10">FR +33</SelectItem>
                                  <SelectItem value="+49" className="focus:bg-white/10">DE +49</SelectItem>
                                  <SelectItem value="+81" className="focus:bg-white/10">JP +81</SelectItem>
                                  <SelectItem value="+61" className="focus:bg-white/10">AU +61</SelectItem>
                                  <SelectItem value="+86" className="focus:bg-white/10">CN +86</SelectItem>
                                  <SelectItem value="+91" className="focus:bg-white/10">IN +91</SelectItem>
                                  <SelectItem value="+55" className="focus:bg-white/10">BR +55</SelectItem>
                                  <SelectItem value="+52" className="focus:bg-white/10">MX +52</SelectItem>
                                  <SelectItem value="+34" className="focus:bg-white/10">ES +34</SelectItem>
                                  <SelectItem value="+39" className="focus:bg-white/10">IT +39</SelectItem>
                                  <SelectItem value="+31" className="focus:bg-white/10">NL +31</SelectItem>
                                  <SelectItem value="+46" className="focus:bg-white/10">SE +46</SelectItem>
                                  <SelectItem value="+47" className="focus:bg-white/10">NO +47</SelectItem>
                                  <SelectItem value="+45" className="focus:bg-white/10">DK +45</SelectItem>
                                  <SelectItem value="+358" className="focus:bg-white/10">FI +358</SelectItem>
                                  <SelectItem value="+48" className="focus:bg-white/10">PL +48</SelectItem>
                                  <SelectItem value="+41" className="focus:bg-white/10">CH +41</SelectItem>
                                  <SelectItem value="+43" className="focus:bg-white/10">AT +43</SelectItem>
                                  <SelectItem value="+32" className="focus:bg-white/10">BE +32</SelectItem>
                                  <SelectItem value="+351" className="focus:bg-white/10">PT +351</SelectItem>
                                  <SelectItem value="+353" className="focus:bg-white/10">IE +353</SelectItem>
                                  <SelectItem value="+64" className="focus:bg-white/10">NZ +64</SelectItem>
                                  <SelectItem value="+65" className="focus:bg-white/10">SG +65</SelectItem>
                                  <SelectItem value="+852" className="focus:bg-white/10">HK +852</SelectItem>
                                  <SelectItem value="+82" className="focus:bg-white/10">KR +82</SelectItem>
                                  <SelectItem value="+886" className="focus:bg-white/10">TW +886</SelectItem>
                                  <SelectItem value="+60" className="focus:bg-white/10">MY +60</SelectItem>
                                  <SelectItem value="+63" className="focus:bg-white/10">PH +63</SelectItem>
                                  <SelectItem value="+66" className="focus:bg-white/10">TH +66</SelectItem>
                                  <SelectItem value="+62" className="focus:bg-white/10">ID +62</SelectItem>
                                  <SelectItem value="+84" className="focus:bg-white/10">VN +84</SelectItem>
                                  <SelectItem value="+971" className="focus:bg-white/10">AE +971</SelectItem>
                                  <SelectItem value="+966" className="focus:bg-white/10">SA +966</SelectItem>
                                  <SelectItem value="+972" className="focus:bg-white/10">IL +972</SelectItem>
                                  <SelectItem value="+90" className="focus:bg-white/10">TR +90</SelectItem>
                                  <SelectItem value="+20" className="focus:bg-white/10">EG +20</SelectItem>
                                  <SelectItem value="+27" className="focus:bg-white/10">ZA +27</SelectItem>
                                  <SelectItem value="+234" className="focus:bg-white/10">NG +234</SelectItem>
                                  <SelectItem value="+254" className="focus:bg-white/10">KE +254</SelectItem>
                                  <SelectItem value="+7" className="focus:bg-white/10">RU +7</SelectItem>
                                  <SelectItem value="+380" className="focus:bg-white/10">UA +380</SelectItem>
                                  <SelectItem value="+30" className="focus:bg-white/10">GR +30</SelectItem>
                                  <SelectItem value="+420" className="focus:bg-white/10">CZ +420</SelectItem>
                                  <SelectItem value="+36" className="focus:bg-white/10">HU +36</SelectItem>
                                  <SelectItem value="+40" className="focus:bg-white/10">RO +40</SelectItem>
                                  <SelectItem value="+54" className="focus:bg-white/10">AR +54</SelectItem>
                                  <SelectItem value="+56" className="focus:bg-white/10">CL +56</SelectItem>
                                  <SelectItem value="+57" className="focus:bg-white/10">CO +57</SelectItem>
                                  <SelectItem value="+51" className="focus:bg-white/10">PE +51</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input
                                id="phone_number"
                                type="tel"
                                placeholder="Phone number"
                                value={formData.phone_number}
                                onChange={(e) => updateFormData('phone_number', e.target.value)}
                                className="flex-1 bg-transparent border-white/30 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/20 focus:border-white transition-all"
                                style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                              />
                            </div>
                          </motion.div>

                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label htmlFor="website" className="text-white" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                              Website <span className="text-gray-400">(Optional)</span>
                            </Label>
                            <Input
                              id="website"
                              type="url"
                              placeholder="https://"
                              value={formData.website}
                              onChange={(e) => updateFormData('website', e.target.value)}
                              className="bg-transparent border-white/30 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/20 focus:border-white transition-all"
                              style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                            />
                          </motion.div>
                        </CardContent>
                      </>
                    )}

                    {/* Step 3: Services */}
                    {currentStep === 2 && (
                      <>
                        <CardHeader>
                          <CardTitle className="text-white" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                            Services of Interest
                          </CardTitle>
                          <CardDescription className="text-white/70" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                            Which services are you interested in? <span className="text-gray-400">*</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <div className="grid grid-cols-1 gap-2">
                              {serviceOptions.map((service, index) => (
                                <motion.div
                                  key={service}
                                  className="flex items-center space-x-2 rounded-md border border-white/30 p-3 cursor-pointer hover:bg-white/10 transition-colors"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  transition={{ duration: 0.2 }}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                      delay: 0.05 * index,
                                      duration: 0.3,
                                    },
                                  }}
                                  onClick={() => toggleService(service)}
                                >
                                  <Checkbox
                                    id={`service-${service}`}
                                    checked={formData.services.includes(service)}
                                    onCheckedChange={() => toggleService(service)}
                                    className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:border-white"
                                  />
                                  <Label
                                    htmlFor={`service-${service}`}
                                    className="cursor-pointer w-full text-white"
                                    style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                                  >
                                    {service}
                                  </Label>
                                </motion.div>
                              ))}
                            </div>
                            {formData.services.length === 0 && (
                              <p className="text-red-400 text-xs mt-1" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                                Please select at least one service
                              </p>
                            )}
                          </motion.div>
                        </CardContent>
                      </>
                    )}

                    {/* Step 4: Additional Info */}
                    {currentStep === 3 && (
                      <>
                        <CardHeader>
                          <CardTitle className="text-white" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                            Additional Information
                          </CardTitle>
                          <CardDescription className="text-white/70" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                            Anything else we should know?
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label htmlFor="other_info" className="text-white" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                              Any Other Information
                            </Label>
                            <Textarea
                              id="other_info"
                              placeholder="Tell us more about your project..."
                              value={formData.other_info}
                              onChange={(e) => updateFormData('other_info', e.target.value)}
                              className="min-h-[120px] bg-transparent border-white/30 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/20 focus:border-white transition-all"
                              style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                            />
                          </motion.div>
                        </CardContent>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                <CardFooter className="flex justify-between pt-6 pb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className="flex items-center gap-1 transition-all duration-300 rounded-2xl border-white/30 text-white hover:bg-white/10 disabled:opacity-50"
                      style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                    >
                      <ChevronLeft className="h-4 w-4" /> Back
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="button"
                      onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
                      disabled={!isStepValid() || isSubmitting}
                      className="flex items-center gap-1 transition-all duration-300 rounded-2xl bg-white text-black hover:bg-white/90 disabled:opacity-50"
                      style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                          {currentStep === steps.length - 1 ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </>
                      )}
                    </Button>
                  </motion.div>
                </CardFooter>
              </div>
            </Card>
          </motion.div>

          {/* Step indicator */}
          {!showSuccess && (
            <motion.div
              className="mt-4 text-center text-sm text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
            >
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </motion.div>
          )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
