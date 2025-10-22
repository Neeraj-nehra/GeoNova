import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { statsCards } from "@/lib/data";
import { NdviTrendChart, RecentRainfallChart, SlopeDistributionChart } from "@/components/dashboard/charts";
import { RecentAlertsTable } from "@/components/dashboard/recent-alerts-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Circle } from "lucide-react";

export default function DashboardPage() {
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
