import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { Shield, BarChart3, Heart } from 'lucide-react';
import Form from './components/Form';

const App: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Three.js Scene Setup (Left Panel)
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null; // transparent to show CSS gradient

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
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  useEffect(() => {
    // GSAP Left Panel Animations
    gsap.fromTo(
      overlayRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    if (badgesRef.current) {
      const badges = badgesRef.current.children;
      gsap.fromTo(
        badges,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, delay: 0.8, ease: 'power2.out' }
      );
    }

    // GSAP Right Panel Animations
    gsap.fromTo(
      navbarRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );

    gsap.fromTo(
      tabsRef.current,
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.3 }
    );
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      
      {/* LEFT PANEL */}
      <div 
        className="w-[40%] relative flex-shrink-0 flex items-center justify-center p-8"
        style={{ background: 'linear-gradient(to bottom, #1a0f0f, #3B2F2F, #8B4513)' }}
      >
        <div ref={mountRef} className="absolute inset-0 z-0" />
        
        <div ref={overlayRef} className="z-10 flex flex-col items-center pt-32 opacity-0">
          
          <div className="w-72 h-72 rounded-2xl bg-[#0d1f1f]/80 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-4 p-6 shadow-2xl">
            <div className="w-40 h-40 rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(circle, rgba(90,158,160,0.4) 0%, transparent 70%)' }}>
              <div className="w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10" />
              </div>
            </div>
            <span className="text-xs tracking-[0.3em] text-white/60 font-semibold uppercase">Clinical Sanctuary</span>
          </div>

          <div className="mt-12 text-center max-w-sm">
            <h1 className="text-3xl font-bold text-white leading-tight">Your Health. Tracked. Trusted.</h1>
            <p className="text-sm text-white/70 mt-3 px-6 leading-relaxed">
              Join the next generation of clinical management and wellness monitoring tailored for high-precision care.
            </p>
          </div>

          <div ref={badgesRef} className="flex gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex flex-col items-center gap-1 border border-white/10 opacity-0 min-w-[90px]">
              <Shield className="w-5 h-5 text-white mb-1" />
              <span className="text-[10px] tracking-widest text-white/70 uppercase">Secure</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex flex-col items-center gap-1 border border-white/10 opacity-0 min-w-[90px]">
              <BarChart3 className="w-5 h-5 text-white mb-1" />
              <span className="text-[10px] tracking-widest text-white/70 uppercase">Real-Time</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex flex-col items-center gap-1 border border-white/10 opacity-0 min-w-[90px]">
              <Heart className="w-5 h-5 text-white mb-1" />
              <span className="text-[10px] tracking-widest text-white/70 uppercase">Vitality</span>
            </div>
          </div>
          
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-[60%] overflow-y-auto bg-ivory flex flex-col">
        
        {/* Navbar */}
        <nav ref={navbarRef} className="flex items-center justify-between px-10 py-5 border-b border-sand bg-ivory/90 backdrop-blur-md sticky top-0 z-20 opacity-0">
          <div className="text-xl font-bold text-coffee tracking-tight">HealthTrack</div>
          <div className="flex items-center gap-8">
            <div className="flex gap-6 text-sm text-coffee/70">
              <a href="#" className="hover:text-coffee transition-colors font-medium">Find Doctors</a>
              <a href="#" className="hover:text-coffee transition-colors font-medium">Lab Tests</a>
              <a href="#" className="hover:text-coffee transition-colors font-medium">Articles</a>
              <a href="#" className="hover:text-coffee transition-colors font-medium">Trackers</a>
            </div>
            <button className="bg-coffee hover:bg-coffee/90 transition-colors text-white rounded-full px-6 py-2.5 text-sm font-medium">
              Sign In
            </button>
          </div>
        </nav>

        {/* Role Tabs */}
        <div ref={tabsRef} className="flex justify-center mt-8 opacity-0">
          <div className="inline-flex bg-sand rounded-full p-1 border border-coffee/5 shadow-inner">
            <button className="bg-burnt text-white rounded-full px-6 py-2 text-sm font-semibold shadow-sm transition-all">
              For Patients
            </button>
            <button className="text-coffee/70 hover:text-coffee px-6 py-2 text-sm font-medium transition-colors">
              For Doctors
            </button>
            <button className="text-coffee/70 hover:text-coffee px-6 py-2 text-sm font-medium transition-colors">
              For Providers
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="mx-auto mt-8 mb-12 w-[90%] max-w-2xl">
          <Form />
        </div>

        {/* Footer */}
        <footer className="border-t border-sand mt-auto py-6 px-10 flex items-center justify-between bg-ivory">
          <div className="text-coffee/80 font-bold tracking-tight">HealthTrack</div>
          <div className="flex gap-6 text-xs text-coffee/50">
            <a href="#" className="hover:text-coffee transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-coffee transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-coffee transition-colors">Help Center</a>
          </div>
          <div className="text-xs text-coffee/40 text-right">
            © 2024 HEALTHTRACK CLINICAL SANCTUARY.
          </div>
        </footer>

      </div>

    </div>
  );
}

export default App;
