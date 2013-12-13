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
		this.line = 'none';
		this.sceneCount = 0;
		this.answer = 'null';

		this.allScenes = {
			//Level 1
			Scene1: ['Friendly Scrum Knight Phantom(FSKP): Hey you! What are you doing here!? You have to leave now or you could get hurt!',
						'Scrum Knight(SK): I can not leave! I am on a quest to save my kingdom from destruction!',
						'FSKP: What is your quest?',
						'SK: I must collect all the pages for the Scrum Book in order to save my kingdom.',
						'FSKP: Well you\’re in luck! I just decided to help you.',
						'SK: I never asked for help. Now leave me be!',
						'FSKP: Well you have it anyways, I bet you can\’t even move!',
						'FSKP: Use the arrow keys to move left and right, the space to jump, and x to fire your magical scrum sword',
						'SK: Well, I guess since you were useful here, I could use your help elsewhere.',
						'*castle begins to rumble*',
						'SK: This castle seems very unstable, I only have a limited time to find the page and get out of here!',
						'FSKP: That\’s right! You better hurry!'],
			Scene2: ['FSKP: That looks like one of those Scrum pages you said you were looking for. I would recommend you read through all of it. The information may come in handy at some point…'],
			Scene3: ['SK: I can sense that a page is in that chest!',
						'FSKP: The chest looks like it would respond when you run into it.'],
			Scene4: ['SK: I can tell the page is just behind that door!',
						'FSKP: I think you have to run at it just like you did with the chest!'],
			Scene5: ['SK: It didn’t work?',
						'FSKP: HA! Maybe you should use that brain of yours for once to figure this out.',
						'SK: If that\’s how you\’re going to be, then why don’t you just figure it out!',
						'FSKP: Because I’m dead! And quite frankly, that makes me not care. ….mmm but just this once I\’ll do you a favor...I suppose.'],
			Scene6: ['SK: Yes! That\’s one more page found!',
						'FSKP: Don\’t forget to read through those, you may not have them to reference one day…'],
			Scene7: ['SK: I can sense another page near by! I think it’s in that chest!',
						'FSKP: The chest definitely activates when you run into it. I promise!',
						'SK: I’m not falling for that this time phantom…',
						'FSKP: No, it’s true! I swear on my life! (chuckle)',
						'SK: When you’re done playing games, I have a quest to finish Phantom.',
						'FSKP: Alright...alright….I wasn\’t joking, you do actually have to run into it.',
						'SK: (Angry Growl)'],
			Scene8: ['SK: Alright that’s the last page that I sense here!',
						'FSKP: You should get out soon! This place is coming down any second now!'],
			//Level 2
			Scene9: ['FSKP: I would be careful in this place you never know what we will run into.',
						'SK: Do you ever stop talking?',
						'FSKP: Not so long as im dead. HA! I swear I get better at this every day I\’m with you!'],
			Scene10: ['SK: Alright that\’s one down. I still sense more, so we should keep looking.',
						'FSKP: Lead the way, oh great Scrum Knight. With the way you rattle in that armour, they will never hear you coming.'],
			Scene11: ['SK: Alright, that\’s one more for the book!',
						'FSKP: Maybe we should just quit now, retire, and relax until we die! Oh wait...I\’m already dead! HA! I\’m just full of the jokes today.'],
			Scene12: ['FSKP: I spotted a chest near by.'],
			Scene13: ['SK: Wow I was barely able to jump to this one.',
						'FSKP: Well maybe if you weren\’t so heavy…',
						'FSKP: Nothing….nothing, all I\’m saying is that three months in the desert did you some good…',
						'SK: Just stop talking…'],
			Scene14: ['SK: I sense that the page is near by!',
						'FSKP: Well what are we waiting for then?'],
			Scene15: ['FSKP: I swear you are getting smarter Scrum Knight, but I think that\’s just the heat warping my sense of reality.'],
			Scene16: ['SK: Okay I don’t sense any more pages here, let\’s leave.',
						'FSKP: Good, this place is starting to bore me to death!'],
			//Level 3
			Scene17: ['FSKP: Jeez! You look cold, maybe on your next vacation out you should dress more warmly?',
						'SK: This isn\’t a vacation...it’s a quest to save my kingdom given to me by the princess herself!',
						'FSKP: Potato Pototo.'],
			Scene18: ['SK: How am I supposed to get up that?',
						'FSKP: I\’m not sure, we could always give up, go home, and watch as your kingdom crumbles to pieces.',
						'SK: You know I can\’t do that…',
						'FSKP: Well in that case you should use the double jump.',
						'SK: And how do I go about that?',
						'FSKP: You jump at a wall and just as you are about to hit the wall you jump again. This will perform a double jump.'],
			Scene19: ['FSKP: OH HEY….another chest'],
			Scene20: ['FSKP: Well THAT never gets old. Maybe you should just answer my questions and I\’ll give you all the pages you want.',
						'SK: I would rather die…'],
			Scene21: ['SK: You know the drill phantom',
						'FSKP: (mimics in dumb caveman voice) You know the drill phantom',
						'(FSKP opens the door)'],
			Scene22: ['FSKP: Oh look...it opened I would have never guessed',
						'SK: I can’t wait until this is over. That way I won’t ever have to deal with you again.',
						'FSKP: Well, I really think that’s my decision considering I’m a dead ghost that will never disappear. So you’re stuck with me forever it looks like.',
						'SK: Angry grunt'],
			Scene23: ['SK: There’s another page up there!',
						'FSKP: Getting so excited over paper….it’s only a kingdom at risk.'],
			Scene24: ['FSKP: Hmmm multiple choice or multiple guess, I certainly hope it’s the latter.',
						'SK: I would never dishonor my kingdom by guessing on a question!',
						'FSKP: You might not, but the player might!',
						'SK: Who’s that?',
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
						'SK: Whatever, I have all the pages now! Let’s go back to the princess!',
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
			q1: ['Who does the product owner represent?',
						'How many Product Owners should a Scrum Team have?',
						'Can the Product Owner and the Scrum Master be the same person?'],
			q2: ['What is the range of team size on a Scrum Team?',
					'The Scrum Team is not self-organizing.'],
			q3: ['What is the responsibility of the Scrum Master?',
					'Is the Scrum Master the team leader?',
					'Is the Scrum Master the same as the Project Manager?'],
			//Level 2
			q4: ['What is a sprint?',
					'What does it mean to be timeboxed?',
					'What is a typical amount of time spent on a sprint?'],
			q5: ['Which one of these are not the three questions that every team member answers during a meeting.',
					'How long should a meeting be?',
					'Where should the meeting happen everyday?'],
			q6: ['Which one of these do not pertain to Backlog Refinement.',
					'Though everything can be done in a ____ meeting, they are commonly broken into _____ types of meetings for ______.',
					'What is the refinement meeting for?',
					'What is the poker meeting for?'],
			q7: ['Which one of these is not normally after a Daily Scrum?',
					'Which question is not on the agenda?'],
			q8: ['Which one of these are not in a in a sprint planning meeting',
					'When should a sprint planning meeting be held?'],
			//Level 3
			//Special Response
			q9: ['Which one of these are not in a sprint review meeting?',
					'What should not be done at the sprint retrospective?'],
			q10: ['Product backlog is an ordered list of ______ for a product.',
					'Select what a product backlog can contain.',
					'Which consideration is not what ordering items are based on?'],
			q11: ['What is a sprint backlog?',
					'What are features broken down into?',
					'Tasks are assigned for the next sprint.'],
			q12: ['What is an increment?'],
			q13: ['What is a sprint burn down?'],
			SpecialResponse: ['FSKP: Wait...wait... let me try (ominous voice) Answer the questions to get the results...I’m just messing with you! '],
			Response: ['FSKP: It looks like you answered ']
		};

		this.allAnswerOptions = {
			//q1
			a1: ['A: Stakeholders', 'B: Customers', 'C: The Project Team', 'D: The Scrum Master'],
			a2: ['A: 4', 'B: 5', 'C: 1', 'D: 2'],
			a3: ['True or False'],
			//q2
			a4: ['A: 14', 'B: 10', 'C: 12', 'D: 7'],
			a5: ['True or False'],
			//q3
			a6: ['A: Rush the team through development', 'B: Remove all impediments for the team', 'C: To make sure evenone knows he/she is the master'],
			a7: ['True or False'],
			a8: ['True or False'],
			//q4
			a9: ['A: A basic unit of development in Scrum', 'B: Running really fast', 'C: A meeting in Scrum', 'D: Where the developers code extremely fast'],
			a10: ['A: You can not code for a specific set of time.', 'B: Being restricted to a specific duration', 'C: A timer for how long your Scrum meeting will be.'],
			a11: ['A: Two Months', 'B: Two Years', 'C: Two Weeks', 'D: Two Days'],
			//q5
			a12: ['A: What have you done since yesterday?', 'B: What are you planning to do today?', 'C: What are some of your ideas currently?', 'D: What are your impediments?'],
			a13: ['A: 1 hour', 'B: 15 minutes', 'C: 2 hours', 'D: 30 minutes'],
			a14: ['A: In the office', 'B: At your boss\' house', 'C: At the same location', 'D: At your desk'],
			//q6
			a15: ['A: Creating stories', 'B: Decomposing stories', 'C: Refining acceptance criteria', 'D: Establish the direction the project is going'],
			a16: ['A: Scrum, 3, efficiency', 'B: single, 2, efficiency', 'C: Scrum, 2, efficiency'],
			a17: ['A: Creating and refinig stories on the backlog', 'B: Making sure your project is still on track', 'C: Editing your code'],
			a18: ['A: The time to place bets on how long the sprint will take to finish', 'B: Practice reading people in order to better figure out what the customer wants', 'C: Sizing the stories, in order to plan the next sprint'],
			//q7
			a19: ['A: Discussing your work', 'B: Sending an appointed member of your team', 'C: Restarting the meeting'],
			a20: ['A: What has your team done?', 'B: What will your team do?', 'C: Is anything slowing your team down?', 'D: Is your team happy with their project so far?'],
			//q8
			a21: ['A: Select work to be done', 'B: Prepare the sprint backlog', 'C: Identify work that will be done during current sprint', 'D: Check if any members would like to switch teams'],
			a22: ['A: When you start to run out of sprints', 'B: At the beginning of a sprint cycle', 'C: When the project manager makes a meeting in your calendar'],
			//q9
			a23: ['A: Review completed/non-completed work', 'B: Plan when the next meeting will be', 'C: Present work to Stakeholders'],
			a24: ['A: Create tasks for the next sprint', 'B: Reflect on past sprint', 'C: Answer what went well during the sprint', 'D: Answer what could be improved for the next sprint'],
			//q10
			a25: ['A: Problems', 'B: Tasks', 'C: Requirements', 'D: Sprints'],
			a26: ['A: Sprints', 'B: Meeting notes', 'C: Algorithms', 'D: Bug-Fixes'],
			a27: ['A: The development team', 'B: Dependancies', 'C: Risk', 'D: Business'],
			//q11
			a28: ['A: The list of work the team must address in the next sprint', 'B: The completed work the team finished during the sprint', 'C: The work the team failed to complete during the sprint'],
			a29: ['A: Modules', 'B: Tasks', 'C: Sprints', 'D: Scrum Meetings'],
			a30: ['True or False'],
			//q12
			a31: ['A: Adding one to something', 'B: Sum of completed product backlog items'],
			//q13
			a32: ['A: Chart of remaining work in sprint backlog', 'B: The ending of a sprint', 'C: Flushing the remaining tasks in the sprint backlog']
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
						'Scrum teams should have one Product Owner, and while they may also be a member of the development team, this role should not be combined with that of the Scrum Master. In an enterprise environment, though, the Product Owner is often combined with the role of Project Manager as they have the best visibility regarding the scope of work (products).']
		};
	},

	runScene: function(sceneName) {
		sceneName = sceneName.toString();

		if(this.currentScript < this.allScenes[sceneName].length && this.nextLine) {
			this.drawChar(sceneName);
			this.line = this.wordWrapper.wrapMessage(this.allScenes[sceneName][this.currentScript])
			this.font.draw(this.line, (ig.system.width / 2) - (this.dialogBox.width/2) + 70, this.dialogBox.height/2 + ig.system.height/4 + 20, ig.Font.ALIGN.LEFT);
			this.currentScript++;
			this.nextLine = false;
		}
		else if(this.currentScript >= this.allScenes[sceneName].length) {
			this.sceneCount++;
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
		if(this.currentScript < this.allQuestions[questionName].length && this.nextLine) {
			this.dialogBox.draw((ig.system.width / 2) - (this.dialogBox.width/2), ig.system.height - this.dialogBox.height + 80);
			this.line = this.wordWrapper.wrapMessage(this.allQuestions[questionName][this.currentScript])
			this.font.draw(this.line, (ig.system.width / 2) - (this.dialogBox.width/2) + 70, this.dialogBox.height/2 + ig.system.height/4 + 20, ig.Font.ALIGN.LEFT);
			
		}
	}
});
});