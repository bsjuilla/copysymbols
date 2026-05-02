import type { Metadata } from "next";
import BlogList from "./BlogList";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Blog — Symbol Guides & How-To Articles",
  description: "Learn how to type and use special characters. Guides on copyright symbols, currency symbols, Greek letters, trademark symbols, and more.",
  ...canonical("/blog"),
};

export default function BlogIndexPage() {
  return <BlogList />;
}
