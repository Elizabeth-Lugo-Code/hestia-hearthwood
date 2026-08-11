async function loadUpdatesData() {
  const res = await fetch('data/updates.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Could not load updates.json');
  return res.json();
}

function renderIntro(intro) {
  const root = document.getElementById('updates-intro-root');
  if (!root) return;
  root.innerHTML = `
    <section class="page-intro">
      <h1>${intro.headline}</h1>
      <p>${intro.sub}</p>
    </section>
  `;
}

function renderEntries(entries) {
  const root = document.getElementById('updates-list-root');
  if (!root) return;

  const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

  const entriesHtml = sorted.map(entry => {
    const displayDate = new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    return `
      <div class="update-entry">
        <p class="update-date">${displayDate}</p>
        <h3>${entry.title}</h3>
        <p>${entry.body}</p>
      </div>
    `;
  }).join('');

  root.innerHTML = `
    <section class="page-section">
      <div class="updates-list">${entriesHtml}</div>
    </section>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  loadUpdatesData()
    .then(data => {
      renderIntro(data.intro);
      renderEntries(data.entries);
    })
    .catch(err => console.error(err));
});