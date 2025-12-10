"use client";

import { useEffect, useState } from 'react';
import { getArticles, Article } from '@/lib/api/news';

const NewsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articleData = await getArticles();
        setArticles(articleData);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">News & Articles</h1>
      <div className="space-y-8">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold">{article.title}</h2>
              <p className="mt-2 text-sm text-gray-400">Source: {article.news_site}</p>
              <p className="mt-4">{article.summary}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mt-4 inline-block">Read More</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsPage;
