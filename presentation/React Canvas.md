footer: \#MelbJS March 11, 2015 — @plasticine
slidenumbers: true

# THIS SLIDE INTENTIONALLY BLANK
## LOL

***

# Things I Learned Messing Around with `react-canvas`

Justin Morris
@plasticine

![right](bobby-ross.png)

***

![inline autoplay loop](flipboard.mov)

***

> “You cannot build a 60fps scrolling list view with DOM…”
	— Flipboard[^1]

[^1]: http://engineering.flipboard.com/2015/02/mobile-web/

***

# Because “Jank”

>  “Jank is any stuttering, juddering or just plain halting that users see […] Jank is the result of frames taking too long for a browser to make, and it negatively impacts your users and how they experience your site or app.”
— jankfree.org

***

# But Drama!

![](leasidedrama.png)

- Don’t use this in production.
- Probably?
- …or do?
- I dunno.

Whatever. Do what you want.
Make you Users happy. ✌️

***

# But Drama!

![](leasidedrama.png)

> “To me, that Flipboard went this route is a scathing condemnation of the DOM/CSS web standards stack.”
	— John Gruber [^2]

[^2]: http://daringfireball.net/linked/2015/02/10/flipboard-web

***

# But Drama!

![](leasidedrama.png)

> “…[calling] what Flipboard unleashed onto the ‘Web’ version is akin to calling a collection of tires, AA batteries and spare car parts a Tesla.”
	— Faruk Ateş[^3]

[^3]: http://farukat.es/journal/2015/02/708-how-flipboard-chose-form-over-function-their-web-version

***

# But Drama!

![](leasidedrama.png)

> “60FPS being a ‘must have’ […] is to be scathingly condemned, while ignoring the enormous and extraordinary achievement of the technologies underlying the Web”
	— John Allsopp [^4]

[^4]: http://www.webdirections.org/blog/60fps-new-image-replacement-technique/

***

# Anyhoo…

![](leasidedrama.png)

Drama aside, it is technically pretty interesting, so let’s forget about all of that junk and pretend for the moment that this is a good idea, we’ll have more fun that way. :)

![right](fire vaccum.gif)

***

### TL;DR…
# What is `<canvas>`?

- Hardware accelerated, immediate mode bitmap rendering element
- It’s content exists outside of the DOM
- Draw stuff via scripting (Javascript usually)

``` html
<canvas></canvas> <!— I’m an image, kinda, sorta. —>
```

***

### TL;DR…
# What is `react-canvas`?

Bindings for React to render image data into a `<canvas>` context, instead of the DOM.

Brings many of the architectural wins of React (composition, data-flow, etc) to canvas rendering.

***

### TL;DR…
# What is `react-canvas`?

Other things doing similar things;

- React ART[^6] (ART / SVG bindings)
- React Native (Native bindings)
- React X11 (github.com/sidorares/node-x11)
- React WebGL…?

[^6]: https://github.com/reactjs/react-art

***

### TL;DR…
# What is `react-canvas`?

``` javascript
import canvas from ‘react-canvas’;

class CanvasApp extends React.Component {
  render() {
    let sweetStylez = { width: 100, height: 100, top: 50, left: 50, backgroundColor: '#ccc' };

    <canvas.Surface top={0} left={0} width={200} height={200}>
      <canvas.Layer style={sweetStylez} />
    </canvas.Surface>
  }
}

React.render(<CanvasApp/>, document.body);
```

***

### TL;DR…
# What is `react-canvas`?

``` html
<body>
  <canvas width=“200” height=“200” style=“width:200px; height:200px;” data-reactid=“.0”></canvas>
<body>
```

***

# `react-canvas` Primitive Components

- `<Surface>`
- `<Layer>`
- `<Group>`
- `<Text>`
- `<Image>`
- `<ListView>`

***

### `react-canvas` Primitive Components
# `<Surface>`

A root component for rendering in `react-canvas`.

This is where rendering to the DOM stops, and rendering to a `<canvas>` element starts.

***

### `react-canvas` Primitive Components
# `<Layer>`

The most basic drawing primitive.

Basic styling happens here.

***

### `react-canvas` Primitive Components
# `<Group>`

A container component, used to wrap collections of other drawing primitives.

***

### `react-canvas` Primitive Components
# `<Text>`

Render arbitrary text content.

Handles multi-line text and wrapping for you — something `<canvas>` does not handle for you.

***

### `react-canvas` Primitive Components
# `<Image>`

Render images into the `<canvas>`, handles image loading for you. Fancy!

***

### `react-canvas` Primitive Components
# `<ListView>`

Essentially a `UITableView` for touch scrolling in `<canvas>`

Handles unloading content outside of the viewport bounds.

***

### `react-canvas` API
# `measureText()`

Helper function to calculate text dimensions from font metrics.

Kind of insane-ish.

O_O

***

## Example<br>Time!

![](algebraic.gif)

***

# Issues

# There are dragons in these here waters.

![](SerpentsandDragons.jpg)

***

### Issues
# Accessibility

![](SerpentsandDragons.jpg)

The `<canvas>` element is inherently inaccessible.

- Screen reading / text to speach
- Focus highlighting
- Content zooming
- Content paging / announcing via gestures

***

### Issues
# Accessibility

![](SerpentsandDragons.jpg)

``` html
<canvas>
  Fallback content somehow?

  ¯\_(ツ)_/¯
</canvas>
```

***

### Issues
# Performance

![](SerpentsandDragons.jpg)

Image decoding in the main thread kills scrolling performance (unlike native).

No control over when GC happens (unlike native).

Touch latency / gesture recognisers not as good.

***

### Issues
# Progressive Enhancement

![](SerpentsandDragons.jpg)

Hahah, you’re funny. :)

***

### Issues
# Other Gotchas

![](SerpentsandDragons.jpg)

- Limited React `EventType` support;
	- `onTouchStart`
	- `onTouchMove`
	- `onTouchEnd`
	- `onTouchCancel`
	- `onClick`

***

### Issues
# Other Gotchas

![](SerpentsandDragons.jpg)

- `refs` don’t work
- Still very much a WIP
- is `0.13.0` only (which is OK as of today!)

***

#### The End
# Thanks!

References;
- github.com/plasticine/react-canvas-experiments
- github.com/Flipboard/react-canvas
- github.com/facebook/css-layout
