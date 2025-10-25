interface StatsCardProps {
  title: string
  value: string
  icon: string
  change: string
}

export default function StatsCard({ title, value, icon, change }: StatsCardProps) {
  const isPositive = change.startsWith('+')
  
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        <div className={`text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </div>
      </div>
      <div className="text-gray-600 text-sm mb-1">{title}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
  )
}
