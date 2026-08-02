import dfirPcapAnalysisWorkflow from '../../guide/dfir-pcap-analysis-workflow.md?raw';
import courtHardForensicsWriteup from '../../guide/court-hard-forensics-writeup.md?raw';

import nextraceCanYouSee from '../content/writeups/nextrace-can-u-see.md?raw';
import securityFootage from '../content/writeups/tryhackme-security-footage.md?raw';
import ipv6HopByHop from '../content/writeups/hbu-ipv6-hop-by-hop.md?raw';
import cursedBytes from '../content/writeups/cursed-bytes.md?raw';
import omegaVault from '../content/writeups/omega-vault.md?raw';
import amadeyApt from '../content/writeups/amadey-apt-c-36.md?raw';
import retailBreach from '../content/writeups/retailbreach.md?raw';
import playingWithPointers from '../content/writeups/dalctf-playing-with-pointers.md?raw';
import shamirCrypto from '../content/writeups/dalctf-shamir-crypto.md?raw';
import nmctfWorkstation from '../content/writeups/nmctf-compromised-workstation.md?raw';
import silentPulse from '../content/writeups/silent-pulse.md?raw';

const SOURCE_REPOSITORY =
  'https://github.com/chouaibdh10/My_CTF_Challenges__Writeups';

function cleanMarkdown(markdown) {
  return markdown
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/^#\s+.+(?:\r?\n)+/, '')
    .trim();
}

function readingStats(markdown) {
  const wordCount = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`[\]()-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return {
    wordCount,
    readTime: `${Math.max(1, Math.ceil(wordCount / 210))} min read`,
  };
}

function makePost(post) {
  const content = cleanMarkdown(post.content);
  return { ...post, ...readingStats(content), content };
}

const importedWriteups = [
  {
    id: 'silent-pulse',
    title: 'Silent Pulse',
    date: '2026-08-02',
    description:
      'Tracing an HTTP command-and-control beacon, decoding DNS-delivered tasking, and recovering an XOR-encrypted file from a PCAP.',
    tags: ['ITC CTF', 'Network Forensics', 'PCAP', 'HTTP C2', 'Wireshark', 'XOR'],
    category: 'Network Forensics',
    platform: 'myNEXzero',
    difficulty: 'Medium',
    featured: true,
    content: silentPulse,
    sourceUrl: `${SOURCE_REPOSITORY}/blob/main/my-challenges/silent-pulse/solution/README.md`,
  },
  {
    id: 'nmctf-compromised-workstation',
    title: "Coco's Compromised Workstation",
    date: '2026-06-26',
    description:
      'A Linux forensic investigation tracing a fake invoice, privilege escalation, credential access, and abuse of an AI coding workflow.',
    tags: ['NMCTF', 'Linux', 'DFIR', 'Incident Response', 'MCP'],
    category: 'Forensics',
    platform: 'NMCTF',
    difficulty: 'Hard',
    featured: true,
    content: nmctfWorkstation,
    sourceUrl: `${SOURCE_REPOSITORY}/blob/main/nmctf/FORENSIC_WRITEUP.md`,
  },
  {
    id: 'cyberdefenders-retailbreach',
    title: 'CyberDefenders — RetailBreach',
    date: '2026-06-26',
    description:
      'Investigating stored XSS, stolen admin sessions, path traversal, and data exfiltration in a retail web application PCAP.',
    tags: ['CyberDefenders', 'PCAP', 'Wireshark', 'Web Security', 'XSS'],
    category: 'Network Forensics',
    platform: 'CyberDefenders',
    difficulty: 'Intermediate',
    featured: true,
    content: retailBreach,
    sourceUrl: `${SOURCE_REPOSITORY}/blob/main/cyberdefendears-labs/retailbreach/README.md`,
  },
  {
    id: 'cyberdefenders-amadey-apt-c-36',
    title: 'CyberDefenders — Amadey APT-C-36',
    date: '2026-06-26',
    description:
      'A memory-forensics investigation covering process ancestry, command lines, C2 infrastructure, payload staging, and persistence.',
    tags: ['CyberDefenders', 'Memory Forensics', 'Volatility', 'Malware', 'DFIR'],
    category: 'Memory Forensics',
    platform: 'CyberDefenders',
    difficulty: 'Intermediate',
    featured: true,
    content: amadeyApt,
    sourceUrl: `${SOURCE_REPOSITORY}/blob/main/cyberdefendears-labs/amadey-apt-c-36/README.md`,
  },
  {
    id: 'omega-vault',
    title: 'OMEGA VAULT',
    date: '2026-06-26',
    description:
      'A three-stage cryptography challenge using a Bellcore RSA fault attack, noisy Shamir reconstruction, and stream decryption.',
    tags: ['Cryptography', 'RSA', 'Shamir', 'Python', 'Fault Attack'],
    category: 'Cryptography',
    platform: 'myNEXzero',
    difficulty: 'Hard',
    content: omegaVault,
    sourceUrl: `${SOURCE_REPOSITORY}/blob/main/my-challenges/omega-vault/solution/README.md`,
  },
  {
    id: 'cursed-bytes',
    title: 'Cursed Bytes',
    date: '2026-06-26',
    description:
      'Reconstructing DNS exfiltration, deriving an XOR key, decompressing records, and decoding stenography chords.',
    tags: ['DNS', 'PCAP', 'XOR', 'zlib', 'Stenography'],
    category: 'Network Forensics',
    platform: 'myNEXzero',
    difficulty: 'Hard',
    content: cursedBytes,
    sourceUrl: `${SOURCE_REPOSITORY}/blob/main/my-challenges/cursed-bytes/solutions/README.md`,
  },
  {
    id: 'dalctf-shamir-crypto',
    title: 'Shamir serait très en colère',
    date: '2026-06-26',
    description:
      'Breaking a malformed RSA key by discovering a tiny prime factor, rebuilding the private key, and decrypting the flag.',
    tags: ['DalCTF', 'Cryptography', 'RSA', 'Factorization', 'Python'],
    category: 'Cryptography',
    platform: 'DalCTF',
    difficulty: 'Intermediate',
    content: shamirCrypto,
    sourceUrl: `${SOURCE_REPOSITORY}/blob/main/DalCTF/Shamir_crypto.md`,
  },
  {
    id: 'dalctf-playing-with-pointers',
    title: 'Playing with Pointers',
    date: '2026-06-26',
    description:
      'Recovering a missing C statement through type punning, Quake’s fast inverse square root, and pointer analysis.',
    tags: ['DalCTF', 'Reverse Engineering', 'C', 'Pointers'],
    category: 'Reverse Engineering',
    platform: 'DalCTF',
    difficulty: '500 pts',
    content: playingWithPointers,
    sourceUrl: `${SOURCE_REPOSITORY}/blob/main/DalCTF/Playing%20with%20Pointers.md`,
  },
  {
    id: 'hbu-ipv6-hop-by-hop',
    title: 'HBU BSides — IPv6 Hop-by-Hop',
    date: '2025-12-21',
    description:
      'Extracting covert data from ICMPv6 Hop-by-Hop PadN options with sequence reassembly, XOR, and Base64.',
    tags: ['HBU BSides', 'IPv6', 'Wireshark', 'XOR', 'Covert Channel'],
    category: 'Network Forensics',
    platform: 'HBU BSides',
    difficulty: 'Intermediate',
    content: ipv6HopByHop,
    sourceUrl: `${SOURCE_REPOSITORY}/blob/main/hbu-ipv6-hop-by-hop/README.md`,
  },
  {
    id: 'tryhackme-security-footage',
    title: 'TryHackMe — Security Footage Recovery',
    date: '2025-11-06',
    description:
      'Recovering destroyed CCTV footage by locating JPEG traffic and carving images from a packet capture.',
    tags: ['TryHackMe', 'Forensics', 'Wireshark', 'Foremost', 'File Carving'],
    category: 'Forensics',
    platform: 'TryHackMe',
    difficulty: 'Easy',
    content: securityFootage,
    sourceUrl: `${SOURCE_REPOSITORY}/blob/main/tryhackme/tryhackme-security-footage/README.md`,
  },
  {
    id: 'nextrace-can-u-see',
    title: 'Nextrace — can_u_see.jpg',
    date: '2025-10-24',
    description:
      'Finding a hidden passphrase in EXIF metadata and extracting a concealed flag with steghide.',
    tags: ['Nextrace', 'Steganography', 'EXIF', 'steghide', 'Base64'],
    category: 'Forensics',
    platform: 'Nextrace',
    difficulty: 'Easy',
    content: nextraceCanYouSee,
    sourceUrl: `${SOURCE_REPOSITORY}/blob/main/my-challenges/nextrace-can-u-see/README.md`,
  },
].map((post) => makePost({ ...post, type: 'ctf' }));

const originalPosts = [
  {
    id: 'dfir-pcap-analysis-workflow',
    title: 'A Practical DFIR PCAP Analysis Workflow',
    date: '2026-04-20',
    description:
      'A repeatable seven-step workflow for moving from raw packets to a defensible incident narrative with Wireshark and tshark.',
    tags: ['DFIR', 'Forensics', 'Network', 'PCAP', 'Wireshark', 'tshark'],
    category: 'Security Notes',
    type: 'blog',
    featured: true,
    content: dfirPcapAnalysisWorkflow,
  },
  {
    id: 'court-hard-forensics-writeup',
    title: 'Court (Hard) — MQTT, XOR & Stenography',
    date: '2025-12-28',
    description:
      'Recovering a flag exfiltrated over MQTT by decoding XOR/hex payloads and rebuilding court-reporter strokes.',
    tags: ['CTF', 'MQTT', 'PCAP', 'XOR', 'Stenography'],
    category: 'Network Forensics',
    type: 'ctf',
    platform: 'Cybears',
    difficulty: 'Hard',
    content: courtHardForensicsWriteup,
  },
].map(makePost);

export const ctfWriteups = [...importedWriteups, ...originalPosts.filter((p) => p.type === 'ctf')];
export const blogPosts = originalPosts.filter((p) => p.type === 'blog');
export const posts = [...ctfWriteups, ...blogPosts].sort(
  (a, b) => new Date(b.date) - new Date(a.date),
);

export function getCategories(collection = posts) {
  const counts = collection.reduce((map, post) => {
    map[post.category] = (map[post.category] || 0) + 1;
    return map;
  }, {});

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getTags(collection = posts) {
  return [...new Set(collection.flatMap((post) => post.tags))].sort();
}

export default posts;
