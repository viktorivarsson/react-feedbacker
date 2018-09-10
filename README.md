# React Feedbacker

The library does not have opinions about styles, but instead gives you the functionality required to show the feedback messages.

## Install

```bash
npm install react-feedbacker --save
```

## Usage

```javascript
import { FeedbackContainer, DelayWrapper } from 'react-feedbacker';

<FeedbackContainer closeAfterMs={4000} delayCloseMs={400}>
  {({ items, closeItem, getDelayWrapperProps }) => (
    <div className="FeedbackContainer">
      {items.map(item => (
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
  )}
</FeedbackContainer>;
```

### FeedbackContainer

Input props

| property     | type                                 | description                                                                                           |
| ------------ | ------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| closeAfterMs | `number` (optional), default `5000`  | Time to wait before auto closing an item, set to `0` to disable auto close.                           |
| delayCloseMs | `number` (optional), default `0`     | Expands the time to close an item and changes the status of the item to `closing` after time elapsed. |
| pauseOnHover | `boolean` (optional), default `true` | If auto close timer should pause when mouse is over a message.                                        |

Children function or render

| property             | type           | description                                      |
| -------------------- | -------------- | ------------------------------------------------ |
| items                | FeedbackItem[] | Array of items.                                  |
| closeItem            | `function({})` | A function to close an item.                     |
| getDelayWrapperProps | `function({})` | A function to pass item props into DelayWrapper. |

```javascript
<FeedbackContainer>{props => {...}}</FeedbackContainer>
```

```javascript
<FeedbackContainer render={props => {...}} />
```

### DelayWrapper

The DelayWrapper component is **only** required if you want to auto close items after an amount of time.

Input props

> Note: these props can easily be sent to DelayWrapper component through `getDelayWrapperProps` provided by FeedbackContainer.

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

feedback is the way to add messages to the items returned by `FeedbackContainer`.

feedback has four methods, each setting the kind of the item:

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

### FeedbackItem

Each item returned from `FeedbackContainer`

| property | type                                               | description                                                                                                |
| -------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| id       | `string`                                           | A unique ID for each item, used for closing and deleting.                                                  |
| message  | `string`                                           | The message sent in when creating a feedback message.                                                      |
| kind     | `string` - "error", "success", "warning" or "info" | The kind of item.                                                                                          |
| status   | `string` - "open" or "closing"                     | Status of an item. Standard is open, closing is when a close is triggered but there is a delay for delete. |

## Development setup

Describe how to install all development dependencies and how to run an automated test-suite of some kind. Potentially do this for multiple platforms.

```sh
npm install
```

```sh
npm start
```

## Build

```sh
npm run build
```

### Tests

```sh
npm test
```

## License

This project is licensed under the terms of the MIT license.
