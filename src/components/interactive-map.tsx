
"use client";

import "leaflet/dist/leaflet.css";
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Filter, Layers, Loader2, Pin, ShieldAlert, ShieldCheck, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { assessMapRisk } from "@/ai/flows/map-risk-assessment";
import type { MapRiskAssessmentOutput } from "@/ai/flows/map-risk-assessment";
import { Marker as MarkerType, LatLng } from 'leaflet';

// Fix for default icon path issue with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const uttarakhandDistricts = [
  { name: "Dehradun", center: [30.3165, 78.0322] },
  { name: "Haridwar", center: [29.9457, 78.1642] },
  { name: "Tehri Garhwal", center: [30.3804, 78.4735] },
  { name: "Rudraprayag", center: [30.2842, 78.9806] },
  { name: "Chamoli", center: [30.2938, 79.5603] },
  { name: "Uttarkashi", center: [30.7268, 78.4357] },
  { name: "Pauri Garhwal", center: [30.1499, 78.7744] },
  { name: "Almora", center: [29.5959, 79.6585] },
  { name: "Nainital", center: [29.3803, 79.4538] },
  { name: "Pithoragarh", center: [29.5833, 80.2167] },
  { name: "Champawat", center: [29.3333, 80.1] },
  { name: "Bageshwar", center: [29.8455, 79.7719] },
  { name: "Udham Singh Nagar", center: [29.025, 79.4] },
];

const riskLevels = [
  { level: "High", color: "bg-red-600" },
  { level: "Medium", color: "bg-yellow-400" },
  { level: "Low", color: "bg-green-500" },
];

const tileLayers = {
  default: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
};

const RiskIcon = ({ risk, className }: { risk: string, className?: string }) => {
  const riskLower = risk.toLowerCase();
  if (riskLower === 'high') return <ShieldAlert className={className} />;
  if (riskLower === 'medium') return <Shield className={className} />;
  return <ShieldCheck className={className} />;
};

const riskBadgeVariant = (risk: string) : "destructive" | "secondary" | "default" => {
    switch (risk.toLowerCase()) {
        case 'high': return 'destructive';
        case 'medium': return 'secondary';
        case 'low': return 'default';
        default: return 'default';
    }
}

function MapEvents({ 
  onMapClick, 
  clickedPosition, 
  isLoading, 
  assessment 
}: { 
  onMapClick: (latlng: LatLng) => void,
  clickedPosition: LatLng | null,
  isLoading: boolean,
  assessment: MapRiskAssessmentOutput | null,
}) {
    const map = useMap();
    const markerRef = useRef<MarkerType>(null);
    
    useEffect(() => {
        const handleMapClick = (e: L.LeafletMouseEvent) => {
            onMapClick(e.latlng);
        };
        map.on('click', handleMapClick);
        return () => {
            map.off('click', handleMapClick);
        };
    }, [map, onMapClick]);

    useEffect(() => {
      if (markerRef.current && clickedPosition && (assessment || isLoading)) {
        markerRef.current.openPopup();
      }
    }, [assessment, isLoading, clickedPosition]);

    if (!clickedPosition) return null;
    
    return (
        <Marker position={clickedPosition} ref={markerRef}>
            <Popup>
                <div className="w-64">
                    {isLoading ? (
                        <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : assessment ? (
                        <div className="space-y-2">
                            <h3 className="font-bold flex items-center gap-2">
                                <RiskIcon risk={assessment.riskPercentage > 60 ? 'High' : assessment.riskPercentage > 30 ? 'Medium' : 'Low'} className="h-5 w-5" />
                                Risk Assessment
                            </h3>
                            <div className="text-center">
                                <p className="text-3xl font-bold">{assessment.riskPercentage}%</p>
                                <Badge variant={riskBadgeVariant(assessment.riskPercentage > 60 ? 'High' : assessment.riskPercentage > 30 ? 'Medium' : 'Low')}>
                                    {assessment.riskPercentage > 60 ? 'High' : assessment.riskPercentage > 30 ? 'Medium' : 'Low'} Risk
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{assessment.analysis}</p>
                        </div>
                    ) : (
                        <p>No assessment available.</p>
                    )}
                </div>
            </Popup>
        </Marker>
    );
}

function MapController({ flyTo }: { flyTo: L.LatLng | null }) {
    const map = useMap();
    useEffect(() => {
        if(flyTo) {
            map.flyTo(flyTo, 12);
        }
    }, [flyTo, map]);

    return null;
}

export default function InteractiveMap() {
  const [currentTileLayer, setCurrentTileLayer] = useState<keyof typeof tileLayers>('default');
  const [flyTo, setFlyTo] = useState<L.LatLng | null>(null);
  const [assessment, setAssessment] = useState<MapRiskAssessmentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedPosition, setClickedPosition] = useState<LatLng | null>(null);

  const handleDistrictSelect = (center: [number, number]) => {
    setFlyTo(L.latLng(center[0], center[1]));
  };
  
  const handleMapClick = async (latlng: LatLng) => {
      setClickedPosition(latlng);
      setIsLoading(true);
      setAssessment(null);
      try {
        const result = await assessMapRisk({ latitude: latlng.lat, longitude: latlng.lng });
        setAssessment(result);
      } catch (e) {
        console.error("Risk assessment failed:", e);
        setAssessment({ riskPercentage: 0, analysis: "Could not assess risk. Please try again later." });
      }
      setIsLoading(false);
  };

  const getRiskLevel = (percentage: number) => {
    if (percentage > 60) return 'High';
    if (percentage > 30) return 'Medium';
    return 'Low';
  };

  return (
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <CardTitle>Uttarakhand Landslide Susceptibility</CardTitle>
              <CardDescription>Click on the map to get an AI-powered risk assessment for that location.</CardDescription>
            </div>
            <div className="flex gap-2">
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter by District
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {uttarakhandDistricts.map(district => (
                    <DropdownMenuItem key={district.name} onClick={() => handleDistrictSelect(district.center as [number, number])}>
                      {district.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Layers className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setCurrentTileLayer('default')}>Default</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentTileLayer('satellite')}>Satellite</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="aspect-[4/3] w-full rounded-lg overflow-hidden border">
                <MapContainer
                  center={[30.0668, 79.0193]}
                  zoom={8}
                  style={{ height: "100%", width: "100%" }}
                  className="rounded-lg"
                >
                  <TileLayer
                    url={tileLayers[currentTileLayer].url}
                    attribution={tileLayers[currentTileLayer].attribution}
                    key={currentTileLayer}
                  />
                  <MapController flyTo={flyTo} />
                  <MapEvents 
                    onMapClick={handleMapClick}
                    clickedPosition={clickedPosition}
                    isLoading={isLoading}
                    assessment={assessment}
                  />
                </MapContainer>
            </div>
          </div>
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Legend & Info</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="mt-2 text-sm">Assessing risk...</p>
                    </div>
                ) : assessment ? (
                    <div className="space-y-4 animate-fade-in-up">
                        <h3 className="font-semibold text-center">Selected Point Analysis</h3>
                        <div className="text-center">
                            <p className="text-4xl font-bold">{assessment.riskPercentage}%</p>
                            <Badge variant={riskBadgeVariant(getRiskLevel(assessment.riskPercentage))}>
                                {getRiskLevel(assessment.riskPercentage)} Risk
                            </Badge>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Analysis:</p>
                            <p className="text-sm text-muted-foreground">{assessment.analysis}</p>
                        </div>
                        {clickedPosition && (
                            <div>
                                <p className="text-sm font-medium">Coordinates:</p>
                                <p className="text-sm text-muted-foreground">
                                    {clickedPosition.lat.toFixed(4)}, {clickedPosition.lng.toFixed(4)}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <p className="text-sm text-muted-foreground mb-4">Risk levels are dynamically calculated by AI based on multiple factors.</p>
                        <ul className="space-y-3">
                            {riskLevels.map(risk => (
                                <li key={risk.level} className="flex items-center gap-3">
                                    <span className={`h-4 w-4 rounded-full ${risk.color}`}></span>
                                    <span className="font-medium text-sm">{risk.level} Risk</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 pt-6 border-t">
                            <div className="flex items-start gap-3 text-primary">
                                <Pin className="h-5 w-5 mt-1 shrink-0" />
                                <p className="text-sm">
                                    Click anywhere on the map to pin a location and receive an instant landslide risk assessment for the next 7 days.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
  );
}
