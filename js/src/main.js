window.buttons = {
			logout: "btn-logout",
			login: "signin",
			request: "btn-createRequest",
			cancelRequest: "btn-cancel",
			createRequest: "btn-create",
			screenshot: "btn-screenshot",
			gotoRequest: "btn-gotoRequest",
			quickLinks: "btn-quickLinks",
			softwareRequest: "btn-softwareRequest",
			softwareRequirement: "btn-softwareRequirement",
			softwareTestFile: "btn-softwareTestFile",
			softwareBack: "btn-softwareBack"
		};
window.ebYes = 2;
window.ebNo = 1;
window.priority = {
			immediate: "1",
			at_the_earliest: "2",
			normal: "3",
			later: "4"
		};
window.severity = {
			severe: "1",
			major: "2",
			minor: "3"
		};
window.type = {
			bug: "BG",
			enhancement: "EV",
			product_opening: "OR",
			question: "QU"
		};
window.impactLayer = {
			product: "2",
			as: "1"
		};
			
window.onload = function(){

	//$(".MST2").next().children().find(".ATL")[0].textContent
	//on https://software.enablon.com/Software/go.aspx?u=/Referent/Config
	//to get user's full name
	
	//This is used to grab Release and Product Component from Software. Needs Request #95456
	var url = new URLManagement();
	url.storeTempSoftwareData();
	
	window.myWindows = new Windows();
	window.myTransitions = new Transitions(myWindows);
	var logger = new Logger();
	logger.initialize();// check and log if needed

	var contextMenu = new ContextMenu();
	contextMenu.initInWindow();
	contextMenu.quickLinksEvents();
	$("#" + buttons.login).click(logger.getConnectToSW());
	$("#" + buttons.logout).click(logger.logoutFromSW);
	$("#" + buttons.request).click(myTransitions.createRequest);
	$("#" + buttons.cancelRequest).click(myTransitions.cancelRequest);
	$("#" + buttons.createRequest).click(myTransitions.cancelRequest);

}