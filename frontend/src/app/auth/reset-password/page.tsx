import ResetPassword from "./ResetPasswordClient";

type SearchParams = { [key: string]: string | string[] | undefined };

interface PageProps {
  searchParams?: SearchParams;
}

export default function Page({ searchParams }: PageProps) {
  const user =
    typeof searchParams?.user === "string" ? searchParams.user : undefined;
  return <ResetPassword user={user} />;
}
