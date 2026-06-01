import GameNamePage, { gameNameMetadata } from "@/components/GameNamePage";

export const metadata = gameNameMetadata("discord");

export default function Page() {
  return <GameNamePage slug="discord" />;
}
