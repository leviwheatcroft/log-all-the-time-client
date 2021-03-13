const test = require('ava')

const {
  sortBefore
} = require('../../src/lib')

const _date = Date.now()
function getDate (offset = 0) {
  return new Date(_date + (offset * 1000))
}

test('isBefore 1', (t) => {
  const a = {
    createdAt: getDate(-1)
  }
  const b = {
    createdAt: getDate()
  }
  const sort = {
    createdAt: 'asc'
  }

  t.is(sortBefore(a, b, sort), true)
})
test('isBefore 2', (t) => {
  const a = {
    createdAt: getDate(+1)
  }
  const b = {
    createdAt: getDate()
  }
  const sort = {
    createdAt: 'asc'
  }

  t.is(sortBefore(a, b, sort), false)
})
test('isBefore 3', (t) => {
  const a = {
    createdAt: getDate(),
    date: getDate(-1)
  }
  const b = {
    createdAt: getDate(),
    date: getDate(-2)
  }
  const sort = {
    createdAt: 'asc',
    date: 'asc'
  }

  t.is(sortBefore(a, b, sort), false)
})
test('isBefore 4', (t) => {
  const a = {
    createdAt: getDate(),
    date: getDate(+1)
  }
  const b = {
    createdAt: getDate(),
    date: getDate(+2)
  }
  const sort = {
    createdAt: 'asc',
    date: 'asc'
  }

  t.is(sortBefore(a, b, sort), true)
})
