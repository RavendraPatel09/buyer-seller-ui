import { motion } from "framer-motion";
import { Check, X, MoreHorizontal } from "lucide-react";
import { Button } from "../../design-system/components/Button/Button";

const mockUsers = [
  { id: "U-8921", name: "Dr. Sarah Smith", role: "Buyer", status: "Active", date: "2023-10-24" },
  { id: "U-8922", name: "MediLife Supplies", role: "Seller", status: "Pending", date: "2023-10-24" },
  { id: "U-8923", name: "John Doe", role: "Buyer", status: "Suspended", date: "2023-10-23" },
  { id: "U-8924", name: "PharmaCorp", role: "Seller", status: "Active", date: "2023-10-21" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export function AnimatedTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-card border border-border/50 rounded-3xl p-6 overflow-hidden flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Recent Registrations</h3>
          <p className="text-sm text-muted-foreground">Approve or reject new seller accounts.</p>
        </div>
        <Button variant="outline" className="h-9 text-xs">View All</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
            <tr>
              <th className="px-4 py-3 rounded-l-lg font-medium">User</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 rounded-r-lg font-medium text-right">Actions</th>
            </tr>
          </thead>
          <motion.tbody variants={container} initial="hidden" animate="show">
            {mockUsers.map((user) => (
              <motion.tr key={user.id} variants={item} className="border-b border-border/10 last:border-0 hover:bg-muted/30 transition-colors group">
                <td className="px-4 py-4 font-medium flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-3 shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-foreground">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.id}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-muted-foreground">{user.role}</td>
                <td className="px-4 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    user.status === 'Active' ? 'bg-green-500/10 text-green-500' :
                    user.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-muted-foreground">{user.date}</td>
                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {user.status === 'Pending' && (
                      <>
                        <button className="p-1.5 text-green-500 hover:bg-green-500/10 rounded-md transition-colors"><Check className="w-4 h-4" /></button>
                        <button className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md transition-colors"><X className="w-4 h-4" /></button>
                      </>
                    )}
                    <button className="p-1.5 text-muted-foreground hover:bg-muted rounded-md transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </motion.div>
  );
}
