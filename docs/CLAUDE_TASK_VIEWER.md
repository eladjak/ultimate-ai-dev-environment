# 📊 Claude Task Viewer - מדריך מלא

> Real-time Kanban board for monitoring Claude Code tasks

## 🎯 מהו claude-task-viewer?

**Claude Task Viewer** הוא כלי ויזואליזציה web-based המאפשר לך לצפות בזמן אמת בכל המשימות של Claude Code דרך לוח Kanban אינטראקטיבי.

### תכונות עיקריות

| תכונה | תיאור |
|-------|--------|
| 🔴 **Live Updates** | עדכונים בזמן אמת של משימות פעילות |
| 🔗 **Task Dependencies** | תצוגה ויזואלית של משימות חוסמות |
| 📝 **Notes & Collaboration** | הוספת הערות למשימות ש-Claude קורא |
| 🔍 **Search** | חיפוש real-time במשימות |
| 🎯 **Project Filtering** | סינון לפי פרויקט/סשן |
| 📊 **Session Management** | ניהול כל הסשנים עם אינדיקטורי התקדמות |

---

## ⚡ התקנה מהירה

### שיטה 1: npx (מומלץ)

הדרך הפשוטה ביותר - אפס הגדרות:

```bash
npx claude-task-viewer --open
```

זהו! השרת רץ על **http://localhost:3456** והדפדפן נפתח אוטומטית.

### שיטה 2: התקנה מקוד מקור

לפיתוח או התאמה אישית:

```bash
cd ~/Downloads
git clone https://github.com/L1AD/claude-task-viewer.git
cd claude-task-viewer
npm install
npm start
```

---

## 🚀 שימוש בסיסי

### הפעלה

```bash
# הפעלה רגילה
npx claude-task-viewer

# עם פתיחת דפדפן אוטומטית
npx claude-task-viewer --open

# בפורט מותאם
PORT=8080 npx claude-task-viewer

# עם directory מותאם (למספר חשבונות)
npx claude-task-viewer --dir=~/.claude-work
```

### ממשק הדפדפן

1. **פתח דפדפן**: http://localhost:3456
2. **Kanban Board**: תראה משימות מסודרות לפי סטטוס
   - Pending (ממתין)
   - In Progress (בביצוע)
   - Completed (הושלם)
3. **Live Updates Feed**: רשימת עדכונים בזמן אמת
4. **Search Bar**: חפש משימות לפי טקסט
5. **Filters**: סנן לפי פרויקט או סשן

---

## 💡 תכונות מתקדמות

### הוספת Notes למשימות

1. לחץ על משימה בלוח Kanban
2. הקלד הערה בשדה Notes
3. שמור
4. **Claude יקרא את ההערה כשהוא עובד על המשימה!**

**דוגמה**:
```
משימה: "Implement user authentication"
Note שלך: "Make sure to use OAuth 2.0 and add Remember Me checkbox"

→ Claude יקרא את זה כשהוא מתחיל לעבוד על המשימה
```

### API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/sessions` | List all sessions |
| `GET` | `/api/sessions/:id` | Get tasks for session |
| `GET` | `/api/tasks/all` | Get all tasks |
| `POST` | `/api/tasks/:session/:task/note` | Add note |
| `GET` | `/api/events` | SSE stream for live updates |

### דוגמת שימוש ב-API

```bash
# הוספת note דרך curl
curl -X POST http://localhost:3456/api/tasks/SESSION_ID/TASK_ID/note \
  -H "Content-Type: application/json" \
  -d '{"note": "Remember to add tests"}'
```

---

## 📖 דוגמאות שימוש

### תרחיש 1: ניטור פרויקט גדול

```bash
# הפעל את Task Viewer
npx claude-task-viewer --open

# עבוד עם Claude Code כרגיל
# Claude: "Create a todo list for building a web app"

# עכשיו תראה בדפדפן:
# - כל המשימות מסודרות בקולומות
# - התקדמות בזמן אמת
# - dependencies בין משימות
```

### תרחיש 2: Multi-Monitor Setup

```bash
# מסך 1: Claude Code (הפעולה)
# מסך 2: Task Viewer (ניטור)
# מסך 3: דפדפן/IDE

→ נראות מלאה על כל העבודה!
```

---

## 🐛 Troubleshooting

### בעיה: "Port 3456 is already in use"

**פתרון**:
```bash
# מצא תהליך שתופס את הפורט
netstat -ano | findstr :3456

# הרוג את התהליך (Windows)
taskkill /PID [PID_NUMBER] /F

# או השתמש בפורט אחר
PORT=8080 npx claude-task-viewer
```

### בעיה: "No tasks shown in viewer"

**פתרון**:
1. בדוק ש-Claude Code יצר משימות
2. רענן דפדפן (F5)
3. בדוק filters - אולי מסתיר משימות
4. בדוק console בדפדפן (F12) לשגיאות

### בעיה: "Live Updates not working"

**פתרון**:
1. בדוק שהשרת רץ
2. בדוק Network tab בדפדפן (F12)
3. רענון hard (Ctrl+F5)
4. נסה דפדפן אחר

---

## 💡 טיפים

1. **השאר רץ ברקע** - פתח טרמינל נפרד והשאר את Task Viewer רץ
2. **Multi-monitor** - Task Viewer במסך אחד, Claude Code באחר
3. **Bookmarks** - שמור http://localhost:3456 בסימניות
4. **Notes for context** - הוסף הערות למשימות מורכבות
5. **Filter often** - השתמש בפילטרים לפרויקטים גדולים

---

## 📚 משאבים נוספים

- **Repository**: https://github.com/L1AD/claude-task-viewer
- **Issues**: https://github.com/L1AD/claude-task-viewer/issues
- **Claude Code Docs**: https://docs.anthropic.com/claude-code

---

## ❓ שאלות נפוצות

**Q: האם זה משנה את Claude Code?**
A: לא! זה רק קורא קבצים. אין שינוי בהגדרות או בפעולה של Claude.

**Q: האם צריך להתקין משהו?**
A: לא. npx מוריד ורץ אוטומטית. אפס התקנה נדרשת.

**Q: האם זה בטוח?**
A: כן. הכלי רק קורא מ-~/.claude/tasks/ ולא גורס לקבצים רגישים.

**Q: כמה משאבים זה צורך?**
A: מינימלי. ~50MB RAM, כמעט 0% CPU.

**Q: האם יכול לרוץ על Linux/Mac?**
A: כן! עובד על כל מערכת הפעלה עם Node.js.

---

## 🎉 סיכום

claude-task-viewer הופך את Claude Code לחוויה ויזואלית:

✅ **נראות מלאה** - תראה בדיוק מה Claude עושה
✅ **שליטה** - הוסף הערות והערות למשימות
✅ **ניטור** - עקוב אחר התקדמות בזמן אמת
✅ **פשטות** - התקנה בפקודה אחת
✅ **אפס תלות** - לא משנה את Claude Code

**מומלץ בחום לכל מי שעובד עם Claude Code! 🚀**

---

*Last updated: 2026-01-25*
*Version: claude-task-viewer@1.6.0*
