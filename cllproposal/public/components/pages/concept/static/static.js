/************************************************************
 *                                                          *
 *                            Misc.                         *
 *                                                          *
 ************************************************************/

// Adds dropshadow when the client scrolls past the navigation height
// Used to differentiate the flat UI with the rest of the page content
const applyNavigationStyle = () => {
  let navbar = document.querySelector('nav');
  document.addEventListener('scroll', (e) => {
    let y = window.scrollY;
    let r = navbar.clientHeight / 2;

    if (y >= r) {
      navbar.classList.add('scrolled');
      return;
    }

    navbar.classList.remove('scrolled');
  });
}

const applyCreatorElements = () => {
  let buttons = document.querySelectorAll('.ruleset-options > button');
  buttons = Array.prototype.filter.call(buttons, (e) => {
    return typeof e.id !== undefined && e.id.length > 0;
  });

  let slot = document.querySelector('#creator-add-codes');
  buttons.forEach(btn => {
    btn.addEventListener('click', e => {
      if (slot.value == btn.id) {
        slot.innerHTML = '';
        slot.value = '';
        slot.classList.add('hidden');
        slot.setAttribute('aria-hidden', 'true');
        return;
      }
      
      fetch(`/public/components/rulesets/${btn.id}.html`)
      .then(response => response.text())
      .then(text => slot.innerHTML = text)
      .then(() => {
        slot.value = btn.id;
        slot.classList.remove('hidden');
        slot.setAttribute('aria-hidden', 'false');
      });
    });
  });
}

const applyPublicationElements = () => {
  let elements = document.querySelectorAll('.publication-list > button');
  elements.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.classList.contains('is-primary'))
        return;

      let active = Array.prototype.find.call(elements, x => x.classList.contains('is-primary'));
      if (typeof active !== 'undefined')
        active.classList.remove('is-primary');

      btn.classList.add('is-primary');
    });
  });
}

const applyRadioRules = () => {
  document.querySelector('body').addEventListener('click', e => {
    if (e.target.classList.contains('ruleset-radio-lbl')) {
      e.preventDefault();
      e.stopPropagation();

      let form = e.target.parentElement.parentElement;
      let input = form.querySelector(`input.${e.target.getAttribute('for')}`);
      if (form.getAttribute('action') > 0) {
        input.checked = true;
      } else {
        input.checked = !input.checked;
      }
    }
  });
}


/************************************************************
 *                                                          *
 *                            Main                          *
 *                                                          *
 ************************************************************/

document.addEventListener('DOMContentLoaded', () => {
  applyNavigationStyle();
  applyCreatorElements();
  applyPublicationElements();
  applyRadioRules();
}, false);
