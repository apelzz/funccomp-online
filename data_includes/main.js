PennController.ResetPrefix(null)

// Load in the Zip file from DreamHost to download study stimuli
PreloadZip("https://harvard-lds-langlab.com/web_experiments_8fdr3kasec/LZ/compose-functions/videos_compressed_trimmed.zip");
PreloadZip("https://harvard-lds-langlab.com/web_experiments_8fdr3kasec/LZ/compose-functions/outcomes.zip");
PreloadZip("https://harvard-lds-langlab.com/web_experiments_8fdr3kasec/LZ/compose-functions/audio.zip");

// So that the lists restart/randomize every time a new participant begins the study
SetCounter("counter", "inc", 1);

// Event sequence
Sequence(
    "checkloadings",
    "startup",
    "demographics",
    "consent",
    "practice",
    "Func1train",
    "Func1test",
    "Func2train",
    "Func2test",
    "Type1comp",
    "Type2comp",
    "Type3comp",
    "Type4comp",
    "send_results",
    "completion_screen"
);

CheckPreloaded('Func1train', 120000).label("checkloadings");

////////////////////Text for the consent & instructions////////////////////
consent_text = "<strong>Researcher:</strong> Lily Zhu, Graduate Student	<br><strong>Faculty Advisor: </strong> Dr. Jesse Snedeker	<br><strong>Contact information: </strong> (617) 496-7175] | kidlab@g.harvard.edu 	<br>	<br><strong>Key Information:</strong>	<br>The following is a short summary of this study to help you decide whether or not you want to participate. More detailed information is listed later on in this form. 	<br>	<br><strong> Why am I being invited to take part in a research study? </strong>	<br>We invite you to take part in this research study because you meet the study’s requirements and are over the age of 18.	<br> 	<br><strong>What should I know about being in a research study? </strong>	<ul>	<li>You'll receive instructions on how to participate.</li>	<li>Whether or not you take part is up to you.</li>	<li>Your participation is completely voluntary.</li>	<li>You can choose not to take part.</li>	<li>You can agree to take part and later change your mind.</li>	<li>Your decision will not be held against you.  </li>	</ul>		<br><strong> Why is this research being done? </strong>	<br>The purpose of this study is to better understand the processes involved in language comprehension and how they develop in adults and children. 		<br><strong> How long will the research last and what will I need to do? </strong>	<br>We expect that you will be in this research study for no longer than 30 minutes.	<br>During this study, you will be asked to watch a series of visual displays and interact with the displays in some way. You may have to respond to, identify, or judge various stimuli. 	<br>During the study, we will record your responses.		<br><strong>Is there any way being in this study could be bad for me? </strong>	<br>We don’t believe there are any risks from participating in this research. 		<br><strong> Will being in this study help me in any way? </strong>	<br>There are no benefits to you besides any enjoyment you may get from the task. There may be possible benefits to others by gaining more information about language comprehension and development; however, this depends on the outcomes of the study.<br>	<br><strong>Detailed Information:</strong><br>The following is more detailed information about this study.	<br><strong> What is the purpose of this research? </strong>	<br>The purpose of this research is to better understand the processes involved in language comprehension and how they develop in adults and children.		<br><strong>How long will I take part in this research? </strong>	<br>This study will take no longer than 30 minutes to complete. 		<br><strong>What can I expect if I take part in this research? </strong>	<br>This study will take place entirely online. During this study, you will be asked to watch a series of visual displays that included short video clips. You will be asked to interact with the displays by clicking on an objects. In addition to watching visual displays, you may hear/see some linguistic and/or non-linguistic stimuli (for example words or sentences) before, during, or after the display is presented.		<br><strong> What happens if I say yes, but I change my mind later? </strong>	<br>You can leave the research at any time it will not be held against you. 		<br><strong> If I take part in this research, how will my privacy be protected? What happens to the information you collect? </strong>	<br>Efforts will be made to limit the use and disclosure of your Personal Information, including research study and medical records, to people who have a need to review this information. We cannot promise complete secrecy. Organizations that may inspect and copy your information include the Institutional Review Board (IRB) and other representatives of this organization. 		<br>If any publication results from this research, you will not be identified by name. If identifiers are removed from your identifiable private information or identifiable samples that are collected during this research, that information or those samples could be used for future research studies or distributed to another investigator for future research studies without your additional informed consent.		<br><strong> What else do I need to know? </strong>	<br>Compensation - If you agree to take part in this research study, we will pay you at a rate of $15 hour.	<br>This research is being funded by the Stimson Fund from Harvard Psychology.		<br><strong> Who can I talk to? </strong>	<br>If you have questions, concerns, or complaints, or think the research has hurt you, contact the researcher at irenecanudasgrabolosa@fas.harvard.edu, the research team at kidlab@g.harvard.edu or (617) 496-2847, or the faculty member supervising this work: Prof Jesse Snedeker, snedeker@wjh.harvard.edu. 		<br>This research has been reviewed and approved by the Harvard University Area Institutional Review Board (“IRB”). You may talk to them at (617) 496-2847 or cuhs@harvard.edu if: 	<ul>	<li> Your questions, concerns, or complaints are not being answered by the research team. </li>	<li> You cannot reach the research team. </li>	<li> You want to talk to someone besides the research team. </li>	<li> You have questions about your rights as a research subject. </li>	<li> You want to get information or provide input about this research. </li></ul>";	

read_consent = "Before we start the study, you’ll need to read the following information and consent to participating. Go ahead and read the consent form below.";

task_description = "In this study, you will watch videos and view images. Based on the prompts and the videos, you will need to click on specific images. Here's an example:"

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
newTrial("startup", // Start up page  
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
    getButton("audiocheck").remove()
    ,
    newButton("continuewelcome","Click to continue!")
        .print("72vw","30vh")
        .once()
        .wait()
    ,
    getAudio("introaudio").remove()
    ,
    getImage("welcomescreen").remove()
    ,
    getButton("continuewelcome").remove()
    ,
)
.setOption("countsForProgressBar", false)

newTrial("demographics", // Collect demographics
    newText('instructions-intro', "Before we begin we will tell you a little bit about the study.")
		.css({'font-size': '1.5em'})
		.center()
	,
	newButton('continue_intro', 'Continue')
		.print()
		.wait()
	,
	clear()
	,
	newText("title", 'What do you need to do?')
		.css({
			  "font-size": "2em"
			})
		.center()
		.bold()
	,
	newText("instr1", "In our lab we are interested in how children learn the early concepts. Today you will be playing a short game to help us answer this question.")
        .css({"font-size": "1.5em"})
		.center()
        .print()
        ,
    newAudio("instraudio", "InOurLab.mp3")
        .play()
        .wait()
	,
	newButton('continue_intro2', 'Continue')
    	.print()
    	.wait()
    	.hidden()
	,
    // Collect demographics 	
	getText("title")
	    .text("What information do we need from you?")
	    .size("50vw","10vh")
	,
	newText("separate12", " ").print()
	,
    getText("instr1")
        .text("We need your age and gender (for statistical purposes). To keep your information private, we'd like you to create a made-up name that we'll use to identify your child's results. Please create some combination of a word followed by a string of numbers (e.g., flower714).")
	,
	newTextInput("pseudonim","")
			.before(newText("pseudonim-inst", "Please write the pseudonym you'd like to use"))
			.center()
			.print()
	,
	newText("separate2"," ")
	,
	newButton("gotoConsent","send IdentityCode")
		.size('20vw','10vh')
		.print()
		.wait(getTextInput("pseudonim")
				.testNot.text("")
				.failure(
                    newText("wrong_ID","Please, write your Identity Code")
						.center()
						.css("color","red")
                    ,
                    newTimer("eliminate_ID",500).start().wait(),
					getText("wrong_ID").remove()
                )
        )
		.remove()
	,
	newVar('ID')
	    .set(getTextInput("pseudonim"))
	    .global()
	,
	getTextInput("pseudonim").remove()
	,
	getText("separate2").remove()
	,
	getText("instr1").text("Please, provide us with your age and gender.")
	,
	 newTextInput("edat","")
			.before(newText("edat-inst", "How old are you?")) 
			.center()
			.size("7vw",'5vh')
			.print()
	,
	newText("separate3","  ")
	,   
	newDropDown("gender","")
			.add("Female","Male","Non-binary","Other") 
	 		.before(newText("gender-inst", "How do you identify yourself?"))
			.center()
			.size("7vw",'5vh')
			.print()
	,
	newText("separate4","  ")
	,
	newButton("gotoConsent2","send")
		.size('20vw','10vh')
		.print()
		.wait(getTextInput("edat")
				.testNot.text("")
				.failure(newText("wrong_age","Please, provide your age")
								.center()
								.css("color","red"),
						newTimer("eliminate_age",500).start().wait(),
						getText("wrong_age").remove()))
		.remove()
	,
	newVar('age')
	    .set(getTextInput("edat"))
	    .global(),
	newVar('sex')
	    .set(getDropDown("gender"))
	    .global()
	,
	getTextInput("edat").remove()
	,
	getDropDown("gender").remove()
	,
	getText("separate3").remove()
	,
	getText("separate4").remove()
	,
)
.log('ID', getVar("ID"))
.log('Age', getVar('age'))
.log('Gender', getVar('sex'))
.setOption("countsForProgressBar", false)

newTrial("consent", // Collect consent
    newText("instr1", read_consent)
        .css({"font-size": "1.5em"})
		.center()
        .print()
        ,
	newText("consentText",consent_text) // calling the text written above in the consent & instructions section, make modifications up there and they will be reflected at this step
    .css({"text-align": "left", "margin": "2em",
         'font-size':'1em'}).print(),
    
    newButton("consentYes", "I consent").css({"background-color":"green"}),
    newButton("consentNo", "I DON'T consent").css({"background-color":"red"})
    ,
    newCanvas("Consentingcanvas", "80vw","10vh")
        .add("left at 0", "top at 0", getButton("consentYes") )
        .add("right at 100%", "top at 0", getButton("consentNo") )
        .center()
        .print()
    ,
    newSelector('ConsentingChoice')
            .add(getButton("consentYes"), getButton("consentNo"))
            .wait()
            .test.selected(getButton("consentNo")).
            success(
                getText("consentText").remove(),
                getCanvas("Consentingcanvas").remove(),
                newText("ThanksBye","Thank you for your interest in our study! Unfortunately we cannot run the study if you don't consent."),
                newButton("neverPress","Bye").wait()
            )
    ,
    getText("consentText").remove()
    ,
    getText("instr1").remove()
    ,
    getCanvas("Consentingcanvas").remove()
    ,
    getSelector("ConsentingChoice").remove()
)
.setOption("countsForProgressBar", false)

newTrial("practice",
    newText('task_description', task_description)
		.css({'font-size': '1.5em'})
		.center()
		.print()
	,
	newAudio("task_description", "ClickImages.mp3")
        .play()
        .wait()
	,
	newVideo("practice_video", "practice_trial.mp4")
        .size(960,540)
        .disable(0.01) // Disable participant controls
        .center()
        .print()
    ,
    newTimer("autoplayDelay", 1000).start().wait() // 1 second delay
    ,
    getVideo("practice_video")
        .play()
        .wait("play") // Wait for the video to finish playing
        .log("play")
        .log("end")
    ,
    getVideo("practice_video").remove()
    ,
    newTimer("postVideoDelay", 1000).start().wait() // 1 second wait after video ends
    ,
    getText("task_description")
        .remove()
    ,
    newText("practice_instr", "What did you just see?")
            .css({"font-size": "2em"})
    		.center()
            .print()
    ,
    newAudio("practice_instr", "WhatSee.mp3")
            .play("once")
            .wait("play")
    ,
    // Display test options
    newImage("target", "unsmashed_right_1.jpg").size(576, 324)
    ,
    newImage("distractor", "smashed_left_1.jpg").size(576, 324)
    ,
    newCanvas("target-distractor",1200,324)
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
    getCanvas("target-distractor").remove()
    ,
    getText("practice_instr").remove()
    ,
    getSelector("selection")
        .test.selected(getImage("target"))
            .success(
                getVar("score").set(1)
                ,
                newText("chose_target","<strong>Good job! You chose the right answer.</strong>")
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
                newAudio("singleFuncTest_target", "GoodJob.mp3")
                    .play("once")
                    .wait()
                ,
                newTimer("continue_target",2000).start().wait() 
                ,
                getText("chose_target").remove()
            )
            .failure(
                getVar("score").set(0)
                ,
                newText("chose_distractor","<strong>Sorry, that was incorrect.</strong>")
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
                ,
                getText("chose_distractor").remove()
            )
    ,
    newText("title", "<br> Are you ready to begin?")
		.css({
			  "font-size": "2em"
			})
		.center()
		.bold()
		.print("center at 50vw", "10vh")
    ,
    newButton("Exp_Continue", "Yes!")
        .css({"background-color":"green"})
        .print("center at 50vw", "50vh")
        .wait()
)


//////////////Main experiment//////////////
Template("adult_ordersheet_long_Func1train.csv", row =>
    newTrial("Func1train",
        fullscreen()
        ,
        newText("train_instr", "Look, something might happen to the object!")
            .css({"font-size": "2em"})
    		.center()
            .print()
        ,
        newAudio("train_instr", "LookSomething.mp3")
            .play("once")
            .wait("first")
        ,
        newVideo("train_video", row.video_name)
            .size(960,540)
            .disable(0.01) // Disable participant controls
            .center()
            .print()
        ,
        newTimer("autoplayDelay", 1000).start().wait() // 1 second delay
        ,
        getVideo("train_video")
            .play()
            .wait("play") // Wait for the video to finish playing
            .log("play")
            .log("end")
        ,
        newTimer("postVideoDelay", 1000).start().wait() // 1 second wait after video ends
    )
    .log("order", row.group)
    .log("trial_name", row.trial_name)
    .log("trialID", row.trialID)
    .log("video_name", row.video_name)
)

Template("adult_ordersheet_long_Func1test.csv", row =>
    newTrial("Func1test",
        fullscreen()
        ,
        newVar("is2ndChance", 0).global() // See if the current trial is 2nd chance
        ,
        getVar("is2ndChance").set((/2ndchance$/.test(row.trial_name) ? 1 : 0))
        ,
        newVar("score", 0).global() // Track previous test result
        ,
        getVar("is2ndChance")   // See if the current trial needs to be run
            .test.is(1)         // No need to run 2nd test trials if the prev test is correct
                .success(
                    getVar("score")
                        .test.is(1)
                            .success(end())
                )
        ,
        // Play the test video
        newText("singleFuncTest_instr", "Your turn—what's behind the screen?")
            .css({"font-size": "2em"})
    		.center()
            .print()
        ,
        newAudio("singleFuncTest_instr", "YourTurn.mp3")
            .play("once")
            .wait("play")
        ,
        newVideo("singleFuncTest_video", row.video_name)
            .size(960,540)
            .disable(0.01) // Disable participant controls
            .print()
            .center()
        ,
        newTimer("autoplayDelay", 500).start().wait()
        ,
        getVideo("singleFuncTest_video")
            .play()
            .wait("play") // Wait for the video to finish playing
            .log("play")
            .log("end")
        ,
        getVideo("singleFuncTest_video").remove(),
        newTimer("postVideoDelay", 500).start().wait()
        ,
        // Display test options
        newImage("target", row.target).size(576, 324)
        ,
        newImage("distractor", row.distractor1).size(576, 324)
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
        getCanvas("target-distractor").remove()
        ,
        getText("singleFuncTest_instr").remove()
        ,
        // Test participant's selection
        getVar("is2ndChance")  // No need to give feedback for 2nd chance trials
            .test.is(1)         
                .success(end())
        ,
        getSelector("selection")
            .test.selected(getImage("target"))
                .success(
                    getVar("score").set(1)
                    ,
                    newText("chose_target","<strong>Good job! You chose the right answer.</strong>")
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
                    newAudio("singleFuncTest_target", "GoodJob.mp3")
                        .play("once")
                        .wait()
                    ,
                    newTimer("continue_target",2000).start().wait() 
                )
                .failure(
                    getVar("score").set(0)
                    ,
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
                    newAudio("singleFuncTest_distractor", "Sorry.mp3")
                        .play("once")
                        .wait()
                    ,
                    newTimer("continue_distractor",2000).start().wait()
                )
    )
    .log("order", row.group)
    .log("trial_name", row.trial_name)
    .log("trialID", row.trialID)
    .log("video_name", row.video_name)
    .log("target_image", row.target)
    .log("distractor_image", row.distractor1)
)


Template("adult_ordersheet_long_Func2train.csv", row =>
    newTrial("Func2train",
        fullscreen()
        ,
        newText("train_instr", "Look, something might happen to the object!")
            .css({"font-size": "2em"})
    		.center()
            .print()
        ,
        newAudio("train_instr", "LookSomething.mp3")
            .play("once")
            .wait("first")
        ,
        newVideo("train_video", row.video_name)
            .size(960,540)
            .disable(0.01) // Disable participant controls
            .center()
            .print()
        ,
        newTimer("autoplayDelay", 1000).start().wait() // 1 second delay
        ,
        getVideo("train_video")
            .play()
            .wait("play") // Wait for the video to finish playing
            .log("play")
            .log("end")
        ,
        newTimer("postVideoDelay", 1000).start().wait() // 1 second wait after video ends
    )
    .log("order", row.group)
    .log("trial_name", row.trial_name)
    .log("trialID", row.trialID)
    .log("video_name", row.video_name)
)

Template("adult_ordersheet_long_Func2test.csv", row =>
    newTrial("Func2test",
        fullscreen()
        ,
        newVar("is2ndChance", 0).global() // See if the current trial is 2nd chance
        ,
        getVar("is2ndChance").set((/2ndchance$/.test(row.trial_name) ? 1 : 0))
        ,
        newVar("score", 0).global() // Track previous test result
        ,
        getVar("is2ndChance")   // See if the current trial needs to be run
            .test.is(1)         // No need to run 2nd test trials if the prev test is correct
                .success(
                    getVar("score")
                        .test.is(1)
                            .success(end())
                )
        ,
        // Play the test video
        newText("singleFuncTest_instr", "Your turn—what's behind the screen?")
            .css({"font-size": "2em"})
    		.center()
            .print()
        ,
        newAudio("singleFuncTest_instr", "YourTurn.mp3")
            .play("once")
            .wait("play")
        ,
        newVideo("singleFuncTest_video", row.video_name)
            .size(960,540)
            .disable(0.01) // Disable participant controls
            .print()
            .center()
        ,
        newTimer("autoplayDelay", 500).start().wait()
        ,
        getVideo("singleFuncTest_video")
            .play()
            .wait("play") // Wait for the video to finish playing
            .log("play")
            .log("end")
        ,
        getVideo("singleFuncTest_video").remove(),
        newTimer("postVideoDelay", 500).start().wait()
        ,
        // Display test options
        newImage("target", row.target).size(576, 324)
        ,
        newImage("distractor", row.distractor1).size(576, 324)
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
        getCanvas("target-distractor").remove()
        ,
        getText("singleFuncTest_instr").remove()
        ,
        // Test participant's selection
        getVar("is2ndChance")  // No need to give feedback for 2nd chance trials
            .test.is(1)         
                .success(end())
        ,
        getSelector("selection")
            .test.selected(getImage("target"))
                .success(
                    getVar("score")
                        .set(1)
                    ,
                    newText("chose_target","<strong>Good job! You chose the right answer.</strong>")
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
                    newAudio("singleFuncTest_target", "GoodJob.mp3")
                        .play("once")
                        .wait()
                    ,
                    newTimer("continue_target",2000).start().wait() 
                )
                .failure(
                    getVar("score").set(0)
                    ,
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
                    newAudio("singleFuncTest_distractor", "Sorry.mp3")
                        .play("once")
                        .wait()
                    ,
                    newTimer("continue_distractor",2000).start().wait()
                )
    )
    .log("order", row.group)
    .log("trial_name", row.trial_name)
    .log("trialID", row.trialID)
    .log("video_name", row.video_name)
    .log("target_image", row.target)
    .log("distractor_image", row.distractor1)
)

Template("adult_ordersheet_long_Type1comp.csv", row => 
    newTrial("Type1comp", 
        fullscreen()
        ,
        // Play the test video
        newText("funcCompTest_instr", "What do you think is behind the screen?")
            .css({"font-size": "2em"})
    		.center()
            .print()
        ,
        newAudio("funcCompTest_instr", "WhatDo.mp3")
            .play("once")
            .wait("first")
        ,
        newVideo("funcCompTest_video", row.video_name)
            .size(960,540)
            .disable(0.01) // Disable participant controls
            .print()
            .center()
        ,
        newTimer("autoplayDelay", 500).start().wait()
        ,
        getVideo("funcCompTest_video")
            .play()
            .wait("play") // Wait for the video to finish playing
            .log("play")
            .log("end")
        ,
        getVideo("funcCompTest_video").remove()
        ,
        newTimer("postVideoDelay", 500).start().wait()
        ,
        // Display test options
        newImage("target", row.target).size(576, 324)
        ,
        newImage("distractor1", row.distractor1).size(576, 324)
        ,
        newImage("distractor2", row.distractor2).size(576, 324)
        ,
        newImage("distractor3", row.distractor3).size(576, 324)
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
    .log("order", row.group)
    .log("trial_name", row.trial_name)
    .log("trialID", row.trialID)
    .log("video_name", row.video_name)
    .log("target_image", row.target)
    .log("distractor_image1", row.distractor1)
    .log("distractor_image2", row.distractor2)
    .log("distractor_image3", row.distractor3)
)

Template("adult_ordersheet_long_Type2comp.csv", row => 
    newTrial("Type2comp", 
        fullscreen()
        ,
        // Play the test video
        newText("funcCompTest_instr", "What do you think is behind the screen?")
            .css({"font-size": "2em"})
    		.center()
            .print()
        ,
        newAudio("funcCompTest_instr", "WhatDo.mp3")
            .play("once")
            .wait("first")
        ,
        newVideo("funcCompTest_video", row.video_name)
            .size(960,540)
            .disable(0.01) // Disable participant controls
            .print()
            .center()
        ,
        newTimer("autoplayDelay", 500).start().wait()
        ,
        getVideo("funcCompTest_video")
            .play()
            .wait("play") // Wait for the video to finish playing
            .log("play")
            .log("end")
        ,
        getVideo("funcCompTest_video").remove()
        ,
        newTimer("postVideoDelay", 500).start().wait()
        ,
        // Display test options
        newImage("target", row.target) 
            .size(576, 324)
        ,
        newImage("distractor1", row.distractor1) 
            .size(576, 324)
        ,
        newImage("distractor2", row.distractor2) 
            .size(576, 324)
        ,
        newImage("distractor3", row.distractor3) 
            .size(576, 324)
        ,
        newCanvas("target-distractors", 1200,700)
            .add(0, 0, getImage("target"))
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
        getCanvas("target-distractors").remove()
        ,
        getText("funcCompTest_instr").remove()
    )
    .log("order", row.group)
    .log("trial_name", row.trial_name)
    .log("trialID", row.trialID)
    .log("video_name", row.video_name)
    .log("target_image", row.target)
    .log("distractor_image1", row.distractor1)
    .log("distractor_image2", row.distractor2)
    .log("distractor_image3", row.distractor3)
)

Template("adult_ordersheet_long_Type3comp.csv", row => 
    newTrial("Type3comp", 
        fullscreen()
        ,
        // Play the test video
        newText("funcCompTest_instr", "What do you think is behind the screen?")
            .css({"font-size": "2em"})
    		.center()
            .print()
        ,
        newAudio("funcCompTest_instr", "WhatDo.mp3")
            .play("once")
            .wait("first")
        ,
        newVideo("funcCompTest_video", row.video_name)
            .size(960,540)
            .disable(0.01) // Disable participant controls
            .print()
            .center()
        ,
        newTimer("autoplayDelay", 500).start().wait()
        ,
        getVideo("funcCompTest_video")
            .play()
            .wait("play") // Wait for the video to finish playing
            .log("play")
            .log("end")
        ,
        getVideo("funcCompTest_video").remove()
        ,
        newTimer("postVideoDelay", 500).start().wait()
        ,
        // Display test options
        newImage("target", row.target).size(576, 324)
        ,
        newImage("distractor1", row.distractor1).size(576, 324)
        ,
        newImage("distractor2", row.distractor2).size(576, 324)
        ,
        newImage("distractor3", row.distractor3).size(576, 324)
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
        getCanvas("target-distractors").remove()
        ,
        getText("funcCompTest_instr").remove()
    )
    .log("order", row.group)
    .log("trial_name", row.trial_name)
    .log("trialID", row.trialID)
    .log("video_name", row.video_name)
    .log("target_image", row.target)
    .log("distractor_image1", row.distractor1)
    .log("distractor_image2", row.distractor2)
    .log("distractor_image3", row.distractor3)
)

Template("adult_ordersheet_long_Type4comp.csv", row => 
    newTrial("Type4comp", 
        fullscreen()
        ,
        // Play the test video
        newText("funcCompTest_instr", "What do you think is behind the screen?")
            .css({"font-size": "2em"})
    		.center()
            .print()
        ,
        newAudio("funcCompTest_instr", "WhatDo.mp3")
            .play("once")
            .wait("first")
        ,
        newVideo("funcCompTest_video", row.video_name)
            .size(960,540)
            .disable(0.01) // Disable participant controls
            .print()
            .center()
        ,
        newTimer("autoplayDelay", 500).start().wait()
        ,
        getVideo("funcCompTest_video")
            .play()
            .wait("play") // Wait for the video to finish playing
            .log("play")
            .log("end")
        ,
        getVideo("funcCompTest_video").remove()
        ,
        newTimer("postVideoDelay", 500).start().wait()
        ,
        // Display test options
        newImage("target", row.target).size(576, 324)
        ,
        newImage("distractor1", row.distractor1).size(576, 324)
        ,
        newImage("distractor2", row.distractor2).size(576, 324)
        ,
        newImage("distractor3", row.distractor3).size(576, 324)
        ,
        newCanvas("target-distractors", 1200,700)
            .add( 0, 0, getImage("target"))
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
        getCanvas("target-distractors").remove()
        ,
        getText("funcCompTest_instr").remove()
    )
    .log("order", row.group)
    .log("trial_name", row.trial_name)
    .log("trialID", row.trialID)
    .log("video_name", row.video_name)
    .log("target_image", row.target)
    .log("distractor_image1", row.distractor1)
    .log("distractor_image2", row.distractor2)
    .log("distractor_image3", row.distractor3)
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


