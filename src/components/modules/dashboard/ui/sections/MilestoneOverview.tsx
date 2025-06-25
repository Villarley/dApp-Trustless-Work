"use client";

import { CheckCircle, Clock, AlertTriangle, FileCheck } from "lucide-react";
import { MetricCard } from "../cards/MetricCard";
import { MilestoneStatusChart } from "../charts/MilestoneStatusChart";
import { MilestoneApprovalTrendChart } from "../charts/MilestoneApprovalTrendChart";
import { useMilestoneDashboardData } from "../../hooks/milestone-dashboard-data.hook";
import { SkeletonMilestoneStatusChart } from "../utils/SkeletonMilestoneOverview";
import { SkeletonMilestoneApprovalTrendChart } from "../utils/SkeletonMilestoneApprovalChart";
import { Escrow } from "@/@types/escrow.entity";
import { useTranslation } from "react-i18next";

interface MilestonesOverviewProps {
  address: string;
  type?: string;
  escrows: Escrow[];
}

export const MilestonesOverview = ({
  address,
  type = "approver",
  escrows = [],
}: MilestonesOverviewProps) => {
  const { t } = useTranslation();
  const data = useMilestoneDashboardData({ address, type, escrows });
  const hasData = data !== null;

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <h1 className="text-2xl font-bold">{t("dashboard.milestones.title")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title={t("dashboard.milestones.total")}
          value={hasData ? data.totalMilestones : 0}
          icon={<FileCheck />}
          subValue={t("dashboard.milestones.totalDescription")}
          isLoading={!hasData}
        />
        <MetricCard
          title={t("dashboard.milestones.pending")}
          value={hasData ? data.pendingApproval : 0}
          icon={<Clock />}
          subValue={t("dashboard.milestones.pendingDescription")}
          isLoading={!hasData}
        />
        <MetricCard
          title={t("dashboard.milestones.approvedNotReleased")}
          value={hasData ? data.approvedNotReleased : 0}
          icon={<CheckCircle />}
          subValue={t("dashboard.milestones.approvedNotReleasedDescription")}
          isLoading={!hasData}
        />
        <MetricCard
          title={t("dashboard.milestones.disputed")}
          value={hasData ? data.disputed : 0}
          icon={<AlertTriangle />}
          subValue={t("dashboard.milestones.disputedDescription")}
          isLoading={!hasData}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
        <div className="md:col-span-3">
          {hasData ? (
            <MilestoneStatusChart data={data.milestoneStatusCounts} />
          ) : (
            <SkeletonMilestoneStatusChart />
          )}
        </div>

        <div className="md:col-span-7">
          {hasData ? (
            <MilestoneApprovalTrendChart data={data.milestoneApprovalTrend} />
          ) : (
            <SkeletonMilestoneApprovalTrendChart />
          )}
        </div>
      </div>
    </div>
  );
};
