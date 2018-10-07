const visme = {
	riley: {
		'happy': {img:'pic/npc/riley/visme/happy.jpg',txt:"Riley looks happy to see you online."},
		'angry': {img:'pic/npc/riley/visme/angry.jpg',txt:"Riley is looking rather upset today."},
		'horny1': {img:'pic/npc/riley/visme/hornyLevel1.jpg',txt:"Riley is looking a little cheeky tonight."},
		'horny2': {img:'pic/npc/riley/visme/hornyLevel2.jpg',txt:"Clearly Riley's seems a little distracted tonight."},
		'horny3': {img:'pic/npc/riley/visme/hornyLevel3.jpg',txt:"Riley is on fire tonight!"},
		'reaction_calm_true':{
			img:'pic/npc/riley/visme/angry.jpg',
			txt:'Riley is clearly upset this evening. You take you time listening to her and give the odd supporting comment when you can. She seems to calm down a little.',
			effect: [
				'riley.stat.anger -= 2',
				'player.stat.communicationLeft -= 5'
			]
		},
		'reaction_calm_false':{
			img:'pic/npc/riley/visme/angry.jpg',
			txt:'Riley is too angry to even listen to you! Maybe you should give her a few days to calm down on her own before you try talking to her again.',
			effect: [
				'riley.stat.anger += 2',
				'player.stat.communicationLeft -= 5'
			]
		},
		'reaction_flirt_flirty1':{
			img:'pic/npc/riley/visme/flirty.jpg',
			txt:'You get a little flirtatious with Riley, she responds well and open up a little more to you. Nice work!',
			effect: [
				'riley.stat.openness += 1',
				'riley.stat.horniness += 2',
				'riley.stat.anger -= 1',
				'player.stat.horniness += 2',
				'player.stat.communicationLeft -= 10'
			]
		},
		'reaction_flirt_flirty2':{
			img:'pic/npc/riley/visme/flirty.jpg',
			txt:'You get a little flirtatious with Riley, she responds well and open up a little more to you. Nice work!',
			effect: [
				'riley.stat.openness += 1',
				'riley.stat.horniness += 2',
				'riley.stat.anger -= 1',
				'player.stat.horniness += 2',
				'player.stat.communicationLeft -= 10'
			]
		},
		'reaction_flirt_flirty3':{
			img:'pic/npc/riley/visme/flirty.jpg',
			txt:'You get a little flirtatious with Riley, she responds well and open up a little more to you. Nice work!',
			effect: [
				'riley.stat.openness += 1',
				'riley.stat.horniness += 2',
				'riley.stat.anger -= 1',
				'player.stat.horniness += 2',
				'player.stat.communicationLeft -= 10'
			]
		},
		'reaction_flirt_happy':{
			img:'pic/npc/riley/visme/happy.jpg',
			txt:'You try to make small talk with Riley but she doesn t seem to respond much to your attempts to amuse her. Wilst you have distracted her a little she seems too preocuied with her problems to really get into it.',
			effect: [
				'riley.stat.anger -= 1',
				'player.stat.communicationLeft -= 10'
			]
		},
		'reaction_flirt_angry1':{
			img:'pic/npc/riley/visme/angry.jpg',
			txt:'Your attempts to flirt with Riley seem only to make her even more angry that she already was!',
			effect: [
				'riley.stat.openness -= 2',
				'riley.stat.horniness -= 2',
				'riley.stat.anger += 2',
				'player.stat.communicationLeft -= 10'
			]
		},
		'reaction_flirt_angry2':{
			img:'pic/npc/riley/visme/angry.jpg',
			txt:'Riley is clearly not up for fooling around this evening. You may even have pissed her off a bit!',
			effect: [
				'riley.stat.horniness -= 1',
				'riley.stat.anger += 1',
				'player.stat.communicationLeft -= 10'
			]
		},
		'reaction_dirty_dirty1':{
			img:'pic/npc/riley/visme/dirtytalk01.jpg',
			txt:'You begin slow but before long Riley and you are getting very personal with your chat. Riley gets rather carried away.',
			effect: [
				'riley.stat.openness += 1',
				'riley.stat.horniness += 3',
				'riley.stat.anger -= 1',
				'player.stat.horniness += 3',
				'player.stat.communicationLeft -= 20'
			]
		},
		'reaction_dirty_dirty2':{
			img:'pic/npc/riley/visme/dirtytalk02.jpg',
			txt:'You begin slow but before long Riley and you are getting very personal with your chat. Riley gets rather carried away.',
			effect: [
				'riley.stat.openness += 1',
				'riley.stat.horniness += 3',
				'riley.stat.anger -= 1',
				'player.stat.horniness += 3',
				'player.stat.communicationLeft -= 20'
			]
		},
		'reaction_dirty_dirty3':{
			img:'pic/npc/riley/visme/dirtytalk03.jpg',
			txt:'You begin slow but before long Riley and you are getting very personal with your chat. Riley gets rather carried away.',
			effect: [
				'riley.stat.openness += 1',
				'riley.stat.horniness += 3',
				'riley.stat.anger -= 1',
				'player.stat.horniness += 3',
				'player.stat.communicationLeft -= 20'
			]
		},
		'reaction_dirty_horny':{
			img:'pic/npc/riley/visme/hornyLevel1.jpg',
			txt:'Your attempts to engage in some sex chat go largly unnoticed. Riley sort of plays along, but is clearly not really into it.',
			effect: [
				'riley.stat.horniness += 1',
				'riley.stat.anger += 1',
				'player.stat.communicationLeft -= 20'
			]
		},
		'reaction_dirty_angry1':{
			img:'pic/npc/riley/visme/angry.jpg',
			txt:'Your attempts to get Riley talking dirty seem only to make her even more angry that she already was!',
			effect: [
				'riley.stat.anger += 2',
				'player.stat.communicationLeft -= 20'
			]
		},
		'reaction_dirty_angry2':{
			img:'pic/npc/riley/visme/angry.jpg',
			txt:'Riley is clearly not in the mood for anything so racy this evening. You may well have pissed her off a bit!',
			effect: [
				'riley.stat.horniness -= 1',
				'riley.stat.anger += 1',
				'player.stat.communicationLeft -= 20'
			]
		},
		'reaction_chat_angry1':{
			img:'pic/npc/riley/visme/angry.jpg',
			txt:"You try to make small talk with Riley but she doesn't seem to respond much to your attempts to amuse her. Wilst you have distracted her a little she seems too preocuied with her problems to really connect with you.",
			effect: [
				'riley.stat.anger -= 1',
				'player.stat.communicationLeft -= 5'
			]
		},
		'reaction_chat_angry2':{
			img:'pic/npc/riley/visme/angry.jpg',
			txt:"Your attempts to chat with Riley seem only to make her even more angry that she already was!",
			effect: [
				'riley.stat.openness -= 1',
				'riley.stat.horniness -= 1',
				'riley.stat.anger += 1',
				'player.stat.communicationLeft -= 5'
			]
		},
		'reaction_chat_happy1':{
			img:'pic/npc/riley/visme/happy2.jpg',
			txt:"You spend a good while chatting with Riley about the days events. She seems to enjoy spending the time with you.",
			effect: []
		},
		'reaction_chat_happy2':{
			img:'pic/npc/riley/visme/happy3.jpg',
			txt:"You spend a good while chatting with Riley about the days events. She seems to enjoy spending the time with you.",
			effect: []
		}
	}
};

State.variables.visme = visme;
