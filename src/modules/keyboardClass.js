export default class Keyboard {
  constructor(node) {
    this.keyboardNode = node;
    this.textArea = document.querySelector('.text-area');
    this.keys = document.querySelectorAll('.keyboard__key');
    this.ruKeys = document.querySelectorAll('.ru');
    this.enKeys = document.querySelectorAll('.en');
    this.caseDownKeys = document.querySelectorAll('.caseDown');
    this.caseUpKeys = document.querySelectorAll('.caseUp');
    this.capsKeys = document.querySelectorAll('.caps');
    this.shiftCapsKeys = document.querySelectorAll('.shiftCaps');
    this.textAreaContent = '';

    this.lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
    if (this.lang === 'en') this.ruKeys.forEach((elem) => elem.classList.add('hidden'));
    else this.enKeys.forEach((elem) => elem.classList.add('hidden'));

    this.state = 'caseDown';
    this.functionalKeys = [
      'Backspace', 'CapsLock',
      'ShiftLeft', 'ShiftRight', 'Enter',
      'Tab', 'Delete', 'MetaLeft',
      'AltLeft', 'AltRight',
      'ControlLeft', 'ControlRight',
    ];
  }

  addListeners() {
    this.keyboardNode.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const clickedSymbol = e.target;
      const clickedButton = clickedSymbol.closest('.keyboard__key');
      if (clickedButton) {
        this.keyboardAction('down', clickedButton, clickedSymbol);
      }
    });

    this.keyboardNode.addEventListener('mouseup', (e) => {
      const clickedButton = e.target.closest('.keyboard__key');
      if (clickedButton) {
        this.keyboardAction('up', clickedButton);
      }
    });

    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      const clickedButton = document.getElementById(`${e.code}`);
      clickedButton.classList.add('active');
      this.keyboardAction('down', clickedButton, clickedButton.querySelector(`.${this.lang} .${this.state}`), e);
    });

    document.addEventListener('keyup', (e) => {
      const clickedButton = document.getElementById(`${e.code}`);
      clickedButton.classList.remove('active');
      this.keyboardAction('up', clickedButton, clickedButton.querySelector(`.${this.lang} .${this.state}`));
    });
  }

  keyboardAction(event, ButtonPressed, keyPressed, keyEventObject) {
    if (event === 'down') {
      let caretPos = this.textArea.selectionStart;
      switch (ButtonPressed.id) {
        case 'Backspace':
          caretPos -= 1;
          this.textAreaContent = this.textAreaContent.replace(this.textAreaContent.slice(this.textArea.selectionStart - 1, this.textArea.selectionStart), '');
          break;
        case 'Delete':
          this.textAreaContent = this.textAreaContent.replace(this.textAreaContent.slice(this.textArea.selectionStart, this.textArea.selectionStart + 1), '');
          break;
        case 'Tab':
          this.textAreaContent += '\t';
          break;
        case 'Enter':
          this.textAreaContent += '\n';
          break;
        case 'CapsLock':
          this.caps();
          break;
        default:
          if (this.state === 'caps' && (ButtonPressed.id === 'ShiftRight' || ButtonPressed.id === 'ShiftLeft')) {
            this.shiftCaps();
          } else if (this.state !== 'caps' && (ButtonPressed.id === 'ShiftRight' || ButtonPressed.id === 'ShiftLeft')) {
            this.shiftDown();
          } else if (
            (ButtonPressed.id === 'AltLeft' && keyEventObject.ctrlKey === true)
            || (ButtonPressed.id === 'ControlLeft' && keyEventObject.altKey === true)) this.changeLanguage();
          else if (!this.functionalKeys.includes(ButtonPressed.id)) {
            this.textAreaContent += keyPressed.textContent;
            caretPos = this.textAreaContent.length;
          }
      }
      this.textArea.textContent = this.textAreaContent;
      this.textArea.selectionStart = caretPos;
    } else if (event === 'up') {
      if (ButtonPressed.id === 'ShiftRight' || ButtonPressed.id === 'ShiftLeft') {
        this.shiftUp();
      }
    }
  }

  changeLanguage() {
    if (this.lang === 'en') {
      this.enKeys.forEach((elem) => elem.classList.add('hidden'));
      this.ruKeys.forEach((elem) => elem.classList.remove('hidden'));
      this.lang = 'ru';
    } else {
      this.enKeys.forEach((elem) => elem.classList.remove('hidden'));
      this.ruKeys.forEach((elem) => elem.classList.add('hidden'));
      this.lang = 'en';
    }
    localStorage.setItem('lang', this.lang);
  }

  /* hide all keys */
  offAllKeys() {
    this.caseDownKeys.forEach((elem) => elem.classList.add('hidden'));
    this.caseUpKeys.forEach((elem) => elem.classList.add('hidden'));
    this.capsKeys.forEach((elem) => elem.classList.add('hidden'));
    this.shiftCapsKeys.forEach((elem) => elem.classList.add('hidden'));
  }

  /* calls when shift Downs */
  shiftDown() {
    if (this.state !== 'shiftCaps') {
      this.offAllKeys();
      this.caseUpKeys.forEach((elem) => elem.classList.remove('hidden'));
      this.state = 'caseUp';
    }
  }

  /* calls when shift Ups */
  shiftUp() {
    this.caseUpKeys.forEach((elem) => elem.classList.add('hidden'));
    if (this.state === 'shiftCaps') {
      this.state = 'caps';
      this.capsKeys.forEach((elem) => elem.classList.remove('hidden'));
      this.shiftCapsKeys.forEach((elem) => elem.classList.add('hidden'));
    } else {
      this.caseDownKeys.forEach((elem) => elem.classList.remove('hidden'));
      this.state = 'caseDown';
    }
  }

  /* calls when CapsLock clicked */
  caps() {
    this.offAllKeys();
    if (this.state !== 'caps') {
      this.capsKeys.forEach((elem) => elem.classList.remove('hidden'));
      this.state = 'caps';
    } else {
      this.state = 'caseDown';
      this.caseDownKeys.forEach((elem) => elem.classList.remove('hidden'));
    }
  }

  /* calls when CapsLock and shift clicked */
  shiftCaps() {
    if (this.state !== 'shiftCaps') {
      this.offAllKeys();
      this.shiftCapsKeys.forEach((elem) => elem.classList.remove('hidden'));
      this.state = 'shiftCaps';
    }
  }
}
