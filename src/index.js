import './style/style.scss';
import ENkeys from './modules/ENkeys.json';
import RUkeys from './modules/RUkeys.json';
import getDefaultLayout from './modules/getDefaultLayout';
import getKeyboardLayout from './modules/getKeyboardLayout';
import Keyboard from './modules/keyboardClass';

const body = document.querySelector('body');

/* init HTML layout */
body.insertAdjacentHTML('afterbegin', getDefaultLayout());
const wrapper = document.querySelector('.wrapper');
wrapper.insertAdjacentHTML('beforeend', getKeyboardLayout(ENkeys, RUkeys));
wrapper.insertAdjacentHTML(
  'beforeend',
  `<p class="keyboard-info"> 
    Клавиатура создана в операционной системе Windows
    <br> Для переключения языка комбинация:
    левыe ctrl + alt
  </p>`,
);
/* init HTML layout */

/* init keyboard object */
const keyboardObject = new Keyboard(document.querySelector('.keyboard'));

/* add listeners to keyboard */
keyboardObject.addListeners();
