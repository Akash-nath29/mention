# @Mention - Smart File References for VS Code

[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/Akash-nath29/Mention)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/akashnath.mention?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=akashnath.mention)
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/akashnath.mention?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=akashnath.mention)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> Transform your code comments into interactive documentation with clickable file references and rich previews.

**@Mention** revolutionizes how you reference files in your codebase. Simply type `@filename` in comments, documentation, or anywhere in your code to create **clickable links** with **rich hover previews** that make navigation effortless.

## ✨ Features

### 🔗 **Smart File Linking**
Turn any `@filename` into a clickable link that opens the file instantly.

```typescript
// TODO: Fix the authentication bug
// @src/auth/login.ts - Check the validateUser function
// @tests/auth.test.ts - Add edge case tests
```

### 🎯 **Intelligent Auto-completion**
Type `@` and get instant suggestions for all files in your workspace with fuzzy search.

- **Smart filtering** - Only shows files that actually exist
- **Relative path resolution** - Automatically resolves paths from current file location
- **Fast search** - Quickly find files as you type

### 📋 **Rich Hover Previews**
Hover over any file mention to see:

- **📄 File metadata** - Size, last modified date, relative path
- **👀 Code preview** - First 15 lines with syntax highlighting
- **🎨 Language detection** - Automatic syntax highlighting for 15+ languages
- **⚡ Quick actions** - Open file or copy path with one click

### 🎨 **Visual Indicators**
- **Blue underline** for valid file references
- **Smart detection** - Only highlights actual files, not code snippets
- **Consistent styling** across all file types

### 🚀 **Multi-Language Support**
Works seamlessly across:
- **JavaScript/TypeScript** (.js, .ts, .jsx, .tsx)
- **Python** (.py)
- **JSON** (.json)
- **Markdown** (.md)
- **And more!**

## 🎬 Quick Demo

```javascript
/**
 * User Authentication Flow:
 * 
 * 1. @src/routes/auth.js - Handles login endpoint
 * 2. @src/middleware/validate.js - Validates user input  
 * 3. @src/services/userService.js - Database operations
 * 4. @config/database.json - Connection settings
 * 
 * For testing: @tests/auth.test.js
 */
```

**Hover over any `@filename` above to see the magic! 🪄**

## 📦 Installation

### From VS Code Marketplace
1. Open **VS Code**
2. Go to **Extensions** (Ctrl+Shift+X)
3. Search for **"@Mention"**
4. Click **Install**

### From Command Line
```bash
code --install-extension akashnath.mention
```

### Manual Installation
1. Download the `.vsix` file from [releases](https://github.com/Akash-nath29/Mention/releases)
2. Run: `code --install-extension mention-0.0.1.vsix`

## 🚀 Getting Started

1. **Install** the extension
2. **Open** any file in your workspace
3. **Type** `@` followed by a filename anywhere in your code
4. **See** the magic happen!

### Example Usage

```typescript
// In your code comments
// @package.json - Check dependencies
// @src/utils/helpers.ts - Contains utility functions

/* 
 * Project Structure:
 * @src/components/ - React components
 * @src/styles/main.css - Global styles
 * @docs/api.md - API documentation
 */
```

## ⚙️ How It Works

1. **Type `@filename`** - Start typing any filename in your workspace
2. **Get suggestions** - Intelligent autocomplete shows matching files
3. **See previews** - Hover to view file contents without opening
4. **Click to open** - Ctrl+Click (or Cmd+Click) to open the file instantly

## 🎯 Use Cases

### 📝 **Code Documentation**
```typescript
/**
 * Authentication module
 * 
 * Dependencies:
 * @src/config/auth.json - Auth configuration
 * @src/utils/jwt.ts - JWT utilities
 * @src/middleware/auth.ts - Auth middleware
 */
```

### 🐛 **Bug Reports & TODOs**
```javascript
// BUG: Memory leak in data processing
// @src/data/processor.js:156 - Fix the async loop
// @tests/processor.test.js - Add memory usage tests
```

### 📚 **Onboarding Documentation**
```markdown
## Getting Started

1. Configure environment: @.env.example
2. Install dependencies: @package.json
3. Run migrations: @database/migrations/
4. Start development: @scripts/dev.sh
```

### 🔄 **Code Reviews**
```typescript
// REVIEW: Consider refactoring this component
// @src/components/UserList.tsx - Extract hook logic
// @src/hooks/useUsers.ts - Move data fetching here
```

## 🎨 Supported Languages

The extension works in **all file types** and provides syntax highlighting for:

| Language | Extensions | Syntax Highlighting |
|----------|------------|-------------------|
| TypeScript | `.ts`, `.tsx` | ✅ |
| JavaScript | `.js`, `.jsx` | ✅ |
| Python | `.py` | ✅ |
| JSON | `.json` | ✅ |
| Markdown | `.md` | ✅ |
| CSS/SCSS | `.css`, `.scss` | ✅ |
| HTML | `.html` | ✅ |
| YAML | `.yaml`, `.yml` | ✅ |
| XML | `.xml` | ✅ |
| SQL | `.sql` | ✅ |
| Shell | `.sh` | ✅ |
| PowerShell | `.ps1` | ✅ |

## ⚡ Performance

- **Fast file scanning** - Efficiently indexes your workspace
- **Smart caching** - Reduces file system operations
- **Exclude patterns** - Automatically ignores `node_modules`, `.git`, `dist`, etc.
- **Lightweight** - Minimal impact on VS Code performance

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **🐛 Report bugs** - [Open an issue](https://github.com/Akash-nath29/Mention/issues)
2. **💡 Suggest features** - [Request a feature](https://github.com/Akash-nath29/Mention/issues)
3. **🔧 Submit PRs** - [Contribute code](https://github.com/Akash-nath29/Mention/pulls)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Akash-nath29/Mention.git
cd Mention

# Install dependencies
npm install

# Start development
npm run watch

# Run tests
npm test
```

## 📋 Requirements

- **VS Code** 1.102.0 or higher
- **Node.js** (for development only)

No additional dependencies required for end users!

## ⚙️ Extension Settings

Currently, @Mention works out of the box with sensible defaults. Configuration options will be added in future releases based on user feedback.

## 🐛 Known Issues

- **Large files** (>1MB) may show truncated previews for performance
- **Binary files** show limited preview information
- **Very long filenames** may be truncated in tooltips

See the [full issues list](https://github.com/Akash-nath29/Mention/issues) for current status and workarounds.

## 📝 Release Notes

### 0.0.1 - Initial Release 🎉

**Features:**
- ✅ Smart file linking with `@filename` syntax
- ✅ Rich hover previews with syntax highlighting
- ✅ Intelligent autocomplete
- ✅ Multi-language support
- ✅ Copy file path functionality

**Coming Soon:**
- 🔄 Line-specific mentions (`@file:42`)
- 📊 Mention analytics
- 🎨 Customizable styling
- 🔍 Advanced search filters

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **VS Code Team** - For the amazing extensibility platform
- **Community** - For feedback and feature suggestions
- **Contributors** - For making this project better

## 📞 Support

- **📧 Email**: [anath5440@gmail.com](mailto:anath5440@gmail.com)
- **🐛 Issues**: [GitHub Issues](https://github.com/Akash-nath29/Mention/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/Akash-nath29/Mention/discussions)

---

<div align="center">

**Made with ❤️ by [Akash Nath](https://aksn.lol)**

⭐ **Star this repo if you find it useful!** ⭐

[🚀 Install Extension](https://marketplace.visualstudio.com/items?itemName=akashnath.mention) • [📖 Documentation](https://github.com/Akash-nath29/Mention#readme) • [🐛 Report Bug](https://github.com/Akash-nath29/Mention/issues)

</div>
