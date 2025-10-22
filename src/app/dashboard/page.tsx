
'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { NdviTrendChart, RecentRainfallChart, SlopeDistributionChart } from "@/components/dashboard/charts";
import { RecentAlertsTable } from "@/components/dashboard/recent-alerts-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AreaChart, Circle, Leaf, Send, ShieldAlert, type LucideIcon } from "lucide-react";
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, Timestamp } from 'firebase/firestore';
import { WithId } from '@/firebase/firestore/use-collection';

type AlertData = {
  zoneId: string;
  risk: string;
  createdAt: Timestamp;
};

type StatCardData = {
    title: string;
    value: string;
    trend: string;
    icon: LucideIcon;
    color: string;
};

const initialStats: StatCardData[] = [
    {
        title: "High-Risk Zones",
        value: "0",
        trend: "+0.0%",
        icon: ShieldAlert,
        color: "from-red-500 to-orange-500"
    },
    {
        title: "Alerts Sent (24h)",
        value: "0",
        trend: "+0.0%",
        icon: Send,
        color: "from-blue-500 to-cyan-500"
    },
    {
        title: "NDVI Trend",
        value: "78%",
        trend: "+2.1%",
        icon: Leaf,
        color: "from-emerald-500 to-green-500"
    },
    {
        title: "Monitored Areas",
        value: "0",
        trend: "+0",
        icon: AreaChart,
        color: "from-purple-500 to-pink-500"
    }
];

export default function DashboardPage() {
    const firestore = useFirestore();
    const alertsQuery = useMemoFirebase(() => firestore ? collection(firestore, 'alerts') : null, [firestore]);
    const { data: alerts, isLoading } = useCollection<AlertData>(alertsQuery);
    
    const [statsCards, setStatsCards] = useState<StatCardData[]>(initialStats);

    useEffect(() => {
        if (alerts) {
            const highRiskZones = alerts.filter(alert => alert.risk === 'High').length;
            
            const twentyFourHoursAgo = Timestamp.now().seconds - 24 * 60 * 60;
            const recentAlerts = alerts.filter(alert => alert.createdAt.seconds > twentyFourHoursAgo).length;
            
            const monitoredAreas = new Set(alerts.map(alert => alert.zoneId)).size;

            setStatsCards(prevStats => [
                { ...prevStats[0], value: highRiskZones.toString(), trend: "" },
                { ...prevStats[1], value: recentAlerts.toString(), trend: "" },
                // NDVI trend is static for now
                { ...prevStats[2], value: "78%", trend: "+2.1%" },
                { ...prevStats[3], value: monitoredAreas.toString(), trend: "" },
            ]);
        }
    }, [alerts]);

    return (
        <div className="animate-fade-in-up">
            <PageHeader title="Overview" showRefresh />
            
            <div className="mb-6">
                <Alert className="bg-emerald-50 border-emerald-200">
                    <Circle className="h-4 w-4 fill-current text-emerald-500" />
                    <AlertTitle className="text-emerald-900">System Status: Active</AlertTitle>
                    <AlertDescription className="text-emerald-700">
                        All monitoring systems are online and functioning correctly.
                    </AlertDescription>
                </Alert>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                {statsCards.map((card) => (
                    <StatCard 
                        key={card.title}
                        title={card.title}
                        value={card.value}
                        trend={card.trend}
                        icon={card.icon}
                        color={card.color}
                        isLoading={isLoading}
                    />
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2 mb-6">
                <NdviTrendChart />
                <RecentRainfallChart />
            </div>
            
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                <RecentAlertsTable alerts={alerts as WithId<AlertData>[] | null} isLoading={isLoading} />
                <SlopeDistributionChart />
            </div>
        </div>
    );
}
