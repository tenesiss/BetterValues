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
- `added[{ key: "BValue key", value: "BValue object", time: "Added timestamp" }]` ## Emits when a value is added
- `update[{ key: "BValue key", value: "BValue object", time: "Updated timestamp" }]` ## Emits when a value is updated
- `deleted[{ v: "BValue key" time: "Deleted timestamp" }]` ## Emits when a value is removed
- `reset[{ reason: "Reset reason" time: "Reset timestamp" }]` ## Emits when resettled
### BValue
`new BValue(base, value, key, saveInGlobal?)`
#### Parameters
- base: BGlobal ## BGlobal instance
- value: any ## Raw value
- key: string ## Value key
- saveInGlobal?: boolean ## Wether save in BGlobal's values collection the value at creation
#### Properties
- base: BGlobal ## BGlobal instance given in parameters
- key: string ## Value key
- val: any ## Raw value
- createdAt: number ## Timestamp of BValue creation
- type: string ## Type of raw value
- cache: Array ## Value cache
#### Methods
- `set(newValue)` ## Sets a new value silently, without emitting, caching or saving
- `update(newValue, avoidSaving?)` ## Sets a new value; If avoidSaving is true it won't save to BGlobal value collection
- `prop(propName, propNewValue?, avoidEmit?)` ## If propNewValue is null it will return property's value, if propNewValue is not null it will change property's value, avoidEmit is for avoiding emitting event propChanged
- `delete(options{cleanCache, avoidEmit, avoidGlobalDeletion, saveOldValueOnCache}?)` ## Deletes the value; Opetions explanation:
   cleanCache: If true it will reset cache
   
   avoidEmit: If true it won't emit event
   
   avoidGlobalDeletion: If true it won't be deleted from BGlobal value collection
   
   saveOldValueOnCache: If true it will save deleted raw value in cache
- `resetCache(keepLastValue?)` ## Resets cache
- `log()` ## Console logs the raw value
- `obj()` ## Returns raw value
- `save()` ## Saves value to BGlobal's value collection
#### Events
- `valueUpdate[{ newValue: "Raw new value", time: "Update timestamp" }]` ## Emits when the value is updated
- `propChanged[{ name: "Edited property name", newValue: "Property's new value" }]` ## Emits when a property is changed
- `valueDeleted[{ value: "Deleted raw value", time: "Deleted timestamp", reason: "Reason of deletion" }]` ## Emits when value is deleted
### Betterize
`betterize(value, data)`
#### Data structure
- `key?` ## Value key; If null it will use incrementation
- `base` ## BGlobal Instance
- `dontSaveGlobal?` ## If true it won't save value in global (it basically sets saveInGlobal parameter to false)
### References
`?` - Optional; it can be null or it can be skipped

`Event Format` - eventName["Here goes event arguments, usually only a json object", { valueTest: "test" }]
