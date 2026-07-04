import { motion } from "framer-motion";
import { Plus, Tag, FileBarChart } from "lucide-react";
import { Button } from "../../design-system/components/Button/Button";

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-card border border-border/50 rounded-3xl p-6"
    >
      <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-4">
        <Button className="w-full justify-start h-12" variant="outline">
          <Plus className="w-5 h-5 mr-3 text-primary" /> 
          Add New Medicine
        </Button>
        <Button className="w-full justify-start h-12" variant="outline">
          <Tag className="w-5 h-5 mr-3 text-blue-500" /> 
          Create Discount Campaign
        </Button>
        <Button className="w-full justify-start h-12" variant="outline">
          <FileBarChart className="w-5 h-5 mr-3 text-green-500" /> 
          Generate Tax Report
        </Button>
      </div>
    </motion.div>
  );
}
