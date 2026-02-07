#!/bin/bash
# Publish a skill to GitHub
# Usage: publish-skill.sh <skill-name> [commit-message]

SKILL_NAME="$1"
COMMIT_MSG="$2"
SKILLS_REPO="/c/Users/eladj/ai-agents-skills"
LOCAL_SKILL="$HOME/.claude/skills/$SKILL_NAME"

# Colors
G='\033[0;32m'
R='\033[0;31m'
C='\033[0;36m'
N='\033[0m'

if [ -z "$SKILL_NAME" ]; then
    echo -e "${C}Usage: publish-skill.sh <skill-name> [commit-message]${N}"
    echo ""
    echo "Available skills:"
    ls -1 "$HOME/.claude/skills/" | grep -v "^[a-z]*.md$"
    exit 1
fi

if [ ! -d "$LOCAL_SKILL" ]; then
    echo -e "${R}Skill not found: $LOCAL_SKILL${N}"
    exit 1
fi

# Default commit message
if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="feat: Update $SKILL_NAME skill"
fi

echo -e "${C}Publishing: $SKILL_NAME${N}"

# Copy skill
cp -r "$LOCAL_SKILL" "$SKILLS_REPO/"

# Commit and push
cd "$SKILLS_REPO"
git add "$SKILL_NAME/"

if git diff --cached --quiet; then
    echo -e "${G}No changes to commit${N}"
else
    git commit -m "$COMMIT_MSG"
    git push origin master
    echo -e "${G}Published successfully!${N}"
fi

# Get URL
USER=$(gh api user --jq .login 2>/dev/null || echo "eladjak")
echo -e "${C}URL: https://github.com/$USER/ai-agents-skills/tree/master/$SKILL_NAME${N}"
