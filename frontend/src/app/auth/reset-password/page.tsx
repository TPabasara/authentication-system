import ResetPassword from "./ResetPasswordClient";

export default function Page({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const user = searchParams?.user as string | undefined;

  return <ResetPassword user={user} />;
}
