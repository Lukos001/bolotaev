const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.getElementById('mobile-menu');

function closeMenu() {
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
}

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  mobileMenu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
});

mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

const videoDialog = document.getElementById('video-dialog');
const videoFrame = videoDialog.querySelector('.video-frame');
const closeVideoButton = videoDialog.querySelector('.video-close');

document.querySelectorAll('.video-card').forEach(button => {
  button.addEventListener('click', () => {
    const id = button.dataset.videoId;
    if (!/^[A-Za-z0-9]+$/.test(id)) return;
    const frame = document.createElement('iframe');
    frame.src = `https://kinescope.io/embed/${id}`;
    frame.title = 'Видеоотзыв доверителя';
    frame.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock';
    frame.allowFullscreen = true;
    videoFrame.replaceChildren(frame);
    videoDialog.showModal();
    closeVideoButton.focus();
  });
});

closeVideoButton.addEventListener('click', () => videoDialog.close());
videoDialog.addEventListener('click', event => {
  if (event.target === videoDialog) videoDialog.close();
});
videoDialog.addEventListener('close', () => videoFrame.replaceChildren());
