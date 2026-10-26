// The NVIDIA Engineering Mastery course. Each week's `c` holds one concept group per
// line, written as "Group| concept; concept; …". A group whose name ends in "(added)"
// filled a gap in the original plan. `p` lists must-solve practice problems.

export type TrackKey = 'cpp' | 'dsa' | 'py' | 'usd' | 'ov' | 'sim' | 'eng' | 'car' | 'x';
export interface RawWeek {
  no: number | string;
  t: string;
  build: string;
  c: string;
  p?: string;
}
export interface RawStage {
  n: number | string;
  t: string;
  track: TrackKey;
  hrs: number;
  deliv: string;
  added?: boolean;
  weeks: RawWeek[];
}

export const TRACK: Record<TrackKey, [string, string]> = {
  cpp: ['C++', '--t-cpp'],
  dsa: ['Algorithms', '--t-dsa'],
  py: ['Python', '--t-py'],
  usd: ['OpenUSD', '--t-usd'],
  ov: ['Omniverse', '--t-ov'],
  sim: ['Simulation', '--t-sim'],
  eng: ['Engineering', '--t-eng'],
  car: ['Career', '--t-car'],
  x: ['NVIDIA essentials', '--t-x'],
};
export const STAGES: RawStage[] = [
  {
    n: 1,
    t: 'C++ programming foundations',
    track: 'cpp',
    hrs: 56,
    deliv: 'A tested C++ command-line application, split into multiple files and built with CMake.',
    weeks: [
      {
        no: 1,
        t: 'C++ setup and syntax',
        build: 'Unit converter and input validator.',
        c: `
Toolchain| What compiling and linking do; Preprocessor, compiler and linker stages; Install GCC/Clang or MSVC; Editor setup: VS Code or Visual Studio with CMake; Compiler warnings: -Wall -Wextra -Werror; C++ standards (C++17, C++20) and the -std flag; main() and process exit codes
Variables and types| Statements, expressions and comments; Declaration, initialisation (brace init) and assignment; Fundamental types: int, char, bool, float, double; Integer sizes, signed vs unsigned; Integer overflow; Floating-point precision and safe comparison; Literals, suffixes and auto; const and constexpr basics; Implicit conversions and static_cast
Operators| Arithmetic, integer division and modulo; Comparison and logical operators; Short-circuit evaluation; Increment, decrement and compound assignment; Operator precedence and associativity; Bitwise operators (first look)
Input and output| std::cout and std::cin; std::getline and mixing it with cin; Detecting bad input and clearing cin; Formatting output with iomanip or std::format
Control flow| if / else if / else; switch and fallthrough; while and do-while; for and range-based for; break and continue; Nested loops; Block scope
Git from day one (added)| git init, add, commit, log; Branches and merging; Pushing to GitHub; .gitignore for build folders`,
      },
      {
        no: 2,
        t: 'Functions and data',
        build: 'Text statistics tool with edge-case tests.',
        c: `
Functions| Declaration vs definition; Parameters, arguments and return values; Pass by value, by reference and by const reference; Default arguments; Function overloading; Recursion basics; Header placement and inline; What undefined behaviour is
Scope and lifetime| Local, global and static local variables; Namespaces and using declarations; Storage duration and object lifetime
Arrays and strings| C-style arrays and array decay; std::array; std::vector: push_back, size, capacity, reserve; std::string: concatenation, substr, find; std::string_view; Character handling with <cctype>
Pointers and references| Addresses, & and *; nullptr; Pointer arithmetic; References vs pointers; Pointer to const vs const pointer; Dangling pointers and references
Testing basics| assert; Edge cases: empty, single item, very large input; A tiny hand-written test harness`,
      },
      {
        no: 3,
        t: 'Object-oriented C++',
        build: '3D asset inventory using classes.',
        c: `
Classes| struct vs class; Member variables and member functions; public, private, protected; Constructors and member initialiser lists; Destructors; The this pointer; const member functions; static members; friend functions and classes
Copying and special members| Copy constructor and copy assignment; Shallow vs deep copy; Rule of 0, 3 and 5; = default and = delete
Operator overloading| Arithmetic and comparison operators; Stream operator <<; Three-way comparison <=> (C++20)
Inheritance and polymorphism| Base and derived classes; Virtual functions and override; Pure virtual functions and abstract classes; Virtual destructors; How a vtable works; Object slicing; final; Composition vs inheritance
Small but essential| enum class; Structured bindings; Aggregate initialisation`,
      },
      {
        no: 4,
        t: 'Memory and build systems',
        build: 'Multi-file C++ application with unit tests.',
        c: `
Memory| Stack vs heap; new and delete, and why to avoid raw ownership; Memory leaks; RAII; std::unique_ptr and make_unique; std::shared_ptr and weak_ptr; Reference cycles; Ownership semantics in function signatures
Const correctness| const parameters, methods and return values; mutable
Standard library| Container overview: vector, deque, list, set, map, unordered_map, unordered_set; Iterators and iterator invalidation; Algorithms: sort, find, count, transform, accumulate; Erase-remove idiom; Lambdas and captures; std::function; std::optional, std::pair, std::tuple, std::variant
Errors| Exceptions: throw, try, catch; Exception safety levels; noexcept; Exceptions vs error codes vs std::expected
Building| Header/source split; Include guards and #pragma once; One Definition Rule; Translation units and linker errors; Static vs shared libraries; CMake: project, add_executable, add_library; CMake: target_link_libraries, target_include_directories; Debug vs Release builds
Debugging and tests| Debugger: breakpoints, stepping, watches, call stack; Reading long compiler errors; AddressSanitizer and UBSan (added); Unit tests with GoogleTest or Catch2; CTest; clang-format and clang-tidy (added)`,
      },
    ],
  },

  {
    n: 2,
    t: 'Algorithms and data structures I',
    track: 'dsa',
    hrs: 56,
    deliv: 'A C++ algorithms library with tests and complexity analysis for every implementation.',
    weeks: [
      {
        no: 5,
        t: 'Complexity and arrays',
        build: 'Array algorithms with complexity notes.',
        c: `
Complexity| Big-O, Big-Omega and Big-Theta; Best, average and worst case; Time vs space complexity; Growth classes: 1, log n, n, n log n, n², 2ⁿ, n!; Analysing loops and nested loops; Recursion complexity and recurrences; Master theorem (intuition); Amortised cost (vector growth); Input limits to target complexity (n = 10⁵ means n log n)
Arrays| Static vs dynamic arrays; Cost of access, insert and delete; In-place algorithms; 2D arrays and matrix traversal; Matrix rotation and spiral order
Strings| Character frequency counting; Palindrome checks; Anagram checks; Cost of building strings in a loop
Prefix sums| 1D prefix sums; 2D prefix sums; Difference arrays; Prefix sum + hash map for subarray sums; Kadane's algorithm (maximum subarray)
Maths for coding (added)| GCD and LCM (Euclid); Sieve of Eratosthenes; Modular arithmetic; Fast exponentiation`,
        p: `Contains Duplicate; Two Sum (brute force first); Best Time to Buy and Sell Stock; Maximum Subarray; Product of Array Except Self; Range Sum Query - Immutable; Subarray Sum Equals K; Rotate Image; Spiral Matrix; Valid Anagram; Valid Palindrome; Move Zeroes`,
      },
      {
        no: 6,
        t: 'Searching and sorting',
        build: 'Search/sort library with tests.',
        c: `
Searching| Linear search; Binary search on a sorted array; Lower bound and upper bound; Binary search on the answer; Search in a rotated array; std::lower_bound, upper_bound, binary_search; Loop invariants and off-by-one errors
Sorting| Bubble, selection and insertion sort; Merge sort; Quick sort and partitioning (Lomuto, Hoare); Heap sort; Counting, radix and bucket sort; Stable vs unstable sorting; The n log n lower bound for comparison sorts; std::sort, std::stable_sort and custom comparators; Quickselect for the k-th element
Two pointers| Pointers from both ends; Fast and slow pointers in an array; Merging two sorted arrays; Dutch national flag partition`,
        p: `Binary Search; Search Insert Position; First Bad Version; Find Minimum in Rotated Sorted Array; Search in Rotated Sorted Array; Koko Eating Bananas; Merge Sorted Array; Sort Colors; 3Sum; Container With Most Water; Kth Largest Element in an Array; Sort an Array (write merge sort and quick sort)`,
      },
      {
        no: 7,
        t: 'Linked structures',
        build: 'Undo history and task queue.',
        c: `
Linked lists| Singly linked list from scratch; Doubly linked list; Circular lists; Insert, delete and reverse; Dummy head node; Floyd's cycle detection; Finding the middle node; Merging two sorted lists; Ownership of nodes in C++
Stacks| Array vs linked implementation; Balanced brackets; Monotonic stack; Evaluating postfix expressions; Min stack; Recursion and the call stack
Queues| Queue and circular buffer; Deque; Monotonic deque (sliding window maximum); Queue built from two stacks; std::stack, std::queue, std::deque
Choosing a structure| Access / insert / delete cost table; Cache locality: why vector usually wins`,
        p: `Reverse Linked List; Merge Two Sorted Lists; Linked List Cycle; Middle of the Linked List; Remove Nth Node From End of List; Reorder List; Valid Parentheses; Min Stack; Evaluate Reverse Polish Notation; Daily Temperatures; Implement Queue using Stacks; Sliding Window Maximum; LRU Cache`,
      },
      {
        no: 8,
        t: 'Hashing and windows',
        build: 'Log analyzer with fast lookups.',
        c: `
Hashing| Hash functions; Collisions: chaining vs open addressing; Load factor and rehashing; std::unordered_map and unordered_set; std::map vs std::unordered_map (tree vs hash); Custom hash for your own structs; Frequency counting; Rolling hash (Rabin–Karp)
Sliding window| Fixed-size window; Variable-size window; Window with a count map; "At most K" to "exactly K" trick
Intervals| Sorting by start; Merging intervals; Inserting an interval; Sweep line and overlap counting; Meeting-rooms pattern`,
        p: `Two Sum; Group Anagrams; Top K Frequent Elements; Longest Consecutive Sequence; Longest Substring Without Repeating Characters; Longest Repeating Character Replacement; Permutation in String; Find All Anagrams in a String; Minimum Window Substring; Merge Intervals; Insert Interval; Non-overlapping Intervals; Meeting Rooms II`,
      },
    ],
  },

  {
    n: 3,
    t: 'Algorithms and data structures II',
    track: 'dsa',
    hrs: 56,
    deliv:
      'Solve and explain a curated set of problems independently, including edge cases and complexity.',
    weeks: [
      {
        no: 9,
        t: 'Recursion and trees',
        build: 'Scene hierarchy traversal model.',
        c: `
Recursion and backtracking| Base case and recursive case; Drawing the recursion tree; Memoisation (first look); The backtracking template; Generating subsets; Generating permutations; Generating combinations
Binary trees| Root, leaf, depth, height; Building a binary tree in C++; Preorder, inorder, postorder (recursive); Iterative traversals with a stack; Level-order traversal (BFS); Height, diameter and balance checks; Lowest common ancestor; Building a tree from traversals; Serialise and deserialise a tree
Binary search trees| BST property and invariants; Search, insert and delete; Inorder traversal gives sorted order; Validating a BST; Balanced trees (AVL, red-black) and how std::map uses them; k-th smallest element
Scene graphs (added)| N-ary trees; How USD prim hierarchies are trees`,
        p: `Maximum Depth of Binary Tree; Invert Binary Tree; Same Tree; Subtree of Another Tree; Diameter of Binary Tree; Binary Tree Level Order Traversal; Validate Binary Search Tree; Lowest Common Ancestor of a Binary Search Tree; Kth Smallest Element in a BST; Construct Binary Tree from Preorder and Inorder Traversal; Serialize and Deserialize Binary Tree; Subsets; Permutations; Combination Sum`,
      },
      {
        no: 10,
        t: 'Heaps and priority queues',
        build: 'Priority-based simulation event queue.',
        c: `
Heaps| A complete binary tree stored in an array; Sift up and sift down; Build-heap in O(n); Min-heap vs max-heap; std::priority_queue with a custom comparator; Heap sort
Heap patterns| Top-K elements; K-way merge; Two heaps for a running median; Scheduling by priority or time; Lazy deletion
Event simulation| Discrete-event simulation loop; Ordering ties deterministically`,
        p: `Kth Largest Element in a Stream; Last Stone Weight; K Closest Points to Origin; Top K Frequent Words; Merge k Sorted Lists; Find Median from Data Stream; Task Scheduler; Reorganize String`,
      },
      {
        no: 11,
        t: 'Graph algorithms',
        build: 'Dependency graph validator.',
        c: `
Representation| Vertices and edges; Directed, undirected and weighted graphs; Adjacency list vs adjacency matrix vs edge list; Grids as implicit graphs
Traversal| BFS and shortest paths in unweighted graphs; DFS, recursive and iterative; Connected components; Visit states (unvisited, in progress, done); Flood fill; Multi-source BFS
Directed acyclic graphs| Topological sort with Kahn's algorithm; Topological sort with DFS; Cycle detection in directed graphs; Cycle detection in undirected graphs; Dependency resolution
Colouring| Bipartite check (two-colouring)`,
        p: `Flood Fill; Number of Islands; Max Area of Island; Clone Graph; Rotting Oranges; Pacific Atlantic Water Flow; Course Schedule; Course Schedule II; Number of Connected Components in an Undirected Graph; Graph Valid Tree; Is Graph Bipartite?; Word Ladder`,
      },
      {
        no: 12,
        t: 'Advanced problem solving',
        build: 'Shortest-path and scheduling utilities.',
        c: `
Shortest paths| Dijkstra with a priority queue; Bellman–Ford and negative edges; Floyd–Warshall; 0-1 BFS; A* search (used in robot path planning)
Spanning trees and DSU| Disjoint-set union; Path compression and union by rank; Kruskal's algorithm; Prim's algorithm
Greedy| Greedy-choice property; Interval scheduling; Proving greedy with an exchange argument
Dynamic programming| Overlapping subproblems and optimal substructure; Top-down memoisation vs bottom-up tables; 1D DP: climbing stairs, house robber; 2D DP: grid paths; Longest common subsequence; Edit distance; 0/1 and unbounded knapsack; Longest increasing subsequence in n log n; Reducing DP memory
Backtracking deeper| N-Queens and Sudoku; Pruning the search
Bit manipulation| Binary representation and two's complement; AND, OR, XOR tricks; Bit masks to enumerate subsets; Counting set bits
Tries| Trie insert, search and prefix search; Word search with a trie
Range queries (added)| Fenwick tree (binary indexed tree); Segment tree
String algorithms (added)| KMP prefix function; Z-function
Interview method (added)| Clarify the problem and constraints; Work small examples by hand; State the brute force first; Optimise and justify; Code cleanly, then test edge cases aloud; State time and space complexity`,
        p: `Network Delay Time; Cheapest Flights Within K Stops; Min Cost to Connect All Points; Redundant Connection; Jump Game; Gas Station; Climbing Stairs; House Robber; Coin Change; Unique Paths; Longest Increasing Subsequence; Longest Common Subsequence; Edit Distance; Partition Equal Subset Sum; Word Break; Implement Trie (Prefix Tree); Word Search II; N-Queens; Single Number; Counting Bits; Range Sum Query - Mutable`,
      },
    ],
  },

  {
    n: 4,
    t: 'Python engineering and software quality',
    track: 'py',
    hrs: 42,
    deliv: 'A Python automation package with meaningful tests, structured logs and a CI pipeline.',
    weeks: [
      {
        no: 13,
        t: 'Python engineering',
        build: 'Command-line asset manifest checker.',
        c: `
Language core| Python 3 install, venv and pip; Everything is an object; Mutable vs immutable types; Lists, tuples, dicts and sets, and their costs; Comprehensions; Slicing; Unpacking, *args and **kwargs; f-strings; Truthiness and None
Functions and classes| First-class functions and closures; LEGB scope rule; Classes, __init__ and self; Inheritance and super(); Dunder methods: __repr__, __eq__, __iter__, __len__; @property; dataclasses; Enums
Typing| Type hints; Checking with mypy or pyright; Optional, Union, TypedDict, Protocol
Errors| Exceptions and custom exception classes; try / except / else / finally; EAFP vs LBYL
Files and CLI| pathlib; Reading and writing text and JSON; CSV files; argparse command-line interfaces`,
      },
      {
        no: 14,
        t: 'Testing and tooling',
        build: 'Automated test workflow.',
        c: `
Testing| pytest basics; Fixtures; Parametrised tests; Mocking with unittest.mock and monkeypatch; Coverage with coverage.py; Unit vs integration vs end-to-end tests; Test-driven development loop
Git in a team| Branching strategies; Rebase vs merge; Pull requests and code review; Resolving merge conflicts; git bisect
Linux| Navigating the shell, pipes, grep, find; File permissions; Environment variables and PATH; Processes: ps, top, kill; SSH; WSL2 on Windows
Continuous integration| GitHub Actions workflows; Running tests and linters in CI; Ruff or Black; pre-commit hooks`,
      },
      {
        no: 15,
        t: 'Python quality and performance',
        build: 'Reusable Python automation package.',
        c: `
Advanced Python| The iterator protocol; Generators and yield; Decorators; Context managers and contextlib; itertools; functools: lru_cache, partial; collections: deque, Counter, defaultdict
Runtime| The GIL; threading vs multiprocessing vs asyncio; subprocess; logging: levels, handlers, structured logs
Performance| cProfile and timeit; NumPy vectorisation basics; Memory: __slots__ and generators
Packaging| pyproject.toml; src/ package layout; Console-script entry points; Semantic versioning; Building wheels
Python and C++ together (added)| pybind11 basics; How USD's Python modules wrap its C++ core`,
      },
    ],
  },

  {
    n: 5,
    t: 'OpenUSD mastery',
    track: 'usd',
    hrs: 56,
    deliv:
      'SENTINEL-X v1: a configurable OpenUSD scene validator with documented rules and automated tests.',
    weeks: [
      {
        no: 16,
        t: 'USD basics',
        build: 'USD scene inventory script.',
        c: `
Core concepts| What OpenUSD is and why it exists; File formats: .usda, .usdc, .usdz; Stage; Layers and the root layer; Prims and prim paths (Sdf.Path); Common prim types: Xform, Mesh, Scope, Camera, lights; Specifiers: def, over, class; Attributes, value types and time samples; Relationships; Property namespaces (primvars:, xformOp:); Prim metadata: kind, active, hidden, doc
Schemas| Typed (IsA) schemas; Applied API schemas; Schema domains: UsdGeom, UsdLux, UsdShade, UsdPhysics; Model hierarchy and kind: component, assembly, group
Python API and tools| Installing usd-core; Usd.Stage.CreateNew and Open; DefinePrim, GetAttribute, Set and Get; Traversal with Traverse and PrimRange; usdview; usdcat, usdtree and usdchecker
Unity to USD (added)| Scene → stage; GameObject → prim; Prefab → reference; Component → schema; Transform → xformOps`,
      },
      {
        no: 17,
        t: 'USD composition',
        build: 'Reusable scene assembled from referenced assets.',
        c: `
Layers| Sublayers and the layer stack; Opinion strength; Edit targets; Session layer; Anonymous layers
Composition arcs| LIVRPS strength order; Local opinions; Inherits and class prims; Variant sets and variant selections; References, external and internal; Payloads and load / unload; Specializes
Instancing| Scene-graph instancing and prototypes; Point instancers
Asset resolution| Asset paths and the asset resolver (Ar); Search paths and relative paths
Debugging composition| Prim stacks and PrimCompositionQuery; Common composition errors
Asset structure| Asset layout guidelines: geometry, materials, payload layers; Designing a clean namespace`,
      },
      {
        no: 18,
        t: 'Transforms and metadata',
        build: 'Rule engine with configurable checks.',
        c: `
Transforms| xformOps: translate, rotate, scale, orient, transform; xformOpOrder; Local vs world transforms (ComputeLocalToWorldTransform); Pivots; Gf math types: GfVec3f, GfMatrix4d, GfQuatf
Stage settings| metersPerUnit; upAxis: Y vs Z; timeCodesPerSecond and start / end time
Geometry| Mesh points, face vertex counts and indices; Normals and primvar interpolation; Extents and BBoxCache; Purpose: render, proxy, guide; Visibility
Materials (added)| UsdShade Material, Shader and binding; UsdPreviewSurface; MaterialX and MDL in Omniverse
Custom data and policy| customData and assetInfo; Custom attributes and namespacing; Designing a validation rule: check, severity, suggested fix`,
      },
      {
        no: 19,
        t: 'OpenUSD testing',
        build: 'SENTINEL-X v1 release.',
        c: `
Validation| usdchecker and its compliance rules; Writing your own validators; Severity levels: error, warning, info; Suggested auto-fixes
Robustness| Malformed and broken files; Missing references and assets; Deterministic output ordering; Golden-file tests
Performance| Cost of traversing large stages; Sdf-level vs Usd-level edits and Sdf.ChangeBlock; Population masks and load rules; Profiling a validator run
USD from C++ (added)| C++ API equivalents: UsdStage, UsdPrim, UsdAttribute; Building USD from source (awareness)
Certification (added)| Check NVIDIA's current OpenUSD certification and its exam topics`,
      },
    ],
  },

  {
    n: 6,
    t: 'Omniverse application development',
    track: 'ov',
    hrs: 56,
    deliv: 'A Scene Inspector extension that brings SENTINEL-X checks into an Omniverse workflow.',
    weeks: [
      {
        no: 20,
        t: 'Kit and SDK orientation',
        build: 'Minimal working extension or SDK sample.',
        c: `
The platform| What Omniverse is: SDKs and APIs built on OpenUSD and RTX; Kit SDK; Apps vs extensions vs services; USD Composer and Isaac Sim as Kit apps; System requirements: RTX GPU and drivers
Getting started (added)| Kit App Template; Pinning the Kit version you build against
Extensions| Extension folder structure; extension.toml: dependencies and Python modules; omni.ext.IExt: on_startup and on_shutdown; Extension Manager and hot reload; Extension search paths and registries
APIs| Getting the stage with omni.usd.get_context(); carb settings and logging; Script Editor for quick experiments; Finding things in the API docs
Collaboration (added)| Nucleus and live layers: check their current status in the docs`,
      },
      {
        no: 21,
        t: 'Extension interaction',
        build: 'Scene inspection interface.',
        c: `
User interface| omni.ui: Window, Frame, VStack, HStack; Widgets: Label, Button, StringField, TreeView; Models: SimpleStringModel and AbstractItemModel; Styling widgets; Viewport overlays (awareness)
Commands| omni.kit.commands: execute and undo; Writing a custom command; Grouping undo steps
Events| Stage events: opened, closed, selection changed; USD change notices (Tf.Notice ObjectsChanged); Update-loop subscriptions; Selection API
OmniGraph (added)| Action Graph vs Push Graph; Nodes, attributes and execution; Writing a Python OmniGraph node`,
      },
      {
        no: 22,
        t: 'USD validation integration',
        build: 'Integrated scene auditor.',
        c: `
Integration| Running rules on the open stage; asyncio tasks in Kit so the UI never freezes; Showing results in a TreeView with severity icons; Clicking a result selects and frames the prim; Exporting JSON and HTML reports; Saving user settings with carb.settings
Built-in validation (added)| Omniverse Asset Validator; Plugging in your own rules`,
      },
      {
        no: 23,
        t: 'Extension reliability',
        build: 'SENTINEL-X v2 demo and documentation.',
        c: `
Testing| omni.kit.test async tests; UI tests with omni.kit.ui_test; Running tests headless in CI
Packaging| Versioning and changelog; Publishing an extension; Compatibility across Kit versions
Quality| Error states and empty states; Choosing log levels; Keeping per-frame work light; Demo script and user documentation`,
      },
    ],
  },

  {
    n: 7,
    t: 'Simulation and robotics fundamentals',
    track: 'sim',
    hrs: 56,
    deliv:
      'A robot simulation test suite with reproducible scenarios and machine-readable results.',
    weeks: [
      {
        no: 24,
        t: 'Simulation setup',
        build: 'Documented robot scene.',
        c: `
Isaac Sim| Installation and system requirements; The interface: stage, properties, physics menus; Standalone Python scripts vs extension workflow; SimulationApp and World
Physics| PhysX in Omniverse; Rigid bodies, mass and inertia; Colliders: convex hull, convex decomposition, SDF, triangle mesh; Physics materials: friction and restitution; Physics scene: gravity, time step, solver iterations
Robots| Importing URDF and MJCF (added: check joint limits and masses after import); Articulations and the articulation root; Joints: revolute, prismatic, fixed; Joint drives: stiffness, damping, position and velocity targets; Joint limits`,
      },
      {
        no: 25,
        t: 'Math for simulation',
        build: 'Transform and collision test utilities.',
        c: `
Linear algebra| Vectors, dot and cross products; Matrices: multiply, transpose, inverse; Homogeneous coordinates and 4×4 transforms; Rotation matrices; Coordinate frames, handedness, Y-up vs Z-up
Rotations (added)| Quaternions and slerp; Euler angles, rotation order and gimbal lock
Kinematics| Forward kinematics; Inverse kinematics (introduction); The Jacobian (intuition); Linear and angular velocity
Dynamics| Newton's laws and F = ma; Explicit and semi-implicit Euler integration; Time-step size and stability
Collision| Bounding volumes: AABB, OBB, sphere; Broad phase vs narrow phase; Contact points and penetration depth`,
      },
      {
        no: 26,
        t: 'Sensors and scenarios',
        build: 'Small labelled scenario dataset.',
        c: `
Sensors| Camera intrinsics, extrinsics and field of view; Depth images and point clouds; Lidar; IMU; Contact sensors; Sensor noise models
Synthetic data (added)| Omniverse Replicator; Domain randomisation: lighting, textures, poses; Annotators: RGB, depth, segmentation, bounding boxes; Writers and output formats (COCO, KITTI); Labelling and train / validation / test splits`,
      },
      {
        no: 27,
        t: 'Automated simulation',
        build: 'Simulation test runner and reports.',
        c: `
Experiment control| Headless runs; Fixed random seeds; Parameter sweeps from config files; Capturing metrics to JSON / CSV; Pass and fail criteria
ROS 2| Nodes, topics, publishers and subscribers; Messages and services; tf2 coordinate frames; Isaac Sim ROS 2 bridge; rviz2 basics
Robot learning (added)| Isaac Lab introduction; Reinforcement learning basics: state, action, reward, policy; The sim-to-real gap`,
      },
    ],
  },

  {
    n: 8,
    t: 'Advanced software engineering',
    track: 'eng',
    hrs: 56,
    deliv:
      'Refactor and benchmark a real component, explain the trade-offs, and prove the gain with repeatable measurements.',
    weeks: [
      {
        no: 28,
        t: 'Modern C++',
        build: 'Generic tested C++ utility library.',
        c: `
Templates| Function and class templates; Template argument deduction; Template specialisation; Variadic templates; Concepts and requires (C++20); SFINAE (awareness)
Move semantics| lvalues and rvalues; Rvalue references; std::move and std::forward; Move constructor and move assignment; Copy elision and RVO
Modern library| Ranges (C++20); constexpr functions; std::span; std::chrono; Custom deleters for smart pointers
API design| Minimal includes and header hygiene; pImpl idiom; ABI stability (awareness); Const-correct interfaces; Documenting with Doxygen`,
      },
      {
        no: 29,
        t: 'Design and architecture',
        build: 'Refactor one project component.',
        c: `
Principles| Single responsibility; Open / closed; Liskov substitution; Interface segregation; Dependency inversion; DRY, KISS, YAGNI; Composition over inheritance; Dependency injection
Patterns| Factory; Builder; Strategy; Observer; Command (as used for undo in Kit); Visitor (for walking scene trees); Adapter and Facade; Singleton and why to avoid it
Architecture| Layered architecture; Plugin architectures like Kit extensions; Data-oriented design and ECS (compare Unity DOTS); Refactoring safely under tests`,
      },
      {
        no: 30,
        t: 'Concurrency and debugging',
        build: 'Thread-safe task processor or documented concurrency exercise.',
        c: `
Threads| std::thread, join and detach; Data races vs race conditions; std::mutex, lock_guard, unique_lock; Deadlocks and lock ordering; std::condition_variable; std::atomic and memory ordering (introduction); std::async, futures and promises; Thread pools and task queues; Producer–consumer pattern
Operating system| Processes vs threads; Context switching; Virtual memory and pages; IPC: pipes and shared memory
Debugging| ThreadSanitizer; gdb basics and core dumps; Valgrind and leak checking; strace and perf on Linux
GPU parallelism (added)| CPU threads vs GPU SIMT: what changes with 10,000 threads`,
      },
      {
        no: 31,
        t: 'Performance engineering',
        build: 'Benchmark report with reproducible baseline.',
        c: `
Hardware| CPU caches, cache lines and locality; Branch prediction; SIMD (awareness); Allocation cost, custom allocators and object pools
Measurement| Google Benchmark; Warm-up, variance and statistics; Profilers: perf, VTune, Visual Studio profiler; Nsight Systems timelines (added); Flame graphs
Optimisation| Algorithmic vs constant-factor gains; Avoiding copies and reserving capacity; Struct of arrays vs array of structs; Amdahl's law; When not to optimise`,
      },
    ],
  },

  {
    n: 9,
    t: 'Capstone and NVIDIA interview preparation',
    track: 'car',
    hrs: 70,
    deliv:
      'A portfolio-ready SENTINEL-X Simulation Reliability Lab, interview notes and an evidence-based application plan.',
    weeks: [
      {
        no: 32,
        t: 'Capstone architecture',
        build: 'SENTINEL-X system design and milestone plan.',
        c: `
Requirements| Functional vs non-functional requirements; User stories for pipeline engineers; Interfaces and module boundaries; Failure-mode analysis; Test strategy; Milestones
System design| Architecture diagrams (C4 model); Data formats and schemas; Config-driven design; Extensibility through rule plugins`,
      },
      {
        no: 33,
        t: 'Capstone implementation',
        build: 'End-to-end working pipeline.',
        c: `
Integration| USD rule engine + Kit UI + simulation runner; YAML / JSON experiment configs; One core library shared by CLI and extension; Logging and tracing across components
Delivery| Issues and milestones; Reviewing your own pull requests; CI for both C++ and Python`,
      },
      {
        no: 34,
        t: 'Reliability and evaluation',
        build: 'Evaluation results and known-issues report.',
        c: `
Testing| Regression tests with golden data; Scenario coverage matrix; Handling flaky tests; Reproducibility: versions, seeds, environment capture
Reporting| Metrics and charts; Known issues and limitations; Root-cause write-ups`,
      },
      {
        no: 35,
        t: 'Portfolio and interviews',
        build: 'Release candidate and mock interview.',
        c: `
Portfolio| README structure; Architecture diagram; 2–3 minute demo video; Publish three tutorials from this course on Chapterly (added)
Interview preparation| Behavioural answers with STAR stories; Project deep-dive practice; C++ quiz: memory, virtual functions, move semantics, UB; Timed DSA practice; System design: asset pipeline or validation service; Live debugging exercises`,
      },
      {
        no: 36,
        t: 'NVIDIA application sprint',
        build: 'Targeted resume, job tracker and application package.',
        c: `
Job search| Read live NVIDIA job descriptions for Omniverse, Isaac and USD roles in India; Gap analysis against the requirements; Resume tailored with measured results; LinkedIn profile and pinned GitHub repos; Job tracker; Mock interviews; Follow-up and offer negotiation basics
Networking (added)| Post your SENTINEL-X demo on LinkedIn; Ask Omniverse engineers for referrals; NVIDIA developer forums and GTC sessions`,
      },
    ],
  },

  {
    n: 'X',
    t: 'NVIDIA essentials (added)',
    track: 'x',
    hrs: 40,
    added: true,
    deliv:
      'Side lessons the original plan missed. Do each one alongside the stage named in its build line.',
    weeks: [
      {
        no: 'X1',
        t: 'Computer graphics fundamentals',
        build: 'Alongside Stage 1: draw the rendering pipeline from memory and explain each step.',
        c: `
Graphics| The rendering pipeline; Meshes, vertices, normals and UVs; Textures and sampling; Model, world, view and clip spaces; Shaders: vertex and fragment (pixel); Scene graphs; Rasterisation vs ray tracing`,
      },
      {
        no: 'X2',
        t: '3D math refresher',
        build: 'Alongside Stage 4: a small vector/matrix library with tests.',
        c: `
Math| Vector operations; Geometric meaning of dot and cross products; Matrices as transforms; Homogeneous coordinates; Coordinate systems and handedness; Trigonometry you actually need`,
      },
      {
        no: 'X3',
        t: 'GPU and CUDA fundamentals',
        build: 'Alongside Stage 8: CUDA vector-add plus a timing comparison with the CPU.',
        c: `
GPU architecture| Streaming multiprocessors, warps and CUDA cores; Tensor Cores and RT cores; Host vs device
CUDA programming| Kernels and __global__; Grids, blocks and threads: threadIdx, blockIdx, blockDim; cudaMalloc, cudaMemcpy and unified memory; Memory hierarchy: registers, shared, global; Memory coalescing; __syncthreads; Streams and asynchronous copies; Error checking
Tools| Nsight Compute; Thrust and CUB (awareness); CuPy for CUDA from Python`,
      },
      {
        no: 'X4',
        t: 'RTX rendering in Omniverse',
        build: 'Alongside Stage 6: one scene rendered in both modes, with notes.',
        c: `
Rendering| Real-time vs path-traced render modes; Lights: distant, dome, rect, sphere; Physically based materials, MDL and OmniPBR; Denoising and DLSS; Render settings vs performance; Cameras: focal length and exposure`,
      },
      {
        no: 'X5',
        t: 'NVIDIA Warp',
        build: 'Alongside Stage 7: a particle or cloth demo in Warp.',
        c: `
Warp| Warp kernels and wp.array; Launching on a CUDA device; Writing results to USD; Differentiable simulation (awareness)`,
      },
      {
        no: 'X6',
        t: 'Physical AI landscape',
        build: 'Alongside Stage 9: a one-page map of where your skills fit.',
        c: `
Landscape| Digital twins; Omniverse Blueprints; Cosmos world foundation models (awareness); Isaac GR00T humanoid platform (awareness); Check what is current on NVIDIA's developer site`,
      },
      {
        no: 'X7',
        t: 'Writing technical tutorials',
        build: 'Alongside Stage 1: a template you reuse every week.',
        c: `
Writing| Pick the audience and learning goal; Structure: concept, example, exercise; Code samples that actually run; Diagrams that explain one idea; Explaining trade-offs honestly; Editing for clarity`,
      },
    ],
  },
];
