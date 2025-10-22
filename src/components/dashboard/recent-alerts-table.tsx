import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { recentAlertsData as staticRecentAlerts } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { WithId } from "@/firebase/firestore/use-collection";
import { Skeleton } from "../ui/skeleton";
import { Timestamp } from "firebase/firestore";

type Alert = {
  zoneId: string;
  risk: string;
  createdAt: Timestamp;
  affectedPopulation?: number;
};

type RecentAlertsTableProps = {
  alerts: WithId<Alert>[] | null;
  isLoading: boolean;
};

export function RecentAlertsTable({ alerts, isLoading }: RecentAlertsTableProps) {
    const getRiskVariant = (risk: string): "destructive" | "secondary" | "default" => {
        switch (risk.toLowerCase()) {
            case "high":
                return "destructive";
            case "medium":
                return "secondary";
            default:
                return "default";
        }
    }
    
    const getRiskBorderClass = (risk: string): string => {
        switch (risk.toLowerCase()) {
            case "high":
                return "border-l-4 border-red-500";
            case "medium":
                return "border-l-4 border-amber-500";
            default:
                return "";
        }
    }

    const formatTimestamp = (timestamp: Timestamp | undefined) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate();
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + date.toLocaleDateString();
    }

    const recentAlertsData = alerts ?? staticRecentAlerts.map(a => ({...a, zoneId: a.zone, createdAt: Timestamp.now(), affectedPopulation: a.population}));

    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Active alerts from monitored zones</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Zone</TableHead>
                            <TableHead>Risk Level</TableHead>
                            <TableHead>Time Stamp</TableHead>
                            <TableHead className="text-right">Affected Population</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-5 w-12 ml-auto" /></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            recentAlertsData.map((alert: any) => (
                                <TableRow key={alert.id || alert.zone} className={cn(getRiskBorderClass(alert.risk))}>
                                    <TableCell className="font-medium">{alert.zoneId || alert.zone}</TableCell>
                                    <TableCell>
                                        <Badge variant={getRiskVariant(alert.risk)}>{alert.risk}</Badge>
                                    </TableCell>
                                    <TableCell>{formatTimestamp(alert.createdAt)}</TableCell>
                                    <TableCell className="text-right">{(alert.affectedPopulation || alert.population || 0).toLocaleString()}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
