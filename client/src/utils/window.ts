import background from '../assets/images/landing-background.jpg';

export const fadingBackground = () => {
  let bgElement = document.querySelector<HTMLElement>('.island-background-auth');
  bgElement.classList.add('bg-loading');
  let preloaderImg = document.createElement('img');
  preloaderImg.src = background;

  preloaderImg.addEventListener('load', (event) => {
    bgElement.classList.remove('bg-loading');
    bgElement.classList.add('bg-loaded');
    preloaderImg = null;
  });
};
