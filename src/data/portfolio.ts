// Central content file — edit this to update site copy without touching components.

export const profile = {
  name: "Krishnapatnam Muni Sai Divith",
  shortName: "Divith",
  roles: ["Network Automation Engineer", "Cloud Infrastructure Engineer", "Cybersecurity Student"],
  typingWords: ["Python Automation", "AWS Cloud", "Networking", "DevOps", "Cyber Security"],
  summary:
    "3rd-year B.E CSE (Cyber Security) student building a foundation across routing & switching, cloud infrastructure, and offensive security. CCNA coursework complete, hands-on with Cisco Packet Tracer and Wireshark, and actively looking for a Network Engineer or Network Architect internship.",
  location: "India",
  email: "munisaidivith19@gmail.com",
  linkedin: "https://www.linkedin.com/in/muni-sai-divith-69ab0837b/",
  github: "https://github.com/munisaidivith19-sketch",
  githubUsername: "munisaidivith19-sketch",
  resumeFile: "/resume.pdf",
  photo: "/public/profile-photo.jpeg",
};

export const stats = [
  { label: "CGPA", value: 8.2, suffix: "", decimals: 2 },
  { label: "Certifications Earned", value: 5, suffix: "+" },
  { label: "LINKEDIN FOLLOWERS", value: 3000, suffix: "+" },
  { label: "CCNA Modules Completed", value: 100, suffix: "%" },
];

export const education = [
  {
    period: "2024 — Present",
    title: "B.E CSE (Cyber Security)",
    place: "J.N.N Institute of Engineering, Anna University",
    detail: "CGPA 8.2",
  },
  {
    period: "2022 — 2024",
    title: "Intermediate (MPC)",
    place: "Ravindra Bharathi Junior College",
    detail: "76.7%",
  },
  {
    period: "2022",
    title: "10th Class",
    place: "Ravindra Bharathi E.M High School",
    detail: "62%",
  },
];

export const certifications = [
  {
    year: "2026",
    title: "Pre Security Learning Path",
    issuer: "TryHackMe",
    image: "/public/tryhackme-pre-security.png.png",
  },
  {
    year: "2025",
    title: "Introduction to Cyber Security",
    issuer: "Cisco",
    image: "/public/cisco-intro-cyber-security.png.png",
  },
  {
    year: "2025",
    title: "Cyber Security Certification",
    issuer: "Skill India — Tech Mahindra",
    image: "/public/Skill India — Tech Mahindra.png",
  },
  {
    year: "2026",
    title: "CCNA 200-301",
    issuer: "NETWORK RHINOS",
    image: "",
  },
];

export const skillGroups = [
  {
    title: "NETWORKING SKILLS ",
    icon: "Network",
    skills: ["CCNA","IPV4","IPV6","OSPF","EIGRP","BGP","VLANs","STP","RIP","EtherChannel","NAT","PAT","ACL","DHCP","STATIC ROUTING","FIREWALL CONFIGURATION","ROUTER CONFIGURATION","SWITCH CONFIGURATION","NETWORK TROUBLESHOOTING"],
  },
  {
    title: "Network Tools",
    icon: "Router",
    skills: ["Cisco Packet Tracer", "Wireshark", "Nmap", "PuTTY", "GNS3","PING","Traceroute","Telnet","Netcat"],
  },
  
  {
    title: "SECURITY TOOLS",
    icon: "Shield",
    skills: ["Sql Injection", "Metasploit Framework", "Burp Suite", "Nessus", "Enum4linux", "Hydra", "John the Ripper", "Nikto", "SQLmap", "OWASP ZAP", "Aircrack-ng", "Hashcat","SubDomain Finder","Recon-ng"],
  },

  {
    title: "Programming",
    icon: "Code2",
    skills: ["Python (scripting)", "C", "C++(Basics)", "JavaScript(Basics)", "HTML(Basics)", "CSS(Basics)","React(Basics)","Tailwind CSS(Basics)","FastAPI(Basics)","TypeScript(Basics)"],
  },
  {
    title: "CLOUD & DEVOPS",
    icon: "Cloud",
    skills: ["AWS CLOUD","AWS EC2","AWS S3","AWS Lambda","AWS CloudTrail","AWS EventBridge","AWS DynamoDB","AWS SNS","AWS IAM","AWS CloudFormation(Basics)","Docker(Basics)"],
  },
  {
    title: "Operating Systems",
    icon: "Terminal",
    skills: ["Kali Linux", "Ubuntu", "Windows","BlackArch Linux"],
  },
];

export const projects = [
  {
    id: "aws-cloud-soc",
    title: "AWS-CLOUD-SOC",
    tagline: "Full-stack cloud Security Operations Center on AWS",
    problem:
      "Enterprise security teams need a way to detect and triage cloud-native threats in real time instead of digging through raw CloudTrail logs after the fact.",
    solution:
      "Built a full-stack SOC platform on AWS with a FastAPI backend and a React + TypeScript glassmorphism front end. Lambda functions evaluate CloudTrail events through 55+ threat-detection rules mapped to MITRE ATT&CK, EventBridge routes findings, DynamoDB stores them, and SNS handles alerting. The platform supports role-based access and generates PDF/DOCX incident reports.",
    stack: ["FastAPI", "React", "TypeScript", "AWS Lambda", "DynamoDB", "EventBridge", "CloudTrail", "SNS"],
    features: [
      "55+ automated threat-detection rules mapped to MITRE ATT&CK",
      "Real-time alerting pipeline via EventBridge + SNS",
      "PDF/DOCX incident report generation",
      "Role-based access control",
    ],
    github: "https://github.com/munisaidivith19-sketch/AWS-CLOUD-SOC",
    demo: "",
    image: "terminal",
  },
  {
    id: "enterprise-multi-branch-ospf",
    title: "Enterprise Multi-Branch Network (OSPF)",
    tagline: "Multi-site enterprise network with dynamic routing and wireless",
    problem:
      "A growing organization with multiple branches needs reliable inter-site routing, department-level segmentation, and wireless access — without manual route management at every branch.",
    solution:
      "Designed and built a multi-branch enterprise network in Cisco Packet Tracer using VLANs and Router-on-a-Stick for segmentation, DHCP for automatic addressing, OSPF for dynamic inter-branch routing, Layer 3 core switching, and Wireless Access Points for client connectivity.",
    stack: ["Cisco Packet Tracer", "OSPF", "VLANs", "Router-on-a-Stick", "DHCP", "Layer 3 Switching", "Wireless APs"],
    features: [
      "OSPF-based dynamic routing across multiple branch sites",
      "VLAN segmentation with Router-on-a-Stick",
      "Layer 3 core switching for inter-VLAN routing at scale",
      "Wireless AP integration for client access",
    ],
    github: "https://github.com/munisaidivith19-sketch/Enterprise-Multi-Branch-Network-OSPF",
    demo: "",
    image: "terminal",
  },
  {
    id: "enterprise-acl-security",
    title: "Enterprise ACL Security",
    tagline: "Department-level network security enforced with extended ACLs",
    problem:
      "Segmenting a network into departments with VLANs isn't enough on its own — traffic between segments needs to be explicitly controlled to enforce least-privilege access.",
    solution:
      "Designed and implemented an enterprise network in Cisco Packet Tracer featuring VLAN segmentation, Router-on-a-Stick, DHCP, and Inter-VLAN Routing, then layered Extended ACLs on top to enforce department-level security policy between segments.",
    stack: ["Cisco Packet Tracer", "Extended ACLs", "VLANs", "Router-on-a-Stick", "DHCP", "Inter-VLAN Routing"],
    features: [
      "VLAN segmentation across departments",
      "Extended ACLs enforcing department-level traffic policy",
      "Router-on-a-Stick for inter-VLAN routing",
      "Automatic addressing via DHCP",
    ],
    github: "https://github.com/munisaidivith19-sketch/Enterprise-ACL-Security",
    demo: "",
    image: "terminal",
  },
  {
    id: "small-office-network",
    title: "Small Office Network",
    tagline: "VLAN-segmented office network with centralized routing",
    problem:
      "A small office with multiple departments needs traffic kept separate for security and manageability, without needing a router interface for every VLAN.",
    solution:
      "Built a small office network in Cisco Packet Tracer using VLANs, Router-on-a-Stick, DHCP, and Inter-VLAN Routing — configuring VLAN segmentation for multiple departments and automatic IP addressing across the network.",
    stack: ["Cisco Packet Tracer", "VLANs", "Router-on-a-Stick", "DHCP", "Inter-VLAN Routing"],
    features: [
      "VLAN segmentation for multiple departments",
      "Router-on-a-Stick for inter-VLAN routing",
      "Automatic IP addressing via DHCP",
    ],
    github: "https://github.com/munisaidivith19-sketch/Small-Office-Network",
    demo: "",
    image: "terminal",
  },
  {
    id: "metasploitable2",
    title: "Metasploitable2 Penetration Testing",
    tagline: "Full-scope penetration test against a deliberately vulnerable Linux target",
    problem:
      "Needed hands-on proof of the offensive-security workflow beyond CCNA theory: recon, service enumeration, exploitation, and reporting on a realistic vulnerable host.",
    solution:
      "Ran a structured engagement against Metasploitable2 — network scanning and enumeration with Nmap and Enum4linux, service discovery, and exploitation of the VSFTPD 2.3.4 backdoor via Metasploit to gain root access. Findings, exploitation steps, and remediation were written up in a structured report.",
    stack: ["Kali Linux", "Nmap", "Enum4linux", "Telnet", "Metasploit Framework"],
    features: [
      "Full network scan & service enumeration",
      "VSFTPD 2.3.4 backdoor exploitation to root",
      "Structured vulnerability & remediation report",
    ],
    github: "",
    demo: "",
    image: "terminal",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];