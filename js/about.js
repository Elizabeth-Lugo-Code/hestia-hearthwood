async function loadAboutData() {
  const res = await fetch('data/about.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Could not load about.json');
  return res.json();
}

function renderIntro(intro) {
  const root = document.getElementById('about-intro-root');
  if (!root) return;
  root.innerHTML = `
    <section class="page-intro">
      <h1>${intro.headline}</h1>
      <p>${intro.sub}</p>
    </section>
  `;
}

function renderBio(bio) {
  const root = document.getElementById('about-bio-root');
  if (!root) return;
  const paragraphsHtml = bio.paragraphs.map(p => `<p>${p}</p>`).join('');
  root.innerHTML = `
    <section class="bio-section">
      ${paragraphsHtml}
    </section>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  loadAboutData()
    .then(data => {
      renderIntro(data.intro);
      renderBio(data.bio);
    })
    .catch(err => console.error(err));
});