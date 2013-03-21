function Mediator() {
	var me = this;
	
	me.channels = {};
		
	me.subscribe = function(channel, func) {
		if(!this.channels[channel]) {
			this.channels[channel] = [];
		}
		this.channels[channel].push(func)
	}
	
	me.publish = function(channel) {
		for(var i = 0; i< this.channels[channel].length; ++i) {
			this.channels[channel][i]();
		}
	}
};

function DropdownList() {
	var dropdownList = document.createElement('select');
	dropdownList.addOption = function(optionValue, optionText) {
		var op = document.createElement("option");
		op.value = optionValue;
		op.text = optionText;
		dropdownList.options.add(op);
	};
	return dropdownList;
};

function Button(buttonText, buttonClickFn) {
	var button = document.createElement('button');
	button.innerHTML = buttonText;
	button.onclick = buttonClickFn;
	return button;
};

function MenuButton(buttonText, buttonClickFn) {
	var menuButton = Button.call(this, buttonText, buttonClickFn);
	menuButton.classList.add('menubutton');
	return menuButton;
};
MenuButton.prototype = Object.create(new Button(), {} );

function SubView(mediator) {
	var me = this;
	me.view = document.createElement('div');
	me.topBar = document.createElement('div');
	me.topBar.appendChild(new Button('Back', function() {
		mediator.publish('backToMainView');
	}));
	me.topBar.classList.add('topbar');
	
	me.view.appendChild(me.topBar);
	me.textArea = document.createElement('div');
	me.textArea.classList.add('screen');
	me.textArea.innerHTML = 'testtest<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2<br>testtest2';
	me.view.appendChild(me.textArea);
};
SubView.prototype = {
	view: undefined,
	textArea: undefined
};

window.onload = function () {
	var mediator = new Mediator(),
		scheduleView = new ScheduleView(mediator),
		newsView = new SubView(mediator),
		participantsView = new ParticipantsView(mediator),
		mainView = document.createElement('div'),
		viewport = document.getElementsByClassName('mainview')[0];
	
	mediator.subscribe('backToMainView', function () {
		viewport.removeChild(mainView.currentSubView);
		viewport.appendChild(mainView);
	});
		
	var logo = document.createElement('div');
	logo.classList.add('banner');
	mainView.appendChild(logo);
	
	mainView.appendChild(new MenuButton('Schedule', function() {
		mainView.currentSubView = scheduleView.view;
		viewport.removeChild(mainView);
		viewport.appendChild(scheduleView.view);
	}));
	
	mainView.appendChild(new MenuButton('News', function() {
		mainView.currentSubView = newsView.view;
		viewport.removeChild(mainView);
		viewport.appendChild(newsView.view);
	}));
	
	mainView.appendChild(new MenuButton('Participants', function() {
		mainView.currentSubView = participantsView.view;
		viewport.removeChild(mainView);
		viewport.appendChild(participantsView.view);
	}));

	viewport.appendChild(mainView);
}