#!/bin/bash
# Project Launcher CLI
# Usage: projects-cli.sh [command] [args]

REGISTRY="$HOME/.claude/projects-registry.json"
SCRIPTS_DIR="$HOME/.claude/scripts"

# Colors
C='\033[0;36m'   # Cyan
G='\033[0;32m'   # Green
Y='\033[1;33m'   # Yellow
R='\033[0;31m'   # Red
N='\033[0m'      # Reset

case "$1" in
    list|ls|"")
        echo -e "${C}=== Project Kanban ===${N}"
        echo ""

        # Group by status
        for status in "in_progress" "active" "planning" "not_started" "completed"; do
            count=$(jq -r "[.projects[] | select(.status == \"$status\")] | length" "$REGISTRY")
            if [ "$count" -gt 0 ]; then
                echo -e "${Y}[$status] ($count)${N}"
                jq -r ".projects[] | select(.status == \"$status\") | \"  \(.icon) #\(.id) \(.name)\"" "$REGISTRY"
                echo ""
            fi
        done
        ;;

    status)
        echo -e "${C}=== Quick Status ===${N}"
        jq -r '.projects[] | "\(.icon) \(.name): \(.status)"' "$REGISTRY"
        ;;

    show)
        if [ -z "$2" ]; then
            echo -e "${R}Usage: projects show <id>${N}"
            exit 1
        fi
        jq ".projects[] | select(.id == $2)" "$REGISTRY"
        ;;

    launch)
        if [ -z "$2" ]; then
            echo -e "${R}Usage: projects launch <id>${N}"
            exit 1
        fi

        folder=$(jq -r ".projects[] | select(.id == $2) | .folder" "$REGISTRY")
        prompt=$(jq -r ".projects[] | select(.id == $2) | .prompt" "$REGISTRY")
        name=$(jq -r ".projects[] | select(.id == $2) | .name" "$REGISTRY")

        if [ "$folder" == "null" ] || [ -z "$folder" ]; then
            echo -e "${R}Project #$2 not found${N}"
            exit 1
        fi

        echo -e "${G}Launching: $name${N}"
        echo -e "${C}Folder: $folder${N}"

        cd "$folder"
        claude "$prompt"
        ;;

    launch-new)
        if [ -z "$2" ]; then
            echo -e "${R}Usage: projects launch-new <id>${N}"
            exit 1
        fi

        folder=$(jq -r ".projects[] | select(.id == $2) | .folder" "$REGISTRY")
        prompt=$(jq -r ".projects[] | select(.id == $2) | .prompt" "$REGISTRY")
        name=$(jq -r ".projects[] | select(.id == $2) | .name" "$REGISTRY")

        echo -e "${G}Opening new terminal for: $name${N}"
        mintty -t "$name" -e /bin/bash -c "cd '$folder' && claude '$prompt'" &
        ;;

    update-status)
        if [ -z "$2" ] || [ -z "$3" ]; then
            echo -e "${R}Usage: projects update-status <id> <status>${N}"
            echo "Status options: not_started, planning, in_progress, active, completed, paused"
            exit 1
        fi

        # Update status and lastSession
        today=$(date +%Y-%m-%d)
        jq "(.projects[] | select(.id == $2)) |= . + {status: \"$3\", lastSession: \"$today\"}" "$REGISTRY" > "$REGISTRY.tmp"
        mv "$REGISTRY.tmp" "$REGISTRY"
        echo -e "${G}Updated project #$2 to status: $3${N}"
        ;;

    categories)
        echo -e "${C}=== Categories ===${N}"
        jq -r '.categories | to_entries[] | "\(.key): \(.value.name) (\(.value.color))"' "$REGISTRY"
        ;;

    help|--help|-h)
        echo -e "${C}Project Launcher CLI${N}"
        echo ""
        echo "Commands:"
        echo "  list, ls        Show kanban board (grouped by status)"
        echo "  status          Quick status overview"
        echo "  show <id>       Show project details"
        echo "  launch <id>     Launch project in current terminal"
        echo "  launch-new <id> Launch project in new terminal"
        echo "  update-status <id> <status>  Update project status"
        echo "  categories      List available categories"
        echo "  help            Show this help"
        ;;

    *)
        echo -e "${R}Unknown command: $1${N}"
        echo "Run 'projects help' for usage"
        exit 1
        ;;
esac
