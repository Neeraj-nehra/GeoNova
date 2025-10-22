import { AreaChart, Leaf, Send, ShieldAlert } from "lucide-react";

export const statsCards = [
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
]

export const ndviChartData = [
    { month: "Jan", ndvi: 0.68 },
    { month: "Feb", ndvi: 0.70 },
    { month: "Mar", ndvi: 0.75 },
    { month: "Apr", ndvi: 0.82 },
    { month: "May", ndvi: 0.85 },
    { month: "Jun", ndvi: 0.78 },
];

export const rainfallChartData = [
    { day: "Mon", rainfall: 12 },
    { day: "Tue", rainfall: 19 },
    { day: "Wed", rainfall: 3 },
    { day: "Thu", rainfall: 5 },
    { day: "Fri", rainfall: 2 },
    { day: "Sat", rainfall: 3 },
    { day: "Sun", rainfall: 22 },
];

export const slopeChartData = [
    { angle: "0-15°", area: 400 },
    { angle: "15-30°", area: 300 },
    { angle: "30-45°", area: 200 },
    { angle: "45-60°", area: 278 },
    { angle: ">60°", area: 189 },
];

export const recentAlertsData = [
    {
        zone: "Chamoli",
        risk: "High",
        timestamp: "2 hours ago",
        population: 5200
    },
    {
        zone: "Pithoragarh",
        risk: "Medium",
        timestamp: "8 hours ago",
        population: 1250
    },
    {
        zone: "Rudraprayag",
        risk: "High",
        timestamp: "1 day ago",
        population: 8700
    },
    {
        zone: "Tehri",
        risk: "Low",
        timestamp: "3 days ago",
        population: 300
    },
];
