# Contributing to Ultimate AI Development Environment

Thank you for your interest in contributing! This project aims to be the most comprehensive AI development environment, and we welcome contributions from the community.

## 🤝 Ways to Contribute

### 1. Report Bugs
- Use the [GitHub Issues](https://github.com/YOUR_USERNAME/ultimate-ai-dev-environment/issues) page
- Check if the issue already exists before creating a new one
- Include:
  - Description of the bug
  - Steps to reproduce
  - Expected vs actual behavior
  - Your environment (OS, Node version, Claude Code version)

### 2. Suggest Features
- Open an issue with the `enhancement` label
- Describe the feature and why it would be useful
- Provide examples if possible

### 3. Submit New Skills
Skills are the heart of this project! To contribute a new skill:

1. **Create the skill directory:**
   ```bash
   mkdir skills/your-skill-name
   ```

2. **Create SKILL.md with proper structure:**
   ```yaml
   ---
   name: your-skill-name
   description: Brief description with triggers. Use when [use case]. Triggers on [keywords].
   ---

   # Your Skill Name

   ## Overview
   Detailed description...

   ## When to Use
   ...

   ## Examples
   ...
   ```

3. **Test the skill:**
   - Copy to ~/.claude/skills/
   - Use skill-registry-mcp to validate
   - Test with actual use cases

4. **Submit a Pull Request**

### 4. Add MCP Server Integrations
To add a new MCP server:

1. Create documentation in `docs/MCP_SERVERS_GUIDE.md`
2. Add configuration template
3. Test the integration
4. Submit PR with usage examples

### 5. Improve Documentation
- Fix typos
- Add examples
- Improve clarity
- Translate to other languages

### 6. Share Success Stories
- Add your use case to discussions
- Create blog posts or tutorials
- Share on social media with #UltimateAIDevEnv

## 📝 Pull Request Process

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly:**
   - Run the installation script
   - Test skills with skill-registry-mcp
   - Check for broken links in documentation
5. **Commit with clear messages:**
   ```bash
   git commit -m "Add: Brief description of what you added"
   ```
6. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request:**
   - Describe your changes
   - Reference any related issues
   - Include screenshots if relevant

## ✅ Contribution Guidelines

### Code Style
- **TypeScript:** Follow existing patterns in skill-registry-mcp
- **Markdown:** Use proper heading hierarchy
- **YAML:** Maintain consistent structure in skill frontmatter

### Documentation
- Write in clear, concise English
- Use examples liberally
- Include both success and error cases
- Keep technical accuracy

### Skills
- Each skill should solve a specific problem
- Include clear triggers for discovery
- Provide realistic examples
- Test with actual use cases

### Security
- **NEVER** commit API keys or credentials
- Use placeholder values in templates
- Review .gitignore before committing
- Sanitize any logs or outputs

## 🔍 Testing

Before submitting:

1. **Test Installation:**
   ```bash
   ./scripts/install-skills.sh
   ```

2. **Test skill-registry-mcp:**
   ```bash
   cd skill-registry-mcp
   npm install
   npm run build
   ```

3. **Validate Skills:**
   ```
   "Validate skill at path/to/SKILL.md"
   ```

4. **Check Documentation:**
   - All links work
   - No broken images
   - Proper formatting

## 📜 Commit Message Format

Use descriptive commit messages:

```
Add: Added new feature
Update: Updated existing feature
Fix: Fixed bug
Docs: Documentation changes
Test: Added or updated tests
Refactor: Code refactoring
Style: Code style changes
```

Examples:
```
Add: New semantic-search skill for vector embeddings
Fix: skill-registry-mcp path resolution on Windows
Docs: Added troubleshooting guide for MCP setup
Update: Improved search relevance algorithm
```

## 🌍 Internationalization

We support multiple languages! To add translations:

1. **Documentation:**
   - Create `FILENAME.LANG.md` (e.g., `README.he.md` for Hebrew)
   - Follow the structure of the English version
   - Keep technical terms in English when appropriate

2. **Skills:**
   - Skills should be in English for universal accessibility
   - Add translated examples in comments

## 🎓 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on what's best for the community
- No harassment or discrimination

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Appreciated by the community!

## ❓ Questions?

- Open a [GitHub Discussion](https://github.com/YOUR_USERNAME/ultimate-ai-dev-environment/discussions)
- Check existing issues and documentation
- Reach out to maintainers

## 📚 Resources

- [Main README](./README.md)
- [Setup Guide](./docs/SETUP_GUIDE.md)
- [Skills Catalog](./docs/SKILLS_CATALOG.md)
- [Architecture](./docs/ARCHITECTURE.md)

---

**Thank you for contributing to making AI development more accessible!** 🚀

