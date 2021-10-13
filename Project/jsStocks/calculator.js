//var arInOut = {};
//var arIn = {};
//var arOut = {};
var sErrorLeft = "";
var From = 0;
var To = 0;
var Step = 0;
var arOldSymbolList = null;
var arOldParallelList = null;
//var arOldFormulasChain = null;
var arNameFormula = null;
var arPerformance = null;
var arFormulaParts = null;//text+[+number+]+text+[number+]+text
var arFromPresentationIndexToSeriesID = null;
var arOldNameFormula = null;
var arOldFormulasChain;

//var arNumeratedSeries = null;
var arArParallelSeries = null;

var arAllDs = null;

var vFields=null;
var vFunctions = null;

function Calculate(msg) {
   
    
//alert(" in Calculate: Calculate(msg)=" + msg);
    //   alert("arSymbolPresentation=" + arSymbolPresentation);
    // window.setTimeout(partB, 1000);


    if (vFields==null){
        vFields = ["date", "o", "h", "l", "c", "v", "b", "a", "yC", "O", "H", "L", "C", "V", "B", "A", "YC"];//
    }

        if (vFunctions==null){
            vFunctions = [/*"data", "number",*/
//"YahooDates", "YahooO", "YahooH", "YahooL", "YahooC", "YahooV", "YahooAdj",/*"toDates",*/
"toO", "toH", "toL", "toC", "toV", "toDivident", "toSplit", "toAdjO", "toAdjH", "toAdjL", "toAdjC", "toAdjV",       
  "toSun", "toMoon", "toMercury", "toVenus", "toMars", "toJupiter", "toSaturn", "toUranus", "toNeptune", "toPluto","score","ephem","strength",
                "col", /*"Col",*/ "histCol", "googleCol", "revCol", "row", "discount", /*"minVarPortfolio",*/ "minVarPortf",
                "nRows", "nCols",
                "bondPYP", "bootstrap", "forwardRate", "premFromHazard", "hazardFromPrem", "diag", "cell","cSpline","erf",
                "year","qrt", "month", "dayOfM","dayOfW","hour", "minute", "holidays","sunLight","tIndex",/*"myFunction",*/"myJS",
                "if", "If","or", "and", "gt", "ge", "lt", "le", "eq", "ne", "Gt", "Ge", "Lt", "Le", "Eq", "Ne","And","Or",
    "insert",
     "abs", "sign","acos", "asin", "atan", "ceil", "cos", "exp", "floor", "ln", "lg", "log10", "round", "sin", "sqrt", "tan","tg", "stDev", 
    "param", "atan2", "log", "max", "min", "pow", "plus", "minus", "div", "mult", "Plus", "Minus", "Div", "Mult",
    "start", "end", "startToEnd", "avg", "median", "acc", "ret", /*"Acc",*/ "same","rpc","aHV","aEWV",//"aEV",
    "tFromToStep", "xFromToStep","x", "TrueHigh", "TrueLow", "trueHigh", "trueLow", "posDirM", "negDirM", "TrueRange",
  //  "PosDM", "NegDM",
    "cut", "Cut", "append", "corrCf", "cov", "ref", "cRef", "sma", "wma", "Wma", "ema", "mma", "lTrend", "cTrend", "der", "delFluct", "fFourierS",
    "fFourierD", "fFourierM", "fFourierRe", "fFourierIm", "fFBackRe","aHVHL","fluctUp","fluctDn",
    "rsi", "stoch", "obv", "momD", "momR", "roc", "cti", "hVlt", "smv", "emv", "ev", "gmv", "gv", "breakUp", "breakDn", "ffStatus",/* "flipFlopStatus",*/ "status",
    "smaStatus","sumOfCols","totals2SMA",
    "vltI", "pdI", "ndI", "dx", "adx", "atrU", "atrL", "prb", "camoUp", "camoDn", "stop", "pnl", "npnl", "pNL","ffPNL", "pnlPairBB", "bStatus", //"solveSLE","limStatus",
 "makeMatrix", "mm", "gpuMatrMult", "gpuBenchmark", "gpuAcc", "gpuAccum", "gpuMult512",/* "gpuMult",  "gpuMultiplication", */"gpuSma", "gpuSmaDif",
 "gpuSmaStatus",/*"gpuAlert",*/ "gpuSmaAlert", "gpuPnl", "cpuMult", "randMatrix", "constMatrix", "idMatrix", "inverse",
 "copy", "trans", "stripRowsColsNames", "setRowsColsNames", "getRowsNames", "getColsNames",
 "portfolio", "minVarWeights", "tableOfC", "tableOfO", "tableOfH", "tableOfL", "tableOfV", "normTableOfC", "normTableOfO", "normTableOfH", "normTableOfL",
    "mfi", "cci","put","call","implVlt",
    "ffSmooth", "aEV", "aGV", //"GARCH",
    "noise", "binom", "norm", "CND", "CBND","invN","chiS","stud","cumF","cumPois","invChiS","invStud","invF","defaultPortfDistr",
    "Primes"];
    }

//alert("Calculate: " + msg);

    if (arOldNameFormula == null) arOldNameFormula = [];
    if (arOldSymbolList == null) arOldSymbolList = [];
    if (arOldParallelList == null) arOldParallelList = [];
if (arOldFormulasChain == null) arOldFormulasChain = [];

    //eat spaces
    if (msg != "tweaker") {
      //  arNameFormula = new Array();
        arNameFormula = [];
        for (var i = 0; i < arFormulasChain.length; i++) {

//alert("arFormulasChain[i]="+arFormulasChain[i]);

    arOldFormulasChain.push(arFormulasChain[i]);
            var nf = arFormulasChain[i].split("=");
            var n = nf[0];
            n = eatSpaces(n);
            var f = "";
            if (nf.length > 0) {
                     f = nf[1];
                     var index = arFormulasChain[i].indexOf("=");
                     f = arFormulasChain[i].substring(index+1);
// f = eatSpaces(f);
                 //    alert(arFormulasChain[i] + " -> " + f);
            }
            arNameFormula.push([n, f]);
        }
    }


    // ...some parsing
  //  var bNeedToRecalculate = needToRecalculate();//test after some parsing...//????????????/
    //alert("arOldNameFormula[0] =" + arOldNameFormula[0] + " arNameFormula[0] =" + arNameFormula[0] + " areListsEqual()=" + areListsEqual() + " stocksOnly()=" + stocksOnly());
//alert("msg=" + msg + " sErrorLeft=" + sErrorLeft);
    if ((areListsEqual() || stocksOnly()) && msg != "tweaker" && sErrorLeft == "") {
//alert(" DRAW ONLY");

	    myDrawingFunction();	
    }
    else {
 //       alert(" RECALCULATE and DRAW");

        sErrorLeft = "";
        sMarker = "none";

        try{
            document.getElementById("butTrace").value = "Trace";
            document.getElementById("butGoLeft").disabled = true;
            document.getElementById("butGoRight").disabled = true;
        }
        catch(e){
//alert(e.message);

            bBusy = false;
            var elem = document.getElementById("myBar");
            elem.style.width = 0 + '%';
            if (!bInsideOfOnLoad) {
//alert("!bInsideOfOnLoad");
                Calculate("22. some stocks were added to available( Recalculate?");
                myDrawingFunction();
            }
            else {
                bInsideOfOnLoad = false;
//alert("bInsideOfOnLoad");
                openSelectedChart(nSelectedPredefinedName);//empty chart
            }
//alert("returning");
            return;
        }


//alert("before Recalculate()");
        Recalculate();
        sErrorLeft = "";
            rememberListsAndChain();// save old state 
//alert("Recalculated");
            myDrawingFunction();
    }


}
function needToRecalculate() {
    var bNeed = true;

    return bNeed;
}
function rememberListsAndChain() {
    arOldSymbolList.length = 0;
    arOldParallelList.length = 0;
    arOldNameFormula.length = 0;

    for (var i = 0; i < arSymbolList.length; i++) {
        arOldSymbolList.push(arSymbolList[i]) ;
    }
    for (var i = 0; i < arParallelList.length; i++) {
        arOldParallelList.push(arParallelList[i]);
    }
    for (var i = 0; i < arNameFormula.length; i++) {
        arOldNameFormula.push(arNameFormula[i]);
    }
}
function areListsEqual() {

    if (arSymbolList.length != arOldSymbolList.length) return false;
    if (arParallelList.length != arOldParallelList.length) return false;
    if (arNameFormula.length != arOldNameFormula.length) return false;
  
    for (var i = 0; i < arSymbolList.length; i++) {
        if (arOldSymbolList[i]!=arSymbolList[i]) return false ;
    }
    for (var i = 0; i < arParallelList.length; i++) {
        if (arOldParallelList[i]!=arParallelList[i]) return false ;
    }
    for (var i = 0; i < arNameFormula.length; i++) {
        if (arOldNameFormula[i][0] != arNameFormula[i][0]) return false;
        if (arOldNameFormula[i][1] != arNameFormula[i][1]) return false;
    }
    return true;
}
function stocksOnly() {
    if (arNameFormula.length > 1 || arOldNameFormula.length > 1) return false;
    if (arNameFormula.length == 1 && arOldNameFormula.length == 1) {
     //   var f = arFormulasChain[0].split("=")[1];
    //    var fOld = arOldFormulasChain[0].split("=")[1];
    //    alert("f=" + f + " f.length=" + f.length + " fOld= " + fOld + " fOld.length=" + fOld.length)
        if (arNameFormula[0][1] == "" && arOldNameFormula[0][1] == "") return true;
    }
    return false;// should not get here
}
function eatSpaces(s) {
    if (s == null) return "";
    while (s.indexOf(" ") >= 0) {
      //  alert("s="+s+" s.indexOf(' ')="+s.indexOf(" "));
        s = s.replace(" ", "");
    }
    // add replace {by (
    while (s.indexOf("{") >= 0) {
        s = s.replace("{", "(");
    }
    while (s.indexOf("}") >= 0) {
        s = s.replace("}", ")");
    }
    /*
    while (s.indexOf("[") >= 0) {
        s = s.replace("[", "(");
    }
    while (s.indexOf("]") >= 0) {
        s = s.replace("]", ")");
    }
    */
    return s;
}
function eatSpacesFromArray(ar) {
    if (ar!=null)
    for (var i = 0; i < ar.length; i++) {
        ar[i] = eatSpaces(ar[i]);
    }
}
/*
function eatUnderscores(s) {
  //  var s = ['H', 'e', 'l', 'l', 'o'];
  //  var str = s.join();

    if (s == null) return "";

    var str="";
    for(var i=0;i<s.length;i++){
        if (s[i]!='_') str+=s[i];
    }
    return str;
}
*/
function eatExtraSpaces(s) {
    //  var s = ['H', 'e', 'l', 'l', 'o'];
    //  var str = s.join();

    if (s == null) return "";
    var prev="";
    var str="";
    for(var i=0;i<s.length;i++){
        if (s[i]==' ' && prev==' ') continue;
        str+=s[i];
        prev=s[i];
    }
    return str;
}

function Recalculate() {

     calc(arNameFormula, vFields, vFunctions);
   // callCalculateA();
    
}

/*
function callCalculateA() {

    var bFound = false;
    for (var k = 1; k < arSymbolList.length; k++) {
        var sName = arSymbolList[k];
        var bFound = false;
        for (var i = 0; i < arAvailableStiocks.length; i++) {
            if (sName == arAvailableStiocks[i][0][0]) {
                bFound = true;
            }
        }
        if (!bFound) break;
    }



    // alert("A: " + bBusy+" "+nWaiting);
    if (!bBusy || nWaiting > nSecondsToWait || !bFound) {
        calc(arNameFormula, vFields, vFunctions);
        myDrawingFunction();
    }
    else {
        nWaiting += 0.1;
        window.setTimeout(callCalculateB, 100);
    }
}
function callCalculateB() {

    var bFound = false;
    for (var k = 1; k < arSymbolList.length; k++) {
        var sName = arSymbolList[k];
        var bFound = false;
        for (var i = 0; i < arAvailableStiocks.length; i++) {
            if (sName == arAvailableStiocks[i][0][0]) {
                bFound = true;
            }
        }
        if (!bFound) break;
    }
    //  alert("B: " + bBusy+" "+nWaiting);
    if (!bBusy || nWaiting > nSecondsToWait || !bFound) {
        calc(arNameFormula, vFields, vFunctions);
        myDrawingFunction();
    }
    else {
        nWaiting += 0.1;
        window.setTimeout(callCalculateA, 100);
    }
}
*/
function calc(arNameFormula, vFields, vFunctions) {
 //alert("calc: " + bBusy + " " + nWaiting);
    arAllDs = [];// array of ds for entire algoritm
    arFromPresentationIndexToSeriesID = [];
    arFormulaParts = [];//text+[+number+]+text+[number+]+text
    for (var i = 0; i < arFormulasChain.length; i++) {
        arFromPresentationIndexToSeriesID.push(-1);

        var sAr = arNameFormula[i][1];
        var pos1 = sAr.indexOf("[", 0); 
        if (pos1 == -1) {
            arFormulaParts.push("");
        }
        else {
            arFormulaParts.push(arNameFormula[i][1]);//formula
        }  
    }
    //alert("arFormulaParts.length=" + arFormulaParts.length);
   // if (arNameFormula != null) {
        for (var iLine = 0; iLine < arNameFormula.length; iLine++) {
            curLine = iLine;
            var bIsAName = false;
            for (var i = 0; i < curLine; i++) {
                if (arNameFormula[iLine][1] == arNameFormula[i][0]) {//yes, it is a name
                    bIsAName = true;
                    var curID = arFromPresentationIndexToSeriesID[i];
                    var DS = arAllDs[curID];
//arAllDs[i].name = arNameFormula[i][0];
                    var answer = {};
                    answer.type = DS.type;
                    answer.notation = DS.notation;
                    answer.nFunction = DS.nFunction;
                    answer.arDepend = DS.arDepend;
                    answer.nSymbol = DS.nSymbol;
                    answer.id = arAllDs.length;
                    arAllDs.push(answer);
 //   alert(iLine + " curID=" + curID + "answer.notation=" + answer.notation + " answer.id=" + answer.id + " arAllDs.length" + arAllDs.length);
                    arFromPresentationIndexToSeriesID[iLine] = arAllDs.length - 1;                    
                }
            }                
            if (bIsAName) {//we have it already
                continue;// go to the next line
            }
            

           // if (arNameFormula[iLine].length < 2) continue;
            var str = arNameFormula[iLine][1];
            if (str == "" || str == null) {
                var answer = {};
                answer.type = "Empty";
                answer.id = arAllDs.length;
                arAllDs.push(answer);
                arFromPresentationIndexToSeriesID[iLine] = arAllDs.length - 1;
                continue;// go to the next line
                //alert(str);
            }
            try {
                var index1 = str.indexOf("param");
                if (index1 != -1) index1 = str.indexOf("param", index1 + 1);
                if (index1 != -1) throw "do not use function param() two times in one formula";

//var index2 = str.indexOf("=");
//if (index2 != -1) throw "do not use sign'=' two times in one formula";

                str = makeFormulaParts(str, iLine);//var arFormulaParts = null;//text+[+number+]+text+[number+]+text
                //alert("1. str=" + str);
//alert(i +": arFormulaParts[i]="+arFormulaParts[i]);

                str = eatSpaces(str);
//alert("2. str=" + str);
//alert(1);
                var ds = expr(str);
//alert(2);

            }
            catch (err) {

       //         alert("1. iLine=" + iLine);

                var sMsg = "1. Error in formula #" + iLine + ": " + err;
 //alert(sMsg);
              //  var sMsg = "Error in formula #" + iLine;
                showMsg(99998, "Error Message1", sMsg);

                
                var answer = {};
                answer.type = "Error";
                answer.id = arAllDs.length;
                arAllDs.push(answer);

                if (sErrorLeft == "") sErrorLeft = sMsg;// report the first error
                
//alert("sErrorLeft=" + sErrorLeft);
               
               // alert("2. iLine=" + iLine);
// break;
            }

            arFromPresentationIndexToSeriesID[iLine] = arAllDs.length - 1;
            
        }
 ///   }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////
        arPerformance=[];
        const startPerf = window.performance.now();
       // const endPerf=0;
        var cusPresentationIndex=0;
        var seriesIDtoMeasure = arFromPresentationIndexToSeriesID[cusPresentationIndex];

    //    alert("cusPresentationIndex="+cusPresentationIndex+" seriesIDtoMeasure= " + seriesIDtoMeasure);
    /////////////////////////////////////////////////////////////////////////
       

    // attach result of calculations  to ds
        for (var i = 0; i < arAllDs.length; i++) {
            //alert("arAllDs.length="+arAllDs.length+" i=" + i + " arAllDs[i].type=" + arAllDs[i].type + " arAllDs[i].notation=" + arAllDs[i].notation);
        var arSeries = [];
        if (arAllDs[i].type == "Name") {
            arSeries.push(arAllDs[i].notation);
        }
        else if (arAllDs[i].type == "Number" ) {
            arSeries.push(1 * arAllDs[i].notation);
        }
        else if (arAllDs[i].type == "Data") {
            var nSymbol = arAllDs[i].nSymbol;
            var nField = arAllDs[i].nField;
            var iAvlbl = arFromSymbolListToAvailableIndex[nSymbol];
            arSeries = arAvailableStiocks[iAvlbl][nField];

            /////////////////////////
            var ohlcv = arAllDs[i].notation[0];
            if (ohlcv == ohlcv.toUpperCase()) {
            //    alert("Data: " + arAllDs[i].notation);
            //    var before = arSeries.length;
           //     alert(" before=" + before);
                arSeries = insert(arSeries);
          //      var after = arSeries.length;
          //      alert("Data: " + arAllDs[i].notation + " before=" + before + " after=" + after);
            }
            ///////
        }
        else if (arAllDs[i].type == "Function") {
            var arArgs = [];
            for (var n = 0; n < arAllDs[i].arDepend.length; n++) {
                var id = arAllDs[i].arDepend[n];
                arArgs.push(arAllDs[id]);
            }
            try {
              //  alert("arAllDs[i].notation=" + arAllDs[i].notation + " arArgs[0].notation=" + arArgs[0].notation);
                if (arAllDs[i].notation == "myJS") {
                    var ar0=1*arArgs[0].notation;
                    arSeries = CalcFunction(arAllDs[i].notation, ar0);// .notation: myJS(T0) -> myJS(0)
                }
                else
                    arSeries = CalcFunction(arAllDs[i].notation, arArgs);// write later ?????

                // alert("Function: arSeries=" + arSeries);
              //  if (arAllDs[i].type == "Function" && arAllDs[i].notation == "bondPYP") {
//alert("arAllDs[i].type=" + arAllDs[i].type + "arAllDs[i].notation=" + arAllDs[i].notation + "  arSeries=" + arSeries);
              //  }
            }
            catch (err) {

                var sMsg = "Error in function " + arAllDs[i].notation + ": " + err;
// alert(sMsg);
                showMsg(99998, "Error Message1", sMsg);
                var answer = {};
                answer.type = "Error";
                answer.id = arAllDs.length;
                arAllDs.push(answer);
                if (sErrorLeft == "") sErrorLeft = sMsg;// report the first error


                //fixAnError(i, sMsg);      sErrorLeft = "dirty";
//
                break;
          }
        }
        else {// arAllDs[i].type == "Table"

//alert("arAllDs[i].type=" + arAllDs[i].type);
 // alert("arAllDs[i].notation=" + arAllDs[i].notation);
          //  alert("1*arAllDs[i].notation]=" + arAllDs[i].notation + " arTexts.length=" + arTexts.length);

            if (1 * arAllDs[i].notation < arTexts.length)
                arSeries = matrixFromString(arTexts[1 * arAllDs[i].notation]);
            else
                arSeries.push(arAllDs[i].notation);
//alert("arSeries=" + arSeries);
//alert("arAllDs[i].type=" + arAllDs[i].type + "  arSeries=" + arSeries + " arSeries.length=" + arSeries.length);
            // arSeries = convertFtomTableToSeries(arAllDs[i].notation);// write later ???
/*
if (arSeries.length == 1) {
    var d = arSeries[0];
    var arSeries = [["A","c1"],["row1",d+""]];//to draw Matrix 1x1
}*/
//alert("arSeries=" + arSeries);
//if (arSeries[0][0] == 'x' && arSeries[0].length == 2) throw "Please, do not use name 'x' for this matrix (reserved for parametric curves)";
        }
      //  alert("Name="+arNameFormula[cusPresentationIndex][0]+" arSeries=" + arSeries);
        arAllDs[i].result = arSeries;
            try{
                if (arNameFormula[cusPresentationIndex][0] == 'x' && arSeries[0].length == 2) {
                    throw "Please, do not use name 'x' for this matrix (reserved for parametric curves)";
                }
            }
            catch (err) {
                var sMsg = "Error in function " + arAllDs[i].notation + ": " + err;
                showMsg(99998, "Error Message1", sMsg);
                var answer = {};
                answer.type = "Error";
                answer.id = arAllDs.length;
                arAllDs.push(answer);
                if (sErrorLeft == "") sErrorLeft = sMsg;// report the first error
                break;
            }
            

        if (i == seriesIDtoMeasure) {//performance ////////////////////////////////////////////////////////////
//alert(arNameFormula[cusPresentationIndex][0]);
            arAllDs[i].name = arNameFormula[cusPresentationIndex][0];
           const endPerf = window.performance.now();
           arPerformance.push(endPerf - startPerf);
            cusPresentationIndex++;
            if (cusPresentationIndex < arNameFormula.length) {
                seriesIDtoMeasure = arFromPresentationIndexToSeriesID[cusPresentationIndex];
            }
        }//////////////////////////////////////////////////////////////////////////////////////////////

        //if (arAllDs[i].notation == "param") alert("2. param: " + arAllDs[i].result.length + " " + arAllDs[i].result[0].length);
        findMinMaxForXandY(arAllDs[i]);
    }
    /*  */
        var s = "";
   //     
        for (var i = 0; i < arAllDs.length; i++) {
         //       if (arAllDs[i].result != undefined) {
           s += "id=" + arAllDs[i].id + " type=" + arAllDs[i].type + " notation=" + arAllDs[i].notation + " arDepend=" + arAllDs[i].arDepend + " nSymbol=" + arAllDs[i].nSymbol + " nField=" + arAllDs[i].nField + " result.length=" + arAllDs[i].result.length + "\n";
         //       }
         //       else throw "arAllDs[i].result is not defined";
        }


    
//alert("OK, now work with arAllDs: \n" + s);
    radioClicked();
  
}
function fixAnError(id, sMsg) {

    var iLine = 0;
    for (var i = 0; i < arFormulasChain.length; i++) {
        var curID = arFromPresentationIndexToSeriesID[i];
 //alert("id=" + id + " i=" + i + " curID=" + curID);

        if (curID >= id) {
            iLine = i;
            break;
        }
    }
//alert("iLine=" + iLine);
//alert("arOldFormulasChain[iLine]=" + arOldFormulasChain[iLine] + " arFormulasChain[iLine]=" + arFormulasChain[iLine]);
    arFormulasChain[iLine] = arOldFormulasChain[iLine];

    var nf = arFormulasChain[iLine].split("=");
    arNameFormula[iLine][0] = nf[0];
    arNameFormula[iLine][1] = nf[1];
    //  alert(arNameFormula[iLine][0] + " " + arNameFormula[iLine][1]);


    //  showMsg(99998, "Error Message", sMsg);
    setAlgo();
   // alert("iLine=" + iLine + " => " + arFormulasChain[iLine]+"=>"+arOldFormulasChain[iLine]);
    if (arFormulasChain[iLine] != arOldFormulasChain[iLine]) {
             Recalculate();
    }
    else {
        showMsg(99998, "Error Message2", sMsg);
    }
    sErrorLeft = "dirty";
 //   arFormulasChain[iLine] = arFormulasChain[iLine] + " ";
/*        Recalculate();
    }
    catch(err){
        alert(err);
        alert("iLine="+iLine+" => "+arFormulasChain[iLine]);
    }
           */    
        //     myDrawingFunction();
          
       //        var sMsg = "Error in function " + arAllDs[i].notation + ": " + err;
       //        showMsg(99998, "Error Message", sMsg);

    
  //  alert("end of Fix");
              
}
function findMinMaxForXandY(ds) {
    if (ds.result.length == 2 && ds.result[0][0] == "x") {//param
        var xMin = Number.MAX_VALUE;
        var xMax = -Number.MAX_VALUE;
        var yMin = Number.MAX_VALUE;
        var yMax = -Number.MAX_VALUE;
        var M = ds.result[0].length;
        for (var i = M - 1; i > 0; i--) {
            var x = ds.result[0][i];
            var y = ds.result[1][i];
            if (x > xMax) xMax = x;
            if (x < xMin) xMin = x;
            if (y > yMax) yMax = y;
            if (y < yMin) yMin = y;
        }
        ds.result.xMax = xMax;
        ds.result.xMin = xMin;
        ds.result.yMax = yMax;
        ds.result.yMin = yMin;
//alert("ds.result.xMax=" + ds.result.xMax + " ds.result.xMin=" + ds.result.xMin+" ds.result.yMax=" + ds.result.yMax + " ds.result.yMin=" + ds.result.yMin);
    }
}
function isDependOnHidden(ds) {
    for (var n = 0; n < arFunctionNames.length; n++) {
        // arAllDs
        if (ds.notation.indexOf(arFunctionNames[n]) >= 0) return true;
        var arDS = [];
        if (ds.arDepend != undefined) {
            for (var i = 0; i < ds.arDepend.length; i++) arDS.push(arAllDs[ds.arDepend[i]]);
        }
        //    alert("arDS.length="+arDS.length);
        while (arDS.length > 0) {
            //        alert("1. in: arDS.length="+arDS.length);
            var ar = [];
            for (var i = 0; i < arDS.length; i++) {
                //            alert("i="+i+" "+ arDS[i].type+" "+arDS[i].notation);
                if (ds.notation.indexOf(arFunctionNames[n]) >= 0) return true;
                else {
                    if (arDS[i].arDepend != undefined) {
                        for (var j = 0; j < arDS[i].arDepend.length; j++) {
                            ar.push(arDS[i].arDepend[j]);
                        }
                    }
                }
                //            alert("ar="+ar);
            }
            arDS = [];
            for (var i = 0; i < ar.length; i++) arDS.push(arAllDs[ar[i]]);
            //        alert("2. in: arDS.length="+arDS.length);
        }
    }
    return false;
}
function isDependOnData(ds){
    // arAllDs
    if (ds.type=="Data" || ds.notation.indexOf("Yahoo") >= 0) return true;
    var arDS=[];
    if(ds.arDepend!=undefined){
        for(var i=0;i<ds.arDepend.length;i++) arDS.push(arAllDs[ds.arDepend[i]]);
    }
//    alert("arDS.length="+arDS.length);
    while(arDS.length>0){
//        alert("1. in: arDS.length="+arDS.length);
        var ar=[];
        for(var i=0;i<arDS.length;i++){
//            alert("i="+i+" "+ arDS[i].type+" "+arDS[i].notation);
            if (arDS[i].type=="Data" || arDS[i].notation.indexOf("Yahoo") >= 0) return true;
            else {
                if(arDS[i].arDepend!=undefined){
                    for(var j=0;j<arDS[i].arDepend.length;j++){
                        ar.push(arDS[i].arDepend[j]);
                    }
                }
            }
//            alert("ar="+ar);
        }
        arDS=[];
        for(var i=0;i<ar.length;i++) arDS.push(arAllDs[ar[i]]);
//        alert("2. in: arDS.length="+arDS.length);
    }
    return false;
}
function isDependOnX(ds){
    // arAllDs
    if ( ds.notation.indexOf("FromToStep") >= 0) return true;
    var arDS=[];
    if(ds.arDepend!=undefined){
        for(var i=0;i<ds.arDepend.length;i++) arDS.push(arAllDs[ds.arDepend[i]]);
    }
//    alert("arDS.length="+arDS.length);
    while(arDS.length>0){
//        alert("1. in: arDS.length="+arDS.length);
        var ar=[];
        for(var i=0;i<arDS.length;i++){
 //           alert("i="+i+" "+ arDS[i].type+" "+arDS[i].notation);
            if (arDS[i].notation.indexOf("FromToStep") >= 0) return true;
            else {
                if(arDS[i].arDepend!=undefined){
                    for(var j=0;j<arDS[i].arDepend.length;j++){
                        ar.push(arDS[i].arDepend[j]);
                    }
                }
            }
 //           alert("ar="+ar);
        }
        arDS=[];
        for(var i=0;i<ar.length;i++) arDS.push(arAllDs[ar[i]]);
//        alert("2. in: arDS.length="+arDS.length);
    }
    return false;
}
/*
function isDependOnTable(ds){
    // arAllDs
    if (ds.type=="Table") return true;
    var arDS=[];
    if(ds.arDepend!=undefined){
        for(var i=0;i<ds.arDepend.length;i++) arDS.push(arAllDs[ds.arDepend[i]]);
    }
//    alert("arDS.length="+arDS.length);
    while(arDS.length>0){
//        alert("1. in: arDS.length="+arDS.length);
        var ar=[];
        for(var i=0;i<arDS.length;i++){
 //           alert("i="+i+" "+ arDS[i].type+" "+arDS[i].notation);
            if (arDS[i].type=="Table") return true;
            else {
                if(arDS[i].arDepend!=undefined){
                    for(var j=0;j<arDS[i].arDepend.length;j++){
                        ar.push(arDS[i].arDepend[j]);
                    }
                }
            }
 //           alert("ar="+ar);
        }
        arDS=[];
        for(var i=0;i<ar.length;i++) arDS.push(arAllDs[ar[i]]);
 //       alert("2. in: arDS.length="+arDS.length);
    }
    return false;
}*/
function convertDStoString(ds) {
    //alert("convertDStoString");
    var s = "";
    var N = ds.result.length;
    //alert("N=" + N + " ds.result=" + ds.result);
    var startIndex = ds.result[0];

    if (ds.notation.indexOf("FromToStep")>=0) {
        var NN = Math.round((To - From) / Step);
        for (var i = NN; i >= 0; i--) {
            var d = 1 * From + i * Step;
            s += i + "    " + BuildString(d) + "\n";// round using step
        }
    }
    else if (ds.notation == "param") {
        s+="#,  t,  x,  y\n";
        var M = ds.result[0].length;
        //alert("M=" + M);
        for (var i = M - 1; i > 0; i--) {
            var i1 = i - 1;
            var d = 1 * From + i1 * Step;
            var x = ds.result[0][i];
            var y = ds.result[1][i];
            s += i1+"    "+BuildString(d)+"   "+BuildString(x) + "  " + BuildString(y) + "\n";// round using step
        }
    }
    else if (ds.type == "Number" ) {
        s = ds.notation;
    }
    else if (N == 1) {
        //alert("ds.result=" + ds.result);
        s = "" + ds.result[0];
        //alert("s=" + s);
    }
    //alert(8);
    var bData=isDependOnData(ds);
    var bX = isDependOnX(ds);
    //   var bHidden = isDependOnHidden(ds);
    //alert("bHidden=" + bHidden + "bX=" + bX + " bData=" + bData + " ds.type=" + ds.type + " ds.notation=" + ds.notation + "ds.result.length=" + ds.result.length + " bYahooFound=" + bYahooFound + " bFromToFound=" + bFromToFound);
    


    // if (ds.result[0] != undefined && ds.result[0].length >= 1 && ds.result[0][0] != 'x') {
    if(isMatrix(ds.result)){

        //alert(ds.result);

        

        //alert("ds.result.length=" + ds.result.length);
        //alert("ds.result[0].length=" + ds.result[0].length);
        //alert("ds.name=" + ds.name);
        //alert(ds.result);
        /*      var nan=Math.sqrt(-1);
              if (isNaN(ds.result[0][0])) {
                  ds.result[0][0] = nan;
              }
              else if (isNaN(1 * ds.result[0][0]) ) {*/
        if (ds.result[0][0].length > 0 && isLetter(ds.result[0][0][0])
            && !(ds.result[0].length == 1 || ds.result.length == 1)//12/25/2017
            ) {
            ds.result[0][0] = ds.name;
        }      
        var lengthOfName = ds.result[0][0].length;////
        var widthOfColumn0 = lengthOfName;
// alert(5.5);
 if (ds.result.length > 1) {
   //  alert("ds.result.length=" + ds.result.length);
//     alert("ds.result[1].length=" + ds.result[1].length);
//     alert("ds.result[1][0]=" + ds.result[1][0]);
     widthOfColumn0 = ("" + ds.result[1][0]).length;/////
 }
// alert(6);
        var r00 = ds.result[0][0];
 //alert("r00="+r00);
        var diff = widthOfColumn0 - lengthOfName;/////////
// alert("diff=" + diff);
        if (diff > 0) {//////////////
           // for (var kkk = 0; kkk < diff; kkk++) ds.result[0][0] += " ";////////////
            for (var kkk = 0; kkk < diff; kkk++) r00 += " ";////////////
           // alert("rr0.length=" + r00.length);
        }/////////////

//alert("ds.result[0][0]="+ds.result[0][0]);

        s = "";
        var s0 = "";
        for (var i = 0; i < ds.result.length; i++) {
            for (var j = 0; j < ds.result[i].length; j++) {
//alert("a. " + i + " " + j );
                var cell = 1 * ds.result[i][j];

//if (i == 0 && j == 0) alert("a. " + i + " " + j + " " + cell);
                if (!isNaN(cell)) {
                    var sCell = "" + cell.toFixed(10);
                    if(Math.abs(cell)>999999)
                        cell = cell.toExponential(0);
                    else
                        cell = sCell.substring(0, 6);
//alert("b. " + i + " " + j + " " + cell);
                }
                else {
                    cell = ds.result[i][j];
                    if (i == 0 && j == 0) cell = r00;////////////////
//if (i == 0 && j == 0) alert("a. " + i + " " + j + " " + cell + "rr0.length=" + r00.length);
                }
                s += cell + "\t";
                if (i == 0) s0 += cell + "\t";
            }
            s += "\n";
        }

        if (isNaN(ds.result[0][0]) && ds.result.length > 10) {
            s += s0;//repeat the start line
        }
        
    }
    else if (isDependOnHidden(ds)) {
//alert("Hidden");
        for (var i = N - 1; i > 0; i--) {
            var j = i + ds.result[0] - 1;
            s += dateDailyFromIndex(j) + "  " + 1 * ds.result[i] + "\n";// round using step  
        }
        return s;
    }
    else if (bData && bX){
        for (var i = N - 1; i > 0; i--) {
            var i1 = i - 1;
            var j = i + ds.result[0]-1;
            s +=i1+"    "+ dateDailyFromIndex(j) + "  " + 1 * ds.result[i] + "\n";// round using step
        }
    }
    else if (bData ) {
        for (var i = N - 1; i > 0; i--) {
            var j = i + ds.result[0]-1;
            s +=dateDailyFromIndex(j) + "  " + 1 * ds.result[i] + "\n";// round using step  
        }
    }
    else if (bX){
        for (var i = N - 1; i > 0; i--) {
            var i1 = i - 1;
            s +=i1 + "  " + 1 * ds.result[i] + "\n";// round using step
        }
    }
  //else if (ds.notation == "bondPYP" || ds.notation == "matrMult" || ds.notation == "myJS" || ds.notation == "gpuMatrMult" || ds.notation == "gpuMult" || ds.notation == "cpuMult" || ds.notation == "makeMatrix" || ds.notation == "randMatrix") {//randMatrix
      //    else if (typeof ds.result[0].length>1) {
    else {
//alert("Hi");
        var iStart=1 * ds.result[0];
        var iEnd=iStart+ds.result.length-2;
        for (var i = iEnd; i >= iStart; i--) {
            s +=i + "  " + 1 * ds.result[i-iStart+1] + "\n";// round using step
        }
    }

    return s;
}
function convertDStoStringOld(ds) {
    //   alert("ds.type=" + ds.type + " ds.notation=" + ds.notation + "ds.result.length=" + ds.result.length + " bYahooFound=" + bYahooFound + " bFromToFound=" + bFromToFound);
    var s = "";
    var N = ds.result.length;
    var startIndex = ds.result[0];

    if (ds.notation.indexOf("Yahoo") >= 0) {
        for (var i = N - 1; i > 0; i--) {
            s += dateDailyFromIndex(i + startIndex - 1) + "  " + BuildString(1 * ds.result[i]) + "\n";
        }
    }
    else if (ds.type == "Number" ) {
        s = ds.notation;
    }
    else if (N == 1) {
        // alert("ds.result=" + ds.result);
        s = "" + ds.result[0];
    }
    else if (ds.type == "Table") {// later ???
        var n = ds.notation;
        //      s = document.getElementById("text" + n).value;
        // or
        s = arTexts[n];
    }
    else {// field or function
        // var N = ds.result.length;
        //alert(N);
        var startIndex = ds.result[0];
        if (ds.notation.indexOf("FromToStep")>=0) {
            //alert("FromToStep");

            var NN = Math.round((To - From) / Step);

            for (var i = NN; i >= 0; i--) {
                var d = 1 * From + i * Step;
                //s += i + "    " + d + "  " + 1 * ds.result[i - 1] + "\n";// round using step
                s += i + "    " + BuildString(d) + "\n";// round using step
            }


        }
            // alert("startIndex=" + startIndex);
        else if (ds.notation == "param") {
            s+="#,  t,  x,  y\n";
            //alert("pds.notation =param");
            //     var xMin = Number.MAX_VALUE;
            //     var xMax = -Number.MAX_VALUE;
            //      alert("3. param: " + ds.result.length + " " + ds.result[0].length);
            var M = ds.result[0].length;
            //alert("M=" + M);
            for (var i = M - 1; i > 0; i--) {
                var i1 = i - 1;
                var d = 1 * From + i1 * Step;
                var x = ds.result[0][i];
                var y = ds.result[1][i];
                s += i1+"    "+BuildString(d)+"   "+BuildString(x) + "  " + BuildString(y) + "\n";// round using step
                //         if (x > xMax) xMax = x;
                //         if (x < xMin) xMin = x;
            }
            //    ds.result.xMax = xMax;
            //    ds.result.xMin = xMin;
            //alert("ds.result.xMax=" + ds.result.xMax + " ds.result.xMin=" + ds.result.xMin);
            //alert("convertDStoString: "+s);
        }
        else {
 //           alert("col()");
            var N = ds.result.length;
            for (var i = N - 1; i > 0; i--) {
                var i1 = i - 1;

                var j = i + ds.result[0]-1;

                //        s +=i1+"    "+ j + "  " + 1 * ds.result[i] + "\n";// round using step
                s +=i1+"    "+ dateDailyFromIndex(j) + "  " + 1 * ds.result[i] + "\n";// round using step

            }
        }


    }
    return s;
}
/*
function findXFromIndex(int index)
    {

        List<double> ar = new List<double>();
        /////////////////
        string sName = "";
        string[] sFormulas = sFormulasChain.Split(';');

        int nFormula = 0;
        int nFormulaStart = 0;
        int nFormulasLength = sFormulas.Length;
        if (sFormulasChain != "" && sFormulasChain.IndexOf('=') < 0) throw new Exception("Use '=' in formula, please");

        if (sFormulasChain != "" && sFormulasChain.IndexOf('=') > 0)//not empty list				
        {   //foreach(string sFormula in sFormulas)
            for (nFormula = nFormulaStart; nFormula < nFormulasLength; nFormula++)
            {

                string sFormula = sFormulas[nFormula];
                if (sFormula.IndexOf("=") < 0)//not a formula
                {
                    string sF = sFormula.Replace(" ", "");
                    sF = sF.Replace("	", "");
                    if (sF.Length != 0)
                    {
                        throw new Exception(sFormulasChain + "   " + sF + " is not a formula. Use '=' please.");
                    }
                    else
                    {
                        continue;
                    }
                }
                string[] sNameExpr = sFormula.Split('=');
                sName = sNameExpr[0];
                // if (sFormula.IndexOf("xFromToN") >= 0) break;
                if (sFormula.IndexOf("xFromTo") >= 0) break;
            }
        }
        //////////////////
        ar = HT[sName];
        int nCount = ar.length;
        double left = ar[1];
        double right = ar[nCount - 1];
        double N = nCount - 2.0;
        double y = left + index * (right - left) / N;

        // return y.ToString();
        return y;
    }
    */
// Function evaluating an expression
function expr(str) {
    var answer = {};// to push
    var value = {};	// for  first operand
    //  if expression starts from + or -, then append zero in the beginning
    if (str[0] == "+" || str[0] == "-") {
        str = "0" + str;
    }
    var val = {};//for second opperand
    var index = { pos: 0 };// Keeps track of current charecter position
// alert("1.expr: " + str + " " + index.pos);
    value = term(str, index);	// Get first term
//alert("2.expr: " + str + " " + index.pos + "value.fNumber=" + value.fNumber);

    
    for (;;)
    {
//alert(str+ "expr - for - index.pos=" + index.pos + " str.length=" + str.length);
        if (str.length == index.pos) {// We are at the end of the str
            index.pos++;//???
            break;// to return what we've got
        }
        else if (str[index.pos] == "+") {// + found
            index.pos++;//???
//alert("before val - index.pos=" + index.pos);
            val = term(str, index);

//alert("after val - index.pos=" + index.pos + " val.fNumber=" + val.fNumber);
            answer = {};
            answer.type = "Function";
            answer.notation = "plus";
            answer.nFunction = vFunctions.indexOf("plus");
            var ar = [value.id, val.id];
            answer.arDepend = ar;
            if (value.nSymbol == 0 || val.nSymbol == 0) answer.nSymbol = 0;
         /*   if (value.dsType == "NUMBER" && val.dsType == "NUMBER") {
                answer.dsType = "NUMBER";
                answer.fNumber = value.fNumber + val.fNumber;
            }*/
            answer.id = arAllDs.length;
            arAllDs.push(answer);
//alert("2. answer.fNumber =" + answer.fNumber);
            value = answer;;
        }
        else if (str[index.pos] == "-") {// - found
            index.pos++;//???
//alert("before val - index.pos=" + index.pos);
            val = term(str, index);
//alert("after val - index.pos=" + index.pos + " val.fNumber=" + val.fNumber);
            answer = {};
            answer.type = "Function";
            answer.notation = "minus";
            answer.nFunction = vFunctions.indexOf("minus");
            var ar = [value.id, val.id];
            answer.arDepend = ar;
            if (value.nSymbol == 0 || val.nSymbol == 0) answer.nSymbol = 0;
     /*       if (value.dsType == "NUMBER" && val.dsType == "NUMBER") {
                answer.dsType = "NUMBER";
                answer.fNumber = value.fNumber - val.fNumber;
            }*/
            answer.id = arAllDs.length;
            arAllDs.push(answer);
//alert("2. answer.fNumber =" + answer.fNumber);
            value = answer;
        }
        else {

            throw "Wrong expression (e.g. a variable and a function have the same name): " + str + " at position = " + index.pos;
        }
    }

    return value;
}
function term(str, index) {
    var answer = {};// to push
    var value = {};	// for  first operand
    var val = {};//for second opperand
//alert("1.term: " + str + " " + index.pos);
    value = number(str, index);	// Get the first number in the term
//alert("2.term: " + str + " " + index.pos + " value.fNumber=" + value.fNumber);

   // return value;//////////
    for (; ;) {
//alert("term - for - index.pos=" + index.pos + " str.length=" + str.length);
        if (str.length == index.pos) {// We are at the end of the str
          //  index.pos++;//???
            break;// to return what we've got
        }
        else if (str[index.pos] == "*") {// * found
            index.pos++;

            val = number(str, index);
 //alert("val - index.pos=" + index.pos + " val.fNumber=" + val.fNumber);
            answer = {};
            answer.type = "Function";
            answer.notation = "mult";
            answer.nFunction = vFunctions.indexOf("mult");
            var ar = [value.id, val.id];
            answer.arDepend = ar;
            if (value.nSymbol == 0 || val.nSymbol == 0) answer.nSymbol = 0;
         /*   if (value.dsType == "NUMBER" && val.dsType == "NUMBER") {
                answer.dsType = "NUMBER";
                answer.fNumber = value.fNumber * val.fNumber;
            }*/
            answer.id = arAllDs.length;
            arAllDs.push(answer);
            //alert("2. answer.fNumber =" + answer.fNumber);
            value = answer;;
        }
        else if (str[index.pos] == "/") {// division found
            index.pos++;
            //alert("before val - index.pos=" + index.pos);
            val = number(str, index);
            //alert("after val - index.pos=" + index.pos + " val.fNumber=" + val.fNumber);
            answer = {};
            answer.type = "Function";
            answer.notation = "div";
            answer.nFunction = vFunctions.indexOf("div");
            var ar = [value.id, val.id];
            answer.arDepend = ar;
            if (value.nSymbol == 0 || val.nSymbol == 0) answer.nSymbol = 0;
        /*    if (value.dsType == "NUMBER" && val.dsType == "NUMBER") {
                answer.dsType = "NUMBER";
                if (val.fNumber == 0) throw "division by zero.";
                answer.fNumber = value.fNumber / val.fNumber;
            }*/
            answer.id = arAllDs.length;
            arAllDs.push(answer);
            //alert("2. answer.fNumber =" + answer.fNumber);
            value = answer;;
        }
        else {
            // throw "Wrong term. "
            break;
        }
    }
 //   alert(" term: We've finished");
    return value;		// We've finished, so return what we've got
  
}
function number(str, index){
    //alert("number: " + str + " " + index.pos);
    //var value = { dsType: "", fNumber: 0 };	// Store result here
    var value = {};	// Store result here
  //  str="abc24gth45g7j";
  //  alert("str=" + str);
    /////////////     names extraction
    var op="";//abc
    var op1 = "";//abc24
    var op12 = "";//abc24gth45g7j
    var tail1 = "";//24
    var tail2 = "";//gth45g7j
    var nFuncNumber = -1;
    var L = str.length;

    while (index.pos<L &&  isLetter(str[index.pos])) {
        var ch = str[index.pos++];
        op += ch;
        op1 += ch;
        op12 += ch;
    }
//alert("op=" + op);// The op name (abc) is extracted and stored
    if (op.length>0){// continue names extraction   
        while (index.pos < L && isDigit(str[index.pos])) {
            var ch=str[index.pos++];
            op1 += ch;
            op12 += ch;
            tail1 += ch;
        }
     }
//alert(" op1=" + op1 + " tail1=" + tail1);// The op1,op12 (abc24) and  tail1 name (24) is extracted and stored are extracted and stored 	
    if (tail1.length > 0) {
        while(index.pos<L  && (isDigit(str[index.pos]) || isLetter(str[index.pos]))  ){
            var ch = str[index.pos++];
            op12 += ch;
            tail2 += ch;
//alert(L + " " + index.pos);
        }
    }
//alert(" op12=" + op12 + " tail2=" + tail2);// The op12 (abc24gth45g7j) and  tail2  (gth45g7j) is extracted and stored are extracted and stored 
  //  value.op = op;
  //  value.tail1 = tail1;
//alert("L="+L+" op12.length="+op12.length+" op=" + op + " op1=" + op1 + " tail1=" + tail1 + " op12=" + op12 + " tail2=" + tail2);
    if (op.length > 0) {// Name, function, field, or unknown object
//alert("Name, function, field, or unknown object");
       if (op12 == "pi") {//Constant
           value.type = "Number";
           //value.notation = 3.141592653589793 + "";//3.141592653589793 in js
           value.notation = Math.PI + "";
           value.id = arAllDs.length;
           arAllDs.push(value);
           return value;
       }
       if (op12 == "e") {//Constant
           value.type = "Number";
          // value.notation = 2.718281828459 + "";//in js
           value.notation = Math.exp(1) + "";//in js
           value.id = arAllDs.length;
           arAllDs.push(value);
           return value;
       }
        // is op12 a name?
        var bItIsAName = false;
      //  for (var i = 0; i < arNameFormula.length; i++) {
        for (var i = 0; i < curLine; i++) {
//alert("i=" + i + " arNameFormula[i][0]=" + arNameFormula[i][0]);
            if (op12 == arNameFormula[i][0]) {//yes, it is the name 
//alert("curLine="+curLine+" i=" + i + " op12=" + op12 + ": it is a name" + " arFromPresentationIndexToSeriesID[i]=" + arFromPresentationIndexToSeriesID[i]);

//show("arFromPresentationIndexToSeriesID", arFromPresentationIndexToSeriesID);

                bItIsAName = true;
                // was it already calculated?
            //    if (arFromPresentationIndexToSeriesID.length < i) {//it was not
                if (arFromPresentationIndexToSeriesID[i] == -1 ) {//it was not
                  //  alert("You refer to an uncalculated series.");
                    throw "You refer to an uncalculated series.";
                }
           //     else {//it was calculated return ds
                else if (arFromPresentationIndexToSeriesID[i] >= 0) {//it was calculated return ds
                 //   alert("i=" + i + "id=" + id + " arAllDs[id].notation=" + arAllDs[id].notation);
                    var id = arFromPresentationIndexToSeriesID[i];
             //       arFromPresentationIndexToSeriesID[curLine] = id;

               //     alert("curLine=" + curLine + " i=" + i + " id=" + id + " arNameFormula[i][0]=" + arNameFormula[i][0]);

                  //  return arAllDs[i];

                    return arAllDs[id];
                }
            }
        }
        if (!bItIsAName) {// not a name
//alert("function, field, or unknown object");
            // is it a function?
            var bItIsAFunction = false;
            if (L > index.pos && str[index.pos] == "(") {
                var nFuncNumber = vFunctions.indexOf(op12);
                if (nFuncNumber == -1) throw "unknown function " + op12;
                else {// find arDepend and return ds
                    var psubstr = extract(str, index);
//if (psubstr.length == 0) throw "empty parentheses ";
                    if (op12 == "if")
                    {
                        value = doIfOperation(nFuncNumber, psubstr);
//alert("after doIfOperation");
                    }
                    else if (op12 == "row" || op12 == "col" || op12 == "cell") {
                        value = doRowColCellOperation(nFuncNumber, psubstr);
                    }
                    else if (op12 == "col") {
                        value = doColOperation(nFuncNumber, psubstr);//never comes here
                    }
                    else {
// alert(op12);
                        value = doOperation(nFuncNumber, psubstr);
                    }
                    return value;
                }
            }  
            if(!bItIsAFunction){// and not a function
                // is it a field?
                if (op1 == op12) {
   /* alert("op1=" + op1);
 alert("tail1=" + tail1);
 alert("nTail=" + nTail);

      */          
                    if (op1[0] == 'T' || op1[0] == 't') {//9/3/2017
//alert("1. op1=" + op1);
                        var sub = op1.substr(1);
                     //   alert("sub=" + sub);
                        var subN = 1 * sub;
                    //    alert("subN=" + subN);
                        if (!isNaN(subN) /*&& arTexts != null && subN < arTexts.length*/) {
                            op1 = op1.substr(1);
                        //    alert("2. op1=" + op1);
                            value.type = "Table";
                            value.notation = op1;// 0, 1, 2
                            value.nSymbol = 0;
                            value.id = arAllDs.length;
                            arAllDs.push(value);
          //  alert("2. op1=" + op1);
//alert("value.id=" + value.id);
                            return value;
                        }

                    }//9/3/2017
 

                 //   var nField = vFields.indexOf(op);
                    var nField = fromFieldNameToFieldIndex(op);
                    var nTail = 0;
                    if (tail1.length>0) nTail=1 * tail1;
                    if (nField < 0) throw op1 + " is unknown object";
               //     if (nTail >= arSymbolList.length) throw op1+" is a field; you need data for symbol No." + nTail + " to refer to this field";
                    //     if (arSymbolList[nTail] == "") throw "The symbol with No." + nTail + " is empty; you cannot use field " +op1;
                    if (nTail >= arSymbolList.length) throw op1 + " is unknown/no symbols";
                    if (arSymbolList[nTail] == "") throw op1 + " is unknown/no symbols";
                    value.type = "Data";
                    value.notation = op1;
                    value.nSymbol = nTail;
                //    value.nField = vFields.indexOf(op.toLowerCase());
                    value.nField = fromFieldNameToFieldIndex(op.toLowerCase());
                    value.id = arAllDs.length;
                    arAllDs.push(value);
                    return value;
                }
                else {// not a name, not a function, not a field;
                    throw "unknown object " + op12;
                }
            }
        }
  //      alert("Never get here?");
        return value;// ???
    }
    else if (str[index.pos] == "(") {// new expression (not function)
// alert("(");
    //    index.pos++;
        var psubstr = extract(str, index);
        if (psubstr.length == 0) throw "empty parentheses ";
        else value = expr(psubstr);
        return value;
    }
    else {//////  no names: numeric values only
//alert("numeric: " + str + " " + index.pos);
        var val = 0.0;
        var sign = 1.0;
        if (str[index.pos] == "+") index.pos++;
        if (str[index.pos] == "-"){    
            index++;
            sign = -1.0;
        }
        if (isDigit(str[index.pos]) || str[index.pos] == ".") {
            while (isDigit(str[index.pos])) {	// Loop accumulating leading digits           
                val = 10 * val + ((str[index.pos++]).charCodeAt(0) - 48);//
                if (index.pos == str.length) {
                    value.type = "Number";
                    value.notation = val+"";
                    value.id = arAllDs.length;
                    arAllDs.push(value);
//alert("reuturning value.fNumber=" + value.fNumber);
                    return value;
                }
            }
            if (str[index.pos] == ".") {// Is still a digit when we get to here; go ahead    
                var factor = 1.0;	// Factor for decimal place
                if (index.pos == 0) val = 0.;
                else if (!isDigit(str[index.pos - 1])) val = 0.;//After BT  .89 ???
                index.pos++;
                while (index.pos < str.length && isDigit(str[index.pos])) {	// Loop as long as we have digits      

//alert("index.pos="+index.pos+ " str[index.pos]=" + str[index.pos]);

                    if (isDigit(str[index.pos]) ) {
                        factor *= 0.1;		// Decrease factor by factor of 10
                        val += ((str[index.pos]).charCodeAt(0) - 48) * factor;	//.push decimal place
                    }
                    else throw str + "is not a digit at position " + index.pos;
                    index.pos++;
                }
            }
        }
        else {
            var sif = str[index.pos];
            throw sif+": not a number, not a field, not a function, not a name...";
        }

        value.type = "Number";
        value.notation = val+"";
        value.id = arAllDs.length;
        arAllDs.push(value);
//alert("returning not in the end of the line: value.fNumber = " + value.fNumber);
        return value;			// On loop exit we are done
    }
    return value;			// On loop exit we are done
}
function fromFieldNameToFieldIndex(op) {
    var s=op;
    switch (op.toLowerCase()) {
        case "open": s = "o"; break;
        case "high": s = "h"; break;
        case "low": s = "l"; break;
        case "close": s = "c"; break;
        case "volume": s = "v"; break;
    }
    return vFields.indexOf(s);
}
// Function to check letters and numbers  
function isAlphaOrDigit(xStr) {
    var regEx = /^[a-zA-Z0-9\-]+$/;
    return xStr.match(regEx);
}
// Test for digits
function isDigit(aChar) {
    myCharCode = aChar.charCodeAt(0);
    if ((myCharCode > 47) && (myCharCode < 58)) {
        return true;
    }
    return false;
}
function isLetter(aChar) {
    myCharCode = aChar.charCodeAt(0);
 //   alert("myCharCode=" + myCharCode);
    if ((myCharCode >= 97) && (myCharCode <= 122)
        || (myCharCode >= 65) && (myCharCode <= 90)) {
        return true;
    }
    return false;
}
// Function to extract a sub_t_std_st
function extract(str, index) {
//alert("extract: " + str + " index.pos="+index.pos);
    var buffer = "";
    var pstr = "";			// Pointer to new _t_std_st for return
    var numL = 0;			// Count of left parentheses found
    var bufindex = index.pos;	// Save starting value for index
    do
    {
        buffer += str[index.pos];
//alert(str + " index.pos=" + index.pos + "    str.length=" + str.length + "     buffer=" + buffer + "   buffer[index.pos - bufindex] =" + buffer[index.pos - bufindex] + " numL=" + numL);
        if (buffer[index.pos - bufindex] == ")") {
            numL--;	// Reduce count of _T('(') to be matched
//alert("3. numL=" + numL + "   index.pos=" + index.pos);

            if (numL == 0){
                ++index.pos;
                pstr = str.substring(bufindex, index.pos);
//alert("almost=" + pstr);
                var Len = pstr.length;
                while (Len > 0 && pstr[0] == '(' && pstr[Len - 1] == ')') {
                    pstr = pstr.substring(1, Len - 1);
                }
                return pstr;			// Return sub_t_std_st to new memory
            }
        }
        else if (buffer[index.pos - bufindex] == "(") {
            numL++;					// Increase count of _T('(') to be matched
//alert("4. numL=" + numL + "   index.pos=" + index.pos);
        }
        index.pos++;
  //  } while (index.pos++ <= str.length);	// Loop - don't overrun end of _t_std_st
    } while (index.pos < str.length);	// Loop - don't overrun end of _t_std_st
    if (numL != 0) {
     //alert("Ran off the end of the expression, must be bad input.");
        throw "Ran off the end of the expression, must be bad input.";
    }
//alert("OK: " + buffer);
    return buffer;
}
/*
function commaCounter( str){// do i need it????
    var nComma = 0;
    for(var i=0;i<str.length;i++){
        if (str[i] == ",") nComma++;
    }
    return nComma;
}
*/
function doOperation(nFuncNumber, str){
//    var str = "Hello world!";
    //    var res = str.substring(1, 4); ==>  "ell"
//alert("nFuncNumber=" + nFuncNumber);
    var value = {};//the answer

    if (str == "") {
        value.nSymbol = 0;
        value.type = "Function";
        value.nFunction = nFuncNumber;
        value.notation = vFunctions[nFuncNumber];
        value.arDepend = [];
        value.id = arAllDs.length;
        arAllDs.push(value);
        return value;
    }


    var para = 0;	// parantesses (in case there are nested functions)
    var arPos=[-1];
    for(var j=0;j<str.length;j++){
        if(str[j]=="(") para++;
        if(str[j]==")") para--;
        if(str[j]=="," && para==0) arPos.push(j);
    }
    arPos.push(str.length);// delimeters are found


    var nSymb = -1;
    var arDep=[];
    for(var i=0;i<arPos.length-1;i++){
        var argument = str.substring(arPos[i] + 1, arPos[i + 1]);
        //

        var ds=expr(argument);
        arDep.push(ds.id);
        if (ds.nSymbol == 0) nSymb = 0;
    }
    //show("arDep", arDep);
    if (nSymb == 0) value.nSymbol = 0;
    value.type = "Function";
    value.nFunction = nFuncNumber;
    value.notation = vFunctions[nFuncNumber]
    value.arDepend=arDep;
    value.id = arAllDs.length;
    arAllDs.push(value);
    return value;
}
function doRowColCellOperation(nFuncNumber, str) {
//alert("str=" + str);
    var value = {};//the answer

    if (str == "") {
        value.nSymbol = 0;
        value.type = "Function";
        value.nFunction = nFuncNumber;
        value.notation = vFunctions[nFuncNumber];
        value.arDepend = [];
        value.id = arAllDs.length;
        arAllDs.push(value);
        return value;
    }


    var para = 0;	// parantesses (in case there are nested functions)
    var arPos = [-1];
    for (var j = 0; j < str.length; j++) {
        if (str[j] == "(") para++;
        if (str[j] == ")") para--;
        if (str[j] == "," && para == 0) arPos.push(j);
    }
    arPos.push(str.length);// delimeters are found

    /////////////
    // var arRawArgs = [];
    var nTable = -1;
    ///////////
    var nSymb = -1;
    var arDep = [];
    for (var i = 0; i < arPos.length - 1; i++) {
        if (i == 0) {
            nTable = argument * 1;
        }
        var argument = str.substring(arPos[i] + 1, arPos[i + 1]);
        if (isNaN(nTable) && isNaN(argument)) {
            //   throw "Use numeric value, not " + argument;
 //alert("i=" + i + " argument=" + argument);
            var ds = {};
            if (i > 0) {
                ds.nSymbol = 0;
                ds.type = "Name";
                //ds.nFunction = nFuncNumber;
                ds.notation = argument;
                ds.arDepend = [];
                ds.id = arAllDs.length;
                arAllDs.push(ds);

            } else {
                ds = expr(argument);
            }
            arDep.push(ds.id);
            if (ds.nSymbol == 0) nSymb = 0;
//alert("continue");
            continue;
        }
        else if (i == 0) {
            //argument = fromTableNameToNumber(argument);
            nTable = argument*1;
        }
        else if (i == 1 && isNaN(+argument)) {
            if (vFunctions[nFuncNumber] == "row" || vFunctions[nFuncNumber] == "cell") argument = "" + fromRowNameToNumber(nTable * 1, argument);
            if (vFunctions[nFuncNumber] == "col") argument = "" + fromColNameToNumber(nTable * 1, argument);
        }
        else if (i == 2 && isNaN(+argument))// cell
        {
            argument = "" + fromColNameToNumber(nTable * 1, argument);
        }
        var ds = expr(argument);
        arDep.push(ds.id);
        if (ds.nSymbol == 0) nSymb = 0;
    }
//alert("1. return");
    //show("arDep", arDep);
    if (nSymb == 0) value.nSymbol = 0;
    value.type = "Function";
    value.nFunction = nFuncNumber;
    value.notation = vFunctions[nFuncNumber]
    value.arDepend = arDep;
    value.id = arAllDs.length;
    arAllDs.push(value);
//alert("2. return");
    return value;
}

function doIfOperation(nFuncNumber, str) {
//alert("inside of doIfOperation");
    var value = {};//the answer
    var para = 0;	// parantesses (in case there are nested functions)
    var arPos = [-1];
    for (var j = 0; j < str.length; j++) {
        if (str[j] == "(") para++;
        if (str[j] == ")") para--;
        if (str[j] == "," && para == 0) arPos.push(j);
    }
    arPos.push(str.length);// delimeters are found
    if (arPos.length != 4) throw +" if-Function has 3 arguments, like if(c>o,h,l)";
    var nSymb = -1;
    var arDep = [];
    for (var i = 0; i < arPos.length - 1; i++) {
        var argument = str.substring(arPos[i] + 1, arPos[i + 1]);
//alert("doIfOperation: i="+i+" argument"+argument);
        var ds;
        if (i == 0) {

          //  var sifArgument = argument;


            ds = ifExpr(argument);
            arDep.push(ds.id);
            if (ds.nSymbol == 0) nSymb = 0;
        }
        else {
            ds = expr(argument);
            arDep.push(ds.id);
            if (ds.nSymbol == 0) nSymb = 0;
        }
//alert("2.doIfOperation: i=" + i);
    }
    //show("arDep", arDep);
    if (nSymb == 0) value.nSymbol = 0;
    value.type = "Function";
    value.nFunction = nFuncNumber;
    value.notation = vFunctions[nFuncNumber];
    value.arDepend = arDep;
    value.id = arAllDs.length;
    arAllDs.push(value);
    return value;
}
function ifExpr(str) {
//alert("inside of ifExpr");
    var answer = {};// to push
    var value = {};	// for  first operand
    //  if expression starts from + or -, then append zero in the beginning
    if (str[0] == "+" || str[0] == "-") {
        str = "0" + str;
    }
    var val = {};//for second opperand
    var index = { pos: 0 };// Keeps track of current charecter position
//alert("1.ifExpr: " + str + " " + index.pos);
    value = ifTerm(str, index);	// Get first term
//alert("2.ifExpr: " + str + " " + index.pos + "value.fNumber=" + value.fNumber);
    for (; ;) {
//alert("ifExpr - for - index.pos=" + index.pos + " str.length=" + str.length);
        if (str.length == index.pos) {// We are at the end of the str
index.pos++;//???
            break;// to return what we've got
        }
        else if (str[index.pos] == "|") {// (or) + found
            index.pos++;//???
            if (str[index.pos] == "|") index.pos++;
            val = ifTerm(str, index);
            answer = {};
            answer.type = "Function";
            answer.notation = "Or";
            answer.nFunction = vFunctions.indexOf("Or");
            var ar = [value.id, val.id];
            answer.arDepend = ar;
            if (value.nSymbol == 0 || val.nSymbol == 0) answer.nSymbol = 0;
            answer.id = arAllDs.length;
            arAllDs.push(answer);
            value = answer;;
        }
        else {
         //   alert("str.length =" + str.length + " index.pos=" + index.pos);
            throw "Wrong if expression. "
        }
    }
    return value;
}
function ifTerm(str, index) {
//alert("inside of ifTerm");
    var answer = {};// to push
    var value = {};	// for  first operand
    var val = {};//for second opperand
    value = ifNumber(str, index);	// Get the first number in the term
    for (; ;) {
//alert("ifTerm - for - index.pos=" + index.pos + " str.length=" + str.length+" str="+str);
        if (str.length == index.pos) {// We are at the end of the str
            break;// to return what we've got
        }
        else if (str[index.pos] == "&") {// (and) found
//alert("And found");
            index.pos++;
            if (str[index.pos] == "&") index.pos++;
//alert("2. ifTerm: " + str + " " + index.pos);
            val = ifNumber(str, index);
            answer = {};
            answer.type = "Function";
            answer.notation = "And";
            answer.nFunction = vFunctions.indexOf("And");
            var ar = [value.id, val.id];
            answer.arDepend = ar;
            if (value.nSymbol == 0 || val.nSymbol == 0) answer.nSymbol = 0;
            answer.id = arAllDs.length;
            arAllDs.push(answer);
            value = answer;;
        }
        else {
//alert( "Wrong ifTerm. ")
            break;
        }
    }
    //   alert(" term: We've finished");
    return value;		// We've finished, so return what we've got
}
function isIfExpr(str){	// Function to recognize a ifExpression
    if(str.indexOf('>')>-1) return true;
    if (str.indexOf('<') > -1) return true;
    if (str.indexOf('=') > -1) return true;
    return false;
}
function ifNumberBad(str, index) {
/*
    var posStart = index.pos;
    alert("0.ifNumber: str=" + str + " index.pos=" + index.pos);
    /////////////////////////////////
    if (str[index.pos] == '(') {//  

        var psubstr = extract(str, index);


alert("1. psubstr=" + psubstr+ " index.pos="+index.pos);
        if (isIfExpr(psubstr)) {
alert("2. psubstr=" + psubstr + " index.pos=" + index.pos);
            return ifExpr(psubstr);
        }

    }
    */
//alert("1.ifNumber: str=" + str + " index.pos=" + index.pos);
    var answer = {};// to push
    var value = {};	// for  first operand
    var val = {};//for second opperand

    var indexAnd = str.indexOf("&",index.pos);
    if (indexAnd == -1) indexAnd = str.length;
    var indexOr = str.indexOf("|", index.pos);
    if (indexOr == -1) indexOr = str.length;
    var indexMin = Math.min(indexAnd, indexOr);

//alert(" indexAnd=" + indexAnd + " indexOr=" + indexOr + " indexMin=" + indexMin + "str=" + str);
    var subs = str.substring(index.pos, indexMin);
//var subs = str.substring(posStart, indexMin);

//alert("str=" + str + " index.pos=" + index.pos + " subs=" + subs);



    var sOp = "";
    var ops = [">=", ">", "<=", "<", "!=", "==", "="];
    var nots = ["Ge", "Gt", "Le", "Lt", "Ne", "Eq", "Eq"];
    for (var i = 0; i < ops.length; i++) {
        var parts = subs.split(ops[i]);///////
        var L = parts.length;
//alert("L=" + L);

        if (L == 2) {
            sOp = nots[i];
            var substr = parts[0] + "," + parts[1];

            index.pos += substr.length + (ops[i].length - 1);
             // index.pos = substr.length + (ops[i].length - 1);/////////////////////

//alert("sOp=" + sOp + " substr=" + substr + " str=" + str + " index.pos=" + index.pos);
            var nFunc = vFunctions.indexOf(sOp);
            answer = doOperation(nFunc, substr);
//alert("doOperation is done in ifNumber");
            //value = answer;
            break;
        }
        else if (L > 2) {// subs=acc(if(N>0,1,0))>6
//alert("in");
            // remove left "(" and right ")" 
//var substr = extract(substr, index);  //??????
            // chose parts[j]  by counting parantesss
            for (var j = 0; j < L; j++) {
                sOp = nots[i];
//alert(parts[j]+" paras="+checkPara(parts[j])+" sOp="+sOp);
                if (checkPara(parts[j] == 0)) {
                   // alert("j=" + j + " parts[j]=" + parts[j]);
                    // go with the right part
                }
            }




        }
    }
    if (sOp == "") throw "wrong boolean exspression";
    return answer;
}
function ifNumber(str, index) {
    
    /*    var posStart = index.pos;
        alert("0.ifNumber: str=" + str + " index.pos=" + index.pos);
        /////////////////////////////////
        if (str[index.pos] == '(') {//  
            var psubstr = extract(str, index);
    alert("1. psubstr=" + psubstr+ " index.pos="+index.pos);
            if (isIfExpr(psubstr)) {
    alert("2. psubstr=" + psubstr + " index.pos=" + index.pos);
                return ifExpr(psubstr);
            }  
        }*/ 
    //alert("1.ifNumber: str=" + str + " index.pos=" + index.pos);
    var answer = {};// to push
    var value = {};	// for  first operand
    var val = {};//for second opperand

    var indexAnd = str.indexOf("&", index.pos);
    if (indexAnd == -1) indexAnd = str.length;
    var indexOr = str.indexOf("|", index.pos);
    if (indexOr == -1) indexOr = str.length;
    var indexMin = Math.min(indexAnd, indexOr);

    //alert(" indexAnd=" + indexAnd + " indexOr=" + indexOr + " indexMin=" + indexMin + "str=" + str);
    var subs = str.substring(index.pos, indexMin);
    //var subs = str.substring(posStart, indexMin);

//alert("str=" + str + " index.pos=" + index.pos + " subs=" + subs);



    var sOp = "";
    var ops = [">=", ">", "<=", "<", "!=", "==", "="];
    var nots = ["Ge", "Gt", "Le", "Lt", "Ne", "Eq", "Eq"];
    for (var i = 0; i < ops.length; i++) {
        var parts = subs.split(ops[i]);///////
        var L = parts.length;
//alert("L=" + L);
        var sLeft = parts[0];
        for (n = 1; n < L ; n++) {
            //sLeft += parts[n];
//alert("sLeft=" + sLeft);
            var m = sLeft.length;
            if (sLeft[m - 1] == ">" || sLeft[m - 1] == "<" || sLeft[m - 1] == "!") continue;
            if (checkPara(sLeft) == 0) {
                var sRight = parts[n];
                if (sRight[0] == "=") continue;////
//alert("sRight=" + sRight);
                if (checkPara(sRight) == 0) {
                    sOp = nots[i];
                    var substr = sLeft + "," + sRight;
                    index.pos += substr.length + (ops[i].length - 1);
//alert("sOp=" + sOp + " substr=" + substr + " str=" + str + " index.pos=" + index.pos);
                    var nFunc = vFunctions.indexOf(sOp);
                    answer = doOperation(nFunc, substr);
//alert("doOperation is done in ifNumber");
                    //value = answer;
                   break;
                  //   return answer;
                }
            }
            sLeft += ops[i] + parts[n];
        }
    }
    if (sOp == "") throw "wrong boolean exspression";
    return answer;
}

function checkPara(str) {
    var para = 0;	// parantesses (in case there are nested functions)
    for (var j = 0; j < str.length; j++) {
        if (str[j] == "(") para++;
        if (str[j] == ")") para--;
    }
    return para;
}
function replaceTableString(nIn) {

//    alert("replaceTableString");
    var s = arTexts[nIn];
 //   alert("s=" + s);
    //  if (s != "") return s;

    var newStr = "";
    // var chDel = "arIn[";
    var pos2 = 0;
    var pos1 = s.indexOf("`");
  //  alert("pos1=" + pos1);
    newStr += s.substring(pos2, pos1);
//    alert("OUT newStr=" + newStr);
    while (pos1 >= 0) {
        pos2 = s.indexOf("`", pos1 + 1);
   //     alert("pos1=" + pos1 + " pos2=" + pos2);
         var sName = s.substring(pos1 + 1, pos2);
        //var sName = s.substring(pos1, pos2 + 1);
  //      alert("sName=" + sName);
        var ev = eval("arIn["+"'"+sName+"'"+"]");
     //   alert("ev=" + ev);
        if (!isNaN(ev)) {
          //  alert("number"+" "+sName+"="+ev);
            // newStr += eval("arIn[" + "'" + sName + "'" + "]");
            newStr += +ev;
         //   alert("pos2=" + pos2);
        } else {
//alert("variable "+sName);
            //    newStr += sName;
           if (sName == "return") newStr += "arOut[" + nIn + "]=";
           else if (sName[0] == 'T' || sName[0] == 't') {
               var tail = sName.substring(1);
               if (!isNaN(1 * tail)) newStr += "arIn[" + "'" + tail + "'" + "]";
           }
           else {
//alert("else");
             /*
               for(var iLine=0;iLine<arFromPresentationIndexToSeriesID.length;iLine++){
                    var id= arFromPresentationIndexToSeriesID[iLine];
                   var name = arNameFormula[iLine][0];
                   if(sName==name) {
              //         alert("name=" + name);
           //  alert(arAllDs[id].result);
                       if (isMatrix(arAllDs[id].result)) {
                           
                           if (isLetter(arAllDs[id].result[0][0][0])) {
            //alert("named");//cut

                      //         var matr = matrixFromString(arAllDs[id].result);//[A,NN,M,Name] matrix, rows, cols, name
                       //        var matr = arAllDs[id].result.slice();
                               
                        //       alert(matr);
                              var stripMatix = strip(arAllDs[id].result);
                               alert("name="+name+" stripMatix="+stripMatix);

                            arIn["'" + name + "'"] = stripMatix;

//alert("arIn['B']=" + arIn['B']);
                               //arOut[name] = stripMatix;
                               
                           }
                           else {
                              // alert("unnnamed");// do notting
                           }
                       }
                    }
               }
               */
         
               newStr += "arIn[" + "'" + sName + "'" + "]";

        //   alert("sName=" + sName);        
           }

        }
   //     alert("newStr=" + newStr);
        pos1 = s.indexOf("`", pos2 + 2);
      //  if (pos1 < 0) newStr += s.substring(pos2 + 1);
        if (pos1 < 0 ) newStr += s.substring(pos2+1);
        else {
           // newStr += s.substring(pos2 + 1, pos1);
            newStr += s.substring(pos2+1, pos1);
        }
    }
    // if (pos2 == 0) newStr = s;
    //   else newStr += s.substring(pos2+1);
    if (newStr == "") newStr = s;
//alert("RETURNED newStr=" + newStr);
    return newStr;
}
function CalcFunction(fNotation, arArgs) {
  //  alert("arArgs=" + arArgs);
/* //  alert("In CalcFunction: fNotation=" + fNotation + " arArgs[0].type=" + arArgs[0].type + "arArgs[0].notation=" + arArgs[0].notation + " arArgs[1].type=" + arArgs[1].type + "arArgs[1].notation=" + arArgs[1].notation);
    if(fNotation=="myJavaScript"){//
        var a=[];
        a.push(1);
        return a;
    }
    */
    /*
    for (var iLine = 0; iLine < arNameFormula.length; iLine++) {
        var name = arNameFormula[iLine][0];
        alert("name=" + name + " fNotation=" + fNotation);
        if (name == fNotation && vFunctions.indexOf(name) >= 0) throw 'do not use function name ' + name + ' as a variable';
    }
    */


    if (fNotation == "myJS") {//
        arIn = {};
        arOut = {};
        //var ar0 = arArgs[0].result;// only one arArgs
        var nIn = fromVNtoN(arArgs);
//alert("nIn=" + nIn);
        for(var iLine=0;iLine<arFromPresentationIndexToSeriesID.length;iLine++){
            var id= arFromPresentationIndexToSeriesID[iLine];
            var name = arNameFormula[iLine][0];

            if (arAllDs[id].result != undefined && arAllDs[id].result[0] != undefined && arAllDs[id].result[0].length >= 1 && arAllDs[id].result.length >= 1 && arAllDs[id].result[0][0] != 'x') {//matrix

                var rStart = 0;
                var cStart = 0;
                //if (isLetter(arAllDs[id].result[0][0][0])) {
                if (isNaN(arAllDs[id].result[0][0])) {
                    rStart = 1;
                    cStart = 1;
                }


              //  alert("sA=" + arAllDs[id].result);
                var rows=arAllDs[id].result.length;
                var cols=arAllDs[id].result[0].length;
                var mat = [];
                for (var r = rStart; r < rows; r++) {
                    var ar = [];
                    for (var c = cStart; c < cols; c++) {
                        var d = arAllDs[id].result[r][c];////////////////////////////////////
                        if(c>0 && r>0 || !isNaN(d))
                         d = 1 * arAllDs[id].result[r][c];
                        ar.push(d);
                    }
                    mat.push(ar);
                }               
                arIn[name] = mat;
                //  arIn[name] = strip(mat);
            }
            else {
                //  arInOut[name] = arAllDs[id].result;
                //  alert("arAllDs[id].result=" + arAllDs[id].result);
                arIn[name] = arAllDs[id].result;
            }
        }

        for(var i=0;i<arSymbolList.length;i++){  //  vFields
            if (arSymbolList[i]=="") continue;
            var iAvlbl = arFromSymbolListToAvailableIndex[i];
            var stock = arAvailableStiocks[iAvlbl];
            var tail="";
            if (i!=0){
                tail+=i;
            }
            /*
            arInOut["o"+tail] = stock[1];
            arInOut["open"+tail] = stock[1];
            arInOut["h"+tail] = stock[2];
            arInOut["high"+tail] = stock[2]; 
            arInOut["l"+tail] = stock[3];
            arInOut["low"+tail] = stock[3];
            arInOut["c"+tail] = stock[4];
            arInOut["close"+tail] = stock[4]; 
            arInOut["v"+tail] = stock[5];
            arInOut["volume" + tail] = stock[5];
            */
            arIn["o" + tail] = stock[1];
            arIn["open" + tail] = stock[1];
            arIn["h" + tail] = stock[2];
            arIn["high" + tail] = stock[2];
            arIn["l" + tail] = stock[3];
            arIn["low" + tail] = stock[3];
            arIn["c" + tail] = stock[4];
            arIn["close" + tail] = stock[4];
            arIn["v" + tail] = stock[5];
            arIn["volume" + tail] = stock[5];

        }
        if (arTexts == null || arTexts.length <= nIn || arTexts[nIn].length == 0) throw "empty table";
        ///////////////////////////////////////////////////////////////////////
        for (var i = 0; i < arTexts.length; i++) {
            var matr = matrix(i);//[A,NN,M,Name] matrix, rows, cols, name
               
      //      arInOut[i] = matr[4];//////////////////  9/2017
     //       arInOut["T" + i] = matr[4];
            arIn[i] = matr[4];
         //   arIn["T" + i] = matr[4];
//arOut[i] = matr[4];
            //  arOut["T" + i] = matr[4];
  /*      
            arIn[i] = matr[0];
            arOut[i] = matr[0];
*/ 
       //     alert("i=" + i + " matr[0]=" + matr[0] + " matr[1]=" + matr[1] + " matr[2]=" + matr[2] + " matr[3]=" + matr[3] + " matr[4]=" + matr[4]);
        }
        ///////////////////////////////////////////////////////////////////////

        // eval(replaceTableString(nIn));
      //  alert("nIn=" + nIn);
        // https://www.go4expert.com/articles/workarounds-javascript-eval-t13979/

 //       try{
        var newStr = replaceTableString(nIn);

//alert("newStr=" + newStr);
            var myFun = new Function(newStr);
            myFun();
 //       }
 //       catch (err) {
   //         alert(err.message);
    //    }
    
   //     alert("done");


      // return arInOut[nIn];
       return arOut[nIn];///////////////// 9./19/2017
       //  return arOut["T"+nIn];
    }
    ///////////////////////////
    for (var i = 0; i < arArgs.length; i++) {
        if (arArgs[i].notation == "param") throw "wrong usage of a parametric function.";
    }
//alert("arArgs.length=" + arArgs.length);
    var ar = [];
    /*
    if (fNotation == "plus") ar = arithm('+', arArgs[0].result, arArgs[1].result);
    if (fNotation == "minus") ar = arithm('-', arArgs[0].result, arArgs[1].result);
    if (fNotation == "mult") ar = arithm('*', arArgs[0].result, arArgs[1].result);
    if (fNotation == "div") ar = arithm('+', arArgs[0].result, arArgs[1].result);
    */
    // if (fNotation == "insert") return insert(arArgs[0].result);
//alert("arArgs=" + arArgs + " arArgs.length=" + arArgs.length);
    if (arArgs.length == 0) {
        if (fNotation == "year") return yqmd("year");
        if (fNotation == "qrt") return yqmd("qrt");
        if (fNotation == "month") return yqmd("month");
        if (fNotation == "dayOfM") return yqmd("dayOfM");
        if (fNotation == "dayOfW") return yqmd("dayOfW");
        if (fNotation == "hour") return hour();
        if (fNotation == "minute") return minute();
        if (fNotation == "holidays") return holidays();
        if (fNotation == "gpuMult512") return gpuMult512();
        if (fNotation == "ephem") return ephem();
       throw fNotation + " is unknown operation /or it takes not zero arguments";
    }

    if (arArgs.length == 1) {
        var ar0 = arArgs[0].result;

        if (fNotation == "insert") return insert(ar0);
        if (fNotation == "max") return max(ar0);
        if (fNotation == "min") return min(ar0);
        if (fNotation == "start") return start(ar0);
        if (fNotation == "end") return end(ar0);
        if (fNotation == "startToEnd") return startToEnd(ar0);
        if (fNotation == "avg") return avg(ar0);
        if (fNotation == "median") return median(ar0);
        if (fNotation == "acc") return acc(ar0);
        if (fNotation == "ret") return ret(ar0);
      //  if (fNotation == "Acc") return Acc(ar0);
        if (fNotation == "stDev") return stDev(ar0);
        if (fNotation == "same") return same(ar0);
        if (fNotation == "lTrend") return lTrend1(ar0);
        if (fNotation == "cTrend") return cTrend1(ar0);
        if (fNotation == "fFourierM") return fFourierM(ar0);
        if (fNotation == "fFourierRe") return fFourierRe(ar0);
        if (fNotation == "fFourierIm") return fFourierIm(ar0);
        if (fNotation == "rpc") return rpc(ar0);
        if (fNotation == "aEWV") return aEWV0(ar0);//////////
        // if (fNotation == "aEWV") return aEWV(ar0)[0];//////////
        if (fNotation == "aEV") return aEV0(ar0);/////////
        // if (fNotation == "aEV") return aEV(ar0, 101, 0, 1)[0];/////////
        if (fNotation == "aGV") return GARCH(ar0)[0]; ////////////
        if (fNotation == "gv") return gv0(ar0);
        //  if (fNotation == "gv") return gv(ar0)[0];
        if (fNotation == "ev") return aEWV0(ar0);
        //if (fNotation == "ev") return aEWV(ar0)[0];
   /*     if (fNotation == "YahooDates") return YahooDates(ar0);
        if (fNotation == "YahooO") return YahooO(ar0);
        if (fNotation == "YahooH") return YahooH(ar0);
        if (fNotation == "YahooL") return YahooL(ar0);
        if (fNotation == "YahooC") return YahooC(ar0);
        if (fNotation == "YahooV") return YahooV(ar0);
        if (fNotation == "YahooAdj") return YahooAdj(ar0);
        */
/*
        if (fNotation == "toDates") return YahooDates(ar0);
        
        if (fNotation == "toO") return YahooO(ar0);
        if (fNotation == "toH") return YahooH(ar0);
        if (fNotation == "toL") return YahooL(ar0);
      //  if (fNotation == "toC") return YahooC(ar0);
        if (fNotation == "toV") return YahooV(ar0);
        //if (fNotation == "toDividend") return toDividend(ar0);
        */
        if (fNotation == "toO") return toO(ar0);
        if (fNotation == "toH") return toH(ar0);
        if (fNotation == "toL") return toL(ar0);
        if (fNotation == "toC") return toC(ar0);
        if (fNotation == "toV") return toV(ar0);
        if (fNotation == "toDivident") return toDivident(ar0);
        if (fNotation == "toSplit") return toSplit(ar0);
        if (fNotation == "toAdjO") return toAdjO(ar0);
        if (fNotation == "toAdjH") return toAdjH(ar0);
        if (fNotation == "toAdjL") return toAdjL(ar0);
        if (fNotation == "toAdjC") return toAdjC(ar0);
        if (fNotation == "toAdjV") return toAdjV(ar0);
        if (fNotation == "toSun") return toSun(ar0);
        if (fNotation == "toMoon") return toMoon(ar0);
        if (fNotation == "toMercury") return toMercury(ar0);
        if (fNotation == "toVenus") return toVenus(ar0);
        if (fNotation == "toMars") return toMars(ar0);
        if (fNotation == "toJupiter") return toJupiter(ar0);
        if (fNotation == "toSaturn") return toSaturn(ar0);
        if (fNotation == "toUranus") return toUranus(ar0);
        if (fNotation == "toNeptune") return toNeptune(ar0);
        if (fNotation == "toPluto") return toPluto(ar0);

        if (fNotation == "diag") return diag(ar0);
        if (fNotation == "cSpline") return cSpline(ar0);
        if (fNotation == "erf") return erf(ar0);
        if (fNotation == "invN") return invNN(ar0);
        if (fNotation == "sunLight") return sunLight(ar0);
        if (fNotation == "tIndex") return tIndex(ar0);
      //  if (fNotation == "gpuMult") return gpuMult(ar0);
        if (fNotation == "cpuMult") return cpuMult(ar0);
        if (fNotation == "inverse") return inverse(ar0);
        if (fNotation == "trans") return trans(ar0);
        if (fNotation == "copy") return copy(ar0);//minVarWeights
        if (fNotation == "bondPYP") return bondPYP(ar0);
        if (fNotation == "bootstrap") return bootstrap(ar0);
        if (fNotation == "forwardRate") return forwardRate(ar0);
        if (fNotation == "idMatrix") return idMatrix(ar0);
        if (fNotation == "portfolio") return portfolio(ar0);
        if (fNotation == "minVarWeights") return minVarWeights(ar0);
        if (fNotation == "tableOfC") return tableOfC(ar0);
        if (fNotation == "tableOfO") return tableOfO(ar0);
        if (fNotation == "tableOfH") return tableOfH(ar0);
        if (fNotation == "tableOfL") return tableOfL(ar0);
        if (fNotation == "tableOfV") return tableOfV(ar0);
        if (fNotation == "normTableOfC") return normTableOfC(ar0);
        if (fNotation == "normTableOfO") return normTableOfO(ar0);
        if (fNotation == "normTableOfH") return normTableOfH(ar0);
        if (fNotation == "normTableOfL") return normTableOfL(ar0);
        if (fNotation == "nCols") return nCols(ar0);
        if (fNotation == "nRows") return nRows(ar0);
        if (fNotation == "stripRowsColsNames") return strip(ar0);
        if (fNotation == "gpuBenchmark") return gpuBenchmark(ar0);
        if (fNotation == "gpuAcc") return gpuAcc(ar0);
        if (fNotation == "gpuAccum") return gpuAccum(ar0);
    //    if (fNotation == "flipFlopStatus") return flipFlopStatus(ar0);
        if (fNotation == "sumOfCols") return sumOfCols(ar0);
    //    if (fNotation == "minVarPortf") return minVarPortf(ar0);
    //    if (fNotation == "myFunction") return myFunction(ar0);
        //    ar = one(arArgs, fNotation);
        if (fNotation == "setRowsColsNames") return setDefaultNames(ar0);
        if (fNotation == "getRowsNames") return getRowsNames(ar0);
        if (fNotation == "getColsNames") return getColsNames(ar0);
        ar = one(arArgs[0].result, fNotation);
        return ar;
        throw fNotation + " is unknown operation /or it takes not one argument";
    }
    if (arArgs.length == 2) {

      //  alert("arArgs=" + arArgs);

        var ar0 = arArgs[0].result;
        var ar1 = arArgs[1].result;
        switch (fNotation) {
            case "param": ar = param(ar0, ar1); break;// what if arg is itself param?
            case "plus": ar = arithm('+', ar0, ar1);break;
            case "minus": ar = arithm('-', ar0, ar1); break;
            case "mult": ar = arithm('*', ar0, ar1); break;
            case "div": ar = arithm('/', ar0, ar1); break;
            case "Plus": ar = Arithm('+', ar0, ar1); break;//remove
            case "Minus": ar = Arithm('-', ar0, ar1); break;//remove
            case "Mult": ar = Arithm('*', ar0, ar1); break;//remove
            case "Div": ar = Arithm('/', ar0, ar1); break;//remove
            case "TrueHigh": ar = TrueHigh(ar0, ar1); break;//remove
            case "TrueLow": ar = TrueLow(ar0, ar1); break;//remove
            case "trueHigh": ar = TrueHigh(ar0, ar1); break;
            case "trueLow": ar = TrueLow(ar0, ar1); break;
       //     case "sma": if (isMatrix(ar0)) ar = smaFuncFromMatrix(ar0, ar1[0], smaOld); else ar = sma(ar0, ar1); break;
            case "sma": ar = sma(ar0, ar1); break;
            case "wma": ar = wma(ar0, ar1); break;
            case "ema": ar = ema(ar0, ar1); break;
            case "mma": ar = mma(ar0, ar1); break;
            case "max": ar = mMax(ar0, ar1); break;
            case "min": ar = mMin(ar0, ar1); break;
         //   case "stDev": if (isMatrix(ar0)) ar = smaFuncFromMatrix(ar0, ar1[0], mStDevOld); else ar = mStDev(ar0, ar1); break;
            case "stDev": ar = mStDev(ar0, ar1); break;
            case "ref": ar = ref(ar0, ar1); break;
          //  case "ref": if (isMatrix(ar0)) ar = smaFuncFromMatrix(ar1[0],ar0,  refOld); else ar = ref(ar0, ar1); break;
          //  case "Ref": ar = Ref(ar0, ar1); break;
            case "cRef": ar = cycleRef(ar0, ar1); break;
        //    case "CRef": ar = CycleRef(ar0, ar1); break;
            case "Ge": ar = Compare("Ge", ar0, ar1); break;
            case "Gt": ar = Compare("Gt", ar0, ar1); break;
            case "Le": ar = Compare("Le", ar0, ar1); break;
            case "Lt": ar = Compare("Lt", ar0, ar1); break;
            case "Ne": ar = Compare("Ne", ar0, ar1); break;
            case "Eq": ar = Compare("Eq", ar0, ar1); break;
            case "And": ar = Compare("And", ar0, ar1); break;
            case "Or": ar = Compare("Or", ar0, ar1); break;
            case "ge": ar = Compare("Ge", ar0, ar1); break;
            case "gt": ar = Compare("Gt", ar0, ar1); break;
            case "le": ar = Compare("Le", ar0, ar1); break;
            case "lt": ar = Compare("Lt", ar0, ar1); break;
            case "ne": ar = Compare("Ne", ar0, ar1); break;
            case "eq": ar = Compare("Eq", ar0, ar1); break;
            case "and": ar = Compare("And", ar0, ar1); break;
            case "or": ar = Compare("Or", ar0, ar1); break;
            case "lTrend": ar = lTrend2(ar0, ar1); break;
            case "cTrend": ar = cTrend2(ar0, ar1); break;
            case "delFluct": ar = delFluct(ar0, ar1); break;
            case "der": ar = der(ar0, ar1); break;
            case "fFourierS": ar = fFourierS(ar0, ar1); break;
            case "fFourierD": ar = fFourierD(ar0, ar1); break;
            case "fFBackRe": ar = fFBackRe(ar0, ar1); break;
            case "rsi": ar = rsi(ar0, ar1); break;
           // case "rsi": if (isMatrix(ar0)) ar = smaFuncFromMatrix(ar0, ar1[0], rsiOld); else ar = rsi(ar0, ar1); break;
            case "pow": ar = pow(ar0, ar1); break;
            case "obv": ar = obv(ar0, ar1); break;
            case "momD": ar = momD(ar0, ar1); break;
            case "momR": ar = momR(ar0, ar1); break;
            case "roc": ar = roc(ar0, ar1); break;
            case "cti": ar = cti(ar0, ar1); break;
            case "hVlt": ar = hVlt(ar0, ar1); break;
         //   case "aHV": ar = aHV(ar0, ar1); break;
            case "smv": ar = aHV(ar0, ar1); break;
            case "emv": ar = emv(ar0, ar1); break;
            case "gmv": ar = gmv(ar0, ar1); break;
            case "breakUp": ar = breakUp(ar0, ar1); break;
            case "breakDn": ar = breakDn(ar0, ar1); break;
            case "alert": ar = alert(ar0, ar1); break;
            case "ffStatus": ar = ffStatus(ar0, ar1); break;
            case "status": ar = status(ar0, ar1); break;
            case "col": ar = col(ar0, ar1); break;
            case "histCol": ar = histCol(ar0, ar1); break;
            case "revCol": ar = revCol(ar0, ar1); break;//googleCol
            case "googleCol": ar = googleCol(ar0, ar1); break;
            case "row": ar = row(ar0, ar1); break;
            case "discount": ar = discount(ar0, ar1); break;
     //       case "minVarPortfolio": ar = minVarPortfolio(ar0, ar1); break;
            case "minVarPortf":

                alert("ar0=" + ar0);
                alert("ar1=" + ar1);

                ar = minVarPortf(ar0, ar1); break;//
      //      case "bondPYP":
             //   alert("ar0=" + ar0);
              //  alert("ar1=" + ar1);
            //    ar = bondPYP(ar0, ar1); break;
           // case "bootstrap": ar = bootstrap(ar0, ar1); break;
        //    case "forwardRate": ar = forwardRate(ar0, ar1); break;
            case "corrCf": ar = corrCf2(ar0, ar1); break;
            case "cov": ar = cov2(ar0, ar1); break;//
        //    case "binom": ar = binom2(ar0, ar1); break;
                //   case "norm": ar = norm2(ar0, ar1); break;
            case "chiS": ar = chiS(ar0, ar1); break;//invChiS
            case "stud": ar = stud(ar0, ar1); break;
            case "cumPois": ar = cumPois(ar0, ar1); break;
            case "invChiS": ar = invChiS(ar0, ar1); break;
            case "invStud": ar = invStud(ar0, ar1); break;
                //    case "myFunction": ar = myFunction(ar0, ar1); break;//
            case "gpuMatrMult": ar = gpuMatrMult(ar0, ar1, arArgs[0].id, arArgs[1].id); break;
            case "gpuSma": ar = gpuSma(ar0, ar1); break;
        //    case "gpuMult": ar = gpuMult(ar0, ar1); break;
            case "randMatrix": ar = randMatrix(ar0, ar1); break;
       //     case "idMatrix": ar = idMatrix(ar0, ar1); break;
                //   case "cpuMult": ar = cpuMult(ar0, ar1); break;
            case "premFromHazard": ar = premFromHazard(ar0, ar1); break;
            case "mm": ar = mm(ar0, ar1); break;//
            case "totals2SMA": ar = totals2SMA(ar0, ar1); break;

            default: throw fNotation + " is unknown operation /or it takes not two arguments";
        }
        return ar;
    }
    if (arArgs.length == 3) {
        var ar0 = arArgs[0].result;
        var ar1 = arArgs[1].result;
        var ar2 = arArgs[2].result;
        switch (fNotation) {
            // 3 Args
            //   case "if": ar = ifFunction(arArgs); break;
            case "xFromToStep": ar = xFromToStep(arArgs); break;
            case "x": ar = xFromToStep(arArgs); break;
            case "tFromToStep": ar = xFromToStep(arArgs); break;
                // 2Args

       //     case "pow": ar = pow(arArgs); break;
                // 1 Arg:"sqrt",,"exp","ln","lg","log", "sin", "cos","tg","ctg","sec","csc"
                /*
            case "sqrt": ar = sqrt(arArgs); break;
            case "sin": ar = sin(arArgs); break;
            case "cos": ar = cos(arArgs); break;
            */

          //  case "posDirM": ar = DM('p', ar0, ar1, ar2); break;
         //   case "negDirM": ar = DM('n', ar0, ar1, ar2); break;
            case "posDirM": ar = posDirM(ar0, ar1, ar2); break;
            case "negDirM": ar = negDirM(ar0, ar1, ar2); break;
            case "TrueRange": ar = TrueRange(ar0, ar1, ar2); break;
                //     case "PosDM": ar = DMV('p', arArgs[0].result, arArgs[1].result, arArgs[2].result, arArgs[3].result); break;
                //      case "NegDM": ar = DMV('n', arArgs[0].result, arArgs[1].result, arArgs[2].result, arArgs[3].result); break;

            case "If": ar = IfCompare(ar0, ar1, ar2); break;
            case "if": ar = ifCompare(ar0, ar1, ar2); break;
            case "lTrend": ar = lTrend3(ar0, ar1, ar2); break;
            case "cTrend": ar = cTrend3(ar0, ar1, ar2); break;
            case "Cut": ar = Cut(ar0, ar1, ar2); break;
            case "cut": ar = cut(ar0, ar1, ar2); break;
            case "append": ar = append(ar0, ar1, ar2); break;
            case "corrCf": ar = corrCf3(ar0, ar1, ar2); break;
            case "cov": ar = cov3(ar0, ar1, ar2); break;
            case "aHVHL": ar = aHVHL(ar0, ar1, ar2); break;
            case "fluctUp": ar = fluctUp(ar0, ar1, ar2); break;
            case "fluctDn": ar = fluctDn(ar0, ar1, ar2); break;
            case "pnl": ar = pNL(ar0, ar1, ar2); break;
            case "npnl": ar = npNL(ar0, ar1, ar2); break;
            case "cell": ar = cell(ar0, ar1, ar2); break;//CBND
           // case "premFromHazard": ar = premFromHazard(ar0, ar1, ar2); break;
            case "hazardFromPrem": ar = hazardFromPrem(ar0, ar1, ar2); break;
            case "noise": ar = noise(ar0, ar1, ar2); break;
            case "binom": ar = binom(ar0, ar1, ar2); break;
            case "norm": ar = norm(ar0, ar1, ar2); break;
            case "CND": ar = cnd(ar0, ar1, ar2); break;
            case "CBND": ar = CBND(ar0, ar1, ar2); break;
            case "cumF": ar = cumF(ar0, ar1, ar2); break;
            case "invF": ar = invF(ar0, ar1, ar2); break;
         //   case "matrMult": ar = matrMult(ar0, ar1, ar2); break;//gpuMultiplication
        //    case "gpuMultiplication": ar = gpuMultiplication(ar0, ar1, ar2); break;
            case "constMatrix": ar = constMatrix(ar0, ar1, ar2); break;//"cutRows","cutCols","appendRowsColsVal"
           // case "cutRows": ar = cutRows(ar0, ar1, ar2); break;
                //  case "cutCols": ar = cutCols(ar0, ar1, ar2); break;
            case "setRowsColsNames": ar = setRowsColsNames(ar0, ar1, ar2); break;
            case "gpuSmaDif": ar = gpuSmaDif(ar0, ar1, ar2); break;
            case "smaStatus": ar = smaStatus(ar0, ar1, ar2); break;//sumOfCols
            case "gpuSmaStatus": ar = gpuSmaStatus(ar0, ar1, ar2); break;
          //  case "gpuAlert": ar = gpuAlert(ar0, ar1, ar2); break;
            case "gpuSmaAlert": ar = gpuSmaAlert(ar0, ar1, ar2); break;
            case "gpuPnl": ar = gpuPnl(ar0, ar1, ar2); break;
            case "score": ar = score(ar0, ar1, ar2); break;
            default: throw fNotation+" is unknown operation /or it takes not three arguments";
        }
    }
    if (arArgs.length == 4) {
        var ar0 = arArgs[0].result;
        var ar1 = arArgs[1].result;
        var ar2 = arArgs[2].result;
        var ar3 = arArgs[3].result;
        switch (fNotation) {
            // 4 Args
            case "vltI": ar = vltI(ar0, ar1, ar2, ar3); break;
            case "pdI": ar = pdI(ar0, ar1, ar2, ar3); break;
            case "ndI": ar = ndI(ar0, ar1, ar2, ar3); break;
            case "dx": ar = dx(ar0, ar1, ar2, ar3); break;
            case "adx": ar = adx(ar0, ar1, ar2, ar3); break;
            case "camoUp": ar = camoUp(ar0, ar1, ar2, ar3); break;
            case "camoDn": ar = camoDn(ar0, ar1, ar2, ar3); break;
            case "stop": ar = stop(ar0, ar1, ar2, ar3); break;
   case "pnl": ar = pnl(ar0, ar1, ar2, ar3); break;
  //          case "limStatus": ar = limStatus(ar0, ar1, ar2, ar3); break;
            case "bStatus": ar = bStatus(ar0, ar1, ar2, ar3); break;
                //            case "aEV": ar = aEV(ar0, 101, 0, 1); break;//
         //   case "solveSLE": ar = solveSLE(ar0, ar1, ar2, ar3); break;
            case "makeMatrix": ar = makeMatrix(ar0, ar1, ar2, ar3); break;
            case "defaultPortfDistr": ar = defaultPortfDistr(ar0, ar1, ar2, ar3); break;
            case "ffPNL": ar = ffPNL(ar0, ar1, ar2, ar3); break;
            default: throw fNotation + " is unknown operation /or it takes not four arguments";
        }
    }
    if (arArgs.length == 5) {
        var ar0 = arArgs[0].result;
        var ar1 = arArgs[1].result;
        var ar2 = arArgs[2].result;
        var ar3 = arArgs[3].result;
        var ar4 = arArgs[4].result;
        switch (fNotation) {
            // 5 Args
            case "stoch": ar = stoch(ar0, ar1, ar2, ar3, ar4); break;
            case "atrU": ar = atrU(ar0, ar1, ar2, ar3, ar4); break;
            case "atrL": ar = atrL(ar0, ar1, ar2, ar3, ar4); break;
            case "prb": ar = prb(ar0, ar1, ar2, ar3, ar4); break;
            case "call": ar = putCall(ar0, ar1, [1], ar2, ar3, ar4); break;
            case "put": ar = putCall(ar0, ar1, [-1], ar2, ar3, ar4); break;//
            case "pnlPairBB": ar = pnlPairBB(ar0, ar1, ar2, ar3,ar4); break;
            default: throw fNotation + " is unknown operation /or it takes not five arguments";
        }
    }
    if (arArgs.length == 6) {
        var ar0 = arArgs[0].result;
        var ar1 = arArgs[1].result;
        var ar2 = arArgs[2].result;
        var ar3 = arArgs[3].result;
        var ar4 = arArgs[4].result;
        var ar5 = arArgs[5].result;
        switch (fNotation) {
            // 6 Args
            case "mfi": ar = mfi(ar0, ar1, ar2, ar3, ar4, ar5); break;
            case "cci": ar = cci(ar0, ar1, ar2, ar3, ar4, ar5); break;//implVlt
            case "implVlt": ar = ImpliedVolatility(ar0, ar1, ar2, ar3, ar4, ar5); break;
                //case "putCall": ar = putCall(ar0, ar1, ar2, ar3, ar4, ar5); break;

            default: throw fNotation + " is unknown operation /or it takes not six arguments";
        }
    }
    if (arArgs.length == 7) {
        var ar0 = arArgs[0].result;
        var ar1 = arArgs[1].result;
        var ar2 = arArgs[2].result;
        var ar3 = arArgs[3].result;
        var ar4 = arArgs[4].result;
        var ar5 = arArgs[5].result;
        var ar6 = arArgs[6].result;
        switch (fNotation) {
            // 7 Args
            case "strength": ar = strength(ar0, ar1, ar2, ar3, ar4, ar5, ar6); break;
            default: throw fNotation + " is unknown operation /or it takes not seven arguments";
        }
    }
    //strength(n0, E, yearB, monthB, dayB, DaysP, DaysF)
//show("ar", ar);
    return ar;
}
function insert(v) {
    if (isMatrix(v)) return oneMatrix(insert, "", v);
    var ar = [];
    if (v.length == 0) throw "Empty time series";
    if (v.length == 1) {
        ar.push(v[0]);
    }
    else {
        var start = v[0];
        for (var i = 1; i < v.length; i++) {
            if (v[i] == undefined || !isNaN(v[n])) {
                start++;
            }
            else {
                break;
            }
        }
//alert("i=" + i);
        if (i == v.length) throw "Undefined time series";
        ar.push(start);
        var prev = 1*v[i];
        for (var n = i; n < v.length; n++) {
            if (v[n] != undefined && !isNaN(v[n])) {
                prev = 1*v[n];
            }
//alert("n=" + n + " prev=" + prev)
            ar.push(prev);
        }   
    }
    return ar;
}
function param(v1, v2) {
    var nStart1 = 1 * v1[0];
    var nStart2 = 1 * v2[0];
    var nEnd1 = nStart1 + v1.length;
    var nEnd2 = nStart2 + v2.length;
    if (nEnd1 < nStart2) throw "Empty result.";
    if (nEnd2 < nStart1) throw "Empty result.";
    var nStart = nStart1 > nStart2 ? nStart1 : nStart2;
    var nEnd = nEnd1 < nEnd2 ? nEnd1 : nEnd2;
    var v3 = [];
    var v4 = [];
//    v3.push(1 * nStart);
//    v4.push(1 * nStart);
    v3.push("x");
    v4.push(1 * nStart);
    for (var i = nStart + 1; i < nEnd; i++) {
//alert(1 * v1[i - nStart1] + " " + 1 * v2[i - nStart2]);
        v3.push(1 * v1[i - nStart1]);
        v4.push(1 * v2[i - nStart2]);
    }
 //   alert("v3=" + v3);
//    alert("v4=" + v4);
    return [v3,v4];
}
/*
function arithmOld(chOp, v1, v2) {
//alert("In CalcFunction: fNotation");
    var v = [];
    if (v1.length == 1 && v2.length == 1)//numbers
    {
        var z = 1 * v2[0];
//alert("z="+z);
        switch (chOp)
        {
            case '+': v.push(1*v1[0] + z); break;
            case '-': v.push(1*v1[0] - z); break;
            case '/':
             //   if (z == 0.0) v.push(-1.7e308);
            //    else
                    v.push(1*v1[0] / z);
                break;
            case '*': v.push(1*v1[0] * z); break;
            default: throw "Unknown operation";
        }
        return v;
    }
    else if (v1.length == 1 && v2.length != 1)//number+array
    {
        var d = 1*v1[0];
        v.push(v2[0]);//same shift
        for (var i = 1; i < v2.length; i++)
        {
            var z = 1*v2[i];
            switch (chOp)
            {
                case '+': v.push(d + z); break;
                case '-': v.push(d - z); break;
                case '/':
              //      if (z == 0.0) v.push(-1.7e308);
              //      else
                        v.push(d / z);
                    break;
                case '*': v.push(d * z); break;
                default: throw "Unknown operation";
            }
        }
        return v;
    }
    else if (v1.length != 1 && v2.length == 1)//array+number
    {
        var d = 1*v2[0];
        v.push(v1[0]);//same shift
        //same shift
        for (var i = 1; i < v1.length; i++)
        {
            switch (chOp)
            {
                case '+': v.push(1*v1[i] + d); break;
                case '-': v.push(1*v1[i] - d); break;
                case '/':
              //      if (d == 0.0) v.push(-1.7e308);
              //      else
                        v.push((1 * v1[i]) / d);
                    break;
                case '*': v.push((1*v1[i]) * d); break;
                default: throw "Unknown operation";
            }
        }
    }
    else if (v1.length != 1 && v2.length != 1)//array+array
    {
        var nStart1 = 1*v1[0];
        var nStart2 = 1*v2[0];
        var nEnd1 = nStart1 + v1.length;
        var nEnd2 = nStart2 + v2.length;
        if (nEnd1 < nStart2) throw "Empty result.";
        if (nEnd2 < nStart1) throw "Empty result.";
        var nStart = nStart1 > nStart2 ? nStart1 : nStart2;
        var nEnd = nEnd1 < nEnd2 ? nEnd1 : nEnd2;
        v.push(1*nStart);
        for (var i = nStart + 1; i < nEnd; i++)
        {
            var z = 1*v2[i - nStart2];
            switch (chOp)
            {
                case '+': v.push(1*v1[i - nStart1] + z); break;
                case '-': v.push(1*v1[i - nStart1] - z); break;
                case '/':
               //     if (z == 0.0) v.push(-1.7e308);
            //    else
                    v.push(1 * v1[i - nStart1] / z);
                    break;
                case '*': v.push(1*v1[i - nStart1] * z); break;
                default: throw "Unknown operation";
            }
        }
        return v;
    }
    return v;
*/
/*
function arithmOld(chOp, ar1, ar2) {
    var v1 = insert(ar1);
    var v2 = insert(ar2);
    var v = [];
    if (v1.length == 1 && v2.length == 1)//numbers
    {
        var z = 1 * v2[0];
        //alert("z="+z);
        switch (chOp) {
            case '+': v.push(1 * v1[0] + z); break;
            case '-': v.push(1 * v1[0] - z); break;
            case '/':
                //   if (z == 0.0) v.push(-1.7e308);
                //    else
                v.push(1 * v1[0] / z);
                break;
            case '*': v.push(1 * v1[0] * z); break;
            default: throw "Unknown operation";
        }
        return v;
    }
    else if (v1.length == 1 && v2.length != 1)//number+array
    {
        var d = 1 * v1[0];
        v.push(v2[0]);//same shift
        for (var i = 1; i < v2.length; i++) {
            var z = 1 * v2[i];
            switch (chOp) {
                case '+': v.push(d + z); break;
                case '-': v.push(d - z); break;
                case '/':
                    //      if (z == 0.0) v.push(-1.7e308);
                    //      else
                    v.push(d / z);
                    break;
                case '*': v.push(d * z); break;
                default: throw "Unknown operation";
            }
        }
        return v;
    }
    else if (v1.length != 1 && v2.length == 1)//array+number
    {
        var d = 1 * v2[0];
        v.push(v1[0]);//same shift
        //same shift
        for (var i = 1; i < v1.length; i++) {
            switch (chOp) {
                case '+': v.push(1 * v1[i] + d); break;
                case '-': v.push(1 * v1[i] - d); break;
                case '/':
                    //      if (d == 0.0) v.push(-1.7e308);
                    //      else
                    v.push((1 * v1[i]) / d);
                    break;
                case '*': v.push((1 * v1[i]) * d); break;
                default: throw "Unknown operation";
            }
        }
    }
    else if (v1.length != 1 && v2.length != 1)//array+array
    {
        var nStart1 = 1 * v1[0];
        var nStart2 = 1 * v2[0];
        var nEnd1 = nStart1 + v1.length;
        var nEnd2 = nStart2 + v2.length;
        if (nEnd1 < nStart2) throw "Empty result.";
        if (nEnd2 < nStart1) throw "Empty result.";
        var nStart = nStart1 > nStart2 ? nStart1 : nStart2;
        var nEnd = nEnd1 < nEnd2 ? nEnd1 : nEnd2;
        v.push(1 * nStart);
        for (var i = nStart + 1; i < nEnd; i++) {
            var z = 1 * v2[i - nStart2];
            switch (chOp) {
                case '+': v.push(1 * v1[i - nStart1] + z); break;
                case '-': v.push(1 * v1[i - nStart1] - z); break;
                case '/':
                    //     if (z == 0.0) v.push(-1.7e308);
                    //    else
                    v.push(1 * v1[i - nStart1] / z);
                    break;
                case '*': v.push(1 * v1[i - nStart1] * z); break;
                default: throw "Unknown operation";
            }
        }
        return v;
    }
    return v;
}
function ArithmOld(chOp, v1, v2) {
  //  var v1 = insert(ar1);
  //  var v2 = insert(ar2);
    var v = [];
    if (v1.length == 1 && v2.length == 1)//numbers
    {
        var z = 1 * v2[0];
        //alert("z="+z);
        switch (chOp) {
            case '+': v.push(1 * v1[0] + z); break;
            case '-': v.push(1 * v1[0] - z); break;
            case '/':
                //   if (z == 0.0) v.push(-1.7e308);
                //    else
                v.push(1 * v1[0] / z);
                break;
            case '*': v.push(1 * v1[0] * z); break;
            default: throw "Unknown operation";
        }
        return v;
    }
    else if (v1.length == 1 && v2.length != 1)//number+array
    {
        var d = 1 * v1[0];
        v.push(v2[0]);//same shift
        for (var i = 1; i < v2.length; i++) {
            var z = v2[i];
            if (z == undefined) {
                v.push(z);
                continue;
            }
            z = Number(z);
            switch (chOp) {
                case '+': v.push(d + z); break;
                case '-': v.push(d - z); break;
                case '/': v.push(d / z); break;
                case '*': v.push(d * z); break;
                default: throw "Unknown operation";
            }
        }
        return v;
    }
    else if (v1.length != 1 && v2.length == 1)//array+number
    {
        var d = 1 * v2[0];
        v.push(v1[0]);//same shift
        //same shift
        for (var i = 1; i < v1.length; i++) {
            var z = v1[i];
            if (z == undefined) {
                v.push(z);
                continue;
            }
            z = Number(z);
            switch (chOp) {
                case '+': v.push(1 * v1[i] + d); break;
                case '-': v.push(1 * v1[i] - d); break;
                case '/': v.push((1 * v1[i]) / d); break;
                case '*': v.push((1 * v1[i]) * d); break;
                default: throw "Unknown operation";
            }
        }
    }
    else if (v1.length != 1 && v2.length != 1)//array+array
    {
        var nStart1 = 1 * v1[0];
        var nStart2 = 1 * v2[0];
        var nEnd1 = nStart1 + v1.length;
        var nEnd2 = nStart2 + v2.length;
        if (nEnd1 < nStart2) throw "Empty result.";
        if (nEnd2 < nStart1) throw "Empty result.";
        var nStart = nStart1 > nStart2 ? nStart1 : nStart2;
        var nEnd = nEnd1 < nEnd2 ? nEnd1 : nEnd2;
        v.push(1 * nStart);
        var empty;
        for (var i = nStart + 1; i < nEnd; i++) {
            var z = v2[i - nStart2];
            var d = v1[i - nStart1];
            if (z == undefined || d == undefined) {
                v.push(empty);
                continue;
            }
            z = Number(z);
            d = Number(d);
            switch (chOp) {
                case '+': v.push(d + z); break;
                case '-': v.push(d - z); break;
                case '/': v.push(d / z); break;
                case '*': v.push(d * z); break;
                default: throw "Unknown operation";
            }
        }
        return v;
    }
    return v;
}
*/
function arithm(chOp, v1, v2) {
//alert("arithm");
    /*
    if (v1[0] != undefined && v1[0].length >= 1 && v1[0][0] != 'x' || v2[0] != undefined && v2[0].length >= 1 && v2[0][0] != 'x') {
       // alert("Matrix arithm");
        return arithmMM(chOp, v1, v2);//matrix and matrix
    }
*/
  //  if (isMatrix(v1) && isMatrix(v2) /*&& (chOp == '/' || chOp == '*')*/) {
  //  if (isMatrix(v1) && isMatrix(v2)) {
      if (isMatrix(v1) || isMatrix(v2)) {
        return compareMatrix(arithm, chOp, v1, v2);
        /*
//alert("matr and matr: " + chOp);
    //    v1 = dress(v1,"");//
   //     v2 = dress(v2, "");
      //  return arithmMM(chOp, v1, v2);//matrix and matrix
        if (chOp[0] == '-' || chOp[0] == '+') return compareMatrix(arithm, chOp, v1, v2);
        else if (chOp[0] == '*') {
          //  alert("matr*matr");
             return arithmMM(chOp, v1, v2);
        }
        else if (chOp[0] == '/') return arithmMM(chOp, v1, v2);
        */
    }
    else if (typeof v1[0] === 'number' && v1.length == 1 && isMatrix(v2) || typeof v2[0] === 'number' && v2.length == 1 && isMatrix(v1)) {
//alert("num and Matr");
        return arithmMM(chOp, v1, v2);//matrix and matrix
    }
    else if (isMatrix(v1) || isMatrix(v2)){
        //  alert("vect and Matr");
    //    if (chOp == '/') chOp = 'd';
   //     if (chOp == '*') chOp = 'm';
        var vv = [];
        if (isMatrix(v1)) {
            var nCols = v1[0].length;
            if ( isNaN(v1[0][0]) ){//named
                nCols--;
            }
            for (var r = 1; r < v2.length; r++) {
                var ar = [];
                for (var c = 0; c < nCols; c++) {
                    ar.push(v2[r]);
                }
                vv.push(ar);
            }
            return arithmMM(chOp, v1, vv);//matrix and matrix
        }
        if (isMatrix(v2)) {
            var nCols = v2[0].length;
            if (isNaN(v2[0][0])) {//named
                nCols--;
            }
            for (var r = 1; r < v1.length; r++) {
                var ar = [];
                for (var c = 0; c < nCols; c++) {
                    ar.push(v1[r]);
                }
                vv.push(ar);
            }
            return arithmMM(chOp, vv, v2);//matrix and matrix
        }

    }

/*   else if (isMatrix(v1) || isMatrix(v2)) {
       //   alert("+");


    //   if (isMatrix(v1)) v1 = dress(v1, "");//12/7/2017
     //  if (isMatrix(v2)) v2 = dress(v2, "");//12/7/2017

        return compareMatrix(arithm, chOp, v1, v2);
    }
    */
    var V1 = [];
    var V2 = [];
    if (typeof v1 === 'number' && typeof v2 === 'number') {
//alert("number, number");
        V1.push(v1);
        V2.push(v2);
        return arithmAA(chOp, V1, V2);
    }
    else if (typeof v2 === 'number') {
//alert("array, number");
        V2.push(v2);
        return arithmAA(chOp, v1, V2);
    }
    else if (typeof v1 === 'number') {
//alert("number, array");
        V1.push(v1);
        return arithmAA(chOp, V1, v2);
    }
//alert(chOp+"/////////"+ v1+"????????????"+ v2);
    return arithmAA(chOp, v1, v2);
}
function arithmMM(chOp, v1, v2) {
 //   alert("MM");
 //   alert("v2.length=" + v2.length + " v2[0].length=" + v2[0].length);
 //   alert("v1.length=" + v1.length);

    var v = [];
    if (v1.length == 1 )//number+matrix
    {

        var d = 1 * v1[0];
        var rows = v2.length;
        var cols = v2[0].length;
        var nStart=0;
        var v =[];


        for (var i = 0; i < rows; i++) {
            ar = [];
            for (var j = 0; j < v2[0].length; j++) {
                ar.push(v2[i][j]);
            }
            v.push(ar);

        }
//alert("1. :"+v);
        for (var i = 0; i < v2.length; i++) {
            for (var j = 0; j < v2[0].length; j++) {
 //alert("givenr: " + i + " " + j + " " + v[i][j]);
                var z = v2[i][j];
                //  if ((typeof z === 'number')) {
                if (!isNaN(1 * v2[i][j])) {
                    z = 1 * v2[i][j];
                    //alert("0. number: " + i + " " + j + " " + v[i][j]);
                    switch (chOp) {
                        case '+': v[i][j] = (d + z); break;
                        case '-': v[i][j] = (d - z); break;
                        case '/': v[i][j] = (d / z); break;
                        case '*': v[i][j] = (d * z); break;
                        case '^': v[i][j] = (Math.pow(d, z)); break;//???
                        case '|': if (d == 0 && z == 0) v[i][j] = (0.5); else v[i][j] = (d / z); break;//???
                        default: throw "Unknown operation";
                        }
                    //alert("1. number: " + i + " " + j + " " + v[i][j]);
                }
                else {
                    //alert("2. NOT number: " + i + " " + j + " " + v[i][j]);
                   // v[i][j] = v2[i][j];
                }
 //alert("answer: " + i + " " + j + " " + v[i][j]);
            }
        }
        //alert("2. :" + v);
    //    if (v[0][0] == 'x') throw "Pleasse, do not use name 'x' for a matrix: it is reserved for parametric curves";
        return v;
    }
    else if (v2.length == 1 )//matrix+number
    {
        var d = 1 * v2[0];
        var rows = v1.length;
        var cols = v1[0].length;
        var nStart = 0;
        var v = [];
        for (var i = 0; i < rows; i++) {
            ar = [];
            for (var j = 0; j < v1[0].length; j++) {
                ar.push(v1[i][j]);
            }
            v.push(ar);
        }
        for (var i = 0; i < v1.length; i++) {
            for (var j = 0; j < v1[0].length; j++) {
                var z = v1[i][j];
                if (!isNaN(1 * v1[i][j])) {
                    z = 1 * v1[i][j];
                    switch (chOp) {
                        case '+': v[i][j] = (z + d); break;
                        case '-': v[i][j] = (z -d); break;
                        case '/': v[i][j] = (z / d); break;
                        case '*': v[i][j] = (z * d); break;
                        case '^': v[i][j] = (Math.pow(z, d)); break;//???
                        case '|': if (d == 0 && z == 0) v[i][j] = (0.5); else v[i][j] = (z/ d); break;//???
                        default: throw "Unknown operation";
                    }
                }
            }
        }
      //  if (v[0][0] == 'x') throw "Pleasse, do not use name 'x' for a matrix: it is reserved for parametric curves";
        return v;
    }
    else if (v1.length != 1 && v2.length != 1)//matrix+matrix+
    {
//alert("v1="+v1);
      //      alert(v2);
        var bNamed1 = isNaN(v1[0][0]) ? true : false;
        var bNamed2 = isNaN(v2[0][0]) ? true : false;
        var colNames = [];
        var rowNames = [];
        if(bNamed1){
          //  for (var c=0;c<v1[0].length;c++){
          //      colNames.push(v1[0][c]);
           // }
           for (var r = 0; r < v1.length; r++) {
                rowNames.push(v1[r][0]);
           }
//alert(rowNames);
        }
        else {
            rowNames.push("r0");
            for (var r = 0; r < v1.length; r++) {
                rowNames.push("r"+(r+1));
            }
        }
        if (bNamed2) {
            for (var c = 0; c < v2[0].length; c++) {
            //    if (v2[0][c] != colNames[c]) colNames[c] = "col" + c;
                colNames.push(v2[0][c]);
            }
          //  for (var r = 1; r < v1.length; r++) {
         //       if (v2[r][0] != rowNames[r]) rowNames[r] = "row" + r;
          //  }
//alert(rowNames);
        }
        else {
            colNames.push("c0");
            for (var c = 0; c < v2[0].length; c++) {
                colNames.push("c" + (c+1));
            }
        }
//alert("rowNames=" + rowNames);
//alert("colNames=" + colNames);
        v1 = strip(v1);
        v2 = strip(v2);


//alert("start1="+start1+"start2="+start2);

        var rows1 = v1.length;
        var cols1 = v1[0].length;
        var rows2 = v2.length;
        var cols2 = v2[0].length;

       
        if ((chOp == '+' || chOp == '-') && (rows1 != rows2 || cols1 != cols2)) throw "the matrices should have the same size";
        if (chOp == '/') {
//alert(cols2 + " " + rows2 + " " + rows1);
            if (cols2 != rows2 || cols2 != rows1) throw "the second matrix should be squared, with the number of rows/cols equal to the number of rows in first matrix";
            v2 = inverse(v2);
            chOp = '*';
        }
       
        var v = [];
        for (var i = 0; i < rows1; i++) {
            ar = [];
            for (var j = 0; j < cols2; j++) {
                ar.push(0);
            }
            v.push(ar);
        }
        //       alert("v="+v);
        var empty;
        switch (chOp) {
            case '+':
                for (var i = 0; i < rows1; i++) {
                    for (var j = 0; j < cols1; j++) {
                        v[i][j] = 1 * v1[i][j] + 1 * v2[i][j];
                        if (isNaN(v1[i][j]) || isNaN(v2[i][j])) v[i][j] = empty;
                    }
                }
                break;
            case '-': 
                for (var i = 0; i < rows1; i++) {
                    for (var j = 0; j < cols1; j++) {
                        v[i][j] = 1 * v1[i][j] - 1 * v2[i][j];
                        if (isNaN(v1[i][j]) || isNaN(v2[i][j])) v[i][j] = empty;
                    }
                }
                break;
         /*   case 'm':
                for (var i = 0; i < rows1; i++) {
                    for (var j = 0; j < cols1; j++) {
                        v[i][j] = (1 * v1[i][j]) * (1 * v2[i][j]);
                        if (isNaN(v1[i][j]) || isNaN(v2[i][j])) v[i][j] = empty;
                    }
                }
                break;*/
            case 'd':
                for (var i = 0; i < rows1; i++) {
                    for (var j = 0; j < cols1; j++) {
                        v[i][j] = (1 * v1[i][j])/(1 * v2[i][j]);
                        if (isNaN(v1[i][j]) || isNaN(v2[i][j])) v[i][j] = empty;
                    }
                }
                break;
       /*     case '*':
 //alert(rows1 + " " + cols2 );
                if (chOp == '*' && cols1 != rows2) throw "the number of cols in first matrix should be equal to the number of rows in the second matrix";
                for (var i = 0; i < rows1; i++) {
                    for (var j = 0; j < cols2; j++) {
                        var sum = 0;
                        for (var k = 0; k < rows2;k++){
                            sum+=v1[i][k] * v2[k][j];
                        }
                        v[i][j] =sum;
                    }
                }
             //   alert("v=" + v);
                break;*/
            case 'm':
  //alert(rows1 + " " + cols2 );
                if (chOp == 'm' && cols1 != rows2) throw "the number of cols in first matrix should be equal to the number of rows in the second matrix";
                for (var i = 0; i < rows1; i++) {
                    for (var j = 0; j < cols2; j++) {
                        var sum = 0;
                        for (var k = 0; k < rows2; k++) {
                            sum += v1[i][k] * v2[k][j];
                        }
                        v[i][j] = sum;
                    }
                }
                //   alert("v=" + v);
                break;
                
            default: throw "Unknown operation";
        }

        //if (v[0][0] == 'x') throw "Pleasse, do not use name 'x' for a matrix: it is reserved for parametric curves";
        if (!bNamed1 && !bNamed2) return v;
        
        var ans = [];
    /*    ans.push(colNames);
        for (var r = 1; r < rowNames.length; r++) {
            var ar = [rowNames[r]];
            for (var c = 1; c < colNames.length; c++) {
                ar.push(v[r-1][c-1]);
            }
            ans.push(ar);
        }*/
  //      var nCols = cols2;
  //      if (bNamed2) nCols++;
//        var nRows = rows1;
//        if (bNamed1) nRows++;

        //alert(10);
        
        var ar = [];
        for (var c = 0; c < colNames.length; c++) {
            var cName = colNames[c];
            ar.push(cName);
        }
        ans.push(ar);

        for (var r = 1; r < rowNames.length; r++) {
            var ar = [rowNames[r]];
            for (var c = 1; c < colNames.length; c++) {
                var vrc = v[r - 1][c - 1];
                ar.push(vrc);
            }
            ans.push(ar);
        }
        

 //       if (isMatrix(ans)) alert("ans is Matrix");
   //     else alert("ans is NOT a Matrix");
     //   if (isMatrix(v)) alert("v is Matrix");
       // else alert("v is NOT a Matrix");

        //alert("ans=" + ans);
        //if (ans[0][0] == 'x') throw "Pleasse, do not use name 'x' for a matrix: it is reserved for parametric curves";
        return ans;
      //  return v;

    }

}
function arithmAA(chOp, v1, v2) {
    var v = [];
    if (v1.length == 1 && v2.length == 1)//numbers
    {
        var z = 1 * v2[0];
        switch (chOp) {
            case '+': v.push(1 * v1[0] + z); break;
            case '-': v.push(1 * v1[0] - z); break;
            case '/': v.push(1 * v1[0] / z); break;
            case '*': v.push(1 * v1[0] * z); break;
            case '^': v.push(Math.pow(v1[0], v2[0])); break;
            case '|': if (v1[0] == 0 && z == 0) v.push(0.5); else v.push(v1[0]/z); break;
            default: throw "Unknown operation";
        }
        return v;
    }
    else if (v1.length == 1 && v2.length != 1)//number+array
    {
        var d = 1 * v1[0];
        v.push(v2[0]);//same shift
        for (var i = 1; i < v2.length; i++) {
            var z = v2[i];
            if (z == undefined) {
                v.push(z);
                continue;
            }
            z = Number(z);
            switch (chOp) {
                case '+': v.push(d + z); break;
                case '-': v.push(d - z); break;
                case '/': v.push(d / z); break;
                case '*': v.push(d * z); break;
                case '^': v.push(Math.pow(d, z)); break;
                case '|': if (d == 0 && z == 0) v.push(0.5); else v.push(d / z); break;
                default: throw "Unknown operation";
            }
        }
        return v;
    }
    else if (v1.length != 1 && v2.length == 1)//array+number
    {
        var d = 1 * v2[0];
        v.push(v1[0]);//same shift
        //same shift
        for (var i = 1; i < v1.length; i++) {
            var z = v1[i];
            if (z == undefined) {
                v.push(z);
                continue;
            }
            z = Number(z);
            switch (chOp) {
                case '+': v.push(1 * v1[i] + d); break;
                case '-': v.push(1 * v1[i] - d); break;
                case '/': v.push((1 * v1[i]) / d); break;
                case '*': v.push((1 * v1[i]) * d); break;
                case '^': v.push(Math.pow(z, d)); break;
                case '|': if (d == 0 && z == 0) v.push(0.5); else v.push(z / d); break;
                default: throw "Unknown operation";
            }
        }
    }
    else if (v1.length != 1 && v2.length != 1)//array+array
    {
        var nStart1 = 1 * v1[0];
        var nStart2 = 1 * v2[0];
        var nEnd1 = nStart1 + v1.length;
        var nEnd2 = nStart2 + v2.length;
        if (nEnd1 < nStart2) throw "Empty result.";
        if (nEnd2 < nStart1) throw "Empty result.";
        var nStart = nStart1 > nStart2 ? nStart1 : nStart2;
        var nEnd = nEnd1 < nEnd2 ? nEnd1 : nEnd2;
        v.push(1 * nStart);
        var empty;
        var prevD = v1[1];
        var prevZ = v2[1];
        if (isNaN(prevD) && isNaN(prevZ)) {
//alert("v1[0]=" + v1[0] + "v1[1]=" + v1[1] + "v1[2]=" + v1[2] + "v2[0]=" + v2[0] + "v2[1]=" + v2[1] + "v2[2]=" + v2[2]);
            throw "at least one of two series should start from a number";
        }
        for (var i = nStart + 1; i < nEnd; i++) {
            var z = v2[i - nStart2];
            var d = v1[i - nStart1];
            if (isNaN(z) && isNaN(d)) {
                v.push(empty);
                continue;
            }
            else if (isNaN(z)) {
                d = Number(d);
                z = prevZ;
                prevD = d;
            }
            else if (isNaN(d)) {
                z = Number(z);
                d = prevD;
                prevZ = z;
            }
            else {
                z = Number(z);
                d = Number(d);
                prevD = d;
                prevZ = z;
            }
            switch (chOp) {
                case '+': v.push(d + z); break;
                case '-': v.push(d - z); break;
                case '/': v.push(d / z); break;
                case '*': v.push(d * z); break;
                case '^': v.push(Math.pow(d, z)); break;
                case '|': if (d == 0 && z == 0) v.push(0.5); else v.push(d / z); break;
                default: throw "Unknown operation";
            }
        }
        return v;
    }
    return v;
}
/*
function arithmBefore(chOp, v1, v2) {
    //  var v1 = insert(ar1);
    //  var v2 = insert(ar2);

    var v = [];
    if (v1.length == 1 && v2.length == 1)//numbers
    {
        var z = 1 * v2[0];
        switch (chOp) {
            case '+': v.push(1 * v1[0] + z); break;
            case '-': v.push(1 * v1[0] - z); break;
            case '/': v.push(1 * v1[0] / z); break;
            case '*': v.push(1 * v1[0] * z); break;
            case '^': v.push(Math.pow(v1[0], v2[0])); break;
            default: throw "Unknown operation";
        }
        return v;
    }
    else if (v1.length == 1 && v2.length != 1)//number+array
    {
        var d = 1 * v1[0];
        v.push(v2[0]);//same shift
        for (var i = 1; i < v2.length; i++) {
            var z = v2[i];
            if (z == undefined) {
                v.push(z);
                continue;
            }
            z = Number(z);
            switch (chOp) {
                case '+': v.push(d + z); break;
                case '-': v.push(d - z); break;
                case '/': v.push(d / z); break;
                case '*': v.push(d * z); break;
                case '^': v.push(Math.pow(d, z)); break;
                default: throw "Unknown operation";
            }
        }
        return v;
    }
    else if (v1.length != 1 && v2.length == 1)//array+number
    {
        var d = 1 * v2[0];
        v.push(v1[0]);//same shift
        //same shift
        for (var i = 1; i < v1.length; i++) {
            var z = v1[i];
            if (z == undefined) {
                v.push(z);
                continue;
            }
            z = Number(z);
            switch (chOp) {
                case '+': v.push(1 * v1[i] + d); break;
                case '-': v.push(1 * v1[i] - d); break;
                case '/': v.push((1 * v1[i]) / d); break;
                case '*': v.push((1 * v1[i]) * d); break;
                case '^': v.push(Math.pow(z, d)); break;
                default: throw "Unknown operation";
            }
        }
    }
    else if (v1.length != 1 && v2.length != 1)//array+array
    {
        var nStart1 = 1 * v1[0];
        var nStart2 = 1 * v2[0];
        var nEnd1 = nStart1 + v1.length;
        var nEnd2 = nStart2 + v2.length;
        if (nEnd1 < nStart2) throw "Empty result.";
        if (nEnd2 < nStart1) throw "Empty result.";
        var nStart = nStart1 > nStart2 ? nStart1 : nStart2;
        var nEnd = nEnd1 < nEnd2 ? nEnd1 : nEnd2;
        v.push(1 * nStart);
        var empty;
   //     var prevD=v1[nStart1+1];
   //     var prevZ = v2[nStart2 + 1];
        var prevD = v1[1];
        var prevZ = v2[1];
      //  alert("nStart1=" + nStart1 + " prevD=" + prevD + " nStart2=" + nStart2 + " prevZ=" + prevZ);
        if (isNaN(prevD) && isNaN(prevZ)) throw "at least one of two series should start from a number";
        // isNaN(undefined) == true
        for (var i = nStart + 1; i < nEnd; i++) {
            var z = v2[i - nStart2];
            var d = v1[i - nStart1];
            if (isNaN(z) && isNaN(d)) {
                v.push(empty);
                continue;
            }
            else if (isNaN(z)) {
                d = Number(d);
                z = prevZ;
                prevD = d;
            }
            else if (isNaN(d)) {
                z = Number(z);
                d = prevD;
                prevZ = z;
            }
            else {
                z = Number(z);
                d = Number(d);
                prevD = d;
                prevZ = z;
            }
            switch (chOp) {
                case '+': v.push(d + z); break;
                case '-': v.push(d - z); break;
                case '/': v.push(d / z); break;
                case '*': v.push(d * z); break;
                case '^': v.push(Math.pow(d, z)); break;
                default: throw "Unknown operation";
            }
        }
        return v;
    }
    return v;
}
*/
function xFromToStep(arArgs) {
  //  alert("xFromToStep: " + sFrequencyRange);
//    if (sFrequencyRange != "none") throw "it works only for Data Feed = 'none'";
    if (arArgs.length != 3) throw "function xFromToStep takes 3 arguments";
    var from = 1 * arArgs[0].result;
    From = from;
    var to = 1 * arArgs[1].result;
    To = to;
    var step = 1 * arArgs[2].result;
    Step = step;
    if (from >= to) throw "first argument should be less than second";
    if (step <= 0) throw "third argument should be positive";
    var N = Math.round((to - from) / step);
 //   var N = Math.floor((to - from) / step);
    if (N < 1) throw "Number of points should be greater than 1.";
    ar = [];
    ar.push(0.0);
    for (var i = 0; i <= N; i++) {
        ar.push(from + i * (to - from) / N);
    }
/*    var d=from;
    while (d <= to) {
        ar.push(d);
        d += step;
    }*/

   /// alert(from+" "+to+" "+" "+ step+" ar.length=" + ar.length);
 //   alert(ar);

    return ar;
}
/*
function sqrt(arArgs) {
    if (arArgs.length != 1) throw "function sqrt takes 1 argument";
    ar = [];
    var v = arArgs[0].result;
    var N = v.length;
    if (N == 1) {
       // if (1*v[0] < 0) throw " sqrt of negative number";
        ar.push(Math.sqrt(1*v[0]));
    }
    else {
        ar.push(v[0]);
        for (var i = 1; i < N; i++) {
            var d = v[i];
            ar.push(Math.sqrt(d));
        }
    }
    return ar;
}
function sin(arArgs) {
    if (arArgs.length != 1) throw "function sin takes 1 argument";
    ar = [];
    var v = arArgs[0].result;
    var N = v.length;
    if (N == 1) {
        ar.push(Math.sin(v[0]));
    }
    else {
        ar.push(v[0]);
        for (var i = 1; i < N; i++) {
            var d = v[i];
            ar.push(Math.sin(d));
        }
    }
    return ar;
}
function cos(arArgs) {
    if (arArgs.length != 1) throw "function sin takes 1 argument";
    ar = [];
    var v = arArgs[0].result;
    var N = v.length;
    if (N == 1) {
        ar.push(Math.cos(v[0]));
    }
    else {
        ar.push(v[0]);
        for (var i = 1; i < N; i++) {
            var d = v[i];
            ar.push(Math.cos(d));
        }
    }
    return ar;
}
*/
function oneBefore(arArgs, str) {
    if (arArgs.length != 1) throw "function "+str+" takes 1 argument";
    var empty;
    ar = [];
    var v = arArgs[0].result;
    var N = v.length;
    if (N == 1) {
        var d = v[0];
        if (isNaN(d)) {
            ar.push(empty);
        }
        else {
            ar.push(doOne(str, d));
        }
    }
    else {
        ar.push(v[0]);
        for (var i = 1; i < N; i++) {
            var d = v[i];
           // ar.push(doOne(str, d));
            if (isNaN(d)) {
                ar.push(empty);
            }
            else {
                ar.push(doOne(str, d));
            }
        }
    }
    return ar;
}
function one(v, str) {
    if (isMatrix(v)) {
        //alert("oneMatrix");
        // return smaMatrix(one, v, undefined);
        return oneMatrix(one, str, v);
    }
 //   if (arArgs.length != 1) throw "function " + str + " takes 1 argument";
    var empty;
    ar = [];
 //   var v = arArgs[0].result;
    var N = v.length;
    if (v[0] != undefined && v[0].length >= 1 && v[0][0] != 'x') {//martix
        v = strip(v);
//alert("v="+v);
        var rows = v.length;
        var cols = v[0].length;
        var ar = copy(v);

        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                ar[i][j] = doOne(str, v[i][j]);
            }
        }

    }
    else if (N == 1) {
        var d = v[0];
        if (isNaN(d)) {
            ar.push(empty);
        }
        else {
            ar.push(doOne(str, d));
        }
    }
    else {
        ar.push(v[0]);
        for (var i = 1; i < N; i++) {
            var d = v[i];
            // ar.push(doOne(str, d));
            if (isNaN(d)) {
                ar.push(empty);
            }
            else {
                ar.push(doOne(str, d));
            }
        }
    }
    //alert("ar=" + ar);
    return ar;
}
function doOne(str, d) {
    switch (str) {
        // "abs", "acos", "asin", "atan", "ceil", "cos", "exp", "floor", "log", "round", "sin", "sqrt", "tan","tg"
        case "abs": return Math.abs(d);
        case "sign": return Math.sign(d);
        case "acos": return Math.acos(d);
        case "asin": return Math.asin(d);
        case "atan": return Math.atan(d);
        case "ceil": return Math.ceil(d);
        case "cos": return Math.cos(d);
        case "exp": return Math.exp(d);
        case "floor": return Math.floor(d);
        case "lg": return Math.LOG10E * Math.log(d);
        case "log10": return Math.LOG10E * Math.log(d);
        case "ln": return Math.log(d);
        case "round": return Math.round(d);
        case "sin": return Math.sin(d);
        case "sqrt": return Math.sqrt(d);
        case "tan": return Math.tan(d);
        case "tg": return Math.tan(d);
        case "sign": if (d==0) return 0 ; else return d>0?d:Math.abs(d);
        default: throw "unknown operation, or it does not take one parameter";
    }
}
function pow(v1, v2) {
 //   alert(v1);
 //   alert(v2);
 //   alert(arithm('^', v1, v2));
    return arithm('^', v1, v2);
}
function makeFormulaParts(str, iLine) {//text+[+number+]+text+[number+]+text
    arFormulaParts[iLine] = [];
  //  1+<2>+3
    var pos2 = -1;
    var pos1 = str.indexOf("[", 0);
//alert(pos2 + " " + pos1);
    if (pos1 == -1) {
    //    var aa = [];
    //    arFormulaParts[iLine] = aa;
        return str;
    }
    var ar = [];
    while (pos1 >= 0) {
        var text1 = str.substring(pos2+1, pos1);
        ar.push(text1);//text
        ar.push("[");// <
        pos2 = str.indexOf("]", pos1);
        if (pos2 == -1) throw "number of '<' is not equal to number of '>'";
        var text2 = str.substring(pos1+1, pos2);
        ar.push(text2);//number
     //   ar.push(str.substring("]"));// >
        ar.push("]");// >

//alert("text1=" + text1 + "  text2=" + text2);

        pos1 = str.indexOf("[", pos2);

    }
    if (pos2 != -1)
    {
        var sub = str.substring(pos2 + 1, str.length);
//alert("sub=" + sub);
        ar.push(sub);
 
        //arFormulaParts[iLine] = ar;
        for (var i = 0; i < ar.length; i++) {
            arFormulaParts[iLine].push(ar[i]);
        }

//alert("pos2="+pos2+" arFormulaParts[iLine].lenght=" + arFormulaParts[iLine].length);
        str = "";
        for (var i = 0; i < ar.length; i = i + 2) {
            str += ar[i];
        }
    }

    return str;
}
/*
function trueHighOld(v1,v2) {//h,c
    ar = [];
    var N1 = v1.length;
    var N2 = v2.length;
    if (N2 != N1 || N1<2) throw " series should have the same number (>1) of terms";
    ar.push(v1[0]+1);
    for (var i = 2; i < N1; i++) {
        var d1 = v1[i];
        var d2 = v2[i-1];
        ar.push(Math.max(d1,d2));
    }
    return ar;
}
*/
function TrueHigh(v1, v2) {//h,c
        if (isMatrix(v1) || isMatrix(v2)) return compareMatrix(TrueHigh, "", v1, v2);
    var ar = [];
    var N1 = v1.length;
    var N2 = v2.length;
    if (N2 != N1 || N1 < 2) throw " series should have the same number (>1) of terms";
    ar.push(v1[0] + 1);
    var prevClose = v2[1];
    for (var i = 2; i < N1; i++) {
        var d1 = v1[i];
        if (d1 == undefined) {
            ar.push(d1);
            continue;
        }
        ar.push(Math.max(d1, prevClose));
        prevClose = v2[i];
    }
    return ar;
}
/*
function trueLowOld(v1, v2) {//l,c
    ar = [];
    var N1 = v1.length;
    var N2 = v2.length;
    if (N2 != N1 || N1 < 2) throw " series should have the same number (>1) of terms";
    ar.push(v1[0]+1);
    for (var i = 2; i < N1; i++) {
        var d1 = v1[i];
        var d2 = v2[i - 1];
        ar.push(Math.min(d1, d2));
    }
    return ar;
}
*/
function TrueLow(v1, v2) {//l,c
    if (isMatrix(v1) || isMatrix(v2)) return compareMatrix(TrueLow, "", v1, v2);
    var ar = [];
    var N1 = v1.length;
    var N2 = v2.length;
    if (N2 != N1 || N1 < 2) throw " series should have the same number (>1) of terms";
    ar.push(v1[0] + 1);
    var prevClose = v2[1];
    for (var i = 2; i < N1; i++) {
        var d1 = v1[i];
        if (d1 == undefined) {
            ar.push(d1);
            continue;
        }
        ar.push(Math.min(d1, prevClose));
        prevClose = v2[i];
    }
    return ar;
}
/*
function DMOld(chPN, v1,v2,v3) {//h,l,c
    arP = [];
    arN = [];
    var N1 = v1.length;
    var N2 = v2.length;
    var N3 = v3.length;
    if (N2 != N1 || N3 != N1 || N1 < 2) throw " series should have the same number (>1) of terms";

    var th = TrueHigh(v1, v3);
    var tl = TrueLow(v2, v3);
    arP.push(v1[0] + 2);
    arN.push(v1[0] + 2);
    for (var i = 2; i < th.length; i++) {
        h1 = th[i - 1];
        l1 = tl[i - 1];
        h2 = th[i];
        l2 = tl[i];

        if (h2 > h1 && l2 > l1) {
            arP.push(h2 - h1);
            arN.push(0);
        }
        else if (l2 < l1 && h2 < h1) {
            arP.push(0);
            arN.push(l1-l2);
        }
        else if (h2 < h1 && l2 > l1) {
            arP.push(0);
            arN.push(0);
        }
        else {
            var d1 = h2 - h1;
            var d2 = l1 - l2;
            if (d1 == d2) {
                arP.push(0);
                arN.push(0);
            }
            else if (d1 < d2) {
                arP.push(0);
                arN.push(d2);
            }
            else {
                arP.push(d1);
                arN.push(0);
            }
        }
    }
    if (chPN == 'p') {
        return arP;
    }
    else return arN;
}
*/
function posDirM(v1, v2, v3) {
    if (isMatrix(v1) || isMatrix(v2) || isMatrix(v3)) return func32Matrix(posDirM, v1, v2, v3, []);
    return PosNegDM(v1, v2, v3)[0];
}
function negDirM(v1, v2, v3) {
    if (isMatrix(v1) || isMatrix(v2) || isMatrix(v3)) return func32Matrix(negDirM, v1, v2, v3, []);
    return PosNegDM(v1, v2, v3)[1];
}
function PosNegDM(v1, v2, v3) {//h,l,c
    var arP = [];
    var arN = [];
    var N1 = v1.length;
    var N2 = v2.length;
    var N3 = v3.length;
    if (N2 != N1 || N3 != N1 || N1 < 2) throw " series should have the same number (>1) of terms";

    var th = TrueHigh(v1, v3);
    var tl = TrueLow(v2, v3);
    arP.push(v1[0] + 2);
    arN.push(v1[0] + 2);
    var h1 = th[1];//make sure it exists
    var l1 = tl[1];//make sure it exists
    for (var i = 2; i < th.length; i++) {
        //    h1 = th[i - 1];
        //    l1 = tl[i - 1];
        h2 = th[i];
        l2 = tl[i];
        if (h2 == undefined) {
            arP.push(h2);
            arN.push(h2);
            continue;
        }

        if (h2 > h1 && l2 > l1) {
            arP.push(h2 - h1);
            arN.push(0);
        }
        else if (l2 < l1 && h2 < h1) {
            arP.push(0);
            arN.push(l1 - l2);
        }
        else if (h2 < h1 && l2 > l1) {
            arP.push(0);
            arN.push(0);
        }
        else {
            var d1 = h2 - h1;
            var d2 = l1 - l2;
            if (d1 == d2) {
                arP.push(0);
                arN.push(0);
            }
            else if (d1 < d2) {
                arP.push(0);
                arN.push(d2);
            }
            else {
                arP.push(d1);
                arN.push(0);
            }
        }
        h1 = th[i];
        l1 = tl[i];
    }
    return [arP, arN];
}
/*
function DM(chPN, v1, v2, v3) {//h,l,c
    var arP = [];
    var arN = [];
    var N1 = v1.length;
    var N2 = v2.length;
    var N3 = v3.length;
    if (N2 != N1 || N3 != N1 || N1 < 2) throw " series should have the same number (>1) of terms";

    var th = TrueHigh(v1, v3);
    var tl = TrueLow(v2, v3);
    arP.push(v1[0] + 2);
    arN.push(v1[0] + 2);
    var h1 = th[1];//make sure it exists
    var l1 = tl[1];//make sure it exists
    for (var i = 2; i < th.length; i++) {
    //    h1 = th[i - 1];
    //    l1 = tl[i - 1];
        h2 = th[i];
        l2 = tl[i];
        if (h2 == undefined) {
            arP.push(h2);
            arN.push(h2);
            continue;
        }

        if (h2 > h1 && l2 > l1) {
            arP.push(h2 - h1);
            arN.push(0);
        }
        else if (l2 < l1 && h2 < h1) {
            arP.push(0);
            arN.push(l1 - l2);
        }
        else if (h2 < h1 && l2 > l1) {
            arP.push(0);
            arN.push(0);
        }
        else {
            var d1 = h2 - h1;
            var d2 = l1 - l2;
            if (d1 == d2) {
                arP.push(0);
                arN.push(0);
            }
            else if (d1 < d2) {
                arP.push(0);
                arN.push(d2);
            }
            else {
                arP.push(d1);
                arN.push(0);
            }
        }
        h1 = th[i];
        l1 = tl[i];
    }

    if (chPN == 'p') {
        return arP;
    }
    else return arN;
}
*/
function TrueRange(v1, v2, v3) {//h,l,c
    if (isMatrix(v1) || isMatrix(v2) || isMatrix(v3)) func32Matrix(TrueRange, v1, v2, v3, []);
    return arithm('-', TrueHigh(v1, v3), TrueLow(v2, v3));
/*    var empty;
    var arTR = [];
    var N1 = v1.length;
    var N2 = v2.length;
    var N3 = v3.length;
    if (N2 != N1 || N3 != N1 || N1 < 2) throw " series should have the same number (>1) of terms";

    var th = TrueHigh(v1, v3);
    var tl = TrueLow(v2, v3);
    arTR.push(th[0]);
    for (var i = 1; i < th.length; i++) {
        var h = th[i];
        var l = tl[i];
        if (h == undefined) {
            arTR.push(empty);
        }
        else {
            var d = h - l;
            arTR.push(d);
        }
    }
    return arTR;
    */
}
/*
function DMV(chPN, h, l, c, v) {//h,l,c, v

    var v1 = [];
    var v2 = [];
    var v3 = [];
    v1.push(h[0]);
    v2.push(l[0]);
    v3.push(c[0]);
    for (var i = 1; i < v.length; i++) {
        if (v[i] == 0) continue;//
        v1.push(h[i]);
        v2.push(l[i]);
        v3.push(c[i]);
    }
//    var ar = DM(chPN, v1, v2, v3);////////////////
    arP = [];
    arN = [];
    var N1 = v1.length;
    var N2 = v2.length;
    var N3 = v3.length;
    if (N2 != N1 || N3 != N1 || N1 < 2) throw " series should have the same number (>1) of terms";

    //   var th = trueHigh(v1, v3);
 //   var tl = trueLow(v2, v3);
    var th = [];
    var tl = [];
    th.push(v1[0] + 1);
    tl.push(v1[0] + 1);



    for (var i = 2; i < N1; i++) {
        var d1 = v1[i];
        var d2 = v2[i];
        var d3 = v3[i - 1];
        th.push(Math.max(d1, d3));
        tl.push(Math.min(d2, d3));
    }

    /////


    arP.push(v1[0] + 2);
    arN.push(v1[0] + 2);
    for (var i = 2; i < th.length; i++) {
        h1 = th[i - 1];
        l1 = tl[i - 1];
        h2 = th[i];
        l2 = tl[i];

        if (h2 > h1 && l2 > l1) {
            arP.push(h2 - h1);
            arN.push(0);
        }
        else if (l2 < l1 && h2 < h1) {
            arP.push(0);
            arN.push(l1 - l2);
        }
        else if (h2 < h1 && l2 > l1) {
            arP.push(0);
            arN.push(0);
        }
        else {
            var d1 = h2 - h1;
            var d2 = l1 - l2;
            if (d1 == d2) {
                arP.push(0);
                arN.push(0);
            }
            else if (d1 < d2) {
                arP.push(0);
                arN.push(d2);
            }
            else {
                arP.push(d1);
                arN.push(0);
            }
        }
    }


    var arAnswer = [];
    arAnswer.push(arN[0]);
    var nHolidays = 0;
    for (var i = 1; i < arN.length; i++) {
        var ai = arN[i];
        if (chPN == 'p') ai = arP[i];
        if (v[i + nHolidays+2] == 0) {
            arAnswer.push(0);
            nHolidays++;
        }
        arAnswer.push(ai);
    }
    return arAnswer;


}
*/
function compress(v) {// counterpart for decompressOne (the same as  compressOne(v,v)
    var answer = [];
    for (var i = 0; i < v.length; i++) {
      //  if (v[i] != undefined && !isNaN(v[i]))
          if (!isNaN(v[i]))
            answer.push(1*v[i]);
    }
    return answer;
}
function compressOne(v,vBase) {// counterpart for decompressOne
    var answer = [];
    for (var i = 0; i < v.length; i++) {
        //  if (v[i] != undefined && !isNaN(v[i]))
        if (!isNaN(vBase[i]))
            answer.push(1 * v[i]);
    }
    return answer;
}
function compressTwo(v, vBase1, vBase2) {// counterpart for decompressOne
    var answer = [];
    for (var i = 0; i < v.length; i++) {
        if (!isNaN(vBase1[i]) && !isNaN(vBase2[i]))
            answer.push(1 * v[i]);
    }
    return answer;
}
function compressThree(v, vBase1, vBase2, vBase3) {// counterpart for decompressOne
    var answer = [];
    for (var i = 0; i < v.length; i++) {
        if (!isNaN(vBase1[i]) && !isNaN(vBase2[i]) && !isNaN(vBase3[i]))
            answer.push(1 * v[i]);
    }
    return answer;
}
function decompressOne1(vOld, vBase) {

    if (vOld.length < 2) return vOld;
    var empty;
    var vOldStart=vOld[0];

    //   alert("decompressOne");
    var empty;
    var answer = [];
    answer.push(vOldStart);
 //   var hols=holidays();
    //    var holStart=holidays[0];
    var holStart=vBase[0];

    var cur=1;
    var i=1+vOldStart-holStart;
    while(cur<vOld.length){
        if(!isNaN(1*vBase[i])){
            answer.push(vOld[cur]);
            cur++;
        }
        else{
            answer.push(empty);
        }
        i++;
    }
    return answer;
}
function decompressOne(vOld, vBase) {

    if (vOld.length < 2) return vOld;

    //   alert("decompressOne");
    var empty;
    var answer = [];
    var TH = getIndexesOne(vBase);





    //  var TH = getIndexesTradingHolidays();
    var arTradingHolidays = TH[2];

//return arTradingHolidays;

    var minIndex = Number(1*TH[0]);
    var maxIndex = Number(1*TH[1]);
    var start = Number(1*vOld[0]);
//alert("minIndex=" + minIndex + " maxIndex=" + maxIndex + " start=" + start);
    var hols = 0;
/*
    for (var j = minIndex; j < start + hols; j++) {
        if (arTradingHolidays[j - minIndex] == true) hols++;

    }
*/
//   
    for (var j = minIndex+1; j < maxIndex; j++) {// +1 becaause start day is for sure not a holiday
        if (arTradingHolidays[j - minIndex] == 1) hols++;///////////////////////////////////////////////////////////////
      //  alert("j="+j+" start="+start+" trueFalse="+arTradingHolidays[j - minIndex]+ " hols="+hols);
        if (j == start + hols+1) break;
    }
//

//alert(" start="+start+" hols="+hols);

    // answer.push(start);
//return arTradingHolidays;

    answer.push(start + hols);

    for (var i = 1; i < vOld.length; i++) {
        
        var indexTH = i + start;
        //     alert("i="+i+" indexTH=" + indexTH + " arTradingHolidays[indexTH]=" + arTradingHolidays[indexTH]);
        if (minIndex > indexTH && indexTH > maxIndex) {
            answer.push(Number(1*vOld[i]));
            continue;
        }
        while (true) {
            if (arTradingHolidays[indexTH - minIndex + hols] == 1) {//////////////////////////////////////////////////
                //  if (hol[indexTH - minIndex+hols] == 1) {
                //        alert("i=" + i + " indexTH=" + indexTH + " minIndex=" + minIndex + " maxIndex=" + maxIndex + " answer.length=" + answer.length);
                if (answer.length == 1) {///////////////////////////
                    var start = answer[0];/////////////////////
                    answer[0] = 1+answer[0];/////////////////////////
                }////////////////////
                else {///////////////////
//alert("indexTH="+indexTH);
                    answer.push(empty);
                    hols++;
indexTH--;
                }///////////////////////////
            }
            else {
                answer.push(Number(vOld[i]));
                break;
            }
            indexTH++;
        }
    }
    return answer;
    //   return vOld;
}
function decompressTwo(vOld, v1, v2) {
    var v = [];
    var nStart1 = 1 * v1[0];
    var nStart2 = 1 * v2[0];
    var nEnd1 = nStart1 + v1.length;
    var nEnd2 = nStart2 + v2.length;
    if (nEnd1 < nStart2) throw "Empty result.";
    if (nEnd2 < nStart1) throw "Empty result.";
    var nStart = nStart1 > nStart2 ? nStart1 : nStart2;
    var nEnd = nEnd1 < nEnd2 ? nEnd1 : nEnd2;
    v.push(1 * nStart);
    var empty;
    for (var i = nStart + 1; i < nEnd; i++) {
        var z = v2[i - nStart2];
        var d = v1[i - nStart1];
        if (isNaN(z) || isNaN(d)) {
            v.push(empty);
        }
        else v.push(1);
    }

    return decompressOne(vOld, v);
}
function decompressThree(vOld, v1, v2, v3) {
    var v = [];

    var nStart1 = Number(v1[0]);
    var nStart2 = Number(v2[0]);
    if (v2.length == 1) nStart2 = nStart1;
    var nStart3 = Number(v3[0]);
    if (v3.length == 1) nStart3 = nStart1;
    var nEnd1 = nStart1 + v1.length;
    var nEnd2 = nStart2 + v2.length;
    if (v2.length == 1) nEnd2 = nEnd1;
    var nEnd3 = nStart3 + v3.length;
    if (v3.length == 1) nEnd3 = nEnd1;
    var nStart = Math.max(nStart1, nStart2, nStart3);
    var nEnd = Math.min(nEnd1, nEnd2, nEnd3);
    if (nEnd < nStart) throw "Empty result.";
    v.push(1 * nStart);
    var empty;
    for (var i = nStart + 1; i < nEnd; i++) {
        var d1 = v1[i - nStart1];
        var d2 = v2[0];
        if (v2.length != 1) d2 = v2[i - nStart2];
        var d3 = v3[0];
        if (v3.length != 1) d3 = v3[i - nStart3];
        if (isNaN(d1) || isNaN(d2) || isNaN(d2)) {
            v.push(empty);
        }
        else v.push(1);
    }

    return decompressOne(vOld, v);
}
/*
function decompressAll(vOld) {
    alert("vOld.length=" + vOld.length);
    var empty;
    var answer = [];
    var TH = getIndexesTradingHolidays();
    var arTradingHolidays = TH[2];
    var minIndex = Number(TH[0]);
    var maxIndex = Number(TH[1]);
    //  var hol = holidays();
    var start = Number(vOld[0]);
    // alert("minIndex=" + minIndex + " maxIndex=" + maxIndex + " start=" + start);

    var hols = 0;

    for (var j = minIndex; j < start + hols; j++) {
        if (arTradingHolidays[j - minIndex] == true) hols++;
    }

    // answer.push(start);
    answer.push(start + hols);

    for (var i = 1; i < vOld.length; i++) {
        var indexTH = i + start;
        //     alert("i="+i+" indexTH=" + indexTH + " arTradingHolidays[indexTH]=" + arTradingHolidays[indexTH]);
        if (minIndex > indexTH && indexTH > maxIndex) {
            answer.push(Number(vOld[i]));
            continue;
        }
        while (true) {
            if (arTradingHolidays[indexTH - minIndex + hols] == true) {
                //  if (hol[indexTH - minIndex+hols] == 1) {
                //        alert("i=" + i + " indexTH=" + indexTH + " minIndex=" + minIndex + " maxIndex=" + maxIndex + " answer.length=" + answer.length);
                answer.push(empty);
                hols++;
            }
            else {
                answer.push(Number(vOld[i]));
                break;
            }
            indexTH++;
        }
    }
    return answer;
    //   return vOld;
}
*/
/*
function decompressAllHols(vOld) {
    alert("vOld.length=" + vOld.length);
    var empty;
    var answer = [];
    var TH = getIndexesTradingHolidays();
    var arTradingHolidays = TH[2];
    var minIndex = Number(TH[0]);
    var maxIndex = Number(TH[1]);
    //  var hol = holidays();
    var start = Number(vOld[0]);
    // alert("minIndex=" + minIndex + " maxIndex=" + maxIndex + " start=" + start);

    var hols = 0;

    for (var j = minIndex; j < start + hols; j++) {
        if (arTradingHolidays[j - minIndex] == true) hols++;
    }

    // answer.push(start);
    answer.push(start + hols);

    for (var i = 1; i < vOld.length; i++) {
        var indexTH = i + start;
        //     alert("i="+i+" indexTH=" + indexTH + " arTradingHolidays[indexTH]=" + arTradingHolidays[indexTH]);
        if (minIndex > indexTH && indexTH > maxIndex) {
            answer.push(Number(vOld[i]));
            continue;
        }
        while (true) {
            if (arTradingHolidays[indexTH - minIndex + hols] == true) {
                //  if (hol[indexTH - minIndex+hols] == 1) {
                //        alert("i=" + i + " indexTH=" + indexTH + " minIndex=" + minIndex + " maxIndex=" + maxIndex + " answer.length=" + answer.length);
                answer.push(empty);
                hols++;
            }
            else {
                answer.push(Number(vOld[i]));
                break;
            }
            indexTH++;
        }
    }
    return [hols, answer];
    //   return vOld;
}
*/
function smaOld(v, v1) {
    var answer = [];

    var p = fromVNtoN(v1);
//alert("p=" + p+" v1[0]="+v1[0]);
    if (p < 1) throw "Parameter should be greater than 0";
    if (p > v.length - 1) throw "Parameter should be less or equal to number of data points";
    


    var start = 1 * v[0] + p - 1;
//alert("1. p=" + p + " v[0]=" + v[0] + " start=" + start + "answer[0]=" + answer[0]);


    answer.push(1 * v[0] + p - 1);
  //  answer.push(1 * v[0] + p-2);
    for (var i = 1; i < v.length - p + 1; i++)
    {
        answer.push(0);//
    }

    var np = p;
    var sum = 0.0;
    for (var c = 1; c < np + 1; c++)
    {
        sum += 1 * v[c];
    }
    answer[1] = sum / p;
    //Recurrent formula
    for (var c = np + 1; c < v.length; c++)
    {
        sum += 1 * v[c] - 1 * v[c - np];
        answer[c - np + 1] = sum / p;
    }

//alert("2. p=" + p + " v[0]=" + v[0] + " start=" + start + "answer[0]=" + answer[0]);

    return answer;
}
function smaMatrix(func, A, vp) {
    //alert("smaMatrix: vp="+ vp);
    var R = [];//answer 0123-56-89
    var nCols = 0;
    var bANamed = isNaN(A[0][0]);
    var bANumerated = (A[1][0][4] == '-' && A[1][0][7] == '-' || (A[1][0][0]=='r' && A[1][0][0]=='o' &&A[1][0][0]=='w'));
    if (isMatrix(A)) {
        if (bANamed) {
            nCols = A[0].length;
            var ar = [];
            for (var c = 0; c < nCols; c++) ar.push(A[0][c]);
            R.push(ar);
        }
        else nCols = 1 + A[0].length;//unnamed

    }
    if (R.length == 0) {// unnamed matrix
        //   nStart = 0;
        var ar = [];
        for (var c = 0; c < nCols; c++) ar.push("col" + c);
        R.push(ar);
    }
    //alert("R="+R);
    for (var c = 1; c < nCols; c++) {
        var v1 = [];
        if (isMatrix(A)) {
            var startIndex = findIndexStartInMatrix(A);
            v1.push(startIndex);

            if (bANamed) {
                for (var r = 1; r < A.length; r++) {
                    v1.push(A[r][c]);
                }
            }
            else {
                for (var r = 0; r < A.length; r++) {
                    v1.push(A[r][c-1]);
                }
            }/*
            for (var r = 1; r < A.length; r++) {
                if (bANamed) v1.push(A[r][c]);
                else v1.push(A[r][c - 1]);
            }*/
        }
        else v1 = A;
//alert("v1.length="+v1.length+" v1=" + v1+" vp="+vp);
        var v;
        if (func == lTrend3 || func == cTrend3) {
            var a2 = [1 * vp[0]];
            var a3 = [1 * vp[1]];
            //    alert("a2.length=" + a2.length);
            //    alert("a2=" + a2);
            //    alert("a3.length=" + a3.length);
            //    alert("a3=" + a3);
            v = func(v1,a2,a3);
            //    alert("done");
        }
        else if (func == cut || func == append) {
            var a1 = [1*vp[0]];
            var a3 = [1*vp[1]];
        //    alert("a1.length=" + a1.length);
        //    alert("a1=" + a1);
        //    alert("a3.length=" + a3.length);
        //    alert("a3=" + a3);
            v = func(a1, v1, a3);
        //    alert("done");
        }
      //  else if (func == cycleRef || func == ref) {
        else if (func == cycleRef ) {
            v = func(vp, v1);
        }
        else {
         //   alert("vp=" + vp);
            v = func(v1, vp);////////////////////////////////////
        }
//alert("v.length=" + v.length + " v=" + v);
        if (c == 1) {
            for (var n = 1; n < v.length; n++) {
                var ar = [];
                if (isMatrix(A)) {
                    if (bANamed && bANumerated) {
                        if (A[v[0] - v1[0] + n] != undefined && v[0] - v1[0] + n!=0) ar.push(A[v[0] - v1[0] + n][0]);
                       // else ar.push(dateDailyFromIndex(v[0] - v1[0] + n));
                        else ar.push(dateDailyFromIndex(v[0]+n-1));
                    }
                    //else ar.push("row" + (v[0] - v1[0] + n));
                    else ar.push("row" + (v[0] + n-1));
                }
                for (var col = 1; col < nCols; col++) {
                    ar.push(undefined);
                }
                R.push(ar);
            }
        }
        for (var n = 1; n < v.length; n++) {
            R[n][c] = v[n];
        }
        //alert( " R=" + R);
    }
    return R;

}
function sma(v2, v1) {
    if (isMatrix(v2)) return smaMatrix(sma,v2, v1);
    // var v = compress(v2);
    var v = compressOne(v2, v2);
    var vOld = smaOld(v, v1);

//alert("vOld.length="+vOld.length);
    if (v.length == v2.length) return vOld;////////////////////////////////
//alert("decompressOne(vOld, v2)=" + decompressOne(vOld, v2));
    return decompressOne(vOld, v2);
}
//function ema(v2, v1) {
function emaOld(v, v1) {
    //if (!bPassword) throw "Enter your password, please";
     var answer = [];
 //    var v = insert(v2);
     var N1 = v1.length;
     if (N1 != 1) throw " first  parameter is an integer, e.g., ema(9, c)";
     var p=v1[0];
     if (p < 1) throw "Parameter should be greater than 0";
     if (v.length <= 2) return v;

    //Start
    answer.push(1*v[0]);
    for (var i = 1; i < v.length; i++)
    {
        answer.push(0);
    }

    var b = 2.0 / (p + 1.0);
    var a = 1.0 - b;
    answer[1] = 1 * v[1];

    //Recurrent formula
    for (var c = 2; c < v.length; c++)
    {
        answer[c] = b * 1 * v[c] + a * answer[c - 1];
    }

    return answer;
}
//function Ema(v2, v1) {
function ema(v2, v1) {
    if (isMatrix(v2)) return smaMatrix(ema, v2, v1);
    var answer = [];
    //   var v = compress(v2);
    var v = compressOne(v2,v2);
    var vOld = emaOld(v, v1);////
    if (v.length == v2.length) return vOld;////////////////////////////////
    return decompressOne(vOld, v2);
}
//function wma(v2, v1){
function wmaOld(v, v1){
    var answer = [];
 //   var v = insert(v2);
    var N1 = v1.length;
    if (N1 != 1) throw " second  parameter is an integer, e.g., wma(c, 9)";
    var p=1*v1[0];
    if (p < 1) throw "Parameter should be greater than 0";
    if (p > v.length - 1) throw "Parameter should be less or equal to number of data points";
        
    answer.push(1 * v[0] + p - 1);
    for (var i = 1; i < v.length - p + 1; i++)
    {
        answer.push(0);//
    }

    var np = p;
    var w15 = p * (p + 1.0) / 2.0;
    var sum = 0.0;
    var y = 0.0;
    for (var c = 1; c < np + 1; c++)
    {
        sum += 1 * v[c];
        y += c * 1 * v[c];
    }
    answer[1] = y / w15;
    //Recurrent formula
    for (var c = np + 1; c < v.length; c++)
    {
        y += p * 1 * v[c] - sum;
        sum += 1 * v[c] - 1 * v[c - np];
        answer[c - np + 1] = y / w15;
    }

    return answer;
}
//function Wma(v2, v1) {
function wma(v2, v1) {
    if (isMatrix(v2)) return smaMatrix(wma, v2, v1);
   // var v = compress(v2);
    var v = compressOne(v2, v2);
    var vOld = wmaOld(v, v1);
    if (v.length == v2.length) return vOld;////////////////////////////////
    return decompressOne(vOld, v2);
}
/*
function mmaOld(v2, v1){
    var answer = [];
    var v = insert(v2);
    var N1 = v1.length;
    if (N1 != 1) throw " first  parameter is an integer, e.g., sma(9, c)";
    var p=v1[0];
    if (p < 1) throw "Parameter should be greater than 0";
    if (p > v.length - 1) throw "Parameter should be less or equal to number of data points";

    answer.push(v[0] + p - 1);//answer[0]
    //first point is sma
    var sum = 0;
    for (var k = 1; k < 1 + p; k++)
    {
        sum += v[k];
    }
    var dPrev = sum / p;
    answer.push(dPrev);//answer[1]
    // next points are ema
    var b = 2.0 / (p + 1.0);
    var a = 1.0 - b;
    //Recurrent formula
    for (var c = p + 1; c < v.length; c++)
    {
        dPrev = b * v[c] + a * dPrev;
        answer.push(dPrev);
    }
    return answer;
}
*/
function mmaNum(v, v1) {
//alert("mmaNum");
    var V1 = [];
    if (!(typeof v1 === 'array' )) {
        V1.push(v1);
//alert("not array");
        return mma( v, V1);
    }
//alert("array");
    return mma(v, v1);
}
function mma(v, v1) {
    if (isMatrix(v)) return smaMatrix(mma, v, v1);
    var answer = [];
    //var v = insert(v2);
    var N1 = v1.length;
    if (N1 != 1) throw " usage: sma(9, c)";
    var p = v1[0];
    if (p < 1) throw "Parameter should be greater than 0";
   // if (p > v.length - 1) throw "Parameter should be less or equal to number of data points";

    //first point is sma
    var sum = 0;
    var n = 0;
    for (var k = 1; k < v.length; k++) {
        if (v[k] == undefined) continue;
        sum += Number(v[k]);
        n++;
        if (n == p) break;
    }
    var start = k;
    answer.push(v[0] + start - 1);//answer[0]
    var dPrev = sum / p;
//alert(" p="+p+" sum="+sum+" dPrev=" + dPrev+" start="+start);
    answer.push(dPrev);//answer[1]
    // next points are ema
 //   var b = 2.0 / (p + 1.0);
 //   var a = 1.0 - b;
    var b = 1.0 / p;
    var a = 1.0 - b;
    //Recurrent formula
 //   for (var c = p + 1; c < v.length; c++) {
    for (var c = start+1; c < v.length; c++) {
        if (v[c] == undefined) {
            answer.push(v[c]);
            continue;
        }
        dPrev = b * v[c] + a * dPrev;
        answer.push(dPrev);
    }
    if (answer.lenth < 1) throw "Parameter should be less or equal to number of data points";
    return answer;
}

function decompress(v2,p,vOld) {
    var answer = [];
    var nHolidays = 0;
    var nTrDays = 0;
    var n = 2;
    for (var i = 1; i < v2.length; i++) {
        if (isNaN(v2[i])) {
            nHolidays++;
            if (answer.length != 0) {
                answer.push(v2[i]);
            }
        }
        else {
            nTrDays++;
            if (nTrDays == p && answer.length == 0) {
                answer.push(v2[0] + i - 1);
                answer.push(vOld[1]);
            }
            else if (nTrDays > p) {
                answer.push(vOld[n]);// i????
                n++;
            }
        }
    }
    return answer;
}
function mMaxOld(v, v1) {
    var answer = [];
   // var v = insert(v2);
    var N1 = v1.length;
    if (N1 != 1) throw " first  parameter is an integer, e.g., sma(9, c)";
    var p = 1 * v1[0];
    if (p < 1) throw "Parameter should be greater than 0";
    if (p > v.length - 1) throw "Parameter should be less or equal to number of data points";     
    answer.push(1 * v[0] + p - 1);
    for (var i = 1; i < v.length - p + 1; i++)
    {
        var dMax = 1 * v[i];
        for (var k = i; k < i + p; k++)
        {
            var d = Number(v[k]);
            if (d > dMax)
            {
                dMax = d;
            }
        }
        answer.push(dMax);
    }

//alert("answer[0]=" + answer[0] + "answer[1]=" + answer[1] + "answer[2]=" + answer[2]);

    return answer;
}
function mMax(v2, v1) {
    if (isMatrix(v2)) return smaMatrix(mMax, v2, v1);
  //  var v = compress(v2);
    var v = compressOne(v2, v2);
    var vOld = mMaxOld(v, v1);
    if (v.length == v2.length) return vOld;////////////////////////////////
    return decompressOne(vOld, v2);
}
function mMinOld(v, v1) {
    var answer = [];
   // var v = insert(v2);
    var N1 = v1.length;
    if (N1 != 1) throw " first  parameter is an integer, e.g., sma(9, c)";
    var p = 1*v1[0];
    if (p < 1) throw "Parameter should be greater than 0";
    if (p > v.length - 1) throw "Parameter should be less or equal to number of data points";
    answer.push(1 * v[0] + p - 1);
    for (var i = 1; i < v.length - p + 1; i++) {
        var dMin = 1 * v[i];
        for (var k = i; k < i + p; k++) {
            var d = Number(v[k]);
            if (d < dMin) {
                dMin = d;
            }
        }
        answer.push(dMin);
    }
    return answer;
}
function mMin(v2, v1) {
    if (isMatrix(v2)) return smaMatrix(mMin, v2, v1);
   // var v = compress(v2);
    var v = compressOne(v2, v2);
    var vOld = mMinOld(v, v1);
    if (v.length == v2.length) return vOld;////////////////////////////////
    return decompressOne(vOld, v2);
}
function max(v)//Maximum 
{
    if (isMatrix(v)) {
        return oneMatrix(max, "", v);
    }

    var answer =[];
    var dMax = v[1];
    for (var i = 1; i < v.length; i++)
    {
     //   if (v[i] == undefined) continue;
        if (isNaN(v[i])) continue;
        var d = Number(v[i]);
        if (d > dMax) dMax =d;
    }
    answer[0] = dMax;
    return answer;
}
function min(v)//Minimum 
{
    if (isMatrix(v)) return oneMatrix(min, "", v);
    var answer = [];
    var dMin = v[1];
    for (var i = 1; i < v.length; i++) {
        if (isNaN(v[i])) continue;
        var d = Number(v[i]);
        if (d < dMin) dMin = d;
    }
    answer[0] = dMin;
    return answer;
}
function start(v)//
{
    if (isMatrix(v)) return oneMatrix(start, "", v);
    var answer = [];
    answer[0] = Number(v[1]);
    return answer;
}
function end(v)//
{
    if (isMatrix(v)) return oneMatrix(end, "", v);
    var answer = [];
    answer[0] = Number(v[v.length - 1]);
    return answer;
}
function startToEnd(v)//
{
    if (isMatrix(v)) return oneMatrix(startToEnd, "", v);
    var answer = [];
    var empty;
    answer[0] = v[0];
    var start = Number(v[1]);
    var end = Number(v[v.length - 1]);
    for (var i = 1; i < v.length; i++) {
        var d = start + (end - start) * (i - 1) / (v.length - 2);
        if (isNaN(v[i])) answer.push(empty);
        else answer.push(d);
    }
    return answer;
}
function avg(v1)//
{
    if (isMatrix(v1)) return oneMatrix(avg, "", v1);
    var v = insert(v1);
    var answer = [];

    var sum = 0.0;
    for (var i = 1; i < v.length; i++) {
        var d = Number(v[i]);
        sum += d;
    }
    answer[0] = sum / (v.length - 1);
    return answer;
}
function median(v1)// median
{
    if (isMatrix(v1)) return oneMatrix(median, "", v1);
    var v = insert(v1);


    var b = [];
    for (var i = 1; i < v.length; i++)
    {
        b.push(Number(v[i]));
    }
    b.sort(function (a, b) { return a - b });

    var i1 = Math.floor(b.length / 2);
    var i2 = Math.floor((b.length - 1) / 2);
    var d = (Number(b[i1]) + Number(b[i2])) / 2.0;

    var answer = [];
    answer[0] = d;
    return answer;
}
//	DataSet DataSet::stD(unsigned long p, unsigned long row,unsigned long left, unsigned long right)
//function mStDevOld(v1, v2)
function mStDevOld( v, v2  )
{
 //   alert("2. mStDev");
   //  var p = v2[0];
   var p=fromVNtoN(v2);
 //   var v=insert(v1);
    var m_nStartCol = 1;
    var m_nEndCol = v.length - 1;


    var m=m_nEndCol - m_nStartCol + 1;
//alert(p + " " +m);

    if (p < 2 || p > m_nEndCol - m_nStartCol + 1) throw " mStDevOld: parameter should be greater than 1 and less or equal to number of data points";

    var v0 = 1 * v[0];
    // MA
    var Z = [];
    for (var z = 0; z < v.length; z++)
    {
        Z.push(1*v[z]);
    }
  // Z = sma(Z, v2);
    Z = smaOld(Z, v2);
    // Do a job
    var Y = [];
var Y0=p - 1 + v0;
//alert("1.v0="+v0+" p="+p+" Y0="+Y0+" Y[0]="+Y[0]);
    Y.push(p - 1 + v0);
    //var c, i;
    var z0 = 1 * Z[0];
    for (var c = p - 1 + 1; c < p - 1 + Z.length; c++)
    {
        var sigma = 0.0;
        for (var i = 0; i < p; i++)
            sigma += (1 * Z[c - z0 + v0] - 1 * v[c - i]) * (1 * Z[c - z0 + v0] - 1 * v[c - i]);
        sigma = Math.sqrt(sigma / (p - 1.0));
        Y.push(sigma);
    }
//alert("2.v0="+v0+" p="+p+" Y0="+Y0+" Y[0]="+Y[0]);
    return Y;
}
function mStDev(v2, v1) {
    if (isMatrix(v2)) return smaMatrix(mStDev, v2, v1);
    //  var v = compress(v2);
    var p=fromVNtoN(v1);
    var v = compressOne(v2, v2);
    //    var vOld = mStDevOld(v, v1);

    var vOld = mStDevOld(v, p);
//alert(" vOld[0]="+vOld[0]);
    if (v.length == v2.length) return vOld;////////////////////////////////
    var ans=decompressOne(vOld, v2);
//alert("ans[0]="+ans[0]);
    return ans;
}
function stDev(v) {
    if (isMatrix(v)) return oneMatrix(stDev, "", v);
    //alert("1.stDev");
    var av = avg(v);
    var D = arithm('-', v, av);
    D = arithm('*', D, D);
    var Acc = acc(D);
    var d = Acc[Acc.length - 1];
    d = Math.sqrt(d / (v.length - 2));
    var Y = [];
    Y.push(d);
    return Y;

}
//function same(v1)
function same(v) {
    if (isMatrix(v)) return oneMatrix(same, "", v);
 //   var v = insert(v1);
    //Start
    var answer =[];
    answer.push(v[0]);
    var prev=Number(1*v[1]);//alway defined
    answer.push(0.0);
    var prevAnswer = 0;
    for (var i = 2; i < v.length; i++)
    {
     //   alert("i="+i+" v[i]="+v[i]);
        if (isNaN(v[i])){
            answer.push(v[i]);
        }
        else{
            if (1 * v[i] == prev) {
                answer.push(1.0 + prevAnswer);
                prevAnswer++;
            }
            else {
                answer.push(0.0);
                prevAnswer = 0;
            }
            prev = 1 * v[i];
        }
    }
return answer;
}
//function Cut(v1, v2, v3) {//Cut(20,c,50)
function cutOld( v1, v2, v3) {//Cut(20,c,50)
    var arA = [];
    var N1 = v1.length;
    //var N2 = v2.length;
    var N3 = v3.length;
    if (N1 != 1 || N3 != 1) throw " first and third parameters are integers, e.g., cut(50, c, 30)";
    if (v1[0] < 0 || v3[0] < 0) throw "first and third arguments should be positive: cut(50, c, 30)";
    var fromStart=v1[0];
    var fromEnd = v3[0];
//    alert("v1[0]=" + v1[0]);
 //   alert("v2.length=" + v2.length);
//    alert("v3[0]=" + v3[0]);

    if (1*v1[0] + 1*v3[0] > v2.length - 1) throw "cannot cut more terms than a series has; usage: cut(50, c, 30)";// ????

    arA.push(v2[0]+fromStart);
    for (var i = fromStart + 1; i < v2.length - fromEnd; i++)
    {
        arA.push(v2[i]);
    }
    return arA;
}
function cut(V1, V2, V3) {//cut(20,c,50)
    if (isMatrix(V2)) return smaMatrix(cut, V2, [[V1[0]], [V3[0]]]);
 //   var v1 = compress(V1);
 //   var v2 = compress(V2);
 //   var v3 = compress(V3);
    var v2 = compressOne(V2, V2);
    var vOld = cutOld(V1, v2, V3);
    if (V2.length == v2.length) return vOld;////////////////////////////////
    return decompressOne(vOld, V2);
}
function append(v1, v2, v3) {//append(20,Middle,50)
    if (isMatrix(v2)) return smaMatrix(append, v2, [[v1[0]], [v3[0]]]);
 //   alert("append");
  //
    var N1 = v1.length;
    var N3 = v3.length;
//    alert("v1.length=" + v1.length);
//    alert("v1=" + v1);
 //   alert("v3.length=" + v3.length);
//    alert("v3=" + v3);
    if (N1 != 1 || N3 != 1) throw " first and third parameters are integers, e.g., append(50, c, 30)";
    if (v1[0] < 0 || v3[0] < 0) throw "first and third arguments should be positive: append(50, c, 30)";
    var nLeft = v1[0];
//alert("nLeft=" + nLeft);
    var nRight = v3[0];
//alert("nRight=" + nRight);


    var dLeft = v2[1];
    var dRight = v2[v2.length - 1];
    var idxStart=v2[0];
    var hol = holidays();
    var idxHolStart = hol[0];
 //   var s = "";


  //  alert("idxStart=" + idxStart + "idxHolStart=" + idxHolStart + " hol[0]=" + hol[0] + " hol[idxStart - idxHolStart]=" + hol[idxStart - idxHolStart]);

    var empty;
    var i = 0;
    var h = 0;
    var arB = [];
  //  s = "";
    while (i < nLeft) {
        if (hol[idxStart - idxHolStart - i-h] != 1) {
            arB.push(dLeft);
            i++;
  //          s += "t";
        }
        else {
   //         alert(i + " " + h);
            arB.push(empty);
            h++;
    //        s += "-";
        }
    }
  //  alert(s.substring(0, 40));
    var N = h + nLeft;
    arB.push(v2[0] - N);
    var arA = arB.reverse();
//alert(888);
    for (var i = 1; i < v2.length; i++) arA.push(v2[i]);
    i = 0;
    h=0;
    while (i < nRight) {
        if (hol[idxStart - idxHolStart + v2.length - 1 + i+h] != 1) {
            arA.push(dRight);
            i++;
        }
        else {
            arA.push(empty);
            h++
        }
    }
//alert(999);
    return arA;
}
/*
function appendNew(V1, V2, V3) {//append(20,c,50)
    var v1 = compress(V1);
    var v2 = compress(V2);
    var v3 = compress(V3);
    var vOld = appendOld(v1, v2, v3);
    return decompressOne(vOld, V2);

}
*/
/*
function Ref(v1, v2) {//ref(-9,c)
    answer = [];
    var N1 = v1.length;
    if (N1 != 1) throw " first  parameter is an integer, e.g., ref(-9, c)";
    var p=v1[0]; 
    var N2 = v2.length;
    if (N2==1){
        answer.push(N2);
    }
    else{
        answer.push(v2[0] - p);
        for (var i = 1; i < v2.length; i++)
        {
            answer.push(v2[i]);
        }
    }
    return answer;
}
*/
function refOld(p, v2) {//ref(-9,c)
    answer = [];
 //   var N1 = v1.length;
 //   if (N1 != 1) throw " first  parameter is an integer, e.g., ref(-9, c)";
 //   var p = v1[0];
    var N2 = v2.length;
    if (N2 == 1) {
        answer.push(v2[0]);
    }
    else {
        answer.push(v2[0] - p);
        for (var i = 1; i < v2.length; i++) {
            answer.push(v2[i]);
        }
    }
    return answer;
}
/*
function arrayOrNumberToNumber(v1, str) {
    var p;
    if (typeof v1 === 'number') {
        p = v1;
    }
    else {
        var N1 = v1.length;
        if (N1 != 1) throw " this  parameter is an integer" + str;
        p = v1[0];
    }
    return p;
}*/
function refMatrix(p, A) {
    var a10 = A[1][0];
    var startHols = indexDailyFromDate(a10);
    var startIndex = startHols - p;
//alert("a10=" + a10 + " is " + startIndex);
    var R = [];
    for (var i = 0; i < A.length; i++) {
        R.push(A[i].slice());
    }
    var hols = [startHols];
    hols.push(startIndex);
    for (var i = 1; i < A.length; i++) {
        R[i][0] = dateDailyFromIndex(i - 1 + startIndex);
        if (A[i][1] == undefined) hols.push(1);
        else hols.push(0);
    }
 //   alert(hols);
    for (var c = 1; c < A[0].length; c++) {

        var v2 = [startHols]
        for (var i = 1; i < A.length; i++) {
            v2.push(A[i][c]);
        }

        var ans = [startIndex];
        var d = v2[1];//???
        for (var i = 1; i < v2.length; i++) {
            var n = ans[0] + i - hols[0]+1;
            if (hols[n] != 1) {
                if (d == undefined) {//holiday
                    ans.push(v2[i + 1]);
                }
                else {
                    ans.push(d);
                }
                d = v2[i + 1];
            }
            else {
                ans.push(undefined);
                d = v2[i];
            }
        }

        for (var i = 1; i < A.length; i++) {
            R[i][c]=ans[i];
        }

    }
    return R;
}
function refToFuture(p, v, hols) {
    var empty;
    var ans = [];
    var start = v[0];
    var steps = 0;
//alert("hols=" + hols);
    while (steps<p) {
        start--;
        if (!hols[start-hols[0]+1]) steps++;// not a holiday
//alert("p=" + p + " steps=" + steps + " start=" + start);
    }
    //alert(v[0] + " " + start);
    var next = start + 1;
    ans.push(next);
    ans.push(v[1]);

    for (var i = 2; i < v.length; i++) {

        if (!isNaN(v[i])) {// v[i] is a number, not a holiday
            ans.push(v[i]);
            next++;
        }
        if (hols[next - hols[0] + 2]) {//holiday 
              //alert("i="+i+" empty="+empty);
                ans.push(empty);
                next++;
        }
    }
    return ans;
}
/*
function ref(v1, v2) {//ref(-9,c)
    if (v2.length == 1) {
        alert("rsi(" + v1 + "," + v2 + ")");
     //   alert("v1=" + v1);
    //    alert("v2=" + v2);
        var temp = v1;
        v1 = v2;
        v2 = temp;
     //   alert("v1=" + v1);
     //   alert("v2=" + v2);
    }
 */       
function ref(v2, v1) {//ref(c,-9)
   if (isMatrix(v2)) {
       var p = fromVNtoN(v1);
       //alert("1. p=" + p);
      return oneMatrix(ref, p, v2);
      //  return smaMatrix(ref, v2, p);
   }
   if (v2.length == 1) {
     //  alert("v2=" + v2);
       return v2;//constant
   }
   var p = fromVNtoN(v1);
if (arSymbolPresentation==null||arSymbolPresentation.length==0) return refOld(p,v2);
    if (p > 0) {
      //  
//alert("2. p=" + p);
        var hols = [];
        try {
            var hols = holidays();
         //   var hols;// = holidays();
   /*         hols.push(v2[0]);
            for (var i = 1; i < v2.length; i++) {
                if (v2[i] == undefined) hols.push(1);
                else hols.push(0);
            }*/
           // alert(hols);
        }
       catch (err) {
           alert("err=" + err.message);
        }
     //   alert("hols=" + hols);
        return refToFuture(p, v2, hols);//////////////////////////////
   //     var p = fromVNtoN(v1);////////////////////

  /*      var ans = [v2[0]-p];// ???
        if (hols.length > 0) {
            var d = v2[1];//???
            for (var i = 1; i < v2.length; i++) {
                var n = ans[0] + i - hols[0];
                if (hols[n] != 1) {
                    if (d == undefined) {//holiday
                        ans.push(v2[i + 1]);
                    }
                    else {
                        ans.push(d);
                    }
                    d = v2[i + 1];
                }
                else {
                    ans.push(undefined);
                    if (d == undefined) d = v2[i + 1]; else//12/2/2017
                    d = v2[i];
                  //  d = v2[i + 1];// instead of d = v2[i];/
                }
            }
            return ans;
        }
       */ 
   }
   else {

       // else return refOld(p, v2);    
      //  var p = arrayOrNumberToNumber(v1, ", e.g.,ref(-9, c)");
        //var p = fromVNtoN(v1);///////////
        var v = compressOne(v2, v2);
    //alert("v="+v);
       //   var vOld = refOld(v1, v);
//alert("3. p=" + p);
        var vOld = refOld(p, v);
//alert("vOld=" + vOld);
        if (v.length == v2.length) return vOld;////////////////////////////////

    //alert("vOld=" + vOld);
        var r = decompressOne(vOld, v2);
    //alert("r=" + r);
        return r;
   }

    
}

//function CycleRef(p, v)
function cycleRefOld(p, v)
{

//    if (v1.length != 1) throw "usage: cRef(-20,c)";
 //   var p = v1[0];
 //   alert("CycleRef");
    var answer = [];
    if (v.length == 1)
    {
        answer.push(v[0]);
        return answer;
    }
//alert(1);
    //     answer.push(v[0] - p);
    answer.push(v[0]);
    var N1 = v.length - 1;
 //alert("N1=" + N1);
    for (var i = 1; i < v.length; i++)
    {

        var j = (i + p + N1) % N1;
        if (j == 0) j = N1;
// alert("i=" + i + " j=" + j + " v[j]=" + v[j]);
        answer.push(v[j]);
    }
    return answer;
}
function cycleRef(v1, V) {

    if (V.length == 1) {
         //  alert("v1=" + v1);
         //   alert("V=" + V);
        var temp = v1;
        v1 = V;
        V = temp;
        //   alert("v1=" + v1);
        //   alert("V=" + V);
    }

    if (isMatrix(V)) return smaMatrix(cycleRef,V, v1 );
    //  var v = compress(V);
  //  var p = arrayOrNumberToNumber(v1, ", e.g., cRef(-9, c)");
    var p = fromVNtoN(v1);
    var v = compressOne(V, V);
  //  var vOld = CycleRef(p, v);
    var vOld = cycleRefOld(p, v);

    if (v.length == V.length) return vOld;////////////////////////////////
    return decompressOne(vOld, V);
}

function acc(v)// for daily?
{

    if (isMatrix(v)) return accMatrix(v);
    // if (isMatrix(v)) return oneMatrix(acc, "", v);

    var empty;
    var answer = [];
    if (v.length == 1) {
        // constant
        var d = Number(v[0]);
     //   var TH = getIndexesTradingHolidays();
        var TH = getIndexesTradingHolidays(v);
        var arTradingHolidays = TH[2];
        var minIndex=TH[0];
        var maxIndex = TH[1];
        answer.push(minIndex);
        var sum=d;
        answer.push(sum);
        for (var i = 2; i <= arTradingHolidays.length; i++) {//???????????  i=1 ; i < arTradingHolidays.length; ????
            if (arTradingHolidays[i]) answer.push(empty);
            else {
                sum += d;
                answer.push(sum);
            }
        }
        return answer;

    }
    // 

    answer.push(Number(v[0]));
    var sum = 0.0;
    for (var i = 1; i < v.length; i++)
    {
        var d = Number(v[i]);
        if (!isNaN(d)){
            sum += Number(d);
            answer.push(sum);
        }
        else {
            answer.push(empty);
        }
       // alert("sum="+sum);

    }
    return answer;
}
/*
function acc(V) {
    //  var v = compress(V);
    var v = compressOne(V, V);
    var vOld = accOld(V);
    return decompressOne(vOld, V);
}*/
function accOld(v) {
  //  var v = insert(v1);
    var answer = [];
    answer.push(Number(v[0]));
    var sum = 0.0;
    for (var i = 1; i < v.length; i++) {
        var d = Number(v[i]);
        if (isNaN(d)) {
//alert("v[i]=" + v[i]);
            continue;
        }
        sum += d;
        answer.push(sum);
    }
    return answer;
}
function func5Matrix(func, A, B, C, D, E, arP) {
    //  alert("A=" + A);
    //  alert("B=" + B);
    // alert("sGLE=" + sGLE);

    var R = [];//answer
    var nCols = 0;
    var bANamed = isNaN(A[0][0]);
    var bBNamed = isNaN(B[0][0]);
    var bCNamed = isNaN(C[0][0]);
    var bDNamed = isNaN(D[0][0]);
    var bENamed = isNaN(E[0][0]);
    if (isMatrix(A)) {
        if (bANamed) {
            nCols = A[0].length;
            var ar = [];
            for (var c = 0; c < nCols; c++) ar.push(A[0][c]);
            R.push(ar);
        }
        else nCols = 1 + A[0].length;
    }
    else if (isMatrix(B)) {
        if (bBNamed) {
            //alert("B[0]=" + B[0]);
            nCols = B[0].length;
            var ar = [];
            for (var c = 0; c < nCols; c++) ar.push(B[0][c]);
            R.push(ar);
        }
        else nCols = 1 + B[0].length;
    }
    else if (isMatrix(C)) {
        if (bCNamed) {
            nCols = C[0].length;
            var ar = [];
            for (var c = 0; c < nCols; c++) ar.push(C[0][c]);
            R.push(ar);
        }
        else nCols = 1 + C[0].length;
    }
    else if (isMatrix(D)) {
        if (bCNamed) {
            nCols = D[0].length;
            var ar = [];
            for (var c = 0; c < nCols; c++) ar.push(D[0][c]);
            R.push(ar);
        }
        else nCols = 1 + D[0].length;
    }
    else if (isMatrix(E)) {
        if (bCNamed) {
            nCols = E[0].length;
            var ar = [];
            for (var c = 0; c < nCols; c++) ar.push(E[0][c]);
            R.push(ar);
        }
        else nCols = 1 + E[0].length;
    }
    if (R.length == 0) {
        var ar = [];
        for (var c = 0; c < nCols; c++) ar.push("col" + c);
        R.push(ar);
    }
    //   alert(A[0].length + " " + B[0].length+" "+C[0].length);
    if (isMatrix(A) && isMatrix(B) && isMatrix(C) && isMatrix(D) && isMatrix(E) &&
        (A[0].length != B[0].length || A[0].length != C[0].length || A[0].length != D[0].length || A[0].length != E[0].length)
        ) throw "Number of cols in all tables must be the same";

    for (var c = 1; c < nCols; c++) {// -1
        //alert("c=" + c + " 1. R=" + R);
        var v1 = [];
        if (isMatrix(A)) {
            var startIndex = findIndexStartInMatrix(A);
            v1.push(startIndex);
            if (bANamed) {
                for (var r = 1; r < A.length; r++) {
                    v1.push(A[r][c]);
                }
            }
            else {
                for (var r = 0; r < A.length; r++) {
                    v1.push(A[r][c - 1]);
                }
            }
        }
        else v1 = A;

        var v2 = [];
        if (isMatrix(B)) {
            var startIndex = findIndexStartInMatrix(B);
            v2.push(startIndex);
            if (bBNamed) {
                for (var r = 1; r < B.length; r++) {
                    v2.push(B[r][c]);
                }
            }
            else {
                for (var r = 0; r < B.length; r++) {
                    v2.push(B[r][c - 1]);
                }
            }
        }
        else v2 = B;

        var v3 = [];
        if (isMatrix(C)) {
            var startIndex = findIndexStartInMatrix(C);
            v3.push(startIndex);
            if (bCNamed) {
                for (var r = 1; r < C.length; r++) {
                    v3.push(C[r][c]);
                }
            }
            else {
                for (var r = 0; r < C.length; r++) {
                    v3.push(C[r][c - 1]);
                }
            }
        }
        else v3 = C;

        var v4 = [];
        if (isMatrix(D)) {
            var startIndex = findIndexStartInMatrix(D);
            v4.push(startIndex);
            if (bDNamed) {
                for (var r = 1; r < D.length; r++) {
                    v4.push(D[r][c]);
                }
            }
            else {
                for (var r = 0; r < D.length; r++) {
                    v4.push(D[r][c - 1]);
                }
            }
        }
        else v4 = D;

        var v5 = [];
        if (isMatrix(E)) {
            var startIndex = findIndexStartInMatrix(E);
            v5.push(startIndex);
            if (bENamed) {
                for (var r = 1; r < E.length; r++) {
                    v5.push(E[r][c]);
                }
            }
            else {
                for (var r = 0; r < E.length; r++) {
                    v5.push(E[r][c - 1]);
                }
            }
        }
        else v5 = E;

        var v;
        if (arP.length == 0) {
            v = func(v1, v2, v3,v4,v5);
        }
        else if (arP.length == 1) v = func(v1, v2, v3, v4, v5, arP[0]);
        else if (arP.length == 2) v = func(v1, v2, v3, v4, v5, arP[0], arP[1]);
        else v = func(v1, v2, v3, v4, v5, arP[0], arP[1], arP[2]);

        //alert("v.length=" + v.length);
        //alert("1.R=" + R + " R.length=" + R.length);
        if (c == 1) {
            if (v.length == 1) {
                var ar = ["row1"];
                for (var col = 2; col < nCols; col++) {
                    ar.push(undefined);
                }
                R.push(ar);
            }
            else {
                for (var n = 1; n < v.length; n++) {//  -1
                    var ar = [];
                    if (isMatrix(A)) {
                        if (bANamed) ar.push(A[v[0] - v1[0] + n][0]);
                       // else ar.push("row" + (v[0] - v1[0] + n));
                        else ar.push("row" + (v[0] - 1 + n));
                    }
                    else if (isMatrix(B)) {
                        if (bBNamed) ar.push(B[v[0] - v2[0] + n][0]);
                       // else ar.push("row" + (v[0] - v2[0] + n));
                        else ar.push("row" + (v[0] - 1 + n));
                    }
                    else if (isMatrix(C)) {
                        if (bCNamed) ar.push(C[v[0] - v3[0] + n][0]);
                        // else ar.push("row" + (v[0] - v3[0] + n));
                        else ar.push("row" + (v[0] - 1 + n));
                    }
                    for (var col = 1; col < nCols; col++) {
                        ar.push(undefined);
                    }
                    R.push(ar);
                    //alert("ar=" + ar);
                }
            }
            //if (n == v.length-1) alert("2.R=" + R + " R.length=" + R.length);
        }
        //alert("3.R.length=" + R.length + "v.length=" + v.length );
        for (var n = 1; n < v.length; n++) {
            R[n][c] = v[n];
        }
        if (v.length == 1) R[1][c] = v[0];
        //alert("c="+c+ " n. R=" + R);
    }
    //   alert("3.R.length=" + R.length + "v.length=" + v.length + "R[0]=" + R[0] + "R[1]=" + R[1] + "R[2]=" + R[2] + "R[R.length-1]=" + R[R.length-1]);
    return R;

}
function func32Matrix(func, A, B, C, arP) {
    //  alert("A=" + A);
    //  alert("B=" + B);
    // alert("sGLE=" + sGLE);

    var R = [];//answer
    var nCols = 0;
    var bANamed = isNaN(A[0][0]);
    var bBNamed = isNaN(B[0][0]);
    var bCNamed = isNaN(C[0][0]);
    if (isMatrix(A)) {
        if (bANamed) {
            nCols = A[0].length;
            var ar = [];
            for (var c = 0; c < nCols; c++) ar.push(A[0][c]);
            R.push(ar);
        }
        else nCols = 1 + A[0].length;
    }
    else if (isMatrix(B)) {
        if (bBNamed) {
//alert("B[0]=" + B[0]);
            nCols = B[0].length;
            var ar = [];
            for (var c = 0; c < nCols; c++) ar.push(B[0][c]);
            R.push(ar);
        }
        else nCols = 1 + B[0].length;
    }
    else if (isMatrix(C)) {
        if (bCNamed) {
            nCols = C[0].length;
            var ar = [];
            for (var c = 0; c < nCols; c++) ar.push(C[0][c]);
            R.push(ar);
        }
        else nCols = 1 + C[0].length;
    }
    if (R.length == 0) {
        var ar = [];
        for (var c = 0; c < nCols; c++) ar.push("col" + c);
        R.push(ar);
    }
 //   alert(A[0].length + " " + B[0].length+" "+C[0].length);
    if (isMatrix(A) && isMatrix(B) && isMatrix(C) &&
        (A[0].length != B[0].length || A[0].length != C[0].length ||  B[0].length != C[0].length)
        ) throw "Number of cols in all tables must be the same";

    for (var c = 1; c < nCols; c++) {// -1
//alert("c=" + c + " 1. R=" + R);
        var v1 = [];
        if (isMatrix(A)) {
            var startIndex = findIndexStartInMatrix(A);
            v1.push(startIndex);
            if (bANamed) {
                for (var r = 1; r < A.length; r++) {
                    v1.push(A[r][c]);
                }
            }
            else {
                for (var r = 0; r < A.length; r++) {
                    v1.push(A[r][c - 1]);
                }
            }
        }
        else v1 = A;

        var v2 = [];
        if (isMatrix(B)) {
            var startIndex = findIndexStartInMatrix(B);
            v2.push(startIndex);
            if (bBNamed) {
                for (var r = 1; r < B.length; r++) {
                    v2.push(B[r][c]);
                }
            }
            else {
                for (var r = 0; r < B.length; r++) {
                    v2.push(B[r][c - 1]);
                }
            }
        }
        else v2 = B;

        var v3 = [];
        if (isMatrix(C)) {
            var startIndex = findIndexStartInMatrix(C);
            v3.push(startIndex);
            if (bCNamed) {
                for (var r = 1; r < C.length; r++) {
                    v3.push(C[r][c]);
                }
            }
            else {
                for (var r = 0; r < C.length; r++) {
                    v3.push(C[r][c - 1]);
                }
            }
        }
        else v3 = C;



        var v;
        if (arP.length == 0) {

            v = func(v1, v2, v3);
        }
        else if (arP.length == 1) v = func(v1, v2, v3, arP[0]);
        else if (arP.length == 2) v = func(v1, v2, v3, arP[0], arP[1]);
        else v = func(v1, v2, v3, arP[0], arP[1], arP[2]);

//alert("v.length=" + v.length);
//alert("1.R=" + R + " R.length=" + R.length);
        if (c == 1) {
            if (v.length == 1) {
                var ar = ["row1"];
                for (var col = 2; col < nCols; col++) {
                    ar.push(undefined);
                }
                R.push(ar);
            }
            else {
                for (var n = 1; n < v.length; n++) {//  -1
                    var ar = [];
                    if (isMatrix(A)) {
                        if (bANamed) ar.push(A[v[0] - v1[0] + n][0]);
                        //else ar.push("row" + (v[0] - v1[0] + n));
                        else ar.push("row" + (v[0] - 1 + n));
                    }
                    else if (isMatrix(B)) {
                        if (bBNamed) ar.push(B[v[0] - v2[0] + n][0]);
                        //else ar.push("row" + (v[0] - v2[0] + n));
                        else ar.push("row" + (v[0] - 1 + n));
                    }
                    else if (isMatrix(C)) {
                        if (bCNamed) ar.push(C[v[0] - v3[0] + n][0]);
                        //else ar.push("row" + (v[0] - v3[0] + n));
                        else ar.push("row" + (v[0] - 1 + n));
                    }
                    for (var col = 1; col < nCols; col++) {
                        ar.push(undefined);
                    }
                    R.push(ar);
                    //alert("ar=" + ar);
                }
            }
//if (n == v.length-1) alert("2.R=" + R + " R.length=" + R.length);
        }
//alert("3.R.length=" + R.length + "v.length=" + v.length );
        for (var n = 1; n < v.length; n++) {
            R[n][c] = v[n];
        }
        if (v.length == 1) R[1][c] = v[0];
//alert("c="+c+ " n. R=" + R);
    }
 //   alert("3.R.length=" + R.length + "v.length=" + v.length + "R[0]=" + R[0] + "R[1]=" + R[1] + "R[2]=" + R[2] + "R[R.length-1]=" + R[R.length-1]);
    return R;

}
function compareMatrix(func, sGLE, A, B) {

 /*  if (func == breakUp) {
   // if (sGLE == '-') {
    alert("sGLE=" + sGLE);
    alert("A=" + A);
    alert("B=" + B);
    }*/

    var R = [];//answer
    var nCols = 0;
   // var nStart = 1;
    var bANamed;
    var bBNamed;
    if (isMatrix(A)) bANamed = isNaN(A[0][0]);
    if (isMatrix(B)) bBNamed = isNaN(B[0][0]);

    var deltaA = 0;///////////////////////////////////////
    if (bANamed) deltaA = 1;
    var deltaB = 0;
    if (bBNamed) deltaB = 1;//////////////////////////////


    if (isMatrix(A)) {
        if (bANamed){
            nCols = A[0].length;
            var ar = [];
            for (var c = 0; c < nCols; c++) ar.push(A[0][c]);
            R.push(ar);
        }
        else nCols = 1 + A[0].length;

    }
    else if (isMatrix(B)) {
        if (bBNamed) {
            nCols = B[0].length;
            var ar = [];
            for (var c = 0; c < nCols; c++) ar.push(B[0][c]);
            R.push(ar);
        }
        else  nCols = 1 + B[0].length;
    }
    if(R.length==0)
    {
     //   nStart = 0;
        var ar = [];
        for (var c = 0; c < nCols; c++) ar.push("col"+c);
        R.push(ar);
    }
//    if (isMatrix(A)) alert("A is matrix");
  //  if (isMatrix(B)) alert("B is matrix");
    if (isMatrix(A) && isMatrix(B) && A[0].length-deltaA != B[0].length-deltaB) {
   //     alert(" A[0].length=" + A[0].length + " B[0].length=" + B[0].length);
   //     alert("deltaA=" + deltaA + "deltaB=" + deltaB);
   //     alert("A=" + A + "B=" + B );
        throw "Number of cols in both tables must be the same";
    }

  /*
    alert("A=" + A);
    alert("B=" + B);
      alert("sGLE=" + sGLE);
alert("R="+R);
*/
    for (var c = 1; c < nCols; c++) {
        var v1 = [];
        if (isMatrix(A)) {
         //   var startIndex = indexDailyFromDate(A[1][0]);
            var startIndex = findIndexStartInMatrix(A);
            v1.push(startIndex);

            if (bANamed) {
                for (var r = 1; r < A.length; r++) {
                    v1.push(A[r][c]);
                }
            }
            else {
                for (var r = 0; r < A.length; r++) {
                    v1.push(A[r][c - 1]);
                }
            }/*
            for (var r = 1; r < A.length; r++) {
                if (bANamed) v1.push(A[r][c]);
                else v1.push(A[r][c - 1]);
            }*/

        }
        else v1 = A;

        var v2 = [];
        if (isMatrix(B)) {
          //  var startIndex = indexDailyFromDate(B[1][0]);
            var startIndex = findIndexStartInMatrix(B);
            v2.push(startIndex);

            if (bBNamed) {
                for (var r = 1; r < B.length; r++) {
                    v2.push(B[r][c]);
                }
            }
            else {
                for (var r = 0; r < B.length; r++) {
                    v2.push(B[r][c - 1]);
                }
            }
            /*
            for (var r = 1; r < B.length; r++) {
                if (bBNamed) v2.push(B[r][c]);
                else v2.push(B[r][c-1]);
            }*/
        }
        else v2 = B;
      //  var v = Compare(sGLE, v1, v2);////////////////////////////////////
        //  var v = func(sGLE, v1, v2);
     /*   if (func == pNL) {
               alert("sGLE=" + sGLE);
               alert("v1=" + v1);
              alert("v2=" + v2);
        }*/
        var v;
        if (func==fluctUp || func==fluctDn){
            v = func( v1, sGLE, v2);
        }
        else if (func == bStatus) {
            v = func(sGLE[0], sGLE[1], v1, v2);
        }
        else if (func == corrCf3 || func == cov3 || func == pNL || func == npNL) {
              //   alert("sGLE=" + sGLE);
              //   alert("v1=" + v1);
               //  alert("v2=" + v2);
            v = func(v1, v2, sGLE);
        }
        else if (sGLE == "") {
         //      alert("v1=" + v1);
       //       alert("v2=" + v2);
            v = func(v1, v2);
        }
        else {//
            //alert("sGLE.length=" + sGLE.length + "sGLE=" + sGLE);
                 // alert("v1=" + v1);
                //   alert("v2=" + v2);
            v = func(sGLE, v1, v2);
                 //  alert("v=" + v);
        }

/*           if (func == pNL) {
          alert("sGLE=" + sGLE);
          alert("v1=" + v1);
         alert("v2=" + v2);
alert("v=" + v);
   }*/


        if (c == 1) {
            if (v.length == 1) {
                var ar = ["row1"];
                for (var col = 2; col < nCols; col++) {
                    ar.push(undefined);
                }
                R.push(ar);
            }
            else {
                for (var n = 1; n < v.length; n++) {
                                var ar = [];
                                if (isMatrix(A)) {
                                    if (bANamed)ar.push(A[v[0] - v1[0] + n][0]);
                                   // else ar.push("row" + (v[0] - v1[0] + n));
                                     else ar.push("row" + (v[0] - 1 + n));
                                }
                                else if (isMatrix(B)) {
                                    if (bBNamed) ar.push(B[v[0] - v2[0] + n][0]);
                                    //else ar.push("row" + (v[0] - v2[0] + n));
                                    else ar.push("row" + (v[0] - 1 + n));
                                }
                                for (var col = 1; col < nCols; col++) {
                                    ar.push(undefined);
                                }
                                R.push(ar);
                //alert("ar=" + ar);
                            }
            }
        }
 //alert("R.length=" + R.length + "v.length=" + v.length );
        for (var n = 1; n < v.length; n++) {
            R[n][c] = v[n];

        }
        if (v.length == 1) R[1][c] = v[0];
//alert( " R=" + R);
    }
    return R;
  
}
function oneMatrix(func, sGLE, A) {
    var R = [];//answer
    var nCols = 0;
    // var nStart = 1;
    var bADated = A[1][0][4] == '-' && A[1][0][7] == '-' && A[1][0][10] == '-';
    var bANamed = isNaN(A[0][0]);
    var bBNamed = isNaN(B[0][0]);
    if (isMatrix(A)) {
        if (bANamed) {
            nCols = A[0].length;
            var ar = [];
            for (var c = 0; c < nCols; c++) ar.push(A[0][c]);
            R.push(ar);
        }
        else nCols = 1 + A[0].length;

    }
    if (R.length == 0) {
        //   nStart = 0;
        var ar = [];
        for (var c = 0; c < nCols; c++) ar.push("col" + c);
        R.push(ar);
    }
    //alert("R="+R);
    for (var c = 1; c < nCols; c++) {
        var v1 = [];
        if (isMatrix(A)) {
            //   var startIndex = indexDailyFromDate(A[1][0]);
            var startIndex = findIndexStartInMatrix(A);
            v1.push(startIndex);

            if (bANamed) {
                for (var r = 1; r < A.length; r++) {
                    v1.push(A[r][c]);
                }
            }
            else {
                for (var r = 0; r < A.length; r++) {
                    v1.push(A[r][c - 1]);
                }
            }
        }
        else v1 = A;
        //alert("v1=" + v1);
        var v = [];
        if (sGLE == "") {
            var v = func(v1);
            //alert("v=" + v);
            if (v.length == 1) v.unshift(v1[0]);

        }
        else if(func==ref){
            v=func(v1,sGLE);
        }
        else v = one(v1, sGLE);
        //  var v = one(v1, sGLE);
        if (c == 1) {
            for (var n = 1; n < v.length; n++) {
                var ar = [];
                if (isMatrix(A)) {
                    if (bANamed) {
                        if (A[v[0] - v1[0] + n] == undefined) {
                            if (bADated) ar.push(dateDailyFromIndex(v[0] - v1[0] + n));// or 
                            //else ar.push("row" + (v[0] - v1[0] + n));
                            else ar.push("row" + (v[0] - 1 + n));
                        }
                        else ar.push(A[v[0] - v1[0] + n][0]);
                    }
                    //else ar.push("row" + (v[0] - v1[0] + n));
                    else ar.push("row" + (v[0] - 1 + n));
                }
                for (var col = 1; col < nCols; col++) {
                    ar.push(undefined);
                }
                R.push(ar);
                //alert("ar=" + ar);

            }

        }
        // alert("R.length=" + R.length + "v.length=" + v.length );
        for (var n = 1; n < v.length; n++) {
            R[n][c] = v[n];

        }
        //alert( " R=" + R);
    }
    return R;

}
function Compare(sGLE, v1, v2) {
    //if (isMatrix(v1) || isMatrix(v2)) return compareMatrix(sGLE, v1, v2);
    if (isMatrix(v1) || isMatrix(v2)) return compareMatrix(Compare,sGLE, v1, v2);
//alert("in Compare " + sGLE+": "+v1.length+" "+v2.length);
        //  var v1 = insert(ar1);
    //  var v2 = insert(ar2);
    var empty;
        var v = [];
        if (v1.length == 1 && v2.length == 1)//numbers
        {
            var z = 1 * v2[0];
            var d = 1 * v1[0];
            //alert("z="+z);
            switch (sGLE) {
                case "Ge": v.push(d >= z); break;
                case "Gt": v.push(d > z); break;
                case "Le": v.push(d <= z); break;
                case "Lt": v.push(d < z); break;
                case "Eq": v.push(d == z); break;
                case "Ne": v.push(d != z); break;
                case "And": v.push(d && z); break;
                case "Or": v.push(d || z); break;
                default: throw "Unknown operation";
            }
            return v;
        }
        else if (v1.length == 1 && v2.length != 1)//number+array
        {
            var d = 1 * v1[0];
            v.push(v2[0]);//same shift
            for (var i = 1; i < v2.length; i++) {
                var z = v2[i];
                if (z == undefined) {
                 //   v.push(z);
                    v.push(empty);
                    continue;
                }
                z = Number(z);
                switch (sGLE) {
                    case "Ge": v.push(d >= z); break;
                    case "Gt": v.push(d > z); break;
                    case "Le": v.push(d <= z); break;
                    case "Lt": v.push(d < z); break;
                    case "Eq": v.push(d == z); break;
                    case "Ne": v.push(d != z); break;
                    case "And": v.push(d && z); break;
                    case "Or": v.push(d || z); break;
                    default: throw "Unknown operation";
                }
            }
            return v;
        }
        else if (v1.length != 1 && v2.length == 1)//array+number
        {
            var d = 1 * v2[0];
            v.push(v1[0]);//same shift
            for (var i = 1; i < v1.length; i++) {
                var z = v1[i];
                if (z == undefined) {
                  //  v.push(z);
                    v.push(empty);
                    continue;
                }
                z = Number(z);
                switch (sGLE) {
                    case "Ge": v.push(z >= d); break;
                    case "Gt": v.push(z > d); break;
                    case "Le": v.push(z <= d); break;
                    case "Lt": v.push(z < d); break;
                    case "Eq": v.push(z == d); break;
                    case "Ne": v.push(z != d); break;
                    case "And": v.push(z && d); break;
                    case "Or": v.push(z || d); break;
                    default: throw "Unknown operation";
                }
            }
        }
        else if (v1.length != 1 && v2.length != 1)//array+array
        {/*
            var nStart1 = 1 * v1[0];
            var nStart2 = 1 * v2[0];
            var nEnd1 = nStart1 + v1.length;
            var nEnd2 = nStart2 + v2.length;
            if (nEnd1 < nStart2) throw "Empty result.";
            if (nEnd2 < nStart1) throw "Empty result.";
            var nStart = nStart1 > nStart2 ? nStart1 : nStart2;
            var nEnd = nEnd1 < nEnd2 ? nEnd1 : nEnd2;
            v.push(1 * nStart);
            var empty;
            for (var i = nStart + 1; i < nEnd; i++) {
                var z = v2[i - nStart2];
                var d = v1[i - nStart1];
                if (z == undefined || d == undefined) {
                    v.push(empty);
                    continue;
                }
                z = Number(z);
                d = Number(d);
*/
                var nStart1 = 1 * v1[0];
                var nStart2 = 1 * v2[0];
                var nEnd1 = nStart1 + v1.length;
                var nEnd2 = nStart2 + v2.length;
                if (nEnd1 < nStart2) throw "Empty result.";
                if (nEnd2 < nStart1) throw "Empty result.";
                var nStart = nStart1 > nStart2 ? nStart1 : nStart2;
                var nEnd = nEnd1 < nEnd2 ? nEnd1 : nEnd2;
                v.push(1 * nStart);
                var prevD = v1[1];
                var prevZ = v2[1];
                if (isNaN(prevD) && isNaN(prevZ)) {
//alert("v1[0]=" + v1[0] + "v1[1]=" + v1[1] + "v1[2]=" + v1[2] + "v2[0]=" + v2[0] + "v2[1]=" + v2[1] + "v2[2]=" + v2[2]);
                    throw "at least one of two series should start from a number";
                }
                for (var i = nStart + 1; i < nEnd; i++) {
                    var z = v2[i - nStart2];
                    var d = v1[i - nStart1];
                    if (isNaN(z) && isNaN(d)) {
                        v.push(empty);
                        continue;
                    }
                    else if (isNaN(z)) {
                        d = Number(d);
                        z = prevZ;
                        prevD = d;
                    }
                    else if (isNaN(d)) {
                        z = Number(z);
                        d = prevD;
                        prevZ = z;
                    }
                    else {
                        z = Number(z);
                        d = Number(d);
                        prevD = d;
                        prevZ = z;
                    }
            ////////////
                switch (sGLE) {
                    case "Ge": v.push(d >= z); break;
                    case "Gt": v.push(d > z); break;
                    case "Le": v.push(d <= z); break;
                    case "Lt": v.push(d < z); break;
                    case "Eq": v.push(d == z); break;
                    case "Ne": v.push(d != z); break;
                    case "And": v.push(d && z); break;
                    case "Or": v.push(d || z); break;
                    default: throw "Unknown operation";
                }
            }
            return v;
        }
        return v;
}
/*
//function IfCompare(v1, v2, v3)
function ifCompareOld(v1, v2, v3) {
//alert("In IfCompare");
    if (v1.length == 1) {
        if (v1[0]) return v2;
        else return v3;
    }
    var v = [];
    var nStart1 = Number(v1[0]);
    var nStart2 = Number(v2[0]);
    if (v2.length==1) nStart2 = nStart1;
    var nStart3 = Number(v3[0]);
    if (v3.length==1) nStart3 = nStart1;
    var nEnd1 = nStart1 + v1.length;
    var nEnd2 = nStart2 + v2.length;
    if (v2.length==1) nEnd2 = nEnd1;
    var nEnd3 = nStart3 + v3.length;
    if (v3.length==1) nEnd3 = nEnd1;

 //   if (nEnd1 < nStart2) throw "Empty result.";
 //   if (nEnd2 < nStart1) throw "Empty result.";
  //  var nStart = nStart1 > nStart2 ? nStart1 : nStart2;
    //  var nEnd = nEnd1 < nEnd2 ? nEnd1 : nEnd2;
    var nStart=Math.max(nStart1,nStart2,nStart3);
    var nEnd=Math.min(nEnd1, nEnd2, nEnd3);

    v.push(1 * nStart);
    var empty;
    for (var i = nStart + 1; i < nEnd; i++) {
        var d1 = v1[i - nStart1];
        var d2=v2[0];
        if(v2.length!=1) d2 = v2[i - nStart2];
        var d3=v3[0];
        if(v3.length!=1)  d3 = v3[i - nStart3];
        if (d1 == undefined || isNaN(d1)) {
            v.push(empty);
            continue;
        }
//alert("d1=" + d1);
        if(Number(d1)!=0) v.push(d2);
        else v.push(d3);
    }
    return v;
}
*/
function ifCompare(v1, v2, v3) {
    if (isMatrix(v1) || isMatrix(v2) || isMatrix(v3)) return func32Matrix(ifCompare, v1, v2, v3, []);
   /*
function ifCompare(V1, V2, V3) {
   
  var v1 = compressOne(V1,V1);
    var v2 = compressOne(V2, V1);
    var v3 = compressOne(V3, V1);
    var vOld = ifCompareOld(v1, v2, v3);
    return decompressOne(vOld,V1);
   */
    var v = [];

    var b1 = true;
    if (typeof v1 === 'number') b1 = false;
    var b2 = true;
    if (typeof v2 === 'number') b2 = false;
    var b3 = true;
    if (typeof v3 === 'number') b3 = false;

  //  alert("b1=" + b1 + "b2=" + b2 + "b3=" + b3);

    var nStart1;
    if (b1) nStart1 = Number(v1[0]);
    else nStart1 = v1;
    var nStart2;
    if (b2) nStart2 = Number(v2[0]);
    else nStart2 = v2;
    var nStart3;
    if (b3) nStart3 = Number(v3[0]);
    else nStart3 = v3;

    var nEnd1 = nStart1;
    if (b1) nEnd1 = nStart1 + v1.length;
    var nEnd2 = nStart2;
    if (b2) nEnd2 = nStart2 + v2.length;
    var nEnd3 = nStart3;
    if (b3) nEnd3 = nStart3 + v3.length;

    var nStart = nStart1;
    if (b2 && v2.length>1) nStart = Math.max(nStart, nStart2);
    if (b3 && v3.length>1) nStart = Math.max(nStart, nStart3);

    var nEnd = nEnd1;
    if (b2 && v2.length > 1) nEnd = Math.min(nEnd, nEnd2);
    if (b3 && v3.length > 1) nEnd = Math.min(nEnd, nEnd3);

 //alert(" nStart1=" + nStart1 + " nStart2=" + nStart2 + " nStart3=" + nStart3 + " nStart=" + nStart + " nEnd1=" + nEnd1 + " nEnd2=" + nEnd2 + " nEnd3=" + nEnd3 + " nEnd=" + nEnd);

    if (nEnd < nStart) throw "Empty result.";
    v.push(1 * nStart);

    var empty;
    for (var i = nStart + 1; i < nEnd; i++) {
        var d1;
        if (b1) d1 = v1[i - nStart1];
        else d1 = v1;
        var d2;
        if (b2 && v2.length > 1) d2 = v2[i - nStart2];
        else d2 = v2;
        var d3;
        if (b3 && v3.length > 1) d3 = v3[i - nStart3];
        else d3 = v3;

//alert("i=" + i + "d1=" + d1 + "d2=" + d2 + "d3=" + d3);
     //  if (isNaN(d1) || isNaN(d2) || isNaN(d2)) {
      //  if (isNaN(d1) && isNaN(d2) && isNaN(d2)) {
        if (isNaN(d1)) {
            v.push(empty);
        }
        else {
            if (d1) {
                v.push(d2);
            }
            else {
                v.push(d3);
            }
        }
    }

    return v;
}
//function lTrend1(v1)
function lTrend1Old(v)
{
  //  var v = insert(v1);
    if (v.length == 1) return v;
    var left=v[0];
    var right = v[0]+v.length - 2;
    var start=v[0];
    var finish = v.length - 2 + v[0];
//alert(left+" "+right+" "+start+" "+finish);
    return lTrend( v,  left,  right,  start,  finish);
}
function lTrend1(V1) {
    if (isMatrix(V1)) return oneMatrix(lTrend1, "", V1);
  //  var v1 = compress(V1);
    var v1 = compressOne(V1, V1);
    var vOld = lTrend1Old(v1);
    if (v1.length == V1.length) return vOld;////////////////////////////////
    return decompressOne(vOld, V1);

}
//function lTrend2(v1, v2) {
function lTrend2Old(v, v2) {
 //   var v = insert(v1);
    if (v.length == 1) return v;
    if (v2.length != 1 ) throw "usage: lTrend(c,80)";
    var L = v2[0];
    var left =v[0]+ 1 + v.length - 2 - L;
    var right =v[0]+ v.length - 2;
    var start = 1 + v.length - 2 - L + v[0];
    var finish = v.length - 2 + v[0];
    return lTrend(v, left, right, start, finish);
}
function lTrend2(V1, V2) {
    if (isMatrix(V1)) return smaMatrix(lTrend2, V1, V2);
    var v1 = compressOne(V1,V1);
  //  var v2 = compress(V2);
  //  var vOld = lTrend2Old(v1, v2);
    var vOld = lTrend2Old(v1, V2);
    if (v1.length == V1.length) return vOld;////////////////////////////////
    return decompressOne(vOld, V1);
}
function lTrend3Old(v, v2, v3) {
  //  var v = insert(v1);
    if (v2.length != 1 || v3.length != 1) throw "usage: lTrend(c,80,20)";
    var L = v2[0];
    var R = v3[0];
    if (v.length == 1) return v;

    var left =v[0]+ 1 + v.length - 2 - L;
    var right =v[0]+ v.length - 2;
    var start = 1 + v.length - 2 - L + v[0];
    var finish = v.length - 2 + R + v[0];

    return lTrend(v, left, right, start, finish);
}
function lTrend3(V1, V2, V3) {
    if (isMatrix(V1)) return smaMatrix(lTrend3, V1, [[V2[0]], [V3[0]]]);
    //  var v1 = compress(V1);
    var v1 = compressOne(V1,V1);
  //  var v2 = compress(V2);
 //   var v3 = compress(V3);
    var vOld = lTrend3Old(v1, V2, V3);
    if (v1.length == V1.length) return vOld;////////////////////////////////
    return decompressOne(vOld, V1);
}
function lTrend( v,  left,  right,  start,  finish){
 //   alert("lTrend");
    if (left >= right || start > finish) throw "Check sequence of numerical parameters.";
    var nMax = v.length - 2;
//alert(" v[0]="+v[0]+" left="+left+" right="+right+" start="+start+" v.length="+v.length);
    if (v[0] > left || right > v[0]+v.length - 2 || v[0] > start) throw "Negative or > " + nMax + " parameter.";
//alert(5);

    var m = right - left + 1;
    var mm = m;
    var k = Math.floor(m / 2);//var answer = Math.floor(x)
    var c;
    var i;
    var b = 0.0;
    //for (c = 0; c < m; c++) b += v[left + c + 1];/////////////
    for (c = 0; c < m; c++) b += v[left-v[0] + c + 1];/////////////
    b = b / m;
//alert("b="+b);
    var a = 0.0;
    var m2 = (m - 1) / 2.0;
    for (i = 0; i < k; i++)
    {
       // a += (m2 - i) * (v[left + m - 1 - i + 1] - v[left + i + 1]);////////////
        a += (m2 - i) * (v[left-v[0] + m - 1 - i + 1] - v[left-v[0] + i + 1]);////////////
    }
    a = a * 12.0 / ((mm + 1) * mm * (mm - 1));
//alert("a="+a);
    var Y =[];
    Y.push(start);
    for (c = start; c <= finish; c++)
    {
       var d = c - start - m2;
        Y.push(b + a * d);
    }
    return Y;
}
//function cTrend1(v1) {
function cTrend1Old(v) {
 //   var v = insert(v1);
    if (v.length == 1) return v;
    var left=v[0];
    var right = v[0]+v.length - 2;
    var start=v[0];
    var finish = v.length - 2 + v[0];
    return cTrend(v, left, right, start, finish);
}
function cTrend1(V1) {
    if (isMatrix(V1)) {
        return oneMatrix(cTrend1, "", V1);
    }
  //  var v1 = compress(V1);
    var v1 = compressOne(V1,V1);
    var vOld = cTrend1Old(v1);
    if (v1.length == V1.length) return vOld;////////////////////////////////
   //return decompressAll(vOld);
    return decompressOne(vOld, V1);
}
//function cTrend2(v1, v2) {
function cTrend2Old(v, v2) {
   // var v = insert(v1);
    if (v.length == 1) return v;
    if (v2.length != 1) throw "usage: lTrend(c,80)";
    var L = v2[0];
    var left = v[0]+1 + v.length - 2 - L;
    var right = v[0]+v.length - 2;
    var start = 1 + v.length - 2 - L + v[0];
    var finish = v.length - 2 + v[0];
    return cTrend(v, left, right, start, finish);
}
function cTrend2(V1, V2) {
    if (isMatrix(V1)) return smaMatrix(cTrend2, V1, V2);
  //  var v1 = compress(V1);
    var v1 = compressOne(V1,V1);
   // var v2 = compress(V2);
    var vOld = cTrend2Old(v1, V2);
    if (v1.length == V1.length) return vOld;////////////////////////////////
    return decompressOne(vOld, V1);
}
//function cTrend3(v1, v2, v3) {
function cTrend3Old(v, v2, v3) {
 //   var v = insert(v1);
    if (v2.length != 1 || v3.length != 1) throw "usage: lTrend(c,80,20)";
    var L = v2[0];
    var R = v3[0];
    if (v.length == 1) return v;

    var left = v[0]+1 + v.length - 2 - L;
    var right =v[0]+ v.length - 2;
    var start = 1 + v.length - 2 - L + v[0];
    var finish = v.length - 2 + R + v[0];

    return cTrend(v, left, right, start, finish);
}
function cTrend3(V1, V2, V3) {
    if (isMatrix(V1)) return smaMatrix(cTrend3, V1, [[V2[0]], [V3[0]]]);
  //  var v1 = compress(V1);
    var v1 = compressOne(V1,V1);
  //  var v2 = compress(V2);
  //  var v3 = compress(V3);
    var vOld = cTrend3Old(v1, V2, V3);
    if (v1.length == V1.length) return vOld;////////////////////////////////
  //  return decompressAll(vOld);
    return decompressOne(vOld, V1);
}
function cTrend(v, left, right, start, finish)
{
   // alert("cTrend");
    if (v.length == 1) return v;
    if (left >= right || start > finish) throw "Check sequence of numerical parameters.";
    var nMax = v.length - 2;
    if (v[0] > left || right > v[0]+ v.length - 2 || v[0] > start) throw "Negative or > " + nMax + " parameter.";
    var m = right - left + 1;

    if (m < 5) return lTrend( v, left, right, start, finish);

    var k = Math.floor(m / 2);
    var m2 = (m - 1) / 2.0;
    var oldStart = start;
    if (right < left + 2 * k)
    {
        k -= 1;
        m2 -= 0.5;
        if (start == left) start++;
    }
    if (k == 0) throw "Make first parameter > 1.";


    var kk = k;
    var s2, s42, s62;
    s2 = (kk + 1.0) * kk * (2.0 * kk + 1.0) / 3.0;
    s42 = (-1.0 + kk * (3.0 + kk * 3.0)) / 5.0;
    s62 = (1.0 + kk * (-3.0 + kk * kk * (6.0 + kk * 3.0))) / 7.0;
    var y0 = 0, y1 = 0, y2 = 0, y3 = 0;
    var i;
    var r0=right-v[0];
    for (i = -k; i <= k; i++)
    {
        var di = i;
        y0 += v[r0 - k + i + 1];
        y1 += di * v[r0 - k + i + 1];
        y2 += di * di * v[r0 - k + i + 1];
        y3 += di * di * di * v[r0 - k + i + 1];
    }

    var a, b, c, d;
    a = (y3 - y1 * s42) / ((s2 * (s62 - s42 * s42)));

    b = (3 * y2 - y0 * kk * (kk + 1)) / (s2 * (3 * s42 - kk * (kk + 1)));
    c = (y3 * s42 - y1 * s62) / (s2 * (s42 * s42 - s62));
    d = 3 * (y2 - y0 * s42) / ((2 * kk + 1) * ((kk + 1) * kk - 3 * s42));

    if (s62 - s42 * s42 == 0)
    {
        a = 0.0;
        c = 1.0;
    }
    var Y = [];
    Y.push(oldStart);
    var col;
    for (col = oldStart; col <= finish; col++)
    {
        var di = col - start - m2;
        Y.push(d + di * (c + di * (b + di * a)));
    }
    return Y;
}
//function der( v1, v2){
function derOld(V, v2) {

    if (V.length == 1) return 0;
    if (v2.length != 1 ) throw "usage: der(c,25)";

  //  var V=insert(v1);
    var p = v2[0];
//alert("p=" + p);

    if (p < 4 || p > V.length - 1) throw "Use positive number >3 adn less than total number of data points";
    var k = Math.floor(p / 2);
    p = 2 * k + 1;
    //Start
    // Weights calculation
    var i;
    var v; var s2; var s62; var s42; var z; var ch; var kk3; var kk1; var kk2; var kk0;

    v = k;
    s2 = (v + 1.0) * v * (2.0 * v + 1.0) / 3.0;
    s62 = (3.0 * v * v * v * v + 6.0 * v * v * v - 3.0 * v + 1.0) / 7.0;
    s42 = (3.0 * v * v + 3.0 * v - 1.0) / 5.0;
    z = s2 * (s62 - s42 * s42);
    ch = 3.0 * v * v - s42;
    kk3 = ch / z;
    ch = -3.0 * v * v * s42 + s62;
    kk1 = ch / z;
    z = s2 * (3.0 * s42 - v * (v + 1.0));
    ch = 6.0 * v;
    kk2 = ch / z;
    ch = -2.0 * v * v * (v + 1.0);
    kk0 = ch / z;

    // Derivative calculation

    var Y = [];
    Y.push(p - 1 + V[0]);
    var c;
    for (c = p - 1 + 1; c < V.length; c++)
    {
        var d1 = 0;
        for (i = -k; i < k + 1; i++)
        {
                z = i;
                d1 = d1 + (((kk3 * z + kk2) * z + kk1) * z + kk0) * V[c - k + i];
        }
        Y.push(d1);
    }

    return Y;
}
function der(V1, v2) {
    if (isMatrix(V1)) return smaMatrix(der, V1, v2);
   // var v1 = compress(V1);
    var v1 = compressOne(V1,V1);
    var vOld = derOld(v1, v2);
    if (v1.length == V1.length) return vOld;////////////////////////////////
    return decompressOne(vOld, V1);
}
//DataSet DataSet::delFluct(unsigned long row; var double dLevel)//dLevel - acceptable level compare to average level( dLevel=2 means that fluct should be <2*average)
/*
function delFluct(v1, v2) {
    alert("with insert");
    var v=insert(v1);
    if (v2.length != 1 ) throw "usage: delFluct(h,3).";
    var dLevel=v2[0];
    if (v.length < 3) return v;

    //find average
    var dAverage = 0.0, dDelta;
    var c;
    for (c = 2; c < v.length; c++)
    {
        dDelta = v[c] - v[c - 1];
        if (dDelta < 0) dDelta = -dDelta;
        dAverage += dDelta;
    }
    dAverage = dAverage / (v.length - 2);
    var dCompare = dLevel * dAverage;

    //Make corrections
    var Y = [];
    for (var i = 0; i < v.length; i++) Y.push(v[i]);

    var y1, y2, y3;
    var m_nStartCol = 1;
    var m_nEndCol = v.length - 1;
    y1 = v[m_nStartCol];
    y2 = v[m_nStartCol + 1];
    y3 = v[m_nStartCol + 2];

    var d12 = y1 - y2, d13 = y1 - y3, d23 = y2 - y3;

    if (d12 < 0) d12 = -d12;
    if (d13 < 0) d13 = -d13;
    if (d23 < 0) d23 = -d23;

    if (d12 > dCompare && d13 > dCompare) Y[m_nStartCol] = y2;
    if (d12 > dCompare && d23 > dCompare) Y[m_nStartCol + 1] = y1;

    var iFlag = 0;
    for (c = m_nStartCol + 2; c <= m_nEndCol; c++)
    {
            y1 = Y[c - 2];
            y2 = Y[c - 1];
            y3 = Y[c];
            d23 = y2 - y3;
            d13 = y1 - y3;
            if (d13 < 0) d13 = -d13;
            if (d23 < 0) d23 = -d23;
            if (d13 > dCompare && d23 > dCompare && iFlag == 0)
            {
                    Y[c] = y2;
                    iFlag = 1;
            }
            else iFlag = 0;
     }
     return Y;
}
*/
function delFluctOld(v, v2) {
  //  var v = insert(v1);
    if (v2.length != 1) throw "usage: delFluct(h,3).";
    var dLevel = v2[0];
    if (v.length < 3) return v;

    //find average
    var dAverage = 0.0, dDelta;
    var c;
    for (c = 2; c < v.length; c++) {
        dDelta = v[c] - v[c - 1];
        if (dDelta < 0) dDelta = -dDelta;
        dAverage += dDelta;
    }
    dAverage = dAverage / (v.length - 2);
    var dCompare = dLevel * dAverage;

    //Make corrections
    var Y = [];
    for (var i = 0; i < v.length; i++) Y.push(v[i]);

    var y1, y2, y3;
    var m_nStartCol = 1;
    var m_nEndCol = v.length - 1;
    y1 = v[m_nStartCol];
    y2 = v[m_nStartCol + 1];
    y3 = v[m_nStartCol + 2];

    var d12 = y1 - y2, d13 = y1 - y3, d23 = y2 - y3;

    if (d12 < 0) d12 = -d12;
    if (d13 < 0) d13 = -d13;
    if (d23 < 0) d23 = -d23;

    if (d12 > dCompare && d13 > dCompare) Y[m_nStartCol] = y2;
    if (d12 > dCompare && d23 > dCompare) Y[m_nStartCol + 1] = y1;

    var iFlag = 0;
    for (c = m_nStartCol + 2; c <= m_nEndCol; c++) {
        y1 = Y[c - 2];
        y2 = Y[c - 1];
        y3 = Y[c];
        d23 = y2 - y3;
        d13 = y1 - y3;
        if (d13 < 0) d13 = -d13;
        if (d23 < 0) d23 = -d23;
        if (d13 > dCompare && d23 > dCompare && iFlag == 0) {
            Y[c] = y2;
            iFlag = 1;
        }
        else iFlag = 0;
    }
 //   alert("Y.length=" + Y.length);
    return Y;
}
function delFluct(V1, v2) {
    //alert("withOUT");
    if (isMatrix(V1)) return smaMatrix(delFluct, V1, v2);
    var v1 = compressOne(V1, V1);
    var vOld = delFluctOld(v1, v2);
    if (v1.length == V1.length) return vOld;////////////////////////////////
    return decompressOne(vOld, V1);
}
function FFT(x, npow, sign)//sign=-1 means forward
{
    var nmax = 1 << npow;// int
    var t = 1;		// 

    var nn, mm, layer, i, ii, ij, nw, j, loc, ll, nw1;//int
    var msk = new Array(13);//int
    var zz, delta, w;
    var cs = new Array(2);
    var xa = new Array(2);
    var hold = new Array(2);

    //  nmax = 1 << npow;	// npow

    zz = 6.283185306 * sign / nmax;
    t = 1.0;///////////////////////////////
    delta = t;
    if (sign > 0.0) delta = 1.0 / (t * nmax);
    msk[0] = Math.floor(nmax / 2);
    for (i = 2; i <= npow; i++) msk[i - 1] = Math.floor(msk[i - 2] / 2);
    nn = nmax;
    mm = 2;
    for (layer = 1; layer <= npow; layer++) {
        Math.floor(nn = nn / 2);
        nw = 0;
        for (i = 1; i <= mm; i = i + 2) {
            ii = nn * i;
            w = nw * zz;
            cs[0] = Math.cos(w);
            cs[1] = Math.sin(w);
            for (j = 1; j <= nn; j++) {
                ii = ii + 1;
                ij = ii - nn;
                xa[0] = cs[0] * x[2 * ii - 2] - cs[1] * x[2 * ii - 1];
                xa[1] = cs[1] * x[2 * ii - 2] + cs[0] * x[2 * ii - 1];
                x[2 * ii - 2] = x[2 * ij - 2] - xa[0];
                x[2 * ii - 1] = x[2 * ij - 1] - xa[1];
                x[2 * ij - 2] = x[2 * ij - 2] + xa[0];
                x[2 * ij - 1] = x[2 * ij - 1] + xa[1];
            }
            for (loc = 2; loc <= npow; loc++) {
                ll = nw - msk[loc - 1];
                if (ll < 0) {// goto lab30;
                    nw = msk[loc - 1] + nw;
                    break;
                }
                if (ll == 0) {// goto lab35;
                    nw = msk[loc];
                    break;
                }
                nw = ll;
            }
            //        lab30: nw = msk[loc - 1] + nw;
            //        goto lab40;
            //        lab35: nw = msk[loc];
            //        lab40: ;
            //nw = msk[loc - 1] + nw;//????
        }
        mm = mm * 2;
    }
    nw = 0;
    for (i = 1; i <= nmax; i++) {
        nw1 = nw + 1;
        hold[0] = x[2 * nw1 - 2];
        hold[1] = x[2 * nw1 - 1];
        if (nw1 < i) {//goto lab60;
        }
        if (nw1 == i) {//goto lab55;
            x[2 * i - 2] = hold[0] * delta;
            x[2 * i - 1] = hold[1] * delta;
        }
        if (nw1 > i) {//goto lab50;
            x[2 * nw1 - 2] = x[2 * i - 2] * delta;
            x[2 * nw1 - 1] = x[2 * i - 1] * delta;
            x[2 * i - 2] = hold[0] * delta;
            x[2 * i - 1] = hold[1] * delta;
        }
        //        lab50:
        //            {
        //                x[2 * nw1 - 2] = x[2 * i - 2] * delta;
        //                x[2 * nw1 - 1] = x[2 * i - 1] * delta;
        //            }
        //        lab55:
        //            {
        //                x[2 * i - 2] = hold[0] * delta;
        //                x[2 * i - 1] = hold[1] * delta;
        //            }
        //        lab60:
        //            {
        //           }

        for (loc = 1; loc <= npow; loc++) {
            ll = nw - msk[loc - 1];
            if (ll < 0) {//goto lab70;
                nw = msk[loc - 1] + nw;
                break;
            }
            if (ll == 0) {//goto lab75;
                nw = msk[loc];
                break;
            }
            if (ll > 0) {// goto lab65;
                //lab65: nw = ll;
                nw = ll;
            }
        }
        //     lab70: nw = msk[loc - 1] + nw;
        //     goto lab80;
        //    lab75: nw = msk[loc];
        //     lab80: ;
        //nw = msk[loc - 1] + nw;//????
    }

    return x;//????
}
function fFourierDOld(v1, v2) {//fFourierD(c,9)
    if (v2.length != 1) throw "Usage: fFourierD(c,9)";
    var p = v2[0];
    var endFreq = p;
    var pow = 1 + Math.floor((Math.log(v1.length - 1) / Math.log(2.0) + .0000001));
    if ((1 << pow) - 1 < endFreq) endFreq = (1 << pow) - 1;
    if (endFreq < 0) endFreq = 0;
    return fFDer(v1, pow, 1, 0, Math.floor((endFreq + 0.1)));
    //  return fFDer(ref htStr2Info, ref dataSet, pow, 1, 0, (endFreq + 0.1));
}
function fFourierD(v1, v2) {//fFourierD(c,9)
    if (isMatrix(v1)) return smaMatrix(fFourierD, v1, v2);
    var V1 = compressOne(v1, v1);
    var vOld = fFourierDOld(V1, v2);
    if (v1.length == V1.length) return vOld;////////////////////////////////
    return decompressOne(vOld, v1);
}
function fFDer(v, npow, even, startFreq, endFreq) {
    var vCount = v.length;
    if (vCount <= 1) throw "No transform from a constant";

    var left = 1;
    var right = vCount - 1;;
    var Z = insert(v);
    var startY = Number(v[left]);
    var endY = Number(v[right]);

    //alert(vCount + " " + npow + " " + even + " " + startFreq + " " + endFreq);


    if (even == 1) {
        for (var c = left; c <= right; c++) {
            Z[c] = Number(Z[c]) - (startY + (endY - startY) * (c - left) / (right - left));
        }
    }
    ////////////////////
    //var t = 1;		// t
    ////////////////////
    var nmax = 1 << npow;	// npow
    var x = new Array(2 * nmax);	// x[]
    for (var c = 0; c < 2 * nmax; c++) x[c] = 0.0;	//zerofication
    for (var c = left; c <= right; c++) x[2 * (c - left)] = Z[c];
    var sign = -1.0;// sign	(forward fft)
    x = FFT(x, npow, sign); // is x sent by reference ???
    //////////////////////////////////////	back /////////////////


    x[0] = 0.0;
    for (var c = 1; c < nmax; c++) {
        x[c] *= c * 3.14 / nmax;
        x[2 * nmax - c] *= -c * 3.14 / nmax;
    }
    x[nmax] *= -nmax * 3.14 / nmax;
    for (var c = 0; c < nmax; c++) {
        var temp = -x[2 * c + 1];
        x[2 * c + 1] = x[2 * c];
        x[2 * c] = temp;
    }
    for (var c = 1; c < 2 * startFreq; c++) {
        x[c] = 0.0; x[2 * nmax - c] = 0;
    }	//partial zerofication
    for (var c = 2 * endFreq; c <= nmax; c++) {
        x[c] = 0.0; x[2 * nmax - c] = 0;
    }	//partial zerofication

    x = FFT(x, npow, 1.0);// back  // is x sent by reference ???

    //////////////////////////////////////////////////////////////
    var slope = (endY - startY) / (right - left);
    for (var c = left; c <= right; c++) Z[c] = x[2 * (c - left)];

    if (even == 1) {
        for (var c = left; c <= right; c++) {
            Z[c] = Z[c] + slope;
        }
    }
    return Z;
}
function fFourierSOld(v1, v2) {
    if (v2.length != 1) throw "Usage: fFourierS(c,9)";
    var p = v2[0];
    var endFreq = p;
    var pow = 1 + Math.floor((Math.log(v1.length - 1) / Math.log(2.0) + .0000001));
    if ((1 << pow) - 1 < endFreq) endFreq = (1 << pow) - 1;
    if (endFreq < 0) endFreq = 0;
    return fFSmooth(v1, pow, 1, 0, Math.floor((endFreq + 0.1)));
}
function fFourierS(v1, v2) {//fFourierS(c,9)
    if (isMatrix(v1)) return smaMatrix(fFourierS, v1, v2);
    var V1 = compressOne(v1, v1);
    var vOld = fFourierSOld(V1, v2);
    if (v1.length == V1.length) return vOld;////////////////////////////////
    return decompressOne(vOld, v1);
}
function fFSmooth(v, npow, even, startFreq, endFreq) {

    var vCount = v.length;
    if (vCount <= 1) throw "No transform from a constant";
    //alert(vCount + " " + npow + " " + even + " " + startFreq + " " + endFreq);
    var left = 1;
    var right = vCount - 1;


    var Z = insert(v);
    // If even==1 - remove trend
    var startY = Number(v[left]);
    var endY = Number(v[right]);
    if (even == 1) {
        for (var c = left; c <= right; c++) {
            //alert(startY + " " + endY + " " + startY + (endY - startY) * (c - left) / (right - left));
            Z[c] = Number(Z[c]) - (startY + (endY - startY) * (c - left) / (right - left));
        }
        //return Z;
    }

    ////////////////////
    var nmax = 1 << npow;	// npow
    var x = new Array(2 * nmax);	// x[]
    for (var c = 0; c < 2 * nmax; c++) x[c] = 0.0;	//zerofication
    for (var c = left; c <= right; c++) x[2 * (c - left)] = Z[c];
    var sign = -1.0;// sign	(forward fft)
    x = FFT(x, npow, sign); // is x sent by reference ???
    //////////////////////////////////////	back /////////////////
    if (endFreq != 0) {
        if (startFreq > 0) x[0] = 0.0;	//partial zerofication
        for (var c = 1; c < 2 * startFreq; c++) { x[c] = 0.0; x[2 * nmax - c] = 0; }	//partial zerofication
        for (var c = 2 * endFreq; c <= nmax; c++) { x[c] = 0.0; x[2 * nmax - c] = 0; }	//partial zerofication
    }
    else for (var c = 0; c < 2 * nmax; c++) x[c] = 0.0;	// zerofication

    x = FFT(x, npow, 1.0);// back  // is x sent by reference ???

    //////////////////////////////////////////////////////////////
    for (var c = left; c <= right; c++) Z[c] = x[2 * (c - left)];

    if (even == 1) {
        for (var c = left; c <= right; c++) {
            Z[c] = Z[c] + (startY + (endY - startY) * (c - left) / (right - left));
        }
    }
    return Z;
}
function fFourierM(v1) {//fFourierM(c)
    if (isMatrix(v1)) return oneMatrix(fFourierM, "", v1);
    var pow = 1 + (Math.log(v1.length - 1) / Math.log(2.0) + .0000001);
    //   pow--;
    pow++;
    return fFMod(v1, pow, 1, "Mod");// 0 = do not remove
}
function fFourierRe(v1) {//fFourierRe(c)
    if (isMatrix(v1)) return oneMatrix(fFourierRe, "", v1);
    var pow = 1 + (Math.log(v1.length - 1) / Math.log(2.0) + .0000001);
    //  pow--;
    pow++;
    return fFMod(v1, pow, 1, "Re");
}
function fFourierIm(v1) {//fFourierM(c)
    if (isMatrix(v1)) return oneMatrix(fFourierIm, "", v1);
    var pow = 1 + (Math.log(v1.length - 1) / Math.log(2.0) + .0000001);
    //   pow--;
    pow++;
    return fFMod(v1, pow, 1, "Im");
}
function fFMod(v, npow, even, sModReIm) {

    var vCount = v.length;
    if (vCount <= 1) throw "No transform from a constant";

    var left = 1;
    var right = vCount - 1;;

    var Z = insert(v);

    // If even==1 - remove trend
    var startY = Number(v[left]);
    var endY = Number(v[right]);
    if (even == 1) {
        for (var c = left; c <= right; c++) {
            Z[c] = Number(Z[c]) - (startY + (endY - startY) * (c - left) / (right - left));
        }
    }
    ////////////////////
    var sign = -1.0;// sign	(forward fft)
    var t = 1;		// t
    var nmax = 1 << npow;	// npow

    // if (nmax != Z.length - 1) throw "number of points shoud be equal to power of 2";
    var x = new Array(2 * nmax);	// x[]
    for (var c = 0; c < 2 * nmax; c++) x[c] = 0.0;	//zerofication
    for (var c = left; c <= right; c++) x[2 * (c - left)] = Number(Z[c]);
    ////
    //alert(x.length + " " + nmax + " " + sign);
    x = FFT(x, npow, sign);

    var ZZ = [];

    ZZ.push(Z[0]);// remove this line later (it is added to shift ZZ in time)
    //ZZ.push(0);// add this line later

    //   for (var c = 0; c < x.length / 2; c++)
    //  for (var c = 0; c < x.length / 4+1; c++)
    for (var c = 0; c < x.length / 2; c = c + 2) {
        //        var re = x[2 * c];
        //      var im = x[2 * c+1];
        //    var mod = Math.sqrt(re * re + im * im);
        //  alert(mod + " " + re + " " + im);
        if (sModReIm == "Mod") ZZ.push(Math.sqrt(x[2 * c] * x[2 * c] + x[2 * c + 1] * x[2 * c + 1]));// mod
        else if (sModReIm == "Re") ZZ.push(x[2 * c]);//re
        else ZZ.push(x[2 * c + 1]);//"Im"


    }
    return ZZ;
}
function fFBackRe(v, dEndFreq)//fFBackRe(c,9) was not tested yet
{
    var npow = 1 + (Math.log(v.length - 1) / Math.log(2.0) + .0000001);
    npow--;
    if (v.length < 2) throw "Does not work with constants";
    if ((1 << npow) - 1 < dEndFreq) dEndFreq = (1 << npow) - 1;
    if (dEndFreq < 0) dEndFreq = 0; // do not remove trend

    var endFreq = Math.floor(dEndFreq + 0.1);

    var vCount = v.length;
    if (vCount <= 1) throw "No transform from a constant";
    var Z = insert(v);

    ////////////////////
    var nmax = 1 << npow;	// npow
    var x = new Array(2 * nmax);	// x[]
    for (var c = 0; c < 2 * nmax; c++) x[c] = 0.0;	//zerofication
    for (var c = 0; c < nmax; c++) {
        if (2 * c < dEndFreq || 2 * nmax - 2 * c < dEndFreq) {
            x[2 * c] = Z[c + 1];	//zerofication
        }
    }
    //////////////////////////////////////	back /////////////////
    x = FFT(x, npow, 1.0);// back
    for (var c = 1; c < Z.length; c++) { // c=1  to use start date
        Z[c] = x[2 * c - 2];
    }
    return Z;
}
function yqmd(yqmd) {

    var answer = [];
    if (sFrequencyRange == "daily" || sFrequencyRange == "canned" ) {

        //alert("yqmd");


        var minIndex = findMinMaxIndex()[0];
        var maxIndex = findMinMaxIndex()[1];
        //minIndex = nLeftIndex;
        //maxIndex = nRightIndex;
        //alert("min/max "+minIndex + " " + maxIndex);
        //  alert("left/right " + nLeftIndex + " " + nRightIndex);

        //    var minIndex = nLeftIndex;
        //    var maxIndex = nRightIndex;


        var sMinDate = dateDailyFromIndex(minIndex);
        var sMaxDate = dateDailyFromIndex(maxIndex);

//alert(sMinDate + " " + sMaxDate);


    //    alert(sMinDate + " " + sMaxDate);
        answer.push(minIndex);
        for (var i = minIndex; i <= maxIndex; i++) {
            var sDate = dateDailyFromIndex(i);
            if (yqmd == "year") answer.push(sDate.substring(0, 4));
            else if (yqmd == "qrt") {
                var m = sDate.substring(5, 7);
                answer.push(1+Math.floor((2*m-1)/6));
            }
            else if (yqmd == "month") answer.push(sDate.substring(5, 7));
            else if (yqmd == "dayOfM") {
                answer.push(sDate.substring(8));//qrt
            }
            else {//dayOfW
                answer.push(1 + (i +1 + nGlobalShift) % 5);
         //       var d = new Date(2018, 3,13);
         //       answer.push(d.getDay());
             //   var d = new Date();
              //  d.setFullYear(1 * year, 0, 1);// january 1
            }
                

        }
    }
    else {
        throw "write code for intradate to dayly";
    }
    return answer;
}
function findMinMaxIndex() {

    if (arSymbolPresentation == null || arSymbolPresentation.length == 0)
        return [nLeftIndex, nRightIndex];
    var countSymbols = 0;
    var minIndex = Number.MAX_SAFE_INTEGER;
    var maxIndex = Number.MIN_SAFE_INTEGER;
    // symbols
    for (var i = 0; i < arSymbolPresentation.length; i++) {// parallel list is not drawn
        if (arSymbolList[i] == "") continue;
        countSymbols++;
        var parts = arSymbolPresentation[i].split("!");
        if (parts[7] != "" + nChartToDraw) continue;// do i need it???
        if (getVisible(parts[0]) == 0 && parts[6] == "None") continue;
        var nPane = parts[1] - 1;
        if (dListPanes[nPane] == 0) continue;
        if (arFromSymbolListToAvailableIndex.length <= i) continue;
        var iAvlbl = arFromSymbolListToAvailableIndex[i];
        var stock = arAvailableStiocks[iAvlbl];
        var N = stock[1].length;
        var startIndex = stock[1][0];//1=open
        if (minIndex > startIndex) minIndex = startIndex;
        // var endIndex = stock[1][N - 1];
        var endIndex = startIndex + N - 2;
        if (maxIndex < endIndex) maxIndex = endIndex;
    }
    if (countSymbols == 0) return [nLeftIndex, nRightIndex];
    return [minIndex, maxIndex];
}
function holidays() {
    var answer = [];
    var TH = getIndexesTradingHolidays();
    var hol = TH[2];
    var minIndex = TH[0];
    var maxIndex = TH[1];


    //show(hol);
    //  alert("hol.length=" + hol.length);
    var s = "";
    answer.push(hol[0]);
    for (var i = 1; i < hol.length;i++){
        if (hol[i] == true) {
            answer.push(1);
        //    s += hol[i];
        }
        else {
            answer.push(0);
         //   s += "_";
        }
  //      if (i % 20 == 0) s += "\n";
    }
   // alert(s);
    return answer;
}
function getIndexesOne(vBase) {
    var minIndex = vBase[0];
    var maxIndex = minIndex + vBase.length-1;
    var arAswer = [];
    arAswer.push(minIndex);
    for (var i = 1; i <= maxIndex - minIndex; i++) {//// i=0 ?
        var bHoliday = true;

       if (!isNaN(1 * vBase[i])) bHoliday = false;
        arAswer.push(bHoliday);
    }
    return [minIndex, maxIndex, arAswer];
}
function getIndexesTradingHolidaysWOH() {
var arStocks = [];
    var minIndex = Number.MAX_SAFE_INTEGER;
    var maxIndex = Number.MIN_SAFE_INTEGER;

    for (var i = 0; i < arSymbolPresentation.length; i++) {// parallel list is not drawn
        if (arSymbolList[i] == "") continue;
        var parts = arSymbolPresentation[i].split("!");
        if (parts[7] != "" + nChartToDraw) continue;// do i need it???
        if (getVisible(parts[0]) == 0 && parts[6] == "None") continue;
        var nPane = parts[1] - 1;
        if (dListPanes[nPane] == 0) continue;
        if (arFromSymbolListToAvailableIndex.length <= i) continue;
        var iAvlbl = arFromSymbolListToAvailableIndex[i];
        var stock = arAvailableStiocks[iAvlbl];
  arStocks.push(stock);
        var N = stock[1].length;
        var startIndex = stock[1][0];//1=open
        if (minIndex > startIndex) minIndex = startIndex;
        var endIndex = startIndex + N - 1;
        if (maxIndex < endIndex) maxIndex = endIndex;
    }
    var arAswer = [];
    arAswer.push(minIndex);
    for (var i = 1; i <= maxIndex-minIndex; i++) {////////////////////////// i=0 ?
        var bHoliday=true;
        for (var n = 0; n < arStocks.length; n++) {
            var stock = arStocks[n];
            //if(stock[1].length<2) continue;
 //alert("n=" + n + " i=" + i + " stock[1][i]=" + stock[1][i]);
            if (!isNaN(1 * stock[1][i])) {
          //  if ( 1*stock[5][i]>0) {
                bHoliday = false;
                break;
            } 
        }
        arAswer.push(bHoliday);
    }
    return [minIndex, maxIndex, arAswer];
}//adjust(v1, v2, res1, res2)
function getIndexesTradingHolidays() {
    var arStocks = [];
    var minIndex = Number.MAX_SAFE_INTEGER;
    var maxIndex = Number.MIN_SAFE_INTEGER;

    for (var i = 0; i < arAvailableStiocks.length; i++) {// parallel list is not drawn
        var stock = arAvailableStiocks[i];
        arStocks.push(stock);
        var N = stock[1].length;
        var startIndex = stock[1][0];//1=open
        if (minIndex > startIndex) minIndex = startIndex;
        var endIndex = startIndex + N - 1;
        if (maxIndex < endIndex) maxIndex = endIndex;
    }
    var arAswer = [];
    arAswer.push(minIndex);
    for (var i = 1; i <= maxIndex - minIndex; i++) {////////////////////////// i=0 ?
        var bHoliday = true;
        for (var n = 0; n < arStocks.length; n++) {
            var stock = arStocks[n];
            //if(stock[1].length<2) continue;
            //alert("n=" + n + " i=" + i + " stock[1][i]=" + stock[1][i]);
            if (!isNaN(1 * stock[1][i])) {
                //  if ( 1*stock[5][i]>0) {
                bHoliday = false;
                break;
            }
        }
        arAswer.push(bHoliday);
    }
    return [minIndex, maxIndex, arAswer];
}//adjust(v1, v2, res1, res2)
function covOld(C, Base, v3) {
    var p = fromVNtoN(v3);
    //alert("p=" + p);
    if (p > C.length || p > Base.length || p < 2) throw "third argument should be from 2 to " + C.length;
    //alert("p=" + p);
    //DataSet DataSet::correlation(DataSet& Base, unsigned long p)
    // for each row find in base the same row
    // insert with wings
    // creat vectors x(i) and y(i) (or use valaray)
    // find xa=<x> and ya=<y>
                                            // find Sx=sqrt(sum((xi-xa)*(xi-xa)))/n and Sy
    // answer sum((xi-xa)*(yi-ya))/(n           *SX*Sy)

    // test == 0

    if (C.length < 2 || Base.length < 2) throw "Does not work with constants";
    var sC = C[0];
    var eC = C.length + sC - 2;

    var sB = Base[0];
    var eB = Base.length + sB - 2;

    var startCol = sC;
    var endCol = eC;
    if (startCol < sB) startCol = sB;
    if (endCol > eB) endCol = eB;

//alert(sC+" "+eC+" ___ "+sB+" "+eB+" ___ "+startCol+" "+endCol+" "+p);

if (startCol > endCol - p + 1) throw "There is no intersection or it is not long enough...";
//if (startCol > endCol - p+2) throw "There is no intersection or it is not long enough...";

    //DataSet Z(100,100,startCol+p-1,endCol, this);
    var Z = [];
    Z.push(startCol + p - 1);
    for (var i = startCol + p - 1; i <= endCol; i++) {
        var empty;
        Z.push(empty);
    }
    var sZ = Z[0];

    var c;
    var xi, yi, Sxy, val;//, Sx, Sy;


   var Xavg = sma(C, v3);
    var Yavg = sma(Base, v3);
  //   var Xavg = sma(C, p);
  //  var Yavg = sma(Base, p);
//alert(Xavg + " " + Yavg);
    var sX = Xavg[0];
    var sY = Yavg[0];

    for (c = startCol + p - 1; c <= endCol; c++) {
        Sx = 0.0;
        Sy = 0.0;
        Sxy = 0.0;
        for (var i = -p + 1; i <= 0; i++) {
            xi = C[c + i - sC + 1];
            yi = Base[c + i - sB + 1];
    //        Sx += (xi - Xavg[c - sX + 1]) * (xi - Xavg[c - sX + 1]);
   //         Sy += (yi - Yavg[c - sY + 1]) * (yi - Yavg[c - sY + 1]);
            Sxy += (xi - Xavg[c - sX + 1]) * (yi - Yavg[c - sY + 1]);

//alert(xi + " " + yi + " " + Sxy);
        }
    //    if (Sx == 0.0 || Sy == 0.0) val = 0.0;
            //else val = Sxy / Math.sqrt(Sx * Sy);
    //    else
        //  val = Sxy / p;
        val = Sxy / (p-1);
        Z[c - sZ + 1] = val;
    }

    if (Z.length <= 2) {
        //   alert(Z);
        var z1 = [];
        z1.push(Z[1]);
        return z1;
    }
    return Z;
}
//function cov3(v1, v2, v3) {
function cov3(A, B, v3) {
        //  alert("corrCf3");
        if (isMatrix(A) || isMatrix(B)) return compareMatrix(cov3,v3, A, B);
        var v1=[];
        var v2=[];
        adjust(A, B, v1, v2);

    var V1 = compressOne(v1, v1);
    var V2 = compressOne(v2, v2);
    var vOld = covOld(V1, V2, v3);
    if (v1.length == V1.length && v2.length == V2.length) return vOld;////////////////////////////////
    if (v1.length == V1.length) return decompressOne(vOld, v2);
    if (v2.length == V2.length) return decompressOne(vOld, v1);
    return decompressOne(vOld, v1);

}
function cov2(v1, v2) {
    if (isMatrix(v1) || isMatrix(v2)) return compareMatrix(cov2, "", v1, v2);


    var res1 = [];
    var res2 = [];
    adjust(v1, v2,  res1,  res2);

//alert("cov2");
//alert("v1.length=" + v1.length + " v2.length=" + v2.length);
    var V1 = compressOne(res1, res1);
    var V2 = compressOne(res2, res2);    


    var p1 = V1.length - 1;
    var p2 = V2.length - 1;
    var p = Math.min(p1, p2);
    //alert("p=" + p);


    var vOld = covOld(V1, V2, p);
    if (v1.length == V1.length && v2.length == V2.length) return vOld;////////////////////////////////
    return decompressOne(vOld, res1);
 /*   if(v1[0]<v2[0]){
        return decompressOne(vOld, v1);
    }
    else{
        return decompressOne(vOld, v2);
    }*/
}
function corrCfOld(C, Base, v3) {

//    var C = insert(v1);
//    var Base=insert(v2);
 //   if (v3.length!=1 || v3[0]<0) throw "third argument should be a poitive integer";
  //  var p = v3[0];
    var p = 1*fromVNtoN(v3);// 1* in case v3 is a string ????
 
//alert("p=" + p);

    if (p > C.length || p > Base.length || p < 0) throw "third argument should be a positive integer less than " + C.length;
//alert("p=" + p);
        //DataSet DataSet::correlation(DataSet& Base, unsigned long p)
        // for each row find in base the same row
        // insert with wings
        // creat vectors x(i) and y(i) (or use valaray)
        // find xa=<x> and ya=<y>
        // find Sx=sqrt(sum((xi-xa)*(xi-xa)))/n and Sy
        // answer sum((xi-xa)*(yi-ya))/(n*SX*Sy)

        // test == 0

        if (C.length < 2 || Base.length < 2) throw "Does not work with constants";

        var sC = 1*C[0];
        var eC = C.length + sC - 2;

        var sB = 1*Base[0];
        var eB = Base.length + sB - 2;

        var startCol = sC;
        var endCol = eC;
        if (startCol < sB) startCol = sB;
        if (endCol > eB) endCol = eB;
//alert("startCol=" + startCol + " endCol - p + 1=" + (endCol - p + 1));
        if (startCol > endCol - p + 1) throw "There is no intersection or it is not long enough...";

        //DataSet Z(100,100,startCol+p-1,endCol, this);
        var Z = [];
        Z.push(startCol + p - 1);
        for (var i = startCol + p - 1; i <= endCol; i++)
        {
            var empty;
            Z.push(empty);
        }
    var sZ = Z[0];

    var c;
    var xi, yi, Sx, Sy, Sxy, val;

  //   var Xavg = sma(p, C);
 //   var Yavg = sma(p, Base);
   var Xavg = sma(C,v3);
    var Yavg = sma(Base,v3);

    var sX = Xavg[0];
    var sY = Yavg[0];

    for (c = startCol + p - 1; c <= endCol; c++)
    {
        Sx = 0.0;
        Sy = 0.0;
        Sxy = 0.0;
        for (var i = -p + 1; i <= 0; i++)
        {
            xi = C[c + i - sC + 1];
            yi = Base[c + i - sB + 1];
            Sx += (xi - Xavg[c - sX + 1]) * (xi - Xavg[c - sX + 1]);
            Sy += (yi - Yavg[c - sY + 1]) * (yi - Yavg[c - sY + 1]);
            Sxy += (xi - Xavg[c - sX + 1]) * (yi - Yavg[c - sY + 1]);
        }
        if (Sx == 0.0 || Sy == 0.0) val = 0.0;
    else val = Sxy / Math.sqrt(Sx * Sy);
        Z[c - sZ + 1] = val;
    }

/*
    var s = "" + "\t" + "mu" + "\t" + "sigma" + "\nx" + "\t" + Xavg[Xavg.length - 1] + "\t" + Math.sqrt(Sx) + "\ny" + "\t" + Yavg[Yavg.length - 1] + "\t" + Math.sqrt(Sy);
    if (arTexts == null || arTexts.length == 0) {
        arTexts = [s];
    }
    else arTexts[0] = s;
    SetTopPanel();
    */
    if ( Z.length <= 2) {
     //   alert(Z);
        var z1 = [];
        z1.push(Z[1]);
        return z1;
    }
    return Z;
}
//function corrCf3(v1, v2, v3) {
  //  if (isMatrix(v1) || isMatrix(v2)) return compareMatrix(corrCf3, v3, v1, v2);
function corrCf3(A, B, v3) {
  //  alert("corrCf3");
        if (isMatrix(A) || isMatrix(B)) return compareMatrix(corrCf3,v3, A, B);
        var v1=[];
        var v2=[];
        adjust(A, B, v1, v2);

 //   alert(3);
  //  var V1 = compressTwo(v1, v1, v2);
    //  var V2 = compressTwo(v2, v1, v2);
    var V1 = compressOne(v1, v1);
    var V2 = compressOne(v2, v2);

 //   alert("V1=" + V1);
//    alert("V2=" + V2);
 //   alert("v3=" + v3);
 //   alert("v3.length=" + v3.length);

    var vOld = corrCfOld(V1, V2, v3);

    if (v1.length == V1.length && v2.length==V2.length) return vOld;////////////////////////////////
    
  //  return decompressOne(vOld, v1);
 /*   if(v1[0]<v2[0]){
        return decompressOne(vOld, v1);
    }
    else{
        return decompressOne(vOld, v2);
    }
    */
    if (v1.length == V1.length) return decompressOne(vOld, v2);
    if (v2.length == V2.length) return decompressOne(vOld, v1);
    return decompressOne(vOld, v1);
}
//function corrCf2(v1, v2) {
    //if (isMatrix(v1) || isMatrix(v2)) return compareMatrix(corrCf2, "", v1, v2);
function corrCf2(V1, V2) {
        if (isMatrix(V1) || isMatrix(V2)) return compareMatrix(corrCf2, "", V1, V2);
        var v1=[];
        var v2=[];
        adjust(V1, V2, v1, v2);

    var V1 = compressOne(v1, v1);
    if (V1 == undefined) {
   //     alert("V1 is undefined ");
    }

    var V2 = compressOne(v2, v2);
    if (V2 == undefined) {
     //   alert("V2 is undefined ");
    }
 //  alert(22);    
    var p1 = V1.length-1;
    var p2 = V2.length-1;
    var p = Math.min(p1, p2);

 
    var vOld = corrCfOld(V1, V2, p);
    if (v1.length == V1.length && v2.length == V2.length ) return vOld;////////////////////////////////
  
    return decompressOne(vOld, v1);
}
//function rsi( v, p14){
function rsiOld(v, v2) {

   // if (isMatrix(v)) return smaMatrix(rsi, v, v2);
//alert(v2 + "v2.length=" + v2.length);
  //  if (v2.length != 1) throw "Usage: rsi(c,9)";
    var p14 = v2;
 
    if (p14 < 1 ) throw new "Prameter should be an integer greater than zero";
    var Y = [];
    Y.push(v[0] + p14);
    var c;
    var up = 0.0;
    var down = 0.0;
    var delta;
    for (var c = 1 + 1; c < p14 + 1 + 1; c++)
    {
        delta = v[c] - v[c - 1];
        if (delta > 0.0) up += delta;
        else down -= delta;
    }
    up = up / p14;
    down = down / p14;
    if (up < .0000001 && down < .0000001) Y.push(50.0);
    else Y.push(100.0 * up / (up + down));

    //Recurrent formula
    var p13 = p14 - 1;
    var coef1314 = p13 /p14;
    for (c = p14 + 1 + 1; c < v.length; c++)
    {
        delta = v[c] -v[c - 1];
        if (delta >= 0.0)
        {
            up = (p13 * up + delta) / p14;
            down *= coef1314;
        }
        else
        {
            down = (p13 * down - delta) / p14;
            up *= coef1314;
        }	
        if (up < .0000001 && down < .0000001) Y.push(50.0);
        else Y.push(100.0 * up / (up + down));
    }
    return Y;
}
function rsi(v1, v2) {//rsi(c,9)
    if (isMatrix(v1)) return smaMatrix(rsi, v1, v2);
    var V1 = compressOne(v1, v1);
    var vOld = rsiOld(V1, 1*v2[0]);
    if (v1.length == V1.length) return vOld;////////////////////////////////
    return decompressOne(vOld, v1);
}
function mfiOld(v, v2, vVolume) {
 //   alert("v2.length=" + v2.length + " v2=" + v2);
    if (v2.length != 1) throw "Usage: mfi(c,9)";
    var p14 = v2[0];
    if (p14 < 1 ) throw new "Prameter should be an integer greater than zero";
    var Y = [];
    Y.push(v[0] + p14);
    var c;
    var up = 0.0;
    var down = 0.0;
    var delta;
    for (var c = 1 + 1; c < p14 + 1 + 1; c++)
    {
        delta = v[c] - v[c - 1];
        var delta2 = Math.abs(v[c] * vVolume[c] - v[c - 1] * vVolume[c - 1]);
//alert(delta + " " + delta2);
        if (delta > 0.0) up += delta2;
       // else down -= delta2;
        else down += delta2;
    }
    up = up / p14;
    down = down / p14;
    if (up ==0 && down ==0) Y.push(50.0);
    else Y.push(100.0 * up / (up + down));

    //Recurrent formula
    var p13 = p14 - 1;
    var coef1314 = p13 /p14;
    for (c = p14 + 1 + 1; c < v.length; c++)
    {
        delta = v[c] - v[c - 1];
        var delta2 = Math.abs(v[c] * vVolume[c] - v[c - 1] * vVolume[c - 1]);
        if (delta >= 0.0)
        {
            up = (p13 * up + delta2) / p14;
            down *= coef1314;
        }
        else
        {
           // down = (p13 * down - delta2) / p14;
            down = (p13 * down + delta2) / p14;
            up *= coef1314;
        }	
        if (up ==0 && down ==0) Y.push(50.0);
        else Y.push(100.0 * up / (up + down));

        if (up / (up + down) > 1 || up / (up + down) < -1) {
            //alert(c+" "+up + " " + down + " " + up / (up + down));
        }
    }
    return Y;
}
function mfi(o, h, l, c, vVolume, v2) {//rsi(c,9)
    if (isMatrix(o) || isMatrix(h) || isMatrix(l) || isMatrix(c) || isMatrix(vVolume)) return func5Matrix(mfi, o, h, l, c, vVolume, [[v2[0]]]);
    var v1 = arithm('+', c, h);
    v1 = arithm('+', v1, o);
    v1 = arithm('+', v1, l);
    var V1 = compressOne(v1, vVolume);
    var VVolume = compressOne(vVolume, vVolume);
//alert(1);
    var vOld = mfiOld(V1, v2, VVolume);
    if (v1.length == V1.length && vVolume.length==VVolume.length) return vOld;////////////////////////////////
//alert(2);
    return decompressOne(vOld, vVolume);
}
//function stoch( C,  H,  L,  k,  p){
function stochOld(C, H, L, vP, vK) {

    if (vK.length != 1 || vP.length!=1) throw "Usage: stoch(c,h,l,14,3)";
    var k=vK[0];
    var p=vP[0];
    //=Stochastic Oscillator
    if (p < 1 || p > C.length - 1) throw "Second numerical parameter should be greater than zero and less or equal number of data points";
    if (p + k < 2 || p + k > C.length) throw "Sum of numerical parameters should be greater than one and less or equal number of data points plus one";
    // Find minLow and maxHigh
    var MinL = mMinOld(L,vP);
    var MaxH = mMaxOld(H,vP);
    // Slowing
    MinL = smaOld( MinL, vK);
    MaxH = smaOld(MaxH, vK);
    C = smaOld(C, vK);
    // Do a job
    var c;
    var Y = [];
    Y.push(MinL[0]);

    for (c = 1; c < MinL.length; c++)
    {
        if (MaxH[c] == MinL[c]) Y.push(50.0);
        else
        {
            Y.push(100.0 * (C[c + p - 1] - MinL[c]) / (MaxH[c] - MinL[c]));
        }
    }
    return Y;
}
function stoch(v1, v2, v3, vK, vP) {//"Usage: stoch(c,h,l,14,3)";
    if (isMatrix(v1) || isMatrix(v2) || isMatrix(v3)) return func32Matrix(stoch, v1, v2, v3, [[vK[0]], [vP[0]]]);
    var C = compressOne(v1, v1);
    var H = compressOne(v2, v1);
    var L = compressOne(v3, v1);
    var vOld = stochOld(C, H, L, vK, vP);
    if (v1.length == C.length && H.length==v2.length && L.length==v3.length) return vOld;////////////////////////////////
    return decompressOne(vOld, v1);
}     
function obv( C, V)//obv(c,v)	//=On Balance Volume
{
    if (isMatrix(C) || isMatrix(V)) return compareMatrix(obv, "", C, V);
    //  acc( if(c>ref(-1,c),v,0) - if(c<ref(-1,c),v,0) )

    var c = compressOne(C, V);
    var v = compressOne(V, V);
    var vZero = [];
    vZero.push(0);

    var R = refOld(-1, c);

//    var Gt = ifCompareOld(Compare("Gt", c, R), v, vZero);
 //   var Lt = ifCompareOld(Compare("Lt", c, R), v, vZero);

    var Gt = ifCompare(Compare("Gt", c, R), v, vZero);
    var Lt = ifCompare(Compare("Lt", c, R), v, vZero);

    var vOld = acc(arithm('-', Gt, Lt));
    if (v.length == V.length && c.length==C.length) return vOld;////////////////////////////////
  //  var vOld = accOld(arithm('-', Gt, Lt));

    return decompressOne(vOld, V);
  
}
/*
function sBB( c,  p,  dev)//sBB(c,20,-2.0)	//=Bollinger Bands
{//sma(c,20) +2*stDev(c,20). 
    List<double> aL = stDev(ref c, p);
    List<double> D = arithm('*', dev, ref aL);
    List<double> aS = sma(p, ref c);
    return arithm('+', ref aS, ref D);
}
//wBB(c,20,-2.0)	//=Bollinger Bands
public List<double> wBB(ref List<double> c, double p, double dev)
{//sma(c,20) +2*stDev(c,20). 
    List<double> aL = stDev(ref c, p);
    List<double> D = arithm('*', dev, ref aL);
    List<double> aW = wma(p, ref c);
    return arithm('+', ref aW, ref D);
}
//eBB(c,20,-2.0)	//=Bollinger Bands
public List<double> eBB(ref List<double> c, double p, double dev)
{//sma(c,20) +2*stDev(c,20). 
    List<double> aL = stDev(ref c, p);
    List<double> D = arithm('*', dev, ref aL);
    List<double> aE = ema(p, ref c);
    return arithm('+', ref aE, ref D);
}
*/
function momDOld(c,  p)//momD(c,9)	//=MomentumD
{//c-ref(c,-9)
    var R = refOld(p, c);
    return arithm('-', c, R);
}
function momD(C,  vP)//momD(c,9)	//=MomentumD
{

    if (isMatrix(C)) return smaMatrix(momD, C,vP);
   // if (isMatrix(C)) return oneMatrix(momD, vP,  C,vP);
    if (vP.length != 1) throw " usage: momD(c,9)";
    //vP[0] = -vP[0];
    var c = compressOne(C, C);
  //  var vOld = momDOld(c, vP[0]);
    var vOld = momDOld(c, -vP[0]);
    if (c.length == C.length) return vOld;////////////////////////////////
    return decompressOne(vOld, C);
}
function momROld( c, p)//momR(c,9)	//=MomentumR
{//100*c/ref(-20,c)-100
    //100*(c/ref(-20,c)-1)
    var R = refOld(p, c);
    R = arithm('/', c, R);
    R = arithm('-', R, 1)
    return arithm('*', R, 100.0);
}
function momR(C, vP)//momR(c,9)	//=MomentumR
{
    if (isMatrix(C)) return smaMatrix(momR, C, vP);
    if (vP.length != 1) throw " usage: momR(c,9) or roc(c,9)";
    vP[0] = -vP[0];
    var c = compressOne(C, C);
    var vOld = momROld(c, vP[0]);
    if (c.length == C.length) return vOld;////////////////////////////////
    return decompressOne(vOld, C);
}
function roc(c,  vP)//roc(c,9)=momR(c,9)	//=rate of change
{//100*c/ref(c,-9)-100
    if (isMatrix(c)) return smaMatrix(roc, c, vP);
    /*
    List<double> aL = reference(-p, ref c);
    List<double> R = arithm('/', ref c, ref aL);
    R = arithm('*', ref R, 100.0);
    return arithm('-', ref R, 100.0);
    */
    return momR(c, vP);

}
function vltI(h, l, c, p) {//vltI = mma(th-tl,14)      //vltI(th,tl,9)- volatility index
    if (isMatrix(h) || isMatrix(l) || isMatrix(c)) return func32Matrix(vltI, h, l, c, [p[0]]);
    var th = TrueHigh(h,c);
    var tl = TrueLow(l,c);
    var D = arithm('-',  th,  tl);
    return mmaNum(D, p);
}
function pdI(h, l, c, p) {//pdI(pm,th,tl,9)          //PDI = 100*mma(pm,14)/vltI(th,tl,14),
    if (isMatrix(h) || isMatrix(l) || isMatrix(c)) return func32Matrix(pdI, h, l, c, [p[0]]);
    var th = TrueHigh(h,c);
    var tl = TrueLow(l, c);
   // var pm = DM('p', h, l, c);
    var pm = posDirM(h, l, c);
    var MMA = mmaNum(pm, p);// 3-18-2017
    var VI = vltI(h,l,c, p);//// 3-17-2017
    var R = arithm('/', MMA, VI);
 //   return arithmNum('*', 100.0, R);
    return arithm('*', 100.0, R);
}
function ndI(h, l, c, p) {//NDI = 100*mma(nm,14)/vltI(th,tl,14),                   // ndI(nm,th,tl,9)
    if (isMatrix(h) || isMatrix(l) || isMatrix(c)) return func32Matrix(ndI, h, l, c, [p[0]]);
    var th = TrueHigh(h, c);
    var tl = TrueLow(l, c);
   // var pm = DM('p', h, l, c);
//    var nm = DM('n', h, l, c);
    var nm = negDirM(h, l, c);
    var MMA = mmaNum(nm, p);//
    var VI = vltI(h, l, c, p);
    var R = arithm('/', MMA, VI);
   // return arithmNum('*', 100.0, R);
    return arithm('*', 100.0, R);
}    
function adx(h, l, c, p) {//DX = 100*abs(PDI - MDI)/ (PDI + MDI).// dx(pm,nm,th,tl,9)
    if (isMatrix(h) || isMatrix(l) || isMatrix(c)) return func32Matrix(adx, h, l, c, [p[0]]);
    var th = TrueHigh(h, c);
    var tl = TrueLow(l, c);
   // var pm = DM('p', h, l, c);
    var pm = posDirM(h, l, c);
   // var nm = DM('n', h, l, c);
    var nm = negDirM(h, l, c);
    var pMA = mmaNum(pm, p);
    var nMA = mmaNum(nm, p);

    //var VI = vltI(h, l, c, p);
    var D = arithm('-', th, tl);
    var VI = mmaNum(D, p);

    var pR = arithm('/', pMA, VI);
    var nR = arithm('/', nMA, VI);
 //   var pDI = arithmNum('*', 100.0, pR);
 //   var nDI = arithmNum('*', 100.0, nR);
    var pDI = arithm('*', 100.0, pR);
    var nDI = arithm('*', 100.0, nR);

    //DX = 100*abs(PDI - MDI)/ (PDI + MDI).
    //    var dif = abs(arithm('-', pDI, nDI));
    var dif = one(arithm('-', pDI, nDI), "abs");
    var sum = arithm('+', pDI, nDI);
    var ratio = arithm('|', dif, sum);//   if (dif ==0 && down==0) Y.push(50.5);

  //  return mmaNum(arithmNum('*', 100, ratio), p);
    return mmaNum(arithm('*', 100, ratio), p);

}
 /*                // (pm,nm,th,tl,9,14)
                public List<double> adx(ref List<double> pm, ref List<double> nm, ref List<double> th, ref List<double> tl, double p, double p2)
                {//ADX = mma(DX,10)
                    List<double> DX = dx(ref pm, ref nm, ref th, ref tl, p);
                    return mma(p2, ref DX);
                }
*/
/*
// money flow index
function mfi(o,  h, l,  c, v,  p) //mfi(o,h,l,c,v,9)
{
    var M = arithm('+',  c,  h);
    M = arithm('+', M,  o);
    M = arithm('+', M,  l);
    M = arithm('*', M, v);



    M = (c + h + low + open)/4;
    D = M– ref(M,-1);
    Up = if(D>=0, v*M, 0);
    Down = if (D<0, -v*M, 0);
    UpS = mma(Up,14);
    DownS = mma(Down,14);
    MFI = 100*UpS/(UpS+DownS)





    return M;

    
    M = arithm('/', ref M, 4.0);
    List<double> D = compare("ge", M, reference(-1, ref M));
    List<double> vM = arithm('*', ref v, ref M);
    List<double> Zero = new List<double>();
    Zero.push(0.0);
    List<double> Up = ifFunction(ref ds, D, vM, Zero);
    D = compare("lt", M, reference(-1, ref M));
    List<double> Down = ifFunction(ref ds, D, vM, Zero);
        
    List<double> UpS = mma(p, ref Up);
    List<double> DownS = mma(p, ref Down);
        
    List<double> answer = new List<double>();
        
    answer.push(UpS[0]);
    for (var i = 1; i < UpS.length; i++)
    {
        double u = UpS[i];
        double d = DownS[i];
        if (UpS[i] == 0.0 && DownS[i] == 0.0) answer.push(50.0);
        else answer.push(100.0 * UpS[i] / (UpS[i] + DownS[i]));
    }        
return answer;

}*/
function rpc(v) {//100*c/v[1] - 100     // rpc(c)   
    if (isMatrix(v)) return oneMatrix(rpc, "", v);
    var empty;
    var res = [];
    res.push(v[0]);
    var d = v[1];
    for (var i = 1; i < v.length; i++) {
        if (isNaN(v[i])) res.push(empty);
        else res.push(100.0 * (v[i] / d - 1.0));
    }
    return res;
}
function ctiOld(v, p) {//Tushar Chande’s Trend Index 
//    LN = ln(c / ref(-21, c))
//    L1 = ln(c / ref(-1, c))
//    StD=stDev(L1,21)*sqrt(21)
//    CTI =LN/StD
    
    if (p > v.length) throw "too big parameter leads to empty resule";
    var LN=[];
    var L1=[];
 //   var StD=[];
    
    L1.push(v[0] + 1);
    for(var i=1+1;i<v.length;i++){
        L1.push(Math.log(v[i] / v[i - 1]));
    }


    LN.push(v[0] + p);
    for (var i = 1 + p; i < v.length; i++) {
//alert(p + " " + i + " " + v[i] + " " + v[i - p]);
        LN.push(Math.log(v[i] / v[i - p]));
    }
 //   return L1;

 //   var vP = [];
 //   vP.push(L1[0]+p);
 //   var StD = mStDevOld(L1, vP);
    var StD = mStDevOld(L1, p);

    StD = arithm('*', Math.sqrt(p), StD);

  //  return StD;
     return arithm('/', LN, StD);
/* */
}
function cti(C, vP) {//Tushar Chande’s Trend Index 
    if (isMatrix(C)) return smaMatrix(cti, C, vP);
    if (vP.length != 1) throw " usage: cti(c,21)";
    var p=fromVNtoN(vP);
  //  vP[0] = vP[0];
    var c = compressOne(C, C);
    var vOld = ctiOld(c, p);
    if (c.length == C.length) return vOld;////////////////////////////////
    return decompressOne(vOld, C);
}

function atrU(h, l, c, p2, p5) {
    //sma(low+2*tr(1),5)
    if (isMatrix(h) || isMatrix(l) || isMatrix(c)) return func32Matrix(atrU, h, l, c, [[p2[0]], [p5[0]]]);
    var th = TrueHigh(h, c);
    var tl = TrueLow(l, c);
    var tr = arithm('-', th, tl);
    var D = arithm('*', p2[0], tr);
    return sma(arithm('+', l, D), p5);
}
function atrL(h, l, c, p2, p5) {
    //sma(low-2*tr(1),5)
    if (isMatrix(h) || isMatrix(l) || isMatrix(c)) return func32Matrix(atrL, h, l, c, [[p2[0]], [p5[0]]]);
    var th = TrueHigh(h, c);
    var tl = TrueLow(l, c);
    var tr = arithm('-', th, tl);
    var D = arithm('*', p2[0], tr);
    return sma(arithm('-', h, D), p5);
}
 /*                 // x(c)
                public List<double> x(ref List<double> v)
                {//i from v[i]
                    List<double> res = new List<double>();
                    res.push(v[0]);
                    double d1 = v[0] - 1.0;
                    for (var i = 1; i < v.length; i++)
                    {
                        res.push(i + d1);
                    }
        
                    return res;
                }
                // t(c)
                public List<double> t(ref List<double> v)
                {//i from v[i]
                    List<double> res = new List<double>();
                    res.push(v[0]);
                    double d1 = v[0] - 1.0;
                    for (var i = 1; i < v.length; i++)
                    {
                        //   res.push(i + d1);
                        res.push(i - 1);
                    }
        
                    return res;
                }
     */
function prbOld( C,  H,  L, stepAcc, maxAcc){ //i=prb(c,h,l,0.02,0.2)
    if (C.length < 3) throw "There should be at least two data points";
    var m_nStartCol = 1;
    var m_nEndCol = C.length - 1;
    var dFirst = C[m_nStartCol];
    var dSecond = C[m_nStartCol + 1];
        
    var _cStart = m_nStartCol;
    var cStart = _cStart + 1;
    var state;//Long
        
    //var AFold=0.0, AFstep=stepAcc, AFmax=maxAcc, AF;
    var AFold = 0.0, AFstep = stepAcc, AFmax = maxAcc, AF = 0.0;
    var SARold, SAR;
    var EPold, EP;
    var dHigh, dLow, dHighYesterday, dLowYesterday, dHighBeforYesterday, dLowBeforYesterday;
        
    //DataSet _Y(indicatorRow,indicatorRow,cStart,m_nEndCol);
    //List<double> _Y=C;
    var _Y = [];
    for (var i = 0; i < C.length; i++) _Y.push(C[i]);
   
    if (dFirst <= dSecond)
    {
        state = 1;//long
        //SARold=L(LOW,m_nStartCol);
        //EPold=H(HIGH,cStart);
        SARold = L[m_nStartCol];
        EPold = H[cStart];
    }
    else
    {
        state = -1;//short
        //	SARold=H(HIGH,m_nStartCol);
        //	EPold=L(LOW,cStart);	
        SARold = H[m_nStartCol];
        EPold = L[cStart];
    }
        
    AFold = stepAcc;
    //_Y.setVal(indicatorRow,cStart,SARold);
    _Y[cStart] = SARold;
        
    for (var c = cStart + 1; c <= m_nEndCol; c++)
    {
        //	dHigh = H(HIGH,c);
        //	dLow = L(LOW,c);
        dHigh = H[c];
        dLow = L[c];
        
        //	dHighYesterday = H(HIGH,c-1);
        //	dLowYesterday = L(LOW,c-1);
        dHighYesterday = H[c - 1];
        dLowYesterday = L[c - 1];
        
        //	dHighBeforYesterday = H(HIGH,c-2);
        //	dLowBeforYesterday = L(LOW,c-2);
        dHighBeforYesterday = H[c - 2];
        dLowBeforYesterday = L[c - 2];
        
        if (state == 1)//long
        {
            SAR = SARold + AFold * (EPold - SARold);
            if (SAR > dLowYesterday) SAR = dLowYesterday;
            if (SAR > dLowBeforYesterday && c - cStart > 2) SAR = dLowBeforYesterday;
        
            if (dHigh > EPold)
            {
                EP = dHigh;
                if (AFold < AFmax - AFstep) AF = AFold + AFstep;
            }
            else
            {
                EP = EPold;
                AF = AFold;
            }
            if (SAR > dLow)//revolve
            {
                SAR = EP;
                SARold = EP;
                //AFold=0;
                AFold = stepAcc;
                EPold = dLow;
                state = -1;//////////
            }
            else
            {
                SARold = SAR;
                EPold = EP;
                AFold = AF;
            }
        }
        else//short
        {
            SAR = SARold + AFold * (EPold - SARold);
            if (SAR < dHighYesterday) SAR = dHighYesterday;
            if (SAR < dHighBeforYesterday && c - cStart > 2) SAR = dHighBeforYesterday;
        
            if (dLow < EPold)
            {
                EP = dLow;
                if (AFold < AFmax - AFstep) AF = AFold + AFstep;
            }
            else
            {
                EP = EPold;
                AF = AFold;
            }
            if (SAR < dHigh)//revolve
            {
                SAR = EP;
                SARold = EP;
                //AFold=0;
                AFold = stepAcc;
                //EPold=dLow;
                EPold = dHigh;
                state = 1;//////////
            }
            else
            {
                SARold = SAR;
                EPold = EP;
                AFold = AF;
            }
        }
        //_Y.setVal(indicatorRow, c, SARold);
        _Y[c] = SARold;
    }
    return _Y;
}
function prb(C, H, L, vStepAcc, vMaxAcc) {
    if (isMatrix(C) || isMatrix(H) || isMatrix(L)) return func32Matrix(prb, C, H, L, [[vStepAcc[0]], [vMaxAcc[0]]]);

    if (vStepAcc.length != 1 || vMaxAcc.length != 1) throw " usage: prb(c,h,l,0.02,0.2)";

        var c = compressOne(C, C);
        var h = compressOne(H, C);
        var l = compressOne(L, C);
        var vOld = prbOld(c, h, l, vStepAcc[0], vMaxAcc[0]);
        if (c.length == C.length  && h.length==H.length && l.length==L.length) return vOld;////////////////////////////////
        return decompressOne(vOld, C);

}
function getCoef(){
    var dCoef = 1.0;
    var sFrequency=sFrequencyRange;
    if (sFrequency != "y")//year
    {
        if (sFrequency == "daily"||sFrequency == "canned") dCoef = Math.sqrt(252.0);
        else if (sFrequency == "q") dCoef = Math.sqrt(4.0);
        else if (sFrequency == "m") dCoef = Math.sqrt(12.0);
        else if (sFrequency == "w") dCoef = Math.sqrt(52.0);
        else if (sFrequency == "i")
        {
            var nEvening=16*60;
            var nMorning=9*60-30;
            var nInterval=5;
            vardN = (nEvening - nMorning) / nInterval;
            dCoef = Math.sqrt(252.0 * dN);
        }
        else throw "getCoef() is not recommended for this frequency";
    }
//    var aL = [];
  //  aL.push(dCoef);
    return dCoef;
}
function hVlt(dataSet, p) {
    // 100*stDev(log(c/ref(c,-1)),14)
//    var d = 100 * getCoef();//coef*100
    var d = 100;//coef*100
 //   var aL = ref(-1.0, dataSet);//ref(c,-1)
    var aL = ref(dataSet,-1.0);//ref(c,-1)
    var a = arithm('/', dataSet, aL);// c/ref(c,-1)
    var b = one(a,"ln");// log(c/ref(c,-1))
    var c = mStDev(b, p);
    return arithm('*', d, c);

}
function aHV( dataSet,  p)
{
    // getCoef()*100*stDev(log(c/ref(c,-1)),14)
    var d = 100*getCoef();//coef*100
   // var aL = ref(-1.0, dataSet);//ref(c,-1)
    var aL = ref(dataSet,-1.0);//ref(c,-1)
    var a = arithm('/',  dataSet,  aL);// c/ref(c,-1)
    var b = one(a, "ln");// log(c/ref(c,-1))
    var c = mStDev(b, p);
    return arithm('*', d, c);
}
function aHVHL(h, low, p) {
    // dailyVlt= 1175*sqrt(sma(ln(h/low)*ln(h/low),14)) 
    // aHVHL = getCoef()*dailyVlt/sqrt(252)
    //100*getCoef()*sqrt(sma(ln(h/low)*ln(h/low),14))*11.75/sqrt(252)
    //74.018*getCoef()*sqrt(sma(ln(h/low)*ln(h/low),14))

    var d = 74.018 * getCoef();//coef*100
    var LN = arithm('/', h, low);
    var LN = one(LN, "ln");
    var LN2 = arithm('*', LN, LN);
    var SMA = sma(LN2, p);
    var SQRT = one(SMA, "sqrt");
    return arithm('*', d, SQRT);
}
function gv(vecPrice) {
    var vC = compressOne(vecPrice, vecPrice);


    var result = gmvOld(vC);

        var vOld = result[0];

        var pFound = result[1];
        var gammaFound = result[2];
 //       alert("pFound_gv=" + pFound + " gammaFound=" + gammaFound);
        if (vC.length == vecPrice.length) return [vOld,pFound,gammaFound];////////////////////////////////
    return [decompressOne(vOld, vecPrice),pFound,gammaFound];
}
function gv0(vecPrice) {
    if (isMatrix(vecPrice)) return oneMatrix(gv0, "", vecPrice);
    var vC = compressOne(vecPrice, vecPrice);
    var result = gmvOld(vC);

    var vOld = result[0];

    var pFound = result[1];
    var gammaFound = result[2];
    //       alert("pFound_gv=" + pFound + " gammaFound=" + gammaFound);
    if (vC.length == vecPrice.length) return [vOld, pFound, gammaFound];////////////////////////////////
    return decompressOne(vOld, vecPrice);
}
function gmvOld(vecPrice) {//aEWV(c) -annualized exponential weightes volatility (EWMA from Hull)
 //   var nAB = 100;
   // var nG = 50;
    var nAB = 10;
    var nG = 10;
    //alert("nAB="+nAB);
    if (vecPrice.length < 4) throw "number of data points should be > 2";
    var c = 0, i = 0;

    var S = [];
    for (i = 0; i < vecPrice.length; i++) {
        S.push(vecPrice[i]);
    }
    var left = (S[0] + 1);
    var right = (S[0] + S.length - 2);
    var U2 = [];
    var u20 = left;
    U2.push(u20);
    var longV = 0;
    var d = 0;
    var d1 = 0;
    for (c = left; c <= right; c++)//DS[c]=v[c-v[0]+1]
    {
        var s0 = S[0];
        d1 = S[c - 1 - s0 + 1];
        d = S[c - s0 + 1];
        var u = (d - d1) / d1;
        var u2 = u * u;
        U2.push(u2);
        longV += u2;
    }
    longV /= (right - left + 1);
    var V = [];
    var v0 = left + 1;
    V.push(v0);
    for (c = left + 1; c <= right; c++) {
        var empty;
        V.push(empty);
    }
    var sum = -1.7e308;
    var pMax = 2;
    var aMax = 0;
    var a = 0;
    var b = 0;
    var gamma = 0;
    var gammaMax = 0;
    //alert(V.length + "----" + U2.length);
    var gammaStart = 0;
    var gammaEnd = 1;
    var aStart = 0;
    var aEnd = 1;
    for (var n = 0; n < 2; n++) {//2
        var dGamma=(gammaEnd - gammaStart) / (nG - 1);
        var dA=(aEnd - aStart) / (nAB - 1);
        for (var ig = 0; ig < nG; ig++) {
            //gamma = ig / nG;
            gamma = gammaStart + ig * dGamma;
            for (var iab = 0; iab < nAB; iab++) {
                //alert("1. iab=" + iab);
            //    a = iab / nAB;
                a =aStart + iab * dA;
                // b = 1 - a;
                b = 1 - a - gamma;
                var newSum = 0.0;
                V[left + 1 - v0 + 1] = U2[left - u20 + 1];
                for (c = left + 2; c <= right; c++) {
                    // V[c - v0 + 1] = a * U2[c - 1 - u20 + 1] + b * V[c - 1 - v0 + 1];
                    V[c - v0 + 1] = gamma * longV + a * U2[c - 1 - u20 + 1] + b * V[c - 1 - v0 + 1];
                    var dd = -Math.log(V[c - v0 + 1]) - U2[c - u20 + 1] / (V[c - v0 + 1]);
                    newSum = newSum + dd;
                }
                //alert("2. iab=" + iab + " sum=" + sum + " a=" + a);
                if (newSum > sum) {
                    aMax = a;
                    gammaMax = gamma;
                    sum = newSum;

                }
            }
        }
        if (gammaMax != gammaStart) gammaStart = gammaMax - dGamma;
        else gammaStart = gammaMax;
        if (gammaMax != gammaEnd) gammaEnd = gammaMax + dGamma;
        else gammaEnd = gammaMax;
       
        if (aMax != aStart) aStart = aMax - dA;
        else aStart = aMax;
        if (aMax != aEnd) aEnd = aMax + dA;
        else aEnd = aMax;
    }
    


    pMax = 2 / aMax - 1;
    a = aMax;
    // b = 1.0 - a;
    gamma = gammaMax;
    b = 1 - a - gamma;
    V[left + 1 - v0 + 1] = U2[left - u20 + 1];
    for (c = left + 2; c <= right; c++) {
        //V[c - v0 + 1] = a * U2[c - 1 - u20 + 1] + b * V[c - 1 - v0 + 1];
        V[c - v0 + 1] = gamma * longV + a * U2[c - 1 - u20 + 1] + b * V[c - 1 - v0 + 1];
    }

    d = getCoef() * 100.0;//coef*100
    for (i = 1; i < V.length; i++) {
        V[i] = d * Math.sqrt(V[i]);
    }
    /////////// save found p for updates (and for garch)
    pFound = pMax;

    return [V, pFound, gammaMax];
}
function gmvOldSlow(vecPrice) {//aEWV(c) -annualized exponential weightes volatility (EWMA from Hull)
    var nAB = 100;
 var nG = 50;
    //alert("nAB="+nAB);
    if (vecPrice.length < 4) throw "number of data points should be > 2";
    var c = 0, i = 0;

    var S = [];
    for (i = 0; i < vecPrice.length; i++) {
        S.push(vecPrice[i]);
    }
    var left = (S[0] + 1);
    var right = (S[0] + S.length - 2);
    var U2 = [];
    var u20 = left;
    U2.push(u20);
var longV = 0;
    var d = 0;
    var d1 = 0;
    for (c = left; c <= right; c++)//DS[c]=v[c-v[0]+1]
    {
        var s0 = S[0];
        d1 = S[c - 1 - s0 + 1];
        d = S[c - s0 + 1];
        var u = (d - d1) / d1;
        var u2 = u * u;
        U2.push(u2);
longV += u2;
    }
longV /= (right - left +1);
    var V = [];
    var v0 = left + 1;
    V.push(v0);
    for (c = left + 1; c <= right; c++) {
        var empty;
        V.push(empty);
    }
    var sum = -1.7e308;
    var pMax = 2;
    var aMax = 0;
    var a = 0;
    var b = 0;
var gamma = 0;
var gammaMax = 0;
    //alert(V.length + "----" + U2.length);
for (var ig = 1; ig < nG; ig++) {
    gamma = ig / nG;
        for (var iab = 1; iab < nAB; iab++) {
            //alert("1. iab=" + iab);
            a = iab / nAB;
           // b = 1 - a;
b = 1 - a - gamma;
            var newSum = 0.0;
            V[left + 1 - v0 + 1] = U2[left - u20 + 1];
            for (c = left + 2; c <= right; c++) {
               // V[c - v0 + 1] = a * U2[c - 1 - u20 + 1] + b * V[c - 1 - v0 + 1];
V[c - v0 + 1] = gamma*longV+a * U2[c - 1 - u20 + 1] + b * V[c - 1 - v0 + 1];
                var dd = -Math.log(V[c - v0 + 1]) - U2[c - u20 + 1] / (V[c - v0 + 1]);
                newSum = newSum + dd;
            }
            //alert("2. iab=" + iab + " sum=" + sum + " a=" + a);
            if (newSum > sum) {
                aMax = a;
gammaMax = gamma;
                sum = newSum;

            }
        }
}


    pMax = 2 / aMax - 1;
    a = aMax;
    // b = 1.0 - a;
gamma = gammaMax;
b = 1 - a - gamma;
    V[left + 1 - v0 + 1] = U2[left - u20 + 1];
    for (c = left + 2; c <= right; c++) {
        //V[c - v0 + 1] = a * U2[c - 1 - u20 + 1] + b * V[c - 1 - v0 + 1];
V[c - v0 + 1] = gamma * longV + a * U2[c - 1 - u20 + 1] + b * V[c - 1 - v0 + 1];
    }

    d = getCoef() * 100.0;//coef*100
    for (i = 1; i < V.length; i++) {
        V[i] = d * Math.sqrt(V[i]);
    }
    /////////// save found p for updates (and for garch)
    pFound = pMax;

    return [V, pFound, gammaMax];
}
function gmv(vecPrice, vP) {
    var vC = compressOne(vecPrice, vecPrice);

    var p = vP[0];
    var N = vC.length - p;

    var vN = [];
    vN.push(vN);

    var answer = [];
    var pFound = 0;
 var gammaFound = 0;

    var idx = 1 * vC[0] + p - 1;
    //alert("1*vC[0]+p-1="+idx+ " N="+N);

    answer.push(1 * vC[0] + p - 1);
    for (var i = 0; i < N; i++) {
        var vLeft = [];
        vLeft.push(i);
        var vRight = [];
    //    vRight.push(N - i + 1);
        vRight.push(N - i);
        var cut = cutOld(vLeft, vC, vRight);


     //   var result = aEWVOld(cut);
        var result = gmvOld(cut);
        var vOld = result[0];
        var dLastPoint = vOld[vOld.length - 1];
        //alert("i=" + i + "    " + vLeft[0] + " " + vC.length + " " + vRight[0] + "  dLastPoint=" + dLastPoint);
        answer.push(dLastPoint);
        pFound = result[1];
        gammaFound = result[2];
    }

  //  alert("pFoundGarch=" + pFound + " gammaFound=" + gammaFound);
    if (vC.length == vecPrice.length) return answer;////////////////////////////////
    //   return [decompressOne(answer, vecPrice), pFound];
    return decompressOne(answer, vecPrice);
}
function aEWVOld(vecPrice) {//aEWV(c) -annualized exponential weightes volatility (EWMA from Hull)

    var nAB = 100;
//alert("nAB="+nAB);
    if (vecPrice.length < 4) throw "number of data points should be > 2";
    var c = 0, i = 0;

    var S = [];
    for (i = 0; i < vecPrice.length; i++) {
        S.push(vecPrice[i]);
    }
    var left = (S[0] + 1);
    var right = (S[0] + S.length - 2);
    var U2 = [];
    var u20 = left;
    U2.push(u20);
    var d = 0;
    var d1 = 0;
    for (c = left; c <= right; c++)//DS[c]=v[c-v[0]+1]
    {
        var s0 = S[0];
        d1 = S[c - 1 - s0 + 1];
        d = S[c - s0 + 1];
        var u = (d - d1) / d1;
        var u2 = u * u;
        U2.push(u2);
    }
    var V = [];
    var v0 = left + 1;
    V.push(v0);
    for (c = left + 1; c <= right; c++) {
        var empty;
        V.push(empty);
    }
    var sum = -1.7e308;
 var pMax = 2;
    var aMax = 0;
    var a = 0;
    var b = 0;
//alert(V.length + "----" + U2.length);
    for (var iab = 1; iab < nAB; iab++) {
//alert("1. iab=" + iab);
        a = iab / nAB;
        b = 1 - a;

        var newSum = 0.0;
        V[left + 1 - v0 + 1] = U2[left - u20 + 1];
        for (c = left + 2; c <= right; c++) {
            V[c - v0 + 1] = a * U2[c - 1 - u20 + 1] + b * V[c - 1 - v0 + 1];
            var dd = -Math.log(V[c - v0 + 1]) - U2[c - u20 + 1] / (V[c - v0 + 1]);
            newSum = newSum + dd;
        }
//alert("2. iab=" + iab + " sum=" + sum + " a=" + a);
        if (newSum > sum) {
            aMax = a;
            sum = newSum;

        }
    }

    pMax = 2 / aMax - 1;
    a = aMax;
    b = 1.0 - a;
    V[left + 1 - v0 + 1] = U2[left - u20 + 1];
    for (c = left + 2; c <= right; c++) {
        V[c - v0 + 1] = a * U2[c - 1 - u20 + 1] + b * V[c - 1 - v0 + 1];
    }

    d = getCoef() * 100.0;//coef*100
    for (i = 1; i < V.length; i++) {
        V[i] = d * Math.sqrt(V[i]);
    }
    /////////// save found p for updates (and for garch)
    pFound = pMax;

    return [V, pFound];
}
function aEWVOldOld(vecPrice){//aEWV(c) -annualized exponential weightes volatility (EWMA from Hull)
    if (vecPrice.length < 4) throw "number of data points should be > 2";
    var c = 0, i = 0;

    var S = [];
    for (i = 0; i < vecPrice.length; i++)
    {
        S.push(vecPrice[i]);
    }
    var left = (S[0] + 1);
    var right = (S[0] + S.length - 2);
    var U2 = [];
    var u20 = left;
    U2.push(u20);
    var d = 0;
    var d1 = 0;
    for (c = left; c <= right; c++)//DS[c]=v[c-v[0]+1]
    {
        var s0 = S[0];
        d1 = S[c - 1 - s0 + 1];
        d = S[c - s0 + 1];
        var u = (d - d1) / d1;
        var u2 = u * u;
        U2.push(u2);
    }

    var V = [];
    var v0 = left + 1;
    V.push(v0);
    for (c = left + 1; c <= right; c++)
    {
        var empty;
        V.push(empty);
    }
    var sum = -1.7e308;
    var pMax = 2;
    var a = 0;
    var b = 0;
    for (var p = 2; p < S.length - 1; p++)
    {
        a = 2.0 / (p + 1.0);
        b = 1.0 - a;
        var newSum = 0.0;
        V[left + 1 - v0 + 1] = U2[left - u20 + 1];
        for (c = left + 2; c <= right; c++)
        {
            V[c - v0 + 1] = a * U2[c - 1 - u20 + 1] + b * V[c - 1 - v0 + 1];
            var dd = -Math.log(V[c - v0 + 1]) - U2[c - u20 + 1] / (V[c - v0 + 1]);
            newSum = newSum + dd;
        }
        if (newSum > sum)
        {
            pMax = p;
            sum = newSum;
        }
    }

    a = 2.0 / (pMax + 1.0);
    b = 1.0 - a;
    V[left + 1 - v0 + 1] = U2[left - u20 + 1];
    for (c = left + 2; c <= right; c++)
    {
        V[c - v0 + 1] = a * U2[c - 1 - u20 + 1] + b * V[c - 1 - v0 + 1];
    }

    d = getCoef() * 100.0;//coef*100
    for (i = 1; i < V.length; i++)
    {
        V[i] = d * Math.sqrt(V[i]);
    }
    /////////// save found p for updates (and for garch)
    pFound = pMax;

    return [V,pFound];
}
function aEWV(vecPrice) {//aEWV(c) -annualized exponential weightes volatility (EWMA from Hull)
    var c = compressOne(vecPrice, vecPrice);
    var result=aEWVOld(c);
    var vOld = result[0];
    var pFound = result[1];
    if (c.length == vecPrice.length) return [vOld,pFound];////////////////////////////////
//alert("pFoundaEWV=" + pFound);
    return [decompressOne(vOld, vecPrice), pFound];
}
function aEWV0(vecPrice) {//aEWV(c) -annualized exponential weightes volatility (EWMA from Hull)
    if (isMatrix(vecPrice)) return oneMatrix(aEWV0, "", vecPrice);
    var c = compressOne(vecPrice, vecPrice);
    var result = aEWVOld(c);
    var vOld = result[0];
    var pFound = result[1];
    if (c.length == vecPrice.length) return [vOld, pFound];////////////////////////////////
    //alert("pFoundaEWV=" + pFound);
    return decompressOne(vOld, vecPrice);
}
function emv(vecPrice, vP) {
    var vC = compressOne(vecPrice, vecPrice);

    var p = vP[0];
    var N = vC.length - p;

    var vN = [];
    vN.push(vN);

    var answer = [];
    var pFound = 0;

var idx=1*vC[0]+p-1;
//alert("1*vC[0]+p-1="+idx+ " N="+N);

    answer.push(1*vC[0]+p-1);
    for (var i = 0; i < N; i++) {
        var vLeft=[];
        vLeft.push(i);
        var vRight=[];
    //    vRight.push(N - i + 1);
        vRight.push(N - i);
        var cut = cutOld(vLeft, vC, vRight);


        var result = aEWVOld(cut);
        var vOld = result[0];
        var dLastPoint = vOld[vOld.length - 1];
//alert("i=" + i + "    " + vLeft[0] + " " + vC.length + " " + vRight[0] + "  dLastPoint=" + dLastPoint);
        answer.push(dLastPoint);
        pFound = result[1];
    }

//alert("pFoundEMV=" + pFound);
    if (vC.length == vecPrice.length) return answer;////////////////////////////////
    return decompressOne(answer, vecPrice);
}
function aEVOld(vecPrice, nA, dGamma, nShift) {//aEV - annualized exponential volatility nA=101, dGamma=0, nShift=1
    if (vecPrice.length <= 3) throw new "Number of data points should be > 2";
    var i, iA;
    var N = (vecPrice.length - 1) - 1;
    var p0 = vecPrice[0];
    var prevC = vecPrice[p0 - p0 + 1];
    var C = vecPrice[p0 + 1 - p0 + 1];
    var u = (C - prevC) / prevC;
    var u2 = u * u;
    var sumU2 = u2;
    var LT = u2;
    var v = 0.0;
    var sig = 0.0;
    var aV = [];// aV - v foreach alpha,
    var aSig = []; // aSig - sum for each alpha, ...
    for (iA = 0; iA < nA; iA++)
    {
        //	aV[iA]=u2;
        //	aSig[iA]=0.0;
        aV.push(u2);
        aSig.push(0.0);
    }

    var Alpha = new Array(N - 1);
    var V = new Array(N - 1);
    var Sig = new Array(N - 1);//answers
    for (i = 0; i < N - 1; i++)
    {
        Alpha.push(0.0);
        V.push(0.0);
        Sig.push(0.0);
    }

    for (i = 2; i <= N; i++)
    {
        prevC = vecPrice[p0 + i - 1 - p0 + 1];
        C = vecPrice[p0 + i - p0 + 1];
        u = (C - prevC) / prevC;
        sumU2 = sumU2 + u * u;
        LT = sumU2 / i;//current
        if (nShift == 1) u2 = u * u;//use today's u2 instead of yesterday's
        for (iA = 0; iA < nA; iA++)
        {
            var dAlpha = iA * (1.0 - dGamma) / (nA - 1.0);

            v = dGamma * LT + dAlpha * u2 + (1.0 - dAlpha - dGamma) * aV[iA];

            if (aV[iA] != 0.0)
                sig = aSig[iA] - Math.log(aV[iA]) - u2 / aV[iA];
            else sig = aSig[iA];

            aV[iA] = v;
            aSig[iA] = sig;
        }
        //u2=u*u;//current value in the end
        Alpha[i - 2] = 1.0 - dGamma;
        V[i - 2] = u2;
        Sig[i - 2] = 0.0;
        // run alpha, find Alpha[i-2], V[i-2], Sig[i-2]
        var dSigMax = -1.7e308;
        var deltaA = (1.0 - dGamma) / (nA - 1.0);
        var dAlphaR = 0.0;
        var dAlphaRFound = 0.0;
        for (iA = 0; iA < nA; iA++)
        {
            dAlphaR = iA * deltaA;
            var vR = aV[iA];
            var sigR = aSig[iA];
            if (sigR > dSigMax)
            {
//if (i % 50 == 0) alert("i=" + i + " iA=" + iA + " sigR=" + sigR + " dSigMax=" + dSigMax + " dAlphaR=" + dAlphaR);
                dSigMax = sigR;
                V[i - 2] = vR;
                Alpha[i - 2] = dAlphaR;
                dAlphaRFound = dAlphaR;
            }
        }
      //  var dDebug = Alpha[i - 2];
        //  var nDebug = i;
//       if(i%50==0 || i==N){
//            var pF=2.0 / dAlphaRFound - 1.0
 //           alert("i=" + i+" pF =" +pF );
  //      }


        u2 = u * u;//current value
    }

    //var d=100.0*getCoef();
    var d = getCoef() * 100.0;//coef*100

    var left = p0 + 2;
    var Y = [];
    Y.push(left);
    for (i = 0; i < N - 1; i++)
    {
        var D = V[i];
        if (D <= 0.0)
        {
            D = 0.00000000001;
        }
        Y.push(d * Math.sqrt(D));
    }
    /////////// save found p for updates (and for garch)
  
//    var a = Alpha[Alpha.length - 1];
 //   var pFound = 2.0 / a - 1.0;

    var pFound = 2.0 / dAlphaRFound - 1.0
   // alert(" pFound =" + pFound);
   // return Y;
    return [Y, pFound];
}
function aEV(vecPrice, nA, dGamma, nShift) {//aEWV(c) -annualized exponential weightes volatility (EWMA from Hull)
    var c = compressOne(vecPrice, vecPrice);
    var result = aEVOld(c, nA, dGamma, nShift);
    var vOld = result[0];
    var pFound = result[1];
   // alert("pFound=" + pFound);
    if (c.length == vecPrice.length) return [vOld,pFound];////////////////////////////////
    return [decompressOne(vOld, vecPrice), pFound];
}
////////////////////////////////////////////////////////////////////
function aEV0(vecPrice) {//aEWV(c) -annualized exponential weightes volatility (EWMA from Hull)

    if (isMatrix(vecPrice)) return oneMatrix(aEV0, "", vecPrice);

    var nA = 101;
    var dGamma = 0;
    var nShift = 1;

    var c = compressOne(vecPrice, vecPrice);
    var result = aEVOld(c, nA, dGamma, nShift);
    var vOld = result[0];
    var pFound = result[1];
    // alert("pFound=" + pFound);
    if (c.length == vecPrice.length) return [vOld, pFound];////////////////////////////////
    return decompressOne(vOld, vecPrice);
}
////////////////////////////////////////////////////////////////////
/*
var add = function (a, b) {
    return a+b;
}
var subtract = function (a, b) {
    return a-b;
}

var handle_data = function (func) {
    // get data from user or other external source
    var x = 2;
    var y = 3;
    return func(x, y);
}
console.log(handle_data(add));       // 5
console.log(handle_data(subtract));  // -1
*///////////////////////////////////////////////////////

//public delegate double myfunk(List<double> ptry, ref List<double> vecPrice);
//function funk1( ptry,vecPrice)
 var funk1 = function(ptry,vecPrice)
{/*
    // test function
     var y0 = [0, 0.15, 30];
     var f = 0.0;
     var nSize = ptry.length;
     for (var i = 1; i < nSize; i++) {
         f = f + (ptry[i] - y0[i]) * (ptry[i] - y0[i]);
     }
     return f;
     */

    var nShift = 0;//traditionally
    //unsigned long row=indicatorRow;
    if (ptry.length < 3) throw new Exception("wrong demension...");
    var Gamma = ptry[1];
    var p = ptry[2];

    if (vecPrice.length < 4) throw new Exception("number of data points should be > 2");

    //// calculate lomg run (sample) volatility VL:
    var c = 0;
  //  var S = insert(vecPrice);
    var S = vecPrice;
    var left = S[0] + 1;
    var right = S[0] + S.length - 2;
    var U2 =[];
    U2.push(left);
    var VL = 0;// Long term volatility
    for (c = left; c <= right; c++)//DS[c]=v[c-v[0]+1]
    {
        var s0 = S[0];
        var d1 = S[c - 1 - s0 + 1];
        var d = S[c - s0 + 1];
        var u = (d - d1) / d1;
        var u2 = u * u;
        U2.push(u2);
        VL = VL + u2;
    }
    VL = VL / (right - left + 1.0);

    var a = (1.0 - Gamma) * 2.0 / (p + 1.0);
    var b = (1.0 - Gamma) * 1.0 - a;

    if (Gamma < 0 || p > vecPrice.length - 1 || a <= 0.0 || b <= 0)
    {
 //alert("out od boundaries: Gamma=" + Gamma + " p=" + p + " a=" + a + " b=" + b + " vecPrice.length=" + vecPrice.length);
        return -1.7e308;//boundaries +/- ????
    }
    var V = [];
    V.push(left + 1);
    V.push(U2[left - U2[0] + 1]);
    var u20 = U2[0];
    var v0 = V[0];
    var newSum = 0.0;
    for (c = left + 2; c <= right; c++)//DS[c]=v[c-v[0]+1] -> U2[c]=v[c-v[0]+1]
    {
        if (nShift == 1)
        {
            V.push(Gamma * VL + a * U2[c - u20 + 1] + b * V[c - 1 - v0 + 1]);
        }
        else
            V.push(Gamma * VL + a * U2[c - 1 - u20 + 1] + b * V[c - 1 - v0 + 1]);

        var d = -Math.log(V[c - v0 + 1]) - U2[c - u20 + 1] / V[c - v0 + 1];
        newSum = newSum + d;
    }
    return -newSum / (right - left - 2.0 + 1.0);// sign (-) because we are looking for maximum, not minimum
}
var amotry1 = function( p,  y,  psum,
      ndim,  funk,
      ihi,  fac, vecPrice)
// C:double DataSet::amotry1(std::vector<std::vector<double> >& p, double y[], std::vector<double>& psum, int ndim, double (DataSet::*myfunk)(std::vector<double>,std::vector<double>&), 
                      //    int ihi, double fac, std::vector<double>& vecPrice)
//private double amotry1(ref List<List<double>> p, List<double> y, ref List<double> psum,
   // int ndim, myfunk funk,
   // int ihi, double fac, ref List<double> vecPrice)
//Extrapolates by a factor fac through the face of the simplex across from the high point, 
//tries it, and replaces the high point if the new point is better.
{
    var j;
    var fac1, fac2, ytry;
    var ptry = [];
    for (j = 0; j < 1 + ndim; j++)//ptry(1+ndim);
    {
        ptry.push(0.0);
    }
    fac1 = (1.0 - fac) / ndim;
    fac2 = fac1 - fac;
    for (j = 1; j <= ndim; j++) {
        ptry[j] = psum[j] * fac1 - p[ihi][j] * fac2;
    }

    ytry = funk(ptry, vecPrice); //Evaluate the function at the trial point.
    if (ytry < y[ihi]) { //If it's better than the highest, then replace the highest.
        y[ihi] = ytry;
        for (j = 1; j <= ndim; j++) {
            psum[j] = psum[j] + ptry[j] - p[ihi][j];
            p[ihi][j] = ptry[j];
        }
    }
    return ytry;
}
var amoeba1=function(p, y,  ndim,  ftol,
			myfunk, 
			nfunk, vecPrice)//  int *nfunk
    //c:: void DataSet::amoeba1(std::vector<std::vector<double> >& p, double y[], int ndim, double ftol,double (DataSet::*myfunk)(std::vector<double>,
			// std::vector<double>&), int *nfunk, std::vector<double>& vecPrice)
//private void amoeba1(ref List<List<double>> p, List<double> y, int ndim, double ftol,
   // myfunk funk, ref int nfunk, ref List<double> vecPrice)
//Multidimensional minimization of the function funk(x) where x[1..ndim] is a vector in ndim
//dimensions, by the downhill simplex method of Nelder and Mead. 
//The matrix p[1..ndim+1][1..ndim] is input. 
//Its ndim+1 rows are ndim-dimensional vectors which are the vertices of the starting simplex. 
//Also input is the vector y[1..ndim+1], whose components must be preinitialized
//to the values of funk evaluated at the ndim+1 vertices (rows) of p; 
//and ftol the fractional convergence tolerance to be achieved in the function value (n.b.!). 
//On output, p and y will have been reset to ndim+1 new points all within ftol of a minimum function value, and
//nfunk gives the number of function evaluations taken.
{
    var TINY = 1.0e-17;// A small number.
    var NMAX = 5000; //Maximum allowed number of function evaluations.
    var i, ihi, ilo, inhi, j;
    var mpts = ndim + 1;
    var rtol, sum, swap, ysave, ytry;
    //psum=vector(1,ndim);
    var psum = [];
    for (j = 0; j < 1 + ndim; j++)//psum(1+ndim);
    {
        psum.push(0.0);
    }
    //*nfunk=0;
    nfunk = 0;
    //GET_PSUM
    for (j = 1; j <= ndim; j++) {
        for (sum = 0.0, i = 1; i <= mpts; i++) sum += p[i][j];
        psum[j] = sum;
    }
    //return;
    for (; ;) {
        ilo = 1;
        ihi = y[1] > y[2] ? (inhi = 2, 1) : (inhi = 1, 2);
        for (i = 1; i <= mpts; i++) {
            if (y[i] <= y[ilo]) ilo = i;
            if (y[i] > y[ihi]) {
                inhi = ihi;
                ihi = i;
            } else if (y[i] > y[inhi] && i != ihi) inhi = i;
        }
        rtol = 2.0 * Math.abs(y[ihi] - y[ilo]) / (Math.abs(y[ihi]) + Math.abs(y[ilo]) + TINY);
        //Compute the fractional range from highest to lowest and return if satisfactory.
        if (rtol < ftol) { //If returning, put best point and value in slot 1.
            //SWAP(y[1],y[ilo])
            { swap = y[1]; y[1] = y[ilo]; y[ilo] = swap; }
            for (i = 1; i <= ndim; i++) {
                //	SWAP(p[1][i],p[ilo][i])
                {
                    swap = p[1][i];
                    p[1][i] = p[ilo][i];
                    p[ilo][i] = swap;
                }
            }
            //alert("1. p=" + p);
            break;
        }
        if (nfunk >= NMAX) {
            //alert("Takes too much time to calculate");
            return p;//Something wrong (debug later)
            throw "Takes too much time to calculate";
        }
        nfunk = nfunk + 2;
        //Begin a new iteration. First extrapolate by a factor -1 through the face of the simplex
        //across from the high point, i.e., reflect the simplex from the high point.
        // return;				
        ytry = amotry1(p, y, psum, ndim, funk1, ihi, -1.0, vecPrice);
        // return;
        if (ytry <= y[ilo]) {	//Gives a result better than the best point, so try an additional extrapolation by a factor 2.
            ytry = amotry1(p, y, psum, ndim, funk1, ihi, 2.0, vecPrice);
        }
        else if (ytry >= y[inhi]) {

            //	The reflected point is worse than the second-highest, so look for an intermediate
            //	lower point, i.e., do a one-dimensional contraction.
            ysave = y[ihi];
            ytry = amotry1(p, y, psum, ndim, funk1, ihi, 0.5, vecPrice);
            //return;		            
            if (ytry >= ysave) { //Can't seem to get rid of that high point. Better contract around the lowest (best) point. 
                for (i = 1; i <= mpts; i++) {
                    if (i != ilo) {
                        for (j = 1; j <= ndim; j++)
                            p[i][j] = psum[j] = 0.5 * (p[i][j] + p[ilo][j]);
                        y[i] = funk1(psum, vecPrice);
                        //alert("2. p=" + p);
                    }
                }
                //return;
                nfunk = nfunk + ndim; //Keep track of function evaluations.
                //GET_PSUM  //Recompute psum.
                for (j = 1; j <= ndim; j++) {
                    for (sum = 0.0, i = 1; i <= mpts; i++) sum = sum + p[i][j];
                    psum[j] = sum;
                }
                //return; 
            }
        }
        else nfunk--; //Correct the evaluation count.
    }// Go back for the test of doneness and the next iteration. 
    return p;
}
function GARCHOld(vecPrice)
  //  function GARCH(vecPrice)
//	std::vector<double> DataSet::GARCH(std::vector<double>& vecPrice, std::vector<double>& vecPFound, std::vector<double>& vecGammaFound)
//private List<double> GARCH(ref Dictionary<string, List<string>> htStr2Info, ref List<double> vecPrice, ref List<double> vecPFound, ref List<double> vecGammaFound)
{
    
 //   vecPrice = insert(vecPrice);
        //////////// use aEWV to find start p
        var nShift = 0;
      var res = aEWV(vecPrice, 101, nShift, 1);

  // var res = aEWVOld(vecPrice);

        var pFound = res[1];
        var pEW = pFound;
    
        ////////////
    var gammaStart = 0.01;


    var ndim = 2;
    var nfunk = 0;
    var p = [];// 4 times xy
    //  var xy = [];//0,1,2 dum,Gamma,p
    var y = [];//0,1,2,3 values of funk1


    var xy1 = [10, 10, 10];
    p.push(xy1);//one
    y.push(10.0);//dum

    var xy2 = [0, 0, pEW - 1];
    p.push(xy2);//two
    y.push(funk1(xy2, vecPrice));

    var xy3 = [0, 0, pEW + 1];
    p.push(xy3);//three
    y.push(funk1(xy3, vecPrice));

    var xy4 = [0, gammaStart, pEW];
    p.push(xy4);//four
    y.push(funk1(xy4, vecPrice));

    var y0 = y[0], y1 = y[1], y2 = y[2], y3 = y[3];
    //alert("ys: "+y0 + " " + y1 + " " + y2 + " " + y3);
    // myfunk f = new myfunk(funk1);
    //  var f = funk1;

    //alert("before amoeba1 p: "+p);

    p = amoeba1(p, y, ndim, 0.00001, funk1, nfunk, vecPrice);
    var Gamma = p[3][1];
    var dp = p[3][2];
  //  alert("Gamma=" + Gamma + "dp=" + dp);
    // save it for updates


    if (dp > vecPrice.length - 2) {
        dp = vecPrice.length - 1;

    }



    var vecGammaFound=[];
    var vecPFound=[];
    vecGammaFound.push(p[1][1]);//Gamma
    vecPFound.push(p[1][2]);//dp
    vecGammaFound.push(p[2][1]);//Gamma
    vecPFound.push(p[2][2]);//dp
    vecGammaFound.push(p[3][1]);//Gamma
    vecPFound.push(p[3][2]);//dp

    if (vecPrice.length < 4) throw "number of data points should be > 2";

    var c = 0;
    var S = vecPrice;
    var left = S[0] + 1;
    var right = S[0] + S.length - 2;
    var U2 = [];
    U2.push(left);
    var VL = 0;// Long term volatility
    for (c = left; c <= right; c++)//DS[c]=v[c-v[0]+1]
    {
        var s0 = S[0];
        var d1 = S[c - 1 - s0 + 1];
        var d0 = S[c - s0 + 1];
        var u = (d0 - d1) / d1;
        var u2 = u * u;
        U2.push(u2);
        VL = VL + u2;
    }
    VL = VL / (right - left + 1.0);

    var a = (1.0 - Gamma) * 2.0 / (dp + 1.0);
    var b = (1.0 - Gamma) * 1.0 - a;

//alert("left=" + left + " right=" + right + " U2.length=" + U2.length);

    var V = [];
    V.push(left + 1);
    V.push(U2[left - U2[0] + 1]);
    for (c = left + 2; c <= right; c++)//DS[c]=v[c-v[0]+1] -> U2[c]=v[c-v[0]+1]
    {
        if (nShift == 1)
            V.push(Gamma * VL + a * U2[c - U2[0] + 1] + b * V[c - 1 - V[0] + 1]);
        else
            V.push(Gamma * VL + a * U2[c - 1 - U2[0] + 1] + b * V[c - 1 - V[0] + 1]);
    }
//alert("left=" + left + " right=" + right + " V.length=" + V.length + " U2.length=" + U2.length);
    //var d=100.0*getCoef();
    var d = getCoef() * 100.0;//coef*100

    var Y = [];
    Y.push(V[0]);
    for (var i = 1; i < V.length; i++)
    {
        var D = V[i];
        if (D <= 0.0)
        {
            D = 0.00000000001;
        }
//alert("i=" + i + " d=" +d +" D=" + D+"V[i]=" + V[i]);
        Y.push(d * Math.sqrt(D));
    }
//alert("Y.length=" + Y.length);
    return [Y,vecGammaFound,vecPFound];
}
function GARCH(vecPrice) {
  //  alert("in GARCH");
    var c = compressOne(vecPrice, vecPrice);
    var result = GARCHOld(c);
    var vOld = result[0];

    var vecGammaFound = result[1];
    var vecPFound = result[2];
    if (c.length == vecPrice.length) return [vOld,vecGammaFound,vecPFound];////////////////////////////////
    return [decompressOne(vOld, vecPrice),vecGammaFound,vecPFound];
}
/*
        private List<double> aPV(ref Dictionary<string, List<string>> htStr2Info, ref List<double> vecPrice, int n)
        {
            if (vecPrice.length < 4) throw new Exception("number of data points should be > 2");
            //// calculate lomg run (sample) volatility VL:
            int c = 0;
            List<double> S = new List<double>(vecPrice);
            int left = S[0] + 1;
            int right = S[0] + S.length - 2;
            List<double> U2 = new List<double>(); ;
            U2.Add(left);
            double VL = 0;// Long term volatility
            for (c = left; c <= right; c++)//DS[c]=v[c-v[0]+1]
            {
                int s0 = S[0];
                double d1 = S[c - 1 - s0 + 1];
                double d0 = S[c - s0 + 1];
                double u = (d0 - d1) / d1;
                double u2 = u * u;
                U2.Add(u2);
                VL = VL + u2;
            }
            VL = VL / (right - left + 1.0);


            double d = getCoef(ref htStr2Info)[0] * 100.0;//coef*100

            List<double> vecPFound = new List<double>();
            List<double> vecGammmaFound = new List<double>();
            List<double> G = GARCH(ref htStr2Info, ref vecPrice, ref vecPFound, ref vecGammmaFound);
            double dLast = G[G.length - 1] / d;
            double dLast2 = dLast * dLast;
            // Gamma
            double Gamma = vecGammmaFound[vecGammmaFound.length - 1];


            // extra points
            //	V(k) = VL + (1-Gamma)**k*[dLast2 - VL)]
            //	P(k)=acc(V)/k
            //	V(3) = V + (tN2 – V)* (1 – ?)3,
            //	Vk= [V(1) + V(2) + … + V(k)]/k,

            List<double> P = new List<double>(G);
            double sum = 0.0;
            //double dC=100.0*getCoef();
            //std::vector<double> v1(n);
            double dC = d;
            for (int i = 0; i < n; i++)
            {
                sum = sum + VL + Math.Pow(1.0 - Gamma, (i + 1)) * (dLast2 - VL);
                P.Add(dC * Math.Sqrt(sum / (1.0 + i)));
            }
            return P;
        }
*/
function breakUp(v1, v2) {
    if (isMatrix(v1) || isMatrix(v2)) return compareMatrix(breakUp, "", v1, v2);
    //if(ref(-1,RSI)<70 & RSI>=70,1,0)
    //if(ref(-1,v1)<ref(-1,v2) & v1>=v2,1,0)
 //   var R1 = ref(-1, v1);
    var R1 = ref(v1, -1);
 //   alert("v1=" + v1);
  //  alert("R1=" + R1);
  //  var R2 = ref(-1, v2);
    var R2 = ref(v2, -1);
  //  alert("v2=" + v2);
  //  alert("v2.length=" + v2.length);
//    alert("R2=" + R2);
    var bR = Compare("Lt", R1, R2);
//return bR;
    var bV = Compare("Ge", v1, v2);
    var b1 = Compare("And", bR, bV);
    return ifCompare(b1, 1, 0);
}
function breakDn(v1, v2) {
    if (isMatrix(v1) || isMatrix(v2)) return compareMatrix(breakDn, "", v1, v2);
    //if(ref(-1,RSI)>70 & RSI<=70,1,0)
    //if(ref(-1,v1)>ref(-1,v2) & v1<=v2,1,0)
   // var R1 = ref(-1, v1);
    var R1 = ref(v1, -1);
   // var R2 = ref(-1, v2);
    var R2 = ref(v2, -1);
    var bR = Compare("Gt", R1, R2);
    var bV = Compare("Le", v1, v2);
    var b1 = Compare("And", bR, bV);
    return ifCompare(b1, 1, 0);
}

function camoUp(v1, v2, v3, v4) {//o,h,l,c
    //Sell alerts: if (c>ref(c,-1) AND c<o AND h>ref(th,-2),1,0)
    var N1 = v1.length;
    var N2 = v2.length;
    var N3 = v3.length;
    if (N2 != N1 || N3 != N1 || N1 < 2) throw " series should have the same number (>1) of terms";
    var th = TrueHigh(v2,  v4);
   // var tl = TrueLow(v3, v4);
  //  var RC = ref(-1, v4);
    var RC = ref(v4,-1);
  //  var RTH = ref(-2, th);
    var RTH = ref(th,-2);
    var b1 = Compare("Gt", v4, RC);// c>ref(c,-1)
    var b2 = Compare("Lt", v4, v1);// c<o
    var b3 = Compare("Gt", v2, RTH);// h>ref(th,-2)
    var b = Compare("And", b1, b2);
    b = Compare("And", b, b3);
    return ifCompare(b, 1, 0);
}
function camoDn(v1, v2, v3, v4) {
    //Buy alerts: if (c<ref(c,-1) AND c>o AND l<ref(tl,-2),1,0)
    var N1 = v1.length;
    var N2 = v2.length;
    var N3 = v3.length;
    if (N2 != N1 || N3 != N1 || N1 < 2) throw " series should have the same number (>1) of terms";
    //var th = TrueHigh(v2, v4);
    var tl = TrueLow(v3, v4);
   //  var RC = ref(-1, v4);
    var RC = ref(v4, -1);
   // var RTL = ref(-2, tl);
    var RTL = ref(tl,-2);
    var b1 = Compare("Lt", v4, RC);// c<ref(c,-1)
    var b2 = Compare("Gt", v4, v1);// c>o
    var b3 = Compare("Lt", v3, RTL);// l<ref(tl,-2)
    var b = Compare("And", b1, b2);
    b = Compare("And", b, b3);
    return ifCompare(b, 1, 0);
}
function fluctUp(v1, v2, v3) {//fluctUp(h,3,low)
    if (isMatrix(v1) || isMatrix(v3)) return compareMatrix(fluctUp, v2, v1, v3);
  //  Upper = delFluct(h,3)
    //   Lower = if(Upper<low,1,0)
    var Upper = delFluct(v1,v2);
    var b = Compare("Lt", Upper, v3);
    return ifCompare(b, 1, 0);
}
function fluctDn(v1, v2, v3) {
    if (isMatrix(v1) || isMatrix(v3)) return compareMatrix(fluctDn, v2, v1, v3);
    //  AlertUp = delFluct(low,3)
    //  AlertDn = if(Lower>h,1,0)
    var Lower = delFluct(v1, v2);
    var b = Compare("Gt", Lower, v3);
    return ifCompare(b, 1, 0);
}
function stop(v1, v2, v3, v4) {//PNL,loss,gain,span


    var nStart = v1[0];
    var loss = fromVNtoN(v2);
    var gain = fromVNtoN(v3);
    var nSpan = fromVNtoN(v4);
    var v = [nStart];

    var iFound = 0;
    var last = 0;
    var delay = 0;
    for (var i = 1; i < v1.length; i++) {
        if (iFound == 0) v.push(v1[i]);
        else v.push(last);
        if (v1[i] == 0 || isNaN(v1[i])) delay++;
        if (isNaN(v1[i])) continue;
        if (iFound == 0 &&(v1[i] < loss && loss!=0 || v1[i] > gain && gain!=0 || i > nSpan+delay && nSpan!=0)){
            iFound = i;
            last = v1[i];
        }

    }

    return v;

}
/*
function stopBad(v1, v2, v3, v4) {//PNL,loss,gain,span
    var v = [];

    var nSpan = v4;
    if (!(typeof v4 === 'number') && v4.length == 1) nSpan = v4[0];
    else throw " usage: stop(PNL, -0.3*c, 0.4*c, 180)";




    var b1 = true;
    if (typeof v1 === 'number') b1 = false;
    var b2 = true;
    if (typeof v2 === 'number') b2 = false;
    var b3 = true;
    if (typeof v3 === 'number') b3 = false;

  //  alert("b1=" + b1 + "b2=" + b2 + "b3=" + b3);

    var nStart1;
    if (b1) nStart1 = Number(v1[0]);
    else nStart1 = v1;
    var nStart2;
    if (b2) nStart2 = Number(v2[0]);
    else nStart2 = v2;
    var nStart3;
    if (b3) nStart3 = Number(v3[0]);
    else nStart3 = v3;

    var nEnd1 = nStart1;
    if (b1) nEnd1 = nStart1 + v1.length;
    var nEnd2 = nStart2;
    if (b2) nEnd2 = nStart2 + v2.length;
    var nEnd3 = nStart3;
    if (b3) nEnd3 = nStart3 + v3.length;

    var nStart = nStart1;
    if (b2 && v2.length > 1) nStart = Math.max(nStart, nStart2);
    if (b3 && v3.length > 1) nStart = Math.max(nStart, nStart3);

    var nEnd = nEnd1;
    if (b2 && v2.length > 1) nEnd = Math.min(nEnd, nEnd2);
    if (b3 && v3.length > 1) nEnd = Math.min(nEnd, nEnd3);

    //alert(" nStart1=" + nStart1 + " nStart2=" + nStart2 + " nStart3=" + nStart3 + " nStart=" + nStart + " nEnd1=" + nEnd1 + " nEnd2=" + nEnd2 + " nEnd3=" + nEnd3 + " nEnd=" + nEnd);

    if (nEnd < nStart) throw "Empty result.";
    v.push(1 * nStart);
    var indexStart=0;
    var indexEnd = 0;
    var last = 0;
   // alert("v1=" + v1);
    var empty;
    var delay = 0;//12/2/2017
    for (var i = nStart + 1; i < nEnd; i++) {
        if (delay == 0 && 1*v1[i - nStart1]> 0) {
            delay = i-nStart1;// //12/2/2017
            alert("delay=" + delay+" nSpan="+nSpan);
        }
        var d1;
        if (b1) d1 = v1[i - nStart1];
        else d1 = v1;
        var d2;
        if (b2 && v2.length > 1) d2 = v2[i - nStart2];
        else d2 = v2;
        var d3;
        if (b3 && v3.length > 1) d3 = v3[i - nStart3];
        else d3 = v3;

        //alert("i=" + i + "d1=" + d1 + "d2=" + d2 + "d3=" + d3);
        //  if (isNaN(d1) || isNaN(d2) || isNaN(d2)) {
        if (isNaN(d1) && isNaN(d2) && isNaN(d2)) {
            v.push(empty);
        }
        else {
       //     if (d1) v.push(d2);
       //     else v.push(d3);
            if (indexStart == 0 && d1 != 0) indexStart = i;
            if ((d1 <= d2 || d1 >= d3) && indexEnd == 0 && last==0) {
                indexEnd = i;
                last = d1;
            }
            if (indexStart != 0 && i - indexStart > nSpan && last == 0) {
          //  if (indexStart != 0 && i - indexStart > nSpan - delay && last == 0) {//  //12/2/2017
                indexEnd = i;
                last = d1;
            }

//alert("i=" + i + "d1=" + d1 + "d2=" + d2 + "d3=" + d3 + "indexStart=" + indexStart + "indexEnd=" + indexEnd);
            if (indexStart == 0) {
                v.push(0);
            }
            else if (indexEnd == 0) {
                    v.push(d1);
            }
            else v.push(last);
        }
    }
    return v;

}
*/
function cci(v1, v2, v3, v4, v5, v6) {//Commodity Channel Index: cci(h,low,c,13,0.015,6)
    // AP = (high+low+close)/3,
    // ESA = sma(AP,13),
    // D = sma(abs(AP-ESA),13),
    // CI = (AP-ESA)/(0.015*D),
    // TCI = sma(CI, 6),

    if (isMatrix(v1) || isMatrix(v2) || isMatrix(v3)) return func32Matrix(cci, v1, v2, v3, [[v4[0]], [v5[0]], [v6[0]]]);

    var n13 = v4;
    if (!(typeof v4 === 'number')){
        if(v4.length == 1) n13 = v4[0];
        else throw " usage: cci(h,low,c,13,0.15,6)";
    }
    var n015 = v5;
    if (!(typeof v5 === 'number')){
        if (v5.length == 1) n015 = v5[0];
        else throw " usage: cci(h,low,c,13,0.15,6)";
    }
    var n6 = v6;
    if (!(typeof v6 === 'number')) {
        if (v6.length == 1) n6 = v6[0];
        else throw " usage: cci(h,low,c,13,0.15,6)";
    }

    var AP = arithm('+', v1, v2);
    AP = arithm('+', AP, v3);
    AP = arithm('/', AP, 3);
    var ESA = sma(AP, n13);
    var Dif = arithm('-', AP, ESA);
    var D = one(Dif, "abs");
    D = sma(D, 13);
    var CI = arithm('*', n015, D);
    CI = arithm('/', Dif, CI);
    return sma(CI, 6);

}
function pnl(v1, v2, v3, v4) {//pnl(Buy,Sell,c,0.01)  wrong approach ( pNL is OC
 //   Status = acc(Buy - Sell)
//    N = acc(Buy + Sell)
//    CashF = acc(c * Sell - c * Buy)
//    PNL = CashF + c * Status - 0.01 * N
    var comms = v4;
    if (!(typeof v4 === 'number')) {
        if (v4.length == 1) comms = v4[0];
        else throw " usage: pnl(Buy,Sell,c,0.01)";
    }

    var Dif=arithm('-',v1,v2);
    var Status = acc(Dif);
    var Sum = arithm('+', v1, v2);
    var N = acc(Sum);

    var CashF = arithm('*', v3, Dif);
    CashF = acc(CashF);
    CashF = arithm('*', -1, CashF);
   // return CashF;

    var PNL = arithm('*', v3, Status);
    PNL = arithm('+', CashF, PNL);
    var Comms = arithm('*', comms, N);
    return arithm('-', PNL, Comms);
}
function npNL(Status, v3, v4) {//npnl(Status,c,0.01)//

    if (isMatrix(Status) || isMatrix(v3)) return compareMatrix(npNL, v4, Status, v3);
    // if (isMatrix(Status) && isMatrix(v3)) return pNLMatrix(pNL, v3, v4[0]);
    // D = ref(-1,Status)-Status;  the same as buy-sell
    //    PNL =acc(c*D)+c*Status-0.01*acc(abs(D))

    var comms = v4;
    if (!(typeof v4 === 'number')) {
        if (v4.length == 1) comms = v4[0];
        else throw " usage: npnl(Status,c,0.01)";//
    }

  /*  var D = [];
    {
        //   D = ref(-1, Status);// -1  

        //   D = cycleRef(-1, Status);////////////  // 12/1/2017
        //     D[1] = 0;///////////  // 12/1/2017
        D.push(Status[0]);
        D.push(Status[1]);// which is= 0
        // var R = ref(-1, Status);
        var R = ref(Status, -1);
        for (var i = 1; i < R.length; i++) {
            D.push(R[i]);
        }

    }
    D = arithm('-', D, Status);*/
    var D = arithm('-', ref(Status, -1), Status);
    var aD = one(D, "abs");
    aD = acc(aD);
    //alert(30+": aD=" + aD + " comms=" + comms);
    var PNL = arithm('*', comms, aD);// 0.01 * acc(abs(D)))
    //alert(40);
    var temp = arithm('*', v3, Status);// c*Status
    PNL = arithm('-', temp, PNL);
    temp = arithm('*', v3, D);// c*D
    temp = acc(temp);

    temp = arithm('+', temp, PNL);

    return arithm('/', temp, v3[1]);
}
function ffPNL(Buy,Sell,c,v4) {//pnl(Buy,Sell,c,0.01)
    //if (isMatrix(Buy) || isMatrix(Sell) || isMatrix(c)) return compareMatrix(pNL, v4, Status, v3);//???  3/22/2021
    var comms = v4;
    if (!(typeof v4 === 'number')) {
        if (v4.length == 1) comms = v4[0];
        else throw " usage: pnl(Buy,Sell,c,0.01)";
    }
    var prevPNL = 0;
    var flag = 0;
    var PNL = []; PNL[0] = c[0]; PNL[1] = 0;
    var start = Buy[0];
    var shift = start - c[0];
    if (Sell[0] != start) alert("error in Buy/Sell");
    var Status = []; Status[0] = c[0]; Status[1] = 0;
    var Money = []; Money[0] = c[0]; Money[1] = 0;
    for (var i = 1; i < shift; i++) {
        PNL[i] = 0;
        Status[i] = 0;
        Money[i] = 0;
    }  
    for (var i = shift + 1; i < c.length; i++) {
        var j = i - shift;
        if (Status[i-1] == 0) {
            if (Buy[j] == 1) {
                Status[i] = 1;
                Money[i] = Money[i - 1] - Status[i] * c[i] - comms * c[i];
                PNL[i] = PNL[i - 1] - comms * c[i];
            }
            else if (Sell[j] == 1) {
                Status[i] = -1;
                Money[i] = Money[i - 1] - Status[i] * c[i] - comms * c[i];
                PNL[i] = PNL[i - 1] - comms * c[i];
            }
            else {
                Status[i] = Status[i-1];
                Money[i] = Money[i - 1];
                PNL[i] = PNL[i - 1] + Status[i] * (c[i] - c[i - 1]);
            }  
        }
     /*   else {          
            if (PNL[i] >= 0 && (Buy[j] == 1 && Status[i - 1] != 1 || Sell[j] == 1 && Status[i - 1] != -1)) {
                Status[i] = -Status[i - 1];
                Money[i] = Money[i - 1] - 2 * Status[i] * c[i] - comms * c[i];
                PNL[i] = Money[i] + c[i] * Status[i];
            }
            else if(PNL[i]< 0 && (Sell[j] == 1 && Status[i - 1] != 1 || Buy[j] == 1 && Status[i - 1] != -1)){//Sell<=>Buy
                Status[i] = -Status[i - 1];
                Money[i] = Money[i - 1] - 2 * Status[i] * c[i] - comms * c[i];
                PNL[i] = Money[i] + c[i] * Status[i];
               // if (PNL[i] < 0 && flag != 0) { sign = -sign; flag = sign;}
            }*/
        else {
            if (j > 20 && PNL[PNL.length-1] < 0 && flag == 0) {
                for (n = 0; n < Buy.length; n++) {
                    temp = Buy[n];
                    Buy[n] = Sell[n];
                    Sell[n] = temp;
                    flag = 1;                  
                }

            }
            if (Buy[j] == 1 && Status[i - 1] != 1 || Sell[j] == 1 && Status[i - 1] != -1) {
                Status[i] = -Status[i - 1];
                Money[i] = Money[i - 1] - 2 * Status[i] * c[i] - comms * c[i];
                PNL[i] = Money[i] + c[i] * Status[i];
            }
            else {
                Status[i] = Status[i - 1];
                Money[i] = Money[i - 1];
                PNL[i] = PNL[i - 1] + Status[i - 1] * (c[i] - c[i - 1]);
            }
        }
        
    }
    return PNL;
}
function pNL(Status, v3, v4) {//pnl(Status,c,0.01)

    if (isMatrix(Status) || isMatrix(v3)) return compareMatrix(pNL, v4, Status, v3);
   // if (isMatrix(Status) && isMatrix(v3)) return pNLMatrix(pNL, v3, v4[0]);
    // D = ref(-1,Status)-Status;  the same as buy-sell
    //    PNL =acc(c*D)+c*Status-0.01*acc(abs(D))


    var comms = v4;
    if (!(typeof v4 === 'number')) {
        if (v4.length == 1) comms = v4[0];
        else throw " usage: pnl(Status,c,0.01)";
    }

 //   var D=[];
/*    if (Status[1] != 0) {// but it always the case now (Status[1] == 0)! // 12/1/2017
        var D = cycleRef(-1, Status);////////////
        D[1] = 0;///////////
    }
    else*/
//    {
     //   D = ref(-1, Status);// -1  

        
     //   D = cycleRef(-1, Status);////////////  // 12/1/2017
        //     D[1] = 0;///////////  // 12/1/2017
  //      D.push(Status[0]);
  //      D.push(Status[1]);// which is= 0
       // var R = ref(-1, Status);
 //       var R = ref(Status, -1);
  //      for (var i = 1; i < R.length; i++) {
   //         D.push(R[i]);
   //     }
        
   // }
  //  D = arithm('-', D, Status);
    var D = arithm('-', ref(Status, -1), Status);
    var aD = one(D, "abs");
    aD = acc(aD);
//alert(30+": aD=" + aD + " comms=" + comms);
    var PNL = arithm('*', comms, aD);// 0.01 * acc(abs(D)))
//alert(40);
    var temp = arithm('*', v3, Status);// c*Status
    PNL = arithm('-', temp, PNL);
    temp = arithm('*', v3, D);// c*D
    temp = acc(temp);

    return arithm('+', temp, PNL);
}
//function pnlPairBB(vnTable,v20,v2,vc1,vcomms){// pnlPairBB(0,20,2.0,c1, 0.01)
function pnlPairBB(v20,v2,vc1,vcomms,vnTable){// pnlPairBB(20,2.0,c1, 0.01,0)
    var nT=fromVNtoN(vnTable);
    var nStart=vc1[0];
    var nEnd=nStart+vc1.length-2;

    if (arSymbolList.length<2) throw "symbol 1 is not defined";
    var sName1=arSymbolList[1].toUpperCase();
    var arStockNames=[];  
    var arStockC=[];
    var arStatus=[];
    var arPNL=[];
 //   var arStatus1=[];
//    var arPNL1=[];
    var arColsNames=["Date"];


  //  alert("arSymbolList[1]="+arSymbolList[1]+" arParallelList.length="+arParallelList.length+" arAvailableStiocks.length="+arAvailableStiocks.length);
    for (var k = 0; k < arParallelList.length; k++) {
        var sName = arParallelList[k].toUpperCase();
 //alert("1. k="+k+" "+sName);
        //    var bFound = false;
        for (var i = 0; i < arAvailableStiocks.length; i++) {
 //alert("1. i="+i+" arAvailableStiocks[i][0][0]="+arAvailableStiocks[i][0][0]);
            if (sName == arAvailableStiocks[i][0][0]) {
              //  arStockNames.push(sName);
                arColsNames.push(sName);
                arColsNames.push("Sts");
                arColsNames.push("PNL");
                var arC = arAvailableStiocks[i][4];// c
                arStockC.push(arC);
//alert(sName+": arStockC.length="+arStockC.length);
                if (arC[0]<nStart) nStart=arC[0];
                if (arC[0]+arC.length-2>nEnd) nEnd = arC[0]+arC.length-2>nEnd;
               // alert(sName+": arC.length="+arC.length);
                var Ratio=arithm('/', arC, vc1);
                var Mid=sma(Ratio,v20);
                var Delta=mStDev(Ratio,v20);
                Delta=arithm('*', v2, Delta);
                var Upper=arithm('+', Mid, Delta);
                var Lower=arithm('-', Mid, Delta);
                var Sell = breakUp(Ratio,Upper);
                var Buy = breakDn(Ratio,Lower);


                var Status=bStatus([2],[-1],Sell,Buy);
                arStatus.push(Status);
                var PNL0=pNL(Status,arC,vcomms);
                arPNL.push(PNL0);
         //       var Status1=arithm('-', 0, Status);
        //        arStatus1.push(Status1);
       //         var PNL1=pNL(Status1,vc1,vcomms);
      //          arPNL1.push(PNL1);

//alert("2. k="+k+" "+sName);
                //    break;
        //        if(k==3)
                //    return arPNL[k];
            }
        }
    }

//alert("pnlPairBB: calculations are done");

    arColsNames.push(sName1);
    arColsNames.push("Sts1");
    arColsNames.push("PNL1");
    arColsNames.push("Invested");
    arColsNames.push("TotalPNL");


    var ar0=[];
    var a=[ar0];
    var arRowsNames=[arColsNames[0]];
    for(var i=nEnd;i>=nStart;i--){
        var arR=[];
        var s=""+dateDailyFromIndex(i);
      //  alert("s="+s);
        arRowsNames.push(s);
        a.push(arR);
     //   alert("0. a.length="+a.length);
    }
//alert("1. a.length="+a.length);
    var empty;// fill  table by  NaN
    for(var i=0;i<arRowsNames.length;i++){
        for (var col = 0; col < arColsNames.length; col++) {
            a[i].push(empty);
        }
    }

// alert("1. a[1].length="+a[1].length);

    // Set c, c_Sts, c_P
    var colGoldStock=3*arStockC.length+1;
    var colGoldStatus=colGoldStock+1;
//alert("arStockC.length="+arStockC.length+" colGoldStatus="+colGoldStatus);
    for (var col = 1; col < colGoldStatus; col++) {
//alert("col="+col);    
        var k= Math.floor((col-1)/3);
        var remainder = (col-1) % 3;
 //alert("col="+col+" k="+k+" remainder="+remainder)
 if(remainder==0 && col!=colGoldStock){// price  row=1<=> rStockC[k][rStockC[k].length-1]
            var L=arStockC[k].length;
            for (var row=1; row<L;row++){

                a[row][col]=arStockC[k][L-row];
            }
        }
        else if(remainder==1 && col!=colGoldStock){//status 
            var L=arStatus[k].length;
            for (var row=1; row<L;row++){
                a[row][col]=arStatus[k][L-row];
            }
        }
        else if(remainder==2 && col!=colGoldStock){//arPNL
            var L=arPNL[k].length;
            for (var row=1; row<L;row++){
                a[row][col]=arPNL[k][L-row];
            }    
        }
        else if (col==colGoldStock){// Gold price - vc1
            var L=vc1.length;
            for (var row=1; row<L;row++){
                a[row][col]=vc1[L-row];
            }
        }
    }
  //  alert("a.length="+a.length);
 //   alert("a[1].length="+a[1].length);
   // alert("a[1]="+a[1]);
 //   alert("a[2]="+a[2]);
   // alert("a[3]="+a[3]);




    // Gold Status
    var Status1=[];
    //var colGoldStatus=3*arStockC.length+1;
    var flag=0;
    for(var row=arRowsNames.length-1;row>0;row--){
        var sum=0; 
        var bFound=false;
        for(var col=2;col<colGoldStatus;col=col+3){
            var d=a[row][col];
            if(!isNaN(d)) {
                sum+=d;
                flag=1;
                bFound=true;
            }

        }
        if (flag==1 && bFound) a[row][colGoldStatus]=-sum;
    }

    
    for(var row=arRowsNames.length-1;row>0;row--){
        var d=a[row][colGoldStatus];




        if (Status1.length>0) {
            Status1.push(d);
        }
     /*   if (Status1.length==1) {
            alert("row="+row+" arRowsNames.length="+arRowsNames.length+" d="+d);
            alert("dateDailyFromIndex(row)="+dateDailyFromIndex(row));
        }*/
        if(!isNaN(d) && Status1.length==0){
            
            
   //     alert("row="+row+" colGoldStatus="+colGoldStatus+" d="+d+" Status1.length"+Status1.length);   

            //Status1[0]=arRowsNames.length-1-row;//??????  0<=>row=arRowsNames.length-1 1<=>row=arRowsNames.length-2
       
            Status1[0]=row+vc1[0];
// alert("dateDailyFromIndex(Status1[0])="+dateDailyFromIndex(Status1[0]));            
            
            Status1[1]=d;



        }
    }
//    alert("vc1[0]="+vc1[0]+" Status1="+ Status1);
  //  return[1];
   //  return Status1;

//return [4];OK
    //if(Status1.length>1) 
//alert(1);
  //  return Status1;
    // Gold PNL
    var PNL1=pNL(Status1,vc1,vcomms);
//alert(2);
    var colGoldPNL=colGoldStatus+1;


    var L=PNL1.length;
//alert("L="+L); 
    for (var row=1; row<L;row++){
        a[row][colGoldPNL]=PNL1[L-row];
    }
//alert(3);
  //  setTable(a, nT, arRowsNames, arColsNames); 
 //   return PNL1;

    // Invested 
    var colInvested=colGoldPNL+1;
    flag=0;
    for(var row=arRowsNames.length-1;row>0;row--){
        var sum=0; 
        var bFound=false;
        for(var col=1;col<colInvested;col=col+3){
            var d=a[row][col]*Math.abs(a[row][col+1]);
            if(!isNaN(d)) {
                sum+=d;
                flag=1;
                bFound=true;
            }
        }
        if (flag==1 && bFound) a[row][colInvested]=sum;
    }
//alert(4);
 //   setTable(a, nT, arRowsNames, arColsNames); 
 //   return [colInvested];
    // Total PNL


    var colTotalPNL=colInvested+1;

    flag=0;
    for(var row=arRowsNames.length-1;row>0;row--){
        var sum=0; 
        var bFound=false;
        for(var col=3;col<colTotalPNL;col=col+3){
            var d=a[row][col];
            if(!isNaN(d)) {
                sum+=d;
                flag=1;
                bFound=true;
            }
        }
        if (flag==1 && bFound) a[row][colTotalPNL]=sum;
    }
//alert(5);
    var totalPNL=[];
    var bFound=false;
    for(var row=arRowsNames.length-1;row>0;row--){
        var d=a[row][colTotalPNL];
        if(!isNaN(d)) {
            if(bFound==false) {
                totalPNL.push(nEnd-row);
                totalPNL.push(d);
            }
            bFound=true;
            totalPNL.push(d);
        }
        if(bFound && isNaN(d))  totalPNL.push(d);
    }
    //alert(6);
    //alert(a);
//return a;
    setTableWithWidth(a, nT, arRowsNames, arColsNames, 10);


    return totalPNL;
}
function stockFromTable(n) {
    // 0.Date	1.Open	2.High	3.Low	4.Close	5.Volume	
    //6.Ex-Dividend	7.Split 8.Ratio	9.Adj. Open	10.Adj. High	11.Adj. Low	12.Adj. Close	13.Adj. Volume
    var empty;
    var arStock = [];// local  //[[name],[arDate],[arOpen],ar[High],[arLow],[arClose],[arVolume]]
 //   for (var m = 0; m < 6; m++) {
    for (var m = 0; m <7; m++) {
        var field = [];
        arStock.push(field);
    }
//alert("arStock.length=" + arStock.length);
    //  name =n?

    var s = arTexts[n];
    var rows = s.split("\n");
    var N = rows.length;
    var indexStart = 0;
    var iStart = 0;
    var NLast = N;
    if (isNaN(rows[0][0])) {// "Date Open ...
//alert("rows[0][0]=" + rows[0][0]);
        iStart++;
        indexStart++;
        NLast--;
    }
//alert("N+" + N);
    var prevIndex = 0;
    var Diff = 0;


  //  for (var i = 0; i < N-1; i++) {// N-1 to remove first row
   //     var di = rows[N - 1 - i];
    for (var i = iStart; i < NLast; i++) {// N - including Date ...
          var di = rows[N-1 - i];

        if (di.length < 2) {
            //alert("di=" + di+" i="+i);
            indexStart++;
            continue;
        }
//alert("di=" + di + " i=" + i);
        var words = [];
        var pos1 = 0;
        for (var j = 0; j < di.length; j++) {
            if (di.charCodeAt(j) == 9 || di[j] == " " || di[j] == ",") {
                words.push(di.substring(pos1, j));
                pos1 = j + 1;
            }
        }
        words.push(di.substring(pos1));////////
//if (words.length < 6) continue;
        var dailyIndex;
        
        var sDate;

        if(words.length<=11) {
            sDate=fromGoogToYYYYMMDD(words[0]); // from 22-May-17 to 2017-05-22
        }

        var open = words[1];// open
        var high = words[2];// high
        var low = words[3];// low
        var close = words[4];// close
        var volume = words[5];// volume
    //    var adj = words[6];// adj

        if (words.length > 11) {//Wiki: 5/16/2017

            //6.Ex-Dividend	7.SplitRatio	8.Adj. Open	9.Adj. High	10.Adj. Low	11.Adj. Close	12.Adj. Volume

            sDate = words[0];//date
            parts = sDate.split("/");//Wiki
            sDate = parts[2] + "-" + parts[0] + "-" + parts[1];

             open = words[8];// open
             high = words[9];// high
             low = words[10];// low
             close = words[11];// close
             volume = words[12];// volume
        }
        var dailyIndex = indexDailyFromDate(sDate);
//alert("dailyIndex=" + dailyIndex);
//if (N-i < 4) alert(i + " " + sDate + " " + prevIndex + " " + dailyIndex + " open=" + open + " high=" + high + " low=" + low + " close=" + close + " adj=" + adj);

        if (i == indexStart){
        //   if (i == 0) {// i==1???
     //   if (i == 1) {// i==1???

            arStock[0].push(n); // "name" =n
            arStock[1].push(dailyIndex);// for open
            arStock[2].push(dailyIndex);// for high
            arStock[3].push(dailyIndex);// for low
            arStock[4].push(dailyIndex);// for close
            arStock[5].push(dailyIndex);// for volume
       //     arStock[6].push(dailyIndex);// for adj

            arStock[0].push(sDate);// dates
         /*   arStock[1].push(words[1]);
            arStock[2].push(words[2]);
            arStock[3].push(words[3]);
            arStock[4].push(words[4]);
            arStock[5].push(words[5]);
            arStock[6].push(words[6]);*/
            arStock[1].push(open);
            arStock[2].push(high);
            arStock[3].push(low);
            arStock[4].push(close);
            arStock[5].push(volume);
      //      arStock[6].push(adj);

            prevIndex = dailyIndex;
        }
        else {
            var nDiff = dailyIndex - prevIndex;
            if (nDiff != 1) {
                //alert("nDiff=" + nDiff + "sDate="+sDate);
                for (var k = 0; k < nDiff - 1; k++)//holidays
                {
                    //dailyIndex = prevIndex + 1+k;
                    arStock[0].push(dateDailyFromIndex(prevIndex + 1 + k));
                    arStock[1].push(empty);
                    arStock[2].push(empty);
                    arStock[3].push(empty);
                    arStock[4].push(empty);
                    arStock[5].push(empty);
        //            arStock[6].push(empty);
                }
            }
            {
                arStock[0].push(sDate);
             /*   arStock[1].push(words[1]);
                arStock[2].push(words[2]);
                arStock[3].push(words[3]);
                arStock[4].push(words[4]);
                arStock[5].push(words[5]);
                arStock[6].push(words[6]);*/
                arStock[1].push(open);
                arStock[2].push(high);
                arStock[3].push(low);
                arStock[4].push(close);
                arStock[5].push(volume);
         //       arStock[6].push(adj);

                prevIndex = dailyIndex;
            }
        }
    }
 //   arTableStocks[n] = arStock;
    return arStock;
}
function stockFromGogOrWikiTable(n) {
    // 0.Date	1.Open	2.High	3.Low	4.Close	5.Volume	
    //6.Ex-Dividend	7.SplitRatio	8.Adj. Open	9.Adj. High	10.Adj. Low	11.Adj. Close	12.Adj. Volume
    var empty;
    var arStock = [];// local  //[[name],[arDate],[arOpen],ar[High],[arLow],[arClose],[arVolume]]
  //  for (var m = 0; m < 7; m++) {
    for (var m = 0; m < 13; m++) {
        var field = [];
        arStock.push(field);
    }
    //alert("arStock.length=" + arStock.length);
    //  name =n?

    var s = arTexts[n];
    var rows = s.split("\n");
    var N = rows.length;
    var indexStart = 0;
    var iStart = 0;
    var NLast = N;
    if (isNaN(rows[0][0])) {// "Date Open ...
        //alert("rows[0][0]=" + rows[0][0]);
        iStart++;
        indexStart++;
        NLast--;
    }
    //alert("N+" + N);
    var prevIndex = 0;
    var Diff = 0;


    //  for (var i = 0; i < N-1; i++) {// N-1 to remove first row
    //     var di = rows[N - 1 - i];
    for (var i = iStart; i < NLast; i++) {// N - including Date ...
        var di = rows[N - 1 - i];

        if (di.length < 2) {
            //alert("di=" + di+" i="+i);
            indexStart++;
            continue;
        }
        //alert("di=" + di + " i=" + i);
        var words = [];
        var pos1 = 0;
        for (var j = 0; j < di.length; j++) {
            if (di.charCodeAt(j) == 9 || di[j] == " " || di[j] == ",") {
                words.push(di.substring(pos1, j));
                pos1 = j + 1;
            }
        }
        words.push(di.substring(pos1));////////
        //if (words.length < 6) continue;
        var dailyIndex;

        var sDate;

        if (words.length <= 11) {
            sDate = fromGoogToYYYYMMDD(words[0]); // from 22-May-17 to 2017-05-22
        }

        var open = words[1];// open
        var high = words[2];// high
        var low = words[3];// low
        var close = words[4];// close
        var volume = words[5];// volume
        var divident;
        var split;
        var adjOpen;
        var adjHigh;
        var adjLow;
        var adjClose;
        var adjVolume;

        if (words.length > 11) {//Wiki: 5/16/2017

            //6.Ex-Dividend	7.SplitRatio	8.Adj. Open	9.Adj. High	10.Adj. Low	11.Adj. Close	12.Adj. Volume

            sDate = words[0];//date
            parts = sDate.split("/");//Wiki
            sDate = parts[2] + "-" + parts[0] + "-" + parts[1];

            divident = words[6];//divident
            split = words[7];//split
            adjOpen = words[8];// adjOpen
            adjHigh = words[9];// adjHigh
            adjLow = words[10];// adjLow
            adjClose = words[11];// adjLow
            adjVolume = words[12];// adjVolume
        }
        var dailyIndex = indexDailyFromDate(sDate);
        //alert("dailyIndex=" + dailyIndex);
        //if (N-i < 4) alert(i + " " + sDate + " " + prevIndex + " " + dailyIndex + " open=" + open + " high=" + high + " low=" + low + " close=" + close + " adj=" + adj);

        if (i == indexStart) {
            //   if (i == 0) {// i==1???
            //   if (i == 1) {// i==1???

            arStock[0].push(n); // "name" =n
            arStock[1].push(dailyIndex);// for open
            arStock[2].push(dailyIndex);// for high
            arStock[3].push(dailyIndex);// for low
            arStock[4].push(dailyIndex);// for close
            arStock[5].push(dailyIndex);// for volume
            //     arStock[6].push(dailyIndex);// for adj
            if (words.length > 11) {
                arStock[6].push(dailyIndex);// for divident
                arStock[7].push(dailyIndex);// for split
                arStock[8].push(dailyIndex);// for adjOpen
                arStock[9].push(dailyIndex);// for adjHigh
                arStock[10].push(dailyIndex);// for adjLow
                arStock[11].push(dailyIndex);// for adjClose
                arStock[12].push(dailyIndex);// for adjVolume
            }

            arStock[0].push(sDate);// dates
            /*   arStock[1].push(words[1]);
               arStock[2].push(words[2]);
               arStock[3].push(words[3]);
               arStock[4].push(words[4]);
               arStock[5].push(words[5]);
               arStock[6].push(words[6]);*/
            arStock[1].push(open);
            arStock[2].push(high);
            arStock[3].push(low);
            arStock[4].push(close);
            arStock[5].push(volume);
            //      arStock[6].push(adj);
            if (words.length > 11) {
                arStock[6].push(divident);// for divident
                arStock[7].push(split);// for split
                arStock[8].push(adjOpen);// for adjOpen
                arStock[9].push(adjHigh);// for adjHigh
                arStock[10].push(adjLow);// for adjLow
                arStock[11].push(adjClose);// for adjClose
                arStock[12].push(adjVolume);// for adjVolume
            }

            prevIndex = dailyIndex;
        }
        else {
            var nDiff = dailyIndex - prevIndex;
            if (nDiff != 1) {
                //alert("nDiff=" + nDiff + "sDate="+sDate);
                for (var k = 0; k < nDiff - 1; k++)//holidays
                {
                    //dailyIndex = prevIndex + 1+k;
                    arStock[0].push(dateDailyFromIndex(prevIndex + 1 + k));
                    arStock[1].push(empty);
                    arStock[2].push(empty);
                    arStock[3].push(empty);
                    arStock[4].push(empty);
                    arStock[5].push(empty);
                    //            arStock[6].push(empty);
                    if (words.length > 11) {
                        arStock[6].push(empty);// for divident
                        arStock[7].push(empty);// for split
                        arStock[8].push(empty);// for adjOpen
                        arStock[9].push(empty);// for adjHigh
                        arStock[10].push(empty);// for adjLow
                        arStock[11].push(empty);// for adjClose
                        arStock[12].push(empty);// for adjVolume
                    }
                }
            }
            {
                arStock[0].push(sDate);
                /*   arStock[1].push(words[1]);
                   arStock[2].push(words[2]);
                   arStock[3].push(words[3]);
                   arStock[4].push(words[4]);
                   arStock[5].push(words[5]);
                   arStock[6].push(words[6]);*/
                arStock[1].push(open);
                arStock[2].push(high);
                arStock[3].push(low);
                arStock[4].push(close);
                arStock[5].push(volume);
                //       arStock[6].push(adj);
                if (words.length > 11) {
                    arStock[6].push(divident);// for divident
                    arStock[7].push(split);// for split
                    arStock[8].push(adjOpen);// for adjOpen
                    arStock[9].push(adjHigh);// for adjHigh
                    arStock[10].push(adjLow);// for adjLow
                    arStock[11].push(adjClose);// for adjClose
                    arStock[12].push(adjVolume);// for adjVolume
                }

                prevIndex = dailyIndex;
            }
        }
    }
    //   arTableStocks[n] = arStock;
    return arStock;
}
function ephem() {
   // alert(":e");

    var s = ephemString;
    var rows = s.split("\n");
    var N = rows.length;

    // 0.Date 1.Sun 2.Moon 3.Mercury 4.Venus 5.Mars 6.Jupiter 7.Saturn 8.Uranus 9.Neptune 10.Pluto
    var empty;
    var arStock = [];// local  //[[name],[arDate],[arOpen],ar[High],[arLow],[arClose],[arVolume]]
    for (var m = 0; m < 11; m++) {
        var field = [];
        arStock.push(field);
    }



    var indexStart = 1;
    for (var i = indexStart; i < N; i++) {// 1 to remove first row
        var di = rows[i];
        if (di.length < 50) continue;

        //alert("di=" + di + " i=" + i);
        var words = [];
        var pos1 = 0;
        for (var j = 0; j < di.length; j++) {
            if (di.charCodeAt(j) == 9 || di[j] == " " || di[j] == ",") {
                var w = di.substring(pos1, j);
                if (w != undefined && w != "" && w != "    ") words.push(w);
                pos1 = j + 1;
            }
        }
        var w = di.substring(pos1);
        if (w != undefined && w != "" && w != "    ") words.push(w);
        //words.push(di.substring(pos1));////////
        //if (words.length < 6) continue;
        var dailyIndex;

        var sDate = words[0].substring(6) + "-" + words[0].substring(3, 5) + "-" + words[0].substring(0, 2);// from 31.01.1960  to 1960-01-31 


        //   var ss = "" + words[0].substring(3, 5) + "/" + words[0].substring(0, 2) + "/" + words[0].substring(6);
        var dDate = new Date("" + words[0].substring(3, 5) + "/" + words[0].substring(0, 2) + "/" + words[0].substring(6));
        var nDayOfWeek = dDate.getDay(); //Sunday is 0, Monday is 1, and so on
        //   if (nDayOfWeek == 6 || nDayOfWeek == 0) continue;
        if (nDayOfWeek == 6 && bSatOpen == false) continue;
        if (nDayOfWeek == 0 && bSunOpen == false) continue;

        // alert("sDate=" + sDate + " words[0]=" + words[0] + " nDayOfWeek=" + nDayOfWeek);
        //return;
        //  if (words.length <= 11) {
        //     sDate = fromGoogToYYYYMMDD(words[0]);           
        //        
        // Date Sun Moon Mercury Venus Mars Jupiter Saturn Uranus Neptune Pluto 


        var dailyIndex = indexDailyFromDate(sDate);
        if (i == indexStart) {
            arStock[0].push(n); // "name" =n
            arStock[1].push(dailyIndex);//Sun
            arStock[2].push(dailyIndex);// Moon
            arStock[3].push(dailyIndex);// Mercury
            arStock[4].push(dailyIndex);// Venus
            arStock[5].push(dailyIndex);// Mars
            arStock[6].push(dailyIndex);// Jupiter
            arStock[7].push(dailyIndex);// Saturn
            arStock[8].push(dailyIndex);// Uranus
            arStock[9].push(dailyIndex);// Neptune
            arStock[10].push(dailyIndex);// Pluto
        }
        //             
        arStock[0].push(sDate);//Date
        arStock[1].push(words[1]);//Sun
        arStock[2].push(words[2]);//
        arStock[3].push(words[3]);//
        arStock[4].push(words[4]);//
        arStock[5].push(words[5]);//
        arStock[6].push(words[6]);// 
        arStock[7].push(words[7]);//
        arStock[8].push(words[8]);//
        arStock[9].push(words[9]);//
        arStock[10].push(words[10]);// 
    }
    // return arStock;

    var tab = trans(arStock);
    tab[0][0] = "E";
    tab[0][1] = "Sun";
    tab[0][2] = "Moon";
    tab[0][3] = "Mercury";
    tab[0][4] = "Venus";
    tab[0][5] = "Mars";
    tab[0][6] = "Jupiter";
    tab[0][7] = "Saturn";
    tab[0][8] = "Uranus";
    tab[0][9] = "Neptune";
    tab[0][10] = "Pluto";
    return tab;
}
function stockFromEphemTable(n) {
    // 0.Date	1.Open	2.High	3.Low	4.Close	5.Volume	
    //6.Ex-Dividend	7.SplitRatio	8.Adj. Open	9.Adj. High	10.Adj. Low	11.Adj. Close	12.Adj. Volume
   // 0.Date 1.Sun 2.Moon 3.Mercury 4.Venus 5.Mars 6.Jupiter 7.Saturn 8.Uranus 9.Neptune 10.Pluto
    var empty;
    var arStock = [];// local  //[[name],[arDate],[arOpen],ar[High],[arLow],[arClose],[arVolume]]
    //  for (var m = 0; m < 7; m++) {
    for (var m = 0; m < 11; m++) {
        var field = [];
        arStock.push(field);
    }
    //alert("arStock.length=" + arStock.length);
    //  name =n?
    var s;
    if (n >= 0) s = arTexts[n];
    else s = ephemString;
    var rows = s.split("\n");
    var N = rows.length;


    var indexStart = 1;
    for (var i = indexStart; i < N; i++) {// 1 to remove first row
        var di = rows[i];
        if (di.length < 50) continue;

        //alert("di=" + di + " i=" + i);
        var words = [];
        var pos1 = 0;
        for (var j = 0; j < di.length; j++) {
            if (di.charCodeAt(j) == 9 || di[j] == " " || di[j] == ",") {
                var w = di.substring(pos1, j);
                if(w!=undefined && w!="" && w!="    ") words.push(w);
                pos1 = j + 1;
            }
        }
        var w = di.substring(pos1);
        if (w != undefined && w != "" && w != "    ") words.push(w);
        //words.push(di.substring(pos1));////////
        //if (words.length < 6) continue;
        var dailyIndex;

        var sDate = words[0].substring(6) + "-" + words[0].substring(3, 5) + "-" + words[0].substring(0, 2);// from 31.01.1960  to 1960-01-31 


        //   var ss = "" + words[0].substring(3, 5) + "/" + words[0].substring(0, 2) + "/" + words[0].substring(6);
        var dDate = new Date("" + words[0].substring(3, 5) + "/" + words[0].substring(0, 2) + "/" + words[0].substring(6));
        var nDayOfWeek = dDate.getDay(); //Sunday is 0, Monday is 1, and so on
     //   if (nDayOfWeek == 6 || nDayOfWeek == 0) continue;
        if (nDayOfWeek == 6 && bSatOpen == false) continue;
        if (nDayOfWeek == 0 && bSunOpen == false) continue;

       // alert("sDate=" + sDate + " words[0]=" + words[0] + " nDayOfWeek=" + nDayOfWeek);
//return;
      //  if (words.length <= 11) {
       //     sDate = fromGoogToYYYYMMDD(words[0]);           
      //        
        // Date Sun Moon Mercury Venus Mars Jupiter Saturn Uranus Neptune Pluto 


        var dailyIndex = indexDailyFromDate(sDate);       
        if (i == indexStart) {
            arStock[0].push(n); // "name" =n
            arStock[1].push(dailyIndex);//Sun
            arStock[2].push(dailyIndex);// Moon
            arStock[3].push(dailyIndex);// Mercury
            arStock[4].push(dailyIndex);// Venus
            arStock[5].push(dailyIndex);// Mars
            arStock[6].push(dailyIndex);// Jupiter
            arStock[7].push(dailyIndex);// Saturn
            arStock[8].push(dailyIndex);// Uranus
            arStock[9].push(dailyIndex);// Neptune
            arStock[10].push(dailyIndex);// Pluto
        }
        //             
        arStock[0].push(sDate);//Date
        arStock[1].push(words[1]);//Sun
        arStock[2].push(words[2]);//Moon
        arStock[3].push(words[3]);//Mercury
        arStock[4].push(words[4]);//Venus
        arStock[5].push(words[5]);//Mars
        arStock[6].push(words[6]);// Jupiter
        arStock[7].push(words[7]);//Saturn
        arStock[8].push(words[8]);//Uranus
        arStock[9].push(words[9]);//Neptune
        arStock[10].push(words[10]);// Pluto
    }

    return arStock;
}
function strength(n0, E, yearB, monthB, dayB, DaysP, DaysF) {
    var arOut = [];
    var colNames = [];
    for (var n = 0; n < 11; n++) {
        for (var t = 0; t < 11; t++) {
            colNames.push("_" + n + "_" + t);
        }
    }
    colNames.push("_0_0");
    colNames[0] = "F";
    arOut.push(colNames);
    /////////////////////////////////////////////////////////////
    var stock = stockFromEphemTable(E);
    var nStartIndex = 1 * stock[1][0];// row=0
    var m1 = matrix(n0)[0];
    var arOrb = [];
    var arCenter = [];
    var arWeight = [];
    for (var i = 1; i < matrix(n0)[1]; i++) {
        arOrb.push(m1[i][1]);
        arCenter.push(m1[i][2]);
        arWeight.push(m1[i][3]);
    }
    var sDate = yearB + "-" + monthB + "-" + dayB;//birthDay
    var DifTN = 0;//-1,0,1
    var dDate = new Date(yearB + "/" + monthB + "/" + dayB);
    var nDayOfWeek = dDate.getDay(); //Sunday is 0, Monday is 1, and so on
    var sError = "";
    if (nDayOfWeek == 6 && bSatOpen == false) sError = "Saturday";
    if (nDayOfWeek == 0 && bSunOpen == false) sError = "Sunday";
    if (sError != "") {
        sError = "stock's birthday cannot be a " + sError + "; change the date, from " + sDate + " please.";
        throw sError;
    }
    var birthIndex = indexDailyFromDate(sDate);
    if (birthIndex > nStartIndex) nStartIndex = birthIndex;
    else throw " extend ephemerids: no data for bitsday";
    if (-DaysP > nStartIndex) nStartIndex = -DaysP;
    ////////////////////////////////////////////////////////////
    var arNat = [birthIndex];
    for (var n = 1; n < 11; n++) {
        arNat.push(stock[n][birthIndex - stock[1][0] + 1])
    }
//alert("arNat=" + arNat + " Date=" + sDate + " birthIndex=" + birthIndex + " nStartIndex=" + nStartIndex);// 1960-01-31 
    var nStartRow = nStartIndex - stock[1][0];

    var sStartDate = "" + stock[0][nStartRow];
    //alert("nStartRow=" + nStartRow + " sStartDate=" + sStartDate);
    var nEndRow = stock[1].length - 1;
    var endIndex = 1 * stock[1][0] + stock[1].length - 1;
    if (endIndex > DaysF) {
        nEndRow -= endIndex - DaysF;
        endIndex = DaysF;
    }
    else throw "extend ephemerides to cover future days";
    // 0.All 1.Sun 2.Moon 3.Mercury 4.Venus 5.Mars 6.Jupiter 7.Saturn 8.Uranus 9.Neptune 10.Pluto
    //    var ans = [nStartIndex];
    //alert("nStartRow=" + nStartRow + ": " + stock[1][nStartRow] + " nEndRow=" + nEndRow + ": " + stock[1][nEndRow]);
    for (var i = nStartRow; i < nEndRow; i++) {
        //sun.push(stock[1][i]);
        var arTrans = [0];
        for (var n = 1; n < 11; n++) {
            arTrans.push(stock[n][i])
        }
        //alert("arTrans=" + arTrans);
        var arar = [];
        for (var n = 0; n < 11; n++) {
            var ar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            arar.push(ar);
        }
        for (var n = 1; n < 11; n++) {
            for (var t = 1; t <= n; t++) {
                var delta = 1 * arNat[n] - 1 * arTrans[t];//////////
                if (DifTN == -1) delta = -delta;
                else if (DifTN == 0) delta = Math.abs(delta);
                for (var k = 0; k < arOrb.length; k++) {
                    delta -= 1 * arCenter[k];
                    while (delta > 180) delta -= 360;
                    while (delta <= -180) delta += 360;//so delta>-180 and delta<=180
                    delta = Math.abs(delta);//so delta>=0 and delta<180
                    //alert("delta=" + delta);
                    if (delta < 1 * arOrb[k]) {
                        arar[n][t] += 1 * arWeight[k] * (1 - 1 * delta / arOrb[k]);
                    }
                }
                //     arar[n][t] = 1;
                arar[n][0] += 1 * arar[n][t];
                //alert("n=" + n + " t=" + t + " arar[n][t]=" + arar[n][t] + " arar[n][0]=" + arar[n][0]);
            }
            //alert("n=" + n + "arar[n][0]=" + arar[n][0]);
        }
        for (var t = 0; t < 11; t++) {
            for (var n = 1; n < 11; n++) {
                arar[0][t] += 1 * arar[n][t];
            }
        }
        var arr = [];
        for (var n = 0; n < 11; n++) {
            for (var t = 0; t < 11; t++) {
                arr.push(arar[n][t]);
            }
        }
        arr.push(arar[0][0]);
        //alert("stock[0][r]=" + stock[0][i]);
        if (i > 0) arr[0] = stock[0][i];
        //alert("arr=" + arr);

        arOut.push(arr);
    }
    return arOut;
}
function score(nn, n1, n2) {
    var arOut = [];
    var colNames = [];
    for (var n = 0; n < 11; n++) {
        for (var t = 0; t < 11; t++) {
            colNames.push("_" + n + "_" + t);
        }
    }
    colNames.push("_0_0");
    colNames[0] = "Score";
    arOut.push(colNames);
    /////////////////////////////////////////////////////////////
    var stock = stockFromEphemTable(nn);
    var nStartIndex = 1 * stock[1][0];// row=0
    var m1 = matrix(n1)[0]; 
    var arOrb = [];
    var arCenter = [];
    var arWeight = [];
    for (var i = 1; i < matrix(n1)[1]; i++) {
        arOrb.push(m1[i][1]);
        arCenter.push(m1[i][2]);
        arWeight.push(m1[i][3]);
    }

    var m2 = matrix(n2)[0];
    var sDate = m2[1][1] + "-" + m2[2][1] + "-" + m2[3][1];//birthDay
    var DifTN = m2[4][1];//-1,0,1
    var DaysP = m2[5][1];
    var DaysF = m2[6][1];
  //  var TrPlnt = m2[5][1];//0-all,1,2,3,..9
 //   var NatPlnt = m2[6][1];//0-all,1,2,3,..9

 alert(DaysP + " " + DaysP + " " + DaysF + " " + DaysF);
    var dDate = new Date(m2[1][1] + "/" + m2[2][1] + "/" + m2[3][1]);

    var nDayOfWeek = dDate.getDay(); //Sunday is 0, Monday is 1, and so on
    var sError = "";
    if (nDayOfWeek == 6 && bSatOpen == false) sError="Saturday";
    if (nDayOfWeek == 0 && bSunOpen == false) sError = "Sunday";
    if (sError != "") {
        sError = "stock's birthday cannot be a " + sError + "; change the date, from "+sDate+" please.";
        throw sError;
    }
    var birthIndex = indexDailyFromDate(sDate);
    if (birthIndex > nStartIndex) nStartIndex = birthIndex;
    else throw " extend ephemerids: no data for bitsday";
    if (-DaysP > nStartIndex) nStartIndex = -DaysP;


    var arNat = [birthIndex];
    for(var n=1;n<11;n++){
        arNat.push(stock[n][birthIndex-stock[1][0]+1])
    }

alert("arNat=" + arNat + " Date=" + sDate + " birthIndex=" + birthIndex + " nStartIndex=" + nStartIndex);// 1960-01-31 




    var nStartRow = nStartIndex -stock[1][0];

    var sStartDate=""+stock[0][nStartRow];
//alert("nStartRow=" + nStartRow + " sStartDate=" + sStartDate);

    var nEndRow = stock[1].length - 1;
    var endIndex = 1 * stock[1][0] + stock[1].length - 1;
    if (endIndex > DaysF) {
        nEndRow -= endIndex - DaysF;
        endIndex = DaysF;
    }
    else throw "extend ephemerides to cover future days";
    
    // 0.All 1.Sun 2.Moon 3.Mercury 4.Venus 5.Mars 6.Jupiter 7.Saturn 8.Uranus 9.Neptune 10.Pluto
//    var ans = [nStartIndex];

//alert("nStartRow=" + nStartRow + ": " + stock[1][nStartRow] + " nEndRow=" + nEndRow + ": " + stock[1][nEndRow]);
    for (var i = nStartRow; i < nEndRow; i++) {
        //sun.push(stock[1][i]);
        var arTrans=[0];
        for(var n=1;n<11;n++){
            arTrans.push(stock[n][i])
        }
//alert("arTrans=" + arTrans);
        var arar = [];
        for (var n = 0; n < 11; n++) {
            var ar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            arar.push(ar);
        }

        
        for (var n = 1; n < 11; n++) {
//alert("n=" + n + "arar[n][0]=" + arar[n][0]);
          //  for (var t = 1; t < 11; t++) {
              for (var t = 1; t <= n; t++) {
                var delta = 1 * arNat[n] - 1 * arTrans[t];//////////
                if (DifTN == -1) delta = -delta;
                else if (DifTN == 0) delta = Math.abs(delta);
                for (var k = 0; k < arOrb.length; k++) {
                    delta-=1*arCenter[k];
                    while (delta>180) delta-=360;
                    while (delta <= -180) delta += 360;//so delta>-180 and delta<=180
                    delta = Math.abs(delta);//so delta>=0 and delta<180
//alert("delta=" + delta);
                    if (delta < 1 * arOrb[k]) {
                        arar[n][t] += 1 * arWeight[k] * (1 - 1 * delta / arOrb[k]);                       
                    }
            //         if (arar[n][t] < 0) {
             //           alert("arar[n][t]=" + arar[n][t]+" n="+n+" t="+t);
                //    }
                }
           //     arar[n][t] = 1;
                arar[n][0] += 1 * arar[n][t];
//alert("n=" + n + " t=" + t + " arar[n][t]=" + arar[n][t] + " arar[n][0]=" + arar[n][0]);
            }
//alert("n=" + n + "arar[n][0]=" + arar[n][0]);
        }
        for (var t = 0; t < 11; t++) {
            for (var n = 1; n < 11; n++) {
                arar[0][t] += 1*arar[n][t];
            }
        }

 //       if (TrPlnt == 0 && NatPlnt == 0) ans.push(arar[0][0]);
 //       else if (TrPlnt == 0) ans.push(arar[NatPlnt][0]);
  //      else if (NatPlnt == 0) ans.push(arar[0][TrPlnt]);
  //      else ans.push(arar[NatPlnt][TrPlnt]);       
        //alert("ans[ans.length-1]=" + ans[ans.length - 1]);

        var arr = [];
        for (var n = 0; n < 11; n++) {
            for (var t = 0; t < 11; t++) {
                arr.push(arar[n][t]);
            }
        }
        arr.push(arar[0][0]);
        //alert("stock[0][r]=" + stock[0][i]);
        if(i>0) arr[0] = stock[0][i];
//alert("arr=" + arr);

        arOut.push(arr);
    }
   
 //    return ans;//////////////////////////////////////////
   return arOut;

}

function YahooDates(n) {
    var st = stockFromTable(n[0]);
    return st[0];
}
function YahooO(n) {
    var st = stockFromTable(n[0]);
    return st[1];
}
function YahooH(n) {
    var st = stockFromTable(n[0]);
    return st[2];
}
function YahooL(n) {
    var st = stockFromTable(n[0]);
    return st[3];
}
function YahooC(n) {
  //  alert("YahooC");
 //   alert("n[0]=" + n[0]);
  //  alert("n[1]=" + n[1]);
    var st = stockFromTable(n[0]);
    return st[4];
}
function YahooV(n) {
    var st = stockFromTable(n[0]);
    return st[5];
}

function toO(n) {
    var st = stockFromGogOrWikiTable(n[0]);
    return st[1];
}
function toH(n) {
    var st = stockFromGogOrWikiTable(n[0]);
    return st[2];
}
function toL(n) {
    var st = stockFromGogOrWikiTable(n[0]);
    return st[3];
}
function toC(n) {
   // alert("n=" + n);
  //  alert("n[0]=" + n[0]);
    var st = stockFromGogOrWikiTable(n[0]);
    return st[4];
}
function toV(n) {
    var st = stockFromGogOrWikiTable(n[0]);
    return st[0];
}
function toDivident(n) {
    var st = stockFromGogOrWikiTable(n[0]);
    return st[6];
}
function toSplit(n) {
    var st = stockFromGogOrWikiTable(n[0]);
    return st[7];
}
function toAdjO(n) {
    var st = stockFromGogOrWikiTable(n[0]);
    return st[8];
}
function toAdjH(n) {
    var st = stockFromGogOrWikiTable(n[0]);
    return st[9];
}
function toAdjL(n) {
    var st = stockFromGogOrWikiTable(n[0]);
    return st[10];
}
function toAdjC(n) {
    var st = stockFromGogOrWikiTable(n[0]);
    return st[11];
}
function toAdjV(n) {
    var st = stockFromGogOrWikiTable(n[0]);
    return st[12];
}
// 0.Date 1.Sun 2.Moon 3.Mercury 4.Venus 5.Mars 6.Jupiter 7.Saturn 8.Uranus 9.Neptune 10.Pluto
function toSun(n) {
    var st = stockFromEphemTable(n[0]);
    return st[1];
}
function toMoon(n) {
    var st = stockFromEphemTable(n[0]);
    return st[2];
}
function toMercury(n) {
    var st = stockFromEphemTable(n[0]);
    return st[3];
}
function toVenus(n) {
    var st = stockFromEphemTable(n[0]);
    return st[4];
}
function toMars(n) {
  //  alert("n=" + n);
    var st = stockFromEphemTable(n[0]);
    return st[5];
}
function toJupiter(n) {
    var st = stockFromEphemTable(n[0]);
    return st[6];
}
function toSaturn(n) {
    var st = stockFromEphemTable(n[0]);
    return st[7];
}
function toUranus(n) {
    var st = stockFromEphemTable(n[0]);
    return st[8];
}
function toNeptune(n) {
    var st = stockFromEphemTable(n[0]);
    return st[9];
}
function toPluto(n) {
    var st = stockFromEphemTable(n[0]);
    return st[10];
}
function stockFromGoogleTable(n) {
    /*
//alert("stockFromTable");
    if (arTableStocks == null) {
        arTableStocks = [];
    }
    else {
        if (stockFromTable.length > n) {
            return arTableStocks[n];
        }
    }
//alert("stockFromTable.length=" + stockFromTable.length);
    while (stockFromTable.length <= n) {
        var ar = [];
        arTableStocks.push(ar);
    }
    */
    var empty;
    var arStock = [];// local  //[[name],[arDate],[arOpen],ar[High],[arLow],[arClose],[arVolume]]
    //   for (var m = 0; m < 6; m++) {
    for (var m = 0; m <7; m++) {
        var field = [];
        arStock.push(field);
    }
    //alert("arStock.length=" + arStock.length);
    //  name =n?

    var s = arTexts[n];
    var rows = s.split("\n");
    var N = rows.length;
    var indexStart = 0;
    var iStart = 0;
    var NLast = N;
    if (isNaN(rows[0][0])) {// "Date Open ...
        //alert("rows[0][0]=" + rows[0][0]);
        iStart++;
        indexStart++;
        NLast--;
    }
    //alert("N+" + N);
    var prevIndex = 0;
    var Diff = 0;


    //  for (var i = 0; i < N-1; i++) {// N-1 to remove first row
    //     var di = rows[N - 1 - i];
    for (var i = iStart; i < NLast; i++) {// N - including Date ...
        var di = rows[N-1 - i];

        if (di.length < 2) {
            //alert("di=" + di+" i="+i);
            indexStart++;
            continue;
        }
        //alert("di=" + di + " i=" + i);
        var words = [];
        var pos1 = 0;
        for (var j = 0; j < di.length; j++) {
            if (di.charCodeAt(j) == 9 || di[j] == " " || di[j] == ",") {
                words.push(di.substring(pos1, j));
                pos1 = j + 1;
            }
        }
        words.push(di.substring(pos1));////////
        //if (words.length < 6) continue;
        var dailyIndex;
        var sDate = words[0];//date 

        ///  22-May-17	for google //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////var parts = sDate.split("/");
        //////////////////////////////////////////sDate = parts[2] + "-" + parts[0] + "-" + parts[1];
        sDate=fromGoogToYYYYMMDD(sDate);/////////////////////////////////////////////////////////////

        var dailyIndex = indexDailyFromDate(sDate);
        //alert("dailyIndex=" + dailyIndex);
        var open = words[1];// open
        var high = words[2];// high
        var low = words[3];// low
        var close = words[4];// close
        var adj = words[6];// adj

        //if (N-i < 4) alert(i + " " + sDate + " " + prevIndex + " " + dailyIndex + " open=" + open + " high=" + high + " low=" + low + " close=" + close + " adj=" + adj);

        if (i == indexStart){
            //   if (i == 0) {// i==1???
            //   if (i == 1) {// i==1???

            arStock[0].push(n); // "name" =n
            arStock[1].push(dailyIndex);// for open
            arStock[2].push(dailyIndex);// for high
            arStock[3].push(dailyIndex);// for low
            arStock[4].push(dailyIndex);// for close
            arStock[5].push(dailyIndex);// for volume
            arStock[6].push(dailyIndex);// for adj

            arStock[0].push(sDate);// dates
            arStock[1].push(words[1]);
            arStock[2].push(words[2]);
            arStock[3].push(words[3]);
            arStock[4].push(words[4]);
            arStock[5].push(words[5]);
            arStock[6].push(words[6]);

            prevIndex = dailyIndex;
        }
        else {
            var nDiff = dailyIndex - prevIndex;
            if (nDiff != 1) {
                //alert("nDiff=" + nDiff + "sDate="+sDate);
                for (var k = 0; k < nDiff - 1; k++)//holidays
                {
                    //dailyIndex = prevIndex + 1+k;
                    arStock[0].push(dateDailyFromIndex(prevIndex + 1 + k));
                    arStock[1].push(empty);
                    arStock[2].push(empty);
                    arStock[3].push(empty);
                    arStock[4].push(empty);
                    arStock[5].push(empty);
                    arStock[6].push(empty);
                }
            }
            {
                arStock[0].push(sDate);
                arStock[1].push(words[1]);
                arStock[2].push(words[2]);
                arStock[3].push(words[3]);
                arStock[4].push(words[4]);
                arStock[5].push(words[5]);
                arStock[6].push(words[6]);

                prevIndex = dailyIndex;
            }
        }
    }
    //   arTableStocks[n] = arStock;
    return arStock;
}
function nRows(vn) {
    if (!isMatrix(vn)) throw "the argument should be a table";
    if (isNaN(vn)) {
        var Rows = vn.length;
        //if (isLetter(vn[0][0][0])) {
        if (isNaN(vn[0][0])) {
            if (vn[0].length == 1) Rows = 0;
            else Rows--;
        }
        return [Rows];
    }
    var n = fromVNtoN(vn);
    var s = arTexts[n];
    var rows = s.split("\n");
    var Rows = rows.length;
    //if (isLetter(arTexts[n][0][0])) {
    if (isNaN(arTexts[n][0])) {
        Rows--;
    }
    return [Rows];
}
function nCols(vn) {
  //  if (!isMatrix(vn)) throw "the argument should be a table";
    if (!isMatrix(vn)) return [1];
    if (isNaN(vn)) {
        var Cols = vn[0].length;
        //if (isLetter(vn[0][0][0])) {
        if (isNaN(vn[0][0])) {
            Cols--;
        }
        return [Cols];
    }
    var n = fromVNtoN(vn);
    var s = arTexts[n];
    var rows = s.split("\n");
    var Cols = rows[0].length;
    //if (isLetter(arTexts[n][0][0])) {
    if (isNaN(arTexts[n][0])) {
        Cols--;
    }
    return [Cols];
}
function row(vn, vr) {
    if (vn.length > 0 && vn[0].length > 0)//named calculated table
    {
        vn = dress(vn,"");
    }

    if (isNaN(vr)) {
        var bFound = false;
        var names = [];
        for (var i = 1; i < vn.length; i++) {
            if (vn[i][0] == vr) {
                vr = i;
                bFound = true;
                break;
            }
        }
        if (!bFound) throw "there is no row with the name " + vr;
    }


    var r = fromVNtoN(vr);
    if (vn.length > 0 && vn[0].length > 0)//named calculated table
    {
        //     alert("r=" + r);
        if (isMatrix(vn)) indexStart = findIndexStartInMatrix(vn);
        var ans = [indexStart];

        //var ans = [1];
        for (var i = 1; i < vn[r].length; i++)
        {
            ans.push(vn[r][i]);
        }
        return ans;
    }
   var n = fromVNtoN(vn);

   if (r < 1 ) throw " usage: row(0,n), where n is from 1 to " + N;
    if (arTexts == null || arTexts.length == 0) throw "empty table";

    var posStart = 0;
    if (!isLetter(arTexts[n][0][0])) {
        r--;
        posStart--;
    }

    var s = arTexts[n];
    var rows = s.split("\n");
    var N = rows.length;
    if (r > N - 1) throw " usage: row(0,n), where n is from 1 to " + N;
    var di = rows[r];
di=eatExtraSpaces(di);
//alert(di);
 //   var words = [];
    var words = [1];
    var pos1 = 0;
    var empty;
    for (var j = 0; j < di.length; j++) {
        if (di.charCodeAt(j) == 9 || di[j] == " ") {
            var w =di.substring(pos1, j);
//alert("w="+w+" pos1="+pos1);
            if (pos1 == posStart) {
                //words.push(0);// 1st column
                // words.push(1);// 1st column
            }
            else {
                if (w.length > 0) words.push(Number(w));
                else words.push(empty);
            }
            pos1 = j + 1;
        }
        if (j == di.length - 1) {
            var v = di.substring(pos1);
//alert(v);
            if (v.length > 0) words.push(myNumber(v));
            else words.push(empty);
            break;
        }
    }
//alert(words);
    return words;

    
}
function col(vn, vc) {//   var s = arTexts[n];
    
  // alert("1. vn=" + vn);
    if (vn.length > 0 && vn[0].length > 0)//named calculated table
    {
        vn = dress(vn,"");
    }
  //  alert("2. vn=" + vn);
    //  alert("vc=" + vc);
  //  alert(eval(String(vc)));
  
    if (isNaN(vc)) {
        var bFound = false;
        for (var i = 1; i < vn[0].length; i++) {
          //  alert("2. vn[0][i] =" + vn[0][i]);
            if (vn[0][i] == vc) {
                vc = i;
                bFound = true;
                break;
            }
        }
        if (!bFound) throw "there is no a column with the name " + vc;
    }

    var c= fromVNtoN(vc);
    if (c < 1) throw " usage: col(T, c), where c>0";


    if (vn.length > 0 && vn[0].length > 0)//named calculated table
    {
        if (isMatrix(vn)) indexStart = findIndexStartInMatrix(vn);
        var N = vn[0].length;

        if (c >= N) throw " usage: col(T,c), where c< number of columns";
        var ans = [indexStart];
        for (var i = 1; i < vn.length; i++) {
            ans.push(vn[i][c]);
        }
        return ans;
    }

    var n = fromVNtoN(vn);


    if (arTexts == null || arTexts.length == 0) throw "empty table";
    if (c>=n) throw " usage: col(T,c), where c< "+n;
    var rStart = 1;
//alert("arTexts[n][0][0]=" + arTexts[n][0][0]);
    if (!isLetter(arTexts[n][0][0])) {
        c--;
        rStart--;
      //  alert("2. c=" + c);
    }

    var s = arTexts[n];
s=eatExtraSpaces(s);
   // s=eatUnderscores(s);

    var rows = s.split("\n");
    var N = rows.length;
    //  if (r < 1 || r > N - 1) throw " usage: row(0,n), where n is from 1 to " + N;

    //  var words = [0];


    var words = [1];





    var bFound = false;
    for (var r = rStart; r < N; r++) {
        var di = rows[r];
        if (di.length == 0) continue;
//alert(di);
        var col = -1;
        var pos1 = 0;
        var w;
        var empty;
        for (var j = 0; j < di.length; j++) {
            if (di.charCodeAt(j) == 9 || di[j] == " ") {
                col++;
                w = di.substring(pos1, j);
                pos1 = j + 1;
                if (col == c) {
                    bFound = true;
                    break;
                }
            }
            if (j == di.length - 1) {
                col++;
                w = di.substring(pos1);
                if (col == c) {
                    bFound = true;
                    break;
                }
            }
        }
        //alert(w);
        if (w.length > 0 ) {
            words.push(myNumber(w));
        }
        else {
            words.push(empty);
        }
        
    }
    if (!bFound) throw "the Table"+n+" does not have column " + c;

    //alert(words);
    return words;
}
function myNumber(w){
    var empty;
  //  w=eatUnderscores(w);
    if(w=="NaN") return empty;
    else return Number(w);
}
function histCol(vn, vc) {//   var s = arTexts[n];

    var answer=[];  
    var ar=col(vn,vc);
    answer.push(ar[0]);
    var N=ar.length;
    for(var i=N-1;i>0;i--){
        answer.push(ar[i]);
    }
  
    // 2017-05-17 is cell(n,1,0)
    var n = fromVNtoN(vn);
    var s = arTexts[n];
    var rows = s.split("\n");
    var strRow1=rows[1];
    var sYmd=strRow1.substring(0,10);

  //  if(sYmd[4]=='-'&& sYmd[7]=='-'){
        answer[0]=indexDailyFromDate(sYmd)-N+2;
 //   }
  //  else
    //    answer[0]=1;

    return answer;
}
function revCol(vn, vc) {//   var s = arTexts[n];

    var answer=[];  
    var ar=col(vn,vc);
    answer.push(ar[0]);
    var N=ar.length;
    for(var i=N-1;i>0;i--){
        answer.push(ar[i]);
    }
  
    // 2017-05-22 is cell(n,1,0)
    // 22-May-17
    var n = fromVNtoN(vn);
    var s = arTexts[n];
    var rows = s.split("\n");
    var strRow1=rows[1];
    var sYmd=strRow1.substring(0,10);

      if(sYmd[4]=='-'&& sYmd[7]=='-'){
            answer[0]=indexDailyFromDate(sYmd)-N+2;
      }
      else if (sYmd[2]=='-'&& sYmd[6]=='-'){
          sYmd=fromGoogToYYYYMMDD(sYmd);
          answer[0]=indexDailyFromDate(sYmd)-N+2;
      }
    //  else
    //    answer[0]=1;

    return answer;
}
function googleCol(vn, vc) {//   var s = arTexts[n];


    var n = fromVNtoN(vn);
    var c = fromVNtoN(vc);
    if (c==0 || c>5) throw "only, these columns are available: 1 - open, 2 - high, 3 - low, 4 - close, and 5 - volume";

    var s = arTexts[n];
    var rows = s.split("\n");
    var strRow1=rows[1];
    var sYmd=strRow1.substring(0,10);
//alert(sYmd);
    if(sYmd[2] !='-' || sYmd[6] !='-') throw "not Google date format";


    var st = stockFromGoogleTable(n);
    return st[4];
  

}
function fromGoogToYYYYMMDD(sYmd){
    // from 22-May-17 to 2017-05-22
    var parts=sYmd.split("-");
    var mm="05";
    switch(parts[1])
    {
        case "May": mm="05"; break;
        case "Jun": mm="06"; break;
        case "Jul": mm="07"; break;
        case "Aug": mm="08"; break;
        case "Sep": mm="09"; break;
        case "Oct": mm="10"; break;
        case "Nov": mm="11"; break;
        case "Dec": mm="12"; break;
        case "Jan": mm="01"; break;
        case "Feb": mm="02"; break;
        case "Mar": mm="03"; break;
        case "Apr": mm="04"; break;
        default: throw "wrong data format";
    }
    var yyyy=1*parts[2]+2000;
    /////////////
    var dd = parts[0];
    if (1*dd < 10) dd = "0" + dd;
    return "" + yyyy + "-" + mm + "-" + dd;
  //  return ""+yyyy+"-"+mm+"-"+parts[0];
}
function diag(vn) {//   var s = arTexts[n];
    // var n = vn[0];
    if (vn.length > 0 && vn[0].length > 0)//named calculated table
    {
        if (isMatrix(vn)) indexStart = findIndexStartInMatrix(vn);
        var ans = [indexStart];
       // var ans = [1];
        for (var i = 1; i < vn.length; i++) {
            if (i == vn[0].length) break;
            ans.push(vn[i][i]);
        }
//alert(ans);
        return ans;
    }


    var n = fromVNtoN(vn);
    if (arTexts == null || arTexts.length == 0) throw "empty table";


    var rStart = 1;
    if (!isLetter(arTexts[n][0][0])) {
        rStart = 0;
    }


    var s = arTexts[n];
s=eatExtraSpaces(s);
    var rows = s.split("\n");
    var N = rows.length;

    var words = [1];
    for (var r = rStart; r < N; r++) {
        var di = rows[r];
        if (di.length == 0) continue;
        var col = -1;
        var pos1 = 0;
        var w;
        var empty;
        for (var j = 0; j < di.length; j++) {
            if (di.charCodeAt(j) == 9 || di[j] == " ") {
                col++;
                w = di.substring(pos1, j);
                pos1 = j + 1;
                if (col == r) break;
            }
            if (j == di.length - 1) {
                col++;
                w = di.substring(pos1);
                if (col == r) break;
            }
        }
        if (r > col) break;
        //alert(w);
        if (w.length > 0) {
            words.push(myNumber(w));
        }
        else {
            words.push(empty);
        }

    }

    //alert(words);
    return words;
}
function cell(vn, vr, vc) {//   var s = arTexts[n];

    if (vn.length > 0 && vn[0].length > 0)//named calculated table
    {
        vn = dress(vn,"");
    }
    if (isNaN(vr)) {
        var bFound = false;
        var names = [];
        for (var i = 1; i < vn.length; i++) {
            if (vn[i][0] == vr) {
                vr = i;
                bFound = true;
                break;
            }
        }
        if (!bFound) throw "there is no row with the name " + vr;
    }
    if (isNaN(vc)) {
        var bFound = false;
        var names = [];
        for (var i = 1; i < vn[0].length; i++) {
            if (vn[0][i] == vc) {
                vc = i;
                bFound = true;
                break;
            }
        }
        if (!bFound) throw "there is no a column with the name " + vc;
    }



    var r = fromVNtoN(vr);
    var c = fromVNtoN(vc);

    if (vn.length > 0 && vn[0].length > 0)//named calculated table
    {
        return [1*vn[r][c]];
    }

    var n = fromVNtoN(vn);

    if (c == 0) throw " usage: cell(0,n,k), where n is from 1 to " + N + " and k > 1";
    if (arTexts == null || arTexts.length == 0) throw "empty table";
    if (r < 1 ) throw " usage: cell(0,n,k), where n is from 1 to " + N + " and k > 1";

    ////////////////////////
   // var cStart = 0;
    if (!isLetter(arTexts[n][0][0])) {
        c--;
        r--;
   //     cStart=-1;
    }
    ////////////////////////////


 
    var s = arTexts[n];
    var rows = s.split("\n");
    var N = rows.length;
     if ( r > N - 1) throw " usage: cell(0,n,k), where n is from 1 to " + N+ " and k > 1";



     var word;
     var di = rows[r];
di=eatExtraSpaces(di);
        if (di.length == 0) throw " usage: cell(0,n,k), where n is from 1 to " + N + " and k > 1";
    //alert(di);


        var col = -1;
        var pos1 = 0;
        var w;
        var empty;
        for (var j = 0; j < di.length; j++) {
            if (di.charCodeAt(j) == 9 || di[j] == " ") {
                col++;
                w = di.substring(pos1, j);
 //alert("col="+col+"w="+w);
                pos1 = j + 1;
                if (col == c) break;
            }
            if (j == di.length - 1) {
                col++;
                w = di.substring(pos1);
                if (col == c) break;
            }
        }
//alert("w="+w);
        if (w.length > 0) {
            word = myNumber(w);
        }
        else {
            word = empty;
        }

    return [word];
}
function statusOld(vSell, vBuy) {
    var vStatus = [];

    if (((typeof vSell === 'number') || (typeof vBuy === 'number'))) {
        throw " usage: status(Sell, Buy)";
    }
  //  alert("vBuy=" + vBuy);
  //  alert("vSell=" + vSell);
    var dif = arithm('-', vBuy, vSell);

    if (dif.length > 0) dif[1] = 0;//status always starts from zero (out of market)
    return acc(dif);
}
function status(vSell, vBuy) {
    if (isMatrix(vSell) || isMatrix(vBuy)) return compareMatrix(status, "", vSell, vBuy);
    var s = compressOne(vSell, vSell);
    var b = compressOne(vBuy, vBuy);
    var vOld = statusOld(s, b);
    if (s.length == vSell.length && b.length==vBuy.length) return vOld;////////////////////////////////
    return decompressOne(vOld, vSell);
}
function ffStatusOld(vSell, vBuy) {
    var vStatus=[];

    if (((typeof vSell === 'number' )||(typeof vBuy === 'number' ))){
        throw " usage: ffStatus(Sell, Buy)";
    }
    var nStartSell=1*vSell[0];
    var nStartBuy=1*vBuy[0];
    var nStart = Math.max(nStartSell, nStartBuy);
    var nEnd = Math.min(1*vSell[0]+vSell.length, 1*vBuy[0]+vBuy.length)


    vStatus[0]=nStart;
    var prevStatus=0;
    for (var i = nStart + 1; i < nEnd; i++) {
        var sell=vSell[i-nStartSell];
        var buy = vBuy[i - nStartBuy];
        if (i == nStart + 1){

        }
        else if (sell == 1 && buy == 1 || sell == 0 && buy == 0 || sell == 1 && prevStatus == -1 || buy == 1 && prevStatus == 1) {
            //vStatus.push(prevStatus);
        }
        else if (sell==1){
            prevStatus=-1;
        }
        else {// buy=1
            prevStatus=1;
        }
        vStatus.push(prevStatus);
 
    }
    
    return vStatus;
}
function ffStatus(vSell, vBuy) {
    if (isMatrix(vSell) || isMatrix(vBuy)) return compareMatrix(ffStatus, "", vSell, vBuy);
    // merge?
    var s = compressOne(vSell, vSell);
    var b = compressOne(vBuy, vBuy);
    var vOld = ffStatusOld(s, b);
    if (s.length == vSell.length && b.length == vBuy.length) return vOld;////////////////////////////////
    return decompressOne(vOld, vSell);
}
/*
function limStatusOld(max, min, vSell, vBuy) {
    var vStatus = [];

    if (((typeof vSell === 'number') || (typeof vBuy === 'number') )) {
        throw " usage: limStatus(2, -1, Sell, Buy)";
    }
    var nStartSell = 1 * vSell[0];
    var nStartBuy = 1 * vBuy[0];
    var nStart = Math.max(nStartSell, nStartBuy);
    var nEnd = Math.min(1 * vSell[0] + vSell.length, 1 * vBuy[0] + vBuy.length)


    vStatus[0] = nStart;
    var prevStatus = 0;
    for (var i = nStart + 1; i < nEnd; i++) {
        var sell = vSell[i - nStartSell];
        var buy = vBuy[i - nStartBuy];
        if (sell == 1 && buy == 1 || sell == 0 && buy == 0 || sell == 1 && prevStatus == min || buy == 1 && prevStatus == max) {
            //vStatus.push(prevStatus);
        }
        else if (sell == 1) {
            prevStatus--;
        }
        else {// buy=1
            prevStatus++;
        }
        vStatus.push(prevStatus);
    }

    return vStatus;
}
function limStatus(v1, v2, vSell, vBuy) {
    var max = arrayOrNumberToNumber(v1, ", e.g.,limStatus(2, -1, vSellA, vBuyA)");
    var min = arrayOrNumberToNumber(v2, ", e.g.,limStatus(2, -1, vSellA, vBuyA)");
    var s = compressOne(vSell, vSell);
    var b = compressOne(vBuy, vBuy);
    var vOld = limStatusOld(max,min,s, b);
    return decompressOne(vOld, vSell);
}
*/
function bStatusOld(max, min, vSell, vBuy) {
    var vStatus = [];

    if (((typeof vSell === 'number') || (typeof vBuy === 'number'))) {
        throw " usage: bStatus(2, -1, vSellA, vBuyA)";
    }
    var nStartSell = 1 * vSell[0];
    var nStartBuy = 1 * vBuy[0];
    var nStart = Math.max(nStartSell, nStartBuy);
    var nEnd = Math.min(1 * vSell[0] + vSell.length, 1 * vBuy[0] + vBuy.length)


    vStatus[0] = nStart;
    var prevStatus = 0;
    for (var i = nStart + 1; i < nEnd; i++) {
        var sell = vSell[i - nStartSell];
        var buy = vBuy[i - nStartBuy];
        if (i == nStart + 1) {

        }
        else if (sell == 1 && buy == 1 || sell == 0 && buy == 0 || sell == 1 && prevStatus == min || buy == 1 && prevStatus == max) {
            //vStatus.push(prevStatus);
        }
        else if (sell == 1) {
            prevStatus--;
        }
        else {// buy=1
            prevStatus++;
        }
        vStatus.push(prevStatus);
    }

    return vStatus;
}
function bStatus(v1, v2, vSell, vBuy) {
    if (isMatrix(vSell) || isMatrix(vBuy)) return compareMatrix(bStatus, [[v1[0]],[v2[0]]], vSell, vBuy);
   // var max = arrayOrNumberToNumber(v1, ", e.g.,bStatus(2, -1, vSellA, vBuyA)");
    var max= fromVNtoN(v1);
 //   var min = arrayOrNumberToNumber(v2, ", e.g.,bStatus(2, -1, vSellA, vBuyA)");
    var min = fromVNtoN(v2);

//alert("min="+min+" max="+max);

    if (max < 0) throw "first parameter should be positive";
    if (min > 0) throw "second parameter should be negative";
    if (max == 0 && min == 0) {
        var diff = arithm('-', vBuy, vSell);
        return acc(diff);
    }
    var s = compressOne(vSell, vSell);
    var b = compressOne(vBuy, vBuy);
    var vOld = bStatusOld(max, min, s, b);
    if (s.length == vSell.length && b.length == vBuy.length) return vOld;////////////////////////////////
    return decompressOne(vOld, vSell);
}
function gaussj(a, n, b, m)
//Linear equation solution by Gauss-Jordan elimination, equation (2.1.1) above. a[1..n][1..n]
// is the input matrix. b[1..n][1..m] is input containing the m right-hand side vectors. On
// output, a is replaced by its matrix inverse, and b is replaced by the corresponding set of solution
//vectors.
{
    //int *indxc,*indxr,*ipiv;
    var indxc = [];
    var indxr = [];
    var ipiv = [];
    var i, icol = 0, irow = 0, j, k, l, ll;
    var big, dum, pivinv;
    // , temp
    //The integer arrays ipiv, indxr, and indxc are
    // used for  bookkeeping on the pivoting.
    //indxc=ivector(1,n); 
    //indxr=ivector(1,n);
    //ipiv=ivector(1,n);
    for (j = 0; j <= n; j++)
    {
        indxc.push(0); indxr.push(0); ipiv.push(0);
    }
    for (j = 1; j <= n; j++) ipiv[j] = 0;
    for (i = 1; i <= n; i++)
    {// This is the main loop over the columns to be reduced.
        big = 0.0;
        for (j = 1; j <= n; j++) //This is the outer loop of the search for a pivot element.
            if (ipiv[j] != 1)
                for (k = 1; k <= n; k++)
                {
                    if (ipiv[k] == 0)
                    {
                        if (Math.abs(a[j][k]) >= big)
                        {
                            big = Math.abs(a[j][k]);
                            irow = j;
                            icol = k;
                        }
                    }
                    else if (ipiv[k] > 1) throw "gaussj: Singular Matrix-1";
                }
        //  ++(ipiv[icol]);
        ipiv[icol] = ipiv[icol] + 1;

        //     We now have the pivot element, so we interchange rows, if needed, to put the pivot
        //     element on the diagonal. The columns are not physically interchanged, only relabeled:
        //     indxc[i], the column of the ith pivot element, is the ith column that is reduced, while
        //     indxr[i] is the row in which that pivot element was originally located. If indxr[i] 6=
        //     indxc[i] there is an implied column interchange. With this form of bookkeeping, the
        //     solution b's will end up in the correct order, and the inverse matrix will be scrambled
        //     by columns.

        if (irow != icol)
        {
            //  for (l=1;l<=n;l++) SWAP(a[irow][l],a[icol][l]);
            //  for (l = 1; l <= m; l++) SWAP(b[irow][l], b[icol][l]);
            for (l = 1; l <= n; l++)//temp=a; a=b; b=temp;
            {
                var temp1 = a[irow][l]; a[irow][l] = a[icol][l]; a[icol][l] = temp1;
            }
            for (l = 1; l <= m; l++)
            {
                var temp2 = b[irow][l]; b[irow][l] = b[icol][l]; b[icol][l] = temp2;
            }
        }
        indxr[i] = irow; // We are now ready to divide the pivot row by the
        indxc[i] = icol; // pivot element, located at irow and icol.
        if (a[icol][icol] == 0.0) throw "gaussj: Singular Matrix-2";
        pivinv = 1.0 / a[icol][icol];
        a[icol][icol] = 1.0;
        for (l = 1; l <= n; l++) a[icol][l] *= pivinv;
        for (l = 1; l <= m; l++) b[icol][l] *= pivinv;
        for (ll = 1; ll <= n; ll++) // Next, we reduce the rows...
            if (ll != icol)
            { //...except for the pivot one, of course.
                dum = a[ll][icol];
                a[ll][icol] = 0.0;
                for (l = 1; l <= n; l++) a[ll][l] -= a[icol][l] * dum;
                for (l = 1; l <= m; l++) b[ll][l] -= b[icol][l] * dum;
            }
    }
    // This is the end of the main loop over columns of the reduction. It only remains to unscramble
    // the solution in view of the column interchanges. We do this by interchanging pairs of
    // columns in the reverse order that the permutation was built up.
    for (l = n; l >= 1; l--)
    {
        if (indxr[l] != indxc[l])
            for (k = 1; k <= n; k++)////temp=a; a=b; b=temp;
            {
                // SWAP(a[k][indxr[l]], a[k][indxc[l]]);
                var temp3 = a[k][indxr[l]]; a[k][indxr[l]] = a[k][indxc[l]]; a[k][indxc[l]] = temp3;
            }
    } //And we are done.
    return [a,b];
}
function getColsNames(vn) {
    var arNames = [];
    var n = fromVNtoN(vn);
    if (arTexts == null || arTexts.length == 0 || arTexts[n] == undefined || arTexts[n].length == 0) throw "empty table";
    var s = arTexts[n];
    var rows = s.split("\n");

        var di = rows[0];
        var w;
        var pos1 = 0;
        for (var j = 0; j < di.length; j++) {
            if (di.charCodeAt(j) == 9 || di[j] == " ") {
                w = di.substring(pos1, j);
                pos1 = j + 1;
                arNames.push(w);
              //  break;
            }
            else if (j == di.length - 1) {
                w = di.substring(pos1);
                arNames.push(w);
            //    break;
            }
        }
   
    return arNames;
}
function getRowsNames(vn) {
    var arNames = [];
    var n = fromVNtoN(vn);
    if (arTexts == null || arTexts.length == 0 || arTexts[n] == undefined || arTexts[n].length == 0) throw "empty table";
    var s = arTexts[n];
    var rows = s.split("\n");
    var N = rows.length;

    for (var i = 0; i < N; i++) {
        var di = rows[i];
        var w;      
        for (var j = 0; j < di.length; j++) {
            if (di.charCodeAt(j) == 9 || di[j] == " ") {
                w = di.substring(0, j);
                arNames.push(w);
                break;
            }
            else if (j == di.length - 1) {
              //  w = di.substring(pos1);
                w = di.substring(di);
                arNames.push(w);
                break;
            }
        }
    }
    return arNames;
}
function matrixFromString(s) {
    //alert("matrixFromString");
    s = eatExtraSpaces(s);
    //alert("s="+s);

    var A = [];
    var rows = s.split("\n");
    var N = rows.length;// how many rows; return
    var NN = 0;
    var M = 0;// how many cols; return

//alert("N=" + N + "M=" + M);
    var w;
    // var words = [0];
    // for (var r = 1; r < N; r++) {
    for (var r = 0; r < N; r++) {
        var row = [];
        var di = rows[r];
        //alert("di=" + di);
        if (di.length == 0) continue;
        NN++;
        //alert(di);
        var col = -1;
        var pos1 = 0;

        var empty;
        for (var j = 0; j < di.length; j++) {
            //alert(j + " di.charCodeAt(j)=" + di.charCodeAt(j));
            if (di.charCodeAt(j) == 9 || di[j] == " ") {
                col++;
                w = di.substring(pos1, j);
                pos1 = j + 1;
                //  if (col == c) break;
                //  alert(w);
                if (w.length > 0) {
                    if (r > 0 && col > 0) {
                        w = myNumber(w);
                    }
                    row.push(w);
                }
                else {
                    row.push(empty);
                }
            }
            if (j == di.length - 1) {
                col++;
                w = di.substring(pos1);
                //  if (col == c) break;
                // alert(w);
                if (w.length > 0) {
                    if (r > 0 && col > 0) {
                        w = myNumber(w);
                    }
                    row.push(w);
                }
                else {
                    row.push(empty);
                }
            }

        }
        if (M < row.length) {
            M = row.length;
        }
        A.push(row);
        //alert(row);
    }
    return A;
/*
    var Name;
    if (isLetter(A[0][0][0])) Name = A[0][0];
    var ar0 = [];
    if (Name == undefined) {
        for (var r = 0; r < NN; r++) {
            //     A[r].unshift("0");
            A[r].unshift(r);////////////
        }
        for (var i = 0; i <= M; i++) {
            //ar0.push("0");
            ar0.push(i);/////////
        }
        A.unshift(ar0);
        A[0][0] = Name;////////////////
        M++;
        NN++;
    }

    var stripedA = strip(A);
    //alert(999);
    //     alert("strip(A).length=" + stripedA.length);
    //  return [A, NN, M, Name];
    return [A, NN, M, Name, stripedA];
    */
}
function matrix(vn) {
//alert("matrix");
    var n = fromVNtoN(vn);
    if (arTexts == null || arTexts.length == 0 || arTexts[n] == undefined || arTexts[n].length == 0) {
    //    alert("arTexts="+arTexts);
        var b1=false;
        if(arTexts == null) b1=true;
  //      alert(b1);
        var b2=false;
        if(arTexts.length == 0) b2=true;
   //     alert( b2);
        var b3=false;
        if(arTexts[n] == undefined) b3=true;
   //     alert("b3="+b3);
        var b4=false;
        if(arTexts[n].length == 0) b4=true;
    //    alert("n="+n+"b4="+b4);

        throw "empty table";
    }
    var s = arTexts[n];
s=eatExtraSpaces(s);
//alert("s="+s);

    var A = [];
    var rows = s.split("\n");
    var N = rows.length;// how many rows; return
    var NN = 0;
    var M = 0;// how many cols; return

//alert("N=" + N + "M=" + M);
    var w;
   // var words = [0];
   // for (var r = 1; r < N; r++) {
    for (var r = 0; r < N; r++) {
        var row = [];
        var di = rows[r];
//alert("di=" + di);
        if (di.length == 0) continue;
        NN++;
        //alert(di);
        var col = -1;
        var pos1 = 0;

        var empty;
        for (var j = 0; j < di.length; j++) {
//alert(j + " di.charCodeAt(j)=" + di.charCodeAt(j));
            if (di.charCodeAt(j) == 9 || di[j] == " ") {
                col++;
                w = di.substring(pos1, j);
                pos1 = j + 1;
                //  if (col == c) break;
 //  alert(w);
                if (w.length > 0) {
                    if (r > 0 && col > 0) {
                        w = myNumber(w);
                    }
                    row.push(w);
                }
                else {
                    row.push(empty);
                }
            }
            if (j == di.length - 1) {
                col++;
                w = di.substring(pos1);
                //  if (col == c) break;
  // alert(w);
                if (w.length > 0) {
                    if (r > 0 && col > 0) {
                        w = myNumber(w);
                    }
                    row.push(w);
                }
                else {
                    row.push(empty);
                }
            }

        }
        if (M < row.length) {
            M = row.length;
        }
        A.push(row);
//alert(row);
    }

    var Name;
    if (isLetter(A[0][0][0])) {
        Name = A[0][0];
        if (Name == 'x' && A[0].length == 2) throw "Please, do not use name 'x' for the matrix in this case";
    }
  

    var ar0 = [];
    if (Name == undefined) {
        for (var r = 0; r < NN; r++) {
       //     A[r].unshift("0");
            A[r].unshift(r);////////////
        }
        for (var i = 0; i <= M; i++) {
            //ar0.push("0");
            ar0.push(i);/////////
        }
        A.unshift(ar0);
        A[0][0] = Name;////////////////
        M++;
        NN++;
    }

    var stripedA = strip(A);
//alert(999);
 //     alert("strip(A).length=" + stripedA.length);
 //  return [A, NN, M, Name];
   return [A, NN, M, Name, stripedA];
}
function fromVNtoN(vA) {
    var nA;
    if (typeof (vA) === 'number') nA = vA;
  //  else if (typeof (vA) === 'string') nA = eval(vA);
    else nA = 1*vA[0];
    return nA;
}
function fromTableNameToNumber(vA) {
    var nA;
    if (typeof (vA) === 'number') nA = vA;
    else if (typeof (vA) === 'string') {
        for (var i = 0; i < arTexts[i]; i++) {
            var namei = getColsNames(i)[0];

 //alert("va=" + va + " namei=" + namei);

            if (va == namei) return i;
        }
        throw "there is no Table with name " + vA;
    }
    else nA = vA[0];
    return nA;
}
/*
function fromColumnNameToNumber(n,vA) {
    var nA;
    if (typeof (vA) === 'number') nA = vA;
    else if (typeof (vA) === 'string') {
        arNames = getColsNames(n);
        for (var i = 1; i < arNames.length; i++) {
            var namei = arNames[i];
            if (va == namei) return i;
        }
        throw "there is no column with name " + vA +" in Table"+n;
    }
    else nA = vA[0];
    return nA;
}*/
function fromColNameToNumber(n, vA) {
    var nA;
    if (typeof (vA) === 'number') return vA;

    var va = "" + vA;
    arNames = getColsNames(n);
    for (var i = 1; i < arNames.length; i++) {
        var namei = arNames[i];
        //alert("va=" + va + " namei=" + namei);
        if (va == namei) return i;
    }
    //alert(8);
    if (typeof (vA) === 'array') return vA[0];

    throw "there is no column with name " + vA + " in Table" + n;

    return -1;
}
function fromRowNameToNumber(n, vA) {
//alert("vA=" + vA);
    var nA;
    if (typeof (vA) === 'number') return vA;

    var va= ""+vA;
    arNames = getRowsNames(n);
    for (var i = 1; i < arNames.length; i++) {
        var namei = arNames[i];
//alert("va=" + va + " namei=" + namei);
        if (va == namei) return i;
    }
//alert(8);
    if (typeof (vA) === 'array') return vA[0];

        throw "there is no row with name " + vA + " in Table" + n;

    return -1;
}
function tableFromString(vn, str) {
    var n = fromVNtoN(vn);
/*
    var Tab = "";
    var sRow = "DRates;1;2;3;4;5;6;7;8;9;10\n";
    Tab = Tab + sRow;
    sRow = "AAA;0.00;0.00;0.03;0.06;0.10;0.17;0.24;0.36;0.41;0.45\n";
    Tab = Tab + sRow;
    sRow = "AA+;0.00;0.00;0.00;0.08;0.16;0.25;0.34;0.34;0.34;0.34\n";
    Tab = Tab + sRow;
    sRow = "AA;0.00;0.00;0.00;0.07;0.15;0.23;0.35;0.50;0.63;0.77\n";
    Tab = Tab + sRow;
    sRow = "AA-;0.02;0.10;0.23;0.36;0.52;0.68;0.83;0.91;1.00;1.11\n";
    Tab = Tab + sRow;
    sRow = "A+;0.05;0.11;0.27;0.48;0.64;0.82;1.02;1.20;1.45;1.68\n";
    Tab = Tab + sRow;
    sRow = "A;0.04;0.12;0.17;0.25;0.42;0.65;0.87;1.13;1.41;1.80\n";
    Tab = Tab + sRow;
    sRow = "A-;0.04;0.16;0.32;0.54;0.86;1.18;1.61;1.87;2.20;2.44\n";
    Tab = Tab + sRow;
    sRow = "BBB+;0.22;0.63;1.21;1.72;2.30;2.90;3.36;3.76;4.25;4.65\n";
    Tab = Tab + sRow;
    sRow = "BBB;0.28;0.62;0.91;1.52;2.17;2.76;3.31;4.01;4.58;5.27\n";
    Tab = Tab + sRow;
    sRow = "BBB-;0.39;1.28;2.29;3.65;4.94;6.08;6.93;7.69;8.25;8.97\n";
    Tab = Tab + sRow;
    sRow = "BB+;0.56;1.68;3.57;5.15;6.47;7.84;9.25;9.84;10.88;11.74\n";
    Tab = Tab + sRow;
    sRow = "BB;0.95;2.99;5.47;7.78;9.98;12.19;13.84;15.31;16.51;17.34\n";
    Tab = Tab + sRow;
    sRow = "BB-;1.76;5.16;8.78;12.14;15.03;17.75;19.82;21.87;23.65;24.97\n";
    Tab = Tab + sRow;
    sRow = "B+;3.01;8.40;13.46;17.79;20.86;23.15;25.34;27.16;28.63;30.15\n";
    Tab = Tab + sRow;
    sRow = "B;8.34;16.68;22.60;26.60;29.44;31.88;33.36;34.44;35.40;36.29\n";
    Tab = Tab + sRow;
    sRow = "B-;12.15;22.09;29.64;34.35;37.71;40.31;42.52;43.88;44.52;45.05\n";
    Tab = Tab + sRow;
    sRow = "C;28.83;37.97;43.52;47.44;50.85;52.13;53.39; 54.05;55.56;56.45";
    Tab = Tab + sRow;
    var res = Tab.replace(/;/g, "\t");
//alert(res);
    s = res;
    */
    arTexts[n] = s;
    SetTopPanel();//???
   // return [0, 0];
}
function makeMatrix(vN, vRows, vCols, vVal) {
 // alert("makeMatrix");
    var n = fromVNtoN(vN);
    var nRows = 1+fromVNtoN(vRows);
    var nCols = 1+fromVNtoN(vCols);
    var nVal = fromVNtoN(vVal);

    var ans = [];
    for (var r = 1; r < nRows; r++) {
        var ar = [];
        for (var c = 1; c < nCols; c++) {
            ar.push(Number(nVal));
        }
        ans.push(ar);
    }
    var c=dress(ans,"Matr");
   
    
    setUnnamedTable(c, n);

   
/*
//    alert("aRows="+aRows);
    var lastCol = [1];//start index
    for (var i = 1; i < nRows ; i++) {

        lastCol.push(c[i][nCols - 1]);
    }

    return lastCol;
    */
    return c;

}
/*
function gpuMultiplication(A, B, vTexture) {

   // var L = fromVNtoN(vL);
    //alert("L="+L);
    var texture = fromVNtoN(vTexture);
    //alert("texture=" + texture);
    var trueFalse = "false";
    if (texture == 1) trueFalse = "true";
    //alert("trueFalse=" + trueFalse);

 //   var A = strip(v1);
  //  var B = strip(v2);
    var L = A[0].length;
    if (L != B.length) throw "number of cols in first matrix should be equal to number of rows in the second matrix";

//    alert("L=" + L);
    var A = [];
    var B = [];
    for (var i = 0; i < L; i++) {
        var ar1 = [];
        var ar2 = [];
        for (j = 0; j < L; j++) {
            ar1.push(0.5);
            ar2.push(2);
        }
        A.push(ar1);
        B.push(ar2);
    }

    const gpu = new GPU({ mode: 'webgl' });//}).setOutput([@DIM, @DIM]);

    if (L == 128) {
        const gpuMatMult = gpu.createKernel(function (A, B) {
            var sum = 0;
            for (var i = 0; i < 128; i++) {
                sum += A[this.thread.y][i] * B[i][this.thread.x];
            }
            return sum;
        }).setOutput([128, 128]);
        const result = gpuMatMult(A, B);
        return dress(result, "");
    } else if (L == 256) {
        const gpuMatMult = gpu.createKernel(function (A, B) {
            var sum = 0;
            for (var i = 0; i < 256; i++) {
                sum += A[this.thread.y][i] * B[i][this.thread.x];
            }
            return sum;
        }).setOutput([256, 256]);
        const result = gpuMatMult(A, B);
        return dress(result, "");
    } else if (L == 512) {
        const gpuMatMult = gpu.createKernel(function (A, B) {
            var sum = 0;
            for (var i = 0; i < 512; i++) {
                sum += A[this.thread.y][i] * B[i][this.thread.x];
            }
            return sum;
        }).setOutput([512, 512]);
        const result = gpuMatMult(A, B);
        return dress(result, "");
    } else if (L = 1024) {
        const gpuMatMult = gpu.createKernel(function (A, B) {
            var sum = 0;
            for (var i = 0; i < 1024; i++) {
                sum += A[this.thread.y][i] * B[i][this.thread.x];
            }
            return sum;
        }).setOutput([1024, 1024]);
        const result = gpuMatMult(A, B);
        return dress(result, "");
    }
    else {
        const gpuMatMult = gpu.createKernel(function (A, B) {
            var sum = 0;
            for (var i = 0; i < 512; i++) {
                sum += A[this.thread.y][i] * B[i][this.thread.x];
            }
            return sum;
        }).setOutput([512, 512]);
        const result = gpuMatMult(A, B);
        return dress(result, "");

    }

}*/
function gpuMult512Old() {
    var A = cM(512, 0.5);
    var B = cM(512, 2.0);
    var n = A.length;

    const gpu = new GPU({ mode: "webgl" });
    const gpuMatMult = gpu.createKernel(function (A, B,n) {
        var sum = 0;
        for (var i = 0; i < n; i++) {
            sum += A[this.thread.y][i] * B[i][this.thread.x];
        }
        return sum;
    }).setOutput([A.length, B[0].length]);
    const C = gpuMatMult(A, B, n);
    return C;
}
function gpuMult512() {
    var A = cM(512, 0.5);
    var B = cM(512, 2.0);
    //var n = A.length;

    const gpu = new GPU({ mode: "webgl" });
    const gpuMatMult = gpu.createKernel(function (A, B, n) {
        let n100 = Math.floor(n / 100);
        let n101=n100+1;
        let n1 = n - 100 * n100;
        let sum = 0;
        for(var i100=0; i100 < n101; i100++){
            for (var i = 0; i < 100; i++) {
                let index = i + 100 * i100;
                if (index < n) sum += A[this.thread.y][index] * B[index][this.thread.x];
            }
        }
        return sum;
    }).setOutput([A.length, B[0].length]);
    const C = gpuMatMult(A, B, A.length);
    return C;
}
function cM(N,d){
        var r=[];
        var ar=[];
        for(var i=0;i<N;i++) r.push(d);
        for(var i=0;i<N;i++) ar.push(r);
        return ar;
}
/*
//function gpuMult(vL, vTexture) {
function gpuMult(vL) {
        var L = fromVNtoN(vL);

        var A=cM(512,0.5);
        var B = cM(512, 2.0);
      //  alert("B=" + B);
      //  alert("B=" + B);
        const gpu = new GPU({ mode: "webgl" });
        const gpuMatMult = gpu.createKernel(function (A, B) {
            var sum = 0;
            for (var i = 0; i < 512; i++){ 
                sum += A[this.thread.y][i] * B[i][this.thread.x]; 
            }
            return sum;
        }).setOutput([512, 512]);
        const result = gpuMatMult(A, B);
     //   alert("result=" + result);
        return result;
    
}
*/
function gpuBenchmark(vL) {
    var L = fromVNtoN(vL);
    //   if (!Number.isInteger(1 * L)) throw "the argument should be an iteger number - the number of rows in a square matrex";
    var sDimRows = L;
    var sDimCols = L;
    var str512 = "" + L;
    var r = [];
    var A = [];
    var d = 0.5;
    for (var i = 0; i < L; i++) r.push(d);
    for (var i = 0; i < L; i++) A.push(r);
    r = [];
    d = 2.0;
    var B = [];
    for (var i = 0; i < L; i++) r.push(d);
    for (var i = 0; i < L; i++) B.push(r);

 //   alert("A=" + A);
 //   alert("B=" + B);
    arOut = {};
    arIn = {};
    arIn['A'] = A;
    arIn['B'] = B;

 //   alert(arIn['A'] + " " + arIn['B']);
 //   alert(str512 + " " + sDimRows + " " + sDimCols);

    var s = "function multiply(A, B) {\n"
//  + "   alert(arIn[" + "'A'" + "]);\n"
 + "   const gpu = new GPU({ mode: 'webgl' });\n"
 + "   const gpuMatMult = gpu.createKernel(function (A, B) {\n"
 + "       var sum = 0;\n"
 + "       for (var i = 0; i <" + str512 + "; i++) {\n"
 + "           sum += A[this.thread.y][i] * B[i][this.thread.x];\n"
 + "      }\n"
 + "       return sum;\n"
     + "   }).setOutput([" + sDimRows + "," + sDimCols + "]);\n"
 + "   const result=gpuMatMult(A, B);\n"
 + "   arOut[-1]= result;\n"
 + "}\n"
+ " multiply(arIn[" + "'A'" + "],  arIn[" + "'B'" + "]);";

    var myFun = new Function(s);
    myFun();
    return arOut[-1];

}

function gpuMatrMult(A, B,idA,idB) {
    var sARows = "";
    var sACols = "";
    var sBRows = "";
    var sBCols = "";



arOut = {};
arIn = {};



    for (var iLine = 0; iLine < arFromPresentationIndexToSeriesID.length; iLine++) {
        var id = arFromPresentationIndexToSeriesID[iLine];
        var name = arNameFormula[iLine][0];


    //    if (arAllDs[id].result != undefined && arAllDs[id].result[0] != undefined && arAllDs[id].result[0].length >= 1 && arAllDs[id].result.length >= 1 && arAllDs[id].result[0][0] != 'x') {//matrix
               if (isMatrix(arAllDs[id].result)) {//matrix
//alert("1. iLine=" + iLine + " arAllDs[id].id=" + arAllDs[id].id+" idA="+idA+" idB="+idB);
            if (1*arAllDs[id].id == 1*idA || 1*arAllDs[id].id == 1*idB) {
                //alert("2. iLine=" + iLine + " arAllDs[id]" + arAllDs[id].id);

                var rStart = 0;
                var cStart = 0;
                //if (isLetter(arAllDs[id].result[0][0][0])) {
                if (isNaN(arAllDs[id].result[0][0])) {
                    rStart = 1;
                    cStart = 1;
                }
                var rows = arAllDs[id].result.length;
                var cols = arAllDs[id].result[0].length;
                var mat = [];
                for (var r = rStart; r < rows; r++) {
                    var ar = [];
                    for (var c = cStart; c < cols; c++) {
                        var d = arAllDs[id].result[r][c];////////////////////////////////////
                        if (c > 0 && r > 0 || !isNaN(d))
                            d = 1 * arAllDs[id].result[r][c];
                        ar.push(d);
                    }
                    mat.push(ar);
                }
 //alert("name=" + name);
                arIn[name] = mat;
                if (1 * arAllDs[id].id == 1 * idA) {
                    sARows = A.length;
                    sACols = A[0].length;
                }
                if (1 * arAllDs[id].id == 1 * idB) {
                    sBRows = B.length;
                    sBCols = B[0].length;
                }  
            }

        }

    }
     //       alert("sBRows=" + sBRows + "sACols=" + sACols);
            if (parseInt(sBRows) != parseInt(sACols)) throw "second matrix must have number of rows equal to number of cols in first matrix";

        //    alert("A=" + A + " B=" + B);
    //        alert(arIn['A'] + " " + arIn['B']);
     //       alert(sACols + " " + sACols+" "+sBCols);

    var s = "function multiply(A, B) {\n"
//+ "   alert(arIn[" + "'A'" + "]);\n"
    + "   const gpu = new GPU({ mode: 'webgl' });\n"
    + "   const gpuMatMult = gpu.createKernel(function (A, B) {\n"
    + "       var sum = 0;\n"
    + "       for (var i = 0; i <"+sACols+"; i++) {\n"
    + "           sum += A[this.thread.y][i] * B[i][this.thread.x];\n"
    + "      }\n"
    + "       return sum;\n"
        + "   }).setOutput([" + sARows + "," + sBCols + "]);\n"
    + "   const result=gpuMatMult(A, B);\n"
    + "   arOut[-1]= result;\n"
    + "}\n"
    + " multiply(arIn[" + "'A'" + "],  arIn[" + "'B'" + "]);";
    var myFun = new Function(s);
    myFun();
    return arOut[-1];
}
function gpuSma(A, vN) {
    if (A == undefined) return [[[1], [2]], [[3], [4]]];
    var bNamed = true;
    var N = fromVNtoN(vN);
//alert("N=" + N);
    var sN = "" + N;
arOut = {};
arIn = {};
    var startCol = 0;
    var ZR = removeNaN(A);
    var Z = ZR[0];
    var arRemovedRows = ZR[1];
    var bNamed = ZR[2];

    //alert("Z=" + Z);
    if (N > Z.length) throw "number of non-empty rows in the table must be >= " + N;

/*
    var gpu = new GPU({ mode: 'webgl' });
    var s1 = "gpu.createKernel(function (Z) {\n"
+ "            let sum = 0;\n"
+ "            var r = " + sN + "-1+this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            for (let i = 0; i < " + sN + "; i++) {\n"
+ "                sum += 1*Z[r - i][c];\n"
+ "            }\n"
+ "            return sum / " + sN + ";\n"
+ "        }).setOutput([Z[0].length, Z.length-N+1]);"
    const GpuSma = eval(s1);
    var Result = GpuSma(Z);
*/
    arIn["name"] = Z;
    var s = "function Sma(Z) {\n"
    + "   const gpu = new GPU({ mode: 'webgl' });\n"
    + "   const gSma = gpu.createKernel(function (Z) {\n"
+ "            let sum = 0;\n"
+ "            var r = " + sN + "-1+this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            for (let i = 0; i < " + sN + "; i++) {\n"
+ "                sum += 1*Z[r - i][c];\n"
+ "            }\n"
+ "            return sum / " + sN + ";\n"
+ "        }).setOutput([Z[0].length, Z.length-" + sN + "+1]);"
    + "   const result=gSma(Z);\n"
    + "   arOut[-1]= result;\n"
    + "}\n"
    + " Sma(arIn[" + "'name'" + "]);";
    var myFun = new Function(s);
// alert("s="+s);
    myFun();
    var Result=arOut[-1];


    if (!bNamed) return Result;

    return returnNaN(A, Result, arRemovedRows, bNamed);

}
function gpuSmaBad(A, vN) {
    if (A == undefined) return [[[1], [2]], [[3], [4]]];

    var bNamed = true;

    var N = fromVNtoN(vN);
    var sN = "" + N;

    var startCol = 0;
  //  var startRow=0;
  //  var arRemovedRows = [];
    
    var ZR = removeNaN(A);
    var Z = ZR[0];
    var arRemovedRows = ZR[1];
    var bNamed = ZR[2];

/*
    var Z = [];
    var ch = A[0][0];
    if (isNaN(ch)) {
        startCol=1;
   //     startRow = 1;
    }
    else {//?????????????????????????
        bNamed = false;
    }
      // Remove rows with NaN  
    for (var r = 0; r < A.length; r++) {
        if (isNaN(A[r][startCol])) {
            //   alert("r="+r+" A[r]=" + A[r]);
            arRemovedRows.push(r);
        } else {
            var ar = [];
            for (var c = startCol; c < A[r].length; c++) {
                ar.push(1*A[r][c]);
            }
            Z.push(ar);
            //Z.push(A[r].slice());
        }
    }
  */  
//alert("Z=" + Z);
    if (N > Z.length) throw "number of non-empty rows in the table must be >= " + N;
    var gpu = new GPU({ mode: 'webgl' });


    var s1 = "gpu.createKernel(function (Z) {\n"
+ "            let sum = 0;\n"
+ "            var r = " + sN + "-1+this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            for (let i = 0; i < " + sN + "; i++) {\n"
+ "                sum += 1*Z[r - i][c];\n"
+ "            }\n"
+ "            return sum / " + sN + ";\n"
+ "        }).setOutput([Z[0].length, Z.length-" + sN + "+1]);"
    //if (Z == undefined || Z[0] == undefined) return [[[1], [2]], [[3], [4]]];

    const GpuSma = eval(s1);
    var Result = GpuSma(Z);



    if (!bNamed) return Result;

    return returnNaN(A, Result, arRemovedRows, bNamed);
    /*
    var r = A.length - 1;
    var lastRemovedRow = arRemovedRows.pop();
    var ans = [];
    for (var row = Result.length - 1; row >= 0; row--) {
        //   alert("row=" + row + " r=" + r + " lastRemovedRow=" + lastRemovedRow + " Alert[row]=" + Alert[row] + "A[r][0]=" + A[r][0]);
        var ar = [];
        if (lastRemovedRow < r) {
            ar.push(A[r][0]);
            for (var c = 0; c < Result[row].length; c++) {
                ar.push(Result[row][c]);
            }
            ans.push(ar);
            r--;
        } else {// lastRemovedRow == r
            ans.push(A[r]);
            lastRemovedRow = arRemovedRows.pop();
            r--;
            row++;//
        }
    }
    if (bNamed) {
        ans.push(A[0]);
    }
    ans = ans.reverse();
    return ans;
    */
}
function gpuAcc(A) {
    //  if (!isMatrix(A)) throw "the argument should be a table";
    var bNamed = true;
    var startCol = 0;
    var arRemovedRows = [];

    var Z = [];
    var ch = A[0][0];
    if (isNaN(ch)) startCol = 1;
    else bNamed = false;
    // Remove rows with NaN  
    for (var r = 0; r < A.length; r++) {
        if (isNaN(A[r][startCol])) arRemovedRows.push(r);
        else {
            var ar = [];
            for (var c = startCol; c < A[r].length; c++) {
                ar.push(1 * A[r][c]);
            }
            Z.push(ar);
        }
    }

    var sRows = ""+Z.length;
   const gpu = new GPU({ mode: 'webgl' });
    var s1 = "gpu.createKernel(function (Z) {\n"
+ "            let sum = 0;\n"
+ "            var r = this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            for(let i=0;i<" + sRows + ";i++){\n"
+ "                if (i<=r) {sum += 1*Z[r - i][c];}\n"
+ "            }\n"
+ "            return sum;\n"
+ "        }).setOutput([Z[0].length, Z.length]);"

    const GpuAcc1 = eval(s1);
    var Result = GpuAcc1(Z);
    if (!bNamed) return Result;

    var r = A.length - 1;
    var lastRemovedRow = arRemovedRows.pop();
    var ans = [];
    for (var row = Result.length - 1; row >= 0; row--) {
        //   alert("row=" + row + " r=" + r + " lastRemovedRow=" + lastRemovedRow + " Alert[row]=" + Alert[row] + "A[r][0]=" + A[r][0]);
        var ar = [];
        if (lastRemovedRow < r) {
            ar.push(A[r][0]);
            for (var c = 0; c < Result[row].length; c++) {
                ar.push(Result[row][c]);
            }
            ans.push(ar);
            r--;
        } else {// lastRemovedRow == r
            ans.push(A[r]);
            lastRemovedRow = arRemovedRows.pop();
            r--;
            row++;//
        }
    }
    if (bNamed) {
        ans.push(A[0]);
    }
    ans = ans.reverse();
    return ans;
}
function makeArray(w, h, val) {
    var arr = [];
    for (i = 0; i < h; i++) {
        arr[i] = [];
        for (j = 0; j < w; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
}
function gpuAccum(A) {
    //  if (!isMatrix(A)) throw "the argument should be a table"; 

    var bNamed = true;
    var startCol = 0;

    var ZR = removeNaN(A);
    var Z = ZR[0];
    var arRemovedRows = ZR[1];
    var bNamed = ZR[2];


    //var nBase = 10;
    var nBase = Math.floor(Math.sqrt(Z.length));
    var sBase = "" + nBase;
    var sRows = "" + Z.length;
    var sRows10 = "" + Math.floor(Z.length / nBase);
    //alert("Z[1][1]=" + Z[1][1]+ " Z.length=" + Z.length+ " Z[0].length=" + Z[0].length + " Z[1].length=" + Z[1].length);

/*
    const gpu = new GPU({ mode: 'webgl' });
    var s10 = "gpu.createKernel(function (Z) {\n"
+ "            let sum = 0;\n"
+ "            var r = " + sBase + "*this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            for(var i=0;i<" + sBase + ";i++){\n"
+ "                 if(r-i>=0  && r-i<" + sRows + ") sum+=1*Z[r-i][c];\n"
+ "            };\n"
+ "            return sum;\n"
+ "        }).setOutput([Z[0].length, 1+Math.floor(Z.length/" + sBase + ")]);"
    const GpuAccum10 = eval(s10); 
    var Result10 = GpuAccum10(Z); //var Result = GpuAccum10(Z);
*/

    arOut = {};
    arIn = {};
    arIn["name"] = Z;
    var s = "function Accum10(Z) {\n"
    + "   const gpu = new GPU({ mode: 'webgl' });\n"
    + "   const gAccum10 = gpu.createKernel(function (Z) {\n"
+ "            let sum = 0;\n"
+ "            var r = " + sBase + "*this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            for(var i=0;i<" + sBase + ";i++){\n"
+ "                 if(r-i>=0  && r-i<" + sRows + ") sum+=1*Z[r-i][c];\n"
+ "            };\n"
+ "            return sum;\n"
+ "        }).setOutput([Z[0].length, 1+Math.floor(Z.length/" + sBase + ")]);"
    + "   const result=gAccum10(Z);\n"
    + "   arOut[-1]= result;\n"
    + "}\n"
    + " Accum10(arIn[" + "'name'" + "]);";
    var myFun = new Function(s);
    myFun();

    var Result10 = arOut[-1];
 //   alert("Result10="+Result10);


/*
    const gpu = new GPU({ mode: 'webgl' });
    var s1 = "gpu.createKernel(function (Z,R) {\n"
+ "            var r = this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            let sum = 1*Z[0][c];\n"
+ "            for(var j=1;j<=" + sRows10 + ";j++){\n"
+ "                 if(" + sBase + "*j<=r)sum+=1*R[j][c];\n"
+ "            };\n"
+ "            let s = 0;\n"
+ "            for(var i=0;i<" + sBase + ";i++){\n"
+ "                 if(i<r-" + sBase + "*Math.floor(r/" + sBase + ")) s+=1*Z[r-i][c];\n"
+ "            };\n"
+ "            return sum+s;\n"
+ "        }).setOutput([Z[0].length, Math.floor(Z.length)]);"
    const GpuAccum1 = eval(s1);
    var Result = GpuAccum1(Z, Result10);
*/
    arIn["name"] = Z;
    arIn["name1"] = Result10;
    var s1 = "function Accum1(Z,R) {\n"
    + "   const gpu = new GPU({ mode: 'webgl' });\n"
    + "   const gAccum1 = gpu.createKernel(function (Z,R) {\n"
+ "            var r = this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            let sum = 1*Z[0][c];\n"
+ "            for(var j=1;j<=" + sRows10 + ";j++){\n"
+ "                 if(" + sBase + "*j<=r)sum+=1*R[j][c];\n"
+ "            };\n"
+ "            let s = 0;\n"
+ "            for(var i=0;i<" + sBase + ";i++){\n"
+ "                 if(i<r-" + sBase + "*Math.floor(r/" + sBase + ")) s+=1*Z[r-i][c];\n"
+ "            };\n"
+ "            return sum+s;\n"
+ "        }).setOutput([Z[0].length, Math.floor(Z.length)]);"
    + "   const result=gAccum1(Z,R);\n"
    + "   arOut[-2]= result;\n"
    + "}\n"
    + " Accum1(arIn[" + "'name'" + "],arIn[" + "'name1'" + "]);";
    var myFun = new Function(s1);
    myFun();

    var Result = arOut[-2];


    if (!bNamed) return Result;
  //  alert(3);
    return returnNaN(A, Result, arRemovedRows, bNamed);

}
function gpuAccumBad(A) {
    //  if (!isMatrix(A)) throw "the argument should be a table"; 

    var bNamed = true;
    var startCol = 0;

    var ZR = removeNaN(A);
    var Z = ZR[0];
    var arRemovedRows = ZR[1];
    var bNamed = ZR[2];


    //var nBase = 10;
    var nBase = Math.floor(Math.sqrt(Z.length));
    var sBase = "" + nBase;
    var sRows = "" + Z.length;
    var sRows10 = "" + Math.floor(Z.length / nBase);
//alert("Z[1][1]=" + Z[1][1]+ " Z.length=" + Z.length+ " Z[0].length=" + Z[0].length + " Z[1].length=" + Z[1].length);


    const gpu = new GPU({ mode: 'webgl' });  
       var s10 = "gpu.createKernel(function (Z) {\n"
   + "            let sum = 0;\n"
   + "            var r = " + sBase + "*this.thread.y;\n"
   + "            var c = this.thread.x;\n"
   + "            for(var i=0;i<"+sBase+";i++){\n"
   + "                 if(r-i>=0  && r-i<" + sRows + ") sum+=1*Z[r-i][c];\n"
   + "            };\n"
   + "            return sum;\n"
   + "        }).setOutput([Z[0].length, 1+Math.floor(Z.length/" + sBase + ")]);"
    const GpuAccum10 = eval(s10);
    var Result = GpuAccum10(Z);
    var Result10 = GpuAccum10(Z);
    alert(Result10);


//alert("Result10[1][1]=" + Result10[1][1]);
    var s1 = "gpu.createKernel(function (Z,R) {\n"
+ "            var r = this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            let sum = 1*Z[0][c];\n"
+ "            for(var j=1;j<="+sRows10+";j++){\n"
+ "                 if(" + sBase + "*j<=r)sum+=1*R[j][c];\n"
+ "            };\n"
+ "            let s = 0;\n"
+ "            for(var i=0;i<" + sBase + ";i++){\n"
+ "                 if(i<r-" + sBase + "*Math.floor(r/" + sBase + ")) s+=1*Z[r-i][c];\n"
+ "            };\n"
+ "            return sum+s;\n"
+ "        }).setOutput([Z[0].length, Math.floor(Z.length)]);"
//alert(2);
    const GpuAccum1 = eval(s1);
    var Result = GpuAccum1(Z, Result10);

 //   alert(bNamed);
    alert(Result);

    if (!bNamed) return Result;
    //alert(3);
    return returnNaN(A, Result, arRemovedRows, bNamed);

}
function removeNaN(A) {
  //  alert("removeNaN");
    var bNamed = true;
    var startCol = 0;
    var arRemovedRows = [];

    var Z = [];
    var ch = A[0][0];
    if (isNaN(ch)) startCol = 1;
    else {
        bNamed = false;
        return [A, arRemovedRows, bNamed];////////// ?????????????
    }
    // Remove rows with NaN  
    for (var r = 0; r < A.length; r++) {
        if (isNaN(A[r][startCol])) arRemovedRows.push(r);
        else {
            var ar = [];
            for (var c = startCol; c < A[r].length; c++) {
                ar.push(1 * A[r][c]);
            }
            Z.push(ar);
        }
    }
    return [Z, arRemovedRows, bNamed];
}
function removeNaN1(A) {
    //  alert("removeNaN1");
    var bNamed = true;
    var startCol = 0;
    var arRemovedRows = [];

    var Z = [];
    if (!isNaN(A[0])) {
        bNamed = false;
        return [A, arRemovedRows, bNamed];
    }
    // Remove rows with NaN  
    for (var r = 0; r < A.length; r++) {
        if (isNaN(A[r])) arRemovedRows.push(r);
        else {
            Z.push(1 * A[r]);
        }
    }
    return [Z, arRemovedRows, bNamed];
}
function returnNaN(A, Result, arRemovedRows, bNamed) {
    var r = A.length - 1;// last Result??
    var lastRemovedRow = arRemovedRows.pop();
    var ans = [];
    for (var row = Result.length - 1; row >= 0; row--) {
        //   alert("row=" + row + " r=" + r + " lastRemovedRow=" + lastRemovedRow + " Alert[row]=" + Alert[row] + "A[r][0]=" + A[r][0]);
        var ar = [];
        if (lastRemovedRow < r) {
            ar.push(A[r][0]);
            for (var c = 0; c < Result[row].length; c++) {

                if (Result[row][c] > -1.7e38)/////////////////////////////
                    ar.push(Result[row][c]);
                else ar.push(undefined);////////////////
            }
            ans.push(ar);
            r--;
        } else {// lastRemovedRow == r
            ans.push(A[r]);
            lastRemovedRow = arRemovedRows.pop();
            r--;
            row++;//
        }
    }
    if (bNamed) {
        ans.push(A[0]);
    }
    ans = ans.reverse();
    return ans;
}
function returnNaN1(A, Result, arRemovedRows, bNamed) {
    var r = A.length - 1;// last Result??
    var lastRemovedRow = arRemovedRows.pop();
    var ans = [];
    for (var row = Result.length - 1; row >= 0; row--) {
        //   alert("row=" + row + " r=" + r + " lastRemovedRow=" + lastRemovedRow + " Alert[row]=" + Alert[row] + "A[r][0]=" + A[r][0]);
        var ar = [];
        if (lastRemovedRow < r) {
            ar.push(A[r][0]);
            for (var c = 0; c < Result[row].length; c++) {
                ar.push(Result[row][c]);
            }
            ans.push(ar);
            r--;
        } else {// lastRemovedRow == r
            ans.push(A[r]);
            lastRemovedRow = arRemovedRows.pop();
            r--;
            row++;//
        }
    }
    if (bNamed) {
        ans.push(A[0]);
    }
    ans = ans.reverse();
    return ans;
}
function returnOneColOfNaN(A, Result, arRemovedRows, bNamed) {

  //  alert("Result[0].length=" + Result[0].length);

    var r = A.length - 1;
    var lastRemovedRow = arRemovedRows.pop();
    var ans = [];
    for (var row = Result.length - 1; row >= 0; row--) {
        //   alert("row=" + row + " r=" + r + " lastRemovedRow=" + lastRemovedRow + " Alert[row]=" + Alert[row] + "A[r][0]=" + A[r][0]);
        var ar = [];
        if (lastRemovedRow < r) {
            ar.push(A[r][0]);
            for (var c = 0; c < Result[row].length; c++) {
                ar.push(Result[row][c]);
            }
            ans.push(ar);
            r--;
        } else {// lastRemovedRow == r
            //ans.push(A[r]);
            var ar = [A[r][0],A[r][1]];////////
            ans.push(ar);/////////////
            lastRemovedRow = arRemovedRows.pop();
            r--;
            row++;//
        }
    }
    if (bNamed) {
        var ar = ["TOTAL", "SumOfCols"];////////
        ans.push(ar);
    }
    ans = ans.reverse();
    return ans;
}

function accMatrix(A) {
    var ZR = removeNaN(A);
    var Z = ZR[0];
    var arRemovedRows = ZR[1];
    var bNamed = ZR[2];
  ///////////////
    var Result = [];
    for (var r = 0; r < Z.length; r++) {
        var ar = [];
        for (var c = 0; c < Z[r].length; c++) {
            if (r == 0) ar.push(1 * Z[r][c]);
            else ar.push(1 * Z[r][c] + 1 * Result[r-1][c]);
        }
        Result.push(ar);
    }
    if (!bNamed) return Result;
    /////////////
    return returnNaN(A, Result, arRemovedRows, bNamed);
}

/*
function flipFlopStatus(A) {
    var ZR = removeNaN(A);
    var Z = ZR[0];
    var arRemovedRows = ZR[1];
    var bNamed = ZR[2];
    ///////////////
    var Result = [];
    for (var r = 0; r < Z.length; r++) {
//if (r>0) alert(r + " " + Z[r][6] + " " + Result[r - 1][6]);
        var ar = [];
        for (var c = 0; c < Z[r].length; c++) {
            if (r == 0) ar.push(1 * 0);//always starts from zero
            else {
                if (Result[r - 1][c] == 0) ar.push(1 * Z[r][c]);//start
                else if (Z[r][c] == 0) ar.push(1 * Result[r - 1][c]);//no alerts
                else ar.push(Z[r][c]);
            }
        }
        Result.push(ar);
    }
    if (!bNamed) return Result;
    return returnNaN(A, Result, arRemovedRows, bNamed);
}
*/
/*
function smaMatrixOld(A,p) {
    var ZR = removeNaN(A);
    var Z = ZR[0];
    var arRemovedRows = ZR[1];
    var bNamed = ZR[2];
    ///////////////
    //Start
    if (p < 1) throw "Parameter should be greater than 0";
    if (p > Z.length - 1) throw "Parameter should be less or equal to number of data points";
    var Sum = [];
    for (var r = 0; r < Z.length; r++) {
        var ar = [];
        for (var c = 0; c < Z[r].length; c++) {
            if (r == 0) ar.push(1 * Z[r][c]);
            else ar.push(1 * Z[r][c] + 1 * Sum[r - 1][c]);
        }
        Sum.push(ar);
    }
    var Result = [];
    for (var r = p-1; r < Sum.length; r++) {
        var ar = [];
        for (var c = 0; c < Sum[r].length; c++) {
            if (r == p - 1) ar.push(1 * Sum[r][c]/p);
            else ar.push((1 * Sum[r][c] - 1 * Sum[r - p][c])/p);
        }
        Result.push(ar);
    }
    if (!bNamed) return Result;
    /////////////
    return returnNaN(A, Result, arRemovedRows, bNamed);
}
*/

function smaFuncFromMatrix(A, p, fOld) {
    //  alert(A[0][0]);
    //  alert(A[1][0]);
    var bDated = false;
    var bNamed = true;
    var startCol = 1;
    var startRow = 1;
    if (!isNaN(A[0][0])) {
        startCol = 0;
        startRow = 0;
        bNamed = false;
    }
    else {
        var a10 = "" + A[1][0];//2017-12-10
        if (a10.length == 10 && a10[4] == '-' && a10[7] == '-') {
            bDated = true;
        }
    }
    //   alert("bNamed=" + bNamed + " bDated=" + bDated);
    //   var lastNotEmptyRow;
    var arEnds = [];
    var arStarts = [];
    var arAns = [];
    var rowStart = A.length - 1;
    var rowEnd = 0;
    for (var c = startCol; c < A[0].length; c++) {
        var arRemovedRows = [];
        var Z = [];
        for (var r = 0; r < A.length; r++) {
            //alert(r+" : "+A[r]);
            if (isNaN(A[r][c])) arRemovedRows.push(r);
            else {
                if (Z.length == 0) Z.push(r);
                Z.push(1 * A[r][c]);
                arEnds[c] = r;
            }
        }
//alert("Z=" + Z);
        // var Result = smaOld(Z, p);/////////////////////////////
        var Result = fOld(Z, p);/////////////////////////////
        //       alert(c + " Result.length=" + Result.length + " Result[Result.length-1]=" + Result[Result.length - 1]);
        arStarts[c] = Result[0];// w/o chars and with chars
        Result.shift();// w/o horizontal shift
        //alert("start="+start+" Result=" + Result);
        //if (rowStart > r) rowStart = r;
        var r = A.length - 1;// last Result??
        //    var r = Result[0] + Result.length - 1;// last Result??
        var lastRemovedRow = arRemovedRows.pop();
        var ans = [];
        for (var row = Result.length - 1; row >= 0; row--) {
            //alert("row=" + row + " r=" + r + " lastRemovedRow=" + lastRemovedRow + "A[r][0]=" + A[r][0]);
            if (lastRemovedRow < r || arRemovedRows.length == 0) {
                ans.push(Result[row]);
                r--;
            } else {// lastRemovedRow == r
                if (ans.length > 0) ans.push(undefined);
                lastRemovedRow = arRemovedRows.pop();
                r--;
                row++;//
            }
        }

        if (bNamed) {
            ans.push(A[0][c]);// msft ibm ...
        }
        ans = ans.reverse();
        arAns.push(ans);
        //alert("c=" + c + "ans=" + ans);
        //alert("c=" + c + "ans.length=" + ans.length + " arEnds[c]=" + arEnds[c]);
        if (rowStart >= arStarts[c]) rowStart = arStarts[c];
        if (rowEnd <= arEnds[c]) rowEnd = arEnds[c];//????  -1 ??
        //if (rowEnd<=)

    }


    //   alert("rowStart=" + rowStart + " rowEnd=" + rowEnd);
    //    alert("arStarts=" + arStarts);
    // alert("arEnds=" + arEnds);
    //  alert("A.length=" + A.length);

    var arOut = [];
    if (bNamed && bDated) {
        var ar = [];
        for (var c = 0; c < A[0].length; c++) {
            ar.push(A[0][c]);// msft ibm ...
        }
        arOut.push(ar);
    }
    else {////////////////////
        var ar = [];
        for (var c = 0; c < A[0].length; c++) {
            ar.push("col"+c);// msft ibm ...
        }
        arOut.push(ar);
    }////////////////////////

    // for (var r = rowStart + 1; r < rowEnd; r++) {
    for (var r = rowStart + startRow; r <= rowEnd; r++) {
        var ar = [];
        for (var c = 0; c < A[0].length; c++) {
            if (c == 0 && bDated) ar.push(A[r][c]);// and DATED
        //    else if (c == 0) ar.push("row"+(r+1));//////////////
            else ar.push(undefined);
        }
        arOut.push(ar);
    }
 //alert("arOut=" + arOut);
//return arOut;

    for (var c = startCol ; c <= arAns.length - 1 + startCol; c++) {
        for (var i = 0; i < arAns[c - startCol].length - startRow; i++) {
           arOut[arEnds[c] - rowStart - i][c] = arAns[c - startCol][arAns[c - startCol].length - 1 - i];
            // arOut[arEnds[c] - rowStart - i +1-startRow][c+1-startCol] = arAns[c - startCol][arAns[c - startCol].length - 1 - i];
        }
    }
    return arOut;
}

/*
function smaMatrix(A, p, fOld) {
  //  alert(A[0][0]);
    //  alert(A[1][0]);
    var bDated = false;
    var bNamed = true;
    var startCol = 1;
    var startRow = 1;
    if (!isNaN(A[0][0])) {
        startCol = 0;
        startRow = 0;
        bNamed = false;
    }
    else {
        var a10 = "" + A[1][0];//2017-12-10
        if (a10.length == 10 && a10[4] == '-' && a10[7] == '-') {
            bDated = true;
        }
    }
 //   alert("bNamed=" + bNamed + " bDated=" + bDated);
 //   var lastNotEmptyRow;
    var arEnds = [];
    var arStarts = [];
    var arAns = [];
    var rowStart = A.length - 1;
    var rowEnd = 0;
    for (var c = startCol; c < A[0].length; c++) {
        var arRemovedRows = [];
        var Z = [];
        for (var r = 0; r < A.length; r++) {
            //alert(r+" : "+A[r]);
            if (isNaN(A[r][c])) arRemovedRows.push(r);
            else {
                if (Z.length == 0) Z.push(r);
                Z.push(1 * A[r][c]);
                arEnds[c] = r;
            }
        }
       // var Result = smaOld(Z, p);/////////////////////////////
        var Result = fOld(Z, p);/////////////////////////////
 //       alert(c + " Result.length=" + Result.length + " Result[Result.length-1]=" + Result[Result.length - 1]);
        arStarts[c] = Result[0];// w/o chars and with chars
        Result.shift();// w/o horizontal shift
//alert("start="+start+" Result=" + Result);
        //if (rowStart > r) rowStart = r;
        var r = A.length - 1;// last Result??
        //    var r = Result[0] + Result.length - 1;// last Result??
        var lastRemovedRow = arRemovedRows.pop();
        var ans = [];
        for (var row = Result.length - 1; row >= 0; row--) {
//alert("row=" + row + " r=" + r + " lastRemovedRow=" + lastRemovedRow + "A[r][0]=" + A[r][0]);
            if (lastRemovedRow < r || arRemovedRows.length == 0 ) {
                ans.push(Result[row]);
                r--;
            } else {// lastRemovedRow == r
               if (ans.length>0) ans.push(undefined);
                lastRemovedRow = arRemovedRows.pop();
                r--;
                row++;//
            }
        }

        if (bNamed) {
            ans.push(A[0][c]);// msft ibm ...
        }
        ans = ans.reverse();
        arAns.push(ans);
//alert("c=" + c + "ans=" + ans);
//alert("c=" + c + "ans.length=" + ans.length + " arEnds[c]=" + arEnds[c]);
        if (rowStart >= arStarts[c]) rowStart = arStarts[c];
        if (rowEnd <= arEnds[c]) rowEnd = arEnds[c];//????  -1 ??
        //if (rowEnd<=)

    }


 //   alert("rowStart=" + rowStart + " rowEnd=" + rowEnd);
//    alert("arStarts=" + arStarts);
// alert("arEnds=" + arEnds);
  //  alert("A.length=" + A.length);

    var arOut = [];
    if (bNamed && bDated) {
        var ar = [];
        for (var c = 0; c < A[0].length; c++) {
            ar.push(A[0][c]);// msft ibm ...
        }
        arOut.push(ar);
   }

  // for (var r = rowStart + 1; r < rowEnd; r++) {
    for (var r = rowStart + startRow; r <= rowEnd; r++) {
       var ar = [];
       for (var c = 0; c < A[0].length; c++) {
           if (c == 0 && bDated) ar.push(A[r][c]);// and DATED
          // else ar.push(arAns[c - 1][r - rowStart]);
           else ar.push(undefined);
       }
       arOut.push(ar);
    }
//    alert("arOut.length=" + arOut.length + "arOut[0].length=" + arOut[0].length);
  //  alert("arAns.length=" + arAns.length);
    //return arOut;
    for (var c = startCol ; c <= arAns.length - 1 + startCol; c++) {
      //  alert("arAns.length=" + arAns.length + " startCol=" + startCol+" c="+c);
 //        alert(c+"  ---  arAns[c - startCol].length=" + arAns[c - startCol].length);
         for (var i = 0; i < arAns[c - startCol].length - startRow; i++) {
             //alert("arAns[c - startCol][arAns[c - startCol].length-1-i]=" + arAns[c - startCol][arAns[c - startCol].length - 1 - i]);
             if (c > 5 && i > arEnds[c] - rowStart-5) {
           //      alert("i=" + i);
            //     alert(" arEnds[c]=" + arEnds[c]);
           //      alert(" rowStart =" +  rowStart );
            //     alert(" arEnds[c] - rowStart - i=" + (arEnds[c] - rowStart - i));
             }
             arOut[arEnds[c] - rowStart - i][c] = arAns[c - startCol][arAns[c - startCol].length - 1 - i];
         }
     }
    return arOut;
}
*/
function gpuSmaDif(A, vN, vM) {
    if (A == undefined) return [[[1], [2]], [[3], [4]]];

    var bNamed = true;

    var N = fromVNtoN(vN);
    var sN = "" + N;
    var M = fromVNtoN(vM);
    var sM = "" + M;
    var Max = Math.max(N, M);
    var Min = Math.min(N, M);
    var sMax = "" + Max;
    var sMin = "" + Min;
    // Remove rows with NaN
    var ZR = removeNaN(A);
    var Z = ZR[0];
    var arRemovedRows = ZR[1];
    var bNamed = ZR[2];
    /*
    var startCol = 0;
    var startRow = 0;
    var arRemovedRows = [];

    var Z = [];
    var ch = A[0][0];
    if (isNaN(ch)) {
        startCol = 1;
        startRow = 1;
    }
    else {
        bNamed = false;
    }

    for (var r = 0; r < A.length; r++) {
        if (isNaN(A[r][startCol])) {
            //   alert("r="+r+" A[r]=" + A[r]);
            arRemovedRows.push(r);
        } else {
            var ar = [];
            for (var c = startCol; c < A[r].length; c++) {
                ar.push(1 * A[r][c]);
            }
            Z.push(ar);
        }
    }
    */
    //alert("Z=" + Z);
    var sRows = "" + (Z.length - Max + 1);
    if (Max > Z.length) throw "number of non-empty rows in the table must be >= " + Max;
    const gpu = new GPU({ mode: 'webgl' });

    var sSign = "-";
    if (N == Max) sSign = "";
    var sM1 = "" + (Max - 1);
    var sCols = "" + Z[0].length;
    var s1 = "gpu.createKernel(function (Z) {\n"
+ "            let sum = 1*0;\n"
+ "            var r = " + sM1 + "+this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            for (let i = 0; i < " + sMax + "; i++) {\n"
+ "                sum += Z[r - i][c]/" + sMax + ";\n"
+ "                if(i<" + sMin + ") sum -=Z[r - i][c]/" + sMin + ";\n"
+ "            }\n"
+ "            return " + sSign + "+sum;\n"
+ "        }).setOutput([" + sCols + ", " + sRows + "]);"

  //  alert("s1=" + s1);
    //   myFun = new Function(s1);
    //   var Alert = myFun("Z");
    const GpuSmaDif = eval(s1);
    var Result = GpuSmaDif(Z);

 //   if (!bNamed) return Result;
    // lareR: insert rows back
    //return Result;
    return returnNaN(A, Result, arRemovedRows, bNamed);
}
function gpuSmaStatus(A, vN, vM) {
    if (A == undefined) return [[[1], [2]], [[3], [4]]];

    var bNamed = true;

    var N = fromVNtoN(vN);
    var sN = "" + N;
    var M = fromVNtoN(vM);
    var sM = "" + M;
    var Max = Math.max(N, M);
    var Min = Math.min(N, M);
    var sMax = "" + Max;
    var sMin = "" + Min;

    // Remove rows with NaN
    var ZR = removeNaN(A);
    var Z = ZR[0];
    var arRemovedRows = ZR[1];
    var bNamed = ZR[2];

    var sRows = "" + (Z.length - Max + 1);
    if (Max > Z.length) throw "number of non-empty rows in the table must be >= " + Max;
    const gpu = new GPU({ mode: 'webgl' });

    var sSign = "-1";
    if (N == Max) sSign = "1";
    var sM1 = "" + (Max - 1);
    var sCols = "" + Z[0].length;
/*
    var s1 = "gpu.createKernel(function (Z) {\n"
+ "            let sum = 1*0;\n"
+ "            var r = " + sM1 + "+this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            for (let i = 0; i < " + sMax + "; i++) {\n"
+ "                sum += Z[r - i][c]/" + sMax + ";\n"
+ "                if(i<" + sMin + ") sum -=Z[r - i][c]/" + sMin + ";\n"
+ "            }\n"
+ "            if (this.thread.y==0) return 0;\n"
+ "            else if(sum>0) return " + sSign + ";\n"
+ "            else return -1*" + sSign + ";\n"
+ "        }).setOutput([" + sCols + ", " + sRows + "]);"

    const GpuSmaDif = eval(s1);
    var Result = GpuSmaDif(Z);
*/
arOut = {};
arIn = {};
arIn["name"] = Z;
var s = "function SmaStatus(Z) {\n"
+ "   const gpu = new GPU({ mode: 'webgl' });\n"
+ "   const gSmaStatus = gpu.createKernel(function (Z) {\n"
+ "            let sum = 1*0;\n"
+ "            var r = " + sM1 + "+this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            for (let i = 0; i < " + sMax + "; i++) {\n"
+ "                sum += Z[r - i][c]/" + sMax + ";\n"
+ "                if(i<" + sMin + ") sum -=Z[r - i][c]/" + sMin + ";\n"
+ "            }\n"
+ "            if (this.thread.y==0) return 0;\n"
+ "            else if(sum>0) return " + sSign + ";\n"
+ "            else return -1*" + sSign + ";\n"
+ "        }).setOutput([" + sCols + ", " + sRows + "]);"
+ "   const result=gSmaStatus(Z);\n"
+ "   arOut[-1]= result;\n"
+ "}\n"
+ " SmaStatus(arIn[" + "'name'" + "]);";
var myFun = new Function(s);
    // alert("s="+s);
myFun();

var Result = arOut[-1];


    if (!bNamed) return Result;
    // lareR: insert rows back
    //return Result;
    return returnNaN(A, Result, arRemovedRows, bNamed);
}
function gpuSmaStatusBad(A, vN, vM) {
    if (A == undefined) return [[[1], [2]], [[3], [4]]];

    var bNamed = true;

    var N = fromVNtoN(vN);
    var sN = "" + N;
    var M = fromVNtoN(vM);
    var sM = "" + M;
    var Max = Math.max(N, M);
    var Min = Math.min(N, M);
    var sMax = "" + Max;
    var sMin = "" + Min;

    // Remove rows with NaN
    var ZR = removeNaN(A);
    var Z = ZR[0];
    var arRemovedRows = ZR[1];
    var bNamed = ZR[2];

    var sRows = "" + (Z.length - Max + 1);
    if (Max > Z.length) throw "number of non-empty rows in the table must be >= " + Max;
//const gpu = new GPU({ mode: 'webgl' });

    var sSign = "-1";
    if (N == Max) sSign = "1";
    var sM1 = "" + (Max - 1);
    var sCols = "" + Z[0].length;
    var s1 = "gpu.createKernel(function (Z) {\n"
+ "            let sum = 1*0;\n"
+ "            var r = " + sM1 + "+this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            for (let i = 0; i < " + sMax + "; i++) {\n"
+ "                sum += Z[r - i][c]/" + sMax + ";\n"
+ "                if(i<" + sMin + ") sum -=Z[r - i][c]/" + sMin + ";\n"
+ "            }\n"
+ "            if (this.thread.y==0) return 0;\n"
+ "            else if(sum>0) return " + sSign + ";\n"
+ "            else return -1*" + sSign + ";\n"
+ "        }).setOutput([" + sCols + ", " + sRows + "]);"

    //  alert("s1=" + s1);
    //   myFun = new Function(s1);
    //   var Alert = myFun("Z");
    const GpuSmaDif = eval(s1);
    var Result = GpuSmaDif(Z);

    if (!bNamed) return Result;
    // lareR: insert rows back
    //return Result;
    return returnNaN(A, Result, arRemovedRows, bNamed);
}
function smaStatus(A, vp, vm) {
//alert("smaStatus");
    var p = 1*vp[0];
    var m = 1*vm[0];
//alert(" p=" + p + " m=" + m);
    var ZR = removeNaN(A);
    var Z = ZR[0];
    var arRemovedRows = ZR[1];
    var bNamed = ZR[2];
    ///////////////
    //Start
    if (p < 1) throw "Parameter should be greater than 0";
    if (p > Z.length - 1) throw "Parameter should be less or equal to number of data points";
    if (m < 1) throw "Parameter should be greater than 0";
    if (m > Z.length - 1) throw "Parameter should be less or equal to number of data points";
    var Sum = [];///////////////////
    for (var r = 0; r < Z.length; r++) {
        var ar = [];
        for (var c = 0; c < Z[r].length; c++) {
            if (r == 0) ar.push(1 * Z[r][c]);
            else ar.push(1 * Z[r][c] + 1 * Sum[r - 1][c]);
        }
        Sum.push(ar);
    }
    var Result = [];
    var nMax = Math.max(p, m);
    var nMin = Math.min(p, n);
    var nM1 = nMax - 1;

   

// alert("Sum.length=" + Sum.length + " nM1=" + nM1 + " m=" + m);
    for (var r = nM1; r < Sum.length; r++) {
        var ar = [];
        for (var c = 0; c < Sum[r].length; c++) {
            if (r == nM1) {
                if (p == nMax) ar.push(mySign((Sum[r][c]) / p - (Sum[r][c] - Sum[r - m][c]) / m));
                if (m==nMax) ar.push(mySign((Sum[r][c] - Sum[r - p][c]) / p - (Sum[r][c]) / m));
            }
            else ar.push(mySign((Sum[r][c] - Sum[r - p][c]) / p - (Sum[r][c] - Sum[r - m][c]) / m));

            ////////////////////////////////////////////////////////
            if (r > nM1 && Result[0][c] != 0) {
                if (ar[c] != Result[r - 1-nM1][c]) {
                    for (var row = nM1; row < r; row++) {
                        Result[row-nM1][c] = 0;
                    }
                }
            }
            ////////////////////////////////////////////////
        }
        Result.push(ar);
    }
    if (!bNamed) return Result;
    /////////////
    return returnNaN(A, Result, arRemovedRows, bNamed);
}
//function sumOfCols(A, vp, vm) {
function sumOfCols(A) {
   // if (!isMatrix(A)) throw "the argument should be a table";
    if (!isMatrix(A)) return A;
    var ZR = removeNaN(A);
    var Z = ZR[0];
    var arRemovedRows = ZR[1];
    var bNamed = ZR[2];
    ///////////////
    //Start
    var Sum = [];///////////////////
    for (var r = 0; r < Z.length; r++) {
        var s = 0;
        for (var c = 0; c < Z[r].length; c++) {
            s += 1 * Z[r][c];
        }
        Sum.push([s]);
    }

    if (!bNamed) return Sum;
    /////////////
    return returnOneColOfNaN(A, Sum, arRemovedRows, bNamed);
}
function totals2SMAslow(C, T) {
    var ans = [["Totals"], ["NFast"], ["NSlow"], ["BLevel"], ["SLevel"], ["Total"]];
    //if (isMatrix(C)) return
    if (!isMatrix(T)) throw "second parameter should be a matrix";
    // read Table
    var NPoints = T[1][1];
 //   if (NPoints >= C[C.length - 1].length) throw "NPoints should be less than " + C[C.length - 1].length;
    var NFastSlow = T[2][1];
    var BSLevel = T[3][1];
    var MaxLong = T[4][1];
    var MinShort = T[5][1];
    var Comm = T[6][1];
    var iBest = 0;
    var endBest = -Number.MAX_VALUE;
    //alert("endBest=" + endBest);

    for (var i = 0; i < NPoints; i++) {
        var NFast = Math.ceil(Math.random() * NFastSlow);
        var NSlow = Math.ceil(Math.random() * NFastSlow);
        if (NFast > NSlow) {
            var temp = NSlow;
            NSlow = NFast;
            NFast = NSlow;
        }
        var BLevel = (Math.random() - 0.5) * 2 * BSLevel;
        var SLevel = (Math.random() - 0.5) * 2 * BSLevel;
//NFast = 15;
//NSlow = 5;
        var smaFast=sma(C,NFast);
        var smaSlow = sma(C, NSlow);

        var R = arithm('/', smaFast, smaSlow);
        var D = arithm('-', R, 1);
//BLevel = 0.01;
        var Buy = breakUp(D, [BLevel]);
//SLevel = -0.01;
        var Sell = breakDn(D, [SLevel]);
        var Stat = bStatus([MaxLong], [MinShort], Sell, Buy)
        var NPNL = npNL(Stat, C, [Comm]);
        var nColumns = nCols(NPNL);
        var sum = sumOfCols(NPNL);
        //alert("sum=" + sum);
        //alert("nColumns=" + nColumns);
        var AvgPNL = arithm('/', sumOfCols(NPNL), nColumns[0]);

        //  var end = AvgPNL[AvgPNL.length - 1];
        var end = AvgPNL[AvgPNL.length - 1][1];
//alert("end=" + end);
        if (1*end > 1*endBest) {
            endBest=end;
            iBest = i;
           // alert("iBest=" + iBest + " endBest=" + endBest + " NFast=" + NFast + " NSlow=" + NSlow + " BLevel=" + BLevel + " SLevel=" + SLevel);
            ans[0].push("i=" + i);
            ans[1].push(NFast);
            ans[2].push(NSlow);
            ans[3].push(BLevel);
            ans[4].push(SLevel);
            ans[5].push(end);
        }
        
    }


    return ans;

}
function totals2SMA(TabC, T) {
    var ans = [["Totals"], ["i"],["NFast"], ["NSlow"], ["BLevel"], ["SLevel"], ["Total"]];
    if (!isMatrix(TabC)) throw "first parameter should be a matrix";
    if (!isMatrix(T)) throw "second parameter should be a matrix";

    // read Table
    var NPoints = T[1][1];
    //   if (NPoints >= C[C.length - 1].length) throw "NPoints should be less than " + C[C.length - 1].length;
    var NFastSlow = T[2][1];
    var BSLevel = T[3][1];
    var MaxLong = T[4][1];
    var MinShort = T[5][1];
    var Comm = T[6][1];

    var iBest = 0;
    var endBest = -Number.MAX_VALUE;


//NPoints = 100;
    for (var i = 0; i < NPoints; i++) {

        var arTest = [];
        //for (var i = 0; i < 100; i++) arTest.push(Math.ceil(Math.random() * NFastSlow));
        for (var iT = 0; iT < 100; iT++) arTest.push(Math.random() );
        //alert(arTest);


        var sumNPNL = 0;
        var rand = arTest[0];
        var BLevel = (rand - 0.5) * 2 * BSLevel;
        rand = arTest[1];
        var NFast = Math.ceil(rand * NFastSlow);
        rand = arTest[2];
        var SLevel = (rand - 0.5) * 2 * BSLevel;
        rand = arTest[3];
        var NSlow = Math.ceil(rand * NFastSlow);
//alert(i + " " + NFast + " " + NSlow + " " + BLevel + " " + SLevel);
//continue;
        if (NFast > NSlow) {
            var temp = NSlow;
            NSlow = NFast;
            NFast = NSlow;
        }
        if (NFast == NSlow) {

            NSlow += 1;
        }
/*
NFast = 15;
NSlow = 35;
BLevel = 0;
SLevel = 0;
*/
//alert("2. i=" + i);
        for (var nCol = 1; nCol < TabC[0].length; nCol++) {
//alert("nCol=" + nCol);
            var C = col(TabC, nCol);
            var comp = compressOne(C, C);
           // alert(comp);
            comp = arithm('/', comp, comp[1]);
            comp[0] = 0;
            var accComp = accOld(comp);
//return accComp;
            if (NSlow >= accComp.length) {
                sumNPNL = 0;
                break;
            }
            var smaFast = refOld(-NFast, accComp);
            smaFast = arithm('-', accComp, smaFast);
            smaFast = arithm('/', smaFast, NFast);
//return smaFast;
            var smaSlow = refOld(-NSlow, accComp);
            smaSlow = arithm('-', accComp, smaSlow);
            smaSlow = arithm('/', smaSlow, NSlow);
            var R = arithm('/', smaFast, smaSlow);
            var D = arithm('-', R, 1);
//return D;
            var npnl = 0;
            var prevStat = 0;
            var bPrevBuy = true;
            var bPrevSell = true;
            var shift = D[0] - comp[0];
            for (var j = 1; j < D.length; j++) {
                var bBuy = D[j] > BLevel;
                if (bPrevBuy == false && bBuy) {//buy!
                    if (prevStat < MaxLong) {
                        prevStat++;
                        npnl -= comp[j + shift] - Comm;
//alert("buy j=" + j + " npnl=" + npnl + " D[j]=" + D[j] + " bPrevBuy=" + bPrevBuy + " bBuy=" + bBuy);
                    }
                }
                bPrevBuy = bBuy;

                var bSell = D[j] < SLevel;
                if (bPrevSell == false && bSell) {//Sell!
                    if (prevStat > MinShort) {
                        prevStat--;
                        npnl += comp[j + shift] - Comm;
//alert("sel j=" + j + " npnl=" + npnl + " D[j]=" + D[j] + " bPrevBuy=" + bPrevBuy + " bBuy=" + bBuy);
                    }
                }
                bPrevSell = bSell;
                if (j == D.length - 1) {
                    npnl += prevStat * (comp[j + shift] - Comm);
alert("last npnl=" + npnl);
                }
            }
            sumNPNL += npnl;
        }
        if (1 * sumNPNL > 1 * endBest) {
            //     var end = npnl;
            endBest = sumNPNL;
            iBest = i;
            alert("iBest=" + iBest + " endBest=" + endBest + " NFast=" + NFast + " NSlow=" + NSlow + " BLevel=" + BLevel + " SLevel=" + SLevel);
            ans[0].push("col" + ans[0].length);
            ans[1].push(i);
            ans[2].push(NFast);
            ans[3].push(NSlow);
            ans[4].push(BLevel);
            ans[5].push(SLevel);
            ans[6].push(sumNPNL);
        }
    }
      //  alert("end="+end);
        //alert("end=" + end);

   

    var len = ans[0].length;
    ans[0][len - 1] = "colBest";
    NFast = ans[2][len - 1];
    NSlow = ans[3][len - 1];
    BLevel = ans[4][len - 1];
    SLevel = ans[5][len - 1];
    sumNPNL = ans[6][len - 1];
//alert(NFast + " " + NSlow + " " + BLevel + " " + SLevel + " " + sumNPNL);
 /*   {
        var smaFast = sma(C, NFast);
        var smaSlow = sma(C, NSlow);

        var R = arithm('/', smaFast, smaSlow);
        var D = arithm('-', R, 1);
        var Buy = breakUp(D, [BLevel]);
        var Sell = breakDn(D, [SLevel]);
        var Stat = bStatus([MaxLong], [MinShort], Sell, Buy)
        var NPNL = npNL(Stat, C, [Comm]);
     //   var nColumns = nCols(NPNL);
     //   var sum = sumOfCols(NPNL);
   //     var AvgPNL = arithm('/', sumOfCols(NPNL), nColumns[0]);
    }*/


    return ans;

}
function mySign(d) {
    if (d < 0) return -1;
    else return 1;
}
function gpuSmaAlert(A, vN, vM) {
    if (A == undefined) return [[[1], [2]], [[3], [4]]];
    var N = fromVNtoN(vN);
    var sN = "" + N;
    var M = fromVNtoN(vM);
    var sM = "" + M;
    var Max = Math.max(N, M);
    var Min = Math.min(N, M);
    var sMax = "" + Max;
    var sMin = "" + Min;

    var ZR = removeNaN(A);
    var Z = ZR[0];
    var arRemovedRows = ZR[1];
    var bNamed = ZR[2];

    //alert("Z=" + Z);
    var sRows = "" + (Z.length - Max + 1);

    if (Max > Z.length) throw "number of non-empty rows in the table must be >= " + Max;
    const gpu = new GPU({ mode: 'webgl' });

    var sSign = "";
    if (N == Max) sSign = "-";
    var sM1 = "" + (Max - 1);
    var sCols = "" + Z[0].length;
    var s1 = "gpu.createKernel(function (Z) {\n"
+ "            let sum = 1*0;\n"
+ "            var r = " + sM1 + "+this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            for (let i = 0; i < " + sMax + "; i++) {\n"
+ "                sum += Z[r - i][c]/" + sMax + ";\n"
+ "                if(i<" + sMin + ") sum -=Z[r - i][c]/" + sMin + ";\n"
+ "            }\n"
+ "            return " + sSign + "+sum;\n"
+ "        }).setOutput([" + sCols + ", " + sRows + "]);"
    const GpuSmaDif = eval(s1);
    var Dif = GpuSmaDif(Z);
    // now find Alerts
    sCols = "" + Dif[0].length;
    sRows = Dif.length - 1;

    var s2 = "gpu.createKernel(function (D) {\n"
+ "            let sum = 1*0;\n"
+ "            var r = 1+this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "                if (1*D[r-1][c]<=0 && 1*D[r][c]>0) sum =-1;\n"
+ "                if (1*D[r-1][c]>=0 && 1*D[r][c]<0) sum =1;\n"
+ "            return sum;\n"
+ "        }).setOutput([" + sCols + ", " + sRows + "]);"

    //   alert("s2=" + s2);

    const GpuAlert = eval(s2);
    var Result = GpuAlert(Dif);

    if (!bNamed) return Result;

    return returnNaN(A, Result, arRemovedRows, bNamed);
    /*
    var r = A.length - 1;
    var lastRemovedRow = arRemovedRows.pop();


    var ans = [];
    for (var row = Result.length - 1; row >= 0; row--) {
        //   alert("row=" + row + " r=" + r + " lastRemovedRow=" + lastRemovedRow + " Alert[row]=" + Alert[row] + "A[r][0]=" + A[r][0]);
        var ar = [];
        if (lastRemovedRow < r) {
            ar.push(A[r][0]);
            for (var c = 0; c < Result[row].length; c++) {
                ar.push(Result[row][c]);
            }
            ans.push(ar);
            r--;
        } else {// lastRemovedRow == r
            ans.push(A[r]);
            lastRemovedRow = arRemovedRows.pop();
            r--;
            row++;//
        }
    }
    if (bNamed) {
        ans.push(A[0]);
    }
    ans = ans.reverse();
    return ans;
    */
}
/*
function gpuAlert(A, vN, vM) {
    if (A == undefined) return [[[1], [2]], [[3], [4]]];

    var bNamed = true;

    var N = fromVNtoN(vN);
    var sN = "" + N;
    var M = fromVNtoN(vM);
    var sM = "" + M;
    var Max=Math.max(N,M);
    var Min=Math.min(N,M);
    var sMax=""+Max;
    var sMin=""+Min;
    // Remove rows with NaN
    var startCol = 0;
    var startRow=0;
    var arRemovedRows = [];

    var Z = [];
    var ch = A[0][0];
    if (isNaN(ch)) {
        startCol=1;
        startRow = 1;
    }
    else {
        bNamed = false;
    }
    
    for (var r = 0; r < A.length; r++) {
        if (isNaN(A[r][startCol])) {
            //   alert("r="+r+" A[r]=" + A[r]);
            arRemovedRows.push(r);
        } else {
            var ar = [];
            for (var c = startCol; c < A[r].length; c++) {
                ar.push(1*A[r][c]);
            }
            Z.push(ar);
        }
    }
    //alert("Z=" + Z);
    var sRows = "" + (Z.length - Max + 1);
    if (Max > Z.length) throw "number of non-empty rows in the table must be >= " + Max;
    const gpu = new GPU({ mode: 'webgl' });

    var sSign = "";
    if (N == Max) sSign = "-";
    var sM1 = "" + (Max - 1);
    var sCols = "" + Z[0].length;
    var s1 = "gpu.createKernel(function (Z) {\n"
+ "            let sum = 1*0;\n"
+ "            var r = " + sM1 + "+this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            for (let i = 0; i < " + sMax + "; i++) {\n"
+ "                sum += Z[r - i][c]/" + sMax + ";\n"
+ "                if(i<" + sMin + ") sum -=Z[r - i][c]/" + sMin + ";\n"
+ "            }\n"
+ "            return "+sSign+"+sum;\n"
+ "        }).setOutput([" + sCols + ", " + sRows + "]);"

 //   alert("s1=" + s1);
  //   myFun = new Function(s1);
 //   var Alert = myFun("Z");

    const GpuSmaDif = eval(s1);
    var Dif = GpuSmaDif(Z);
    // now find Alerts

    sCols = "" + Dif[0].length;
    sRows = Dif.length - 1;


    var s2 = "gpu.createKernel(function (D) {\n"
+ "            let sum = 1*0;\n"
+ "            var r = 1+this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "                if (1*D[r-1][c]<=0 && 1*D[r][c]>0) sum =1;\n"
+ "                if (1*D[r-1][c]>=0 && 1*D[r][c]<0) sum =-1;\n"
+ "            return sum;\n"
+ "        }).setOutput([" + sCols + ", " + sRows + "]);"

 //   alert("s2=" + s2);

    const GpuAlert = eval(s2);
    var Result = GpuAlert(Dif);

    if (!bNamed) return Result;

    var r = A.length - 1;
    var lastRemovedRow = arRemovedRows.pop();


    var ans = [];
    for (var row = Result.length - 1; row >= 0; row--) {
     //   alert("row=" + row + " r=" + r + " lastRemovedRow=" + lastRemovedRow + " Alert[row]=" + Alert[row] + "A[r][0]=" + A[r][0]);
        var ar = [];
        if (lastRemovedRow < r) {
            ar.push(A[r][0]);
            for (var c = 0; c < Result[row].length; c++) {
                ar.push(Result[row][c]);
            }
            ans.push(ar);
            r--;
        } else {// lastRemovedRow == r
            ans.push(A[r]);
            lastRemovedRow = arRemovedRows.pop();
            r--;
            row++;//
        } 
    } 
    if (bNamed) {
        ans.push(A[0]);
    }
    ans = ans.reverse();  
    return ans;
}
*/
/*
function gpuMatrMultOld(vA, vB) {

    var nA = fromVNtoN(vA);
    var nB = fromVNtoN(vB);
    var A = matrix(nA)[4];
    var B = matrix(nB)[4];
    const gpu = new GPU({ mode: 'webgl' });
    const gpuMatMult = gpu.createKernel(function (A, B) {
        var sum = 0;
        for (var i = 0; i < 3; i++) {
            sum += A[this.thread.y][i] * B[i][this.thread.x];
        }
        return sum;
    }).setOutput([3, 3]);

    const result = gpuMatMult(A, B);
   // alert("result=" + result);
  //  alert("result: " + result[0][0] + " " + result[0][1] + " " + result[1][0] + " " + result[1][1]);
    return result;
}
*/
function pNLMatrix(A, C, comm){//pNL(STAT,TabC,0.01)
    //alert("pNLMatrix");
    // prices
    var ZR = removeNaN(C);
    var Z = ZR[0];
 //   var arRemovedRows = ZR[1];
    var bNamed = ZR[2];
    // status
    var SR = removeNaN(A);
    var S = SR[0];
    var arRemovedRows = SR[1];
    if (SR[2] != bNamed) throw "status and prices have different formats";
    var nShift = Z.length - S.length;

    for (var i = 0; i < arRemovedRows.length-1; i++) {
        var k = arRemovedRows.length-1 - i;
        var j = ZR[1].length - 1 - i;
    //    alert(i + " " + k + " " + j);
     //   alert("stat: "+(A.length - arRemovedRows[k]));
     //   alert("price: "+(C.length - ZR[1][j]));
        if ((A.length - arRemovedRows[k]) != (C.length - ZR[1][j])) throw "status and prices have different formats";
    }
    // c*Status=Value
    // D = ref(-1,Status)-Status;
    //    PNL =acc(c*D)+c*Status-0.01*acc(abs(D))  = Value+acc(c*D-0.01*abs(D))=Value+acc(Cash)
    //D
    var D = [];
    for (var r = 0; r < S.length; r++) {
        var ar = [];
        for (var c = 0; c < S[r].length; c++) {
            if (r == 0) ar.push(0-1 * S[r][c]);
            else ar.push(1 * S[r - 1][c] - 1 * S[r][c]);
        }
        D.push(ar);
    }

    //Cash
    var Cash = [];
    for (var r = 0; r < S.length; r++) {
        var ar = [];
        for (var c = 0; c < S[r].length; c++) {
            ar.push(1 * Z[r + nShift][c] * D[r][c] - 1 * comm * Math.abs(D[r][c]));
        }
        Cash.push(ar);
    }
//return returnNaN(A, Cash, arRemovedRows, bNamed);
   //Acc////////////////////
    var Acc = [];
    for (var r = 0; r < Cash.length; r++) {
        var ar = [];
        for (var c = 0; c < Cash[r].length; c++) {
            if (r == 0) ar.push(1 * Cash[r][c]);
            else ar.push(1 * Acc[r - 1][c] + 1 * Cash[r][c]);
        }
        Acc.push(ar);
    }/////////////////////

    var Result = [];
    for (var r = 0; r < S.length; r++) {
        var ar = [];
        for (var c = 0; c < S[r].length; c++) {
            ar.push(1 * Z[r + nShift][c] * S[r][c] + Acc[r][c]);
        }
        Result.push(ar);
    }
    if (!bNamed) return Result;

    return returnNaN(A, Result, arRemovedRows, bNamed);
}
function gpuPnl(A, C, comm) {//pNL(STAT,TabC,0.01)
    //alert("gpuPnl");
    // prices
    var ZR = removeNaN(C);
    var Z = ZR[0];
    //   var arRemovedRows = ZR[1];
    var bNamed = ZR[2];
    // status
    var SR = removeNaN(A);
    var S = SR[0];
    var arRemovedRows = SR[1];
    if (SR[2] != bNamed) throw "status and prices have different formats";
    var nShift = Z.length - S.length;

    for (var i = 0; i < arRemovedRows.length - 1; i++) {
        var k = arRemovedRows.length - 1 - i;
        var j = ZR[1].length - 1 - i;
        if ((A.length - arRemovedRows[k]) != (C.length - ZR[1][j])) throw "status and prices have different formats";
    }

    var sShift = "" + nShift;
    var sComm = "" + comm;
/*    
    const gpu = new GPU({ mode: 'webgl' });
    var s1 = "gpu.createKernel (function (S,Z) {\n"
+ "            let sum = 0;\n"
+ "            var r = this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            var Drc = 0-1 * S[r][c];\n"
+ "            if(r>0) Drc = 1 * S[r - 1][c] - 1 * S[r][c];\n"
+ "            sum = 1 * Z[r + " + sShift + "][c] * Drc - 1 * " + sComm + "* Math.abs(Drc);\n"
+ "            return sum;\n"
+ "        }).setOutput([S[0].length, S.length]);"
    const GpuCash = eval(s1);
    var Cash = GpuCash(S, Z);
    //  if (!bNamed) return Result;
    var Acc = gpuAccum(Cash);////////////////////////////////
*/
    arOut = {};
    arIn = {};
    arIn["nameS"] = S;
    arIn["nameZ"] = Z;
    var s1 = "function Accum(S,Z) {\n"
    + "   const gpu = new GPU({ mode: 'webgl' });\n"
    + "   const gAccum = gpu.createKernel(function (S,Z) {\n"
+ "            let sum = 0;\n"
+ "            var r = this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            var Drc = 0-1 * S[r][c];\n"
+ "            if(r>0) Drc = 1 * S[r - 1][c] - 1 * S[r][c];\n"
+ "            sum = 1 * Z[r + " + sShift + "][c] * Drc - 1 * " + sComm + "* Math.abs(Drc);\n"
+ "            return sum;\n"
+ "        }).setOutput([S[0].length, S.length]);"
    + "   const result=gAccum(S,Z);\n"
    + "   arOut[-1]= result;\n"
    + "}\n"
    + " Accum(arIn[" + "'nameS'" + "],arIn[" + "'nameZ'" + "]);";
    var myFun = new Function(s1);

    myFun();

    var Cash = arOut[-1];

    var Acc = gpuAccum(Cash);////////////////////////////////


    arIn["nameS"] = S;
    arIn["nameZ"] = Z;
    arIn["nameAcc"] = Acc;
/*
    var s2 = "gpu.createKernel (function (S,Z,Acc) {\n"
+ "            let sum = 0;\n"
+ "            var r = this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            sum = 1 * Z[r + " + sShift + "][c]* S[r][c] + Acc[r][c] ;\n"
+ "            return sum;\n"
+ "        }).setOutput([S[0].length, S.length]);"
    const GpuPNL = eval(s2);
    var Result = GpuPNL(S, Z, Acc);
*/

    var s2 = "function Pnl(S,Z,Acc) {\n"
+ "   const gpu = new GPU({ mode: 'webgl' });\n"
+ "   const gPnl = gpu.createKernel(function (S,Z,Acc) {\n"
+ "            let sum = 0;\n"
+ "            var r = this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            sum = 1 * Z[r + " + sShift + "][c]* S[r][c] + Acc[r][c] ;\n"
+ "            return sum;\n"
+ "        }).setOutput([S[0].length, S.length]);\n"
+ "   const result=gPnl(S,Z,Acc);\n"
+ "   arOut[-2]= result;\n"
+ "}\n"
+ " Pnl(arIn[" + "'nameS'" + "],arIn[" + "'nameZ'" + "],arIn[" + "'nameAcc'" + "]);";
    var myFun2 = new Function(s2);

  //  alert("s2=" + s2);
    myFun2();

    var Result = arOut[-2];

    if (!bNamed) return Result;
//return Acc;

    return returnNaN(A, Result, arRemovedRows, bNamed);
}
function gpuPnlBad(A, C, comm) {//pNL(STAT,TabC,0.01)
    //alert("gpuPnl");
    // prices
    var ZR = removeNaN(C);
    var Z = ZR[0];
    //   var arRemovedRows = ZR[1];
    var bNamed = ZR[2];
    // status
    var SR = removeNaN(A);
    var S = SR[0];
    var arRemovedRows = SR[1];
    if (SR[2] != bNamed) throw "status and prices have different formats";
    var nShift = Z.length - S.length;

    for (var i = 0; i < arRemovedRows.length - 1; i++) {
        var k = arRemovedRows.length - 1 - i;
        var j = ZR[1].length - 1 - i;
        if ((A.length - arRemovedRows[k]) != (C.length - ZR[1][j])) throw "status and prices have different formats";
    }
    // D = ref(-1,Status)-Status;
    //    PNL =acc(c*D)+c*Status-0.01*acc(abs(D))  = Value+acc(c*D-0.01*abs(D))=Value+acc(Cash)

    //Cash
/*    var Cash = [];
    for (var r = 0; r < S.length; r++) {
        var ar = [];
        for (var c = 0; c < S[r].length; c++) {
            var Drc = 0 - 1 * S[r][c];
            if (r>0) Drc = 1 * S[r - 1][c] - 1 * S[r][c];////////
            ar.push(1 * Z[r + nShift][c] * Drc - 1 * comm * Math.abs(Drc));
        }
        Cash.push(ar);
    }
*/
    var sShift = "" + nShift;
    var sComm = "" + comm;
    const gpu = new GPU({ mode: 'webgl' });
    var s1 = "gpu.createKernel (function (S,Z) {\n"
+ "            let sum = 0;\n"
+ "            var r = this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            var Drc = 0-1 * S[r][c];\n"
+ "            if(r>0) Drc = 1 * S[r - 1][c] - 1 * S[r][c];\n"
+ "            sum = 1 * Z[r + "+sShift+"][c] * Drc - 1 * "+sComm+"* Math.abs(Drc);\n"
+ "            return sum;\n"
+ "        }).setOutput([S[0].length, S.length]);"
    const GpuCash = eval(s1);
    var Cash = GpuCash(S,Z);
  //  if (!bNamed) return Result;

    var Acc = gpuAccum(Cash);////////////////////////////////
    /*
    var Result = [];
    for (var r = 0; r < S.length; r++) {
        var ar = [];
        for (var c = 0; c < S[r].length; c++) {
            ar.push(1 * Z[r + nShift][c] * S[r][c] + Acc[r][c]);
        }
        Result.push(ar);
    }
    if (!bNamed) return Result;
    */
    var s2 = "gpu.createKernel (function (S,Z,Acc) {\n"
+ "            let sum = 0;\n"
+ "            var r = this.thread.y;\n"
+ "            var c = this.thread.x;\n"
+ "            sum = 1 * Z[r + " + sShift + "][c]* S[r][c] + Acc[r][c] ;\n"
+ "            return sum;\n"
+ "        }).setOutput([S[0].length, S.length]);"
    const GpuPNL = eval(s2);
    var Result = GpuPNL(S,Z,Acc);
    if (!bNamed) return Result;

    return returnNaN(A, Result, arRemovedRows, bNamed);
}
function cpuMatrMult(m, n) {
    var result = [];
    for (var i = 0; i < m.length; i++) {
        result[i] = [];
        for (var j = 0; j < n[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m[0].length; k++) {
                sum += m[i][k] * n[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}
/*
function cM(N, d) {
    var r = [];
    var ar = [];
    for (var i = 0; i < N; i++) r.push(d);
    for (var i = 0; i < N; i++) ar.push(r);
    return ar;
}
*/
function cpuMult(L) {
    if (!Number.isInteger(1 * L)) throw "the argument should be an iteger number - the number of rows in a square matrex";
    /*
    var A = [];
    var B = [];
    for (var i = 0; i < L; i++) {
        var ar1 = [];
        var ar2 = [];
        for (j = 0; j < L; j++) {
            ar1.push(0.5);
            ar2.push(2);
        }
        A.push(ar1);
        B.push(ar2);
    }
    */
    var A=cM(L,0.5);
    var B = cM(L, 2.0);

    var result = [];
    for (var i = 0; i < A.length; i++) {
        result[i] = [];
        for (var j = 0; j < B[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < A[0].length; k++) {
                sum += A[i][k] * B[k][j];
            }
            result[i][j] = sum;
        }
    }
 //   return dress(result, "");
    return result;
    
}
function strip(matr) {
    if (!isMatrix(matr)) throw "the argument should be a table";
    if(matr==null ) throw "empty matrix";
    var rows = matr.length;
    if (rows == 0) throw "empty matrix";
    var cols = matr[0].length;
    if (cols == 0) throw "empty matrix";
    var ch = matr[0][0];
   // alert("ch=" + ch + "rows=" + rows + "cols=" + cols);
    var b = isNaN(ch);
//alert(b);
    if (!b) return matr;// already stripped
  //  if (rows == 1 || cols==1) throw "empty matrix";
    var ans = [];
    for (var r = 1; r < rows; r++) {
        var ar = [];
        for (var c = 1; c < cols; c++) {
            ar.push(Number(matr[r][c]));
        }


        ans.push(ar);
    }

    //alert("striped:=" + ans[0][0] + " " + ans[0][1] + " " + ans[1][0] + " " + ans[1][1]);
  
    return ans;
}
function dress(matr, sName) {
    if (sName == undefined) throw "the name is undefined";
    if (matr == null) throw "empty matrix";
    var rows = matr.length;
    if (rows == 0) throw "empty matrix";
    var cols = matr[0].length;
    if (cols == 0) throw "empty matrix";
    var ch = matr[0][0];
    var b = isNaN(ch);
    if (ch=='' || b) return matr;// already dressed

    var ans = [];
    var a = [sName];
    for (var c = 0; c < cols; c++) {
        var c1 = 1 + c;
        a.push("col"+c1);
    }
    ans.push(a);

    for (var r = 0; r < rows; r++) {
        var r1 = 1 + r;
        var ar = ["row"+r1];
        for (var c = 0; c < cols; c++) {
            ar.push(Number(matr[r][c]));
        }
        ans.push(ar);
    }
    return ans;
   
}
function getRowsNames(matr) {

    var TabRowsNames = [];
    for (var i = 1; i < matr.length; i++) {
        TabRowsNames.push([matr[i][0]]);
    }
    return TabRowsNames;
}
function getColsNames(matr) {
    var TabColsNames = [];
    var ar=[];
    for (var i = 1; i < matr[0].length; i++) {
        ar.push(matr[0][i]);
    }
    TabColsNames.push(ar);
    return TabColsNames;
}
function setRowsColsNames(matr, TabRowsNames, TabColsNames) {
    //    alert('matr, TabRowsNames, TabColsNames');
    if (matr == null) throw "empty matrix";
    var rows = matr.length;
    if (rows == 0) throw "empty matrix";
    var cols = matr[0].length;
    if (cols == 0) throw "empty matrix";
//alert("1.cols=" + cols);
    var ch = matr[0][0];
//alert("ch=" + ch);
    var b = isNaN(1*ch);
    if (b) {
        matr = strip(matr);// was already dressed
        rows--;
        cols--;
    }
//alert("2.cols=" + cols);
//alert(TabColsNames);
//alert(TabColsNames[0]);
    if (rows != TabRowsNames.length) throw "there should be "+rows+" rows names";
    if (cols != TabColsNames[0].length) throw "there should be " + cols + " cols names";


    var ans = [];
    var ar = ["T"];
    for (var c = 0; c < cols; c++) ar.push(TabColsNames[0][c]);
    ans.push(ar);

    for (var r = 0; r < rows; r++) {
        var ar = [TabRowsNames[r][0]];
        for (var c = 0; c < cols; c++) {
            ar.push(matr[r][c]);
        }
        ans.push(ar);
    }
    return ans;
}
function setDefaultNames(matr) {
    if (!isMatrix(matr)) throw "the argument should be a table";
  //  alert('matr');
    var ch = matr[0][0];
    var b = isNaN(ch);
    if (b) {
        matr = strip(matr);// was already dressed
        rows--;
        cols--;
    }

    if (matr == null) throw "empty matrix";
    var rows = matr.length;
    if (rows == 0) throw "empty matrix";
  //  if (rows != TabRowsNames.length) throw "there should be " + rows + " rows names";
    var cols = matr[0].length;
    if (cols == 0) throw "empty matrix";
  //  if (cols != TabColsNames[0].length) throw "there should be " + cols + " cols names";



    var ans = [];
    var ar = ["T"];
    for (var c = 0; c < cols; c++) ar.push("col"+(c+1));
    ans.push(ar);

    for (var r = 0; r < rows; r++) {
        var ar = ["row"+(r+1)];
        for (var c = 0; c < cols; c++) {
            ar.push(matr[r][c]);
        }
        ans.push(ar);
    }
    return ans;
}
function setUnnamedTable(a, n) {
    var s = "";
    var N = a.length;
    var M = 0;
    for (var r = 0; r < N; r++) {
        if (M < a[r].length) M = a[r].length;
    }
    for (var r = 0; r < N; r++) {
        for (var c = 0; c < M; c++) {
            var d = a[r][c];
            if(!isNaN(d)) d = d.toPrecision(4);
            if (r == N - 1 && c == M - 1) s += d;
            else if (c == M - 1) s += d + "\n";
            else s += d + "\t";
        }
    }
    arTexts[n] = s;
    SetTopPanel();
}
function mm(vA, vB) {
    return arithmMM('m', vA, vB);
}

/*
function matrMult(vA, vB, vC) {
    var nA = fromVNtoN(vA);
    var nB = fromVNtoN(vB);
    var nC = fromVNtoN(vC);

    var A = matrix(nA);
    //alert("A=" + A);

    var a = A[0];
//alert("nA="+nA+" strip(a)=" + strip(a));
    var aCols = A[1];
    var aRows = A[2];
    var aName = A[3];
    var B = matrix(nB);
    var b = B[0];
//alert("nB=" + nB + " strip(b)=" + strip(b));
    var bCols = B[1];
    var bRows = B[2];
    var bName = B[3];

    if (aRows != bCols) throw "number of columns in table " + nA + " should be equal to number of rows in table " + nB;

   
    var iStart = 1;

//alert(aRows + " " + bCols);
    var c = cpuMatrMult(strip(a), strip(b));
//   alert(aName + " " + bName);

    if (!(aName==undefined && bName==undefined))
    {
        c = dress(c,"0");
  //  alert("1. c=" + c);
        //setTable(c, nC, "Ans");

        var arColsNames = getColsNames(nB);
    //alert(arColsNames);
        arColsNames[0] = "Answer";// new name
        setTable(c, nC, getRowsNames(nA), arColsNames);


    } else {
   //     alert("2. c=" + c);
        setUnnamedTable(c, nC);
        iStart=0;
    }

//    alert("aRows="+aRows);
    var lastCol = [1];//start index
    for (var i = iStart; i < aRows - 1 + iStart; i++) {

        lastCol.push(c[i][bCols - 1- 1 + iStart]);
    }
    return lastCol;


}
*/
/*
function solveSLE(vA, vB, vC, vD) {

    var nA = fromVNtoN(vA);
    var nB = fromVNtoN(vB);
    var nC = fromVNtoN(vC);
    var nD = fromVNtoN(vD);


    var A = matrix(vA);
    var n=A[1];
    if (n != A[2]) throw "the input matrix should be square";
    var a = A[0];
    var B = matrix(vB);
    var m = B[2];
    var b = B[0];

//alert("n="+n+" m="+m);

    var G=gaussj(a, n-1, b, m-1);


    var arColsNamesA = getColsNames(nA);
    arColsNamesA[0] = "1/" + arColsNamesA[0];// new name
    var arColsNamesB = getColsNames(nB);
    arColsNamesB[0] = "x";// new name
 //   setTable(a, nC, sNameA);
    //   setTable(b, nD, "x");
    setTable(a, nC, getRowsNames(nA), arColsNamesA);
    setTable(b, nD, getRowsNames(nB), arColsNamesB);

  //  tableFromString(4, "");
    var lastColB = [1];
    for (var i = 1; i < n; i++) {
       // alert("i=" + i + " n=" + n + " m=" + m + " b[i][m-1]=" + b[i][m-1]);
        lastColB.push(b[i][m-1]);
    }

    return lastColB;
}
*/
/*
function setTable(a, n, sName) {
//alert("setTable");
    var s = "";
    var N = a.length;
    var M = 0;
    for (var r = 0; r < N; r++) {
        if (M < a[r].length) M = a[r].length;
    }
//alert("M=" + M);
    for (var r = 0; r < N; r++) {
        for (var c = 0; c < M; c++) {
            var d = a[r][c];
            if (r > 0 && c > 0) d = d.toPrecision(4);
            if (r == 0 && c == 0) s += sName + "\t";
            else if (r == N - 1 && c == M - 1) s += d;
            else if (c == M - 1) s +=d + "\n";
            else s += d + "\t";
        }
    }
    arTexts[n] = s;
//alert(s);
    SetTopPanel();
}
*/
/*
function setTableWithWidthOld(a, n, arRowsNames, arColsNames, nWidth) {
    var s = "";
    var N = a.length;
    var M = 0;
    for (var r = 0; r < N; r++) {
        if (M < a[r].length) M = a[r].length;
    }
    for (var r = 0; r < N; r++) {
        for (var c = 0; c < M; c++) {
            var d = a[r][c];
            if (r > 0 && c > 0) {
              //  d = d.toFixed(6);
                //   d=parseFloat(d);
                d = 1 * d;
            //   if (d < 1) d = d.toPrecision(5);
                //    else d = d.toPrecision(6);
                if(d<10000 && d>0) d=d.toFixed(2);
                else d=d.toExponential(3);
            }
            else if (r == 0) d = arColsNames[c];
            else if (c == 0) d = arRowsNames[r];

            var sp=["","_","__","___","____","_____","______","_______","________","_________","__________","___________","____________"];
            var w=nWidth-d.length;
            d=d+sp[w];
            d=d.substring(0, nWidth);


            if (r == N - 1 && c == M - 1) s += d;
            else if (c == M - 1) s += d + "\n";
            else s += d + "\t";
           //     else s += d + " ";
        }
    }
    arTexts[n] = s;
   // sSymbolFormula = "text";
    SetTopPanel();
}
*/
function setTableWithWidth(a, n, arRowsNames, arColsNames, deltaWidth) {

    deltaWidth=3;


    var s = "";
    var Rows = a.length;//rows
    if(Rows==0) throw "empty table";
    var Cols=a[0].length;
    if(Cols==0) throw "empty table";

    var sp=[""," ","  ","   ","    ","     ","      ","       ","        ","         ","          ","        ","         "];
    var arS=[];
    for(var row=0;row<Rows;row++){
        var ar=[];
        for(var col=0; col<Cols;col++){
            if(col==0) ar.push(arRowsNames[row]);
            else if (row==0) ar.push(arColsNames[col]);
            else ar.push( buildStringNumber(""+a[row][col]));
        }
        arS.push(ar);
    }

//return arS;

    for(var col=0; col<Cols;col++){
        var ss=""+arS[0][col];
        var maxWidth=ss.length;
        for(var row=1;row<Rows;row++){
            ss=""+arS[row][col];
            if(maxWidth<ss.length) maxWidth=ss.length;
        }
        for(var row=0;row<Rows;row++){
            var ss=arS[row][col];
            var oldWidth=ss.length;
            arS[row][col]+=sp[maxWidth-oldWidth+deltaWidth];
        }
    }
  //  var s="";
    for(var row=0;row<Rows;row++){
        for(var col=0; col<Cols;col++){
            s+=arS[row][col];
        }
        if(row!=Rows-1) s+="\n";
    }

    //   return s;
    //alert(s)
//return a;
    arTexts[n] = s;
    SetTopPanel();
}
function setTable(a, n, arRowsNames, arColsNames) {
  //  alert(n);
   // n = 1 * n;
    var s = "";
    var N = a.length;
    var M = 0;
    for (var r = 0; r < N; r++) {
        if (M < a[r].length) M = a[r].length;
    }
//alert("M=" + M);
    for (var r = 0; r < N; r++) {
        for (var c = 0; c < M; c++) {
            var d = a[r][c];
            if (r > 0 && c > 0) {
                //  d = d.toFixed(6);
                //   d=parseFloat(d);
                d = 1 * d;
                if (d < 1) d = d.toPrecision(5);
                else d = d.toPrecision(6);
            }
            else if (r == 0) d = arColsNames[c];
            else if (c == 0) d = arRowsNames[r];

            if (r == N - 1 && c == M - 1) s += d;
            else if (c == M - 1) s += d + "\n";
            else s += d + "\t";
        }
    }
//    alert("1. n=" + n + " arTexts[n]=" + arTexts[n]);
//alert("s="+s);
    arTexts[n] = s;
 //   alert("2. n=" + n + " arTexts[n]=" + arTexts[n]);
    // sSymbolFormula = "text";
    SetTopPanel();
//alert("done");
}
function buildStringNumber(s){
    var L=s.length;
    var d=1*s;
    if (Number.isInteger(d) && L<9) return s;// int
    var a=Math.abs(d);
    if(a>1 && a<1000){
        var str=""+d.toFixed(4);
        var m=str.length;
        if(str[m-1]=='0' && str[m-2]=='0') return ""+d.toFixed(2);
        return  str;//7.56
    }
    if(a>1000 && a<1000000) return ""+Math.floor(d); //123456
    if(a<1 && a>0.001){
        var str=""+d.toPrecision(6);
        var m=str.length;
        if(str[m-1]=='0' && str[m-2]=='0') return ""+d.toPrecision(4);
        return  str;
    }

    var str="" + d.toExponential();
    if (str.length<10) return str;//-5.123e+13
    var m=str.length;//-5.1234567e+13
    var s1=str.substring(0,5);
    var s2=str.substring(m-4);
    return s1+s2;//-5.123e+13
}

 


/*
function replaceTable(a, n, arRowsNames, arColsNames) {
    var s = "";
    var N = a.length;
    var M = 0;
    for (var r = 0; r < N; r++) {
        if (M < a[r].length) M = a[r].length;
    }
    for (var r = 0; r < N; r++) {
        for (var c = 0; c < M; c++) {

            var d = a[r][c];
            if (r > 0 && c > 0) {
                d = d * 1;
                d = d.toPrecision(6) + "";
            }
            else if (r == 0) d = arColsNames[c];
            else if (c == 0) d = arRowsNames[r];

            if (r == N - 1 && c == M - 1) s += d;
            else if (c == M - 1) s += d + "\n";
            else s += d + "\t";
        }
    }
    arTexts[n] = s;
 //    SetTopPanel();
}
*/
function discount(T, vRate) {
    var dRate = fromVNtoN(vRate);

    var vT = col(T, 1);
    //var vT = vCol;
  //  alert("vT=" + vT);
    var D = [vT[0]];
    for (var i = 1; i < vT.length; i++) {
        D.push(vT[1] - vT[i]);
    }

    var d = pow(1 + dRate, D);
//alert(d);
    var vCash = col(T, 2);


//alert(vCash);

    return arithm('*', vCash, d);

}
/*
function minVarPortfolio(vA, vB) {// inputTableNumber, outputTableNumber

    var nA = fromVNtoN(vA);
    var nB = fromVNtoN(vB);
    var rNames=getRowsNames(nA);
    var n = rNames.length;
    var A = matrix(vA);
    var a = A[0];

    var b = [];
    b.push(["mvPortf", "Weight"]);
    for (var i = 1; i < rNames.length; i++) {
         b.push([rNames[i], Number(1.0)]);
    }

        var G = gaussj(a, n - 1, b, 1);

//alert(b);
   // setTable(b, nD, rNames, ["mvPortf", "Weight"]);
    setTable(b, nB, rNames, ["mvPortf", "Weight"]);

    var colB = [1];
    for (var i = 1; i < n; i++) {
        colB.push(b[i][1]);
    }

    return colB;

}
*/
/*
function minVarPortfWrong(vP, vA) {// inputPortfolio, outputCorrTabl&Weights

    var nBefore = arSymbolList.length;
    var nA=fromVNtoN(vA);
    var nPortf = fromVNtoN(vP);

    var names = colOfStrings(nPortf, 1);

    
alert(names);
if (arSymbolList == null || arSymbolList == undefined) {
    arSymbolList = [];
}
if (arAvailableStiocks == null || arAvailableStiocks == undefined) {
    arAvailableStiocks = [];
}
    for (var i = 1; i < names.length; i++) {
        if (arSymbolList.indexOf(names[i]) < 0) {
            //   arSymbolList.push(names[i]);
           // alert(names[i] + " is not found");
            arSymbolList.push(names[i]);

        }
        else {
           // alert(names[i] + " is No" + i);
        }
    }

//alert(arSymbolList);
    var nAfter = arSymbolList.length;
alert(nBefore + "=?= " + nAfter);

//alert("1. arAvailableStiocks.length=" + arAvailableStiocks.length);


    if (nBefore < nAfter) {
        getData();
        for (var i = 0; i < arSymbolList.length; i++) {
            if (arSymbolPresentation[i] == undefined) arSymbolPresentation[i] = "Yes!1!None!Line!1!Solid!Long!1!#000000";
        }
        sSymbolFormula = "symbol";
        nForDlg = arSymbolList.length;
        alert("a");
        SetTopPanel();
        alert("b");
    }


    var arStock=[null];
    for (var k = 1; k < names.length; k++) {
        var sName = names[k];
        
        for (var i = 0; i < arAvailableStiocks.length; i++) {
            if (sName == arAvailableStiocks[i][0][0]) {
                alert("pushing " + sName);
                arStock.push(arAvailableStiocks[i]);
            }
        }
    }

    

    
    var a = [];//correl matrix
    var colNames = ["Corr"];
    var rowNames = ["Corr"];
    for (var i = 1; i < names.length; i++) {
        colNames.push(names[i]);
        rowNames.push(names[i]);
        var r = [names[i]];
        for (var j = 1; j < names.length; j++) {
            r.push(1.0);
        }
        a.push(r);
    }
    a.unshift(colNames);
    alert(arStock.length);
    alert(a);

    for (var i = 1; i < names.length; i++) {
        for (var j = i + 1; j < names.length; j++) {
//alert("A. i=" + i + " j=" + j);
            
            var vi = arStock[i][4];
//alert("B. i=" + i + " j=" + j);
            var vj=arStock[j][4];
//alert("C. i=" + i + " j=" + j);
            var aij=Number(corrCf2(vi,vj ));
            a[i][j] = aij;
            a[j][i] =aij;
//alert("i="+i+" j="+j+" aij=" + aij);
        }
    }
    alert("nA=" + nA);
    alert(a);
    alert(a[1]);
    setTable(a, 1, rowNames, colNames);




    var b = [];
    b.push(["mvPortf", "Weight"]);
    for (var i = 1; i < names.length; i++) {
        b.push([names[i], Number(1.0)]);
    }
 alert(b);

 setTable(b, 2, rowNames, ["mvPortf", "Weight"]);

    alert(names.length - 1);
    var G = gaussj(a, names.length - 1, b, 1);
    alert("2. " + b);

    setTable(b, 3, rowNames, ["mvPortf", "Weight"]);
    
    //arTexts[nPortf] = a;

    var answer = arStock[2][4];//close
    answer[0] = 0;
    return answer;




}
*/
function colOfStrings(vn, rStart,vc) {//   var s = arTexts[n];
    var n = fromVNtoN(vn);
    var nStart = fromVNtoN(rStart);
    var c = fromVNtoN(vc);

    if (c<0) throw " usage: colOfStrings(0,k), where k>=0 ";
    if (arTexts == null || arTexts.length == 0) throw "empty table";
    var s = arTexts[n];
    var rows = s.split("\n");
    var N = rows.length;
    var words = [1];
    var bFound = false;
    for (var r= nStart; r < N; r++) {
        var di = rows[r];
        if (di.length == 0) continue;
        var col = -1;
        var pos1 = 0;
        var w;
        var empty;
        for (var j = 0; j < di.length; j++) {
            if (di.charCodeAt(j) == 9 || di[j] == " ") {
                col++;
                w = di.substring(pos1, j);
                pos1 = j + 1;
                if (col == c) {
                    bFound = true;
                    break;
                }
            }
            if (j == di.length - 1) {
                col++;
                w = di.substring(pos1);
                if (col == c) {
                    bFound = true;
                    break;
                }
            }
        }
        if (w.length > 0) {
           // words.push(Number(w));
            words.push(w);
        }
        else {
            words.push(empty);
        }

    }
    if (!bFound) throw "the Table" + n + " does not have column " + c;

    //alert(words);
    return words;
}
function getNames(nIn){
    if (arTexts == null || arTexts.length <= nIn || arTexts[nIn].length == 0) {
        // var answer = [10];
        //   return answer;
        throw "empty table";
    }
    var matrixRowsCols = matrix(nIn);
    var B = matrixRowsCols[0];
    var nRowsIn = matrixRowsCols[1];
    var nColsIn = matrixRowsCols[2];
    var sNameIn = matrixRowsCols[3];

    var delta = 1 - nColsIn;
    if (nColsIn != 1 && delta > 0) throw "there should be " + delta + " more column(s) in the input Table " + nIn;


    var nColOfName = nColsIn-1;
    var nStart = 1;
    if (nColOfName == 0) nStart = 0;

    var names = colOfStrings(nIn, nStart, nColOfName);
    /*
    ////////////
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
var pane=1;   
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
alert(arSymbolList);
    ////////////
    */
    return names;
}
function tableOfC(vIn) {
    return tabeOfOHLCV(vIn, 4);
}
function tableOfO(vIn) {
    return tabeOfOHLCV(vIn, 1);
}
function tableOfH(vIn) {
    return tabeOfOHLCV(vIn, 2);
}
function tableOfL(vIn) {
    return tabeOfOHLCV(vIn, 3);
}
function tableOfV(vIn) {
    return tabeOfOHLCV(vIn, 5);
}
function normTableOfC(vIn) {
    return tabeOfOHLCV(vIn, -4);
}
function normTableOfO(vIn) {
    return normTabeOfOHLCV(vIn, -1);
}
function normTableOfH(vIn) {
    return tabeOfOHLCV(vIn, -2);
}
function normTableOfL(vIn) {
    return tabeOfOHLCV(vIn, -3);
}
/*
function tabeOfOHLCV_Old(vIn, nField) {
   // arAvailableStiocks = [];
    var names = [1];
    if (vIn[0] != undefined && vIn.length >= 1 && vIn[0][0] != 'x') {
        for (var i = 0; i < vIn.length; i++) {
            if (!isNaN(vIn[i][0])) throw "add a Table with stock names ";
            names.push(vIn[i][0]);
        }
    }
    else {
        throw "add a Table with stock names and weights, please";
    }
    //  alert("names=" + names);
    var arStock = [];
    for (var k = 1; k < names.length - 1; k++) {
        var ar = [];
        arStock.push(ar);
    }
    //alert("arTexts.lenght=" + arTexts.length);
    var bAllFound = false;

    var sumFound = 0;
    //alert("1. sumFound=" + sumFound);
//alert("arAvailableStiocks.length=" + arAvailableStiocks.length);

    while (sumFound < names.length - 1) {
        for (var k = 1; k < names.length; k++) {
            var sName = names[k];
//alert("1. sName=" + sName);
        for (var i = 0; i < arAvailableStiocks.length; i++) {
//alert(sName.toUpperCase() +" "+ arAvailableStiocks[i][0][0].toUpperCase())
                if (sName.toUpperCase() == arAvailableStiocks[i][0][0].toUpperCase()) {
//alert("2. sName=" + sName);
                    arStock[k] = arAvailableStiocks[i];
                    sumFound++;
                }
            }
        }
        if (sumFound < names.length - 1) {
            getData();
        }
    }//while
//alert(5);
    var colNames = names.slice();
    colNames[0] = "TofF";
    var rowNames = arStock[1][0].slice();// change for different lengths (Min and Max)
  //  rowNames.unshift("TofF");
 
    var arOut = [];
    arOut.push(colNames);
    for (var r = 1; r < rowNames.length; r++) {
        var ar = [rowNames[r]];
        for (var c = 1; c < colNames.length; c++) {
                ar.push(arStock[c][nField][r]);
        }
        arOut.push(ar);
    }
    return arOut;
    

}
*/
function tabeOfOHLCV(vIn, nField) {
    if (!isMatrix(vIn)) throw "the argument should be a column of stock names";

    var norm = 1;// not normalized
    if (nField < 0) {
        norm = -1;// normalized
        nField *= -1;
    }


    // arAvailableStiocks = [];
 //   alert("vIn=" + vIn);
 //   alert("vIn[0].length=" + vIn[0].length);
  //  alert("vIn[0][0]=" + vIn[0][0]);
    var names = [1];
    if (vIn[0] != undefined && vIn.length >= 1 && vIn[0][0] != 'x') {
        for (var i = 0; i < vIn.length; i++) {
            if (!isNaN(vIn[i][0])) throw "add a Table with stock names ";
            if (vIn[0].length == 1) {
                names.push(vIn[i][0]);
            }else {
                names.push(vIn[1][1]);
                break;
            }
           
        }
    }
    else {
        throw "add a Table with stock names and weights, please";
    }
//alert("names=" + names);
    var arStock = [];
    for (var k = 1; k < names.length - 1; k++) {
        var ar = [];
        arStock.push(ar);
    }
    //alert("arTexts.lenght=" + arTexts.length);
    var bAllFound = false;

    var sumFound = 0;
    //alert("1. sumFound=" + sumFound);
    //alert("arAvailableStiocks.length=" + arAvailableStiocks.length);

    while (sumFound < names.length - 1) {
        for (var k = 1; k < names.length; k++) {
            var sName = names[k];
            //alert("1. sName=" + sName);
            for (var i = 0; i < arAvailableStiocks.length; i++) {
                //alert(sName.toUpperCase() +" "+ arAvailableStiocks[i][0][0].toUpperCase())
                if (sName.toUpperCase() == arAvailableStiocks[i][0][0].toUpperCase()) {
                        arStock[k] = arAvailableStiocks[i];
                        sumFound++;
                }
            }
        }
        if (sumFound < names.length - 1) {
            getData();
        }
    }//while
//alert("sumFound=" + sumFound);
    var colNames = names.slice();
    colNames[0] = "TofF";

 //   var startMin = arStock[1][1][0];//(msft close ) -277
 //   var endMax = startMin + arStock[1][1].length;
    var startMin = -Number.MAX_VALUE;
    var endMax = Number.MAX_VALUE;

//alert("startMin=" + startMin + " " + "endMax=" + endMax);


    for (var c = 1; c < colNames.length; c++) {


/////////   12/5/2017
if (colNames[c][0] == 't' || colNames[c][0] == 'T') {
    var num = 1 * colNames[c].substring(1);
    if (!isNaN(num)) {
        arStock[c] = stockFromTable(num);
    }
}
 /////////////////

        var start = arStock[c][nField][0];
        var end = start + arStock[c][nField].length;

        if (startMin < start) startMin = start;
        if (endMax > end) endMax = end;

//alert(colNames[c] + " " + start + " " + end + " startMin=" + startMin + " " + "endMax=" + endMax);
    }
//alert("startMin=" + startMin + " " + "endMax=" + endMax);

    //alert(arStock.length);
  //  alert(arStock[1][nField][0]);
  //  alert(arStock[2][nField][0]);


    //var rowNames = arStock[1][0].slice();// change for different lengths (Min and Max)
    var empty;
    var arEmpty = [];
    for (var c = 0; c < colNames.length; c++) arEmpty.push(empty);
    var arOut = [];
    arOut.push(colNames);
    for (var r = startMin; r < endMax-1; r++) {
            var ar = arEmpty.slice();
            for (var c = 1; c < colNames.length; c++) {

            var start = arStock[c][nField][0];
            var end = start + arStock[c][nField].length;


            if (start <= r && r < end-1) {//always the case
                if (ar[0] == undefined) {

                   // ar[0] = arStock[c][0][r - startMin + 1];//date
                    ar[0] = arStock[c][0][r - start + 1];//date
                }
                if (norm > 0 )
                   ar[c] = arStock[c][nField][r - start + 1];
                else {
                    if (arStock[c][nField][r - start + 1] == undefined) ar[c] = arStock[c][nField][r - start + 1];
                   //alert(arStock[c][4][1]);
                 //   ar[c] = arStock[c][nField][r - start + 1] / (1 * arStock[c][4][1]);//// normalized 785.94
                    else ar[c] = arStock[c][nField][r - start + 1] / arStock[c][4][1];
               }
                   
            }
        }
        arOut.push(ar);
    }
    return arOut;
}
function minVarWeights(vIn) {
    //  alert("minVarWeights");
    var names = [1];
    // if (vIn[0] != undefined && vIn.length >= 1 && vIn[0][0] != 'x') {
    if (isMatrix(vIn)) {
        for (var i = 0; i < vIn.length; i++) {
            if (!isNaN(vIn[i][0])) throw "add a Table with stock names ";
            names.push(vIn[i][0]);
        }
    }
    else {
        throw "add a Table with stock names and weights, please";
    }
  //  alert("names=" + names);
    var arStock = [];
    for (var k = 1; k < names.length - 1; k++) {
        var ar = [];
        arStock.push(ar);
    }
    //alert("arTexts.lenght=" + arTexts.length);
    var bAllFound = false;

    var sumFound = 0;
    //alert("1. sumFound=" + sumFound);
    //alert("1.   names.length=" + names.length);
    while (sumFound < names.length - 1) {
        for (var k = 1; k < names.length; k++) {
            var sName = names[k];
//alert("1. sName=" + sName);
            for (var i = 0; i < arAvailableStiocks.length; i++) {
                if (sName.toUpperCase() == arAvailableStiocks[i][0][0].toUpperCase()) {
//alert("2. sName=" + sName);
                    arStock[k] = arAvailableStiocks[i];
                    sumFound++;
                }
            }
        }
        if (sumFound < names.length - 1) {
            getData();
        }
    }//while
    //////////////////////////////////////////////////
    var a = [];//cov matrix
    var colNames = ["Cov"];
    var rowNames = ["Cov"];
    for (var i = 1; i < names.length; i++) {
        names[i] = names[i].toUpperCase(); 
        colNames.push(names[i]);
        rowNames.push(names[i]);
        var r = [names[i]];
        for (var j = 1; j < names.length; j++) {
            r.push(1.0);
        }
        a.push(r);
    }
    a.unshift(colNames);
 //   alert("1. a=" + a);
    ////////////////////////////////////////////////
    for (var i = 1; i < names.length; i++) {
        for (var j = i; j < names.length; j++) {// 2 times???for (var j = i; j < names.length; j++) {
            //    alert("1. i=" + names[i] + " j=" + names[j]);
            var vi = arStock[i][4];
            var vj = arStock[j][4];
            //   alert("1.vi=" + vi);
            //    alert("1.vj=" + vj);
            vi = ret(vi);
            vj = ret(vj);
            //   alert("2.vi=" + vi);
            //    alert("2.vj=" + vj);
            var aij = cov2(vi, vj);

            a[i][j] = aij;
            a[j][i] = aij;
            //   alert("i=" + names[i] + " j=" + names[j] + " aij=" + a[i][j] + "vi[1]=" + vi[1] + "vj[1]=" + vj[1]);
        }
    }

 //alert("2. a="+a);
    var b = [];
    b.push(["mvPortf", "Weight"]);
    for (var i = 1; i < names.length; i++) {
        b.push([names[i], Number(1.0)]);
    }

    var G = gaussj(a, names.length - 1, b, 1);
//alert("3.a: " + a);
    // setTable(a, 1, rowNames, colNames);
    var sum = 0;
    var sumRow = [];
    sumRow.push(0);
    for (var i = 1; i < names.length; i++) {
        var sr = 0;
        //  for (var j = i + 1; j < names.length; j++) {
        for (var j = 1; j < names.length; j++) {
            sum += Number(a[i][j]);
            sr += Number(a[i][j]);
        }
        sumRow.push(sr);
    }
// alert("sum=" + sum);

  //  var W = [];
    for (var i = 1; i < names.length; i++) {
        //    alert("sumRow[i] =" + sumRow[i]);
        b[i][1] = sumRow[i] / sum;
     //   W.push(b[i]);
       
    }


// alert("2. " + b);
   // alert("nOut=" + nOut);

    //   setTable(b, nOut, rowNames, ["mvPortf", "Weight"]);
/*
 alert("3. " + b);

    var answer = 0;
    for (var i = 1; i < names.length; i++) {

        var v = arithm('*', arStock[i][4], b[i][1]);
        answer = arithm('+', answer, v);
    }

    //    alert(answer);

    return answer;
*/
    //alert(b);
    return b;
  //  return W;
}

function portfolio(vIn) {
    //alert("portfolio");
    var names = [1];
    var weights = [1];
    //  if (vIn[0] != undefined && vIn.length >= 1 && vIn[0][0] != 'x') {
    if (isMatrix(vIn)) {
        for (var i = 1; i < vIn.length; i++) {
            if (!isNaN(vIn[i][0])) throw "add a Table with stock names (first column) and weights (second column)";
            names.push(vIn[i][0]);
            weights.push(vIn[i][1]);
        }
    }
    else {
        throw "add a Table with stock names and weights, please";
    }
  //  alert("names=" + names);
 //   alert("weights=" + weights);
    var arStock = [];
    for (var k = 1; k < names.length-1; k++) {
        var ar = [];
        arStock.push(ar);
    }
//alert("arTexts.lenght=" + arTexts.length);
    var bAllFound = false;

    var sumFound = 0;
    while (sumFound < names.length-1) {
        for (var k = 1; k < names.length; k++) {
            var sName = names[k];
            for (var i = 0; i < arAvailableStiocks.length; i++) {
                if (sName.toUpperCase() == arAvailableStiocks[i][0][0].toUpperCase()) {
                    arStock[k] = arAvailableStiocks[i];
                    sumFound++;
                }
            }
        }
        if (sumFound < names.length-1) {
            getData();
        }
    }//while

//alert("Found all stocks");

    var answer = 0;
    for (var i = 1; i < names.length; i++) {
       // alert("1 * weights[i][1]=" + 1 * weights[i][1]);
        var v = arithm('*', arStock[i][4], 1*weights[i]);
        answer = arithm('+', answer, v);
    }

    //    alert(answer);

    return answer;

}
//function minVarPortf(vIn) {// inputPortfolio
function minVarPortf(vIn, vOut) {// inputPortfolio, outputCorrTabl&Weights
//    alert("minVarPortf");
    var names=[1];
    if (vIn[0] != undefined && vIn.length >= 1 && vIn[0][0] !='x') {

        for (var i = 0; i < vIn.length; i++) {
            names.push(vIn[i][0]);
        }
    }
    else {

        nIn = fromVNtoN(vIn);
        names = getNames(nIn);
    }
    

    var nOut = fromVNtoN(vOut);
 /* 
alert("1. vOut=" + vOut);
    if (vOut[0] != undefined && vOut.length >= 1 && vOut[0][0] != 'x') {
        alert("vOut.notation=" + vOut.notation);
        nOut = 1 * vOut.notation;
        

    }
    else {
        nOut = fromVNtoN(vOut);

    }
    */
//alert("1. nOut=" + nOut);
 //   var nOut = arTexts.length;
 


    var a = [];//cov matrix
    var colNames = ["Cov"];
    var rowNames = ["Cov"];
    for (var i = 1; i < names.length; i++) {
        names[i] = names[i].toUpperCase(); ////////////////////////////
        colNames.push(names[i]);
        rowNames.push(names[i]);
        var r = [names[i]];
        for (var j = 1; j < names.length; j++) {
            r.push(1.0);
        }
        a.push(r);
    }
    a.unshift(colNames);
//alert("arStock.length=" + arStock.length);
//alert(a);
    var kk = -1;
    var nFound = 0;
    for (var k = 1; k < names.length; k++) {// <=
        sName = names[k];
        for (var i = 0; i < arAvailableStiocks.length; i++) {
//alert("arAvailableStiocks[i]=" + arAvailableStiocks[i]);
            if (sName == arAvailableStiocks[i][0][0].toUpperCase()) {
               // arStock[k] = arAvailableStiocks[i];
                nFound++;
                break;
            }
            else{
               // alert("sName="+sName);
                kk=k;
            }
        }
    }
    if (kk>=0)
    {
       // alert("Symbol "+names[kk]+" is not found");
    }
 
/*    if(nFound<names.length-1){
        alert("Not founf, nFound="+nFound +"names.length="+names.length );
         return [nFound]; 
//throw "Symbol "+names[kk]+" is not found";
    }*/
//  alert(nFound + "nFound < names.length-1");

    return minVarPortfPartB(names, a,  nOut, rowNames);
}
function minVarPortfPartBOld(names, a, nOut, rowNames) {

 //   alert("minVarPortfPartB: names="+names);
/*    alert("arAvailableStiocks.length="+arAvailableStiocks.length);
    for (var i = 0; i < arAvailableStiocks.length; i++) {
        alert(arAvailableStiocks[i][0][0]);

    }*/
    var arStock = [];
    //for (var k = 0; k < names.length; k++) {
    for (var k = 1; k < names.length; k++) {
        var ar = [];
        arStock.push(ar);
    }
//alert("a=" + a);
    for (var k = 1; k < names.length; k++) {
        var sName = names[k];
    //    var bFound = false;
        for (var i = 0; i < arAvailableStiocks.length; i++) {
            if (sName.toUpperCase() == arAvailableStiocks[i][0][0].toUpperCase()) {
                arStock[k] = arAvailableStiocks[i];
                //            bFound = true;
 //alert(sName+" ("+k+"): arStock[k][4].length="+arStock[k][4].length);
            }
        }
    }


    for (var i = 1; i < names.length; i++) {
        for (var j = i; j < names.length; j++) {// 2 times???for (var j = i; j < names.length; j++) {
//alert("i="+i+" j="+j);
            var vi = arStock[i][4];
            var vj = arStock[j][4];
//alert("i="+i+" j="+j+ " 1. vi="+vi+" vj="+vj);
            vi = ret(vi);
            vj = ret(vj);
//alert("i=" + names[i] + " j=" + names[j] +"2. vi="+vi+" vj="+vj);
            var aij = cov2(vi, vj);

            a[i][j] = aij;
            a[j][i] = aij;

//alert("i=" + names[i] + " j=" + names[j] + " aij=" + aij + "vi[1]=" + vi[1] + "vj[1]=" + vj[1]);
        }
    }
    //    alert("nA=" + nA);
    // alert("1.a: "+a);
    // alert(a[1]);
    //replaceTable(a, nA, rowNames, colNames);

    var b = [];
    b.push(["mvPortf", "Weight"]);
    for (var i = 1; i < names.length; i++) {
        b.push([names[i], Number(1.0)]);
    }
    //alert("2. "+b);

    //   setTable(b, 2, rowNames, ["mvPortf", "Weight"]);

//alert(names.length - 1);
//alert(names, - 1);
    var G = gaussj(a, names.length - 1, b, 1);
//alert("2.a: " + a);
    // setTable(a, 1, rowNames, colNames);
    var sum = 0;
    var sumRow = [];
    sumRow.push(0);
    for (var i = 1; i < names.length; i++) {
        var sr = 0;
        //  for (var j = i + 1; j < names.length; j++) {
        for (var j = 1; j < names.length; j++) {
            sum += Number(a[i][j]);
            sr += Number(a[i][j]);
        }
        sumRow.push(sr);
    }
//alert("sum=" + sum);


    for (var i = 1; i < names.length; i++) {
        //alert("sumRow[i] =" + sumRow[i]);
        b[i][1] = sumRow[i] / sum;
    }


    //alert("2. " + b);

    setTable(b, nOut, rowNames, ["mvPortf", "Weight"]);


    var answer = 0;
    for (var i = 1; i < names.length; i++) {

        var v = arithm('*', arStock[i][4], b[i][1]);
        answer = arithm('+', answer, v);
    }

/*
    alert("arOldPortfIndexes=" + arOldPortfIndexes);
    for (var i = 0; i < arOldPortfIndexes.length; i++) {
        var tbox = document.getElementById("txtSymbol" + arOldPortfIndexes[i]);
        if (tbox != null) tbox.style.border = sPortfIndexesStyle;
        var but = document.getElementById("butSymbol" + arOldPortfIndexes[i]);
        if (but != null) but.style.border = sPortfIndexesStyle;
        //butSymbol
    }
*/
//doMinVarPortf(0,1);
    return answer;
    
}
function minVarPortfPartB(names, a, nOut, rowNames) {
//alert("Part B: nOut="+nOut);
    var arStock = [];
    for (var k = 1; k < names.length; k++) {
        var ar = [];
        arStock.push(ar);
    }
//alert("arTexts.lenght=" + arTexts.lenght);
    var bAllFound = false;

    var sumFound = 0;
//alert("1. sumFound=" + sumFound);
//alert("1.   names.length=" + names.length);
    while (sumFound < names.length - 1) {
        for (var k = 1; k < names.length; k++) {
            var sName = names[k];    
            for (var i = 0; i < arAvailableStiocks.length; i++) {
                if (sName.toUpperCase() == arAvailableStiocks[i][0][0].toUpperCase()) {
                    arStock[k] = arAvailableStiocks[i];
                    sumFound++;
                }
            }
        }
 
        if (sumFound < names.length - 1) {
 //   alert("arAvailableStiocks.length=" + arAvailableStiocks.length + " sumFound=" + sumFound);
 //   alert("2. sumFound=" + sumFound + "  names.length=" + names.length);
                //alert("1. arTexts.length=" + arTexts.length);
                getData();
    // alert("2. arTexts.length=" + arTexts.length);
                // addStocksToArAvailableStiocks();
                //sumFound = 0;
         }
       }//while

  //  alert(a);
  //  alert("arAvailableStiocks.length=" + arAvailableStiocks.length + " sumFound=" + sumFound);

    for (var i = 1; i < names.length; i++) {
        for (var j = i; j < names.length; j++) {// 2 times???for (var j = i; j < names.length; j++) {
        //    alert("1. i=" + names[i] + " j=" + names[j]);
            var vi = arStock[i][4];
            var vj = arStock[j][4];
        //    alert("1.vi=" + vi);
        //    alert("1.vj=" + vj);
            vi = ret(vi);
            vj = ret(vj);
         //   alert("2.vi=" + vi);
        //    alert("2.vj=" + vj);
            var aij = cov2(vi, vj);

            a[i][j] = aij;
            a[j][i] = aij;
         //   alert("i=" + names[i] + " j=" + names[j] + " aij=" + a[i][j] + "vi[1]=" + vi[1] + "vj[1]=" + vj[1]);
        }
    }

//alert(rowNames);
    var b = [];
    b.push(["mvPortf", "Weight"]);
    for (var i = 1; i < names.length; i++) {
        b.push([names[i], Number(1.0)]);
    }

    var G = gaussj(a, names.length - 1, b, 1);
//alert("2.a: " + a);
    // setTable(a, 1, rowNames, colNames);
    var sum = 0;
    var sumRow = [];
    sumRow.push(0);
    for (var i = 1; i < names.length; i++) {
        var sr = 0;
        //  for (var j = i + 1; j < names.length; j++) {
        for (var j = 1; j < names.length; j++) {
            sum += Number(a[i][j]);
            sr += Number(a[i][j]);
        }
        sumRow.push(sr);
    }
//    alert("sum=" + sum);


    for (var i = 1; i < names.length; i++) {
    //    alert("sumRow[i] =" + sumRow[i]);
        b[i][1] = sumRow[i] / sum;
    }


    // alert("2. " + b);
    alert("nOut=" + nOut);

 //   setTable(b, nOut, rowNames, ["mvPortf", "Weight"]);

 //alert("3. " + b);

    var answer = 0;
    for (var i = 1; i < names.length; i++) {

        var v = arithm('*', arStock[i][4], b[i][1]);
        answer = arithm('+', answer, v);
    }

//    alert(answer);

    return answer;

}
function areStocksAvailable(names, vIn, vOut) {
    for (var k = 1; k < names.length; k++) {
        var sName = names[k];
        var bFound = false;
        for (var i = 0; i < arAvailableStiocks.length; i++) {
            if (sName == arAvailableStiocks[i][0][0]) {
                arStock[k] = arAvailableStiocks[i];
                bFound = true;
            }
        }
        if (!bFound) {
        //    throw "No data for " + sName;
        //    setTimeout(function (vIn, vOut) { minVarPortf(vIn, vOut); }, 1000);
            return false;
        }
        //else callCalculateA();
    }
    return true;   
}
function retOld(v) {
    // (c-ref(-1,c))/c
    var answer = [];
    answer.push(v[0] + 1);
    for(var i=2;i<v.length;i++){
        answer.push(100*(v[i]-v[i-1])/v[i-1]);
    }
    return answer;
}
function ret(v) {
    if (isMatrix(v)) return oneMatrix(ret, "", v);
    var V = compressOne(v, v);
    var vOld = retOld(V);
    if (V.length == v.length) return vOld;////////////////////////////////
    return decompressOne(vOld, v);
}
function bondPYP(vIn) {
    if (!isMatrix(vIn)) throw "the argument should be a table, see sample Bond Ptice, Yield, and Par Yield";
    if (vIn[0][1] != "Year" || vIn[0][2] != "ZeroR%" || vIn[0][3] != "Bond1") throw " the table should inclde columbs Year, Coupon, Price, see sample Bond Ptice, Yield, and Par Yield";
    //  alert("vbondPYP: vIn.length=" + vIn.length);
    //    alert("vbondPYP: vIn=" + vIn);
    //  alert("vOut=" + vOut);
    var B;
    var nRowsIn;
    var nColsIn;
    var sNameIn;

    if (vIn[0] != undefined && vIn.length >= 1 && vIn[0][0] != 'x') {
   //     alert("vbondPYP: vIn[0].length > 1" );
        B = copy(vIn);
        sNameIn = B[0][0];
        if (!isNaN(sNameIn[0])) {
            B = dress(B,"");
        }
        nRowsIn = B.length;
        nColsIn = B[0].length;
    }
    else {
       // alert("1. nIn=" + nIn);
        nIn = fromVNtoN(vIn);
     //   alert("2. nIn=" + nIn);
     //   alert("arTexts=" + arTexts);
        if (arTexts == null || arTexts.length <= vIn || arTexts[nIn].length == 0) throw "empty table";
        var matrixRowsCols=matrix(vIn);
        B=matrixRowsCols[0];
        nRowsIn=matrixRowsCols[1]; 
        nColsIn = matrixRowsCols[2];
        sNameIn = matrixRowsCols[3];
    }
//    var nOut=fromVNtoN(vOut);

    var colNames=["PYP"];
    for (var i = 1; i < nColsIn - 2; i++) {
        colNames.push("Bond" + i);
    }
    var rowNames = ["PYP","Price","Yield","ParY"];
//    alert("nColsIn=" + nColsIn+" nRowsIn="+nRowsIn);
//    alert(colNames);
//    alert(rowNames);  
    var arOut=[];
    arOut.push(colNames);
    for (var r = 1; r < rowNames.length; r++) {
        var ar=[rowNames[r]];
        for (var c = 1; c < colNames.length; c++) {
            ar.push(0);
        }
        arOut.push(ar);
    }
 //   alert(arOut[0]);
  //  alert(arOut[1]);
  //  alert(arOut[2]);
  //  alert(arOut[3]);

    for (var i = 3; i < nColsIn; i++) {

        //Price
        var Price = 0;
        var ar1=[0];
        var ar2=[0];
        var arI=[0];
        for (var r = 1; r < nRowsIn; r++) {
            ar1.push(1 * B[r][1]);
            ar2.push(1 * B[r][2]);
            arI.push(1 * B[r][i]);
        }
    //    alert(ar1); alert(ar2); alert(arI);
       // var Price = funkPrice(B, i, nRowsIn);
        var Price=funkPrice(ar1,ar2, arI,nRowsIn);
    //    alert("i=" + i + " Price=" + Price);
        arOut[1][i-2] = Price;

        // Yield
        var left = 0;
        var right = 100;
        var eps = 0.000001;
        var ar2Copy = ar2.slice();
     //   alert("Before: " + ar2);
        var Y = rootBisect(funkPrice, ar1, ar2Copy, arI, nRowsIn, left, right, eps, Price);
    //    alert("After: " + ar2);
  //      alert("i=" + i + " Y=" + Y);
        arOut[2][i-2] = Y;

        //Par Yield
   //     var d = 0.5 * Math.exp(-ar2[nRowsIn - 1] * ar1[nRowsIn - 1] / 100);
        var d = Math.exp(-ar2[nRowsIn - 1] * ar1[nRowsIn - 1] / 100);
        var arICopy = [0];
        for (var r = 1; r < nRowsIn; r++) {
            arICopy.push(.5);
        }
    //    alert(ar1); alert(ar2); alert(arICopy);
        var P=funkPrice(ar1, ar2, arICopy, nRowsIn);
        var Par = 100 * (1 - d) / P;
    //    alert("i=" + i + " d=" + d + " P=" + P + " Par=" + Par);
        arOut[3][i-2] = Par;
    }

//alert(arOut);
/*
   setTable(arOut, nOut, rowNames, colNames);
    
   var answer = [1];
   for (var r = 1; r < rowNames.length; r++) {
     //  alert("r=" + r); alert(arOut[r]);
       answer.push(arOut[r][colNames.length-1]);
   }
    //return answer;

    */
//alert(arOut);
   return arOut;
}
/*
var funkPrice = function (B, i, nRowsIn) {
    var Price = 0;
    for (var r = 1; r < nRowsIn; r++) {
        var d = B[r][i] * Math.exp(-B[r][2] * B[r][1] / 100);
        Price += d;
       // alert(B[r][1] + " " + B[r][2] + " " + B[r][i] + " " + d + " " + Price);
    }
    return Price;
}
*/
var funkPrice = function (ar1,ar2, arI,nRowsIn) {
    var Price = 0;
    for (var r = 1; r < nRowsIn; r++) {
        var d = arI[r] * Math.exp(-ar2[r] * ar1[r] / 100);
        Price += d;
     //   alert("r:"+r+" "+arI[r] + " " + ar2[r] + " " + ar1[r] + " " + d + " " + Price);
    }
    return Price;
}
function rootBisect(funkPrice, ar1, ar2, arI, nRowsIn, left, right, eps, Price) {
    // solves Price=funkPrice(ar1, ar2, arI, nRowsIn) equation, where ar2 is made of y
    for (var r = 1; r < nRowsIn; r++) {
        ar2[r] = left;
    }
    var fLeft = funkPrice(ar1, ar2, arI, nRowsIn) - Price;

    for (var r = 1; r < nRowsIn; r++) {
        ar2[r] = right;
    }
    var fRight = funkPrice(ar1, ar2, arI, nRowsIn) - Price;
    if (fLeft > 0 && fRight > 0 || fLeft < 0 && fRight < 0) throw "rootBisect: wrong left & right"

   // alert(fLeft + " " + fRight);

    var delta = right - left;
    while (delta > eps) {
        var y = (left + right) / 2;
        for (var r = 1; r < nRowsIn; r++) {
            ar2[r] = y;
        }
        var f = funkPrice(ar1, ar2, arI, nRowsIn) - Price;
        if (Math.abs(f) < eps) return y;
        if (f > 0 && fLeft > 0 || f < 0 && fLeft < 0) {
            left = y;
        }
        else right = y;

        //alert(y+" "+f);
    }
    return y;
}
//function bootstrap(vIn, vOut) {
function bootstrap(vIn) {
    if (!isMatrix(vIn)) throw "the argument should be a table, see sample Bootstrap";
    if (vIn[0][1] != "Year" || vIn[0][2] != "Coupon" || vIn[0][3] != "Price") throw " the table should inclde columbs Year, Coupon, Price, see sample Bootstrap";
    var B;
    var nRowsIn;
    var nColsIn;
    var sNameIn;

    if (vIn[0] != undefined && vIn.length >= 1 && vIn[0][0] != 'x') {
        B = copy(vIn);
        sNameIn = B[0][0];
        if (!isNaN(sNameIn[0])) {
        B = dress(B,"");
        }
        nRowsIn = B.length;
        nColsIn = B[0].length;
//alert("2. B=" + B);
    }
    else {
        // alert("1. nIn=" + nIn);
        nIn = fromVNtoN(vIn);
        //   alert("2. nIn=" + nIn);
        //   alert("arTexts=" + arTexts);
        if (arTexts == null || arTexts.length <= vIn || arTexts[nIn].length == 0) throw "empty table";
        var matrixRowsCols = matrix(vIn);
        B = matrixRowsCols[0];
        nRowsIn = matrixRowsCols[1];
        nColsIn = matrixRowsCols[2];
        sNameIn = matrixRowsCols[3];
    }
    //var nIn = fromVNtoN(vIn);
    //var nOut = fromVNtoN(vOut);

//if (arTexts == null || arTexts.length <= vIn || arTexts[nIn].length == 0) throw "empty table";
    //   var matrixRowsCols = matrix(vIn);
    //  var B = matrixRowsCols[0];
    //   var nRowsIn = matrixRowsCols[1];
    //   var nColsIn = matrixRowsCols[2];
    // var sNameIn = matrixRowsCols[3];

    var delta = 3 - nColsIn;
//if (nColsIn != 3 && delta > 0) throw "there should be " + delta + " more column(s) in the input Table " + nIn;

    var colNames = ["Boot", "Year", "Coupon",	"Price", "ZeroR"];


    var rowNames = ["Boot"];
    for (var r = 1; r < nRowsIn; r++) {
        rowNames.push("bond" + r);
    }
    //    alert("nColsIn=" + nColsIn+" nRowsIn="+nRowsIn);
    //    alert(colNames);
    //    alert(rowNames);  
    var arOut = [];
    arOut.push(colNames);
    for (var r = 1; r < rowNames.length; r++) {
        var ar = [rowNames[r]];
        for (var c = 1; c < colNames.length; c++) {
            ar.push(0);
        }
        arOut.push(ar);
    }
    //   alert(arOut[0]);
    //  alert(arOut[1]);
    //  alert(arOut[2]);
    //  alert(arOut[3]);

    //   for (var i = 3; i < nColsIn; i++) {

    //Price
    //    var Price = 0;
    //    alert(B);

    //    var ar1 = [];
    //     var ar2 = [];
    //     var arI = [];

    for (var r = 1; r < nRowsIn; r++) {

        //   ar1.push(1 * B[r][1]);//yea
        //    ar2.push(arOut[r-1][2]);//rate
        //    arI.push(1 * B[r-1][2]);//coup

        //    alert("year=" + ar1); alert("rate=" + ar2); alert("coupon=" + arI);
        //     var SumPrice = funkPrice(ar1, ar2, arI, r)

        var SumPrice = 0;
        for (var i = 1; i < r; i++) {
            var d = 0.5 * B[r][2] * Math.exp(-B[i][1] * arOut[i][2+2] / 100);
            SumPrice += d;
        }
        arOut[r][1] = B[r][1];
        arOut[r][2] = B[r][2];

        var Price = B[r][3];
        var x = -(100 / B[r][1]) * Math.log((Price - SumPrice) / (100 + B[r][2] / 2))
        arOut[r][2+2] = x;
        arOut[r][1+2] = B[r][3];
        //    alert("r="+r+" B[r][1]="+B[r][1]+" Price=" + Price + " SumPrice=" + SumPrice + " x=" + x);

    }


    // alert(arOut);
/*
    setTable(arOut, nOut, rowNames, colNames);

    var answer = [1];
    for (var r = 1; r < rowNames.length; r++) {
        //  alert("r=" + r); alert(arOut[r]);
        answer.push(arOut[r][colNames.length - 1]);
    }
    return answer;
*/
    return arOut;
}
function forwardRate(vIn/*, vOut*/) {
    if (!isMatrix(vIn)) throw "the argument should be a table, see sample Forward Rate for Mth Year";
    if (vIn[0][1] != "Year" || vIn[0][2] != "ZeroR,%") throw " the table should inclde columbs Year, ZeroR,%, see sample Forward Rate for Mth Year";

    var B;
    var nRowsIn;
    var nColsIn;
    var sNameIn;

    if (vIn[0] != undefined && vIn.length >= 1 && vIn[0][0] != 'x') {
        B = copy(vIn);
        sNameIn = B[0][0];
        if (!isNaN(sNameIn[0])) {
            B = dress(B,"");
        }
        nRowsIn = B.length;
        nColsIn = B[0].length;
        //alert("2. B=" + B);
    }
    else {
        nIn = fromVNtoN(vIn);
        if (arTexts == null || arTexts.length <= vIn || arTexts[nIn].length == 0) throw "empty table";
        var matrixRowsCols = matrix(vIn);
        B = matrixRowsCols[0];
        nRowsIn = matrixRowsCols[1];
        nColsIn = matrixRowsCols[2];
        sNameIn = matrixRowsCols[3];
    }
  //  alert("B=" + B);
    /*
    var nIn = fromVNtoN(vIn);
    var nOut = fromVNtoN(vOut);
    if (arTexts == null || arTexts.length <= vIn || arTexts[nIn].length == 0) throw "empty table";
    var matrixRowsCols = matrix(vIn);
    var B = matrixRowsCols[0];
    var nRowsIn = matrixRowsCols[1];
    var nColsIn = matrixRowsCols[2];
    var sNameIn = matrixRowsCols[3];

    var delta = 3 - nColsIn;
    if (nColsIn != 3 && delta>0) throw "there should be "+delta+" more column(s) in the input Table " + nIn;
    */
    var colNames = ["Row", "Year", "ZeroR,%", "ForwRate,%"];


    var rowNames = ["Row"];
    for (var r = 1; r < nRowsIn; r++) {
        rowNames.push("row" + r);
    }
///alert("B="+B);
//alert("nColsIn=" + nColsIn+" nRowsIn="+nRowsIn);
//alert(colNames);
//alert(rowNames);  
//alert(colNames.length);
    var arOut = [];
    arOut.push(colNames);
    for (var r = 1; r < rowNames.length; r++) {
        var ar = [rowNames[r]];
        for (var c = 1; c < colNames.length; c++) {
//alert("r="+r+" c=" + c);
            if (c != colNames.length - 1) {
                ar.push(B[r][c]);
            }
            else {
 //alert(" c=" + c);
                if (r == 1) {
                    ar.push(r * B[r][2]);
                }
                else {
                    ar.push(r * B[r][2] - (r - 1) * B[r - 1][2]);
                }
//alert(ar[ar.length - 1]);
            }           
        }
 //alert("r=" + r + ar);
        arOut.push(ar);

    }

  //  alert(colNames + " colNames.length=" + colNames.length);
//    alert(rowNames + " rowNames.length=" + rowNames.length);
 /*
    setTable(arOut, nOut, rowNames, colNames);
//alert(arOut);

    var answer = [1];
    for (var r = 1; r < rowNames.length; r++) {
        //  alert("r=" + r); alert(arOut[r]);
        answer.push(arOut[r][colNames.length - 1]);
    } 
    return answer;
  */
    return arOut;
}
function premFromHazard(vIn, /*vOut,*/ vR) {
    var B;
    var nRowsIn;
    var nColsIn;
    var sNameIn;

    if (vIn[0] != undefined && vIn.length >= 1 && vIn[0][0] != 'x') {
        B = copy(vIn);
        sNameIn = B[0][0];
        if (!isNaN(sNameIn[0])) {
            B = dress(B,"");
        }
        nRowsIn = B.length;
        nColsIn = B[0].length;
        //alert("2. B=" + B);
    }
    else {
        nIn = fromVNtoN(vIn);
        if (arTexts == null || arTexts.length <= vIn || arTexts[nIn].length == 0) throw "empty table";
        var matrixRowsCols = matrix(vIn);
        B = matrixRowsCols[0];
        nRowsIn = matrixRowsCols[1];
        nColsIn = matrixRowsCols[2];
        sNameIn = matrixRowsCols[3];
    }
  //  var nIn = fromVNtoN(vIn);
  //  var nOut = fromVNtoN(vOut);

    var R = fromVNtoN(vR);
//alert("nIn="+nIn);
 //   alert(arTexts.length);
//    alert(arTexts[nIn]);
/*
    if (arTexts == null || arTexts.length <= vIn || arTexts[nIn].length == 0) throw "empty table";
    var matrixRowsCols = matrix(vIn);
    var B = matrixRowsCols[0];
    var nRowsIn = matrixRowsCols[1];
    var nColsIn = matrixRowsCols[2];
    var sNameIn = matrixRowsCols[3];
*/
    // out table
    var colNames = ["Row", "Year", "FreeR,%", "HazR,%", "SurvP", "Premium,%"];
    var rowNames = ["Row"];
    for (var r = 1; r < nRowsIn; r++) {
        rowNames.push("" + r);
    }
    //alert("B="+B);
//alert("nColsIn=" + nColsIn+" nRowsIn="+nRowsIn);
    //alert(colNames);
    //alert(rowNames);  
    //alert(colNames.length);
    var arOut = [];
    arOut.push(colNames);
    for (var r = 1; r < rowNames.length; r++) {
        var ar = [];
        for (var i = 0; i < colNames.length; i++) ar.push(0);
        arOut.push(ar);
    }
    var arBet = [1];//exp(-0.5rk). 
    var arAlpha = [1];
    var arA = [1];
    var arL = [0];
    var arR = [0];
//alert(1);
    for (var r = 1; r < rowNames.length; r++) {
        arOut[r][0] = B[r][0];//Row
        arOut[r][1] = B[r][1];//Year
        arOut[r][2] = B[r][2];// FreeRate r
        arOut[r][3] = B[r][3];// HazardRate
        arBet.push(Math.exp(-0.5 * B[r][2] / 100));
        arAlpha.push(arAlpha[r - 1] * Math.exp(-0.5 * B[r][3] / 100));
        arOut[r][4] = arAlpha[r];// alpha
        arA.push(arA[r - 1] * arAlpha[r]);
        arL.push(arL[r - 1] + arBet[r] * arA[r] * (1 - arAlpha[r]) / arAlpha[r]);
        arR.push(arR[r - 1] + arBet[r] * arA[r]);
        arOut[r][5] = 200 * (1 - R) * arL[r] / arR[r];
    }
/*    setTable(arOut, nOut, rowNames, colNames);

    var answer = [1];
    for (var r = 1; r < rowNames.length; r++) {
        //  alert("r=" + r); alert(arOut[r]);
        answer.push(arOut[r][colNames.length - 1]);
    }
    return answer;
    */
    return arOut;
}
function hazardFromPrem(vIn, vOut, vR) {
    var nIn = fromVNtoN(vIn);
    var nOut = fromVNtoN(vOut);
    var R = fromVNtoN(vR);
    //alert("nIn="+nIn);
    //   alert(arTexts.length);
    //    alert(arTexts[nIn]);

    if (arTexts == null || arTexts.length <= vIn || arTexts[nIn].length == 0) throw "empty table";
    var matrixRowsCols = matrix(vIn);
    var B = matrixRowsCols[0];
    var nRowsIn = matrixRowsCols[1];
    var nColsIn = matrixRowsCols[2];
    var sNameIn = matrixRowsCols[3];

    // out table
    var colNames = ["Row", "Year", "FreeR,%", "HazR,%", "SurvP", "Premium,%"];
    var rowNames = ["Row"];
    for (var r = 1; r < nRowsIn; r++) {
        rowNames.push("" + r);
    }
    //alert("B="+B);
    //alert("nColsIn=" + nColsIn+" nRowsIn="+nRowsIn);
    //alert(colNames);
    //alert(rowNames);  
    //alert(colNames.length);
    var arOut = [];
    arOut.push(colNames);
    for (var r = 1; r < rowNames.length; r++) {
        var ar = [];
        for (var i = 0; i < colNames.length; i++) ar.push(0);
        arOut.push(ar);
    }
    var arBet = [1];//exp(-0.5rk). 
    var arAlpha = [1];
    var arA = [1];
    var arL = [0];
    var arR = [0];
    //alert(1);
    for (var r = 1; r < rowNames.length; r++) {
        arOut[r][0] = B[r][0];//Row
        arOut[r][1] = B[r][1];//Year
        arOut[r][2] = B[r][2];// FreeRate r
        arOut[r][3] = B[r][3];// HazardRate
        arBet.push(Math.exp(-0.5 * B[r][2] / 100));
        arAlpha.push(arAlpha[r - 1] * Math.exp(-0.5 * B[r][3] / 100));
        arOut[r][4] = arAlpha[r];// alpha
        arA.push(arA[r - 1] * arAlpha[r]);
        arL.push(arL[r - 1] + arBet[r] * arA[r] * (1 - arAlpha[r]) / arAlpha[r]);
        arR.push(arR[r - 1] + arBet[r] * arA[r]);
        arOut[r][5] = 200 * (1 - R) * arL[r] / arR[r];
    }

    /*
    for (var r = 1; r < rowNames.length; r++) {
        arOut[r][0] = B[r][0];//Row
        arOut[r][1] = B[r][1];//Year
        arOut[r][2] = B[r][2];// FreeRate r
        arOut[r][3] = B[r][3];// HazardRate
        arBet.push(Math.exp(-0.5 * B[r][2]/100));
        // alpha A1 = exp(-L1/2), A2 = exp[-(L1 + L2)/2], A2 = exp[-(L1 + L2+ L3)/2] 
        var prev = 1;
        var productAl = 1;
        var Left = 0;
        var Right = 0;
        for (var i = 1; i <= r; i++) {
            var ai = Math.exp(-B[i][3] / 200);//r=1:  
            prev *= ai; // 
            productAl *= prev;//A1*A2*A3
            Right += arBet[r] * productAl
            Left += arBet[r] * productAl * (1 - ai) / ai;
//alert("ai=" + ai + "arBet[r] =" + arBet[r] + " productAl=" + productAl + " Left=" + Left + " Right=" + Right);
        }
        alert(r + ": a=" + prev + " b=" + arBet[r] + " Left=" + Left + " Right=" + Right + " x=" + 200 * (1 - R) * Left / Right);
        arOut[r][4] =100*prev;//alpha



        // Left = x*Right
        // Left=(1-R)[B1*(1-A1) +  B2*A1*(1-A2) +  B3*A1*A2*(1-A3)] 
        // Right=0.5*[B1*A1 + B2*A1*A2+ B3*A1*A2*A3]
        arOut[r][5] = 200 * (1 - R) * Left / Right;
    }
    
    setTable(arOut, nOut, rowNames, colNames);

    var answer = [1];
    for (var r = 1; r < rowNames.length; r++) {
        //  alert("r=" + r); alert(arOut[r]);
        answer.push(arOut[r][colNames.length - 1]);
    }
    return answer;*/
}
function cSpline(vIn) {
    var B;
    var nRowsIn;
    var nColsIn;
    var sNameIn;

    if (vIn[0] != undefined && vIn.length >= 1 && vIn[0][0] != 'x') {
        B = copy(vIn);
        sNameIn = B[0][0];
        if (!isNaN(sNameIn[0])) {
            B = dress(B, "");
        }
        nRowsIn = B.length;
        nColsIn = B[0].length;
        //alert("2. B=" + B);
    }
    else {
        nIn = fromVNtoN(vIn);
        if (arTexts == null || arTexts.length <= vIn || arTexts[nIn].length == 0) throw "empty table";
        var matrixRowsCols = matrix(vIn);
        B = matrixRowsCols[0];
        nRowsIn = matrixRowsCols[1];
        nColsIn = matrixRowsCols[2];
        sNameIn = matrixRowsCols[3];
    }
    var monthStart = 1 * B[1][0];
    var monthEnd = B[nRowsIn - 1][0];

    // alert("monthStart=" + monthStart);
    // no out table
    var answer = [monthStart];
    var x = [1];
    var y = [1];
    for (var r = 1; r < nRowsIn; r++) {
        x.push(B[r][0]);
        y.push(B[r][1]);
    }
    //alert(x);
    //alert(y);
    var y2a = Spline(x, y, 1e30, 1e30);
    for (var i = monthStart; i <= monthEnd; i++) {
        answer.push(splint(x, y, y2a, i));
    }
    return answer;
}
function cSplineTwoCols(vIn) {
    var B;
    var nRowsIn;
    var nColsIn;
    var sNameIn;

    if (vIn[0] != undefined && vIn.length >= 1 && vIn[0][0] != 'x') {
        B = copy(vIn);
        sNameIn = B[0][0];
        if (!isNaN(sNameIn[0])) {
            B = dress(B, "");
        }
        nRowsIn = B.length;
        nColsIn = B[0].length;
        //alert("2. B=" + B);
    }
    else {
        nIn = fromVNtoN(vIn);
        if (arTexts == null || arTexts.length <= vIn || arTexts[nIn].length == 0) throw "empty table";
        var matrixRowsCols = matrix(vIn);
        B = matrixRowsCols[0];
        nRowsIn = matrixRowsCols[1];
        nColsIn = matrixRowsCols[2];
        sNameIn = matrixRowsCols[3];
    }
    var monthStart = 1 * B[1][0];
    var monthEnd = B[nRowsIn - 1][0];
    // alert("monthStart=" + monthStart);
    // no out table
    var answer = [monthStart];
    var x = [1];
    var y = [1];
    for (var r = 1; r < nRowsIn; r++) {
        x.push(B[r][0]);
        y.push(B[r][1]);
    }
    //alert(x);
    //alert(y);
    var y2a = Spline(x, y, 1e30, 1e30);
    for (var i = monthStart; i <= monthEnd; i++) {
        answer.push(splint(x, y, y2a, i));
    }
    return answer;
}
function Spline(x, y, yp1, ypn)
       //    public void spline(float x[], float y[], int n, float yp1, float ypn, float y2[])
       //       Given arrays x[1..n] and y[1..n] containing a tabulated function, i.e., yi = f(xi), with
       //     x1 <x2 < :: : < xN, and given values yp1 and ypn for the rst derivative of the interpolating
       //   function at points 1 and n, respectively, this routine returns an array y2[1..n] that contains
       // the second derivatives of the interpolating function at the tabulated points xi. If yp1 and/or
       //        ypn are equal to 1  1030 or larger, the routine is signaled to set the corresponding boundary
       //      condition for a natural spline, with zero second derivative on that boundary.
{
    var n = x.length - 1;
    if (n != y.length - 1) throw "Number of xs should be equal to number of ys";
    var y2 = x.slice();//answer

    var i, k;
    var p, qn, sig, un;//,asterisk_u;
    // u=vector(1,n-1);
    var u = []; for (var j = 0; j < n; j++) u.push(0);

    if (yp1 > 0.99e30) {//The lower boundary condition is set either to be "natural"
//alert("natural");
        y2[1] = u[1] = 0.0;
    }
    else //or else to have a specied rst derivative.
    {
        y2[1] = -0.5;
        u[1] = (3.0 / (x[2] - x[1])) * ((y[2] - y[1]) / (x[2] - x[1]) - yp1);
    }
    for (i = 2; i <= n - 1; i++)
    { //This is the decomposition loop of the tridiagonal algorithm. y2 and u are used for temporary
        //storage of the decomposed  factors.
        sig = (x[i] - x[i - 1]) / (x[i + 1] - x[i - 1]);
        p = sig * y2[i - 1] + 2.0;
        y2[i] = (sig - 1.0) / p;
        u[i] = (y[i + 1] - y[i]) / (x[i + 1] - x[i]) - (y[i] - y[i - 1]) / (x[i] - x[i - 1]);
        u[i] = (6.0 * u[i] / (x[i + 1] - x[i - 1]) - sig * u[i - 1]) / p;
    }
    if (ypn > 0.99e30)// The upper boundary condition is set either to be "natural"
        qn = un = 0.0;
    else
    {// or else to have a specied rst derivative.
        qn = 0.5;
        un = (3.0 / (x[n] - x[n - 1])) * (ypn - (y[n] - y[n - 1]) / (x[n] - x[n - 1]));
    }
    y2[n] = (un - qn * u[n - 1]) / (qn * y2[n - 1] + 1.0);
    for (k = n - 1; k >= 1; k--) //This is the backsubstitution loop of the tridiagonal algorithm.
        y2[k] = y2[k] * y2[k + 1] + u[k];

    return y2;
}
function splint(xa, ya ,y2a, x)
    //  void splint(float xa[], float ya[], float y2a[], int n, float x, float *y)
    //     Given the arrays xa[1..n] and ya[1..n], which tabulate a function (with the xai's in order),
    //   and given the array y2a[1..n], which is the output from spline above, and given a value of
    // x, this routine returns a cubic-spline interpolated value y.
{
    var n = xa.length - 1;
    if (n != ya.length - 1 || n != y2a.length - 1) throw "Number of xs should be equal to number of ys and to number of y2s";

    var klo, khi, k;
    var h, b, a;
    klo = 1;// We will nd the right place in the table by means of bisection. This is optimal if sequential calls to this
        // routine are at random values of x. If sequential calls are in order, and closely spaced, one would do better
        // to store previous values of klo and khi and test if they remain appropriate on the next call.
    khi = n;
    while (khi - klo > 1)
    {
        k = (khi + klo) >> 1;
        if (xa[k] > x) khi = k;
    else klo = k;
    } //klo and khi now bracket the input value of x.
    h = xa[khi] - xa[klo];
    if (h == 0.0) throw "Bad xa input to routine splint";// The xa's must be distinct.
    a = (xa[khi] - x) / h;
    b = (x - xa[klo]) / h; //Cubic spline polynomial is now evaluated.
    var y = a * ya[klo] + b * ya[khi] + ((a * a * a - a) * y2a[klo] + (b * b * b - b) * y2a[khi]) * (h * h) / 6.0;
    return y;
}
/*
public List<double> alpha(double fi, double ek)
{
double F = Math.Tan(Math.PI * fi / 180);
double E = Math.Sin(Math.PI * ek / 180);
List<double> v = new List<double>();
for (int i = 0; i < 366; i++)
{
    double T = Math.Sin(2 * Math.PI * i / 365);
    double d = F * E * T / Math.Sqrt(1 - E * E * T * T);
    if (d > 1) d = 1;
    if (d < -1) d = -1;
    v.push(1 - Math.Acos(d) / Math.PI);
}

int nShift = 0;
int year = DateTime.Now.Year;
DateTime dt = new DateTime(year, 3, 20);
TimeSpan ts = DateTime.Now - dt;
nShift = ts.Days;
if (nShift < 0) nShift = nShift + 365;

List<double> a = new List<double>();
a.push(0);
for (int i = 0; i < 366; i++)
{
    int k = (i + nShift) % 365;
    a.push(24 * v[k]);

}

return a;
}
*/
function noise(v, vM, vSigma) {//noise(x,m,sigma)
    var m = fromVNtoN(vM);
    var sigma = fromVNtoN(vSigma);
    var shift = 0;// in js it is uncontrollable
    var aL = [];
    aL.push(v[0]);
    //  aL.AddRange(BuildNorm(v.length - 1, m, sigma, shift));
    var norm=BuildNorm(v.length- 1, m, sigma, shift);
    for (var i = 0; i < norm.length; i++) {
        aL.push(norm[i]);
    }
    return aL;
}
function BuildNorm(M, mean, variance, shift){
    // shift != 0 to avoid generating the same noise
    // shift<0 to forse generating the same noise
    var sqrtV = Math.sqrt(variance);
 //   var nSeed = DateTime.Now.Millisecond % M + shift;
 //   if (shift < 0) nSeed = -shift;
 //   Random r = new Random(nSeed);


    var aL = [];
    var mu = 0.0;
    for (var m = 0; m < M; m++)
    {
        var e = 0.0;
        for (var i = 0; i < 12; i++) e += Math.random();
        e = e - 6.0;
        aL.push(e);
        mu = mu + e;
    }
    mu = mu / M;

    var s = 0.0;
    for (var m = 0; m < M; m++)
    {
        var d = 1*aL[m] - mu;
        s = s + d * d;
    }
    s = Math.sqrt(s / (M - 1.0));
        //   X' = mean + sqrt(variance) * X
    for (var m = 0; m < M; m++) aL[m] = mean + sqrtV * ((aL[m] - mu) / s);

    return aL;
}
function binom2(vN, vX) {//Returns the incomplete beta function Ix(a; b).
    //x = x / 100;
    var n = fromVNtoN(vN);
    var x = fromVNtoN(vX);

    var aL = [];
    aL.push(1.0);
    for (var k = 1; k <= n; k++)
    {
        var a = k;
        var b = n - k + 1;
        var bt;
        if (x < 0.0 || x > 1.0) throw "Bad x in routine betai";
        if (x == 0.0 || x == 1.0) bt = 0.0;
        else// Factors in front of the continued fraction.
            bt = Math.exp(gammln(a + b) - gammln(a) - gammln(b) + a * Math.log(x) + b * Math.log(1.0 - x));
        if (x < (a + 1.0) / (a + b + 2.0))// Use continued fraction directly.
        {
                var dd = bt * betacf(a, b, x) / a;
                aL.push(dd);

        }
        else //Use continued fraction after making the symmetry transformation.
        {
                var dd = 1.0 - bt * betacf(b, a, 1.0 - x) / b;
                aL.push(dd);
        }
    }// aL[k] -   is probability of k or more occuring in n tests with probability p in one test            
    var i = 0;
    var a2 = [];
    a2.push(0.0);
    for (i = 1; i < aL.length; i++)
    {
        a2.push(aL[i - 1] - aL[i]);
    }
    a2.push(aL[aL.length - 1]);
    return a2;
}
function binom( v, vN,  vX){//Returns the incomplete beta function Ix(a; b).
    //x = x / 100;
    var empty;
  
    if (v.length == 1) {
        var ar = binom2(vN, vX);
     //   alert(ar);
        return [1 * ar[v[0]+1]];
    }


    var n = fromVNtoN(vN);
    var x = fromVNtoN(vX);

    var aL = [];
        //      aL.push(1.0);
    for (var k = 1; k < v.length; k++)
    {
        var a = v[k];
        if (!Number.isInteger(a)) throw "Use only integer x from 0 < x <=" + n;
        if (a < 0 || a > n) {
            aL.push(empty);
            continue;
        }

        var b = n - v[k] + 1;
        var bt;
        if (x < 0.0 || x > 1.0) throw "Bad x in routine betai";
        if (x == 0.0 || x == 1.0) bt = 0.0;
        else// Factors in front of the continued fraction.
            bt = Math.exp(gammln(a + b) - gammln(a) - gammln(b) + a * Math.log(x) + b * Math.log(1.0 - x));
        if (x < (a + 1.0) / (a + b + 2.0))// Use continued fraction directly.
        {
                var dd = bt * betacf(a, b, x) / a;
                aL.push(dd);

        }
        else //Use continued fraction after making the symmetry transformation.
        {
                var dd = 1.0 - bt * betacf(b, a, 1.0 - x) / b;
                aL.push(dd);
        }
    }// aL[k] -   is probability of k or more occuring in n tests with probability p in one test   



    var i = 0;
    var a2 = [];
    a2.push(0.0);
    for (i = 1; i < aL.length; i++)
    {
        a2.push(aL[i - 1] - aL[i]);
    }
    a2.push(aL[aL.length - 1]);
    
    return a2;
}
function gammln( xx)
{
    //Internal arithmetic will be done in double precision, 
    // a nicety that you can omit if ve-gure
    // accuracy is good enough.
            var x, y, tmp, ser;
            var cof = [ 76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5 ];
            var j;
            y = x = xx;
            tmp = x + 5.5;
            tmp -= (x + 0.5) * Math.log(tmp);
            ser = 1.000000000190015;
            for (j = 0; j <= 5; j++) ser += cof[j] / ++y;
            return -tmp + Math.log(2.5066282746310005 * ser / x);
    // x=1/2-> pi=return Math.Exp(-tmp + Math.Log(2.5066282746310005 * ser / x))*Math.Exp(-tmp + Math.Log(2.5066282746310005 * ser / x));
}
function betai( a,  b,  x){//Returns the incomplete beta function Ix(a; b).
//alert(a + " " + b + " " + x);
    var bt;
    if (x < 0.0 || x > 1.0)
        throw "Bad x in routine betai: "+x;
    if (x == 0.0 || x == 1.0) bt = 0.0;
    else {// Factors in front of the continued fraction.
        bt = Math.exp(gammln(a + b) - gammln(a) - gammln(b) + a * Math.log(x) + b * Math.log(1.0 - x));
//alert("0. " + bt);
    }
    if (x < (a + 1.0) / (a + b + 2.0)) {// Use continued fraction directly.
//alert("1. "+bt + " " + betacf(a, b, x) + " " + a);
        return bt * betacf(a, b, x) / a;
    }
    else { //Use continued fraction after making the symmetry transformation.
//alert("2. " + bt + " " + betacf(a, b,1.0- x) + " " + b);
        return 1.0 - bt * betacf(b, a, 1.0 - x) / b;
    }
}
function betacf( a,  b,  x){   
    //Used by betai: Evaluates continued fraction for incomplete beta function 
    //by modied Lentz's method (x5.2).
    var MAXIT = 100;
    var EPS = 3.0e-7;
    var FPMIN = 1.0e-30;
    var m, m2;
    var aa, c, d, del, h, qab, qam, qap;
    qab = a + b; //These q's will be used in factors that occur
    qap = a + 1.0; // in the coecients (6.4.6).
    qam = a - 1.0;
    c = 1.0; //First step of Lentz's method.
    d = 1.0 - qab * x / qap;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    d = 1.0 / d;
    h = d;
    for (m = 1; m <= MAXIT; m++)
    {
        m2 = 2 * m;
        aa = m * (b - m) * x / ((qam + m2) * (a + m2));
        d = 1.0 + aa * d; //One step (the even one) of the recurrence.
        if (Math.abs(d) < FPMIN) d = FPMIN;
        c = 1.0 + aa / c;
        if (Math.abs(c) < FPMIN) c = FPMIN;
        d = 1.0 / d;
        h *= d * c;
        aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
        d = 1.0 + aa * d; //Next step of the recurrence (the odd one).
        if (Math.abs(d) < FPMIN) d = FPMIN;
        c = 1.0 + aa / c;
        if (Math.abs(c) < FPMIN) c = FPMIN;
        d = 1.0 / d;
        del = d * c;
        h *= del;
        if (Math.abs(del - 1.0) < EPS) break; //Are we done?
    }
    if (m > MAXIT) throw new Exception("a or b too big, or MAXIT too small in betacf");
    return h;
}
/*
function norm2(vM, vS) {//Returns the incomplete beta function Ix(a; b).
    alert("c");
    var m = fromVNtoN(vM);
    var s = fromVNtoN(vS);

    var z = s * Math.sqrt(Math.PI * 2);
    var aL = [];
    aL.push(0.0);
    for (var i = 0; i <= 100; i++)
        aL.push(Math.exp(-0.5 * (i - m) * (i - m) / (s * s)) / z);
    return aL;
}*/
function norm(v, vM, vS) {//Returns the incomplete beta function Ix(a; b).
    var m = fromVNtoN(vM);
    var s = fromVNtoN(vS);
    var z = s * Math.sqrt(Math.PI * 2);


    if (v.length == 1) {
        return [Math.exp(-0.5 * (1*v[0] - m) * (1*v[0] - m) / (s * s)) / z];
    }


    var aL = [];
    aL.push(0.0);
    for (var i = 1; i < v.length; i++) {
        aL.push(Math.exp(-0.5 * (v[i] - m) * (v[i] - m) / (s * s)) / z);
    }
    if (v.length == 1) return [aL[1]];
    return aL;
}
function CND(X)// cumulative normal distribution
{
 //   alert("CND(X)");
    var CND = 0, y = 0, Exponential = 0, SumA = 0, SumB = 0;

    y = Math.abs(X);
    if (y > 37)
    {
        CND = 0;
    }
    else
    {
        Exponential = Math.exp(-y * y / 2);
        if (y < 7.07106781186547)
        {
            SumA = 3.52624965998911E-02 * y + 0.700383064443688;
            SumA = SumA * y + 6.37396220353165;
            SumA = SumA * y + 33.912866078383;
            SumA = SumA * y + 112.079291497871;
            SumA = SumA * y + 221.213596169931;
            SumA = SumA * y + 220.206867912376;
            SumB = 8.83883476483184E-02 * y + 1.75566716318264;
            SumB = SumB * y + 16.064177579207;
            SumB = SumB * y + 86.7807322029461;
            SumB = SumB * y + 296.564248779674;
            SumB = SumB * y + 637.333633378831;
            SumB = SumB * y + 793.826512519948;
            SumB = SumB * y + 440.413735824752;
            CND = Exponential * SumA / SumB;
        }
        else
        {
            SumA = y + 0.65;
            SumA = y + 4 / SumA;
            SumA = y + 3 / SumA;
            SumA = y + 2 / SumA;
            SumA = y + 1 / SumA;
            CND = Exponential / (SumA * 2.506628274631);
        }
    }
//alert("m");
    if (X > 0)
    {
        CND = 1 - CND;
    }
    return CND;
}
function  cnd( v,  vM,  vS)
{
    var m = fromVNtoN(vM);
    var s = fromVNtoN(vS);
    if (v.length == 1) {
        return [CND((v[0] - m) / s)];
    }
   // var z = s * Math.sqrt(Math.PI * 2);
    /*
    if (v.Count <= 2) return v;
    if (v.length == 1) {
        return [Math.exp(-0.5 * (1*v[0] - m) * (1*v[0] - m) / (s * s)) / z];
    }*/
//alert("v.length=" + v.length);
    //Start          
    var answer = [];
    answer.push(v[0]);
//alert(v);
    for (var i = 1; i < v.length; i++)
    {
        var d =v[i];
    //    d = d / 100;
//alert(i + " " + d + " " + v[i]);
    answer.push(CND((d - m) / s));
//alert("after");
    }

    return answer;
}
/*
function erff( x)//Returns the error function erf(x).
{
           //float gammp(float a, float x);
           return x < 0.0 ? -gammp(0.5, x * x) : gammp(0.5, x * x);
}
*/
function erf1(x)
{
    var aL = [];
    var d=x < 0.0 ? -gammp(0.5, x * x) : gammp(0.5, x * x);
    aL.push(d);
    return aL;
}

function erf(v)
{
    if (isMatrix(v)) return oneMatrix(erf, "", v);
    if (v.length == 1) {
        return erf1(v[0]);
    }
    var aL = [];
    aL.push(v[0]);
    for (var i = 1; i < v.length; i++)
    {
        if (isNaN(v[i])) aL.push(undefined);
        else {
            var d = v[i] < 0.0 ? -gammp(0.5, v[i] * v[i]) : gammp(0.5, v[i] * v[i]);
            aL.push(d);
        }

    }
    return aL;
}
function gser(gamser,  a,  x,  gln)//Returns the incomplete gamma function P(a; x) evaluated by its series representation as gamser. Also returns ln Gamma(a) as gln.
{
    var ITMAX = 100;
    var EPS = 3.0e-7;
    // float gammln(float xx);
    // void nrerror(char error_text[]);
    var n;
    var sum, del, ap;
    gln = gammln(a);
    if (x <= 0.0)
    {
        if (x < 0.0) throw "x less than 0 in routine gser";
     //   gamser = 0.0;
       // return;
    }
    else
    {
        ap = a;
        del = sum = 1.0 / a;
        for (n = 1; n <= ITMAX; n++)
        {
            ++ap;
            del *= x / ap;
            sum += del;
            if (Math.abs(del) < Math.abs(sum) * EPS)
            {
                gamser = sum * Math.exp(-x + a * Math.log(x) - (gln));
                return [gamser,gln];
            }
        }
        throw "a too large, ITMAX too small in routine gser";
        //return;
    }
    return [gamser, gln];
}
function gcf(gammcf,  a,  x,  gln)//Returns the incomplete gamma function Q(a; x) evaluated by its continued fraction representation as gammcf. Also returns ln Gamma(a) as gln.
{
    var ITMAX = 100;// Maximum allowed number of iterations.
    var EPS = 3.0e-7;// Relative accuracy.
    var FPMIN = 1.0e-30;// Number near the smallest representable 
    //float gammln(float xx);
    //void nrerror(char error_text[]);
    var i;
    var an, b, c, d, del, h;
    gln = gammln(a);
    b = x + 1.0 - a;// Set up for evaluating continued fraction
    //  by modied Lentz's method (x5.2)
    //  with b0 = 0.
    c = 1.0 / FPMIN;
    d = 1.0 / b;
    h = d;
    for (i = 1; i <= ITMAX; i++)
    { // Iterate to convergence.
        an = -i * (i - a);
        b += 2.0;
        d = an * d + b;
        if (Math.abs(d) < FPMIN) d = FPMIN;
        c = b + an / c;
        if (Math.abs(c) < FPMIN) c = FPMIN;
        d = 1.0 / d;
        del = d * c;
        h *= del;
        if (Math.abs(del - 1.0) < EPS) break;
    }
    if (i > ITMAX) throw new Exception("a too large, ITMAX too small in gcf");
    gammcf = Math.exp(-x + a * Math.log(x) - (gln)) * h; // Put factors in front.
    return [gammcf, gln];
}
function gammp( a,  x)//Returns the incomplete gamma function P(a; x).
{
    //void gcf(float *gammcf, float a, float x, float *gln);
    //void gser(float *gamser, float a, float x, float *gln);
    //void nrerror(char error_text[]);
    var gamser = 0, gammcf = 0, gln = 0;
    if (x < 0.0 || a <= 0.0) throw "Invalid arguments in routine gammp";
    if (x < (a + 1.0))
    { //Use the series representation.
        var gamserGln=gser(gamser, a, x, gln);      
        return gamserGln[0];
    }
    else
    { // Use the continued fraction representation
        var gammcfGln = gcf(gammcf, a, x, gln);
        return 1.0 - gammcfGln[0]; //and take its complement.
    }
}
function gammln( xx)
{
//Internal arithmetic will be done in double precision, 
// a nicety that you can omit if ve-gure
// accuracy is good enough.
    var x, y, tmp, ser;
    var cof = [ 76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5 ];
    var j;
    y = x = xx;
    tmp = x + 5.5;
    tmp -= (x + 0.5) * Math.log(tmp);
    ser = 1.000000000190015;
    for (j = 0; j <= 5; j++) ser += cof[j] / ++y;
    return -tmp + Math.log(2.5066282746310005 * ser / x);
    // x=1/2-> pi=return Math.Exp(-tmp + Math.Log(2.5066282746310005 * ser / x))*Math.Exp(-tmp + Math.Log(2.5066282746310005 * ser / x));
}
function CBND1( X,  y,  rho)
{
    //
    //     A function for computing bivariate normal probabilities.
    //
    //       Alan Genz
    //       Department of Mathematics
    //       Washington State University
    //       Pullman, WA 99164-3113
    //       Email : alangenz@wsu.edu
    //
    //    This function is based on the method described by
    //        Drezner, Z and G.O. Wesolowsky, (1990),
    //        On the computation of the bivariate normal integral,
    //        Journal of Statist. Comput. Simul. 35, pp. 101-107,
    //    with major modifications for double precision, and for |R| close to 1.
    //   This code was originally transelated into VBA by Graeme West

    var CBND = 0;

    var i = 0, ISs = 0, LG = 0, NG = 0;
 //   double[,] XX = new double[11, 4];
 //   double[,] W = new double[11, 4];
    //double[,] XX=new double[10, 3]; 
    //double[,] W=new double[10, 3];

    var h = 0, k = 0, hk = 0, hs = 0, BVN = 0, Ass = 0, asr = 0, sn = 0;
    var A = 0, b = 0, bs = 0, c = 0, d = 0;
    var xs = 0, rs = 0;

    var XX=[];
    var W=[];
    for (var ii=0;ii<11;ii++){
        var a=[];
        var b=[];
        for(var j=0;j<4;j++){
            a.push(0);
            b.push(0);
        }
        XX.push(a);
        W.push(b);
    }
    W[1][1] = 0.17132449237917;
    XX[1][1] = -0.932469514203152;
    W[2][1] = 0.360761573048138;
    XX[2][1] = -0.661209386466265;
    W[3][1] = 0.46791393457269;
    XX[3][1] = -0.238619186083197;

    W[1][2] = 4.71753363865118e-02;
    XX[1][2] = -0.981560634246719;
    W[2][2] = 0.106939325995318;
    XX[2][2] = -0.904117256370475;
    W[3][2] = 0.160078328543346;
    XX[3][2] = -0.769902674194305;
    W[4][2] = 0.203167426723066;
    XX[4][2] = -0.587317954286617;
    W[5][2] = 0.233492536538355;
    XX[5][2] = -0.36783149899818;
    W[6][2] = 0.249147045813403;
    XX[6][2] = -0.125233408511469;

    W[1][3] = 1.76140071391521e-02;
    XX[1][3] = -0.993128599185095;
    W[2][3] = 4.06014298003869e-02;
    XX[2][3] = -0.963971927277914;
    W[3][3] = 6.26720483341091e-02;
    XX[3][3] = -0.912234428251326;
    W[4][3] = 8.32767415767048e-02;
    XX[4][3] = -0.839116971822219;
    W[5][3] = 0.10193011981724;
    XX[5][3] = -0.746331906460151;
    W[6][3] = 0.118194531961518;
    XX[6][3] = -0.636053680726515;
    W[7][3] = 0.131688638449177;
    XX[7][3] = -0.510867001950827;
    W[8][3] = 0.142096109318382;
    XX[8][3] = -0.37370608871542;
    W[9][3] = 0.149172986472604;
    XX[9][3] = -0.227785851141645;
    W[10][3] = 0.152753387130726;
    XX[10][3] = -7.65265211334973e-02;

    if (Math.abs(rho) < 0.3)
    {
        NG = 1;
        LG = 3;
    }
    else if (Math.abs(rho) < 0.75)
    {
        NG = 2;
        LG = 6;
    }
    else
    {
        NG = 3;
        LG = 10;
    }

    h = -X;
    k = -y;
    hk = h * k;
    BVN = 0;
//alert(13);
    if (Math.abs(rho) < 0.925)
    {
//alert(14);
        if (Math.abs(rho) > 0)
        {
            hs = (h * h + k * k) / 2;
            asr = Math.asin(rho);
            for (i = 1; i <= LG; i++)
            {
                for (ISs = -1; ISs <= 1; ISs = ISs + 2)
                {
                    sn = Math.sin(asr * (ISs * XX[i][NG] + 1) / 2);
                    BVN = BVN + W[i][NG] * Math.exp((sn * hk - hs) / (1 - sn * sn));
                }
            }
            BVN = BVN * asr / (4 * Math.PI);
        }
        BVN = BVN + CND(-h) * CND(-k);
    }
    else
    {
//alert(15);
        if (rho < 0)
        {
            k = -k;
            hk = -hk;
        }
        if (Math.abs(rho) < 1)
        {
            Ass = (1 - rho) * (1 + rho);
            A = Math.sqrt(Ass);
            bs = (h - k) * (h - k);
            c = (4 - hk) / 8;
            d = (12 - hk) / 16;
            asr = -(bs / Ass + hk) / 2;
            if (asr > -100)
            {
                BVN = A * Math.exp(asr) * (1 - c * (bs - Ass) * (1 - d * bs / 5) / 3 + c * d * Ass * Ass / 5);
            }
            if (-hk < 100)
            {
                b = Math.sqrt(bs);
                BVN = BVN - Math.exp(-hk / 2) * Math.sqrt(2 * Math.PI) * CND(-b / A) * b * (1 - c * bs * (1 - d * bs / 5) / 3);
            }
            A = A / 2;
            for (i = 1; i <= LG; i++)
            {
                for (ISs = -1; ISs <= 1; ISs = ISs + 2)
                {
                    xs = (A * (ISs * XX[i][NG] + 1)) * (A * (ISs * XX[i][NG] + 1));
                    rs = Math.sqrt(1 - xs);
                    asr = -(bs / xs + hk) / 2;
                    if (asr > -100)
                    {
                        BVN = BVN + A * W[i][NG] * Math.exp(asr) * (Math.exp(-hk * (1 - rs) / (2 * (1 + rs))) / rs - (1 + c * xs * (1 + d * xs)));
                    }
                }
            }
            BVN = -BVN / (2 * Math.PI);
        }
//alert(16);
        if (rho > 0)
        {
            var dd = h;
            if (k > dd) dd = k;
            BVN = BVN + CND(-dd);
        }
        else
        {
            BVN = -BVN;
            if (k > h)
            {
                BVN = BVN + CND(k) - CND(h);
            }
        }
    }
    CBND = BVN;
//alert(14);
    return CBND;
}
function CBND(v, vY,  vRho){
    var y = fromVNtoN(vY);
    var rho = fromVNtoN(vRho);
//alert(1);
    if (v.length == 1) {
        return [CBND1(v[0],y,rho)];
    }
//alert(2);
    //Start          
    var answer = [];
    answer.push(v[0]);
    //alert(v);
    for (var i = 1; i < v.length; i++) {
        var d = v[i];
//alert(i + " " + d + " " + rho);
        answer.push(CBND1(d,y,rho));
//alert("after");
    }

    return answer;
}
function invNN( v)
{
    if (isMatrix(v)) return oneMatrix(invNN, "", v);
  //  alert("v.length=" + v.length);
 //   alert(v);
 //   alert(invN(v[0]));
    if (v.length == 1) return [invN(v[0])];
    //Start    
    var empty;
    var answer = [];
    answer.push(v[0]);
    for (var i = 1; i < v.length; i++)
    {
        var d = v[i];
        answer.push(invN(d));
    }
    return answer;
//return answer;
}
function invN( p)
{
//alert("p=" + p);
    var empty;
   // var x = -1.7e308;
    //  if (p <= x) return x;
    if (p <= 0 || p >= 1 || isNaN(p)) return empty;
    // Coefficients in rational approximations.
    var a = [ 0, -39.69683028665376, 220.9460984245205, -275.9285104469687, 138.3577518672690, -30.66479806614716, 2.506628277459239 ];
    var b = [ 0, -54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572 ];
    var c = [ 0, -0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783 ];
    var d = [ 0, 0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416 ];
    // Define break-points.
    var p_low = 0.02425;
    var p_high = 1 - p_low;
    //   Rational approximation for lower region.
    if (0 < p && p < p_low)
    {
        var q = Math.sqrt(-2 * Math.log(p));
        x = (((((c[1] * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) * q + c[6]) / ((((d[1] * q + d[2]) * q + d[3]) * q + d[4]) * q + 1);
    }
    //   Rational approximation for central region.
    if (p_low <= p && p <= p_high)
    {
        var q = p - 0.5;
        var r = q * q;
        x = (((((a[1] * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * r + a[6]) * q / (((((b[1] * r + b[2]) * r + b[3]) * r + b[4]) * r + b[5]) * r + 1);
    }
    // Rational approximation for upper region.
    if (p_high < p && p < 1)
    {
        var q = Math.sqrt(-2 * Math.log(1 - p));
        x = -(((((c[1] * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) * q + c[6]) / ((((d[1] * q + d[2]) * q + d[3]) * q + d[4]) * q + 1);
    }
//alert("x=" + x);
    return x;
}
function chiSquareProbability( chi2,  nu)
{
    var a = [];
    a.push(gammp(nu / 2, chi2 / 2));
    return a;
}
function chiS(v, vNu)
{
    var nu = fromVNtoN(vNu);

    if (v.length == 1) {
        return chiSquareProbability(v[0], nu);
    }
    var aL = [];
    aL.push(v[0]);
    for (var i = 1; i < v.length; i++)
        aL.push(gammp(nu / 2, v[i] / 2));
    return aL;
}
function fisher( f,  nu1,  nu2)
{
    var rat = f * nu1 / (f * nu1 + nu2);
    var a = [];
  //  a.push(betai(nu2 / 2, nu1 / 2, f));
    a.push(betai(nu1 / 2, nu2 / 2, rat));
    return a;
}
function cumF( v,  vNu1,  vNu2)
{
    var nu1 = fromVNtoN(vNu1);
    var nu2 = fromVNtoN(vNu2);

    if (v.length == 1) return fisher(v[0], nu1,nu2);

    var aL = [];
    aL.push(v[0]);
    for (var i = 1; i < v.length; i++) {
      //  aL.push(betai(nu2 / 2, nu1 / 2, v[i]));
        var rat = v[i] * nu1 / (v[i] * nu1 + nu2);
        aL.push(betai(nu1 / 2, nu2 / 2, rat));
    }

    return aL;
}
function student( t,  nu)
{
    var a = [];
    var d = 1 - betai(nu / 2, 0.5, nu / (nu + t * t));
   // a.push(d);
    
    if (t < 0) d = -d / 2 + 0.5;
    else d = d / 2 + 0.5;
    a.push(d);
//alert(a[0]);

    return a;
}
function stud(v, vNu)
{
    var nu = fromVNtoN(vNu);
    if (v.length == 1) return student(v[0], nu);

    var aL = [];
    aL.push(v[0]);
    for (var i = 1; i < v.length; i++){
        //alert("i=" + i + " " + betai(nu / 2, 0.5, nu / (nu + v[i] * v[i])));

      //  aL.push(1 - betai(nu / 2, 0.5, nu / (nu + v[i] * v[i])));

        var d = 1 - betai(nu / 2, 0.5, nu / (nu + v[i] * v[i]));
        if (v[i] < 0) d = -d / 2 + 0.5;
        else d = d / 2 + 0.5;
        aL.push(d);
    }
    return aL;
}
// 1 - gammp (k, m) is cumulative Poisson probability function -the probability that the number of Poisson
// events will be between 0 and k ? 1 inclusive, if the expected mean is m.
function poisson( k,  m)
{
    k = k + 1;// 
    var a = [];
 //   var d = Math.exp(-m);
  //  if (k != 0)
     var   d = gammq(k, m);
    
    a.push(d);
    return a;
}
function cumPois( v,  vM)
{
//alert(v);
//alert(v.length);
    var m = fromVNtoN(vM);
    if (v.length == 1) return poisson(v[0], m);

    var aL = [];
    aL.push(v[0]);
    for (var i = 1; i < v.length; i++) {
   //     var d = Math.exp(-m);
   //     if (v[i] + 1 != 0)
           var d = gammq(v[i] + 1, m);
//alert("b: " + i + " " + v[i] + " " + m + " " + d);
        aL.push(d);
    }
    return aL;
}
function gammq(a, x) {  
    var gamser = 0, gammcf = 0, gln = 0;
    if (x < 0.0 || a <= 0.0) throw "Invalid arguments in routine gammq";
    if (x < (a + 1.0)) {
        var gamserGln = gser(gamser, a, x, gln);
        return 1 - gamserGln[0];
    } else { 
        var gammcfGln = gcf(gammcf, a, x, gln);
        return gammcfGln[0];
    }
}
function priceDistr( prices, fromTo)
{
    if (fromTo.length < 3) throw new Exception("NUmber of gradations should be more than 1.");
    var From = fromTo[1];
    var N = fromTo.length - 1;
    var To = fromTo[N];
    // step (in units of stDeviations
    var step = (To - From) / (N - 1);
    // mean
    var mu = 0;
    var vAnswer = [];
    vAnswer.push(fromTo[0]);
    for (var i = 1; i < prices.length; i++)
    {
        vAnswer.push(0);
        mu += prices[i];
    }
    mu = mu / (prices.length - 1);
    // stDev
    var sig = 0;
    for (var i = 1; i < prices.length; i++)
    {
        sig = sig + (mu - prices[i]) * (mu - prices[i]);
    }
    sig = Math.sqrt(sig / (prices.length - 2));

    for (var i = 1; i < prices.length; i++)
    {
        var p = (prices[i] - mu) / sig;
        var n = ((p - From) / step) + 1;
        if (n > 0 && n <= N) vAnswer[n] = vAnswer[n] + 1;
    }
    return vAnswer;

}
function priceDistr(fromTo, prices, volumes)
{
    if (fromTo.length < 3) throw new Exception("NUmber of gradations should be more than 1.");
    if (prices.length != volumes.length || prices[0] != volumes[0]) throw new Exception("Wrong prices or volumes.");

    var From = fromTo[1];
    var N = fromTo.length - 1;
    var To = fromTo[N];
    // step (in units of stDeviations
    var step = (To - From) / (N - 1);
    // mean
    var sumV = 0;
    var minPrice = double.MaxValue;
    var maxPrice = double.MinValue;
    for (var i = 1; i < prices.length; i++)
    {
        sumV = sumV + volumes[i];
        if (minPrice > prices[i]) minPrice = prices[i];
        if (maxPrice < prices[i]) maxPrice = prices[i];
    }
    var vAnswer = [];
    vAnswer.push(fromTo[0]);
    for (var i = 1; i < fromTo.length; i++)
    {
        vAnswer.push(0);
    }
    for (var i = 1; i < prices.length; i++)
    {
        var n = ((prices[i] - From) / step) + 1;
        if (n > 0 && n <= N) vAnswer[n] = vAnswer[n] + volumes[i];
    }
    for (var i = 1; i < fromTo.length; i++)
    {
        vAnswer[i] = vAnswer[i] / sumV;
    }
    return vAnswer;

}
function priceDistr(fromTo, prices, volumes,  D)
{
    if (fromTo.length < 3) throw new Exception("NUmber of gradations should be more than 1.");
    if (prices.length != volumes.length || prices[0] != volumes[0]) throw new Exception("Wrong prices or volumes.");

    var From = fromTo[1];
    var N = fromTo.length - 1;
    var To = fromTo[N];
        // step (in units of stDeviations
    var step = (To - From) / (N - 1);
        // mean
    var sumV = 0;
    var minPrice = double.MaxValue;
    var maxPrice = double.MinValue;
    for (var i = 1; i < prices.length; i++)
    {
        // sumV = sumV + volumes[i];
        if (volumes[i] != 0) sumV = sumV + 1;
        if (minPrice > prices[i]) minPrice = prices[i];
        if (maxPrice < prices[i]) maxPrice = prices[i];
    }
    var vAnswer = [];
    vAnswer.push(fromTo[0]);
    for (var i = 1; i < fromTo.length; i++)
    {
        vAnswer.push(0);
    }
    for (var i = 1; i < prices.length; i++)
    {
        var n = ((prices[i] - From) / step) + 1;
        //   if (n > 0 && n <= N) vAnswer[n] = vAnswer[n] + volumes[i];
        if (n > 0 && n <= N && volumes[i] != 0) vAnswer[n] = vAnswer[n] + 1;
    }
    for (var i = 1; i < fromTo.length; i++)
    {
        vAnswer[i] = vAnswer[i] / sumV;
    }
    return vAnswer;
}
var funkCum = function (ChiStudF, x, args) {
    var Cum = 0;
    switch (ChiStudF) {
        case "Chi": Cum = chiSquareProbability(x, 1*args[0]); //chiSquareProbability( chi2,  nu)
            break;
        case "Stud": Cum = student(x, 1 * args[0]);//student(t, nu)
            break; 
        case "F": Cum = fisher(x, 1 * args[0], 1 * args[1]);//fisher( f,  nu1,  nu2)
            break;
        default: throw "unknown function " + ChiStudF;
    }
    return Cum;
}
function rootGoAndBisect(funkCum, ChiStudF, args, left, right, eps, cumLevel) {
    // solves cumLevel=funkCum(ar1, ar2, arI, nRowsIn) equation, where ar2 is made of y
 //   alert(args);
   // alert("left="+left);
//    alert("right="+right);
  //  alert("eps="+eps);
    //alert("cumLevel="+cumLevel);


    var step=right-left;
    var fLeft = funkCum(ChiStudF, left, args) - cumLevel;
    var fRight = funkCum(ChiStudF, right, args) - cumLevel;
     // assuming monotonous charachter
    while (fLeft < 0 && fRight < 0 ) {
        left = right;
            fLeft = fRight;
            right = left + step;
            fRight = funkCum(ChiStudF, right, args) - cumLevel;
//alert("1. "+left+" "+right+" "+fLeft + " " + fRight);
    }
    while ( fLeft > 0 && fRight > 0) {
        right= left ;
            fRight  =  fLeft ;
            left  = right   - step;
            fLeft = funkCum(ChiStudF, left, args) - cumLevel;
//alert("2. "+left+" "+right+" "+fLeft + " " + fRight);
    }
    
//alert("3. "+left+" "+right+" "+fLeft + " " + fRight);

    var delta = right - left;
    while (delta > eps) {
        var y = (left + right) / 2;
        var f = funkCum(ChiStudF, y, args) - cumLevel;
   //     if (Math.abs(f) < eps) return y;
        if (Math.abs(right-left) < eps) return y;
        if (f > 0 && fLeft > 0 || f < 0 && fLeft < 0 || isNaN(fLeft)) {
            left = y;
        }
        else right = y;

        //alert(y+" "+f);
    }
    return y;
}
function invChiSquare(cumLevel, nu){
    // chiSquareProbability( chi2,  nu)
    // rootGoAndBisect(funkCum, ChiStudF, args, left, right, eps, cumLevel)
    var empty;
    var a = [];
//alert (cumLevel+" "+nu);
    var d=0;
    if(cumLevel>0 && cumLevel<1){
        d=rootGoAndBisect(funkCum, "Chi", [nu], 0.1, 0.2,  0.000001, cumLevel)
    }
    if(cumLevel>=1 || cumLevel<0){
        d=empty;
    }
    a.push(d);
//alert(d);
    return a;
}
function invChiS(v, vNu){
    var nu = fromVNtoN(vNu);
    var empty;
    if (v.length == 1) {
        return invChiSquare(v[0], nu);
    }

    var left=0;
    var aL = [];
    aL.push(v[0]);
    for (var i = 1; i < v.length; i++){
        var cumLevel=v[i];
        var d=0;
        if(cumLevel>0 && cumLevel<1){
            d=rootGoAndBisect(funkCum, "Chi", [nu], 0.1, 0.2,  0.000001, cumLevel)
        }
        if(cumLevel>=1 || cumLevel<0){
            d=empty;
        }
        //var y=rootGoAndBisect(funkCum, "Chi", [nu], left, left+0.1,  0.000001, v[i]);
        // aL.push(y);
        aL.push(d);
        //left=y;
        left=d;
    }
    return aL;
}
function invStudent(cumLevel, nu){
    // student(t, nu)
    // rootGoAndBisect(funkCum, ChiStudF, args, left, right, eps, cumLevel)
    var empty;
    var a = [];
    //alert (cumLevel+" "+nu);
    var d;
    if(cumLevel>0 && cumLevel<1){
        d=rootGoAndBisect(funkCum, "Stud", [nu], 0.1, 0.2,  0.000001, cumLevel)
    }
    if(cumLevel>=1 || cumLevel<0){
        d=empty;
    }
    a.push(d);
    //alert(d);
    return a;
}
function invStud(v, vNu){
    var nu = fromVNtoN(vNu);
    var empty;
    if (v.length == 1) {
        return invStudent(v[0], nu);
    }

    var left=0;
    var aL = [];
    aL.push(v[0]);
    for (var i = 1; i < v.length; i++){
        var cumLevel=v[i];
        var d;
        if(cumLevel>0 && cumLevel<1){
            d=rootGoAndBisect(funkCum, "Stud", [nu], 0.1, 0.2,  0.000001, cumLevel)
        }
        if(cumLevel>=1 || cumLevel<0){
            d=empty;
        }
        //var y=rootGoAndBisect(funkCum, "Chi", [nu], left, left+0.1,  0.000001, v[i]);
        // aL.push(y);
        aL.push(d);
        //left=y;
        left=d;
    }
    return aL;
}
function invFisher(cumLevel, nu1,nu2){
    // fisher( f,  nu1,  nu2)
    // rootGoAndBisect(funkCum, ChiStudF, args, left, right, eps, cumLevel)
    var empty;
    var a = [];
    //alert (cumLevel+" "+nu);
    var d=0;
    if(cumLevel>0 && cumLevel<1){
        d=rootGoAndBisect(funkCum, "F", [nu1,nu2], 0.1, 0.2,  0.000001, cumLevel)
    }
    if(cumLevel>=1 || cumLevel<0){
        d=empty;
    }
    a.push(d);
    //alert(d);
    return a;
}
function invF(v, vNu1, vNu2){
    var nu1 = fromVNtoN(vNu1);
    var nu2 = fromVNtoN(vNu2);
    var empty;
    if (v.length == 1) {
        return invFisher(v[0], nu1,nu2);
    }

    var left=0;
    var aL = [];
    aL.push(v[0]);
    for (var i = 1; i < v.length; i++){
        var cumLevel=v[i];
        var d=0;
        if(cumLevel>0 && cumLevel<1){
            d=rootGoAndBisect(funkCum, "F", [nu1,nu2], 0.1, 0.2,  0.000001, cumLevel)
        }
        if(cumLevel>=1 || cumLevel<0){
            d=empty;
        }
        //var y=rootGoAndBisect(funkCum, "Chi", [nu], left, left+0.1,  0.000001, v[i]);
        // aL.push(y);
        aL.push(d);
        //left=y;
        left=d;
    }
    return aL;
}
function defaultPortfDistr(vN,  vDDefRate,  vRo,  vL){//defaultPortfDistr(50,0.17,0.3,100000)

    var Ar =ShowDistrOfNCorrelaed(vN,  vDDefRate,  vRo,  vL);


    var answer = [0];
    for (var r = 0; r <=100; r++) {
        answer.push(Ar[r]);
    }
    return answer;
}
function ShowDistrOfNCorrelaed(vN,  vDDefRate,  vRo,  vL)//50.0.17,0.7,100,000
{
    var N = fromVNtoN(vN);
    var dDefRate = fromVNtoN(vDDefRate);
    var ro = fromVNtoN(vRo);
    var L = fromVNtoN(vL);

    if (dDefRate == 0)
    {
            a4 = [];
            a4.push(0.0);
            a4.push(1.0);
            for (var i4 = 1; i4 <= 100; i4++) a4.push(0.0);
            return a4;// no default
    }


    var n50 = N;
    var dy = 0, de = 0;
    {
            dy = Math.sqrt(ro);
            de = Math.sqrt(1 - ro);
    }

    var xDef = invN(1 - dDefRate);//if x>xDef - default happens
    var i = 0, j = 0;
    var Port = [];
    for (i = 0; i <= n50; i++)
    {
            Port.push(0);
    }
            var y = BuildNorm(L, 0, 1);
            var XX = [];

            for (i = 0; i < n50; i++)
    {
                var e = BuildNorm(L, 0, 1);
                var X = [];
                for (j = 0; j < L; j++)
    {
                    var ye = dy * y[j] + de * e[j];
                    X.push(ye);
    }
                XX.push(X);
    }
            for (j = 0; j < L; j++)
    {
                var n = 0;
                for (i = 0; i < n50; i++)
    {
                    var xj = (XX[i])[j];
                    if (xj > xDef)//default happend
    {
                        n = n + 1;
    }

    }
                Port[n] = Port[n] + 1;
    }

//alert("Port.length="+Port.length+ " Port= "+Port);//51

var a100 = fromNto100(Port, n50, 100);//102 terms


//alert("a100="+a100);

        if (a100.length > 0) return a100;// do nor use Fast Foutier

    // smooth it backforvard
        var endFreq = 20;

        var pow = 1 + (Math.log(a100.length - 1) / Math.log(2.0) + .0000001);
        if ((1 << pow) - 1 < endFreq) endFreq = (1 << pow) - 1;
        if (endFreq < 0) endFreq = 0;
        var ff = fFSmooth(a100, pow, 1, 0, (endFreq + 0.1));



        var answ = ff.slice();
    // var flag = 1;
        for (i = 0; i < ff.length; i++)
        {
            //    if (flag == 1 && ff[i]<0) flag = 0;
            //    answ[i] = flag*ff[i];
                    answ[i] = Math.abs(ff[i]);

        }
        return answ;

}
function fromNto100( a2,  N,  n100)
{//array 0,1,2,3,...,N t0 array 0,1,2,3,...100
    var n = N;
    var a3 = [];

    a3.push(a2[0]);
    var sum = a2[0];
    for (var i = 1; i < n100; i++)
    {
        var di = i * n / n100;
        var id = Math.floor(di);
        var ai = a2[id];
        var a3i = ai;//id==di
        //   if (id < di) a3i = ai + (di - id) * (a2[id + 1] - ai);
        if (id < di && id + 1 < n) a3i = ai + (di - id) * (a2[id + 1] - ai);
        else if (id < di && id > 0) a3i = ai - (di - id) * (a2[id - 1] - ai);
        else if (id < di) a3i = ai;
        a3.push(a3i);
        sum = sum + a3i;
//alert(i+" "+di+" "+ai+" "+)
    }
    a3.push(a2[n]);
    sum = sum + a2[n];


    // calibrate
    var a4 = [];
    a4.push(0.0);
    for (var i = 0; i <= n100; i++)
    {
        a4.push(a3[i] / sum);
        // int nDeb = 1;
    }

    return a4;
}
function alpha( fi,  ek)
{

//    Alpha - the sunlight portion of the 24 hours as function of normalized time starting from vernal equinox;
//    56 - the latitude of the point of interest (56 degrees for Moscow, 45 - for New York);
//        23.5 - the degree between ecliptic and the sky equator.
    var F = Math.tan(Math.PI * fi / 180);
    var E = Math.sin(Math.PI * ek / 180);
    var v = [];
    for (var i = 0; i < 366; i++)
    {
        var T = Math.sin(2 * Math.PI * i / 365);
        var d = F * E * T / Math.sqrt(1 - E * E * T * T);
        if (d > 1) d = 1;
        if (d < -1) d = -1;
        v.push(1 - Math.acos(d) / Math.PI);
    }
    /*
    var nShift = 0;
    var year = DateTime.Now.Year;
    DateTime dt = new DateTime(year, 3, 20);
    TimeSpan ts = DateTime.Now - dt;
    nShift = ts.Days;// in days
    */

    var date1 = new Date();
    var Y = d.getFullYear() - nYearsAgo;
    var date1 = new Date(Y, 3, 20); 
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;
    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;  
    // Convert back to days and return
    var nShift = Math.round(difference_ms/one_day); 




    if (nShift < 0) nShift = nShift + 365;

    var a = [];
    a.push(0);
    for (var i = 0; i < 366; i++)
    {
        var k = (i + nShift) % 365;
        a.push(24 * v[k]);

    }

    return a;
}
function sunLight(vFi)
{
    var ek=23.45;
    var fi = fromVNtoN(vFi);

    if (!(typeof fi === 'number')) throw "the argument should be a number -the latitude of the point of interest, e.g. 40.40 - for New York";

    //    Alpha - the sunlight portion of the 24 hours as function of normalized time starting from vernal equinox;
    //    56 - the latitude of the point of interest (55.45 degrees for Moscow, 40.40 - for New York);
    //        23.5 - the degree between ecliptic and the sky equator.
    var F = Math.tan(Math.PI * fi / 180);
    var E = Math.sin(Math.PI * ek / 180);
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;

    var minIndex = findMinMaxIndex()[0];
    var maxIndex = findMinMaxIndex()[1];

    if (minIndex == Number.MAX_SAFE_INTEGER){// no symbols
        var d = new Date();
        var year = d.getFullYear();
        var month = 1 + d.getMonth();
        var day = d.getDate();
        var date1 = new Date();
        date1.setFullYear(1*year, 2, 20);// march 20
        var date2 = new Date();
        date2.setFullYear(1*year, 1*month-1, 1*day);
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();
        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;  
        // Convert back to days and return

   //     var nShift = Math.floor(difference_ms/one_day); 

        var nShift = Math.round(difference_ms/one_day); 
        nShift+=1;


        while (nShift < 0) nShift = nShift + 365;
        var j = nShift % 365;
        var T = Math.sin(2 * Math.PI * j / 365);
        var d = F * E * T / Math.sqrt(1 - E * E * T * T);
        if (d > 1) d = 1;
        if (d < -1) d = -1;
        return [(24*(1 - Math.acos(d) / Math.PI))];

    }



    var a = [];
    a.push(minIndex);
    for (var i = minIndex; i <= maxIndex; i++) {
        var sDate = dateDailyFromIndex(i);
        var year =sDate.substring(0, 4);
        var month =sDate.substring(5, 7);
        var day = sDate.substring(8);

     //   var d = new Date();
        //   d.setFullYear(2020, 0, 14);
        var date1 = new Date();
        date1.setFullYear(1*year, 2, 20);// march 20
        var date2 = new Date();
        date2.setFullYear(1*year, 1*month-1, 1*day);
    //  var date1 = new Date(1*year, 3, 20); //  ????       var date1 = new Date(year, 2, 20); 
     //   var date2= new Date(1*year, 1*month, 1*day);
        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();
        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;  
        // Convert back to days and return

    //    var nShift = Math.floor(difference_ms/one_day); 
        var nShift = Math.round(difference_ms/one_day); 
        nShift+=1;


        while (nShift < 0) nShift = nShift + 365;
        var j = nShift % 365;
        var T = Math.sin(2 * Math.PI * j / 365);
        var d = F * E * T / Math.sqrt(1 - E * E * T * T);
        if (d > 1) d = 1;
        if (d < -1) d = -1;
        a.push(24*(1 - Math.acos(d) / Math.PI));

    }
    return a;
}

function sunLightWrong(vFi)
{
  //  var ek=23.5;
    var fi = fromVNtoN(vFi);
    var tanFi=Math.tan(Math.PI * fi / 180);
    var p= Math.PI;
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;

    var minIndex = findMinMaxIndex()[0];
    var maxIndex = findMinMaxIndex()[1];

    if (minIndex == Number.MAX_SAFE_INTEGER){// no symbols
//alert(1);
        var d = new Date();
        var year = d.getFullYear();
        var month = 1 + d.getMonth();
        var day = d.getDate();
        var date1 = new Date();
        date1.setFullYear(1*year, 0, 1);// january 1
        var date2 = new Date();
        date2.setFullYear(1*year, 1*month-1, 1*day);
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();
        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;  
        // Convert back to days 
        var nShift = Math.round(difference_ms/one_day); 
        var n = nShift+1;//for january 1 nShift=1

        var tanDelta=Math.tan(23.45*p*Math.sin(2*p*(284+n)/36.25)/180);
        var h=Math.acos(-tanFi*tanDelta)*180/p;
        return [2*h/15];
    }


//alert(2);
    var a = [];
    a.push(minIndex);
    for (var i = minIndex; i <= maxIndex; i++) {
        var sDate = dateDailyFromIndex(i);
        var year =sDate.substring(0, 4);
        var month =sDate.substring(5, 7);
        var day = sDate.substring(8);

        var date1 = new Date();
        date1.setFullYear(1*year, 0, 1);// january 1
        var date2 = new Date();
        date2.setFullYear(1*year, 1*month-1, 1*day);
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();
        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;  
        // Convert back to days 
        var nShift = Math.round(difference_ms/one_day); 
        var n = nShift+1;//for january 1 nShift=1

        var tanDelta=Math.tan(23.45*p*Math.sin(2*p*(284+n)/36.25)/180);
        var h=Math.acos(-tanFi*tanDelta)*180/p;

        a.push(2*h/15);

    //    a.push(n);

    }
    return a;
}
/*
function myFunction(v, vIn){
    var nIn = fromVNtoN(vIn);

    if (arTexts == null || arTexts.length <= nIn || arTexts[nIn].length == 0) throw "empty table";

    var s = arTexts[nIn];
//alert("s="+s);
    eval(s);

// alert(res);

//alert("res.length="+res.length);


    return res;
}*/
function tIndex(v) {//i from v[i]
    if (isMatrix(v)) return oneMatrix(tIndex, "", v);
    var res = [];
    res.push(v[0]);
    for (var i = 1; i < v.length; i++) {
        res.push(i - 1);
    }

    return res;
}
function putCall(v1, v2, cpSign, X, days, r) {
    var V1 = compressOne(v1, v1);
    var V2 = compressOne(v2, v2);

    var vOld = putCallOld(V1, V2, cpSign, X, days, r);
    if (v1.length == V1.length && v2.length == V2.length) return vOld;////////////////////////////////
    if (v1.length != 1) {
        return decompressOne(vOld, v1);
    }
    if (v2.length != 1) {
        return decompressOne(vOld, v2);
    }
}
function putCallOld(v, vecVolatility, vcpSign, vX, vdays, vr) {
    var vecY = [];//answer

    var cpSign = fromVNtoN(vcpSign);
    var X = fromVNtoN(vX);
    var days = fromVNtoN(vdays);
    var r = fromVNtoN(vr) / 100;

    if (v.length == 1 && vecVolatility.length == 1 && (sFrequencyRange == "daily" || sFrequencyRange == "canned")) {
        var P_i = v[0];
        var sigma = vecVolatility[0] / 100;
        var deltaT = days / 365;
        return [putCall_i(P_i, sigma, cpSign, X, deltaT, r)];
    }
    if (v.length > 1 && vecVolatility.length == 1 && (sFrequencyRange == "daily" || sFrequencyRange == "canned")) {
        vecY[0] = v[0];
        var sigma = vecVolatility[0] / 100;
        var deltaT = days / 365;
        for (var i = 1; i < v.length; i++) {
            var P_i = v[i];
            vecY.push(putCall_i(P_i, sigma, cpSign, X, deltaT, r));
        }
        return vecY;
    }
    if (v.length == 1 && vecVolatility.length > 1 && (sFrequencyRange == "daily" || sFrequencyRange == "canned")) {
        vecY[0] = vecVolatility[0];
        var P_i = v[0];
        var deltaT = days / 365;
        for (var i = 1; i < vecVolatility.length; i++) {
            var sigma = vecVolatility[i] / 100;
            vecY.push(putCall_i(P_i, sigma, cpSign, X, deltaT, r));
        }

        return vecY;
    }

    // answer = price*N(d1)-X*exp(-r*deltaT)*N(d2),
    // where	d1=[ln(price/X)+(r+sigma*sigma/2)*deltaT]/(sigma*sqrt(deltaT))
    //			d2=[ln(price/X)+(r-sigma*sigma/2)*deltaT]/(sigma*sqrt(deltaT))
    // sigma is standard deviation on p periods
    var vecP = [];
    var vecV = [];

    //alert("v="+v);
    //alert("vecVolatility="+vecVolatility);
    adjust(v, vecVolatility, vecP, vecV);
    //alert("vecP="+vecP+" vecP.length="+vecP.length);
    //alert("vecV="+vecV+" vecV.length="+vecV.length);

    vecY.push(vecP[0]);


    var m_nStartCol = v[0];
    var m_nEndCol = m_nStartCol + v.length - 1 - 1;
    var dLastV = v[v.length - 1];
    var cExp = m_nEndCol;
    var dCoef = getCoef();//coef

    /*
    List<string> ar1 = (List<string>)htStr2Info["nCurChart"];
    List<string> arInfo = (List<string>)htStr2Info[(string)ar1[0]];

    string sFrequencyRange = (string)arInfo[0];
    var nInterval = 1;
    string sFrequency = "i";
    parseFreqRange(sFrequencyRange, out nInterval, out sFrequency);
    if (sFrequency == "i")
    {
        string sMorning = (string)arInfo[2];
        string[] hm = sMorning.Split(':');
        nMorning = 60 * Convert.ToInt32(hm[0]) + Convert.ToInt32(hm[1]);

        string sEvening = (string)arInfo[3];
        hm = sEvening.Split(':');
        nEvening = 60 * Convert.ToInt32(hm[0]) + Convert.ToInt32(hm[1]);
        var NperDay = (nEvening - nMorning) / nInterval;
        cExp = (m_nEndCol + days * NperDay);
    }
    else */
    if (sFrequencyRange == "daily" || sFrequencyRange == "canned") {
        cExp = m_nEndCol + days;
        dCoef = Math.sqrt(365);// !!! calendar days are important, not business days
    }
    else throw "put/call are not recommended for this frequency";

    // var c1 = 0.049867347, c2 = 0.021141006, c3 = 0.003277626, c4 = 0.000038004, c5 = 0.000048891, c6 = 0.000005383;

    for (var i = 1; i < vecP.length; i++) {
        var c = i + vecP[0] - 1;
        var deltaT = (cExp - c) / (dCoef * dCoef);
        var sigma = vecV[i] / 100.0;
        /*
        if (deltaT <= 0.0)
        {
            vecY.push(0.0);
            continue;
        }
        var sqrtdT = Math.sqrt(deltaT);
        var d1 = cpSign * (Math.log(vecP[i] / X) + (r + sigma * sigma / 2) * deltaT) / (sigma * sqrtdT);
        var d2 = cpSign * (Math.log(vecP[i] / X) + (r - sigma * sigma / 2) * deltaT) / (sigma * sqrtdT);
        var N = 0.0;
        var x = d1;
        {
            var bPos = x >= 0 ? true : false;
            var y = x;
            if (y < 0) y = -x;
            var d = 1.0 + y * (c1 + y * (c2 + y * (c3 + y * (c4 + y * (c5 + y * c6)))));
            d = d * d * d * d;
            d = d * d * d * d;
            N = 1.0 - 0.5 / d;
            if (!bPos) N = 0.5 / d;
        }
        var N1 = cpSign * N;
        x = d2;
        {
            var bPos = x >= 0 ? true : false;
            var y = x;
            if (y < 0) y = -x;
            var d = 1.0 + y * (c1 + y * (c2 + y * (c3 + y * (c4 + y * (c5 + y * c6)))));
            d = d * d * d * d;
            d = d * d * d * d;
            N = 1.0 - 0.5 / d;
            if (!bPos) N = 0.5 / d;
        }
        var N2 = cpSign * N;
        vecY.push(vecP[i] * N1 - X * Math.exp(-r * deltaT) * N2);
        */
        vecY.push(putCall_i(vecP[i], sigma, cpSign, X, deltaT, r));

    }
    return vecY;
}
function putCall_i(P_i, sigma, cpSign, X, deltaYears, r) {
    // var empty;
    //  if (isNaN(P_i)||isNaN(sigma)) return empty;
    var deltaT = deltaYears;
    var c1 = 0.049867347, c2 = 0.021141006, c3 = 0.003277626, c4 = 0.000038004, c5 = 0.000048891, c6 = 0.000005383;

    if (deltaT <= 0.0) {
        return 0;
    }
    var sqrtdT = Math.sqrt(deltaT);
    var d1 = cpSign * (Math.log(P_i / X) + (r + sigma * sigma / 2) * deltaT) / (sigma * sqrtdT);
    var d2 = cpSign * (Math.log(P_i / X) + (r - sigma * sigma / 2) * deltaT) / (sigma * sqrtdT);
    var N = 0.0;
    var x = d1;
    {
        var bPos = x >= 0 ? true : false;
        var y = x;
        if (y < 0) y = -x;
        var d = 1.0 + y * (c1 + y * (c2 + y * (c3 + y * (c4 + y * (c5 + y * c6)))));
        d = d * d * d * d;
        d = d * d * d * d;
        N = 1.0 - 0.5 / d;
        if (!bPos) N = 0.5 / d;
    }
    var N1 = cpSign * N;
    x = d2;
    {
        var bPos = x >= 0 ? true : false;
        var y = x;
        if (y < 0) y = -x;
        var d = 1.0 + y * (c1 + y * (c2 + y * (c3 + y * (c4 + y * (c5 + y * c6)))));
        d = d * d * d * d;
        d = d * d * d * d;
        N = 1.0 - 0.5 / d;
        if (!bPos) N = 0.5 / d;
    }
    var N2 = cpSign * N;
    return P_i * N1 - X * Math.exp(-r * deltaT) * N2;
}
function adjust(v1, v2, res1, res2) {
    if (v1.length == 0 || v2.length == 0) throw "empty intersection";
    var nStart1 = v1[0];
    var nStart2 = v2[0];


    var nEnd1 = nStart1 + v1.length - 2;
    var nEnd2 = nStart2 + v2.length - 2;
    if (nEnd1 < nStart2 || nEnd2 < nStart1) throw "empty intersection";

    var nStart = nStart1 > nStart2 ? nStart1 : nStart2;
    var nEnd = nEnd1 > nEnd2 ? nEnd2 : nEnd1;

    //   res1=[];
    //  res2=[];
    if (nStart == nEnd)// results are 2 numbers
    {
        res1.push(v1[nStart - nStart1 + 1]);
        res2.push(v2[nStart - nStart2 + 1]);
    }
    else//results are 2 vectors
    {
        res1.push(nStart);
        res2.push(nStart);
        for (var i = nStart; i <= nEnd; i++) {
            res1.push(v1[i - nStart1 + 1]);
            res2.push(v2[i - nStart2 + 1]);
        }
    }

    return;
}
function ImpliedVolatility(v1, v2, cpSign, X, days, r) {
    var V1 = compressOne(v1, v1);
    var V2 = compressOne(v2, v2);

    var vOld = ImpliedVolatilityOld(V1, V2, cpSign, X, days, r);
    if (v1.length == V1.length && v2.length == V2.length) return vOld;
    //  return decompressOne(vOld, v1);
    if (v1.length != 1) {
        return decompressOne(vOld, v1);
    }
    if (v2.length != 1) {
        return decompressOne(vOld, v2);
    }
}
function ImpliedVolatilityOld(vecPrice, vecOptionPrice, vcpSign, vX, vdays, vr) {
    var vecY = [];//answer

    var cpSign = fromVNtoN(vcpSign);
    var X = fromVNtoN(vX);
    var days = fromVNtoN(vdays);
    var r = fromVNtoN(vr) / 100;

    if (vecPrice.length == 1 && vecOptionPrice.length == 1 && (sFrequencyRange == "daily" || sFrequencyRange == "canned")) {
        var P_i = vecPrice[0];
        var Opt_i = vecOptionPrice[0];
        var deltaT = days / 365;
        return [impVlt_i(P_i, Opt_i, cpSign, X, deltaT, r)];//??????
    }
    if (vecPrice.length > 1 && vecOptionPrice.length == 1 && (sFrequencyRange == "daily" || sFrequencyRange == "canned")) {
        vecY[0] = vecPrice[0];
        var Opt_i = vecOptionPrice[0];
        var deltaT = days / 365;
        for (var i = 0; i < vecPrice.length; i++) {
            var P_i = vecPrice[i];
            vecY.push(impVlt_i(P_i, Opt_i, cpSign, X, deltaT, r));
        }
        return vecY;
    }
    if (vecPrice.length == 1 && vecOptionPrice.length > 1 && (sFrequencyRange == "daily" || sFrequencyRange == "canned")) {
        vecY[0] = vecOptionPrice[0];
        var P_i = vecPrice[0];
        var deltaT = days / 365;
        for (var i = 0; i < vecOptionPrice.length; i++) {
            var Opt_i = vecOptionPrice[i];
            vecY.push(impVlt_i(P_i, Opt_i, cpSign, X, deltaT, r));
        }
        return vecY;
    }

    var vecP = [];//share price
    var vecCM = [];//market CallPut price

    adjust(vecPrice, vecOptionPrice, vecP, vecCM);
    if (vecP.length == 0 || vecCM.length == 0) throw "You need both share's and option's prices.";

    vecY.push(vecP[0]);
    var i, N = vecP.length;
    var vi, vLow, vHigh;//cLow,cHigh,

    var m_nStartCol = vecP[0];
    var m_nEndCol = m_nStartCol + vecP.length - 1 - 1;
    var cExp = m_nEndCol;
    if (sFrequencyRange == "daily" || sFrequencyRange == "canned") {
        cExp = m_nEndCol + days;
        dCoef = Math.sqrt(365);// !!! calendar days are important, not business days
    }
    else throw "Implied Volatility is not recommended for this frequency...";
    for (i = 1; i < vecP.length; i++) {
        var c = i + vecP[0] - 1;
        var deltaT = (cExp - c) / (dCoef * dCoef);
        if (deltaT <= 0.0) {
            vecY.push(0.0);
            continue;
        }
        vecY.push(impVlt_i(vecP[i], vecCM[i], cpSign, X, deltaT, r));
    }
    return vecY;
}
function impVlt_i(P_i, Opt_i, cpSign, X, deltaT, r) {
    var empty;
    var sqrtdT = Math.sqrt(deltaT);
    var epsilon = 0.000000001;
    var vLow = 0.0;
    var BSLow = putCall_i(P_i, vLow, cpSign, X, deltaT, r);
    var vStep = 100;
    var BSStep = putCall_i(P_i, vStep, cpSign, X, deltaT, r);
    while ((BSLow < Opt_i && BSStep < Opt_i || BSLow > Opt_i && BSStep > Opt_i) && vStep < 10000) {
        vStep = 2 * vStep;
        BSStep = putCall_i(P_i, vStep, cpSign, X, deltaT, r);
    }
    if (vStep >= 10000) return empty;
    vHigh = vStep;
    vi = (vLow + vHigh) / 2.0;
    var viStart = vi;
    var count = 0;
    //alert(P_i+" "+Opt_i+" "+cpSign+" "+X+" "+deltaT+" "+r);
    var BSP = Opt_i + 3 * epsilon;
    while (Math.abs(Opt_i - BSP) > epsilon && count < 92) {
        BSP = putCall_i(P_i, vi, cpSign, X, deltaT, r);
        if (BSP < Opt_i) vLow = vi;
        else vHigh = vi;
        vi = (vLow + vHigh) / 2.0;
        //alert(count+" "+vLow+" "+vHigh+" "+BSP);
        count++;
    }
    if (count > 90) {
        vi = viStart;
    }
    return 100.0 * vi;
}
//////////////////////////////////////////////////////////////////
function cpuMatMult(m, n) {
    var result = [];
    for (var i = 0; i < m.length; i++) {
        result[i] = [];
        for (var j = 0; j < n[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m[0].length; k++) {
                sum += m[i][k] * n[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}
function generateMatrices(n512) {
    const matSize = n512;
    let A = [];
    let B = [];
    for (let n = 0; n < matSize * matSize; n++) {
        const randA = Math.random();
        const randB = Math.random();
        A.push(randA);
        B.push(randB);
    }

    A = splitArray(A, matSize);
    B = splitArray(B, matSize);

    function splitArray(array, part) {
        var tmp = [];
        for (var i = 0; i < array.length; i += part) {
            tmp.push(array.slice(i, i + part));
        }
        return tmp;
    }

    return {
        A,
        B
        };
}

function compareGpuAnsCpu(n512) {
    const L = n512;
    const gpu = new GPU({ mode: 'webgl' });
    //alert(1);
    const gpuMatMult = gpu.createKernel(function (A, B) {
        var sum = 0;
        for (var i = 0; i < 512; i++) {
            // for (var i = 0; i < 1024; i++) {
            sum += A[this.thread.y][i] * B[i][this.thread.x];
        }
        return sum;
    }).setOutput([L, L]);
    // alert(2);

    // Generate Matrices
    const matrices = generateMatrices(n512);
    const A = matrices.A;
    const B = matrices.B;

    //alert("start CPU:");
    //CPU
    const startCPU = window.performance.now();
    const cpuResult = cpuMatMult(A, B);
    const endCPU = window.performance.now();
    const cpuTime = endCPU - startCPU;

    //alert("cpuTime=" + cpuTime);

    //console.log(`CPU: ${cpuTime}ms`);

    // //GPU
    //alert("start gpu:");
    const startGPU = window.performance.now();
    // alert(3);
    const result = gpuMatMult(A, B);
    //alert(4);
    const endGPU = window.performance.now();
    const gpuTime = endGPU - startGPU;
    //alert("gpuTime=" + gpuTime );
    //console.log(`GPU: ${gpuTime}ms`);

    //Diff
    //const diff = (cpuTime - gpuTime) / (gpuTime);
    alert("cpuTime=" + cpuTime + "\ngpuTime=" + gpuTime + "\nratio=" + cpuTime / gpuTime);
    //console.log(`%c ${diff}`, 'color: red;', `times faster!`);
}
function randMatrix(vRows, vCols) {
    var nRows = fromVNtoN(vRows) + 1;
    var nCols = fromVNtoN(vCols) + 1;
    var ans = [];
    for (var r = 1; r < nRows; r++) {
        var ar = [];
        for (var c = 1; c < nCols; c++) {
            ar.push(1 * Math.random().toFixed(4));
        }
        ans.push(ar);
    }
    //  var c = dress(ans, "Matr");
    //  return c;
    return ans;
}
function constMatrix(vRows, vCols, vD) {
    var nRows = fromVNtoN(vRows) + 1;
    var nCols = fromVNtoN(vCols) + 1;
    var d = fromVNtoN(vD);
    var ans = [];
    for (var r = 1; r < nRows; r++) {
        var ar = [];
        for (var c = 1; c < nCols; c++) {
            ar.push(d.toFixed(4));
        }
        ans.push(ar);
    }
    //   var c = dress(ans, "Matr");
    //   return c;
    return ans;
}
//function idMatrix(vRows, vCols) {
function idMatrix(vRows) {


    var nRows = fromVNtoN(vRows);
    if (!Number.isInteger(nRows) || (isNaN(vRows))) throw "the argument should be an iteger number - the number of rows in a square matrex";

    var nCols = nRows;
    var ans = [];
    for (var r = 0; r < nRows; r++) {
        var ar = [];
        for (var c = 0; c < nCols; c++) {
            if (r == c) ar.push(1);
            else ar.push(0);
        }
        ans.push(ar);
    }
    //  var c = dress(ans, "Matr");
    //   return c;
    return ans;
}
function inverse(vIn) {//Ax=B, where B -identity matrix
    if (!isMatrix(vIn)) throw "the argument should be a square table";
    // alert("vIn=" + vIn);
    var B;
    var nRowsIn;
    var nColsIn;
    var n;
    var sNameIn;
    //alert("inverse");
    if (vIn[0] != undefined && vIn.length > 1 && vIn[0][0] != 'x') {
        //alert(1);
        B = copy(vIn);
        sNameIn = B[0][0];
        if (!isNaN(sNameIn[0])) {
            //alert("un_named: sNameIn[0]=" + sNameIn[0]);
            B = dress(B, "Inv");
        }
        nRowsIn = B.length;
        nColsIn = B[0].length;
        if (nRowsIn != nColsIn) throw "this function inverts only square matrixes";
        n = nColsIn;

        //alert("2. B=" + B);
    }
    var a = copy(B);
    var b = copy(B);
    //   alert("n=" + n);
    var G = gaussj(a, n - 1, b, n - 1);
    if (!isNaN(sNameIn[0])) {
        a = strip(a);
    }
    return a;
}
function copy(vA) {//Ax=B, where B -identity matrix
    if (!isMatrix(vA)) throw "the argument should be a table";
    // alert("1.vA=" + vA);
    var n = vA[0].length;
    var a = vA;

    var b = [];
    for (var i = 0; i < vA.length; i++) {
        var ar = [];
        for (var j = 0; j < n ; j++) {
            ar.push(a[i][j]);
        }
        b.push(ar);
    }
    // alert("1.b=" + b);
    return b;
    //  return vA;
}
function trans(vIn) {//Ax=B, where B -identity matrix
    //if (vIn[0] != undefined && vIn.length > 1 && vIn[0][0] != 'x') {
    if (isMatrix(vIn)) {
        v = strip(vIn);
        var rows = v.length;
        var cols = v[0].length;
        var ar = [];

        for (var i = 0; i < cols; i++) {
            var a = [];
            for (var j = 0; j < rows; j++) {
                a.push(v[j][i]);
            }
            ar.push(a);
        }
    }
    else throw "the argument should be a matrix";
    //   alert(ar);
    return ar;
}