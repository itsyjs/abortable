# @itsy/abortable

## use

```js
import { Abortable } from '@itsy/abortable'
import ky from 'ky'

let loading = false
const updater = new Abortable()

updater.callbacks({
  updateCb() {
    loading = true
    return ky.get('/foo/bar', { signal: updater.signal })
  },
  catchCb(err) {
    console.error('Failed to update due to', err)
  },
  finallyCb() {
    loading = false
  }
})
```
