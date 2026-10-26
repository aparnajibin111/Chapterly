export const RESOURCES: [name: string, url: string, note: string][] = [
  [
    'Learn OpenUSD (NVIDIA)',
    'https://www.nvidia.com/en-us/learn/learning-path/openusd/',
    'Main OpenUSD curriculum: scene structure, composition and workflows.',
  ],
  [
    'OpenUSD documentation',
    'https://openusd.org/release/index.html',
    'Reference for USD concepts and the Python / C++ API.',
  ],
  [
    'Omniverse documentation',
    'https://docs.omniverse.nvidia.com/',
    'Kit apps and extensions. Follow the docs for the SDK version you install.',
  ],
  [
    'Isaac Sim documentation',
    'https://docs.isaacsim.omniverse.nvidia.com/',
    'Robot assets, physics, sensors. Check system requirements first.',
  ],
  [
    'Isaac Lab',
    'https://isaac-sim.github.io/IsaacLab/',
    'Robot learning framework built on Isaac Sim.',
  ],
  ['NVIDIA Warp', 'https://nvidia.github.io/warp/', 'GPU simulation kernels in Python.'],
  [
    'CUDA C++ Programming Guide',
    'https://docs.nvidia.com/cuda/cuda-c-programming-guide/',
    'The official CUDA reference.',
  ],
  [
    'NVIDIA Deep Learning Institute',
    'https://www.nvidia.com/en-us/training/',
    'Official courses and certifications.',
  ],
  [
    'LearnCpp',
    'https://www.learncpp.com/',
    'Structured C++ lessons. Covers almost every Stage 1 concept.',
  ],
  ['cppreference', 'https://en.cppreference.com/', 'The C++ standard library reference.'],
  ['CP-Algorithms', 'https://cp-algorithms.com/', 'Detailed algorithm explanations.'],
  ['VisuAlgo', 'https://visualgo.net/', 'Visual explanations of data structures and algorithms.'],
  [
    'LeetCode',
    'https://leetcode.com/',
    'Coding practice. Every problem in this syllabus links to its search.',
  ],
];

export const TARGETS: [period: string, target: string, from: number, to: number][] = [
  ['Weeks 1–4', '10–15 small exercises', 1, 4],
  ['Weeks 5–8', '25–35 DSA problems', 5, 8],
  ['Weeks 9–12', '25–35 DSA problems', 9, 12],
  ['Weeks 13–20', '2–3 problems a week', 13, 20],
  ['Weeks 21–36', '3–5 a week + timed practice', 21, 36],
];

export const PATTERNS =
  'Two pointers · Sliding window · Prefix sums · Binary search on answer · Fast/slow pointers · Monotonic stack · Monotonic deque · Hash map counting · Intervals and sweep line · Tree DFS · Tree BFS · Backtracking · Top-K with heaps · Two heaps · K-way merge · Graph BFS/DFS · Topological sort · Union-find · Dijkstra · Greedy · 1D DP · 2D DP · Knapsack · Bit masks · Trie';

export const CAPSTONE_LAYERS: [color: string, title: string, detail: string][] = [
  ['--t-usd', 'OpenUSD scene assets', 'Layers · references · variants · metadata'],
  ['--t-cpp', 'C++ / Python validation engine', 'Rules · diagnostics · automated tests'],
  ['--t-ov', 'Omniverse / simulation integration', 'Scene inspection · test scenarios · results'],
  ['--t-car', 'Reproducible engineering report', 'Failures · benchmarks · limitations · evidence'],
];

export const MILESTONES: [week: number, name: string, detail: string][] = [
  [19, 'SENTINEL-X v1', 'USD validator with tests'],
  [23, 'SENTINEL-X v2', 'Omniverse extension + demo'],
  [27, 'Simulation test runner', 'Reproducible robot scenarios'],
  [34, 'Reliability Lab', 'End-to-end pipeline + evaluation'],
];
