import GameNamePage, { gameNameMetadata } from "@/components/GameNamePage";

export const metadata = gameNameMetadata("free-fire");

export default function Page() {
  return <GameNamePage slug="free-fire" />;
}
