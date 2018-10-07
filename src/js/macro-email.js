Macro.add('email-indicator', {
	// tags    : null,
	handler : function() {

		var content = '';

		if(variables().emailAvailable.length > 0) {
			const count = variables().emailAvailable.length;
			content += `<p class="scene-nav">
				[[You have ${count} unread mails|scene-computer-email]]
			</p>`;
		}


		$(document.createDocumentFragment())
			.wiki(`<<nobr>>${content}<</nobr>>`)
			.appendTo(this.output);
	}
});

Macro.add('email-display', {
	handler : function() {

		var content = '';
		var lines = '';

		const emailid = variables().emailAvailable.shift();
		const npcid = emailid.split('.')[0];
		const npcobj = variables().npc[npcid];
		const player = variables().npc.player;
		const emailLines = eval( "State.variables.email."+ emailid);

		lines += `<div class="email">From: ${npcobj.name}</div>
			<div class="email">To: ${player.name}</div>`;

		_.each(emailLines, function(line) {
			lines += `<div class="email">${line}</div>`;
		},this);

		content += `<div class="computer-screen">
			<div class="computer-header">VisMail 6.20</div>
			 <div class="computer-wallpaper">
				 <!-- REPLACEME -->
			</div>
			<<return 'Close'>>
		</div>`;

		content = content.replace('<!-- REPLACEME -->', lines);

		$(document.createDocumentFragment())
			.wiki(`<<nobr>>${content}<</nobr>>`)
			.appendTo(this.output);
	}
});
