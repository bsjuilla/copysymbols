import GameNamePage, { gameNameMetadata } from "@/components/GameNamePage";

export const metadata = gameNameMetadata("fortnite");

export default function Page() {
  return <GameNamePage slug="fortnite" />;
}
