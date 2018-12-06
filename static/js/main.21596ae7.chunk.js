(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{39:function(e,t,n){e.exports=n(94)},44:function(e,t,n){},48:function(e,t,n){},50:function(e,t,n){},86:function(e,t,n){},88:function(e,t,n){},90:function(e,t,n){},92:function(e,t,n){},94:function(e,t,n){"use strict";n.r(t);var i,s=n(0),a=n(33),o=n(2),r=n(6),l=n(13),c=(n(44),n(4)),m=function(){function e(){}return e.DIALOG_CLOSE_TIME_IN_MS=250,e.SKIPPED=-1,e.SPLITS_MARGIN=156,e.SPLIT_HEIGHT=34,e}();n(48);!function(e){e[e.Modal=0]="Modal",e[e.Fullscreen=1]="Fullscreen"}(i||(i={}));var p=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.lastDialogType=i.Modal,t}return o.b(t,e),t.prototype.render=function(){this.props.isOpen&&(this.lastDialogType=this.props.options.type);var e=this.lastDialogType===i.Modal?"dialog":"dialog-fullscreen",t=this.props.isOpen?"dialog-transition-active":"dialog-transition-inactive",n=this.lastDialogType===i.Modal?"dialog-header":"dialog-header dialog-header-fullscreen";return s.createElement("div",{className:t},this.props.options.type===i.Modal&&this.props.isOpen&&s.createElement("div",{className:"dialog-background"}),s.createElement("div",{className:e},s.createElement("div",{className:n},this.props.options.showCloseButton&&s.createElement("div",{className:"dialog-close",onClick:this.props.onClose},s.createElement(c.a,{icon:"times"})),this.props.options.title),s.createElement("div",{className:"dialog-content"},this.props.children),this.renderFooter()))},t.prototype.renderFooter=function(){var e,t;if(this.props.options.showConfirmButton||this.props.options.showCancelButton)return this.props.options.showCancelButton&&(e=s.createElement("span",{className:"dialog-footer-button",onClick:this.props.options.onCancel},"Cancel")),this.props.options.showConfirmButton&&(t=s.createElement("span",{className:"dialog-footer-button",onClick:this.props.options.onConfirm},"Confirm")),s.createElement("div",{className:"dialog-footer"},e,t)},t}(s.Component),u=n(16),d=(n(50),function(e){function t(t){var n=e.call(this,t)||this;n.lastId=0,n.handleSubmit=function(e){e.preventDefault(),n.props.onConfirm({category:n.state.category,game:n.state.game,segments:n.state.segments.slice()})},n.handleInputChange=function(e){var t=e.currentTarget,i=t.name,s=t.value;"game"===i?n.setState({game:s}):"category"===i&&n.setState({category:s})},n.onDragEnd=function(e){if(e.destination){var t=n.state.segments.slice(),i=t.splice(e.source.index,1)[0];t.splice(e.destination.index,0,i),n.setState({segments:t}),e.source.index===n.state.selectedIndex&&n.setState({selectedIndex:e.destination.index})}},n.onInsert=function(){n.lastId++;var e={id:"split-"+n.lastId,title:""},t=n.state.segments.slice();n.state.selectedIndex?t.splice(n.state.selectedIndex,0,e):t.push(e),n.setState({segments:t})},n.onRemove=function(){if(n.state.selectedIndex){var e=n.state.segments.slice();e.splice(n.state.selectedIndex,1),n.setState({segments:e,selectedIndex:void 0})}},n.makeDroppable=function(){for(var e=[],t=function(t){var i=n.state.segments[t].id,a="editsplits-split";n.state.selectedIndex===t&&(a+=" editsplits-split-selected"),e.push(s.createElement(u.b,{key:i,draggableId:i,index:t},function(e,r){return s.createElement("div",o.a({ref:e.innerRef},e.draggableProps,e.dragHandleProps,{className:a,onClick:function(){n.setState({selectedIndex:t})}}),s.createElement("input",{type:"text",name:i,defaultValue:n.state.segments[t].title}),s.createElement("div",{className:"editsplits-split-sort"},s.createElement(c.a,{icon:"sort"})))}))},i=0;i<n.state.segments.length;i++)t(i);return s.createElement(u.c,{droppableId:"editSplitsDroppable"},function(t,n){return s.createElement("div",{ref:t.innerRef},e,t.placeholder)})};for(var i=t.run.segments.slice(),a=0;a<i.length;a++)i[a].id="split-"+a,n.lastId=a;return n.state={category:n.props.run.category,game:n.props.run.game,segments:i},n}return o.b(t,e),t.prototype.render=function(){return s.createElement("div",null,s.createElement("form",{onSubmit:this.handleSubmit},s.createElement("div",null,s.createElement("label",null,"Game"," ",s.createElement("input",{type:"text",name:"game",defaultValue:this.state.game,onChange:this.handleInputChange}))),s.createElement("div",null,s.createElement("label",null,"Category"," ",s.createElement("input",{type:"text",name:"category",defaultValue:this.state.category,onChange:this.handleInputChange}))),s.createElement("div",null,s.createElement("div",null,"Splits"),s.createElement(u.a,{onDragEnd:this.onDragEnd},this.makeDroppable())),s.createElement("div",{className:"editsplits-buttons"},s.createElement("span",{className:"editsplits-buttons-button",onClick:this.onRemove},"Remove"),s.createElement("span",{className:"editsplits-buttons-button",onClick:this.onInsert},"Insert"),s.createElement("input",{className:"editsplits-buttons-button",type:"submit",value:"Done"}))))},t}(s.Component)),h=(n(86),function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o.b(t,e),t.prototype.render=function(){var e=this.props.isOpen?"sidenav sidenav-active":"sidenav sidenav-inactive";return s.createElement("div",null,this.props.isOpen&&s.createElement("div",{className:"sidenav-background"}),s.createElement("div",{className:e},s.createElement("div",{className:"sidenav-close",onClick:this.props.closeCallback},s.createElement(c.a,{icon:"times"})),this.props.children))},t}(s.Component));n(88);function g(e,t){void 0===t&&(t=!0);var n="",i=Math.floor(e/1e3),s=Math.floor(i/60),a=Math.floor(s/60);if(e=Math.round(e%1e3/10),s%=60,i%=60,t&&0===a&&0===s)n+=i+".",e<10&&(n+="0"),n+=e;else{var o=!1;a>0&&(o=!0,n+=a+":"),s>0?(s<10&&o&&(n+="0"),n+=s+":"):n+=o?"00:":"0:",i<10&&(n+="0"),n+=i}return n}var f=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o.b(t,e),t.prototype.render=function(){var e="-";if(this.props.segmentTime===m.SKIPPED)e="-";else if(this.props.segmentTime){if(this.props.segment.pbTime)e=((t=this.props.segmentTime-this.props.segment.pbTime)>0?"+":"-")+g(Math.abs(t),!1);else e=g(this.props.segmentTime,!1)}else if(this.props.segment.pbTime){var t;if(this.props.isCurrentSplit&&this.props.currentTime>this.props.segment.pbTime)e="+"+g(t=this.props.currentTime-this.props.segment.pbTime,!1);else e=g(this.props.segment.pbTime,!1)}var n="split";return this.props.isCurrentSplit&&(n+=" split-active"),s.createElement("div",{className:n},s.createElement("span",{className:"split-title"},this.props.segment.title),s.createElement("span",{className:"split-time"},e))},t}(s.Component),v=(n(90),function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o.b(t,e),t.prototype.render=function(){var e=Math.floor(this.props.time%1e3/10),t=".";return e<10&&(t+="0"),t+=e,s.createElement("div",{className:"timer"},s.createElement("span",null,g(this.props.time,!1)),s.createElement("span",{className:"timer-decimal"},t))},t}(s.Component));r.b.add(l.a,l.b,l.c);var E=function(e){function t(t){var n=e.call(this,t)||this;return n.startTimer=function(){clearInterval(n.interval),n.setState({currentSplit:0,history:[{segmentTimes:[]}],isPaused:!1,isTiming:!0,startTime:Date.now()}),n.createInterval(),n.scrollToSplit(0)},n.splitTimer=function(){if(!n.state.isPaused&&n.state.isTiming){var e=n.state.currentSplit;n.setSegmentTime(n.state.currentTime),n.state.currentSplit>=n.state.run.segments.length-1?(clearInterval(n.interval),n.setState({isTiming:!1})):(e+=1,n.setState({currentSplit:e})),n.scrollToSplit(e)}},n.pauseTimer=function(){clearInterval(n.interval),n.setState({isPaused:!0})},n.resumeTimer=function(){var e=Date.now();n.setState({isPaused:!1,startTime:e-n.state.currentTime}),n.createInterval()},n.resetTimer=function(){clearInterval(n.interval),n.setState({currentSplit:0,currentTime:0,history:[{segmentTimes:[]}],isTiming:!1})},n.undoSegment=function(){0!==n.state.currentSplit&&n.state.isTiming&&n.setState({currentSplit:n.state.currentSplit-1,history:n.state.history.slice(0,n.state.currentSplit)})},n.skipSegment=function(){n.state.isTiming&&(n.setSegmentTime(m.SKIPPED),n.setState({currentSplit:n.state.currentSplit+1}))},n.createInterval=function(){n.interval=setInterval(function(){n.setState({currentTime:Date.now()-n.state.startTime})})},n.setSegmentTime=function(e){var t=n.state.currentSplit,i=n.state.history[t].segmentTimes.concat([e]);n.setState({history:n.state.history.concat([{segmentTimes:i}])})},n.scrollToSplit=function(e){if(null!==document.documentElement){var t=document.documentElement.clientHeight,i=document.getElementById("controls"),s=document.getElementById("splits");if(i&&s){var a=i.getBoundingClientRect().height,o=s.getBoundingClientRect().height,r=n.state.run.segments.length,l=m.SPLITS_MARGIN+o-(r-e-1)*m.SPLIT_HEIGHT-t+a;window.scrollTo({behavior:"smooth",left:0,top:l})}}},n.newSplits=function(){n.setState({run:{category:"",game:"",segments:[]},showDialog:!1,showMenu:!1})},n.openNewSplits=function(){n.setState({dialog:{contents:s.createElement("div",null,"Are you sure you want to create new splits? Your previous splits will be erased."),options:{onCancel:n.closeDialog,onConfirm:n.newSplits,showCancelButton:!0,showCloseButton:!1,showConfirmButton:!0,title:"Create new splits",type:i.Modal}},showDialog:!0,showMenu:!1})},n.openEditSplits=function(){n.setState({dialog:{contents:s.createElement(d,{run:n.state.run,onConfirm:n.confirmEditSplits}),options:{showCloseButton:!0,title:"Edit splits",type:i.Fullscreen}},showDialog:!0,showMenu:!1})},n.confirmEditSplits=function(e){n.setState({run:e}),n.closeDialog()},n.closeDialog=function(){n.setState({showDialog:!1}),window.setTimeout(function(){n.setState({dialog:{options:{showCloseButton:!0,title:"",type:i.Modal}}})},m.DIALOG_CLOSE_TIME_IN_MS)},n.openMenu=function(){n.setState({showMenu:!0})},n.closeMenu=function(){n.setState({showMenu:!1})},n.state={currentSplit:0,currentTime:0,dialog:{options:{showCloseButton:!0,title:"",type:i.Modal}},history:[{segmentTimes:[]}],isPaused:!1,isTiming:!1,run:{category:"Any%",game:"Super Metroid",segments:[{id:"",title:"0",pbTime:5e3},{id:"",title:"1"},{id:"",title:"2",pbTime:15e3},{id:"",title:"3",pbTime:2e4},{id:"",title:"4",pbTime:25e3},{id:"",title:"5",pbTime:3e4},{id:"",title:"6",pbTime:35e3},{id:"",title:"7",pbTime:4e4},{id:"",title:"8",pbTime:45e3},{id:"",title:"9",pbTime:5e4},{id:"",title:"10",pbTime:55e3},{id:"",title:"11",pbTime:6e4},{id:"",title:"12",pbTime:65e3},{id:"",title:"13",pbTime:7e4}]},showDialog:!1,showMenu:!1,startTime:Date.now()},n}return o.b(t,e),t.prototype.componentWillUnmount=function(){clearInterval(this.interval)},t.prototype.render=function(){var e=this.startTimer;this.state.isTiming&&(e=this.splitTimer);var t="Start",n=this.startTimer;this.state.isTiming&&(this.state.isPaused?(t="Resume",n=this.resumeTimer):(t="Pause",n=this.pauseTimer));for(var i,a=[],o=0;o<this.state.run.segments.length;o++)a.push(s.createElement(f,{key:o,segment:this.state.run.segments[o],currentTime:this.state.currentTime,isCurrentSplit:this.state.isTiming&&this.state.currentSplit===o,segmentTime:this.state.history[this.state.currentSplit].segmentTimes[o]}));return i=""===this.state.run.game&&""===this.state.run.category?s.createElement("div",{className:"title title-large"},"NanoSplit"):""===this.state.run.game?s.createElement("div",{className:"title title-large"},this.state.run.category):""===this.state.run.category?s.createElement("div",{className:"title title-large"},this.state.run.game):s.createElement("div",{className:"title"},this.state.run.game,s.createElement("br",null),this.state.run.category),s.createElement("div",{className:"App"},s.createElement("div",{id:"controls",className:"controls"},s.createElement("button",{className:"controls-button ml-0",onClick:this.undoSegment},"Undo"),s.createElement("button",{className:"controls-button",onClick:this.skipSegment},"Skip"),s.createElement("button",{className:"controls-button",onClick:this.resetTimer},"Reset"),s.createElement("button",{className:"controls-button mr-0",onClick:n},t)),s.createElement("div",{className:"header"},s.createElement("div",{className:"title-bar"},s.createElement("div",{className:"sidenav-menu",onClick:this.openMenu},s.createElement(c.a,{icon:"bars"})),i),s.createElement("div",{onClick:e},s.createElement(v,{time:this.state.currentTime}))),s.createElement("div",{className:"splits",id:"splits",onClick:e},a),s.createElement(h,{isOpen:this.state.showMenu,closeCallback:this.closeMenu},s.createElement("div",{className:"sidenav-item",onClick:this.openNewSplits},"New splits"),s.createElement("div",{className:"sidenav-item",onClick:this.openEditSplits},"Edit splits"),s.createElement("div",{className:"sidenav-item"},"Import"),s.createElement("div",{className:"sidenav-item"},"Export"),s.createElement("div",{className:"sidenav-item"},"Settings")),s.createElement(p,{isOpen:this.state.showDialog,onClose:this.closeDialog,options:this.state.dialog.options},this.state.dialog.contents))},t}(s.Component),T=(n(92),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function S(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}a.render(s.createElement(E,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/nanosplit",window.location.toString()).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="/nanosplit/service-worker.js";T?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):S(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):S(e)})}}()}},[[39,2,1]]]);
//# sourceMappingURL=main.21596ae7.chunk.js.map