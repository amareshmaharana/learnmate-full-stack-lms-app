"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";

export const description = "An interactive area chart";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dummyEnrollmentData = [
  {
    date: "2026-05-19",
    enrollments: 20,
  },
  {
    date: "2026-05-20",
    enrollments: 45,
  },
  {
    date: "2026-05-21",
    enrollments: 28,
  },
  {
    date: "2026-05-22",
    enrollments: 60,
  },
  {
    date: "2026-05-23",
    enrollments: 35,
  },
  {
    date: "2026-05-24",
    enrollments: 50,
  },
  {
    date: "2026-05-25",
    enrollments: 40,
  },
  {
    date: "2026-05-26",
    enrollments: 55,
  },
  {
    date: "2026-05-27",
    enrollments: 30,
  },
  {
    date: "2026-05-28",
    enrollments: 65,
  },
  {
    date: "2026-05-29",
    enrollments: 38,
  },
  {
    date: "2026-05-30",
    enrollments: 48,
  },
  {
    date: "2026-05-31",
    enrollments: 52,
  },
  // {
  //   date: "2026-06-01",
  //   enrollments: 45,
  // },
  // {
  //   date: "2026-06-02",
  //   enrollments: 60,
  // },
  // {
  //   date: "2026-06-03",
  //   enrollments: 42,
  // },
  // {
  //   date: "2026-06-04",
  //   enrollments: 55,
  // },
  // {
  //   date: "2026-06-05",
  //   enrollments: 48,
  // },
];

const chartConfig = {
  enrollments: {
    label: "Enrollments",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

interface ChartAreaInteractiveProps {
  data: { date: string; enrollments: number }[];
}

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const totalEnrollmentsNumber = React.useMemo(
    () => data.reduce((acc, curr) => acc + curr.enrollments, 0),
    [data],
  );

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Enrollments</CardTitle>

        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total number of enrollments in the last 30 days:{" "}
            {totalEnrollmentsNumber}
          </span>

          <span className="@[540px]/card:hidden">
            Last 30 days: {totalEnrollmentsNumber} enrollments
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <BarChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              interval={"preserveStartEnd"}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="w-37.5"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />

            <Bar
              dataKey="enrollments"
              fill="var(--color-enrollments)"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
