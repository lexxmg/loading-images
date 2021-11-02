
'use strict';

import '../css/card.css'

export function upload(selector, options = {}) {
  let files = [];
  const noop = () => {};
  const onUpload = options.onUpload ?? noop;

  const input = document.querySelector(selector);

  const preview = element('div', ['input__preview']);
  const btnOpen = element('button', ['btn'], 'Открыть');
  const btnClose = element('button', ['btn', 'primary', 'hidden'], 'Загрузить');

  // const preview = document.createElement('div');
  // preview.classList.add('input__preview');

  // const btnOpen = document.createElement('button');
  // btnOpen.classList.add('btn');
  // btnOpen.textContent = 'Открыть';

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

  input.insertAdjacentElement('afterend', preview);
  input.insertAdjacentElement('afterend', btnOpen);
  input.insertAdjacentElement('afterend', btnClose);

  btnOpen.addEventListener('click', function() {
    input.click();
  });

  input.addEventListener('change', event => {
    if (!event.target.files.length) return;

    files = Array.from(event.target.files);
    //const files2 = event.target.files
    preview.innerHTML = '';

    files.forEach((item, i) => {
      if ( !item.type.match('image') ) return;

      const reader = new FileReader();

      reader.onload = function(event) {
        const src = reader.result;

        preview.insertAdjacentHTML('afterbegin', `
          <div class="input-preview__img-wrwpper">
            <button class="input-preview_btn" data-name="${item.name}">&times;</button>

            <img class="input-preview__img" src="${src} alt="${item.name}">

            <div class="input-preview__info input-preview-info">
              <span class="input-preview-info__text">${item.name}</span>
              <span class="input-preview-info__text">${sizeConvert(item.size)}</span>
            </div>
          </div>
        `);
      }

      reader.readAsDataURL(item);
    });

    btnClose.classList.remove('hidden');
  });

  preview.addEventListener('click', event => {
    const name = event.target.dataset.name;

    if (name) {
      files = files.filter(item => item.name !== name);

      if (files.length === 0) {
        btnClose.classList.add('hidden');
      }

      const block = document
        .querySelector(`[data-name="${name}"]`)
        .closest('.input-preview__img-wrwpper');

      block.classList.add('removing');

      setTimeout(() => block.remove(), 300);
    }
  });

  btnClose.addEventListener('click', event => {
    const previewInfo = preview.querySelectorAll('.input-preview-info');

    previewInfo.forEach((item, i) => {
      item.innerHTML = `<div class="input-preview-info__progress">30%</div>`;
      item.style.bottom = 0;
      item.style.padding = 0;
    });

    preview.querySelectorAll('.input-preview_btn').forEach(item => item.remove());

    onUpload(files);
  });
}

function element(tag, classes = [], content) {
  const node = document.createElement(tag);

  if (classes.length) {
    node.classList.add(...classes);
  }

  if (content) {
    node.textContent = content;
  }

  return node;
}

function sizeConvert(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
