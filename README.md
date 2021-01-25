# React Feedbacker

The library does not have opinions about styles, but instead gives you the functionality required to show the feedback messages.

Visit [demo](https://react-feedbacker.netlify.com/)

## Install

```bash
npm install react-feedbacker --save
```

## Basic Usage

```javascript
import { useFeedbackContainer, DelayWrapper, feedback } from 'react-feedbacker';

const App = () => (
  <div>
    <Feedbacker />

    <button onClick={() => feedback.success('Clicked button, you have')}>
      Give feedback
    </button>
  </div>
);

const Feedbacker = () => {
  const { items, closeItem, getDelayWrapperProps } = useFeedbackContainer({
    delayCloseMs: 400,
    closeAfterMs: 4000,
  });

  return (
    <div className="FeedbackContainer">
      {items.map((item) => (
        <DelayWrapper key={item.id} {...getDelayWrapperProps({ item })}>
          <div className="FeedbackItem">
            {item.message}

            <button
              type="button"
              className="FeedbackClose"
              onClick={() => closeItem(item)}
            >
              x
            </button>
          </div>
        </DelayWrapper>
      ))}
    </div>
  );
};
```

### Container

The container could be used either as a hook or a function. The purpose is to expose the [feedback props](#feedback-props).

#### useFeedbackContainer

```javascript
const MyComponent = () => {
  const options = { closeAfterMs: 4000 };
  const feedbackProps = useFeedbackContainer(options);
};
```

#### FeedbackContainer

```javascript
<FeedbackContainer>{props => {...}}</FeedbackContainer>
```

```javascript
<FeedbackContainer render={props => {...}} />
```

#### Feedback Container Options

Options for the container

| property     | type                                 | description                                                                                                                                                                                    |
| ------------ | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| closeAfterMs | `number` (optional), default `5000`  | Time to wait before auto closing an item, set to `0` to disable auto close.                                                                                                                    |
| delayCloseMs | `number` (optional), default `0`     | Extends the time to close an item and changes the status of the item to `closing` after time elapsed. Allows you to for example fade out an item before it is removed from the returned items. |
| pauseOnHover | `boolean` (optional), default `true` | If auto close timer should pause when mouse cursor is over a message.                                                                                                                          |

#### Feedback Container Response

These are the returned values of either `useFeedbackContainer` or `FeedbackContainer`.

| property             | type           | description                                      |
| -------------------- | -------------- | ------------------------------------------------ |
| items                | FeedbackItem[] | Array of items.                                  |
| closeItem            | `function({})` | A function to close an item.                     |
| getDelayWrapperProps | `function({})` | A function to pass item props into DelayWrapper. |

### DelayWrapper

The DelayWrapper component is **only** required if you want to auto close items after an amount of time.

Input props

> Note: these props can easily be sent to DelayWrapper component through `getDelayWrapperProps` provided by the Feedback Container.

```javascript
<DelayWrapper {...getDelayWrapperProps({ item })}>
```

| property     | type           | description                                                  |
| ------------ | -------------- | ------------------------------------------------------------ |
| closeAfterMs | `number`       | Time to wait before closing an item.                         |
| close        | `function({})` | The close function to trigger the close of an item.          |
| item         | `FeedbackItem` | The item that the wrapper should use.                        |
| pauseOnHover | `boolean`      | If auto close timer should pause when mouse is over an item. |

### feedback

`feedback` is the way to add messages to the items returned by [containers](#container).

The default exported `feedback` has four methods, each setting the kind of the item:

- success
- warning
- error
- info

```javascript
import { feedback } from 'react-feedbacker';

feedback.success('My message');
feedback.warning('My message');
feedback.error('My message');
feedback.info('My message');
```

You could optionally send a second attribute to a feedback with options.

| property     | type     | description                       |
| ------------ | -------- | --------------------------------- |
| closeAfterMs | `number` | Optional override of closeAfterMs |
| namespace    | `string` | Optional override of namespace    |

```javascript
import { feedback } from 'react-feedbacker';

feedback.success('Some special message', {
  closeAfterMs: 0,
  namespace: 'some-namespace',
});
```

### createFeedback

If you want to add another feedback kind, change order when adding items or want to use multiple containers through namespaces, this is the way to go.

`createFeedback` is a curried function according to the following

```console
(options: FeedbackOptions) => (kind: string) => (message: ReactNode);
```

```javascript
// We can create our own notify function by
// calling createFeedback with the options first.
const notify = createFeedback({
  namespace: 'my-namespace',
  behavior: 'prepend',
});

// In this case, we create an object with happy and sad
export const mySpecialFeedback = {
  happy: notify('success'), // kind == 'success'
  sad: notify('sad'), // kind == 'sad'
};

// Then you can use the object to show different kind of messages
mySpecialFeedback.happy('My message');
```

### FeedbackOptions

| property  | default                 | description                                                                                                              |
| --------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| namespace | `__DEFAULT_NAMESPACE__` | Specifies which which namespace or "group" the items for the feedback should insert into                                 |
| behavior  | `append`                | `append` or `prepend`. Appending will insert new items at the end of the list. Pre-pending will insert in the beginning. |

### FeedbackItem

Each item returned from the [containers](#containers).

| property | type                                               | description                                                                                                |
| -------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| id       | `string`                                           | A unique ID for each item, used for closing and deleting.                                                  |
| message  | `string`                                           | The message sent in when creating a feedback message.                                                      |
| kind     | `string` - "error", "success", "warning" or "info" | The kind of item. This is always one of the types given here if the exported `feedback` is used.           |
| status   | `string` - "open" or "closing"                     | Status of an item. Standard is open, closing is when a close is triggered but there is a delay for delete. |

## Portal

Rendering the container through a portal will allow you to mount the items outside of the current mount node and into another, existing node. See the [portal example](https://react-feedbacker.netlify.com/portal) or read more about portals in the [react docs](https://reactjs.org/docs/portals.html).

## Development setup

```sh
# Installing dependencies
yarn install
```

```sh
# Starting the watch mode (outputs to dist)
yarn start
```

## Build

```sh
# Make production build
yarn build
```

### Tests

```sh
# Run tests
yarn test
```

## License

This project is licensed under the terms of the MIT license.
