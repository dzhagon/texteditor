function loadScenario() {
  const editor = document.querySelector('.texteditor');
  const sample = `На сайте​ , после загрузки страницы ​ пользователь​ ​  гость​  пытается загрузить аплоад путём drag'n'drop картинки на сцену, чтобы иметь возможность редактировать её.`;
  const text = localStorage['scenario'] || sample;
  editor.innerHTML = text;
}

function saveScenario() {
  const editor = document.querySelector('.texteditor');
  localStorage['scenario'] = editor.innerHTML;
}

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  } else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}
const actions = {
  list: ['where', 'when', 'who', 'which', 'does', 'how', 'what', 'why'],
  run(e, command) {
    if (!this.list.includes(command)) return;
    const selection = document.getSelection();
    const closestLemma = selection.focusNode.parentElement;
    console.dir(selection, closestLemma);

    if (e.altKey && closestLemma && window.confirm('Точно хотите удалить?')) {
      closestLemma.outerHTML = closestLemma.innerHTML;
      console.log(closestLemma.outerHTML);
    } else {
      document.execCommand(
        'insertHTML',
        false,
        `<span class='${command} lemma'>` +
          document.getSelection() +
          `&#8203;</span>&nbsp;`
      );
    }
    update();
  },
};

function getSentences() {
  const text = document.querySelector('.texteditor').innerHTML;
  const sentences = text
    .split('.')
    .map((v) => v.trim().trim('&#8203;'))
    .filter((v) => v);
  return sentences;
}

function getModel() {
  const model = {};
  model.sentences = getSentences();
  actions.list.forEach((lemma) => {
    model[lemma] = [...editor.querySelectorAll('.' + lemma)].map(
      (v) => v.innerText
    );
  });
  return model;
}

function update() {
  if (window.getSelection().focusNode.parentNode)
    console.log(window.getSelection().focusNode.parentNode);

  saveScenario();

  const model = getModel();

  const preview = document.querySelector('.preview');
  preview.innerHTML = `<pre>${JSON.stringify(model, null, 2)}</pre>`;
}

function setCaretToPos(input, pos) {
  setSelectionRange(input, pos, pos);
}

function getCaret(el) {
  if (el.selectionStart) {
    return el.selectionStart;
  } else if (document.selection) {
    el.focus();

    var r = document.selection.createRange();
    if (r == null) {
      return 0;
    }

    var re = el.createTextRange(),
      rc = re.duplicate();
    re.moveToBookmark(r.getBookmark());
    rc.setEndPoint('EndToStart', re);

    var add_newlines = 0;
    for (var i = 0; i < rc.text.length; i++) {
      if (rc.text.substr(i, 2) == '\r\n') {
        add_newlines += 2;
        i++;
      }
    }
    //return rc.text.length + add_newlines;

    //We need to substract the no. of lines
    return rc.text.length - add_newlines;
  }
  return 0;
}

const editor = document.querySelector('.texteditor');
loadScenario();
editor.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    const parent = window.getSelection().focusNode.parentNode;
    if (parent !== editor) {
      console.log('set selection after the node');
    }
  }
  saveScenario();
});
document.addEventListener('click', (e) => {
  const lemmas = e.path.filter((v) => v.classList?.contains('lemma'));
  const closestLemma = lemmas[0];
  if (e.altKey && closestLemma && window.confirm('Точно хотите удалить?')) {
    closestLemma.outerHTML = closestLemma.innerHTML;
    console.log(closestLemma.outerHTML);
  }
});
