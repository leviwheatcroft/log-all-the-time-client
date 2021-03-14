## date locales

https://stackoverflow.com/questions/673905/best-way-to-determine-users-locale-within-browser

https://www.npmjs.com/package/navigator-languages

dayjs has some support for this.

I think the best approach will be:
 - detect locale with something like the navigator-languages package
 - load the appropriate dayjs plugin
 - create a function to parse / stringify dates

vue2-date-picker
you can pass a formatter prop:

https://github.com/mengxiong10/vue2-datepicker#formatter

## dates in client

in some places (like apollo cache) dates are ms, in other places (most ui components) they're instances of date.

Would be nice to have one or the other.

ms are easier to reason about.
ms are easier to compare for equality (date.valueOf() === date.valueOf())
dates are easier to read.


I'm not sure if it's possible to configure apollo client cache to use date objects, or what the ramifications would be even if you could do that. When something comes out of the cache or in a response are they ms or Date instances?
