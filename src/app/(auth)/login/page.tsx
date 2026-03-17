import LoginForm from "@/components/modules/Auth/LoginForm";
import { Card } from "@/components/ui/card";

export default function Login() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card>
        <LoginForm />
      </Card>
    </div>
  );
}
