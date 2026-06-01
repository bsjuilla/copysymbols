import GameNamePage, { gameNameMetadata } from "@/components/GameNamePage";

export const metadata = gameNameMetadata("valorant");

export default function Page() {
  return <GameNamePage slug="valorant" />;
}
