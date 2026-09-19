// ============================================================
//  SYLLABUS DATA  – edit this file to add/rename subjects, modules, concepts
//  Structure: subject -> modules -> groups (sub parts) -> concepts
// ============================================================
const G = (title, items) => ({ title, items });

const SUBJECTS = [
{
  id: "cn", code: "CSPC2007", name: "Computer Networks", icon: "🌐", color: "#3b82f6", credits: "3-0-0",
  objectives: ["Fundamentals of data communication networks","Software and hardware interfaces","Application of various physical components and protocols","Communication challenges and remedies in networks"],
  books: ["Tanenbaum – Computer Networks, 4th ed.","Forouzan – Data Communication and Networking, 4th ed.","Kurose & Ross – Computer Networking: A Top-Down Approach","Keshav – An Engineering Approach to Computer Networks"],
  links: [["NPTEL 106105183","https://nptel.ac.in/courses/106105183"],["NPTEL 106105081","https://nptel.ac.in/courses/106105081"]],
  modules: [
    { title: "Introduction & Physical Layer", hours: 8, groups: [
      G("Introduction to Networks", ["Network hardware","Network software","OSI reference model","TCP/IP reference model","Example networks: ARPANET","Example networks: Internet"]),
      G("Data and Signals", ["Analog and digital data/signals","Periodic analog signals","Digital signals","Transmission impairments","Data rate limits"]),
      G("Transmission Media", ["Twisted pair","Coaxial cable","Fiber optics","Wireless transmission","Unguided transmission media"]) ]},
    { title: "Data Link Layer & MAC Sublayer", hours: 8, groups: [
      G("Data Link Layer Basics", ["Design issues","Framing","Error detection and correction","CRC codes"]),
      G("Elementary Data Link Protocols", ["Simplex protocol","Simplex stop-and-wait (error-free channel)","Simplex stop-and-wait (noisy channel)"]),
      G("Sliding Window Protocols", ["One-bit sliding window","Go-Back-N","Selective Repeat","Example data link protocols"]),
      G("Medium Access Sublayer", ["Channel allocation problem","ALOHA (pure & slotted)","Carrier sense multiple access (CSMA)","Collision-free protocols","Wireless LANs","Data link layer switching"]) ]},
    { title: "Connecting Devices & Network Layer", hours: 8, groups: [
      G("Connecting Devices", ["Learning bridges","Spanning tree bridges","Repeaters and hubs","Bridges and switches","Routers and gateways","Multiplexing and its types"]),
      G("Routing", ["Network layer design issues","Shortest path routing","Flooding","Hierarchical routing","Broadcast routing","Multicast routing","Distance vector routing","Link state protocols","Path vector routing"]),
      G("Congestion & QoS", ["Congestion control algorithms","Quality of Service"]) ]},
    { title: "Internetworking & Transport Layer", hours: 10, groups: [
      G("Internetworking", ["Logical addressing","Internet protocols","IP address","CIDR","IPv4 addressing","IPv6 addressing","Address mapping"]),
      G("Support Protocols", ["ICMP","IGMP","ARP","RARP","DHCP"]),
      G("Transport Protocols", ["Process-to-process delivery","UDP","TCP","TCP service model","TCP sliding window","TCP congestion control","Congestion control and QoS"]) ]},
    { title: "Application Layer", hours: 6, groups: [
      G("Basics", ["Introduction","Providing services","Client-server model"]),
      G("Standard Applications", ["HTTP","FTP","Electronic mail","TELNET","DNS"]) ]}
  ]
},
{
  id: "toc", code: "CSPC3001", name: "Theory of Computation", icon: "🧮", color: "#8b5cf6", credits: "3-0-0",
  objectives: ["Mathematical foundations: formal languages, grammars, automata, Turing machines","Design abstract models of computation and analyse their limits","Decidability, reducibility, computational complexity","Mathematical rigour in proofs","Chomsky hierarchy and relations among computational classes"],
  books: ["Hopcroft & Ullman – Intro to Automata Theory, Languages and Computation","Peter Linz – Intro to Formal Languages and Automata","Michael Sipser – Intro to the Theory of Computation, 2nd ed."],
  links: [],
  modules: [
    { title: "Fundamentals and Finite Automata", hours: 8, groups: [
      G("Basics", ["Alphabets, strings, languages","Operations on languages"]),
      G("Finite Automata", ["DFA","NFA","Transition diagrams","Language recognition","DFA–NFA equivalence","Conversion of NFA to DFA","ε-transitions in NFA","Elimination of ε-transitions","Minimization of finite state machines"]),
      G("Machines with Output", ["Moore machine","Mealy machine","Conversion between Moore and Mealy"]) ]},
    { title: "Regular Languages and Expressions", hours: 8, groups: [
      G("Regular Expressions", ["Regular expressions","Identity rules","Regex → finite automata","Finite automata → regex"]),
      G("Regular Grammars", ["Right linear grammar","Left linear grammar","Conversion: grammar ↔ FA ↔ regex"]),
      G("Properties", ["Pumping lemma for regular languages","Applications of pumping lemma","Closure properties of regular languages"]) ]},
    { title: "Context-Free Grammars and PDA", hours: 8, groups: [
      G("Context-Free Grammars", ["CFG definition and examples","Derivation trees","Leftmost and rightmost derivations","Ambiguity in CFGs","Simplification of CFGs","Chomsky normal form","Greibach normal form","Pumping lemma for CFLs"]),
      G("Pushdown Automata", ["PDA definition and model","Acceptance by final state","Acceptance by empty stack","Equivalence of CFG and PDA","Deterministic vs nondeterministic PDA"]) ]},
    { title: "Turing Machines and Computability", hours: 8, groups: [
      G("Turing Machines", ["TM formal definition","Configurations","Design of TMs","Variants of TMs and equivalence","Linear bounded automata (LBA)","Context-sensitive languages"]),
      G("Computability", ["Computable functions","Recursively enumerable languages","Recursive languages","Church–Turing thesis"]),
      G("Decidability", ["Decidability and undecidability","Examples of undecidable problems","Reductions","Mapping reducibility"]) ]},
    { title: "Complexity Theory and Chomsky Hierarchy", hours: 8, groups: [
      G("Chomsky Hierarchy", ["Classification of languages and machines","Language families and relationships"]),
      G("Complexity", ["Efficiency of computation","Time complexity","Space complexity","Classes P and NP","NP-completeness","P vs NP problem","Polynomial-time reductions","Basic NP-complete problems"]) ]}
  ]
},
{
  id: "os", code: "CSPC3002", name: "Operating Systems", icon: "🖥️", color: "#10b981", credits: "3-0-0",
  objectives: ["Services rendered by operating systems","Memory management techniques","File-system design and implementation","Protection domains and security"],
  books: ["Silberschatz, Galvin, Gagne – Operating System Concepts, 10th ed.","Stallings – Operating Systems: Internals and Design Principles, 9/E","Tanenbaum – Modern Operating Systems, 4/E"],
  links: [],
  modules: [
    { title: "Introduction, Structure & Processes", hours: 10, groups: [
      G("Introduction to OS", ["About an OS","Simple batch system","Multiprogramming","Time-sharing systems"]),
      G("OS Structure", ["OS services","System components","Protection system","System calls"]),
      G("Process Management", ["Process concepts","Process scheduling","Operations on processes","Inter-process communication (IPC)","Multithreading models","Threading issues","Scheduling algorithms"]) ]},
    { title: "Synchronization & Deadlocks", hours: 10, groups: [
      G("Process Synchronization", ["Critical section problem","Peterson's solution","Synchronization hardware","Semaphores","Classical synchronization problems"]),
      G("Deadlocks", ["System model","Deadlock characterization","Methods for handling deadlock","Deadlock prevention","Deadlock avoidance","Deadlock detection","Recovery from deadlock"]) ]},
    { title: "Memory Management", hours: 8, groups: [
      G("Memory Management", ["Memory management strategies","Logical vs physical address space","Swapping","Contiguous allocation","Paging","Segmentation"]),
      G("Virtual Memory", ["Background","Demand paging","Page replacement algorithms","Allocation of frames","Thrashing","Demand segmentation"]) ]},
    { title: "Storage Management", hours: 8, groups: [
      G("File Systems", ["File system concept","Access methods","File system structure","Implementation","Efficiency & performance","Recovery"]),
      G("Disk & Storage", ["Overview of storage structure","Disk structure","Disk scheduling","Disk management","Swap space management"]),
      G("I/O Systems", ["I/O system overview","I/O hardware","Application I/O interface","Kernel I/O subsystem","Transforming I/O requests to hardware operations"]) ]},
    { title: "Distributed Systems", hours: 4, groups: [
      G("Distributed & Real-Time", ["Distributed file systems","Distributed operating systems","Real-time systems"]) ]}
  ]
},
{
  id: "aiml", code: "CSPC3003", name: "Artificial Intelligence & Machine Learning", icon: "🤖", color: "#f59e0b", credits: "3-0-0",
  objectives: ["Concepts of Artificial Intelligence","Problem solving using AI methods","Expert systems and machine learning"],
  books: ["Rich, Knight, Nair – Artificial Intelligence, 3rd ed.","Russell & Norvig – AI: A Modern Approach","Géron – Hands-On Machine Learning with Scikit-Learn & TensorFlow"],
  links: [],
  modules: [
    { title: "Intro to AI & Search", hours: 10, groups: [
      G("Introduction to AI", ["Foundations of AI","Agents and environments","Intelligent agent","Rationality","Nature of environments","Structure of agents"]),
      G("Problem Solving & Search", ["Iterative search","Breadth-first search","Depth-first search","Uniform cost search","Greedy best-first search","A* search","Constraint Satisfaction Problems (CSP)"]) ]},
    { title: "Adversarial Search & Knowledge Representation", hours: 10, groups: [
      G("Adversarial Search", ["Games","Mini-Max algorithm","Alpha-Beta pruning"]),
      G("Knowledge & Reasoning", ["Logical agents","Knowledge-based agents","Logic","Propositional logic reasoning","First-order logic reasoning","Resolution (propositional & FOL)","Unification and lifting","Forward chaining","Backward chaining"]) ]},
    { title: "Uncertainty & Expert Systems", hours: 8, groups: [
      G("Uncertainty", ["Probabilistic reasoning","Bayes' rule","Bayesian network representation","Markov models","Independence and inference"]),
      G("Expert Systems", ["Representing domain knowledge","Expert system shells","Explanation","Knowledge acquisition"]) ]},
    { title: "Learning Methods", hours: 6, groups: [
      G("Learning Methods", ["Statistical learning","Rote learning","Learning by taking advice","Learning in problem-solving","Learning from examples: induction","Explanation-based learning"]) ]},
    { title: "Machine Learning", hours: 8, groups: [
      G("Types of Learning", ["Supervised learning","Unsupervised learning","Reinforcement learning"]),
      G("ML Paradigms", ["Linear regression","Logistic regression","Decision trees","K-Nearest Neighbours","Support vector machine","Naïve Bayes classifier"]),
      G("Evaluation & More", ["Evaluation metrics","Overfitting and underfitting","Clustering","Dimensionality reduction","Neural network basics","Ensemble learning"]) ]}
  ]
},
{
  id: "ed", code: "HSHS3002", name: "Entrepreneurship Development", icon: "🚀", color: "#ec4899", credits: "3-0-0",
  objectives: ["Concept of entrepreneurship and business situations","Types of entrepreneurs and project development","Venture development steps and new trends","Creativity and innovation"],
  books: ["Vasant Desai – Entrepreneurship Development and Management","Bholanath Dutta – Entrepreneurship Management","Sangeeta Sharma – Entrepreneurial Development","Rajeev Roy – Entrepreneurship"],
  links: [],
  modules: [
    { title: "Entrepreneurship", hours: 10, groups: [
      G("Concepts", ["Entrepreneurship and intrapreneurship","Types of entrepreneurs","Nature and importance"]),
      G("Personality", ["Entrepreneurial traits and skills","Motivation and achievement","Entrepreneurial personality"]) ]},
    { title: "Environment & Setting Up", hours: 8, groups: [
      G("Opportunities", ["Entrepreneurial environment","Identification of opportunities","Converting opportunities into reality"]),
      G("Setting Up", ["Start-ups and business incubation","Setting up a small enterprise","Location issues"]),
      G("Regulations", ["Environmental problems & pollution Act","Industrial policies and regulations"]) ]},
    { title: "Management & Support", hours: 10, groups: [
      G("Functional Management", ["Accounting","Working capital management","Marketing management","Human resource management","Labour laws"]),
      G("Support Services", ["Central & State government support","Incentives and subsidies"]) ]},
    { title: "Sickness of Small-Scale Industries", hours: 12, groups: [
      G("Industrial Sickness", ["Causes of sickness","Symptoms of sickness","Cures of sickness","Role of banks in revival","Role of governments in revival"]) ]}
  ]
},
{
  id: "ise", code: "MCMC3002", name: "Industrial Safety Engineering", icon: "🦺", color: "#ef4444", credits: "3-0-0",
  objectives: ["Recognise and evaluate occupational safety & health hazards; choose controls via the hierarchy of controls","Analyse workplace exposures, injuries and prevention using safety management systems and training"],
  books: ["Higgins & Morrow – Maintenance Engineering Handbook","H. P. Garg – Maintenance Engineering","Audels – Pump-hydraulic Compressors","Winterkorn – Foundation Engineering Handbook"],
  links: [],
  modules: [
    { title: "Industrial Safety", hours: 7, groups: [
      G("Accidents & Hazards", ["Accident: causes, types, results, control","Mechanical hazards","Electrical hazards","Preventive steps / procedures"]),
      G("Factories Act 1948", ["Salient points for health & safety","Wash rooms & drinking water","Layout, light, cleanliness","Fire & guarding","Pressure vessels","Safety colour codes"]),
      G("Fire Safety", ["Fire prevention","Firefighting equipment","Firefighting methods"]) ]},
    { title: "Fundamentals of Maintenance Engineering", hours: 7, groups: [
      G("Basics", ["Definition and aim","Primary & secondary functions","Responsibility of maintenance dept.","Types of maintenance"]),
      G("Tools & Economics", ["Types & applications of maintenance tools","Maintenance cost vs replacement economy","Service life of equipment"]) ]},
    { title: "Wear and Corrosion", hours: 7, groups: [
      G("Wear", ["Types of wear","Causes and effects","Wear reduction methods"]),
      G("Lubrication", ["Lubricants: types & applications","Screw-down grease cup","Pressure grease gun","Splash lubrication","Gravity lubrication","Wick feed lubrication","Side feed lubrication","Ring lubrication"]),
      G("Corrosion", ["Definition & principle","Factors affecting corrosion","Types of corrosion","Corrosion prevention methods"]) ]},
    { title: "Fault Tracing", hours: 7, groups: [
      G("Concepts", ["Fault tracing: concept & importance","Decision tree concept, need & applications","Sequence of fault-finding activities","Types of faults in machine tools & causes"]),
      G("Decision Trees for Equipment", ["Machine tool","Pump","Air compressor","Internal combustion engine","Boiler","Electrical motors"]) ]},
    { title: "Periodic and Preventive Maintenance", hours: 8, groups: [
      G("Periodic Inspection", ["Concept and need","Degreasing, cleaning, repairing schemes","Overhauling of mechanical components","Overhauling of electric motor","Common troubles & remedies of electric motor","Repair complexities"]),
      G("Preventive Maintenance", ["Definition, need, steps, advantages","Procedure: machine tools","Procedure: pumps","Procedure: air compressors","Procedure: DG sets","Program & schedule of PM","Repair cycle concept & importance"]) ]}
  ]
}
];

// give every concept a stable ID:  subject-mX-gY-cZ
SUBJECTS.forEach(s => s.modules.forEach((m, mi) => m.groups.forEach((g, gi) =>
  g.items = g.items.map((t, ci) => ({ id: `${s.id}-m${mi+1}-g${gi+1}-c${ci+1}`, title: t })))));
