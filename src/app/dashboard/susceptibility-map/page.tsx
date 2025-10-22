import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function SusceptibilityMapPage() {
  const mapImage = PlaceHolderImages.find(img => img.id === "susceptibility-map");

  const riskLevels = [
    { level: "Very High", color: "bg-red-600", stats: "15.7%" },
    { level: "High", color: "bg-orange-500", stats: "23.1%" },
    { level: "Medium", color: "bg-yellow-400", stats: "35.2%" },
    { level: "Low", color: "bg-green-500", stats: "21.0%" },
    { level: "Very Low", color: "bg-emerald-300", stats: "5.0%" },
  ];

  return (
    <div className="animate-fade-in-up">
      <PageHeader title="Susceptibility Map" />
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <CardTitle>Uttarakhand Landslide Susceptibility</CardTitle>
              <CardDescription>Interactive map showing risk levels based on ML model.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download Map
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="aspect-[4/3] w-full rounded-lg overflow-hidden border">
              {mapImage && (
                <Image
                  src={mapImage.imageUrl}
                  alt={mapImage.description}
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                  data-ai-hint={mapImage.imageHint}
                />
              )}
            </div>
          </div>
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {riskLevels.map(risk => (
                    <li key={risk.level} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`h-4 w-4 rounded-full ${risk.color}`}></span>
                        <span className="font-medium text-sm">{risk.level}</span>
                      </div>
                      <Badge variant="secondary">{risk.stats}</Badge>
                    </li>
                  ))}
                </ul>
                <Separator className="my-6"/>
                <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Data Source:</strong> Sentinel-2, SRTM, GPM</p>
                    <p><strong>Last Updated:</strong> 24 hours ago</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
