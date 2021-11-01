
'use strict';

import '../css/card.css'

export function upload(selector, options = {}) {
  const input = document.querySelector(selector);

  const preview = document.createElement('div');
  preview.classList.add('input__preview');

  const btnOpen = document.createElement('button');
  btnOpen.classList.add('btn');
  btnOpen.textContent = 'Открыть';

  if (options.multi) {
    input.setAttribute('multiple', true);
  }

  if (options.accept) {
    if ( Array.isArray(options.accept) ) {
      input.setAttribute( 'accept', options.accept.join(' ,') );
    } else {
      input.setAttribute( 'accept', options.accept );
    }
  }

  input.insertAdjacentElement('afterend', btnOpen);
  input.insertAdjacentElement('afterend', preview);

  btnOpen.addEventListener('click', function() {
    input.click();
  });

  input.addEventListener('change', event => {
    if (!event.target.files.length) return;

    const {files} = event.target;
    //const files2 = event.target.files

    Array.from(files).forEach((item, i) => {
      if ( !item.type.match('image') ) return;

      const reader = new FileReader();

      reader.onload = function(event) {
        const src = reader.result;

        preview.insertAdjacentHTML('afterbegin', `
          <div class="input-preview__img-wrwpper">
            <img class="input-preview__img" src="${src} alt="${item.name}">
          </div>
        `);
      }

      reader.readAsDataURL(item);
    });

  });
}
