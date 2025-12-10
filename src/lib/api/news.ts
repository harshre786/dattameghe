export interface Article {
  id: number;
  title: string;
  summary: string;
  news_site: string;
  url: string;
}

export const getArticles = async (): Promise<Article[]> => {
  const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles', { next: { revalidate: 600 } });
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  const data = await response.json();
  return data.results;
};
