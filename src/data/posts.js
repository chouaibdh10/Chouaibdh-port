import dzFellahWriteup from '../../guide/dz-fellah.md?raw';
import newCtfWriteup from '../../guide/new-ctf-writeup.md?raw';
import nxtraceChallengeWriteup from '../../guide/Nxtrace_challenge.md?raw';
import tryhackmeSecurityFootageWriteup from '../../guide/tryhackme-security-footage-writeup.md?raw';
import courtHardForensicsWriteup from '../../guide/court-hard-forensics-writeup.md?raw';
import dfirPcapAnalysisWorkflowWriteup from '../../guide/dfir-pcap-analysis-workflow.md?raw';

function stripFrontmatter(markdown) {
  return markdown.replace(/^---[\s\S]*?---\s*/, '').trim();
}

// Post data — add/edit your posts here
const posts = [
  {
    id: "dfir-pcap-analysis-workflow",
    title: "DFIR PCAP Analysis Workflow (Wireshark + tshark)",
    date: "2026-04-20",
    description:
      "A practical seven-step workflow to analyze a PCAP quickly with Wireshark and tshark.",
    tags: ["DFIR", "Forensics", "Network", "PCAP", "Wireshark", "tshark"],
    category: "Forensics",
    image: null,
    readTime: "4 min",
    wordCount: 640,
    content: stripFrontmatter(dfirPcapAnalysisWorkflowWriteup),
  },
  {
    id: "court-hard-forensics-writeup",
    title: "Court (Hard) - CTF Forensics Write-up (MQTT + XOR + Steno)",
    date: "2025-12-28",
    description:
      "Recover a flag exfiltrated over MQTT by decoding XOR/hex payloads and rebuilding stenography strokes.",
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
      "Extract a hidden flag from ICMPv6 PadN options using XOR and Base64 decoding.",
    tags: ["CTF", "Network", "Forensics", "IPv6", "Wireshark"],
    category: "CTF",
    image: null,
    readTime: "5 min",
    wordCount: 992,
    content: stripFrontmatter(newCtfWriteup),
  },
  {
    id: "dz-fellah",
    title: "DZ-Fellah - Algerian Agriculture Platform",
    date: "2025-11-30",
    description:
      "A platform connecting Algerian farmers directly with local consumers.",
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
      "Recover destroyed security footage from a PCAP using Wireshark and Foremost.",
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
      "A forensics and steganography challenge solved through EXIF metadata and steghide extraction.",
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
