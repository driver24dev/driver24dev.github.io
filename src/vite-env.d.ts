/// <reference types="vite/client" />

declare module 'leaflet-routing-machine' {
  import * as L from 'leaflet';

  namespace Routing {
    class Control extends L.Control {
      constructor(options?: ControlOptions);
      getContainer(): HTMLElement | undefined;
      setWaypoints(waypoints: L.LatLng[]): this;
      spliceWaypoints(index: number, waypointsToRemove: number, ...wayPoints: L.LatLng[]): L.LatLng[];
      getPlan(): Plan;
    }

    interface ControlOptions {
      waypoints?: L.LatLng[];
      router?: any;
      plan?: Plan;
      lineOptions?: LineOptions;
      routeWhileDragging?: boolean;
      addWaypoints?: boolean;
      draggableWaypoints?: boolean;
      fitSelectedRoutes?: boolean;
      showAlternatives?: boolean;
    }

    interface LineOptions {
      styles?: L.PathOptions[];
      extendToWaypoints?: boolean;
      missingRouteTolerance?: number;
    }

    class Plan extends L.Class {
      constructor(waypoints: L.LatLng[], options?: PlanOptions);
    }

    interface PlanOptions {
      dragStyles?: L.PathOptions[];
      draggableWaypoints?: boolean;
      addWaypoints?: boolean;
    }
  }

  export = Routing;
}