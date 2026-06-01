import GameNamePage, { gameNameMetadata } from "@/components/GameNamePage";

export const metadata = gameNameMetadata("bgmi");

export default function Page() {
  return <GameNamePage slug="bgmi" />;
}
