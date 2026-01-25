# 📚 Documentation

Welcome to the Ultimate AI Dev Environment documentation!

---

## 📖 Guides

### Getting Started
- [SETUP_COMPLETE.md](../SETUP_COMPLETE.md) - Quick start guide after installation
- [REPO_SUMMARY.md](../REPO_SUMMARY.md) - Complete repository summary

### Platform-Specific
- [HEBREW_TERMINAL_FIX.md](./HEBREW_TERMINAL_FIX.md) - 🇮🇱 Fix Hebrew display issues in Windows Terminal
- [GITHUB_SETUP.md](../GITHUB_SETUP.md) - GitHub repository configuration

### Advanced Features
- [KINETIC_VIDEO_SETUP.md](./KINETIC_VIDEO_SETUP.md) - 🎬 Create kinetic typography videos with Claude
- [CLAUDE_TASK_VIEWER.md](./CLAUDE_TASK_VIEWER.md) - 📊 Real-time Kanban board for Claude Code tasks

---

## 🔧 Configuration

### Core Files
- `~/.claude/CLAUDE.md` - Main instructions and workflow
- `~/.claude/settings.json` - Claude Code configuration
- `~/.claude/rules/` - 12 development rule files

### Templates
- `/config-templates/.env.template` - Environment variables
- `/config-templates/.mcp.json.template` - MCP server configuration
- `/config-templates/settings.json.template` - Claude settings

---

## 🤖 Skills & Agents

### Skills Documentation
Check individual skill README files:
```bash
~/.claude/skills/[skill-name]/SKILL.md
```

### Notable Skills
- **cc10x-router** - Main entry point for cc10x workflow system
- **session-memory** - Persistent context across sessions
- **test-driven-development** - TDD workflow enforcement
- **kinetic-video-creator** - Automated video creation 🆕

### Agents
Located in `~/.claude/agents/`:
1. component-builder
2. bug-investigator
3. code-reviewer
4. integration-verifier
5. planner
6. silent-failure-hunter

---

## 🎯 Workflows

### Development Workflow (from CLAUDE.md)
```
1. UNDERSTAND → Context7 + Octocode
2. DISCOVER → Tree + Glob + Grep + LSP
3. NAVIGATE → goToDefinition, findReferences
4. LOAD → MCPSearch for tools
5. LINT → Ultracite rules
6. PATTERNS → Load relevant skills
7. IMPLEMENT → Write code
8. VERIFY → Self-check
9. TEST → bunx tsc --noEmit && bunx ultracite check
```

### Video Creation Workflow
See [KINETIC_VIDEO_SETUP.md](./KINETIC_VIDEO_SETUP.md)

---

## 🌍 Language Support

### Hebrew RTL Support
- **Terminal**: See [HEBREW_TERMINAL_FIX.md](./HEBREW_TERMINAL_FIX.md)
- **Documentation**: Available in both English and Hebrew
  - English: [README.md](../README.md)
  - עברית: [README.he.md](../README.he.md)

---

## 🚀 Quick Links

### External Resources
- **Remotion**: https://www.remotion.dev/
- **Remotion Assistant**: https://aviz85.github.io/remotion-assistant/
- **ElevenLabs**: https://elevenlabs.io/
- **Claude Code**: https://claude.com/claude-code
- **MCP Protocol**: https://modelcontextprotocol.io

### Community
- **GitHub Repo**: https://github.com/eladjak/ultimate-ai-dev-environment
- **Issues**: https://github.com/eladjak/ultimate-ai-dev-environment/issues
- **Discussions**: https://github.com/eladjak/ultimate-ai-dev-environment/discussions

---

## 📝 Contributing

Want to add documentation?

1. Create a new `.md` file in `/docs/`
2. Follow the existing format
3. Add it to this README
4. Submit a PR!

---

**Last Updated**: January 2026
**Maintained by**: Elad Jacoby
