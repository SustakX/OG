Macro.add('story-session', {
	// tags    : null,
	handler : function() {
		var content = '';

		/* ****************************************************************** */
		/* Preparation
		/* ****************************************************************** */

		if(this.args.length !== 2) {
			throw new Error('No NPCID and/or STORYID given.');
		}

		const _log = window.log.getLogger("story-session");
		const npcid = this.args[0];
		const storyid = this.args[1];
		const lines = Story.get(`story-${npcid}-${storyid}`).text.split("\n");

		_log.info('story:',npcid, storyid);

		_.each(lines, function(line) {
			line = line.trim();
			if(_.isEmpty(line)) {
				return true;
			}
			var words = line.split(/\s+/);
			var command = words.shift();

			if(command.startsWith('<') || command.startsWith('[')) {
				command = 'cmd';
				words = line.split(/\s+/);
			}

			if(command.startsWith('/')) {
				command = 'comment';
				words = line.split(/\s+/);
			}

			var clazz = '';

			switch(command) {
				case 'comment':
					_log.debug('story: found comment: ' + words.join(' '));
					break;
				case 'player':
					clazz = 'conv-player';
					content += `<p class="${clazz}">${words.join(' ')}</p>`;
					break;
				case 'other':
					clazz = 'conv-other';
					content += `<p class="${clazz}">${words.join(' ')}</p>`;
					break;
				case 'default':
					clazz = 'conv-default';
					content += `<p class="${clazz}">${words.join(' ')}</p>`;
					break;
				case 'cmd':
					_log.debug('story: found command: ' + words.join(' '));
					content += words.join(' ');
					break;
				default:
					throw new Error('Unknown parser command:'+command);
			}
		},this);

		/* ****************************************************************** */
		/* Output
		/* ****************************************************************** */

		$(document.createDocumentFragment())
			.wiki(`<<nobr>>${content}<</nobr>>`)
			.appendTo(this.output);
	}
});

Macro.add('story-session-header', {
	// tags    : null,
	handler : function() {

		if(this.args.length < 1) {
			throw new Error('No IMG-SRC and/or DESCRIPTION given.');
		}

		const clazz = this.args.length === 3 ? this.args[2] : '';
		const inject = this.args.length === 4 ? this.args[3] : false;
		var content = '';

// console.log('xxxx',inject);
		if(this.args[1] !== undefined && this.args[1].trim().length !== 0) {
			content = `
				<div class="header ${clazz}">
					<img src="${this.args[0]}">
					<p class="desc">${this.args[1]}</p>
				</div>`;
		} else {
			content = `
				<div class="header ${clazz}">
					<img src="${this.args[0]}">
				</div>`;
		}

		// console.log('before',$('#passages .passage .header'));

		if($('#passages .passage .header').length === 0 || inject === true) {
			// console.log('insert');
			$(document.createDocumentFragment())
				.wiki(`<<nobr>>${content}<</nobr>>`)
				.appendTo(this.output);
		} else {
			// console.log('inject', content);
			$('#passages .passage .header')
				.replaceWith(
					$(document.createDocumentFragment())
						.wiki(`<<nobr>>${content}<</nobr>>`)
			);
			// console.log('inject2', $('#passages .passage .header'));
		}
	}
});

Macro.add('story-session-router', {
	// tags    : null,
	handler : function() {

		var content = '';
		var npcid = this.args[0];

		var npc = variables().npc[npcid];
		var stella = variables().npc['stella'];
		var jenny = variables().npc['jenny'];
		var sarah= variables().npc['sarah'];

		var storyid = npc.stat.story;

		const _log = window.log.getLogger("story-session");
		_log.info('story:',`story-${npcid}-${storyid}`);

		switch (npcid) {
			case 'riley':
				if (storyid == 0) {
					content = `<<story-session ${npcid} ${storyid}>>`;
				} else if (storyid == 1 && npc.stat.attraction > 25) {
					content = `<<story-session ${npcid} ${storyid}>>`;
				} else if (npc.stat.sexts == 1) {
					var tmp = 1.5;
					content = `<<story-session ${npcid} ${tmp}>>`;
				} else if (storyid == 2 && npc.stat.attraction > 100) {
					content = `<<story-session ${npcid} ${storyid}>>`;
				} else if (storyid == 3 && npc.stat.attraction > 150) {
					content = `<<story-session ${npcid} ${storyid}>>`;
				} else if (storyid == 4 && stella.stat.story >= 9
					&& npc.stat.attraction > 200) {
					content = `<<story-session ${npcid} ${storyid}>>`;
				} else if (storyid == 5) {
					content = `<<story-session ${npcid} ${storyid}>>`;
				} else if (storyid == 6) {
					content = `<<story-session ${npcid} ${storyid}>>`;
				} else if (storyid == 7 && npc.stat.attraction >= 300) {
					content = `<<story-session ${npcid} ${storyid}>>`;
				} else if (storyid == 8 && jenny.stat.story == 8) {
					content = `<<story-session ${npcid} ${storyid}>>`;
				} else if (storyid == 9 && sarah.stat.story >= 7) {
					content = `<<story-session ${npcid} ${storyid}>>`;
				} else {
					throw new Error(`Unknown storyid: ${npcid}: ${storyid}`);
				}
				break;
			case 'stella':
			case 'sarah':
			case 'jenny':
				if(Story.has(`story-${npcid}-${storyid}`)) {
					content = `<<story-session ${npcid} ${storyid}>>`;
				} else {
					throw new Error(`Unknown storyid: ${npcid}: ${storyid}`);
				}
				break;
			default:{
				throw new Error(`Unknown npcid: ${npcid}`);
			}
		}
		$(document.createDocumentFragment())
			.wiki(`<<nobr>>${content}<</nobr>>`)
			.appendTo(this.output);
	}
});
