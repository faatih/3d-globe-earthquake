/// <reference types="vite/client" />
declare module 'react-globe.gl' {
  import { Component } from 'react';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

  export interface GlobeMethods {
    controls: () => OrbitControls;
  }

  interface HexBinData {
    sumWeight: number;
    count: number;
    points: any[];
  }

  export interface GlobeProps {
    width?: number;
    height?: number;
    globeImageUrl?: string;
    bumpImageUrl?: string;
    backgroundImageUrl?: string;
    hexBinPointsData?: any[];
    hexBinPointWeight?: string;
    hexAltitude?: ((d: HexBinData) => number) | number;
    hexBinResolution?: number;
    hexTopColor?: ((d: HexBinData) => string) | string;
    hexSideColor?: ((d: HexBinData) => string) | string;
    hexBinMerge?: boolean;
    hexTransitionDuration?: number;
    hexLabel?: ((d: HexBinData) => string) | null;
    atmosphereColor?: string;
    atmosphereAltitude?: number;
  }

  export default class Globe extends Component<GlobeProps> {}
}