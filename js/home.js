async function loadHomeData() {
  const res = await fetch('data/home.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Could not load home.json');
  return res.json();
}

function renderIntro(intro) {
  const root = document.getElementById('home-intro-root');
  if (!root) return;
  root.innerHTML = `
    <section class="page-intro">
      <h1>${intro.headline}</h1>
      <p>${intro.sub}</p>
    </section>
  `;
}

function renderBooks(books) {
  const root = document.getElementById('home-books-root');
  if (!root) return;

  const cardsHtml = books.map(book => {
    const accentClass = book.accent === 'burgundy' ? 'accent-burgundy'
      : book.accent === 'roots' ? 'accent-roots' : '';
    const btnClass = book.accent === 'burgundy' ? 'btn-burgundy'
      : book.accent === 'roots' ? 'btn-roots' : '';

    return `
      <div class="book-card ${accentClass}">
        <span class="book-status">${book.status}</span>
        <h3>${book.title}</h3>
        <p>${book.tagline}</p>
        <a href="${book.link}" class="btn ${btnClass}">Read More</a>
      </div>
    `;
  }).join('');

  root.innerHTML = `
    <section class="page-section">
      <div class="book-grid">${cardsHtml}</div>
    </section>
  `;
}

function renderAboutTeaser(teaser) {
  const root = document.getElementById('home-about-teaser-root');
  if (!root) return;
  root.innerHTML = `
    <div class="about-teaser">
      <h2>${teaser.headline}</h2>
      <p>${teaser.sub}</p>
      <a href="${teaser.cta.href}" class="btn">${teaser.cta.label}</a>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  loadHomeData()
    .then(data => {
      renderIntro(data.intro);
      renderBooks(data.books);
      renderAboutTeaser(data.aboutTeaser);
    })
    .catch(err => console.error(err));
});