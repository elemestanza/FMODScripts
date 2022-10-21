/* -------------------------------------------
   FMOD Studio Script:
   Add Events in a Folder from a String or a File
   - Could create a subfolder for the new events
   Author: Elena Mestanza (github.com/elemestanza)
   Version: 1.03_1
   -------------------------------------------
 */

studio.menu.addMenuItem({
    name: "Add Events\\From a String",
    isEnabled: function() {
        var folder = studio.window.browserCurrent();
        return folder && folder.isOfExactType("EventFolder");
    },
    execute: function() {
        var folder = studio.window.browserCurrent();
        var createFolder = studio.system.question("Do you want to create a subfolder?")
        if (createFolder){
            var subfolderName = studio.system.getText("Subfolder name","Folder");
            var subfolder = studio.project.create("EventFolder");
            subfolder.name = subfolderName;
            subfolder.folder = folder;
            folder = subfolder;
        }
        
        var listString = studio.system.getText("List of new events", "Event 1, Event 2...");

        var isDataInLines = studio.system.question("Is your original data sort out by lines? I.e., copied from an Excel file");
        var separator = "";
        if (isDataInLines) separator = "\n";
        else separator = studio.system.getText("Events' name separator (i.e., \", \" in \"Event 1, Event 2\")", ", ");

        var eventList = listString.split(separator);

        for (var i = 0; i < eventList.length; i++) {
            eventList[i].replace("\r","");
            eventList[i].replace("\t","");
        }

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
    name: "Add Events\\From a Name (e.g. \"event\" generates event_1, event_2...)",
    isEnabled: function() {
        var folder = studio.window.browserCurrent();
        return folder && folder.isOfExactType("EventFolder");
    },
    execute: function() {
        var folder = studio.window.browserCurrent();
        var createFolder = studio.system.question("Do you want to create a subfolder?")
        if (createFolder){
            var subfolderName = studio.system.getText("Subfolder name","Folder");
            var subfolder = studio.project.create("EventFolder");
            subfolder.name = subfolderName;
            subfolder.folder = folder;
            folder = subfolder;
        }

        var name = studio.system.getText("Event name", "event");
        var numberOfEvents = studio.system.getNumber("Number of events", 2);

        for (var i = 1; i <= numberOfEvents; i++) {
            var newEvent = studio.project.create("Event");
            var track = studio.project.create("GroupTrack");
            track.mixerGroup.output = newEvent.mixer.masterBus;
            track.mixerGroup.name = "Audio 1";
            newEvent.name = name + "_" + i;
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
        var folder = studio.window.browserCurrent();
        var createFolder = studio.system.question("Do you want to create a subfolder?")
        if (createFolder){
            var subfolderName = studio.system.getText("Subfolder name","Folder");
            var subfolder = studio.project.create("EventFolder");
            subfolder.name = subfolderName;
            subfolder.folder = folder;
            folder = subfolder;
        }

        var filePath = studio.system.getText("File's absolute path", "");

        var isDataInLines = studio.system.question("Is your data sort out by lines?");
        var separator = "";
        if (isDataInLines) separator = "\n";
        else separator = studio.system.getText("Events' name separator (i.e., \", \" in \"Event 1, Event 2\")", ", ");

        var file = studio.system.getFile(filePath);
        file.open(studio.system.openMode.ReadOnly);
        var eventList = file.readText(8192).split(separator);

        for (var i = 0; i < eventList.length; i++) {
            eventList[i].replace("\r","");
            eventList[i].replace("\t","");
        }

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
