import { defineBoot } from '#q-app/wrappers'
import store from 'src/store'

export default defineBoot(({ app }) => {
  app.use(store)
})
