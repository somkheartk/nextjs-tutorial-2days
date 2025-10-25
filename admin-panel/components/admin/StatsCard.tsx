import { Card, CardContent, Box, Typography, Chip } from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'
import { TrendingUp, TrendingDown } from '@mui/icons-material'

interface StatsCardProps {
  title: string
  value: string
  icon: SvgIconComponent
  change: string
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

export default function StatsCard({ title, value, icon: Icon, change, color = 'primary' }: StatsCardProps) {
  const isPositive = change.startsWith('+')
  
  return (
    <Card elevation={2} sx={{ height: '100%', transition: 'all 0.3s', '&:hover': { elevation: 6, transform: 'translateY(-4px)' } }}>
      <CardContent>
        <Box className="flex items-center justify-between mb-4">
          <Box 
            sx={{ 
              bgcolor: `${color}.light`, 
              color: `${color}.main`,
              borderRadius: '50%',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon />
          </Box>
          <Chip 
            icon={isPositive ? <TrendingUp /> : <TrendingDown />}
            label={change}
            size="small"
            color={isPositive ? 'success' : 'error'}
            variant="outlined"
          />
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
}
