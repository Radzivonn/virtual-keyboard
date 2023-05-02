export default function getKeyboardLayout(ENkeys, RUkeys) {
  let layoutString = '<section class="keyboard"><div class="keyboard__row">';
  ENkeys.forEach((ENkey, i) => {
    const RUkey = RUkeys[i];
    layoutString
        += `<div class="keyboard__key" id="${ENkey.code}">
          <span class="ru"> 
            <span class="caseDown">${RUkey.key}</span>
            <span class="caseUp hidden">${RUkey.shift ? RUkey.shift : RUkey.key}</span>
            <span class="caps hidden">${RUkey.caps ? RUkey.caps : RUkey.key}</span>
            <span class="shiftCaps hidden">${RUkey.shiftCaps ? RUkey.shiftCaps : RUkey.key}</span>
          </span>
          <span class="en"> 
            <span class="caseDown">${ENkey.key}</span>
            <span class="caseUp hidden">${ENkey.shift ? ENkey.shift : ENkey.key}</span>
            <span class="caps hidden">${ENkey.caps ? ENkey.caps : ENkey.key}</span>
            <span class="shiftCaps hidden">${ENkey.shiftCaps ? ENkey.shiftCaps : ENkey.key}</span>
          </span>
        </div>`;
    if (ENkey.code === 'Backspace' || ENkey.code === 'Delete' || ENkey.code === 'Enter' || ENkey.code === 'ShiftRight' || ENkey.code === 'ControlRight') { layoutString += '</div><div class="keyboard__row">'; }
  });
  return `${layoutString}</section>`;
}
