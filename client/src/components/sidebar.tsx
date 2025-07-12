import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Quote, Calendar, TrendingUp } from 'lucide-react'
import type { Post } from '@shared/schema'

interface SidebarProps {
  onAddContent: () => void
}

export default function Sidebar ({ onAddContent }: SidebarProps) {
  // Fetch statistics
  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
    queryFn: async () => {
      const response = await fetch('/api/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      return response.json()
    }
  })

  // Fetch recent quotes
  const { data: quotes } = useQuery({
    queryKey: ['/api/posts', { type: 'quote', limit: 3 }],
    queryFn: async () => {
      const response = await fetch('/api/posts?type=quote&limit=3')
      if (!response.ok) throw new Error('Failed to fetch quotes')
      return response.json() as Promise<Post[]>
    }
  })

  const formatLastUpdate = (date: string | null) => {
    if (!date) return 'Never'
    const now = new Date()
    const updateTime = new Date(date)
    const diffMinutes = Math.floor(
      (now.getTime() - updateTime.getTime()) / (1000 * 60)
    )

    if (diffMinutes < 1) return 'Just now'
    if (diffMinutes < 60) return `${diffMinutes} min ago`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hr ago`
    return `${Math.floor(diffMinutes / 1440)} days ago`
  }

  return (
    <div className='space-y-6'>
      {/* Real-time Stats */}
      <Card className='bg-card border-border'>
        <CardHeader>
          <CardTitle className='text-lg font-semibold text-foreground'>
            Real-time Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Total Posts</span>
              <span className='text-primary font-semibold'>
                {stats?.totalPosts || 0}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Breaking News</span>
              <span className='text-red-500 font-semibold'>
                {stats?.breakingNews || 0}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Total Views</span>
              <span className='text-primary font-semibold'>
                {stats?.totalViews || 0}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Sources Monitored</span>
              <span className='text-primary font-semibold'>
                {stats?.sourcesMonitored || 0}
              </span>
            </div>

            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Last Update</span>
              <span className='text-green-500 font-semibold'>
                {formatLastUpdate(stats?.lastUpdate)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Quotes */}
      <Card className='bg-card border-border'>
        <CardHeader>
          <CardTitle className='text-lg font-semibold text-foreground'>
            Recent Quotes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {quotes?.map(quote => (
              <div key={quote.id} className='border-l-4 border-yellow-500 pl-4'>
                <p className='text-muted-foreground text-sm italic mb-2'>
                  "{quote.content.substring(0, 100)}..."
                </p>
                <span className='text-xs text-muted-foreground'>
                  - {quote.author || 'Unknown'}
                </span>
              </div>
            )) || (
              <p className='text-muted-foreground text-sm'>
                No quotes available
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className='bg-card border-border'>
        <CardHeader>
          <CardTitle className='text-lg font-semibold text-foreground'>
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>#FreePalestine</span>
              <Badge variant='secondary' className='text-xs'>
                2.8k
              </Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>#Gaza</span>
              <Badge variant='secondary' className='text-xs'>
                1.9k
              </Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>#Occupation</span>
              <Badge variant='secondary' className='text-xs'>
                1.2k
              </Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>#HumanitarianCrisis</span>
              <Badge variant='secondary' className='text-xs'>
                856
              </Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>#InternationalLaw</span>
              <Badge variant='secondary' className='text-xs'>
                634
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className='bg-card border-border'>
        <CardHeader>
          <CardTitle className='text-lg font-semibold text-foreground'>
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <Button
              onClick={onAddContent}
              className='w-full bg-primary hover:bg-primary/90 text-primary-foreground'
            >
              <Plus className='w-4 h-4 mr-2' />
              Add News Update
            </Button>
            <Button
              onClick={onAddContent}
              className='w-full bg-yellow-500 hover:bg-yellow-600 text-black'
            >
              <Quote className='w-4 h-4 mr-2' />
              Submit Quote
            </Button>
            <Button
              onClick={onAddContent}
              className='w-full bg-green-500 hover:bg-green-600 text-white'
            >
              <Calendar className='w-4 h-4 mr-2' />
              Timeline Event
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
