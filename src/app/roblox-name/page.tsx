import GameNamePage, { gameNameMetadata } from "@/components/GameNamePage";

export const metadata = gameNameMetadata("roblox");

export default function Page() {
  return <GameNamePage slug="roblox" />;
}
