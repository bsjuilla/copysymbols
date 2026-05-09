"use client";
import { useState } from "react";

const emojiCategories = [
  {
    id: "smileys", name: "Smileys & Emotion", icon: "😀",
    emoji: [
      { e: "😀", n: "Grinning Face" }, { e: "😃", n: "Grinning Big Eyes" }, { e: "😄", n: "Grinning Squinting" },
      { e: "😁", n: "Beaming Face" }, { e: "😆", n: "Squinting Face" }, { e: "😅", n: "Sweat Smile" },
      { e: "🤣", n: "Rolling on Floor" }, { e: "😂", n: "Joy" }, { e: "🙂", n: "Slightly Smiling" },
      { e: "🙃", n: "Upside Down" }, { e: "🫠", n: "Melting Face" }, { e: "😉", n: "Winking Face" },
      { e: "😊", n: "Smiling Eyes" }, { e: "😇", n: "Smiling Halo" }, { e: "🥰", n: "Smiling Hearts" },
      { e: "😍", n: "Heart Eyes" }, { e: "🤩", n: "Star Struck" }, { e: "😘", n: "Face Blowing Kiss" },
      { e: "😗", n: "Kissing Face" }, { e: "😚", n: "Kissing Closed Eyes" }, { e: "😙", n: "Kissing Smiling" },
      { e: "🥲", n: "Smiling Tear" }, { e: "😋", n: "Savoring Food" }, { e: "😛", n: "Face Tongue" },
      { e: "😜", n: "Winking Tongue" }, { e: "🤪", n: "Zany Face" }, { e: "😝", n: "Squinting Tongue" },
      { e: "🤑", n: "Money Face" }, { e: "🤗", n: "Hugging Face" }, { e: "🫡", n: "Saluting Face" },
      { e: "🤭", n: "Hand Over Mouth" }, { e: "🫢", n: "Open Eyes Hand" }, { e: "🫣", n: "Peeking" },
      { e: "🤫", n: "Shushing Face" }, { e: "🤔", n: "Thinking Face" }, { e: "🫥", n: "Dotted Line Face" },
      { e: "🤐", n: "Zipper Mouth" }, { e: "🤨", n: "Raised Eyebrow" }, { e: "😐", n: "Neutral Face" },
      { e: "😑", n: "Expressionless" }, { e: "😶", n: "No Mouth" }, { e: "😶‍🌫️", n: "Face in Clouds" },
      { e: "😏", n: "Smirking Face" }, { e: "😒", n: "Unamused Face" }, { e: "🙄", n: "Rolling Eyes" },
      { e: "😬", n: "Grimacing Face" }, { e: "😮‍💨", n: "Exhaling Face" }, { e: "🤥", n: "Lying Face" },
      { e: "😌", n: "Relieved Face" }, { e: "😔", n: "Pensive Face" }, { e: "😪", n: "Sleepy Face" },
      { e: "🤤", n: "Drooling Face" }, { e: "😴", n: "Sleeping Face" }, { e: "😷", n: "Mask Face" },
      { e: "🤒", n: "Thermometer Face" }, { e: "🤕", n: "Bandage Face" }, { e: "🤢", n: "Nauseated" },
      { e: "🤮", n: "Vomiting" }, { e: "🤧", n: "Sneezing" }, { e: "🥵", n: "Hot Face" },
      { e: "🥶", n: "Cold Face" }, { e: "🥴", n: "Woozy Face" }, { e: "😵", n: "Dizzy Face" },
      { e: "😵‍💫", n: "Spiral Eyes" }, { e: "🤯", n: "Mind Blown" }, { e: "🤠", n: "Cowboy" },
      { e: "🥳", n: "Partying Face" }, { e: "🥸", n: "Disguised Face" }, { e: "😎", n: "Sunglasses" },
      { e: "🤓", n: "Nerd Face" }, { e: "🧐", n: "Monocle Face" }, { e: "😕", n: "Confused" },
      { e: "🫤", n: "Diagonal Mouth" }, { e: "😟", n: "Worried Face" }, { e: "🙁", n: "Slightly Frowning" },
      { e: "☹️", n: "Frowning Face" }, { e: "😮", n: "Open Mouth" }, { e: "😯", n: "Hushed Face" },
      { e: "😲", n: "Astonished Face" }, { e: "😳", n: "Flushed Face" }, { e: "🥺", n: "Pleading Face" },
      { e: "🥹", n: "Holding Back Tears" }, { e: "😦", n: "Frowning Open" }, { e: "😧", n: "Anguished Face" },
      { e: "😨", n: "Fearful Face" }, { e: "😰", n: "Cold Sweat" }, { e: "😥", n: "Sad Relieved" },
      { e: "😢", n: "Crying Face" }, { e: "😭", n: "Loudly Crying" }, { e: "😱", n: "Screaming Fear" },
      { e: "😖", n: "Confounded" }, { e: "😣", n: "Persevering" }, { e: "😞", n: "Disappointed" },
      { e: "😓", n: "Downcast Sweat" }, { e: "😩", n: "Weary Face" }, { e: "😫", n: "Tired Face" },
      { e: "🥱", n: "Yawning Face" }, { e: "😤", n: "Face Steam" }, { e: "😡", n: "Pouting Face" },
      { e: "😠", n: "Angry Face" }, { e: "🤬", n: "Face Symbols" }, { e: "😈", n: "Smiling Devil" },
      { e: "👿", n: "Angry Devil" }, { e: "💀", n: "Skull" }, { e: "☠️", n: "Skull Crossbones" },
      { e: "💩", n: "Pile of Poo" }, { e: "🤡", n: "Clown Face" }, { e: "👹", n: "Ogre" },
      { e: "👺", n: "Goblin" }, { e: "👻", n: "Ghost" }, { e: "👽", n: "Alien" },
      { e: "👾", n: "Alien Monster" }, { e: "🤖", n: "Robot" }, { e: "😺", n: "Grinning Cat" },
      { e: "😸", n: "Grinning Cat Eyes" }, { e: "😹", n: "Cat Joy" }, { e: "😻", n: "Heart Eye Cat" },
      { e: "😼", n: "Smirking Cat" }, { e: "😽", n: "Kissing Cat" }, { e: "🙀", n: "Weary Cat" },
      { e: "😿", n: "Crying Cat" }, { e: "😾", n: "Pouting Cat" }, { e: "🙈", n: "See No Evil" },
      { e: "🙉", n: "Hear No Evil" }, { e: "🙊", n: "Speak No Evil" }, { e: "💋", n: "Kiss Mark" },
      { e: "💌", n: "Love Letter" }, { e: "💘", n: "Heart Arrow" }, { e: "💝", n: "Heart Ribbon" },
      { e: "💖", n: "Sparkling Heart" }, { e: "💗", n: "Growing Heart" }, { e: "💓", n: "Beating Heart" },
      { e: "💞", n: "Revolving Hearts" }, { e: "💕", n: "Two Hearts" }, { e: "💟", n: "Heart Decoration" },
      { e: "❣️", n: "Heart Exclamation" }, { e: "❤️‍🔥", n: "Heart on Fire" }, { e: "❤️‍🩹", n: "Mending Heart" },
      { e: "❤️", n: "Red Heart" }, { e: "🩷", n: "Pink Heart" }, { e: "🧡", n: "Orange Heart" },
      { e: "💛", n: "Yellow Heart" }, { e: "💚", n: "Green Heart" }, { e: "💙", n: "Blue Heart" },
      { e: "🩵", n: "Light Blue Heart" }, { e: "💜", n: "Purple Heart" }, { e: "🤎", n: "Brown Heart" },
      { e: "🖤", n: "Black Heart" }, { e: "🩶", n: "Grey Heart" }, { e: "🤍", n: "White Heart" },
      { e: "💔", n: "Broken Heart" }, { e: "💯", n: "Hundred Points" }, { e: "💢", n: "Anger Symbol" },
      { e: "💬", n: "Speech Bubble" }, { e: "👁‍🗨", n: "Eye in Bubble" }, { e: "🗨️", n: "Left Bubble" },
      { e: "🗯️", n: "Right Anger Bubble" }, { e: "💭", n: "Thought Bubble" }, { e: "💤", n: "Zzz" },
      { e: "💥", n: "Collision" }, { e: "💫", n: "Dizzy" }, { e: "💦", n: "Sweat Droplets" },
      { e: "💨", n: "Dashing Away" }, { e: "🕳️", n: "Hole" }, { e: "☮️", n: "Peace Symbol" },
      { e: "☯️", n: "Yin Yang" }, { e: "♻️", n: "Recycling Symbol" }, { e: "✨", n: "Sparkles" },
      { e: "⭐", n: "Star" }, { e: "🌟", n: "Glowing Star" }, { e: "⚡", n: "High Voltage" },
      { e: "🔥", n: "Fire" }, { e: "🌈", n: "Rainbow" },
      { e: "☀️", n: "Sun" }, { e: "🌞", n: "Sun Face" }, { e: "🌙", n: "Crescent Moon" },
      { e: "🌚", n: "New Moon Face" }, { e: "🌝", n: "Full Moon Face" }, { e: "🌛", n: "First Quarter Face" },
      { e: "🌜", n: "Last Quarter Face" }, { e: "⛄", n: "Snowman" }, { e: "❄️", n: "Snowflake" },
      { e: "☃️", n: "Snowman with Snow" }, { e: "🌠", n: "Shooting Star" }, { e: "🎇", n: "Sparkler" },
      { e: "🎆", n: "Fireworks" }, { e: "🌪️", n: "Tornado" }, { e: "☔", n: "Umbrella with Rain" },
    ]
  },
  {
    id: "people", name: "People & Body", icon: "👋",
    emoji: [
      { e: "👋", n: "Waving Hand" }, { e: "🤚", n: "Raised Back Hand" }, { e: "🖐", n: "Hand Fingers" },
      { e: "✋", n: "Raised Hand" }, { e: "🖖", n: "Vulcan Salute" }, { e: "🫱", n: "Rightwards Hand" },
      { e: "🫲", n: "Leftwards Hand" }, { e: "🫳", n: "Palm Down Hand" }, { e: "🫴", n: "Palm Up Hand" },
      { e: "🫷", n: "Pushing Left" }, { e: "🫸", n: "Pushing Right" }, { e: "👌", n: "OK Hand" },
      { e: "🤌", n: "Pinched Fingers" }, { e: "🤏", n: "Pinching Hand" }, { e: "✌️", n: "Victory Hand" },
      { e: "🤞", n: "Crossed Fingers" }, { e: "🫰", n: "Finger Heart" }, { e: "🤟", n: "Love You Gesture" },
      { e: "🤘", n: "Sign of Horns" }, { e: "🤙", n: "Call Me Hand" }, { e: "👈", n: "Pointing Left" },
      { e: "👉", n: "Pointing Right" }, { e: "👆", n: "Pointing Up" }, { e: "🖕", n: "Middle Finger" },
      { e: "👇", n: "Pointing Down" }, { e: "☝️", n: "Index Finger Up" }, { e: "🫵", n: "Pointing You" },
      { e: "👍", n: "Thumbs Up" }, { e: "👎", n: "Thumbs Down" }, { e: "✊", n: "Raised Fist" },
      { e: "👊", n: "Oncoming Fist" }, { e: "🤛", n: "Left Fist" }, { e: "🤜", n: "Right Fist" },
      { e: "👏", n: "Clapping Hands" }, { e: "🙌", n: "Raising Hands" }, { e: "🫶", n: "Heart Hands" },
      { e: "👐", n: "Open Hands" }, { e: "🤲", n: "Palms Together" }, { e: "🤝", n: "Handshake" },
      { e: "🙏", n: "Folded Hands" }, { e: "✍️", n: "Writing Hand" }, { e: "💅", n: "Nail Polish" },
      { e: "🤳", n: "Selfie" }, { e: "💪", n: "Flexed Bicep" }, { e: "🦾", n: "Mechanical Arm" },
      { e: "🦿", n: "Mechanical Leg" }, { e: "🦵", n: "Leg" }, { e: "🦶", n: "Foot" },
      { e: "👂", n: "Ear" }, { e: "🦻", n: "Ear with Aid" }, { e: "👃", n: "Nose" },
      { e: "🧠", n: "Brain" }, { e: "🫀", n: "Anatomical Heart" }, { e: "🫁", n: "Lungs" },
      { e: "👀", n: "Eyes" }, { e: "👁", n: "Eye" }, { e: "👅", n: "Tongue" },
      { e: "👄", n: "Mouth" }, { e: "🫦", n: "Biting Lip" }, { e: "🦷", n: "Tooth" },
      { e: "🦴", n: "Bone" }, { e: "👶", n: "Baby" }, { e: "🧒", n: "Child" },
      { e: "👦", n: "Boy" }, { e: "👧", n: "Girl" }, { e: "🧑", n: "Person" },
      { e: "👨", n: "Man" }, { e: "👩", n: "Woman" }, { e: "🧓", n: "Older Person" },
      { e: "👴", n: "Old Man" }, { e: "👵", n: "Old Woman" }, { e: "👨‍🦰", n: "Man Red Hair" },
      { e: "👩‍🦰", n: "Woman Red Hair" }, { e: "👨‍🦱", n: "Man Curly Hair" }, { e: "👩‍🦱", n: "Woman Curly Hair" },
      { e: "👨‍🦳", n: "Man White Hair" }, { e: "👩‍🦳", n: "Woman White Hair" }, { e: "👨‍🦲", n: "Man Bald" },
      { e: "👩‍🦲", n: "Woman Bald" }, { e: "🧔", n: "Beard" }, { e: "👱", n: "Blond Person" },
      { e: "👲", n: "Skullcap" }, { e: "🧕", n: "Headscarf" }, { e: "👳", n: "Turban" },
      { e: "👮", n: "Police Officer" }, { e: "👷", n: "Construction Worker" }, { e: "💂", n: "Guard" },
      { e: "🕵️", n: "Detective" }, { e: "👨‍⚕️", n: "Health Worker" }, { e: "👨‍🌾", n: "Farmer" },
      { e: "👨‍🍳", n: "Cook" }, { e: "👨‍🎓", n: "Student" }, { e: "👨‍🎤", n: "Singer" },
      { e: "👨‍🏫", n: "Teacher" }, { e: "👨‍🏭", n: "Factory Worker" }, { e: "👨‍💻", n: "Technologist" },
      { e: "👨‍💼", n: "Office Worker" }, { e: "👨‍🔧", n: "Mechanic" }, { e: "👨‍🔬", n: "Scientist" },
      { e: "👨‍🎨", n: "Artist" }, { e: "👨‍🚀", n: "Astronaut" }, { e: "👨‍🚒", n: "Firefighter" },
      { e: "👨‍✈️", n: "Pilot" }, { e: "👨‍⚖️", n: "Judge" }, { e: "🤴", n: "Prince" },
      { e: "👸", n: "Princess" }, { e: "🥷", n: "Ninja" }, { e: "🤵", n: "Tuxedo" },
      { e: "👰", n: "Bride Veil" }, { e: "🤰", n: "Pregnant Woman" }, { e: "🫃", n: "Pregnant Man" },
      { e: "🫄", n: "Pregnant Person" }, { e: "🤱", n: "Breastfeeding" }, { e: "👼", n: "Baby Angel" },
      { e: "🎅", n: "Santa Claus" }, { e: "🤶", n: "Mrs Claus" }, { e: "🦸", n: "Superhero" },
      { e: "🦹", n: "Supervillain" }, { e: "🧙", n: "Mage" }, { e: "🧚", n: "Fairy" },
      { e: "🧛", n: "Vampire" }, { e: "🧜", n: "Merperson" }, { e: "🧝", n: "Elf" },
      { e: "🧞", n: "Genie" }, { e: "🧟", n: "Zombie" }, { e: "💆", n: "Face Massage" },
      { e: "💇", n: "Haircut" }, { e: "🚶", n: "Person Walking" }, { e: "🧍", n: "Person Standing" },
      { e: "🧎", n: "Person Kneeling" }, { e: "🏃", n: "Person Running" }, { e: "💃", n: "Woman Dancing" },
      { e: "🕺", n: "Man Dancing" }, { e: "🕴️", n: "Person Suit Levitating" }, { e: "👯", n: "Bunny Ears" },
      { e: "🧖", n: "Steamy Room" }, { e: "🧘", n: "Lotus Position" },
      { e: "🛀", n: "Bath" }, { e: "🛌", n: "Sleeping in Bed" }, { e: "👭", n: "Two Women" },
      { e: "👬", n: "Two Men" }, { e: "👫", n: "Woman Man" }, { e: "💏", n: "Kiss Couple" },
      { e: "💑", n: "Couple Heart" }, { e: "👪", n: "Family" }, { e: "🦰", n: "Red Hair" },
      { e: "🦱", n: "Curly Hair" }, { e: "🦳", n: "White Hair" }, { e: "🦲", n: "Bald" },
    ]
  },
  {
    id: "animals", name: "Animals & Nature", icon: "🐶",
    emoji: [
      { e: "🐶", n: "Dog Face" }, { e: "🐱", n: "Cat Face" }, { e: "🐭", n: "Mouse Face" },
      { e: "🐹", n: "Hamster" }, { e: "🐰", n: "Rabbit Face" }, { e: "🦊", n: "Fox" },
      { e: "🐻", n: "Bear" }, { e: "🐼", n: "Panda" }, { e: "🐻‍❄️", n: "Polar Bear" },
      { e: "🐨", n: "Koala" }, { e: "🐯", n: "Tiger Face" }, { e: "🦁", n: "Lion" },
      { e: "🐮", n: "Cow Face" }, { e: "🐷", n: "Pig Face" }, { e: "🐽", n: "Pig Nose" },
      { e: "🐸", n: "Frog" }, { e: "🐵", n: "Monkey Face" }, { e: "🐒", n: "Monkey" },
      { e: "🦍", n: "Gorilla" }, { e: "🦧", n: "Orangutan" },
      { e: "🐔", n: "Chicken" }, { e: "🐧", n: "Penguin" }, { e: "🐦", n: "Bird" },
      { e: "🐤", n: "Baby Chick" }, { e: "🐣", n: "Hatching Chick" }, { e: "🐥", n: "Front Chick" },
      { e: "🦆", n: "Duck" }, { e: "🦅", n: "Eagle" }, { e: "🦉", n: "Owl" },
      { e: "🦇", n: "Bat" }, { e: "🐺", n: "Wolf" }, { e: "🐗", n: "Boar" },
      { e: "🐴", n: "Horse Face" }, { e: "🦄", n: "Unicorn" }, { e: "🐝", n: "Honeybee" },
      { e: "🪱", n: "Worm" }, { e: "🦋", n: "Butterfly" }, { e: "🐛", n: "Bug" },
      { e: "🐌", n: "Snail" }, { e: "🐞", n: "Lady Beetle" }, { e: "🐜", n: "Ant" },
      { e: "🪰", n: "Fly" }, { e: "🪲", n: "Beetle" }, { e: "🪳", n: "Cockroach" },
      { e: "🦟", n: "Mosquito" }, { e: "🦗", n: "Cricket" }, { e: "🕷️", n: "Spider" },
      { e: "🕸️", n: "Spider Web" }, { e: "🦂", n: "Scorpion" }, { e: "🐢", n: "Turtle" },
      { e: "🐍", n: "Snake" }, { e: "🦎", n: "Lizard" }, { e: "🦖", n: "T-Rex" },
      { e: "🦕", n: "Sauropod" }, { e: "🐙", n: "Octopus" }, { e: "🦑", n: "Squid" },
      { e: "🦐", n: "Shrimp" }, { e: "🦞", n: "Lobster" }, { e: "🦀", n: "Crab" },
      { e: "🐡", n: "Blowfish" }, { e: "🐠", n: "Tropical Fish" }, { e: "🐟", n: "Fish" },
      { e: "🐬", n: "Dolphin" }, { e: "🐳", n: "Spouting Whale" }, { e: "🐋", n: "Whale" },
      { e: "🦈", n: "Shark" }, { e: "🦭", n: "Seal" }, { e: "🐊", n: "Crocodile" },
      { e: "🐅", n: "Tiger" }, { e: "🐆", n: "Leopard" }, { e: "🦓", n: "Zebra" },
      { e: "🦬", n: "Bison" }, { e: "🐃", n: "Water Buffalo" },
      { e: "🐂", n: "Ox" }, { e: "🐄", n: "Cow" }, { e: "🐎", n: "Horse" },
      { e: "🐖", n: "Pig" }, { e: "🐏", n: "Ram" }, { e: "🐑", n: "Ewe" },
      { e: "🦙", n: "Llama" }, { e: "🐐", n: "Goat" }, { e: "🦌", n: "Deer" },
      { e: "🐕", n: "Dog" }, { e: "🐩", n: "Poodle" }, { e: "🦮", n: "Guide Dog" },
      { e: "🐕‍🦺", n: "Service Dog" }, { e: "🐈", n: "Cat" }, { e: "🐈‍⬛", n: "Black Cat" },
      { e: "🪶", n: "Feather" }, { e: "🐓", n: "Rooster" }, { e: "🦃", n: "Turkey" },
      { e: "🦤", n: "Dodo" }, { e: "🦚", n: "Peacock" }, { e: "🦜", n: "Parrot" },
      { e: "🦢", n: "Swan" }, { e: "🦩", n: "Flamingo" }, { e: "🕊️", n: "Dove" },
      { e: "🐇", n: "Rabbit" }, { e: "🦝", n: "Raccoon" }, { e: "🦨", n: "Skunk" },
      { e: "🦡", n: "Badger" }, { e: "🦫", n: "Beaver" }, { e: "🦦", n: "Otter" },
      { e: "🦥", n: "Sloth" }, { e: "🐁", n: "Mouse" }, { e: "🐀", n: "Rat" },
      { e: "🐿️", n: "Chipmunk" }, { e: "🦔", n: "Hedgehog" }, { e: "🐘", n: "Elephant" },
      { e: "🦣", n: "Mammoth" }, { e: "🦏", n: "Rhinoceros" }, { e: "🦛", n: "Hippopotamus" },
      { e: "🐪", n: "Camel" }, { e: "🐫", n: "Two-Hump Camel" }, { e: "🦒", n: "Giraffe" },
      { e: "🦘", n: "Kangaroo" }, { e: "🌸", n: "Cherry Blossom" }, { e: "💐", n: "Bouquet" },
      { e: "🌹", n: "Rose" }, { e: "🥀", n: "Wilted Flower" }, { e: "🌺", n: "Hibiscus" },
      { e: "🌻", n: "Sunflower" }, { e: "🌷", n: "Tulip" }, { e: "🪷", n: "Lotus" },
      { e: "🪻", n: "Hyacinth" }, { e: "💮", n: "White Flower" }, { e: "🏵️", n: "Rosette" },
      { e: "🌼", n: "Blossom" }, { e: "🌿", n: "Herb" }, { e: "☘️", n: "Shamrock" },
      { e: "🍀", n: "Four Leaf Clover" }, { e: "🍃", n: "Leaf in Wind" }, { e: "🍂", n: "Fallen Leaf" },
      { e: "🍁", n: "Maple Leaf" }, { e: "🪺", n: "Nest with Eggs" }, { e: "🪹", n: "Empty Nest" },
      { e: "🌱", n: "Seedling" }, { e: "🌳", n: "Deciduous Tree" }, { e: "🌲", n: "Evergreen" },
      { e: "🌴", n: "Palm Tree" }, { e: "🌵", n: "Cactus" }, { e: "🌾", n: "Sheaf of Rice" },
      { e: "🪴", n: "Potted Plant" }, { e: "🍄", n: "Mushroom" }, { e: "🌊", n: "Water Wave" },
      { e: "🪵", n: "Wood" }, { e: "🪨", n: "Rock" }, { e: "💧", n: "Droplet" },
    ]
  },
  {
    id: "food", name: "Food & Drink", icon: "🍕",
    emoji: [
      { e: "🍎", n: "Red Apple" }, { e: "🍏", n: "Green Apple" }, { e: "🍊", n: "Tangerine" },
      { e: "🍋", n: "Lemon" }, { e: "🍌", n: "Banana" }, { e: "🍉", n: "Watermelon" },
      { e: "🍇", n: "Grapes" }, { e: "🍓", n: "Strawberry" }, { e: "🫐", n: "Blueberries" },
      { e: "🍈", n: "Melon" }, { e: "🍒", n: "Cherries" }, { e: "🍑", n: "Peach" },
      { e: "🥭", n: "Mango" }, { e: "🍍", n: "Pineapple" }, { e: "🥥", n: "Coconut" },
      { e: "🥝", n: "Kiwi" }, { e: "🍅", n: "Tomato" }, { e: "🍆", n: "Eggplant" },
      { e: "🥑", n: "Avocado" }, { e: "🥦", n: "Broccoli" }, { e: "🥬", n: "Leafy Green" },
      { e: "🥒", n: "Cucumber" }, { e: "🌶️", n: "Hot Pepper" }, { e: "🫑", n: "Bell Pepper" },
      { e: "🌽", n: "Ear of Corn" }, { e: "🥕", n: "Carrot" }, { e: "🫒", n: "Olive" },
      { e: "🧄", n: "Garlic" }, { e: "🧅", n: "Onion" }, { e: "🥔", n: "Potato" },
      { e: "🍠", n: "Roasted Sweet Potato" }, { e: "🫛", n: "Pea Pod" }, { e: "🥐", n: "Croissant" },
      { e: "🥯", n: "Bagel" }, { e: "🍞", n: "Bread" }, { e: "🥖", n: "Baguette" },
      { e: "🫓", n: "Flatbread" }, { e: "🥨", n: "Pretzel" }, { e: "🧀", n: "Cheese Wedge" },
      { e: "🥚", n: "Egg" }, { e: "🍳", n: "Cooking" }, { e: "🧈", n: "Butter" },
      { e: "🥞", n: "Pancakes" }, { e: "🧇", n: "Waffle" }, { e: "🥓", n: "Bacon" },
      { e: "🥩", n: "Cut of Meat" }, { e: "🍗", n: "Poultry Leg" }, { e: "🍖", n: "Meat on Bone" },
      { e: "🌭", n: "Hot Dog" }, { e: "🍔", n: "Hamburger" }, { e: "🍟", n: "French Fries" },
      { e: "🍕", n: "Pizza" }, { e: "🥪", n: "Sandwich" }, { e: "🌮", n: "Taco" },
      { e: "🌯", n: "Burrito" }, { e: "🫔", n: "Tamale" }, { e: "🥙", n: "Stuffed Flatbread" },
      { e: "🧆", n: "Falafel" }, { e: "🥗", n: "Green Salad" }, { e: "🥘", n: "Shallow Pan" },
      { e: "🫕", n: "Fondue" }, { e: "🍲", n: "Pot of Food" }, { e: "🍜", n: "Steaming Bowl" },
      { e: "🍝", n: "Spaghetti" }, { e: "🍱", n: "Bento Box" }, { e: "🍣", n: "Sushi" },
      { e: "🍤", n: "Fried Shrimp" }, { e: "🍙", n: "Rice Ball" }, { e: "🍚", n: "Cooked Rice" },
      { e: "🍛", n: "Curry Rice" }, { e: "🍢", n: "Oden" }, { e: "🍡", n: "Dango" },
      { e: "🥟", n: "Dumpling" }, { e: "🥠", n: "Fortune Cookie" }, { e: "🥡", n: "Takeout Box" },
      { e: "🦪", n: "Oyster" }, { e: "🍦", n: "Soft Ice Cream" }, { e: "🍧", n: "Shaved Ice" },
      { e: "🍨", n: "Ice Cream" }, { e: "🍩", n: "Doughnut" }, { e: "🍪", n: "Cookie" },
      { e: "🎂", n: "Birthday Cake" }, { e: "🍰", n: "Shortcake" }, { e: "🧁", n: "Cupcake" },
      { e: "🥧", n: "Pie" }, { e: "🍫", n: "Chocolate Bar" }, { e: "🍬", n: "Candy" },
      { e: "🍭", n: "Lollipop" }, { e: "🍮", n: "Custard" }, { e: "🍯", n: "Honey Pot" },
      { e: "🍼", n: "Baby Bottle" }, { e: "🥛", n: "Glass of Milk" }, { e: "☕", n: "Hot Beverage" },
      { e: "🫖", n: "Teapot" }, { e: "🍵", n: "Teacup" }, { e: "🧋", n: "Bubble Tea" },
      { e: "🧃", n: "Juice Box" }, { e: "🥤", n: "Cup with Straw" }, { e: "🧉", n: "Mate" },
      { e: "🧊", n: "Ice" }, { e: "🍶", n: "Sake" }, { e: "🍾", n: "Bottle Pop" },
      { e: "🍷", n: "Wine Glass" }, { e: "🍸", n: "Cocktail Glass" }, { e: "🍹", n: "Tropical Drink" },
      { e: "🍺", n: "Beer Mug" }, { e: "🍻", n: "Clinking Beer" }, { e: "🥂", n: "Clinking Glasses" },
      { e: "🥃", n: "Tumbler Glass" }, { e: "🫗", n: "Pouring Liquid" }, { e: "🥢", n: "Chopsticks" },
      { e: "🍽️", n: "Fork Knife Plate" }, { e: "🍴", n: "Fork and Knife" }, { e: "🥄", n: "Spoon" },
      { e: "🔪", n: "Kitchen Knife" }, { e: "🫙", n: "Jar" }, { e: "🏺", n: "Amphora" },
      { e: "🧂", n: "Salt" }, { e: "🍿", n: "Popcorn" }, { e: "🍘", n: "Rice Cracker" },
      { e: "🍥", n: "Fish Cake" }, { e: "🥫", n: "Canned Food" }, { e: "🥣", n: "Bowl Spoon" },
      { e: "🫘", n: "Beans" }, { e: "🫚", n: "Ginger Root" }, { e: "🍐", n: "Pear" },
      { e: "🌰", n: "Chestnut" }, { e: "🥜", n: "Peanuts" }, { e: "🥮", n: "Moon Cake" },
    ]
  },
  {
    id: "travel", name: "Travel & Places", icon: "✈️",
    emoji: [
      { e: "✈️", n: "Airplane" }, { e: "🛩️", n: "Small Airplane" }, { e: "🛫", n: "Takeoff" },
      { e: "🛬", n: "Landing" }, { e: "💺", n: "Seat" },
      { e: "🚀", n: "Rocket" }, { e: "🛸", n: "Flying Saucer" }, { e: "🛰️", n: "Satellite" },
      { e: "🚁", n: "Helicopter" }, { e: "🚂", n: "Locomotive" }, { e: "🚃", n: "Railway Car" },
      { e: "🚄", n: "Bullet Train" }, { e: "🚅", n: "High-Speed Train" }, { e: "🚆", n: "Train" },
      { e: "🚇", n: "Metro" }, { e: "🚈", n: "Light Rail" }, { e: "🚉", n: "Station" },
      { e: "🚊", n: "Tram" }, { e: "🚝", n: "Monorail" }, { e: "🚞", n: "Mountain Railway" },
      { e: "🚋", n: "Tram Car" }, { e: "🚌", n: "Bus" }, { e: "🚍", n: "Oncoming Bus" },
      { e: "🚎", n: "Trolleybus" }, { e: "🚐", n: "Minibus" }, { e: "🚑", n: "Ambulance" },
      { e: "🚒", n: "Fire Engine" }, { e: "🚓", n: "Police Car" }, { e: "🚔", n: "Oncoming Police" },
      { e: "🚕", n: "Taxi" }, { e: "🚖", n: "Oncoming Taxi" }, { e: "🚗", n: "Automobile" },
      { e: "🚘", n: "Oncoming Car" }, { e: "🚙", n: "Sport Utility" }, { e: "🛻", n: "Pickup Truck" },
      { e: "🚚", n: "Delivery Truck" }, { e: "🚛", n: "Articulated Lorry" }, { e: "🚜", n: "Tractor" },
      { e: "🏎️", n: "Racing Car" }, { e: "🏍️", n: "Motorcycle" }, { e: "🛵", n: "Motor Scooter" },
      { e: "🦽", n: "Manual Wheelchair" }, { e: "🦼", n: "Motorized Wheelchair" }, { e: "🛺", n: "Auto Rickshaw" },
      { e: "🚲", n: "Bicycle" }, { e: "🛴", n: "Kick Scooter" }, { e: "🚏", n: "Bus Stop" },
      { e: "🛣️", n: "Motorway" },
      { e: "🛤️", n: "Railway Track" }, { e: "🛢️", n: "Oil Drum" }, { e: "⛽", n: "Fuel Pump" },
      { e: "🛞", n: "Wheel" }, { e: "🚨", n: "Police Light" }, { e: "🚥", n: "Horizontal Light" },
      { e: "🚦", n: "Vertical Light" }, { e: "🛑", n: "Stop Sign" }, { e: "🚧", n: "Construction" },
      { e: "⚓", n: "Anchor" }, { e: "🛟", n: "Ring Buoy" }, { e: "⛵", n: "Sailboat" },
      { e: "🛶", n: "Canoe" }, { e: "🚤", n: "Speedboat" }, { e: "🛳️", n: "Passenger Ship" },
      { e: "⛴️", n: "Ferry" }, { e: "🛥️", n: "Motor Boat" }, { e: "🚢", n: "Ship" },
      { e: "🏠", n: "House" }, { e: "🏡", n: "House with Garden" }, { e: "🏘️", n: "Houses" },
      { e: "🏚️", n: "Derelict House" }, { e: "🏗️", n: "Construction Site" }, { e: "🏭", n: "Factory" },
      { e: "🏢", n: "Office Building" }, { e: "🏬", n: "Department Store" }, { e: "🏣", n: "Japan Post" },
      { e: "🏤", n: "Post Office" }, { e: "🏥", n: "Hospital" }, { e: "🏦", n: "Bank" },
      { e: "🏨", n: "Hotel" }, { e: "🏩", n: "Love Hotel" }, { e: "🏪", n: "Convenience Store" },
      { e: "🏫", n: "School" }, { e: "🏛️", n: "Classical Building" }, { e: "⛪", n: "Church" },
      { e: "🕌", n: "Mosque" }, { e: "🛕", n: "Hindu Temple" }, { e: "🕍", n: "Synagogue" },
      { e: "⛩️", n: "Shinto Shrine" }, { e: "🕋", n: "Kaaba" }, { e: "🏰", n: "Castle" },
      { e: "🏯", n: "Japanese Castle" }, { e: "🏟️", n: "Stadium" }, { e: "🎡", n: "Ferris Wheel" },
      { e: "🎢", n: "Roller Coaster" }, { e: "🎠", n: "Carousel" }, { e: "⛲", n: "Fountain" },
      { e: "⛱️", n: "Umbrella on Ground" }, { e: "🏖️", n: "Beach" }, { e: "🏝️", n: "Desert Island" },
      { e: "🏜️", n: "Desert" }, { e: "🌋", n: "Volcano" }, { e: "⛰️", n: "Mountain" },
      { e: "🏔️", n: "Snow Mountain" }, { e: "🗻", n: "Mount Fuji" }, { e: "🏕️", n: "Camping" },
      { e: "⛺", n: "Tent" }, { e: "🛖", n: "Hut" }, { e: "🏞️", n: "National Park" },
      { e: "🌄", n: "Sunrise Mountain" }, { e: "🌅", n: "Sunrise" },
      { e: "🌇", n: "Sunset" }, { e: "🌆", n: "Cityscape Dusk" }, { e: "🏙️", n: "Cityscape" },
      { e: "🌃", n: "Night Stars" }, { e: "🌉", n: "Bridge at Night" }, { e: "🌁", n: "Foggy" },
      { e: "🌌", n: "Milky Way" }, { e: "🗼", n: "Tokyo Tower" }, { e: "🗽", n: "Statue of Liberty" },
      { e: "🌍", n: "Earth Africa" }, { e: "🌎", n: "Earth Americas" }, { e: "🌏", n: "Earth Asia" },
      { e: "🌐", n: "Globe Meridians" }, { e: "🗺️", n: "World Map" }, { e: "🧭", n: "Compass" },
      { e: "🛂", n: "Passport Control" }, { e: "🛃", n: "Customs" }, { e: "🛄", n: "Baggage Claim" },
      { e: "🛅", n: "Left Luggage" }, { e: "🛗", n: "Elevator" }, { e: "♨️", n: "Hot Springs" },
      { e: "🏧", n: "ATM Sign" },
    ]
  },
  {
    id: "objects", name: "Objects & Symbols", icon: "💡",
    emoji: [
      { e: "💡", n: "Light Bulb" }, { e: "🔦", n: "Flashlight" }, { e: "🕯️", n: "Candle" },
      { e: "🪔", n: "Diya Lamp" }, { e: "🪞", n: "Mirror" }, { e: "🪟", n: "Window" },
      { e: "🛏️", n: "Bed" }, { e: "🛋️", n: "Couch" }, { e: "🪑", n: "Chair" },
      { e: "🚪", n: "Door" }, { e: "🪜", n: "Ladder" }, { e: "🧴", n: "Lotion Bottle" },
      { e: "🧷", n: "Safety Pin" }, { e: "🧹", n: "Broom" }, { e: "🧺", n: "Basket" },
      { e: "🧻", n: "Roll of Paper" }, { e: "🪣", n: "Bucket" }, { e: "🧼", n: "Soap" },
      { e: "🪥", n: "Toothbrush" }, { e: "🧽", n: "Sponge" }, { e: "🧯", n: "Fire Extinguisher" },
      { e: "🛒", n: "Shopping Cart" }, { e: "🛍️", n: "Shopping Bags" }, { e: "🎁", n: "Wrapped Gift" },
      { e: "🎀", n: "Ribbon" }, { e: "🎊", n: "Confetti Ball" }, { e: "🎉", n: "Party Popper" },
      { e: "🎈", n: "Balloon" }, { e: "🪅", n: "Pinata" }, { e: "🪩", n: "Mirror Ball" },
      { e: "🧧", n: "Red Envelope" }, { e: "💰", n: "Money Bag" }, { e: "🪙", n: "Coin" },
      { e: "💴", n: "Yen Banknote" }, { e: "💵", n: "Dollar Banknote" }, { e: "💶", n: "Euro Banknote" },
      { e: "💷", n: "Pound Banknote" }, { e: "💸", n: "Money with Wings" }, { e: "💳", n: "Credit Card" },
      { e: "🧾", n: "Receipt" }, { e: "💎", n: "Gem Stone" }, { e: "🧸", n: "Teddy Bear" },
      { e: "🪆", n: "Nesting Dolls" }, { e: "🖼️", n: "Framed Picture" }, { e: "🪄", n: "Magic Wand" },
      { e: "🪬", n: "Hamsa" }, { e: "🧿", n: "Nazar Amulet" }, { e: "📱", n: "Mobile Phone" },
      { e: "📲", n: "Mobile with Arrow" }, { e: "☎️", n: "Telephone" }, { e: "📞", n: "Phone Receiver" },
      { e: "📟", n: "Pager" }, { e: "📠", n: "Fax Machine" }, { e: "🔋", n: "Battery" },
      { e: "🪫", n: "Low Battery" }, { e: "🔌", n: "Plug" }, { e: "💻", n: "Laptop" },
      { e: "🖥️", n: "Desktop" }, { e: "🖨️", n: "Printer" }, { e: "⌨️", n: "Keyboard" },
      { e: "🖱️", n: "Computer Mouse" }, { e: "🖲️", n: "Trackball" }, { e: "💽", n: "Minidisc" },
      { e: "💾", n: "Floppy Disk" }, { e: "💿", n: "Optical Disk" }, { e: "📀", n: "DVD" },
      { e: "🧮", n: "Abacus" }, { e: "🎥", n: "Movie Camera" }, { e: "🎞️", n: "Film Frames" },
      { e: "📽️", n: "Film Projector" }, { e: "🎬", n: "Clapper Board" }, { e: "📺", n: "Television" },
      { e: "📷", n: "Camera" }, { e: "📸", n: "Camera with Flash" }, { e: "📹", n: "Video Camera" },
      { e: "📼", n: "Videocassette" }, { e: "🔍", n: "Magnifying Left" }, { e: "🔎", n: "Magnifying Right" },
      { e: "🪐", n: "Ringed Planet" }, { e: "🔬", n: "Microscope" }, { e: "🔭", n: "Telescope" },
      { e: "📡", n: "Satellite Antenna" }, { e: "📚", n: "Books" }, { e: "📖", n: "Open Book" },
      { e: "📕", n: "Closed Book" }, { e: "📗", n: "Green Book" }, { e: "📘", n: "Blue Book" },
      { e: "📙", n: "Orange Book" }, { e: "📓", n: "Notebook" }, { e: "📔", n: "Decorative Notebook" },
      { e: "📒", n: "Ledger" }, { e: "📃", n: "Page with Curl" }, { e: "📜", n: "Scroll" },
      { e: "📄", n: "Page" }, { e: "📰", n: "Newspaper" }, { e: "🗞️", n: "Rolled Newspaper" },
      { e: "📑", n: "Bookmark Tabs" }, { e: "🔖", n: "Bookmark" }, { e: "🏷️", n: "Label" },
      { e: "📝", n: "Memo" }, { e: "✏️", n: "Pencil" }, { e: "✒️", n: "Black Nib" },
      { e: "🖋️", n: "Fountain Pen" }, { e: "🖊️", n: "Pen" }, { e: "🖌️", n: "Paintbrush" },
      { e: "🖍️", n: "Crayon" }, { e: "📌", n: "Pushpin" }, { e: "📍", n: "Round Pushpin" },
      { e: "📎", n: "Paperclip" }, { e: "🖇️", n: "Linked Paperclips" }, { e: "📏", n: "Straight Ruler" },
      { e: "📐", n: "Triangular Ruler" }, { e: "✂️", n: "Scissors" }, { e: "🗃️", n: "Card File Box" },
      { e: "🗄️", n: "File Cabinet" }, { e: "🗑️", n: "Wastebasket" }, { e: "🔑", n: "Key" },
      { e: "🗝️", n: "Old Key" }, { e: "🔒", n: "Locked" }, { e: "🔓", n: "Unlocked" },
      { e: "🔏", n: "Locked with Pen" }, { e: "🔐", n: "Locked with Key" }, { e: "🔔", n: "Bell" },
      { e: "🔕", n: "Bell Slash" }, { e: "📢", n: "Loudspeaker" }, { e: "📣", n: "Megaphone" },
      { e: "📯", n: "Postal Horn" }, { e: "🔧", n: "Wrench" }, { e: "🔨", n: "Hammer" },
      { e: "⛏️", n: "Pick" }, { e: "⚒️", n: "Hammer and Pick" }, { e: "🛠️", n: "Hammer and Wrench" },
      { e: "🪛", n: "Screwdriver" }, { e: "🪚", n: "Carpentry Saw" }, { e: "🔩", n: "Nut and Bolt" },
      { e: "⚙️", n: "Gear" }, { e: "🗜️", n: "Clamp" }, { e: "⚖️", n: "Balance Scale" },
      { e: "🦯", n: "White Cane" }, { e: "🔗", n: "Link" }, { e: "⛓️", n: "Chains" },
      { e: "🪝", n: "Hook" }, { e: "🧲", n: "Magnet" }, { e: "🧪", n: "Test Tube" },
      { e: "🧫", n: "Petri Dish" }, { e: "🧬", n: "DNA" }, { e: "🩺", n: "Stethoscope" },
      { e: "💊", n: "Pill" }, { e: "💉", n: "Syringe" }, { e: "🩸", n: "Blood Drop" },
      { e: "🩹", n: "Adhesive Bandage" }, { e: "🩼", n: "Crutch" }, { e: "🩻", n: "X-Ray" },
      { e: "🚬", n: "Cigarette" }, { e: "⚰️", n: "Coffin" }, { e: "🪦", n: "Headstone" },
      { e: "⚱️", n: "Funeral Urn" }, { e: "🗿", n: "Moai" }, { e: "🪧", n: "Placard" },
      { e: "👑", n: "Crown" }, { e: "👒", n: "Woman Hat" }, { e: "🎩", n: "Top Hat" },
      { e: "🎓", n: "Graduation Cap" }, { e: "🧢", n: "Billed Cap" }, { e: "🪖", n: "Helmet" },
      { e: "👓", n: "Glasses" }, { e: "🕶️", n: "Sunglasses" }, { e: "🥽", n: "Goggles" },
      { e: "👔", n: "Necktie" }, { e: "👕", n: "T-Shirt" }, { e: "👖", n: "Jeans" },
      { e: "🧣", n: "Scarf" }, { e: "🧤", n: "Gloves" }, { e: "🧥", n: "Coat" },
      { e: "🧦", n: "Socks" }, { e: "👗", n: "Dress" }, { e: "👘", n: "Kimono" },
      { e: "🥻", n: "Sari" }, { e: "🩱", n: "One-Piece Swim" }, { e: "🩲", n: "Briefs" },
      { e: "🩳", n: "Shorts" }, { e: "👙", n: "Bikini" }, { e: "👚", n: "Womans Clothes" },
      { e: "🪭", n: "Folding Hand Fan" }, { e: "👛", n: "Purse" }, { e: "👜", n: "Handbag" },
      { e: "👝", n: "Clutch Bag" }, { e: "🎒", n: "Backpack" }, { e: "🩴", n: "Thong Sandal" },
      { e: "👞", n: "Mans Shoe" }, { e: "👟", n: "Running Shoe" }, { e: "🥾", n: "Hiking Boot" },
      { e: "🥿", n: "Flat Shoe" }, { e: "👠", n: "High Heel" }, { e: "👡", n: "Sandal" },
      { e: "🩰", n: "Ballet Shoes" }, { e: "👢", n: "Womans Boot" }, { e: "💄", n: "Lipstick" },
      { e: "💍", n: "Ring" }, { e: "📿", n: "Prayer Beads" }, { e: "💼", n: "Briefcase" },
      { e: "♈", n: "Aries" }, { e: "♉", n: "Taurus" }, { e: "♊", n: "Gemini" },
      { e: "♋", n: "Cancer" }, { e: "♌", n: "Leo" }, { e: "♍", n: "Virgo" },
      { e: "♎", n: "Libra" }, { e: "♏", n: "Scorpio" }, { e: "♐", n: "Sagittarius" },
      { e: "♑", n: "Capricorn" }, { e: "♒", n: "Aquarius" }, { e: "♓", n: "Pisces" },
      { e: "⛎", n: "Ophiuchus" }, { e: "✅", n: "Check Mark Button" }, { e: "❌", n: "Cross Mark" },
      { e: "❎", n: "Cross Mark Button" }, { e: "✳️", n: "Eight-Spoked Asterisk" }, { e: "✴️", n: "Eight-Pointed Star" },
      { e: "❇️", n: "Sparkle" }, { e: "‼️", n: "Double Exclamation" }, { e: "⁉️", n: "Exclamation Question" },
      { e: "❓", n: "Question Mark" }, { e: "❔", n: "White Question" }, { e: "❕", n: "White Exclamation" },
      { e: "❗", n: "Exclamation" }, { e: "〰️", n: "Wavy Dash" }, { e: "©️", n: "Copyright" },
      { e: "®️", n: "Registered" }, { e: "™️", n: "Trademark" },
    ]
  },
  {
    id: "activities", name: "Activities & Sports", icon: "🎮",
    emoji: [
      { e: "⚽", n: "Soccer Ball" }, { e: "🏀", n: "Basketball" }, { e: "🏈", n: "American Football" },
      { e: "⚾", n: "Baseball" }, { e: "🥎", n: "Softball" }, { e: "🎾", n: "Tennis" },
      { e: "🏐", n: "Volleyball" }, { e: "🏉", n: "Rugby Football" }, { e: "🥏", n: "Flying Disc" },
      { e: "🎱", n: "Pool 8 Ball" }, { e: "🪀", n: "Yo-Yo" }, { e: "🏓", n: "Ping Pong" },
      { e: "🏸", n: "Badminton" }, { e: "🏒", n: "Ice Hockey" }, { e: "🏑", n: "Field Hockey" },
      { e: "🥍", n: "Lacrosse" }, { e: "🏏", n: "Cricket Game" }, { e: "🪃", n: "Boomerang" },
      { e: "🥅", n: "Goal Net" }, { e: "⛳", n: "Flag in Hole" }, { e: "🪁", n: "Kite" },
      { e: "🏹", n: "Bow and Arrow" }, { e: "🎣", n: "Fishing Pole" }, { e: "🤿", n: "Diving Mask" },
      { e: "🥊", n: "Boxing Glove" }, { e: "🥋", n: "Martial Arts Uniform" }, { e: "🎽", n: "Running Shirt" },
      { e: "🛹", n: "Skateboard" }, { e: "🛼", n: "Roller Skate" }, { e: "🛷", n: "Sled" },
      { e: "⛸️", n: "Ice Skate" }, { e: "🥌", n: "Curling Stone" }, { e: "🎿", n: "Skis" },
      { e: "⛷️", n: "Skier" }, { e: "🏂", n: "Snowboarder" }, { e: "🪂", n: "Skydiver" },
      { e: "🏋️", n: "Weight Lifter" }, { e: "🤼", n: "Wrestlers" }, { e: "🤸", n: "Cartwheel" },
      { e: "⛹️", n: "Bouncing Ball" }, { e: "🤺", n: "Fencer" }, { e: "🤾", n: "Handball Player" },
      { e: "🏌️", n: "Golfer" }, { e: "🏇", n: "Horse Racing" }, { e: "🏄", n: "Surfer" },
      { e: "🏊", n: "Swimmer" }, { e: "🤽", n: "Water Polo" }, { e: "🚣", n: "Rowing Boat" },
      { e: "🧗", n: "Rock Climber" }, { e: "🚵", n: "Mountain Biker" },
      { e: "🚴", n: "Cyclist" }, { e: "🏆", n: "Trophy" }, { e: "🥇", n: "1st Place Medal" },
      { e: "🥈", n: "2nd Place Medal" }, { e: "🥉", n: "3rd Place Medal" }, { e: "🎖️", n: "Military Medal" },
      { e: "🏅", n: "Sports Medal" }, { e: "🎗️", n: "Reminder Ribbon" }, { e: "🎫", n: "Ticket" },
      { e: "🎟️", n: "Admission Tickets" }, { e: "🎪", n: "Circus Tent" }, { e: "🤹", n: "Juggler" },
      { e: "🎭", n: "Performing Arts" }, { e: "🎨", n: "Artist Palette" }, { e: "🎤", n: "Microphone" },
      { e: "🎧", n: "Headphone" },
      { e: "🎼", n: "Musical Score" }, { e: "🎵", n: "Musical Note" }, { e: "🎶", n: "Musical Notes" },
      { e: "🎙️", n: "Studio Microphone" }, { e: "🎚️", n: "Level Slider" }, { e: "🎛️", n: "Control Knobs" },
      { e: "🎷", n: "Saxophone" }, { e: "🪗", n: "Accordion" }, { e: "🎸", n: "Guitar" },
      { e: "🎻", n: "Violin" }, { e: "🪕", n: "Banjo" }, { e: "🎹", n: "Musical Keyboard" },
      { e: "🥁", n: "Drum" }, { e: "🪘", n: "Long Drum" }, { e: "🎺", n: "Trumpet" },
      { e: "🪈", n: "Flute" }, { e: "🎯", n: "Bullseye" }, { e: "🎮", n: "Video Game" },
      { e: "🕹️", n: "Joystick" }, { e: "🎰", n: "Slot Machine" }, { e: "🎲", n: "Game Die" },
      { e: "🧩", n: "Puzzle Piece" }, { e: "♟️", n: "Chess Pawn" }, { e: "♠️", n: "Spade" },
      { e: "♥️", n: "Heart Suit" }, { e: "♦️", n: "Diamond Suit" }, { e: "♣️", n: "Club Suit" },
      { e: "🃏", n: "Joker" }, { e: "🀄", n: "Mahjong Red Dragon" }, { e: "🎴", n: "Flower Cards" },
      { e: "🎳", n: "Bowling" }, { e: "🪇", n: "Maracas" },
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
