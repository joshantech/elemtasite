'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Confetti, type ConfettiRef } from '../components/ui/confetti';
import confetti from 'canvas-confetti';
import StaggeredMenu from '../components/StaggeredMenu';

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

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Projects', ariaLabel: 'View our projects', link: '/projects' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Instagram', link: 'https://www.instagram.com/elemtta/' },
  { label: 'Facebook', link: 'https://www.facebook.com/Elemtta?mibextid=wwXIfr&rdid=L9V1whliPJ5fvbRl&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CVYQ1XdNY%2F%3Fmibextid%3DwwXIfr#' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/company/elemta' }
];

export default function GetStartedPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showForm, setShowForm] = useState(true);
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
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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

      // Fade out form
      setShowForm(false);
      
      // Show success screen after form fades out
      setTimeout(() => {
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
      }, 500);
      
      // Reset form
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

  return (
    <div className="fixed inset-0 bg-black z-[9999] overflow-hidden">
      {/* Navigation Menu */}
      <div className="relative z-50">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={false}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['#C0C0C0', '#808080']}
          logoUrl="/favicon.ico"
          accentColor="#C0C0C0"
          isFixed={false}
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
      </div>

      {/* Confetti canvas - full viewport */}
      {showSuccess && (
        <Confetti
          ref={confettiRef}
          className="fixed inset-0 z-[1] w-full h-full pointer-events-none"
          manualstart={true}
        />
      )}

      {/* Form Section */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center p-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            style={{ pointerEvents: 'auto' }}
          >
            <div className="w-full max-w-2xl relative" style={{ pointerEvents: 'auto' }}>
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
                                    <SelectContent className="bg-black border-white/30 text-white" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
                                      <SelectItem value="+1" className="focus:bg-white/10">US +1</SelectItem>
                                      <SelectItem value="+44" className="focus:bg-white/10">UK +44</SelectItem>
                                      <SelectItem value="+33" className="focus:bg-white/10">FR +33</SelectItem>
                                      <SelectItem value="+49" className="focus:bg-white/10">DE +49</SelectItem>
                                      <SelectItem value="+81" className="focus:bg-white/10">JP +81</SelectItem>
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
              <motion.div
                className="mt-4 text-center text-sm text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}
              >
                Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Screen */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-20 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex flex-col items-center justify-center py-8 min-h-[400px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
