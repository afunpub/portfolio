// Copyright 2001-2004 Interakt Online. All rights reserved.
	
function KT_attachProperties(obj) {

	//obj is the initial iframe
	obj_wnd = obj.contentWindow;
	obj_doc = obj.contentWindow.document;
	obj_doc.readyState = "complete";
	//define references to prototypes

	obj_doc_proto = obj.contentWindow.document.__proto__; //HTMLDocument prototype
	obj_docbody_proto = obj.contentWindow.document.body.__proto__; //HTMLBodyElement prototype
	obj_doc_htmlel_proto = obj.contentWindow.document.createElement("P").__proto__.__proto__; //HTMLElement prototype
	obj_docbody_proto.contains =_contains;
	obj_doc_event_proto = obj.contentWindow.document.createEvent("MouseEvents").__proto__; //Event prototype
	obj_doc_style_proto = obj.contentWindow.document.createElement("STYLE").__proto__; //HTMLStyleElement prototype

	//attach attachEvent to window, document and element

	obj_doc_proto.__defineGetter__("KT_Window", function () {
		return obj.contentWindow;
	});
	obj_doc_proto.__defineGetter__("selection", function () {
		if (this.KT_Window.getSelection() == null)
			return null;
		return this.KT_Window.getSelection();
	});

	obj_wnd_proto = Window.prototype; //Window prototype
	obj_wnd_proto.__proto__ = {
		get selection() {
			if (this.getSelection() == null)
				return null;
			return this.getSelection();
		}
		, __proto__:obj_wnd_proto.__proto__
	}

	obj_wndsel_proto = obj.contentWindow.getSelection().__proto__; //Selection prototype

obj_wndsel_proto.__proto__ = {
	get type() {
		var ret = "None";
		if (this.rangeCount == 0){
			
		} else {
			if(this.rangeCount==1) {
				var fRange = this.getRangeAt(0);
				if(fRange.toString()=="") {
					ret = "None";
				} else {
					ret = "Text";
				}
			} else {
				//multiple elements selected (TDs)
				ret = "Text";
			}
		}
		return ret;
	},
	createRange:function () {
		var sel = this;
		if(sel.rangeCount == 0) {
			//alert(_createRange.caller.name);
		}
		if (sel) {
			try {
				return this.getRangeAt(0);
			} catch (e) {
				//ktmls[0].log("Error in _createRange:")
				//ktmls[0].log(e);
			}
		} else {
			return this.ownerDocument.createRange();
		}
	},
	clear:function() {
		this.removeAllRanges();
	},
	empty:function() {
		this.removeAllRanges();
	}
	, __proto__:obj_wndsel_proto.__proto__
}


	// Create a new stylesheet, or load a .css file
	obj_doc_proto.createStyleSheet = _createStyleSheet;
	document.__proto__.createStyleSheet = _createStyleSheet;

	// Range methods & properties
	var howMap = {"EndToEnd":Range.END_TO_END, "EndToStart":Range.END_TO_START, "StartToStart":Range.START_TO_START, "StartToEnd":Range.START_TO_END};
	obj_docrange_proto = obj.contentWindow.document.createRange().__proto__;

obj_docrange_proto.__proto__ = {
	isEqual : function(rng) {
		return
			this.startContainer == rng.startContainer &&
			this.startOffset == rng.startOffset &&
			this.endContainer == rng.endContainer &&
			this.endOffset == rng.endOffset;
	},
	get KT_Window() {
		return obj.contentWindow;
	},
	parentElement : function () {
		var parent = this.commonAncestorContainer;
		if (parent.nodeType == 3) {
			return parent.parentNode;
		} else {
			return parent;
		}
	},
	moveToElementText : function (node) {
		var first = this.findFirstTextNode(node);
		if(!first) {
			first = node;
		}
		var last = this.findLastTextNode(node);
		if(!last) {
			last = first;
		}
		this.setEnd(last, last.nodeValue.length);
		this.setStart(first, 0);
	},
	addElement : function (node) {
		this.selectNode(node);
		return;
	}, 
	duplicate : function () {
		return this.cloneRange();
	},
	compareEndPoints : function (how, eRng) {
		return this.compareBoundaryPoints(howMap[how], eRng);
	},
	select : function () {
		var sel = this.KT_Window.getSelection();
		sel.removeAllRanges();
		sel.addRange(this);
	},
	findFirstTextNode : function (node) {
		if(!node) {
			return false;
		}
		switch (node.nodeType) {
    case 1:
    case 9:
    case 11:
      if (node.childNodes.length > 0)
        return this.findFirstTextNode(node.firstChild);
      else
        return this.findFirstTextNode(node.nextSibling);
    case 3:
      return node;
    default:
      alert("Not implemented:  type=" + node.nodeType);
  	}
	},
	findLastTextNode : function (node) {
		if(!node) {
			return false;
		}
		switch (node.nodeType) {
    case 1:
    case 9:
    case 11:
      if (node.childNodes.length > 0)
        return this.findLastTextNode(node.lastChild);
      else
        return this.findLastTextNode(node.previousSibling);
    case 3:
      return node;
    default:
      alert("Not implemented:  type=" + node.nodeType);
  	}
	},
	get htmlText() {
		return KT_getHTML(this.cloneContents(), false);
	},
	set htmlText(newHtml) {
		this.deleteContents();
		var newEl = this.startContainer.ownerDocument.createElement("SPAN");
		newEl.innerHTML = newHtml;
		for(var i=newEl.childNodes.length-1; i>=0; i--) {
				this.insertNode(newEl.childNodes[i]);
		}
	},
	pasteHTML : function (newHtml) {
		this.htmlText = newHtml;
	},
	get text() {
		return this.toString();
	},
	set text(newText) {
		try {
			if (this.startContainer.nodeType == 1) {
				var targetNode = this.startContainer.childNodes[this.startOffset];
				if (targetNode.replaceData) {
					targetNode.replaceData(0, targetNode.textContent.length,newText);
					var tn = this.startContainer.parentElement.tagName.toLowerCase();
					if( (tn == "td" || tn == "th") && newText=="") {
						this.startContainer.innerHTML = "&nbsp;";
					}
				}
			} else if (this.startContainer.nodeType == 3) {
				this.startContainer.replaceData(this.startOffset, this.endOffset - this.startOffset, newText);
			}
		} catch(e) {
			ktmls[0].log("Error docrange text setter:");
			ktmls[0].log(e);
		}
		return newText;
	},
	__proto__:obj_docrange_proto.__proto__
}

	obj_docbody_proto.createTextRange = function () {
  	if (obj.contentWindow.getSelection().rangeCount > 0) {
    	return obj.contentWindow.getSelection().getRangeAt(0);
  	} else
    	return null;
	};

	obj_docbody_proto.createControlRange = function () {
  	if (obj.contentWindow.getSelection().rangeCount > 0) {
    	return obj.contentWindow.getSelection().getRangeAt(0);
  	} else
    	return null;
	};


	// add the specific methods to the events
	obj_doc_event_proto.__defineSetter__("returnValue", _returnValue);
	obj_doc_event_proto.__defineSetter__("cancelBubble", _cancelBubble);
	obj_doc_event_proto.__defineGetter__("srcElement", _srcElement);
	obj_doc_event_proto.__defineGetter__("fromElement",_fromElement);
	obj_doc_event_proto.__defineGetter__("toElement",_toElement);
	obj_doc_event_proto.__defineGetter__("offsetX", _offsetX);
	obj_doc_event_proto.__defineGetter__("offsetY", _offsetY);
	//parentElement
	obj_doc_htmlel_proto.__defineGetter__("parentElement", _parentElement);
	// el.children()	
	obj_doc_htmlel_proto.__defineGetter__("children", _children);
	//contains()	
	obj_doc_htmlel_proto.contains =_contains();

	obj_doc_htmlel_proto.__defineSetter__("outerHTML", function (sHTML) {
	   var r = this.ownerDocument.createRange();
	   r.setStartBefore(this);
	   var df = r.createContextualFragment(sHTML);
	   this.parentNode.replaceChild(df, this);
	   
	   return sHTML;
	});
	obj_doc_htmlel_proto.__defineGetter__("canHaveChildren", function () {
		switch (this.tagName) {
			case "AREA":
			case "BASE":
			case "BASEFONT":
			case "COL":
			case "FRAME":
			case "HR":
			case "IMG":
			case "BR":
			case "INPUT":
			case "ISINDEX":
			case "LINK":
			case "META":
			case "PARAM":
				return false;
		}
		return true;
	});
	
	obj_doc_htmlel_proto.__defineGetter__("outerHTML", function () {
		var attr, attrs = this.attributes;
		var str = "<" + this.tagName;
		for (var i = 0; i < attrs.length; i++) {
			attr = attrs[i];
			if (attr.specified)
				str += " " + attr.name + '="' + attr.value + '"';
		}
		if (!this.canHaveChildren)
			return str + ">";
		
		return str + ">" + this.innerHTML + "</" + this.tagName + ">";
	});


	// Add a css rule
	//obj_doc_proto.addRule = _addRule;
	//obj_doc_htmlel_proto.addRule = _addRule;
	//obj_doc_style_proto.addRule = _addRule();
}

/*
mozilla stylesheet stufy

document.getElementById('tssxyz').sheet.insertRule('P { fontSize: 25pt }', 0);
document.getElementById('tssxyz').sheet.cssRules.length
*/

function _createStyleSheet_new(xmlURI) {
	var theHeadNode = this.getElementsByTagName("head")[0];
	var theStyleNode = this.createElement('link');
	if(xmlURI){
		theStyleNode.rel ="stylesheet"
		theStyleNode.type="text/css";
		theStyleNode.href=xmlURI;
		theHeadNode.appendChild(theStyleNode);
	}
	return theStyleNode;
}

function _createStyleSheet(xmlURI) {
  // load the xml
	var theHeadNode = this.getElementsByTagName("head")[0];
	var theStyleNode = this.createElement('style');
	theStyleNode.type ="text/css"
	theStyleNode.rules = new Array();

	theHeadNode.appendChild(theStyleNode);

	if (xmlURI != "") {
		var xmlHttp = new XMLHttpRequest();
		try {
			xmlHttp.open("GET", xmlURI, false);
			xmlHttp.send(null);
		}
		catch (e) {
			alert('Cannot load a stylesheet from a server other than the current server.\r\nThe current server is "'+this.location.hostname+'".\r\nThe requested stylesheet URL is "'+xmlURI+'".');
			return null;
		}

		if(xmlHttp.status==404){
			prompt('Stylesheet was not found:', xmlURI);
			return null;
		}
		var theTextNode = this.createTextNode(xmlHttp.responseText);
		theStyleNode.appendChild(theTextNode);
		
		var re = /\s*\{([^\}]*)\}\s*/;
		nameList = xmlHttp.responseText.split (re);
		for(var i=0; i<nameList.length; i=i+2) {
			var rul = new Object();
			rul.selectorText = nameList[i];
			rul.cssText = nameList[i+1]
			theStyleNode.rules.push(rul);
		}
		
	} else {
		var theTextNode = this.createTextNode('u');
		theStyleNode.appendChild(theTextNode);
	}
	return theStyleNode;
}

function _addRule(itemName, itemStyle) {
	var theStyleNode = this.getElementsByTagName("style")[0];
	var theTextNode = this.createTextNode(itemName + " { " + itemStyle + " }");
	theStyleNode.appendChild(theTextNode);
}


function previousLeaf(node){
	if(node.previousSibling){
		return node.previousSibling;
	}
	var pNode = node.parentNode;
	//if parent node does not have a previousSibling, go up until find one tag with previous sibling
	//do not exit from BODY
	if(!pNode.ownerDocument.body.contains(pNode)){
		return null;
	}
	while(!pNode.previousSibling){
		pNode = pNode.parentNode;
		if(!pNode || pNode && pNode.tagName=="BODY"){
			return null;
		}
	}
	if(!pNode.ownerDocument.body.contains(pNode)){
		return null;
	}
	pNode = pNode.previousSibling;
	if(!pNode.ownerDocument.body.contains(pNode)){
		return null;
	}
	while(true){
		//find last leaf deep on this branch
		if(pNode.lastChild){
			pNode = pNode.lastChild;
		}else{
			break;
		}
	}
	if(!pNode.ownerDocument.body.contains(pNode)){
		return null;
	}
	return pNode;
}


function nextLeaf(node){
	if(node.nextSibling){
		pNode = node.nextSibling;
	} else {
		var pNode = node.parentNode;
		//if parent node does not have a nextSibling, go up until find one tag with next sibling
		//do not exit from BODY
		if(!pNode.ownerDocument.body.contains(pNode)){
			return null;
		}
		while(!pNode.nextSibling){
			pNode = pNode.parentNode;
			if(!pNode || pNode && pNode.tagName=="BODY"){
				return null;
			}
		}
		if(!pNode.ownerDocument.body.contains(pNode)){
			return null;
		}
		pNode = pNode.nextSibling;
	}
	if(!pNode.ownerDocument.body.contains(pNode)){
		return null;
	}
	while(true){
		//find first leaf deep on this branch
		if(pNode.firstChild){
			pNode = pNode.firstChild;
		}else{
			break;
		}
	}
	if(!pNode.ownerDocument.body.contains(pNode)){
		return null;
	}
	return pNode;
}


function _returnValue (b) {
	if (!b) this.preventDefault();
	return b;
}

function _getType() {
	if (this.rangeCount == 0){
		return "None";
	} else {
		if(this.rangeCount==1) {
			var fRange = this.getRangeAt(0);
			if(fRange.toString()=="") {
				return "None";
			}
		} else {
			//multiple elements selected (TDs)
		}
		return "Text";
	}
}


function _cancelBubble () {
	var node = this.target;
	while (node.nodeType != 1) node = node.parentNode;
	return node;
}

function _srcElement () {
	var node = this.target;
	while (node.nodeType != 1) node = node.parentNode;
	return node;
}

function _fromElement () {
	var node;
	if (this.type == "mouseover")
		node = this.relatedTarget;
	else if (this.type == "mouseout")
		node = this.target;
	if (!node) return;
	while (node.nodeType != 1) node = node.parentNode;
	return node;
}

function _toElement () {
	var node;
	if (this.type == "mouseout")
		node = this.relatedTarget;
	else if (this.type == "mouseover")
		node = this.target;
	if (!node) return;
	while (node.nodeType != 1) node = node.parentNode;
	return node;
}

function _offsetX() {
	return this.layerX;
}

function _offsetY() {
	return this.layerY;
}

function _parentElement() {
	if (this.parentNode == this.ownerDocument) 
		return null;
	return this.parentNode;
}

function _children () {
	var tmp = [];
	var j = 0;
	var n;
	for (var i = 0; i < this.childNodes.length; i++) {
		n = this.childNodes[i];
		if (n.nodeType == 1) {
			tmp[j++] = n;
			if (n.name) {	// named children
				if (!tmp[n.name])
					tmp[n.name] = [];
				tmp[n.name][tmp[n.name].length] = n;
			}
			if (n.id)		// child with id
				tmp[n.id] = n
		}
	}
	return tmp;
}

function _contains (oEl) {
	if (oEl == this) return true;
	if (oEl == null) return false;
	return this.contains(oEl.parentNode);		
}

/*

// Create a new stylesheet, or load a .css file
HTMLDocument.prototype.createStyleSheet = _createStyleSheet;
// Add a css rule
//HTMLStyleElement.prototype.addRule = _addRule();

// add the specific methods to the events
Event.prototype.__defineSetter__("returnValue", _returnValue);
Event.prototype.__defineSetter__("cancelBubble", _cancelBubble);
Event.prototype.__defineGetter__("srcElement", _srcElement);
Event.prototype.__defineGetter__("fromElement",_fromElement);
Event.prototype.__defineGetter__("toElement",_toElement);
Event.prototype.__defineGetter__("offsetX", _offsetX);
Event.prototype.__defineGetter__("offsetY", _offsetY);
// attachEvent
HTMLDocument.prototype.attachEvent = 
HTMLElement.prototype.attachEvent = _attachEvent;
// detachEvent
HTMLDocument.prototype.detachEvent = 
HTMLElement.prototype.detachEvent = _detachEvent;
//parentElement
*/
HTMLElement.prototype.__defineGetter__("parentElement", _parentElement);
// el.children()	
HTMLElement.prototype.__defineGetter__("children", _children);
//contains()	
HTMLElement.prototype.contains =_contains;

function KT_getHTML(root, outputRoot) {
	function encode(str) {
		// we don't need regexp for that, but.. so be it for now.
		str = str.replace(/&/ig, "&amp;");
		str = str.replace(/</ig, "&lt;");
		str = str.replace(/>/ig, "&gt;");
		str = str.replace(/\"/ig, "&quot;");
		return str;
	};
	var html = "";
	switch (root.nodeType) {
	    case 1: // Node.ELEMENT_NODE
	    case 11: // Node.DOCUMENT_FRAGMENT_NODE
		var closed;
		var i;
		if (outputRoot) {
			closed = (!(root.hasChildNodes() || (" script style div span ".indexOf(" " + root.tagName.toLowerCase() + " ") != -1)));
			html = "<" + root.tagName.toLowerCase();
			var attrs = root.attributes;
			for (i = 0; i < attrs.length; ++i) {
				var a = attrs.item(i);
				if (!a.specified) {
					continue;
				}
				var name = a.name.toLowerCase();
				if (name.substr(0, 4) == "_moz") {
					continue;
				}
				var value;
				if (name != 'style') {
					value = a.value;
				} else {
					value = root.style.cssText.toLowerCase();
				}
				if (value.substr(0, 4) == "_moz") {
					continue;
				}
				html += " " + name + '="' + value + '"';
			}
			html += closed ? " />" : ">";
		}
		for (i = root.firstChild; i; i = i.nextSibling) {
			html += KT_getHTML(i, true);
		}
		if (outputRoot && !closed) {
			html += "</" + root.tagName.toLowerCase() + ">";
		}
		break;
	    case 3: // Node.TEXT_NODE
		html = encode(root.data);
		break;
	    case 8: // Node.COMMENT_NODE
		html = "<!--" + root.data + "-->";
		break;		// skip comments, for now.
	}
	return html;
};

// Copyright 2001-2004 Interakt Online. All rights reserved.
/**
 * Throughout, whitespace is defined as one of the characters
 *  "\t" TAB \u0009
 *  "\n" LF  \u000A
 *  "\r" CR  \u000D
 *  " "  SPC \u0020
 *
 * This does not use Javascript's "\s" because that includes non-breaking
 * spaces (and also some other characters).
 */


/**
 * Determine whether a node's text content is entirely whitespace.
 *
 * @param nod  A node implementing the |CharacterData| interface (i.e.,
 *             a |Text|, |Comment|, or |CDATASection| node
 *             or a String 
 * @return     True if all of the text content of |nod| is whitespace,
 *             otherwise false.
 */
function is_all_ws( nod )
{
  // Use ECMA-262 Edition 3 String and RegExp features
	if(typeof nod=="string"){
		return !(/[^\t\n\r ]/.test(nod));
	} else {
		return !(/[^\t\n\r ]/.test(nod.data));
	}
}


/**
 * Determine if a node should be ignored by the iterator functions.
 *
 * @param nod  An object implementing the DOM1 |Node| interface.
 * @return     true if the node is:
 *                1) A |Text| node that is all whitespace
 *                2) A |Comment| node
 *             and otherwise false.
 */

function is_ignorable( nod )
{
  return ( nod.nodeType == 8) || // A comment node
         ( (nod.nodeType == 3) && is_all_ws(nod) ); // a text node, all ws
}

/**
 * Version of |previousSibling| that skips nodes that are entirely
 * whitespace or comments.  (Normally |previousSibling| is a property
 * of all DOM nodes that gives the sibling node, the node that is
 * a child of the same parent, that occurs immediately before the
 * reference node.)
 *
 * @param sib  The reference node.
 * @return     Either:
 *               1) The closest previous sibling to |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
function node_before( sib )
{
  while ((sib = sib.previousSibling)) {
    if (!is_ignorable(sib)) return sib;
  }
  return null;
}

/**
 * Version of |nextSibling| that skips nodes that are entirely
 * whitespace or comments.
 *
 * @param sib  The reference node.
 * @return     Either:
 *               1) The closest next sibling to |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
function node_after( sib )
{
  while ((sib = sib.nextSibling)) {
    if (!is_ignorable(sib)) return sib;
  }
  return null;
}

/**
 * Version of |lastChild| that skips nodes that are entirely
 * whitespace or comments.  (Normally |lastChild| is a property
 * of all DOM nodes that gives the last of the nodes contained
 * directly in the reference node.)
 *
 * @param sib  The reference node.
 * @return     Either:
 *               1) The last child of |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
function last_child( par )
{
  var res=par.lastChild;
  while (res) {
    if (!is_ignorable(res)) return res;
    res = res.previousSibling;
  }
  return null;
}

/**
 * Version of |firstChild| that skips nodes that are entirely
 * whitespace and comments.
 *
 * @param sib  The reference node.
 * @return     Either:
 *               1) The first child of |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
function first_child( par )
{
  var res=par.firstChild;
  while (res) {
    if (!is_ignorable(res)) return res;
    res = res.nextSibling;
  }
  return null;
}

/**
 * Version of |data| that doesn't include whitespace at the beginning
 * and end and normalizes all whitespace to a single space.  (Normally
 * |data| is a property of text nodes that gives the text of the node.)
 *
 * @param txt  The text node whose data should be returned
 * @return     A string giving the contents of the text node with
 *             whitespace collapsed.
 */
function data_of( txt )
{
  var data = txt.data;
  // Use ECMA-262 Edition 3 String and RegExp features
  data = data.replace(/[\t\n\r ]+/g, " ");
  if (data.charAt(0) == " ")
	data = data.substring(1, data.length);
  if (data.charAt(data.length - 1) == " ")
	data = data.substring(0, data.length - 1);
  return data;
}
