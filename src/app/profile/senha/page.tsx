import FormChangePassword from "@/components/profile/senha/FormChangePassword";
import AuthService from "@/lib/services/AuthService";

export default async function ChangePasswordPage() {
  const email = await AuthService.getEmailFromToken();

  return (
    <>
      <FormChangePassword email={email} />
    </>
  );
}
