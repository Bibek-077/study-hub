/* Study Hub – shared logic. Progress is saved in this browser's localStorage. */
const KEY = "studyhub.v1";
const store = {
  load() {
    try { const s = JSON.parse(localStorage.getItem(KEY)) || {};
      return { c: s.c || {}, custom: s.custom || [], exams: s.exams || {}, buffer: s.buffer ?? 2 };
    } catch { return { c: {}, custom: [], exams: {}, buffer: 2 }; }
  },
  save(s) { localStorage.setItem(KEY, JSON.stringify(s)); },
};
let state = store.load();
const cs = id => state.c[id] || (state.c[id] = { done: null, todo: false, note: "", revise: "" }); // create-on-write
const g = id => state.c[id] || {};                                                                  // read-only
const $ = (q, el = document) => el.querySelector(q);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fmt = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const today = () => fmt(new Date());
const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return fmt(d); };
const daysTo = ds => Math.round((new Date(ds + "T00:00:00") - new Date(today() + "T00:00:00")) / 864e5);
const allConcepts = s => s.modules.flatMap((m, mi) => m.groups.flatMap(gr => gr.items.map(i => ({ ...i, module: mi + 1, group: gr.title, subject: s }))));
const pctOf = list => list.length ? Math.round(list.filter(c => g(c.id).done).length * 100 / list.length) : 0;
const findConcept = id => { for (const s of SUBJECTS) { const c = allConcepts(s).find(x => x.id === id); if (c) return c; } };
const searchURL = (s, t) => "https://www.google.com/search?q=" + encodeURIComponent(`${s.name} ${t} explained`);
const persist = () => store.save(state);

function nav(active) {
  const L = [["home", "index.html", "Dashboard"], ["todo", "todo.html", "To-Do"], ["planner", "planner.html", "Planner & Backup"]];
  document.body.insertAdjacentHTML("afterbegin", `<header class="top"><a class="brand" href="index.html">📚 Study Hub</a>
  <nav>${L.map(l => `<a href="${l[1]}" class="${active === l[0] ? "on" : ""}">${l[2]}</a>`).join("")}</nav></header>`);
}
function examBadge(s) {
  const ex = state.exams[s.id]; if (!ex) return "";
  const d = daysTo(ex); return d < 0 ? "Exam date passed" : d === 0 ? "🔥 Exam today" : `⏳ Exam in ${d} day${d === 1 ? "" : "s"}`;
}

/* ================= Dashboard ================= */
function renderHome() {
  nav("home");
  const all = SUBJECTS.flatMap(allConcepts), done = all.filter(c => g(c.id).done).length;
  const upcoming = SUBJECTS.filter(s => state.exams[s.id] && daysTo(state.exams[s.id]) >= 0)
    .sort((a, b) => state.exams[a.id].localeCompare(state.exams[b.id]))[0];
  const due = Object.entries(state.c).filter(([id, st]) => st.revise && st.revise <= today()).length;
  $("#app").innerHTML = `<h1>My Semester</h1><p class="muted">Track every concept from every syllabus.</p>
  ${upcoming ? `<div class="card banner" style="--c:${upcoming.color}">⏳ Next exam: <b>${esc(upcoming.name)}</b> — ${examBadge(upcoming).replace("⏳ ", "").replace("🔥 ", "")} (${state.exams[upcoming.id]}) · <a href="planner.html"><u>open planner</u></a></div>` : ""}
  ${due ? `<div class="card banner">🔁 <b>${due}</b> concept${due > 1 ? "s" : ""} due for revision · <a href="todo.html"><u>review now</u></a></div>` : ""}
  <div class="stats"><div class="card stat"><b>${done}/${all.length}</b><span class="muted">concepts done</span></div>
  <div class="card stat"><b>${pctOf(all)}%</b><span class="muted">overall</span></div>
  <div class="card stat"><b>${all.filter(c => g(c.id).todo && !g(c.id).done).length}</b><span class="muted">in to-do</span></div></div>
  <div class="grid">${SUBJECTS.map(s => { const a = allConcepts(s), p = pctOf(a); return `
   <a class="card" href="subject.html?id=${s.id}" style="--c:${s.color}"><div class="icon">${s.icon}</div>
   <h3>${esc(s.name)}</h3><div class="muted">${s.code} · ${s.modules.length} modules · ${a.length} concepts</div>
   <div class="bar"><i style="width:${p}%"></i></div><div class="muted">${p}% complete ${state.exams[s.id] ? "· " + examBadge(s) : ""}</div></a>`; }).join("")}</div>`;
}

/* ================= Subject page ================= */
function renderSubject() {
  nav("");
  const s = SUBJECTS.find(x => x.id === new URLSearchParams(location.search).get("id"));
  if (!s) { $("#app").innerHTML = "<p>Subject not found. <a href='index.html'><u>Back</u></a></p>"; return; }
  document.title = s.name;
  const all = allConcepts(s), titles = Object.fromEntries(all.map(c => [c.id, c.title]));
  const openMods = JSON.parse(sessionStorage.getItem("open-" + s.id) || "[1]");
  $("#app").innerHTML = `<a class="muted" href="index.html">← All subjects</a>
  <h1 style="margin-top:8px">${s.icon} ${esc(s.name)}</h1><div class="muted">${s.code} · ${s.credits} <span id="exam"></span></div>
  <div class="bar" style="--c:${s.color}"><i id="sbar" style="width:${pctOf(all)}%"></i></div><div class="muted" id="slabel"></div>
  <div class="card info" style="margin-top:16px"><b>Course objectives</b><ul>${s.objectives.map(o => `<li>${esc(o)}</li>`).join("")}</ul>
  <p style="margin:12px 0 4px"><b>Books</b></p><ul>${s.books.map(o => `<li>${esc(o)}</li>`).join("")}</ul>
  ${s.links.length ? `<p style="margin:12px 0 4px"><b>e-Resources</b></p><ul>${s.links.map(l => `<li><a href="${l[1]}" target="_blank"><u>${esc(l[0])}</u></a></li>`).join("")}</ul>` : ""}</div>
  ${s.modules.map((m, mi) => `<details class="mod" data-m="${mi + 1}" ${openMods.includes(mi + 1) ? "open" : ""}>
   <summary>Module ${mi + 1}: ${esc(m.title)} <span class="pill">${m.hours} h</span><span class="pct" id="mp${mi}"></span></summary>
   ${m.groups.map(gr => `<div class="group"><h4>${esc(gr.title)}</h4>${gr.items.map(c => `
    <div class="concept" id="row-${c.id}"><input type="checkbox" data-id="${c.id}">
     <span class="t"></span><span class="acts">
      <a class="btn" target="_blank" href="${searchURL(s, c.title)}" title="Look it up">🔍</a>
      <button data-notes="${c.id}" title="Notes & revision date">📝</button>
      <button data-todo="${c.id}" title="Add to / remove from To-Do">＋ To-Do</button></span>
     <div class="notes" hidden><textarea data-note="${c.id}" rows="3" placeholder="Your notes for this concept…"></textarea>
      <label>🔁 Revise on <input type="date" data-revise="${c.id}"></label>
      <button data-plus="${c.id}:3">+3 days</button><button data-plus="${c.id}:7">+1 week</button><button data-plus="${c.id}:0">clear</button></div>
    </div>`).join("")}</div>`).join("")}
  </details>`).join("")}`;
  // fill notes / dates once
  all.forEach(c => { const st = g(c.id); $(`[data-note="${c.id}"]`).value = st.note || ""; $(`[data-revise="${c.id}"]`).value = st.revise || ""; });
  const paint = () => {
    all.forEach(c => { const st = g(c.id), row = $("#row-" + c.id);
      row.classList.toggle("done", !!st.done); $("input", row).checked = !!st.done; $(".t", row).textContent = titles[c.id];
      const b = $("[data-todo]", row); b.classList.toggle("on", !!st.todo && !st.done);
      b.textContent = st.done ? "✓ Done " + st.done : st.todo ? "★ In To-Do" : "＋ To-Do";
      $("[data-notes]", row).classList.toggle("on", !!(st.note || st.revise)); });
    s.modules.forEach((m, mi) => { $("#mp" + mi).textContent = pctOf(all.filter(c => c.module === mi + 1)) + "%"; });
    $("#sbar").style.width = pctOf(all) + "%";
    const left = all.filter(c => !g(c.id).done).length;
    $("#slabel").textContent = `${all.length - left} / ${all.length} concepts completed (${pctOf(all)}%)`;
    const ex = state.exams[s.id]; $("#exam").textContent = ex ? `· ${examBadge(s)} · ${left} concepts left` : "";
  };
  paint();
  const setRevise = (id, v) => { cs(id).revise = v; $(`[data-revise="${id}"]`).value = v; persist(); paint(); };
  $("#app").addEventListener("change", e => {
    if (e.target.dataset.id) { const st = cs(e.target.dataset.id); st.done = e.target.checked ? today() : null; if (st.done) st.todo = true; persist(); paint(); }
    if (e.target.dataset.revise) setRevise(e.target.dataset.revise, e.target.value);
  });
  $("#app").addEventListener("input", e => { if (e.target.dataset.note) { cs(e.target.dataset.note).note = e.target.value; persist(); paint(); } });
  $("#app").addEventListener("click", e => {
    const t = e.target;
    if (t.dataset.todo) { const st = cs(t.dataset.todo); if (!st.done) { st.todo = !st.todo; persist(); paint(); } }
    if (t.dataset.notes) { const p = $(".notes", $("#row-" + t.dataset.notes)); p.hidden = !p.hidden; }
    if (t.dataset.plus) { const [id, n] = t.dataset.plus.split(":"); setRevise(id, +n ? addDays(+n) : ""); }
  });
  document.querySelectorAll("details.mod").forEach(d => d.addEventListener("toggle", () =>
    sessionStorage.setItem("open-" + s.id, JSON.stringify([...document.querySelectorAll("details.mod[open]")].map(x => +x.dataset.m)))));
}

/* ================= To-Do page ================= */
let tab = "todo";
function renderTodo() {
  nav("todo");
  const draw = () => {
    const entries = Object.entries(state.c).map(([id, st]) => ({ id, st, c: findConcept(id) })).filter(x => x.c);
    const todo = entries.filter(x => x.st.todo && !x.st.done);
    const done = entries.filter(x => x.st.done).sort((a, b) => b.st.done.localeCompare(a.st.done));
    const due = entries.filter(x => x.st.revise && x.st.revise <= today()).sort((a, b) => a.st.revise.localeCompare(b.st.revise));
    const later = entries.filter(x => x.st.revise && x.st.revise > today()).length;
    const cTodo = state.custom.filter(t => !t.done), cDone = state.custom.filter(t => t.done);
    const meta = x => `${x.c.subject.name} · Module ${x.c.module} · ${esc(x.c.group)}`;
    const row = (x, isDone) => `<div class="task" style="--c:${x.c.subject.color}"><span class="dot"></span>
      <input type="checkbox" data-c="${x.id}" ${isDone ? "checked" : ""}><div><b>${esc(x.c.title)}</b><div class="muted">${meta(x)}</div>
      ${x.st.note ? `<div class="muted note-prev">📝 ${esc(x.st.note.slice(0, 120))}</div>` : ""}</div>
      <div class="meta muted">${isDone ? "✅ " + x.st.done : ""}</div></div>`;
    const revRow = x => `<div class="task" style="--c:${x.c.subject.color}"><span class="dot"></span>
      <div><b>${esc(x.c.title)}</b><div class="muted">${meta(x)} · due ${x.st.revise}</div>${x.st.note ? `<div class="muted note-prev">📝 ${esc(x.st.note.slice(0, 160))}</div>` : ""}</div>
      <div class="meta"><button data-revised="${x.id}">Revised ✓</button> <button data-snooze="${x.id}">+3 d</button></div></div>`;
    const crow = t => `<div class="task" style="--c:#888"><span class="dot"></span><input type="checkbox" data-custom="${t.id}" ${t.done ? "checked" : ""}>
      <div><b>${esc(t.text)}</b><div class="muted">Custom task</div></div><div class="meta"><button data-del="${t.id}">✕</button></div></div>`;
    let html;
    if (tab === "todo") {
      html = (due.length ? `<h3>🔁 Due for revision (${due.length})</h3>${due.map(revRow).join("")}<h3>To-Do</h3>` : "")
        + (todo.map(x => row(x, false)).join("") + cTodo.map(crow).join("") || "<p class='muted'>Nothing here yet. Press “＋ To-Do” on any concept, or add a custom task above.</p>")
        + (later ? `<p class="muted">${later} more revision${later > 1 ? "s" : ""} scheduled for later.</p>` : "");
    } else html = done.map(x => row(x, true)).join("") + cDone.map(crow).join("") || "<p class='muted'>No completed concepts yet – tick one off on a subject page!</p>";
    $("#list").innerHTML = html;
    document.querySelectorAll(".tabs button").forEach(b => b.classList.toggle("on", b.dataset.tab === tab));
    $("#count").textContent = `${todo.length + cTodo.length} pending · ${done.length + cDone.length} completed · ${due.length} to revise`;
  };
  $("#app").innerHTML = `<h1>✅ My To-Do List</h1><p class="muted" id="count"></p>
  <div class="addrow"><input id="newtask" placeholder="Add a custom task (e.g. Finish OS assignment 2)"><button id="add">Add</button></div>
  <div class="tabs"><button data-tab="todo">To-Do</button><button data-tab="done">Completed</button></div><div id="list"></div>`;
  $("#add").onclick = () => { const v = $("#newtask").value.trim(); if (!v) return;
    state.custom.push({ id: Date.now(), text: v, done: null }); persist(); $("#newtask").value = ""; draw(); };
  $("#newtask").onkeydown = e => e.key === "Enter" && $("#add").click();
  $("#app").addEventListener("click", e => { const d = e.target.dataset;
    if (d.tab) tab = d.tab;
    if (d.del) state.custom = state.custom.filter(t => t.id != d.del);
    if (d.revised) cs(d.revised).revise = "";
    if (d.snooze) cs(d.snooze).revise = addDays(3);
    if (d.tab || d.del || d.revised || d.snooze) { persist(); draw(); } });
  $("#app").addEventListener("change", e => { const d = e.target.dataset;
    if (d.c) cs(d.c).done = e.target.checked ? today() : null;
    if (d.custom) state.custom.find(t => t.id == d.custom).done = e.target.checked ? today() : null;
    persist(); draw(); });
  draw();
}

/* ================= Planner & Backup ================= */
function renderPlanner() {
  nav("planner");
  $("#app").innerHTML = `<h1>🗓️ Exam Planner</h1><p class="muted">Set each exam date – I'll work out how many concepts you must finish per day.</p>
  <div class="addrow"><label class="muted">Keep the last <input type="number" id="buf" min="0" max="14" style="width:64px;flex:none"> days before each exam for revision only</label></div>
  <div id="sum"></div><div id="plan"></div>
  <h2 style="margin-top:36px">💾 Backup & Restore</h2>
  <p class="muted">Progress lives in this browser only. Export a file to back it up or move it to your phone/another laptop, then import it there.</p>
  <div class="addrow"><button id="exp">⬇ Export progress</button><label class="btn">⬆ Import progress<input type="file" id="imp" accept="application/json" hidden></label></div><p class="muted" id="msg"></p>`;
  $("#buf").value = state.buffer;
  const draw = () => {
    const rows = SUBJECTS.map(s => { const all = allConcepts(s), left = all.filter(c => !g(c.id).done), ex = state.exams[s.id];
      return { s, left, ex, dl: ex ? daysTo(ex) : null }; });
    rows.forEach(r => { if (r.ex && r.dl >= 0 && r.left.length) { r.study = Math.max(1, r.dl - state.buffer); r.per = Math.ceil(r.left.length / r.study); } });
    const total = rows.reduce((a, r) => a + (r.per || 0), 0);
    $("#sum").innerHTML = total ? `<div class="card banner">Across all upcoming exams you need about <b>${total} concepts per day</b> to stay on track.</div>` : "";
    rows.sort((a, b) => (a.ex ? 0 : 1) - (b.ex ? 0 : 1) || (a.ex || "").localeCompare(b.ex || ""));
    $("#plan").innerHTML = rows.map(r => {
      let status, cls = "";
      if (!r.ex) status = "Set an exam date to get a plan.";
      else if (r.dl < 0) status = "Exam date has passed.";
      else if (!r.left.length) status = "🎉 All concepts covered – just revise!";
      else { cls = r.per > 8 ? "bad" : r.per > 4 ? "warn" : "ok";
        status = `<b>${r.left.length}</b> concepts left · <b>${r.dl}</b> day${r.dl === 1 ? "" : "s"} to go → <b>${r.per}/day</b> for ${r.study} day${r.study > 1 ? "s" : ""}${state.buffer && r.dl > state.buffer ? `, then ${state.buffer} revision days` : ""}`; }
      const target = r.per ? r.left.slice(0, r.per) : [];
      return `<div class="card plan ${cls}" style="--c:${r.s.color}"><div class="prow"><b>${r.s.icon} ${esc(r.s.name)}</b>
        <input type="date" data-exam="${r.s.id}" value="${r.ex || ""}"></div><div class="status">${status}</div>
        ${target.length ? `<div class="muted" style="margin-top:8px">Today's target:</div>${target.map(c =>
          `<label class="concept"><input type="checkbox" data-plan="${c.id}"><span>${esc(c.title)} <span class="muted">· M${c.module}</span></span></label>`).join("")}` : ""}</div>`; }).join("");
  };
  $("#buf").onchange = e => { state.buffer = Math.max(0, +e.target.value || 0); persist(); draw(); };
  $("#app").addEventListener("change", e => { const d = e.target.dataset;
    if (d.exam) { if (e.target.value) state.exams[d.exam] = e.target.value; else delete state.exams[d.exam]; persist(); draw(); }
    if (d.plan) { const st = cs(d.plan); st.done = today(); st.todo = true; persist(); draw(); } });
  $("#exp").onclick = () => {
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: "application/json" }));
    a.download = `studyhub-backup-${today()}.json`; a.click(); URL.revokeObjectURL(a.href); $("#msg").textContent = "Backup downloaded."; };
  $("#imp").onchange = e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader();
    r.onload = () => { try { const j = JSON.parse(r.result); if (typeof j.c !== "object" || j.c === null) throw 0;
        if (!confirm("This will REPLACE the progress currently in this browser. Continue?")) return;
        localStorage.setItem(KEY, JSON.stringify(j)); location.reload();
      } catch { $("#msg").textContent = "❌ That file isn't a valid Study Hub backup."; } };
    r.readAsText(f); };
  draw();
}
