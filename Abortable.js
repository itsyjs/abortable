export class Abortable {
  #inProgress = false
  #updateCb
  #catchCb
  #finallyCb
  controller
  signal

  constructor() {
    this.controller = new AbortController()
    this.signal = this.controller.signal
  }

  callbacks({ updateCb, catchCb, finallyCb }) {
    this.#updateCb = updateCb
    this.#catchCb = catchCb
    this.#finallyCb = finallyCb
  }

  async update() {
    if (this.#inProgress) this.controller.abort()
    this.#inProgress = true
    try {
      return await this.#updateCb()
    } catch (err) {
      this.#catchCb?.(err)
    } finally {
      this.#inProgress = false
      this.#finallyCb?.()
    }
  }
}
