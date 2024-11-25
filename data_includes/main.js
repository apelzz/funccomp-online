PennController.ResetPrefix(null)

// Load in the Zip file from DreamHost to download study stimuli
PreloadZip("https://harvard-lds-langlab.com/web_experiments_8fdr3kasec/LZ/compose-functions/video.zip");
PreloadZip("https://harvard-lds-langlab.com/web_experiments_8fdr3kasec/LZ/compose-functions/outcome.zip");

// Event sequence
Sequence(
    "checkloadings",
    "intro",
    "train",
    "singleFuncTest",
    "funcCompTest",
    "send_results",
    "completion_screen"
);

CheckPreloaded('singleFuncTest', 120000).label("checkloadings");

//////////////////////////// Header ////////////////////////////
Header(
    defaultText
            .css({'font-size':'1.50em',
                 "text-align": "center",
                 "line-height": "1.50em"
            })
            .print()
    ,
     defaultButton
            .size('12vw','12vh')
            .css('border-style','hidden')
            .color('white')
            .css({"background-color":"green",
                  "border-style":"hidden",
                  "border-radius":"10px",
                  "text-transform":"uppercase",
                  "margin-top": "2em"
            })
            .center()
);

//////////////Instructions & Introduction//////////////
newTrial("intro",
    newImage("welcomescreen", "welcome.png")
        .print("5vw", "15vh")
        .size("70vw","70vh")
    ,
    newButton("audiocheck","Make sure your audio is on!")
        .print("72vw", "30vh")
        .once()
        .wait()
    ,
    newAudio("introaudio", "glitter.mp3")
        .print("65vw","50vh")
        .play()
        .wait()
    ,
    getButton("audiocheck").remove(),
    newButton("continuewelcome","Click to continue!")
        .print("72vw","30vh")
        .once()
        .wait()
)

//////////////Main experiment//////////////
newTrial("train",
    fullscreen(),
    newText("train_instr", "Look, something might happen to the object!")
        .css({"font-size": "2em"})
		.center()
        .print()
    ,
    newVideo("train_video", "SingleFunc_train_smash_changed_left_1.mp4")
        .size(960,540)
        .disable(0.01) // Disable participant controls
        .center()
        .print()
    ,
    newTimer("autoplayDelay", 1000) // 1 second delay
        .start()
        .wait()
    ,
    getVideo("train_video")
        .play()
        .wait("play") // Wait for the video to finish playing
        .log("play")
        .log("end")
    ,
    newTimer("postVideoDelay", 1000) // 1 second wait after video ends
        .start()
        .wait()
)

newTrial("singleFuncTest",
    fullscreen(),
    // Play the test video
    newText("singleFuncTest_instr", "Your turn—what's behind the screen?")
        .css({"font-size": "2em"})
		.center()
        .print()
    ,
    newVideo("singleFuncTest_video", "SingleFunc_test_smash_changed_right_2.mp4")
        .size(960,540)
        .disable(0.01) // Disable participant controls
        .print()
        .center()
    ,
    newTimer("autoplayDelay", 500).start().wait(),
    getVideo("singleFuncTest_video")
        .play()
        .wait("play") // Wait for the video to finish playing
        .log("play")
        .log("end")
    ,
    getVideo("singleFuncTest_video").remove(),
    newTimer("postVideoDelay", 500).start().wait(),
    // Display test options
    newImage("target", "smashed_right_2.jpg") 
        .size(576, 324)
    ,
    newImage("distractor", "unsmashed_right_2.jpg") 
        .size(576, 324)
    ,
    newCanvas("target-distractor", 1200,324)
        .add(  0, 0, getImage("target"))
        .add(624, 0, getImage("distractor"))
        .center()
        .print()
        .log()
    ,
    newSelector("selection")
        .add(getImage("target"), getImage("distractor"))
        .shuffle()
        .log("all")
        .wait() // Wait for participant to select an option
    ,
    getCanvas("target-distractor").remove(),
    getText("singleFuncTest_instr").remove(),
    // Test participant's selection
    getSelector("selection")
        .test.selected(getImage("target"))
            .success(
                newText("chose_target","<strong>Good job! You chose the write answer.</strong>")
                    .css({
                        'font-size': '1.75em', 
                        'margin': '2em',
                        'text-align': 'center',
                        'background-color': 'white', 
                        'padding': '10px', 
                        'border-radius': '10px'
                    })
                    .center()
                    .print()
                ,
                newTimer("continue_target",2000).start().wait() 
            )
            .failure(
                newText("chose_distractor","<strong>Sorry, that was incorrect. Let's try again!</strong>")
                    .css({
                        'font-size': '1.75em', 
                        'margin': '2em',
                        'text-align': 'center',
                        'background-color': 'white', 
                        'padding': '10px', 
                        'border-radius': '10px'
                    })
                    .center()
                    .print()
                ,
                newTimer("continue_distractor",2000).start().wait() 
            )
)

newTrial("singleFuncTest_2ndchance",
    fullscreen(),
    // Play the test video
    newText("singleFuncTest_instr", "Your turn—what's behind the screen?")
        .css({"font-size": "2em"})
		.center()
        .print()
    ,
    newVideo("singleFuncTest_video", "SingleFunc_test_smash_changed_right_2.mp4")
        .size(960,540)
        .disable(0.01) // Disable participant controls
        .print()
        .center()
    ,
    newTimer("autoplayDelay", 500).start().wait(),
    getVideo("singleFuncTest_video")
        .play()
        .wait("play") // Wait for the video to finish playing
        .log("play")
        .log("end")
    ,
    getVideo("singleFuncTest_video").remove(),
    newTimer("postVideoDelay", 500).start().wait(),
    // Display test options
    newImage("target", "smashed_right_2.jpg") 
        .size(576, 324)
    ,
    newImage("distractor", "unsmashed_right_2.jpg") 
        .size(576, 324)
    ,
    newCanvas("target-distractor", 1200,324)
        .add(  0, 0, getImage("target"))
        .add(624, 0, getImage("distractor"))
        .center()
        .print()
        .log()
    ,
    newSelector("selection")
        .add(getImage("target"), getImage("distractor"))
        .shuffle()
        .log("all")
        .wait() // Wait for participant to select an option
    ,
    getCanvas("target-distractor").remove(),
    getText("singleFuncTest_instr").remove()
)

newTrial("funcCompTest",
    fullscreen(),
    // Play the test video
    newText("funcCompTest_instr", "What do you think is behind the screen?")
        .css({"font-size": "2em"})
		.center()
        .print()
    ,
    newVideo("funcCompTest_video", "FuncComp_feed_3_right.mp4")
        .size(960,540)
        .disable(0.01) // Disable participant controls
        .print()
        .center()
    ,
    newTimer("autoplayDelay", 500).start().wait(),
    getVideo("funcCompTest_video")
        .play()
        .wait("play") // Wait for the video to finish playing
        .log("play")
        .log("end")
    ,
    getVideo("funcCompTest_video").remove(),
    newTimer("postVideoDelay", 500).start().wait(),
    // Display test options
    newImage("target", "smashed_left_3.jpg") 
        .size(576, 324)
    ,
    newImage("distractor1", "unsmashed_left_3.jpg") 
        .size(576, 324)
    ,
    newImage("distractor2", "smashed_right_3.jpg") 
        .size(576, 324)
    ,
    newImage("distractor3", "unsmashed_right_3.jpg") 
        .size(576, 324)
    ,
    newCanvas("target-distractors", 1200,700)
        .add(  0, 0, getImage("target"))
        .add(624, 0, getImage("distractor1"))
        .add(0, 376, getImage("distractor2"))
        .add(624, 376, getImage("distractor3"))
        .center()
        .print()
        .log()
    ,
    newSelector("selection")
        .add(
            getImage("target"), getImage("distractor1"), 
            getImage("distractor2"), getImage("distractor3")
        )
        .shuffle()
        .log("all")
        .wait() // Wait for participant to select an option
    ,
    getCanvas("target-distractors").remove(),
    getText("funcCompTest_instr").remove()
)

// Send results manually
SendResults("send_results")

// Completion screen
newTrial("completion_screen",
    newText("thanks", "Thank you for participating! You may now exit the window.")
        .center()
        .print()
    ,
    newButton("void", "")
        .wait()
)


// Template("temp.csv", row => {
    
// }

// )
