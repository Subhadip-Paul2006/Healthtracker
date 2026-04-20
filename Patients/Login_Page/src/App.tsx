import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import LoginForm from './components/LoginForm';

type TabKey = 'Patients' | 'Doctors' | 'Providers';
const TABS: TabKey[] = ['Patients', 'Doctors', 'Providers'];

const App: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const leftUiRef = useRef<HTMLDivElement>(null);

  const navbarRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabBtnsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeTab, setActiveTab] = useState<TabKey>('Patients');

  // Layer 1: Three.js canvas setup
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffaa66, 1.2);
    pointLight1.position.set(2, 2, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff6622, 0.6);
    pointLight2.position.set(-2, -1, 2);
    scene.add(pointLight2);

    // Main Orb
    const geometry1 = new THREE.SphereGeometry(1.3, 64, 64);
    const material1 = new THREE.MeshStandardMaterial({
      color: 0xc05820,
      roughness: 0.25,
      metalness: 0.7,
      emissive: 0x8B3010,
      emissiveIntensity: 0.4,
    });
    const orb = new THREE.Mesh(geometry1, material1);
    
    // Outer Ring
    const geometry2 = new THREE.TorusGeometry(1.8, 0.025, 16, 120);
    const material2 = new THREE.MeshStandardMaterial({
      color: 0xffaa55,
      emissive: 0xff6600,
      emissiveIntensity: 0.8,
    });
    const ring = new THREE.Mesh(geometry2, material2);
    
    scene.add(orb);
    scene.add(ring);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      
      orb.rotation.y += 0.003;
      orb.position.y = Math.sin(elapsed * 0.8) * 0.12;

      ring.rotation.y += 0.005;
      ring.rotation.x += 0.002;
      
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
      const stats = leftUiRef.current.querySelectorAll('.stat-item');
      
      // 1. Top label
      tl.fromTo(topLabel, { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.1);
      
      // 2. Heading
      tl.fromTo(heading, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.3);
      
      // 3. Subtext
      tl.fromTo(subtext, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.5);
      
      // 4. Stats Stagger
      if (stats.length > 0) {
        tl.fromTo(stats, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 }, 0.7);
      }
    }

    // ─────────────────────────────────────────────────────────────────
    // RIGHT PANEL ANIMATIONS
    // ─────────────────────────────────────────────────────────────────
    
    // 1. Navbar
    tl.fromTo(navbarRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0);
    
    // 2. Role tabs
    tl.fromTo(tabsRef.current, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.2);
    
    // 3. Login card Container
    tl.fromTo(formContainerRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.35);

    // 4 & 5. Form stagger animation (runs independently since the card entry is parent)
    const formItems = document.querySelectorAll('.form-stagger-item');
    if (formItems.length > 0) {
        tl.fromTo(formItems, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 }, 0.55);
    }

    // Indicator snap state on initial load
    if (indicatorRef.current) {
      gsap.set(indicatorRef.current, { x: '0%' }); // "Patients" is index 0 -> 0 * 100%
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
      <div 
        className="w-1/2 relative flex-shrink-0 flex flex-col overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, #3B2F2F 0%, #8B4010 50%, #D96C2D 100%)' }}
      >
        
        {/* Three.js Canvas */}
        <div ref={mountRef} className="absolute inset-0 z-0 w-full h-full pointer-events-none" />

        {/* Overlay Content */}
        <div ref={leftUiRef} className="relative z-10 flex flex-col h-full px-10 py-8 pointer-events-none selection:bg-burnt/30 selection:text-white">
          
          <div id="clinic-sanc" className="opacity-0">
            <h2 className="text-base font-semibold text-white/90">Clinical Sanctuary</h2>
            <div className="w-8 h-0.5 bg-burnt mt-1.5 mb-0" />
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-sm">
            <div id="heading" className="opacity-0">
              <h1 className="text-4xl font-bold text-white leading-tight">The Sanctuary for Your Clinical Journey.</h1>
            </div>

            <div id="subtext" className="opacity-0">
              <p className="text-sm text-white/65 mt-4 leading-relaxed max-w-xs">
                Experience a healthcare interface designed for peace of mind, restorative focus, and professional excellence.
              </p>
            </div>

            <div className="mt-10 flex gap-12">
              <div className="stat-item opacity-0">
                <span className="block text-2xl font-bold text-white leading-none">99.9%</span>
                <span className="block text-[10px] tracking-widest text-white/50 uppercase mt-2">SECURE ACCESS</span>
              </div>
              <div className="stat-item opacity-0">
                <span className="block text-2xl font-bold text-white leading-none">24/7</span>
                <span className="block text-[10px] tracking-widest text-white/50 uppercase mt-2">PATIENT SUPPORT</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-10">
            <span className="text-[10px] text-white/30 tracking-wider uppercase font-medium">© 2024 RESTORATIVE CARE SYSTEMS</span>
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

          {/* Wrapper to center tabs and card vertically securely inside the viewport */}
          <div className="flex-1 flex flex-col justify-center items-center py-6 w-full max-w-full">
            
            {/* Role Toggle Tabs */}
            <div ref={tabsRef} className="flex justify-center mb-6 opacity-0 w-full">
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
            <div ref={formContainerRef} className="w-[85%] max-w-sm mx-auto opacity-0 shrink-0">
              <div className="bg-sand rounded-2xl shadow-xl p-8 w-full">
                <LoginForm />
              </div>
            </div>

          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center py-6 shrink-0 w-full mt-auto">
          <p className="text-[10px] tracking-widest text-coffee/30 uppercase font-bold">
            HEALTHTRACKER INC. · HIGH CLINICAL ACCESS
          </p>
        </div>

      </div>
    </div>
  );
};

export default App;
