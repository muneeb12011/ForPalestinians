import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import FilterBar from "@/components/filter-bar";
import TimelineItem from "@/components/timeline-item";
import Sidebar from "@/components/sidebar";
import AddContentModal from "@/components/add-content-modal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useWebSocket } from "@/hooks/use-websocket";
import { Plus } from "lucide-react";
import type { Post } from "@shared/schema";

interface FilterState {
  type: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  source: string;
  search: string;
}

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    dateRange: {
      startDate: '',
      endDate: ''
    },
    source: 'all',
    search: ''
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts with filters
  const { data: fetchedPosts, isLoading, refetch } = useQuery({
    queryKey: ['/api/posts', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.type !== 'all') params.append('type', filters.type);
      if (filters.search) params.append('search', filters.search);
      if (filters.dateRange.startDate) params.append('startDate', filters.dateRange.startDate);
      if (filters.dateRange.endDate) params.append('endDate', filters.dateRange.endDate);
      
      const response = await fetch(`/api/posts?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json() as Promise<Post[]>;
    },
  });

  // WebSocket for real-time updates
  useWebSocket('/ws', {
    onMessage: (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'NEW_POST') {
          setPosts(prev => [data.post, ...prev]);
          refetch();
        }
      } catch (error) {
        console.error('WebSocket message parsing error:', error);
      }
    }
  });

  // Update posts when fetched data changes
  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts);
    }
  }, [fetchedPosts]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleAddContent = () => {
    setShowAddModal(true);
  };

  const handleContentAdded = () => {
    refetch();
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={(query) => handleFilterChange({ search: query })} />
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Latest Updates</h2>
              <Button onClick={handleAddContent} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Update
              </Button>
            </div>
            
            {/* Timeline Container */}
            <div className="relative">
              <div className="timeline-line"></div>
              
              {isLoading ? (
                <div className="space-y-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="relative pl-20">
                      <div className="timeline-dot bg-muted"></div>
                      <div className="bg-card rounded-lg p-6 border border-border">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-6 w-full mb-3" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <TimelineItem key={post.id} post={post} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No posts found matching your criteria.</p>
                </div>
              )}
            </div>
            
            {/* Load More Button */}
            {!isLoading && posts.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" className="px-6 py-3">
                  Load More Updates
                </Button>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar onAddContent={handleAddContent} />
          </div>
        </div>
      </main>
      
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 lg:hidden">
        <Button 
          onClick={handleAddContent}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
      
      {/* Add Content Modal */}
      <AddContentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onContentAdded={handleContentAdded}
      />
    </div>
  );
}
