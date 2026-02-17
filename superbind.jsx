(function () {
    var version = 2;

    if ($['ppro.superbind'] && $['ppro.superbind'] > version) return; // don' change for older version

    var projectPath;

    app.bind("onSourceClipSelectedInProjectPanel", onSourceClipSelectedInProjectPanel);

    app.bind("onSequenceActivated", onSequenceActivated);
    app.bind("onActiveSequenceChanged", onActiveSequenceChanged);
    app.bind("onActiveSequenceSelectionChanged", onActiveSequenceSelectionChanged);
    app.bind("onActiveSequenceStructureChanged", onActiveSequenceStructureChanged);
    app.bind("onActiveSequenceTrackItemAdded", onActiveSequenceTrackItemAdded);
    app.bind("onActiveSequenceTrackItemRemoved", onActiveSequenceTrackItemRemoved);

    app.bind("onProjectChanged", onProjectChanged);
    app.bind("onProjectEndDrop", onProjectEndDrop);
    app.bind("onItemsAddedToProjectSuccess", onItemsAddedToProjectSuccess);

    app.encoder.bind("onEncoderLaunched", onEncoderLaunched);
    app.encoder.bind("onEncoderJobComplete", onEncoderJobComplete);
    app.encoder.bind("onEncoderJobError", onEncoderJobError);
    app.encoder.bind("onEncoderJobProgress", onEncoderJobProgress);
    app.encoder.bind("onEncoderJobQueued", onEncoderJobQueued);
    app.encoder.bind("onEncoderJobCanceled", onEncoderJobCanceled);

    function onSourceClipSelectedInProjectPanel(projectItems, viewID) {
        onProjectActivated();
        sendToJS({
            eventName: "onSourceClipSelectedInProjectPanel",
            projectItems: projectItems,
            viewID: viewID,
            time: Date.now(),
        });
    }

    function onSequenceActivated() {
        onProjectActivated();
        sendToJS({
            eventName: "onSequenceActivated",
            time: Date.now(),
        });
    }


    function onProjectActivated() {
        if (projectPath === app.project.path) return;
        projectPath = app.project.path;

        sendToJS({
            eventName: "onProjectActivated",
            time: Date.now(),
            project: projectPath,
        });
    }

    function onActiveSequenceChanged() {
        sendToJS({
            eventName: "onActiveSequenceChanged",
            time: Date.now(),
        });
    }

    function onActiveSequenceStructureChanged() {
        sendToJS({
            eventName: "onActiveSequenceStructureChanged",
            time: Date.now(),
        });
    }

    function onActiveSequenceSelectionChanged() {
        sendToJS({
            eventName: "onActiveSequenceSelectionChanged",
            time: Date.now(),
        });
    }

    function onActiveSequenceTrackItemAdded(track, trackItem) {
        sendToJS({
            eventName: "onActiveSequenceTrackItemAdded",
            time: Date.now(),
            track: track,
            trackItem: trackItem
        });
    }

    function onActiveSequenceTrackItemRemoved(track, trackItem) {
        sendToJS({
            eventName: "onActiveSequenceTrackItemRemoved",
            time: Date.now(),
            track: track,
            trackItem: trackItem
        });
    }

    function onProjectChanged(documentID) {
        sendToJS({
            eventName: "onProjectChanged",
            time: Date.now(),
            documentID: documentID
        });
    }

    function onProjectEndDrop() {
        sendToJS({
            eventName: "onProjectEndDrop",
            time: Date.now(),
        });
    }

    function onItemsAddedToProjectSuccess() {
        sendToJS({
            eventName: "onItemsAddedToProjectSuccess",
            time: Date.now(),
        });
    }

    function onEncoderLaunched(launched) {
        sendToJS({
            eventName: "onEncoderLaunched",
            time: Date.now(),
            launched: launched
        });
    }

    function onEncoderJobComplete(jobID, outputFilePath) {
        sendToJS({
            eventName: "onEncoderJobComplete",
            time: Date.now(),
            jobID: jobID, outputFilePath: outputFilePath
        });
    }

    function onEncoderJobError(jobID, errorMessage) {
        sendToJS({
            eventName: "onEncoderJobError",
            time: Date.now(),
            jobID: jobID, errorMessage: errorMessage
        });
    }

    function onEncoderJobProgress(jobID, progress) {
        sendToJS({
            eventName: "onEncoderJobProgress",
            time: Date.now(),
            jobID: jobID, progress: progress
        });
    }

    function onEncoderJobQueued(jobID) {
        sendToJS({
            eventName: "onEncoderJobQueued",
            time: Date.now(),
            jobID: jobID
        });
    }

    function onEncoderJobCanceled(jobID) {
        sendToJS({
            eventName: "onEncoderJobCanceled",
            time: Date.now(),
            jobID: jobID
        });
    }



    function sendToJS(dataObj) {
        try {
            var xLib = new ExternalObject("lib:PlugPlugExternalObject");
        } catch (e) { }
        if (xLib) {
            var eventObj = new CSXSEvent();
            eventObj.type = 'ppro.superbind';
            eventObj.data = JSON.stringify(dataObj);
            eventObj.dispatch();
        }
        return;
    }
})();