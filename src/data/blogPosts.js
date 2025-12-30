// Blog posts about how computers work
// Each post connects to related concepts rhizomatically

export const blogPosts = [
    // === CULTURE (Art Installations) ===
    {
        id: 'listening-post',
        title: 'Listening Post',
        excerpt: 'An immersive art installation inspired by the 2001 work by Mark Hansen and Ben Rubin. Walk through a virtual space filled with glowing VFD screens displaying fragments of human communication.',
        content: `Listening Post is a first-person exploration of a virtual art installation.

## About the Original

The original Listening Post (2001-2002) by Mark Hansen and Ben Rubin was a dynamic audio-visual installation that culled text fragments from thousands of internet chat rooms, bulletin boards, and public forums in real-time.

The text was read by a voice synthesizer and displayed across a suspended grid of more than 200 small electronic screens.

## This Virtual Recreation

Walk through a dark space surrounded by glowing screens. Fragments of human communication scroll past—simple phrases that capture moments of connection, loneliness, and presence.

WASD to walk. Mouse to look around. Listen.

## Controls

- **WASD** - Walk around the space
- **Mouse** - Look around
- **ESC** - Release mouse cursor
- **Click** - Enter the installation`,
        category: 'culture',
        level: 1,
        connections: ['what-is-computer', 'io-basics'],
        installationUrl: '/listening-post.html'
    },

    // === FUNDAMENTALS (Level 0 - Center) ===
    {
        id: 'what-is-computer',
        title: 'What is a Computer?',
        excerpt: 'A machine that processes information using logic and memory. At its core, just billions of tiny switches.',
        content: `A computer is a machine that processes information. That's it. Everything else—the screens, keyboards, networks, apps—is built on top of this simple idea.

## The Core Truth

At its heart, a computer does only four things:

- Accepts input (data from the outside world)
- Stores information (remembers things)
- Processes data (transforms inputs into outputs)
- Produces output (sends results back out)

Every computer ever built, from room-sized mainframes to the phone in your pocket, follows this pattern.

## Billions of Switches

Here's the surprising part: all of this is done with switches. Tiny electronic switches called transistors that can be either ON or OFF. Your computer has billions of them.

When you watch a video, send a message, or browse the web, you're really just flipping billions of switches in precise patterns, millions of times per second.

## Why It Matters

Understanding this foundation changes how you see technology. That complex app? Just switches. That AI? Switches. Encryption keeping your data safe? Patterns of switches.

The magic isn't in the complexity—it's in how simple rules, applied at enormous scale and speed, create the illusion of intelligence.`,
        category: 'fundamentals',
        level: 0,
        connections: ['binary', 'cpu-basics', 'memory-basics', 'io-basics']
    },

    // === LEVEL 1 - Core Concepts ===
    {
        id: 'binary',
        title: 'Binary: The Language of Machines',
        excerpt: 'Everything is 1s and 0s. On or off. True or false. This is how computers think.',
        content: `Computers don't understand English, Chinese, or any human language. They speak binary—a language with only two symbols: 0 and 1.

## Why Binary?

It's not arbitrary. Binary maps perfectly to physical reality:

- Electricity flowing = 1
- No electricity = 0
- Switch on = 1
- Switch off = 0
- Voltage high = 1
- Voltage low = 0

With only two states to distinguish, circuits can be simple and reliable. Trying to distinguish ten different voltage levels (for decimal) would be error-prone.

## Counting in Binary

Decimal uses powers of 10. Binary uses powers of 2:

- 0 = 0
- 1 = 1
- 10 = 2 (one 2, zero 1s)
- 11 = 3 (one 2, one 1)
- 100 = 4 (one 4, zero 2s, zero 1s)
- 1000 = 8
- 10000 = 16

## Everything is Binary

Text? Each letter is a number in binary. Images? Each pixel's color is numbers in binary. Sound? Waveform samples as binary numbers.

Every photo you've taken, every song you've heard digitally, every message you've sent—all of it, at the lowest level, is just long strings of 1s and 0s.`,
        category: 'fundamentals',
        level: 1,
        connections: ['logic-gates', 'bits-bytes', 'boolean-algebra']
    },
    {
        id: 'cpu-basics',
        title: 'The CPU: The Brain',
        excerpt: 'The central processing unit executes instructions millions of times per second.',
        content: `The CPU (Central Processing Unit) is where computation actually happens. It's a small chip, usually about the size of a postage stamp, that does all the "thinking."

## What It Does

The CPU has one job: execute instructions. It reads an instruction, does what it says, then moves to the next one. Simple. But it does this billions of times per second.

Instructions are basic operations like:
- Add two numbers
- Compare two values
- Move data from one place to another
- Jump to a different instruction

## The Fetch-Decode-Execute Cycle

Every CPU follows this loop:

- Fetch: Get the next instruction from memory
- Decode: Figure out what the instruction means
- Execute: Do the operation
- Repeat

This cycle happens once per "clock tick." A 3 GHz processor does this 3 billion times per second.

## Inside the CPU

Key components:
- ALU (Arithmetic Logic Unit): Does math and comparisons
- Registers: Tiny, ultra-fast storage slots
- Control Unit: Orchestrates everything

Modern CPUs have multiple "cores"—essentially multiple CPUs on one chip, working in parallel.`,
        category: 'hardware',
        level: 1,
        connections: ['fetch-decode-execute', 'registers', 'alu', 'clock-speed']
    },
    {
        id: 'memory-basics',
        title: 'Memory: Remembering Things',
        excerpt: 'Computers need to store information temporarily and permanently. Different types for different needs.',
        content: `Computers need to remember things—both the data they're working with and the instructions telling them what to do. But not all memory is created equal.

## The Tradeoff

There's a fundamental tradeoff in memory:
- Fast memory is expensive and small
- Cheap memory is slow and big

This shapes everything about how computers store data.

## Types of Memory

### RAM (Random Access Memory)
Fast, temporary storage. Holds what you're actively working on. Loses everything when power goes off. Your computer might have 8-64 GB.

### Storage (SSD/HDD)
Slow, permanent storage. Keeps data even without power. Your files, apps, and operating system live here. Typically 256 GB to several TB.

### Cache
Tiny, ultra-fast memory inside the CPU. Holds frequently-used data. Usually just a few MB.

### Registers
The fastest memory—inside the CPU itself. Holds the data being processed right now. Just a few dozen slots.

## The Memory Hierarchy

Data flows through these layers like a supply chain:
- Registers (fastest, smallest)
- Cache
- RAM
- Storage (slowest, biggest)

Programs try to keep frequently-used data in faster memory. This is called "locality" and it's crucial for performance.`,
        category: 'memory',
        level: 1,
        connections: ['ram', 'storage', 'cache', 'memory-hierarchy']
    },
    {
        id: 'io-basics',
        title: 'Input/Output: Talking to the World',
        excerpt: 'How computers receive information and send it back out. Keyboards, screens, and everything between.',
        content: `A computer that can't communicate is useless. Input/Output (I/O) is how computers interact with the outside world—and with us.

## Input: Data Coming In

Anything that sends data to the computer:
- Keyboard (your keystrokes)
- Mouse (position, clicks)
- Camera (image data)
- Microphone (audio)
- Network (data from internet)
- Sensors (temperature, motion, GPS)

Each input device converts some physical phenomenon into binary data the computer can process.

## Output: Data Going Out

Anything that receives data from the computer:
- Screen (pixels to display)
- Speakers (audio waveforms)
- Printer (text/images on paper)
- Network (data to internet)
- Motors/actuators (physical movement)

## The I/O Challenge

I/O is slow. Painfully slow compared to the CPU. A CPU can do billions of operations per second, but:
- Hard drives take milliseconds to find data
- Networks have latency
- Humans are glacially slow

Managing this speed mismatch is a huge part of what operating systems do. The CPU can't just wait around—it needs to stay busy while waiting for slow I/O.`,
        category: 'hardware',
        level: 1,
        connections: ['peripherals', 'buses', 'interrupts']
    },

    // === LEVEL 2 - Deeper Concepts ===
    {
        id: 'logic-gates',
        title: 'Logic Gates: AND, OR, NOT',
        excerpt: 'The building blocks of all computation. Simple rules that create infinite complexity.',
        content: `Logic gates are the atoms of computation. Every processor, every memory chip, every digital circuit is built from these simple components.

## The Basic Gates

### NOT Gate
Flips the input. 1 becomes 0, 0 becomes 1.

### AND Gate
Output is 1 only if BOTH inputs are 1.
- 0 AND 0 = 0
- 0 AND 1 = 0
- 1 AND 0 = 0
- 1 AND 1 = 1

### OR Gate
Output is 1 if EITHER input is 1.
- 0 OR 0 = 0
- 0 OR 1 = 1
- 1 OR 0 = 1
- 1 OR 1 = 1

## Building Complexity

From these three gates, you can build anything:
- XOR (exclusive or)
- NAND (not-and)
- Adders (for math)
- Multiplexers (for routing)
- Flip-flops (for memory)
- Eventually... entire CPUs

A modern processor has billions of gates, but each one is just doing these simple logical operations.

## The Physical Reality

Each gate is made of transistors. A NOT gate needs 2 transistors. NAND needs 4. An entire CPU needs billions. But they're all just implementing these basic logical rules.`,
        category: 'fundamentals',
        level: 2,
        connections: ['transistors', 'adders', 'boolean-algebra']
    },
    {
        id: 'bits-bytes',
        title: 'Bits and Bytes',
        excerpt: '8 bits make a byte. A byte can represent 256 different values. This is how we measure data.',
        content: `A bit is the smallest unit of information: a single 0 or 1. But one bit isn't very useful. We group them together.

## Bytes

8 bits = 1 byte. Why 8? Mostly historical accident, but it's convenient:
- 2^8 = 256 possible values
- Enough to represent all English letters, numbers, and symbols
- A nice power of 2

One byte can hold:
- A number from 0 to 255
- A single text character (in ASCII)
- A small part of a larger piece of data

## Larger Units

- 1 Kilobyte (KB) = 1,024 bytes
- 1 Megabyte (MB) = 1,024 KB ≈ 1 million bytes
- 1 Gigabyte (GB) = 1,024 MB ≈ 1 billion bytes
- 1 Terabyte (TB) = 1,024 GB ≈ 1 trillion bytes

## Real Examples

- A text character: 1 byte
- A page of text: ~2 KB
- An MP3 song: ~4 MB
- An HD movie: ~4 GB
- A modern SSD: 500 GB - 2 TB

## Bits vs Bytes

Network speeds are often in bits per second (Mbps).
Storage is measured in bytes.

This causes confusion: 100 Mbps internet ≈ 12.5 MB/s actual download speed. Divide by 8.`,
        category: 'fundamentals',
        level: 2,
        connections: ['encoding', 'data-types']
    },
    {
        id: 'fetch-decode-execute',
        title: 'Fetch-Decode-Execute Cycle',
        excerpt: 'The heartbeat of the CPU. Get instruction, figure out what it means, do it. Repeat billions of times.',
        content: `Every CPU follows the same fundamental cycle. It's the heartbeat of computation, happening billions of times per second.

## The Cycle

### 1. Fetch
The CPU looks at the "program counter" register to find the address of the next instruction. It reads that instruction from memory.

### 2. Decode
The instruction is just a binary number. The CPU's control unit figures out what operation it represents:
- What type of operation? (add, move, compare, jump?)
- What data does it need?
- Where should the result go?

### 3. Execute
The CPU actually does the operation:
- The ALU might perform arithmetic
- Data might be moved between registers
- A comparison result might be stored

### 4. Repeat
The program counter is updated (usually just +1, unless there was a jump), and the cycle starts again.

## One Cycle, One Tick

Each cycle takes one "clock tick." A 3 GHz CPU ticks 3 billion times per second, potentially doing 3 billion operations.

## Pipelining

Modern CPUs overlap these stages: while one instruction executes, the next is being decoded, and the one after that is being fetched. Like an assembly line, this dramatically increases throughput.`,
        category: 'hardware',
        level: 2,
        connections: ['instruction-set', 'pipelining', 'registers']
    },
    {
        id: 'ram',
        title: 'RAM: Fast but Forgetful',
        excerpt: 'Random Access Memory is quick but loses everything when power goes off. Your computer\'s short-term memory.',
        content: `RAM (Random Access Memory) is your computer's working memory—fast enough to keep up with the CPU, but it forgets everything when you turn off the power.

## Why "Random Access"?

Unlike a tape (which must be read sequentially), RAM can access any location instantly. Want byte #1,000,000? Just ask for it directly. No rewinding.

## Speed

RAM is fast:
- Access time: ~10-20 nanoseconds
- Bandwidth: 20-50 GB/second

But still way slower than the CPU, which is why cache exists.

## Volatility

RAM needs constant power to remember. The moment electricity stops, everything vanishes. This is why you lose unsaved work when your computer crashes.

## Capacity

Modern computers have 8-64 GB of RAM. This holds:
- The operating system
- Running applications
- Data being actively worked on
- File caches

## How It Works

RAM stores data in capacitors—tiny components that hold electrical charge. A charged capacitor = 1, discharged = 0. These capacitors slowly leak, so RAM must constantly "refresh" itself, reading and rewriting data thousands of times per second.`,
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
        content: `Everything digital comes down to transistors—microscopic switches that form the physical foundation of computing.

## What Is a Transistor?

A transistor is an electronic switch with three connections:
- Source: where current can come from
- Drain: where current can go
- Gate: controls whether current flows

Apply voltage to the gate, and current flows from source to drain. Remove it, and current stops. On and off. 1 and 0.

## Size

Modern transistors are incredibly small:
- 1970s: ~10,000 nanometers
- 2000s: ~100 nanometers
- Today: 3-7 nanometers

For reference, a human hair is about 80,000 nanometers wide. You could fit tens of thousands of modern transistors across one hair.

## Scale

A modern CPU contains:
- 10-100 billion transistors
- On a chip smaller than your fingernail
- Each switching billions of times per second

## Moore's Law

For decades, transistor counts doubled roughly every two years. This exponential growth drove the computer revolution. It's slowing now as we approach physical limits—atoms themselves.

## Making Logic

Combine transistors to make logic gates:
- 2 transistors = NOT gate
- 4 transistors = NAND gate
- From NAND, you can build anything`,
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
        content: `Cache is the CPU's secret weapon against slow memory. It's a small amount of very fast memory that keeps frequently-used data close at hand.

## The Problem

RAM is too slow. When the CPU needs data from RAM, it might wait 100+ cycles. That's 100 cycles of doing nothing.

## The Solution

Keep copies of recently-used data in faster memory closer to the CPU. When the CPU needs data, check the cache first. If it's there (a "cache hit"), you save those 100 cycles.

## Cache Levels

Modern CPUs have multiple cache levels:

### L1 Cache
- Smallest (~64 KB)
- Fastest (~4 cycles)
- Closest to CPU core
- Split into instruction and data cache

### L2 Cache
- Larger (~256 KB - 1 MB)
- Slower (~12 cycles)
- Per-core

### L3 Cache
- Largest (~8-64 MB)
- Slowest cache (~40 cycles)
- Shared between all cores

## Why It Works

Programs tend to access the same data repeatedly (temporal locality) and access nearby data (spatial locality). Cache exploits these patterns.

When you access memory, the CPU loads not just that byte but a whole "cache line" (64 bytes typically). If you need nearby data soon, it's already cached.`,
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
        content: `The operating system (OS) is the software that makes your computer usable. It sits between your applications and the hardware, managing everything.

## Core Jobs

### Process Management
Running multiple programs at once. The OS switches between them so fast it seems simultaneous.

### Memory Management
Deciding which programs get which memory. Protecting programs from each other. Creating the illusion of infinite memory.

### File Systems
Organizing data on storage. Creating the abstraction of files and folders.

### I/O Management
Handling all the devices: keyboard, screen, network, storage. Providing consistent interfaces.

### Security
Controlling what programs can do. Preventing unauthorized access.

## The Kernel

The kernel is the core of the OS—the part that runs with full hardware access. It's always in memory, always running. Everything else (apps, even parts of the OS) asks the kernel for help via "system calls."

## Examples

- Windows, macOS, Linux (desktop)
- iOS, Android (mobile)
- They all do the same basic jobs, with different tradeoffs and interfaces`,
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
        content: post.content,
        category: post.category,
        connections: post.connections
    }))

    const links = []
    blogPosts.forEach(post => {
        post.connections?.forEach(targetId => {
            if (blogPosts.find(p => p.id === targetId)) {
                links.push({ source: post.id, target: targetId })
            }
        })
    })

    return { nodes, links }
}
