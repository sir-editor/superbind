# SuperBind

A shared JSX wrapper for Adobe Premiere Pro CEP extensions that fixes the **single-listener limitation** of `app.bind` in ExtendScript.

## The problem

Extensions rely on Premiere’s API ExtendScript events, for example:

- `onProjectChanged`

In ExtendScript, **only one listener can be bound to an event** with `app.bind`. Each new `app.bind` call **replaces** the previous listener. So when multiple extensions each call `app.bind`, the last one to run “wins” and the others stop receiving events.

## The solution

SuperBind uses a **single shared listener** in JSX and **forwards events to the JS layer** (CEP/JavaScript), where you can have **multiple listeners** per event.

1. **One binding in JSX**  
   Every extension loads the **same** SuperBind JSX file. Only one set of `app.bind` calls exists, so there is no overwriting.

2. **Forwarding to JS**  
   When an event fires, the JSX handler sends the event payload to JS via `CSXSEvent` (PlugPlug). In JS, each extension can subscribe to the same event name without conflict.

3. **One contract**  
   As long as everyone uses this same JSX + event protocol, all extensions can coexist and receive the same Premiere events.

## Events supported

SuperBind binds and forwards these events:

**Project & sequence**

- `onProjectChanged`
- `onProjectEndDrop`
- `onProjectActivated` // custom event
- `onItemsAddedToProjectSuccess`
- `onSourceClipSelectedInProjectPanel`
- `onSequenceActivated`
- `onActiveSequenceChanged`
- `onActiveSequenceSelectionChanged`
- `onActiveSequenceStructureChanged`
- `onActiveSequenceTrackItemAdded`
- `onActiveSequenceTrackItemRemoved`

**Encoder**

- `onEncoderLaunched`
- `onEncoderJobComplete`
- `onEncoderJobError`
- `onEncoderJobProgress`
- `onEncoderJobQueued`
- `onEncoderJobCanceled`

In JS, listen for the custom event type `ppro.superbind` and use the `eventName` (and other fields) in the event data to handle the event.
```
var csInterface = new CSInterface();
csInterface.addEventListener("ppro.superbind", ({ data }) => {
    // your code
});
```
## CEP and UXP

UXP is coming, and that problem probably will go away, but CEP is likely to remain in use for a while (hopefully at least another couple of years).