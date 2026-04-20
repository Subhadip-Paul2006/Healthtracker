import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Eye, EyeOff, MapPin, Search, Camera, Minus, Plus, FileText, Shield, Upload, Building2, CreditCard } from 'lucide-react';

// ─── TypeScript interfaces ────────────────────────────────────────────────────

interface DoctorFormState {
  photo: string | null;
  fullName: string;
  gender: string;
  dob: string;
  registrationNumber: string;
  medicalCouncil: string;
  yearsExperience: number;
  mobile: string;
  alternateMobile: string;
  email: string;
  address: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  primaryDegree: string;
  additionalDegrees: string;
  specializations: string[];
  languages: string[];
  bio: string;
  awards: string;
  linkedFacility: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  otp: string[];
  agreed: boolean;
  isLoading: boolean;
}

// ─── District map ─────────────────────────────────────────────────────────────

const districtMap: Record<string, string[]> = {
  Maharashtra: ['Mumbai Suburban', 'Pune', 'Thane', 'Nashik', 'Nagpur'],
  Delhi: ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi'],
  Karnataka: ['Bengaluru Urban', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
  'West Bengal': ['Kolkata', 'Howrah', 'Darjeeling', 'Asansol', 'Siliguri'],
};

const specializationOptions = [
  'Cardiology', 'Internal Medicine', 'Neurology', 'Orthopedics',
  'Pediatrics', 'Dermatology', 'Oncology', 'Psychiatry',
  'Gynecology', 'Ophthalmology', 'ENT', 'Urology',
];

const languageOptions = ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi'];

// ─── Shared input class ───────────────────────────────────────────────────────

const inputClass =
  'w-full bg-[#ddd0b8] border border-coffee/20 rounded-lg px-4 py-2.5 text-sm text-coffee placeholder:text-coffee/40 focus:outline-none focus:border-burnt focus:ring-1 focus:ring-burnt/25 transition-all duration-150';

const labelClass = 'block text-sm font-medium text-coffee mb-1';

const sectionLabelClass =
  'text-[11px] font-bold tracking-widest text-coffee/50 uppercase mt-6 mb-4';

// ─── Form component ───────────────────────────────────────────────────────────

const Form: React.FC = () => {
  const [form, setForm] = useState<DoctorFormState>({
    photo: null,
    fullName: '',
    gender: '',
    dob: '',
    registrationNumber: '',
    medicalCouncil: '',
    yearsExperience: 5,
    mobile: '',
    alternateMobile: '',
    email: '',
    address: '',
    state: '',
    district: '',
    city: '',
    pincode: '',
    primaryDegree: '',
    additionalDegrees: '',
    specializations: ['Cardiology', 'Internal Medicine'],
    languages: ['English', 'Hindi'],
    bio: '',
    awards: '',
    linkedFacility: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    otp: Array(6).fill(''),
    agreed: false,
    isLoading: false,
  });

  const [photoUploaded, setPhotoUploaded] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  const update = <K extends keyof DoctorFormState>(field: K, value: DoctorFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // GSAP form sections stagger
  useEffect(() => {
    const sections = document.querySelectorAll('.form-section');
    gsap.fromTo(
      sections,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out', delay: 0.7 }
    );
  }, []);

  // Input focus micro-animation
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, { scale: 1.01, duration: 0.12 });
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, { scale: 1, duration: 0.12 });
  };

  // OTP handlers
  const handleOtpChange = (index: number, value: string) => {
    const cleaned = value.slice(-1);
    const newOtp = [...form.otp];
    newOtp[index] = cleaned;
    update('otp', newOtp);
    if (cleaned && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !form.otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Chip helpers
  const removeSpecialization = (chip: string) => {
    update('specializations', form.specializations.filter((s) => s !== chip));
  };
  const addSpecialization = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val && !form.specializations.includes(val)) {
      update('specializations', [...form.specializations, val]);
    }
    e.target.value = '';
  };
  const removeLanguage = (lang: string) => {
    update('languages', form.languages.filter((l) => l !== lang));
  };
  const addLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val && !form.languages.includes(val)) {
      update('languages', [...form.languages, val]);
    }
    e.target.value = '';
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update('isLoading', true);
    if (btnRef.current) {
      gsap.to(btnRef.current, { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 });
    }
    setTimeout(() => {
      update('isLoading', false);
    }, 1500);
  };

  const handleBtnEnter = () => {
    gsap.to(btnRef.current, { scale: 1.02, duration: 0.15 });
  };
  const handleBtnLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.15 });
  };

  const districts = form.state ? (districtMap[form.state] ?? []) : [];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">

      {/* Card Header */}
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-coffee">Welcome Doctor !!!</h2>
        <p className="text-sm text-coffee/55 mt-1">Connect and serve patients across India</p>
      </div>

      {/* ────────────────────────────────────────────────────── */}
      {/* SECTION 1 — BASIC INFO */}
      {/* ────────────────────────────────────────────────────── */}
      <div className="form-section opacity-0">
        <p className={sectionLabelClass}>BASIC INFO</p>

        {/* Profile Photo + Full Name */}
        <div className="flex items-start gap-5">
          {/* Photo upload circle */}
          <button
            type="button"
            id="photo-upload-btn"
            aria-label="Upload profile photo"
            onClick={() => setPhotoUploaded(!photoUploaded)}
            className="w-16 h-16 rounded-full bg-[#ddd0b8] border-2 border-coffee/20 flex items-center justify-center relative cursor-pointer flex-shrink-0 hover:border-burnt/40 transition-colors"
          >
            {photoUploaded ? (
              <span className="text-[9px] text-coffee/60 font-medium">Photo</span>
            ) : (
              <div className="flex flex-col items-center gap-0.5">
                <Camera className="w-6 h-6 text-coffee/40" />
                <span className="text-[9px] text-coffee/40">photo</span>
              </div>
            )}
            {/* Edit badge */}
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-burnt flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 text-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 1.5L10.5 3.5L4 10H2V8L8.5 1.5Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          {/* Full Name */}
          <div className="flex-1">
            <label className={labelClass} htmlFor="full-name">Full Name</label>
            <input
              id="full-name"
              type="text"
              className={inputClass}
              placeholder="Dr. Jane Smith"
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>

        {/* Gender + Date of Birth */}
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <label className={labelClass} htmlFor="gender-select">Gender</label>
            <select
              id="gender-select"
              className={inputClass}
              value={form.gender}
              onChange={(e) => update('gender', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              type="date"
              className={inputClass}
              value={form.dob}
              onChange={(e) => update('dob', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>

        {/* Registration Number + Medical Council + Years of Experience */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className={labelClass} htmlFor="reg-number">Registration Number</label>
            <input
              id="reg-number"
              type="text"
              className={inputClass}
              placeholder="REG-12345"
              value={form.registrationNumber}
              onChange={(e) => update('registrationNumber', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="medical-council">Medical Council</label>
            <select
              id="medical-council"
              className={inputClass}
              value={form.medicalCouncil}
              onChange={(e) => update('medicalCouncil', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="">Select Council</option>
              <option value="MCI">MCI</option>
              <option value="State Medical Council">State Medical Council</option>
              <option value="NMC">NMC</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Years of Experience</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="experience-minus"
                aria-label="Decrease years of experience"
                onClick={() => update('yearsExperience', Math.max(0, form.yearsExperience - 1))}
                className="w-8 h-8 rounded-full border border-coffee/25 bg-ivory flex items-center justify-center text-coffee font-bold hover:bg-sand transition cursor-pointer flex-shrink-0"
              >
                <Minus className="w-3 h-3" />
              </button>
              <div className="w-12 text-center font-semibold text-coffee text-sm border border-coffee/20 rounded-lg py-1 bg-ivory">
                {form.yearsExperience}
              </div>
              <button
                type="button"
                id="experience-plus"
                aria-label="Increase years of experience"
                onClick={() => update('yearsExperience', Math.min(60, form.yearsExperience + 1))}
                className="w-8 h-8 rounded-full border border-coffee/25 bg-ivory flex items-center justify-center text-coffee font-bold hover:bg-sand transition cursor-pointer flex-shrink-0"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────── */}
      {/* SECTION 2 — CONTACT DETAILS */}
      {/* ────────────────────────────────────────────────────── */}
      <div className="form-section opacity-0">
        <p className={sectionLabelClass}>CONTACT DETAILS</p>

        {/* Mobile + Alternate Mobile */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="mobile">Mobile Number</label>
            <div className="flex items-center border border-coffee/20 rounded-lg overflow-hidden bg-[#ddd0b8] focus-within:border-burnt focus-within:ring-1 focus-within:ring-burnt/25 transition-all duration-150">
              <span className="px-3 py-2.5 text-sm font-semibold text-coffee border-r border-coffee/20 bg-[#ddd0b8] flex-shrink-0">+91</span>
              <input
                id="mobile"
                type="tel"
                className="flex-1 px-3 py-2.5 bg-[#ddd0b8] outline-none text-sm text-coffee placeholder:text-coffee/40"
                placeholder="98765 43210"
                value={form.mobile}
                onChange={(e) => update('mobile', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="alt-mobile">Alternate Mobile Number</label>
            <div className="flex items-center border border-coffee/20 rounded-lg overflow-hidden bg-[#ddd0b8] focus-within:border-burnt focus-within:ring-1 focus-within:ring-burnt/25 transition-all duration-150">
              <span className="px-3 py-2.5 text-sm font-semibold text-coffee border-r border-coffee/20 bg-[#ddd0b8] flex-shrink-0">+91</span>
              <input
                id="alt-mobile"
                type="tel"
                className="flex-1 px-3 py-2.5 bg-[#ddd0b8] outline-none text-sm text-coffee placeholder:text-coffee/40"
                placeholder="Optional"
                value={form.alternateMobile}
                onChange={(e) => update('alternateMobile', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className={labelClass} htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            className={inputClass}
            placeholder="doctor.name@healthtrack.com"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>

      {/* ────────────────────────────────────────────────────── */}
      {/* SECTION 3 — LOCATION */}
      {/* ────────────────────────────────────────────────────── */}
      <div className="form-section opacity-0">
        <div className="flex items-center justify-between mt-6 mb-4">
          <p className="text-[11px] font-bold tracking-widest text-coffee/50 uppercase">LOCATION</p>
          <button
            type="button"
            id="pick-on-map-btn"
            className="flex items-center gap-1 text-sm text-burnt cursor-pointer hover:text-[#b85a22] transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Pick on Map
          </button>
        </div>

        {/* Address Line */}
        <div>
          <label className={labelClass} htmlFor="address">Address Line</label>
          <input
            id="address"
            type="text"
            className={inputClass}
            placeholder="Clinic/Hospital Address"
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>

        {/* State + District */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className={labelClass} htmlFor="state-select">State</label>
            <select
              id="state-select"
              className={inputClass}
              value={form.state}
              onChange={(e) => { update('state', e.target.value); update('district', ''); }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="">Select State</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="district-select">District</label>
            <select
              id="district-select"
              className={inputClass}
              value={form.district}
              onChange={(e) => update('district', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* City + Pincode */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className={labelClass} htmlFor="city">City / Village</label>
            <input
              id="city"
              type="text"
              className={inputClass}
              placeholder="Enter locality"
              value={form.city}
              onChange={(e) => update('city', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="pincode">Pincode</label>
            <input
              id="pincode"
              type="text"
              className={inputClass}
              placeholder="400001"
              value={form.pincode}
              onChange={(e) => update('pincode', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────── */}
      {/* SECTION 4 — QUALIFICATION */}
      {/* ────────────────────────────────────────────────────── */}
      <div className="form-section opacity-0">
        <p className={sectionLabelClass}>QUALIFICATION</p>

        {/* Primary Degree + Additional Degrees */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="primary-degree">Primary Degree</label>
            <input
              id="primary-degree"
              type="text"
              className={inputClass}
              placeholder="MBBS"
              value={form.primaryDegree}
              onChange={(e) => update('primaryDegree', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="additional-degrees">Additional Degrees</label>
            <input
              id="additional-degrees"
              type="text"
              className={inputClass}
              placeholder="MD, MS, etc."
              value={form.additionalDegrees}
              onChange={(e) => update('additionalDegrees', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>

        {/* Specialization chips + dropdown */}
        <div className="mt-4">
          <label className={labelClass}>Specialization</label>
          {/* Chips */}
          <div className="flex flex-wrap gap-2 mb-2">
            {form.specializations.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1 bg-burnt text-white text-xs font-medium px-3 py-1 rounded-full"
              >
                {chip}
                <button
                  type="button"
                  aria-label={`Remove ${chip}`}
                  onClick={() => removeSpecialization(chip)}
                  className="cursor-pointer hover:bg-[#b85a22] rounded-full ml-1 transition-colors leading-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {/* Add dropdown */}
          <select
            id="add-specialization"
            className={inputClass}
            onChange={addSpecialization}
            onFocus={handleFocus}
            onBlur={handleBlur}
            defaultValue=""
          >
            <option value="" disabled>Add Specialization</option>
            {specializationOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Certifications Upload */}
        <div className="mt-5">
          <label className={labelClass}>Certifications Upload</label>
          <button
            type="button"
            id="certifications-upload"
            aria-label="Upload certifications"
            className="w-full h-24 border-2 border-dashed border-coffee/25 rounded-xl bg-ivory/50 flex flex-col items-center justify-center cursor-pointer hover:border-burnt/40 transition-colors"
          >
            <FileText className="w-8 h-8 text-coffee/30" />
            <span className="text-xs tracking-wider text-coffee/40 mt-2">UPLOAD CERTIFICATES</span>
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────── */}
      {/* SECTION 5 — VERIFICATION */}
      {/* ────────────────────────────────────────────────────── */}
      <div className="form-section opacity-0">
        <p className={sectionLabelClass}>VERIFICATION</p>

        <div className="grid grid-cols-3 gap-4">
          {/* Medical License */}
          <button
            type="button"
            id="upload-medical-license"
            aria-label="Upload medical license"
            className="border border-coffee/20 rounded-xl bg-ivory/60 h-24 flex flex-col items-center justify-center cursor-pointer hover:border-burnt/40 hover:bg-ivory transition-colors"
          >
            <Shield className="w-7 h-7 text-coffee/40" />
            <span className="text-[10px] tracking-widest uppercase text-coffee/50 text-center mt-2 px-1">MEDICAL LICENSE</span>
          </button>

          {/* ID Proof */}
          <button
            type="button"
            id="upload-id-proof"
            aria-label="Upload ID proof"
            className="border border-coffee/20 rounded-xl bg-ivory/60 h-24 flex flex-col items-center justify-center cursor-pointer hover:border-burnt/40 hover:bg-ivory transition-colors"
          >
            <CreditCard className="w-7 h-7 text-coffee/40" />
            <span className="text-[10px] tracking-widest uppercase text-coffee/50 text-center mt-2 px-1">ID PROOF (AADHAAR/PAN)</span>
          </button>

          {/* Clinic Registration */}
          <button
            type="button"
            id="upload-clinic-registration"
            aria-label="Upload clinic registration"
            className="border border-coffee/20 rounded-xl bg-ivory/60 h-24 flex flex-col items-center justify-center cursor-pointer hover:border-burnt/40 hover:bg-ivory transition-colors"
          >
            <Building2 className="w-7 h-7 text-coffee/40" />
            <span className="text-[10px] tracking-widest uppercase text-coffee/50 text-center mt-2 px-1">CLINIC REGISTRATION</span>
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────── */}
      {/* SECTION 6 — ADDITIONAL INFO */}
      {/* ────────────────────────────────────────────────────── */}
      <div className="form-section opacity-0">
        <p className={sectionLabelClass}>ADDITIONAL INFO</p>

        {/* Professional Bio */}
        <div>
          <label className={labelClass} htmlFor="bio">Professional Bio</label>
          <textarea
            id="bio"
            rows={4}
            className={`${inputClass} resize-none`}
            placeholder="Tell patients about your expertise..."
            value={form.bio}
            onChange={(e) => update('bio', e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>

        {/* Languages Spoken + Awards */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Languages Spoken */}
          <div>
            <label className={labelClass}>Languages Spoken</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.languages.map((lang) => (
                <span
                  key={lang}
                  className="inline-flex items-center gap-1 bg-burnt text-white text-xs font-medium px-3 py-1 rounded-full"
                >
                  {lang}
                  <button
                    type="button"
                    aria-label={`Remove ${lang}`}
                    onClick={() => removeLanguage(lang)}
                    className="cursor-pointer hover:bg-[#b85a22] rounded-full ml-1 transition-colors leading-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <select
              id="add-language"
              className={inputClass}
              onChange={addLanguage}
              onFocus={handleFocus}
              onBlur={handleBlur}
              defaultValue=""
            >
              <option value="" disabled>Add Language</option>
              {languageOptions.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Awards & Recognitions */}
          <div>
            <label className={labelClass} htmlFor="awards">Awards &amp; Recognitions</label>
            <input
              id="awards"
              type="text"
              className={inputClass}
              placeholder="Best Physician 2023"
              value={form.awards}
              onChange={(e) => update('awards', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>

        {/* Linked Pharmacy / Lab */}
        <div className="mt-4">
          <label className={labelClass} htmlFor="linked-facility">Linked Pharmacy / Lab</label>
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-coffee/40 pointer-events-none" />
            <input
              id="linked-facility"
              type="text"
              className={`${inputClass} pl-9`}
              placeholder="Search for nearby facilities..."
              value={form.linkedFacility}
              onChange={(e) => update('linkedFacility', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────── */}
      {/* SECTION 7 — ACCOUNT SETUP */}
      {/* ────────────────────────────────────────────────────── */}
      <div className="form-section opacity-0">
        <p className={sectionLabelClass}>ACCOUNT SETUP</p>

        {/* Create Password + Confirm Password */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className={labelClass} htmlFor="password">Create Password</label>
            <input
              id="password"
              type={form.showPassword ? 'text' : 'password'}
              className={inputClass}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <button
              type="button"
              id="toggle-password"
              aria-label="Toggle password visibility"
              onClick={() => update('showPassword', !form.showPassword)}
              className="absolute right-3 top-[34px] text-coffee/40 hover:text-coffee/60 transition-colors"
            >
              {form.showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="relative">
            <label className={labelClass} htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type={form.showConfirmPassword ? 'text' : 'password'}
              className={inputClass}
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={(e) => update('confirmPassword', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <button
              type="button"
              id="toggle-confirm-password"
              aria-label="Toggle confirm password visibility"
              onClick={() => update('showConfirmPassword', !form.showConfirmPassword)}
              className="absolute right-3 top-[34px] text-coffee/40 hover:text-coffee/60 transition-colors"
            >
              {form.showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* OTP Verification */}
        <div className="mt-5">
          <p className="text-sm font-medium text-coffee text-center mb-3">OTP Verification</p>
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                ref={(el) => { otpRefs.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-11 h-11 text-center text-base border border-coffee/20 rounded-lg bg-[#d9d0c0] focus:border-burnt focus:ring-1 focus:ring-burnt/30 outline-none text-coffee font-medium transition-all duration-150"
                value={form.otp[idx]}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            ))}
          </div>
          {/* Resend OTP */}
          <div className="text-center mt-3">
            <span className="text-xs text-coffee/55">Don&apos;t receive? </span>
            <button
              type="button"
              id="resend-otp"
              className="text-burnt underline text-xs cursor-pointer hover:text-[#b85a22] transition-colors"
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────── */}
      {/* SECTION 8 — TERMS & CTA */}
      {/* ────────────────────────────────────────────────────── */}
      <div className="form-section opacity-0">
        {/* Terms checkbox */}
        <div className="flex items-start gap-3 mt-4">
          <input
            id="terms-checkbox"
            type="checkbox"
            className="w-4 h-4 mt-0.5 accent-burnt cursor-pointer flex-shrink-0"
            checked={form.agreed}
            onChange={(e) => update('agreed', e.target.checked)}
          />
          <label htmlFor="terms-checkbox" className="text-sm text-coffee/65 leading-relaxed cursor-pointer">
            I agree to the{' '}
            <a href="#" className="text-burnt underline cursor-pointer hover:text-[#b85a22] transition-colors">Terms &amp; Conditions</a>
            {' '}and certify that all medical credentials provided are authentic and valid.
          </label>
        </div>

        {/* CTA Button */}
        <button
          id="submit-btn"
          type="submit"
          ref={btnRef}
          onMouseEnter={handleBtnEnter}
          onMouseLeave={handleBtnLeave}
          disabled={form.isLoading}
          className="mt-5 w-full bg-burnt hover:bg-[#b85a22] text-white font-semibold text-base py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-80"
        >
          {form.isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Start Your Journey</span>
              <Upload className="w-4 h-4" />
              <span>→</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
};

export default Form;
