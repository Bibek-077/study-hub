# 📚 Study Hub
Track every concept of every subject, plan for exams, and revise on time.

## Run locally
Open the folder in VS Code → install **Live Server** → right-click `index.html` → *Open with Live Server*.

## Files
- `data.js`    – all syllabus content (edit to add/rename concepts)
- `app.js`     – logic (progress saved in browser localStorage)
- `style.css`  – styling
- `index.html` dashboard · `subject.html?id=os` subject · `todo.html` to-do & revision · `planner.html` exam planner + backup

## Deploy free on GitHub Pages
1. Create an empty repo on github.com (e.g. `study-hub`) – no README/licence.
2. In the VS Code terminal, inside this folder:
   ```
   git init
   git add .
   git commit -m "Study Hub"
   git branch -M main
   git remote add origin https://github.com/<your-username>/study-hub.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: GitHub Actions**.
4. Open the **Actions** tab; when "Deploy to GitHub Pages" turns green your site is live at
   `https://<your-username>.github.io/study-hub/`
5. Every future `git push` redeploys automatically.

> Progress is stored per browser. Use **Planner & Backup → Export / Import** to move it between laptop and phone.
