export default class Keyboard {
	constructor(node) {
		this.keyboardNode = node;
		this.textArea = document.querySelector('.text-area');
		this.keys = document.querySelectorAll('.keyboard__key');
		this.ruKeys = document.querySelectorAll('.ru');
		this.enKeys = document.querySelectorAll('.en');
		this.caseDownKeys = document.querySelectorAll('.caseDown');
		this.caseUpKeys = document.querySelectorAll('.caseUp');
		this.capsLetters = document.querySelectorAll('.caps');
		this.textAreaContent = '';
		this.lang = 'en';
		this.case = 'Down';
	}

	addMouseListeners() {
		this.keyboardNode.addEventListener('mousedown', e => {
			const clickedSymbol = e.target;
			const clickedButton = clickedSymbol.closest('.keyboard__key');
			if (clickedButton) {
				this.keyboardAction('down', clickedButton, clickedSymbol);
			}
		});

		this.keyboardNode.addEventListener('mouseup', e => {
			const clickedButton = e.target.closest('.keyboard__key');
			if (clickedButton) {
				this.keyboardAction('up', clickedButton);
			}
		});

		this.textArea.addEventListener('focusout', e => e.target.focus());
	}

	keyboardAction(event, ButtonPressed, keyPressed) {
		if (event === 'down') {
			switch (ButtonPressed.id) {
				case 'Backspace':
					this.textAreaContent = this.textAreaContent.slice(0, -1)
					break;
				case 'Delete':
					this.textAreaContent = this.textAreaContent.replace(this.textAreaContent.slice(this.textArea.selectionStart, this.textArea.selectionStart + 1), '')
					break;
				case 'Tab':
					this.textAreaContent += '\t';
					break;
				case 'Enter':
					this.textAreaContent += '\n';
					break;
				case 'CapsLock':
					this.isCaps();
					break;
				default:
					if (ButtonPressed.id === 'ShiftRight' || ButtonPressed.id === 'ShiftLeft') this.caseUp();
					else this.textAreaContent += keyPressed.textContent;
			}
			this.textArea.textContent = this.textAreaContent;
		} else if (event === 'up') {
			if (ButtonPressed.id === 'ShiftRight' || ButtonPressed.id === 'ShiftLeft') {
				this.caseDown();
			}
		}
	}

	caseUp() {
		this.capsLetters.forEach(elem => elem.classList.add('hidden'));
		this.caseUpKeys.forEach(elem => elem.classList.remove('hidden'));
		this.caseDownKeys.forEach(elem => elem.classList.add('hidden'));
		this.case = 'up';
	}

	caseDown() {
		this.capsLetters.forEach(elem => elem.classList.add('hidden'));
		this.caseUpKeys.forEach(elem => elem.classList.add('hidden'));
		this.caseDownKeys.forEach(elem => elem.classList.remove('hidden'));
		this.case = 'down';
	}

	isCaps() {
		this.capsLetters.forEach(elem => elem.classList.toggle('hidden'));
		this.caseUpKeys.forEach(elem => elem.classList.add('hidden'));
		this.caseDownKeys.forEach(elem => elem.classList.toggle('hidden'));
		this.case = 'up';
	}
}