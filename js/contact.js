async function loadContactData() {
  const res = await fetch('data/contact.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Could not load contact.json');
  return res.json();
}

function renderIntro(intro) {
  const root = document.getElementById('contact-intro-root');
  if (!root) return;
  root.innerHTML = `
    <section class="page-intro">
      <h1>${intro.headline}</h1>
      <p>${intro.sub}</p>
    </section>
  `;
}

function renderCard(info) {
  const root = document.getElementById('contact-card-root');
  if (!root) return;

  const isPlaceholder = !info.email || info.email.includes('REPLACE_WITH') || info.email.includes('example.com');

  const mailtoHref = info.emailSubject
    ? `mailto:${info.email}?subject=${encodeURIComponent(info.emailSubject)}`
    : `mailto:${info.email}`;

  const buttonHtml = isPlaceholder
    ? `<span class="btn btn-disabled">${info.emailCta}</span>`
    : `<a href="${mailtoHref}" class="btn" target="_blank">${info.emailCta}</a>`;

  const copyBtnHtml = isPlaceholder
    ? ''
    : `<button type="button" class="copy-email-btn" id="copy-email-btn">Copy email address</button>`;

  root.innerHTML = `
    <section class="page-section">
      <div class="contact-card">
        ${buttonHtml}
        ${copyBtnHtml}
      </div>
    </section>
  `;

  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(info.email).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = originalText; }, 2000);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadContactData()
    .then(data => {
      renderIntro(data.intro);
      renderCard(data.info);
    })
    .catch(err => console.error(err));
});