import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BellRing, History, PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const activeWarnings = [
  { zone: "Chamoli", risk: "High", issued: "2 hours ago", details: "Intense rainfall detected. Evacuation recommended for riverside areas." },
  { zone: "Rudraprayag", risk: "High", issued: "1 day ago", details: "Soil moisture at critical levels. Avoid travel on NH-58." },
];

const historicalWarnings = [
  { zone: "Pithoragarh", risk: "Medium", issued: "3 days ago", resolved: "2 days ago" },
  { zone: "Tehri", risk: "Low", issued: "5 days ago", resolved: "4 days ago" },
  { zone: "Nainital", risk: "High", issued: "1 week ago", resolved: "6 days ago" },
];

export default function EarlyWarningPage() {
  return (
    <div className="animate-fade-in-up space-y-6">
      <PageHeader title="Early Warning System" />

      <Card className="border-l-4 border-destructive">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BellRing className="h-6 w-6 text-destructive" />
            <CardTitle>Active Warnings</CardTitle>
          </div>
          <CardDescription>Live warnings requiring immediate attention.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeWarnings.map(w => (
              <div key={w.zone} className="p-4 rounded-lg border bg-card">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{w.zone}</p>
                    <p className="text-sm text-muted-foreground">{w.issued}</p>
                  </div>
                  <Badge variant="destructive">{w.risk} Risk</Badge>
                </div>
                <p className="mt-2 text-sm">{w.details}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <History className="h-6 w-6 text-muted-foreground" />
              <CardTitle>Historical Warnings</CardTitle>
            </div>
            <CardDescription>Log of all past warnings issued by the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Zone</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead>Resolved</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historicalWarnings.map(w => (
                  <TableRow key={w.zone}>
                    <TableCell className="font-medium">{w.zone}</TableCell>
                    <TableCell><Badge variant={w.risk === 'High' ? 'destructive' : w.risk === 'Medium' ? 'secondary' : 'default'}>{w.risk}</Badge></TableCell>
                    <TableCell>{w.issued}</TableCell>
                    <TableCell>{w.resolved}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
             <div className="flex items-center gap-3">
              <PlusCircle className="h-6 w-6 text-primary" />
              <CardTitle>Create New Warning</CardTitle>
            </div>
            <CardDescription>For admin use only. Issue a manual warning.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="zone">Zone Name</Label>
              <Input id="zone" placeholder="e.g., Uttarkashi" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="risk-level">Risk Level</Label>
              <Input id="risk-level" placeholder="High / Medium / Low" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">Details & Recommendations</Label>
              <Textarea id="details" placeholder="Describe the warning and necessary actions." />
            </div>
            <Button className="w-full">Issue Warning</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
