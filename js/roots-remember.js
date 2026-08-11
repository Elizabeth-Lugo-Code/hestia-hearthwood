async function loadBookData() {
  const res = await fetch('data/roots-remember.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Could not load roots-remember.json');
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

  const hooksHtml = blurb.hooks.map(h => `<p>${h}</p>`).join('');
  const themesHtml = details.themes.map(t => `<span class="trope-pill">${t}</span>`).join('');

  root.innerHTML = `
    <section class="blurb-section blurb-hooks">
      ${hooksHtml}
      <div class="tropes-list">${themesHtml}</div>
      <div class="book-cta">
        <a href="${cta.href}" class="btn btn-roots">${cta.label}</a>
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