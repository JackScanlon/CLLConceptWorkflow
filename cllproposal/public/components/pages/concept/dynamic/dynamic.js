/************************************************************
 *                                                          *
 *                           Wizard                         *
 *                                                          *
 ************************************************************/
const NUM_STEPS = 5;
const WIZARD_DOCS = [
  '/public/components/concepts/details.html',
  '/public/components/concepts/publications.html',
  '/public/components/concepts/validation.html',
  '/public/components/concepts/permissions.html',
  '/public/components/concepts/rules.html',
];
const WIZARD_STEPS = {
  details: 0,
  publication: 1,
  validation: 2,
  permissions: 3,
  rules: 4,
};

class WizardDemo {
  constructor(step) {
    this.step = step || WIZARD_STEPS.details;
    this.#initialise();
  }

  #initialise() {
    let nextPage = document.querySelector('#next-wizard-step');
    let prevPage = document.querySelector('#prev-wizard-step');
    nextPage.addEventListener('click', (e) => {
      this.nextPage();
    });
    prevPage.addEventListener('click', (e) => {
      this.prevPage();
    });

    let anchors = document.querySelectorAll('.steps-wizard > ul > li > a');
    anchors.forEach(a => {
      a.addEventListener('click', (e) => {
        this.loadStep(WIZARD_STEPS[a.parentElement.id]);
      });
    });

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

    this.#applyNavigationStyle();
    this.loadStep();
  }

  #applyNavigationStyle = () => {
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
  
  #applyCreatorElements() {
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

  #applyPublicationElements() {
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

  #attachBehaviour() {
    switch (this.step) {
      case WIZARD_STEPS.rules: {
        this.#applyCreatorElements();
      } break;

      case WIZARD_STEPS.publication: {
        this.#applyPublicationElements();
      } break;

      default: {

      } break;
    }
  }

  #reconcilePagination() {
    let prevPage = document.querySelector('#prev-wizard-step');
    prevPage.disabled = this.step <= 0;
    
    let steps = document.querySelectorAll('.steps-wizard > ul > li');
    steps.forEach(e => {
      let stage = WIZARD_STEPS[e.id];
      if (stage < this.step) {
        e.setAttribute('marked', 'complete');
        e.querySelector('a').disabled = false;
      } else if (stage > this.step || typeof stage === 'undefined') {
        e.setAttribute('marked', 'locked');
        e.querySelector('a').disabled = true;
      } else {
        e.setAttribute('marked', 'current');
      }
    });

    return this;
  }

  async nextPage() {
    this.step = (this.step + 1) % NUM_STEPS;
    return this.loadStep();
  }

  async prevPage() {
    this.step = (this.step - 1 + NUM_STEPS) % NUM_STEPS;
    return this.loadStep();
  }


  async loadStep(page) {
    if (typeof page !== 'undefined') {
      this.step = Math.min(Math.max(page, 0), NUM_STEPS);
    }

    let slot = document.querySelector('slot.content');
    let uri = WIZARD_DOCS[this.step];
    return fetch(uri)
          .then(response => response.text())
          .then(text => slot.innerHTML = text)
          .then(() => this.#attachBehaviour())
          .then(() => this.#reconcilePagination());
  }
};


/************************************************************
 *                                                          *
 *                            Main                          *
 *                                                          *
 ************************************************************/
document.addEventListener('DOMContentLoaded', () => {
  const app = new WizardDemo();


}, false);