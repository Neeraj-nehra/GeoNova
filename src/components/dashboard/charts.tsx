"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { ndviChartData, rainfallChartData, slopeChartData } from "@/lib/data";

const chartConfig = {
  ndvi: {
    label: "NDVI",
    color: "hsl(var(--chart-1))",
  },
  rainfall: {
    label: "Rainfall (mm)",
    color: "hsl(var(--chart-2))",
  },
  area: {
    label: "Area (km²)",
    color: "hsl(var(--chart-3))",
  },
};

export function NdviTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>NDVI Trend (6 Months)</CardTitle>
        <CardDescription>Normalized Difference Vegetation Index</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer>
            <LineChart data={ndviChartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis />
              <Tooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="ndvi" type="monotone" stroke="var(--color-ndvi)" strokeWidth={2} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function RecentRainfallChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Rainfall</CardTitle>
        <CardDescription>Daily precipitation over the last week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer>
            <LineChart data={rainfallChartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis />
              <Tooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="rainfall" type="monotone" stroke="var(--color-rainfall)" strokeWidth={2} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function SlopeDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Slope Distribution</CardTitle>
        <CardDescription>Area distribution by slope angle</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer>
            <BarChart data={slopeChartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="angle" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis />
              <Tooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="area" fill="var(--color-area)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
