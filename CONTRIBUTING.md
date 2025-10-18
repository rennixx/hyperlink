# Contributing to Hyperlink

Thank you for your interest in contributing to Hyperlink! This document provides guidelines and instructions for contributing to the project.

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/hyperlink.git
   cd hyperlink
   ```

2. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Set Up Database**
   ```bash
   cd backend
   npx prisma migrate dev
   npm run seed  # Optional: adds sample data
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## Project Structure

```
hyperlink/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── lib/          # API client and utilities
│   │   └── types/        # TypeScript types
│   └── package.json
├── backend/               # Express backend
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Express middleware
│   │   └── types/        # TypeScript types & validation
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   └── package.json
└── README.md
```

## Code Style

- **TypeScript**: We use TypeScript for both frontend and backend
- **Formatting**: Use the project's ESLint configuration
- **Naming**:
  - Components: PascalCase (`ConceptNode.tsx`)
  - Files: camelCase for utilities, PascalCase for components
  - Variables/Functions: camelCase

## Making Changes

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Add comments for complex logic
   - Ensure TypeScript types are properly defined

3. **Test Your Changes**
   - Test the feature manually
   - Ensure no TypeScript errors
   - Test both frontend and backend

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

5. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## Areas for Contribution

### High Priority
- [ ] Search functionality for concepts
- [ ] Filter concepts by type
- [ ] Better graph layout algorithms
- [ ] Mobile responsive design

### Medium Priority
- [ ] User authentication (optional)
- [ ] Concept voting/rating system
- [ ] Export graph as image
- [ ] Dark mode

### Nice to Have
- [ ] Keyboard shortcuts
- [ ] Concept history/versioning
- [ ] Undo/redo functionality
- [ ] Graph animations

## Database Changes

If you need to modify the database schema:

1. Edit `backend/prisma/schema.prisma`
2. Create a migration:
   ```bash
   cd backend
   npx prisma migrate dev --name your_migration_name
   ```
3. The migration will be applied automatically

## API Changes

When adding new API endpoints:

1. Define the route in `backend/src/routes/`
2. Create the controller in `backend/src/controllers/`
3. Add validation schema in `backend/src/types/`
4. Update the frontend API client in `frontend/src/lib/api.ts`
5. Update types in `frontend/src/types/index.ts`

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about the codebase
- Suggestions for improvements

## Code of Conduct

- Be respectful and constructive
- Focus on the idea, not the person (align with Hyperlink's principles!)
- Help others learn and grow
- Collaborate, don't compete

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
