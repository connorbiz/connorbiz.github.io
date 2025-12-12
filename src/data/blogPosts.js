// Blog posts about how computers work
// Each post connects to related concepts rhizomatically

export const blogPosts = [
    // === FUNDAMENTALS (Level 0 - Center) ===
    {
        id: 'what-is-computer',
        title: 'What is a Computer?',
        excerpt: 'A machine that processes information using logic and memory. At its core, just billions of tiny switches.',
        category: 'fundamentals',
        level: 0,
        connections: ['binary', 'cpu-basics', 'memory-basics', 'io-basics']
    },

    // === LEVEL 1 - Core Concepts ===
    {
        id: 'binary',
        title: 'Binary: The Language of Machines',
        excerpt: 'Everything is 1s and 0s. On or off. True or false. This is how computers think.',
        category: 'fundamentals',
        level: 1,
        connections: ['logic-gates', 'bits-bytes', 'boolean-algebra']
    },
    {
        id: 'cpu-basics',
        title: 'The CPU: The Brain',
        excerpt: 'The central processing unit executes instructions millions of times per second.',
        category: 'hardware',
        level: 1,
        connections: ['fetch-decode-execute', 'registers', 'alu', 'clock-speed']
    },
    {
        id: 'memory-basics',
        title: 'Memory: Remembering Things',
        excerpt: 'Computers need to store information temporarily and permanently. Different types for different needs.',
        category: 'memory',
        level: 1,
        connections: ['ram', 'storage', 'cache', 'memory-hierarchy']
    },
    {
        id: 'io-basics',
        title: 'Input/Output: Talking to the World',
        excerpt: 'How computers receive information and send it back out. Keyboards, screens, and everything between.',
        category: 'hardware',
        level: 1,
        connections: ['peripherals', 'buses', 'interrupts']
    },

    // === LEVEL 2 - Deeper Concepts ===
    {
        id: 'logic-gates',
        title: 'Logic Gates: AND, OR, NOT',
        excerpt: 'The building blocks of all computation. Simple rules that create infinite complexity.',
        category: 'fundamentals',
        level: 2,
        connections: ['transistors', 'adders', 'boolean-algebra']
    },
    {
        id: 'bits-bytes',
        title: 'Bits and Bytes',
        excerpt: '8 bits make a byte. A byte can represent 256 different values. This is how we measure data.',
        category: 'fundamentals',
        level: 2,
        connections: ['encoding', 'data-types']
    },
    {
        id: 'fetch-decode-execute',
        title: 'Fetch-Decode-Execute Cycle',
        excerpt: 'The heartbeat of the CPU. Get instruction, figure out what it means, do it. Repeat billions of times.',
        category: 'hardware',
        level: 2,
        connections: ['instruction-set', 'pipelining', 'registers']
    },
    {
        id: 'ram',
        title: 'RAM: Fast but Forgetful',
        excerpt: 'Random Access Memory is quick but loses everything when power goes off. Your computer\'s short-term memory.',
        category: 'memory',
        level: 2,
        connections: ['memory-addresses', 'dram-sram', 'volatility']
    },
    {
        id: 'storage',
        title: 'Storage: Long-term Memory',
        excerpt: 'Hard drives and SSDs keep your data safe even without power. Slower but permanent.',
        category: 'memory',
        level: 2,
        connections: ['hdd', 'ssd', 'file-systems']
    },
    {
        id: 'transistors',
        title: 'Transistors: Tiny Switches',
        excerpt: 'Billions of microscopic switches etched in silicon. The physical foundation of digital logic.',
        category: 'hardware',
        level: 2,
        connections: ['semiconductors', 'moores-law', 'logic-gates']
    },
    {
        id: 'registers',
        title: 'Registers: Ultra-Fast Storage',
        excerpt: 'Tiny memory locations inside the CPU itself. The fastest storage in your computer.',
        category: 'hardware',
        level: 2,
        connections: ['cpu-basics', 'assembly']
    },
    {
        id: 'alu',
        title: 'The ALU: Math and Logic',
        excerpt: 'Arithmetic Logic Unit. Does all the adding, subtracting, and comparing.',
        category: 'hardware',
        level: 2,
        connections: ['adders', 'binary-math']
    },
    {
        id: 'cache',
        title: 'Cache: Speed Trick',
        excerpt: 'Keep frequently used data close to the CPU. L1, L2, L3 - each level a tradeoff.',
        category: 'memory',
        level: 2,
        connections: ['locality', 'memory-hierarchy', 'cache-miss']
    },
    {
        id: 'buses',
        title: 'Buses: Data Highways',
        excerpt: 'Wires that connect components together. Address bus, data bus, control bus.',
        category: 'hardware',
        level: 2,
        connections: ['motherboard', 'bandwidth']
    },

    // === LEVEL 3 - Advanced Topics ===
    {
        id: 'instruction-set',
        title: 'Instruction Sets: CPU Languages',
        excerpt: 'x86, ARM, RISC-V. Different CPUs speak different languages. Some complex, some simple.',
        category: 'software',
        level: 3,
        connections: ['assembly', 'risc-cisc', 'machine-code']
    },
    {
        id: 'operating-system',
        title: 'Operating Systems',
        excerpt: 'The software that manages everything. Schedules processes, manages memory, handles I/O.',
        category: 'software',
        level: 3,
        connections: ['kernel', 'processes', 'file-systems']
    },
    {
        id: 'pipelining',
        title: 'Pipelining: Assembly Line',
        excerpt: 'Do multiple instructions at once by overlapping stages. Like an assembly line for computation.',
        category: 'hardware',
        level: 3,
        connections: ['hazards', 'superscalar', 'fetch-decode-execute']
    },
    {
        id: 'virtual-memory',
        title: 'Virtual Memory',
        excerpt: 'Pretend you have more RAM than you do. The OS\'s great illusion.',
        category: 'memory',
        level: 3,
        connections: ['page-tables', 'swapping', 'memory-addresses']
    },
    {
        id: 'file-systems',
        title: 'File Systems: Organizing Data',
        excerpt: 'How data is organized on storage. FAT, NTFS, ext4 - different ways to structure information.',
        category: 'software',
        level: 3,
        connections: ['storage', 'directories', 'inodes']
    },
    {
        id: 'networking-basics',
        title: 'Networking: Connected Computers',
        excerpt: 'How computers talk to each other. Packets, protocols, and the internet.',
        category: 'networking',
        level: 3,
        connections: ['tcp-ip', 'packets', 'ethernet']
    },
    {
        id: 'boolean-algebra',
        title: 'Boolean Algebra',
        excerpt: 'The mathematics of true and false. AND, OR, NOT, XOR - the logic behind logic gates.',
        category: 'fundamentals',
        level: 3,
        connections: ['logic-gates', 'truth-tables']
    },
    {
        id: 'encoding',
        title: 'Character Encoding',
        excerpt: 'ASCII, Unicode, UTF-8. How we represent text as numbers.',
        category: 'fundamentals',
        level: 3,
        connections: ['bits-bytes', 'unicode']
    },
    {
        id: 'semiconductors',
        title: 'Semiconductors',
        excerpt: 'Silicon that can conduct or insulate. The material that makes modern computing possible.',
        category: 'hardware',
        level: 3,
        connections: ['transistors', 'doping', 'fabrication']
    },
    {
        id: 'processes',
        title: 'Processes and Threads',
        excerpt: 'Programs in execution. How the OS runs multiple things at once.',
        category: 'software',
        level: 3,
        connections: ['scheduling', 'context-switch', 'concurrency']
    },

    // === LEVEL 4 - Deep Dives ===
    {
        id: 'tcp-ip',
        title: 'TCP/IP: The Internet Protocol',
        excerpt: 'The rules that make the internet work. Reliable delivery across unreliable networks.',
        category: 'networking',
        level: 4,
        connections: ['packets', 'routing', 'handshake']
    },
    {
        id: 'assembly',
        title: 'Assembly Language',
        excerpt: 'One step above machine code. Human-readable(ish) CPU instructions.',
        category: 'software',
        level: 4,
        connections: ['instruction-set', 'registers', 'machine-code']
    },
    {
        id: 'kernel',
        title: 'The Kernel',
        excerpt: 'The core of the operating system. Has complete control over everything.',
        category: 'software',
        level: 4,
        connections: ['system-calls', 'drivers', 'operating-system']
    },
    {
        id: 'memory-hierarchy',
        title: 'Memory Hierarchy',
        excerpt: 'From registers to tape. Faster means smaller and more expensive.',
        category: 'memory',
        level: 4,
        connections: ['cache', 'ram', 'storage', 'locality']
    },
    {
        id: 'concurrency',
        title: 'Concurrency',
        excerpt: 'Doing multiple things at once. Or at least appearing to.',
        category: 'software',
        level: 4,
        connections: ['parallelism', 'locks', 'processes']
    },
    {
        id: 'machine-code',
        title: 'Machine Code',
        excerpt: 'Raw binary instructions. What the CPU actually executes.',
        category: 'software',
        level: 4,
        connections: ['assembly', 'instruction-set', 'binary']
    },
    {
        id: 'ssd',
        title: 'Solid State Drives',
        excerpt: 'Flash memory storage. No moving parts. Fast, silent, reliable.',
        category: 'hardware',
        level: 4,
        connections: ['nand-flash', 'storage', 'wear-leveling']
    },
    {
        id: 'hdd',
        title: 'Hard Disk Drives',
        excerpt: 'Spinning platters and magnetic heads. The old reliable.',
        category: 'hardware',
        level: 4,
        connections: ['storage', 'seek-time', 'platters']
    },
    {
        id: 'clock-speed',
        title: 'Clock Speed',
        excerpt: 'Gigahertz. How many cycles per second. But speed isn\'t everything.',
        category: 'hardware',
        level: 4,
        connections: ['cpu-basics', 'ipc', 'overclocking']
    },
    {
        id: 'interrupts',
        title: 'Interrupts',
        excerpt: 'Stop what you\'re doing, something important happened. How hardware gets attention.',
        category: 'hardware',
        level: 4,
        connections: ['io-basics', 'handlers', 'polling']
    }
]

// Generate connections map for the hyperbolic layout
export function generateBlogGraph() {
    const nodes = blogPosts.map(post => ({
        id: post.id,
        label: post.title,
        level: post.level,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category
    }))

    const links = []
    blogPosts.forEach(post => {
        post.connections?.forEach(targetId => {
            // Only add link if target exists
            if (blogPosts.find(p => p.id === targetId)) {
                links.push({ source: post.id, target: targetId })
            }
        })
    })

    return { nodes, links }
}
