import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
    title: string;
    value: string;
    trend: string;
    icon: LucideIcon;
    color: string;
}

export function StatCard({ title, value, trend, icon: Icon, color }: StatCardProps) {
    const isPositive = trend.startsWith('+');
    return (
        <Card className={cn(
            "relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
            "text-white",
            color
        )}>
            <div className={cn("absolute -right-4 -bottom-4 opacity-15", color)}>
                <Icon className="h-32 w-32" />
            </div>
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg font-medium">
                    <span>{title}</span>
                    <Icon className="h-6 w-6" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold">{value}</div>
                <p className={cn("text-xs mt-1", isPositive ? "text-green-200" : "text-red-200")}>
                    {trend} from last month
                </p>
            </CardContent>
        </Card>
    );
}
