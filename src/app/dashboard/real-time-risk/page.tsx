import { PageHeader } from "@/components/layout/page-header";
import { RealTimeRiskAssessment } from "@/components/real-time-risk-assessment";

export default function RealTimeRiskPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader title="Real-time Risk Assessment" />
      <RealTimeRiskAssessment />
    </div>
  );
}
