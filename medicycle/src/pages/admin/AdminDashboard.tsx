import { AdminLayout } from "../../layouts/AdminLayout";
import { AdminStatCard } from "../../components/admin/AdminStatCard";
import { TrendChart } from "../../components/admin/TrendChart";
import { FraudAlertCard } from "../../components/admin/FraudAlertCard";
import { AnimatedTable } from "../../components/admin/AnimatedTable";
import { Users, DollarSign, Flag } from "lucide-react";

export function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Global Analytics</h1>
          <p className="text-muted-foreground">Real-time overview of platform health and moderation.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AdminStatCard title="Total Active Users" value="12,492" icon={Users} trend="14.2%" isPositive={true} delay={0} />
          <AdminStatCard title="Monthly Revenue (GMV)" value="$1.24M" icon={DollarSign} trend="8.4%" isPositive={true} delay={0.1} />
          <AdminStatCard title="Flagged Content" value="48" icon={Flag} trend="2.1%" isPositive={false} delay={0.2} />
        </div>

        {/* Chart Row */}
        <div>
          <TrendChart />
        </div>

        {/* Moderation Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1">
            <FraudAlertCard />
          </div>
          <div className="xl:col-span-2">
            <AnimatedTable />
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
