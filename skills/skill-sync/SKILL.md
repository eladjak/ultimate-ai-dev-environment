---
name: skill-sync
description: Sync skills from the ai-agents-skills GitHub repository. Use when you want to update skills, check for new skills, sync skill library, or get latest skills. Triggers on sync skills, update skills, skill update, new skills, refresh skills, skill library.
---

# Skill Sync

Automatically sync and update skills from the [ai-agents-skills](https://github.com/hoodini/ai-agents-skills) GitHub repository.

## Commands

| Command | Description |
|---------|-------------|
| `/skill-sync` | Full sync - check and update all skills |
| `/skill-sync check` | Check for updates without applying |
| `/skill-sync list` | List available skills in the repository |
| `/skill-sync install <name>` | Install a specific skill |

## Workflow

When this skill is invoked, perform these steps:

### Step 1: Fetch Repository State

```bash
# Get list of skills from repo
gh api repos/hoodini/ai-agents-skills/contents/skills --jq '.[].name'

# Get latest commit info
gh api repos/hoodini/ai-agents-skills/commits --jq '.[0] | "\(.sha[0:7]) - \(.commit.message | split("\n")[0]) (\(.commit.author.date[0:10]))"'
```

### Step 2: Compare with Local Skills

For each skill in the repository:
1. Check if it exists locally in `~/.claude/skills/<skill-name>/`
2. Compare content hash or modification date
3. Identify: NEW, UPDATED, or UP-TO-DATE

### Step 3: Report Status

Display a table showing:
```
| Skill Name          | Status      | Action Needed |
|---------------------|-------------|---------------|
| honest-agent        | NEW         | Install       |
| cloudflare          | UPDATED     | Update        |
| bun                 | UP-TO-DATE  | None          |
```

### Step 4: Apply Updates (if requested)

For each skill that needs updating:

```bash
# Fetch skill content
gh api repos/hoodini/ai-agents-skills/contents/skills/<skill-name>/SKILL.md --jq '.content' | base64 -d > ~/.claude/skills/<skill-name>/SKILL.md
```

**IMPORTANT:**
- Create directory if it doesn't exist
- Preserve any local customizations in separate files
- Never overwrite files that don't exist in the repo

### Step 5: Report Results

After sync:
1. List skills installed/updated
2. Show any errors encountered
3. Suggest restarting Claude Code if major updates

## Example Interaction

**User**: "sync skills"

**Agent**:
```
🔍 Checking ai-agents-skills repository...

Latest commit: 3cd7745 - fix(honest-agent): Add critical APPEND-ONLY safety (2026-01-28)

📦 Skill Status:
┌─────────────────────┬────────────┬──────────────┐
│ Skill               │ Status     │ Action       │
├─────────────────────┼────────────┼──────────────┤
│ honest-agent        │ ✅ NEW      │ Installing   │
│ local-llm-router    │ ✅ NEW      │ Installing   │
│ cloudflare          │ 🔄 UPDATED  │ Updating     │
│ bun                 │ ✓ Current  │ None         │
│ vercel              │ ✓ Current  │ None         │
└─────────────────────┴────────────┴──────────────┘

✅ Sync complete!
- 2 new skills installed
- 1 skill updated
- 21 skills up to date
```

## Auto-Sync (Optional)

To enable automatic sync on session start, add to hooks in `~/.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "gh api repos/hoodini/ai-agents-skills/commits --jq '.[0].sha' > ~/.claude/.last-skills-commit 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

## Configuration

The skill uses these paths:
- **Repository**: `hoodini/ai-agents-skills`
- **Local skills**: `~/.claude/skills/`
- **Sync log**: `~/.claude/.skill-sync.log`

## Resources

- **Repository**: https://github.com/hoodini/ai-agents-skills
- **Skill Format**: https://github.com/hoodini/ai-agents-skills/tree/main/templates
