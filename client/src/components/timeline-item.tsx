import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Bookmark, Eye, Calendar, Quote } from "lucide-react";
import type { Post } from "@shared/schema";

interface TimelineItemProps {
  post: Post;
}

export default function TimelineItem({ post }: TimelineItemProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'breaking':
        return 'bg-red-500';
      case 'analysis':
        return 'bg-blue-500';
      case 'quote':
        return 'bg-yellow-500';
      case 'timeline':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'breaking':
        return <Badge className="bg-red-500 text-white">BREAKING</Badge>;
      case 'analysis':
        return <Badge className="bg-blue-500 text-white">ANALYSIS</Badge>;
      case 'quote':
        return <Badge className="bg-yellow-500 text-black">QUOTE</Badge>;
      case 'timeline':
        return <Badge className="bg-green-500 text-white">TIMELINE</Badge>;
      default:
        return <Badge variant="secondary">NEWS</Badge>;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const timeAgo = post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : '';

  return (
    <div className="relative mb-8 pl-20">
      <div className={`timeline-dot ${getTypeColor(post.type)}`}></div>
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getTypeBadge(post.type)}
              <span className="text-sm text-muted-foreground font-mono">{timeAgo}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-3">
            {post.title}
          </h3>
          
          {post.type === 'quote' ? (
            <blockquote className="text-foreground text-base italic border-l-4 border-primary pl-4 mb-4">
              "{post.content}"
            </blockquote>
          ) : (
            <p className="text-muted-foreground mb-4">
              {post.content}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {post.source && `Source: ${post.source}`}
                {post.author && ` - ${post.author}`}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="link" size="sm" className="text-primary p-0">
                Read More
              </Button>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{post.viewCount || 0}</span>
              </div>
            </div>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
