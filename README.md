# React Notify

The library does not have opinions about styles, but instead gives you the functionality required to show the notifications.

## Usage

```javascript
<NotifyContainer closeAfterMs={4000} delayCloseMs={400}>
  {({ items, closeItem, getDelayWrapperProps }) => (
    <div className="NotifyContainer">
      {items.map(item => (
        <DelayWrapper key={item.id} {...getDelayWrapperProps({ item })}>
          <div className="NotifyItem">
            {item.message}

            <button
              type="button"
              className="NotifyClose"
              onClick={() => closeItem(item)}
            >
              x
            </button>
          </div>
        </DelayWrapper>
      ))}
    </div>
  )}
</NotifyContainer>
```

### NotifyContainer

Input props

| property     | type                                 | description                                                                                                  |
| ------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| closeAfterMs | `number` (optional), default `3000`  | Time to wait before auto closing a notification, set to `0` to disable auto close.                           |
| delayCloseMs | `number` (optional), default `0`     | Expands the time to close a notification and changes the status of the item to `closing` after time elapsed. |
| pauseOnHover | `boolean` (optional), default `true` | If auto close timer should pause when mouse is over notification.                                            |

Children function or render

| property             | type           | description                                      |
| -------------------- | -------------- | ------------------------------------------------ |
| items                | NotifyItem[]   | Array of notifications.                          |
| closeItem            | `function({})` | A function to close a notification.              |
| getDelayWrapperProps | `function({})` | A function to pass item props into DelayWrapper. |

```javascript
<NotifyContainer>{props => {...}}</NotifyContainer>
```

```javascript
<NotifyContainer render={props => {...}} />
```

### DelayWrapper

The DelayWrapper component is **only** required if you want to auto close notifications after an amount of time.

Input props

> Note: these props can easily be sent to DelayWrapper component through `getDelayWrapperProps` provided by NotifyContainer.

```javascript
<DelayWrapper {...getDelayWrapperProps({ item })}>
```

| property     | type           | description                                                       |
| ------------ | -------------- | ----------------------------------------------------------------- |
| closeAfterMs | `number`       | Time to wait before closing a notification.                       |
| close        | `function({})` | The close function to trigger close of notification.              |
| item         | `NotifyItem`   | The item that the wrapper should use.                             |
| pauseOnHover | `boolean`      | If auto close timer should pause when mouse is over notification. |

### notify

Notify is the function to add messages to the items returned by `NotifyContainer`.

notify has four methods, each setting the kind of the item:

- success
- warning
- error
- info

```javascript
notify.success('My message');
notify.warning('My message');
notify.error('My message');
notify.info('My message');
```

### NotifyItem

Each item returned from `NotifyContainer`

| property | type                                               | description                                                                                                |
| -------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| id       | `string`                                           | A unique ID for each item, used for closing and deleting.                                                  |
| message  | `string`                                           | The message sent in when creating a notify.                                                                |
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
