
"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Newspaper } from "lucide-react";
import type { NewsArticle } from "@/ai/flows/get-landslide-news";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

export function NewsArticleCard({ article }: { article: NewsArticle }) {
  return (
    <Dialog>
      <Card className="flex flex-col overflow-hidden">
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
          <DialogTrigger asChild>
            <Button variant="link" className="p-0 h-auto">
              Read More <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <div className="relative aspect-[16/9] w-full mb-4 rounded-lg overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
          <DialogTitle className="text-2xl font-bold font-headline leading-tight">{article.title}</DialogTitle>
          <DialogDescription asChild>
            <div className="flex items-center gap-4 pt-2">
              <Badge variant="secondary">{article.source}</Badge>
              <span className="text-sm text-muted-foreground">{article.publishedAt}</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] pr-4">
            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                <p className="font-semibold text-foreground">{article.summary}</p>
                {article.body.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
