# typewriter.el
Easy to use typewriter element.

# ussage

```html
<u1-typewriter autostart loop>
    Even <i>HTML</i> <u>content</u>
</u1-typewriter>
```

# attributes
autostart: starts if in viewport, stops if out of viewport  
loop: restarts if at end

# api
- element.play()
- element.pause()
- element.reset()
- event "u1-typewriter-end"

# CSS
There is no default CSS that interferes with your styles.

```css
u1-typewriter .-Char { ... } /* the char */
u1-typewriter .-Active .-Char { ... } /* the active char */
u1-typewriter .-Caret { ... } /* the caret (It moves and is in the active char element) */
```
