import RegisterForm from "@/components/modules/Auth/RegisterForm";
import { Card } from "@/components/ui/card";

export default function Register() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card>
        <RegisterForm />
      </Card>
    </div>
  );
}