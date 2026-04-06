'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Image, 
  Calendar, 
  Clock, 
  Heart, 
  MessageCircle, 
  User, 
  Send, 
  Save, 
  Eye,
  Plus,
  Trash2,
  Edit,
  Bold,
  Italic,
  Link,
  List,
  Quote,
  Code,
  Heading1,
  Heading2,
  Layout,
  Settings,
  Users,
  BarChart3,
  Mail,
  Phone,
  MapPin,
  Globe,
  Palette,
  Shield,
  Database,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import { blogStorage, BlogPost, BlogSection, VideoItem } from '@/lib/blog';

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost>({
    id: '',
    title: '',
    content: '',
    excerpt: '',
    thumbnail: '',
    author: 'Admin',
    date: new Date().toISOString(),
    readTime: 5,
    likes: 0,
    comments: 0,
    published: false,
    tags: [],
    sections: []
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'blog' | 'pages' | 'users' | 'analytics' | 'settings'>('dashboard');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [newTag, setNewTag] = useState('');
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample pages data with existing content
  const [pages, setPages] = useState([
    {
      id: '1',
      name: 'Home',
      slug: '',
      type: 'home',
      description: 'Main landing page',
      published: true,
      content: {
        hero: {
          title: 'Welcome to Entercom Solutions',
          subtitle: 'Digital Excellence Delivered',
          backgroundImage: 'https://picsum.photos/seed/home-hero/1920/1080.jpg'
        },
        sections: [
          {
            title: 'Our Mission',
            type: 'text',
            content: 'We are dedicated to transforming businesses through innovative digital solutions that drive growth and efficiency.',
            image: ''
          },
          {
            title: 'Featured Services',
            type: 'features',
            content: 'Web Development, Mobile Apps, Cloud Solutions, Digital Marketing',
            image: 'https://picsum.photos/seed/services/800/400.jpg'
          }
        ]
      },
      seo: {
        title: 'Home - Entercom Solutions',
        description: 'Welcome to Entercom Solutions - Your partner for digital excellence'
      }
    },
    {
      id: '2',
      name: 'About',
      slug: 'about',
      type: 'about',
      description: 'Company information',
      published: true,
      content: {
        hero: {
          title: 'About Us',
          subtitle: 'Our Story and Mission',
          backgroundImage: 'https://picsum.photos/seed/about-hero/1920/1080.jpg'
        },
        sections: [
          {
            title: 'Who We Are',
            type: 'text',
            content: 'Entercom Solutions is a leading digital agency specializing in web development, mobile applications, and digital transformation. We help businesses leverage technology to achieve their goals.',
            image: ''
          },
          {
            title: 'Our Team',
            type: 'image',
            content: 'Meet our talented team of developers, designers, and digital strategists.',
            image: 'https://picsum.photos/seed/team/800/400.jpg'
          }
        ]
      },
      seo: {
        title: 'About - Entercom Solutions',
        description: 'Learn more about Entercom Solutions and our mission'
      }
    },
    {
      id: '3',
      name: 'Services',
      slug: 'services',
      type: 'services',
      description: 'Service offerings',
      published: true,
      content: {
        hero: {
          title: 'Our Services',
          subtitle: 'What We Offer',
          backgroundImage: 'https://picsum.photos/seed/services-hero/1920/1080.jpg'
        },
        sections: [
          {
            title: 'Web Development',
            type: 'text',
            content: 'Custom web applications built with modern technologies like React, Next.js, and Node.js. We create scalable, performant solutions tailored to your business needs.',
            image: ''
          },
          {
            title: 'Mobile Development',
            type: 'text',
            content: 'Native and cross-platform mobile applications for iOS and Android. We build intuitive, high-performance mobile experiences.',
            image: ''
          },
          {
            title: 'Cloud Solutions',
            type: 'image',
            content: 'Cloud architecture design, migration, and optimization. We help you leverage AWS, Azure, and Google Cloud for maximum efficiency.',
            image: 'https://picsum.photos/seed/cloud/800/400.jpg'
          }
        ]
      },
      seo: {
        title: 'Services - Entercom Solutions',
        description: 'Explore our comprehensive service offerings'
      }
    },
    {
      id: '4',
      name: 'Contact',
      slug: 'contact',
      type: 'contact',
      description: 'Contact information and form',
      published: true,
      content: {
        hero: {
          title: 'Contact Us',
          subtitle: 'Get in Touch',
          backgroundImage: 'https://picsum.photos/seed/contact-hero/1920/1080.jpg'
        },
        sections: [
          {
            title: 'Get in Touch',
            type: 'text',
            content: 'Ready to start your next project? We\'d love to hear from you. Contact us today to discuss how we can help transform your business.',
            image: ''
          },
          {
            title: 'Our Office',
            type: 'image',
            content: 'Visit our office or schedule a virtual meeting. We\'re here to help you succeed.',
            image: 'https://picsum.photos/seed/office/800/400.jpg'
          }
        ]
      },
      seo: {
        title: 'Contact - Entercom Solutions',
        description: 'Contact Entercom Solutions for your digital needs'
      }
    },
    {
      id: '5',
      name: 'Blog',
      slug: 'blog',
      type: 'blog',
      description: 'Blog and articles',
      published: true,
      content: {
        hero: {
          title: 'Our Blog',
          subtitle: 'Latest Insights',
          backgroundImage: 'https://picsum.photos/seed/blog-hero/1920/1080.jpg'
        },
        sections: [
          {
            title: 'Latest Articles',
            type: 'text',
            content: 'Stay updated with our latest insights on web development, technology trends, and digital transformation.',
            image: ''
          },
          {
            title: 'Featured Posts',
            type: 'image',
            content: 'Explore our most popular articles and tutorials on modern web development and design.',
            image: 'https://picsum.photos/seed/blog-featured/800/400.jpg'
          }
        ]
      },
      seo: {
        title: 'Blog - Entercom Solutions',
        description: 'Read our latest blog posts and insights'
      }
    }
  ]);

  // Load posts from storage
  useEffect(() => {
    const timer = setTimeout(() => {
      const posts = blogStorage.getAllPosts();
      setPosts(posts);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const refreshPosts = () => {
    const posts = blogStorage.getAllPosts();
    setPosts(posts);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleSave = () => {
    const postToSave = {
      ...currentPost,
      readTime: calculateReadTime(currentPost.content),
      thumbnail: imagePreview,
      date: new Date().toISOString()
    };

    blogStorage.savePost(postToSave);
    refreshPosts();
  };

  const handlePublish = () => {
    const postToPublish = {
      ...currentPost,
      published: true,
      readTime: calculateReadTime(currentPost.content),
      thumbnail: imagePreview,
      date: new Date().toISOString()
    };

    blogStorage.savePost(postToPublish);
    refreshPosts();

    // Reset form
    setCurrentPost({
      id: '',
      title: '',
      content: '',
      excerpt: '',
      thumbnail: '',
      author: 'Admin',
      date: new Date().toISOString(),
      readTime: 5,
      likes: 0,
      comments: 0,
      published: false,
      tags: [],
      sections: []
    });
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setImagePreview(post.thumbnail);
    setActiveTab('editor');
  };

  const handleDeletePost = (postId: string) => {
    blogStorage.deletePost(postId);
    refreshPosts();
  };

  const addTag = () => {
    if (newTag.trim() && !currentPost.tags.includes(newTag.trim())) {
      setCurrentPost({
        ...currentPost,
        tags: [...currentPost.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCurrentPost({
      ...currentPost,
      tags: currentPost.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const insertText = (text: string) => {
    setCurrentPost({
      ...currentPost,
      content: currentPost.content + text
    });
  };

  // Section management functions
  const addSection = (type: 'text' | 'image' | 'collage' | 'video' | 'media') => {
    const newSection: BlogSection = {
      id: Date.now().toString(),
      type,
      content: '',
      images: [],
      videos: [],
      layout: 'grid',
      caption: '',
      alt: ''
    };

    setCurrentPost({
      ...currentPost,
      sections: [...currentPost.sections, newSection]
    });
  };

  const removeSection = (sectionId: string) => {
    setCurrentPost({
      ...currentPost,
      sections: currentPost.sections.filter(section => section.id !== sectionId)
    });
  };

  const updateSection = (sectionId: string, field: keyof BlogSection, value: string | string[] | VideoItem[] | 'single' | 'grid' | 'masonry' | 'carousel') => {
    setCurrentPost({
      ...currentPost,
      sections: currentPost.sections.map(section => 
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    });
  };

  // Page management functions
  const editPage = (page: any) => {
    setSelectedPage({ ...page });
  };

  const togglePageStatus = (pageId: string) => {
    setPages(pages.map(page => 
      page.id === pageId ? { ...page, published: !page.published } : page
    ));
  };

  const updatePageContent = (path: string, value: string) => {
    const keys = path.split('.');
    const updatedPage = { ...selectedPage };
    let current: any = updatedPage.content;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setSelectedPage(updatedPage);
  };

  const updatePageSeo = (field: string, value: string) => {
    setSelectedPage({
      ...selectedPage,
      seo: {
        ...selectedPage.seo,
        [field]: value
      }
    });
  };

  const addContentSection = () => {
    const newSection = {
      title: '',
      type: 'text',
      content: '',
      image: ''
    };
    
    setSelectedPage({
      ...selectedPage,
      content: {
        ...selectedPage.content,
        sections: [...(selectedPage.content.sections || []), newSection]
      }
    });
  };

  const removeContentSection = (index: number) => {
    const updatedSections = [...(selectedPage.content.sections || [])];
    updatedSections.splice(index, 1);
    
    setSelectedPage({
      ...selectedPage,
      content: {
        ...selectedPage.content,
        sections: updatedSections
      }
    });
  };

  const updateContentSection = (index: number, field: string, value: string) => {
    const updatedSections = [...(selectedPage.content.sections || [])];
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: value
    };
    
    setSelectedPage({
      ...selectedPage,
      content: {
        ...selectedPage.content,
        sections: updatedSections
      }
    });
  };

  const addPageImage = (section: string) => {
    // In a real implementation, this would open a file picker or image selector
    const imageUrl = prompt('Enter image URL:');
    if (imageUrl) {
      updatePageContent(`${section}.backgroundImage`, imageUrl);
    }
  };

  const addSectionImage = (index: number) => {
    // In a real implementation, this would open a file picker or image selector
    const imageUrl = prompt('Enter image URL:');
    if (imageUrl) {
      updateContentSection(index, 'image', imageUrl);
    }
  };

  const savePage = () => {
    // In a real implementation, this would save to a database
    setPages(pages.map(page => 
      page.id === selectedPage.id ? selectedPage : page
    ));
    setSelectedPage(null);
  };

  const getIconForPage = (type: string) => {
    switch (type) {
      case 'home':
        return <Layout className="w-5 h-5 text-teal-600" />;
      case 'about':
        return <Users className="w-5 h-5 text-blue-600" />;
      case 'services':
        return <Target className="w-5 h-5 text-green-600" />;
      case 'contact':
        return <Mail className="w-5 h-5 text-purple-600" />;
      case 'blog':
        return <FileText className="w-5 h-5 text-orange-600" />;
      default:
        return <Layout className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'dashboard' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('blog')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'blog' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Blog
              </button>
              <button
                onClick={() => setActiveTab('pages')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'pages' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Layout className="w-4 h-4 inline mr-2" />
                Pages
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'users' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Users
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'analytics' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'settings' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-teal-100 rounded-lg">
                    <FileText className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Posts</p>
                    <p className="text-2xl font-semibold text-gray-900">{posts.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-semibold text-gray-900">1,234</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Page Views</p>
                    <p className="text-2xl font-semibold text-gray-900">8.5K</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Likes</p>
                    <p className="text-2xl font-semibold text-gray-900">456</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">New blog post published</p>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">New user registered</p>
                  <span className="text-xs text-gray-400">5 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">Contact form submitted</p>
                  <span className="text-xs text-gray-400">1 day ago</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'blog' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Blog Management</h2>
              <button
                onClick={() => setActiveTab('blog')}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                New Post
              </button>
            </div>
            
            {/* Advanced Blog Editor */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Blog Editor</h3>
              
              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title
                </label>
                <input
                  type="text"
                  value={currentPost.title}
                  onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter blog title..."
                />
              </div>

              {/* Excerpt */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={currentPost.excerpt}
                  onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  rows={3}
                  placeholder="Brief description of the blog post..."
                />
              </div>

              {/* Sections Management */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium text-gray-900">Blog Sections</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addSection('text')}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FileText className="w-3 h-3 inline mr-1" />
                      Text
                    </button>
                    <button
                      onClick={() => addSection('image')}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Image className="w-3 h-3 inline mr-1" />
                      Image
                    </button>
                    <button
                      onClick={() => addSection('collage')}
                      className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Layout className="w-3 h-3 inline mr-1" />
                      Collage
                    </button>
                    <button
                      onClick={() => addSection('video')}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Zap className="w-3 h-3 inline mr-1" />
                      Video
                    </button>
                    <button
                      onClick={() => addSection('media')}
                      className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Database className="w-3 h-3 inline mr-1" />
                      Media
                    </button>
                  </div>
                </div>

                {/* Sections List */}
                <div className="space-y-4">
                  {currentPost.sections.map((section, index) => (
                    <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {section.type} Section {index + 1}
                        </span>
                        <button
                          onClick={() => removeSection(section.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Text Section */}
                      {section.type === 'text' && (
                        <textarea
                          value={section.content}
                          onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          rows={4}
                          placeholder="Enter your text content here..."
                        />
                      )}

                      {/* Image Section */}
                      {section.type === 'image' && (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={section.images[0] || ''}
                            onChange={(e) => updateSection(section.id, 'images', [e.target.value])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            placeholder="Enter image URL..."
                          />
                          <input
                            type="text"
                            value={section.caption || ''}
                            onChange={(e) => updateSection(section.id, 'caption', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            placeholder="Image caption (optional)..."
                          />
                        </div>
                      )}

                      {/* Collage Section */}
                      {section.type === 'collage' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            {section.images.map((img, imgIndex) => (
                              <input
                                key={imgIndex}
                                type="text"
                                value={img}
                                onChange={(e) => {
                                  const newImages = [...section.images];
                                  newImages[imgIndex] = e.target.value;
                                  updateSection(section.id, 'images', newImages);
                                }}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder={`Image ${imgIndex + 1} URL...`}
                              />
                            ))}
                            {section.images.length < 4 && (
                              <button
                                onClick={() => {
                                  const newImages = [...section.images, ''];
                                  updateSection(section.id, 'images', newImages);
                                }}
                                className="px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 transition-colors"
                              >
                                <Plus className="w-4 h-4 inline mr-1" />
                                Add Image
                              </button>
                            )}
                          </div>
                          <select
                            value={section.layout || 'grid'}
                            onChange={(e) => updateSection(section.id, 'layout', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          >
                            <option value="grid">Grid Layout</option>
                            <option value="masonry">Masonry Layout</option>
                            <option value="carousel">Carousel</option>
                          </select>
                        </div>
                      )}

                      {/* Video Section */}
                      {section.type === 'video' && (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={section.videos[0]?.url || ''}
                            onChange={(e) => updateSection(section.id, 'videos', [{
                              url: e.target.value,
                              title: '',
                              thumbnail: '',
                              platform: 'youtube'
                            }])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            placeholder="Enter video URL (YouTube, Vimeo, etc.)..."
                          />
                          <input
                            type="text"
                            value={section.videos[0]?.title || ''}
                            onChange={(e) => {
                              const videos = [...section.videos];
                              videos[0] = { ...videos[0], title: e.target.value };
                              updateSection(section.id, 'videos', videos);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            placeholder="Video title..."
                          />
                        </div>
                      )}

                      {/* Media Section */}
                      {section.type === 'media' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 gap-2">
                            <input
                              type="text"
                              value={section.content}
                              onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                              placeholder="Media description or embed code..."
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  const newImages = [...section.images, ''];
                                  updateSection(section.id, 'images', newImages);
                                }}
                                className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                              >
                                <Image className="w-3 h-3 inline mr-1" />
                                Add Image
                              </button>
                              <button
                                onClick={() => {
                                  const newVideos = [...section.videos, {
                                    url: '',
                                    title: '',
                                    thumbnail: '',
                                    platform: 'youtube'
                                  }];
                                  updateSection(section.id, 'videos', newVideos);
                                }}
                                className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                              >
                                <Zap className="w-3 h-3 inline mr-1" />
                                Add Video
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Save Draft
                </button>
                <button
                  onClick={handlePublish}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <Send className="w-4 h-4 inline mr-2" />
                  Publish
                </button>
              </div>
            </div>

            {/* Posts List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">All Posts</h3>
              {posts.map((post) => (
                <div key={post.id} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{post.title}</h4>
                      <p className="text-gray-600 mt-1">{post.excerpt}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        post.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                      <button
                        onClick={() => handleEditPost(post)}
                        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2 text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'pages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900">Page Management</h2>
            
            {/* Page Editor */}
            {selectedPage && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Edit {selectedPage.name}</h3>
                  <button
                    onClick={() => setSelectedPage(null)}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close Editor
                  </button>
                </div>

                {/* Page Content Editor */}
                <div className="space-y-6">
                  {/* Hero Section */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Hero Section</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                        <input
                          type="text"
                          value={selectedPage.content.hero?.title || ''}
                          onChange={(e) => updatePageContent('hero.title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter hero title..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                        <input
                          type="text"
                          value={selectedPage.content.hero?.subtitle || ''}
                          onChange={(e) => updatePageContent('hero.subtitle', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter hero subtitle..."
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hero Background Image</label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={selectedPage.content.hero?.backgroundImage || ''}
                          onChange={(e) => updatePageContent('hero.backgroundImage', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter image URL..."
                        />
                        <button
                          onClick={() => addPageImage('hero')}
                          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                        >
                          <Image className="w-4 h-4 inline mr-2" />
                          Add Image
                        </button>
                      </div>
                      {selectedPage.content.hero?.backgroundImage && (
                        <div className="mt-2">
                          <img 
                            src={selectedPage.content.hero.backgroundImage} 
                            alt="Hero background" 
                            className="h-32 w-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Sections */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-medium text-gray-900">Content Sections</h4>
                      <button
                        onClick={addContentSection}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="w-3 h-3 inline mr-1" />
                        Add Section
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {selectedPage.content.sections?.map((section, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-medium text-gray-700">Section {index + 1}</span>
                            <button
                              onClick={() => removeContentSection(index)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                              <input
                                type="text"
                                value={section.title || ''}
                                onChange={(e) => updateContentSection(index, 'title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Section title..."
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Section Type</label>
                              <select
                                value={section.type || 'text'}
                                onChange={(e) => updateContentSection(index, 'type', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                              >
                                <option value="text">Text</option>
                                <option value="image">Image</option>
                                <option value="features">Features</option>
                                <option value="testimonials">Testimonials</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                            <textarea
                              value={section.content || ''}
                              onChange={(e) => updateContentSection(index, 'content', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                              rows={3}
                              placeholder="Section content..."
                            />
                          </div>
                          
                          {section.type === 'image' && (
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Section Image</label>
                              <div className="flex space-x-2">
                                <input
                                  type="text"
                                  value={section.image || ''}
                                  onChange={(e) => updateContentSection(index, 'image', e.target.value)}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                  placeholder="Image URL..."
                                />
                                <button
                                  onClick={() => addSectionImage(index)}
                                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                  <Image className="w-4 h-4" />
                                </button>
                              </div>
                              {section.image && (
                                <div className="mt-2">
                                  <img 
                                    src={section.image} 
                                    alt="Section image" 
                                    className="h-24 w-full object-cover rounded-lg"
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SEO Settings */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-900 mb-4">SEO Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                        <input
                          type="text"
                          value={selectedPage.seo?.title || ''}
                          onChange={(e) => updatePageSeo('title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Meta title..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                        <input
                          type="text"
                          value={selectedPage.seo?.description || ''}
                          onChange={(e) => updatePageSeo('description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Meta description..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => savePage()}
                      className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <Save className="w-4 h-4 inline mr-2" />
                      Save Page
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Pages List */}
            {!selectedPage && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Site Pages</h3>
                <div className="space-y-3">
                  {pages.map((page) => (
                    <div key={page.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-teal-100 rounded-lg">
                            {getIconForPage(page.type)}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{page.name}</h4>
                            <p className="text-sm text-gray-600">{page.description}</p>
                            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                              <span>/{page.slug}</span>
                              <span>•</span>
                              <span className={`px-2 py-1 rounded-full ${
                                page.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {page.published ? 'Published' : 'Draft'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => editPage(page)}
                          className="px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                        >
                          <Edit className="w-4 h-4 inline mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => togglePageStatus(page.id)}
                          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                            page.published 
                              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {page.published ? 'Unpublish' : 'Publish'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Registered Users</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Admin User</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">admin@example.com</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Administrator</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900">Analytics Overview</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Page Views</span>
                    <span className="text-sm font-medium text-gray-900">8,543</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Unique Visitors</span>
                    <span className="text-sm font-medium text-gray-900">3,421</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Bounce Rate</span>
                    <span className="text-sm font-medium text-gray-900">42.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Session Duration</span>
                    <span className="text-sm font-medium text-gray-900">3m 24s</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Top Pages</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">/</span>
                    <span className="text-sm font-medium text-gray-900">2,341 views</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">/blog</span>
                    <span className="text-sm font-medium text-gray-900">1,823 views</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">/services</span>
                    <span className="text-sm font-medium text-gray-900">1,234 views</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">/about</span>
                    <span className="text-sm font-medium text-gray-900">987 views</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Entercom Solutions"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Description
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    rows={3}
                    placeholder="Brief description of your site..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    defaultValue="info@entercomsolutions.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Blog Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Author
                  </label>
                  <input
                    type="text"
                    defaultValue="Admin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Posts per page
                  </label>
                  <input
                    type="number"
                    defaultValue="10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-sm text-gray-600">Enable comments on blog posts</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-sm text-gray-600">Enable likes on blog posts</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
