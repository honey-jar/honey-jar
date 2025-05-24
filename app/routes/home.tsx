import Header from "~/components/landing/Header";
import type { Route } from "./+types/home";
import Hero from "~/components/landing/Hero";

export function meta({}: Route.MetaArgs) {
  return [{ title: "HoneyJar" }, { name: "description", content: "HoneyJar" }];
}

export default function Home() {
  return (
    <div className="relative">
      <Hero />
    </div>
  );
}
