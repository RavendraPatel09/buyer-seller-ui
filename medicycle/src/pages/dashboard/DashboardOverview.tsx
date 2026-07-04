import { DashboardLayout } from "../../layouts/DashboardLayout";
import { StatCard } from "../../components/dashboard/StatCard";
import { RevenueChart } from "../../components/dashboard/RevenueChart";
import { ProgressRing } from "../../components/dashboard/ProgressRing";
import { RecentActivity } from "../../components/dashboard/RecentActivity";
import { QuickActions } from "../../components/dashboard/QuickActions";
import { DollarSign, Package, ShoppingCart, MessageSquare } from "lucide-react";

export function DashboardOverview() {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back. Here is what's happening with your store today.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Revenue" value="$45,231.89" icon={DollarSign} trend={12.5} delay={0} />
          <StatCard title="Active Listings" value="342" icon={Package} trend={4.2} delay={0.1} />
          <StatCard title="Total Orders" value="1,204" icon={ShoppingCart} trend={-2.4} delay={0.2} />
          <StatCard title="Unread Messages" value="12" icon={MessageSquare} delay={0.3} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>
          <div className="xl:col-span-1">
            <ProgressRing progress={85} label="Inventory Health" sublabel="15% of your stock is nearing expiry" />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <RecentActivity />
          </div>
          <div className="xl:col-span-1">
            <QuickActions />
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
