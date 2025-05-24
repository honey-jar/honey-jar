import { Outlet } from "react-router";
import Header from "~/components/landing/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
