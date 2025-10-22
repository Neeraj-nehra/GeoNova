
'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { NdviTrendChart, RecentRainfallChart, SlopeDistributionChart } from "@/components/dashboard/charts";
import { RecentAlertsTable } from "@/components/dashboard/recent-alerts-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AreaChart, Circle, Leaf, Send, ShieldAlert, type LucideIcon } from "lucide-react";

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
        value: "14",
        trend: "+5.2%",
        icon: ShieldAlert,
        color: "from-red-500 to-orange-500"
    },
    {
        title: "Alerts Sent (24h)",
        value: "3",
        trend: "-1.8%",
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
        value: "56",
        trend: "+10",
        icon: AreaChart,
        color: "from-purple-500 to-pink-500"
    }
];

export default function DashboardPage() {
    const [statsCards, setStatsCards] = useState<StatCardData[]>(initialStats);

    useEffect(() => {
        const interval = setInterval(() => {
            setStatsCards(prevStats => 
                prevStats.map(stat => {
                    let newValue: number;
                    let newTrend: string;

                    switch (stat.title) {
                        case "High-Risk Zones":
                            newValue = Math.max(10, parseInt(stat.value) + Math.floor(Math.random() * 3) - 1);
                            newTrend = `${(newValue - parseInt(initialStats[0].value)) >= 0 ? '+' : ''}${(newValue - parseInt(initialStats[0].value)).toFixed(1)}%`;
                            return { ...stat, value: newValue.toString(), trend: newTrend };
                        case "Alerts Sent (24h)":
                            newValue = Math.max(0, parseInt(stat.value) + (Math.random() > 0.8 ? 1 : 0));
                             newTrend = `${(newValue - parseInt(initialStats[1].value)) >= 0 ? '+' : ''}${(newValue - parseInt(initialStats[1].value)).toFixed(1)}%`;
                            return { ...stat, value: newValue.toString(), trend: newTrend };
                        case "NDVI Trend":
                            newValue = Math.min(100, Math.max(50, parseFloat(stat.value) + (Math.random() * 0.5 - 0.25)));
                            newTrend = `${(newValue - parseFloat(initialStats[2].value)) >= 0 ? '+' : ''}${(newValue - parseFloat(initialStats[2].value)).toFixed(1)}%`;
                            return { ...stat, value: `${newValue.toFixed(2)}%`, trend: newTrend };
                        case "Monitored Areas":
                            newValue = parseInt(stat.value);
                             newTrend = `+${(newValue - parseInt(initialStats[3].value))}`;
                            return { ...stat, value: newValue.toString(), trend: newTrend };
                        default:
                            return stat;
                    }
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="animate-fade-in-up">
            <PageHeader title="Dashboard" showRefresh />
            
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
                    />
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2 mb-6">
                <NdviTrendChart />
                <RecentRainfallChart />
            </div>
            
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                <RecentAlertsTable />
                <SlopeDistributionChart />
            </div>
        </div>
    );
}
