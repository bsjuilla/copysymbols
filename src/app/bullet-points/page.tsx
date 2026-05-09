import type { Metadata } from "next";
import CopyToast from "@/components/CopyToast";
import BulletsClient from "./BulletsClient";
import { canonical } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Bullet Point Symbols Copy & Paste • ▸ ➤ ✦ — All Bullet Points",
  description: "Copy and paste bullet point symbols. • ▸ ➤ ✦ ◦ ‣ ⁃ and 60+ more. Perfect for Word documents, LinkedIn posts, Discord and presentations.",
  keywords: ["bullet point copy paste","bullet symbols copy","• copy paste","list symbols copy paste","arrow bullets copy paste"],
  ...canonical("/bullet-points"),
};

export default function BulletPage() {
  return (<><CopyToast /><BulletsClient /></>);
}
