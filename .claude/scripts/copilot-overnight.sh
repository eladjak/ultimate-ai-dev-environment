#!/bin/bash
# Copilot Overnight Work Assigner
# Assign GitHub issues to Copilot before sleep

echo "
╔══════════════════════════════════════════════════╗
║  🌙 Copilot Overnight Work Assigner              ║
║  Let AI work while you sleep!                    ║
╚══════════════════════════════════════════════════╝
"

# Check if gh is authenticated
if ! gh auth status &>/dev/null; then
    echo "❌ Please authenticate: gh auth login"
    exit 1
fi

# Get current repo
REPO=$(gh repo view --json nameWithOwner -q '.nameWithOwner' 2>/dev/null)

if [ -z "$REPO" ]; then
    echo "📁 Not in a git repo. Enter repo name (user/repo):"
    read REPO
fi

echo "📋 Repository: $REPO"
echo ""

# Show open issues
echo "📝 Open issues:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
gh issue list --repo "$REPO" --state open --limit 15
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Get issues to assign
echo "🎯 Enter issue numbers to assign to Copilot"
echo "   (comma-separated, e.g., 1,3,5 or 'q' to quit):"
read -p "> " ISSUES

if [ "$ISSUES" = "q" ] || [ -z "$ISSUES" ]; then
    echo "👋 Goodbye!"
    exit 0
fi

# Assign each issue
echo ""
for issue in $(echo $ISSUES | tr ',' ' '); do
    echo -n "🤖 Assigning #$issue to Copilot... "
    if gh issue edit "$issue" --repo "$REPO" --add-assignee @copilot 2>/dev/null; then
        echo "✅"
    else
        echo "❌ (might already be assigned or issue not found)"
    fi
done

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║  😴 Go to sleep! Copilot is working...           ║"
echo "║                                                  ║"
echo "║  🌅 In the morning, check:                       ║"
echo "║     gh pr list --author @copilot                 ║"
echo "╚══════════════════════════════════════════════════╝"
