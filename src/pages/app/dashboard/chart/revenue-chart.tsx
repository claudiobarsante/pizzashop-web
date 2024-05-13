import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import colors from 'tailwindcss/colors';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

import { subDays } from 'date-fns';

//import { DateRange } from 'react-day-picker';
import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Label } from '@/components/ui/label';
import { DateRange } from 'react-day-picker';
// const data = [
//     { date: '10/12', revenue: 1200 },
//     { date: '11/12', revenue: 800 },
//     { date: '12/12', revenue: 900 },
//     { date: '13/12', revenue: 400 },
//     { date: '14/12', revenue: 2300 },
//     { date: '15/12', revenue: 800 },
//     { date: '16/12', revenue: 640 }
// ];

export function RevenueChart() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date()
    });

    const { data: dailyRevenueInPeriod } = useQuery({
        queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
        queryFn: () =>
            getDailyRevenueInPeriod({
                from: dateRange?.from,
                to: dateRange?.to
            })
    });

    const chartData = useMemo(() => {
        return dailyRevenueInPeriod?.map((chartItem) => {
            return {
                date: chartItem.date,
                receipt: chartItem.receipt / 100
            };
        });
    }, [dailyRevenueInPeriod]);

    return (
        <Card className="col-span-6">
            <CardHeader className="flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium">
                        Receita no período
                    </CardTitle>
                    <CardDescription>Receita diária no período</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                    <Label>Período</Label>
                    <DateRangePicker
                        date={dateRange}
                        onDateChange={setDateRange}
                    />
                </div>
            </CardHeader>
            <CardContent>
                {chartData && (
                    <ResponsiveContainer width="100%" height={240}>
                        <LineChart data={chartData} style={{ fontSize: 12 }}>
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                dy={16}
                            />
                            <YAxis
                                stroke="#888"
                                axisLine={false}
                                tickLine={false}
                                width={80}
                                tickFormatter={(value: number) =>
                                    value.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    })
                                }
                            />
                            <CartesianGrid
                                vertical={false}
                                className="stroke-muted"
                            />
                            <Line
                                stroke={colors.violet[500]}
                                type="linear"
                                strokeWidth={2}
                                dataKey="receipt"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
