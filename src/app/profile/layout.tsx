import HeaderLinks from "@/components/header/HeaderLinks";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderLinks />
      {children}
    </>
  );
}
