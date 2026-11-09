import React, { useEffect, useRef, useState } from 'react';
import Globe, { type GlobeInstance } from 'globe.gl';
import { RotateCcw } from 'lucide-react';

export interface OfficeLocation {
  id: 'hyderabad' | 'dubai' | 'usa';
  city: string;
  country: string;
  tabLabel?: string;
  label: string;
  badge: string;
  lat: number;
  lon: number;
  color: string;
  address: string;
  emails: string[];
  phones: string[];
  mapUrl: string;
  description: string;
}

export const CLYPTUS_OFFICES: OfficeLocation[] = [
  {
    id: 'hyderabad',
    city: 'Hyderabad',
    country: 'India',
    tabLabel: 'India',
    label: 'Hyderabad, India',
    badge: 'HEAD OFFICE',
    lat: 17.45,
    lon: 78.38,
    color: '#e8501e',
    address: '12A01A, 13th Floor, Manjeera Trinity Corporate, JNTU–Hitech City Road, Kukatpally, Hyderabad, Telangana 500072',
    emails: ['hr.india@clyptus.com', 'Sales@clyptus.com'],
    phones: ['+91 77999 88139 (Sales)'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Manjeera+Trinity+Corporate+Hyderabad',
    description: 'Corporate Headquarters & Global Delivery Center',
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'UAE',
    tabLabel: 'Dubai',
    label: 'Dubai, UAE',
    badge: 'UAE OFFICE',
    lat: 25.2137,
    lon: 55.2814,
    color: '#e8501e',
    address: '101 Sheikh Zayed Rd, Trade Centre, DIFC, Dubai, UAE',
    emails: ['hr.uae@clyptus.com'],
    phones: ['+971 52 350 3297'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=101+Sheikh+Zayed+Rd+Trade+Centre+DIFC+Dubai',
    description: 'Middle East Regional Center & DIFC Operations',
  },
  {
    id: 'usa',
    city: 'California',
    country: 'USA',
    tabLabel: 'California',
    label: 'California, USA',
    badge: 'USA OFFICE',
    lat: 33.4936,
    lon: -117.1484,
    color: '#ff7a42',
    address: '45627 Basswood Ct, Temecula, California 92592',
    emails: ['hr.usa@clyptus.com'],
    phones: ['+1 (480) 427-6373'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=45627+Basswood+Ct+Temecula+California+92592',
    description: 'North America Business Hub & Strategic Enterprise Accounts',
  },
];

const HIGHLIGHT: Record<string, string> = {
  USA: '#ff7a42',
  ARE: '#e8501e',
  IND: '#e8501e',
};

const LOCATIONS = [
  { id: 'usa', name: 'California', lat: 33.4936, lng: -117.1484, color: HIGHLIGHT.USA, radius: 0.38 },
  { id: 'dubai', name: 'Dubai', lat: 25.2137, lng: 55.2814, color: HIGHLIGHT.ARE, radius: 0.38 },
  { id: 'hyderabad', name: 'Hyderabad', lat: 17.45, lng: 78.38, color: HIGHLIGHT.IND, radius: 0.42 },
];

const LABELS = [
  { id: 'hyderabad', text: 'Hyderabad', lat: 17.45, lng: 78.38, size: 0.52, color: '#ffffff', orientation: 'top' },
  { id: 'dubai', text: 'Dubai', lat: 25.2137, lng: 55.2814, size: 0.48, color: '#ffffff', orientation: 'top' },
  { id: 'usa', text: 'California', lat: 33.4936, lng: -117.1484, size: 0.48, color: '#ffffff', orientation: 'top' },
];

const RINGS = LOCATIONS.map((loc) => ({
  id: loc.id,
  lat: loc.lat,
  lng: loc.lng,
  maxR: loc.id === 'hyderabad' ? 4.5 : 3.8,
  propagationSpeed: 2.5,
  repeatPeriod: 1100,
  color: loc.id === 'hyderabad' ? '#e8501e' : loc.color,
}));

// Moving lines: all in luminous electric blue
const BLUE_ARCS = [
  {
    id: 'usa-dubai',
    startLat: LOCATIONS[0].lat,
    startLng: LOCATIONS[0].lng,
    endLat: LOCATIONS[1].lat,
    endLng: LOCATIONS[1].lng,
    color: ['#0284c7', '#38bdf8'],
    isLocal: false,
  },
  {
    id: 'dubai-india',
    startLat: LOCATIONS[1].lat,
    startLng: LOCATIONS[1].lng,
    endLat: LOCATIONS[2].lat,
    endLng: LOCATIONS[2].lng,
    color: ['#0284c7', '#38bdf8'],
    isLocal: false,
  },
  {
    id: 'india-usa',
    startLat: LOCATIONS[2].lat,
    startLng: LOCATIONS[2].lng,
    endLat: LOCATIONS[0].lat,
    endLng: LOCATIONS[0].lng,
    color: ['#0284c7', '#38bdf8'],
    isLocal: false,
  },
];

// 5 Branches in India: Hyderabad, Bengaluru, Chennai, Vijayawada, Indore
export const INDIA_BRANCH_POINTS = [
  { id: 'hyderabad', name: 'Hyderabad', lat: 17.45, lng: 78.38, color: '#ffffff', radius: 0.38 },
  { id: 'bengaluru', name: 'Bengaluru', lat: 12.9716, lng: 77.5946, color: '#38bdf8', radius: 0.3 },
  { id: 'chennai', name: 'Chennai', lat: 13.0827, lng: 80.2707, color: '#38bdf8', radius: 0.3 },
  { id: 'vijayawada', name: 'Vijayawada', lat: 16.5062, lng: 80.6480, color: '#38bdf8', radius: 0.3 },
  { id: 'indore', name: 'Indore', lat: 22.7196, lng: 75.8577, color: '#38bdf8', radius: 0.3 },
];

// Perfectly adjusted sizes, clean labels, and directional offsets to eliminate overlap
export const INDIA_BRANCH_LABELS = [
  { id: 'hyderabad', text: 'Hyderabad', lat: 17.45, lng: 78.38, size: 0.52, color: '#ffffff', orientation: 'top' },
  { id: 'indore', text: 'Indore', lat: 22.7196, lng: 75.8577, size: 0.44, color: '#e0f2fe', orientation: 'top' },
  { id: 'vijayawada', text: 'Vijayawada', lat: 16.5062, lng: 80.6480, size: 0.44, color: '#e0f2fe', orientation: 'right' },
  { id: 'chennai', text: 'Chennai', lat: 13.0827, lng: 80.2707, size: 0.44, color: '#e0f2fe', orientation: 'right' },
  { id: 'bengaluru', text: 'Bengaluru', lat: 12.9716, lng: 77.5946, size: 0.44, color: '#e0f2fe', orientation: 'bottom' },
];

export const INDIA_BRANCH_RINGS = [
  { id: 'hyderabad', lat: 17.45, lng: 78.38, maxR: 2.8, propagationSpeed: 2.2, repeatPeriod: 1200, color: '#e8501e' },
  { id: 'bengaluru', lat: 12.9716, lng: 77.5946, maxR: 1.8, propagationSpeed: 1.8, repeatPeriod: 1400, color: '#38bdf8' },
  { id: 'chennai', lat: 13.0827, lng: 80.2707, maxR: 1.8, propagationSpeed: 1.8, repeatPeriod: 1400, color: '#38bdf8' },
  { id: 'vijayawada', lat: 16.5062, lng: 80.6480, maxR: 1.8, propagationSpeed: 1.8, repeatPeriod: 1400, color: '#38bdf8' },
  { id: 'indore', lat: 22.7196, lng: 75.8577, maxR: 1.8, propagationSpeed: 1.8, repeatPeriod: 1400, color: '#38bdf8' },
];

export const INDIA_BRANCH_ARCS = [
  {
    id: 'hyd-bengaluru',
    startLat: 17.45,
    startLng: 78.38,
    endLat: 12.9716,
    endLng: 77.5946,
    color: ['#0284c7', '#38bdf8'],
    isLocal: true,
  },
  {
    id: 'hyd-chennai',
    startLat: 17.45,
    startLng: 78.38,
    endLat: 13.0827,
    endLng: 80.2707,
    color: ['#0284c7', '#38bdf8'],
    isLocal: true,
  },
  {
    id: 'hyd-vijayawada',
    startLat: 17.45,
    startLng: 78.38,
    endLat: 16.5062,
    endLng: 80.6480,
    color: ['#0284c7', '#38bdf8'],
    isLocal: true,
  },
  {
    id: 'hyd-indore',
    startLat: 17.45,
    startLng: 78.38,
    endLat: 22.7196,
    endLng: 75.8577,
    color: ['#0284c7', '#38bdf8'],
    isLocal: true,
  },
];

interface ClyptusInteractiveGlobeProps {
  selectedLocationId?: 'hyderabad' | 'dubai' | 'usa' | null;
  onSelectLocation?: (id: 'hyderabad' | 'dubai' | 'usa' | null) => void;
  hoveredLocationId?: string | null;
  onHoverLocation?: (id: string | null) => void;
  className?: string;
}

export const ClyptusInteractiveGlobe: React.FC<ClyptusInteractiveGlobeProps> = ({
  selectedLocationId,
  onSelectLocation,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<GlobeInstance | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const onSelectLocationRef = useRef(onSelectLocation);
  const selectedLocationIdRef = useRef(selectedLocationId);

  useEffect(() => {
    onSelectLocationRef.current = onSelectLocation;
  }, [onSelectLocation]);

  useEffect(() => {
    selectedLocationIdRef.current = selectedLocationId;
  }, [selectedLocationId]);

  const handleResetOverview = () => {
    if (onSelectLocationRef.current) {
      onSelectLocationRef.current(null);
    }
    if (!worldRef.current) return;
    const world = worldRef.current;
    world.pointOfView({ lat: 20, lng: 50, altitude: 2.2 }, 1200);
    const controls = world.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2.5;
      controls.enableZoom = false;
    }
    world.labelsData(LABELS);
    world.pointsData(LOCATIONS);
    world.ringsData(RINGS);
    world.arcsData(BLUE_ARCS);
  };

  // Smooth cinematic camera zoom and dynamic branch overlay
  useEffect(() => {
    if (!worldRef.current) return;
    const world = worldRef.current;
    const controls = world.controls();

    if (selectedLocationId === 'hyderabad') {
      // Zoom into India with optimal framing for all 5 branches
      world.pointOfView({ lat: 17.8, lng: 78.8, altitude: 0.88 }, 1200);
      if (controls) {
        controls.autoRotate = false;
      }
      world.labelsData(INDIA_BRANCH_LABELS);
      world.pointsData(INDIA_BRANCH_POINTS);
      world.ringsData(INDIA_BRANCH_RINGS);
      world.arcsData([...BLUE_ARCS, ...INDIA_BRANCH_ARCS]);
    } else if (selectedLocationId) {
      const target = LOCATIONS.find((l) => l.id === selectedLocationId);
      if (target) {
        world.pointOfView({ lat: target.lat, lng: target.lng, altitude: 1.2 }, 1200);
        if (controls) {
          controls.autoRotate = false;
        }
      }
      world.labelsData(LABELS);
      world.pointsData(LOCATIONS);
      world.ringsData(RINGS);
      world.arcsData(BLUE_ARCS);
    } else {
      // Zoom out to global overview
      world.pointOfView({ lat: 20, lng: 50, altitude: 2.2 }, 1200);
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2.5;
      }
      world.labelsData(LABELS);
      world.pointsData(LOCATIONS);
      world.ringsData(RINGS);
      world.arcsData(BLUE_ARCS);
    }
  }, [selectedLocationId]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let isDisposed = false;
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    async function init() {
      try {
        let countriesData = (window as unknown as { __CLYPTUS_COUNTRIES__?: { features: unknown[] } }).__CLYPTUS_COUNTRIES__;
        if (!countriesData) {
          const res = await fetch('/countries-data.json');
          countriesData = await res.json();
          (window as unknown as { __CLYPTUS_COUNTRIES__?: unknown }).__CLYPTUS_COUNTRIES__ = countriesData;
        }

        if (isDisposed || !mount) return;

        const isHydSelected = selectedLocationIdRef.current === 'hyderabad';

        // Initialize Globe
        const world = new Globe(mount)
          .backgroundColor('rgba(0,0,0,0)')
          .showAtmosphere(true)
          .atmosphereColor('#38bdf8')
          .atmosphereAltitude(0.22)
          .polygonsData((countriesData as { features: object[] }).features)
          .polygonCapColor((f: unknown) => {
            const feat = f as { properties: { ISO_A3: string } };
            return HIGHLIGHT[feat.properties?.ISO_A3] || 'rgba(224,242,254,0.38)';
          })
          .polygonSideColor(() => 'rgba(3,105,161,0.25)')
          .polygonStrokeColor(() => 'rgba(255,255,255,0.45)')
          .polygonAltitude((f: unknown) => {
            const feat = f as { properties: { ISO_A3: string } };
            return HIGHLIGHT[feat.properties?.ISO_A3] ? 0.012 : 0.005;
          })
          // Country polygon click: click to zoom in, click active to zoom out
          .onPolygonClick((f: unknown) => {
            const feat = f as { properties: { ISO_A3: string } };
            const iso = feat?.properties?.ISO_A3;
            if (iso === 'IND') {
              if (selectedLocationIdRef.current === 'hyderabad') {
                handleResetOverview();
              } else {
                onSelectLocationRef.current?.('hyderabad');
              }
            } else if (iso === 'ARE') {
              if (selectedLocationIdRef.current === 'dubai') {
                handleResetOverview();
              } else {
                onSelectLocationRef.current?.('dubai');
              }
            } else if (iso === 'USA') {
              if (selectedLocationIdRef.current === 'usa') {
                handleResetOverview();
              } else {
                onSelectLocationRef.current?.('usa');
              }
            } else {
              handleResetOverview();
            }
          })
          // Click anywhere on the globe ocean/background: click to zoom out
          .onGlobeClick(() => {
            handleResetOverview();
          })
          // Moving Blue Arcs
          .arcsData(isHydSelected ? [...BLUE_ARCS, ...INDIA_BRANCH_ARCS] : BLUE_ARCS)
          .arcColor('color')
          .arcDashLength(0.4)
          .arcDashGap(0.2)
          .arcDashAnimateTime(reduceMotion ? 0 : 1500)
          .arcStroke(0.65)
          .arcAltitude((arc: unknown) => {
            const a = arc as { isLocal?: boolean };
            return a.isLocal ? 0.08 : 0.25;
          })
          // Points
          .pointsData(isHydSelected ? INDIA_BRANCH_POINTS : LOCATIONS)
          .pointLat('lat')
          .pointLng('lng')
          .pointColor('color')
          .pointRadius((p: unknown) => {
            const pt = p as { radius?: number };
            return pt.radius || 0.35;
          })
          .pointAltitude(0.025)
          .onPointClick((point: unknown) => {
            const p = point as { id: string };
            if (p?.id === selectedLocationIdRef.current) {
              handleResetOverview();
            } else if (p?.id === 'hyderabad' || p?.id === 'dubai' || p?.id === 'usa') {
              onSelectLocationRef.current?.(p.id as 'hyderabad' | 'dubai' | 'usa');
            }
          })
          // Animated Ripple Radar Rings
          .ringsData(isHydSelected ? INDIA_BRANCH_RINGS : RINGS)
          .ringLat('lat')
          .ringLng('lng')
          .ringMaxRadius('maxR')
          .ringPropagationSpeed('propagationSpeed')
          .ringRepeatPeriod('repeatPeriod')
          .ringAltitude(0.028)
          .ringColor((r: unknown) => {
            const ring = r as { color: string };
            return (t: number) => {
              const alpha = Math.max(0, 1 - t) * 0.75;
              return ring.color === '#e8501e'
                ? `rgba(232, 80, 30, ${alpha})`
                : `rgba(56, 189, 248, ${alpha})`;
            };
          })
          // Clean, readable, well-spaced branch labels
          .labelsData(isHydSelected ? INDIA_BRANCH_LABELS : LABELS)
          .labelLat('lat')
          .labelLng('lng')
          .labelText('text')
          .labelSize((d: unknown) => {
            const l = d as { size?: number };
            return l.size || 0.45;
          })
          .labelDotRadius(0.12)
          .labelDotOrientation((d: object) => {
            const l = d as { orientation?: 'right' | 'top' | 'bottom' };
            return (l.orientation || 'bottom') as 'right' | 'top' | 'bottom';
          })
          .labelColor('color')
          .labelAltitude(0.04)
          .labelResolution(4)
          .onLabelClick((l: unknown) => {
            const label = l as { id: string };
            if (label?.id === selectedLocationIdRef.current) {
              handleResetOverview();
            } else if (label?.id === 'hyderabad' || label?.id === 'dubai' || label?.id === 'usa') {
              onSelectLocationRef.current?.(label.id as 'hyderabad' | 'dubai' | 'usa');
            }
          });

        const mat = world.globeMaterial() as unknown as { color: { set: (c: string) => void }; opacity: number; transparent: boolean };
        mat.color.set('#0284c7');
        mat.opacity = 0.95;
        mat.transparent = true;

        const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 1024;
        const controls = world.controls();
        controls.autoRotate = !reduceMotion;
        controls.autoRotateSpeed = 2.5;
        controls.enableZoom = false;

        if (isMobileDevice && controls) {
          controls.enableRotate = false;
          const canvasEl = mount.querySelector('canvas');
          if (canvasEl) {
            canvasEl.style.touchAction = 'pan-y';
          }
        }

        worldRef.current = world;

        if (selectedLocationIdRef.current) {
          const target = LOCATIONS.find((loc) => loc.id === selectedLocationIdRef.current);
          if (target) {
            world.pointOfView({ lat: target.lat, lng: target.lng, altitude: selectedLocationIdRef.current === 'hyderabad' ? 0.88 : 1.2 }, 800);
            controls.autoRotate = false;
          }
        } else {
          world.pointOfView({ lat: 20, lng: 50, altitude: 2.2 });
          controls.autoRotate = !reduceMotion;
          controls.autoRotateSpeed = 2.5;
        }

        const handleResize = () => {
          if (!mount || !world) return;
          const w = mount.clientWidth || 550;
          const h = mount.clientHeight || 550;
          world.width(w).height(h);
        };

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(mount);
        handleResize();

        setLoading(false);

        return () => {
          resizeObserver.disconnect();
          try {
            world._destructor?.();
          } catch {
            // fallback
          }
        };
      } catch (err) {
        console.error('Globe init error:', err);
        setLoading(false);
      }
    }

    const cleanupPromise = init();

    return () => {
      isDisposed = true;
      cleanupPromise.then((cleanup) => cleanup?.());
    };
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[260px] sm:min-h-[380px] lg:min-h-[560px] flex items-center justify-center overflow-hidden touch-pan-y ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-3.5 h-3.5 rounded-full border-2 border-indigo-400/40 border-t-indigo-500 animate-spin" />
          <span>Loading globe…</span>
        </div>
      )}
      
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y" />



      {/* Floating Interactive Camera Reset Control */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/90 shadow-md">
        <button
          id="globe-ctrl-reset"
          onClick={handleResetOverview}
          title="Reset to Global Overview"
          aria-label="Reset to Global Overview"
          className="p-2 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-600 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>


    </div>
  );
};
