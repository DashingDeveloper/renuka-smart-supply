import { PackageOpen } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState = ({ icon: Icon = PackageOpen, title, description, action }: EmptyStateProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-16 px-4 text-center"
  >
    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
    {description && <p className="text-sm text-muted-foreground max-w-xs">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </motion.div>
);

export default EmptyState;
