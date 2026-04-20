import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { Shield, BarChart3, Heart } from 'lucide-react';
import Form from './components/Form';

type TabKey = 'Patients' | 'Doctors' | 'Providers';
const TABS: TabKey[] = ['Patients', 'Doctors', 'Providers'];

const App: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabBtnsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeTab, setActiveTab] = useState<TabKey>('Doctors');

  // Three.js setup
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xd96c2d, 1.2);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const geometry = new THREE.SphereGeometry(1.2, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: 0x5a9ea0,
      roughness: 0.3,
      metalness: 0.6,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      sphere.rotation.y += 0.003;
      sphere.position.y = Math.sin(elapsed) * 0.15;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // GSAP animations on mount
  useEffect(() => {
    const tl = gsap.timeline();

    // Left panel: avatar card slides in from left
    tl.fromTo(
      overlayRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Text block below card
    if (overlayRef.current) {
      const textBlock = overlayRef.current.querySelector('#left-text-block');
      tl.fromTo(
        textBlock,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.6'
      );
    }

    // Badges stagger
    if (badgesRef.current) {
      const badges = Array.from(badgesRef.current.children);
      tl.fromTo(
        badges,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'power2.out' },
        '-=0.3'
      );
    }

    // Right panel — navbar
    tl.fromTo(
      navbarRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      0
    );

    // Role tabs
    tl.fromTo(
      tabsRef.current,
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      0.2
    );

    // Form card
    tl.fromTo(
      formContainerRef.current,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
      0.35
    );

    // Snap indicator to "Doctors" tab (index 1) instantly — no animation
    if (indicatorRef.current) {
      gsap.set(indicatorRef.current, { x: '100%' });
    }
  }, []);

  const handleTabClick = (tab: TabKey, index: number) => {
    setActiveTab(tab);

    // Slide the pill indicator
    if (indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        x: `${index * 100}%`,
        duration: 0.45,
        ease: 'power3.inOut',
      });
    }

    // Scale active tab up, others back to 1
    tabBtnsRef.current.forEach((btn, i) => {
      if (!btn) return;
      if (i === index) {
        gsap.to(btn, { scale: 1.05, duration: 0.3 });
      } else {
        gsap.to(btn, { scale: 1, duration: 0.3 });
      }
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">

      {/* ═══════════════════ LEFT PANEL ═══════════════════ */}
      <div
        className="w-[40%] relative flex-shrink-0 flex items-center justify-center p-8"
        style={{ background: 'linear-gradient(to bottom, #1a0f0f 0%, #3B2F2F 40%, #8B4513 100%)' }}
      >
        {/* Three.js canvas mount point */}
        <div ref={mountRef} className="absolute inset-0 z-0 w-full h-full" />

        {/* Overlay content */}
        <div ref={overlayRef} className="z-10 flex flex-col items-center pt-24 opacity-0 w-full">

          {/* Avatar Card */}
          <div className="rounded-2xl bg-[#0d1f1f]/80 backdrop-blur-sm border border-white/10 w-64 h-64 flex flex-col items-center justify-center mx-auto shadow-2xl">
            <div
              className="w-40 h-40 rounded-full flex items-center justify-center"
              style={{ background: 'radial-gradient(circle, rgba(90,158,160,0.4) 0%, transparent 70%)' }}
            >
              {/* Glowing doctor figure */}
              <div className="w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center">
                <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14" xmlns="http://www.w3.org/2000/svg">
                  {/* Doctor silhouette — head */}
                  <circle cx="32" cy="20" r="10" fill="rgba(90,158,160,0.7)" />
                  {/* Body/coat */}
                  <path d="M16 56c0-8.837 7.163-16 16-16s16 7.163 16 16" fill="rgba(90,158,160,0.5)" />
                  {/* Stethoscope hint */}
                  <path d="M26 40 Q30 48 36 40" stroke="rgba(250,247,240,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <span className="text-xs tracking-[0.3em] text-white/50 uppercase mt-3 text-center">CLINIAL SACNTOURY</span>
          </div>

          {/* Tagline + subtext */}
          <div id="left-text-block" className="mt-6 text-center max-w-xs px-4">
            <h1 className="text-3xl font-bold text-white leading-tight">Your Health. Tracked. Trusted.</h1>
            <p className="text-sm text-white/65 mt-3 px-6 leading-relaxed">
              Join the next generation of clinical management and wellness monitoring tailored for high-precision care.
            </p>
          </div>

          {/* Feature Badges */}
          <div ref={badgesRef} className="flex gap-3 justify-center mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex flex-col items-center gap-1 border border-white/10 w-20 opacity-0">
              <Shield className="w-5 h-5 text-white" />
              <span className="text-[10px] tracking-widest text-white/60 uppercase">Secure</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex flex-col items-center gap-1 border border-white/10 w-20 opacity-0">
              <BarChart3 className="w-5 h-5 text-white" />
              <span className="text-[10px] tracking-widest text-white/60 uppercase">Real-Time</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex flex-col items-center gap-1 border border-white/10 w-20 opacity-0">
              <Heart className="w-5 h-5 text-white" />
              <span className="text-[10px] tracking-widest text-white/60 uppercase">Vitality</span>
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════ RIGHT PANEL ═══════════════════ */}
      <div className="w-[60%] overflow-y-auto bg-ivory flex flex-col">

        {/* Navbar */}
        <nav
          ref={navbarRef}
          className="flex items-center justify-between px-10 py-4 border-b border-sand bg-ivory/90 backdrop-blur-md sticky top-0 z-20 opacity-0"
        >
          <div className="text-xl font-bold text-coffee">HealthTrack</div>
          <div className="flex items-center gap-6">
            <div className="flex gap-6 text-sm text-coffee/60">
              <a href="#" className="hover:text-coffee transition-colors">Find Doctors</a>
              <a href="#" className="hover:text-coffee transition-colors">Lab Tests</a>
              <a href="#" className="hover:text-coffee transition-colors">Articles</a>
              <a href="#" className="hover:text-coffee transition-colors">Trackers</a>
            </div>
            <button
              id="sign-in-btn"
              className="bg-coffee text-white text-sm font-medium rounded-full px-5 py-2 hover:bg-coffee/90 transition-colors"
            >
              Sign In
            </button>
          </div>
        </nav>

        {/* Role Toggle Tabs — Sliding Pill */}
        <div ref={tabsRef} className="flex justify-center mt-6 mb-8 opacity-0">
          <div className="relative inline-flex items-center bg-sand rounded-full p-1">
            {/* Sliding pill indicator */}
            <div
              ref={indicatorRef}
              className="absolute top-1 bottom-1 left-1 rounded-full bg-burnt shadow-[0_0_12px_rgba(217,108,45,0.45)]"
              style={{ width: 'calc(33.333% - 2px)' }}
            />
            {/* Tab buttons */}
            {TABS.map((tab, index) => (
              <button
                key={tab}
                id={`tab-${tab.toLowerCase()}`}
                ref={(el) => { tabBtnsRef.current[index] = el; }}
                type="button"
                onClick={() => handleTabClick(tab, index)}
                className={[
                  'relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200',
                  activeTab === tab ? 'text-white font-semibold' : 'text-coffee/65 hover:text-coffee',
                ].join(' ')}
              >
                For {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Form Card Container */}
        <div ref={formContainerRef} className="mx-auto mt-2 mb-12 w-[90%] max-w-2xl opacity-0">
          <div className="bg-sand rounded-2xl shadow-xl p-8">
            <Form />
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-sand mt-auto py-6 px-10 flex items-start justify-between bg-coffee">
          <div className="text-white font-bold">HealthTrack</div>
          <div className="flex flex-col gap-1 text-xs text-white/50 items-center">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/70 transition-colors">Help Center</a>
          </div>
          <div className="text-white/35 text-xs text-right">
            © 2024 HEALTHTRACK CLINICAL SANCTUARY.
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;
