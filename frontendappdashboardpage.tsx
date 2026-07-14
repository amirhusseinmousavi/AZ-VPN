'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Users, Server, Database } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const statsData = [
  { name: 'کاربران آنلاین', value: 42, icon: Users, color: '#6C2BD9' },
  { name: 'سرورهای فعال', value: 8, icon: Server, color: '#1E3A8A' },
  { name: 'پهنای باند مصرفی', value: '234 GB', icon: Activity, color: '#FBBF24' },
  { name: 'مجموع کاربران', value: 156, icon: Database, color: '#10B981' },
]

const chartData = [
  { time: '00:00', bandwidth: 12 },
  { time: '04:00', bandwidth: 8 },
  { time: '08:00', bandwidth: 25 },
  { time: '12:00', bandwidth: 45 },
  { time: '16:00', bandwidth: 38 },
  { time: '20:00', bandwidth: 30 },
  { time: '23:00', bandwidth: 15 },
]

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // شبیه‌سازی دریافت داده
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          داشبورد AZ VPN
        </h1>
        <span className="text-sm text-muted-foreground">
          آخرین بروزرسانی: {new Date().toLocaleTimeString('fa-IR')}
        </span>
      </div>

      {/* آمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index} className="glass-morphism hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* نمودار */}
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle>مصرف پهنای باند (۲۴ ساعت اخیر)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(17, 24, 39, 0.9)',
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="bandwidth" 
                  stroke="#6C2BD9" 
                  strokeWidth={3}
                  dot={{ fill: '#6C2BD9', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}