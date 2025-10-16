import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FileText, Calendar, Clock } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-gray-600">
            Insights, strategies, and tips on creating content that ranks and converts.
          </p>
        </div>

        {/* Blog Grid - Empty State */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FileText size={48} className="text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
            <p className="text-gray-600 text-center max-w-md mb-8">
              We&apos;re crafting amazing, human-written content for our blog. 
              Check back soon for insights on SEO, content strategy, and more.
            </p>
            
            {/* Sample Blog Card Layout (for demonstration) */}
            <div className="w-full max-w-4xl mt-12">
              <h3 className="text-xl font-semibold mb-6 text-gray-400">Preview Layout:</h3>
              <div className="grid md:grid-cols-2 gap-8 opacity-50">
                {[1, 2].map((item) => (
                  <Card key={item} className="hover:shadow-xl transition-all duration-300">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>Coming Soon</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>5 min read</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2">
                        Sample Blog Post Title
                      </CardTitle>
                      <CardDescription>
                        A preview of what our human-written blog posts will look like. 
                        Stay tuned for quality content that actually ranks.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

