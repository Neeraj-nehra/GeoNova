import { PageHeader } from "@/components/layout/page-header";
import { getLandslideNews } from "@/ai/flows/get-landslide-news";
import { NewsArticleCard } from "@/components/news-article-card";

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
