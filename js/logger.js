var Logger=function(o){var o=o||{};this.pingUrl="https://software.enablon.com/Software/?u=ver&pm=6&aformat=1",this.swUrl="https://software.enablon.com/enablon/?OStId=Software",this.Crypt=o.Crypt||new LazyCrypt};Logger.prototype.getConnectToSW=function(){var o=this;return function(){myTransitions.checkLogin();var n=$("input[id='inputUsername']").val(),e=$("input[id='inputPassword']").val();n&&e?(o.connectToSW(n,e),$("input[name='rememberPWD']").is(":checked")&&o.saveSWCred(n,e)):console.log("Login and Password must contain a value")}},Logger.prototype.logoutFromSW=function(){$.post("https://software.enablon.com/Software/?u=logoff"),myTransitions.logOut()},Logger.prototype.saveSWCred=function(o,n){o&&n?(localStorage.swLogin=o,this.Crypt.encrypt({pass:n})):(localStorage.removeItem("swLogin"),this.Crypt.clearStorage())},Logger.prototype.loginToSW=function(){myTransitions.checkLogin();var o=this.getSWCred(),n=o[0],e=o[1];null!=n&&null!=e?this.connectToSW(n,e):"main"==localStorage.getItem("currentWindow")&&myTransitions.loggedOut()},Logger.prototype.getSWCred=function(){var o=localStorage.swLogin,n=this.Crypt.decrypt();return[o,n]},Logger.prototype.connectToSW=function(o,n){var e=this;console.log("connectToSW");var t={uid:o,sid:"enablon",Var_BuilderKeyAutoLogin:"",pwd:n,LogIn:"OK",LogIn:"Log In"};$.ajax({type:"POST",url:e.swUrl,data:t,async:!0,timeout:6e3,success:function(o){nConnected=o.indexOf("<TITLE>Dashboards</TITLE>"),nConnected>0?myTransitions.loginSuccess():"main"==localStorage.getItem("currentWindow")?myTransitions.loggedOut():$("#btn-create").prop("disabled",!0)},error:function(){"main"==localStorage.getItem("currentWindow")&&myTransitions.loggedOut()}})},Logger.prototype.initialize=function(){console.log("initialize");var o=this,n=this.getSWCred(),e=n[0],t=n[1];if(null==e||null==t){console.log("before");var r=this.checkSWConnection();"main"==localStorage.getItem("currentWindow")?r.then(function(o){console.log("after "+this.pingUrl);var n=o.indexOf("error");console.log("nError: "+n),-1==n?myTransitions.loggedIn():myTransitions.loggedOut()}):r.then(function(o){var n=o.indexOf("error");n>0?(console.log("else"),myTransitions.loggedOut()):(myTransitions.loggedIn(),console.log("you are connected"))},function(){myTransitions.loggedOut(),console.log("l 149")})}else{var r=this.checkSWConnection();r.then(function(n,e){console.log("done done done:)"+n+"_"+e),$(".waitingForSW").hide();var t=n.indexOf("error");t>0?(console.log("not connected so let's try"),o.loginToSW()):(myTransitions.loggedIn(),console.log("we are logged and return should  be true"))},function(o,n,e){console.log("Error occured in checkSWConnection: "+n+"_"+e),myTransitions.loggedOut()})}},Logger.prototype.checkSWConnection=function(){return Promise.resolve($.ajax({url:this.pingUrl,type:"GET",timeout:5e3,cache:!1}))};