# 🚀 Ultimate AI Development Environment

> The most comprehensive AI development setup - 112+ skills, 11 MCP servers, 15 agents, 23 commands, 20+ rules

[![Skills](https://img.shields.io/badge/Skills-120+-blue.svg)](./docs/SKILLS_CATALOG.md)
[![MCP Servers](https://img.shields.io/badge/MCP_Servers-11-green.svg)](./docs/MCP_SERVERS_GUIDE.md)
[![Agents](https://img.shields.io/badge/Agents-15-purple.svg)](./agents/)
[![Commands](https://img.shields.io/badge/Commands-27-cyan.svg)](./commands/)
[![Rules](https://img.shields.io/badge/Rules-20-orange.svg)](./rules/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[עברית](./README.he.md) | English

## ✨ Features

- **🔍 Skill Registry MCP** - "App Store for Claude Code Skills" - Solves MCP Challenge #3: Discovery
- **⚡ 900x Faster Code Understanding** - LSP integration (45 seconds → 50 milliseconds)
- **🤖 Multi-Agent Development** - ChatDev, OpenCode, UI-TARS for autonomous software teams
- **🎨 Sub-Second Image Generation** - FLUX.2 Klein (Apache 2.0 licensed)
- **📊 Microsoft Office Automation** - PowerPoint, Word, Excel programmatic control
- **🔒 Production-Ready Security** - Agent authentication, OAuth flows, and secure workflows

## 🎯 What You Get

### Core Components

#### 1. 120+ Specialized Skills

**LSP & MCP Skills (NEW! - Based on presentation insights):**
- `lsp-integration` - 900x faster code understanding than grep
- `mcp-discovery` - Find and integrate MCP servers automatically
- `agent-workflow-builder` - Design complex multi-agent workflows
- `semantic-code-understanding` - Relationship-based code analysis
- `agent-auth-security` - Production agent authentication & security

**Development & Architecture:**
- `test-driven-development` - TDD workflows
- `systematic-debugging` - Structured debugging approach
- `react-best-practices` - React/Next.js performance optimization (Vercel)
- `web-design-guidelines` - Modern web design rules
- `owasp-security` - Security best practices

**Cloud & Deployment:**
- `vercel` - Vercel deployment automation
- `cloudflare` - Cloudflare edge platform
- `railway` - Railway.app deployment
- `aws-account-management` - AWS operations
- `aws-agentcore` - AWS Bedrock AgentCore

**New in v2.0 (Jan 2026):**
- `continuous-learning` / `continuous-learning-v2` - Auto-extract patterns from sessions
- `iterative-retrieval` - Progressive context refinement for subagents
- `golang-patterns` / `golang-testing` - Go idioms and testing patterns
- `composition-patterns` - React compound components (Vercel)
- `baseline-ui` / `fixing-accessibility` / `fixing-metadata` / `fixing-motion-performance` - UI polish skills (ibelick)
- `react-native-callstack` - Comprehensive RN performance (28 reference docs from Callstack!)
- `expo-app-design` - 6 Expo skills: building-native-ui, expo-api-routes, expo-tailwind-setup, etc.
- `expo-deployment` - CI/CD workflows and deployment patterns
- `design-lab` - Design principles and workflows (0xdesign)
- `ui-ux-pro-max` - Advanced UI/UX with data files (colors, icons, typography, charts)
- `strategic-compact` - Summarization and compression strategies
- `eval-harness` - Evaluation frameworks for AI systems
- `clickhouse-io` / `postgres-patterns` - Database best practices

**Content Creation & Media (NEW Feb 2026):**
- `kinetic-video-creator` - Kinetic typography videos (Pillow+FFmpeg or Remotion), Hebrew/RTL support
- `speech-generator` - ElevenLabs TTS with Hebrew support (v3 model, number handling)
- `html-to-pptx` - HTML to PowerPoint with Hebrew/RTL, overflow detection
- `html-to-pdf` - HTML to PDF with Puppeteer, pixel-perfect rendering
- `nano-banana-poster` - AI image generation with Google Gemini
- `presentation-architect` - Transform briefs into structured presentations

**And 90+ more skills!** See [Full Skills Catalog](./docs/SKILLS_CATALOG.md)

#### 2. 15 Specialized Agents

- `architect` - System design decisions
- `code-reviewer` - Quality and security analysis
- `security-reviewer` - Vulnerability detection
- `e2e-runner` - Playwright test automation
- `database-reviewer` - Database schema and query review
- `go-reviewer` / `go-build-resolver` - Go-specific agents
- `tdd-guide` - Test-driven development guidance
- `refactor-cleaner` - Dead code elimination

See all agents in [agents/](./agents/)

#### 3. 11 MCP Servers

**Custom Developed:**
- **skill-registry** ⭐ - Central skill discovery and recommendation engine
- **vercel-mcp-server** - Vercel deployment automation
- **supabase-mcp-server** - Supabase database integration
- **Office-PowerPoint-MCP-Server** - PowerPoint automation (32 tools)
- **Office-Word-MCP-Server** - Word document creation/editing
- **ms-365-mcp-server** - Excel operations, M365 Graph API
- **chrome-devtools-mcp** - Browser automation & performance analysis
- **atlassian-mcp-server** - Jira, Confluence integration
- **wapulse-whatsapp-mcp** - WhatsApp automation

**Pre-configured:** GitHub, GitLab, Slack, Stripe, Firebase, and more

See [MCP Servers Guide](./docs/MCP_SERVERS_GUIDE.md)

#### 3. 20+ AI Tools & Frameworks

**Multi-Agent Systems:**
- **ChatDev** - Simulate entire software company (CEO, CTO, Designer, Programmer)
- **UI-TARS Desktop** - Desktop/browser automation agent
- **agent-browser** - Vercel's browser automation (Playwright-based)

**Image & Content Generation:**
- **FLUX.2 Klein** - Sub-second image generation (Apache 2.0, 4B model)
- **nano-banana-ui** - Gemini image generation UI

**Ultra-Fast Inference:**
- **groq-agent** - Groq LPU ultra-fast inference

**And 15+ more tools!** See [AI Tools Overview](./docs/AI_TOOLS_OVERVIEW.md)

## 🚀 Quick Start

### Prerequisites

- [Claude Code](https://claude.com/code) installed
- Node.js 18+ and npm
- Git
- (Optional) Python 3.8+ for some tools

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ultimate-ai-dev-environment.git
cd ultimate-ai-dev-environment

# Install skill-registry-mcp (the heart of the system!)
cd skill-registry-mcp
npm install
npm run build
cd ..

# Configure MCP servers
cp config-templates/.mcp.json.template ~/.mcp.json
# Edit ~/.mcp.json with your actual paths

# Install skills
./scripts/install-skills.sh
# Or on Windows:
# .\scripts\install-skills.ps1

# Test the installation
./scripts/test-installation.sh
```

### First Steps

After installation, restart Claude Code and try:

```
"List all available skills"
"Search for skills about React"
"What skill should I use for authentication?"
```

The skill-registry-mcp will automatically recommend the best skill for your needs!

## 💡 Use Cases

### Semantic Code Understanding (900x Faster!)

**Before (grep):** 45 seconds, many false positives
```bash
grep -r "getUserData" .
# Returns 347 matches including comments, strings...
```

**After (LSP):** 50 milliseconds, zero false positives
```
"Go to definition of getUserData"
→ Instant navigation to the actual function
→ No false positives from comments or strings
```

### Intelligent Skill Discovery

**Before:**
```
User: "I need to create a PowerPoint"
Claude: *guesses* "Maybe there's a skill? Let me try..."
```

**After:**
```
User: "I need to create a PowerPoint"
Claude: *queries skill-registry* recommend_skill("create PowerPoint")
MCP: { name: "html-to-pptx", confidence: 95% }
Claude: "I'll use the html-to-pptx skill for this!"
```

### Multi-Agent Development

```
User: "Create a todo app with authentication"

ChatDev agents collaborate:
├─ CEO: Defines requirements and success criteria
├─ CTO: Designs system architecture
├─ Designer: Creates UI mockups
└─ Programmer: Implements the code

Result: Complete application in minutes!
```

### Safe Refactoring

```
"Rename getUserData to fetchUserProfile across the entire project"

LSP ensures:
✅ All 23 references updated
✅ Types remain consistent
✅ No accidental string changes
✅ Zero false positives
```

## 🏆 Solves MCP Challenge #3: Discovery

From the MCP/LSP presentation: **"העתיד של כלי הפיתוח מבוססי AI"**

**The Three Unsolved Challenges:**
1. ❌ **Auth** - OAuth complexity for agents
2. ❌ **Reliability** - Servers can crash or timeout
3. ✅ **Discovery** - No centralized "App Store" ← **SOLVED!**

### How skill-registry-mcp Solves Discovery:

- **Automatic Skill Detection** - Scans ~/.claude/skills/ and indexes all 64 skills
- **Intelligent Search** - Full-text search with relevance scoring
- **Smart Recommendations** - AI-powered skill suggestions based on user intent
- **Real-time Updates** - Refresh after installing new skills
- **Zero Configuration** - Works out of the box

**This is the "App Store for Skills" the community needed!**

## 📚 Documentation

- 📖 [Setup Guide](./docs/SETUP_GUIDE.md) - Detailed installation instructions
- 📋 [Skills Catalog](./docs/SKILLS_CATALOG.md) - All 64 skills documented
- 🔌 [MCP Servers Guide](./docs/MCP_SERVERS_GUIDE.md) - MCP setup and usage
- 🤖 [AI Tools Overview](./docs/AI_TOOLS_OVERVIEW.md) - AI tools and frameworks
- 🏗️ [Architecture](./docs/ARCHITECTURE.md) - System design and patterns
- 🔧 [Troubleshooting](./docs/TROUBLESHOOTING.md) - Common issues and solutions

**Hebrew Documentation:**
- 🇮🇱 [מדריך התקנה](./docs/SETUP_GUIDE.he.md)
- 🇮🇱 [קטלוג סקילים](./docs/SKILLS_CATALOG.he.md)

## 🎓 Key Concepts

### What is MCP (Model Context Protocol)?

MCP is the standard for connecting AI agents to external tools and services:
- **MCP Clients**: AI agents (like Claude Code)
- **MCP Servers**: Tools that expose capabilities (databases, APIs, cloud services)
- **Protocol**: Standardized communication between client and server

**Think of MCP as "the hands" of AI** - it lets agents interact with the external world.

### What is LSP (Language Server Protocol)?

LSP provides semantic code understanding:
- **900x faster** than text search (grep/ripgrep)
- **Zero false positives** - understands code structure
- **Type-aware** - knows relationships between symbols
- **Language-agnostic** - works with 11+ programming languages

**Think of LSP as "the brain" for code** - it understands, not just searches.

### MCP + LSP = The New Moat

According to the presentation:

1. ❌ Code Search Startups → Obsolete (LSP beats them)
2. ❌ Basic RAG Pipelines → Obsolete
3. ❌ Context Tools → Obsolete
4. ✅ **Native Protocols (MCP/LSP)** → The New Standard ← **YOU ARE HERE**
5. ✅ Deep Integrations → Current Frontier
6. ✅ Complex Workflows → The Future

**Value is in orchestration, not individual tools.**

## 🛠️ Technology Stack

- **Language Server Protocol** - Semantic code understanding
- **Model Context Protocol** - Tool integration standard
- **TypeScript** - skill-registry-mcp implementation
- **Node.js** - Runtime for MCP servers
- **Python** - Multi-agent frameworks (ChatDev)
- **Zod** - Type validation
- **YAML** - Skill metadata format

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

**Ways to contribute:**
- 🐛 Report bugs
- 💡 Suggest new skills
- 📝 Improve documentation
- 🔧 Submit MCP server integrations
- 🌟 Share your success stories

## 📊 Statistics

| Metric | Value |
|--------|-------|
| **Total Skills** | 64 |
| **MCP Servers** | 18 (8 custom + 10 pre-configured) |
| **AI Tools** | 20+ |
| **Supported Languages** | 11 (via LSP) |
| **Search Speed** | <10ms average |
| **LSP Speed Improvement** | 900x faster than grep |
| **Estimated Value** | $15,000+/month equivalent |
| **Your Investment** | Time + curiosity ☕ |

## 📄 License

MIT License - See [LICENSE](./LICENSE)

Feel free to use this in personal and commercial projects. Attribution appreciated but not required.

## 🙏 Acknowledgments

This project builds on amazing work from:

- **Anthropic** - Claude Code and Model Context Protocol
- **Microsoft** - Language Server Protocol
- **Vercel** - agent-browser, Next.js patterns
- **OpenBMB** - ChatDev multi-agent framework
- **Black Forest Labs** - FLUX.2 Klein image generation
- And 20+ other open-source projects

Special thanks to the MCP/LSP presentation: **"העתיד של כלי הפיתוח מבוססי AI"** for the inspiration.

## 🌟 Star History

If you find this useful, please star the repo! ⭐

It helps others discover this resource and motivates continued development.

## 📮 Contact & Support

- 📧 **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/ultimate-ai-dev-environment/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/ultimate-ai-dev-environment/discussions)
- 🐦 **Twitter**: Share your success stories with #UltimateAIDevEnv

## 🔮 Roadmap

### Phase 2 (Coming Soon)
- [ ] Docker containers for easier setup
- [ ] Web UI for skill-registry-mcp
- [ ] VS Code extension
- [ ] Automated skill installation from marketplace

### Phase 3 (Future)
- [ ] Vector search for semantic skill matching
- [ ] Skill dependency resolution
- [ ] Usage analytics and recommendations
- [ ] Community skill marketplace

---

**Built with ❤️ by the community, for the community**

**Transform your AI development workflow today!** 🚀

---

