import { PageHeader } from "@/components/layout/page-header";
import { NewsArticleCard } from "@/components/news-article-card";

// Data fetching helper — keep this **outside** the component, not exported as a page
async function getLandslideNews() {
  const API_KEY = "92b46d120b3845a19566b5608dabf6ab";
  const url = `https://newsapi.org/v2/everything?q=landslide+uttarakhand&sortBy=publishedAt&language=en&pageSize=9&apiKey=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`News API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return {
    articles: data.articles.map(
      ({ title, description, url, urlToImage, publishedAt, source }) => ({
        title,
        description,
        url,
        image: urlToImage,
        publishedAt,
        source: source.name,
      })
    ),
  };
}

// The default export **must be a React component**
export default async function NewsPage() {
  const newsData = await getLandslideNews();

  return (
    <div className="animate-fade-in-up">
      <PageHeader title="Landslide News" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsData.articles.map((article, index) => (
          <NewsArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
}

