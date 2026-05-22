import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Imperative Three.js scene (no JSX inside) to avoid babel-plugin
 * issues with R3F primitives in dev mode.
 */
export default function HeroScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene + camera + renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const accentLight = new THREE.PointLight(0xe6c229, 4, 12);
    accentLight.position.set(0, 0, 3);
    scene.add(accentLight);

    const fillLight = new THREE.PointLight(0xd4c5b9, 2, 10);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    // Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xe6c229,
      metalness: 0.85,
      roughness: 0.22,
      emissive: 0x3a2f00,
      emissiveIntensity: 0.3,
    });
    const beigeMat = new THREE.MeshStandardMaterial({
      color: 0xd4c5b9,
      metalness: 0.55,
      roughness: 0.45,
      emissive: 0x1a1814,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 1.0,
      roughness: 0.1,
      emissive: 0x080808,
    });

    // Meshes
    const torus = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.7, 0.22, 200, 32),
      goldMat,
    );
    torus.position.set(2.4, 0.8, -0.5);
    scene.add(torus);

    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.85, 0),
      beigeMat,
    );
    ico.position.set(-2.6, -0.6, 0.4);
    scene.add(ico);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 64, 64),
      darkMat,
    );
    sphere.position.set(0.4, -1.6, -1.2);
    scene.add(sphere);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.45, 0.05, 16, 100),
      goldMat.clone(),
    );
    ring.position.set(-1.4, 1.8, -1.5);
    ring.rotation.set(0.4, 0.2, 0);
    scene.add(ring);

    // Pointer state
    const pointer = { x: 0, y: 0 };
    const mouseLightTarget = new THREE.Vector3();

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("pointermove", onPointerMove);

    // Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // Floating helpers — keep base Y per mesh and add subtle sin offset
    const floats = [
      { mesh: torus, baseY: 0.8, speed: 1.2, amp: 0.18, phase: 0 },
      { mesh: ico, baseY: -0.6, speed: 1.6, amp: 0.25, phase: 1.2 },
      { mesh: sphere, baseY: -1.6, speed: 0.8, amp: 0.12, phase: 2.4 },
      { mesh: ring, baseY: 1.8, speed: 1.0, amp: 0.16, phase: 3.6 },
    ];

    // Animation
    let frameId;
    const clock = new THREE.Clock();
    const render = () => {
      const t = clock.getElapsedTime();
      const dt = clock.getDelta();

      torus.rotation.x += dt * 0.15;
      torus.rotation.y += dt * 0.2;
      ico.rotation.x += dt * 0.1;
      ico.rotation.z += dt * 0.15;
      sphere.rotation.y += dt * 0.3;
      ring.rotation.z += dt * 0.4;

      floats.forEach((f) => {
        f.mesh.position.y = f.baseY + Math.sin(t * f.speed + f.phase) * f.amp;
      });

      // Mouse-following accent light
      mouseLightTarget.set(pointer.x * 3.5, pointer.y * 2.5, 2.5);
      accentLight.position.lerp(mouseLightTarget, 0.06);

      // Subtle camera parallax
      camera.position.x += (pointer.x * 0.3 - camera.position.x) * 0.04;
      camera.position.y += (pointer.y * 0.2 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      // Dispose
      [torus, ico, sphere, ring].forEach((m) => {
        m.geometry.dispose();
        if (Array.isArray(m.material))
          m.material.forEach((mat) => mat.dispose());
        else m.material.dispose();
      });
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      data-testid="hero-3d-canvas"
    />
  );
}
