import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { apiRequest } from '@/lib/queryClient'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  type: z.enum(['breaking', 'analysis', 'quote', 'timeline']),
  source: z.string().optional(),
  author: z.string().optional(),
  tags: z.string().optional(),
  isBreaking: z.boolean().default(false)
})

interface AddContentModalProps {
  isOpen: boolean
  onClose: () => void
  onContentAdded: () => void
}

export default function AddContentModal ({
  isOpen,
  onClose,
  onContentAdded
}: AddContentModalProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      type: 'breaking',
      source: '',
      author: '',
      tags: '',
      isBreaking: false
    }
  })

  const createPostMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const postData = {
        ...data,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : []
      }
      const response = await apiRequest('POST', '/api/posts', postData)
      return response.json()
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Content added successfully!'
      })
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] })
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] })
      form.reset()
      onContentAdded()
    },
    onError: error => {
      toast({
        title: 'Error',
        description: 'Failed to add content. Please try again.',
        variant: 'destructive'
      })
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createPostMutation.mutate(data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className='max-w-2xl bg-card border-border'
        aria-describedby='add-content-description'
      >
        <DialogHeader>
          <DialogTitle className='text-foreground'>Add New Content</DialogTitle>
          <div id='add-content-description' className='sr-only'>
            Create new content for the Palestine news timeline including
            breaking news, analysis,News Feed, quotes, and timeline events.
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='bg-background border-border'>
                        <SelectValue placeholder='Select content type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='breaking'>Breaking News</SelectItem>
                      <SelectItem value='analysis'>Analysis</SelectItem>
                      <SelectItem value='quote'>Quote</SelectItem>
                      <SelectItem value='timeline'>Timeline Event</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter title...'
                      {...field}
                      className='bg-background border-border'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter content...'
                      {...field}
                      className='bg-background border-border min-h-[120px]'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='source'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Source (optional)'
                        {...field}
                        className='bg-background border-border'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='author'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Author (optional)'
                        {...field}
                        className='bg-background border-border'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='tags'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Tags separated by commas (optional)'
                      {...field}
                      className='bg-background border-border'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isBreaking'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border border-border p-3'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>Breaking News</FormLabel>
                    <div className='text-sm text-muted-foreground'>
                      Mark this as breaking news
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='flex justify-end space-x-2'>
              <Button type='button' variant='outline' onClick={onClose}>
                Cancel
              </Button>
              <Button
                type='submit'
                className='bg-primary hover:bg-primary/90'
                disabled={createPostMutation.isPending}
              >
                {createPostMutation.isPending ? 'Adding...' : 'Add Content'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
