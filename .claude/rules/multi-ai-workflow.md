# Multi-AI Workflow (AI Orchestra)

Don't use one AI for everything. Each AI has strengths.

## The Stack (2026)

| AI | Best For | When to Use |
|----|----------|-------------|
| **Claude Opus** | Complex code, debugging, architecture | Hard problems, 80%+ accuracy needed |
| **v0.dev** | UI/React generation | Before giving UI work to Claude |
| **Copilot Agent** | Overnight work | Issues that can wait until morning |
| **Gemini Pro** | Images, video, Google integration | Visual tasks, Drive/Calendar |
| **ChatGPT** | Brainstorming, writing, quick questions | Daily conversations |

## Key Workflows

### UI Development (Save 84% tokens)
```
1. v0.dev → Generate UI from screenshot/description
2. Copy code to Claude
3. Claude adds: logic, backend, tests
```
**NEVER let Claude design UI from scratch - massive token waste!**

### Overnight Work
```bash
# Before sleep:
bash ~/.claude/scripts/copilot-overnight.sh

# Morning:
gh pr list --author @copilot
```

### Model Selection
```
Simple task → Cheaper model (Codex, GPT-4)
Complex task → Claude Opus
Visual task → Gemini Pro
```

## Cost Optimization

| Approach | Cost |
|----------|------|
| Claude for everything | $$$$ |
| Right tool for job | $ |

## Integration Tips

1. **v0.dev**: Free tier works, Pro ($20/mo) for heavy use
2. **Copilot**: $10/mo Individual plan
3. **Gemini**: Pro tier needed for quality
4. **Claude**: Use Opus for hard stuff, Sonnet for routine

## Commands

```bash
# Assign to Copilot overnight
bash ~/.claude/scripts/copilot-overnight.sh

# Check Copilot's work
gh pr list --author @copilot
```
