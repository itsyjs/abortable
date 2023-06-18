export function useAbortable(callbacks?: Callbacks): Abortable

interface Callbacks {
  updateCb: (args: any) => Promise<any>;
  catchCb: (err: Error) => void;
  finallyCb: () => void;
}

interface Abortable {
  setCallbacks: (callbacks: Callbacks) => void;
  readonly signal: AbortSignal;
  update: (args: any) => Promise<any>;
}
