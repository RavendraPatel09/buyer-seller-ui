import { motion } from "framer-motion";
import { ShieldAlert, ChevronRight } from "lucide-react";
import { Button } from "../../design-system/components/Button/Button";

const alerts = [
  { id: 1, type: "HIGH", message: "Multiple failed logins from IP 192.168.1.1", user: "seller_29" },
  { id: 2, type: "CRITICAL", message: "Suspicious bulk price change detected", user: "PharmaCorp" },
  { id: 3, type: "MEDIUM", message: "Unverified license uploaded", user: "MediLife" },
];

export function FraudAlertCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card border border-border/50 rounded-3xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center text-destructive">
          <ShieldAlert className="w-5 h-5 mr-2" /> Fraud & Alerts
        </h3>
        <span className="bg-destructive/10 text-destructive text-xs font-bold px-2 py-1 rounded-md">3 Active</span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-3 bg-muted/30 border border-destructive/20 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-muted/50 transition-colors">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  alert.type === 'CRITICAL' ? 'bg-destructive text-white' : 
                  alert.type === 'HIGH' ? 'bg-orange-500 text-white' : 
                  'bg-yellow-500 text-black'
                }`}>
                  {alert.type}
                </span>
                <span className="text-xs font-medium text-muted-foreground">{alert.user}</span>
              </div>
              <p className="text-sm font-medium">{alert.message}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        ))}
      </div>
      
      <Button variant="outline" className="w-full mt-4 h-9 text-xs">View All Alerts</Button>
    </motion.div>
  );
}
