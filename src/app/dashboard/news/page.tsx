import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { getLandslideNews } from "@/ai/flows/get-landslide-news";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function NewsPage() {
  const newsData = await getLandslideNews();

  return (
    <div className="animate-fade-in-up">
      <PageHeader title="Landslide News" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsData.articles.map((article, index) => (
          <Card key={index} className="flex flex-col overflow-hidden">
            <div className="relative aspect-[16/9] w-full">
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                />
            </div>
            <CardHeader>
              <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
              <div className="flex items-center gap-2 pt-2">
                <Badge variant="secondary">{article.source}</Badge>
                <span className="text-xs text-muted-foreground">{article.publishedAt}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{article.summary}</p>
            </CardContent>
            <CardFooter>
                <Button asChild variant="link" className="p-0 h-auto">
                    <Link href={article.url}>
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
