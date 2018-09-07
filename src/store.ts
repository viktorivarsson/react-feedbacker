interface NotifyAction {
  payload: NotifyItem;
  type: 'INSERT' | 'CLOSE' | 'DELETE';
}

export type NotifyKind = 'error' | 'success' | 'warning' | 'info';

type NotifyStatus = 'open' | 'closing';

type NotifyState = NotifyItem[];

export interface NotifyItem {
  id: string;
  message: string;
  kind: NotifyKind;
  status: NotifyStatus;
}

type Reducer = (state: NotifyState, action: NotifyAction) => NotifyState;

type NotifyListener = () => void;

export const closeItem = (item: NotifyItem): NotifyItem =>
  Object.assign(item, {
    status: 'closing',
  });

const notifyReducer: Reducer = (
  state: NotifyState,
  { type, payload }: NotifyAction,
) => {
  switch (type) {
    case 'INSERT':
      return [...state, payload];
    case 'CLOSE':
      return state.map(
        entry => (entry.id === payload.id ? closeItem(entry) : entry),
      );
    case 'DELETE':
      return state.filter(entry => entry.id !== payload.id);
    default:
      return state;
  }
};

const createStore = (reducer: Reducer) => {
  let state: NotifyState = [];
  let listeners: NotifyListener[] = [];

  const getState = () => state;

  const dispatch = (action: NotifyAction) => {
    const oldState = state;

    state = reducer(state, action);

    if (oldState !== state) {
      listeners.forEach(listener => listener());
    }
  };

  const subscribe = (listener: NotifyListener) => {
    listeners = [...listeners, listener];

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  const reset = () => {
    state = [];
  };

  return {
    dispatch,
    getListeners: () => listeners,
    getState,
    reset,
    subscribe,
  };
};

const store = createStore(notifyReducer);

export default store;
