# Marsam Therapy Website

![Marsam Therapy](./public/github.jpg)

A therapy practice website for Mariya Samreen, offering faith-informed psychological counseling with Islamic principles.

## How to Run Locally

### Prerequisites

Before you start, you need to have these installed on your computer:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org
   - Choose the "LTS" (Long Term Support) version
   - Follow the installer instructions

2. **Git** (optional, for downloading the code)
   - Download from: https://git-scm.com
   - Or download the project as a ZIP file instead

### Step-by-Step Instructions

1. **Get the code**
   
   If you have Git:
   ```bash
   git clone [repository-url]
   cd marsam-therapy-website
   ```
   
   Or download the ZIP file and extract it to a folder.

2. **Open Terminal/Command Prompt**
   
   - **Windows**: Press `Win + R`, type `cmd`, press Enter
   - **Mac**: Press `Cmd + Space`, type "Terminal", press Enter
   - Navigate to the project folder using `cd` command

3. **Install dependencies** (first time only)
   ```bash
   npm install
   ```
   This downloads all the necessary files the website needs to run.

4. **Start the website**
   ```bash
   npm run dev
   ```
   Wait a few seconds until you see a message like "Local: http://localhost:4321"

5. **View the website**
   
   Open your web browser and go to: **http://localhost:4321**
   
   The website is now running on your computer!

6. **Stop the website**
   
   Press `Ctrl + C` in the terminal window (works on both Windows and Mac)

## Making Changes

- Edit files in the `src/` folder
- The website will automatically reload when you save changes
- Blog posts are in `src/content/blog/` as `.md` (Markdown) files
- Pages are in `src/pages/`

### Writing Blog Posts

Blog posts are written in **Markdown** (`.md` files) - a simple way to write formatted text using plain text.

**Basic Markdown syntax:**
- `# Heading` - Creates a heading (use ##, ###, etc. for smaller headings)
- `**bold text**` - Makes text bold
- `*italic text*` - Makes text italic
- `[link text](url)` - Creates a link
- `![alt text](image.jpg)` - Adds an image

Each blog post needs information at the top (called "frontmatter"):
```markdown
---
title: "Your Post Title"
description: "Brief description"
author: "Mariya Samreen"
pubDate: 2024-02-05
tags: ["tag1", "tag2"]
---

Your post content here...
```

## Need Help?

- See `AGENTS.md` for detailed development guidelines
- Check `src/components/*/README.md` for component documentation
