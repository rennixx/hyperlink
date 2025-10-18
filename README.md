# 🌐 Hyperlink

A community-built web of interconnected human ideas.

## 🧭 Vision

The internet gave us access to information — but not connection between ideas.
Hyperlink aims to build the world's first collective mindmap, where users collaboratively link concepts, insights, and knowledge across all disciplines.

Instead of posting content for attention, people build meaning together.

## 🧩 MVP Features

- Submit concepts (ideas, theories, questions, quotes, terms, etc)
- Link concepts with defined relationships ("influences," "contradicts," "evolves from," "is example of," etc)
- Explore an interactive, expanding map that visually represents the collective web of connections

## 🧠 Core Principles

| Pillar | Description |
|--------|-------------|
| Open Knowledge | Everything is publicly viewable and linkable. No private ideas. |
| Collaborative Intellect | Knowledge isn't posted — it's built together. |
| Serendipity | Discovery feels like falling down an intelligent rabbit hole. |
| Minimal Ego | Focus on the idea, not the author. |
| Visual Thinking | Core experience is visual, spatial, and interactive. |

## 🛠️ Tech Stack

**Frontend:** React + TypeScript + Vite + React Flow + TailwindCSS

**Backend:** Node.js + Express + TypeScript + Prisma + PostgreSQL

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Quick Start

**1. Install backend dependencies:**
```bash
cd backend
npm install
```

**2. Set up database and seed sample data:**
```bash
npx prisma migrate dev
npm run seed
```

**3. Start backend server:**
```bash
npm run dev
```
Backend will run on [http://localhost:3000](http://localhost:3000)

**4. In a new terminal, install frontend dependencies:**
```bash
cd frontend
npm install
```

**5. Start frontend dev server:**
```bash
npm run dev
```
Frontend will run on [http://localhost:5173](http://localhost:5173)

**6. Open your browser and visit [http://localhost:5173](http://localhost:5173)**

You'll see a beautiful interactive graph with sample philosophical concepts already connected!

### What to Try

- Click and drag nodes to rearrange the graph
- Use mouse wheel to zoom in/out
- Click "Add Concept" to create new ideas
- Click "Link Concepts" to connect ideas with relationships
- Explore the mini-map in the bottom-right corner

## 📁 Project Structure

```
hyperlink/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── lib/             # API client
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main app component
│   └── package.json
├── backend/                  # Express + Prisma backend
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── types/           # TypeScript types
│   │   └── index.ts         # Server entry point
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Concepts
- `GET /api/concepts` - List all concepts (with optional filters)
- `GET /api/concepts/:id` - Get a single concept with relationships
- `POST /api/concepts` - Create a new concept
- `PATCH /api/concepts/:id` - Update a concept
- `DELETE /api/concepts/:id` - Delete a concept

### Relationships
- `GET /api/relationships` - List all relationships
- `GET /api/relationships/:id` - Get a single relationship
- `POST /api/relationships` - Create a new relationship
- `DELETE /api/relationships/:id` - Delete a relationship

### Graph
- `GET /api/graph` - Get the entire knowledge graph (nodes + edges)
- `GET /api/graph/stats` - Get graph statistics

## 🎨 Features Implemented

- ✅ Create and manage concepts (ideas, theories, questions, quotes, terms)
- ✅ Link concepts with semantic relationships
- ✅ Interactive graph visualization with React Flow
- ✅ Zoom, pan, and drag nodes
- ✅ Mini-map for navigation
- ✅ Real-time graph updates
- ✅ Color-coded concept types
- ✅ Modal forms for creating concepts and relationships
- ✅ SQLite database with Prisma ORM
- ✅ Type-safe API with Zod validation
- ✅ RESTful API architecture

## 🚧 Future Enhancements

- [ ] Search functionality
- [ ] Filter by concept type
- [ ] User authentication (optional)
- [ ] Concept voting/rating system
- [ ] Graph layout algorithms
- [ ] Export graph as image
- [ ] Concept history/versioning
- [ ] Mobile-responsive design
- [ ] Dark mode
- [ ] Keyboard shortcuts

## 🤝 Contributing

This is a collaborative knowledge project. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT
