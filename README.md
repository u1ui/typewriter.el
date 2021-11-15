# typewriter.el
Easy to use typewriter element.

# ussage

```html
<u1-typewriter autostart loop>
    Write <i>like</i> a <u>typewriter</u>
</u1-typewriter>
```

# attributes
autostart: starts if in viewport, stops if out of viewport  
loop: restarts if at end

# api
- element.play()
- element.pause()
- element.reset()

# CSS
There is no default CSS that interferes with your styles.

```css
u1-typewriter .-Char { ... }
u1-typewriter .-Char > span { ... } /* the char itself */
u1-typewriter .-Active > span { ... } /* the active char */
u1-typewriter .-Caret { ... } /* the caret (It moves and is in the active char element) */
```