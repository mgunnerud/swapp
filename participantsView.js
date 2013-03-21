function ParticipantsView(mediator) {
	SubView.call(this, mediator);
	var me = this;
	
	me.professionSelector = new DropdownList();

	// create day dropdown options:
	me.professionSelector.addOption("DEV", "Developers");
	me.professionSelector.addOption("DES", "Designers");
	me.professionSelector.addOption("BIZ", "Business");

	me.changeProfession = function() {
		var me = this,
			selectedProfession = me.professionSelector.value;
			
		if(selectedProfession === "DEV") {
			me.textArea.innerHTML = "nerdy people";
		}
		else if(selectedProfession === "DES") {
			me.textArea.innerHTML = "hip people";
		}
		else if(selectedProfession === "BIZ") {
			me.textArea.innerHTML = "money-making people";
		}
	}
	
	me.professionSelector.addEventListener("change", function() {
		me.changeProfession();
	});
	
	me.topBar.appendChild(me.professionSelector);
};

ParticipantsView.prototype = Object.create(new SubView (), {
	
});