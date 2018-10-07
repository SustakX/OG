const talk = {
	effect: {
		start:		[],
		business:	[['%other.attraction(+1)']],
		chat:		[['%other.attraction(+3)']],
		flirt:		[['%other.attraction(+6)']],
		boredshort:	[['%other.attraction(-3,{min:3,max:-1})']],
		boredlong:	[['%other.attraction(-6,{min:3,max:-1})']],
		nochattoday:[],
		cleavage:	[
			['%other.attraction(-10,{min:3,max:-1})'],
			['player.horninessAdjust(2)']
		]
	},
	sarah: {
		start:{
			txt:"Morning Bob",
			img:'pic/npc/sarah/talk/chat.jpg',
			link:'Talk Business'
		},
		business:{
			txt:"You update Sarah on the status of your ongoing projects.",
			img:'pic/npc/sarah/talk/happy.jpg',
			link:'Chat',
		},
		chat:{
			txt:"Sarah enjoys chatting with you.",
			img:'pic/npc/sarah/talk/charmed.jpg',
			link:'Flirt',
		},
		flirt:{
			txt:"Sarah's eyes sparkle as you talk, but she must get back to her work.",
			img:'pic/npc/sarah/talk/enchanted.jpg',
			link:'',
		},
		boredshort:{
			txt:"Looks like you bored her.",
			img:'pic/npc/sarah/talk/bored.jpg',
			link:'',
		},
		boredlong:{
			txt:"Looks like you bored her, maybe you should have quit whilst you were ahead.",
			img:'pic/npc/sarah/talk/bored.jpg',
			link:'',
		},
		nochattoday:{
			txt:"She doesn't seem to be in the mood for chatting today.",
			img:'pic/npc/sarah/talk/bored.jpg',
			link:''
		},
		cleavage:{
			txt:"You attempt to talk business, however you're so horny you end up just fixating on her tits. Not the way to impress a girl!",
			img:'pic/npc/sarah/talk/cleavage.jpg',
			link:'',
		}
	},
	stella: {
		start:{
			txt:"Morning Bob",
			img:'pic/npc/stella/talk/chat.jpg',
			link:'Talk Business'
		},
		business:{
			txt:"You discuss with Stella some of the costs of your current projects to ensure you are staying within budget.",
			img:'pic/npc/stella/talk/happy.jpg',
			link:'Chat',
		},
		chat:{
			txt:"Stella is happy to take her mind off her work for a few minutes.",
			img:'pic/npc/stella/talk/charmed.jpg',
			link:'Flirt',
		},
		flirt:{
			txt:"Stella gets a happy glint in her eye as you compliment her look.",
			img:'pic/npc/stella/talk/enchanted.jpg',
			link:'',
		},
		boredshort:{
			txt:"Looks like you bored her.",
			img:'pic/npc/stella/talk/bored.jpg',
			link:'',
		},
		boredlong:{
			txt:"Looks like you bored her, maybe you should have quit whilst you were ahead.",
			img:'pic/npc/stella/talk/bored.jpg',
			link:'',
		},
		nochattoday:{
			txt:"She doesn't seem to be in the mood for chatting today.",
			img:'pic/npc/stella/talk/bored.jpg',
			link:''
		},
		cleavage:{
			txt:"You attempt to talk business, however you're so horny you end up just fixating on her tits. Not the way to impress a girl!",
			img:'pic/npc/stella/talk/cleavage.jpg',
			link:'',
		}
	},
	jenny: {
		start:{
			txt:"Morning Bob",
			img:'pic/npc/jenny/talk/chat.jpg',
			link:'Talk Business'
		},
		business:{
			txt:"You talk through Jenny's current projects and see if there are any places your work overlaps to save some time.",
			img:'pic/npc/jenny/talk/happy.jpg',
			link:'Chat',
		},
		chat:{
			txt:"Jenny can't help but smile as you chat with her.",
			img:'pic/npc/jenny/talk/charmed.jpg',
			link:'Flirt',
		},
		flirt:{
			txt:"Jenny's cheeks flush a little as you compliment her.",
			img:'pic/npc/jenny/talk/enchanted.jpg',
			link:'',
		},
		boredshort:{
			txt:"Looks like you bored her.",
			img:'pic/npc/jenny/talk/bored.jpg',
			link:'',
		},
		boredlong:{
			txt:"Looks like you bored her, maybe you should have quit whilst you were ahead.",
			img:'pic/npc/jenny/talk/bored.jpg',
			link:'',
		},
		nochattoday:{
			txt:"She doesn't seem to be in the mood for chatting today.",
			img:'pic/npc/jenny/talk/bored.jpg',
			link:''
		},
		cleavage:{
			txt:"You attempt to talk business, however you're so horny you end up just fixating on her tits. Not the way to impress a girl!",
			img:'pic/npc/jenny/talk/cleavage.jpg',
			link:'',
		}
	}
}

State.variables.talk = talk;
