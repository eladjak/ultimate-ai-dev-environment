# 🎬 Kinetic Video Creator - Setup Guide

**Automated kinetic typography video creation with Claude Code**

---

## Overview

Create professional kinetic typography videos where Claude:
1. Writes emotional scripts
2. Generates speech (ElevenLabs)
3. Creates matching music
4. Transcribes for word timing
5. Builds Remotion animations
6. Renders final video
7. Uploads to YouTube (optional)

---

## 📦 Installation

### Step 1: Install Remotion

```bash
# New project
npm create video@latest

# Existing project
npm install remotion @remotion/cli @remotion/player
```

### Step 2: Install Required Skills

```bash
# Remotion skill
npx @anthropic-ai/claude-code skill add remotion-dev/skills/remotion-best-practices

# Aviz Skills Library (speech, music, transcribe, youtube)
npx @anthropic-ai/claude-code skill add aviz85/claude-skills-library/skills/speech-generator
npx @anthropic-ai/claude-code skill add aviz85/claude-skills-library/skills/music-generator
npx @anthropic-ai/claude-code skill add aviz85/claude-skills-library/skills/transcribe
npx @anthropic-ai/claude-code skill add aviz85/claude-skills-library/skills/youtube-uploader
```

**⚠️ IMPORTANT:** Restart Claude Code after installing skills!

### Step 3: Install kinetic-video-creator Skill

The skill is already installed in:
```
~/.claude/skills/kinetic-video-creator/
```

### Step 4: Install FFmpeg

```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt install ffmpeg

# Windows
# Download from https://ffmpeg.org/download.html
```

### Step 5: Setup ElevenLabs API

Create `.env` file in your project root:

```env
ELEVENLABS_API_KEY=sk_3eb9c9aa286373eca54903fc91d399f28848240fb17d4d91
```

---

## 🚀 Quick Start

### Create Your First Video

Simply tell Claude:

```
"Create a kinetic video about the power of persistence"
```

Claude will handle the entire pipeline automatically!

---

## 📝 Script Writing Guidelines

### Emotional Bracket Directions

```
[dramatic pause] The future isn't coming.
[slowly, with weight] It's already here.
[building intensity] Every day, every decision...
[powerful, emphatic] ...shapes the world we'll live in.
[warm, inspiring] And you? You're part of it.
```

### Supported Directions

| Category | Examples |
|----------|----------|
| **Pacing** | [pause], [long pause], [slowly], [faster] |
| **Tone** | [whisper], [emphatic], [warm], [dramatic] |
| **Dynamic** | [building], [descending], [with weight] |

### Word Count Guidelines

| Duration | Word Count |
|----------|------------|
| 30 sec | 60-80 words |
| 60 sec | 120-150 words |
| 90 sec | 180-220 words |

---

## 🎨 Visual Customization

### Animation Modes

**Word Cloud (default)**
- Multiple words appear together
- Grouped by timing gaps
- Best for: Fast-paced content

**Single Word**
- One word at a time, centered
- Best for: Dramatic impact

### Customization Options

```tsx
<MultiWordComposition
  mode="wordCloud"
  heroFontSize={180}        // Emphasis words
  strongFontSize={120}      // Important words
  normalFontSize={80}       // Regular words
  glowIntensity={1.5}       // 0-3 glow effect
  dustEnabled={true}        // Particle effects
  lightBeamsEnabled={true}  // Light beams
  colorScheme={3}           // 0-7 color palettes
/>
```

### Color Schemes

| Scheme | Description |
|--------|-------------|
| 0 | Classic Blue |
| 1 | Warm Orange |
| 2 | Cool Purple |
| 3 | Energetic Red |
| 4 | Fresh Green |
| 5 | Elegant Gold |
| 6 | Deep Ocean |
| 7 | Sunset Gradient |

---

## 🔄 Manual Workflow (Advanced)

For more control over each step:

### 1. Write Script
```
"Write a 60-second kinetic video script about [topic]"
```

### 2. Generate Speech
```
"Generate speech from script.txt and save to speech.mp3"
```

### 3. Transcribe Audio
```
"Transcribe speech.mp3 with word-level timing to transcript.json"
```

### 4. Generate Music
```
"Generate [duration] seconds of [mood] cinematic music"
```

### 5. Mix Audio
```bash
ffmpeg -y \
  -i speech.mp3 \
  -i music.mp3 \
  -filter_complex "[0:a]volume=1.0[speech];[1:a]volume=0.17[music];[speech][music]amix=inputs=2:duration=first[out]" \
  -map "[out]" -c:a libmp3lame -q:a 2 \
  final_audio.mp3
```

### 6. Create Composition
```
"Create Remotion composition using transcript.json and final_audio.mp3"
```

### 7. Render Video
```
"Render the composition to output.mp4"
```

### 8. Upload (Optional)
```
"Upload output.mp4 to YouTube with title '[Your Title]'"
```

---

## 📂 Project Structure

```
my-kinetic-video/
├── .env                          # ElevenLabs API key
├── package.json
├── src/
│   ├── Root.tsx
│   ├── templates/
│   │   └── MultiWordComposition.tsx
│   └── projects/
│       └── my-video/
│           ├── script.txt
│           ├── speech.mp3
│           ├── music.mp3
│           ├── final_audio.mp3
│           ├── transcript.json
│           └── MyKineticVideo.tsx
└── out/
    └── output.mp4
```

---

## 🛠️ Troubleshooting

### Skills Not Found

```bash
# List installed skills
ls ~/.claude/skills/

# Install missing skill
npx @anthropic-ai/claude-code skill add [skill-name]

# Restart Claude Code
exit  # then re-enter project
```

### FFmpeg Issues

```bash
# Check installation
ffmpeg -version

# Reinstall if needed (macOS)
brew reinstall ffmpeg
```

### ElevenLabs API Errors

1. Check `.env` file exists and has valid API key
2. Verify API credits: https://elevenlabs.io/
3. Test API key:
```bash
curl -X GET "https://api.elevenlabs.io/v1/user" \
  -H "xi-api-key: YOUR_API_KEY"
```

### Remotion Build Fails

```bash
# Check installation
npm list remotion

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

### Transcription Timing Issues

- Ensure speech audio is clear (no background noise)
- Use ElevenLabs Scribe v2 for best results
- Check transcript.json has word-level timings:
```json
{
  "words": [
    { "word": "Hello", "start": 0.0, "end": 0.5 },
    { "word": "world", "start": 0.6, "end": 1.0 }
  ]
}
```

---

## 💡 Pro Tips

### 1. Script Quality
- Use emotional bracket directions liberally
- Vary pacing for dramatic effect
- End with inspiring/memorable lines

### 2. Voice Selection
- Choose ElevenLabs voice that matches content tone
- Use "Rachel" for warm, professional
- Use "Adam" for authoritative, deep

### 3. Music Matching
- Specify exact duration (from speech transcription)
- Match music mood to script emotion
- Keep music volume at 0.15-0.20 (don't overpower speech)

### 4. Visual Impact
- Use Word Cloud mode for complex ideas
- Use Single Word mode for powerful statements
- Increase `glowIntensity` for emphasis

### 5. Performance
- Render with `--concurrency 50%` to avoid overheating
- Use `--quality high` for final output
- Test with `--quality low` for quick previews

---

## 📚 Resources

### Documentation
- **Remotion**: https://www.remotion.dev/
- **Remotion Skills**: https://skills.sh/remotion-dev/skills/remotion-best-practices
- **ElevenLabs**: https://elevenlabs.io/docs

### Tools
- **Remotion Assistant**: https://aviz85.github.io/remotion-assistant/
- **Aviz Skills Library**: https://github.com/aviz85/claude-skills-library
- **FFmpeg**: https://ffmpeg.org/

### Inspiration
- **Kinetic Typography Examples**: https://www.youtube.com/results?search_query=kinetic+typography
- **Motion Design**: https://www.motiondesign.school/

---

## 🎯 Example Projects

### 1. Motivational Quote
```
"Create a 30-second kinetic video about never giving up"
```

### 2. Product Launch
```
"Create a 60-second kinetic video announcing our new AI-powered tool"
```

### 3. Educational Content
```
"Create a 90-second kinetic video explaining the concept of compound interest"
```

### 4. Brand Story
```
"Create a 45-second kinetic video telling our company's origin story"
```

---

## 🌟 What's Next

### Upcoming Features
- ✅ Multiple speaker support
- ✅ Background images/videos
- ✅ Custom animations per word
- ✅ Social media format presets (Square, Vertical, Horizontal)
- ✅ Batch processing (multiple videos from CSV)

### Community
- Share your creations!
- Report issues: https://github.com/eladjak/ultimate-ai-dev-environment/issues
- Contribute improvements

---

**Created by Elad Jacoby**
**Powered by Claude Sonnet 4.5** ✨
