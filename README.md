# BetterValues

This library allows to handle values easier and avoiding having to write extra code 

### V0.0.1

#### Node.js-based


## Documentation

### BGlobal
`new BGlobal(emitEvents)`
#### Parameters
- emitEvents?: boolean
#### Properties
- coll: Map ## This contains the raw map of BValues
- emitOn: boolean ## Wether emit events or not
#### Methods
- `add(key, value)` ## For adding values
- `update(key, newValue)` ## For updating values
- `set(key, value)` ## For adding values if it doesn't exist or updating if it exists
- `get(key)` ## For getting a value
- `reset(reason?)` ## Resets Map of BValues
#### Events
Format: `eventName["hereGoesArgumentsSentWithEvent", { argIn: "hello" }] ## Emits when blabla`
- `added[{ key: "BValue key", value: "BValue object", time: "Added timestamp" }]` ## Emits when a value is added
- `update[{ key: "BValue key", value: "BValue object", time: "Updated timestamp" }]` ## Emits when a value is updated
- `deleted[{ v: "BValue key" time: "Deleted timestamp" }]` ## Emits when a value is removed
- `reset[{ reason: "Reset reason" time: "Reset timestamp" }]` ## Emits when resettled
