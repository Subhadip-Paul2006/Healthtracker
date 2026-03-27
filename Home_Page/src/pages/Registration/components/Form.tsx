import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Eye, EyeOff, MapPin } from 'lucide-react';

export interface PatientFormState {
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  mobile: string;
  email: string;
  address: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  password: string;
  confirmPassword: string;
  otp: string[];
  agreed: boolean;
}

const Form: React.FC = () => {
  const [formState, setFormState] = useState<PatientFormState>({
    firstName: '',
    lastName: '',
    gender: 'Male',
    dob: '',
    mobile: '',
    email: '',
    address: '',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    city: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    otp: Array(6).fill(''),
    agreed: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Form card entrance animation
    gsap.fromTo(
      formCardRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.4 }
    );
  }, []);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    gsap.to(e.target, { scale: 1.01, duration: 0.15 });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    gsap.to(e.target, { scale: 1, duration: 0.15 });
  };

  const handleBtnEnter = () => {
    gsap.to(btnRef.current, { scale: 1.02, duration: 0.15 });
  };

  const handleBtnLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.15 });
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1); // Prevent multiple chars
    const newOtp = [...formState.otp];
    newOtp[index] = value;
    setFormState({ ...formState, otp: newOtp });

    // Auto-advance
    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !formState.otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form State:', formState);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const updateField = (field: keyof PatientFormState, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const inputClass = `w-full bg-ivory border border-coffee/20 rounded-lg px-4 py-2.5 text-sm text-coffee placeholder:text-coffee/40 focus:outline-none focus:border-burnt focus:ring-1 focus:ring-burnt/30 transition-all duration-150`;

  return (
    <div ref={formCardRef} className="bg-sand rounded-2xl shadow-xl p-8 opacity-0">
      <h2 className="text-2xl font-bold text-coffee">Create Your Patient Account</h2>
      <p className="text-sm text-coffee/60 mt-1">Join over 10k users in the health sanctuary.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
        
        {/* Section 1 - BASIC INFO */}
        <div>
          <h3 className="text-[11px] font-semibold tracking-widest text-coffee/50 uppercase mb-3">BASIC INFO</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-coffee mb-1">First Name</label>
              <input 
                type="text" 
                className={inputClass} 
                placeholder="John"
                value={formState.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee mb-1">Last Name</label>
              <input 
                type="text" 
                className={inputClass} 
                placeholder="Doe"
                value={formState.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-coffee mb-1">Gender</label>
              <div className="flex items-center gap-2">
                {['Male', 'Female', 'Other'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => updateField('gender', g)}
                    className={formState.gender === g 
                      ? 'bg-white border border-burnt text-coffee font-semibold rounded-lg px-4 py-2 text-sm transition-all'
                      : 'bg-transparent border border-coffee/20 text-coffee/60 rounded-lg px-4 py-2 text-sm hover:border-coffee/30 transition-all'
                    }
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee mb-1">Date of Birth</label>
              <input 
                type="date" 
                className={inputClass} 
                placeholder="mm/dd/yyyy"
                value={formState.dob}
                onChange={(e) => updateField('dob', e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>

        {/* Section 2 - CONTACT DETAILS */}
        <div>
          <h3 className="text-[11px] font-semibold tracking-widest text-coffee/50 uppercase mb-3">CONTACT DETAILS</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-coffee mb-1">Mobile Number</label>
              <div className="flex items-center border border-coffee/20 rounded-lg overflow-hidden bg-ivory focus-within:border-burnt focus-within:ring-1 focus-within:ring-burnt/30 transition-all duration-150">
                <span className="px-3 py-2 bg-ivory border-r border-coffee/20 text-coffee text-sm font-medium">+91</span>
                <input 
                  type="tel" 
                  className="flex-1 px-3 py-2 bg-transparent outline-none text-coffee text-sm placeholder:text-coffee/40" 
                  placeholder="98765 43210"
                  value={formState.mobile}
                  onChange={(e) => updateField('mobile', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee mb-1">Email Address</label>
              <input 
                type="email" 
                className={inputClass} 
                placeholder="john.doe@example.com"
                value={formState.email}
                onChange={(e) => updateField('email', e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>

        {/* Section 3 - LOCATION */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[11px] font-semibold tracking-widest text-coffee/50 uppercase m-0">LOCATION</h3>
            <button type="button" className="flex items-center gap-1 text-sm text-burnt hover:underline cursor-pointer">
              <MapPin className="w-4 h-4" /> Pick on Map
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-coffee mb-1">Address Line</label>
            <input 
              type="text" 
              className={inputClass} 
              placeholder="Street, Building, Apartment"
              value={formState.address}
              onChange={(e) => updateField('address', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-coffee mb-1">State</label>
              <select 
                className={`${inputClass} appearance-none bg-no-repeat`}
                style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, #3B2F2F 50%), linear-gradient(135deg, #3B2F2F 50%, transparent 50%)', backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)', backgroundSize: '5px 5px, 5px 5px' }}
                value={formState.state}
                onChange={(e) => updateField('state', e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee mb-1">District</label>
              <select 
                className={`${inputClass} appearance-none bg-no-repeat`}
                style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, #3B2F2F 50%), linear-gradient(135deg, #3B2F2F 50%, transparent 50%)', backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)', backgroundSize: '5px 5px, 5px 5px' }}
                value={formState.district}
                onChange={(e) => updateField('district', e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                <option value="Mumbai Suburban">Mumbai Suburban</option>
                <option value="Pune">Pune</option>
                <option value="Thane">Thane</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-coffee mb-1">City / Village</label>
              <input 
                type="text" 
                className={inputClass} 
                placeholder="Enter locality"
                value={formState.city}
                onChange={(e) => updateField('city', e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee mb-1">Pincode</label>
              <input 
                type="text" 
                className={inputClass} 
                placeholder="400001"
                value={formState.pincode}
                onChange={(e) => updateField('pincode', e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>

        {/* Section 4 - ACCOUNT SETUP */}
        <div>
          <h3 className="text-[11px] font-semibold tracking-widest text-coffee/50 uppercase mb-3">ACCOUNT SETUP</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <label className="block text-sm font-medium text-coffee mb-1">Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                className={inputClass} 
                placeholder="••••••••"
                value={formState.password}
                onChange={(e) => updateField('password', e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[32px] text-coffee/40 hover:text-coffee/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-coffee mb-1">Confirm Password</label>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                className={inputClass} 
                placeholder="••••••••"
                value={formState.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[32px] text-coffee/40 hover:text-coffee/60 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="text-center w-full">
            <label className="block text-sm font-medium text-coffee mb-3">OTP Verification</label>
            <div className="flex items-center justify-center gap-2">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <input
                  key={idx}
                  ref={(el) => (otpRefs.current[idx] = el)}
                  type="text"
                  maxLength={1}
                  className="w-11 h-11 text-center text-lg font-medium text-coffee border border-coffee/20 rounded-lg bg-[#d9d0c0] focus:border-burnt focus:ring-1 focus:ring-burnt outline-none transition-all duration-150"
                  value={formState.otp[idx]}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Section 5 - TERMS & CTA */}
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-6">
            <input 
              type="checkbox" 
              id="terms"
              className="w-4 h-4 rounded border-coffee/20 text-burnt accent-burnt focus:ring-burnt cursor-pointer"
              checked={formState.agreed}
              onChange={(e) => updateField('agreed', e.target.checked)}
            />
            <label htmlFor="terms" className="text-sm text-coffee">
              I agree to the <a href="#" className="text-burnt underline cursor-pointer">Terms & Conditions</a> and <a href="#" className="text-burnt underline cursor-pointer">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            ref={btnRef}
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
            className="w-full bg-burnt hover:bg-[#c05a20] text-white font-semibold text-base py-3 rounded-xl transition-colors duration-200 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Send OTP"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default Form;
