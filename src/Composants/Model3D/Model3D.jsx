import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Composant pour charger et afficher le modèle 3D avec auto-fit
function Model({ url }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();
  const { camera, size: viewSize } = useThree();
  
  useEffect(() => {
    if (scene) {
      // Calculer la bounding box du modèle
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const modelSize = box.getSize(new THREE.Vector3());
      
      // Centrer le modèle
      scene.position.x = -center.x;
      scene.position.y = -center.y;
      scene.position.z = -center.z;
      
      // Calculer la distance de la caméra pour remplir l'espace vertical
      const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z);
      const fov = camera.fov * (Math.PI / 180);
      const aspect = viewSize.width / viewSize.height;
      
      // Calculer la distance pour remplir la hauteur
      const height = maxDim;
      const width = height * aspect;
      const distanceForHeight = height / (2 * Math.tan(fov / 2));
      const distanceForWidth = width / (2 * Math.tan(fov / 2));
      const distance = Math.max(distanceForHeight, distanceForWidth) * 1.3; // 1.3 pour un peu de marge
      
      camera.position.set(0, 0, distance);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
  }, [scene, camera, viewSize]);
  
  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={1} 
      position={[0, 0, 0]}
    />
  );
}

// Composant pour gérer le redimensionnement du canvas
function ResizeHandler({ containerRef }) {
  const { gl, size, setSize } = useThree();
  
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const width = Math.max(1, rect.width); // Éviter les valeurs nulles
        const height = Math.max(1, rect.height);
        
        // Forcer la mise à jour de la taille du canvas
        // setSize gère automatiquement le DPR via la prop dpr du Canvas
        setSize(width, height);
        gl.setSize(width, height, false);
        
        // Forcer aussi la mise à jour du style du canvas
        const canvas = gl.domElement;
        if (canvas) {
          // Forcer les styles pour s'assurer que le canvas prend toute la largeur/hauteur
          canvas.setAttribute('style', `
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            min-width: 0 !important;
            min-height: 0 !important;
            max-width: 100% !important;
            max-height: 100% !important;
            touch-action: auto;
          `);
        }
      }
    };
    
    // Utiliser ResizeObserver pour détecter les changements de taille
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      // Appeler immédiatement après le montage
      setTimeout(handleResize, 0);
      handleResize();
    }
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [gl, setSize, containerRef]);
  
  return null;
}

// Composant de chargement
const Loader = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-white text-sm">Chargement du modèle 3D...</div>
  </div>
);

// Composant principal avec Canvas
const Model3D = ({ modelPath, className = '' }) => {
  const containerRef = useRef(null);
  
  // Précharger le modèle pour optimiser les performances
  useGLTF.preload(modelPath);
  
  useEffect(() => {
    // Forcer le redimensionnement après le montage
    const forceResize = () => {
      if (containerRef.current) {
        const canvas = containerRef.current.querySelector('canvas');
        if (canvas) {
          const rect = containerRef.current.getBoundingClientRect();
          
          // Forcer les styles directement sur le canvas
          // React Three Fiber gère automatiquement les attributs width/height via dpr
          canvas.setAttribute('style', `
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            min-width: 0 !important;
            min-height: 0 !important;
            max-width: 100% !important;
            max-height: 100% !important;
            touch-action: auto;
          `);
        }
      }
    };
    
    // Observer pour détecter quand le canvas est créé
    const observer = new MutationObserver(() => {
      forceResize();
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true
      });
    }
    
    // Appeler immédiatement et après des délais
    forceResize();
    setTimeout(forceResize, 100);
    setTimeout(forceResize, 300);
    setTimeout(forceResize, 500);
    
    window.addEventListener('resize', forceResize);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', forceResize);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`w-full h-full relative ${className}`} 
      style={{ 
        margin: 0, 
        padding: 0,
        width: '100%',
        height: '100%',
        minWidth: 0,
        minHeight: 0,
        maxHeight: '100%',
        maxWidth: '100%',
        display: 'flex'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ 
          background: 'transparent',
          display: 'block',
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          minWidth: 0,
          minHeight: 0,
          maxHeight: '100%',
          maxWidth: '100%',
          flex: '1 1 auto'
        }}
        gl={{ 
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        dpr={[1, 2]}
        frameloop="always"
        onCreated={({ camera }) => {
          camera.position.set(0, 0, 5);
        }}
      >
        <ResizeHandler containerRef={containerRef} />
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <pointLight position={[0, 10, 0]} intensity={0.3} />
          <Model url={modelPath} />
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={1}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2.5}
            target={[0, 0, 0]}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Model3D;

