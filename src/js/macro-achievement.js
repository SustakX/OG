Macro.add('achievement-unlock', {
	// tags    : null,
	handler : function() {
		const vars = State.variables;
		var content = '';

		if(this.args.length !== 1) {
			throw new Error('No ACHIEVEMENT-ID given.');
		}

		const achid = this.args[0];
		const ach = vars.achs[achid]

		if(ach.achieved === false) {
			ach.achieved = true;
			content +=
			`<div class="achievement-screen">
				<div class="achievement-left"></div><br>
				<div class="achievement-right">${ach.value} - ${ach.name}<br><br>${ach.txt}</div>
			</div>
			<<audio "ach" volume 0.25 play>>`;
		}

		$(document.createDocumentFragment())
			.wiki(`<<nobr>>${content}<</nobr>>`)
			.appendTo(this.output);
	}
});

Macro.add('achievement-completed', {
	// tags    : null,
	handler : function() {

		var content = '';
		var achievedAll = true;

		_.each(variables().achs, function(ach) {
			achievedAll = achievedAll && ach.achieved;
		});

		if(achievedAll) {
			content +=
				`<div style="background-color:red;color:white">
					You have completed all the content currently in the game.<br>
					You can continue to play but no further story is available at present.<br>
					Thank you for playing. Check the forums for new releases!<br>
				</div>
				<<audio "ach" volume 0.25 play>>`;
		}

		$(document.createDocumentFragment())
			.wiki(`<<nobr>>${content}<</nobr>>`)
			.appendTo(this.output);
	}
});

Macro.add('achievement-completed-count', {
	// tags    : null,
	handler : function() {

		var content = '';
		var achieved = 0;

		_.each(variables().achs, function(ach) {
			achieved += ach.achieved ? 1 : 0;
		});

		content = achieved;

		$(document.createDocumentFragment())
			.wiki(`<<nobr>>${content}<</nobr>>`)
			.appendTo(this.output);
	}
});

Macro.add('achievement-completed-score', {
	// tags    : null,
	handler : function() {

		var content = '';
		var achievedScore = 0;

		_.each(variables().achs, function(ach) {
			achievedScore += ach.achieved ? ach.value : 0;
		});

		content = achievedScore;

		$(document.createDocumentFragment())
			.wiki(`<<nobr>>${content}<</nobr>>`)
			.appendTo(this.output);
	}
});
