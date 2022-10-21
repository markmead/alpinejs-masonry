# Alpine JS Masonry

Create masonry layouts based on your CSS grid values 🎉

![Alpine JS Masonry](https://user-images.githubusercontent.com/50486078/196979467-7dde0de1-4d4d-46af-88b0-3978e0dd6af4.jpg)

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
import masonry from 'alpinejs-masonry'

Alpine.plugin(masonry)

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

_Fixed heights are not necessary!_

Under the hood `x-masonry` will do all the work for you and will even handle
when the user resizes the window.

### Options

#### Delay Building Masonry Grid

If needed, you can pass the `wait` modifier with a duration in milliseconds like
this.

```html
<ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" x-data x-masonry.wait.2500>
  ...
</ul>
```

This will trigger the masonry grid to build after 2500ms, this is helpful when
you have slow content that takes a while to load. However, I'd recommend using
the `poll` modifier.

#### Rebuilding Masonry Grid Automatically

If needed, you can pass the `poll` modifier with a duration in milliseconds like
this.

```html
<ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" x-data x-masonry.poll.2500>
  ...
</ul>
```

This will trigger the masonry grid to reload every 2500ms, this is helpful when
content is being added dynamically.

#### Rebuilding Masonry Grid with Event

You can also trigger the `reload:masonry` on the window to trigger the masonry
grid to reload.

This can be done easily with `$dispatch('reload:masonry')` in Alpine JS.

## Issues

### Grid Items Stretching

This can be fixed by adding `align-items: flex-start` to the element with
`display: grid`.

## Stats

![](https://img.shields.io/bundlephobia/min/alpinejs-masonry)
![](https://img.shields.io/npm/v/alpinejs-masonry)
![](https://img.shields.io/npm/dt/alpinejs-masonry)
![](https://img.shields.io/github/license/markmead/alpinejs-masonry)
