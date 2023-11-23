# @itsy/abortable

## use

```js
import { useAbortable } from '@itsy/abortable'

let loading = false
const updater = useAbortable()

updater.setCallbacks({
  async updateCb() {
    loading = true
    return await (await fetch('/foo/bar', { signal: updater.signal })).json()
  },
  catchCb(err) {
    console.error('Failed to update due to', err)
  },
  finallyCb() {
    loading = false
  }
})
```
