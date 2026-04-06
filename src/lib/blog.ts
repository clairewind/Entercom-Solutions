export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  thumbnail: string;
  author: string;
  date: string;
  readTime: number;
  likes: number;
  comments: number;
  published: boolean;
  tags: string[];
  sections: BlogSection[];
}

export interface BlogSection {
  id: string;
  type: 'text' | 'image' | 'collage' | 'video' | 'media';
  content: string;
  images: string[];
  videos: VideoItem[];
  layout?: 'single' | 'grid' | 'masonry' | 'carousel';
  caption?: string;
  alt?: string;
}

export interface VideoItem {
  url: string;
  title: string;
  thumbnail: string;
  duration?: string;
  platform?: 'youtube' | 'vimeo' | 'custom';
}

// In-memory storage for blog posts (in production, use a database)
let blogPosts: BlogPost[] = [];

export const blogStorage = {
  // Get all published posts
  getPublishedPosts(): BlogPost[] {
    return blogPosts
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  // Get all posts (including drafts)
  getAllPosts(): BlogPost[] {
    return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  // Get post by ID
  getPostById(id: string): BlogPost | undefined {
    return blogPosts.find(post => post.id === id);
  },

  // Create or update post
  savePost(post: Omit<BlogPost, 'id'> & { id?: string }): BlogPost {
    if (post.id && post.id !== '') {
      // Update existing post
      const index = blogPosts.findIndex(p => p.id === post.id);
      if (index !== -1) {
        blogPosts[index] = { ...post, id: post.id };
        return blogPosts[index];
      }
    }

    // Create new post
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      date: post.date || new Date().toISOString(),
      likes: post.likes || 0,
      comments: post.comments || 0,
    };
    
    blogPosts.push(newPost);
    return newPost;
  },

  // Delete post
  deletePost(id: string): boolean {
    const index = blogPosts.findIndex(post => post.id === id);
    if (index !== -1) {
      blogPosts.splice(index, 1);
      return true;
    }
    return false;
  },

  // Initialize with sample data
  initializeSampleData() {
    if (blogPosts.length === 0) {
      blogPosts = [
        {
          id: '1',
          title: 'Welcome to Our Blog',
          content: '# Welcome to Our Blog\n\nThis is the first post on our amazing blog platform. We\'re excited to share our thoughts, ideas, and expertise with you.\n\n## What to Expect\n\nHere you\'ll find articles about:\n- Web development\n- Design trends\n- Technology news\n- Company updates\n\n## Stay Tuned\n\nMake sure to check back regularly for new content!',
          excerpt: 'Welcome to our new blog! Here you\'ll find articles about web development, design trends, and technology news.',
          thumbnail: '',
          author: 'Admin',
          date: new Date().toISOString(),
          readTime: 2,
          likes: 5,
          comments: 2,
          published: true,
          tags: ['welcome', 'announcement'],
          sections: [
            {
              id: '1',
              type: 'text',
              content: '# Welcome to Our Blog\n\nThis is the first post on our amazing blog platform. We\'re excited to share our thoughts, ideas, and expertise with you.',
              images: [],
              videos: []
            },
            {
              id: '2',
              type: 'text',
              content: '## What to Expect\n\nHere you\'ll find articles about:\n- Web development\n- Design trends\n- Technology news\n- Company updates',
              images: [],
              videos: []
            }
          ]
        }
      ];
    }
  }
};

// Initialize sample data
blogStorage.initializeSampleData();
