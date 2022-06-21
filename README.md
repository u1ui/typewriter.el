# &lt;u1-typewriter&gt; - element
Simple typewriter element

## ussage

```html
<u1-typewriter autostart loop>
    Even <i>HTML</i> <u>content</u>
</u1-typewriter>
```

## attributes

- `autostart`: starts if in viewport, stops if out of viewport  
- `loop`: restarts if at end

## api

- element.play()
- element.pause()
- element.reset()
- event "u1-typewriter-end"

## CSS

There no default CSS that will affect your styles.

```css
u1-typewriter .-Char { ... } /* the char */
u1-typewriter .-Active .-Char { ... } /* the active char */
u1-typewriter .-Caret { ... } /* the caret (It moves and is in the active char element) */
```

## Demos

https://raw.githack.com/u1ui/typewriter.el/main/tests/minimal.html  
https://raw.githack.com/u1ui/typewriter.el/main/tests/test.html

## Ussage

```html
<u1-typewriter autoplay loop audio>
    <h2>Lorem ipsum</h2>
    <i>dolor</i> sit amet, <b>consectetur</b> adipiscing elit.
</u1-typewriter>
```

## Install

```html
<link href="https://cdn.jsdelivr.net/gh/u1ui/typewriter.el@3.0.0/typewriter.min.css" rel=stylesheet>
<script src="https://cdn.jsdelivr.net/gh/u1ui/typewriter.el@3.0.0/typewriter.min.js" type=module>
```

## Demo

https://raw.githack.com/u1ui/typewriter.el/main/tests/minimal.html  
https://raw.githack.com/u1ui/typewriter.el/main/tests/test.html  

## About

- MIT License, Copyright (c) 2022 <u1> (like all repositories in this organization) <br>
- Suggestions, ideas, finding bugs and making pull requests make us very happy. ♥

