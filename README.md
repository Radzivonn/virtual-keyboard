# Virtual Keyboard

### Functional:

- if several buttons are pressed, all the pressed buttons are highlighted on the virtual keyboard (there're no exceptions for `Ctrl`, `Alt` and `Shift` as well)
  ![screenshot](images/virtual-keyboard-2.png)
- the virtual keyboard is able to switch between two language layouts (English + any other language).
  - assigning a keyboard shortcut for switching keyboard layout is up to you.
  - the buttons on the virtual keyboard display symbols of a selected language
  - the application saves a chosen language after the page is reloaded and displays the keyboard on that language
  - the keyboard shortcut for changing language should be indicated on the page so that it will be clear for a user how to switch keyboard layout
- keystrokes are animated
- clicks on the buttons with a mouse on the virtual keyboard and pressing keys on a physical keyboard should input symbols to the text area located on the page above the virtual keyboard.
  - pressing the `Up`, `Down`, `Left` or `Right` arrow key inputs an arrow symbol in the input field, or implements navigation on the text area.
  - pressing the `Enter` should move a text cursor to the next line
  - the `Tab` key creates a horizontal indent
  - pressing the rest of the function keys on a keyboard does not result in inputting symbols
  - the `Backspace` key removes character before the text cursor
  - the `Del` key removes character after the text cursor
  - the `Shift`, `Alt`, `Ctrl`, `Caps lock` and `Space` keys should work as on a real keyboard
