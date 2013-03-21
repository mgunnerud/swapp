function ScheduleView(mediator) {
	SubView.call(this, mediator);
	var me = this;
	
	me.textArea.innerHTML = 'override';
	me.daySelector = new DropdownList();

	// create day dropdown options:
	me.daySelector.addOption("FRIDAY", "Friday");
	me.daySelector.addOption("SATURDAY", "Saturday");
	me.daySelector.addOption("SUNDAY", "Sunday");

	me.changeDay = function() {
		var me = this,
			selectedDay = me.daySelector.value;
			
		if(selectedDay === "FRIDAY") {
			me.textArea.innerHTML = "the first day";	
		}
		else if(selectedDay === "SATURDAY") {
			me.textArea.innerHTML = "the second day, lots of work";	
		}
		else if(selectedDay === "SUNDAY") {
			me.textArea.innerHTML = "prensentations day!";	
		}
	}
	
	me.daySelector.addEventListener("change", function() {
		me.changeDay();
	});
	
	me.topBar.appendChild(me.daySelector);
};
ScheduleView.prototype = Object.create(new SubView (), {
	
});