const npc = {
	player:{
		name:'Bob',
		stat: {
			name: 'Bob',
			horniness: 20,
			communication: 5,
			communicationLeft: 5,
			stamina: 2,
			staminaLeft: 2,
			concentration: 2,
			kink: '',
			attraction:0 /* unused right now */
		}
	},
	sarah:{
		name: "Sarah",
		stat:{
			encounter: 0,
			chat: false, /*has done 3-step-talk today */
			story: 0,
			seen: false,
			chance: 0,
			attraction: 0,
			horniness:0,  /* GROBI unused right now */
			day:0, /* GROBI $sarahDays */
			vacation:0
		}
	},
	stella:{
		name: "Stella",
		stat:{
			encounters: 0,
			chat: false,
			story: 8,
			seen: false,
			chance: 0,
			attraction: 0,
			horniness:0,  /* GROBI unused right now */
			day:0 /* GROBI $stellaDays */
		}
	},
	jenny: {
		name: "Jenny",
		stat: {
			encounters: 0,
			chat: false,
			story: 0,
			seen: false,
			chance: 0,
			attraction: 0,
			horniness:0,  /* GROBI unused right now */
			day:0 /* GROBI $jennyDays */
		}
	},
	riley: {
		name : "Riley",
		greeting: "Dude",
		stat:{
			horniness: 10,
			attraction: 10, /*GROBI aka openness? */
			story: 0,

			day : 7,
			anger : 0,
			flowerDay: 0,
			flowerSent: false,
			flowerType: "",
			h1: 0,
			h2: 0,
			h3: 0,
			h4: 0,
			headache: 0,
			lastcontact: 1,
			worktrip: false,
			worktripnotify: false,
			workTripReturn: 0,
			sexts: 0
		}
	}
};

window.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ************************************************************************** */
/* All npc
/* ************************************************************************** */

_.each(npc, function(npcobj, npcid) {
	npcobj.id = npcid;
	npc[npcid]._statchange = function(val, limitObj, statid) {
		limitObj = limitObj === undefined ? {max:-1, min:0} : limitObj;
		this.stat[statid] += val;
		this.stat[statid] = Math.max(this.stat[statid], limitObj.min);
		if(limitObj.max !== -1) {
			this.stat[statid] = Math.max(this.stat[statid], limitObj.max);
		}
		var _log = window.log.getLogger("npc");
		_log.info(this.id, statid, `(${val}=)`, this.stat[statid], limitObj);
	}
	npc[npcid].concentration = function(val, limitObj) {
		this._statchange(val, limitObj, 'concentration');
	}
	npc[npcid].stamina = function(val, limitObj) {
		this._statchange(val, limitObj, 'stamina');
	}
	npc[npcid].communication = function(val, limitObj) {
		this._statchange(val, limitObj, 'communication');
	}
	npc[npcid].horniness = function(val, limitObj) {
		this._statchange(val, limitObj, 'horniness');
	}
	npc[npcid].attraction = function(val, limitObj) {
		this._statchange(val, limitObj, 'attraction');
	}
});

/* ************************************************************************** */
/* Player
/* ************************************************************************** */

npc.player._adjustPlayerEasy = function(baseChange, multiplier, limitObj, statid) {
	limitObj = limitObj === undefined ? {max:-1, min:0} : limitObj;
	if (baseChange < 250) {
		this.stat[statid] += 1 * multiplier;
	} else if (baseChange < 600) {
		this.stat[statid] += 2 * multiplier;
	} else if (baseChange < 850) {
		this.stat[statid] += 3 * multiplier;
	} else {
		this.stat[statid] += 5 * multiplier;
	}
	this.stat[statid] = Math.max(this.stat[statid], limitObj.min);
	if(limitObj.max !== -1) {
		this.stat[statid] = Math.max(this.stat[statid], limitObj.max);
	}
	var _log = window.log.getLogger("database");
	_log.info(this.id, statid, `(${multiplier}=)`, this.stat[statid], limitObj);
}
npc.player._adjustPlayerHard = function(baseChange, multiplier, limitObj, statid) {
	limitObj = limitObj === undefined ? {max:-1, min:0} : limitObj;
	if (baseChange < 500) {
		this.stat[statid] += 1 * multiplier;
	} else if (baseChange < 900) {
		this.stat[statid] += 2 * multiplier;
	} else if (baseChange < 950) {
		this.stat[statid] += 3 * multiplier;
	} else {
		this.stat[statid] += 5 * multiplier;
	}
	this.stat[statid] = Math.max(this.stat[statid], limitObj.min);
	if(limitObj.max !== -1) {
		this.stat[statid] = Math.max(this.stat[statid], limitObj.max);
	}
	var _log = window.log.getLogger("database");
	_log.info(this.id, statid, `(${multiplier}=)`, this.stat[statid], limitObj);
}
npc.player.horninessAdjust = function(multiplier, limitObj) {
	var baseChange = window.getRandomInt (1, 1000);
	baseChange += this.stat.horniness * multiplier;
	limitObj = limitObj === undefined ? {max:-1, min:2} : limitObj;
	this._adjustPlayerHard(baseChange, multiplier, limitObj, 'horniness');
}
npc.player.staminaAdjust = function(multiplier, limitObj) {
	var baseChange = window.getRandomInt (1, 1000);
	if(baseChange < 250) {
		baseChange += this.stat.concentration * multiplier;
	} else {
		baseChange += this.stat.concentration * multiplier;
	}
	limitObj = limitObj === undefined ? {max:-1, min:2} : limitObj;
	this._adjustPlayerEasy(baseChange, multiplier, limitObj, 'stamina');
}
npc.player.communicationAdjust = function(multiplier, limitObj) {
	var baseChange = window.getRandomInt (1, 1000);
	if(baseChange < 250) {
		baseChange -= this.stat.horniness * multiplier;
	} else {
		baseChange -= this.stat.horniness * multiplier;
	}
	limitObj = limitObj === undefined ? {max:-1, min:5} : limitObj;
	this._adjustPlayerEasy(baseChange, multiplier, limitObj, 'communication');
}
npc.player.concentrationAdjust = function(multiplier, limitObj) {
	var baseChange = window.getRandomInt (1, 1000);
	if(baseChange < 250) {
		baseChange += this.stat.stamina * multiplier;
	} else {
		baseChange += this.stat.stamina * multiplier;
	}
	limitObj = limitObj === undefined ? {max:-1, min:2} : limitObj;
	this._adjustPlayerEasy(baseChange, multiplier, limitObj, 'concentration');
}

/* ************************************************************************** */
/* Girl
/* ************************************************************************** */

npc.riley._adjustGirlHard = function(baseChange, multiplier, limitObj, statid) {
	limitObj = limitObj === undefined ? {max:-1, min:0} : limitObj;
	if (baseChange < 500) {
		this.stat[statid] += 1 * multiplier;
	} else if (baseChange < 900) {
		this.stat[statid] += 2 * multiplier;
	} else if (baseChange < 950) {
		this.stat[statid] += 3 * multiplier;
	} else {
		this.stat[statid] += 5 * multiplier;
	}
	this.stat[statid] = Math.max(this.stat[statid], limitObj.min);
	if(limitObj.max !== -1) {
		this.stat[statid] = Math.max(this.stat[statid], limitObj.max);
	}
	var _log = window.log.getLogger("database");
	_log.info(this.id, statid, `(${multiplier}=)`, this.stat[statid], limitObj);
}
npc.riley.angerAdjust = function(multiplier, limitObj) {
	var baseChange = window.getRandomInt (1, 1000);
	baseChange += this.stat.anger * multiplier;
	limitObj = limitObj === undefined ? {max:-1, min:0} : limitObj;
	this._adjustGirlHard(baseChange, multiplier, limitObj, 'anger');
}
npc.riley.horninessAdjust = function(multiplier, limitObj) {
	var baseChange = window.getRandomInt (1, 1000);
	baseChange -= this.stat.anger * multiplier;
	limitObj = limitObj === undefined ? {max:-1, min:0} : limitObj;
	this._adjustGirlHard(baseChange, multiplier, limitObj, 'horniness');
}
npc.riley.attractionAdjust = function(multiplier, limitObj) {
	var baseChange = window.getRandomInt (1, 1000);
	baseChange += this.stat.openness * multiplier;
	baseChange -= this.stat.anger * multiplier;
	limitObj = limitObj === undefined ? {max:-1, min:0} : limitObj;
	this._adjustGirlHard(baseChange, multiplier, limitObj, 'attraction');
}
npc.riley.headacheAdjust = function(multiplier, limitObj) {
	var baseChange = window.getRandomInt (1, 1000);
	limitObj = limitObj === undefined ? {max:-1, min:0} : limitObj;
	this._adjustGirlHard(baseChange, multiplier, limitObj, 'headache');
}

State.variables.npc = npc;
