/* -------------------------------------------
   FMOD Studio Script:
   Add Events in a Folder from a String or a File
   Author: Elena Mestanza (github.com/elemestanza)
   Version: 1.01
   -------------------------------------------
 */

studio.menu.addMenuItem({
    name: "Add Events\\From a String",
    isEnabled: function() {
        var folder = studio.window.browserCurrent();
        return folder && folder.isOfExactType("EventFolder");
    },
    execute: function() {
        var listString = studio.system.getText("List of new events", "Event 1, Event 2...");

        var isDataInLines = studio.system.question("Is your oeiginal data sort out by lines? I.e., copied from an Excel file");
        var separator = "";
        if (isDataInLines) separator = "\n";
        else separator = studio.system.getText("Events' name separator (i.e., \", \" in \"Event 1, Event 2\")", ", ");

        var eventList = listString.split(separator);

        var folder = studio.window.browserCurrent();
        for (var i = 0; i < eventList.length; i++) {
            var newEvent = studio.project.create("Event");
            var track = studio.project.create("GroupTrack");
            track.mixerGroup.output = newEvent.mixer.masterBus;
            track.mixerGroup.name = "Audio 1";
            newEvent.name = eventList[i];
            newEvent.folder = folder;
            newEvent.relationships.groupTracks.add(track);
        }
    },
});

studio.menu.addMenuItem({
    name: "Add Events\\From a File",
    isEnabled: function() {
        var folder = studio.window.browserCurrent();
        return folder && folder.isOfExactType("EventFolder");
    },
    execute: function() {
        var filePath = studio.system.getText("File's absolute path", "");

        var isDataInLines = studio.system.question("Is your data sort out by lines?");
        var separator = "";
        if (isDataInLines) separator = "\n";
        else separator = studio.system.getText("Events' name separator (i.e., \", \" in \"Event 1, Event 2\")", ", ");

        var file = studio.system.getFile(filePath);
        file.open(studio.system.openMode.ReadOnly);
        var eventList = file.readText(8192).split(separator);

        var folder = studio.window.browserCurrent();
        for (var i = 0; i < eventList.length; i++) {
            var newEvent = studio.project.create("Event");
            var track = studio.project.create("GroupTrack");
            track.mixerGroup.output = newEvent.mixer.masterBus;
            track.mixerGroup.name = "Audio 1";
            newEvent.name = eventList[i];
            newEvent.folder = folder;
            newEvent.relationships.groupTracks.add(track);
        }
    },
});