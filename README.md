# Alpine JS Masonry

Create masonry layouts based on your CSS grid values 🎉

## Install

### With a CDN

```html
<script
  defer
  src="https://unpkg.com/alpinejs-masonry@latest/dist/masonry.min.js"
></script>

<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### With a Package Manager

```shell
yarn add -D alpinejs-masonry

npm install -D alpinejs-masonry
```

```js
import Alpine from 'alpinejs'
import component from 'alpinejs-masonry'

Alpine.plugin(component)

Alpine.start()
```

## Example

```html
<ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" x-data x-masonry>
  <li class="bg-slate-800 text-white p-4 rounded h-64">Item 1</li>
  <li class="bg-slate-800 text-white p-4 rounded h-32">Item 2</li>
  <li class="bg-slate-800 text-white p-4 rounded h-16">Item 3</li>
  <li class="bg-slate-800 text-white p-4 rounded h-72">Item 4</li>
  <li class="bg-slate-800 text-white p-4 rounded h-48">Item 5</li>
  <li class="bg-slate-800 text-white p-4 rounded h-32">Item 6</li>
</ul>
```

And that's it.

Under the hood `x-masonry` will do all the work for you and will even handle
when the user resizes the window.

### Options

If needed, you can pass the `poll` modifier with a duration in milliseconds like
this.

```html
<ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" x-data x-masonry.poll.2500>
  ...
</ul>
```

This will trigger the masonry grid to be reloaded every 2500ms.

## Stats

![](https://img.shields.io/bundlephobia/min/alpinejs-masonry)
![](https://img.shields.io/npm/v/alpinejs-masonry)
![](https://img.shields.io/npm/dt/alpinejs-masonry)
![](https://img.shields.io/github/license/markmead/alpinejs-masonry)
