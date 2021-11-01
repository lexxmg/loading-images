
'use strict';

import '../css/card.css'

export function upload(selector) {
  const input = document.querySelector(selector);

  const btnOpen = document.createElement('button');
  btnOpen.classList.add('btn');
  btnOpen.textContent = 'Открыть';

  input.insertAdjacentElement('afterend', btnOpen);

  btnOpen.addEventListener('click', function() {
    input.click();
  });
}
