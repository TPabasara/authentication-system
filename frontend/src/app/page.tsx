import LoginSignup from "./auth/login-signup/page";
export default function Home() {
  return (
    <div>
      <LoginSignup />
      console.log(process.env.SERVER);
    </div>
  );
}
