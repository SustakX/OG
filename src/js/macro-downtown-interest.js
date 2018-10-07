Macro.add('downtown-interest', {
	// tags    : null,
	handler : function() {
		if(this.args.length === 0) {
			throw new Error('No interestid given!');
		}

		const db = {
			bar: {
				ach:'poured_in_the_city',
				linkShort:'Quick Drink',
				linkLong:'Socialize',
				img:'pic/location/bar/postdrinks.jpg',
				labelShort:'You spend an hour drinking and chatting with the locals.',
				labelLong:'You spend a good few hours drinking and chatting with the locals.',
				stat:'communicationAdjust'
			},
			gym:{
				ach:'pumped_in_the_city',
				linkShort:'Quick Circut',
				linkLong:'Full Workout',
				img:'pic/location/gym/postworkout.jpg',
				labelShort:'A good place to pump iron, and do some people watching.',
				labelLong:'You spend a few hours pumping iron and working up a sweat.',
				stat:'staminaAdjust'
			},
			library:{
				ach:'paged_in_the_city',
				linkShort:'Check the newspapers',
				linkLong:'Read',
				img:'pic/location/library/locationend.jpg',
				labelShort:'You spend an hour glancing through the local papers.',
				labelLong:'You spend a few hours reading through some books that catch your eye.',
				stat:'concentrationAdjust'
			}
		};

		const interestid = this.args[0];
		const entry = db[interestid];

		var content = `
		<<achievement-unlock ${entry.ach}>>

		<div id="locationOptions">
			<p class="scene-nav interact">
				<<link "${entry.linkShort}">>
					<<story-session-header ${entry.img} "${entry.labelShort}">>
					<<stat player.${entry.stat} 1>>
					<<remove "#locationOptions">>
				<</link>>
			</p>
			<p class="scene-nav interact">
				<<link "${entry.linkLong}">>
					<<set _randomEncounter = random(1,1000)>>
					<<if _randomEncounter > 800>>
						<set _tmp = $downtown.${interestid}.random()>>
						<<story-session-header _tmp[0] _tmp[1] _tmp[2]>>
					<<else>>
						<<story-session-header ${entry.img} "${entry.labelShort}">>
					<<endif>>
					<<stat player.${entry.stat} 3>>
					<<remove "#locationOptions">>
				<</link>>
			</p>
			<!-- REPLACEME -->
		</div>
		<p class="scene-nav">[[Head home|scene-home-bed-evening]]</p>`;

		if(interestid === 'gym') {
			content = content.replace('<!-- REPLACEME -->',
				`<<if $npc.sarah.stat.story == 2
					&& $npc.sarah.stat.attraction >= 30
					&& $npc.player.stat.stamina >= 30>>
					You spot your boss Sarah working out in a corner of the gym.
					<p class="scene-nav">
						[[Go and talk to her|scene-story][$scratch.tmp_story_npcid = 'sarah']]
					</p>
				<</if>>`);
		}

		$(document.createDocumentFragment())
			.wiki(`<<nobr>>${content}<</nobr>>`)
			.appendTo(this.output);

	}
});
