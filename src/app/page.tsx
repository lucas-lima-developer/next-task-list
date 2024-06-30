import AuthService from "@/lib/services/AuthService";
import { redirect } from "next/navigation";

export default function Home() {

  if (AuthService.isAuthenticated()) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }

  return (
    <main>
      <h1>/login para página de login</h1>
    </main>
  );
}
