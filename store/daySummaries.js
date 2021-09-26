import {
  midnightUtcMs,
  offsetByDaysMs
} from '../lib/dates'
import {
  assert
} from '../lib/types'

export const state = () => {
  const dayCount = 3
  const dateTo = midnightUtcMs(Date.now())
  const dateFrom = offsetByDaysMs(dateTo, (dayCount - 1) * -1)
  return {
    daySummariesById: {},
    maxDayDuration: 0,
    dateFrom,
    dateTo,
    dayCount
  }
}

export const mutations = {

  add (state, entry) {
    assert('isEntry', entry)
    const {
      project: {
        id,
        projectName
      },
      duration,
      date
    } = entry
    if (
      date < state.dateFrom ||
      date > state.dateTo
    )
      return
    if (!state.daySummariesById[date]) {
      state.daySummariesById[date] = {
        dayDuration: 0,
        projectSummariesById: {}
      }
    }
    const daySummary = state.daySummariesById[date]
    const projectId = `${date}-${id}`
    if (!daySummary.projectSummariesById[projectId]) {
      daySummary.projectSummariesById[projectId] = {
        id,
        projectName,
        projectDuration: duration
      }
    } else {
      daySummary.projectSummariesById[projectId].projectDuration += duration
    }
    setMeta(state)
  },

  remove (state, entry) {
    assert('isEntry', entry)
    const {
      project: {
        id
      },
      duration,
      date
    } = entry
    if (
      date < state.dateFrom ||
      date > state.dateTo
    )
      return
    state.daySummariesById[date].projectSummariesById[id].duration -= duration
    // delete project but leave date
    if (state.daySummariesById[date].projectSummariesById[id].duration === 0)
      delete state.daySummariesById[date].projectSummariesById[id]
    setMeta(state)
  },

  set (state, { daySummaries, maxDayDuration }) {
    state.maxDayDuration = maxDayDuration
    state.daySummariesById = Object.fromEntries(
      // daySummaries will be immutable apollo response
      daySummaries
        .map((d) => d)
        // .sort method is inplace, so you need to clone the array first
        .sort((a, b) => b.date - a.date)
        .map((daySummary) => [
          daySummary.id,
          {
            id: daySummary.id,
            date: daySummary.date,
            dayDuration: daySummary.dayDuration,
            projectSummariesById: Object.fromEntries(
              daySummary.projectSummaries.map((projectSummary) => [
                projectSummary.id,
                {
                  id: projectSummary.id,
                  projectName: projectSummary.projectName,
                  projectDuration: projectSummary.projectDuration,
                  portion: projectSummary.portion
                }
              ])
            )
          }
        ])
    )
  },

  dayCount (state, dayCount) {
    state.dayCount = dayCount
    state.dateFrom = offsetByDaysMs(state.dateTo, (dayCount - 1) * -1)
  },

  period (state, direction) {
    state.dateTo = offsetByDaysMs(
      state.dateTo,
      state.dayCount * direction
    )
    state.dateFrom = offsetByDaysMs(
      state.dateFrom,
      (state.dayCount - 1) * direction
    )
  }
}

function setMeta (state) {
  const {
    daySummariesById
  } = state

  const daySummaries = Object.values(daySummariesById)

  // set dayDurations
  daySummaries.forEach((d) => {
    d.dayDuration = Object.values(d.projectSummariesById).reduce((_, p) => {
      return _ + p.projectDuration
    }, 0)
  })

  // get max
  const maxDayDuration = Math.max(
    ...daySummaries.map(({ dayDuration }) => dayDuration)
  )

  // set portions as duration / maxTotalDuration
  daySummaries.forEach((d) => {
    let portionConsumed = 0
    const projectSummaries = Object.values(d.projectSummariesById)
    projectSummaries.forEach((p, idx) => {
      // for days where dayDuration === maxDayDuration, the projects must
      // sum to 100
      if (
        d.dayDuration === maxDayDuration &&
        idx === projectSummaries.length - 1
      ) {
        p.portion = 100 - portionConsumed
      } else {
        p.portion =
          Math.round((p.projectDuration / maxDayDuration) * 10000) / 100
        portionConsumed += p.portion
      }
    })
  })
}

// function setMetad (day, date) {
//   if (typeof date === 'string')
//     date = parseInt(date, 10)
//   const projects = Object.values(day)
//   const totalDuration = projects.reduce((_, { duration }) => _ + duration, 0)
//   let totalPortion = 0
//   projects.forEach((project, idx) => {
//     if (idx === projects.length - 1) {
//       project.portion = 100 - totalPortion
//     } else {
//       project.portion = Math.floor((project.duration / totalDuration) * 100)
//       totalPortion += project.portion
//     }
//   })
//   // set non-enumerable properties
//   Object.defineProperty(day, 'totalDuration', { value: totalDuration })
//   Object.defineProperty(day, 'date', { value: date })
// }
