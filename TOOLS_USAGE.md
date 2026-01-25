# 🛠️ Tools Usage Guide - מדריך שימוש בכלים

## 🎯 סקירה כללית

המערכת כוללת שני כלים חדשים שהותקנו והופעלו:

1. **Claude Task Viewer** - ניטור משימות בזמן אמת
2. **Copilot SDK** - בניית אפליקציות עם AI agents

---

## 📊 Claude Task Viewer

### ✅ סטטוס: רץ עכשיו!

**URL:** http://localhost:3456

### 🚀 איך להפעיל

```bash
# הפעלה מהירה עם פתיחת דפדפן
npx claude-task-viewer --open

# או דרך הסקריפט שלנו
./scripts/start-task-viewer.sh

# בפורט מותאם
PORT=8080 npx claude-task-viewer
```

### 💡 שימושים נפוצים

1. **ניטור עבודה שוטפת**
   - השאר רץ ברקע בטרמינל נפרד
   - תראה כל משימה ש-Claude Code עובד עליה
   - עקוב אחר התקדמות בזמן אמת

2. **הוספת הערות למשימות**
   ```
   1. פתח http://localhost:3456
   2. לחץ על משימה
   3. הוסף note בשדה Notes
   4. Claude יקרא את זה כשהוא עובד על המשימה!
   ```

3. **סינון וחיפוש**
   - חפש משימות לפי מילות מפתח
   - סנן לפי פרויקט או סשן
   - הצג רק משימות פעילות

### 📖 תיעוד מלא
ראה: [docs/CLAUDE_TASK_VIEWER.md](./docs/CLAUDE_TASK_VIEWER.md)

---

## 🤖 GitHub Copilot SDK

### ℹ️ סטטוס: Skill מותקן, SDK זמין להתקנה

**Skill Path:** `~/.claude/skills/copilot-sdk/`

### 📦 התקנת SDK

```bash
# Node.js/TypeScript
npm install @github/copilot-sdk

# Python
pip install github-copilot-sdk

# Go
go get github.com/github/copilot-sdk/go

# .NET
dotnet add package GitHub.Copilot.SDK
```

### 🎯 מתי להשתמש

השתמש ב-Copilot SDK כאשר אתה רוצה:

- ✅ להטמיע AI agents באפליקציות
- ✅ ליצור custom tools שה-agent יכול להפעיל
- ✅ לבנות ממשקי chat עם streaming
- ✅ לשמור conversations בין הפעלות
- ✅ להשתמש במספר מודלים (GPT, Claude, וכו')

### 🚀 Quick Start

```typescript
import { CopilotClient } from "@github/copilot-sdk";

// 1. Start client
const client = new CopilotClient();
await client.start();

// 2. Create session
const session = await client.createSession({
  model: "gpt-5",
  streaming: true
});

// 3. Listen for responses
session.on("assistant.message_delta", (event) => {
  process.stdout.write(event.data.deltaContent);
});

// 4. Send prompt
await session.send({ prompt: "Your task here" });

// 5. Cleanup
await client.stop();
```

### 📂 דוגמאות

ראה דוגמה מפורטת:
```bash
node examples/copilot-sdk-demo.js
```

### 📖 תיעוד מלא
ראה: `~/.claude/skills/copilot-sdk/SKILL.md`

---

## 🎨 Multi-Monitor Setup (מומלץ!)

להגדרה מושלמת:

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Monitor 1     │  │   Monitor 2     │  │   Monitor 3     │
│                 │  │                 │  │                 │
│  Claude Code    │  │  Task Viewer    │  │  Browser/IDE    │
│  (Terminal)     │  │  (Kanban)       │  │  (Code)         │
│                 │  │                 │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 🔧 Troubleshooting

### Task Viewer לא נטען?

```bash
# בדוק אם רץ
curl http://localhost:3456

# אם לא רץ, הפעל מחדש
npx claude-task-viewer --open

# אם הפורט תפוס
PORT=8080 npx claude-task-viewer
```

### Copilot SDK לא עובד?

```bash
# ודא ש-GitHub CLI מותקן
gh --version

# ודא ש-Copilot SDK מותקן
npm list @github/copilot-sdk

# התקן אם חסר
npm install @github/copilot-sdk
```

---

## 🎯 Use Cases לפי תרחיש

### תרחיש 1: פיתוח Feature גדול
```bash
# טרמינל 1: Claude Code
claude code

# טרמינל 2: Task Viewer
npx claude-task-viewer --open

# תוצאה: תראה כל משימה בזמן אמת
```

### תרחיש 2: בניית Chatbot
```typescript
// השתמש ב-Copilot SDK skill
// ראה examples/copilot-sdk-demo.js

import { CopilotClient, defineTool } from "@github/copilot-sdk";

// הגדר custom tools
const searchTool = defineTool({
  name: "search",
  description: "Search database",
  handler: async ({ query }) => {
    // Your logic
  }
});

// צור session עם ה-tool
const session = await client.createSession({
  tools: [searchTool]
});
```

### תרחיש 3: Code Review
```bash
# הפעל Task Viewer
npx claude-task-viewer --open

# בקש מ-Claude Code לעשות review
"Review this PR and create tasks for each issue"

# תראה את כל המשימות ב-Kanban
# הוסף notes לסדר עדיפויות
```

---

## 📚 משאבים נוספים

### Claude Task Viewer
- **Repo:** https://github.com/L1AD/claude-task-viewer
- **Docs:** [docs/CLAUDE_TASK_VIEWER.md](./docs/CLAUDE_TASK_VIEWER.md)
- **Script:** [scripts/start-task-viewer.sh](./scripts/start-task-viewer.sh)

### Copilot SDK
- **Skill:** `~/.claude/skills/copilot-sdk/SKILL.md`
- **Demo:** [examples/copilot-sdk-demo.js](./examples/copilot-sdk-demo.js)
- **Repo:** https://github.com/github/copilot-sdk

---

## ✅ Quick Checklist

בדוק שהכל עובד:

- [ ] Task Viewer נגיש ב-http://localhost:3456
- [ ] Copilot SDK skill קיים ב-`~/.claude/skills/copilot-sdk/`
- [ ] דוגמת הקוד רצה: `node examples/copilot-sdk-demo.js`
- [ ] כל התיעוד זמין ב-`docs/`

---

**הכל מוכן! 🎉**

**Task Viewer:** http://localhost:3456 (רץ עכשיו)
**Copilot SDK:** מותקן ומוכן לשימוש

עבוד עם Claude Code כרגיל - Task Viewer יעדכן אוטומטית!
