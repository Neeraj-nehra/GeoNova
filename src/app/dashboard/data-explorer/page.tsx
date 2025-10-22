
'use client';

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, DocumentData } from "firebase/firestore";
import { WithId } from "@/firebase/firestore/use-collection";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface DataTableProps<T> {
  title: string;
  description: string;
  data: WithId<T>[] | null;
  isLoading: boolean;
  columns: { key: keyof T, header: string }[];
}

function DataTable<T extends DocumentData>({ title, description, data, isLoading, columns }: DataTableProps<T>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(col => <TableHead key={String(col.key)}>{col.header}</TableHead>)}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map(col => (
                    <TableCell key={String(col.key)}><Skeleton className="h-5 w-full" /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : data && data.length > 0 ? (
              data.map(item => (
                <TableRow key={item.id}>
                  {columns.map(col => (
                    <TableCell key={String(col.key)}>
                      {typeof item[col.key] === 'object' && item[col.key] !== null && 'seconds' in item[col.key]
                        ? new Date(item[col.key].seconds * 1000).toLocaleString()
                        : String(item[col.key] ?? 'N/A')}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


export default function DataExplorerPage() {
  const firestore = useFirestore();

  const alertsQuery = useMemoFirebase(() => firestore ? collection(firestore, "alerts") : null, [firestore]);
  const { data: alerts, isLoading: isLoadingAlerts } = useCollection(alertsQuery);

  const landslidePointsQuery = useMemoFirebase(() => firestore ? collection(firestore, "landslidePoints") : null, [firestore]);
  const { data: landslidePoints, isLoading: isLoadingLandslidePoints } = useCollection(landslidePointsQuery);

  const zonesQuery = useMemoFirebase(() => firestore ? collection(firestore, "zones") : null, [firestore]);
  const { data: zones, isLoading: isLoadingZones } = useCollection(zonesQuery);


  return (
    <div className="animate-fade-in-up space-y-6">
      <PageHeader title="Data Explorer" />
      <p className="text-muted-foreground">
        This page shows a live view of the data stored in your application's Firestore database.
      </p>

      <DataTable
        title="Alerts"
        description="All triggered alerts for high-risk zones."
        data={alerts}
        isLoading={isLoadingAlerts}
        columns={[
          { key: 'zoneId', header: 'Zone ID' },
          { key: 'risk', header: 'Risk' },
          { key: 'createdAt', header: 'Timestamp' },
          { key: 'affectedPopulation', header: 'Population' },
        ]}
      />

      <DataTable
        title="Landslide Points"
        description="User-submitted or system-detected landslide observation points."
        data={landslidePoints}
        isLoading={isLoadingLandslidePoints}
        columns={[
          { key: 'region', header: 'Region' },
          { key: 'severity', header: 'Severity' },
          { key: 'source', header: 'Source' },
          { key: 'date', header: 'Date' },
        ]}
      />
      
      <DataTable
        title="Monitored Zones"
        description="Geographical zones being monitored for landslide risk."
        data={zones}
        isLoading={isLoadingZones}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'riskLevel', header: 'Risk Level' },
          { key: 'soilType', header: 'Soil Type' },
          { key: 'slopeAngle', header: 'Slope Angle' },
        ]}
      />

    </div>
  );
}
