// Copyright 2001-2004 Interakt Online. All rights reserved.
ELEMENT_NODE                   = 1;
ATTRIBUTE_NODE                 = 2;
TEXT_NODE                      = 3;
CDATA_SECTION_NODE             = 4;
ENTITY_REFERENCE_NODE          = 5;
ENTITY_NODE                    = 6;
PROCESSING_INSTRUCTION_NODE    = 7;
COMMENT_NODE                   = 8;
DOCUMENT_NODE                  = 9;
DOCUMENT_TYPE_NODE             = 10;
DOCUMENT_FRAGMENT_NODE         = 11;
NOTATION_NODE                  = 12;


RG_AMP = new RegExp('[&]', "g");
RG_GT = new RegExp('[>]', "g");
RG_LT = new RegExp('[<]', "g");
RG_QUOTE = new RegExp('["]', "g");
//the A0 is the HEXA ASCII code 160 (&nbsp;)
RG_SPACE = /\xA0/g;

//var stripTag = ['b', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'span', 'div', 'font']
var stripTag = ['b', 'strong', 'span', 'font', 'i', 'em']
var stripTagReg = '^' + stripTag.join("$|^") + '$';
var tagsWithoutContent = ['IMG', 'HR', 'BR', 'WBR', 'INPUT'];
var tagsWithoutContentReg = '^' + tagsWithoutContent.join("$|^").toLowerCase() + '$';

//source formating vars
//put a new line before and after these tags:
var newLineAfterTags = ["table","tbody","ul","ol","p"];
var newLineAfterTagsReg = '^' + newLineAfterTags.join("$|^").toLowerCase() + '$';

var indentTags = new Object();
indentTags = {
	"tr":1,
	"td":1,
	"li":1
};

var canContainOnlyTagsTags="applet,colgroup,map,object,ol,ul,optgroup,select,Table,tbody,tfoot,thead,tr";
var canContainOnlyTagsTagsArray = canContainOnlyTagsTags.toLowerCase().split(",");
var canContainOnlyTagsTagsReg = '^' + canContainOnlyTagsTagsArray.join("$|^") + '$';

var canHaveTextTags = {"td":true,"li":true};

//character used to indent source
var formattingIndentChar = "  ";

var maxFormattingExecutionTime = 5*1000;//miliseconds
var acceptedAttributes = "abbr,accept-charset,accessKey,action,align,alt,archive,axis,background,bgColor,border,borderColor,borderColorDark,borderColorLight,cellPadding,cellSpacing,ch,charset,chOff,cite,class,classid,clear,code,codeBase,codeType,color,cols,colSpan,compact,coords,dir,disabled,encType,face,for,frame,headers,height,hideFocus,href,hreflang,hspace,id,lang,language,media,method,name,noHref,noShade,noWrap,readOnly,rel,rev,rows,rowSpan,rules,scope,shape,size,src,standby,start,style,summary,tabIndex,target,title,type,useMap,vAlign,value,vspace,width,wrap";
//var acceptedAttributes = "action,align,alt,background,bgColor,border,borderColor,cellPadding,cellSpacing,class,classid,clear,code,codeBase,codeType,color,cols,colSpan,face,height,href,hspace,id,media,name,noShade,noWrap,rowSpan,src,start,style,target,title,type,vAlign,value,vspace,width,wrap";
var acceptedAttributesArray = acceptedAttributes.split(",");
var acceptedAttributesReg = "^" + acceptedAttributesArray.join("$|^") +"$";
var useAcceptedAttributesList = true;

var SELECTION_START = "KTML_VIEW_SOURCE_SELECTION_START";
var SELECTION_END = "KTML_VIEW_SOURCE_SELECTION_END";

if (Ktml_mozilla) {
	DECMD_BOLD =                      "bold";
	DECMD_COPY =                      "copy";
	DECMD_CUT =                       "cut";
	DECMD_DELETE =                    5004;
	DECMD_DELETECELLS =               5005;
	DECMD_DELETECOLS =                5006;
	DECMD_DELETEROWS =                5007;
	DECMD_FINDTEXT =                  5008;
	DECMD_FONT =                      "fontname";
	DECMD_GETBACKCOLOR =              "backcolor";
	DECMD_GETBLOCKFMT =               5011;
	DECMD_GETBLOCKFMTNAMES =          5012;
	DECMD_GETFONTNAME =               "fontname";
	DECMD_GETFONTSIZE =               "fontsize";
	DECMD_GETFORECOLOR =              "forecolor";
	DECMD_HYPERLINK =                 "createlink";
	DECMD_ANCHORLINK =                "createbookmark";
	DECMD_IMAGE =                     "insertimage";
	DECMD_INDENT =                    "indent";
	DECMD_INSERTCELL =                5019;
	DECMD_INSERTCOL =                 5020;
	DECMD_INSERTROW =                 5021;
	DECMD_INSERTTABLE =               5022;
	DECMD_INSERTHR =               	  "inserthorizontalrule";
	DECMD_ITALIC =                    "italic";
	DECMD_JUSTIFYCENTER =             "justifycenter";
	DECMD_JUSTIFYLEFT =               "justifyleft";
	DECMD_JUSTIFYRIGHT =              "justifyright";
	DECMD_JUSTIFYFULL  = 			  			"justifyfull";
	DECMD_LOCK_ELEMENT =              5027;
	DECMD_MAKE_ABSOLUTE =             5028;
	DECMD_MERGECELLS =                5029;
	DECMD_ORDERLIST =                 "insertorderedlist";
	DECMD_OUTDENT =                   "outdent";
	DECMD_PASTE =                     "paste";
	DECMD_REDO =                      "redo";
	DECMD_REMOVEFORMAT =              "removeformat";
	DECMD_SELECTALL =                 "selectall";
	DECMD_SEND_BACKWARD =             5036;
	DECMD_BRING_FORWARD =             5037;
	DECMD_SEND_BELOW_TEXT =           5038;
	DECMD_BRING_ABOVE_TEXT =          5039;
	DECMD_SEND_TO_BACK =              5040;
	DECMD_BRING_TO_FRONT =            5041;
	DECMD_SETBACKCOLOR =              "backcolor";
	DECMD_SETBLOCKFMT =               "formatblock";
	DECMD_SETFONTNAME =               "fontname";
	DECMD_SETFONTSIZE =               "fontsize";
	DECMD_SETFORECOLOR =              "forecolor";
	DECMD_SPLITCELL =                 5047;
	DECMD_UNDERLINE =                 "underline";
	DECMD_UNDO =                      "undo";
	DECMD_UNLINK =                    "unlink";
	DECMD_UNANCHOR =                  "unBookmark";
	DECMD_UNORDERLIST =               "insertunorderedlist";
	DECMD_PROPERTIES =                "";



	// OLECMDEXECOPT
	OLECMDEXECOPT_DODEFAULT =         false;
	OLECMDEXECOPT_PROMPTUSER =        true;
	OLECMDEXECOPT_DONTPROMPTUSER =    false;

	// DHTMLEDITCMDF
	DECMDF_NOTSUPPORTED =             false;
	DECMDF_DISABLED =                 false;
	DECMDF_ENABLED =                  true;
	DECMDF_LATCHED =                  7;
	DECMDF_NINCHED =                  11;

	// DHTMLEDITAPPEARANCE
	DEAPPEARANCE_FLAT =               0;
	DEAPPEARANCE_3D =                 1;

	// OLE_TRISTATE
	OLE_TRISTATE_UNCHECKED =          0;
	OLE_TRISTATE_CHECKED =            1;
	OLE_TRISTATE_GRAY =               2;
}
if (Ktml_ie) {
	DECMD_BOLD =                      "Bold";
	DECMD_COPY =                      "Copy";
	DECMD_CUT =                       "Cut";
	DECMD_DELETE =                    5004;
	DECMD_DELETECELLS =               5005;
	DECMD_DELETECOLS =                5006;
	DECMD_DELETEROWS =                5007;
	DECMD_FINDTEXT =                  5008;
	DECMD_FONT =                      "FontName";
	DECMD_GETBACKCOLOR =              "BackColor";
	DECMD_GETBLOCKFMT =               5011;
	DECMD_GETBLOCKFMTNAMES =          5012;
	DECMD_GETFONTNAME =               "FontName";
	DECMD_GETFONTSIZE =               "FontSize";
	DECMD_GETFORECOLOR =              "ForeColor";
	DECMD_HYPERLINK =                 "CreateLink";
	DECMD_ANCHORLINK =                "CreateBookmark";
	DECMD_IMAGE =                     "InsertImage";
	DECMD_INDENT =                    "Indent";
	DECMD_INSERTCELL =                5019;
	DECMD_INSERTCOL =                 5020;
	DECMD_INSERTROW =                 5021;
	DECMD_INSERTTABLE =               5022;
	DECMD_INSERTHR =               	  "InsertHorizontalRule";
	DECMD_ITALIC =                    "Italic";
	DECMD_JUSTIFYCENTER =             "JustifyCenter";
	DECMD_JUSTIFYLEFT =               "JustifyLeft";
	DECMD_JUSTIFYRIGHT =              "JustifyRight";
	DECMD_JUSTIFYFULL =              "JustifyFull";
	DECMD_LOCK_ELEMENT =              5027;
	DECMD_MAKE_ABSOLUTE =             5028;
	DECMD_MERGECELLS =                5029;
	DECMD_ORDERLIST =                 "InsertOrderedList";
	DECMD_OUTDENT =                   "Outdent";
	DECMD_PASTE =                     "Paste";
	DECMD_REDO =                      "Redo";
	DECMD_REMOVEFORMAT =              "RemoveFormat";
	DECMD_SELECTALL =                 "SelectAll";
	DECMD_SEND_BACKWARD =             5036;
	DECMD_BRING_FORWARD =             5037;
	DECMD_SEND_BELOW_TEXT =           5038;
	DECMD_BRING_ABOVE_TEXT =          5039;
	DECMD_SEND_TO_BACK =              5040;
	DECMD_BRING_TO_FRONT =            5041;
	DECMD_SETBACKCOLOR =              "BackColor";
	DECMD_SETBLOCKFMT =               "FormatBlock";
	DECMD_SETFONTNAME =               "FontName";
	DECMD_SETFONTSIZE =               "FontSize";
	DECMD_SETFORECOLOR =              "ForeColor";
	DECMD_SPLITCELL =                 5047;
	DECMD_UNDERLINE =                 "Underline";
	DECMD_UNDO =                      "Undo";
	DECMD_UNLINK =                    "Unlink";
	DECMD_UNANCHOR =                  "UnBookmark";
	DECMD_UNORDERLIST =               "InsertUnorderedList";
	DECMD_PROPERTIES =                "";



	// OLECMDEXECOPT
	OLECMDEXECOPT_DODEFAULT =         false;
	OLECMDEXECOPT_PROMPTUSER =        true;
	OLECMDEXECOPT_DONTPROMPTUSER =    false;

	// DHTMLEDITCMDF
	DECMDF_NOTSUPPORTED =             false;
	DECMDF_DISABLED =                 false;
	DECMDF_ENABLED =                  true;
	DECMDF_LATCHED =                  7;
	DECMDF_NINCHED =                  11;

	// DHTMLEDITAPPEARANCE
	DEAPPEARANCE_FLAT =               0;
	DEAPPEARANCE_3D =                 1;

	// OLE_TRISTATE
	OLE_TRISTATE_UNCHECKED =          0;
	OLE_TRISTATE_CHECKED =            1;
	OLE_TRISTATE_GRAY =               2;
}

/**
	Table Edit methods
*/
function mergeDown(ktml) {
	var tableCell = getObjectParentTag("td", ktml.edit.selection.createRange().parentElement());
	if (!tableCell) {
		 return;
	}
	//        [  TD   ] [   TR   ] [  TBODY ] [         TRs            ]
	var trs = tableCell.parentNode.parentNode.getElementsByTagName("TR");
	var topRowIndex = tableCell.parentNode.rowIndex;
	if (!trs[topRowIndex + tableCell.rowSpan]) {
		 alert((KT_js_messages["Table nocellbelow"]) ? KT_js_messages["Table nocellbelow"] : "No cell below");
		 return;
	}
	//                   [              TR                 ]
	var tds        =  trs[ topRowIndex + tableCell.rowSpan ].getElementsByTagName("TD");
	var bottomCell = false;
	var idx = tableCell.cellIndex;
	while(!bottomCell && idx>=0) {
		bottomCell = tds[ idx ];
		idx--;
	}
	if (!bottomCell) {
		 alert((KT_js_messages["Table nocellbelowmerge"]) ? KT_js_messages["Table nocellbelowmerge"] : "There is not a cell below this one to merge with.");
		 return;
	}

	// don't allow merging rows with different colspans
	if (tableCell.colSpan != bottomCell.colSpan) {
		 alert((KT_js_messages["Table diffcolspans"]) ? KT_js_messages["Table diffcolspans"] : "Can't merge cells with different colspans.");
		 return;
	}

	// do the merge
	tableCell.innerHTML += bottomCell.innerHTML;
	tableCell.rowSpan += bottomCell.rowSpan;
	bottomCell.parentNode.removeChild(bottomCell);
	//bottomCell.removeNode(true);
	if (ktml.undo) {
		ktml.undo.addEdit();
	}
	//ktml.edit.selection.collapse();
	ktml.cw.focus();
}

function unMergeDown(ktml) {
	var tableCell = getObjectParentTag("td", ktml.edit.selection.createRange().parentElement());
	if (!tableCell)
		 return;
	if (tableCell.rowSpan <= 1) {
		 alert((KT_js_messages["Table rowspanalready1"]) ? KT_js_messages["Table rowspanalready1"] : "RowSpan is already set to 1.");
		 return;
	}
	var topRowIndex = tableCell.parentNode.rowIndex;
	// add a cell to the beginning of the next row
	var td = ktml.edit.createElement("TD");

	var table = getObjectParentTag("table", tableCell);
	var tableBorder = table.getAttribute("border");
	if(tableBorder && parseInt(tableBorder+"")==0){
		ktml.utils_makeOutline(td);
	}
	td = tableCell.parentNode.parentNode.getElementsByTagName("TR")[ topRowIndex + tableCell.rowSpan - 1 ].appendChild( td );
	tableCell.rowSpan -= 1;
	td.innerHTML = "&nbsp;";
	if (ktml.undo) {
		ktml.undo.addEdit();
	}
}
function mergeRight(ktml) {
	var tableCell = getObjectParentTag("td", ktml.edit.selection.createRange().parentElement());
	if (!tableCell)
		 return;
	var tds = tableCell.parentElement.getElementsByTagName("TD");
	if (!tds[tableCell.cellIndex+1]) {
		return;
	}
	// don't allow user to merge rows with different rowspans
	if (tableCell.rowSpan != tds[tableCell.cellIndex+1].rowSpan) {
		 alert((KT_js_messages["Table diffrowspans"]) ? KT_js_messages["Table diffrowspans"] : "Can't merge cells with different rowSpans.");
		 return;
	}

	var srcRowIndex = (tableCell.parentElement.parentElement.rows.length == (tableCell.parentElement.rowIndex+1))?0:(tableCell.parentElement.rowIndex+1);
	tableCell.getAttribute("width")?tableCell.parentElement.parentElement.rows[srcRowIndex].cells[tableCell.cellIndex].setAttribute("width", tableCell.getAttribute("width")):"";
	tableCell.parentElement.cells[tableCell.cellIndex+1].getAttribute("width")?tableCell.parentElement.parentElement.rows[srcRowIndex].cells[tableCell.cellIndex+1].setAttribute("width", tableCell.parentElement.cells[tableCell.cellIndex+1].getAttribute("width")):"";

	tableCell.innerHTML += tds[tableCell.cellIndex+1].innerHTML;
	tableCell.colSpan += tds[tableCell.cellIndex+1].colSpan;

	tableCell.parentNode.removeChild(tds[tableCell.cellIndex+1]);

	tableCell = null;
	ktml.cw.focus();
	ktml.undo.addEdit();

}

function splitCell(ktml) {
	var tableCell = getObjectParentTag("td", ktml.edit.selection.createRange().parentElement());
	if (!tableCell)
		 return;
	if (tableCell.colSpan < 2) {
		 alert((KT_js_messages["Table cantdivide"]) ? KT_js_messages["Table cantdivide"] : "Cell can't be divided.  Add another cell instead");
		 return;
	}

	tableCell.colSpan = tableCell.colSpan - 1;
	var td = ktml.edit.createElement("TD");

	var table = getObjectParentTag("table", tableCell);
	var tableBorder = table.getAttribute("border");
	if(tableBorder && parseInt(tableBorder+"")==0){
		ktml.utils_makeOutline(td);
	}
	var newCell = tableCell.parentNode.insertBefore(td , tableCell);
	newCell.rowSpan = tableCell.rowSpan;
	newCell.innerHTML = "&nbsp;";
	ktml.utils_setInvisibles(!ktml.viewinvisibles);

	if (ktml.undo) {
		ktml.undo.addEdit();
	}

}

function removeCell(ktml) {
	var tableCell = getObjectParentTag("td", ktml.edit.selection.createRange().parentElement());
	if (!tableCell)
		 return;
	// can't remove all cells for a row
	var tds = tableCell.parentElement.getElementsByTagName("TD");
	if (td.length == 1) {
		 alert((KT_js_messages["Table onlycell"]) ? KT_js_messages["Table onlycell"] : "You can't remove the only remaining cell in a row.");
		 return;
	}
	tableCell.parentNode.removeChild(tableCell);
	tableCell = null;
	if (ktml.undo) {
		ktml.undo.addEdit();
	}

}

function addCell(ktml) {
	var tableCell = getObjectParentTag("td", ktml.edit.selection.createRange().parentElement());
	if (!tableCell)
		 return;

//	var tds = tableCell.parentElement.getElementsByTagName("TD");
	var td = ktml.edit.createElement("TD");
	var parentElement=tableCell.parentNode;
	while(parentElement.tagName!="TABLE"){
		parentElement = parentElement.parentNode;
	}
	var tableBorder = parentElement.getAttribute("border");
	if(tableBorder && parseInt(tableBorder+"")==0){
		ktml.utils_makeOutline(td);
	}
	tableCell.parentElement.insertBefore(td, tableCell.nextSibling);
	ktml.cw.focus();
	if (ktml.undo) {
		ktml.undo.addEdit();
	}

}

function processRow(action, ktml, where) {
	var tableCell = getObjectParentTag("td", ktml.edit.selection.createRange().parentElement());
	if (!tableCell)
		return;
	// go back to TABLE def and keep track of cell index
	var idx = 0;
	var rowidx = -1;
	var tr = startRow = tableCell.parentNode;
	// count number of TD children
	var numcells = tr.cells.length;
	while (tr) {
		if (tr.tagName == "TR")
			rowidx++;
		tr = tr.previousSibling;
	}
	// now we should have a row index indicating where the
	// row should be added / removed
	var tbl = getObjectParentTag("table", tableCell);
	if (!tbl) {
		 alert("Could not " + action + " row.");
		 return;
	}

	var tableBorder = tbl.getAttribute("border");

	if (action == "add") {
		if((where+"")=="after"){
			rowidx=rowidx+1;
		}
		var r = tbl.insertRow(rowidx);
		for (var i = 0; i < numcells; i++) {
			var td = ktml.edit.createElement("TD");
			td.innerHTML = '&nbsp;';
			if(tableBorder && parseInt(tableBorder+"")==0){
				ktml.utils_makeOutline(td);
			}

			var c = r.appendChild(td);
			if (startRow.cells[i].colSpan>1){
				c.colSpan = startRow.cells[i].colSpan;
			}else if(startRow.cells[i].rowSpan>1){
				if((where+"")=="after"){
					startRow.cells[i].rowSpan++;
					numcells--;
				}else{
					startRow.cells[i].rowSpan++;
				}
			}
		}
	} else {
		tbl.deleteRow(rowidx);
		tableCell = null;
	}

	ktml.cw.focus();
	if (ktml.undo) {
		ktml.undo.addEdit();
	}
}

function processColumn(action, ktml) {
	var tableCell = getObjectParentTag("td", ktml.edit.selection.createRange().parentElement());
	if (!tableCell)
		return;
	// store cell index in a var because the cell will be
	// deleted when processing the first row
	var cellidx = tableCell.cellIndex;
	var tbl = getObjectParentTag("table", tableCell);
	if (!tbl) {
		 alert("Could not " + action + " column.");
		 return;
	}
	// now we have the table containing the cell
	__addOrRemoveCols(tbl, cellidx, action, ktml);

	ktml.cw.focus();
	if (ktml.undo) {
		ktml.undo.addEdit();
	}
}

function __addOrRemoveCols(tbl, cellidx, action, ktml) {
	if (!tbl.childNodes.length)
		 return;
	var table = getObjectParentTag("table", tbl);
	var tableBorder = table.getAttribute("border");

	var i;
	//alert(tbl.rows.length);
	for (i = 0; i < tbl.rows.length; i++) {
	 	var trul = tbl.rows[i]
		var cell = trul.cells[cellidx];
		if (!cell){
					 break; // can't add cell after cell that doesn't exist
		}
				if (action == "add") {
					var td = ktml.edit.createElement("TD");
			if(tableBorder && parseInt(tableBorder+"")==0){
				ktml.utils_makeOutline(td);
			}
					td.innerHTML = '&nbsp;';
			if(typeof where=="undefined"){
					cell.parentNode.insertBefore(td, cell);
				} else {
				if(cellidx==trul.cells.length-1){
					//add after last cell
					trul.appendChild(td);
				}else{
					//insert before last cell
					var cell = trul.cells[cellidx+1];
					trul.insertBefore(td, cell);
				}
			}
		} else {
					 // don't delete too many cells because or a rowspan setting
					 if (cell.rowSpan > 1) {
							i += (cell.rowSpan - 1);
					 }
					 cell.parentNode.removeChild(cell);
				}
	}

}

/*----------------------------------------*/

function ui_openAboutBox() {
	util_openwnd("_about",NEXT_ROOT+"includes/ktedit/popups/about.html", 400, 250, true);
}

function util_openwnd(u,n,w,h, x) {
	var top, left, top, features;
	left = (screen.width - w) / 2;
	top = (screen.height - h) / 2;
	features = ",left="+left+",top="+top;
	winargs="width="+w+",height="+h+",resizable=no,scrollbars=no,status=0";
	dialogargs = "scrollbars=no,center=yes;dialogHeight="+h+"px;dialogWidth="+w+"px;help=no;status=no;resizable=no";
	if (n.indexOf("?") != -1) {
		n += "&";
	} else {
		n += "?";
	}
	n +="rand="+Math.random().toString().substring(3);
	//alert(n)
	if (window.showModalDialog && !x) {
	//if (window.showModalDialog && 0) {
		//alert("opening modal:\n" + n);
		remote=window.showModelessDialog(n, window, dialogargs + features);
		if (n.match(/dirbrowser/)) {
			window._dlg_ = remote;
		}
	} else {
		var newLocation;
		newLocation = window.location + '';
		newLocation = newLocation.replace(/\/[^\/]*$/, '');
		if(n.indexOf('./') == 0) {
			newLocation += n.replace(/^\./, '');
		} else if (n.indexOf('http://') == 0 || n.indexOf('https://') == 0) {
			newLocation = n;
		} else {
			newLocation += '/' + n;
		}
		remote=window.open(newLocation, u, winargs + features);
		remote.focus();
	}

  if (remote != null) {
    if (remote.opener == null)
      remote.opener = self;
  }
  return remote;
}

function logic_submitKTMLS() {
	for ( var i = 0; i < ktmls.length ; i++) {
		if (ktmls[i].viewinvisibles == true) {
			ktmls[i].logic_toggleInvisibles();
		}
		if(ktmls[i].displayMode == 'RICH') {
			if(ktmls[i].saveXHTML == 'yes') {
				//fStart=new Date();
				document.getElementById(ktmls[i].name).value = hndlr_save(get_docXHTML(ktmls[i].edit));
				//document.getElementById(ktmls[i].name).value = hndlr_load("", "XHTML", ktmls[i].edit.body);
			} else {
				document.getElementById(ktmls[i].name).value = hndlr_save(ktmls[i].edit.body.innerHTML);
			}
		} else {
			document.getElementById(ktmls[i].name).value = hndlr_save(ktmls[i].textarea.value);
		}
	}
	return true;
}

function get_docXHTML(doc) {
	var toReturn = innerXHTML(doc, doc.body, new RegExp("contenteditable"));
	return toReturn;
}

function innerXHTMLAttributes(el, ignore) {
	var str = '';
	for (var i = 0; i < el.attributes.length; i++) {
		var attr = el.attributes[i];

		// ignore unset reported and not specified attributes
		if (attr.specified && attr.nodeValue && (!ignore || attr.nodeName.toLowerCase().search(ignore) == -1)) {
			if (typeof(attr.nodeValue) == "string" ) {
				if (str.length) str += ' ';
				str += attr.nodeName.toLowerCase(); //lower
				str += '="' + (attr.nodeValue).replace(/[\"]/g, "&quot;") + '"'; //put between quotes, escape quote
			} else if(typeof(attr.nodeValue) == "number") {
				if (str.length) str += ' ';
				str += attr.nodeName.toLowerCase(); //lower
				str += '="' + attr.nodeValue + '"';
			}
		}
	}
	return str;
}

/**
* Construct the innerHTML for a node in a browser independent way
*/
function innerXHTML(doc, el, ignore) {
	var str = '', i=0;
	for(; i<el.childNodes.length; i++) {
		if(el.childNodes[i].parentNode.nodeName != el.nodeName) {
			// bug in IE: in case html is broke the DOM is not constructed correctly
			continue;
		}
		if(el.childNodes[i].nodeType == TEXT_NODE) {
			str += el.childNodes[i].nodeValue.replace(RG_AMP, "&amp;").replace(RG_LT, "&lt;").replace(RG_GT, "&gt;").replace(RG_QUOTE, "&quot;").replace(RG_SPACE, "&nbsp;");
		} else if(el.childNodes[i].nodeType == COMMENT_NODE) {
			str += '<!--' + el.childNodes[i].nodeValue + '-->';
		} else {
			str += outerXHTML(doc, el.childNodes[i], ignore);
		}
	}

	if (i==0) {
		try {
		if (el.nodeName.toLowerCase() == 'p') {
			str = '&nbsp;';
		}
		} catch(e) {
		}
	}

	return str;
}

inside_a_p = false;

function outerXHTML(doc, el, ignore) {
	var cached_inside_a_p = inside_a_p;
	var tagName = el.nodeName.toLowerCase();

	if (tagName == 'td') {
		// allow P tags inside TDs that are inside Ps.
		inside_a_p = false;
	}
	if (tagName == 'p') {
		// set the inside_a_p flag if the current tag is a P
		inside_a_p = true;
	}

	//alert(tagName + "\n" + cached_inside_a_p + "\n" + inside_a_p + "\n" + el.innerHTML);
	var attrs = innerXHTMLAttributes(el, ignore);
	var inner = innerXHTML(doc, el, ignore);

	if(!tagName.match(stripTagReg) || inner != '') {
		if (tagName == 'p' && cached_inside_a_p) {
			// if we are in a P that is in a P
			if (inner == '&nbsp;') {
				inner = '';
			}
		} else {
			if (!tagName.match(/^\//)) {
				inner = '<' + tagName + (attrs.length ? ' ' + attrs : '') + (!tagName.match(tagsWithoutContentReg) ? '>' + inner + '</' + tagName + '>' : '/>');
				if (tagName.match(newLineAfterTagsReg)) {
					inner += "\n";
				}
			}
		}
	}

	if (tagName == 'p') {
		// restore
		inside_a_p = cached_inside_a_p;
	}

	return inner;
}

function util_inArray(arr, item) {
	var is = false;
	var ix = 0;
	while(!is && ix < arr.length) {
		is = (arr[ix] == item);
		ix++;
	}
	return is;
}

function util_Transform(html) {
	//var html = doc.innerHTML;
	//if (html) html = replaceCharacters(html);
	//if (html) html = util_replaceAbsoluteUrls(html);
	//if (html) html = util_remEmptyTags(html)
	//if (html) html = util_replaceTags([["strong","B"],["em","I"]],html);
	return html;
}

function util_remEmptyTags() {
	var html = activeActiveX.contentWindow.document.body.innerHTML;
	var re = /<[^(>|\/|tr|td)]+>[ |	]*<\/[^>]+>/gi;
	while(re.test(html)) {
		html = html.replace(re,"");
		while(re.test(html)) {
			html = html.replace(re,"");
		}
	}
	return html;
}

function util_replaceAbsoluteUrls(html) {
	var docLoc = document.location.toString();
	docLoc = docLoc.substring(0,docLoc.lastIndexOf("/")+1);
	docLoc = docLoc.replace(/\//gi,"\\\/");
	var re = eval("/"+docLoc+"/gi");
	return html.replace(re, "");
}
// set= [["strong", "b"], ["em", "i"]]
function util_replaceTags(set, html) {
	var re;
	for(var i = 0; i < set.length; i++) {
		re = eval("/(<[\/]{0,1})"+set[i][0]+">/gi");
		html=html.replace(re,"$1"+set[i][1]+">");
	}
	return html;
}

function util_ccParser(html) {
//	html = html.replace(/@/gi,"_AT_");
//	html = html.replace(/#/gi,"_DZ_");
//
	var htmltag = /(&lt;[\w\/]+[ ]*[\w\=\"\'\.\/\;\: \)\(-]*&gt;)/gi;
//	html = html.replace(htmltag,"<span class=ccp_tag>$1</span>");
//	html = html.replace(htmltag,"<span style='color:#0000CC'>$1</span>");
	return html;
}
function sg(a,a2,a3) {
	var r='';
	while (a.indexOf(a2)!=-1) {
		var v1=a.indexOf(a2);
		r+=a.substring(0,v1)+a3;
		a=a.substring(v1+a2.length);
	}
	return r+a;
}

function toSafeString(a) {
//	a = sg(a,'\\','\\\\'); // Backslash backslashes.
//	a = sg(a,'\n','\\n');  // Backslash newlines (Unix, Windows, DOS).
//	a = sg(a,'\r','\\r');  // Backslash newlines (Macintosh).
//	a = sg(a,'\t','\\t');  // Backslash tabs.
//	a = sg(a,'"','\\"');   // Backslash double quotes.
	a = sg(a,'\'','\\\'');
	//return '"' + a + '"';  // Return quoted string.
	return a; //Return nonquoted String
}

function util_srchString(htmlEl, attrMask) {
	var toRet = new String("|");
	for ( var j = 0; j < htmlEl.attributes.length; j++) {
		var attr = htmlEl.attributes[j];
		if (attr.nodeValue && typeof(attr.nodeValue) == "string") {
			if (attr.nodeName.toLowerCase().search(attrMask) >= 0) {
				toRet+= attr.nodeValue+"|";
			}
		}
	}
	for (var i = 0; i< htmlEl.children.length; i++) {
		toRet+=util_srchString(htmlEl.children[i], attrMask);
	}
	return toRet;
}

function util_modAttr(htmlEl, tagNames, attrMask, attrValue) {
	var toRet = new String("|");
	if (htmlEl.nodeType == ELEMENT_NODE) {
		if (tagNames.join().indexOf(htmlEl.tagName.toLowerCase()+",") > 0) {
			htmlEl.setAttribute(attrMask, attrValue);
		}
	} else if (htmlEl.nodeType == TEXT_NODE) {
		return;
	}
	if (htmlEl.nodeType == ELEMENT_NODE) {
		if (tagNames.join().indexOf(htmlEl.tagName.toLowerCase()+",") > 0) { //is a div or a p , operate only on the children
			if (htmlEl.children.length > 0) {
				for (var i = 0; i< htmlEl.children.length; i++) {
					util_modAttr(htmlEl.children[i], tagNames, attrMask, attrValue);
				}
			} else {
				return;
			}
		} else { //is not a div, p operate on the TextNodes also
			if (htmlEl.childNodes.length > 0) {
				var txtNodes = new Array();
				var htmlNodes = new Array();
				for (var i = 0; i< htmlEl.childNodes.length; i++) {
					if (htmlEl.childNodes[i].nodeType == 3) {//TextNode
						txtNodes[txtNodes.length] = htmlEl.childNodes[i];
					} else {
						htmlNodes[htmlNodes.length] = htmlEl.childNodes[i];
					}
				}
				for (var j = 0; j<txtNodes.length; j++) {
					var tmpstr = txtNodes[j].data;
					if (tmpstr != "" && tmpstr != "&nbsp;") {
						var dv = activeActiveX.document.createElement("DIV");
						dv.align = "justify";
						dv.innerHTML = tmpstr;
						htmlEl.insertBefore(dv, txtNodes[j]);
					}
				}
				for ( var j = 0; j< htmlEl.childNodes.length; j++) {
					if (htmlEl.childNodes[j].nodeType == 3) {
						htmlEl.childNodes[j].removeNode();
					}
				}
				for ( var j = 0; j< htmlNodes.length; j++) {
					util_modAttr(htmlNodes[j], tagNames, attrMask, attrValue);
				}
			} else {
				return;
			}
		}
	}
	return;
}

function util_fix4NS(instr){
	var re  = /STYLE=\"WIDTH\s*:\s*(\d+)px;\s*HEIGHT:\s*(\d+)px;*\s*\"/gi;
        var re1 = /<A\s+href=".*?"\s*>\s*<\/A>/gi; // for taking out blank links
        instr=instr.replace(re1, "");
	return(instr.replace(re, "width=$1 height=$2"));
}

function util_cleanHTMLContent(tmp) {
      tmp = tmp.replace(/<\?xml:.*?>/ig, "");

      tmp = tmp.replace(/<H[0-9]+\s?([^>]*)>/ig, "<p $1>");
      tmp = tmp.replace(/<\/H[0-9]+>/ig, "</p>");

      tmp = tmp.replace(/<TT([^>]*)>/ig, "<p $1>");
      tmp = tmp.replace(/<\/TT>/ig, "</p>");

      tmp = tmp.replace(/<\/?font[^>]*>/ig, "");
      tmp = tmp.replace(/<\/?span[^>]*>/ig, "");
      tmp = tmp.replace(/<\/?a[^>]*>/ig, "");
      tmp = tmp.replace(/<\/?\w+:\w+[^>]*>/ig, "");

      tmp = tmp.replace(/<p\s*[^>]*>/ig, "<p>");
	tmp = tmp.replace(/<\/p>/ig, "</p>");

			tmp = tmp.replace(/\sclass=Mso\w*?\s/ig, " ");

      tmp = tmp.replace(/(style="[^"]*)TEXT-ALIGN:\s?([a-z]*)([^"]*")/ig, "align=$2 $1$3");
      tmp = tmp.replace(/(style="[^"]*)BACKGROUND:\s?([a-z0-9#]*)([^"]*")/ig, "bgcolor=$2 $1$3");

			tmp = tmp.replace(/\s(?:lang|style|class)\s*=\s*"[^"]*"/ig, " ");
      tmp = tmp.replace(/\s(?:lang|style|class)\s*=\s*'[^']*'/ig, " ");
      tmp = tmp.replace(/\s(?:lang|style|class)\s*=\s*[^\s>]*/ig, " ");

      tmp = tmp.replace(/(<\/?)dir>/ig, "$1blockquote>");

      tmp = tmp.replace(/(<td[^>]*>)\s*<p>([^<>]*)<\/p>\s*<\/td>/ig, "$1$2</td>");

			tmp2 = tmp.replace(String.fromCharCode(8216), "'").replace(String.fromCharCode(8217), "'").replace(String.fromCharCode(8220), '"').replace(String.fromCharCode(8217), '"').replace(String.fromCharCode(8211), "-");

      return tmp2;
}

if (Ktml_mozilla) {
function util_insertTextSel(win, insertText) {
	// get current selection
	var sel = win.selection;
	// get the first range of the selection
	// (there's almost always only one range)
	var range = sel.getRangeAt(0);
	// deselect everything
	sel.removeAllRanges();
	// remove content of current selection from document
	range.deleteContents();
	// get location of current selection
	var container = range.startContainer;
	var pos = range.startOffset;
	// make a new range for the new selection
	//range=sel.createRange();

	var afterNode;
	if (container.nodeType==TEXT_NODE) {
		// when inserting into a textnode
		// we create 2 new textnodes
		// and put the insertNode in between
		var textNode = container;
		container = textNode.parentNode;
		var text = textNode.nodeValue;
		// text before the split
		var textBefore = text.substr(0,pos);
		// text after the split
		var textAfter = text.substr(pos);
		var beforeNode = document.createTextNode(textBefore);
		var afterNode = document.createTextNode(textAfter);

		// insert the 3 new nodes before the old one
		container.insertBefore(afterNode, textNode);
		container.insertBefore(beforeNode, afterNode);
		// remove the old node
		container.removeChild(textNode);
		// now create the html fragment
		var div = document.createElement('div');
		div.innerHTML = insertText;
		var kids = div.childNodes;
		for (var i = kids.length-1; i >= 0; i--) {
			container.insertBefore(kids[i], afterNode);
		}

	} else {
		// else simply insert the node
		afterNode = container.childNodes[pos];
		afterNode.outerHTML = insertText + afterNode.outerHTML;
	}
	range.collapse(false);
	sel.addRange(range);
}
}

/**
* inserts a node in selection
*
* @param
*		win - ktml.edit
*		insertNode - node to be inserted
*/
if (Ktml_mozilla) {
function util_insertNodeSel(win, insertNode) {
	// get current selection
	var sel = win.selection;
	// get the first range of the selection
	// (there's almost always only one range)
	var range = sel.getRangeAt(0);
	// deselect everything
	sel.removeAllRanges();
	// remove content of current selection from document
	range.deleteContents();
	// get location of current selection
	var container = range.startContainer;
	var pos = range.startOffset;
	// make a new range for the new selection
	//range=sel.createRange();
	if (container.nodeType==TEXT_NODE && insertNode.nodeType==TEXT_NODE) {
		container.insertData(pos, insertNode.nodeValue);// if we insert text in a textnode, do optimized insertion
		range.setEnd(container, pos+insertNode.length); // put cursor after inserted text
		range.setStart(container, pos+insertNode.length);
	} else {
		var afterNode;
		if (container.nodeType==TEXT_NODE) {
			// when inserting into a textnode
			// we create 2 new textnodes
			// and put the insertNode in between
			var textNode = container;
			container = textNode.parentNode;
			var text = textNode.nodeValue;
			// text before the split
			var textBefore = text.substr(0,pos);
			// text after the split
			var textAfter = text.substr(pos);
			var beforeNode = document.createTextNode(textBefore);
			var afterNode = document.createTextNode(textAfter);
			// insert the 3 new nodes before the old one
			container.insertBefore(afterNode, textNode);
			container.insertBefore(insertNode, afterNode);
			container.insertBefore(beforeNode, insertNode);
			// remove the old node
			container.removeChild(textNode);
		} else {
			// else simply insert the node
			afterNode = container.childNodes[pos];
			container.insertBefore(insertNode, afterNode);
		}
		range.selectNode(insertNode);
		range.collapse(false);
		//range.setStart(afterNode, 0);
	}
	sel.addRange(range);
}
}
if (Ktml_ie) {
function util_insertNodeSel(win, insertNode) {
	if (win.selection.type =='Text' || win.selection.type =="None" ) {
		var tr = win.selection.createRange();
		tr.pasteHTML(insertNode.outerHTML);
		return tr.parentElement();
	} else {
		var ctrlRange = win.selection.createRange(); //the text that is selected
		var tmpel = ctrlRange.commonParentElement();
		tmpel.outerHTML = insertNode.outerHTML;
		return tmpel;
		//return tmpel.parentNode.insertBefore(insertNode, tmpel);
	}
}
}


function getObjectParentTag (tname, startel) {
    found = false; error = false;
    toret = null;
    do {
        if (startel.tagName.toLowerCase() == tname) {
            found = true;
            toret = startel;
        }
        if (startel.tagName.toLowerCase() == "body" || !startel.parentElement || startel == null) {
			error = true;
		}
		if (found || error) {
			break;
		}
		startel = startel.parentElement;
	} while (1);
	return toret;
}

function hndlr_buttonMouseDown(src) {
	if(src.state==0) return;
	if(src.getAttribute("kttype")=="btn") {
		src.className="toolbaritem_inset";
	}
	return true;
}

function hndlr_buttonMouseUp(src) {
	if(src.state==0) return;
	if(src.state==2) { src.className="toolbaritem_latched"; return; }
	if(src.getAttribute("kttype")=="btn") {
		src.className="toolbaritem_outset";
	}
	return true;
}

function hndlr_buttonMouseOver(src) {
	if(src.state==0) {
		return;
	}
	//if(src.state==2) return;
	if(src.getAttribute("kttype")=="btn") {
		src.className="toolbaritem_outset";
	}
}

function hndlr_buttonMouseOut(src) {
	if(src.state==0) return;
	if(src.state==2) {
		src.className="toolbaritem_latched"; return;
	}
	if(src.getAttribute("kttype")=="btn") {
		src.className="toolbaritem_flat";
	}
}

var orig_window_location = ""; //path to ktml script includer
var orig_short_location = ""; // http://www.mysite.com
var orig_blank_raw_location = ""; // /site/ktmlpro/includes/ktedit/
var orig_blank_location = ""; // /site/ktmlpro/includes/ktedit/

function hndlr_load (str, mode) {
	str = str.replace(/<span badword=[^>]*>([^<]+)<\/span>/gi, '$1');
	//str = str.replace(/(<[^\/][^>]*>)/gi, "\r\n$1");
	//str = str.replace(/(<\/[^>]*>)/gi, "$1\r\n");
	str = util_removeURLfromHref(str);
	return str;
}

function getNodeAttributes(el) {
	var str = '';
	var zz=null

	if(useAcceptedAttributesList){
		for (var i = 0; i < acceptedAttributesArray.length; i++) {
			var attr = el.attributes.getNamedItem(acceptedAttributesArray[i]);
			// ignore unset reported and not specified attributes
			var attr_name = attr && attr.nodeName.toLowerCase();
			if (attr && (attr.specified || (el.tagName == 'A' && attr_name == 'name' || el.tagName == 'AREA' && (attr_name == 'shape' || attr_name == 'coords'))) && (attr.nodeValue || attr_name=="style") ) {
				if (typeof(attr.nodeValue) == "string" && !attr.nodeValue.match(/_moz/i) ) {
					str += ' ' + attr.nodeName.toLowerCase(); 
					str += '="' + (attr.nodeValue).replace(/[\"]/g, "&quot;") + '"'; //put between quotes, escape quote

				} else if(typeof(attr.nodeValue) == "number") {
					str += ' ' + attr.nodeName.toLowerCase();
					str += '="' + attr.nodeValue + '"';
				}else if(attr.nodeName.toLowerCase()=="style" && el.style.cssText !=""){
					str += ' style="' + el.style.cssText.replace(/[\"]/g, "&quot;") + '"'
				}
			}
		}
	}else{
		for (var i = 0; i < el.attributes.length; i++) {
			var attr = el.attributes[i];
			// ignore unset reported and not specified attributes
			if (attr.specified && attr.nodeValue && (attr.nodeName!="badword")) {
				if(Ktml_mozilla && (attr.nodeName.match(/_moz/i) || attr.nodeValue.match(/_moz/i))) {
					continue;
				}
				if (typeof(attr.nodeValue) == "string" ) {
					str += ' ' + attr.nodeName.toLowerCase();
					str += '="' + (attr.nodeValue).replace(/[\"]/g, "&quot;") + '"'; //put between quotes, escape quote
				} else if(typeof(attr.nodeValue) == "number") {
					str += ' ' + attr.nodeName.toLowerCase(); //lower
					str += '="' + attr.nodeValue + '"';
				}
			}
		}
	}
	return str;
}

//put newline before end tag only when previous tag didnt put a newline
var formattingTags = {
"table":{
	"NLBeforeStartTag":false,
	"NLAfterStartTag":true,
	"NLBeforeEndTag":false,
	"NLAfterEndTag":true,
	"indent":false,
	"SelectContent":false
	},
"tbody":{
	"NLBeforeStartTag":false,
	"NLAfterStartTag":true,
	"NLBeforeEndTag":true,
	"NLAfterEndTag":true,
	"indent":false,
	"SelectContent":false
	},
"tr":{
	"NLBeforeStartTag":false,
	"NLAfterStartTag":true,
	"NLBeforeEndTag":true,
	"NLAfterEndTag":true,
	"indent":true,
	"SelectContent":false
	},
"td":{
	"NLBeforeStartTag":false,
	"NLAfterStartTag":false,
	"NLBeforeEndTag":false,
	"NLAfterEndTag":true,
	"indent":true,
	"SelectContent":true
	},
"ol":{
	"NLBeforeStartTag":false,
	"NLAfterStartTag":true,
	"NLBeforeEndTag":true,
	"NLAfterEndTag":true,
	"indent":false,
	"SelectContent":false
	},
"ul":{
	"NLBeforeStartTag":false,
	"NLAfterStartTag":true,
	"NLBeforeEndTag":true,
	"NLAfterEndTag":true,
	"indent":false,
	"SelectContent":false
	},
"li":{
	"NLBeforeStartTag":false,
	"NLAfterStartTag":false,
	"NLBeforeEndTag":false,
	"NLAfterEndTag":true,
	"indent":true,
	"SelectContent":true
	},
"p":{
	"NLBeforeStartTag":false,
	"NLAfterStartTag":false,
	"NLBeforeEndTag":false,
	"NLAfterEndTag":true,
	"indent":false,
	"SelectContent":true
	}
};

function sourceFormattingObject(ktmlCounter, mode, indentChar){
	this.owner = ktmls[ktmlCounter];
	this.lastNode = null;
	this.mode=mode;
	this.indentChar = indentChar;

	for(var tagName in formattingTags){
		this.addTag(formattingTags[tagName], tagName);
	}
}

function sourceFormattingObject_format(mode, indentChar){
	var str = "";
	inside_a_p_2 = false;
	if(typeof mode!="undefined"){
		this.mode = mode;
		if(typeof indentChar!="undefined"){
			this.indentChar = indentChar;
		}
	}
	this.checkpoints = null;
	this.formattedSource = "";
	this.selectionStart = 0;
	this.selectionEnd = 0;
	this.length = 0;
	this.nlafterendtag = "\r\n";
	this.newLines = 0;
	this.formatDateStart=new Date();

	if(this.mode=="CODE"){
		str = this.getNodeContentSource();
		this.flush();
	}else if(mode=="XHTML"){
		str = util_FormatSourceDOM(znod, selNode, null);//formattingIndentChar);
	}

	return str;
}

function sourceFormattingObject_getNodeContentSource(el, deep) {
	var str = "";
	var txtContent = "";
	if(typeof el=="undefined"){
		el=this.owner.edit.body;
	}
	if(typeof deep=="undefined"){
		deep=0;
	}
	if(el.tagName=="TD" && (el.innerHTML=="&nbsp;" || el.innerHTML==" ") ){
		str += this.add("&nbsp;");
	}else{
		var i=0;
		for(; i<el.childNodes.length; i++) {
			if(el.childNodes[i].parentNode.nodeName != el.nodeName) {
				// bug in IE: in case html is broke the DOM is not constructed correctly
				//alert("BUG IE");
				continue;
			}
			if(el.childNodes[i].nodeType == TEXT_NODE) {
				if(Ktml_mozilla && el.nodeName.toLowerCase().match(canContainOnlyTagsTagsReg)){
					//strip textnodes inside tags that cannot contain text (TR,UL,OL,TABLE,TBODY,TFOOT,THEAD,SELECT)
					//MOZZ
					continue;
				}

				txtContent = el.childNodes[i].nodeValue.replace(RG_AMP, "&amp;").replace(RG_LT, "&lt;").replace(RG_GT, "&gt;").replace(RG_QUOTE, "&quot;").replace(RG_SPACE, '&nbsp;');
				//alert(txtContent.charCodeAt(0));
				str += this.add(txtContent);
			} else if(el.childNodes[i].nodeType == COMMENT_NODE) {
				str += this.add('<!--' + el.childNodes[i].nodeValue + '-->');
			} else {
				var z = this.getNodeSource(el.childNodes[i], deep);
				//alert(z);
				if(z==null){
					return null;
				}
				str += z;
			}
		}
		if (i==0) {
			try {
			if (el.nodeName.toLowerCase() == 'p') {
				str += this.add('&nbsp;');
			}
			}catch(e) {
			}
		}
	}
	if((new Date()-this.formatDateStart) > maxFormattingExecutionTime){
		return null;
	}else{
		return str;
	}
}


function sourceFormattingObject_addTag(tagName, bst, ast, bet, aet, indent, sc){
	if(typeof tagName=="object"){
		this[bst] = tagName;
	}else{
		this[tagName] = {
			"NLBeforeStartTag":bst,
			"NLAfterStartTag":ast,
			"NLBeforeEndTag":bet,
			"NLAfterEndTag":aet,
			"indent":indent,
			"SelectContent":sc
		};
	}
}

inside_a_p_2 = false;

function sourceFormattingObject_getNodeSource(el, deep) {
	var cached_inside_a_p = inside_a_p_2;
	var selNode = this.owner.selectedNode;
	var indentChar = this.indentChar;
	if(typeof el=="undefined"){
		el=this.owner.edit.body;
	}

	if(typeof deep=="undefined"){
		deep=0;
	}

	var nl="\r\n";
	var beforeStartTag = "";
	var beforeEndTag = "";
	var afterStartTag = "";
	var afterEndTag = "";
	var indent = false;
	var indentHowMuch = 0;
	var indentHowMuch2=0;
	var foundSelection = false;
	var SELECT_TAG_CONTENT = 0;
	var tagDesc = null;
	var prevTagDesc = null;
	var tagName = el.tagName.toLowerCase();
	if (tagName.match(/^\//)) {
		return "";
	}

	if (tagName == 'td') {
		// allow P tags inside TDs that are inside Ps.
		inside_a_p_2 = false;
	}
	if (tagName == 'p') {
		// set the inside_a_p flag if the current tag is a P
		inside_a_p_2 = true;
	}

	if(this[tagName]){
		//NLBeforeStartTag,NLAfterStartTag,NLBeforeEndTag,NLAfterEndTag,indent,SelectContent
		tagDesc = this[tagName];
	}
	if(this.prevTag && this[this.prevTag.tagName.toLowerCase()]){
		prevTagDesc = this[this.prevTag.tagName.toLowerCase()];
	}

	if(el==this.owner.selectedNode){
		foundSelection = true;
	}
	if(tagDesc && indentChar!=null){
		var parTagName = el.parentElement.tagName.toLowerCase();
		beforeStartTag += (parTagName.match(canContainOnlyTagsTagsReg)?nIndents(deep+(tagDesc.indent || !tagDesc.ident && parTagName.match(canContainOnlyTagsTagsReg) && tagName==parTagName?1:0), indentChar):(tagName=="p" && Ktml_ie && this.prevTag && this.prevTag.tagName.toLowerCase()=="p"?nIndents(deep, indentChar):""));
		afterStartTag += tagDesc.NLAfterStartTag?nl:"";
		beforeEndTag += (tagDesc.NLBeforeEndTag?(this.nlafterendtag==nl?"":nl):"") + (tagName.match(canContainOnlyTagsTagsReg)?nIndents(deep+(tagDesc.indent || !tagDesc.ident && parTagName.match(canContainOnlyTagsTagsReg) && tagName==parTagName?1:0), indentChar):"");
		afterEndTag += tagDesc.NLAfterEndTag?(tagName=="p" && Ktml_ie || parTagName=="body" || parTagName!="body" && parTagName.match(canContainOnlyTagsTagsReg)?nl:""):"";
		this.nlafterendtag = tagDesc.NLAfterEndTag?nl:"";
		indentHowMuch += tagDesc.indent?1:0;
		indentHowMuch2 += !tagDesc.indent && parTagName.match(canContainOnlyTagsTagsReg) && tagName==parTagName?1:0;
		SELECT_TAG_CONTENT += tagDesc.SelectContent?1:0;
	}
	SELECT_TAG_CONTENT += tagName.match(tagsWithoutContentReg)?0:1;
	var str = "";
	var attrs = getNodeAttributes(el);

	this.prevTag = el;
	this.checkPoint();


	str += this.add(beforeStartTag);
	if(SELECT_TAG_CONTENT==0 && foundSelection){
		this.selectionStart = this.length-this.newLines;
	}

	if (tagName != 'p' || !cached_inside_a_p) {
		str += this.add('<' + tagName + attrs);
	}

	if(tagName.match(tagsWithoutContentReg)){
		if (tagName != 'p' || !cached_inside_a_p) {
			str += this.add('/>');
		}
		if(foundSelection){
			this.selectionEnd = this.length-this.newLines;
		}
	}else{
		if (tagName != 'p' || !cached_inside_a_p) {
			str += this.add('>');
		}
		str += this.add(afterStartTag);
		if(SELECT_TAG_CONTENT>0 && foundSelection){
			this.selectionStart = this.selectionEnd = this.length-this.newLines;
		}
		var inner = this.getNodeContentSource(el, deep+indentHowMuch+indentHowMuch2);
		if(inner == null){
			return null;
		}
		if(tagName.match(stripTagReg) && inner == ""){
			this.rollback();
			return "";
		}
		str += inner;

		if(SELECT_TAG_CONTENT>0 && foundSelection){
			this.selectionEnd = this.length-this.newLines;
		}
		str += this.add(beforeEndTag);
		if (tagName != 'p' || !cached_inside_a_p) {
			str += this.add('</' + tagName + '>');
		}

		if(SELECT_TAG_CONTENT==0 && foundSelection){
			this.selectionEnd = this.length-this.newLines;
		}
	}
	str += this.add(afterEndTag);

	if (tagName == 'p') {
		// restore
		inside_a_p_2 = cached_inside_a_p;
	}

	this.commit();

	if((new Date()-this.formatDateStart) > maxFormattingExecutionTime){
		return null;
	}else{
		return str;
	}
}

function sourceFormattingObject_checkPoint(){
	this.checkpoints=this.formattedSource.length;
}

function sourceFormattingObject_rollback(){
	if(this.selectionStart>this.checkpoints){
		this.selectionStart = this.selectionStart -(this.formattedSource.length-this.checkpoints);
		this.selectionEnd = this.selectionStart;
	}

	this.length = this.checkpoints;
	this.formattedSource = this.formattedSource.substring(0, this.checkpoints);
	this.checkpoints = null;
}

function sourceFormattingObject_commit(){
	var howMuch = this.checkpoints;
	if(howMuch){
		var toPaint = this.formattedSource.substring(0, howMuch);
		this.owner.textarea.value += util_removeURLfromHref(toPaint);
		//this.lastPaint.push(toPaint);
		//window.setTimeout("async_paint("+this.owner.pageId+")",1000);
		this.formattedSource = this.formattedSource.substring(howMuch);
		this.checkpoints = null;
	}
}
/*
function async_paint(ktmlCounter){
	var ktmlObject = ktmls[ktmlCounter];
	ktmlObject.textarea.value += util_removeURLfromHref(ktmlObject.sourceCodeFormatter.lastPaint.splice(0,1));
}
*/
function sourceFormattingObject_flush(){
	this.owner.textarea.value += util_removeURLfromHref(this.formattedSource);
	this.formattedSource = "";
	this.checkpoints = null;
}
function sourceFormattingObject_add(str){
	str = util_removeURLfromHref(str);
	this.length += str.length;
	this.formattedSource += str;
	var m = str.match(/(\r\n)/gi);
	if(m){
		this.newLines += m.length;
	}
	return str;
}

sourceFormattingObject.prototype.addTag = sourceFormattingObject_addTag;
sourceFormattingObject.prototype.getNodeContentSource = sourceFormattingObject_getNodeContentSource;
sourceFormattingObject.prototype.getNodeSource = sourceFormattingObject_getNodeSource;
sourceFormattingObject.prototype.format = sourceFormattingObject_format;
sourceFormattingObject.prototype.flush = sourceFormattingObject_flush;
sourceFormattingObject.prototype.add = sourceFormattingObject_add;

sourceFormattingObject.prototype.checkPoint = sourceFormattingObject_checkPoint;
sourceFormattingObject.prototype.rollback = sourceFormattingObject_rollback;
sourceFormattingObject.prototype.commit = sourceFormattingObject_commit;


function nIndents(n, indentChar){
	var s="";
	for(var i=0; i<n; i++){
		s+=indentChar;
	}
	return s;
}

function util_setGlobalLocationVars() {
	if (orig_window_location == "") {
		orig_window_location = window.location.href;
		orig_short_location  = window.location.href;
		orig_blank_location  = window.location.href;
		var ix = orig_window_location.lastIndexOf("/");
		if(ix != -1) {
			orig_window_location = orig_window_location.substr(0, ix+1);
		}
		ix = orig_short_location.indexOf("/", window.location.protocol.length+2);
		if(ix != -1) {
			orig_short_location = orig_short_location.substr(0, ix);
		}
		
		ix = orig_blank_raw_location.lastIndexOf("/");
		if(ix != -1) {
			orig_blank_location = orig_blank_raw_location.substr(0, ix+1);
		}
		ix = orig_blank_location.indexOf("/", window.location.protocol.length+2);
		if(ix != -1) {
			orig_blank_location = orig_blank_location.substr(ix, orig_blank_location.length -1);
		}
	}
}

function util_removeURLfromHref(href) {
	util_setGlobalLocationVars();

	if(orig_window_location != "") {
		var href_delete_anchor = new RegExp(orig_blank_location + "blank.htm#", "g");
		var href_delete_link = new RegExp(orig_blank_location + "([^#]*)", "g");
		href = href.replace(href_delete_anchor, '#');
		href = href.replace(href_delete_link, '$1');

		//var href_re1 = new RegExp(orig_window_location+"[^\"']*\/blank.htm#", "ig");
		//var href_re2 = new RegExp(orig_window_location+NEXT_ROOT.replace('./', '') + 'includes/ktedit/'+"([^\"']*)#", "ig");
		//var oldhref = href;
		//href = href.replace(href_re1, '#');
		//href = href.replace(href_re2, '$1#');

		if(Ktml_strip) {
			//strips http://www.mysite.com
			href_re = new RegExp('(src|href)=("|\'|)' + orig_short_location, "ig");
			href = href.replace(href_re, '$1=$2');
		} else {
			//still strip http://www.mysite.com for anchor links inside this page
			var href_delete_before_anchor = new RegExp(orig_short_location+'#', "g");
			href = href.replace(href_delete_before_anchor, '#');
		}
    }
    return href;
}

function util_removeURLfromText(href) {
	util_setGlobalLocationVars();

	if(orig_window_location != "") {
		var href_delete_anchor = new RegExp(orig_blank_location + "blank.htm#", "g");
		var href_delete_link = new RegExp(orig_blank_location + "([^#]*)", "g");
		href = href.replace(href_delete_anchor, '#');
		href = href.replace(href_delete_link, '$1');

		//var href_re1 = new RegExp(orig_window_location+"[^\"']*\/blank.htm#", "ig");
		//var href_re2 = new RegExp(orig_window_location+NEXT_ROOT.replace('./', '') + 'includes/ktedit/'+"([^\"']*)#", "ig");
		//var oldhref = href;
		//href = href.replace(href_re1, '#');
		//href = href.replace(href_re2, '$1#');

		if(Ktml_strip) {
			//strips http://www.mysite.com
			href_re = new RegExp(orig_short_location, "ig");
			href = href.replace(href_re, "");
		} else {
			//still strip http://www.mysite.com for anchor links inside this page
			var href_delete_before_anchor = new RegExp(orig_short_location+'#', "g");
			href = href.replace(href_delete_before_anchor, '#');
		}
    }
    return href;
}

function hndlr_save(str) {
	str = util_removeURLfromHref(str);
	return str;
}

function util_setInput(el, vl) {
	if (Ktml_mozilla) {
		el.value = vl;
	} else {
		el.value = vl;
	}
}


function util_checkFld(el, max) {
	var cond = true;
	//
	//if (!el.value.match(/^#[0-9a-fA-F]{6}*$/) && (el.value.match(/^[0-9]*%$/))) {
	if (!el.value.match(/^[0-9]*%?$/)) {
		cond = false;
		text = "Invalid value";
	}
	if ( parseInt(el.value) > max) {
		cond = false;
		text = "Value to big! Must be less then " +  max;
	}
	if (el.value == "") {
	 cond = true;
	}
	if (cond) {
		return true;
	} else {
		el.value = '';
		alert(text);
		return false;
	}
}

if (Ktml_mozilla) {
function util_preventEvent(e) {
	var keycode = e.keyCode;
	if (keycode == 0) {
		keycode = e.charCode;
	}
	if (keycode == 13) {
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
}
function util_preventEvent2(o, e) {
	var keycode = e.keyCode;
	if (keycode == 0) {
		keycode = e.charCode;
	}
	if (keycode == 13) {
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
}
}

if (Ktml_ie) {
	function util_preventEvent(e) {
		if (e.keyCode == 13) {
			return false;
		}
	}
	function util_preventEvent2(o, e) {
		if (e.keyCode == 13) {
			return false;
		}
	}
}

function ktmlAddEvent(oldHandler,newHandler) {
	var me = function () {
		newHandler();
		if (oldHandler) {
			oldHandler();
		}
	}
	return me;
}

var framesLoaded = false;

function util_loadIframe(iframeName, url) {
	if ( window.frames[iframeName] ) {
		var loc = window.location;
		var docLoc = loc.protocol+"//"+loc.host+loc.pathname.replace(/[^\/]*$/, "");
		if (!url.match(/https?:\/\//)) {
			url = docLoc + url;
		}
		window.frames[iframeName].location = url;
		return false;
	}else{
		return true;
	}
}

function loadIframes(){
	if(framesLoaded) {
		return;
	}

	for(i=0;i<window.frames.length;i++){
		ifr = window.frames[i].name;
		if(ifr.match(/_htmlObject$/)){
			hfi = ifr.replace(/_htmlObject$/, "");
			if(document.getElementById(hfi)){
				if(document.getElementById(hfi).value){
					window.frames[i].document.write(document.getElementById(hfi).value);
				}
			}
		}
	}
	framesLoaded = true;
}

function lay_getAbsolutePos(el) {
	var r = new Object();
	r.x = el.offsetLeft;
	r.y = el.offsetTop;
	if (el.offsetParent) {
		var tmp = lay_getAbsolutePos(el.offsetParent);
		r.x += tmp.x;
		r.y += tmp.y;
	}
	return r;
}

function util_srchString(htmlEl, attrMask) {
	var toRet = new String("|");
	var regexpstr = "/"+attrMask+"/";
	for ( var j = 0; j < htmlEl.attributes.length; j++) {
		var attr = htmlEl.attributes[j];
		if (attr.nodeValue && typeof(attr.nodeValue) == "string") {
			if (attr.nodeName.toLowerCase().search(attrMask) >= 0) {
				toRet+= attr.nodeValue+"|";
			}
		}
	}
	for (var i = 0; i< htmlEl.children.length; i++) {
		toRet+=util_srchString(htmlEl.children[i], attrMask);
	}
	return toRet;
}

// CBA 2003.08.21
// x,y,w,h - wanted position (relative to document 0,0) and box size
// return {x: new x, y: new y} (relative to document0,0)
function util_positionOnScreen(x,y,w,h) {
	var bw, bh, sw, sh, d;
	if (Ktml_mozilla) {
		bw = document.width;
		bh = document.height;
		sw = window.pageXOffset;
		sh = window.pageYOffset;
	}
	else {
		d = document.body;
		bw = d.offsetWidth - 20;
		bh = d.offsetHeight;
		sw = d.scrollLeft;
		sh = d.scrollTop;
	}
	if (x + w > bw + sw) {
		x = bw + sw - w;
	}
	if (y + h > bh + sh) {
		y = bh + sh - h;
	}
	if (x < 0) x = 0;
	if (y < 0) y = 0;
	return {x: x, y:y};
}

function util_preserveSession(numSeconds) {
	if (Ktml_ie) {
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (Ktml_mozilla) {
		xmlhttp=new XMLHttpRequest();
	}
	xmlhttp.open("GET", NEXT_ROOT+"/includes/ktedit/popups/session."+Ktml_ext+"?" + Math.random(),true);
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4) {
			setTimeout('util_preserveSession('+numSeconds+')', numSeconds);
		}
	}
	try {
		xmlhttp.send(null);
	} catch (e) {
		//alert(e.description);
	}
}

//xmlhttp_to();


// string extensions

String.prototype.ltrim = function() {
	return this.replace(/^\s+/,'');
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,'');
}
String.prototype.trim = function() {
	return this.replace(/^\s+/,'').replace(/\s+$/,'');
}
String.prototype.htmlencode = function() {
	return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}


// zeroPad adds 0 in frotn till length
function util_zeroPad(str, length) {
	if (!str) str = "";
	str = str.toString();
	while (str.length < length) {
		str = "0" + str;
	}
	return str;
}

// decimal to hex - should be redone
function decimalToHex(_decimal)
{
 if (!_decimal) return;
 var inputDecimal = _decimal;
 var inputDecimal1 = parseInt(inputDecimal);
 var outputHex = new String("");
 var outputHex1;
 var decimalLength = inputDecimal.length;
 var decimalDigit;
 var hexDigit;
 var i = 0;
 var j = 0;
 var temp;
 for(j=0 ; Math.pow(16,j)<=inputDecimal ; j++)
     ;
 i = j - 1;
 while(i!=-1) {
     temp = Math.floor(inputDecimal1 / Math.pow(16,i));
     if(temp!=0)
 inputDecimal1 = inputDecimal1 - temp*Math.pow(16,i);
     if(temp<10)
 outputHex1 = temp;
     else if(temp==10)
 outputHex1 = "A";
     else if(temp==11)
 outputHex1 = "B";
     else if(temp==12)
 outputHex1 = "C";
     else if(temp==13)
 outputHex1 = "D";
     else if(temp==14)
 outputHex1 = "E";
     else if(temp==15)
 outputHex1 = "F";
     else
 outputHex1 = "";
     outputHex = outputHex + outputHex1;
     i--;  }
 if(inputDecimal=="0" || inputDecimal=="1")
     outputHex = inputDecimal;
 return outputHex;
	}

// bgr2rgb
function intbgr2hexrgb(a) {
	d = decimalToHex;
	// on mozilla will report rgb(a, b, c) - so the following is not good
	return "#" + util_zeroPad(d(a%256),2) + util_zeroPad(d((a/256)%256),2) + util_zeroPad(d((a/65536)%256),2);
}

function dumpVar(obj, sep) {
	if (sep == undefined) {
		sep = '';
	}
	tm = "";
	if (typeof(obj) == "object") {
		for (i in obj) {
			tm += sep + i + ":{\n" + dumpVar(obj[i], sep + '  ') + "}\n";
		}
		return tm;
	}
	if (typeof(obj) == "function") return sep + typeof(obj) + "\n";
	return sep + obj + "\n";
}

function fixFocusHack(i) {
	//DPO - 03.Dec.2004
	//IE BUG - cannot focus editor when selection inside a big table and opening SELECT element
	//HACK: focus another element then focus back
	if(Ktml_ie){
		if(event.srcElement.tagName=="SELECT"){
			var pel = event.srcElement;
			//find the TABLE tag containing the SELECT
			while(pel){
				if(pel.tagName=="TABLE"){
					//find the first input type=text  element
					var inputTexts = pel.getElementsByTagName("INPUT");
					//for(var i=0; i<inputTexts.length; i++){
						if(inputTexts[i].type=="text" && !inputTexts[i].disabled && !inputTexts[i].readOnly){
							inputTexts[i].focus();
							event.srcElement.focus();
							break;
						}
					//}
					break;
				}
				pel = pel.parentElement;
			}
		}
	}
}
