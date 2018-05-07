# ninjacat everywhere 0.8848 - Emoji polyfill support for old Windows, iOS, Android and other devices

Do you dream you can use ninjacat emojis in all your sites but windows 10 systems only have able to display?
With this plugin you can spread all around the world your ninjacat passion! 🦄🐱❤️

_Not too seriuos, project made only for fun_

## Install

NPM
```sh
npm install -g ninjacat.everywhere [👷TBD] 
```

JS/CSS

Include in your page css and js script:

```html
<link rel="stylesheet" href="ninjacat.everywhere.css">
<script src="ninjacat.everywhere.js"></script>
```



## Basic usage

Wrap every text content with a class to make the magic 🌈

```html
<h2 class="we-all-love-ninjacat">🐱‍👤 🐱‍💻 🐱‍🏍️ 🐱‍🚀 🐱‍👓 🐱‍🐉</h2>
```

Run parse method at ready event
```js
$(function () {
    $(".we-all-love-ninjacat").each(function(){
    var el = $(this);
    ninjacateverywhere.parse(el);
    })
});
```

## Methods

Parse content to add support for ninjacat emojis:
```js
ninjacateverywhere.parse(<DOMElement>);
```

Check browser support:
```js
ninjacateverywhere.support();
```

Force using polyfill in all browsers:
```js
ninjacateverywhere.legacymode();
```

## Bugs

Please report any bugs to: https://github.com/inuyaksa/ninjacat.everywhere/issues

## License

Licensed under the MIT License: https://opensource.org/licenses/MIT
