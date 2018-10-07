Macro.add('sms-indicator', {
	// tags    : null,
	handler : function() {

		var clazz = 'hidden';
		if (variables().smsAvailable.length > 0){
			clazz = '';
		}
		const count = variables().smsAvailable.length;
		const content = `<<link 'You have ${count} new SMS.' 'sms-display'>><</link>>`;

		$(`<p class="scene-nav ${clazz}">`)
			.wiki(`<<nobr>>${content}<</nobr>>`)
			.appendTo(this.output);
	}
});

Macro.add('sms-add', {
	handler : function() {
		if(this.args.length !== 1) {
			throw new Error('No SMSID given!');
		}
		const smsid = this.args[0];
		variables().smsAvailable.push(smsid);
	}
});

Macro.add('sms-display', {
	// tags    : null,
	handler : function() {
		var smsArr = variables().smsAvailable;

		if(smsArr.length === 0) {
			throw new Error('No SMS to display, empty array!');
		}

		const smspick = smsArr.shift();
		const npcid = smspick.split('.')[0];
		const name = variables().npc[npcid].name;

		log.info('SMSID: ' + smspick);

		/* ****************************************************************** */
		/* Select a SMS, it is magic.
		/* ****************************************************************** */

		// CASE 1: smspick points to one and one SMS only (default assumption).
		var sms = eval(`variables().sms.${smspick}`);

		if(sms == undefined) {
			throw new Error('Could not find SMS for ID: ' + smspick);
		}

		if(smspick.includes('random')) {
			// CASE 2: smspick points to an array holding many SMS.
			sms = sms.random();
		} else {
			// CASE 3: smspick points to an sms sequence, then choose the first SMS.
			if(_.isArray(sms) && sms.length > 0 && _.isArray(sms[0])) {
				sms = sms[0];
			}
		}

		/* ****************************************************************** */
		/* Extract info: [ [TEXT]1 [TEXT-ANSWERS]0/X [IMAGE-PATH]0/1 ]
		/* ****************************************************************** */

		const txt = sms[0];
		var img = '';
		var answers = ["<div class='close'><<return 'Close'>></div>"];

		if(sms[sms.length-1].trim().startsWith('pic/')) {
			img = sms[sms.length-1].trim();
			var arr = sms.slice(1,sms.length-1);
			if(arr.length > 0) {
				answers = arr;
			}
		} else if(sms.length > 1) {
			answers = sms.slice(1);
		}

		/* ****************************************************************** */
		/* Output
		/* ****************************************************************** */

		var tmp = '';
		_.each(answers, function(answer) {
			if(answer.startsWith('<') === false && answer.startsWith('[[') === false) {
				answer = `[[${answer}|sms-display][$smsAvailable.push('riley.sexts1[5]')]]`;
			}
			tmp += `<div class="phone-answer">${answer}</div>`;
		},this);

		var content = `
			<div class="phone-screen">
				<div class="phone-header">${name}</div>
				<div class="phone-head"><img src="pic/npc/chatheads/${npcid}.png"></div>
				<div class="phone-message">${txt}</div>
				<!-- REPLACEME -->
			</div>`.replace('<!-- REPLACEME -->',tmp);

		if(img.length > 0) {
			content += `
				<div class="phone-screen">
					<div class="phone-header">${name}</div>
					<div class="phone-pic">
						<img src="${img}">
					</div>
				</div>`;
		}

		$(document.createDocumentFragment())
			.wiki(`<<nobr>>${content}<</nobr>>`)
			.appendTo(this.output);
	}
});
