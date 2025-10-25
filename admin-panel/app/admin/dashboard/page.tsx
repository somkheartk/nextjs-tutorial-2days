import StatsCard from '@/components/admin/StatsCard'

export default function DashboardPage() {
  const stats = [
    { title: 'Total Users', value: '1,234', icon: '👥', change: '+12%' },
    { title: 'Total Products', value: '567', icon: '📦', change: '+8%' },
    { title: 'Total Orders', value: '891', icon: '🛒', change: '+23%' },
    { title: 'Revenue', value: '$12,345', icon: '💰', change: '+15%' },
  ]

  const recentActivities = [
    { id: 1, action: 'New user registered', user: 'John Doe', time: '5 minutes ago' },
    { id: 2, action: 'Product updated', user: 'Admin', time: '10 minutes ago' },
    { id: 3, action: 'Order placed', user: 'Jane Smith', time: '15 minutes ago' },
    { id: 4, action: 'User deleted', user: 'Admin', time: '30 minutes ago' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Activities</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
              <div>
                <div className="font-medium text-gray-800">{activity.action}</div>
                <div className="text-sm text-gray-600">by {activity.user}</div>
              </div>
              <div className="text-sm text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
