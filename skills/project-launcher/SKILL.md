---
name: project-launcher
description: Use when managing multiple projects, viewing project kanban, updating project status, or launching Claude sessions with pre-configured prompts. Activate for project switching, status updates, adding new projects, or auto-starting Claude terminals.
---

# Project Launcher & Kanban Manager

Manage projects in a central registry, update status/info, and launch Claude sessions with automatic prompts.

## Quick Reference

| Command | Description |
|---------|-------------|
| `/projects` | Show kanban board of all projects |
| `/projects add` | Add new project to registry |
| `/projects launch <id>` | Launch project in new terminal |
| `/projects update <id>` | Update project info/status |
| `/projects status` | Quick status overview |

## Core Files

| File | Purpose |
|------|---------|
| `~/.claude/projects-registry.json` | Central project database (kanban) |
| `~/.claude/scripts/startup-claude.sh` | Interactive launcher menu |
| `~/.claude/scripts/launch-*.sh` | Project-specific launchers |

## Registry Structure

```json
{
  "projects": [
    {
      "id": 1,
      "name": "Project Name",
      "icon": "emoji",
      "status": "in_progress|active|planning|not_started|completed",
      "category": "business|development|finance|edutech|content|web",
      "folder": "C:/Users/user/path/to/project",
      "description": "Brief project description",
      "prompt": "Auto-start prompt for Claude session",
      "lastSession": "2026-02-07",
      "client": "Optional client name",
      "keyInfo": { "custom": "fields" }
    }
  ],
  "categories": {
    "categoryId": { "name": "Display Name", "color": "#HEX" }
  }
}
```

## Workflows

### View Kanban Board

```bash
# Read and display projects
cat ~/.claude/projects-registry.json | jq '.projects[] | {id, name, status, category}'
```

Or use the interactive menu:
```bash
~/.claude/scripts/startup-claude.sh
```

### Add New Project

1. Read current registry
2. Add project object with next ID
3. Update `startup-claude.sh` if needed
4. Optionally create dedicated launcher script

```json
{
  "id": 13,
  "name": "New Project",
  "icon": "emoji",
  "status": "planning",
  "category": "development",
  "folder": "C:/Users/eladj/projects/new-project",
  "description": "What this project is about",
  "prompt": "Hebrew or English prompt for Claude to start with"
}
```

### Update Project Status

Edit `projects-registry.json`:
- Change `status` field
- Update `lastSession` to today's date
- Add notes to `keyInfo` if needed

### Launch Project with Auto-Prompt

**Pattern that works (critical):**
```bash
#!/bin/bash
cd "$HOME/path/to/project"

PROMPT="Your prompt here - can be Hebrew"

claude "$PROMPT"
```

**Key insight:** Pass prompt as positional argument to `claude`, NOT with `-p` flag.

### Create Project Launcher Script

```bash
#!/bin/bash
# Launch [Project Name]

cd "$HOME/projects/project-folder"

PROMPT="Read CLAUDE.md and PROGRESS.md. Show summary and continue work."

claude "$PROMPT"
```

Save to `~/.claude/scripts/launch-project-name.sh` and make executable:
```bash
chmod +x ~/.claude/scripts/launch-project-name.sh
```

### Open Terminal with Project

```bash
# From Git Bash
mintty -t "Project Name" -e /bin/bash -c "~/.claude/scripts/launch-project-name.sh" &
```

Or use Windows Terminal:
```powershell
wt -w 0 nt --title "Project" bash -c "~/.claude/scripts/launch-project-name.sh"
```

## Status Values

| Status | Meaning |
|--------|---------|
| `not_started` | Planned but not begun |
| `planning` | In planning/research phase |
| `in_progress` | Active development |
| `active` | Running/maintained |
| `completed` | Done |
| `paused` | On hold |

## Category Colors (Default)

| Category | Color | Icon |
|----------|-------|------|
| business | #4CAF50 | Business projects |
| development | #2196F3 | Dev/coding |
| finance | #FFC107 | Financial |
| edutech | #9C27B0 | Education tech |
| content | #FF5722 | Content creation |
| web | #00BCD4 | Websites |

## Common Operations

### Batch Launch Multiple Projects

```bash
# In startup-claude.sh, the 'a' option does this:
for id in 1 2 3 4; do
    folder="${FOLDERS[$id]}"
    mintty -t "Project $id" -e /bin/bash -c "cd '$folder' && claude '$START_MSG'" &
    sleep 2
done
```

### Update Menu After Adding Project

Edit `~/.claude/scripts/startup-claude.sh`:
1. Add menu item in the echo section
2. Add folder to `FOLDERS` array
3. Update case statement range

### Quick Status Check

```bash
# Show all projects with status
cat ~/.claude/projects-registry.json | jq -r '.projects[] | "\(.icon) \(.name): \(.status)"'
```

## Integration with CLAUDE.md

Each project should have:
- `CLAUDE.md` - Project-specific instructions
- `PROGRESS.md` - Session progress tracking

The auto-prompt typically reads these:
```
"Read CLAUDE.md and PROGRESS.md. Show summary and continue from where we stopped."
```

## Hebrew Support

Prompts can be in Hebrew:
```bash
PROMPT="קרא את CLAUDE.md ו-README.md. הצג סיכום והמשך לעבוד."
```

The terminal and Claude handle RTL automatically.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Empty terminal after launch | Ensure `claude "$PROMPT"` (not `-p`) |
| Hebrew not displaying | Use Git Bash with proper fonts |
| Script not found | Check `chmod +x` on script |
| Project not in menu | Update `startup-claude.sh` |

## Anti-Patterns

| Don't | Do Instead |
|-------|------------|
| `claude -p "prompt"` | `claude "prompt"` |
| Hardcode paths | Use `$HOME` variable |
| Forget lastSession | Update after each session |
| Create without CLAUDE.md | Always add project docs |
