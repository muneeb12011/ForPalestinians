import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FilterBarProps {
  filters: {
    type: string
    dateRange: {
      startDate: string
      endDate: string
    }
    source: string
    search: string
  }
  onFilterChange: (filters: any) => void
}

export default function FilterBar ({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className='bg-card border-b border-border'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex flex-wrap items-center gap-4'>
          <div className='flex items-center space-x-2'>
            <Label className='text-sm text-muted-foreground'>Filter by:</Label>
            <Select
              value={filters.type}
              onValueChange={value => onFilterChange({ type: value })}
            >
              <SelectTrigger className='w-40 bg-background border-border'>
                <SelectValue placeholder='Content type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Content</SelectItem>
                <SelectItem value='breaking'>Breaking News</SelectItem>
                <SelectItem value='analysis'>Analysis</SelectItem>
                <SelectItem value='quote'>Official Quotes</SelectItem>
                <SelectItem value='timeline'>Timeline Events</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center space-x-2'>
            <Label className='text-sm text-muted-foreground'>From:</Label>
            <Input
              type='date'
              value={filters.dateRange.startDate}
              onChange={e =>
                onFilterChange({
                  dateRange: { ...filters.dateRange, startDate: e.target.value }
                })
              }
              className='w-40 bg-background border-border'
            />
          </div>

          <div className='flex items-center space-x-2'>
            <Label className='text-sm text-muted-foreground'>To:</Label>
            <Input
              type='date'
              value={filters.dateRange.endDate}
              onChange={e =>
                onFilterChange({
                  dateRange: { ...filters.dateRange, endDate: e.target.value }
                })
              }
              className='w-40 bg-background border-border'
            />
          </div>

          <div className='flex items-center space-x-2'>
            <Label className='text-sm text-muted-foreground'>Source:</Label>
            <Select
              value={filters.source}
              onValueChange={value => onFilterChange({ source: value })}
            >
              <SelectTrigger className='w-48 bg-background border-border'>
                <SelectValue placeholder='All Sources' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Sources</SelectItem>
                <SelectItem value='news'>News Agencies</SelectItem>
                <SelectItem value='government'>Government Officials</SelectItem>
                <SelectItem value='international'>
                  International Organizations
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
