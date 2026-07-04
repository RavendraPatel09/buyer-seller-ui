import { motion } from "framer-motion";
import { CheckCircle2, Package, User } from "lucide-react";

const activities = [
  { id: 1, type: 'order', title: 'New order received', time: '10 mins ago', desc: 'Order #4892 for 50x Aspirin', icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 2, type: 'success', title: 'Payment cleared', time: '2 hours ago', desc: '$450.00 deposited to your account', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  { id: 3, type: 'user', title: 'New review', time: '5 hours ago', desc: '5 stars from Dr. Sarah Smith', icon: User, color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card border border-border/50 rounded-3xl p-6"
    >
      <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
      <div className="space-y-6">
        {activities.map((act, i) => (
          <div key={act.id} className="flex relative">
            {i !== activities.length - 1 && (
              <div className="absolute left-5 top-10 bottom-[-24px] w-0.5 bg-border/50" />
            )}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${act.bg}`}>
              <act.icon className={`w-5 h-5 ${act.color}`} />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-medium text-sm">{act.title}</h4>
                <span className="text-xs text-muted-foreground">{act.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{act.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
