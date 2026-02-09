# AGENTS.md - OpenCode Agent Guidelines

This document provides essential information for AI agents working in this repository. It covers build commands, testing procedures, code style guidelines, and repository-specific conventions.

## Project Overview

This is a Node.js project for OpenCode agent constitution deployment. The main file is `setup-opencode.js`.

## Build and Development Commands

### Package Management
```bash
# Install dependencies
npm install

# Install specific package
npm install <package-name>

# Install dev dependency
npm install --save-dev <package-name>
```

### Development
```bash
# Run the setup script
node setup-opencode.js

# Run with options
node setup-opencode.js --force
node setup-opencode.js --no-disable-builtins
node setup-opencode.js --source /path/to/agent-constitution

# Check Node.js version
node --version

# Check npm version
npm --version
```

### Testing
```bash
# Run all tests
npm test

# Run specific test file
npm test -- --testPathPattern=filename.test.js

# Run tests with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### Linting and Formatting
```bash
# Run linter
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Check code formatting
npm run format

# Format code automatically
npm run format:fix

# Type checking (if TypeScript)
npm run typecheck
```

### Build
```bash
# Build project
npm run build

# Build for production
npm run build:prod

# Clean build artifacts
npm run clean
```

## Code Style Guidelines

### General Principles
1. **Consistency**: Follow existing patterns in the codebase
2. **Readability**: Write code that is easy to understand and maintain
3. **Simplicity**: Prefer simple, straightforward solutions over clever ones
4. **Error Handling**: Handle errors gracefully with appropriate messages

### JavaScript/Node.js Specifics

#### Imports and Exports
```javascript
// Use ES6 imports/exports
import { functionName } from './module.js';
import defaultExport from './module.js';

// Export named exports
export const constant = 'value';
export function helper() {}

// Export default
export default mainFunction;

// Avoid CommonJS require() unless necessary for compatibility
```

#### Naming Conventions
- **Variables**: `camelCase` (e.g., `userName`, `itemCount`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`, `API_URL`)
- **Functions**: `camelCase` (e.g., `calculateTotal`, `validateInput`)
- **Classes**: `PascalCase` (e.g., `UserController`, `DatabaseConnection`)
- **Files**: `kebab-case` (e.g., `user-service.js`, `data-utils.js`)

#### Error Handling
```javascript
// Use try-catch for async operations
try {
  const result = await asyncOperation();
} catch (error) {
  console.error('Operation failed:', error.message);
  throw new Error(`Failed to perform operation: ${error.message}`);
}

// Validate inputs early
function processData(data) {
  if (!data || typeof data !== 'object') {
    throw new TypeError('Data must be a non-null object');
  }
  // ... rest of function
}
```

#### Async/Await Patterns
```javascript
// Prefer async/await over callbacks
async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
}

// Handle multiple async operations
async function processAll(items) {
  const results = await Promise.all(
    items.map(item => processItem(item))
  );
  return results.filter(Boolean);
}
```

### File Organization
```
project/
├── src/
│   ├── index.js          # Main entry point
│   ├── utils/            # Utility functions
│   ├── services/         # Business logic
│   ├── config/           # Configuration
│   └── tests/            # Test files
├── package.json
├── README.md
└── AGENTS.md
```

### Documentation
- Use JSDoc comments for public APIs
- Document complex algorithms and business logic
- Keep comments up-to-date with code changes
- Include examples in documentation when helpful

## Testing Guidelines

### Test Structure
```javascript
// Example test file structure
describe('ModuleName', () => {
  describe('functionName', () => {
    it('should do something', () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = functionName(input);
      
      // Assert
      expect(result).toBe('expected');
    });
    
    it('should handle edge cases', () => {
      // Test edge cases
    });
  });
});
```

### Test Best Practices
1. **Isolation**: Tests should not depend on each other
2. **Coverage**: Aim for meaningful test coverage, not just 100%
3. **Readability**: Test names should describe expected behavior
4. **Speed**: Keep tests fast and focused
5. **Mocking**: Mock external dependencies appropriately

## Git Workflow

### Commit Messages
Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions/modifications
- `chore`: Maintenance tasks

### Branch Naming
- Feature: `feature/description`
- Bug fix: `fix/description`
- Hotfix: `hotfix/description`
- Release: `release/version`

### Pull Requests
- Include clear description of changes
- Link related issues
- Ensure all tests pass
- Request review from appropriate team members

## Agent-Specific Instructions

### When Making Changes
1. **Analyze first**: Understand the existing code structure before making changes
2. **Follow patterns**: Match the existing code style and patterns
3. **Test changes**: Run relevant tests before and after changes
4. **Document**: Update documentation if APIs or behavior changes

### Common Tasks
- **Adding features**: Create new files/functions with appropriate tests
- **Fixing bugs**: Identify root cause, fix, add regression test
- **Refactoring**: Improve code without changing behavior
- **Optimizing**: Profile first, then optimize bottlenecks

### Quality Checks
Before considering work complete:
1. Run `npm run lint` to check code style
2. Run `npm test` to ensure tests pass
3. Run `npm run build` (if applicable) to verify build works
4. Check for any TypeScript errors with `npm run typecheck`

## Repository-Specific Notes

### Current Project Structure
- `setup-opencode.js`: Main deployment script for OpenCode agent constitution
- No package.json or dependencies currently defined
- Project is in early setup phase

### Future Considerations
As this project grows, additional guidelines may be added for:
- Database interactions
- API design
- Security practices
- Performance optimization
- Deployment procedures

## Emergency Procedures

If something goes wrong:
1. **Don't panic**: Check error messages carefully
2. **Rollback**: Use git to revert problematic changes
3. **Ask for help**: Document the issue and seek assistance
4. **Learn**: Understand what went wrong to prevent recurrence

---

*This document should be updated as the project evolves. Always check for the latest version before starting work.*
