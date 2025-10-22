"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { assessLandslideRisk } from "@/ai/flows/real-time-landslide-risk";
import type { LandslideRiskOutput } from "@/ai/flows/real-time-landslide-risk";
import { AlertCircle, BarChart, CheckCircle, Info, Loader2, MapPin, Shield, ShieldAlert, ShieldCheck, Siren } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  latitude: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(-90, "Must be >= -90").max(90, "Must be <= 90")
  ),
  longitude: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(-180, "Must be >= -180").max(180, "Must be <= 180")
  ),
});

type FormData = z.infer<typeof formSchema>;

export function RealTimeRiskAssessment() {
  const [assessment, setAssessment] = useState<LandslideRiskOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      latitude: 30.0668,
      longitude: 79.0193,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setAssessment(null);
    try {
      const result = await assessLandslideRisk(data);
      setAssessment(result);
    } catch (e: any) {
      console.error("Error in getLandslideRiskAssessment action:", e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(`Failed to get risk assessment: ${errorMessage}`);
    }
    setIsLoading(false);
  };
  
  const handleFetchLocation = () => {
    setIsFetchingLocation(true);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            form.setValue("latitude", position.coords.latitude);
            form.setValue("longitude", position.coords.longitude);
            setIsFetchingLocation(false);
        }, (err) => {
            setError(err.message);
            setIsFetchingLocation(false);
        });
    } else {
        setError("Geolocation is not supported by this browser.");
        setIsFetchingLocation(false);
    }
  }

  const RiskIcon = ({ risk }: { risk: string }) => {
    switch (risk.toLowerCase()) {
      case 'high': return <ShieldAlert className="h-12 w-12 text-red-500" />;
      case 'medium': return <Shield className="h-12 w-12 text-yellow-500" />;
      case 'low': return <ShieldCheck className="h-12 w-12 text-green-500" />;
      default: return <BarChart className="h-12 w-12 text-gray-500" />;
    }
  };

  const riskBadgeVariant = (risk: string) : "destructive" | "secondary" | "default" => {
    switch (risk.toLowerCase()) {
        case 'high': return 'destructive';
        case 'medium': return 'secondary';
        case 'low': return 'default';
        default: return 'default';
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Assess Location Risk</CardTitle>
          <CardDescription>Enter coordinates to get a real-time landslide risk assessment.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl><Input type="number" step="any" placeholder="e.g., 30.0668" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl><Input type="number" step="any" placeholder="e.g., 79.0193" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" variant="outline" className="w-full" onClick={handleFetchLocation} disabled={isFetchingLocation}>
                {isFetchingLocation ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <MapPin className="mr-2 h-4 w-4" />}
                Use My Current Location
              </Button>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Assess Risk'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Result</CardTitle>
          <CardDescription>Analysis based on real-time satellite and weather data.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[300px]">
          {isLoading && <Loader2 className="h-10 w-10 animate-spin text-primary" />}
          {error && (
             <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!isLoading && !error && !assessment && (
            <div className="text-center text-muted-foreground">
                <BarChart className="mx-auto h-12 w-12 mb-2"/>
                <p>Results will be displayed here.</p>
            </div>
          )}
          {assessment && (
            <div className="w-full space-y-6 animate-fade-in-up">
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
                <RiskIcon risk={assessment.riskLevel} />
                <h3 className="text-xl font-semibold mt-4">Risk Level</h3>
                <Badge variant={riskBadgeVariant(assessment.riskLevel)} className="mt-2 text-lg px-4 py-1">{assessment.riskLevel}</Badge>
              </div>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Analysis & Description</AlertTitle>
                <AlertDescription>{assessment.description}</AlertDescription>
              </Alert>
              <Alert className="border-primary">
                <Siren className="h-4 w-4 text-primary" />
                <AlertTitle>Recommendations</AlertTitle>
                <AlertDescription>{assessment.recommendations}</AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
