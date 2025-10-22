import { PageHeader } from "@/components/layout/page-header";

export default function NewsPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader title="Landslide News" />
      <div className="text-center text-muted-foreground">
        <p>News articles will be displayed here.</p>
      </div>
    </div>
  );
}
