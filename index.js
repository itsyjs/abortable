export const useAbortable = ({ updateCb, catchCb, finallyCb } = {}) => {
  const controller = new AbortController()
  let inProgress = false

  let $updateCb = updateCb
  let $catchCb = catchCb
  let $finallyCb = finallyCb

  return {
    setCallbacks({ updateCb, catchCb, finallyCb }) {
      $updateCb = updateCb
      $catchCb = catchCb
      $finallyCb = finallyCb
    },
    get signal() { return controller.signal },
    async update(...args) {
      if (inProgress) controller.abort()
      inProgress = true
      try {
        return await $updateCb(...args)
      } catch (err) {
        $catchCb?.(err)
      } finally {
        inProgress = false
        $finallyCb?.()
      }
    }
  }
}
