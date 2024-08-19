import { Separator } from "@/components/ui/separator";
import CustomForm from "./custom-form";
import ProfileForm from "./profile-form";

export default async function ProfilePage() {
  return (
    <div className="flex space-x-4 h-[900px]">
      <ProfileForm />
      <Separator orientation="vertical" />
      <CustomForm
        defaultValues={{
          username: "John Doe",
          email: "m@example.com",
          bio: "Hello, I'm John Doe",
          startDate: new Date(),
        }}
      />
    </div>
  );
}
