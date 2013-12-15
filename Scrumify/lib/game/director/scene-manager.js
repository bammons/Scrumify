ig.module(
        'game.director.scene-manager'
)
.requires(
        'impact.impact',
        'plugins.wordwrap'
)

.defines(function(){

ig.SceneManager = ig.Class.extend({
	currentScript: 0,
	font: new ig.Font('media/font.png'),
	nextLine: true,

	init: function() {
		this.princess = new ig.Image('media/dialouge_princess.png');
		this.knight = new ig.Image('media/dialouge_hero.png');
		this.phantom = new ig.Image('media/dialouge_phantom.png');
		this.boss = new ig.Image('media/dialouge_boss.png');
		this.dialogBox = new ig.Image('media/dialouge_scroll.png');
		this.wordWrapper = new WordWrapper(this.font, {w: 925});
		this.line = null;
		this.answer = null;
		this.answerString = null;
		this.answerOption = null;
		this.prevAnswer = null;
		this.correctAnswerCount = 0;
		this.val = 0;

		this.allScenes = {
			//Level 1
			Scene1: ['Friendly Scrum Knight Phantom(FSKP): Hey you! What are you doing here!? You have to leave now or you could get hurt!',
						'Scrum Knight(SK): I can not leave! I am on a quest to save my kingdom from destruction!',
						'FSKP: What is your quest?',
						'SK: I must collect all the pages for the Scrum Book in order to save my kingdom.',
						'FSKP: Well youre in luck! I just decided to help you.',
						'SK: I never asked for help. Now leave me be!',
						'FSKP: Well you have it anyways, I bet you cant even move!',
						'FSKP: Use the arrow keys to move left and right, the space to jump, and x to fire your magical scrum sword. When answering questions answer with the corresponding key (a, b, c, d, t, f).',
						'SK: Well, I guess since you were useful here, I could use your help elsewhere.',
						'*castle begins to rumble*',
						'SK: This castle seems very unstable, I only have a limited time to find the page and get out of here!',
						'FSKP: Thats right! You better hurry!'],
			Scene2: ['FSKP: That looks like one of those Scrum pages you said you were looking for. I would recommend you read through all of it. The information may come in handy at some point. Also! Dont forget to explore everywhere! Missing something could cost you your life.'],
			Scene3: ['SK: I can sense that a page is in that chest!',
						'FSKP: The chest looks like it would respond when you run into it.'],
			Scene4: ['SK: I can tell the page is just inside that door!'],
			/* Edited out for consistancy reasons
			Scene5: ['SK: It didnt work?',
						'FSKP: HA! Maybe you should use that brain of yours for once to figure this out.',
						'SK: If thats how youre going to be, then why dont you just figure it out!',
						'FSKP: Because Im dead! And quite frankly, that makes me not care. ….mmm but just this once Ill do you a favor...I suppose.'],*/
			Scene6: ['SK: Yes! Thats one more page found!',
						'FSKP: Dont forget to read through those, you may not have them to reference one day…'],
			Scene7: ['SK: I can sense another page near by! I think its in that chest!'],
			Scene8: ['SK: Alright thats the last page that I sense here!',
						'FSKP: You should get out soon! This place is coming down any second now!'],
			//Level 2
			Scene9: ['FSKP: I would be careful in this place you never know what we will run into.',
						'SK: Do you ever stop talking?',
						'FSKP: Not so long as im dead. HA! I swear I get better at this every day Im with you!'],
			Scene10: ['SK: Alright thats one down. I still sense more, so we should keep looking.',
						'FSKP: Lead the way, oh great Scrum Knight. With the way you rattle in that armour, they will never hear you coming.'],
			Scene11: ['SK: Alright, thats one more for the book!',
						'FSKP: Maybe we should just quit now, retire, and relax until we die! Oh wait...Im already dead! HA! Im just full of the jokes today.'],
			Scene12: ['FSKP: I spotted a chest near by.'],
			Scene13: ['SK: Wow I was barely able to jump to this one.',
						'FSKP: Well maybe if you werent so heavy…',
						'FSKP: Nothing….nothing, all Im saying is that three months in the desert did you some good…',
						'SK: Just stop talking…'],
			Scene14: ['SK: I sense that the page is near by!',
						'FSKP: Well what are we waiting for then?'],
			Scene15: ['FSKP: I swear you are getting smarter Scrum Knight, but I think thats just the heat warping my sense of reality.'],
			Scene16: ['SK: Okay I dont sense any more pages here, lets leave.',
						'FSKP: Good, this place is starting to bore me to death!'],
			//Level 3
			Scene17: ['FSKP: Jeez! You look cold, maybe on your next vacation out you should dress more warmly?',
						'SK: This isnt a vacation...its a quest to save my kingdom given to me by the princess herself!',
						'FSKP: Potato Pototo.'],
			Scene18: ['SK: How am I supposed to get up that?',
						'FSKP: Im not sure, we could always give up, go home, and watch as your kingdom crumbles to pieces.',
						'SK: You know I cant do that…',
						'FSKP: Well in that case you should use the double jump.',
						'SK: And how do I go about that?',
						'FSKP: You jump at a wall and just as you are about to hit the wall you jump again. This will perform a double jump.'],
			Scene19: ['FSKP: OH HEY….another chest'],
			Scene20: ['FSKP: Well THAT never gets old. Maybe you should just answer my questions and Ill give you all the pages you want.',
						'SK: I would rather die…'],
			/* Commented out for consistancy reasons
			Scene21: ['SK: You know the drill phantom',
						'FSKP: (mimics in dumb caveman voice) You know the drill phantom',
						'(FSKP opens the door)'],
			Scene22: ['FSKP: Oh look...it opened I would have never guessed',
						'SK: I cant wait until this is over. That way I wont ever have to deal with you again.',
						'FSKP: Well, I really think thats my decision considering Im a dead ghost that will never disappear. So youre stuck with me forever it looks like.',
						'SK: Angry grunt'],*/
			Scene23: ['SK: Theres another page up there!',
						'FSKP: Getting so excited over paper….its only a kingdom at risk.'],
			Scene24: ['FSKP: Hmmm multiple choice or multiple guess, I certainly hope it’s the latter.',
						'SK: I would never dishonor my kingdom by guessing on a question!',
						'FSKP: You might not, but the player might!',
						'SK: Whos that?',
						'FSKP: Nevermind...'],
			Scene25: ['FSKP: Another chest...I would have never guessed. You would think the developer would be a bit more creative…',
						'SK: The developer?',
						'FSKP: (mumbles) or maybe he just had limited resources….(out loud) Oh nevermind you clueless, little knight'],
			Scene26: ['FSKP: Quick question!',
						'SK: NO!',
						'FSKP: No, really, this is serious!',
						'SK: Alright…'],
			//Ask question
			Scene27: ['FSKP: Phew, I was worried you would miss that one. Congratulations! You’re not illiterate!',
						'SK: Whatever, I have all the pages now! Lets go back to the princess!',
						'FSKP: Lead on Sir Knight'],
			//Level 4
			Scene28: ['FSKP: Well Scrum Knight, you have definitely outdone yourself this time! This place looks down right cozy.',
						'SK: If you’re going to follow me, you could at least talk less.',
						'FSKP: If I did that, no one would talk to you and I can’t have that.',
						'FSKP: And just a reminder, don’t forget double jumping! You’re going to need it!'],
			Scene29: ['SK: Princess? What are you doing here?',
						'SP: (evil chuckle)',
						'SK: Princess?',
						'SP: I knew that you were a fool Scrum Knight, but I never thought it would be this easy!',
						'SK: What are you talking about Princess!?'],
			//Transform animation
			Scene30: ['FSKP: Wowee! I didn’t see that coming! I guess we can call off that wedding…',
						'SL: It was me all along! I killed the King and the Princess, but just before she died that blasted Princess destroyed the book, scattering the pages all around the world. And if I tried to collect the pages myself I would have died instantly. As a result, I needed you to collect the pages for me so that I may reassemble the book. And it was all too easy...',
						'SK: (Anger) You will pay ten fold for what you have done Scrum Lord!',
						'SL: I don’t think you have the power to even stop me, little Scrum Knight!'],
			Scene31: ['SK: It’s finally over! Now that I have the book, I need to hurry back in order to truly restore my kingdom.']
		};

		this.allQuestions = {
			//Level 1
			q1: ['Who does the product owner represent?\n',
						'How many Product Owners should a Scrum Team have?\n',
						'Can the Product Owner and the Scrum Master be the same person?\n'],
			q2: ['What is the range of team size on a Scrum Team?\n',
					'The Scrum Team is not self-organizing.\n'],
			q3: ['What is the responsibility of the Scrum Master?\n',
					'Is the Scrum Master the team leader?\n',
					'Is the Scrum Master the same as the Project Manager?\n'],
			//Level 2
			q4: ['What is a sprint?\n',
					'What does it mean to be timeboxed?\n',
					'What is a typical amount of time spent on a sprint?\n'],
			q5: ['Which one of these are not the three questions that every team member answers during a meeting.\n',
					'How long should a meeting be?\n',
					'Where should the meeting happen everyday?\n'],
			q6: ['Which one of these do not pertain to Backlog Refinement.\n',
					'Though everything can be done in a ____ meeting, they are commonly broken into _____ types of meetings for ______.\n',
					'What is the refinement meeting for?\n',
					'What is the poker meeting for?\n'],
			q7: ['Which one of these is not normally after a Daily Scrum?\n',
					'Which question is not on the agenda?\n'],
			q8: ['Which one of these are not in a in a sprint planning meeting\n',
					'When should a sprint planning meeting be held?\n'],
			//Level 3
			//Special Response
			q9: ['Which one of these are not in a sprint review meeting?\n',
					'What should not be done at the sprint retrospective?\n'],
			q10: ['Product backlog is an ordered list of ______ for a product.\n',
					'Select what a product backlog can contain.\n',
					'Which consideration is not what ordering items are based on?\n'],
			q11: ['What is a sprint backlog?\n',
					'What are features broken down into?\n',
					'Tasks are assigned for the next sprint.\n'],
			q12: ['What is an increment?\n'],
			q13: ['What is a sprint burn down?\n'],
			SpecialResponse: 'FSKP: Wait...wait... let me try (ominous voice) Answer the questions to get the results...I’m just messing with you! ',
			Response: 'FSKP: It looks like you answered '
		};

		this.allAnswerOptions = {
			//q1
			a1: ['A: Stakeholders\n', 'B: Customers\n', 'C: The Project Team\n', 'D: The Scrum Master\n'],
			a2: ['A: 4\n', 'B: 5\n', 'C: 1\n', 'D: 2\n'],
			a3: ['True or False\n'],
			//q2
			a4: ['A: 14\n', 'B: 10\n', 'C: 12\n', 'D: 7\n'],
			a5: ['True or False'],
			//q3
			a6: ['A: Rush the team through development\n', 'B: Remove all impediments for the team\n', 'C: To make sure evenone knows he/she is the master\n'],
			a7: ['True or False\n'],
			a8: ['True or False\n'],
			//q4
			a9: ['A: A basic unit of development in Scrum\n', 'B: Running really fast\n', 'C: A meeting in Scrum\n', 'D: Where the developers code extremely fast\n'],
			a10: ['A: You can not code for a specific set of time.\n', 'B: Being restricted to a specific duration\n', 'C: A timer for how long your Scrum meeting will be.\n'],
			a11: ['A: Two Months\n', 'B: Two Years\n', 'C: Two Weeks\n', 'D: Two Days\n'],
			//q5
			a12: ['A: What have you done since yesterday?\n', 'B: What are you planning to do today?\n', 'C: What are some of your ideas currently?\n', 'D: What are your impediments?\n'],
			a13: ['A: 1 hour\n', 'B: 15 minutes\n', 'C: 2 hours\n', 'D: 30 minutes\n'],
			a14: ['A: In the office\n', 'B: At your bosses house\n', 'C: At the same location\n', 'D: At your desk\n'],
			//q6
			a15: ['A: Creating stories\n', 'B: Decomposing stories\n', 'C: Refining acceptance criteria\n', 'D: Establish the direction the project is going\n'],
			a16: ['A: Scrum, 3, efficiency\n', 'B: single, 2, efficiency\n', 'C: Scrum, 2, efficiency\n'],
			a17: ['A: Creating and refinig stories on the backlog\n', 'B: Making sure your project is still on track\n', 'C: Editing your code\n'],
			a18: ['A: The time to place bets on how long the sprint will take to finish\n', 'B: Practice reading people in order to better figure out what the customer wants\n', 'C: Sizing the stories, in order to plan the next sprint\n'],
			//q7
			a19: ['A: Discussing your work\n', 'B: Sending an appointed member of your team\n', 'C: Restarting the meeting\n'],
			a20: ['A: What has your team done?\n', 'B: What will your team do?\n', 'C: Is anything slowing your team down?\n', 'D: Is your team happy with their project so far?\n'],
			//q8
			a21: ['A: Select work to be done\n', 'B: Prepare the sprint backlog\n', 'C: Identify work that will be done during current sprint\n', 'D: Check if any members would like to switch teams\n'],
			a22: ['A: When you start to run out of sprints\n', 'B: At the beginning of a sprint cycle\n', 'C: When the project manager makes a meeting in your calendar\n'],
			//q9
			a23: ['A: Review completed/non-completed work\n', 'B: Plan when the next meeting will be\n', 'C: Present work to Stakeholders\n'],
			a24: ['A: Create tasks for the next sprint\n', 'B: Reflect on past sprint\n', 'C: Answer what went well during the sprint\n', 'D: Answer what could be improved for the next sprint\n'],
			//q10
			a25: ['A: Problems\n', 'B: Tasks\n', 'C: Requirements\n', 'D: Sprints\n'],
			a26: ['A: Sprints\n', 'B: Meeting notes\n', 'C: Algorithms\n', 'D: Bug-Fixes\n'],
			a27: ['A: The development team\n', 'B: Dependancies\n', 'C: Risk\n', 'D: Business\n'],
			//q11
			a28: ['A: The list of work the team must address in the next sprint\n', 'B: The completed work the team finished during the sprint\n', 'C: The work the team failed to complete during the sprint\n'],
			a29: ['A: Modules\n', 'B: Tasks\n', 'C: Sprints\n', 'D: Scrum Meetings\n'],
			a30: ['True or False\n'],
			//q12
			a31: ['A: Adding one to something\n', 'B: Sum of completed product backlog items\n'],
			//q13
			a32: ['A: Chart of remaining work in sprint backlog\n', 'B: The ending of a sprint\n', 'C: Flushing the remaining tasks in the sprint backlog\n']
		};

		this.allCorrectAnswers = {
			a1: 'A',
			a2: 'C',
			a3: 'FALSE',
			a4: 'D',
			a5: 'FALSE',
			a6: 'B',
			a7: 'FALSE',
			a8: 'FALSE',
			a9: 'A',
			a10: 'B',
			a11: 'C',
			a12: 'C',
			a13: 'B',
			a14: 'C',
			a15: 'D',
			a16: 'B',
			a17: 'A',
			a18: 'C',
			a19: 'C',
			a20: 'D',
			a21: 'D',
			a22: 'B',
			a23: 'B',
			a24: 'A',
			a25: 'C',
			a26: 'D',
			a27: 'A',
			a28: 'A',
			a29: 'B',
			a30: 'FALSE',
			a31: 'B',
			a32: 'A'
		};

		this.pages = {
			Page1: ['Product Owner \n The Product Owner represents the stakeholders and is the voice of the customer. He or she is accountable for ensuring that the team delivers value to the business. The Product Owner writes (or has the team write) customer-centric items (typically user stories), ranks and prioritizes them, and adds them to the product backlog.',
						'Scrum teams should have one Product Owner, and while they may also be a member of the development team, this role should not be combined with that of the Scrum Master. In an enterprise environment, though, the Product Owner is often combined with the role of Project Manager as they have the best visibility regarding the scope of work (products).'],
			Page2: ['Development Team \n The Development Team is responsible for delivering potentially shippable product increments at the end of each Sprint (the Sprint Goal).',
						'A Team is made up of 7 +/- 2 individuals with cross-functional skills who do the actual work (analyse, design, develop, test, technical communication, document, etc.). The Development Team in Scrum is self-organizing, even though there may be some level of interface with project management offices (PMOs).'],
			Page3: ['Scrum Master \n Scrum is facilitated by a Scrum Master, who is accountable for removing impediments to the ability of the team to deliver the sprint goal/deliverables. The Scrum Master is not the team leader, but acts as a buffer between the team and any distracting influences. The Scrum Master ensures that the Scrum process is used as intended.', 
						'The Scrum Master is the enforcer of the rules of Scrum, often chairs key meetings, and challenges the team to improve. The role has also been referred to as a servant-leader to reinforce these dual perspectives. The Scrum Master differs from a Project Manager in that the latter may have people management responsibilities unrelated to the role of Scrum Master.', 
						'The Scrum Master role excludes any such additional people responsibilities. Although other roles may be encountered in real projects, Scrum does not define any other roles.'],
			Page4: ['Sprint \n A sprint is the basic unit of development in Scrum. The sprint is a "timeboxed" effort; that is, it is restricted to a specific duration. The duration is fixed in advance for each sprint and is normally between one week and one month, although two weeks is typical. Each sprint is preceded by a planning meeting,',
						'where the tasks for the sprint are identified and an estimated commitment for the sprint goal is made, and followed by a review or retrospective meeting, where the progress is reviewed and lessons for the next sprint are identified.'],
			Page5: ['Daily Scrum (Meetings Part 1) \n A daily scrum meeting in the computing room. This choice of location lets the team start on time. Each day during the sprint, a project team communication meeting occurs. This is called a daily scrum, or the daily standup. This meeting has specific guidelines: \n', 
						'All members of the development team come prepared with the updates for the meeting./nThe meeting starts precisely on time even if some development team members are missing./nThe meeting should happen at the same location and same time every day./nThe meeting length is set (timeboxed) to 15 minutes./n',
						'All are welcome, but normally only the core roles speak.\n',
						'During the meeting, each team member answers three questions:\nWhat have you done since yesterday?\nWhat are you planning to do today?\nAny impediments/stumbling blocks? Any impediment/stumbling block identified in this meeting is documented by the Scrum Master and worked towards resolution outside of this meeting. No detailed discussions shall happen in this meeting.'],
			Page6: ['Backlog refinement (Meetings Part 2)\nThis is the process of creating stories, decomposing stories into smaller ones when they are too large, refining the acceptance criteria for individual stories, prioritizing stories on the product backlog and sizing the existing stories in the product backlog using effort/points.\n', 
						'During each sprint the team should spend time doing product backlog refinement to keep a pool of stories ready for the next sprint.', 
						'Meetings should not be longer than an hour.\nMeeting does not include breaking stories into tasks.\nThe team can decide how many meetings are needed per week.',
						'Though everything can be done in a single meeting, these are commonly broken into two types of meetings for efficiency:\n1. The refinement meeting, where the product owner and stakeholders create and refine stories on the product backlog.\n2. The planning poker meeting, where the team sizes the stories on the product backlog to make them ready for the next sprint.'],
			Page7: ['Scrum of Scrums (Meetings Part 3):\nEach day normally after the Daily Scrum:\nThese meetings allow clusters of teams to discuss their work, focusing especially on areas of overlap and integration.\nA designated person from each team attends.', 
						'The agenda will be the same as the Daily Scrum, plus the following four questions:\nWhat has your team done since we last met?\nWhat will your team do before we meet again?\nIs anything slowing your team down or getting in their way?\nAre you about to put something in another teams way?'],
			Page8: ['Sprint planning meeting (Meetings Part 4)\nAt the beginning of the sprint cycle (every 7–30 days), a Sprint planning meeting is held:\nSelect what work is to be done.\nPrepare the Sprint Backlog that details the time it will take to do that work, with the entire team.\n',
						'Identify and communicate how much of the work is likely to be done during the current sprint.\nEight-hour time limit:\n      (1st four hours) Entire team: dialog for prioritizing the Product Backlog.\n      (2nd four hours) Development Team: hashing out a plan for the Sprint, resulting in the Sprint Backlog\n'],
			Page9: ['End of cycle (Meetings Part 5)\nAt the end of a sprint cycle, two meetings are held: the Sprint Review Meeting and the Sprint Retrospective.', 
						'At the Sprint Review Meeting:\nReview the work that was completed and the planned work that was not completed\nPresent the completed work to the stakeholders (a.k.a. "the demo")\nIncomplete work cannot be demonstrated\nFour-hour time limit',
						'At the Sprint Retrospective:\nAll team members reflect on the past sprint\nMake continuous process improvements\nTwo main questions are asked in the sprint retrospective: What went well during the sprint? What could be improved in the next sprint?\nThree-hour time limit\nThis meeting is facilitated by the Scrum Master'],
			Page10: ['Product Backlog (Artifacts Part 1)\nProduct backlog is an ordered list of “requirements” for a product.',
						'A Product Backlog can contain:\n   Features\n   Bug Fixes\n   Non-Functional Requirements\n   Estimates\n      Business Value\n      Development Effort', 
						'Point Scale/Story Points - An abstract point system, used to discuss the difficulty of the story without assigning actual hours.\nFeatures added to the backlog are commonly written in story format.\nItems are ordered by the Product Owner based on considerations like Dependencies, Date needed, Risk, Business Value, etc.'],
			Page11: ['Sprint Backlog (Artifacts Part 2)\nSprint Backlog is the list of work a Development Team must address during the next sprint.\nThe Sprint backlog is compiled by selecting features from the top of the product backlog.',
						'Effort is put into selecting enough work to fill a sprint. Keeping in mind the velocity of the last sprint.\nFeatures are broken down into tasks, based on best practices, that are between 4-16 hours or work.\nAll tasks are signed up for, not assigned.\nOnce a Sprint’s Product Backlog is committed, no additional functionality can be added to the sprint, except by the team.'],
			Page12: ['Increment (Artifacts Part 3)\nThe Increment is the sum of all Product Backlog items completed during a sprint and all previous sprints. Once a sprint is completed, the Increment must be done according to the Scrum Team’s definition of done.'],
			Page13: ['Burn down (Artifacts Part 4)\nSprint Burn Down chart is a publicly displayed chart showing remaining work in the sprint backlog.\nUpdated Daily\nProvides a simple view of progress with quick visualizations for reference.']
		};

		this.answerSet = {
			q1: ['a1', 'a2', 'a3'],
			q2: ['a4', 'a5'],
			q3: ['a6', 'a7', 'a8'],
			q4: ['a9', 'a10', 'a11'],
			q5: ['a12', 'a13', 'a14'],
			q6: ['a15', 'a16', 'a17', 'a18'],
			q7: ['a19', 'a20'],
			q8: ['a21', 'a22'],
			q9: ['a23', 'a24'],
			q10: ['a25', 'a26', 'a27'],
			q11: ['a28', 'a29', 'a30'],
			q12: ['a31'],
			q13: ['a32']
		};
	},

	runScene: function(sceneName) {
		sceneName = sceneName.toString();

		if(this.currentScript < this.allScenes[sceneName].length && this.nextLine) {
			this.drawChar(sceneName);
			this.line = this.wordWrapper.wrapMessage(this.allScenes[sceneName][this.currentScript]);
			this.font.draw(this.line, (ig.system.width / 2) - (this.dialogBox.width/2) + 70, this.dialogBox.height/2 + ig.system.height/4 + 20, ig.Font.ALIGN.LEFT);
			this.currentScript++;
			this.nextLine = false;
		}
		else if(this.currentScript >= this.allScenes[sceneName].length) {
			this.currentScript = 0;
			ig.game.newScene = false;
			ig.game.drawingScene = false;
			this.nextLine = true;
		}
	},

	drawChar: function(sceneName) {
		
		if(sceneName == 'Scene29' || sceneName == 'Scene30') {
			if(sceneName == 'Scene29') {
				this.knight.draw(ig.system.width/20, 0);
				this.princess.draw(ig.system.width/5, 0);
				this.dialogBox.draw((ig.system.width / 2) - (this.dialogBox.width/2), ig.system.height - this.dialogBox.height + 80);
			}
			else {
				this.knight.draw(ig.system.width/20, 0);
				this.boss.draw(ig.system.width/10, 0);
				this.dialogBox.draw((ig.system.width / 2) - (this.dialogBox.width/2), ig.system.height - this.dialogBox.height + 80);
			}
		}
		else {
			this.knight.draw(ig.system.width/20, 0);
			this.phantom.draw(ig.system.width/5, 0);
			this.dialogBox.draw((ig.system.width / 2) - (this.dialogBox.width/2), ig.system.height - this.dialogBox.height + 80);
		}
	},

	runPage: function(pageName) {
		pageName = pageName.toString();
		if(this.currentScript < this.pages[pageName].length && this.nextLine) {
			this.dialogBox.draw((ig.system.width / 2) - (this.dialogBox.width/2), ig.system.height - this.dialogBox.height + 80);
			this.line = this.wordWrapper.wrapMessage(this.pages[pageName][this.currentScript])
			this.font.draw(this.line, (ig.system.width / 2) - (this.dialogBox.width/2) + 70, this.dialogBox.height/2 + ig.system.height/4 + 20, ig.Font.ALIGN.LEFT);
			this.currentScript++;
			this.nextLine = false;
		}
		else if(this.currentScript >= this.pages[pageName].length) {
			this.currentScript = 0;
			ig.game.newPage = false;
			ig.game.drawingScene = false;
			this.nextLine = true;
		}
	},

	runQuestion: function(questionName) {
		questionName = questionName.toString();
		var offset = 20;
		if(this.answer == this.prevAnswer && this.answer != null) {
			this.correctAnswerCount++;
			console.log('I landed');
		}
		if(this.currentScript < this.allQuestions[questionName].length && this.nextLine) {

			this.dialogBox.draw((ig.system.width / 2) - (this.dialogBox.width/2), ig.system.height - this.dialogBox.height + 80);
			this.answerOption = this.answerSet[questionName][this.currentScript];
			var aLength = this.allAnswerOptions[this.answerOption].length;
			for(i = 0; i < aLength; i++) {
				if(this.answerString == null) {
					this.answerString = this.allAnswerOptions[this.answerOption][i];
				}
				else {
					this.answerString = this.answerString.concat(this.allAnswerOptions[this.answerOption][i]);
				}
			}
			this.prevAnswer = this.allCorrectAnswers[this.answerOption];
			this.line = this.wordWrapper.wrapMessage(this.allQuestions[questionName][this.currentScript].concat(this.answerString));
			this.font.draw(this.line, (ig.system.width / 2) - (this.dialogBox.width/2) + 70, this.dialogBox.height/2 + ig.system.height/4 + 20, ig.Font.ALIGN.LEFT);
			this.currentScript++;
			this.answerString = null;
			this.nextLine = false;
			
			
		}
		else if(this.currentScript >= this.allQuestions[questionName].length) {
			this.currentScript = 0;
			this.nextLine = true;
			var totalq = this.allQuestions[questionName].length;
			this.val = this.correctAnswerCount/totalq;
			console.log(this.val);
			console.log(this.correctAnswerCount);
			console.log(totalq);
			ig.game.newQuestion = false;
			if(this.val == 1) {
				ig.game.passed = true;
			}
		}
	},

	runResponse: function(responded) {
		if(!this.nextLine && !responded) {
			this.val *= 100;
			this.drawChar('a sceneName that doesnt matter');
			this.line = this.wordWrapper.wrapMessage(this.allQuestions['Response'].concat(this.val.toFixed(2)).concat('% correctly.'));
			this.font.draw(this.line, (ig.system.width / 2) - (this.dialogBox.width/2) + 70, this.dialogBox.height/2 + ig.system.height/4 + 20, ig.Font.ALIGN.LEFT);
			this.nextLine = true;
			ig.game.passed = false;
			ig.game.responded = true;
		}
		
		if(ig.input.pressed('ok')) {
			ig.game.drawingScene = false;
			ig.game.responded = false;
		}
	}
});
});