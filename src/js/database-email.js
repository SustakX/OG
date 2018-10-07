const email = {
	riley:{
		hi:[
			["<<scratch InstallVisMe = true>>Hi you, it's $npc.riley.name. I hope you are still using this address! Been a long time since we saw each other huh? Listen I was just thinking the other night about how I miss talking to you about my day like we used to. My day always seemed to be a bit better when I could share it. As it happens I've just installed a new chat app called VisMe. If you want you can install it too and maybe we can chat again like the old days! :)"],
			["Cool if you don't but I really would love to hear from you again."],
			["Anyway, see you dude!"],
			["Oh yes, if you do install it my name on there is CheekyGirl91 :D"]
		],
		confess:[
			["$npc.player.name, $npc.riley.greeting."],
			["I have something to confess to you. This.. new direction our relationship is taking. Well, I think this is what I always wanted."],
			["Even back when we were young, I know we were just sort of friends, but deep down I always wanted you. In fact... well.. I guess it's ok telling you this now, but when I first started, erm.. playing with my body.. oh god why is this making me feel like a nervous little virgin again.. well it was you I was thinking of back then."],
			["I even.. erm.. hehe well I stole some of your underwear one time.. :D I even took them with me to college.. although in the end I had to throw them out.. they became a little.. well.. soiled would be the word I guess!"],
			["Oh god, I hope I haven't said too much here.. I just feel we are at that point when we can start being truely honest with each other and I've been thinking so much about this recently."],
			["$npc.riley.name<<set $npc.player.stat.horniness += 20>><<set $npc.riley.stat.story = 11>>"]
		]
	}
}

State.variables.email = email;

const emailAvailable = [];

State.variables.emailAvailable = emailAvailable;
