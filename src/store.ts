import { ReactNode } from 'react';
import { DEFAULT_NAMESPACE } from './utils';

type FeedbackAction = {
  payload: FeedbackItem;
  type: 'APPEND' | 'PREPEND' | 'CLOSE' | 'DELETE';
};

export type FeedbackKind = 'error' | 'success' | 'warning' | 'info';

export type FeedbackStatus = 'open' | 'closing';

type FeedbackState = Record<FeedbackItem['namespace'], FeedbackItem[]>;

export type FeedbackItem = {
  id: string;
  namespace: string;
  message: ReactNode;
  kind: string;
  status: FeedbackStatus;
};

type Reducer = (state: FeedbackState, action: FeedbackAction) => FeedbackState;

type FeedbackListener = () => void;

export const closeItem = (item: FeedbackItem): FeedbackItem => ({
  ...item,
  status: 'closing',
});

const feedbackReducer: Reducer = (
  state: FeedbackState,
  { type, payload }: FeedbackAction,
) => {
  const items = state[payload.namespace] || [];

  switch (type) {
    case 'APPEND':
      return {
        ...state,
        [payload.namespace]: [...items, payload],
      };
    case 'PREPEND':
      return {
        ...state,
        [payload.namespace]: [payload, ...items],
      };
    case 'CLOSE':
      return {
        ...state,
        [payload.namespace]: items.map(entry =>
          entry.id === payload.id ? closeItem(entry) : entry,
        ),
      };
    case 'DELETE':
      return {
        ...state,
        [payload.namespace]: items.filter(entry => entry.id !== payload.id),
      };
    default:
      return state;
  }
};

const createStore = (reducer: Reducer) => {
  let state: FeedbackState = {};
  let listeners: FeedbackListener[] = [];

  const getState = (namespace = DEFAULT_NAMESPACE) => state[namespace] || [];

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
    state = {};
  };

  return {
    dispatch,
    getListeners: () => listeners,
    getState,
    reset,
    subscribe,
  };
};

export const store = createStore(feedbackReducer);
