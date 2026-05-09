"use client";
import { useState } from "react";

const emojiCategories = [
  {
    id: "smileys", name: "Smileys & Emotion", icon: "😀",
    emoji: [
      { e: "😀", n: "Grinning Face" }, { e: "😃", n: "Grinning Big Eyes" }, { e: "😄", n: "Grinning Squinting" },
      { e: "😁", n: "Beaming Face" }, { e: "😆", n: "Squinting Face" }, { e: "😅", n: "Sweat Smile" },
      { e: "🤣", n: "Rolling on Floor" }, { e: "😂", n: "Joy" }, { e: "🙂", n: "Slightly Smiling" },
      { e: "😊", n: "Smiling Eyes" }, { e: "😇", n: "Smiling Halo" }, { e: "🥰", n: "Smiling Hearts" },
      { e: "😍", n: "Heart Eyes" }, { e: "🤩", n: "Star Struck" }, { e: "😘", n: "Face Blowing Kiss" },
      { e: "😗", n: "Kissing Face" }, { e: "😚", n: "Kissing Closed Eyes" }, { e: "😙", n: "Kissing Smiling" },
      { e: "🥲", n: "Smiling Tear" }, { e: "😋", n: "Savoring Food" }, { e: "😛", n: "Face Tongue" },
      { e: "😜", n: "Winking Tongue" }, { e: "🤪", n: "Zany Face" }, { e: "😝", n: "Squinting Tongue" },
      { e: "🤑", n: "Money Face" }, { e: "🤗", n: "Hugging Face" }, { e: "🤭", n: "Hand Over Mouth" },
      { e: "🤫", n: "Shushing Face" }, { e: "🤔", n: "Thinking Face" }, { e: "🤐", n: "Zipper Mouth" },
      { e: "😐", n: "Neutral Face" }, { e: "😑", n: "Expressionless" }, { e: "😶", n: "No Mouth" },
      { e: "😏", n: "Smirking Face" }, { e: "😒", n: "Unamused Face" }, { e: "🙄", n: "Rolling Eyes" },
      { e: "😬", n: "Grimacing Face" }, { e: "😮", n: "Open Mouth" }, { e: "😯", n: "Hushed Face" },
      { e: "😲", n: "Astonished Face" }, { e: "😳", n: "Flushed Face" }, { e: "🥺", n: "Pleading Face" },
      { e: "😦", n: "Frowning Open" }, { e: "😧", n: "Anguished Face" }, { e: "😨", n: "Fearful Face" },
      { e: "😰", n: "Cold Sweat" }, { e: "😥", n: "Sad Relieved" }, { e: "😢", n: "Crying Face" },
      { e: "😭", n: "Loudly Crying" }, { e: "😱", n: "Screaming Fear" }, { e: "😖", n: "Confounded" },
      { e: "😣", n: "Persevering" }, { e: "😞", n: "Disappointed" }, { e: "😓", n: "Downcast Sweat" },
      { e: "😩", n: "Weary Face" }, { e: "😫", n: "Tired Face" }, { e: "🥱", n: "Yawning Face" },
      { e: "😤", n: "Face Steam" }, { e: "😡", n: "Pouting Face" }, { e: "😠", n: "Angry Face" },
      { e: "🤬", n: "Face Symbols" }, { e: "😈", n: "Smiling Devil" }, { e: "👿", n: "Angry Devil" },
      { e: "💀", n: "Skull" }, { e: "☠️", n: "Skull Crossbones" }, { e: "💩", n: "Pile of Poo" },
      { e: "🤡", n: "Clown Face" }, { e: "👹", n: "Ogre" }, { e: "👺", n: "Goblin" },
      { e: "👻", n: "Ghost" }, { e: "👽", n: "Alien" }, { e: "👾", n: "Alien Monster" },
      { e: "🤖", n: "Robot" }, { e: "😺", n: "Grinning Cat" }, { e: "😸", n: "Grinning Cat Eyes" },
      { e: "❤️", n: "Red Heart" }, { e: "🧡", n: "Orange Heart" }, { e: "💛", n: "Yellow Heart" },
      { e: "💚", n: "Green Heart" }, { e: "💙", n: "Blue Heart" }, { e: "💜", n: "Purple Heart" },
      { e: "🖤", n: "Black Heart" }, { e: "🤍", n: "White Heart" }, { e: "💔", n: "Broken Heart" },
      { e: "💯", n: "Hundred Points" }, { e: "💢", n: "Anger Symbol" }, { e: "💬", n: "Speech Bubble" },
    ]
  },
  {
    id: "people", name: "People & Body", icon: "👋",
    emoji: [
      { e: "👋", n: "Waving Hand" }, { e: "🤚", n: "Raised Back Hand" }, { e: "🖐", n: "Hand Fingers" },
      { e: "✋", n: "Raised Hand" }, { e: "🖖", n: "Vulcan Salute" }, { e: "👌", n: "OK Hand" },
      { e: "🤌", n: "Pinched Fingers" }, { e: "✌️", n: "Victory Hand" }, { e: "🤞", n: "Crossed Fingers" },
      { e: "🤟", n: "Love You Gesture" }, { e: "🤘", n: "Sign of Horns" }, { e: "👍", n: "Thumbs Up" },
      { e: "👎", n: "Thumbs Down" }, { e: "✊", n: "Raised Fist" }, { e: "👊", n: "Oncoming Fist" },
      { e: "🤛", n: "Left Fist" }, { e: "🤜", n: "Right Fist" }, { e: "👏", n: "Clapping Hands" },
      { e: "🙌", n: "Raising Hands" }, { e: "🤲", n: "Palms Together" }, { e: "🤝", n: "Handshake" },
      { e: "🙏", n: "Folded Hands" }, { e: "✍️", n: "Writing Hand" }, { e: "💪", n: "Flexed Bicep" },
      { e: "🦾", n: "Mechanical Arm" }, { e: "🦵", n: "Leg" }, { e: "🦶", n: "Foot" },
      { e: "👂", n: "Ear" }, { e: "🦻", n: "Ear with Aid" }, { e: "👃", n: "Nose" },
      { e: "🧠", n: "Brain" }, { e: "👀", n: "Eyes" }, { e: "👁", n: "Eye" },
      { e: "👅", n: "Tongue" }, { e: "🦷", n: "Tooth" }, { e: "🦴", n: "Bone" },
    ]
  },
  {
    id: "animals", name: "Animals & Nature", icon: "🐶",
    emoji: [
      { e: "🐶", n: "Dog Face" }, { e: "🐱", n: "Cat Face" }, { e: "🐭", n: "Mouse Face" },
      { e: "🐹", n: "Hamster" }, { e: "🐰", n: "Rabbit Face" }, { e: "🦊", n: "Fox" },
      { e: "🐻", n: "Bear" }, { e: "🐼", n: "Panda" }, { e: "🐨", n: "Koala" },
      { e: "🐯", n: "Tiger Face" }, { e: "🦁", n: "Lion" }, { e: "🐮", n: "Cow Face" },
      { e: "🐷", n: "Pig Face" }, { e: "🐸", n: "Frog" }, { e: "🐵", n: "Monkey Face" },
      { e: "🐔", n: "Chicken" }, { e: "🐧", n: "Penguin" }, { e: "🐦", n: "Bird" },
      { e: "🦆", n: "Duck" }, { e: "🦅", n: "Eagle" }, { e: "🦉", n: "Owl" },
      { e: "🦇", n: "Bat" }, { e: "🐺", n: "Wolf" }, { e: "🐗", n: "Boar" },
      { e: "🐴", n: "Horse Face" }, { e: "🦄", n: "Unicorn" }, { e: "🐝", n: "Honeybee" },
      { e: "🦋", n: "Butterfly" }, { e: "🐛", n: "Bug" }, { e: "🐌", n: "Snail" },
      { e: "🐢", n: "Turtle" }, { e: "🐍", n: "Snake" }, { e: "🦎", n: "Lizard" },
      { e: "🦕", n: "Sauropod" }, { e: "🐳", n: "Spouting Whale" }, { e: "🦈", n: "Shark" },
      { e: "🐬", n: "Dolphin" }, { e: "🦞", n: "Lobster" }, { e: "🦀", n: "Crab" },
      { e: "🌸", n: "Cherry Blossom" }, { e: "🌺", n: "Hibiscus" }, { e: "🌻", n: "Sunflower" },
      { e: "🌹", n: "Rose" }, { e: "🍀", n: "Four Leaf Clover" }, { e: "🌵", n: "Cactus" },
      { e: "🌴", n: "Palm Tree" }, { e: "🌲", n: "Evergreen" }, { e: "🌊", n: "Water Wave" },
    ]
  },
  {
    id: "food", name: "Food & Drink", icon: "🍕",
    emoji: [
      { e: "🍎", n: "Red Apple" }, { e: "🍊", n: "Tangerine" }, { e: "🍋", n: "Lemon" },
      { e: "🍇", n: "Grapes" }, { e: "🍓", n: "Strawberry" }, { e: "🫐", n: "Blueberries" },
      { e: "🍑", n: "Peach" }, { e: "🥝", n: "Kiwi" }, { e: "🍕", n: "Pizza" },
      { e: "🍔", n: "Hamburger" }, { e: "🌮", n: "Taco" }, { e: "🌯", n: "Burrito" },
      { e: "🥗", n: "Green Salad" }, { e: "🍜", n: "Steaming Bowl" }, { e: "🍣", n: "Sushi" },
      { e: "🍦", n: "Soft Ice Cream" }, { e: "🍰", n: "Shortcake" }, { e: "🎂", n: "Birthday Cake" },
      { e: "🍫", n: "Chocolate Bar" }, { e: "🍬", n: "Candy" }, { e: "🍭", n: "Lollipop" },
      { e: "☕", n: "Hot Beverage" }, { e: "🧋", n: "Bubble Tea" }, { e: "🍵", n: "Teacup" },
      { e: "🧃", n: "Juice Box" }, { e: "🥤", n: "Cup with Straw" }, { e: "🍺", n: "Beer Mug" },
      { e: "🥂", n: "Clinking Glasses" }, { e: "🍷", n: "Wine Glass" }, { e: "🥃", n: "Tumbler Glass" },
    ]
  },
  {
    id: "travel", name: "Travel & Places", icon: "✈️",
    emoji: [
      { e: "✈️", n: "Airplane" }, { e: "🚀", n: "Rocket" }, { e: "🛸", n: "Flying Saucer" },
      { e: "🚁", n: "Helicopter" }, { e: "🚂", n: "Locomotive" }, { e: "🚗", n: "Automobile" },
      { e: "🏎️", n: "Racing Car" }, { e: "🚕", n: "Taxi" }, { e: "🚌", n: "Bus" },
      { e: "🛵", n: "Motor Scooter" }, { e: "🚲", n: "Bicycle" }, { e: "⛵", n: "Sailboat" },
      { e: "🚢", n: "Ship" }, { e: "🏠", n: "House" }, { e: "🏢", n: "Office Building" },
      { e: "🏰", n: "Castle" }, { e: "⛺", n: "Tent" }, { e: "🗼", n: "Tokyo Tower" },
      { e: "🗽", n: "Statue of Liberty" }, { e: "🌍", n: "Earth Africa" }, { e: "🌎", n: "Earth Americas" },
      { e: "🌏", n: "Earth Asia" }, { e: "🌐", n: "Globe Meridians" }, { e: "🗺️", n: "World Map" },
      { e: "🏔️", n: "Snow Mountain" }, { e: "🌋", n: "Volcano" }, { e: "🏖️", n: "Beach" },
      { e: "🏝️", n: "Desert Island" }, { e: "🌅", n: "Sunrise" }, { e: "🌃", n: "Night Stars" },
    ]
  },
  {
    id: "objects", name: "Objects & Symbols", icon: "💡",
    emoji: [
      { e: "💡", n: "Light Bulb" }, { e: "🔦", n: "Flashlight" }, { e: "🕯️", n: "Candle" },
      { e: "💰", n: "Money Bag" }, { e: "💎", n: "Gem Stone" }, { e: "🏆", n: "Trophy" },
      { e: "🎖️", n: "Military Medal" }, { e: "🥇", n: "1st Place Medal" }, { e: "🎯", n: "Bullseye" },
      { e: "🎮", n: "Video Game" }, { e: "🎲", n: "Game Die" }, { e: "🎸", n: "Guitar" },
      { e: "🎹", n: "Musical Keyboard" }, { e: "🎺", n: "Trumpet" }, { e: "🥁", n: "Drum" },
      { e: "📱", n: "Mobile Phone" }, { e: "💻", n: "Laptop" }, { e: "🖥️", n: "Desktop" },
      { e: "⌨️", n: "Keyboard" }, { e: "🖨️", n: "Printer" }, { e: "📷", n: "Camera" },
      { e: "📚", n: "Books" }, { e: "📝", n: "Memo" }, { e: "✏️", n: "Pencil" },
      { e: "📌", n: "Pushpin" }, { e: "🔑", n: "Key" }, { e: "🔒", n: "Locked" },
      { e: "🔔", n: "Bell" }, { e: "🔧", n: "Wrench" }, { e: "⚙️", n: "Gear" },
      { e: "🧲", n: "Magnet" }, { e: "🧪", n: "Test Tube" }, { e: "🔭", n: "Telescope" },
      { e: "🩺", n: "Stethoscope" }, { e: "💊", n: "Pill" }, { e: "🩹", n: "Adhesive Bandage" },
    ]
  },
];

export default function EmojiPageClient() {
  const [active, setActive] = useState("smileys");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (e: string, name: string) => {
    try { await navigator.clipboard.writeText(e); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = e; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(e);
    const toast = document.getElementById("global-toast");
    const toastSym = document.getElementById("toast-symbol");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastSym && toastMsg) {
      toastSym.textContent = e;
      toastMsg.textContent = `Copied ${name}`;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); setCopied(null); }, 1800);
    }
  };

  const activeCat = emojiCategories.find(c => c.id === active)!;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-label">Unicode emoji</div>
      <h1 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.03em" }}>
        Copy & Paste Emoji 😀
      </h1>
      <p style={{ fontSize: 16, color: "var(--text2)", marginBottom: 32, lineHeight: 1.6 }}>
        Click any emoji to copy it instantly. Works in any app, website, or document.
      </p>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
        {emojiCategories.map(c => (
          <button
            key={c.id}
            className={`cat-pill ${active === c.id ? "active" : ""}`}
            onClick={() => setActive(c.id)}
          >
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      {/* Emoji grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(74px, 1fr))", gap: 8 }}>
        {activeCat.emoji.map(({ e, n }) => (
          <div
            key={e}
            className={`symbol-card ${copied === e ? "copied" : ""}`}
            onClick={() => handleCopy(e, n)}
            title={n}
          >
            <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>{e}</span>
            <span className="symbol-name">{n}</span>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 48, fontSize: 14, color: "var(--text3)", lineHeight: 1.7, textAlign: "center" }}>
        All emoji shown here are standard Unicode emoji supported by major platforms including iOS, Android, Windows, and macOS.
      </p>
    </div>
  );
}
