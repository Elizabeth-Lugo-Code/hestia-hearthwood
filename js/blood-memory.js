async function loadBookData() {
  const res = await fetch('data/blood-memory.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Could not load blood-memory.json');
  return res.json();
}

function renderIntro(hero) {
  const root = document.getElementById('book-intro-root');
  if (!root) return;

  root.innerHTML = `
    <section class="book-intro">
      <div class="book-cover-placeholder" id="cover-wrap">
        <img src="${hero.cover}" alt="${hero.title} cover">
      </div>
      <h1>${hero.title}</h1>
      <p class="book-genre">${hero.genre}</p>
      <span class="book-status">${hero.status}</span>
    </section>
  `;

  const img = document.querySelector('#cover-wrap img');
  if (img) {
    img.addEventListener('error', () => {
      document.getElementById('cover-wrap').textContent = 'Cover coming soon';
    });
  }
}

function renderBlurb(blurb, details, cta) {
  const root = document.getElementById('book-blurb-root');
  if (!root) return;

  const paragraphsHtml = blurb.paragraphs.map(p => `<p>${p}</p>`).join('');
  const tropesHtml = details.tropes.map(t => `<span class="trope-pill">${t}</span>`).join('');

  root.innerHTML = `
    <section class="blurb-section">
      ${paragraphsHtml}
      <div class="tropes-list">${tropesHtml}</div>
      <div class="book-cta">
        <a href="${cta.href}" class="btn btn-burgundy">${cta.label}</a>
      </div>
    </section>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  loadBookData()
    .then(data => {
      renderIntro(data.hero);
      renderBlurb(data.blurb, data.details, data.cta);
    })
    .catch(err => console.error(err));
});