import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Droplets, Phone, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import deliveryImage from "@/assets/renuka-aqua-delivery.jpg";
import { digitsOnly, isTenDigitPhone } from "@/lib/validation";

const Login = () => {
  const { login } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTenDigitPhone(phone)) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }
    if (password.trim().length < 4) {
      toast.error("PIN must be at least 4 digits");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const success = login(phone, password);
    setLoading(false);
    if (!success) {
      toast.error("Invalid phone number or password", { description: "Use the demo credentials shown below." });
    }
  };

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[1.05fr_0.95fr]">
      <div className="hidden min-h-screen overflow-hidden lg:block">
        <img src={deliveryImage} alt="Renuka Aqua delivery vehicle with water cans" width={1280} height={720} className="h-full w-full object-cover" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-screen w-full flex-col justify-center px-6 py-10 sm:px-10"
      >
        <div className="mx-auto w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-xl bg-primary flex items-center justify-center mb-4 shadow-lg">
            <Droplets className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Renuka Aqua</h1>
          <p className="text-muted-foreground text-sm mt-1">Water & Cold Drinks Supply</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(digitsOnly(e.target.value))}
              className="pl-11 h-14 text-base rounded-xl"
              maxLength={10}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Password / PIN"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-11 h-14 text-base rounded-xl"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full h-14 text-base font-semibold rounded-xl"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Admin: 9876543210 / 1234
          </p>
          <p className="text-xs text-muted-foreground">
            Labour: 9876543211 / 1111
          </p>
        </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
