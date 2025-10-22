"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MapPin, UploadCloud } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  latitude: z.string().min(1, "Latitude is required"),
  longitude: z.string().min(1, "Longitude is required"),
  description: z.string().min(10, "Description must be at least 10 characters.").max(500),
  severity: z.enum(["Low", "Medium", "High"]),
  photo: z.any().optional(),
});

export function SubmitReportForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      latitude: "",
      longitude: "",
      description: "",
      severity: "Low",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log(values);
    setTimeout(() => {
      toast({
        title: "Report Submitted Successfully",
        description: "Thank you for contributing to the safety of our community.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  const handleFetchLocation = () => {
    setIsFetchingLocation(true);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            form.setValue("latitude", position.coords.latitude.toFixed(6));
            form.setValue("longitude", position.coords.longitude.toFixed(6));
            setIsFetchingLocation(false);
            toast({ title: "Location captured successfully!" });
        }, (error) => {
            toast({ variant: "destructive", title: "Error fetching location", description: error.message });
            setIsFetchingLocation(false);
        });
    } else {
        toast({ variant: "destructive", title: "Geolocation not supported", description: "Your browser does not support geolocation." });
        setIsFetchingLocation(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Landslide Observation</CardTitle>
        <CardDescription>Your report helps improve our prediction models and alert systems.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 30.7346" {...field} />
                        </FormControl>
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
                        <FormControl>
                          <Input placeholder="e.g., 79.0669" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
              <Button type="button" variant="outline" className="w-full" onClick={handleFetchLocation} disabled={isFetchingLocation}>
                {isFetchingLocation ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <MapPin className="mr-2 h-4 w-4" />}
                Use My Current Location
              </Button>
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the event, e.g., rockfall, debris flow, any visible triggers..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="severity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Severity</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the severity level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Upload Photo</FormLabel>
                    <FormControl>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG or GIF (MAX. 5MB)</p>
                                </div>
                                <Input id="dropzone-file" type="file" className="hidden" {...field} />
                            </label>
                        </div> 
                    </FormControl>
                    <FormDescription>A photo can provide valuable context.</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Report
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
