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
