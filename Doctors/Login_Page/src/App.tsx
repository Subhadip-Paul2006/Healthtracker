import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import Form from './components/Form';

type TabKey = 'Patients' | 'Doctors' | 'Providers';
const TABS: TabKey[] = ['Patients', 'Doctors', 'Providers'];

const App: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const leftUiRef = useRef<HTMLDivElement>(null);
  const progressArcRef = useRef<SVGCircleElement>(null);
  const doctorPhotoRef = useRef<HTMLDivElement>(null);

  const navbarRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabBtnsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeTab, setActiveTab] = useState<TabKey>('Doctors');

  // Layer 1: Three.js canvas setup
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff8844, 0.8);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Outer ring
    const geometry1 = new THREE.TorusGeometry(2.0, 0.04, 16, 120);
    const material1 = new THREE.MeshStandardMaterial({
      color: 0xff9955,
      emissive: 0xcc4400,
      emissiveIntensity: 0.7,
    });
    const ring1 = new THREE.Mesh(geometry1, material1);
    
    // Inner ring
    const geometry2 = new THREE.TorusGeometry(1.4, 0.025, 16, 100);
    const material2 = new THREE.MeshStandardMaterial({
      color: 0xff9955,
      emissive: 0xcc4400,
      emissiveIntensity: 0.7,
    });
    const ring2 = new THREE.Mesh(geometry2, material2);
    
    // Position a bit off-center to act as a background element
    ring1.position.set(0.5, 0, 0);
    ring2.position.set(0.5, 0, 0);

    scene.add(ring1);
    scene.add(ring2);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ring1.rotation.y += 0.004;
      ring1.rotation.x += 0.001;
      
      ring2.rotation.y -= 0.003;
      ring2.rotation.x -= 0.0015;
      
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
      geometry1.dispose();
      material1.dispose();
      geometry2.dispose();
      material2.dispose();
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline();

    // ─────────────────────────────────────────────────────────────────
    // LEFT PANEL ANIMATIONS
    // ─────────────────────────────────────────────────────────────────
    
    if (leftUiRef.current) {
      const topLabel = leftUiRef.current.querySelector('#clinic-sanc');
      const heading = leftUiRef.current.querySelector('#heading');
      const subtext = leftUiRef.current.querySelector('#subtext');
      const progBlock = leftUiRef.current.querySelector('#prog-block');
      
      // 1. Top label
      tl.fromTo(topLabel, { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.1);
      
      // 2. Heading
      tl.fromTo(heading, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.3);
      
      // 3. Subtext
      tl.fromTo(subtext, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.45);
      
      // 4. Progress ring container
      tl.fromTo(progBlock, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.5);
      
      // 5. Progress arc (strokeDashoffset)
      if (progressArcRef.current) {
        tl.fromTo(
          progressArcRef.current,
          { strokeDashoffset: 163 },
          { strokeDashoffset: 49, duration: 1.8, ease: 'power2.out' },
          0.6
        );
      }
    }

    // 6. Doctor photo layer
    if (doctorPhotoRef.current) {
      tl.fromTo(doctorPhotoRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0.8);
    }

    // ─────────────────────────────────────────────────────────────────
    // RIGHT PANEL ANIMATIONS
    // ─────────────────────────────────────────────────────────────────
    
    // 1. Navbar
    tl.fromTo(navbarRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0);
    
    // 2. Role tabs
    tl.fromTo(tabsRef.current, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.2);
    
    // 3. Login card
    tl.fromTo(formContainerRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.35);

    // 4 & 5. Form stagger animation (runs independently since the card entry is parent)
    const formItems = document.querySelectorAll('.form-stagger-item');
    if (formItems.length > 0) {
        tl.fromTo(formItems, { y: 6, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 }, 0.5);
    }

    // Indicator snap state on initial load
    if (indicatorRef.current) {
      gsap.set(indicatorRef.current, { x: '100%' }); // "Doctors" is index 1 -> 1 * 100%
    }
  }, []);

  const handleTabClick = (tab: TabKey, index: number) => {
    setActiveTab(tab);

    if (indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        x: `${index * 100}%`,
        duration: 0.45,
        ease: 'power3.inOut',
      });
    }

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
    <div className="flex h-screen w-full overflow-hidden font-sans">

      {/* ═══════════════════ LEFT PANEL ═══════════════════ */}
      <div className="w-1/2 relative flex-shrink-0 flex flex-col overflow-hidden">
        
        {/* Layer 0: Gradient Background */}
        <div 
          className="absolute inset-0 z-0" 
          style={{ background: 'linear-gradient(to bottom, #3B2F2F 0%, #7a3010 45%, #D96C2D 100%)' }} 
        />

        {/* Layer 1: Three.js Canvas */}
        <div ref={mountRef} className="absolute inset-0 z-[1] w-full h-full opacity-30 pointer-events-none" />

        {/* Layer 2: Doctor photo with blend overlay */}
        <div ref={doctorPhotoRef} className="absolute bottom-0 left-0 right-0 z-[2] h-[65%] opacity-0 pointer-events-none">
          {/* Silouhette representation of doctor photo */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(217, 108, 45, 0.4) 0%, transparent 60%)' }}>
            <svg viewBox="0 0 200 400" className="w-48 absolute bottom-0 left-1/2 -translate-x-1/2 opacity-25" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Doctor Head */}
              <circle cx="100" cy="120" r="30" fill="white" />
              {/* Shoulders & Coat */}
              <path d="M50 200 C30 200, 20 220, 20 400 L180 400 C180 220, 170 200, 150 200 Z" fill="white" />
              {/* Stethoscope Lines (V-shape) */}
              <path d="M70 200 L100 280 L130 200" stroke="rgba(0,0,0,0.5)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              {/* Inner coat split line */}
              <path d="M100 280 L100 400" stroke="rgba(0,0,0,0.5)" strokeWidth="4" />
            </svg>
          </div>
          {/* Overlay gradient over the image to blend it further */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#D96C2D]/50 via-transparent to-transparent mix-blend-multiply" />
        </div>

        {/* Layer 3: Text & UI UI Layout */}
        <div ref={leftUiRef} className="absolute inset-0 z-10 flex flex-col justify-start px-12 py-10 pointer-events-none selection:bg-burnt/30 selection:text-white">
          
          <div id="clinic-sanc" className="opacity-0">
            <h2 className="text-sm font-semibold text-white/90 tracking-wide">Clinical Sanctuary</h2>
            <div className="w-6 h-0.5 bg-white/40 mt-1.5" />
          </div>

          <div id="heading" className="mt-[22vh] opacity-0">
            <h1 className="text-4xl font-bold text-white leading-tight">The Future of <br/>Restorative Care.</h1>
          </div>

          <div id="subtext" className="mt-4 opacity-0 max-w-[280px]">
            <p className="text-sm text-white/60 leading-relaxed font-light">
              Experience a healthcare interface designed for clarity, professional warmth, and clinical excellence.
            </p>
          </div>

          <div id="prog-block" className="mt-12 flex flex-col items-start opacity-0">
            <div className="relative inline-flex items-center justify-center w-16 h-16">
              <svg viewBox="0 0 64 64" width="64" height="64" className="absolute inset-0 transform -rotate-90">
                <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
                <circle 
                  ref={progressArcRef}
                  cx="32" cy="32" r="26" 
                  stroke="white" 
                  strokeWidth="4" 
                  fill="none" 
                  strokeDasharray="163" 
                  strokeDashoffset="163" 
                  strokeLinecap="round" 
                />
              </svg>
              <span className="text-sm font-bold text-white z-10">70%</span>
            </div>
            <span className="text-[9px] tracking-[0.25em] text-white/45 uppercase mt-3 pl-1">RESTORATION</span>
          </div>

          <div className="absolute bottom-6 left-8">
            <span className="text-[9px] text-white/30 tracking-widest uppercase font-medium">© 2024 RESTORATIVE CARE SYSTEMS</span>
          </div>
        </div>

      </div>

      {/* ═══════════════════ RIGHT PANEL ═══════════════════ */}
      <div className="w-1/2 overflow-y-auto bg-ivory flex flex-col justify-between relative selection:bg-burnt/20">

        <div className="flex flex-col w-full flex-grow">
          
          {/* Navbar */}
          <nav
            ref={navbarRef}
            className="flex items-center justify-between px-10 py-5 bg-ivory opacity-0 shrink-0"
          >
            <div className="text-lg font-bold text-coffee tracking-tight">HealthTrack</div>
            <div className="flex items-center gap-7">
              <div className="hidden lg:flex gap-6 text-sm text-coffee/60">
                <a href="#" className="hover:text-coffee transition-colors font-medium">Find Doctors</a>
                <a href="#" className="hover:text-coffee transition-colors font-medium">Lab Tests</a>
                <a href="#" className="hover:text-coffee transition-colors font-medium">Articles</a>
                <a href="#" className="hover:text-coffee transition-colors font-medium">Trackers</a>
              </div>
              <button
                className="bg-coffee text-white text-sm font-medium rounded-full px-5 py-2 hover:bg-[#2a2020] transition-colors"
              >
                Sign In
              </button>
            </div>
          </nav>

          {/* Wrapper to center tabs and card vertically nicely in remaining space */}
          <div className="flex-1 flex flex-col justify-center items-center py-6 w-full max-w-full">
            
            {/* Role Toggle Tabs */}
            <div ref={tabsRef} className="flex justify-center mb-8 opacity-0 w-full">
              <div className="relative inline-flex items-center bg-sand rounded-full p-1 mx-2">
                <div
                  ref={indicatorRef}
                  className="absolute top-1 bottom-1 left-1 rounded-full bg-burnt shadow-[0_0_12px_rgba(217,108,45,0.45)]"
                  style={{ width: 'calc(33.333% - 2px)' }}
                />
                {TABS.map((tab, index) => (
                  <button
                    key={tab}
                    ref={(el) => { tabBtnsRef.current[index] = el; }}
                    type="button"
                    onClick={() => handleTabClick(tab, index)}
                    className={[
                      'relative z-10 px-6 sm:px-8 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200',
                      activeTab === tab ? 'text-white font-semibold' : 'text-coffee/65 hover:text-coffee',
                    ].join(' ')}
                  >
                    For {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Card Container */}
            <div ref={formContainerRef} className="w-[82%] max-w-[320px] mx-auto opacity-0 shrink-0">
              <div className="bg-[#ffffff] rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] px-7 py-9 w-full">
                <Form />
              </div>
            </div>

          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center py-5 shrink-0 w-full mt-auto">
          <p className="text-[9px] tracking-[0.15em] text-coffee/30 uppercase font-bold">
            HEALTHTRACKER INC. · HIGH CLINICAL ACCESS
          </p>
        </div>

      </div>
    </div>
  );
};

export default App;
