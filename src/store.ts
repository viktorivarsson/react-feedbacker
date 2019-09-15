import { ReactNode } from 'react';

interface FeedbackAction {
  payload: FeedbackItem;
  type: 'INSERT' | 'CLOSE' | 'DELETE';
}

export type FeedbackKind = 'error' | 'success' | 'warning' | 'info';

export type FeedbackStatus = 'open' | 'closing';

type FeedbackState = FeedbackItem[];

export interface FeedbackItem {
  id: string;
  message: ReactNode;
  kind: FeedbackKind;
  status: FeedbackStatus;
}

type Reducer = (state: FeedbackState, action: FeedbackAction) => FeedbackState;

type FeedbackListener = () => void;

export const closeItem = (item: FeedbackItem): FeedbackItem =>
  Object.assign(item, {
    status: 'closing',
  });

const feedbackReducer: Reducer = (
  state: FeedbackState,
  { type, payload }: FeedbackAction,
) => {
  switch (type) {
    case 'INSERT':
      return [...state, payload];
    case 'CLOSE':
      return state.map(entry =>
        entry.id === payload.id ? closeItem(entry) : entry,
      );
    case 'DELETE':
      return state.filter(entry => entry.id !== payload.id);
    default:
      return state;
  }
};

const createStore = (reducer: Reducer) => {
  let state: FeedbackState = [];
  let listeners: FeedbackListener[] = [];

  const getState = () => state;

  const dispatch = (action: FeedbackAction) => {
    const oldState = state;

    state = reducer(state, action);

    if (oldState !== state) {
      listeners.forEach(listener => listener());
    }
  };

  const subscribe = (listener: FeedbackListener) => {
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

const store = createStore(feedbackReducer);

export default store;
