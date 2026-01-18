#!/bin/bash

# Ultimate AI Dev Environment - Skills Installation Script
# This script copies all 64 skills to your Claude Code skills directory

set -e  # Exit on error

echo "🚀 Ultimate AI Dev Environment - Skills Installation"
echo "=================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Determine skills directory
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    # Windows
    SKILLS_DIR="$HOME/.claude/skills"
else
    # Linux/Mac
    SKILLS_DIR="$HOME/.claude/skills"
fi

echo -e "${BLUE}Target skills directory:${NC} $SKILLS_DIR"
echo ""

# Create skills directory if it doesn't exist
if [ ! -d "$SKILLS_DIR" ]; then
    echo -e "${YELLOW}Creating skills directory...${NC}"
    mkdir -p "$SKILLS_DIR"
fi

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
SOURCE_SKILLS="$REPO_DIR/skills"

# Count skills
SKILL_COUNT=$(ls -1 "$SOURCE_SKILLS" | wc -l)
echo -e "${BLUE}Found $SKILL_COUNT skills to install${NC}"
echo ""

# Copy skills
echo -e "${YELLOW}Copying skills...${NC}"
cp -r "$SOURCE_SKILLS"/* "$SKILLS_DIR/" 2>/dev/null || {
    echo -e "${YELLOW}Some skills already exist, skipping...${NC}"
}

# Verify installation
INSTALLED_COUNT=$(ls -1 "$SKILLS_DIR" | wc -l)
echo ""
echo -e "${GREEN}✓ Installation complete!${NC}"
echo -e "${BLUE}Installed skills count:${NC} $INSTALLED_COUNT"
echo ""

# List some installed skills
echo -e "${BLUE}Sample of installed skills:${NC}"
ls -1 "$SKILLS_DIR" | head -10
echo "..."
echo ""

echo -e "${GREEN}🎉 All done!${NC}"
echo ""
echo "Next steps:"
echo "1. Restart Claude Code"
echo "2. Try: 'List all available skills'"
echo "3. Try: 'Search for skills about React'"
echo ""
