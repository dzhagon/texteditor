const $textEditor = document.querySelector('#texteditor')
const $cursor = document.querySelector('#cursor')

const $text = document.querySelector('#text')
$text.insertAdjacentElement('beforeend', $cursor)

const getTextNode = () => Array.prototype.filter.call($text.childNodes, child => child.nodeType === Node.TEXT_NODE)[0];

const render = () => {
  writeTextNode(model.text)
}


const handlers = {
  'Backspace': (ctrl, shift, alt) => {
    const text = model.text
    let sliceIndex = text.length-1
    if (ctrl) {
      sliceIndex = text.lastIndexOf(' ')

      console.log('CTRL', sliceIndex, text.length)
      if (text[text.length - 2] === ' ') {
        console.log('----------------------')
        return model.text = text.replace(/\s{1,}$/smi, '')
      }
      if (sliceIndex === -1) sliceIndex = 0
    }
    model.text = text.slice(0, sliceIndex)
  },
  'ArrowUp': () => {

  }, 
  'ArrowDown': () => {

  },
  'ArrowLeft': () => {

  },
  'ArrowRight': () => {

  },
}

const writeTextNode = (val) =>  {
  $textNode = getTextNode()
  if (!$textNode) {
    $textNode = $text.insertAdjacentText('afterbegin', val)
  } else {
    $textNode.textContent = val
  }
}
const keypress = (e) => {
  if (e.code in handlers) return
  const s = e.key
  model.text += s
  model.cursor.col++
  render()
  console.log(model.text)
}
const keydown = (e) => {
  if (e.code in handlers) {
    if (e.ctrlKey ||  e.shiftKey ||  e.altKey) {
      e.preventDefault()
      e.stopPropagation()
    }
    handlers[e.code](e.ctrlKey, e.shiftKey, e.altKey)
    
    render()
  }
  console.log(e)

}
document.addEventListener('keypress', keypress)
document.addEventListener('keydown', keydown)


const model = {
  text: '',
  
  rows: [],
  charsInRow: 150,
  cursor: {
    row: 0, col: 0
  }
}


const textEditor =  {
  // case 1: type something in a row, when its become more than 150 increase row count
  // case 2: blinking cursor
  load() {
    return {}
  }
}