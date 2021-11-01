
'use strict';

import { upload } from './upload';

upload('.card__input', {
  multi: true,
  accept: ['.gif', '.jpg']
});
