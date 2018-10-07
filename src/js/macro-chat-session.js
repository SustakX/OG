Macro.add('npc-chat', {
	// tags    : null,
	handler : function() {

		/* ****************************************************************** */
		/* Helper
		/* ****************************************************************** */

		const _log = window.log.getLogger("npc-chat");

		/* eslint-disable no-useless-escape */
		const compiled = _.template(
		"<p class='txt-status'><%= status %></p> \
		<p class='txt-link'> \
			<script>$('.header img').attr('src', '<%= img %>');<\/script> \
			<<script>> <%= effects %> <<\/script>> \
			<<linkreplace '<%= link %>'>><%= next %><</linkreplace>> \
		</p>");
		/* eslint-enable no-useless-escape */

		function replaceCompiled(npcid, talk, state, nextReplaceBy = '<%= next %>', doReplace = true) {
			var ret = '';
			var effects = '';

			_.each(talk.effect[state], function(effect) {
				effects += `variables().npc.${effect};`.replace('%other', npcid);
			},this);

			var obj = {
				status:talk[npcid][state].txt,
				link:talk[npcid][state].link,
				img:talk[npcid][state].img,
				next:nextReplaceBy.trim(),
				effects:effects
			};

			if(doReplace) {
				ret = content.replace('<%= next %>', compiled(obj));
			} else {
				ret = compiled(obj);
			}
			return ret;
		}

		/* ****************************************************************** */
		/* Prepare
		/* ****************************************************************** */

		if(this.args.length < 2) {
			throw new Error('Missing NPCID-argument and/or EXIT-passageid.');
		}
		const npcid = this.args[0];
		const passid = this.args[1];

		if(variables().npc[npcid] === undefined) {
			throw new Error('Unknown NPCID:'+npcid);
		}
		var content = '';
		// const npc = variables().npc[npcid];
		const player = variables().npc.player;
		const talk = variables().talk;

		var num = Math.max(player.stat.communication - 20,0);
		num = Math.min(Math.round(num / 20),5) + random(1,6);

		content = replaceCompiled(npcid, talk, 'start', '<%= next %>', false);

		/* ****************************************************************** */
		/* Chat flow
		/* ****************************************************************** */

		if (player.stat.horniness-player.stat.concentration > 80) {
			_log.trace('cleavage 1');
			content = replaceCompiled(npcid, talk, 'cleavage', '');
		} else if(num >=2) {
			_log.trace('>= 2');
			content = replaceCompiled(npcid, talk, 'business');
			if(player.horniness - player.concentration > 60) {
				_log.trace('cleavage 2');
				content = replaceCompiled(npcid, talk, 'cleavage', '');
			} else if(num >= 4) {
				_log.trace('>= 4');
				content = replaceCompiled(npcid, talk, 'chat');
				if(player.horniness - player.concentration > 40) {
					_log.trace('cleavage 3');
					content = replaceCompiled(npcid, talk, 'cleavage', '');
				} else if(num >= 6) {
					_log.trace('>= 6');
					content = replaceCompiled(npcid, talk, 'flirt', '');
				} else {
					_log.trace('bored 1');
					content = replaceCompiled(npcid, talk, 'boredlong', '');
				}
			} else {
				_log.trace('bored 2');
				content = replaceCompiled(npcid, talk, 'boredshort', '');
			}
		} else {
			_log.trace('no chat today');
			content = replaceCompiled(npcid, talk, 'nochattoday', '');
		}

		content +=
			`<p class="scene-nav"><<link "Return to your desk" "${passid}">><</link>></p>`;

		/* ****************************************************************** */
		/* Output
		/* ****************************************************************** */

		$(`<div class="npc-chat">`)
			.wiki(`<<nobr>>${content}<</nobr>>`)
			.appendTo(this.output);
	}
});
