import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { recentAlertsData } from "@/lib/data";
import { cn } from "@/lib/utils";

export function RecentAlertsTable() {
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
                        {recentAlertsData.map((alert) => (
                            <TableRow key={alert.zone} className={cn(getRiskBorderClass(alert.risk))}>
                                <TableCell className="font-medium">{alert.zone}</TableCell>
                                <TableCell>
                                    <Badge variant={getRiskVariant(alert.risk)}>{alert.risk}</Badge>
                                </TableCell>
                                <TableCell>{alert.timestamp}</TableCell>
                                <TableCell className="text-right">{alert.population.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
