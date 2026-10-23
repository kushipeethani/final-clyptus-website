import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ProjectShowcase {
  progress: number;
  title: string;
  subtitle: string;
  color: string;
  side: number;
  offset: THREE.Vector3;
  imageUrl?: string;
}

interface RoadTimelineSectionProps {
  externalProgress?: number;
  isFrozen?: boolean;
}

// Helper to smoothly decelerate and pause around each exact milestone screenshot position
const applyMilestoneSlowing = (rawP: number): number => {
  const milestones = [0.12, 0.28, 0.44, 0.62, 0.78];
  let p = rawP;
  
  for (const m of milestones) {
    const R = 0.08; // Generous window around each milestone image for pronounced slowdown
    const dist = rawP - m;
    if (Math.abs(dist) < R) {
      const t = dist / R; // range [-1, 1]
      // Strong 85% deceleration at milestone image center so users have ample time to view each card
      const compressed = 0.15 * t + 0.85 * Math.pow(t, 3);
      const shift = (compressed - t) * R;
      p += shift;
    }
  }

  return Math.max(0, Math.min(1, p));
};

export const RoadTimelineSection: React.FC<RoadTimelineSectionProps> = ({ externalProgress, isFrozen }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const targetProgressRef = useRef<number>(0);
  const externalProgressRef = useRef<number | undefined>(externalProgress);
  const isFrozenRef = useRef<boolean>(!!isFrozen);

  useEffect(() => {
    isFrozenRef.current = !!isFrozen;
  }, [isFrozen]);

  // Sync external scroll progress when provided by parent curtain wrapper
  useEffect(() => {
    externalProgressRef.current = externalProgress;
    if (externalProgress !== undefined && !isFrozenRef.current) {
      targetProgressRef.current = applyMilestoneSlowing(Math.max(0, Math.min(1, externalProgress)));
    }
  }, [externalProgress]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- Palette Color Stops ---
    const themes = [
      { progress: 0.00, bg: new THREE.Color('#cddffb'), road: new THREE.Color('#19293f'), text: '#172b4d' },
      { progress: 0.33, bg: new THREE.Color('#c2e8cb'), road: new THREE.Color('#173322'), text: '#152b1e' },
      { progress: 0.66, bg: new THREE.Color('#e8d4cf'), road: new THREE.Color('#38221b'), text: '#2e1913' },
      { progress: 1.00, bg: new THREE.Color('#d2e8ea'), road: new THREE.Color('#1c2e30'), text: '#142527' }
    ];

    const currentBg = new THREE.Color(themes[0].bg);
    const currentRoad = new THREE.Color(themes[0].road);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    const scene = new THREE.Scene();
    scene.background = currentBg;
    scene.fog = new THREE.FogExp2(currentBg, 0.01);

    const isMobileView = container.clientWidth < 768;
    const camera = new THREE.PerspectiveCamera(isMobileView ? 58 : 46, container.clientWidth / container.clientHeight, 0.1, 500);

    // --- Lights ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(20, 40, 20);
    scene.add(dirLight);

    // --- Spline Curve Road ---
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(8, 0, -50),
      new THREE.Vector3(-10, 0, -110),
      new THREE.Vector3(12, 0, -170),
      new THREE.Vector3(-6, 0, -230),
      new THREE.Vector3(0, 0, -300)
    ]);

    // --- Road Dot Array ---
    const roadSteps = 350;
    const dotsAcross = 5;
    const roadWidth = 5.6;
    const totalDots = roadSteps * dotsAcross;

    const dotGeo = new THREE.CircleGeometry(0.045, 8);
    const dotMat = new THREE.MeshBasicMaterial({
      color: currentRoad,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide
    });
    const roadInstanced = new THREE.InstancedMesh(dotGeo, dotMat, totalDots);

    const dummy = new THREE.Object3D();
    let dotIdx = 0;

    for (let i = 0; i < roadSteps; i++) {
      const u = i / (roadSteps - 1);
      const pt = curve.getPointAt(u);
      const tangent = curve.getTangentAt(u).normalize();
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      for (let j = 0; j < dotsAcross; j++) {
        const lateral = ((j / (dotsAcross - 1)) - 0.5) * roadWidth;
        const pos = pt.clone().addScaledVector(normal, lateral);

        dummy.position.set(pos.x, pos.y + 0.02, pos.z);
        dummy.rotation.x = Math.PI / 2;
        dummy.updateMatrix();
        roadInstanced.setMatrixAt(dotIdx++, dummy.matrix);
      }
    }
    roadInstanced.instanceMatrix.needsUpdate = true;
    scene.add(roadInstanced);

    // --- Canvas Card Texture Creator ---
    function makeCardTexture(sceneColor: string) {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 600;
      const ctx = c.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(c);

      const grad = ctx.createLinearGradient(0, 0, 0, c.height);
      grad.addColorStop(0, sceneColor);
      grad.addColorStop(0.5, '#eecab7');
      grad.addColorStop(1, '#6ea0bf');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = '#f8f8fb';
      ctx.beginPath();
      ctx.ellipse(c.width / 2, c.height / 2 + 50, 320, 240, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#1c212a';
      ctx.fillRect(c.width / 2 - 120, c.height / 2 - 60, 240, 140);

      ctx.fillStyle = sceneColor;
      ctx.fillRect(c.width / 2 - 110, c.height / 2 - 50, 220, 120);

      return new THREE.CanvasTexture(c);
    }

    function makeTextSprite(title: string, subtitle: string, isMobileView: boolean) {
      const c = document.createElement('canvas');
      const ctx = c.getContext('2d');
      if (!ctx) return new THREE.Sprite();

      const subtitleLines = subtitle.split('\n');

      if (isMobileView) {
        c.width = 720;
        c.height = Math.max(220, 80 + subtitleLines.length * 44);

        // Transparent background (No white card background)

        // Milestone Year Title (Bold high-contrast text, centered)
        ctx.textAlign = 'center';
        ctx.fillStyle = '#050b14';
        ctx.font = 'bold 38px sans-serif';
        ctx.fillText(title, c.width / 2, 48);

        // Subtitle Bullet Lines (Clean high-contrast dark text directly on scene)
        ctx.textAlign = 'center';
        ctx.fillStyle = '#050b14';
        ctx.font = 'bold 23px sans-serif';
        subtitleLines.forEach((line, index) => {
          ctx.fillText(line, c.width / 2, 98 + index * 42);
        });
      } else {
        // Desktop: Transparent high-contrast typography (100% UNCHANGED)
        c.width = 768;
        c.height = Math.max(200, 100 + subtitleLines.length * 48);

        // Title - Solid Deep Dark Black (Transparent background, no white card)
        ctx.fillStyle = '#050b14';
        ctx.font = 'bold 42px sans-serif';
        ctx.fillText(title, 20, 52);

        // Subtitle Bullet Lines - Solid High-Contrast Dark Black
        ctx.fillStyle = '#050b14';
        ctx.font = 'bold 24px sans-serif';
        subtitleLines.forEach((line, index) => {
          ctx.fillText(line, 20, 108 + index * 44);
        });
      }

      const tex = new THREE.CanvasTexture(c);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
      if (isMobileView) {
        sprite.scale.set(4.6, 4.6 * (c.height / c.width), 1);
      } else {
        sprite.scale.set(6.4, 3.2, 1);
      }
      return sprite;
    }

    // --- Project Showcases List ---
    const cardGeo = new THREE.PlaneGeometry(5.6, 3.8);
    const textureLoader = new THREE.TextureLoader();

    const projectList: ProjectShowcase[] = [
      { progress: 0.12, title: '2014–2016', subtitle: '• Company founded & launched SAP and HCM\n• Delivered first international SAP project – Dubai', color: '#f3c4b1', side: -1, offset: new THREE.Vector3(0, 1.9, 8), imageUrl: '/milestone_2014_2016.jpg' },
      { progress: 0.28, title: '2016–2018', subtitle: '• Expanded SAP delivery across 3+ countries\n• Served 15+ customers\n• Team grew to 65+ consultants\n• Delivered major SAP implementations in UAE & India', color: '#b8d8e8', side: 1, offset: new THREE.Vector3(0, 1.8, 8), imageUrl: '/milestone_2016_2018.jpg' },
      { progress: 0.44, title: '2018–2020', subtitle: '• Introduced SAP Cloud Services\n• Team scaled to 87+ consultants\n• Launched SAP S/4HANA Practice', color: '#cbd5f5', side: -1, offset: new THREE.Vector3(0, 1.8, 8), imageUrl: '/milestone_2018_2020.jpg' },
      { progress: 0.62, title: '2020–2023', subtitle: '• Introduced Data Analytics & BRIM Talent Solutions\n• Team strength: 120+\n• Customer base: 110+\n• SAP Partner Silver Certified', color: '#d6e6b7', side: 1, offset: new THREE.Vector3(0, 1.7, 8), imageUrl: '/milestone_2020_2023.jpg' },
      { progress: 0.78, title: '2023–2025', subtitle: '• Introduced SAP BTP Practice\n• Built SAP Add-on Solutions\n• Integrated SAP AI capabilities\n• Team expanded to 250+ SAP consultants', color: '#e8d4cf', side: -1, offset: new THREE.Vector3(0, 1.7, 8), imageUrl: '/milestone_2023_2025.jpg' }
    ];

    const isMobile = container.clientWidth < 768;

    projectList.forEach(item => {
      const group = new THREE.Group();
      const pos = curve.getPointAt(item.progress);
      const tangent = curve.getTangentAt(item.progress).normalize();
      const right = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      if (isMobile) {
        // Mobile: Positioned directly in the MIDDLE ON THE ROAD (zero lateral offset)
        const roadForward = tangent.clone().multiplyScalar(4.8);
        group.position.copy(pos).add(roadForward);
        group.position.y = pos.y;
        group.rotation.y = Math.atan2(-tangent.x, -tangent.z);
      } else {
        // Desktop: 100% UNCHANGED
        group.position.copy(pos).addScaledVector(right, item.side * (roadWidth / 2 + 2.5)).add(item.offset);
        group.rotation.y = Math.atan2(-tangent.x, -tangent.z);
      }

      let mat: THREE.Material;
      if (item.imageUrl) {
        const tex = textureLoader.load(item.imageUrl);
        tex.colorSpace = THREE.SRGBColorSpace;
        mat = new THREE.MeshBasicMaterial({
          map: tex,
          side: THREE.DoubleSide,
          fog: false
        });
      } else {
        mat = new THREE.MeshBasicMaterial({
          map: makeCardTexture(item.color),
          side: THREE.DoubleSide,
          fog: false
        });
      }

      // 1. Image Plane Mesh (Centered directly in middle on road, above text)
      const cardMesh = new THREE.Mesh(cardGeo, mat);
      const meshX = isMobile ? 0 : (item.side > 0 ? 3.4 : -3.4);
      const meshY = isMobile ? 2.35 : 0;
      cardMesh.position.set(meshX, meshY, 0);
      if (isMobile) {
        cardMesh.scale.set(0.62, 0.62, 1);
      }
      group.add(cardMesh);

      // 2. Text Sprite Card (Centered directly in middle on road, below image)
      const sprite = makeTextSprite(item.title, item.subtitle, isMobile);
      sprite.material.fog = false;
      const spriteX = isMobile ? 0 : (item.side > 0 ? -3.4 : 3.4);
      const spriteY = isMobile ? 0.45 : 0;
      sprite.position.set(spriteX, spriteY, 0.05);
      group.add(sprite);

      scene.add(group);
    });

    // --- Controls ---
    let currentProgress = 0;
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (externalProgressRef.current !== undefined) return;
      targetProgressRef.current += e.deltaY * 0.00035;
      targetProgressRef.current = Math.max(0, Math.min(1, targetProgressRef.current));
    };

    let isTouching = false;
    let touchY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (externalProgressRef.current !== undefined) return;
      isTouching = true;
      touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching || externalProgressRef.current !== undefined) return;
      const dy = touchY - e.touches[0].clientY;
      touchY = e.touches[0].clientY;
      targetProgressRef.current += dy * 0.0008;
      targetProgressRef.current = Math.max(0, Math.min(1, targetProgressRef.current));
    };

    const handleTouchEnd = () => {
      isTouching = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isFrozenRef.current) return;
      const rect = container.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / container.clientWidth - 0.5) * 2;
      targetMouseY = ((e.clientY - rect.top) / container.clientHeight - 0.5) * 2;
    };

    const handleResize = () => {
      if (!container) return;
      camera.fov = container.clientWidth < 768 ? 58 : 46;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // --- Dynamic Color Transition ---
    function updateColors(p: number) {
      let idx = 0;
      for (let i = 0; i < themes.length - 1; i++) {
        if (p >= themes[i].progress && p <= themes[i + 1].progress) {
          idx = i;
          break;
        }
      }
      const tA = themes[idx];
      const tB = themes[idx + 1];
      const factor = (p - tA.progress) / (tB.progress - tA.progress);

      currentBg.copy(tA.bg).lerp(tB.bg, factor);
      currentRoad.copy(tA.road).lerp(tB.road, factor);

      scene.background = currentBg;
      if (scene.fog) {
        scene.fog.color = currentBg;
      }
      dotMat.color = currentRoad;
    }

    // --- Animation Loop ---
    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);

      if (isFrozenRef.current) {
        currentProgress = 0;
        targetProgressRef.current = 0;
        mouseX = 0;
        mouseY = 0;
        targetMouseX = 0;
        targetMouseY = 0;
      } else {
        currentProgress += (targetProgressRef.current - currentProgress) * 0.045;
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;
      }

      updateColors(currentProgress);

      const pos = curve.getPointAt(currentProgress);
      const lookAhead = curve.getPointAt(Math.min(currentProgress + 0.04, 1));

      camera.position.set(
        pos.x + mouseX * 0.8,
        pos.y + 1.6 - mouseY * 0.45,
        pos.z + 1.8
      );
      camera.lookAt(lookAhead.x, lookAhead.y + 1.1, lookAhead.z);

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen min-h-[650px] overflow-hidden select-none font-sans border-t border-slate-300/40"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 block cursor-grab active:cursor-grabbing" />
    </section>
  );
};
