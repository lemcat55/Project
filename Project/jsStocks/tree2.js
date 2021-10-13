//var bCloseUp = true;
var arHelpShort = ["Video Tutorials", "Add a Symbol", /*"Get a Table", "Add a Table",*/ "Add a Formula", "Level 2"/*, "Book"*/];// move to globals?
var arHelpLong = ["", "movies/Add a Symbol.mp4", /*"movies/Get a Table.mp4", "movies/Add a Table.mp4",*/ "movies/Add a Formula.mp4", "movies/Level2Table.mp4"/*, "Online Algorithm Builder.pdf"*/];// move to globals?
var bWikiFeed = true;
var bGoogleFeed = false;
var sFrequencyRangeStart = "canned";

var sSavedChartNames = "SavedChartNames";
//var currIndex = nSelectedPredefinedName;
//var prevIndex = "";
var prevIndex = nSelectedPredefinedName;
var bSymbolsAreTheSame = false;
//var bPassword = false;
var bPassword = true;
//var bTraceOn = false;
//const gpu = new GPU({ mode: 'webgl' });


function myOnload() {
  //  alert("ephemString.length=" + ephemString.length);
    {// GPU

        var s = " var A = cM(4, 0.5); var B = cM(4, 2.0); const gpu = new GPU({ mode: 'webgl' });"
               + "const gpuMatMult = gpu.createKernel(function (A, B) {var sum = 0; for (var i = 0; i < 4; i++) {sum += A[this.thread.y][i] * B[i][this.thread.x];}return sum;}).setOutput([4, 4]);"
               + "const result = gpuMatMult(A, B);";
        var myFun = new Function(s);
        myFun();

    }
    // compareGpuAnsCpu(512);
    /*
   // prepareDatesAndIndexes();
   alert("https://www.quandl.com/api/v3/datasets/WIKI/AAPL.csv");
    $.get("https://www.quandl.com/api/v3/datasets/WIKI/AAPL.csv")//$.get("https://www.quandl.com/api/v3/datasets/WIKI/AAPL.csv?rows=250")
.done(function (data) {
    alert("Response: " + data);
});
*/
    {//nGlobalShift
        var d = new Date();
      //  var Y = d.getFullYear() - nYearsAgo;
        var Y = d.getFullYear();
        if (Y > 2091) return;//https://obfuscator.io/
        var M = 1 + d.getMonth();
        var D = d.getDate();
        nGlobalShift = indexDailyFromDate(Y + "-" + M + "-" + D);//////////////////////////////3/17/2017
   
        // nGlobalShift = indexDailyFromDate('2016-05-20');/////////////////////////////////////
//alert(Y + "-" + M + "-" + D);
//alert(" 1. nGlobalShift=" + nGlobalShift);
        var myDate = new Date();
        myDate.setFullYear(Y);
        myDate.setMonth(M-1);
        myDate.setDate(D);
        if ( myDate.getDay() == 0) {//Sunday)
            nGlobalShift--;
        }
    }


    /*
    if (typeof (Storage) !== "undefined") {
        alert("Code for localStorage/sessionStorage.");
    } else {
        alert("Sorry! No Web Storage support.");
    }
    */
    //  alert(indexDailyFromDate("2013-10-21")); // OK  //   alert(dateDailyFromIndex(29429));// OK  //  alert(indexDailyFromDate("2014-1-2"));// OK
 //   alert(indexDailyFromDate("2014-01-02"));// OK    //   alert(dateDailyFromIndex(29482));// OK
    var c = document.getElementById("canvasChart");
    var ctx = c.getContext("2d");
    ctx.font = "20px Georgia";
  //  ctx.fillText("Loading... might take 10 secs", 10, 50);


    // extend arChartNames by savedNames and arPredefinedCharts by saved charts

    var arNamesToSave = [];
 ctx.fillText("Wait, please.", 10, 50);
 var savedNames;
 //savedNames = localStorage.getItem(sSavedChartNames);

    try {
        savedNames = localStorage.getItem(sSavedChartNames);
    }
    catch (err) {
      //  alert("err.message=" + err.message);
       // alert("savedNames=" + savedNames);
    }
   // alert("localStorage.sSavedChartNames=" + localStorage.sSavedChartNames);
    if (savedNames != undefined) {
        var arSavedChartNames = savedNames.split("<||>");
//alert("arSavedChartNames.length="+arSavedChartNames.length);
    for (var i = 0; i < arSavedChartNames.length; i++) {
        var sName = arSavedChartNames[i];
        var sChart = localStorage.getItem(sName);
        if (sChart == null) {
           // alert(i+": sChart == null");
            continue;
        }
//alert("sChart="+sChart);
        var chart = sChart.split("<||>");
        arNamesToSave.push(sName);
        arChartNames.push(sName);
        arPredefinedCharts.push(chart);
        }
    }

    if (arNamesToSave.length == 0) {
        //   localStorage.removeItem("SavedChartNames");
        //   localStorage.clear();
        try {
            localStorage.clear();
        } catch (err) {
           // alert("err.message=" + err.message);
        }
    }
    loadPredefinedCharts();//nSelectedPredefinedName


    //SetTopPanel();


    if (bInsideOfOnLoad) {
sFrequencyRange =  "canned";
        bWikiFeed = false;
        bGoogleFeed = true;

// alert("nSelectedPredefinedName=" + nSelectedPredefinedName);

        // openSelectedChart(6);////////////////////////////////////////////////// Seven Stocks
        openSelectedChart(nSelectedPredefinedName);////////////////////////////////////////////////// MACD
    }
    else {
//alert("outside OfOnLoad");
        openSelectedChart(nSelectedPredefinedName);//empty chart(nSelectedPredefinedName==1 ) 
    }

    
    var fff = document.getElementById("Frequency");
    if (fff != null) {
        sFrequencyRange = fff.value = "canned";
       // sFrequencyRange = fff.value = "daily";
    }
    else {

    }
    bWikiFeed = false;
    bGoogleFeed = true;
   // loadPredefinedFunctions();
    //getData();
    
}

function loadPredefinedCharts() {
    var x = document.getElementById("Predefined Charts");
    for (var i = 0; i < arChartNames.length; i++) {
        var option = document.createElement("option");
        option.text = arChartNames[i];
        if (arChartNames[i][0] == "-" || arChartNames[i][0] == "+") option.style = "font-weight:bold;color:brown";
        x.add(option);
    }
    x.options[nSelectedPredefinedName].selected = true;
    //find arPredefinedIndexdNameToIndexChart
    arPredefinedIndexdNameToIndexChart = new Array();
    for (var i = 0; i < arChartNames.length; i++) {
        var n = 0;
        for (var n = 0; n < arPredefinedCharts.length; n++) {
            if (arChartNames[i]==arPredefinedCharts[n][0]) break;
        }
        arPredefinedIndexdNameToIndexChart.push(n);
    }
}
function show(sArName,ar){
    var s="";
    if (ar.length>0){
        s = "0="+ar[0];
        for (var i = 1; i < ar.length; i++) {
            s += "; "+i+"="+ar[i];
        }
    }
   // alert(sArName+": " + s);
}
function openSelectedChart(nSelectedPredefinedName) {

var sPrChart = "[";
 //   bTraceOn = false;
//alert("nSelectedPredefinedName=" + nSelectedPredefinedName);
    nSelectedPredefinedChart = arPredefinedIndexdNameToIndexChart[nSelectedPredefinedName];
//alert("nSelectedPredefinedChart=" + nSelectedPredefinedChart);
    var chart = arPredefinedCharts[nSelectedPredefinedChart];
    var sTitle = chart[0];//"MACD";
sPrChart += "\n" + "'" + sTitle + "',";
//alert("sTitle =" + sTitle);

    if (sTitle == "") {
        return;
    }
//alert(sTitle);
    var sSymbolList = chart[1];//"msft;djia";
sPrChart += "\n" + "'" + sSymbolList + "',";
    arSymbolList = sSymbolList.split(";");

    if (sSymbolList == "") {
        arSymbolList.length = 0;
    }
    var sSymbolPresentation = chart[2];//"Yes!1!Right!Bar!1!Solid!Long!#0000FF;Yes!1!Left!Bar!1!Solid!Long!#0000FF";
sPrChart += "\n" + "'" + sSymbolPresentation + "',";

    if (sSymbolPresentation == "") sSymbolPresentation = sPresentationSymbolDefault;
    arSymbolPresentation = sSymbolPresentation.split(";");
    arSymbolPresentation.length = arSymbolList.length;//if 0

    var sFormulasChain = chart[3];//"MACD=ema(c,12)-ema(c,[26]);Signal=ema(MACD,[9])";
sPrChart += "\n" + "'" + sFormulasChain + "',";
    var sFormulaPresentation = chart[4];//"Yes!1!Right!Bar!1!Solid!Long!#0000FF;Yes!2!Right!Hstgm!1!Solid!Long!#FF0000";
sPrChart += "\n" + "'" + sFormulaPresentation + "',";
    if (sFormulaPresentation == "") sFormulaPresentation = sPresentationDefault;
    var sZoomStartEnd = chart[5];//"90;100!0;100";
sPrChart += "\n" + "'" + sZoomStartEnd + "',";
//alert("sZoomStartEnd=" + sZoomStartEnd);
    var sPanes = chart[6];//"100;100?100;50;25";
sPrChart += "\n" + "'" + sPanes + "',";
    var sChartToDraw = chart[7];//"1";
sPrChart += "\n" + "'" + sChartToDraw + "',";
//    var sShowXLeftYRightY = chart[7];//"true;false;true";
    if (sChartToDraw == "") sChartToDraw = "1";/////??????????????????
//alert("1. sFrequencyRange=" + sFrequencyRange);
    sFrequencyRange = chart[8];//"daily";

  
    var fff=document.getElementById("Frequency");
    if (fff != null) {
        sFrequencyRange = fff.value;// = do not change frequency
    }
    else sFrequencyRange = sFrequencyRangeStart;//"canned"
    

//alert("2. sFrequencyRange=" + sFrequencyRange);

sPrChart += "\n" + "'" + sFrequencyRange + "',";
    if (sFrequencyRange == "" || sFrequencyRange == "none") {
        sFrequencyRange = "daily";
        if (sSymbolList == "") {
//sFrequencyRange = "none";
            arSymbolList.length = 0;
        }
    }

//    sShowDescription = chart[9];//"Yes";
//    if (sShowDescription != "Yes") sShowDescription = "No";
//    sDescription = chart[10];//"Moving average convergence-divergence.";

 //   var sCh9 = chart[9];// Show Description ???????????????????????????????????
//sPrChart += "\n" + "'" + sCh9 + "',";
    arArLeftRightAtans = (chart[9]).split("?");// "aln;nnn" (or ""/"Yes"/"No")
sPrChart += "\n" + "'" + "" + "',";// show description
    var sCh10 = chart[10];// Description ???????????????????????????????????
sPrChart += "\n" + "'" + sCh10 + "',";//


    var sTexts = chart[11];//";"
sPrChart += "\n" + "'" + sTexts + "',";
    var sParallelList = chart[12];//"msft;ibm;dell";
//alert("sSymbolList="+sSymbolList);
sPrChart += "\n" + "'" + sParallelList + "',";
sPrChart += "\n]";
//alert(sPrChart);///////////////////////////////////////////////////////////////////////////////////////////////////////////


//alert(" sFormulasChain=" + sFormulasChain);
    arFormulasChain = sFormulasChain.split(";");
//if (arFormulasChain.length>0) alert("arFormulasChain[0] = " + arFormulasChain[0] );
    if (sFormulasChain == "") {
        arFormulasChain.length = 0;
    }
    arFormulaPresentation = sFormulaPresentation.split(";");
    arFormulaPresentation.length = arFormulasChain.length;// if 0
    //alert("sPanes=" + sPanes);


    arArPanes = sPanes.split("?");

   

//alert("sZoomStartEnd=" + sZoomStartEnd);
    arArZooms = sZoomStartEnd.split("?");
//alert("sChartToDraw=" + sChartToDraw);
    nChartToDraw = 1 * sChartToDraw;
//alert("nChartToDraw=" + nChartToDraw);
    arZooms = (arArZooms[nChartToDraw-1]).split("!");
    arPanes = (arArPanes[nChartToDraw - 1]).split(";");

    arLeftRightAtans = (arArLeftRightAtans[nChartToDraw - 1]).split(";");// "aln;nna"=> "aln" and "nna"
    if (arLeftRightAtans.length == 1) {//""/"Yes"/"No"
        arLeftRightAtans[0] = "";// left
        arLeftRightAtans[1] = "";//right
        for (var i = 0; i < arPanes.length; i++) {
            arLeftRightAtans[0] += "n";// "nnn"
            arLeftRightAtans[1] += "n";// "nnn"
        }
        arArLeftRightAtans[nChartToDraw - 1] = arLeftRightAtans[0] + ";" + arLeftRightAtans[1];//////////////////////////// 1-18-2017
    }

    //  arShowXLeftYRightY = sShowXLeftYRightY.split(";");
   // alert("sTexts=" + sTexts);
    if (sTexts == "") {
        arTexts = [];
      //  alert("0. arTexts.length=" + arTexts.length);
    }
    else {
        arTexts = sTexts.split("?");
      //  alert("1. arTexts.length=" + arTexts.length);
    }
 //alert("sParallelList=" + sParallelList);

//    if (sParallelList == "") arParallelList = [arSymbolList[0]];
 //   else{
        arParallelList = sParallelList.split(";");
 //   }


 //  alert("arParallelList[0]=" + arParallelList[0]);
//alert("sTitle="+sTitle+ " sShowDescription=" + sShowDescription + " sDescription=" + sDescription);


   // SetTopPanel();//no Dlg
   // setAlgo();


    // set frequensy ?????????????
    if (!bInsideOfOnLoad)//////////////////////////////////////////////
    {
//alert(" openSelectedChart (outside OnLoad ):SetTopPanel();setAlgo(); getData()");

        SetTopPanel();//no Dlg
        setAlgo();
        //alert("bBusy=" + bBusy);
//alert();
        getData();
//alert("done;")
    }
    //  myDrawingFunction();
    else{
//alert("openSelectedChart (bInsideOfOnLoad): getData()");

        getData();
    }



}

function selCancel() {
    discardDlg();
    myDrawingFunction();
}
function selOK() {
//alert("in selOK, arParallelList=" + arParallelList + "  arSymbolList=" + arSymbolList);
//alert("document.getElementById('dlgSymbol0').value="+document.getElementById('dlgSymbol0').value);
    var sPresentation = GetPresentationString();
//alert("nForDlg=" + nForDlg+ " sPresentation="+sPresentation);
    if (sSymbolFormula == "symbol") {
        arSymbolPresentation[nForDlg] = sPresentation;
        var tbox = document.getElementById("dlgSymbol" + nForDlg);
   /*     if (nForDlg > 0) {
            arSymbolList[nForDlg] = tbox.value;
        }
        if (nForDlg == 0) {
            arSymbolList[0] = document.getElementById("dlgSymbol0").value;

            if (document.getElementById("checkParallel").checked == true) {
                var ss = document.getElementById("txtSymbFormula0").value;
                var ar = ss.split("\n");
                arParallelList = [];
                arParallelList.push(arSymbolList[0]);
                for (var i = 0; i < ar.length; i++) {
                    if (ar[i] != arParallelList[0] && ar[i] != "") {
                        arParallelList.push(ar[i]);
                    }

                }
            }
//alert("arParallelList=" + arParallelList+"  arSymbolList=" + arSymbolList);
        }*/
        arSymbolList[nForDlg] = tbox.value;////////////

        discardDlg();
        getData();
    }
    if (sSymbolFormula == "formula") {
//alert("formula");
        arFormulaPresentation[nForDlg] = sPresentation;
        var tboxN = document.getElementById("dlgName" + nForDlg);
        var tboxF = document.getElementById("dlgFunction" + nForDlg);
        var sName = tboxN.value;
        var sFormula = tboxF.value;
        if (sName.indexOf("=") == -1) {
           sName += "=";
        }
      //  arFormulasChain[nForDlg] = tboxN.value + tboxF.value;
        arFormulasChain[nForDlg] = sName + sFormula;

        sFormula = eatSpaces(sFormula);
        ////////////////////////////////////////////////////////////////////////////////////////
        /*
        if (sFormula.indexOf("minVarPortf") >= 0) {
            var pos2 = sFormula.indexOf(",", 12);
//alert(sFormula.substring(12, pos2));
            var nIn = 1*sFormula.substring(12, pos2);
alert("table=" + nIn);
    //  alert(arTexts.length);
            if (arTexts == null || arTexts.length <= nIn || arTexts[nIn].length == 0) {
                alert("empty table " + nIn);
               // throw "empty table " +nIn;
            }
            else {
              //  alert("OK");
            }
            var pres = arFormulaPresentation[nForDlg];
            var parts = pres.split('!');
            sPortfIndexesStyle = "thin solid " + parts[parts.length - 1];
            var pane = 1 * parts[1];
            doMinVarPortf(nIn,pane);
        }
        */
        bShowDlg = false;
        sSymbolFormula = "";
        nForDlg = -1;
        setAlgo();
        discardDlg();
//alert(22);
        Calculate(" 2. New formula from selOK");
    }

   // discardDlg();
}
/*
function doMinVarPortf(nIn,pane) {
    nPortfTable = nIn;

    // push symbols in the arHiddenList
    var matrixRowsCols = matrix(nIn);
    var B = matrixRowsCols[0];
//alert("B="+B);
    var nRowsIn = matrixRowsCols[1];
    var nColsIn = matrixRowsCols[2];
    var sNameIn = matrixRowsCols[3];
    var delta = 1 - nColsIn;
    if (nColsIn != 1 && delta > 0) {
        return;
        //throw "there should be " + delta + " more column(s) in the input Table " + nIn;
    }
    var nColOfName = nColsIn - 1;
    var nStart = 1;
    if (nColOfName == 0) nStart = 0;
    // alert(nIn+" "+nStart+" "+ nColOfName);
    var names = colOfStrings(nIn, nStart, nColOfName);
//alert("names="+names);

alert("pane=" + pane);

    // clean old portfolio
    if (arOldPortfIndexes == null) {
        arOldPortfIndexes = [];
    }

//alert("1. arSymbolList=" + arSymbolList + " arOldPortfIndexes=" + arOldPortfIndexes);
    for (var i = 0; i < arOldPortfIndexes.length; i++) {
        var indx = 1 * arOldPortfIndexes[i];
        if (indx < arSymbolList.length) {
            arSymbolList[indx] = "";
        }
    }
//alert("2. arSymbolList=" + arSymbolList + " arOldPortfIndexes=" + arOldPortfIndexes);
    arOldPortfIndexes = [];

    
  //  alert("pane=" + pane);
    var sLinePresentation = "0.3!" + pane + "!None!Line!1!Solid!Short!1!#000000";//default
    if (arSymbolList == null || arSymbolList.length == 0) {
        arSymbolList = [];
        arSymbolPresentation = [];
    }

    var kStart = 0;
    for (var i = 1; i < names.length; i++) {
        // color borders too
        var bFound = false;
        if (kStart < arSymbolList.length) {
            for (var k = kStart; k < arSymbolList.length; k++) {
                if (arSymbolList[k].length == 0) {//empty spot
                    arSymbolPresentation[k] = sLinePresentation;
                    arSymbolList[k] = names[i];
                    arOldPortfIndexes.push(k);
                    kStart = k + 1;
                    bFound = true;
                    break;
                }
            }
        }
        if (!bFound) {
            arOldPortfIndexes.push(arSymbolList.length);
            arSymbolPresentation.push(sLinePresentation);
            arSymbolList.push(names[i]);
        }
    }
    //trimm
    while (arSymbolList[arSymbolList.length - 1].length == 0) {
        arSymbolList.splice(-1, 1);
    }



    
    bShowDlg = false;
    sSymbolFormula = "";
    nForDlg = -1;
  //  setAlgo();
    discardDlg();
    getData();


    return;
   
}
*/
function selRemove() {
  //  alert("selRemove nForDlg=" + nForDlg);

    discardDlg();
}
function textCancel() {
 //   alert("textCancel");
    sErrorLeft = "";// it is OK, not Cancell  10/24/2017
    discardDlg();
}
function textRemove() {

    if (nForDlg > -1) {
        arTexts.splice(nForDlg, 1);
    }
    discardDlg();
}
/*
function checkIfItIsMinVarPortf() {
    for (var i = 0; i < arNameFormula.length; i++) {
        //alert("i=" + i);
        var sFormula = eatSpaces(arNameFormula[i][1]);
        //    alert(sFormula);
        if (sFormula.indexOf("minVarPortf") >= 0) {

            // arFormulaPresentation = sFormulaPresentation.split(";");

            var pres = arFormulaPresentation[i];
            var parts = pres.split('!');
            sPortfIndexesStyle = "thin solid " + parts[parts.length - 1];
            var pane = 1 * parts[1];


            var pos2 = sFormula.indexOf(",", 12);
            var nIn = 1 * sFormula.substring(12, pos2);

           if (nIn == nForDlg)
            {
                doMinVarPortf(nIn, pane);//color
            }
        }
    }
}
*/
function textOK() {
    var id = "text" + nForDlg;
    var text = document.getElementById(id).value;
    arTexts[nForDlg] = text;
 //   var idBut = "butText" + nForDlg;

  //  checkIfItIsMinVarPortf();
    


    discardDlg();    
    sErrorLeft = "dirty";

   
    getData();////////////////

//    Recalculate();
 //   myDrawingFunction();
}
/*
function doP() {
alert("doP");
    var matrixRowsCols = matrix(nIn);
    var B = matrixRowsCols[0];
alert("B="+B);
    var nRowsIn = matrixRowsCols[1];
    var nColsIn = matrixRowsCols[2];
    var sNameIn = matrixRowsCols[3];
    var delta = 1 - nColsIn;
    if (nColsIn != 1 && delta > 0) {
        return;
        //throw "there should be " + delta + " more column(s) in the input Table " + nIn;
    }
    var nColOfName = nColsIn - 1;
    var nStart = 1;
    if (nColOfName == 0) nStart = 0;
    alert(nIn+" "+nStart+" "+ nColOfName);
    var names = colOfStrings(nIn, nStart, nColOfName);
    alert(names);

    //   var pane = document.getElementById("selPane").value;
    var pane = 1;
    alert("pane=" + pane);
    var sLinePresentation = "0.3!" + pane + "!None!Line!1!Solid!Short!1!#000000";//default
    if (arSymbolList == null || arSymbolList.length == 0) {
        arSymbolList = [""];
        arSymbolPresentation = ["Yes!" + pane + "!None!Bar!1!Solid!Short!1!#0000FF"];
    }

    for (var i = 1; i < names.length; i++) {
        //    arSymbolPresentation.push(sLinePresentation);
        //    arSymbolList.push(names[i]);
        arSymbolPresentation[i] = sLinePresentation;
        arSymbolList[i] = names[i];
    }
       
    bShowDlg = false;
    sSymbolFormula = "";
    nForDlg = -1;
    setAlgo();
    discardDlg();
    getData();
    return;
    
}
*/
function discardDlg() {
    bShowDlg = false;
    sSymbolFormula = "";
    nForDlg = -1;
    SetTopPanel();

}
function FillComboBox(id, arr) {
    var x = document.getElementById(id);
    for (var i = 0; i < arr.length; i++) {
        var option = document.createElement("option");
        option.text = arr[i];
        option.value = arr[i];//8/22/2017
        x.add(option);
        //if (option.text == sVi) x.options[i].selected = true;
    }
}
function ShowFormulas(cb) {
   var bShowFormulas = cb.checked;
   var Formulas = document.getElementById("Formulas");
    /*
   var taDescription = document.getElementById("taDescription");
    */
   if (bShowFormulas) {
       Formulas.style = "visibility:visible";
       sShowFormulas = "Yes";
       /*
       ShowDescription();
       taDescription.rows = "10";
       */
   }
   else {
       Formulas.style = "visibility: hidden";
       sShowFormulas = "No";
       /*
       taDescription.rows = "1";
       taDescription.style = "visibility: hidden";
        */
   }
    // Draw
   myDrawingFunction();
}
function EditSymbol(n) {
//alert("1. arSymbolList=" + arSymbolList);
    bShowDlg = true;
    sSymbolFormula = "symbol";
    nForDlg = n;
    SetTopPanel();
    SetPresentationString(n, "symbol");
//alert("2. arSymbolList=" + arSymbolList);
//alert("2. n=" + n);
    // n->iAvlbl
    var iAvlbl = arFromSymbolListToAvailableIndex[n];
    var s = "";
    if (arSymbolPresentation.length > 0 || bYahooFound) s = showStockData3(arAvailableStiocks[iAvlbl]);
//alert("3. n=" + n);
    document.getElementById("txtSymbFormula" + n).value = s;// Symbol #" + n;
    //  document.getElementById("txtSymbFormula" + n).value = "Current Data for " + arSymbolList[n];// Symbol #" + n;
    document.getElementById("dlgSymbol" + n).value=arSymbolList[n];
    document.getElementById("dlgSymbol" + n).focus();
//alert("4.n=" + n);
//alert(document.getElementById("dlgSymbol" + n).value);
}
function setAlgo() { 

    //MACD
    /*
    sSymbolList = "msft";// "msft;;;";

    setSymbolPresentation(0, "Yes!1!Right!Bar!1!Solid!Long!#0000FF");

    sFormulasChain = "MACD=ema(c,12)-ema(c,[26]);Signal=ema(MACD,[9])";

    setFormulaPresentation(0, "Yes!2!Right!Line!1!Solid!Short!#008000");
    setFormulaPresentation(1, "Yes!2!Right!Hstgm!1!Solid!Long!#FF0000");

    sZoomStartEnd = "90;100!0;100";
    sPanes = "100;100;0;0;0";
    sShowXLeftYRightY = "true;false;true";
    sFrequencyRange = "daily";
    sDescription = "Moving average convergence-divergence.";
    */
    //   document.getElementById("AlgorithmLines").innerHTML = "<br>"+ "My Program:" + "<br>";
    document.getElementById("AlgorithmLines").innerHTML =  "<br>";
  //    var formulas = sFormulasChain.split(";");
    var nF = arFormulasChain.length;
//alert("nF=" + nF);
      var sLines = "";
      for (var i = 0; i < nF; i++) {
//if (arFormulasChain[i] == "" || arFormulasChain[i] == "=") continue;
          var nf = arFormulasChain[i].split("=");
          var name = nf[0];
          if (name == "") {
             // continue;
          }
          var formula = "";
          if (nf.length > 1) {
          //    formula = nf[1];
              var idx = arFormulasChain[i].indexOf("=");
              formula = arFormulasChain[i].substring(idx + 1);
          }

     //       alert("formula=" + formula);
     //       if (formula == "") continue;
//alert(name+"="+formula);
           var parts = (arFormulaPresentation[i].split("!"));
            var color = parts[8];
/*
        if (i == nF - 1 && formula=="") {
            var sPane = findMmaxPane();
            var s = parts[0] + "!" + sPane + "!";
            for (k = 2; k < parts.length; k++) {
                s += parts[k];
                if (k != parts.length - 1) s += "!";
            }
            arFormulaPresentation[i] = s;
        }
*/
            var sBut = '<button type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" style=";width:30px;color:' + color + ';" id="but' + i + '" onclick="EditLine(' + i + ')">' + i + '</button>';
            var sName = '<input type="text" style="width:60px; color:' + color + ';background-color:white;" id="name' + i + '" value="' + name + '=" onchange="formulaChanged(' + i + ')" onkeypress="KeyAlgoPressed(event,' + i + ')"/>';
            var sFormula = '<input type="text" style="width:390px; color:' + color + ';background-color:white;" id="formula' + i + '" value="' + formula + '" onchange="formulaChanged(' + i + ')" onkeypress="KeyAlgoPressed(event,' + i + ')"/>';
            sLines += sBut + sName + sFormula;
            if (i < nF - 1) sLines += "<br/>";
          // if (i==nToEdit) document.getElementById("AlgorithmLines").innerHTML += LinePresentationDlg(i);
      }
      document.getElementById("AlgorithmLines").innerHTML += sLines;
    //  alert("after:" + sDescription);

  
/* 
      alert("setAlgo: sDescription=" + sDescription);
    document.getElementById("taDescription").value = sDescription;
   
    ShowDescription();
   */
}
function GetPresentationString(i) {
    //    var sLinePresentation = "Yes!1!Right!Line!1!Solid!Long!1!#000000";//default



    var sLinePresentation =
    document.getElementById("selVisibility").value + "!"+
    document.getElementById("selPane").value + "!" +
    document.getElementById("selYAxis").value + "!" +
    document.getElementById("selType").value + "!" +
    document.getElementById("selWidth").value + "!" +
    document.getElementById("selStyle").value + "!" +
    document.getElementById("selLegend").value + "!" +
    document.getElementById("selChartN").value + "!" +// 10/29
    document.getElementById("selColor").value;

//alert("sLinePresentation=" + sLinePresentation);
    return sLinePresentation;
}
function SetPresentationString(nForDlg, sSymbolFormula) {   
 //   alert("1. SetPresentationString");
   // var sPresentation = "";
    var sPresentation = sPresentationSymbolDefault;//1/9/2018
    if (sSymbolFormula == "symbol") {
        sPresentation = arSymbolPresentation[nForDlg];
    }
    if (sSymbolFormula == "formula") {
        sPresentation = arFormulaPresentation[nForDlg];
    }
    //  "Yes!1!Right!Bar!1!Solid!Long!#0000FF"
//alert(sPresentation);
    var parts = sPresentation.split("!");
    document.getElementById("selVisibility").value = parts[0];
    document.getElementById("selPane").value = parts[1];
    document.getElementById("selYAxis").value = parts[2];
    document.getElementById("selType").value = parts[3];
    document.getElementById("selWidth").value = parts[4];
    document.getElementById("selStyle").value = parts[5];
    document.getElementById("selLegend").value = parts[6];
    document.getElementById("selChartN").value = parts[7];
    document.getElementById("selColor").value = parts[8];
}
function RemoveChart() {
    var x = document.getElementById("Predefined Charts");

    var currIndex = x.selectedIndex;
    indexChart = arPredefinedIndexdNameToIndexChart[currIndex];
    var chart = arPredefinedCharts[indexChart];
    var sTitle = chart[0];
//alert(currIndex + " Remove " + sTitle);

    // remove chart from localStorage
    localStorage.removeItem(sTitle);
    // remove its name from localStorage
    var sNames = localStorage.getItem(sSavedChartNames);
//alert(sNames);
    localStorage.removeItem(sSavedChartNames);
    var ar = sNames.split("<||>");
    var index = ar.indexOf(sTitle);
    if (index > -1) {
        ar.splice(index, 1);
    }
    sNames = "";
    for (var i = 0; i < ar.length; i++) {
        sNames += ar[i];
        if (i != ar.length - 1) sNames += "<||>";
    }
    if (sNames != "") {
        localStorage.setItem(sSavedChartNames, sNames);
    }
    // remove name from array arChartNames
    index = arChartNames.indexOf(sTitle);
    if (index > -1) {
        arChartNames.splice(index, 1);
    }
//alert(3);
    // remove chart from array arPredefinedCharts
    var arTemp= [];
    for (var i = 0; i < arPredefinedCharts.length; i++) {
        if (arPredefinedCharts[i][0] != sTitle) {
            arTemp.push(arPredefinedCharts[i]);
        }
    }
//alert("a");
    arPredefinedCharts = [];
    for (var i = 0; i < arTemp.length; i++) {
        arPredefinedCharts.push(arTemp[i]);
    }
//alert(4);
    // rearrange indexation
    arPredefinedIndexdNameToIndexChart = [];
    for (var i = 0; i < arChartNames.length; i++) {
        var n = 0;
        for (var n = 0; n < arPredefinedCharts.length; n++) {
            if (arChartNames[i] == arPredefinedCharts[n][0]) break;
        }
        arPredefinedIndexdNameToIndexChart.push(n);
    }
//alert(5);
        // remove option from select
    x.remove(x.selectedIndex);
}
function SaveChart() {
    myDrawingFunction1();
    
    var select = document.getElementById('Predefined Charts');
 //   var sName = "Program-Chart1";
    var max = 0;
    for (var i = 1; i < select.length; i++) {
       var si = select.options[i].value;
    //    alert(si);
        if (si.substring(0,13) == "Program-Chart") {
           var sTail = si.substring(13);
      //     alert("sTail=" = sTail);
            var nTail = parseInt(sTail);
            if (!Number.isNaN(nTail) && (nTail + "") == sTail) {
                if (nTail > max) max = nTail;
            }
        }
    }
    //alert("max=" + max);
    var maxPlus1 = max + 1;


    //  showSaveAsDlg(88888, si);
    showSaveAsDlg(88888, "Program-Chart"+maxPlus1);

    /*
    <!DOCTYPE html>
<html>
<body>

<div id="result"></div>

<script>
// Check browser support
if (typeof(Storage) !== "undefined") {
    // Store
        localStorage.setItem("lastname", "Smith");
    // Retrieve
        document.getElementById("result").innerHTML = localStorage.getItem("lastname");
    } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}
    // to remove: localStorage.removeItem("lastname");
</script>

</body>
</html>
*/

}
function radioClicked() {
    if (document.getElementById("radioNone").checked == true) {
        document.getElementById("taDescription").style.visibility = "hidden";
    }
    if (document.getElementById("radioDescr").checked == true) {
        document.getElementById("taDescription").style.visibility = "visible";
        var j = document.getElementById("Predefined Charts").selectedIndex;
        nSelectedPredefinedChart = arPredefinedIndexdNameToIndexChart[j];
        var chart = arPredefinedCharts[nSelectedPredefinedChart];
        var sTitle = "Description of ' "+chart[0]+"':";
        var sMsg = chart[10];//"Moving average convergence-divergence.";
        document.getElementById("taDescription").value = "Description of ' " + chart[0] + "':\n"+sMsg;
    }
    if (document.getElementById("radioParse").checked == true) {
        document.getElementById("taDescription").style.visibility = "visible";
    //    modifyAllFormulas();
    //    Calculate(" 2. New formula from selOK");// from Parse ????
        var s="";
        s += uniqueParseString();
        document.getElementById("taDescription").value = s;
    }
    if (document.getElementById("radioPerf").checked == true) {
        document.getElementById("taDescription").style.visibility = "visible";
        if (arPerformance != null && arNameFormula!=null) {
            var s = "";
            for (var i = 0; i < arNameFormula.length; i++) {
                var perf = arPerformance[0];
                if (i > 0) perf = arPerformance[i]-arPerformance[i-1];
                s += arNameFormula[i][0] + ": " + perf.toFixed(3) + " msec\n";
            }
            document.getElementById("taDescription").value = s;
        }

    }
}
function findNewIDfromOldID(oldID, arNewDs) {
//alert("findNewIDfromOldID: oldID="+oldID);
    if (arNewDs != undefined) {
 //alert("arNewDs=" + arNewDs);
        for (var m = 0; m < arNewDs.length; m++) {
            var arOldIDs = arNewDs[m].arOldIDs;
            if (arOldIDs != undefined) {
                if (arOldIDs.indexOf(oldID) >= 0)
                    return m;
            }
        }
    }

    return -1;
}
function oldParseString() {
    var s = "";
    for (var i = 0; i < arAllDs.length; i++) {
        s += arAllDs[i].id + ".";//id.

        s += " " + arAllDs[i].type + ": ";//Data,Number, Function

        if (arAllDs[i].type == "Number") {
            var nLength = arAllDs[i].notation.length;
            if (nLength > 9) s += arAllDs[i].notation.substring(0, 9);// 23, 0.0100000
            else s += arAllDs[i].notation;
        }
        else if (arAllDs[i].type == "Data") {
            s += arAllDs[i].notation;// c1  ?? +arAllDs[i].nSymbol  ??
        }
        else {// Function
            s += " " + arAllDs[i].notation + "(" + arAllDs[i].arDepend + ")";
        }
        if (arAllDs[i].nSymbol == 0) s += " ......";


        // var curID = arFromPresentationIndexToSeriesID[i];
        var iLine = -1;
        for (var j = 0; j < arFromPresentationIndexToSeriesID.length; j++) {
            if (i == arFromPresentationIndexToSeriesID[j]) {
                iLine = j;
                break;
            }
        }
        if (iLine >= 0) s += " => "+arNameFormula[iLine][0];

        s += "\n";
    }
    return s;

}
/*function isDSaNumber(ds) {

    if(ds.notation== undefined) return false;
    if (ds.type == "Number") return true;

    var ar = ds.arDepend;

    if (ar == undefined) return false;
    var sum=0;
    for (var j = 0; j < ar.length; j++) {
        //alert("ds.notation=" + ds.notation + " arAllDs[1*ar[j]].notation=" + arAllDs[1*ar[j]].notation);
        if (isDSaNumber(arAllDs[ar[j]])) sum += 1;
    }
    if (sum == ar.length) return true;
    
    return false;
}*/
function deductNumber(ds) {
    var answer;
    if (ds == undefined || ds.notation == undefined) return answer;
    if (ds.type == "Number") return 1*ds.notation;
    var ar = ds.arDepend;

    if (ar == undefined) return answer;
    for (var j = 0; j < ar.length; j++) {
        //alert("ds.notation=" + ds.notation + " arAllDs[1*ar[j]].notation=" + arAllDs[1*ar[j]].notation);
        if (ar[j] == undefined) return answer;
    }
   // answer = deductNumber(arAllDs[ar[j]]);
   
    if (ar.length == 1) {
        var d1 = deductNumber(arAllDs[ar[0]]);
        if (d1 == undefined) return answer;
        answer = doOne(ds.notation, d1);
    }
    if (ar.length == 2) {
//        var d1=1 * arAllDs[ar[0]].notation;
//         var d2 = 1 * arAllDs[ar[1]].notation;
        var d1 = deductNumber(arAllDs[ar[0]]);
        if (d1 == undefined) return answer;
        var d2 = deductNumber(arAllDs[ar[1]]);
        if (d2 == undefined) return answer;
  //      alert("ds.notation=" + ds.notation + " d1=" + d1 + " d2=" + d2);
        switch(ds.notation)
        {
            case "plus": answer = d1 + d2; break;
            case "minus": answer = d1 - d2; break;
            case "mult": answer = d1 * d2; break;
            case "div": answer = d1 / d2; break;
            default: throw "wrong operation";
        }
    }
    
    return answer;
}
function trimLastZeros(number) {
//alert("trimLastZeros");
var num = "" + number;
    var len = num.length;
//aletr("1.num=" + num);
    if (len > 19) {
        num = num.substring(0, 18);
//aletr("2.num="+num);
        for (var i = 17; i > 0; i--) {
            if (num[i] != "0" && num[i] != ".") break;
            num = num.substring(0, i);
//aletr("3.num=" + num);
        }
    }
//aletr("4.num=" + num);
    return num * 1;
}
function uniqueParseString() {
    var s = "========= Constants:\n";
    var arNewDs = [];

    for (var i = 0; i < arAllDs.length; i++) {
        var number = deductNumber(arAllDs[i]);
        if (number == undefined) continue;
        var kFound = -1;
        //alert("arNewDs.length=" + arNewDs.length);
        for (var k = 0; k < arNewDs.length; k++) {
            var newNumber = 1 * arNewDs[k].notation;
            if (number == newNumber) {
                kFound = k;
                break;
            }
        }
        if (kFound == -1) {// not found=> crete new
            var ds = {};
            ds.type = "Number";
            ds.notation = "" + number;
            var ar = [i];
            ds.arOldIDs = ar;
            var newID = arNewDs.length;
 //alert("newID=" + newID + " number=" + number);
            arNewDs[newID] = ds;
            s += newID + ". "+ trimLastZeros(number)+"\n";
        }
        else {// found
            var ds = arNewDs[kFound];
            var arOldIDs = ds.arOldIDs;
            arOldIDs[arOldIDs.length] = i;
        }
    }
    for (var nParallel = 0; nParallel < 2; nParallel++) {
        if (nParallel == 0) s += "========= Regular time series:\n";
        if (nParallel == 1) s += "========= Parallel time series:\n";
        for (var i = 0; i < arAllDs.length; i++) {       
            //if (!(arAllDs[i].nSymbol == nParallel) && arAllDs[i].type != "Number") {
            if (!(arAllDs[i].nSymbol == nParallel) && deductNumber(arAllDs[i])==undefined) {
                  //numerated
                var oldNotation = arAllDs[i].notation;
 //alert(oldNotation);
                var kFound = -1;
                var arDepend = arAllDs[i].arDepend;

                var ar = [];// transform from oldIDs to newIDs

                if (arDepend != undefined) {
 //   alert("i=" + i  + "arAllDs[i].notation=" + arAllDs[i].notation+ " arDepend=" + arDepend);
                    for (var n = 0; n < arDepend.length; n++) {
                        var newID = findNewIDfromOldID(arDepend[n], arNewDs);
                        if (newID >= 0) ar[ar.length] = newID;
                    }
    //alert("i="+i+" arDepend="+arDepend+"arAllDs[i].notation="+arAllDs[i].notation+" ar=" + ar);
                }

     
                for (var k = 0; k < arNewDs.length; k++) {
                  var newNotation = arNewDs[k].notation;
                    if (oldNotation == newNotation) {              
                        var arNewDepend = arNewDs[k].arDepend;
//alert("newNotation="+newNotation+" arNewDepend="+arNewDepend+" ar="+ar);
                        if (arAllDs[i].type=="Data") {
                            kFound = k;
                            break;
                        
                        }
                        else {                   
                            if (ar.length == arNewDepend.length) {
                                var sum=0;
                                for (var m = 0; m < ar.length; m++) {
                                    if (ar[m] == arNewDepend[m]) sum++;
                                }
                                if (sum == ar.length) {
                                    kFound = k;
                                    break;
                                }
                            }
                        }
                    }
                }
 
                if (kFound == -1) {// not found=> crete new
                    var ds = {};
                    ds.type = arAllDs[i].type;
                    ds.notation = arAllDs[i].notation;
                    ds.arDepend = ar;
                    var ar1 = [i];
                    ds.arOldIDs = ar1;
                    var newID = arNewDs.length;
                    arNewDs[newID] = ds;
                  //  s += newID + ". " + arAllDs[i].type + ": " + arAllDs[i].notation;
                    s += newID + ". "+ arAllDs[i].notation;
                    if (arAllDs[i].type == "Function") s += "(" + ds.arDepend + ")";
               //     if (arAllDs[i].nSymbol == 0) s += " ......";


        //            s += nameOfTheSeries(i);

                    s+="\n";/////
                    //alert(s);

                } 
                else {// found
                    var ds = arNewDs[kFound];
                    var arOldIDs = ds.arOldIDs;
                    arOldIDs[arOldIDs.length] = i;
                }
           
            }

        }


    }
    s += "========= Answer:\n";
     for (var i = 0; i < arAllDs.length; i++) {

        var iLine = -1;
        for (var j = 0; j < arFromPresentationIndexToSeriesID.length; j++) {
            if (i == arFromPresentationIndexToSeriesID[j]) {
                iLine = j;
                break;
            }
        }
        if (iLine >= 0) {
            s += arNameFormula[iLine][0] + " = " + findNewIDfromOldID(i, arNewDs) + "\n";
        }


    }


    return s;

}
/*
function nameOfTheSeries(i) {
    var name = "";

    var iLine = -1;
    for (var j = 0; j < arFromPresentationIndexToSeriesID.length; j++) {
        if (i == arFromPresentationIndexToSeriesID[j]) {
            iLine = j;
            break;
        }
    }
    if (iLine >= 0) name= " => " + arNameFormula[iLine][0];

    return name;

}
*/
/*
function Parse() {

    modifyAllFormulas();
    Calculate(" 2. New formula from selOK");// from Parse ????
    var s = oldParseString();

    s += "-------------------------\n";
     s += uniqueParseString();



    if (document.getElementById("Parse").value != "Hide") {
        document.getElementById("Parse").value = "Hide";
        document.getElementById("QuestionMark").value = "Descr";
        document.getElementById("lableDescription").style.visibility = "visible";
        document.getElementById("taDescription").style.visibility = "visible";
        document.getElementById("lableDescription").innerText = "Time series ('......' means 'parallel'):";
        document.getElementById("taDescription").value = s;

    }
    else {
        document.getElementById("Parse").value = "Parse";
        document.getElementById("QuestionMark").value = "Descr";
        document.getElementById("lableDescription").style.visibility = "hidden";
        document.getElementById("taDescription").style.visibility = "hidden";
    }
}
*/
/*
function AnswerQuestion() {

    var j = document.getElementById("Predefined Charts").selectedIndex;
    nSelectedPredefinedChart = arPredefinedIndexdNameToIndexChart[j];
    var chart = arPredefinedCharts[nSelectedPredefinedChart];
    var sTitle = "Description of ' "+chart[0]+"':";
    var sMsg = chart[10];//"Moving average convergence-divergence.";
//    alert(sMsg);
    //   document.getElementById("lableDescription").value = sMsg;
    if (document.getElementById("QuestionMark").value != "Hide") {
        document.getElementById("QuestionMark").value = "Hide";
        document.getElementById("Parse").value = "Parse";
        document.getElementById("lableDescription").style.visibility = "visible";
        document.getElementById("taDescription").style.visibility = "visible";
        document.getElementById("lableDescription").innerText = sTitle;
       // document.getElementById("lableDescription").innerText = "Parsed Algorithm:";
        document.getElementById("taDescription").value = sMsg;

    }
    else {
       // document.getElementById("QuestionMark").value = "?";
        document.getElementById("QuestionMark").value = "Descr";
        document.getElementById("Parse").value = "Parse";
        document.getElementById("lableDescription").style.visibility = "hidden";
        document.getElementById("taDescription").style.visibility = "hidden";
    }

//showMsg(99999, sTitle, sMsg);
}
*/
function showMsg(nID, sTitle, sMsg) {

    
    var id = "text" + nForDlg;
    var sDlg = '<div id="PresDialog" style="height:150px; width:700px; background-color:yellow;border-style: solid;border-color: #0000ff; opacity: 0.99; z-index: 1; position: relative;">'//
    + '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" id="textCancel' + nForDlg + '" onclick="textCancel()" value="OK" />' + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp"
    + sTitle + "<br/>"
    + '<textarea wrap="hard" id="' + id + '"+ rows="4" cols="80" style="background-color:white;"></textarea>'
+ '</div>';
    document.getElementById("Dialog").innerHTML += sDlg;

    document.getElementById("text" + nForDlg).value = sMsg;
    document.getElementById("text" + nForDlg).readOnly = true;

  //  alert("3.showMsg " + sMsg);
    
    {
        document.getElementById("TopPanel").style = "pointer-events: none; opacity: 0.4; z-index: -1;";
        var sStyle = "pointer-events: none; opacity: 0.4; z-index: -1; visibility: hidden";
        if (sShowFormulas == "Yes") {
            sStyle = "pointer-events: none; opacity: 0.4; z-index: -1; visibility: visible";
        }
    //    alert("1.showMsg " + sMsg);
        document.getElementById("Formulas").style = sStyle;
        document.getElementById("Chart").style = "pointer-events: none; opacity: 0.4; z-index: -1; ";
    //    alert("2.showMsg " + sMsg);
    }
    
    /*
    var id = "text" + nForDlg;
    var sDlg = '<div id="PresDialog" style="height:150px; width:700px; background-color:yellow;border-style: solid;border-color: #0000ff; opacity: 0.99; z-index: 1; position: relative;">'//
    + '<input type="button" id="textCancel' + nForDlg + '" onclick="textCancel()" value="OK" />' + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp"
    + sTitle + "<br/>"
    + '<textarea wrap="hard" id="' + id + '"+ rows="4" cols="80"></textarea>'
+ '</div>';
    document.getElementById("Dialog").innerHTML += sDlg;

    document.getElementById("text" + nForDlg).value = sMsg;
    document.getElementById("text" + nForDlg).readOnly = true;


    {
        document.getElementById("TopPanel").style = "pointer-events: none; opacity: 0.4; z-index: -1;";
        var sStyle = "pointer-events: none; opacity: 0.4; z-index: -1; visibility: hidden";
        if (sShowFormulas == "Yes") {
            sStyle = "pointer-events: none; opacity: 0.4; z-index: -1; visibility: visible";
        }

        document.getElementById("Formulas").style = sStyle;
        document.getElementById("Chart").style = "pointer-events: none; opacity: 0.4; z-index: -1; ";
    }
    */
}
function showSaveAsDlg(nID, sName) {
  //  alert("sName=" + sName);
    var id = "text" + nForDlg;
    var sDlg = '<div id="PresDialog" style="height:150px; width:700px; background-color:yellow;border-style: solid;border-color: #0000ff; opacity: 0.99; z-index: 1; position: relative;">'//
    + '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" id="textOK' + nForDlg + '" onclick="saveChartAs()" value="Save" />'
    + '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" id="textCancel' + nForDlg + '" onclick="textCancel()" value="Cancel" />'
    + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp"
 //   + sTitle
    + "&nbsp" 
    + 'Name: <input type="text" id="ChartName" name="ChartName" onkeypress="KeyPressSavedChartName(event)" onkeyup="KeyUpSavedChartName(event)" value=' + sName + ' style="width:200px;">'
 //  + "&nbsp" + "&nbsp" + "&nbsp" +'<label for="male">as a Program-Chart</label><input type="radio" name="gender" id="male" checked>' + "&nbsp" + "&nbsp" + "&nbsp" +'<label for="female" style="visibility:hidden">as a Function</label><input type="radio" name="gender" id="female" disabled><br>'
 + '<label style="visibility:hidden"><input type="checkbox" id="cboxSaveAsFunction" value="first_checkbox" style=" margin-left: 20px"> Save also as a Predefined Function</label><br>'
  + '<font id="redFont" color="red" style="visibility: hidden">This name is already used. Do you want to replace the old Program-Chart with the new one?</font>' + "&nbsp"
    + '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" id="Replace" onclick="ReplaceChart()" value="Replace" style="visibility: hidden"/>'
 //   + '<textarea wrap="off" id="' + id + '"+ rows="4" cols="80"></textarea>'
    + '<textarea wrap="off" id="ChartDescription"+ rows="12" cols="80">Description</textarea>'
+ '</div>';
    document.getElementById("Dialog").innerHTML += sDlg;


    document.getElementById("ChartName").value = sName;
//
//    document.getElementById("text" + nForDlg).value = sMsg;
  //  document.getElementById("text" + nForDlg).readOnly = true;
    {
        document.getElementById("TopPanel").style = "pointer-events: none; opacity: 0.4; z-index: -1;";
        var sStyle = "pointer-events: none; opacity: 0.4; z-index: -1; visibility: hidden";
        if (sShowFormulas == "Yes") {
            sStyle = "pointer-events: none; opacity: 0.4; z-index: -1; visibility: visible";
        }

        document.getElementById("Formulas").style = sStyle;
        document.getElementById("Chart").style = "pointer-events: none; opacity: 0.4; z-index: -1; ";
    }
}
function KeyPressSavedChartName(e) {
 // alert("e.keyCode=" + e.keyCode);
    if (e.keyCode == 13) {
        saveChartAs();
    }
}
function KeyUpSavedChartName(e) {

//alert(document.getElementById("ChartName").value);
    var sNow = document.getElementById("ChartName").value;
    var select = document.getElementById('Predefined Charts');

        //      var sName = "Program-Chart1";
        var bFound = false;
        for (var i = 1; i < select.length; i++) {
            if (sNow == select.options[i].value) {
                bFound = true;
                break;
            }
        }
        if (!bFound) {
            document.getElementById("redFont").style = "visibility: hidden";
            document.getElementById("Replace").style = "visibility: hidden";
        }
        else {
            var s1 = document.getElementById("ChartName").value;
            if (s1 != "") {
                document.getElementById("redFont").style = "visibility: visible";
               //   document.getElementById("Replace").style = "visibility: visible";
                document.getElementById("redFont").innerHTML = "This name is already used. Cannot use it."//////////
                document.getElementById("Replace").style = "visibility: hidden";/////////
            }
        }

}
function ReplaceChart() {
 //   alert("Remove Chart");
 //   RemoveChart();
 //   return;

  //  alert("1.Replace Chart");

    var sNameToReplace = document.getElementById("ChartName").value;
    var indexToReplace = arChartNames.indexOf(sNameToReplace);
//alert("sNameToReplace=" + sNameToReplace + " indexToReplace=" + indexToReplace);
    // remove option from select
    /*
    var x = document.getElementById("Predefined Charts");
    //   x.remove(x.selectedIndex);
    x.remove(indexToReplace);
    */

    //saveChartAs();
localStorage.removeItem(sNameToReplace);
location.reload();
localStorage.setItem(sNameToReplace, getStrChartProgram());

//var x = document.getElementById("Predefined Charts");
//x.value = sNameToReplace;


//alert("2.Replace Chart");
    discardDlg();
 //   prevIndex = currIndex;
}
/*
function ShowDescription() {
    var cb = document.getElementById("cbShowDescription");
    var b = cb.checked;
    var taDescription = document.getElementById("taDescription");
    if (b) {
        taDescription.style = "visibility:visible;";
        sShowDescription = "Yes";
    }
    else {
        taDescription.style = "visibility: hidden;";
        sShowDescription = "No";
    }
}
*/
function getStrChartProgram() {

//alert("getStrChartProgram");

    var sTitle = document.getElementById("ChartName").value;
    var sSymbolList = "";
    if (arSymbolList != null) {
        for (var i = 0; i < arSymbolList.length; i++) {
            sSymbolList += arSymbolList[i];
            if (i != arSymbolList.length - 1) sSymbolList += ";";
        }
    }
    var sSymbolPresentation = "";
    if (arSymbolPresentation != null) {
        for (var i = 0; i < arSymbolPresentation.length; i++) {
            sSymbolPresentation += arSymbolPresentation[i];
            if (i != arSymbolPresentation.length - 1) sSymbolPresentation += ";";
        }
    }
    var sFormulaChain = "";
    if (arFormulasChain != null) {
        for (var i = 0; i < arFormulasChain.length; i++) {
            sFormulaChain += arFormulasChain[i];
            if (i != arFormulasChain.length - 1) sFormulaChain += ";";
        }
    }
    var sFormulaPresentation = "";
    if (arFormulaPresentation != null) {
        for (var i = 0; i < arFormulaPresentation.length; i++) {
            sFormulaPresentation += arFormulaPresentation[i];
            if (i != arFormulaPresentation.length - 1) sFormulaPresentation += ";";
        }
    }
    var sZoomStartEnd = "";//"90;100!0;100";
    for (var j = 0; j < arArZooms.length; j++) {
        if (j == nChartToDraw-1) {
            for (var i = 0; i < arZooms.length; i++) {
                sZoomStartEnd += arZooms[i];
                if (i != arZooms.length - 1) sZoomStartEnd += "!";
            }
        }
        else {
            sZoomStartEnd += arArZooms[j];
        }
        if (j != arArZooms.length - 1) sZoomStartEnd += "?";
    }
    var sPanes = "";//"100;100?100;50;25";
    for (var j = 0; j < arArPanes.length; j++) {
        if (j == nChartToDraw-1) {
            for (var i = 0; i < arPanes.length; i++) {
                sPanes += arPanes[i];
                if (i != arPanes.length - 1) sPanes += ";";
            }
        }
        else {
            sPanes += arArPanes[j];
        }
        if (j != arArPanes.length - 1) sPanes += "?";
    }
    var sLeftRightAtans = "";// "aln;nna"=> "aln" and "nna"

    var sChartToDraw = "" + nChartToDraw;
    var sFrequencyRange = document.getElementById("Frequency").value;
    for (var j = 0; j < arArLeftRightAtans.length; j++) {
        arArLeftRightAtans[j] = arLeftRightAtans[0] + ";" + arLeftRightAtans[1];
        sLeftRightAtans += arArLeftRightAtans[j];
        if (j != arArLeftRightAtans.length - 1) sLeftRightAtans += "?";
    }
    //   var sShowDescription = "No";
//if (document.getElementById("QuestionMark").value == "Hide") sShowDescription = "Yes";/////////////////////////////////////////
    var sDescription = document.getElementById("ChartDescription").value;
    var sTexts = "";
    for (var i = 0; i < arTexts.length; i++) {
        sTexts += arTexts[i];
        if (i != arTexts.length - 1) sTexts += "?";
    }
    var sParallelList = "";
    for (var i = 0; i < arParallelList.length; i++) {
        sParallelList += arParallelList[i];
        if (i != arParallelList.length - 1) sParallelList += ";";
    }

    var sChartProgram = sTitle + "<||>" + sSymbolList + "<||>" + sSymbolPresentation + "<||>" + sFormulaChain + "<||>" + sFormulaPresentation + "<||>"
        + sZoomStartEnd + "<||>" + sPanes + "<||>" + sChartToDraw + "<||>" + sFrequencyRange + "<||>" + sLeftRightAtans + "<||>"
      //  + sShowDescription + "<||>"
        + sDescription + "<||>" + sTexts + "<||>" + sParallelList;
    return sChartProgram;
}
function saveChartAs() {
 
  
    var sLastPredefinedName = "--------- My Saved Program-Charts";

    var s1 = document.getElementById("ChartName").value;
//alert(s1);
    if (s1 == "") return;

    var select = document.getElementById('Predefined Charts');
    for (var i = 0; i < select.length; i++) {
        var sName = select.options[i].value;
//alert("i=" + i + "sName=" + sName);
        if (sName == s1) {
            document.getElementById("redFont").style = "visibility: visible";
            document.getElementById("Replace").style = "visibility: visible";
//alert("Sorry: " + sName + "=" + s1 + "!= " + sLastPredefinedName);
            return;// Cannot use this name
        }
        if (sName == sLastPredefinedName) {
//alert("sName=" + sName);
            break;
        }
    }
//alert(3);
    var sChartProgram = getStrChartProgram();
//alert("sChartProgram=" + sChartProgram);
//alert("sSavedChartNames=" + sSavedChartNames);

    //save name
    //  var sSavedChartNames = "SavedChartNames";
    var savedNames;
    try {
        savedNames = localStorage.getItem(sSavedChartNames);
    } catch (err) {
        //alert( "err="+err.message);
    }
     
//alert("savedNames=" + savedNames);
    if (savedNames != undefined) {
//alert("defined already");
        savedNames += "<||>" + s1;
        localStorage.setItem(sSavedChartNames, savedNames);
    }
    else {
        //   localStorage.sSavedChartNames = s1;
//alert("not defined yet"+"\ns1="+s1);
        try {
            localStorage.setItem(sSavedChartNames, s1);
        } catch (err) {
           // alert( "err="+err.message);
        }
//alert(sSavedChartNames + " " + s1);
    }
/*
    try {
        alert("localStorage.getItem(sSavedChartNames)=" + localStorage.getItem(sSavedChartNames));
    } catch (err) {
        alert("err3=" + err.message);
    }
*/
    arChartNames.push(s1);

    //save chart// Store
 //   localStorage.s1 = sChartProgram;
    
    try {
        localStorage.setItem(s1, sChartProgram);
    } catch (err) {
      //  alert("err4=" + err.message);
    }
  //  alert("arChartNames=" + arChartNames);
//alert(localStorage.s1);


    var chart = sChartProgram.split("<||>");
    arPredefinedCharts.push(chart);

    // arPredefinedIndexdNameToIndexChart
    arPredefinedIndexdNameToIndexChart[arChartNames.length - 1] = arPredefinedCharts.length - 1;

    // add to select
    var opt = document.createElement('option');
    opt.value = s1;
    opt.innerHTML = s1;
    select.appendChild(opt);

    //  localStorage.removeItem("sSavedProgramCharts");
     
      /*  [
"Empty",//sTitle
"",// sSymbolList
"",//sSymbolPresentation
"",//sFormulasChain
"",//sFormulaPresentation
"0;100",//sZoomStartEnd
"100",//sPanes 100;0;10
"1",//sChartToDraw
"daily",//sFrequencyRange
"",//sShowDescription
"empty",//sDescription
"",//sTexts
""//sParallelList
    ]*/

    discardDlg();
// prevIndex = currIndex;
 //   currIndex = document.getElementById("Predefined Charts").length;   
}


function AddALine() {

    if (arMyShapes != null) {
      //  myDrawingFunction1();//set controls
    }

    // findMmaxPane();

    var sPane = findMmaxPane();
//alert("1. sPane="+sPane);
    if (sFrequencyRange != "none"){
        for (var i = 0; i < arSymbolList.length; i++) {
            arSymbolList[i] = document.getElementById("txtSymbol" + i).value;///////
        }
    }



    for (var i = 0; i < arFormulasChain.length; i++) {
        if (document.getElementById("name" + i) == null) {
            arFormulasChain.length = i;
            break;
        }
        arFormulasChain[i] = document.getElementById("name" + i).value + document.getElementById("formula" + i).value;
    }

//alert("2. sPane=" + sPane);
    bShowDlg = true;
    sSymbolFormula = "formula";
    nForDlg = arFormulasChain.length;
    SetTopPanel();
//alert("1. arFormulasChain.length="+arFormulasChain.length);
  //  loadPredefinedFunctions();
    setAlgo();
//alert("2. arFormulasChain.length=" + arFormulasChain.length);
//alert("3. sPane=" + sPane);
    var parts = sPresentationDefault.split("!");
    document.getElementById("selVisibility").value = parts[0];
    document.getElementById("selPane").value = sPane;
    document.getElementById("selYAxis").value = parts[2];
    document.getElementById("selType").value = parts[3];
    document.getElementById("selWidth").value = parts[4];
    document.getElementById("selStyle").value = parts[5];
    document.getElementById("selLegend").value = parts[6];
    document.getElementById("selChartN").value = parts[7];
    document.getElementById("selColor").value = parts[8];


 //    document.getElementById("txtSymbFormula" + nForDlg).value = "Data for Formula #" + nForDlg;
    //   document.getElementById("txtSymbFormula" + nForDlg).style.visibility = "hidden";

    document.getElementById("txtSymbFormula" + nForDlg).value = sAailableFunctions;
    document.getElementById("txtSymbFormula" + nForDlg).style.visibility = "hidden";
    document.getElementById("PresDialog").style = "height:100px; width:875px; background-color:yellow;border-style: solid;border-color: #0000ff; opacity: 0.99; z-index: 1; position: relative;"


    document.getElementById("dlgFunction" + nForDlg).focus();///////
}
function EditLine(i) {
    bShowDlg = true;
    sSymbolFormula = "formula";
    nForDlg = i;
    setAlgo();
    SetTopPanel();
    SetPresentationString(i, "formula");
    var nf = arFormulasChain[i].split("=");
    var func = nf[1];

    var idx = arFormulasChain[i].indexOf("=");
    func = arFormulasChain[i].substring(idx+1);


//alert(func);
    document.getElementById("dlgFunction" + i).value = func;

    
   // var iAvlbl = arFromSymbolListToAvailableIndex[n];
    // var s = showStockData3(arAvailableStiocks[iAvlbl]);
    var id = arFromPresentationIndexToSeriesID[i];
//alert("id=" + id);
//alert("id= "+id+" " + arAllDs[id].result.length + " " + arAllDs[id].result[0].length);
    var s = convertDStoString(arAllDs[id]);
//alert("tree: "+s);
    if(s=="") s="Calculated Data for Formula #" + i;

    document.getElementById("txtSymbFormula" + i).value = s;

    document.getElementById("dlgFunction" + i).focus();///////
//alert(4);
}
function SetTopPanel() {
    var sFor = "";
//alert("sSymbolFormula =" + sSymbolFormula );
    if (sSymbolFormula == "symbol") {//sSymbolList = "msft";// "msft;;;";
       var symb = "";

        if (nForDlg > 0) {
            if (nForDlg < arSymbolList.length) symb = arSymbolList[nForDlg];
        }
        if (nForDlg == 0) {
           // alert("arParallelList.length=" + arParallelList.length);
            if (arParallelList.length > 0) symb = arParallelList[0];
        }


        sFor = "Symbol #" + nForDlg + ": "
//        + '<input type="text" style="width:120px;color:' + color + '" id="dlgSymbol' + nForDlg + '" value="' + symb + '" onkeypress="KeyP(event)"/>';
        + '<input type="text" style="width:120px;" id="dlgSymbol' + nForDlg + '" value="' + symb + '" onkeypress="KeyP(event)"/>';
 /*       if (nForDlg == 0) {
            sFor += '<input type="checkbox" id="checkParallel"  onclick="ShowParallelList()">Parallel List</>'+ "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp";
            sFor += '<input type="file" id="fileinputParallel" style="visibility: hidden"/> ';
        }*/
        sFor += "&nbsp" + "&nbsp" + "&nbsp" + 'Examples:<select id="selAvailableSymbols" onchange="SetAvailanleSymbol()"></select>' + "&nbsp";
        sFor += '<br />';
    }
    if (sSymbolFormula == "formula") {// sFormulasChain = "MACD=ema(c,12)-ema(c,[26]);Signal=ema(MACD,[9])";
        var sName = "y" + nForDlg;
        if (nForDlg < arFormulasChain.length) {
            var nf = arFormulasChain[nForDlg].split("=");
            sName = nf[0];
        }
        sFor = "&nbsp" + "&nbsp" + "Formula #" + nForDlg + ": "
        + '<input type="text" style="width:60px;background-color:white;" id="dlgName' + nForDlg + '" value="' + sName + '=" onkeypress="KeyP(event)"/>'
        + '<input type="text" style="width:473px;background-color:white;" id="dlgFunction' + nForDlg + '" value="" onkeypress="KeyP(event)"/>'///////
      //  + '<input type="checkbox" name="vehicle" value="Car" onclick="ShowAvailablrFunctions("' + nForDlg + '"+"checked>';
   //     + '<input type="checkbox" id="checkAvailable"  onclick="ShowAvailableFunctions("' + nForDlg + '")>';
        + '<input type="checkbox" id="checkAvailable"  onclick="ShowAvailableFunctions()">Examples</>';
    }
    if (sSymbolFormula == "text") {
        sFor = "Table #" + nForDlg;
    }
    document.getElementById("TopPanel").innerHTML = "";
    document.getElementById("Dialog").innerHTML = "";
    if (bShowDlg && (sSymbolFormula == "symbol" || sSymbolFormula == "formula")) {

        var sDlg = '<div id="PresDialog" style="height:200px; width:875px; background-color:yellow;border-style: solid;border-color: #0000ff; opacity: 0.99; z-index: 1; position: relative;">';
        /*     if (sSymbolFormula == "formula") {
                 sDlg += '<select id="Predefined Functions" style="width:448px; margin-left: 284px" onClick="SetFormula() style="visibility:hidden"></select>';
             }*/
        sDlg += "<br/>" + "&nbsp" + "&nbsp" + '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" id="selOK333333" onclick="selOK()" value="OK" />'
            + '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" id="selCancel333333" onclick="selCancel()" value="Cancel" />' + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp";

                
        //     + sFor + '<br />' + '<br />'
        sDlg += sFor + "&nbsp" + "&nbsp"
      // + 'Chart:<select id="selChartN" onchange="SetChartN()"></select>' + "&nbsp" + "&nbsp" + '<br />' + '<br />'
        + '<select id="selChartN" onchange="SetChartN()" style="visibility: hidden"></select>' + "&nbsp" + "&nbsp" + '<br />'// + '<br />'
        + "&nbsp" + "&nbsp" + 'Visibility:<select id="selVisibility" onchange="SetVisibility()" style="background-color:white;"></select>' + "&nbsp" + "&nbsp"
        + 'Pane:<select id="selPane" onchange="SetPane()" style="background-color:white;"></select>' + "&nbsp" + "&nbsp"
        + 'Y-axis:<select id="selYAxis" onchange="SetYAxis()" style="background-color:white;"></select>' + "&nbsp" + "&nbsp"
        + 'Type:<select id="selType" onchange="SetType()" style="background-color:white;"></select>' + "&nbsp" + "&nbsp"
        + 'Width:<select id="selWidth" onchange="SetWidth()" style="background-color:white;"></select>' + "&nbsp" + "&nbsp"
        + 'Style:<select id="selStyle" onchange="SetStyle()" style="background-color:white;"></select>' + "&nbsp" + "&nbsp"
        + 'Legend:<select id="selLegend" onchange="SetLegent()" style="background-color:white;"></select>' + "&nbsp" + "&nbsp"
        + 'Color:<input type="color" id="selColor">' + "<br\>" + "<br\>"
       // + '<textarea wrap="off" id="txtSymbFormula' + nForDlg + '"+ rows="3" cols="101" readonly>Loading...</textarea>'
        + '<textarea wrap="off" id="txtSymbFormula' + nForDlg + '"+ rows="9" cols="101" readonly style="background-color:white;"></textarea>'
    + '</div>';
        document.getElementById("Dialog").innerHTML += sDlg;
        FillComboBox("selChartN", ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Next"]);
        FillComboBox("selVisibility", ["Yes", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1", "No"]);
        FillComboBox("selPane", ["1","2","3","4","5","6","7","8","9"]);
        FillComboBox("selYAxis", ["None", "Right", "Left"]);
        FillComboBox("selType", ["Line", "Bar", "Hstgm", "Edge"]);
        FillComboBox("selWidth", ["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
        FillComboBox("selStyle", ["Solid", "Dot", "Dash"]);
        FillComboBox("selLegend", ["Long", "Short", "None"]);

        if (sSymbolFormula == "symbol") {
            FillComboBox("selAvailableSymbols", arAailableSymbols);//["A","B","C"]
        }
    }
    if (bShowDlg && sSymbolFormula == "text") {// 600?
        var id = "text" + nForDlg;
        var sDlg = '<div id="PresDialog" style="height:150px; width:700px; background-color:yellow;border-style: solid;border-color: #0000ff; opacity: 0.99; z-index: 1; position: relative;">'//
        + '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" id="textOK55555" onclick="textOK()" value="OK" />'
        + '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" id="textCancel55555" onclick="textCancel()" value="Cancel" />' + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp"
      //  + '<input type="button" id="textRemove55555" onclick="textRemove()" value="Remove" />' + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp"
        + "Enter your data. Click OK to use it as Table #" + nForDlg + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp"
        + '<input type="file" id="fileinput" /> '+ "<br/>"
        + '<textarea wrap="off" id="' + id + '"+ rows="12" cols="80"  tag autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" style="background-color:white;border-color: grey;"></textarea>'
    + '</div>';

        document.getElementById("Dialog").innerHTML += sDlg;

        var id = "text" + nForDlg;
        //    alert("arTexts[nForDlg]="+arTexts[nForDlg]);
        var sText = "";
        if (nForDlg < arTexts.length) sText=arTexts[nForDlg];
        document.getElementById(id).value = sText;
//document.getElementById(id).scrollTop = 99999;
   //     alert("document.getElementById(id).value="+document.getElementById(id).value);

    }

    // ShowFormulas
//alert("ShowFormulas");
    var sChecked = "checked";
    if (sShowFormulas != "Yes") {
        sChecked = "";
        document.getElementById("Formulas").style.visibility = 'hidden';
    }
    else {
        document.getElementById("Formulas").style.visibility = 'visible';
    }
    var sCB = '<input type="checkbox" onclick="ShowFormulas(this);" ' + sChecked + '>';
    
    var sClearAll = '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" id="ClearAll"  value="Clear All" onclick="ClearAll()"/>';
    
    // Data Feed
    document.getElementById("TopPanel").innerHTML += sCB + "Show Formulas." + "&nbsp" + "&nbsp" +sClearAll+ "&nbsp" + "&nbsp" + "Data Feed:" + "&nbsp";

 //   var sFrequ = '<select id="Frequency" onchange="ChangeFrequency()"/>';
    //    document.getElementById("TopPanel").innerHTML += sFrequ;
    var sFrequ = '<select id="Frequency" onchange="ChangeFrequency()"><option value="daily">daily</option><option value="canned" selected="true">canned</option></select>';
    if (sFrequencyRange=="daily"){
        sFrequ = '<select id="Frequency" onchange="ChangeFrequency()"><option value="daily" selected="true">daily</option><option value="canned" >canned</option></select>';
    }
    document.getElementById("TopPanel").innerHTML += sFrequ;



//alert( " sFrequencyRange=" + sFrequencyRange);
    // Symbols
    if (sFrequencyRange != "none") {
        document.getElementById("TopPanel").innerHTML += "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "Symbols:" + "&nbsp"
     //   var arSymb = sSymbolList.split(";");
        //alert("arSymb.lengt=" + arSymb.length);

//if (arSymbolList.length != arSymbolPresentation.length) alert(arSymbolList.length+" "+arSymbolPresentation.length);
        for (var i = 0; i < arSymbolList.length; i++) {

            var parts = (arSymbolPresentation[i].split("!"));
            var color = parts[8];
            

            var sBut = '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" style="width:30px;color:' + color + ';" id="butSymbol' + i + '" onclick="EditSymbol(' + i + ')" value="' + i + '"/>';
            var sName = '<input type="text" onchange="symbolChanged(' + i + ')" onkeypress="KeyPress(event,' + i + ')" style="width:40px;color:' + color + ';" id="txtSymbol' + i + '" value="' + arSymbolList[i] + '"/>';
            document.getElementById("TopPanel").innerHTML += sBut + sName;     
        }
        var n = arSymbolList.length;
        var sAdd = '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" id="Add a Symbol"  value="Add Symbol" onclick="AddSymbol(' + n + ')"/>';
        document.getElementById("TopPanel").innerHTML += sAdd;
    }
    var nTexts = arTexts.length;
 //   alert("nTexts=" + nTexts);
 //   if (nTexts > 0) alert("arTexts[0]=" + arTexts[0]);
    document.getElementById("TopPanel").innerHTML += "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "Tables:" + "&nbsp"
    for (var i = 0; i < nTexts; i++) {
        var sButText = '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" style="width:30px;" id="butText' + i + '" onclick="EditText(' + i + ')" value="T' + i + '"/>';
        document.getElementById("TopPanel").innerHTML += sButText;

    }
    
 
    var sAdd = '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" id="Add a Text"  value="Add Table" onclick="AddText(' + nTexts + ')"/>';
    document.getElementById("TopPanel").innerHTML += sAdd;

    // Trace   
    var sTrace = '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)"  style="width:50px;" id="butTrace" onclick="Trace()" value="Trace"/>';
    var sLeft = '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" style="width:30px;" id="butGoLeft" disabled value="<" onclick="GoLeft()" />';
    var sRight = '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" style="width:30px;" id="butGoRight" onclick="GoRight()" disabled value=">"/>';
    document.getElementById("TopPanel").innerHTML += "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + sTrace + sLeft + sRight;


    //Zoom, Range
    var sUnZoom = '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" disabled style="width:65px;" id="butZoom" onclick="UnZoom()" value="UnZoom"/>';
    var sRange = ' <input type="range" id="slide" min="0" max="100" step="1" oninput="updateSlider(this.value)"/>';
    document.getElementById("TopPanel").innerHTML += "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + sUnZoom + sRange;

    // Help
   // var sContactUs = '<address><a href="mailto:lemcat27@google.com">Contact us</a></address>';
    //  document.getElementById("TopPanel").innerHTML += "&nbsp" + "&nbsp" + sContactUs;
//    var sHelp = '<a href="Online Algorithm Builder.pdf">Help</a>';
    //   var sHelp = '<input type="button" style="width:50px;" id="butHelp" onclick="Help()" value="Help"/>';
    var sHelp = '<select id="selHelp" onchange="showHelp()"></select>';
    document.getElementById("TopPanel").innerHTML += "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + sHelp;
   // FillComboBox("selHelp", ["Help:", "Data", "Level 2", "Book"]);//arHelp
    FillComboBox("selHelp", arHelpShort);

   /*
    var sVid =  '<input type="button" onmouseover="over(this.id)" onmouseout="out(this.id)" id="butHelp" value="Done" onclick="helpDone()" style="display:none"/>'+'<br>'+
       '<video width="1000" id="vid"  controls style="display:none"><source src="movies/GettingData.mp4" type="video/mp4"></video>';
    document.getElementById("TopPanel").innerHTML += "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + sVid;
    */

//

    var sPassword = '<input type="password" id="psw" onkeypress="KeyPasswordPressed(event)"/>';
    if (!bPassword) {
        document.getElementById("TopPanel").innerHTML += "&nbsp" + "&nbsp" + sPassword;
    }
    //Disclaimer
    // <input type="checkbox" onclick="HideDisclaimer(this);" checked/>
    var sDisclaimer = '<label id="Disclaimer">Disclaimer: Not an advice</label>';
//    document.getElementById("TopPanel").innerHTML += "&nbsp" + "&nbsp" + sDisclaimer;//////////////////////////////////////////////////////////


    ////////////
   /* 
    var arF = ["daily", "canned"];////////////////////////////////// replace with this one
   // var arF = [ "canned"];
    var x = document.getElementById("Frequency");
    for (var i = 0; i < arF.length; i++) {
    //    var option = document.createElement("option");
        option.text = arF[i];
    //    x.add(option);
        if (option.text == sFrequencyRange) {
//alert("option.text=" + option.text);
            x.options[i].selected = true;
        }
        else x.options[i].selected = false;
    }
    */
    //loadPredefinedFunctions();
    //  <form id="TopPanel" style="pointer-events: none; opacity: 0.4;"> </form>
    if (bShowDlg) {
        document.getElementById("TopPanel").style = "pointer-events: none; opacity: 0.4; z-index: -1;";
        var sStyle = "pointer-events: none; opacity: 0.4; z-index: -1; visibility: hidden";
        if (sShowFormulas == "Yes") {
            sStyle = "pointer-events: none; opacity: 0.4; z-index: -1; visibility: visible";
            /*
            document.getElementById("taDescription").style.visibility = "visible";
            */
        }
        else {
            /*
            document.getElementById("taDescription").style.visibility = "hidden";
            */
        }
        document.getElementById("Formulas").style = sStyle;
       document.getElementById("Chart").style = "pointer-events: none; opacity: 0.4; z-index: -1; ";
    }
    else {
    //   if (arMyShapes != null) {
   //             myDrawingFunction1();
   //     }
        document.getElementById("TopPanel").style = "opacity: 1.0; z-index: 1; ";
        document.getElementById("Formulas").style = "opacity: 1.0; z-index: 1; ";
        document.getElementById("Chart").style = "opacity: 1.0; z-index: 1;";

    }
    sMarker = "none";
    if (arZooms != null) {
        if (arZooms.length == 1) {
            document.getElementById("butZoom").disabled = true;//disabled = true;
            document.getElementById("slide").style.visibility = "collapse";
          //  document.getElementById("slide").style.display = "none";
        }
        else {//arZooms.length > 1   
            document.getElementById("butZoom").disabled = false;
            // slider
            setSliderValue();
        }
    }
//    alert(nTexts);
    for (var i = 0; i < nTexts; i++) {
   //     alert("i=" + i + " arTexts[i]=" + arTexts[i]);
        if (arTexts[i] != "") {
            document.getElementById("butText" + i).style = "font-weight:bold;"
        }
    }
    if (!bPassword) {
        document.getElementById("psw").focus();
    }
}

function AddSymbol(n) {

//alert("n=" + n);

    if (arMyShapes != null) {
     //   myDrawingFunction1();//set controls
    }


  //  findMmaxPane();
    var sPane = findMmaxPane();

    
//alert("sPane=" + sPane + " arSymbolList.length=" + arSymbolList.length);

    for (var i = 0; i < arSymbolList.length; i++) {

        arSymbolList[i] = document.getElementById("txtSymbol" + i).value;///////
    }
//alert(" arFormulasChain.length=" + arFormulasChain.length);
    for (var i = 0; i < arFormulasChain.length; i++) {
   //     alert("1. i=" + i);
        if (document.getElementById("name" + i) == null || document.getElementById("formula" + i) == null) continue;
        arFormulasChain[i] = document.getElementById("name" + i).value + document.getElementById("formula" + i).value;
   //     alert("1. i=" + i);
    }
    

    bShowDlg = true;
    sSymbolFormula = "symbol";
    nForDlg = arSymbolList.length;
    SetTopPanel();

  
    var parts = sPresentationSymbolDefault.split("!");
    document.getElementById("selVisibility").value = parts[0];
    document.getElementById("selPane").value = sPane;
    document.getElementById("selYAxis").value = parts[2];
    document.getElementById("selType").value = parts[3];
    document.getElementById("selWidth").value = parts[4];
    document.getElementById("selStyle").value = parts[5];
    document.getElementById("selLegend").value = parts[6];
    document.getElementById("selChartN").value = parts[7];
    document.getElementById("selColor").value = parts[8];

    
    //   document.getElementById("txtSymbFormula" + n).value = "Data for Symbol #" + n;
    document.getElementById("txtSymbFormula" + n).style.visibility = "hidden";
    document.getElementById("PresDialog").style = "height:120px; width:875px; background-color:yellow;border-style: solid;border-color: #0000ff; opacity: 0.99; z-index: 1; position: relative;"

   

    document.getElementById("dlgSymbol"+n).focus();///////

}
function findMmaxPane() {
    if (arSymbolPresentation.length == 0 && arFormulaPresentation.length == 0) {
        return 1;
    }
    var max = 1;
    for (var i = 0; i < arSymbolPresentation.length; i++) {
        var ss = arSymbolPresentation[i].split("!");
        if (max < 1 * ss[1]) max = 1 * ss[1];  
    }

    {
        for (var i = 0; i < arFormulaPresentation.length; i++) {
            var ss = arFormulaPresentation[i].split("!");
            if (max < 1 * ss[1]) max = 1 * ss[1];
        }
    }
    max++;

if (max >= 9) max = 9;//////

    return ""+max;
}
function AddText(n) {
//alert(1);
if (arMyShapes != null) {
   // alert(arMyShapes.length);
    //myDrawingFunction1();//set controls
   // alert(11);
    }

//alert(2);

    bShowDlg = true;
    sSymbolFormula = "text";
    nForDlg = arTexts.length;
    SetTopPanel();
//alert(3);
    document.getElementById("text" + nForDlg).focus();


    document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
   // document.getElementById('fileinput').addEventListener('click', readSingleFile, false);
}
function Help() {
  //  alert("Information is provided 'as is' and solely for informational purposes, not for trading purposes or advice");
  //  var stock=stockFromTable(0);
  //  alert(document.getElementById("butText0").value);
  //  alert(arTexts[0]);
/*    var s = arTexts[0];
    var rows = s.split("\n");
    var N = rows.length;
    alert(N);
    alert(rows[0]);
    alert(rows[1]);
    alert(rows[N-1]);
    */
    // Store
  //  localStorage.setItem("lastname", "Smith");
    // Retrieve
    /*
    var s=localStorage.getItem("lastname");
    document.getElementById("butHelp").value = s;
    */
 //   if (s == "Smith") {
 //       localStorage.removeItem("lastname");
 //   }

    /*
 //  for (var pp in o2) { console.log(pp, o2[pp]);} // prints// b 4// a 3
   
    var sProp = "";
    for (var i = 0; i < arAllDs.length; i++) {
        var s = "";
        var obj=arAllDs[i];
        for (var pp in obj) {
            s+=pp+":"+obj[pp]+" ";
        }
        sProp+=s+"\n";
    }
 alert(sProp);
   

    var N= arSymbolList.length;
    var s = "";
    for (var i = 0; i < N; i++) {
        s += arSymbolList[i] + " ;";
    }

    var M =arSymbolPresentation.length;
   var ss = "";
    for (var i = 0; i < M; i++) {
        ss += arSymbolPresentation[i] + " ;";
    }

    var sss = "";
    var LL = arNameFormula.length;
    for (var i = 0; i < LL; i++) {
        sss += arNameFormula[i][0] + "=" + arNameFormula[i][1] + " ;";
    }

    var MM = arFormulaPresentation.length;
    var ssss = "";
    for (var i = 0; i < MM; i++) {
        ssss += arFormulaPresentation[i] + " ;";
    }

    alert("Help: \n" + N + ": " + s + " \n" + M + ": " + ss + " \n" + LL + ":" + sss + " \n" + MM + ": " + ssss + "\n"+bShowX+" "+ bShowLeftY+" "+bShowRightY+" "+dLeftZoom+" "+dRightZoom);
    */
}

///////////////
function ClearAll() {
    openSelectedChart(1);
    document.getElementById("Predefined Charts").selectedIndex = 1;
    prevIndex = 1;

   // document.getElementById("QuestionMark").value = "Descr";
 //   document.getElementById("QuestionMark").value = "?";
 //   document.getElementById("lableDescription").style.visibility = "hidden";
    document.getElementById("taDescription").style.visibility = "hidden";
 //   currIndex = 1;/// ?????????
}
/*
function changeChartNames(name) {
    // alert(name);
    arChartNames = ["Select and Modify", "Empty", "--------- Getting Data", "One Stock", "Two Stocks", "Three Stocks", "Seven Stocks",
    "Close", "Open", "High, low, volume",
    "+ Basic Functions",
    "--------- Standard Financial Indicators", "True high/low, buy/sell pressure", "Positive/negative directional movement", "MACD and Signal", "Relative percent change", "Stochastic Fast", "Stochastic Slow", "Relative Strength Index",
    "Money Flow Index", "Chande Trend Index", "Bollinger Bands", "On Balance Volume", "Momentums (ROC,% and Diff)", "Wilder Volatility Index", "Positive / Negative / Advanced Directional Movement Index",
    "ATR Bands", "Parabolic", "Commodity Channel Index",
    "--------- Options", "Simple Moving Volatility", "Exponential Moving Volatility", "GARCH Volatility", "Black-Scholes Calls & Puts",
    "Implied Volatility",
    "--------- My Saved Algorithms"
    ];
    var select = document.getElementById("Predefined Charts");
    var newLength = select.options.length;
    select.length = 0;//to close
  // change arPredefinedCharts()
    loadPredefinedCharts();

}
function DropList() {
    // alert(sSelectedPredefinedName);
    // alert(sSelectedPredefinedName);
 //   document.getElementById("Add a Symbol").value = sSelectedPredefinedName;
 //   alert(arChartNames[nSelectedPredefinedName]);
    if (sSelectedPredefinedName[0]=='-' || sSelectedPredefinedName[0]=='+'){
        var n = document.getElementById("Predefined Charts").options.length;
        document.getElementById("Predefined Charts").size = n;
    }
}
*/
function SetChart() {
    // Hide description
  //  document.getElementById("QuestionMark").value = "?";
   // document.getElementById("QuestionMark").value = "Descr";
  //  document.getElementById("lableDescription").style.visibility = "hidden";
    document.getElementById("taDescription").style.visibility = "hidden";  
    var currIndex = document.getElementById("Predefined Charts").selectedIndex;
//alert("0. Selected Index = " + currIndex + " prevIndex=" + prevIndex);
    if (currIndex > 0) {
        //  alert("1. Selected Index = " + currIndex + " prevIndex=" + prevIndex);
        if (prevIndex != currIndex) {
/*sSelectedPredefinedName = arChartNames[currIndex];//////////////////////////////////////////////////////
            //alert(arChartNames[currIndex]);
document.getElementById("Add a Symbol").value = sSelectedPredefinedName;
            if (arChartNames[currIndex][0] == '-' || arChartNames[currIndex][0] == '+') {

                changeChartNames(arChartNames[currIndex]);/////////////////////////////////////////////////////////////////////////////// 12/26/2017
                DropList();
            //    bCloseUp = false;
                return;
            }*/
            openSelectedChart(currIndex);
          //  bCloseUp = true;
//nSelectedPredefinedName = currIndex;//////////////////////////////////////////////////////////////////////////////
            prevIndex = currIndex;
 /*           sSelectedPredefinedName = arChartNames[prevIndex];
document.getElementById("Add a Symbol").value = sSelectedPredefinedName;*/

        }
        else {
            prevIndex = "";

        }
        //      alert("2. Selected Index = " + currIndex + " prevIndex=" + prevIndex);

    }
   
    // if it is a saved chart, enable "Remove"
    var savedNames = localStorage.getItem(sSavedChartNames);
    if (savedNames != undefined) {
        var arSavedChartNames = savedNames.split("<||>");

        indexChart = arPredefinedIndexdNameToIndexChart[currIndex];
//alert(indexChart + " " + currIndex);
        var chart = arPredefinedCharts[indexChart];
        var sTitle = chart[0];
//alert("sTitle=" + sTitle);
        if (arSavedChartNames.indexOf(sTitle) != -1) {
            document.getElementById("RemoveChart").disabled = false;
        }
        else {
            document.getElementById("RemoveChart").disabled = true;
        }
    }
    else {
 //       alert("No saved Charts.");
    }
 
 /*   if (bCloseUp) {
document.getElementById("Add a Symbol").value = "CloseUp";
        document.getElementById("Predefined Charts").options.length = 0;/////////////////////////////////
        loadPredefinedCharts();//////////////////////////////////////////////////////////////////////////

    }*/
    
}
function ChangeFrequency() {
//    alert("ChangeFrequency: sFrequencyRange=:" + sFrequencyRange);
  //  arAvailableStiocks.length = 0;//[[name],[arDate],[arOpen],ar[High],[arLow],[arClose],[arVolume]]
 //   arAvailableStiocksDaily.length = 0;
 //   arAvailableStiocksCanned.length = 0;
 //  arStock = []// current stock


  //  bTraceOn = false;

    var x = document.getElementById("Frequency").value;
 //alert("x="+x);
    if (x == "daily") {
        bWikiFeed = true;
        bGoogleFeed = false;
        sFrequencyRange = "daily";
       arAvailableStiocks = arAvailableStiocksDaily;
        
    }
    else {//canned
        bWikiFeed = false;
        bGoogleFeed = true;
        sFrequencyRange = "canned"
        //nGlobalShift = indexDailyFromDate(sStartDateG);
        // bGoogleFound = true;
        // sStartDateG -= 259;
        arAvailableStiocks = arAvailableStiocksCanned;
    }




 //   alert(x);
    sFrequencyRange = x;
    //alert("ChangeFrequency:" + sFrequencyRange);

//alert("1. bWikiFeed=" + bWikiFeed + "bGoogleFeed=" + bGoogleFeed);
    SetTopPanel();
//alert("2.bWikiFeed=" + bWikiFeed + "bGoogleFeed=" + bGoogleFeed);


//myDrawingFunction();

  sErrorLeft ="dirty";// report the first error
  getData();//????????????????????
//    ctx.fillText("Wait, please.", 10, 50);
//    Recalculate();
  //  myDrawingFunction();
    ////////////////////////////////////
/*    alert(" RECALCULATE and DRAW");

    sErrorLeft = "";
    document.getElementById("butTrace").value = "Trace";
    document.getElementById("butGoLeft").disabled = true;
    document.getElementById("butGoRight").disabled = true;
    sMarker = "none";

    Recalculate();
    rememberListsAndChain();// save old state 
    alert("Recalculated");
    myDrawingFunction();*/
    //////////////////////
  

}
function EditText(n) {
   // alert(n);

    bShowDlg = true;
    sSymbolFormula = "text";
    nForDlg = n;
    SetTopPanel();
    // document.getElementById("text" + nForDlg).focus();
//alert("before setCaretToPos");
    //setCaretToPos(textArea, 0);
//alert("after setCaretToPos");
    document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
}

function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}
function setCaretToPos(input, pos) {
    setSelectionRange(input, pos, pos);
}
function KeyPasswordPressed(e) {
    if (e.keyCode == 13) {
        var p = document.getElementById("psw");
        if (p.value == "gorelik") {
            document.getElementById("psw").style.visibility = "hidden";
            bPassword = true;
       //     bInsideOfOnLoad = false;
            getData();
             //  openSelectedChart(nSelectedPredefinedName);
          //  openSelectedChart(32);
            //   myDrawingFunction();
//;///////////////////////////////////////////////////////////////////////////////////////////////////////
        }

    }
}
function KeyP(e) {
    if (e.keyCode == 13) {
        selOK();
    }
}
function KeyPress(e,i) {
    if (e.keyCode == 13) {
        var tb = document.getElementById("txtSymbol" + i);
        var s = tb.value;
        arSymbolList[i] = s;

        getData();
    }
}

function modifyAllFormulas()
{
    for (var i = 0; i < arFormulasChain.length; i++) {
        var tbN = document.getElementById(id = "name" + i);
        var n = eatSpaces(tbN.value);
        if (n.indexOf("=") == -1) {
            document.getElementById(id = "name" + i).value = n;
        }
        var tbF = document.getElementById(id = "formula" + i);
        var f = eatSpaces(tbF.value);
        arFormulasChain[i] = n + f;
    }
}

function KeyAlgoPressed(e, i) {
  //  alert(9);
    if (e.keyCode == 13) {


        modifyAllFormulas();/////////////////////////
        /*
        var tbN = document.getElementById(id = "name" + i);
        var n = eatSpaces(tbN.value);
        if (n.indexOf("=") == -1) {
            document.getElementById(id = "name" + i).value = n;
        }
        var tbF = document.getElementById(id = "formula" + i);
        var f = eatSpaces(tbF.value);
        arFormulasChain[i] = n + f;
        */


        var sFormulasChain = "";
        for (var k = 0; k < arFormulasChain.length; k++) {
            sFormulasChain += arFormulasChain[k];
        }

   /////////////////////////////////////////////////////////
/*
        // alert("Key f=" + f);
        for (var i = 0; i < arNameFormula.length; i++) {
            //alert("i=" + i);
            sFormula = arNameFormula[i][1];
            sFormula = eatSpaces(sFormula);
alert("sFormula=" + sFormula + " old=" + oldAr[i][1]);
           // var sFormula = f;
            if (sFormula.indexOf("minVarPortf") >= 0) {
                var pos2 = sFormula.indexOf(",", 12);
                //     alert(sFormula.substring(12, pos2));
                var nIn = 1 * sFormula.substring(12, pos2);
alert("table=" + nIn);
                //  alert(arTexts.length);
                if (arTexts == null || arTexts.length <= nIn || arTexts[nIn].length == 0) {
                    //   alert("empty table " + nIn);
                    // throw "empty table " +nIn;
                }
                else {
                    //  alert("OK");
                }
                doMinVarPortf(nIn);
            }
        }
*/
    
    ///////////////////////////////////////////////////////



//alert(n + f + "bSymbolsAreTheSame=" + bSymbolsAreTheSame);
        if (!bSymbolsAreTheSame) {
//alert("!bSymbolsAreTheSame");
            getData();
            bSymbolsAreTheSame = true;
        }     
       else
        {
//alert("else");
            Calculate("new formula");
        }
        
        
    }

   // myDrawingFunction();// ????????????????????/
}
function formulaChanged(i) {

   // var oldAr = arNameFormula.slice();
    var tbN = document.getElementById(id = "name" + i);
    var n = eatSpaces(tbN.value);
//alert( "n=" + n);
    var nTrimmed = n;
    var posEq = n.indexOf("=");
//alert("posEq=" + posEq);
    if (posEq >= 0) {
        nTrimmed = n.substring(0, posEq);
    }
//alert(n + "->" + nTrimmed);

    var tbF = document.getElementById(id = "formula" + i);
    var f = eatSpaces(tbF.value);

    //arNameFormula[i][0] = n;
    arNameFormula[i][0] = nTrimmed;
    arNameFormula[i][1] = f;

    
    arFormulasChain[i] = n + f;


    var sFormulasChain = "";
    for (var k = 0; k < arFormulasChain.length; k++) {
        sFormulasChain += arFormulasChain[k];
    }
    /*
    // alert("Key f=" + f);
    for (var i = 0; i < arNameFormula.length; i++) {
        //alert("i=" + i);
        var sFormula = arNameFormula[i][1];
        sFormula = eatSpaces(sFormula);
 //alert("sFormula=" + sFormula + " old=" + oldAr[i][1]);
        // var sFormula = f;
        if (sFormula.indexOf("minVarPortf") >= 0) {
            var pos2 = sFormula.indexOf(",", 12);
            //     alert(sFormula.substring(12, pos2));
            var nIn = 1 * sFormula.substring(12, pos2);
//alert("table=" + nIn);
            //  alert(arTexts.length);
            if (arTexts == null || arTexts.length <= nIn || arTexts[nIn].length == 0) {
                //   alert("empty table " + nIn);
                // throw "empty table " +nIn;
            }
            else {
                //  alert("OK");
            }
            var pres = arFormulaPresentation[i];
            var parts = pres.split('!');
            sPortfIndexesStyle = "thin solid " + parts[parts.length - 1];
            var pane = 1 * parts[1];
            doMinVarPortf(nIn,pane);
        }
    }
    */


}
function symbolChanged(i) {
        var tb = document.getElementById("txtSymbol" + i);
        arSymbolList[i] = tb.value;
  /*      if (i == 0) {
            arParallelList[0] = tb.value;
        }*/
        bSymbolsAreTheSame = false;
/*
//alert("i=" + i +" arOldPortfIndexes=" + arOldPortfIndexes);
        if (arOldPortfIndexes.indexOf(i)>=0) {
//alert("1. arTexts[nPortfTable]="+arTexts[nPortfTable]);
            arTexts[nPortfTable] = "";
            for (var k = 0; k < arOldPortfIndexes.length; k++) {

                var indx = arOldPortfIndexes[k];
                var s = eatSpaces(arSymbolList[indx]);
//alert("indx="+indx+" s="+s);
                    if(s.length!=0){
                    arTexts[nPortfTable] += s + "\n";
                }
            }
        }
    //alert("2. arTexts[nPortfTable]=" + arTexts[nPortfTable]);

      //  checkIfItIsMinVarPortf();
*/
}
//////////////////////////////////////////
function Trace() {
    var sButTrace = document.getElementById("butTrace").value;
    if (sButTrace == "Trace") {
        sMarker = "marker";
        document.getElementById("butTrace").value = "Hide";
        document.getElementById("butGoLeft").disabled = false;
        document.getElementById("butGoRight").disabled = false;//check left/right ?????

        arMyShapes[arMyShapes.length - 1].arInfo[0] = sButTrace;// ???????

     //   var x = listLeftTopPanes[0][0] + xPosShare * listPanes[0].width;
        nMarkerIndex = Math.round(nLeftIndex + xPosShare * (nRightIndex - nLeftIndex));

        var k = listPanes.length;
        var y = listLeftTopPanes[0][1] + yPosShare * (listLeftTopPanes[k - 1][1] + listPanes[k - 1].height - listLeftTopPanes[0][1]);

        showTraceMesg(y);

    }
    else {
        hideTrace();


    }
}

function hideTrace() {
    document.getElementById("butTrace").value = "Trace";
    document.getElementById("butGoLeft").disabled = true;
    document.getElementById("butGoRight").disabled = true;
    sMarker = "none";
    myDrawingFunction1();
}
function GoLeft() {
    //  alert("GoLeft ");
    xPosShare = 1 * xPosShare - 1.0 / (1 * nRightIndex - nLeftIndex);

  //  var x = listLeftTopPanes[0][0] + xPosShare * listPanes[0].width;
    nMarkerIndex--;

    var k = listPanes.length;
    var y = listLeftTopPanes[0][1] + yPosShare * (listLeftTopPanes[k - 1][1] + listPanes[k - 1].height - listLeftTopPanes[0][1]);

  //  showTraceMesg(x, y);
  //  showTraceMesg(nMarkerIndex, y);
    showTraceMesg(y);
}
function GoRight() {
    // alert("GoRight ");
    xPosShare = 1 * xPosShare + 1.0 / (1 * nRightIndex - nLeftIndex);

    var x = listLeftTopPanes[0][0] + xPosShare * listPanes[0].width;
    nMarkerIndex++;

    var k = listPanes.length;
    var y = listLeftTopPanes[0][1] + yPosShare * (listLeftTopPanes[k - 1][1] + listPanes[k - 1].height - listLeftTopPanes[0][1]);

   // showTraceMesg(x, y);
  //  showTraceMesg(nMarkerIndex, y);
    showTraceMesg(y);

}
//function showTraceMesg(xOffset, yOffset) {
//function showTraceMesg(nMarkerIndex, yOffset) {
function showTraceMesg( yOffset) {
    if (listLeftTopPanes.length == 0) return;

  //  var i = nLeftIndex + Math.round(0.5 + (xOffset - listLeftTopPanes[0][0]) * (nRightIndex - nLeftIndex) / listPanes[0].width);//for calcs
    var i = nMarkerIndex;

    //alert(nLeftIndex + " " + i + " " + nRightIndex);
    if (i >= nRightIndex) document.getElementById("butGoRight").disabled = true;
    else document.getElementById("butGoRight").disabled = false;
    if (i <= nLeftIndex) document.getElementById("butGoLeft").disabled = true;
    else document.getElementById("butGoLeft").disabled = false;

    var dPos = listLeftTopPanes[0][0] + (i - nLeftIndex) * listPanes[0].width / (nRightIndex - nLeftIndex);//for drawing
    //  alert("dPos=" + dPos);
    var sMesg = "";
    var sMesgParam = "";
    var indexDate = i;
    var arParamNames = [];
    var iLine = -1;
    for (var j = 0; j < arNameFormula.length; j++) {
 /*       if (arNameFormula[j][1].indexOf("tFromTo") >= 0) {
            iLine = j;
            sMesg = "t";
            //  break;
        }
        if (arNameFormula[j][1].indexOf("xFromTo") >= 0) {
            iLine = j;
            sMesg = "x";
            //  break;
        }
        */
   /*     if (arNameFormula[j][1].indexOf("param") >= 0) {
            arParamNames.push(arNameFormula[j][0]);
        }*/
        // curve=param(x,y); A=curve
        var id = arFromPresentationIndexToSeriesID[j];
        if (id < 0) continue;
        if (arAllDs[id].result.length == 2 && arAllDs[id].result[0][0] == "x") {//param
            arParamNames.push(arNameFormula[j][0]);
        }
    //    if (arAllDs[id].result.length >= 1 && arAllDs[id].result[0].length >= 1 && arAllDs[id].result[0][0] != 'x') {// table
        if (isMatrix(arAllDs[id].result)) {// table
           // alert("Table msg " + arAllDs[id].name);
            arParamNames.push(arNameFormula[j][0]);// 8/31/2017
        }

    }
    /*
    if (iLine >= 0) {
        var id = arFromPresentationIndexToSeriesID[iLine];
        if (id >= 0) {
            var arResult = arAllDs[id].result;
            var N = arResult.length;
            //     var x = From + i * (To - From) / (N - 2);
            var step=(To - From) / (N - 2);
//alert("i=" + i + " N="+N+" From=" + From + " To=" + To + " Step=" + Step + " x=" + x);
            var x = From + i * Step;
            //  sMesg += "Coord =  " + x + ";";
            var date=dateDailyFromIndex(i);


            sMesg += "Coord =  " + BuildString(x);
        }
    }
    else {  //if (sFrequencyRange == "daily")
        //sMesg = "date = " + dateDailyFromIndex(i) + ";";
        if (nRightIndex == nLeftIndex) sMesg = "date = None";
        else sMesg = "date = " + dateDailyFromIndex(i);
    }
    */

    if (arSymbolPresentation.length > 0 || bYahooFound || bHidden || bWikiFound) sMesg += dateDailyFromIndex(i) + ";";
    sMesg += i;
    if (bFromToFound) {
        var x = From + i * Step;
        sMesg += " or " + BuildString(x);
    }

    for (var i = 0; i < arSymbolPresentation.length; i++) {// parallel list is not drawn
        if (arSymbolList[i] == "") continue;
        var parts = arSymbolPresentation[i].split("!");
        if (parts[7] != "" + nChartToDraw) continue;// do i need it???
        //   var dVisible = getVisible(parts[0]);
        if (parts[0] == "No") continue;
        var nPane = parts[1] - 1;
        if (dListPanes[nPane] == 0) continue;
        if (arFromSymbolListToAvailableIndex.length <= i) continue;// ?????????????????????????????????????// by definiton never happems?
        var charYScale = "n";
        var iAvlbl = arFromSymbolListToAvailableIndex[i];
        var stock = arAvailableStiocks[iAvlbl];
        var sName = stock[0][0];
        var k = indexDate - 1 * stock[4][0] + 1;
 if (k > 0) 
     sMesg += ";" + sName + " = " + BuildString(1 * stock[4][k]);
        else
     sMesg += ";" + sName + " = None" ;
    }
    for (var i = 0; i < arFormulaPresentation.length; i++) {
        if (arNameFormula[i][0] == "" || arNameFormula[i][1] == "") continue;
        var parts = arFormulaPresentation[i].split("!");
        if (parts[7] != "" + nChartToDraw) continue;// do i need it???
        //     var dVisible = getVisible(parts[0]);
        if (parts[0] == "No") continue;
        var nPane = parts[1] - 1;
        if (dListPanes[nPane] == 0) continue;
        var id = arFromPresentationIndexToSeriesID[i];
        if (id < 0) continue;

        var arResult1 = arAllDs[id].result;

        // 8/31/2017
       // var bTable = false;
     //   if (arResult1[0].length >= 1 && arResult1.length >= 1 && arResult1[0][0] != 'x') {
          if (isMatrix(arResult1)) {
            /*
            var b = [1];
            var len = arResult1[0].length;
            var kStart = 1;
            if (!isNaN(arResult1[0][0])) kStart = 0;
            for (var kk = kStart; kk < arResult1.length; kk++) {
                b.push(arResult1[kk][len - 1]);
            }
            arResult1 = b;
            //   bTable = true;
        
            var k = indexDate - 1 * arResult1[0] + 1;
            var Yk = 1 * arResult1[k];
            sMesg += ";" + arNameFormula[i][0] + " = " + BuildString(Yk);
            */
              var len = arResult1[0].length;

       /*     var indexStart = 1;
          //  var indexEnd = arResult1.length;
            var sYmd = "" + arResult1[1][0];
            var ymd = sYmd.split("-");//var res = str.split("-");
            if (ymd.length == 3) {
                var year = 1 * ymd[0];
                var month = 1 * ymd[1];
                var day = 1 * ymd[2];
                if (year > 1900 && year < 2200 && month >= 0 && month <= 12 && day > 0 && day <= 31) {
                    //alert(year+" "+month+" "+day+" "+indexDailyFromDate(sYmd));
                    indexStart = indexDailyFromDate(sYmd);
                  //  indexEnd = indexStart + arResult1.length - 2;//0
                }
            }*/
              var indexStart = findIndexStartInMatrix(arResult1);
//alert("indexStart=" + indexStart);

            var b = [indexStart];
            var kStart = 0;
            if (arResult1[0][0].length > 0 && isLetter(arResult1[0][0])) kStart = 1;
            for (var kk = kStart; kk < arResult1.length; kk++) {
                b.push(arResult1[kk][len - 1]);
            }
//alert("b=" + b);
            var k = indexDate - 1 * b[0] + 1;
            var Yk = 1 * b[k];
           if (k != 0) //12/1/2017
            {
                sMesg += ";" + arNameFormula[i][0] + " = " + BuildString(Yk);
           }
           else {
               sMesg += ";" + arNameFormula[i][0] + " = NaN";//12/1/2017
           }
        }// 8/31/2017



        
        var sName = arNameFormula[i][0];
        if (arParamNames.indexOf(sName) != -1) {
           var k = indexDate - 1 * arResult1[1][0] + 1;
            var xk=arResult1[0][k];
            var yk = arResult1[1][k];
            var xyc = xycParam(xk, yk, nPane, parts[2], parts[8], arResult1[1]);
            sMesgParam += "?" + xyc[0] + ";" + xyc[1] + ";" + xyc[2];
            continue;
        }
        var k = indexDate - 1 * arResult1[0] + 1;
        //   sMesg += ";" + sName + " = " + BuildString(1 * arResult1[k]) + "!" + parts[8];
        var Yk = 1 * arResult1[0];// constant
        if (arResult1.length ==1){
            sMesg += ";" + sName + " = " + BuildString(Yk);
        }
        if (arResult1.length > 1 && k > 0) {
            Yk = 1 * arResult1[k];
            sMesg += ";" + sName + " = " + BuildString(Yk);
        }
        if (arResult1.length > 1 && k < 1) {
            sMesg += ";" + sName + " = None";
        }

//alert("k="+k+" sMesg="+sMesg);
    }

    sMarkerMessage = sMesg + sMesgParam;
 //   alert(sMarkerMessage);//tCoord =  150;x = 0.50000!#FF0000;y = -0.86603!#0000FF?812.5;607.5300529996671;#007700
    myDrawingFunction();
}
function xycParam(xk, yk, nPane, sLeftRight, color, ar) {
//    alert("xycParam: " + xk + " " + yk + " " + nPane + " " + sLeftRight + " " + color);
    var xyc = [];
    var charAtan = 'n';///////
    var yMin = Number.MAX_VALUE;
    var yMax = -Number.MAX_VALUE;
    if (sLeftRight == "Left") {
        yMin = aLeftMins[nPane];
        yMax = aLeftMaxs[nPane];
        charAtan = arLeftRightAtans[0][nPane];////////////
    }
    else if (sLeftRight == "Right") {
        yMin = aRightMins[nPane];
        yMax = aRightMaxs[nPane];
        charAtan = arLeftRightAtans[1][nPane];////////////////
    }
    //alert(yMin + " " + yMax);
    var controlLeft = listLeftTopPanes[nPane][0];
    var yTop = listLeftTopPanes[nPane][1] + FontHeight + deltaTop;//deltaTop=3
    var width = listPanes[nPane].width;
    var yBottom = yTop + listPanes[nPane].height - FontHeight - deltaTop - deltaBottom;//FontHeight=13; deltaBottom=3

    //alert(controlLeft + " " + yTop + " " + width + " " + yBottom);
    var ratioXoverY = (-yTop + yBottom) * (xRightParam - xLeftParam) / (yMax - yMin);


    /////////////////////////
  //  alert("1. charAtan = " + charAtan + " yMin=" + yMin + " yMax=" + yMax);
    if (charAtan == "l") {

        yMin = Math.log10(yMin);
  /*      if (yMin == Number.NEGATIVE_INFINITY || isNaN(yMin)) {
            yMin = Number.MAX_VALUE;
            for (var i = 1; i < ar.length; i++) {
                var d = 1 * ar[i];
                if (d > 0 && d < yMin) yMin = d;//minimum positive number
            }
            yMin = Math.log10(yMin);
        }*/
        yMax = Math.log10(yMax);
        if (yMax == Number.POSITIVE_INFINITY || isNaN(yMax)) {
            yMax = Number.MAX_VALUE;
        }
        else yk = Math.log10(yk);
    }
    if (charAtan == "a") {
        yMin = Math.atan(yMin);
        yMax = Math.atan(yMax);
        yk = Math.atan(yk);
    }
 //   alert("2. charAtan = " + charAtan + " yMin=" + yMin + " yMax=" + yMax);
    ////////////////////////////
    // atan? log10?

    var y = yTop + (yMax - yk) * (-yTop + yBottom) / (yMax - yMin);//y = yTop + (-yTop + yBottom) / 2;
    var x = controlLeft + width + ratioXoverY * (xk- xRightParam) / (xRightParam - xLeftParam);

//alert(x + " " + y + " " + color);

    if (x < controlLeft) {
        x = controlLeft;
    }
        xyc.push(x);
        xyc.push(y);
        xyc.push(color);

    return xyc;
}
function UnZoom() {
    hideTrace();

    //sZoom="98;100!0;100";  => 0;100"
    if (arZooms.length > 0) arZooms.splice(0, 1);//The second parameter of splice is the number of elements to remove.
    //    if(arZooms.length==0) document.getElementById("butZoom").disabled = true;//disabled = true;
    // if now  if (arZooms.length == 1) hide slider. Do ineed it???
    myDrawingFunction();

    var el = document.getElementById("butZoom");
    el.style.backgroundColor = backColor;
}
function readSingleFile(evt) {
    //   alert("readSingleFile");
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function (e) {
            var contents = e.target.result;
            /*    alert("Got the file.n"
                      + "name: " + f.name + "n"
                      + "type: " + f.type + "n"
                      + "size: " + f.size + " bytesn"
                      + "starts with: " + contents.substr(1, contents.indexOf("n"))
                );*/

            

              var ss = r.result;
              ss = ss.replace(/,/g, "\t");

// alert("ss=" + ss);

            document.getElementById("text" + nForDlg).value = ss;
        }
        r.readAsText(f);
    } else {
        alert("Failed to load file");
    }
}
function ShowAvailableFunctions() {
    if (document.getElementById("checkAvailable").checked == true) {
       // alert("Checked");
        document.getElementById("txtSymbFormula" + nForDlg).value = sAailableFunctions;
        document.getElementById("txtSymbFormula" + nForDlg).style.visibility = "visible";
        document.getElementById("PresDialog").style = "height:200px; width:875px; background-color:yellow;border-style: solid;border-color: #0000ff; opacity: 0.99; z-index: 1; position: relative;"


    } else {
      //  alert("NOT Checked");
     //   document.getElementById("txtSymbFormula" + nForDlg).value = sAailableFunctions;
        document.getElementById("txtSymbFormula" + nForDlg).style.visibility = "hidden";
        document.getElementById("PresDialog").style = "height:100px; width:875px; background-color:yellow;border-style: solid;border-color: #0000ff; opacity: 0.99; z-index: 1; position: relative;"

    }
}
function ShowParallelList() {
    if (document.getElementById("checkParallel").checked == true) {
      //   alert("Checked");
        var s = "";
        for (var i = 0; i < arParallelList.length; i++) {
            s += arParallelList[i] + "\n";
        }
        document.getElementById("fileinputParallel").style.visibility = "visible";
        document.getElementById('fileinputParallel').addEventListener('change', readSingleFileParallel, false);
        document.getElementById("txtSymbFormula" + nForDlg).value = s;
        document.getElementById("txtSymbFormula" + nForDlg).style.visibility = "visible";
        document.getElementById("txtSymbFormula" + nForDlg).removeAttribute('readOnly');
        document.getElementById("PresDialog").style = "height:200px; width:875px; background-color:yellow;border-style: solid;border-color: #0000ff; opacity: 0.99; z-index: 1; position: relative;"


    } else {
  //      alert("NOT Checked");
        document.getElementById("fileinputParallel").style.visibility = "hidden";
        //   document.getElementById("txtSymbFormula" + nForDlg).value = sAailableFunctions;
        document.getElementById("txtSymbFormula" + nForDlg).style.visibility = "hidden";
        document.getElementById("PresDialog").style = "height:100px; width:875px; background-color:yellow;border-style: solid;border-color: #0000ff; opacity: 0.99; z-index: 1; position: relative;"

    }
}
function readSingleFileParallel(evt) {
    //   alert("readSingleFile");
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function (e) {
            var contents = e.target.result;
            /*    alert("Got the file.n"
                      + "name: " + f.name + "n"
                      + "type: " + f.type + "n"
                      + "size: " + f.size + " bytesn"
                      + "starts with: " + contents.substr(1, contents.indexOf("n"))
                );*/



            var ss = r.result;
            ss = ss.replace(/,/g, "\t");


            document.getElementById("txtSymbFormula0" ).value = ss
          //  document.getElementById("text" + nForDlg).value = ss;
        }
        r.readAsText(f);
    } else {
    //    alert("Failed to load file");
    }
}
function SetAvailanleSymbol() {
    var currIndex = document.getElementById("selAvailableSymbols").selectedIndex;
    document.getElementById("dlgSymbol" + nForDlg).value = arAailableSymbols[currIndex];
}
/*
function HideDisclaimer() {
    var disc = document.getElementById("Disclaimer");
    alert("clicked");
    //disc.style.visibility = "hidden";
    disc.style.display = "none";
}
*/
var backColor;
function over(id) {
    if(navigator.userAgent.indexOf("Edge")>=0){
        return;
    }
    var el = document.getElementById(id);
    backColor = el.style.backgroundColor;
    el.style.backgroundColor = "#ADD8E6"; 
}
function out(id) {
    if (navigator.userAgent.indexOf("Edge") >= 0) {
        return;
    }
 document.getElementById(id).style.backgroundColor = backColor;
}
function showHelp() {

    var currIndex = document.getElementById("selHelp").selectedIndex;
    if (currIndex == 0) return;

    var str = arHelpLong[currIndex];
               document.getElementById("selHelp").selectedIndex = 0;
                    window.open(str, '_blank', 'fullscreen=yes'); return false;

 //alert("str=" + str);
    /*
 if (str == "Online Algorithm Builder.pdf") {
     window.open("Online Algorithm Builder.pdf", '_blank', 'fullscreen=yes'); return false;
   }


    document.getElementById("vid").style="display:normal";
    document.getElementById("butHelp").style = "display:normal";

    document.getElementById("vid").src = str;
    document.getElementById("vid").currentTime = 0;
    document.getElementById("vid").focus = true;
    document.getElementById("vid").play();
    */

}
/*
function helpDone() {
    document.getElementById("vid").style = "display:none";
    document.getElementById("butHelp").style = "display:none";

    document.getElementById("selHelp").selectedIndex = 0;
    myDrawingFunction1();
   // document.getElementById("vid").stop();
    document.getElementById("vid").focus = true;
    document.getElementById("vid").pause();
}
*/