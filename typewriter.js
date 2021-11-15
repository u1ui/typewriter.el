
const style = document.createElement('style');
style.innerHTML = `
u1-typewriter .-Char {
    position:relative;
}
u1-typewriter .-Char   > span { opacity: 0; }
u1-typewriter .-Active > span { opacity: 1; }
u1-typewriter .-Caret {
    position:absolute;
    animation: u1-typewriter-caret-ani .5s infinite alternate;
    height:1rem;
    width:2px;
    margin:auto;
    top:-.2rem;
    bottom:-.2rem;
    left: .1rem;
    background:currentColor;
}
@keyframes u1-typewriter-caret-ani {
    0% { opacity: 1; }
    25% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 0; }
}
`;
document.head.prepend(style);



class Typewriter extends HTMLElement {
    constructor() {
        super();

        this.innerHTML += '&nbsp;'; // one more char for caret
        separateChars(this);

        this.caretElement = document.createElement('span');
        this.caretElement.classList.add('-Caret');

        this.playInterval = null;
        this.intersectionObserver = new IntersectionObserver((entries)=>{
            entries[0].isIntersecting ? this.play() : this.pause();
        });

        this.reset();
    }

    static get observedAttributes() { return ['autoplay', 'loop'] }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'autoplay') this.intersectionObserver[newValue===null?'unobserve':'observe'](this);
    }

    play() {
        this.pause();
        this.playInterval = setTimeout(() => {
            this.play();
        }, 150);
        if (this.next() === false) {
            this.pause();
            if (this.hasAttribute('loop')) {
                setTimeout(() => {
                    this.reset();
                    this.play();
                }, 2000);
            }
        }
    }
    pause() {
        clearInterval(this.playInterval);
    }
    next() {
        this.activeChar.classList.add('-Active');
        let next = findNextChar(this, this.activeChar);
        if (!next) return false;
        next.append(this.caretElement)
        this.activeChar = next;
    }
    reset(){
        this.pause();
        this.querySelectorAll('.-Char').forEach(char => char.classList.remove('-Active'));
        let next = findNextChar(this, this);
        this.activeChar = next;
        next.append(this.caretElement)
    }

}
customElements.define('u1-typewriter', Typewriter);


// find the next Char in children or a sibling of the node but not outside the root
function findNextChar(root, node) {
    let next = null;
    if (node.classList.contains('-Char')) {
        next = node.nextElementSibling;
    } else {
        next = node.firstElementChild || node.nextElementSibling;
    }
    if (!next) {
        while(1) {
            node = node.parentNode;
            if (node === null) return null;
            if (node === root) return null;
            next = node.nextElementSibling
            if (next) break;
        }
    }
    if (!next) return null;

    if (next.classList.contains('-Char')) {
        return next;
    } else {
        return findNextChar(root, next);
    }
}


function separateChars(parent) {
    for (let node of Array.from(parent.childNodes)) {
        if (node.nodeType === 3) {
            let str = node.data;
            //str = str.trim(); // bad for html-formated text
            str = str.replace(/\s+/g, ' ');
            for (let char of str) {
                let span = document.createElement('span');
                span.classList.add('-Char');
                span.innerHTML = '<span>'+char+'</span>';
                node.parentNode.insertBefore(span, node);
            }
            node.remove();
        } else {
            separateChars(node);
        }
    }
}





/*
class counter extends HTMLElement {
    constructor() {
        super();

        this._start = 0;
        this._end = Number(this.innerHTML.replace("'",''));

        this.animatedValue = 0;

        this._observer = new IntersectionObserver((entries)=>{
            entries[0].isIntersecting ? this._animate(this._start, this._end) : this._reset();
        });
    }
    // set value
    static get observedAttributes() { return ['value', 'from', 'no-grouping'] }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value') this.value = newValue;
        if (name === 'from') this._start = parseFloat(newValue);
        console.log(this._start)
        if (name === 'no-grouping') this.noGrouping = newValue!==null;
    }
    set value(value){
        let [ integer, digits='' ] = value.trim().split('.');
        this._minDigits = digits.length;

        this._end = Number(value);
        // todo: recalculate finalWidth
        this._animate(this.animatedValue, this._end);
    }

    connectedCallback() {
        // measure final-width
        this.innerHTML = format(this, this._end);
        let widthPx = this.offsetWidth;
        const fontSizePx = Number(getComputedStyle(this).getPropertyValue('font-size').slice(0,-2));
        const em = widthPx / fontSizePx;
        this.style.setProperty('--finalWidth', em+'em');

        this._reset();

        this._observer.observe(this);
    }
    disconnectedCallback() {
        this._observer.disconnect(this)
    }
    _animate(from, to) { // todo easing
        const duration = 1000;
        const frames = Math.ceil(duration / 16);
        let step = (to - from) / frames;
        this._stop();
        this.animatedValue = from;
        this._interval = setInterval(()=>{
            this.animatedValue += step;
            if (step>0 ? this.animatedValue>=to : this.animatedValue<=to) {
                this.animatedValue = to;
                this._stop();
            }
            this._draw()
        },15)
    }
    _stop() {
        clearInterval(this._interval);
    }
    _reset() {
        this._stop();
        this.animatedValue = this._end;
        this._draw();
    }
    _draw(){
        requestAnimationFrame(()=> this.innerHTML = format(this, this.animatedValue) );
    }
    //customProperty(property) { return getComputedStyle(this).getPropertyValue('--u1-carousel-' + property); }
}
*/