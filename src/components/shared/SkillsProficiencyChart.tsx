"use client";

import { Bar, BarChart, BarProps, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export const description = "An interactive area chart";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const data = [
  { name: "TypeScript", uv: 95 },
  { name: "React / Next.js", uv: 90 },
  { name: "Node.js", uv: 90 },
  { name: "PostgreSQL / Prisma", uv: 80 },
  { name: "MongoDB", uv: 90 },
  { name: "Tailwind CSS", uv: 96 },
  { name: "AWS / Vercel", uv: 80 },
  { name: "Git / GitHub", uv: 92 },
  { name: "REST & GraphQL", uv: 89 },
  { name: "Redux / Zustand", uv: 87 },
];

const chartConfig = {
  level: {
    label: "Skill Level",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

// Custom Triangle Bar
const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}
    C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2},${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width},${y + height}
    Z`;
};

const TriangleBar = (props: BarProps) => {
  const { fill, x, y, width, height } = props;
  return (
    <path
      d={getPath(Number(x), Number(y), Number(width), Number(height))}
      fill={fill}
      stroke="none"
    />
  );
};

export function SkillsProficiencyChart() {
  return (
    <Card className="pt-0 w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="flex-1 grid gap-1">
          <CardTitle>Skills Proficiency Overview</CardTitle>
          <p className="text-gray-400 text-sm">
            A visual breakdown of my technical strengths
          </p>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            width={700}
            height={300}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />

            <Bar
              dataKey="uv"
              shape={TriangleBar}
              label={{ position: "top", fill: "#888", fontSize: 12 }}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
