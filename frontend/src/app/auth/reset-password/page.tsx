import ResetPassword from "./ResetPasswordClient";

export default function Page({ searchParams }: { searchParams?: any }) {
  const user = searchParams?.user as string | undefined;
  return <ResetPassword user={user} />;
}
