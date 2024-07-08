import FormChangeEmail from "@/components/profile/email/FormChangeEmail";
import AuthService from "@/lib/services/AuthService";

export default async function ChangeEmailPage() {
  const email = await AuthService.getEmailFromToken();

  return (
    <>
      <FormChangeEmail email={email} />
    </>
  );
}
