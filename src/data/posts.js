import dzFellahWriteup from '../../guide/dz-fellah.md?raw';
import newCtfWriteup from '../../guide/new-ctf-writeup.md?raw';
import nxtraceChallengeWriteup from '../../guide/Nxtrace_challenge.md?raw';
import tryhackmeSecurityFootageWriteup from '../../guide/tryhackme-security-footage-writeup.md?raw';
import courtHardForensicsWriteup from '../../guide/court-hard-forensics-writeup.md?raw';

function stripFrontmatter(markdown) {
  return markdown.replace(/^---[\s\S]*?---\s*/, '').trim();
}

// Post data — add/edit your posts here
const posts = [
  {
    id: "court-hard-forensics-writeup",
    title: "Court (Hard) — CTF Forensics Write-up (MQTT + XOR + Steno)",
    date: "2025-12-28",
    description:
      "Retrouver un flag exfiltré via MQTT en décodant un payload XOR/hex puis en reconstruisant des strokes de sténo.",
    tags: ["CTF", "Forensics", "Network", "PCAP", "MQTT", "Wireshark", "Stenography"],
    category: "CTF",
    image: null,
    readTime: "3 min",
    wordCount: 519,
    content: stripFrontmatter(courtHardForensicsWriteup),
  },
  {
    id: "new-ctf-writeup",
    title: "HBU BSides - IPv6 Hop-by-Hop Challenge",
    date: "2025-12-21",
    description:
      "Extraction d'un flag caché dans les options PadN des paquets ICMPv6 avec XOR et Base64.",
    tags: ["CTF", "Network", "Forensics", "IPv6", "Wireshark"],
    category: "CTF",
    image: null,
    readTime: "5 min",
    wordCount: 992,
    content: stripFrontmatter(newCtfWriteup),
  },
  {
    id: "dz-fellah",
    title: "DZ-Fellah - Plateforme Agricole Algérienne",
    date: "2025-11-30",
    description:
      "Plateforme de mise en relation entre producteurs agricoles algériens et consommateurs locaux.",
    tags: ["React", "Vite", "Web App", "Agriculture", "Frontend"],
    category: "Projects",
    image: null,
    readTime: "1 min",
    wordCount: 178,
    content: stripFrontmatter(dzFellahWriteup),
  },
  {
    id: "tryhackme-security-footage-writeup",
    title: "TryHackMe - Security Footage Recovery Writeup",
    date: "2025-11-06",
    description:
      "Recovering destroyed security footage from a PCAP file using Wireshark and Foremost.",
    tags: ["CTF", "Forensics", "TryHackMe", "Wireshark", "Network Analysis"],
    category: "CTF",
    image: null,
    readTime: "2 min",
    wordCount: 468,
    content: stripFrontmatter(tryhackmeSecurityFootageWriteup),
  },
  {
    id: "nxtrace-challenge",
    title: "My Nextrace Challenge Writeup",
    date: "2025-10-24",
    description:
      "A multi-step forensics challenge combining steganography and EXIF metadata analysis.",
    tags: ["CTF", "Forensics", "steghide", "exiftool"],
    category: "CTF",
    image: null,
    readTime: "1 min",
    wordCount: 186,
    content: stripFrontmatter(nxtraceChallengeWriteup),
  },
];

export default posts;

// Helper: get all unique categories with counts
export function getCategories() {
  const map = {};
  posts.forEach((p) => {
    map[p.category] = (map[p.category] || 0) + 1;
  });
  return Object.entries(map).map(([name, count]) => ({ name, count }));
}

// Helper: get all unique tags
export function getTags() {
  const set = new Set();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return [...set].sort();
}
