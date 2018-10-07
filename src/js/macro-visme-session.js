Macro.add('visme-session', {
	// tags    : null,
	handler : function() {
		const vars = State.variables;
		var content = '';

		/* ****************************************************************** */
		/* Preparation
		/* ****************************************************************** */

		if(this.args.length !== 1) {
			throw new Error('No NPCID given.');
		}

		const compiled = _.template('<div class="computer-screen"> \
			<div class="computer-header">VisMe</div> \
			<div class="computer-wallpaper"> \
				<img src="<%= img %>"> \
			</div> \
		</div> \
		<p class="desc"><%= desc %></p>');

		const player = vars.npc['player'];
		const npcid = this.args[0];
		const npc = vars.npc[npcid];
		var state;

		/* ****************************************************************** */
		/* Wallpaper and description
		/* ****************************************************************** */

		if (npc.stat.anger > npc.stat.attraction) {
			state = 'angry';
		} else if (npc.stat.anger*2 < npc.stat.attraction
			&& npc.stat.horniness >= 25
			&& npc.stat.horniness < 50) {
			state = 'horny1';
		} else if (npc.stat.anger*2 < npc.stat.attraction
			&& npc.stat.horniness >= 25
			&& npc.stat.horniness < 75) {
			state = 'horny2';
		} else if (npc.stat.anger*2 < npc.stat.attraction
			&& npc.stat.horniness >= 75) {
			state = 'horny3';
		} else {
			state = 'happy';
		}

		var obj = {
			desc: vars.visme[npcid][state].txt,
			img: vars.visme[npcid][state].img
		};

		content = compiled(obj);

		/* ****************************************************************** */
		/* Conversation options
		/* ****************************************************************** */

		obj = {
			chat_disabled:'',
			chat_txt:'',
			calm_disabled:'',
			calm_txt:'',
			flirt_disabled:'',
			flirt_txt:'',
			dirty_disabled:'',
			dirty_txt:'',
		};

		if (player.stat.communicationLeft < 5) {
			content += "The evening has flown by, maybe if you were better at communication you could accomplish more in the same amount time.";
		} else {
			if (player.stat.horniness-player.stat.concentration >= 50) {
				obj.chat_disabled = 'disabled';
				obj.chat_txt = '(Too horny to think straight!)';
			}
			if (npc.stat.anger <= 0
				|| (player.stat.horniness - player.stat.concentration >= 80)) {
				obj.calm_disabled = 'disabled';
				obj.calm_txt = "(Riley doesn't seem the least upset, or you are too horny to care!)";
			}
			if (player.stat.horniness <= 25) {
				obj.flirt_disabled = 'disabled';
				obj.flirt_txt = "(Not horny enough)";
			}
			if (player.stat.horniness <= 60) {
				obj.dirty_disabled = 'disabled';
				obj.dirty_txt = "(Not horny enough)";
			}
			content +=
				`<p class="scene-nav interact ${obj.chat_disabled}">
					<<link "Chat ${obj.chat_txt}" scene-computer-visme-session-reaction>>
						<<set $scratch.tmp_npcid to '${npcid}'>>
						<<set $scratch.tmp_stateid to 'chat'>>
					<</link>></p>
				<p class="scene-nav interact ${obj.calm_disabled}">
					<<link "Calm ${obj.calm_txt}" scene-computer-visme-session-reaction>>
						<<set $scratch.tmp_npcid to '${npcid}'>>
						<<set $scratch.tmp_stateid to 'calm'>>
					<</link>></p>
				<p class="scene-nav interact ${obj.flirt_disabled}">
					<<link "Flirt ${obj.flirt_txt}" scene-computer-visme-session-reaction>>
						<<set $scratch.tmp_npcid to '${npcid}'>>
						<<set $scratch.tmp_stateid to 'flirt'>>
					<</link>></p>
				<p class="scene-nav interact ${obj.dirty_disabled}">
					<<link "Talk Dirty ${obj.dirty_txt}" scene-computer-visme-session-reaction>>
						<<set $scratch.tmp_npcid to '${npcid}'>>
						<<set $scratch.tmp_stateid to 'dirty'>>
					<</link>></p>`;
		}

		/* ****************************************************************** */
		/* Output
		/* ****************************************************************** */

		content += `<p class="scene-nav">[[Say goodnight and close down VisMe.|scene-computer-visme]]</p>`;

		$(document.createDocumentFragment())
			.wiki(`<<nobr>>${content}<</nobr>>`)
			.appendTo(this.output);
	}
});

Macro.add('visme-session-header', {
	// tags    : null,
	handler : function() {

		if(this.args.length < 1) {
			throw new Error('No IMG-SRC (and DESCRIPTION-TEXT) given.');
		}

		if($('.computer-screen-outer').length === 0) {
			var content = `<div class="computer-screen-outer">
				<div class="computer-screen">
					<div class="computer-header">VisMe</div>
					<div class="computer-wallpaper">
						<img src="${this.args[0]}">
					</div>
				</div>
				<!-- -->
			</div>`

			if(this.args[1] !== undefined) {
				content = content.replace('<!-- -->', `<p class="desc">${this.args[1]}</p>`);
			}

			$(document.createDocumentFragment())
				.wiki(`<<nobr>>${content}<</nobr>>`)
				.appendTo(this.output);
		} else {

			$(".computer-screen-outer img").attr("src",this.args[0]);
			if(this.args[1] !== undefined && $(".computer-screen-outer .desc").length > 0) {
				$(".computer-screen-outer .desc").text(this.args[1])
			}
		}
	}
});

Macro.add('visme-session-reaction', {
	// tags    : null,
	handler : function() {

		/* ****************************************************************** */
		/* Preparation
		/* ****************************************************************** */

		const vars = State.variables;
		var content = '';
		var contentStory = '';

		if(this.args.length !== 2) {
			throw new Error('No NPCID and/or STATEID given.');
		}

		const compiled = _.template('<div class="computer-screen"> \
			<div class="computer-header">VisMe</div> \
			<div class="computer-wallpaper"> \
				<img src="<%= img %>"> \
			</div> \
		</div> \
		<p class="desc"><%= desc %></p>');

		const player = vars.npc['player'];
		const sarah = vars.npc['sarah'];
		const jenny = vars.npc['jenny'];
		const stella = vars.npc['stella'];
		const npcid = this.args[0];
		const npc = vars.npc[npcid];
		const stateid = this.args[1];

		/* ****************************************************************** */
		/* Reaction
		/* ****************************************************************** */

		var subselect = '';

		switch(stateid) {
			case 'calm':
				subselect = 'true';
				if (npc.stat.anger >= 100) {
					subselect = 'false';
				}
				break;
			case 'flirt':
				if (npc.stat.horniness >= 25) {
					if ((npc.stat.anger * 2) < npc.stat.horniness) {
						subselect = 'flirty'+random(1,3);
					}else if (npc.stat.anger < npc.stat.horniness) {
						subselect = 'happy';
					}else{
						subselect = 'angry1';
					}
				}else{
					subselect = 'angry2';
				}
				break;
			case 'dirty':
				if (npc.stat.horniness >= 50) {
					if ((npc.stat.anger * 3)  < npc.stat.horniness)
						subselect = 'dirty'+random(1,3);
					else if ((npc.stat.anger * 2) < npc.stat.horniness) {
						subselect = 'horny';
					}else if (npc.stat.anger >= 90) {
						subselect = 'angry1';
					}
				}else{
					subselect = 'angry2';
				}
				break;
			case 'chat':
				if (npc.stat.anger <= npc.stat.attraction) {
					// npc.stat.attraction += 2;
					// npc.stat.anger -= 1;
					// npc.stat.horniness += 1;
					// npc.stat.headache -= 1;
					// player.stat.horniness = 1;
					npc.attractionAdjust(2);
					npc.angerAdjust(-1);
					npc.horninessAdjust(1);
					npc.headacheAdjust(-1);
					player.horninessAdjust(1);

					if (npc.stat.story == 0) {
						contentStory = `<<story-session ${npcid} ${npc.stat.story}>>`;
					} else if (npc.stat.story == 1 && npc.stat.attraction > 25) {
						contentStory = `<<story-session ${npcid} ${npc.stat.story}>>`;
					} else if (npc.stat.sexts == 1) {
						var tmp = 1.5;
						contentStory = `<<story-session ${npcid} ${tmp}>>`;
					} else if (npc.stat.story == 2 && npc.stat.attraction > 100) {
						contentStory = `<<story-session ${npcid} ${npc.stat.story}>>`;
					} else if (npc.stat.story == 3 && npc.stat.attraction > 150) {
						contentStory = `<<story-session ${npcid} ${npc.stat.story}>>`;
					} else if (npc.stat.story == 4 && stella.stat.story >= 9
						&& npc.stat.attraction > 200) {
						contentStory = `<<story-session ${npcid} ${npc.stat.story}>>`;
					} else if (npc.stat.story == 5) {
						contentStory = `<<story-session ${npcid} ${npc.stat.story}>>`;
					} else if (npc.stat.story == 6) {
						contentStory = `<<story-session ${npcid} ${npc.stat.story}>>`;
					} else if (npc.stat.story == 7 && npc.stat.attraction >= 300) {
						contentStory = `<<story-session ${npcid} ${npc.stat.story}>>`;
					} else if (npc.stat.story == 8 && jenny.stat.story == 8) {
						contentStory = `<<story-session ${npcid} ${npc.stat.story}>>`;
					} else if (npc.stat.story == 9 && sarah.stat.story >= 7) {
						contentStory = `<<story-session ${npcid} ${npc.stat.story}>>`;
					} else{
						subselect = 'happy'+random(1,2);
					}

				} else if (npc.stat.anger < (npc.stat.attraction * 2)) {
					subselect = 'angry1';
				}else{
					subselect = 'angry2';
				}
				player.stat.communicationLeft -= 5;
				break;
			default:
				throw new Error('Unknown stateid:' + stateid);
		}

		if(_.isEmpty(subselect) === false) {
			var key = `reaction_${stateid}_${subselect}`;
			var res = vars.visme[npcid][key];
			var obj = {
				desc: res.txt,
				img: res.img
			};
			content = compiled(obj);

			/* ************************************************************** */
			/* Effects
			/* ************************************************************** */

			_.each(res.effect, function(effect) {
				eval ('vars.npc.'+effect);
			},this);
		}

		content += contentStory;

		/* ****************************************************************** */
		/* Output
		/* ****************************************************************** */

		content += `<p class="scene-nav"><<link Return scene-computer-visme-session>><</link>></p>`;

		$(document.createDocumentFragment())
			.wiki(`<<nobr>>${content}<</nobr>>`)
			.appendTo(this.output);
		}
	});
