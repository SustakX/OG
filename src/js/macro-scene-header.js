Macro.add('scene-header', {
	// tags    : null,
	handler : function() {

		var content = '';
		var img = '';
		var desc = '';
		var clazz = this.args[0] !== undefined ? this.args[0] : '';

		if(variables().header[State.passage] !== undefined
			&& variables().header[State.passage].img !== undefined) {
			img = variables().header[State.passage].img;
			if(img.startsWith('pic/') === false) {
				img = `pic/location/${img}`;
			}
		}
		if(variables().header[State.passage] !== undefined
			&& variables().header[State.passage].txt !== undefined) {
			desc = variables().header[State.passage].txt;
		}

		content = `<<story-session-header "${img}" "${desc}" "${clazz}" true>>`;

		$(document.createDocumentFragment())
			.wiki(`<<nobr>>${content}<</nobr>>`)
			.appendTo(this.output);
	}
});


/*
Macro.add('scene-header', {
	// tags    : null,
	handler : function() {

		var content = '';
		if(variables().header[State.passage] !== undefined
			&& variables().header[State.passage].img !== undefined) {
			var img = variables().header[State.passage].img;
			if(img.startsWith('pic/') === false) {
				img = `pic/location/${img}`;
			}
			content += `<img src="${img}">`;
		}
		if(variables().header[State.passage] !== undefined
			&& variables().header[State.passage].txt !== undefined) {
			content += `
				<p class="desc">${variables().header[State.passage].txt}</p>`;
		}
		$(`<div class="header">`)
			.wiki(`<<nobr>>${content}<</nobr>>`)
			.appendTo(this.output);
	}
});
*/
