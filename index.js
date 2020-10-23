function where () {
  if (window.getSelection().focusNode.parentNode) console.log(window.getSelection().focusNode.parentNode)
  document.execCommand('insertHTML', false, 
    `<span class='where'>`
    + document.getSelection()
    +`&#8203;</span>&nbsp;`
  );
  // window.getSelection().focusNode.addClass('cursor_blink')
}

function when () {
  if (window.getSelection().focusNode.parentNode) console.log(window.getSelection().focusNode.parentNode)
  document.execCommand('insertHTML', false, 
    `<span class='when'>`
    + document.getSelection()
    +`&#8203;</span>&nbsp;`
  );
  // window.getSelection().focusNode.addClass('cursor_blink')
}

function who () {
  if (window.getSelection().focusNode.parentNode) console.log(window.getSelection().focusNode.parentNode)
  document.execCommand('insertHTML', false, 
    `<span class='who'>`
    + document.getSelection()
    +`&#8203;</span>&nbsp;`
  );
  // window.getSelection().focusNode.addClass('cursor_blink')
}

function which () {
  if (window.getSelection().focusNode.parentNode) console.log(window.getSelection().focusNode.parentNode)
  document.execCommand('insertHTML', false, 
    `<span class='which'>`
    + document.getSelection()
    +`&#8203;</span>&nbsp;`
  );
}

function why () {
  if (window.getSelection().focusNode.parentNode) console.log(window.getSelection().focusNode.parentNode)
  document.execCommand('insertHTML', false, 
    `<span class='why'>`
    + document.getSelection()
    +`&#8203;</span>&nbsp;`
  );
}

function does () {
  if (window.getSelection().focusNode.parentNode) console.log(window.getSelection().focusNode.parentNode)
  document.execCommand('insertHTML', false, 
    `<span class='does'>`
    + document.getSelection()
    +`&#8203;</span>&nbsp;`
  );
}
function how () {
  if (window.getSelection().focusNode.parentNode) console.log(window.getSelection().focusNode.parentNode)
  document.execCommand('insertHTML', false, 
    `<span class='how'>`
    + document.getSelection()
    +`&#8203;</span>&nbsp;`
  );
}

function what () {

  if (window.getSelection().focusNode.parentNode) console.log(window.getSelection().focusNode.parentNode)
  document.execCommand('insertHTML', false, 
    `<span class='what'>`
    + document.getSelection()
    +`&#8203;</span>&nbsp;`
  );
}
const editor = document.querySelector('.texteditor')
editor.addEventListener('keydown', e => {
  if (e.code === 'Enter') {
    const parent = window.getSelection().focusNode.parentNode
    if (parent !== editor) {
      console.log('set selection after the node')
    }
  }
})