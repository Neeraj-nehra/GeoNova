import { PageHeader } from "@/components/layout/page-header";
import { SubmitReportForm } from "@/components/submit-report-form";

export default function SubmitReportPage() {
  return (
    <div className="animate-fade-in-up max-w-3xl mx-auto">
      <PageHeader title="Submit a Report" />
      <SubmitReportForm />
    </div>
  );
}
