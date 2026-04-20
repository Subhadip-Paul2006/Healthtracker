import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

interface LoginFormState {
  userId: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  loginError: boolean;
}

const inputClass =
  'w-full bg-[#ddd0b8] border border-coffee/20 rounded-lg px-4 py-2.5 text-sm text-coffee placeholder:text-coffee/35 focus:outline-none focus:border-burnt focus:ring-1 focus:ring-burnt/25 transition-all duration-150';

const labelClass = 'text-[10px] font-bold tracking-widest text-coffee/50 uppercase block';

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<LoginFormState>({
    userId: '',
    password: '',
    showPassword: false,
    isLoading: false,
    loginError: false,
  });

  const btnRef = useRef<HTMLButtonElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof LoginFormState>(field: K, value: LoginFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    gsap.to(e.target.parentElement, { scale: 1.01, duration: 0.12 });
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    gsap.to(e.target.parentElement, { scale: 1, duration: 0.12 });
  };

  const handleBtnEnter = () => {
    gsap.to(btnRef.current, { scale: 1.02, duration: 0.15 });
  };
  const handleBtnLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.15 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update('isLoading', true);
    update('loginError', false);
    
    // Simulate API Call
    setTimeout(() => {
      // Simulate error if fields are empty to show shake animation
      if (!form.userId || !form.password) {
        update('isLoading', false);
        update('loginError', true);
        if (btnRef.current) {
          gsap.to(btnRef.current, {
            keyframes: [{ x: -6 }, { x: 6 }, { x: -4 }, { x: 4 }, { x: 0 }],
            duration: 0.4,
          });
        }
      } else {
        // Success path (display only)
        update('isLoading', false);
        // Maybe navigate to dashboard in fully integrated app
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col">
      {/* Card Header */}
      <div className="form-stagger-item opacity-0 transform translate-y-2">
        <h2 className="text-2xl font-bold text-coffee">Patient Login</h2>
        <p className="text-sm text-coffee/55 mt-1">Access your healthcare dashboard securely</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col mt-5">
        
        {/* USER ID Field */}
        <div className="form-stagger-item opacity-0 transform translate-y-2">
          <label className={`${labelClass} mb-2`} htmlFor="userId">USER ID</label>
          <div className="relative flex items-center shadow-sm rounded-lg" style={{ background: '#ddd0b8' }}>
            <User className="absolute left-3 w-4 h-4 text-coffee/40 pointer-events-none" />
            <input
              id="userId"
              type="text"
              className={`${inputClass} pl-9`}
              placeholder="Enter your patient ID"
              value={form.userId}
              onChange={(e) => update('userId', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>

        {/* PASSWORD Field */}
        <div className="form-stagger-item opacity-0 transform translate-y-2 mt-4">
          <label className={`${labelClass} mb-2`} htmlFor="password">PASSWORD</label>
          <div className="relative flex items-center shadow-sm rounded-lg" style={{ background: '#ddd0b8' }}>
            <Lock className="absolute left-3 w-4 h-4 text-coffee/40 pointer-events-none" />
            <input
              id="password"
              type={form.showPassword ? 'text' : 'password'}
              className={`${inputClass} pl-9 pr-10`}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <button
              type="button"
              id="toggle-password"
              title="Toggle password visibility"
              className="absolute right-3 w-4 h-4 text-coffee/40 cursor-pointer hover:text-coffee transition-colors"
              onClick={() => update('showPassword', !form.showPassword)}
            >
              {form.showPassword ? <EyeOff className="w-full h-full" /> : <Eye className="w-full h-full" />}
            </button>
          </div>
          <div className="text-right mt-2">
            <span className="text-sm text-burnt hover:text-[#b85a22] cursor-pointer underline transition-colors inline-block">
              Forgot Password?
            </span>
          </div>
        </div>

        {/* Login CTA */}
        <button
          ref={btnRef}
          type="submit"
          onMouseEnter={handleBtnEnter}
          onMouseLeave={handleBtnLeave}
          disabled={form.isLoading}
          className="mt-5 w-full bg-burnt hover:bg-[#b85a22] text-white font-semibold text-base py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-85"
        >
          {form.isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <span>Login</span>
              <span>→</span>
            </>
          )}
        </button>

        {/* OR REGISTER Divider */}
        <div className="flex items-center gap-3 mt-6 form-stagger-item opacity-0 transform translate-y-2">
          <hr className="flex-1 border-coffee/15" />
          <span className="text-xs text-coffee/40 tracking-wider">OR REGISTER</span>
          <hr className="flex-1 border-coffee/15" />
        </div>

        {/* Register Link */}
        <div className="text-center mt-3 form-stagger-item opacity-0 transform translate-y-2">
          <span className="text-sm text-coffee/60">Don&apos;t have an account? </span>
          <a href="#" className="text-sm text-burnt underline font-medium cursor-pointer hover:text-[#b85a22] transition">
            Register
          </a>
        </div>

        {/* Social Login Buttons (UI Only) */}
        <div className="flex justify-center gap-3 mt-4 form-stagger-item opacity-0 transform translate-y-2">
          <button type="button" title="Log in with Google" className="w-10 h-10 rounded-lg border border-coffee/20 bg-ivory/60 flex items-center justify-center hover:bg-ivory transition-colors cursor-pointer">
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </button>
          <button type="button" title="View More SSO Options" className="w-10 h-10 rounded-lg border border-coffee/20 bg-ivory/60 flex items-center justify-center hover:bg-ivory transition-colors cursor-pointer">
            <svg viewBox="0 0 24 24" width="20" height="20" className="text-coffee/50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"/>
            </svg>
          </button>
        </div>

      </form>
    </div>
  );
};

export default LoginForm;
