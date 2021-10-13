var bHidden = false;

var canvas = document.getElementById('canvasChart');
var context = canvas.getContext('2d');
var sMarker = "none";
var sMarkerMessage = "hello";
var nMarkerIndex = 0;
var xDown = 0;
var yDown = 0;
var xOffset = 0;
var yOffset = 0;
var xPosShare = 0.5;
var yPosShare = 0.5;

var bDown = false;
var xDownShare = 0.5;

var idDown = -1;
var nSeparatorN = -1;
//////////////////////
var Left = 0;
/////////////////////////////////////////
var bGoogleFound = false;
var bYahooFound = false;
var bWikiFound = false;
var bParamFound = false;
var bFromToFound = false;
var arMyShapes = null;
var ctx = null;
var yHighest = Number.MAX_VALUE;
var yLowest = -Number.MAX_VALUE;

var bShowX = true;
var nLeftParamPane = -1;
var heightParamX = 15;
var PanesTop = 0;
var PanesLeft = 0;

//var bShowParamX = false;
var bShowLeftY = false;
var bShowRightY = false;
var dListPanes = null;
var dLeftZoom =0;
var dRightZoom = 0;

var LL=0;
var T=0;
var W=0;
var H = 0;

var rPanes = null;
var idPanes = -1;
var listPaneTops = null;
var listLeftTopPanes = null;
var listPanes = null;


var FontHeight = 13;
var widthY = 69;

// x Axis:
//var minIndex = Number.MAX_SAFE_INTEGER;
//var maxIndex = Number.MIN_SAFE_INTEGER;
var nLeftIndex =0;
var nRightIndex = 0;


// y Axis:
var deltaTop = 3;
var deltaBottom = 3;
var yHighest=Number.MAX_VALUE;
var yLowest = -Number.MAX_VALUE;


var arPixelValueLeft = null;//param
var xLeftParam=Number.MAX_VALUE;//param
var xRightParam=-Number.MAX_VALUE;//param
var aXMins = null;//param
var aXMaxs = null;//param
var aYMins = null;//param
var aYMaxs = null;//param
var aLeftMins = null;
var aRightMins = null;
var aLeftMaxs = null;
var aRightMaxs = null;
var yPosTop = null;
var yPosBottom = null;
//var heightLegend = 15;

var arSymbolMin = null;
var arSymbolMax = null;
var arSeriesMin = null;
var arSeriesMax = null;

// My objects
//{
    function MyPolyline(id, Left, Top, Width, Height, nLeftIndex, nRightIndex, yMin, yMax, Ar,
            visibility, type, style, sStrokeColor, StrokeThickness, charYScale,arInfo) {
        this.shapeType = "MyPolyline";
        this.id = id;
        this.left = Left;
        this.top = Top;
        this.width = Width;
        this.height = Height;
        this.nLeftIndex = nLeftIndex;
        this.nRightIndex = nRightIndex;
        this.yMin = yMin;
        this.yMax = yMax;
        this.Ar = Ar;
        this.visibility = visibility;
        this.type = type;
        this.style=style,
        this.sStrokeColor = sStrokeColor;
        this.StrokeThickness = StrokeThickness;
        this.charYScale = charYScale;
        this.arInfo = arInfo;

        var yMin = this.yMin;
        var yMax = this.yMax;
        var controlLeft=this.left;
        var yTop=this.top;
        var yBottom=yTop+this.height;
        var width = this.width;
        var bParam = false;
        var ratioXoverY = 1;

       
        this.contains = function (x, y) {
          //  if (this.left < x && x < this.left + this.width && this.top < y && y < this.top + this.height) return true;
            return false;
        }
        this.draw = function (ctx) {
//if (Ar.length < 10) alert("Ar[0]=" + Ar[0]);
            if (this.arInfo[0] == "Trace") return;
            if (this.arInfo[0] == "Hide") {
                // alert("MyPolyline");
                return;
            }
            if (this.visibility == "Yes") ctx.globalAlpha = 1;
            else if (this.visibility == "No") ctx.globalAlpha = 0;
            else ctx.globalAlpha = 1 * this.visibility;

            if (this.style == "Solid") {
                ctx.setLineDash([0]);
            }
            else if (this.style == "Dash") {
                ctx.setLineDash([8, 5]);
            }
            else if (this.style == "Dot") {
                ctx.lineCap = 'round';
                if (this.StrokeThickness == 1) ctx.setLineDash([1, 5]);
                if (this.StrokeThickness == 2) ctx.setLineDash([2, 5]);
                if (this.StrokeThickness == 3) ctx.setLineDash([3, 5]);
                if (this.StrokeThickness == 4) ctx.setLineDash([4, 5]);
                if (this.StrokeThickness == 5) ctx.setLineDash([5, 5]);
                
            }
            ctx.strokeStyle = this.sStrokeColor;
            ctx.lineWidth = this.StrokeThickness;

            ctx.beginPath();

            var ar = this.Ar;//series
            var arO = [];
            var arH = [];
            var arL = [];
            var arX = [];

            if (this.arInfo[0] =="symbol") {//symbol
                arO=this.Ar[1];
                arH = this.Ar[2];
                arL = this.Ar[3];
                ar = this.Ar[4];
            } 
                //  else if (this.arInfo[0] == "param") {// param   
            else if (this.Ar.length == 2 && this.Ar[0][0] == "x") {

                // param 
                ar = this.Ar[1];
                arX = this.Ar[0];

//alert("arX=" + arX);
//alert("ar=" + ar);
//alert(this.height + " " + xRightParam + " " + xLeftParam + " " + yMax + " " + yMin);

                arO = ar;// for bar
                arH = ar;// for bar
                arL = ar;// for bar
                arC = ar;// for bar
                bParam = true;
                if (sMarker != "separator") {
                    var xMin = 1* this.arInfo[1];
                    var xMax = 1*this.arInfo[2];
                    //   ratioXoverY = this.height * (xMax - xMin) / (yMax - yMin);
                    ratioXoverY = this.height * (xRightParam - xLeftParam) / (yMax - yMin);               
//alert("xMin=" + xMin + " xMax=" + xMax + " aXMins[0]=" + aXMins[0] + " aXMaxs[0]=" + aXMaxs[0]+" yMin=" + yMin + " yMax=" + yMax );
                    //alert("1. arPixelValueLeft[0]=" + arPixelValueLeft[0]);
                    if (arPixelValueLeft[1] > controlLeft + this.width - ratioXoverY) {
                        arPixelValueLeft[1] = controlLeft + this.width - ratioXoverY;
                        arPixelValueLeft[2] = xLeftParam;
                        if (arPixelValueLeft[1] < this.left) {
                            arPixelValueLeft[1] = this.left;
                            arPixelValueLeft[2] = xLeftParam + (ratioXoverY - this.width) * (xRightParam - xLeftParam) / ratioXoverY;
                        }
                    }

                }/*
                if (arPixelValueLeft[0] > controlLeft + this.width - ratioXoverY) {
                    arPixelValueLeft[0] = controlLeft + this.width - ratioXoverY;
                    arPixelValueLeft[1] = xLeftParam;
                    if (arPixelValueLeft[0] < this.left) {
                        arPixelValueLeft[0] = this.left;
                        arPixelValueLeft[1] = xLeftParam + (ratioXoverY - this.width) * (xRightParam - xLeftParam) / ratioXoverY;
                    }
                }*/
                //alert("2. arPixelValueLeft[0]=" + arPixelValueLeft[0]);
            }
            else {
                arO = ar;// for bar
                arH = ar;// for bar
                arL = ar;// for bar
                arC = ar;// for bar
                /*
                var k = 0;
                dO = arO[k];
                dH = arH[k];
                dL = arL[k];
                dC = ar[k];
                if (ar.length == 1) alert("ohlc=" + dO + " " + dH + " " + dL + " " + dC);
                */
            }
            var IndexStart = ar[0];
            var IndexEnd = IndexStart + ar.length - 2;
            var Start = Math.max(nLeftIndex, IndexStart);
            var End = Math.min(nRightIndex, IndexEnd);
            if (ar.length == 1) {//const
                Start = nLeftIndex;
                End = nRightIndex;
            }
//alert(Start + " " + End + " " + this.type + " " + IndexStart + " " + IndexEnd+" "+ar.length);

            //   if ((charYScale == "l" || charYScale == "a") && sMarker == "separator") return;
            if (charYScale == "l" && sMarker != "separator") {
                yMin = Math.log10(yMin);
                // alert("yMin=" + yMin);
                /*     if (yMin == Number.NEGATIVE_INFINITY || isNaN(yMin)) {
                         yMin = Number.MAX_VALUE;
     
                         for (var i = 1; i < ar.length; i++) {
                             var d=1*ar[i];
                             if (d > 0 && d < yMin) yMin = d;//minimum positive number
     //if (i> ar.length-10) alert("i="+i+" ar[i]="+ar[i]+" yMin=" + yMin + " ar[ar.length - 2]=" + ar[ar.length - 2]);
                         }
     //alert(" yMin=" + yMin);
                         yMin = Math.log10(yMin);
                     }
                     */
                yMax = Math.log10(yMax);
                if (yMax == Number.POSITIVE_INFINITY || isNaN(yMax)) yMax = Number.MAX_VALUE;
                //alert("yMin=" + yMin+" yMax="+yMax);
            }
            if (charYScale == "a" && sMarker != "separator") {
                yMin = Math.atan(yMin);
                yMax = Math.atan(yMax);
            }

            if (this.type == "Line") {

 //document.getElementById("butTrace").value = yBottom-yTop;


//alert(0);
                //   if (ar.length == 1 && ar[0] != -Number.MAX_VALUE) {// constant  
                if (ar.length == 1) {// constant 
//alert("ar=" + ar);
//alert("Ar=" + Ar);
//alert("constant=" + ar[0]);
                    var x1 = this.left;
                    var y1 = 0;
                    if (yMax != yMin) y1 = yTop + (yMax - ar[0]) * (-yTop + yBottom) / (yMax - yMin);
                    else y1 = yTop + (-yTop + yBottom) / 2;
                    var x2 = controlLeft + width;
                    var y2 = y1;
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    //alert("done");
                }
                else if (!bParam && ar.length == 2) {//circle (one point to draw)
                    var y1 = 0;
                    if (yMax != yMin) y1 = yTop + (yMax - ar[1]) * (-yTop + yBottom) / (yMax - yMin);
                    else y1 = yTop + (-yTop + yBottom) / 2;
                    var index = 0;
                    if (ar[0] > nLeftIndex) index = index + ar[0] - nLeftIndex;
                    var x = controlLeft + width / 2.0;
                    if (nRightIndex != nLeftIndex) x = (controlLeft + index * width / (nRightIndex - nLeftIndex));

                    ctx.rect(x-1, y1-1, 3, 3);
                    ctx.stroke();

                    //alert(2);
                    /*
                    Ellipse ell = new Ellipse();
                    ell.Height = 12;
                    ell.Width = 12;
                    ell.StrokeThickness = 2;
                    SolidColorBrush brBlack = new SolidColorBrush(Colors.Black);
                    ell.Stroke = brBlack;
                    TranslateTransform ttell = new TranslateTransform();

                    int i = Start;
                    int k = i - IndexStart + 1;
                    int index = i - Start;
                    if (ar[0] > nLeftIndex) index = index + (int)ar[0] - nLeftIndex;
                    double x = (controlLeft + index * listPanes[nPane].Width / (nRightIndex - nLeftIndex));


                    double y = 0;
                    if (yMax != yMin)
                        y = yTop + (yMax - ar[k]) * (-yTop + yBottom) / (yMax - yMin);
                    else y = yTop + (-yTop + yBottom) / 2;

                    ttell.X = x - 6;
                    ttell.Y = y - 6;// - 12
                    ell.RenderTransform = ttell;
                    ell.Opacity = Pres.getVisible(sKey);
                    Panel.Children.Add(ell);*/
                }
                else if (End >= Start) {

//  alert("ar="+ar+" Start="+Start+" End="+End);

//alert(ar);
                    var bEmpty = true;
                    var bEmptyPrev = true;
                    var yPrev = 0;
                    //  var bStartNewLine = true;
                    for (var i = Start; i <= End; i++){
                        var k = i - IndexStart + 1;
                        var yk = ar[k];
                        if (charYScale == "l") {
                            yk = Math.log10(yk);
                        }
                        if (charYScale == "a") yk = Math.atan(yk);
                        if (isNaN(yk) && yk!=undefined) {
                            //   if (isNaN(yk) ) {
                            var bEmpty = true;
                            //    var bEmptyPrev = true;
                            //bEmpty = false;//always for "line"
                            continue;
                        }
                        var index = i - Start;
                        // alert("1.index=" + index);
                        if (ar[0] > nLeftIndex) index = index + ar[0] - nLeftIndex;
                        var x = controlLeft + width / 2.0;
                        if (nRightIndex != nLeftIndex) x = (controlLeft + index * width / (nRightIndex - nLeftIndex));
                        if (bParam) {
                            var R = controlLeft + width;
                            //      x = R + ratioXoverY * (arX[k] - xRightParam) * (aXMaxs[0] - aXMins[0]) * width / ((yMax - yMin) * (xRightParam - xLeftParam));
                            //       x = R + ratioXoverY * (arX[k] - xRightParam) * width / (xRightParam - xLeftParam);
                            x = R + ratioXoverY * (arX[k] - xRightParam) / (xRightParam - xLeftParam);
 //if (x >= R) alert("R=" + R + " x=" + x + " ratioXoverY=" + ratioXoverY + " xLeftParam=" + xLeftParam + " xRightParam=" + xRightParam + " arX[k]=" + arX[k]);
                            if (x < this.left) continue;
//alert("x=" + x);
                        }
                        var y = 0; 
                        if (bEmpty) {// previous point is empty
                            if (!isNaN(ar[k]) && ar[k] > -Number.MAX_VALUE && ar[k] < Number.MAX_VALUE) {// current is not not empty: empty ->to full
                                if (yMax != yMin) {
                                    //  y = yTop + (yMax - ar[k]) * (-yTop + yBottom) / (yMax - yMin);
                                    y = yTop + (yMax - yk) * (-yTop + yBottom) / (yMax - yMin);
                                }
                                else {
                                    y = yTop + (-yTop + yBottom) / 2;
                                }

                                ctx.moveTo(x, y);

                                if (i == End) {

                                    if (nRightIndex != nLeftIndex)
                                        ctx.lineTo(x - 0.5 * width / (nRightIndex - nLeftIndex), y);
                                    else 
                                        ctx.lineTo(x - 0.5 * width , y);
                                }
                                yPrev = y;
                                bEmpty = false;
                                bEmptyPrev = true;
                            }
                            else {// current is empty: empty ->to empty, so do nothing
                                bEmptyPrev = true;
                            }
                        }
                        else {// previous point is full
                            if (!isNaN(ar[k]) && ar[k]>-Number.MAX_VALUE && ar[k]<Number.MAX_VALUE) {// current is not not empty: full ->to full
                                if (yMax != yMin){
                                    y = yTop + (yMax - yk) * (-yTop + yBottom) / (yMax - yMin);
                                    //y = yTop + (yMax - ar[k]) * (-yTop + yBottom) / (yMax - yMin);
                                }
                                else y = yTop + (-yTop + yBottom) / 2;



                                //if (bParam) alert("index=" + index + " x=" + x + " y=" + y + " xLeftParam=" + xLeftParam + " xRightParam=" + xRightParam+" arX[k]="+arX[k]);
                                ctx.lineTo(x, y);
                                yPrev = y;
                                bEmptyPrev = false;
                            }
                            else {// current is empty: full ->to empty, so do horizontal to 0.4 way
                                if (bEmptyPrev) {
                 

                                    if (nRightIndex != nLeftIndex)
                                        ctx.lineTo(x - 0.5 * width / (nRightIndex - nLeftIndex), yPrev);
                                    else
                                        ctx.lineTo(x - 0.5 * width, yPrev);

                                    //ctx.lineTo(x - 0.5 * width / (nRightIndex - nLeftIndex), yPrev);
                                }
                                bEmpty = true;
                                bEmptyPrev = false;
                                bEmpty = false;//always for "line"
                                //bEmptyPrev = true;
                            }
                        }                
                    }
                }
                ctx.stroke();
            }
            else if (this.type == "Bar") {
                //if (End == Start)circle
                //if (yMin == yMax)horizont
                // alert("Bar");
                if (End >= Start) {
                    //       var xDelta = 0.4 * width / (End - Start + 1);
                    var xDelta = 0.2 * width / 2;
                    if (nRightIndex != nLeftIndex) xDelta = 0.4 * width / (nRightIndex - nLeftIndex);
                    if (xDelta < 1) xDelta = 1;
                    for (var i = Start; i <= End; i++) {

                        var k = i - IndexStart + 1;
                        var index = i - Start;
                        if (ar[0] > nLeftIndex && ar.length != 1) index = index + ar[0] - nLeftIndex;

                        var x = controlLeft + width / 2.0;
                        if (nRightIndex != nLeftIndex) x = (controlLeft + index * width / (nRightIndex - nLeftIndex));
                        if (bParam) {
                            var R = controlLeft + width;
                            x = R + ratioXoverY * (arX[k] - xRightParam) / (xRightParam - xLeftParam);         
                            if (x < this.left) continue;
                        }

                        //alert("index=" + index + " x=" + x);
                        var yO = 0;
                        var yH = 0;
                        var yL = 0;
                        var yC = 0;
                        var dO = arO[0];
                        var dH = arH[0];
                        var dL = arL[0];
                        var dC = ar[0];
                        //if (ar.length == 1) alert("ohlc=" + dO + " " + dH + " " + dL + " " + dC);
                        //alert("ohlc=" + dO + " " + dH + " " + dL + " " + dC);
                        if (ar.length != 1) {
                            dO = arO[k];
                            dH = arH[k];
                            dL = arL[k];
                            dC = ar[k];
                        }
                        //if (ar.length == 1) alert("ohlc=" + dO + " " + dH + " " + dL + " " + dC);
                        if (charYScale == "l") {
                            dO = Math.log10(dO);
                            dH = Math.log10(dH);
                            dL = Math.log10(dL);
                            dC = Math.log10(dC);
                        }
                        if (charYScale == "a") {
                            dO = Math.atan(dO);
                            dH = Math.atan(dH);
                            dL = Math.atan(dL);
                            dC = Math.atan(dC);
                        }

                        if (isNaN(dO) || isNaN(dH) || isNaN(dL) || isNaN(dC)) continue;

                        if (dH < yHighest && dL > yLowest) {
                            if (yMax != yMin) {
                                yO = yTop + (yMax - dO) * (-yTop + yBottom) / (yMax - yMin);
                                yH = yTop + (yMax - dH) * (-yTop + yBottom) / (yMax - yMin);
                                yL = yTop + (yMax - dL) * (-yTop + yBottom) / (yMax - yMin);
                                yC = yTop + (yMax - dC) * (-yTop + yBottom) / (yMax - yMin);
                            }
                            else {
                                yO = yTop + (-yTop + yBottom) / 2;
                                yH = yTop + (-yTop + yBottom) / 2;
                                yL = yTop + (-yTop + yBottom) / 2;
                                yC = yTop + (-yTop + yBottom) / 2;
                            }
                        }
                        //if(ar.length==1) alert("index=" + index + " x=" + x + " yMax=" + yMax+" yMin=" + yMin+" "+yO+" "+yH+" "+yL+" "+yC);
                        ctx.moveTo(x-xDelta, yO);
                        ctx.lineTo(x, yO);
                        ctx.moveTo(x, yH);
                        ctx.lineTo(x, yL);
                        ctx.moveTo(x, yC);
                        ctx.lineTo(x+xDelta, yC);

                    }// loop                   
                }// if (End >= Start)
                ctx.stroke();
                // ctx.globalAlpha = 1;
                //alert("ctx.globalAlpha=" + ctx.globalAlpha);
            }//"Bar"
            else if (this.type == "Hstgm") {
                //alert(nLeftIndex + " " + nRightIndex);

                //if (End == Start)circle
                //if (yMin == yMax)horizont
                if (End >= Start) {
                    for (var i = Start; i <= End; i++) {

                        var k = i - IndexStart + 1;
                        var index = i - Start;
                        if (ar[0] > nLeftIndex && ar.length != 1) index = index + ar[0] - nLeftIndex;
                        var x = controlLeft + width / 2.0;
                        if (nRightIndex != nLeftIndex) x = (controlLeft + index * width / (nRightIndex - nLeftIndex));
                        if (bParam) {
                            var R = controlLeft + width;
                            x = R + ratioXoverY * (arX[k] - xRightParam) / (xRightParam - xLeftParam);
                            if (x < this.left) continue;
                        }

                        var yC = 0;
                        var yZero = 0;
                        var dC = ar[0];
                        if (ar.length != 1) dC = ar[k];
                        if (charYScale == "l") {
                            dC = Math.log10(dC);
                        }
                        if (charYScale == "a") {
                            dC = Math.atan(dC);
                        }
                        if (isNaN(dC)) continue;
                        if (dC < yHighest && dC > yLowest) {
                            if (yMax != yMin)
                                yC = yTop + (yMax - dC) * (-yTop + yBottom) / (yMax - yMin);
                            else yC = yTop + (-yTop + yBottom) / 2;
                            if (yMax != yMin)
                                yZero = yTop + (yMax - 0) * (-yTop + yBottom) / (yMax - yMin);
                            else yZero = yTop + (-yTop + yBottom) / 2;
                        }
                        ctx.moveTo(x, yC);
                        ctx.lineTo(x, yZero);
                    }
                }
                ctx.stroke();
                //       ctx.globalAlpha = 1;
                //       alert("ctx.globalAlpha=" + ctx.globalAlpha);
            }// Hstgm       
            else if (this.type == "Edge") {
                var points = [];

                if (End >= Start) {
                    for (var i = Start; i <= End; i++) {

                        var k = i - IndexStart + 1;
                        var index = i - Start;
                        if (ar[0] > nLeftIndex && ar.length != 1) index = index + ar[0] - nLeftIndex;
                        var x = controlLeft + width / 2.0;
                        if (nRightIndex != nLeftIndex) x = (controlLeft + index * width / (nRightIndex - nLeftIndex));
                        if (bParam) {
                            var R = controlLeft + width;
                            x = R + ratioXoverY * (arX[k] - xRightParam) / (xRightParam - xLeftParam);
                            if (x < this.left) continue;
                        }

                        var yC = 0;
                        var yZero = 0;
                        var dC = ar[0];
                        if (ar.length != 1) dC = ar[k];
                        if (charYScale == "l") {
                            dC = Math.log10(dC);
                        }
                        if (charYScale == "a") {
                            dC = Math.atan(dC);
                        }
                        if (isNaN(dC)) continue;
                        if (dC < yHighest && dC > yLowest) {
                            if (yMax != yMin)
                                yC = yTop + (yMax - dC) * (-yTop + yBottom) / (yMax - yMin);
                            else yC = yTop + (-yTop + yBottom) / 2;
                            if (yMax != yMin)
                                yZero = yTop + (yMax - 0) * (-yTop + yBottom) / (yMax - yMin);
                            else yZero = yTop + (-yTop + yBottom) / 2;
                        }
                        ctx.moveTo(x, yC);
                        ctx.lineTo(x, yZero);
                        points.push([x, yC]);
                    }
                }
                ctx.stroke();
                
                ctx.beginPath();
                for (n = 0; n < points.length; n++) {
                    if (n == 0) {
                        ctx.moveTo(points[0][0], points[0][1]);
                    }
                    else {
                        ctx.lineTo(points[n][0], points[n][1]);
                    }
                }
                ctx.stroke();
            }
            else if (this.type == "HstgmZero") {
                var points = [];
                var yZero = 0;
                if (End >= Start) {
                    for (var i = Start; i <= End; i++) {

                        var k = i - IndexStart + 1;
                        var index = i - Start;
                        if (ar[0] > nLeftIndex && ar.length != 1) index = index + ar[0] - nLeftIndex;
                        var x = controlLeft + width / 2.0;
                        if (nRightIndex != nLeftIndex) x = (controlLeft + index * width / (nRightIndex - nLeftIndex));
                        if (bParam) {
                            var R = controlLeft + width;
                            x = R + ratioXoverY * (arX[k] - xRightParam) / (xRightParam - xLeftParam);
                            if (x < this.left) continue;
                        }

                        var yC = 0;
                        //   var yZero = 0;
                        var dC = ar[0];
                        if (ar.length != 1) dC = ar[k];
                        if (charYScale == "l") {
                            dC = Math.log10(dC);
                        }
                        if (charYScale == "a") {
                            dC = Math.atan(dC);
                        }
                        if (isNaN(dC)) continue;
                        if (dC < yHighest && dC > yLowest) {
                            if (yMax != yMin)
                                yC = yTop + (yMax - dC) * (-yTop + yBottom) / (yMax - yMin);
                            else yC = yTop + (-yTop + yBottom) / 2;
                            if (yMax != yMin)
                                yZero = yTop + (yMax - 0) * (-yTop + yBottom) / (yMax - yMin);
                            else yZero = yTop + (-yTop + yBottom) / 2;
                        }
                        ctx.moveTo(x, yC);
                        ctx.lineTo(x, yZero);
                        points.push([x, yC]);
                    }
                }
                ctx.stroke();

                ctx.beginPath();
                for (n = 0; n < points.length; n++) {
                    if (n == 0) {
                        ctx.moveTo(points[0][0], points[0][1]);
                    }
                    else {
                        var x = points[n][0];
                        var y = points[n][1];
                        var yPrev = points[n - 1][1];
                        if (y == yZero) {
                            ctx.moveTo(points[n - 1][0], y);
                            ctx.lineTo(points[n][0], y);
                        }
                        else if (yPrev == yZero) {
                            ctx.lineTo(points[n][0], yPrev);
                            ctx.moveTo(points[n][0], y);
                        }
                        else {
                           // ctx.lineTo(points[n][0], points[n][1]);
                        }
                    }
                }
                ctx.stroke();
            }

        }//draw
    }
    function MyRectangle(id, Left, Top, Width, Height, sFillColor, sStrokeColor, StrokeThickness, sCursor,arInfo) {
        this.shapeType = "MyRectangle";
        this.id = id;
        this.left = Left;
        this.top = Top;
        this.width = Width;
        this.height = Height;
        this.sFillColor = sFillColor;
        this.sStrokeColor = sStrokeColor;
        this.StrokeThickness = StrokeThickness;
        this.sCursor = sCursor;
        this.arInfo = arInfo;

        this.opacity = 1;
        
        this.contains=function(x,y){
            if (this.left<x && x<this.left+this.width && this.top<y && y<this.top+this.height) return true;
            return false;
        }
        this.draw = function (ctx) {
            if (this.arInfo != null) {
                if (this.arInfo.length > 0) {
                    if (this.arInfo[0] == "moving" && sMarker=="separator") {
                    //    alert(sMarker + " " + yOffset);
                        var HeightSeparator = 3;

                        ctx.fillStyle = " grey";
                        this.opacity = 0.5;
                        ctx.fillRect(listLeftTopPanes[0][0], yOffset, listPanes[0].width, HeightSeparator);
                       /*
                        ctx.beginPath();
                        ctx.lineWidth = "3";
                        ctx.strokeStyle = " #FF0000";
                        ctx.rect(listLeftTopPanes[0][0], yOffset, listPanes[0].width, HeightSeparator);
                        ctx.stroke();
                         */

                        return;
                    }
                }
            }

            /*
            if (this.arInfo != null) {
                if (this.arInfo.length > 1) {
                    if (this.arInfo[0] == "separator" && sMarker != "separator" && !bDown) {
                        return;
                    }
                    if (this.arInfo[0] == "separator" && sMarker == "separator" && bDown) {
                    //    alert("in MyRectangle");
                        ctx.fillStyle = " #FF0000";
                        ctx.fillRect(this.left, this.top, this.width, this.height+5);
                        return;
                    }
                }
            }
            */

 ctx.globalAlpha = this.opacity;
            ctx.beginPath();
          //  ctx.opacity = 1;
          //  document.getElementById("canvasChart").style = "cursor: pointer";
            ctx.rect(this.left, this.top, this.width, this.height);

            ctx.fillStyle = this.sFillColor;
            ctx.fill();
            ctx.strokeStyle = this.sStrokeColor;
            ctx.lineWidth = this.StrokeThickness;
            ctx.stroke();
         //   ctx.closePath(); 
            // <canvas id="draw" style="cursor: url(image/pencil.cur)"> 

        }


        if (Left < 0 || Top < 0 || Width < 0 || Height < 0) return;

        var StrokeThickness = 0.5;


    }
    function MyTextBlock(id,Left, Top, Width, Height, sColor, sText, sCursor,sDash, arInfo) {
        this.shapeType = "MyTextBlock";
        this.id = id;
        this.left = Left;
        this.top = Top;
        this.width = Width;
        this.height = Height;
        this.Foreground = sColor;
        this.sCursor = sCursor;
        this.sText = sText;
        this.sDash = sDash;
        this.arInfo = arInfo;

        this.contains = function (x, y) {
            if (this.left < x && x < this.left + this.width && this.top < y && y < this.top + this.height) return true;
            return false;
        }
        this.draw = function (ctx) {
            if (this.arInfo[0] == "Trace") return;
            if (this.arInfo[0] == "Hide") {
              //  alert("sText=" + this.sText);
                //  return;
                // For Params
                var arCoordParam = this.sText.split("?");
                if (arCoordParam.length > 1) {
                    for (var i = 1; i < arCoordParam.length; i++) {
                        var xyc = arCoordParam[i].split(";");
                        ctx.beginPath();
                        ctx.lineWidth = "4";
                        ctx.strokeStyle = xyc[2];
                        ctx.rect(1 * xyc[0] - 1, 1 * xyc[1] - 1, 3, 3);
                        ctx.stroke();
                    } 
                }

               // For Coord  arCoordParam[0]=tCoord =  150;x = 0.50000;y = -0.86603
                var maxLength = 0;
                var nLine = 0;

                var parts = arCoordParam[0].split(";");
                var left = this.left;
                var top = this.top - 14 * parts.length;
                ctx.font = "14px serif"
                ctx.fillStyle = " #000000";


                if (parts.length > 0) {
                    for (var i = 0; i < parts.length; i++) {
                        if (maxLength < parts[i].length) {
                            maxLength = parts[i].length;
                            nLine = i;
                        }
                    }
                    var maxWidth = 1.07*ctx.measureText(parts[nLine]).width;//12/30/2017
   
             

                    // fill white rectangle

                    ctx.fillStyle = "whitesmoke";
                    var L = this.left;
                    if (left > listLeftTopPanes[0][0] + listPanes[0].width / 2) L = this.left - maxWidth-7;
                    ctx.fillRect(L, top - 14, maxWidth + 7, (parts.length + 1) * 14-7);
                    ctx.beginPath();
                    ctx.lineWidth = "1";
                    ctx.strokeStyle = " #000000";

  ctx.setLineDash([]);  //make solid for trace


                    ctx.rect(L, top - 14, maxWidth + 7, (parts.length + 1) * 14 - 7);
                    ctx.stroke();
                    //draw vertical lines
                    for (var nPane = 0; nPane < listPanes.length; nPane++) {
                        ctx.beginPath();
                        var y1 = listLeftTopPanes[nPane][1] + FontHeight + deltaTop;
                        var y2=y1+ listPanes[nPane].height - FontHeight - deltaTop - deltaBottom;
                        ctx.moveTo(this.left, y1);
                        ctx.lineTo(this.left, y2);
                        ctx.stroke();
                    }

   
                    // fill text over rectangle
                    ctx.fillStyle = "black"
                    for (var i = 0; i < parts.length; i++) {
                        ctx.fillText(parts[i], L + 2, top + i * 14);
                    }
                }
                return;
            }
            /////////////////
            if (arInfo[0] == "param") {
                this.left = arPixelValueLeft[1];
                var str = BuildString(1 * arPixelValueLeft[2]) + ": param";
                var sz = ctx.measureText(str);
                if (arPixelValueLeft[1] + sz.width < arPixelValueLeft[3]) {
                    this.sText = str;
                }
                else {
                    this.sText = "";
                }
            }

            var index = this.sText.indexOf("param");
            //if (index >= 0) alert(this.sText + " this.left=" + this.left + " this.top=" + this.top + " this.width=" + this.width + " this.height=" + this.height);

            ctx.globalAlpha = 1;
            ctx.font = "13px serif";
            ctx.fillStyle = sColor;
            if (this.sDash[0] == "l") {
                ctx.fillText(this.sText, this.left, this.top + 13);
            }
            else if (this.sDash[0] == "r") {
                //  ctx.fillText(this.sText, this.left - this.width, this.top + 13);
                ctx.fillText(this.sText, this.left, this.top + 13);
            }
            else {

                ctx.fillText(this.sText, this.left, this.top + 13);
            }

            if (this.sDash != "") {
                //    
                var d2 = 4; var x1 = 0; var x2 = 0; var y1 = 0; var y2 = 0;
                if (this.sDash == "leftTop") {
                    //  alert(this.sDash + " " + this.left + " " + this.top + " " + this.sText);
                    //var d2 = 4; var x1 = 0; var x2 = 0; var y1 = 0; var y2 = 0;
                    x1 = this.left;
                    y1 = this.top;// + this.height / 2;
                    x2 = x1 + d2;
                    y2 = y1;
                }
                if (this.sDash == "leftBottom") {
                    //    alert(this.sDash + " " + this.left + " " + this.top + " " + this.sText);
                    x1 = this.left;
                    y1 = this.top + this.height;
                    x2 = x1 + d2;
                    y2 = y1;
                }
                if (this.sDash == "rightTop") {
                    //  alert(this.sDash + " " + this.left + " " + this.top + " " + this.sText);
                    //var d2 = 4; var x1 = 0; var x2 = 0; var y1 = 0; var y2 = 0;
                    x1 = this.left + this.width;//-this.width;
                    y1 = this.top;// + this.height / 2;
                    x2 = x1 - d2;
                    y2 = y1;
                }
                if (this.sDash == "rightBottom") {
                    //    alert(this.sDash + " " + this.left + " " + this.top + " " + this.sText);
                    x1 = this.left + this.width;//-this.width;
                    y1 = this.top + this.height;
                    x2 = x1 - d2;
                    y2 = y1;
                }
                if (this.sDash == "right") {
                    x1 = this.right;
                    y1 = this.top;// + this.height / 2;
                    x2 = x1 - d2;
                    y2 = y1;
                }
                if (this.sDash == "topLeft") {
                    x1 = this.left + 1;
                    y1 = this.top;
                    x2 = x1;
                    y2 = y1 + 4;
                }
                if (this.sDash == "topRight") {
                    x1 = this.left + this.width;
                    y1 = this.top;
                    x2 = x1;
                    y2 = y1 + 4;
                }
                //if (index >= 0) alert("this.sText=" + this.sText + " " + x1 + " " + y1 + " " + x2 + " " + y2);
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        }
    }
    function MyPolygon(id, Left, Top, Width, Height, sColor, sCursor, arInfo) {
  //     alert(Left + " " + Top + " " + Width + " " + Height + " " + sColor + " " + sCursor + " " + arInfo[0] + " " + arInfo[1]);
        this.shapeType = "MyPolygon";
        this.id = id;
        this.left = Left;
        this.top = Top;
        this.width = Width;
        this.height = Height;
        // this.Foreground = sColor;
        this.sFillColor = sColor;
        this.sStrokeColor = sColor;
        this.sCursor = sCursor;
        this.arInfo = arInfo;//placeholder so far
     //   var chYScale = "n";
     

        this.contains = function (x, y) {
            if (this.left < x && x < this.left + this.width && this.top < y && y < this.top + this.height) return true;
            return false;
        }
        this.draw = function (ctx) {
            //  alert(this.left + " " + this.top + " " + this.width + " " + this.height);
            //text+[+number+]+text+[number+]+text+[+number+]+text 2,6,10,..

            ctx.fillStyle = this.sFillColor;
            var upDown = (arInfo[1] - 1) % 4;
            upDown = upDown / 2;// if upDown==0 => Down, if upDown==1 => Up
//alert(arInfo[1] + " " + upDown);
            ctx.beginPath();
            var x1 = this.left;
            var x3 = this.left + this.width;
            var x2 = (x1 + x3) / 2;
            
            // Down
            var y1 = this.top + upDown * this.height;
            var y3 = y1;
            var y2 = this.top + (1 - upDown) * this.height;

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.lineTo(x1, y1);
            ctx.closePath();
            ctx.fill();




            
// ctx.fillRect(this.left, this.top, this.width, this.height);

        }
    }
//}
// myDrawingFunction
function myDrawingFunction1() {
    document.getElementById("butTrace").value = "Trace";
    document.getElementById("butGoLeft").disabled = true;
    document.getElementById("butGoRight").disabled = true;
    sMarker = "none";
    myDrawingFunction();
}
function myDrawingFunction() {
    if (!bPassword) return;
    var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0],
     //   x = w.innerWidth || e.clientWidth || g.clientWidth,
    //    y = w.innerHeight || e.clientHeight || g.clientHeight;
        x = w.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        y = w.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;



    var wid = x - 560;
  //  var h1 = document.getElementById("top").clientHeight;
    var h1 = document.getElementById("TopPanel").clientHeight;
    //if (bShowDlg == true) h1 += hDialdocument.getElementById("Dialog").clientHeightog;
    if (bShowDlg == true) h1 += document.getElementById("Dialog").clientHeight;
    var hei = y - 25 - h1;
    if (sShowFormulas != "Yes") {
        wid = x - 25;
        hei = y - 50 - h1;
    }
if (wid < 0) return;
    document.getElementById("canvasChart").style = "width:" + wid + "px; height:" + hei + "px;background-color:whitesmoke;";//yellow
    document.getElementById("canvasChart").width = wid;
   document.getElementById("canvasChart").height = hei;

//document.getElementById("canvasChart").style = "width:" + wid + "px";
//document.getElementById("canvasChart").style = "height:" + hei + "px";
//document.getElementById("canvasChart").style = "background-color:red";

//   document.getElementById("butTrace").value = wid + " " + hei;
    LL = 0; T = 0; W = wid; H = hei;
/// return;////////////////????????????????????????
//alert(2);
    try{
        DrawChart(0, 0, wid, hei);
        //alert(23);
    }
    catch (err) {
        alert("Draw: " + err.message);
    //    alert("listLeftTopPanes.length=" + listLeftTopPanes.length);

    }
    
    //    DrawChart();
    // height of description
}
//  DrawChart
function DrawChart(LL, T, W, H) {
 //   alert("nChartToDraw=" + nChartToDraw);
  //  document.getElementById("butGoLeft").disabled = true;
    //   var Left = LL;
    var delta = 10;
    var Left = LL + delta;
    var Top = T;
 //   var Width = W;
    var Width = W-delta;
    var Height = H;
//alert("H" = +H);
    var canvasChart = document.getElementById("canvasChart");

    ctx = canvasChart.getContext("2d");
    ctx.clearRect(Left, Top, Width, Height);
    arMyShapes = [];
 //   arMyShapes = new Array();

    ///////// Bool Show axis
    // prepare for drawing empty axia and panes
    {
        bShowX = true;
        bShowLeftY = false;
        bShowRightY = false;

        // dListPanes
        dListPanes = new Array();
        var sum = 0;
        for (var i = 0; i < arPanes.length; i++) {
            var d = 1 * arPanes[i];
            dListPanes.push(d);
            sum += d;
        }
        //  var dListPanes=new Array();
        //   arNameToPresentation = new Array();
//alert("arSymbolPresentation.length=" + arSymbolPresentation.length);
        var nHowManyPanes = 0;//"Yes!1!Right!Line!1!Solid!Long!1!#000000";
        for (var i = 0; i < arSymbolPresentation.length; i++) {
            var parts = arSymbolPresentation[i].split("!");
//alert("parts=" + parts);
            if (parts[7] != ""+nChartToDraw) continue;// do i need it???
            if (parts[0] == "No" && parts[6] == "None") continue;
            var nPane = parts[1] - 1;
            if (nHowManyPanes < nPane + 1) nHowManyPanes = nPane + 1;
        }
        for (var i = 0; i < arFormulaPresentation.length; i++) {
            var parts = arFormulaPresentation[i].split("!");
            if (parts[7] != "" + nChartToDraw) continue;// do i need it???
            if (parts[0] == "No" && parts[6] == "None") continue;
            var nPane = parts[1] - 1;
            if (nHowManyPanes < nPane + 1) nHowManyPanes = nPane + 1;
        }
//alert("1. nHowManyPanes=" + nHowManyPanes + " dListPanes.length=" + dListPanes.length+" sum="+sum);

        if (nHowManyPanes > dListPanes.length) {
            var dAvgPane = sum / dListPanes.length;
            for (var i = dListPanes.length; i < nHowManyPanes; i++) {
                dListPanes.push(dAvgPane);
                sum = sum + dAvgPane;
            }
        }
//alert("2. nHowManyPanes=" + nHowManyPanes + " dListPanes.length=" + dListPanes.length + " sum=" + sum);
//alert("1. nHowManyPanes=" + nHowManyPanes + " arLeftRightAtans[0]=" + arLeftRightAtans[0] + " arLeftRightAtans[1]=" + arLeftRightAtans[1]);
        for (var i = 0; i < dListPanes.length; i++) {
            dListPanes[i] = dListPanes[i] / sum;
//alert(i + " dListPanes[i]=" + dListPanes[i] + " dListPanes.length=" + dListPanes.length);
if (i >= arPanes.length) arPanes.push(arPanes[0] * dListPanes[i] / dListPanes[0]);
            if (arLeftRightAtans[0].length <= i) arLeftRightAtans[0] += "n";
            if (arLeftRightAtans[1].length <= i) arLeftRightAtans[1] += "n";
        }
//alert(" arPanes.length=" + arPanes.length);
        arLeftRightAtans[0] = arLeftRightAtans[0].substr(0, nHowManyPanes);// if nHowManyPanes have been decreased
        arLeftRightAtans[1] = arLeftRightAtans[1].substr(0, nHowManyPanes);
//alert("2. nHowManyPanes=" + nHowManyPanes + " arLeftRightAtans[0]=" + arLeftRightAtans[0] + " arLeftRightAtans[1]=" + arLeftRightAtans[1]);

        // Yaxis  ////"Yes!1!Right!Line!1!Solid!Long!1!#000000";
        for (var i = 0; i < arSymbolPresentation.length; i++) {
            var parts = arSymbolPresentation[i].split("!");
            if (parts[7] != "" + nChartToDraw) continue;// do i need it???
            if (getVisible(parts[0]) == 0 && parts[6] == "None") continue;
            var nPane = parts[1] - 1;
            if (dListPanes[nPane] == 0) continue;
            if (parts[2] == "Left") bShowLeftY = true;
            if (parts[2] == "Right") bShowRightY = true;
        }
        for (var i = 0; i < arFormulaPresentation.length; i++) {
            var parts = arFormulaPresentation[i].split("!");
            if (parts[7] != "" + nChartToDraw) continue;// do i need it???
            if (getVisible(parts[0]) == 0 && parts[6] == "None") continue;
            var nPane = parts[1] - 1;
            if (dListPanes[nPane] == 0) continue;
            if (parts[2] == "Left") bShowLeftY = true;
            if (parts[2] == "Right") bShowRightY = true;
        }
        //sZoom="98;100!0;100";  arZooms
        //  alert(arZooms[0]);
        dLeftZoom = 0;
        dRightZoom = 1;
        if (arZooms.length == 1) {
            document.getElementById("butZoom").disabled = true;//disabled = true;
        //    document.getElementById("slide").style.visibility = "hidden";
            document.getElementById("slide").style.visibility = "collapse";
      //      document.getElementById("slide").style.display = "none";
        }
        else {//arZooms.length > 1  
       //     document.getElementById("slide").style.display = "reset";
            document.getElementById("butZoom").disabled = false;
            // slider
            setSliderValue();
        }
    }

//    var PanesTop = 0;
    //    var PanesLeft = 0;
    PanesTop = 0;
    PanesLeft = 0;
    //draw empty axis and panes
    {
        var brWhite = "whitesmoke";
        var brBlack = "black";
       // var widthY = 30;
        var widthLeftY = widthY;
        if (bShowLeftY == false) widthLeftY = 0;
        var widthRightY = widthY;
        if (bShowRightY == false) widthRightY = 0;
        var heighX = 15;
        if (bShowX == false) heighX = 0;
      //  var heightParamX = 15;
    //    bShowParamX=needToShowParamX();
    //    if (!bShowParamX) heightParamX = 0;
//alert("heightParamX=" + heightParamX);
        var heightCapture = 0;/////////////////////////////////////////////// 000000000000000000
var rCapture = new MyRectangle(arMyShapes.length, Top, Width, heightCapture, brWhite, brBlack, 0.5, "",[]);
arMyShapes.push(rCapture);
       
var rX = new MyRectangle(arMyShapes.length, Left, Top + Height - heighX, Width, heighX, brWhite, brWhite, 0.5, "", []);
arMyShapes.push(rX);
        
var rLeftY = new MyRectangle(arMyShapes.length, Left, Top + heightCapture, widthLeftY, Height - heightCapture - heighX, brWhite, brWhite, 0.5, "", []);
arMyShapes.push(rLeftY);

var rRightY = new MyRectangle(arMyShapes.length, Left + Width - widthRightY, Top + heightCapture, widthRightY, Height - heightCapture - heighX, brWhite, brWhite, 0.5, "", []);
arMyShapes.push(rRightY);


        PanesTop = Top + heightCapture;
        listPaneTops = new Array();
        listPaneTops.push(PanesTop);
        PanesLeft = Left + widthLeftY;
        var PanesHeight = Height - heightCapture - heighX - heightParamX;
        idPanes = arMyShapes.length;
//alert("idPanes=" + idPanes);
        rPanes = new MyRectangle(arMyShapes.length, Left + widthLeftY, PanesTop, Width - widthRightY - widthLeftY, PanesHeight, brWhite, brWhite, 5, "", []);
arMyShapes.push(rPanes);///


        //  listPanes
        listLeftTopPanes = [];
        listPanes = [];
        var PaneTop = PanesTop;
        var PaneHeight = PanesHeight;
        var brS = "#778899";// new SolidColorBrush(Colors.LightGray);
        var HeightSeparator = 3;
        //  alert("dListPanes.length=" + dListPanes.length);

        for (var i = 0; i < dListPanes.length; i++) {
//alert("i=" + i);
            if (i > 0)//separator
            {
                //         alert("separator");
                var rSeparator = new MyRectangle(arMyShapes.length, Left + widthLeftY, PaneTop - HeightSeparator, Width - widthRightY - widthLeftY, HeightSeparator, brS, brS, 0.5, "cursor: n-resize", ["separator",i]);
                arMyShapes.push(rSeparator);
                //rSeparator.MouseLeftButtonDown += new MouseButtonEventHandler(rSeparator_MouseLeftButtonDown);
            }
            //      alert("dListPanes.length=" + dListPanes.length);

            PaneHeight = PanesHeight * dListPanes[i];
            listLeftTopPanes.push([Left + widthLeftY, PaneTop]);
var rPane = new MyRectangle(arMyShapes.length, Left + widthLeftY, PaneTop, Width - widthRightY - widthLeftY,
            PaneHeight, brWhite, brBlack, 0.5, "", []);
arMyShapes.push(rPane);
            listPanes.push(rPane);

            var d = 1.2 * FontHeight;//18;
            
            //    alert(rPane.width);
       /*      if (aRightMins[i] < aRightMaxs[i]) {
                var tbY = new MyTextBlock(arMyShapes.length, Left + widthLeftY + rPane.width + 2, PaneTop, 3*d, d,
                                "black", "[norm]", "cursor: pointer", "", []);
                arMyShapes.push(tbY);
            }
           if (aLeftMins[i] < aLefMaxs[i]) {
                var tbY = new MyTextBlock(arMyShapes.length, Left + widthLeftY -d + 2, PaneTop, 3 * d, d,
                                "black", "[norm]", "cursor: pointer", "", []);
                arMyShapes.push(tbY);
            }*/

            var tbX = new MyTextBlock(arMyShapes.length, Left + widthLeftY + rPane.width - d, PaneTop, d, d,
                                        "red", "[x]", "cursor: pointer", "", ["tbX",i]);
            arMyShapes.push(tbX);
            var tbB = new MyTextBlock(arMyShapes.length, Left + widthLeftY + rPane.width - 2 * d, PaneTop, d, d,
                            "black", "[b]", "cursor: pointer", "", ["tbB", i]);
            arMyShapes.push(tbB);
            var tbA = new MyTextBlock(arMyShapes.length, Left + widthLeftY + rPane.width - 3 * d, PaneTop, d, d,
                                 "black", "[a]", "cursor: pointer", "", ["tbA", i]);
            arMyShapes.push(tbA);


            PaneTop = PaneTop + PaneHeight;
            listPaneTops.push(PaneTop);
//alert(3);
        }
    }

    // minIndex, maxIndex
    var minIndex = Number.MAX_SAFE_INTEGER;
    var maxIndex = Number.MIN_SAFE_INTEGER;
    // symbols
    for (var i = 0; i < arSymbolPresentation.length; i++) {// parallel list is not drawn
        if (arSymbolList[i] == "") continue;
        var parts = arSymbolPresentation[i].split("!");
        if (parts[7] != "" + nChartToDraw) continue;// do i need it???
    //    if (getVisible(parts[0]) == 0 && parts[6] == "None") continue;
        if (getVisible(parts[0]) == 0) continue;
        var nPane = parts[1] - 1;
        if (dListPanes[nPane] == 0) continue;
        if (arFromSymbolListToAvailableIndex.length <= i) continue;
      //  var iAvlbl = arFromSymbolListToAvailableIndex[i];
        var iAvlbl = findNameInAvailableArray(arSymbolList[i]);////1/11/2018
if (1*iAvlbl == -1 || iAvlbl == undefined) continue;//1/11/218
        var stock = arAvailableStiocks[iAvlbl];
        var N = stock[1].length;
        var startIndex = stock[1][0];//1=open
        if (minIndex > startIndex) minIndex = startIndex;
 //alert("minIndex=" + minIndex);
       // var endIndex = stock[1][N - 1];
        var endIndex = startIndex+N-2;
        if (maxIndex < endIndex) maxIndex = endIndex;
    }
//alert(5);
    // series
    bGoogleFound = false;
    bYahooFound = false;
    bWikiFound = false;
    bParamFound = false;
    bFromToFound = false;
    if (arFromPresentationIndexToSeriesID != null) {
        //alert(40);

        for (var i = 0; i < arFormulaPresentation.length; i++) {
//if (parts[2] == "y(t):x(t)") continue;
            if (arNameFormula[i][0] == "" || arNameFormula[i][1] == "") continue;
            var parts = arFormulaPresentation[i].split("!");
            if (parts[7] != "" + nChartToDraw) continue;// do i need it???
            //      if (getVisible(parts[0]) == 0 && parts[6] == "None") continue;
            if (!bFromToFound) {
                if ((arNameFormula[i][1]).indexOf("FromTo") >= 0) {
                    bFromToFound = true;
                   // alert("FromTo");
                }
            }
            if (getVisible(parts[0]) == 0) continue;
            var nPane = parts[1] - 1;
            if (dListPanes[nPane] == 0) continue;

            if (!bGoogleFound) {
                if ((arNameFormula[i][1]).indexOf("google") >= 0) {
                    bGoogleFound = true;
                }
            }
            if (!bWikiFound) {
                if (
                /*    (arNameFormula[i][1]).indexOf("toO") >= 0
                    || (arNameFormula[i][1]).indexOf("toH") >= 0
                    || (arNameFormula[i][1]).indexOf("toL") >= 0
                    || (arNameFormula[i][1]).indexOf("toC") >= 0
                    || (arNameFormula[i][1]).indexOf("toV") >= 0
                    || (arNameFormula[i][1]).indexOf("toAdj") >= 0*/
                    arNameFormula[i][1][0]=='t' && arNameFormula[i][1][1]=='o'||
                    (arNameFormula[i][1]).indexOf("ephem") >= 0
                    )
                {
                    bWikiFound = true;
                }
            }
            if (!bYahooFound) {
                if ((arNameFormula[i][1]).indexOf("Yahoo") >= 0) {
                    bYahooFound = true;
                }
            }
            if (!bParamFound) {
                if ((arNameFormula[i][1]).indexOf("param") >= 0) {
                    bParamFound = true;
                }
            }

            // alert("i="+i+" arFromPresentationIndexToSeriesID.length=" + arFromPresentationIndexToSeriesID.length);
//show("arFromPresentationIndexToSeriesID", arFromPresentationIndexToSeriesID);
            var id = arFromPresentationIndexToSeriesID[i];////////////////
//alert("id=" + id);
 if (id < 0) continue;
            var arResult = arAllDs[id].result;
            //alert(41);
            ///// 8/30/2017
//alert("arResult.length =" + arResult.length + " arResult[0].length=" + arResult[0].length + " arResult[0][0]=" + arResult[0][0]);
//if (isMatrix(arResult)) alert("arResult is Matrix");
//else alert("arResult is NOT a Matrix");
            if (isMatrix(arResult)) {// Table/matrix ??????????????
//alert("Matrix arResult="+arResult);

                var indexStart = findIndexStartInMatrix(arResult);
//alert("indexStart=" + indexStart);
                /*
                var indexStart = 1;
                var indexEnd = arResult.length;
                var sYmd = "";
                if(arResult.length>1) sYmd+=arResult[1][0];
                var ymd = sYmd.split("-");//var res = str.split("-");
                if (ymd.length == 3) {
                    var year = 1 * ymd[0];
                    var month = 1 * ymd[1];
                    var day = 1 * ymd[2];
                    if (year > 1900 && year < 2200 && month >= 0 && month <= 12 && day > 0 && day <= 31) {
                        indexStart = indexDailyFromDate(sYmd);
                        indexEnd = indexStart + arResult.length - 2;//0
                    }
                }
                else {
                    if (arResult[0][0].length > 0 && isLetter(arResult[0][0][0])) indexEnd--;//////////////////////////////////////////////////
                    }
                //alert("1. before: " + indexStart + " " + indexEnd + " " + sYmd);
                */

                var indexEnd = indexStart + arResult.length - 1;
                if (arResult[0][0].length > 0 && isLetter(arResult[0][0][0])) indexEnd--;


                if (minIndex >= indexStart) minIndex = indexStart;
//alert("1. minIndex=" + minIndex);
                if (maxIndex <= indexEnd) maxIndex = indexEnd;
//alert("matr. minIndex=" + minIndex + " maxIndex=" + maxIndex);
            }
            else ///// 8/30/2017
            {
//alert("NOT a Matrix");
                if (arResult.type != "Table" && arResult.length > 1) {// time series ////   arResult[0].length > 1 && arResult.length > 1
                    //alert("NOT: arResult[0].length=" + arResult[0].length + " arResult.length=" + arResult.length);
                    var indexStart = arResult[0];
                    var indexEnd = indexStart + arResult.length - 2;
                    if (minIndex > indexStart) minIndex = indexStart;
                    if (maxIndex < indexEnd) maxIndex = indexEnd;
//alert("2.minIndex=" + minIndex);
//alert("2. minIndex=" + minIndex + " maxIndex=" + maxIndex);
                }


            }
        }
    }

//alert("3. minIndex=" + minIndex + " maxIndex=" + maxIndex);
    //alert(45);
    if (minIndex == 1 && maxIndex == 1) {//matrex
        nLeftIndex = 1;
        nRightIndex = 1;
    }
    else if (minIndex == Number.MAX_SAFE_INTEGER && maxIndex == Number.MIN_SAFE_INTEGER) {// // constants only
        nLeftIndex = 0;
        // nRightIndex = 1;
        nRightIndex = 0;//////////// 1/9/2017  ??????
    }
    else {
//alert(minIndex + " " + maxIndex + " " + dRightZoom);
        nLeftIndex = Math.floor(minIndex + dLeftZoom * (maxIndex - minIndex));
        nRightIndex = Math.ceil(minIndex + dRightZoom * (maxIndex - minIndex));
   //alert("nLeftIndex=" + nLeftIndex + " nRightIndex=" + nRightIndex);
        if (nLeftIndex == nRightIndex ) {// constants only (1 - for matrices)
            nLeftIndex = 0;
           // nRightIndex = 1;
            nRightIndex = 0;//////////// 1/9/2017  ??????
        }
    }
//alert(nLeftIndex + " " + nRightIndex);
    // Draw X
//document.getElementById("butTrace").value = rX.top;
    DrawXAxis(rPanes, rX, PanesLeft, PanesTop);
    //return;
//alert(60);

    FindMinMaxForPanesAndSeries();
//alert(70);
    // draw Y axis
/*
    List<double> yPosTop = new List<double>();
    List<double> yPosBottom = new List<double>();
    */

    DrawYaxis(PanesLeft);// you'll find out arLeftRightAtans
//alert(80);


    arPixelValueLeft = ["param", PanesLeft + rPanes.width, xLeftParam, 0];// after DrawYaxis it is known



    // Draw All Series And Legends
   DrawAllSeriesAndLegends();
   if (xLeftParam < xRightParam) {
     //  DrawXParamAxis(heightParamX, rPanes, PanesLeft, PanesTop);
   }


    //////////////////////////////////////////////////////////////////////////////
    /*
    var y1 = listPanes[0].top;
    var n = listPanes.length;
    var y2 = listPanes[n - 1].top + listPanes[n - 1].height;
    var rZoom = new MyRectangle(arMyShapes.length, 0, y1, 1, y2 - y1, "grey", "black", 0.5, "", []);
    rZoom.opacity = 0.0;
    arMyShapes.push(rZoom);
    ///////////////////////
    var rMarker = new MyRectangle(arMyShapes.length, 0, y1, 1, y2 - y1, "grey", "red", 0.5, "", []);
    rMarker.opacity = 0.0;
    arMyShapes.push(rMarker);
    ///////////////////////
    var tbMarker = new MyTextBlock(arMyShapes.length, 0, 0, 1, 1,
                                        "red", "", "cursor: auto", "", []);
    tbMarker.opacity = 0.0;
    arMyShapes.push(tbMarker);
    ///////////////////
    drawMyShapes();
    */
   var sButTrace = document.getElementById("butTrace").value;// "Hide" or "Trace"
   nMarkerIndex = Math.round(nLeftIndex + xPosShare * (nRightIndex - nLeftIndex));
   xPosShare = (nMarkerIndex - nLeftIndex) / (nRightIndex - nLeftIndex);
   var xPosShare1 = (nMarkerIndex-1 - nLeftIndex) / (nRightIndex - nLeftIndex);
   var xTrace = listLeftTopPanes[0][0] + xPosShare1 * listPanes[0].width + listPanes[0].width / (nRightIndex - nLeftIndex);
   var k = listPanes.length;
   var y = listLeftTopPanes[0][1] + yPosShare * (listLeftTopPanes[k - 1][1] + listPanes[k - 1].height - listLeftTopPanes[0][1]);

   var y1 = listPanes[0].top;
   var n = listPanes.length;
   var y2 = listPanes[n - 1].top + listPanes[n - 1].height;
   var rZoom = new MyRectangle(arMyShapes.length, 0, y1, 1, y2 - y1, "grey", "black", 0.5, "", ["moving"]);
    //  rZoom.opacity = 0.0;
   arMyShapes.push(rZoom);
    ///////////////////////
   var plMarker = new MyPolyline(arMyShapes.length, xTrace, y1 + FontHeight + deltaTop, listPanes[0].width / 2, y2 - y1,
               nLeftIndex, nRightIndex, 0, 1, [], "Yes", "Line", "Solid", "magenta", 1, "n", [sButTrace]);//placeholder
    //    plMarker.opacity = 0.0;
   arMyShapes.push(plMarker);
    ///////////////////////
   var tbMarker = new MyTextBlock(arMyShapes.length, xTrace, y, 40, 40,
                                        "black", sMarkerMessage, "", "", [sButTrace]);
    //    tbMarker.opacity = 0.0;
   arMyShapes.push(tbMarker);
    ///////////////////
    //  alert("1. arPixelValueLeft[0]=" + arPixelValueLeft[0] + " arPixelValueLeft[1]=" + arPixelValueLeft[1]);
   drawMyShapes();
}
function isMatrix(arResult) {   
    if (arResult == undefined || arResult[0] == undefined) return false;
    if (arResult[0].length >= 1 && arResult.length >= 1 && arResult[0][0] != 'x') return true;
    else return false;
}
/*
function needToShowParamX() {
    for (var i = 0; i < arLinesWithParam.length; i++) {
        var parts = arSymbolPresentation[i].split("!");
        var dVisible =getVisible(parts[0]);
        if (dVisible != "No") return true;
    }
    return false;
}
*/
function DrawAllSeriesAndLegends() {

    var controlLeft = listLeftTopPanes[0][0];
    var listRightEdgeLegend = [];
    for (var i = 0; i < listPanes.length; i++){
        listRightEdgeLegend.push(controlLeft);
    }

 //   alert("arSymbolPresentation=" + arSymbolPresentation + "arSymbolList=" + arSymbolList);
    //legends for symbols "Yes!1!Right!Line!1!Solid!Long!1!#000000";
 //   for (var i = 0; i < arSymbolList.length; i++) {
  //      arFromSymbolListToAvailableIndex[i] = findNameInAvailableArray(arSymbolList[i]);////1/11/2018
 //   }
    for (var i = 0; i < arSymbolPresentation.length; i++) {// parallel list is not drawn
        if (arSymbolList[i] == "") continue;

        var parts = arSymbolPresentation[i].split("!");
        if (parts[7] != "" + nChartToDraw) continue;// do i need it???
        var dVisible =getVisible(parts[0]);
     //   if ( dVisible== 0 && parts[6] == "None") continue;
        var nPane = parts[1] - 1;
        if (dListPanes[nPane] == 0) continue;
//alert(" arFromSymbolListToAvailableIndex=" + arFromSymbolListToAvailableIndex + " i=" + i + " arFromSymbolListToAvailableIndex[i]=" + arFromSymbolListToAvailableIndex[i]);
        //if (arFromSymbolListToAvailableIndex[i] == undefined) continue;

    if (arFromSymbolListToAvailableIndex.length <= i) continue;// ?????????????????????????????????????// by definiton never happems?

    var charYScale = "n";


        var iAvlbl = findNameInAvailableArray(arSymbolList[i]);////1/11/2018
//alert("arSymbolList[i]=" + arSymbolList[i] + " arAvailableStiocks[iAvlbl][0][0]=" + arAvailableStiocks[iAvlbl][0][0] + " arSymbolPresentation[i]=" + arSymbolPresentation[i]);


       // var iAvlbl = arFromSymbolListToAvailableIndex[i];
if (1*iAvlbl == -1 || iAvlbl==undefined) continue;//1/11/218
      //  if (iAvlbl == undefined) continue;
//alert("iAvlbl=" + iAvlbl);

        var stock = arAvailableStiocks[iAvlbl];
        var sName = stock[0][0];
//alert("sName=" + sName);
        var N = 1*stock[1].length;
        var startIndex = stock[1][0];//1=open
        var endIndex = startIndex+N-2;
        var sLegend = parts[6];
        var sSolid = parts[5];
        var sColor = parts[8];
        var sLineBarHstgm = parts[3];
        var sLeftRight = parts[2];
        var dWidth = parts[4];
        var sLeg = " "+sName;
        if (sLeftRight == "Left") {
            sLeg = " < " + sName;
            charYScale = arLeftRightAtans[0][nPane];
        }
        else if (sLeftRight == "Right") {
            sLeg = " > " + sName;
            charYScale = arLeftRightAtans[1][nPane];
        }
        if (sLegend == "Long") sLeg = sLeg + ": " + BuildString(1*stock[4][N - 1]);
        if (sLegend != "None")
        {
            var dSpace = 16;
            ///// draw Legnd
            var left = listRightEdgeLegend[nPane] + 2;
            var top = listLeftTopPanes[nPane][1] + 2;
            ctx.font = "13px serif";
            var sz = ctx.measureText(sLeg);
         //   sz = ctx.measureText(sLeg);
//alert(sLeg + ":nPane=" + nPane + " left=" + left + " top=" + top + " sz.width=" + sz.width + " FontHeight=" + FontHeight);
            var tbLegend = new MyTextBlock(arMyShapes.length, left, top, sz.width, FontHeight,
                            sColor, sLeg, "cursor: pointer", "", ["legend","symbol",i]);
            arMyShapes.push(tbLegend);


               // var arInfo=[i]

            listRightEdgeLegend[nPane] = listRightEdgeLegend[nPane] + sz.width + dSpace;
            //alert(2);
        }

        if (dVisible == "No") continue;
        // min, max
        var yMin = Number.MAX_VALUE;
        var yMax = -Number.MAX_VALUE;
        if (sLeftRight == "Left") {
            yMin = aLeftMins[nPane];
            yMax = aLeftMaxs[nPane];
        }
        else if (sLeftRight == "Right") {
            yMin = aRightMins[nPane];
            yMax = aRightMaxs[nPane];
        }
        else {
            yMin = arSymbolMin[i];
            yMax = arSymbolMax[i];
        }
        var plSymb = new MyPolyline(arMyShapes.length, listLeftTopPanes[nPane][0], listLeftTopPanes[nPane][1] + FontHeight + deltaTop, listPanes[nPane].width, listPanes[nPane].height - FontHeight - deltaTop - deltaBottom,
            nLeftIndex, nRightIndex, yMin, yMax, stock, dVisible, sLineBarHstgm, sSolid, sColor, dWidth, charYScale, ["symbol"]);
        arMyShapes.push(plSymb);
    }// end symbols

    // Now formulas
    //legends for series "Yes!1!Right!Line!1!Solid!Long!1!#000000";
    if (arFromPresentationIndexToSeriesID != null) {
        for (var i = 0; i < arFormulaPresentation.length; i++) {
            if (arNameFormula[i][0] == "" || arNameFormula[i][1] == "") continue;
            var parts = arFormulaPresentation[i].split("!");
            if (parts[7] != "" + nChartToDraw) continue;// do i need it???
            var dVisible = getVisible(parts[0]);
   //         if (dVisible == 0 && parts[6] == "None") continue;


            var nPane = parts[1] - 1;
            if (dListPanes[nPane] == 0) continue;

            var id = arFromPresentationIndexToSeriesID[i];
            if (id < 0) continue;
            var charYScale = "n";
            var sLegend = parts[6];
            var sSolid = parts[5];
            var sColor = parts[8];
            var sLineBarHstgm = parts[3];
            var sLeftRight = parts[2];
            var dWidth = parts[4];

            var arResult = arAllDs[id].result;
//alert("arResult.length=" + arResult.length + " arResult[0][0]=" + arResult[0][0]);
            var arResult1 = arResult;
            var ar3 = ["series"];
            if (arResult.length == 2 && arResult[0][0] == "x") {
//alert("param");
                arResult1 = arResult[1];
                ar3.push(arResult.xMin);
                ar3.push(arResult.xMax);
//alert("arResult.xMin=" + arResult.xMin + " arResult.xMax=" + arResult.xMax);
            }
            
            //   legend /////////////////////////////////
            var sName = arNameFormula[i][0];

            var N = arResult1.length;
            var startIndex = arResult1[0];
            var endIndex = startIndex + N - 2;
            var sLeg = " " + sName;
            if (sLeftRight == "Left") {
                sLeg = " < " + sName;
                charYScale = arLeftRightAtans[0][nPane];
            }
            else if (sLeftRight == "Right") {
                sLeg = " > " + sName;
                charYScale = arLeftRightAtans[1][nPane];
            }
            if (!(arResult.length == 2 && arResult[0][0] == "x")) {//not a tweaker
                if (sLegend == "Long") {
                    if (isMatrix(arResult)) {
//alert("arResult1.length="+arResult1.length);
                        sLeg = sLeg + ": " + BuildString(1 * arResult1[N - 1][arResult1[0].length-1]);
                    }else sLeg = sLeg + ": " + BuildString(1 * arResult1[N - 1]);
                }
            }
            
            if (sLegend != "None") {
                var dSpace = 16;
                ///// draw Legnd
                var left = listRightEdgeLegend[nPane] + 2;
                var top = listLeftTopPanes[nPane][1] + 2;
                ctx.font = "13px serif";
                var sz = ctx.measureText(sLeg);
              //  sz = ctx.measureText(sLeg);
  // alert(sLeg + ":nPane=" + nPane + " left=" + left + " top=" + top + " sz.width=" + sz.width + " FontHeight=" + FontHeight);
                var tbLegend = new MyTextBlock(arMyShapes.length, left, top, sz.width, FontHeight,
                                sColor, sLeg, "cursor: pointer", "", ["legend", "formula", i]);//hand
                arMyShapes.push(tbLegend);

                    if (!(arResult.length == 2 && arResult[0][0] == "x")) {//not a tweaker
                    // tweaks arFormulaParts[i] {//text+[+number+]+text+[number+]+text
                        var ar = arFormulaParts[i]; ////text+[+number+]+text+[number+]+text+[+number+]+text 2,6,10,..
//alert("i="+i+" ar="+ar);
    //alert("ar.length=" + ar.length);
                    var newLeft = left + sz.width;
                    for (var n = 2; n < ar.length; n = n + 4) {
    // alert(ar[n]);
                        var sText = ": " + ar[n];
                        var szN = ctx.measureText(sText);
                        var tbTweak = new MyTextBlock(arMyShapes.length, newLeft, top, szN.width, FontHeight,
                                        sColor,sText, "", "", []);
                        arMyShapes.push(tbTweak);
                        newLeft += szN.width;

                        var szW = FontHeight/1.3;
                        var pgDown = new MyPolygon(arMyShapes.length, newLeft, top + FontHeight / 2 + 1.5, szW, FontHeight / 2, sColor, "cursor: pointer", [i, n - 1]);
                        arMyShapes.push(pgDown);
                        var pgUp = new MyPolygon(arMyShapes.length, newLeft, top, szW, FontHeight / 2 -0.5, sColor, "cursor: pointer", [i, n + 1]);
                        arMyShapes.push(pgUp);
                        newLeft += szW;
                    }
                }



                listRightEdgeLegend[nPane] = newLeft + dSpace;

            }


            if (dVisible=="No") continue;
            // min, max //////////////////// polyline
            var yMin = Number.MAX_VALUE;
            var yMax = -Number.MAX_VALUE;
            if (sLeftRight == "Left") {
                yMin = aLeftMins[nPane];
                yMax = aLeftMaxs[nPane];
            }
            else if (sLeftRight == "Right") {
                yMin = aRightMins[nPane];
                yMax = aRightMaxs[nPane];
            }
            else {
                yMin = arSeriesMin[i];
                yMax = arSeriesMax[i];
            }

//alert("yMin=" + yMin + " yMax=" + yMax);
            var ar = arAllDs[id].result;
     //       alert("ar.length =" + ar.length + " ar[0].length=" + ar[0].length + " ar[0][0]=" + ar[0][0]);
          //?????????????? 8/30/2017  last column of the table
            if (isMatrix(ar)) {//?????????????? 8/30/2017
                var len = ar[0].length;
           /*     var indexStart = 1;
              //  var indexEnd = ar.length;
                var sYmd = "" + ar[1][0];
                var ymd = sYmd.split("-");//var res = str.split("-");
                if (ymd.length == 3) {
                    var year = 1 * ymd[0];
                    var month = 1 * ymd[1];
                    var day = 1 * ymd[2];
                    if (year > 1900 && year < 2200 && month >= 0 && month <= 12 && day > 0 && day <= 31) {
                        //alert(year+" "+month+" "+day+" "+indexDailyFromDate(sYmd));
                        indexStart = indexDailyFromDate(sYmd);
                      //  indexEnd = indexStart + ar.length - 2;//0
                    }
                }*/
                var indexStart = findIndexStartInMatrix(ar);

                var b = [indexStart];
                var kStart = 0;

//alert("1.ar=" + ar);
if (!(ar.length == 1 && isLetter(ar[0][0][0]))) {
//alert("2.ar=" + ar);
    if (ar[0][0].length > 0 && isLetter(ar[0][0][0])) kStart = 1;
    //  if (isNaN(ar[0][0])) kStart = 1;  
    //alert("kStart="+kStart+" ar[kStart][len - 1]="+ar[kStart][len - 1]);

    for (var k = kStart; k < ar.length; k++) {
        b.push(ar[k][len - 1]);
    }
    ar = b;//????????????  8/30/2017

    if (b.length == 2) ar = [b[1]];
}
else ar = ["a","b","c"];// arbitrary - jus to avoid drawing cols names 12/22 2017



//alert("3.ar="+ar);
                //       alert("2. ar=" + ar );
                //       alert(" nLeftIndex=" + nLeftIndex + " nRightIndex=" + nRightIndex);

            }
            //?????????????? 8/30/2017
//alert("2.ar=" + ar);
            var plSymb = new MyPolyline(arMyShapes.length,  listLeftTopPanes[nPane][0], listLeftTopPanes[nPane][1] + FontHeight + deltaTop, listPanes[nPane].width, listPanes[nPane].height - FontHeight - deltaTop - deltaBottom,
               //nLeftIndex, nRightIndex, yMin, yMax, arAllDs[id].result, dVisible, sLineBarHstgm, sSolid, sColor, dWidth, charYScale, ar3);
               nLeftIndex, nRightIndex, yMin, yMax, ar, dVisible, sLineBarHstgm, sSolid, sColor, dWidth, charYScale, ar3);
            arMyShapes.push(plSymb);
        }
    }
    
}
function DrawYaxis(PanesLeft) {
    yPosTop = new Array();
    yPosBottom = new Array();
    for (var i = 0; i < listPanes.length; i++)// maybe dListPanes
    {
        yPosTop.push(-Number.MAX_VALUE);
        yPosBottom.push(Number.MAX_VALUE);
    }
  //  var deltaTop = 3;
  //  var deltaBottom = 3;
    for (var i = 0; i < listPanes.length; i++) {
        if (listPanes[i].height == 0) continue;

        //   alert(" listPaneTops.length=" + listPaneTops.length);

        var controlTop = listPaneTops[i];
        var controlLeft = PanesLeft;

   //     var top = controlTop + heightLegend;//FontHeight
        var top = controlTop + FontHeight;
        var bottom = controlTop + listPanes[i].height;
        yPosTop[i] = top + deltaTop;
        yPosBottom[i] = bottom - deltaBottom;
        //right
        var xPos = controlLeft + listPanes[i].width;
        if (bShowRightY) {
            //  alert(aRightMaxs[i]);
            //   alert(aRightMaxs[i] +" "+ -Number.MAX_VALUE); 
            if (aRightMaxs[i] > -Number.MAX_VALUE) {
                var yPos = top + deltaTop;////
                ctx.font = "13px serif";
                var sText=BuildString(aRightMaxs[i]);   
                var sz = ctx.measureText(sText);
                //alert("2.drawYaxis" + aRightMaxs[i]+" "+sz.width+" "+ sz.height);
                var tbMax = new MyTextBlock(arMyShapes.length, xPos + 2, yPos, sz.width, FontHeight,
                        "black", sText, "cursor: pointer", "leftTop", ["yScale", 1, i]);
                arMyShapes.push(tbMax);
                //  alert("3.drawYaxis" + aRightMaxs[i]);
  
            }
            //alert(aRightMins[i] + " " + Number.MAX_VALUE);
            if (aRightMins[i] < Number.MAX_VALUE) {

                var yPos = bottom - deltaBottom;
                ctx.font = "13px serif";
                var sText = BuildString(aRightMins[i]);
                //alert(sText);
                var sz = ctx.measureText(sText);
                //alert("2.drawYaxis" + aRightMins[i] + " " + sz.width + " " + FontHeight);
                var tbMin = new MyTextBlock(arMyShapes.length, xPos + 2, yPos - FontHeight, sz.width, FontHeight,
                            "black", sText, "cursor: pointer", "leftBottom", ["yScale", 1, i]);
                arMyShapes.push(tbMin);
            }  
        }
        //left
        if (bShowLeftY) {//???
            xPos = controlLeft;
            if (aLeftMaxs[i] > -Number.MAX_VALUE) {
                var yPos = top + deltaTop;////
                ctx.font = "13px serif";
                var sText = BuildString(aLeftMaxs[i]);
                var sz = ctx.measureText(sText);
                //alert("2.drawYaxis" + aRightMaxs[i]+" "+sz.width+" "+ sz.height);
                var tbMax = new MyTextBlock(arMyShapes.length, xPos - 2 - sz.width, yPos, sz.width, FontHeight,
                       "black", sText, "cursor: pointer", "rightTop", ["yScale", 0, i]);
                arMyShapes.push(tbMax);
                //  alert("3.drawYaxis" + aRightMaxs[i]);
            }
            //alert(aRightMins[i] + " " + Number.MAX_VALUE);
            if (aLeftMins[i] < Number.MAX_VALUE) {
                var yPos = bottom - deltaBottom;
                ctx.font = "13px serif";
                var sText = BuildString(aLeftMins[i]);
                //alert(sText);
                var sz = ctx.measureText(sText);
                //alert("2.drawYaxis" + aRightMins[i] + " " + sz.width + " " + FontHeight);
                var tbMin = new MyTextBlock(arMyShapes.length, xPos - 2 - sz.width, yPos - FontHeight, sz.width, FontHeight,
                            "black", sText, "cursor: pointer", "rightBottom", ["yScale", 0, i]);
                arMyShapes.push(tbMin);
            }
        }
        //////////////////
        var d = 1.2 * FontHeight;//18;
        var charLeftAtan = arLeftRightAtans[0][i];//"n","l", or "a"
        var sLeftAtan = "";
        if (charLeftAtan == "l") sLeftAtan = "[log10]";
        if (charLeftAtan == "a") sLeftAtan = "[atan]";
 //alert("charLeftAtan=" + charLeftAtan + " sLeftAtan=" + sLeftAtan + " arLeftRightAtans[0]=" + arLeftRightAtans[0] + " arLeftRightAtans[1]=" + arLeftRightAtans[1]);
        if (aLeftMins[i] <= aLeftMaxs[i]) {// == for constants
            var tbY = new MyTextBlock(arMyShapes.length, Left+widthY-2*d-6, top - FontHeight, 3 * d, d,
                              // "black", sLeftAtan, "cursor: pointer", "", ["yScale", 0, i]);
                                "magenta", sLeftAtan, "cursor: pointer", "", ["yScale", 0, i]);
                arMyShapes.push(tbY);
        }
     
        var charRightAtan = arLeftRightAtans[1][i];//"n","l", or "a"
        var sRightAtan = "";
        if (charRightAtan == "l") sRightAtan = "[log10]";
        if (charRightAtan == "a") sRightAtan = "[atan]";
//alert("charRightAtan=" + charRightAtan + " sRightAtan=" + sRightAtan + " arLeftRightAtans[0]=" + arLeftRightAtans[0] + " arLeftRightAtans[1]=" + arLeftRightAtans[1]);
        if (aRightMins[i] <= aRightMaxs[i]) {// == for constants
            var tbY = new MyTextBlock(arMyShapes.length, controlLeft + listPanes[i].width + 2 , top - FontHeight, 3 * d, d,
                                //"black", sRightAtan, "cursor: pointer", "", ["yScale", 1, i]);
                                "magenta", sRightAtan, "cursor: pointer", "", ["yScale", 1, i]);

           // "black", "proba", "cursor: pointer", "", ["yScale", 1, i]);
            arMyShapes.push(tbY);
//alert("done");
        }
//alert(charLeftAtan + " " + charRightAtan);
    }
}
function DrawXAxis(rPanes, rX, PanesLeft, PanesTop) {

    bHidden = false;
    if (arNameFormula != null) {
        for (var n = 0; n < arFunctionNames.length; n++) {
            for (var i = 0; i < arNameFormula.length; i++) {
                //alert("arNameFormula[i]="+arNameFormula[i]);
                if (arNameFormula[i][1].indexOf(arFunctionNames[n]) >= 0) {
                    bHidden = true;
                    break;
                }
            }
        }
    }


     ctx.font = "13px serif";
    var top = PanesTop + rPanes.height;
 //   if (sFrequencyRange == "daily") {
    if (arSymbolPresentation.length > 0 || bYahooFound || bWikiFound || bGoogleFound || bHidden) {

//alert("nRightIndex=" + nRightIndex + " sLeftDate" + sLeftDate);

        sLeftDate = dateDailyFromIndex(nLeftIndex);
        sRightDate = dateDailyFromIndex(nRightIndex);

        var szDate = ctx.measureText(sRightDate);
        var tbXLeft = new MyTextBlock(arMyShapes.length, PanesLeft, top, szDate.width, rX.height,
                                    "black", sLeftDate, "", "topLeft", []);
        if (2 * szDate.width < rPanes.width) {
            arMyShapes.push(tbXLeft);
        }
        //alert("Date: "+xLeft + " " + xRight + " " + sLeftDate + " " + sRightDate + " " + top);
        var tbXRight = new MyTextBlock(arMyShapes.length, PanesLeft + rPanes.width - szDate.width, top, szDate.width, rX.height,
                            "black", sRightDate, "", "topRight", []);
        arMyShapes.push(tbXRight);
    }
    else {
        /*
        if (bGoogleFeed) {
            alert("nLeftIndex=" + nLeftIndex + " nGlobalShift=" + nGlobalShift);
            nLeftIndex -= nGlobalShift;
            nRightIndex -= nGlobalShift;
        }
        */
        var sLeftDate = "" + nLeftIndex;
        var sRightDate = "" + nRightIndex;

//alert("nRightIndex=" + nRightIndex + " sRightDate" + sRightDate);


        if (bFromToFound) {

            var xLeft = From + nLeftIndex * Step;
            var xRight = From + nRightIndex * Step;
            sLeftDate += " or " + BuildString(xLeft);
            sRightDate += " or " + BuildString(xRight);
        }

//alert("sLeftDate=" + sLeftDate + " sRightDate=" + sRightDate);
        if (arSymbolPresentation.length > 0 || bYahooFound || bWikiFound || bGoogleFound) top += FontHeight;
        var szDate = ctx.measureText(sRightDate);
        var tbXLeft = new MyTextBlock(arMyShapes.length, PanesLeft, top, szDate.width, rX.height,
                                    "black", sLeftDate, "", "topLeft", []);
        if (2 * szDate.width < rPanes.width) {
            arMyShapes.push(tbXLeft);
        }
    //alert("FroTo: " + xLeft + " " + xRight + " " + sLeftDate + " " + sRightDate + " " + top);
        var tbXRight = new MyTextBlock(arMyShapes.length, PanesLeft + rPanes.width - szDate.width, top, szDate.width, rX.height,
                            "black", sRightDate, "", "topRight", []);
        arMyShapes.push(tbXRight);


        //alert("sLeftDate=" + sLeftDate + " sRightDate=" + sRightDate);
    }


   // alert("X end");

}
function DrawXParamAxis(heightParamX, rPanes, PanesLeft, PanesTop) {
   // DrawXAxis(rPanes, rX, PanesLeft, PanesTop+heightParamX);
    
    //  alert("3. arPixelValueLeft[0]=" + arPixelValueLeft[0] + "  arPixelValueLeft[1]=" + arPixelValueLeft[1]);
 //   alert("DrawXParamAxis: arPixelValueLeft[1]=" + arPixelValueLeft[1]);

    var sLeft = BuildString(1 * arPixelValueLeft[2]) + ": param";
  //  var sLeft = BuildString(1 * arPixelValueLeft[1]) + ": param";
    var sRight = "param: " + BuildString(xRightParam);

    //alert(sLeft + " " + sRight);
 
    ctx.font = "13px serif";
    var szLeft = ctx.measureText(sLeft);
    var szRight = ctx.measureText(sRight);

   // alert(szLeft.width + " " + szRight.width);

    var top = PanesTop + rPanes.height + heightParamX;

    var xWhereRightStarts = rPanes.width - szRight.width;
    arPixelValueLeft[3] = xWhereRightStarts;
   // arPixelValueLeft[2] = xWhereRightStarts;

    var tbLeft = new MyTextBlock(arMyShapes.length, arPixelValueLeft[1], top, szLeft.width, heightParamX,
   // var tbLeft = new MyTextBlock(arMyShapes.length, arPixelValueLeft[0], top, szLeft.width, heightParamX,
                                "black", sLeft, "", "topLeft", arPixelValueLeft);

 //   if (szLeft.width + szRight.width < rPanes.width) {//arPixelValueLeft[0]+
        arMyShapes.push(tbLeft);
//    }

    var tbRight = new MyTextBlock(arMyShapes.length, PanesLeft + rPanes.width - szRight.width, top, szRight.width, heightParamX,
                        "black", sRight, "", "topRight", []);
     arMyShapes.push(tbRight);
 /*    */
}
function FindMinMaxForPanesAndSeries() {
    
    //alert("FindMinMaxForPanesAndSeries");
    xLeftParam=Number.MAX_VALUE;//param
    xRightParam=-Number.MAX_VALUE;//param
    aXMins = [];
    aXMaxs = [];
    aYMins = [];
    aYMaxs = [];
    aLeftMins = [];
    aRightMins = [];
    aLeftMaxs = [];
    aRightMaxs = [];
    for (var iP = 0; iP < listPanes.length; iP++)
    {
        aXMins.push(Number.MAX_VALUE);
        aXMaxs.push(-Number.MAX_VALUE);
        aYMins.push(Number.MAX_VALUE);
        aYMaxs.push(-Number.MAX_VALUE);
        aLeftMins.push(Number.MAX_VALUE);
        aRightMins.push(Number.MAX_VALUE);
        aLeftMaxs.push(-Number.MAX_VALUE);
        aRightMaxs.push(-Number.MAX_VALUE);
    }
    arSymbolMin = [];
    arSymbolMax = [];
 //   arSeriesMin = [];
 //  arSeriesMax = [];

   // symbols "Yes!1!Right!Line!1!Solid!Long!1!#000000";
    for (var i = 0; i < arSymbolPresentation.length; i++) {
        arSymbolMin.push(Number.MAX_VALUE);
        arSymbolMax.push(-Number.MAX_VALUE);
    }
    for (var i = 0; i < arSymbolPresentation.length; i++) {// parallel list is not drawn
  //      var dL=Number.MAX_VALUE;////////////////
  //      var dH=-Number.MAX_VALUE;/////////////
        if (arSymbolList[i] == "") continue;
        var parts = arSymbolPresentation[i].split("!");
        if (parts[7] != "" + nChartToDraw) continue;// do i need it???
    //    if (getVisible(parts[0]) == 0 && parts[6] == "None") continue;
        if (getVisible(parts[0]) == 0 ) continue;
        var nPane = 1*parts[1] - 1;
        if (dListPanes[nPane] == 0) continue;
        if (arFromSymbolListToAvailableIndex.length <= i) continue;
        var sLeftRight = parts[2];
        var iAvlbl = findNameInAvailableArray(arSymbolList[i]);////1/11/2018
       // var iAvlbl = 1 * arFromSymbolListToAvailableIndex[i];
if (1*iAvlbl == -1 || iAvlbl == undefined) continue;//1/11/218
        var stock = arAvailableStiocks[iAvlbl];
        if (parts[3] == "Bar") {
     //       var lowMin = FindMin(nLeftIndex, nRightIndex, stock[3]);
     //       var highMax = FindMax(nLeftIndex, nRightIndex, stock[2]);
     //       dL = Math.min(dL, lowMin);
            //       dH = Math.max(dH, highMax);
            var dL = FindMin(nLeftIndex, nRightIndex, stock[3]);
            var dH = FindMax(nLeftIndex, nRightIndex, stock[2]);
        }
        else {
            var closeMinMax = FindMinMax(nLeftIndex, nRightIndex, stock[4]);
      //      dL = Math.min(dL, closeMinMax[0]);
            //      dH = Math.max(dH, closeMinMax[1]);
            var dL = closeMinMax[0];
            var dH = closeMinMax[1];
            if (parts[3] == "Hstgm") {
                dL = Math.min(dL, 0);
                dH = Math.max(dH, 0);
            }
            if (parts[3] == "Edge") {
                dL = Math.min(dL, 0);
                dH = Math.max(dH, 0);
            }
        }

        if (sLeftRight == "Left") {
            if (aLeftMins[nPane] > dL) aLeftMins[nPane] = dL;
            if (aLeftMaxs[nPane] < dH) aLeftMaxs[nPane] = dH;
        }
        else if (sLeftRight == "Right") {
            if (aRightMins[nPane] > dL) aRightMins[nPane] = dL;
            if (aRightMaxs[nPane] < dH) aRightMaxs[nPane] = dH;
      //      alert("nPane="+nPane+" dL=" + dL + " dH=" + dH);
     //       alert("nPane=" + nPane + " aRightMins[nPane] = " + aRightMins[nPane] + " aRightMaxs[nPane] = " + aRightMaxs[nPane]);
        }
        else if (sLeftRight == "None") {
            if (arSymbolMin[i] > dL) arSymbolMin[i] = dL;
            if (arSymbolMax[i] < dH) arSymbolMax[i] = dH;
        }

    }

    ////////////////////////////////////////////////////////////
    arSeriesMin = [];
    arSeriesMax = [];
    // series "Yes!1!Right!Line!1!Solid!Long!1!#000000";
    if (arFromPresentationIndexToSeriesID != null) {//???????
 //       var dL = Number.MAX_VALUE;/////////////////////////////
//        var dH = -Number.MAX_VALUE;//////////////////////

        for (var i = 0; i < arFormulaPresentation.length; i++) {
            arSeriesMin.push(Number.MAX_VALUE);
            arSeriesMax.push(-Number.MAX_VALUE);
        }
        for (var i = 0; i < arFormulaPresentation.length; i++) {
            if (arNameFormula[i][0] == "" || arNameFormula[i][1] == "") continue;
            var parts = arFormulaPresentation[i].split("!");
            if (parts[7] != "" + nChartToDraw) continue;// do i need it???
      //      if (getVisible(parts[0]) == 0 && parts[6] == "None") continue;
            if (getVisible(parts[0]) == 0) continue;
            var nPane = 1*parts[1] - 1;
            if (dListPanes[nPane] == 0) continue;
            var sLeftRight = parts[2];
            var id = 1*arFromPresentationIndexToSeriesID[i];
            if (id < 0) continue;
            var dL = 0;
            var dH = 0;
            var ar = arAllDs[id].result;


            if (ar.length == 2 && ar[0][0] == "x") {//param
                if (aXMins[nPane] > arAllDs[id].result.xMin) aXMins[nPane] = arAllDs[id].result.xMin;
                if (aXMaxs[nPane] < arAllDs[id].result.xMax) aXMaxs[nPane] = arAllDs[id].result.xMax;
                if (aYMins[nPane] > arAllDs[id].result.yMin) aYMins[nPane] = arAllDs[id].result.yMin;
                if (aYMaxs[nPane] < arAllDs[id].result.yMax) aYMaxs[nPane] = arAllDs[id].result.yMax;

                if (xLeftParam > arAllDs[id].result.xMin) {
                    xLeftParam = arAllDs[id].result.xMin;
                    nLeftParamPane = nPane;
                }
                if (xRightParam < arAllDs[id].result.xMax) xRightParam = arAllDs[id].result.xMax;
//alert("nPane=" + nPane + " aXMins[nPane]=" + aXMins[nPane] + " aXMaxs[nPane]=" + aXMaxs[nPane] + "nPane=" + nPane + " aYMins[nPane]=" + aYMins[nPane] + " aYMaxs[nPane]=" + aYMaxs[nPane]);
                dL = arAllDs[id].result.yMin;
                dH = arAllDs[id].result.yMax;
             //   alert("dL=" + dL + " dH=" + dH);
            }
            else {

                if (isMatrix(ar)) {//?????????????? 8/30/2017
                    var len = ar[0].length;
                  /*  var indexStart = 1;
               //     var indexEnd = ar.length;
                    var sYmd = "" + ar[1][0];
                    var ymd = sYmd.split("-");//var res = str.split("-");
                    if (ymd.length == 3) {
                        var year = 1 * ymd[0];
                        var month = 1 * ymd[1];
                        var day = 1 * ymd[2];
                        if (year > 1900 && year < 2200 && month >= 0 && month <= 12 && day > 0 && day <= 31) {
                            //alert(year+" "+month+" "+day+" "+indexDailyFromDate(sYmd));
                            indexStart = indexDailyFromDate(sYmd);
                   //         indexEnd = indexStart + ar.length - 2;//0
                        }
                    }*/
                    var indexStart = findIndexStartInMatrix(ar);
//alert("3. indexStart=" + indexStart);

                    var b = [indexStart];
                    var kStart = 0;
                    if (ar[0][0].length > 0 && isLetter(ar[0][0][0])) kStart = 1;//
                //    if (isNaN(ar[0][0])) kStart = 1;
                    for (var k = kStart; k < ar.length; k++) {
                        b.push(ar[k][len - 1]);
                    }
                    ar = b;//????????????  8/30/2017
//alert("2. ar=" + ar );
             //       alert(" nLeftIndex=" + nLeftIndex + " nRightIndex=" + nRightIndex);
                }
//alert("3. ar=" + ar );

                var seriesMinMax = FindMinMax(nLeftIndex, nRightIndex, ar);
        //         dL = Math.min(dL, seriesMinMax[0]);////////////
                //          dH = Math.max(dH, seriesMinMax[1]);/////////////////
                dL = seriesMinMax[0];////////////
                dH = seriesMinMax[1];////////////                
//alert(" dL=" + dL + " dH=" + dH);

            }
       
//if (ar[0].length > 1 && ar.length > 1 && ar[0][0] == 'x') alert("dL=" + dL + " dH=" + dH);
 //alert("dL=" + dL + " dH=" + dH);
            if (parts[3] == "Hstgm") {
                dL = Math.min(dL, 0);
                dH = Math.max(dH, 0);
            }
            if (parts[3] == "Edge") {
                dL = Math.min(dL, 0);
                dH = Math.max(dH, 0);
            }
            if (sLeftRight == "Left") {
                if (aLeftMins[nPane] > dL) aLeftMins[nPane] = dL;
                if (aLeftMaxs[nPane] < dH) aLeftMaxs[nPane] = dH;
            }
            else if (sLeftRight == "Right") {
                if (aRightMins[nPane] > dL) aRightMins[nPane] = dL;
                if (aRightMaxs[nPane] < dH) aRightMaxs[nPane] = dH;
//lert("nPane="+nPane+" aRightMins[nPane]="+aRightMins[nPane] + " dL=" + dL);
            }
            else if (sLeftRight == "None") {
//alert(63);

                if (arSeriesMin[i] > dL) arSeriesMin[i] = dL;
                if (arSeriesMax[i] < dH) arSeriesMax[i] = dH;
//alert(64);
            }

//if (nPane > 0) alert("2. i=" + i + " nPane=" + nPane + " " + aRightMins[1] + " " + aRightMaxs[1]);
        }
    }

}
function findIndexStartInMatrix(ar) {
  //  alert("ar=" + ar);
  //  alert("ar.length=" + ar.length);
    if (ar.length == 1 ) return 1;
    var sign = 1;
    var indexStart = 1;
    //     var indexEnd = ar.length;
    var s="" + ar[1][0];
    if (s[0] == 'r' && s[1] == 'o' && s[2] == 'w') {
        var iStart = 3;
        if (s[3] == '-') {
            iStart = 4;
            sign = -1;
        }
        var i = iStart;
        while (!isNaN(s.substring(i, i + 1)) && i!=s.length) {
   //     alert("i=" + i+ " s.substring(i,i+1)=" + 1*s.substring(i, i + 1));
            i++;
        }
        var indexStart = sign * s.substring(iStart, i);
//alert("indexStart=" + indexStart);
        return indexStart;
    }

    var sYmd = "" + ar[1][0];
    var ymd = sYmd.split("-");//var res = str.split("-");
    if (ymd.length == 3) {
        var year = 1 * ymd[0];
        var month = 1 * ymd[1];
        var day = 1 * ymd[2];
        if (year > 1900 && year < 2200 && month >= 0 && month <= 12 && day > 0 && day <= 31) {
            //alert(year+" "+month+" "+day+" "+indexDailyFromDate(sYmd));
            indexStart = indexDailyFromDate(sYmd);
            //         indexEnd = indexStart + ar.length - 2;//0
        }
    }
    return indexStart;
}
function FindMin(nLeftIndex, nRightIndex, ar) {
    var Min = Number.MAX_VALUE;

    if (ar.length == 1) return 1*ar[0];//constants

    if (ar.length < 1) {
       // alert("FindMinMax: Empty series");
    }

    var IndexStart = 1 * ar[0];
    var IndexEnd = IndexStart + ar.length - 2;

    var Start = Math.max(nLeftIndex, IndexStart);
    var End = Math.min(nRightIndex, IndexEnd);

    if (End >= Start) {
        for (var i = Start; i <= End; i++) {
            var k = i - IndexStart + 1;
            var d = 1 * ar[k];
            if (d == Number.NEGATIVE_INFINITY || isNaN(d) || d == Number.POSITIVE_INFINITY) continue;
            if (Min > d) Min = d;//
        }
    }

    if (Min < yLowest) Min = yLowest;

    return Min;
}
function FindMax(nLeftIndex, nRightIndex, ar) {
    var Max = -Number.MAX_VALUE;

    if (ar.length == 1) return 1*ar[0];//constants

    if (ar.length < 1) {
      //  alert("FindMinMax: Empty series");
    }

    var IndexStart = 1 * ar[0];
    var IndexEnd = IndexStart + ar.length - 2;

    var Start = Math.max(nLeftIndex, IndexStart);
    var End = Math.min(nRightIndex, IndexEnd);

    if (End >= Start) {
        for (var i = Start; i <= End; i++) {
            var k = i - IndexStart + 1;
            var d = 1 * ar[k];
            if (d == Number.NEGATIVE_INFINITY || isNaN(d) || d == Number.POSITIVE_INFINITY) continue;
            if (Max < d) Max = d;//
        }
    }

    if (Max > yHighest) Max = yHighest;

    return  Max;
}
function FindMinMax(nLeftIndex, nRightIndex, ar) {
    var Min = Number.MAX_VALUE;
    var Max = -Number.MAX_VALUE;

    if (ar.length == 1) return [1*ar[0], 1*ar[0]];//constants

    if(ar.length<1){
      //  alert("FindMinMax: Empty series");
        return [Min, Max];
    }

    var IndexStart = 1*ar[0];
    var IndexEnd = IndexStart + ar.length- 2;

    var Start = Math.max(nLeftIndex, IndexStart);
    var End = Math.min(nRightIndex, IndexEnd);
//alert("Start=" + Start + " End=" + End);
    if (End >= Start) {
        for (var i = Start; i <= End; i++)
        {
            var k = i - IndexStart + 1;
            var d = 1 * ar[k];
            if (d == Number.NEGATIVE_INFINITY || isNaN(d) || d == Number.POSITIVE_INFINITY) continue;
            if (Max < d) Max = d;//
            if (Min > d) Min = d;//
        }
    }

    if (Min < yLowest) Min = yLowest;
    if (Max > yHighest) Max = yHighest;

    return [Min,Max];
}
function drawMyShapes() {
 //   alert("3. arPixelValueLeft[0]=" + arPixelValueLeft[0] + " arPixelValueLeft[1]=" + arPixelValueLeft[1]);

    ctx.clearRect(0, 0, canvas.width, canvas.height);///??????
    for (var i = 0; i < arMyShapes.length; i++) {    
        // ctx.globalAlpha = 1;
        arMyShapes[i].draw(ctx);
       // ctx.globalAlpha = 1;
    }
    //    alert("4. arPixelValueLeft[0]=" + arPixelValueLeft[0] + " arPixelValueLeft[1]=" + arPixelValueLeft[1]);

//    DrawXParamAxis(heightParamX, rPanes, PanesLeft, PanesTop);
//    arMyShapes[arMyShapes.length - 2].draw(ctx);
//    arMyShapes[arMyShapes.length - 1].draw(ctx);

}
function getVisible(s){
    if (s=="Yes") return 1;
    if (s=="No") return 0;
    return 1*s;
}

function DrawRectangle(ctx,  Left, Top, Width, Height,  brWhite,  brBlack)
{
    if (Left < 0 || Top < 0 || Width < 0 || Height < 0) return;

    var StrokeThickness = 0.5;
  ctx.globalAlpha=0.5;
    ctx.beginPath();
    ctx.rect(Left, Top, Width, Height);
    //ctx.closePath(); 
    ctx.fillStyle = brWhite;
    ctx.fill();
    ctx.strokeStyle = brBlack;
    ctx.lineWidth = StrokeThickness;
    ctx.stroke();
  //  ctx.opacity = 0.5;
   
}
function BuildString(d) {

    if (d == 0) return "" + 0;

    var n = d.toPrecision(4);
    var s = "" + n;
    if (s.length > 7) {
        n = 1 * n;
        return "" + n.toExponential();
    }

 


    if (1 <= d && d < 10) return ("  " + d.toPrecision(3));
    else if (10 <= d && d < 100) return (" " + d.toPrecision(4));
    else return d.toPrecision(5);
}
function doTweak(arInfo) {

    // find nextSNumber
    var line = 1 * arInfo[0];
    var n = 1 * arInfo[1];

//arOldNameFormula[line][1] = arNameFormula[line][1];

    //  for (var i = 0; i < arFormulaParts[line].length; i++) {
    //       alert("arFormulaParts[line][i]=" + arFormulaParts[line][i]);
    //   }


    var upDown = (arInfo[1] - 1) % 4;
    upDown = upDown / 2;// if upDown==0 => Down, if upDown==1 => Up

    var iNumber = n + 1;//down
    if (upDown == 1) iNumber = n - 1;//up

    var number = 1 * arFormulaParts[line][iNumber];
    var sNumber = "" + arFormulaParts[line][iNumber];

    var nextSNumber = "";
    var head = "1";
    if (upDown == 1) {// Up
        var p8 = -1;
        for (var i = sNumber.length - 1; i >= 0; i--) {
            if (1 * sNumber[i] == 9 || "" + sNumber[i] == ".") continue;
            p8 = i;
            break;
        }
        if (p8 >= 0) {
            var n8 = 1 * sNumber[p8] + 1;
            var ch8 = "" + n8;
            head = sNumber.substr(0, p8) + ch8;
        }
        for (var i = p8 + 1; i < sNumber.length; i++) {
            if ("" + sNumber[i] == ".") head += ".";
            else head += "0";
            //alert("i="+i+" sNumber.length="+sNumber.length+" head=" + head);
        }
        nextSNumber = head;
    }
    else {//down
        var p1 = -1;
        for (var i = sNumber.length - 1; i >= 0; i--) {
            if (1 * sNumber[i] == 0 || "" + sNumber[i] == ".") continue;
            p1 = i;
            break;
        }
        if (p1 == -1) {
            nextSNumber = sNumber;// =0.000
        }
        else {
            var n1 = 1 * sNumber[p1] - 1;
            var ch1 = "" + n1;
            head = sNumber.substr(0, p1) + ch1;
            for (var i = p1 + 1; i < sNumber.length; i++) {
                if ("" + sNumber[i] == ".") head += ".";
                else head += "9";
            }
            nextSNumber = head;
            if (head.length > 1) {
                if (head[0] == "0" && head[1] != ".") {
                    nextSNumber = head.substring(1, head.length);
                }
            }
        }
    }
    //alert("line=" + line + " n=" + n + " iNumber=" + iNumber + " number=" + number+" nextSNumber="+nextSNumber);
//alert("nextSNumber="+nextSNumber);
    // change arFormulaParts :  text+[+number+]+text+[number+]+text
 //   if (!isNaN(nextSNumber)) {
         arFormulaParts[line][iNumber] = "" + nextSNumber;
 //   }
//alert(" arFormulaParts[line][iNumber] =" + arFormulaParts[line][iNumber]);
    var s = "";
    for (var i = 0; i < arFormulaParts[line].length; i++) {
        s += arFormulaParts[line][i];
    }
    // change formula
    arNameFormula[line][1] = "" + s;
    //alert("s=" + s);

    // change GUI
    document.getElementById("formula" + line).value = s;

    // recalculate
    Calculate("tweaker");
    /*
    Recalculate();
    rememberListsAndChain();// save old state 
    alert("Recalculated");
    myDrawingFunction();
    */

    //alert(2);
}
function doYScale(nLeftRight, iPane) {
 //   for (var i = 0; i < arPanes.length; i++) {
 //       alert(i+" arPanes[i]=" + arPanes[i]);
 //   }
//alert("1. doYScale: arLeftRightAtans[0] =" + arLeftRightAtans[0] + " arLeftRightAtans[1] =" + arLeftRightAtans[1]);
    nLeftRight = 1 * nLeftRight;
    iPane = 1 * iPane;
  //  alert("nLeftRight=" + nLeftRight + " iPane=" + iPane);
    var s = arLeftRightAtans[nLeftRight];
    var ch = s[iPane];
    var chNew = ch;
    if (ch == "n") chNew = "l";
    else if (ch == "l") chNew = "a";
    else chNew = "n";
    var sNew = "";
    for (var i = 0; i < s.length; i++) {
        if (i != iPane) sNew += s[i];
        else sNew += chNew;
    }
    arLeftRightAtans[nLeftRight] = sNew;
//    alert("nLeftRight=" + nLeftRight + " iPane=" + iPane + " new arLeftRightAtans[nLeftRight] =" + arLeftRightAtans[nLeftRight]);
 //   alert("2. doYScale: arLeftRightAtans[0] =" + arLeftRightAtans[0] + " arLeftRightAtans[1] =" + arLeftRightAtans[1]);

    myDrawingFunction1();
}
function doRemovePane(iPane){
    //  alert("doRemovePane "+iPane);
  //  alert("0. nLeftIndex=" + nLeftIndex + "nRightIndex=" + nRightIndex);
    sMarker = "tbX";
    //////////////////////////////////////////////////////////////////////////////////
 //   show("1. arSymbolList", arSymbolList);
 //   show("1. arSymbolPresentation", arSymbolPresentation);


    var arFromIDToLine = [];
    for (var id = 0; id < arAllDs.length; id++) {
        arFromIDToLine.push(-1);
    }
//    show("1.arFromIDToLine", arFromIDToLine);
    for (var iLine = 0; iLine < arFormulaPresentation.length; iLine++) {
        var id = arFromPresentationIndexToSeriesID[iLine];
        arFromIDToLine[id] = iLine;
    }
// show("2.arFromIDToLine", arFromIDToLine);

//    var arNamesOnPane = [];////////////////// for alerts
    // arSymbolIndexToDelete
    var arSymbolIndexToDelete = [];
    for (var i = 0; i < arSymbolPresentation.length; i++) {//arSymbolList.length = arSymbolPresentation.length
        var parts = arSymbolPresentation[i].split("!");
        var nPane = parts[1] - 1;
        if (nPane == iPane && arSymbolList[i] != "") {
            arSymbolIndexToDelete.push(i);
//            arNamesOnPane.push(arSymbolList[i]);//////////////////////
        }
    }
//show("arSymbolIndexToDelete", arSymbolIndexToDelete);

    //arIDsToDelete
    // arLineToDelete
    var arIDsToDelete = [];
    var arLineToDelete = [];
    for (var id = 0; id < arAllDs.length; id++) {
//alert("1. id=" + id);
        // iLine: if (nPane == iPane)
        var i = arFromIDToLine[id];
        if (i != -1) {
            var parts = arFormulaPresentation[i].split("!");
            var nPane = parts[1] - 1;
//alert("nPane=" + nPane + " iPane=" + iPane);
            if (nPane == iPane) {
                if (arLineToDelete.indexOf(i) == -1) arLineToDelete.push(i);
                if (arIDsToDelete.indexOf(id) == -1) arIDsToDelete.push(id);
           //     var sName = arNameFormula[i][0];///////////
           //     if (arNamesOnPane.indexOf(sName) == -1) arNamesOnPane.push();//////////////////////
            }
        }
        // if Data
        if (arAllDs[id].type == "Data") {
            var nSymbol = arAllDs[id].nSymbol;
            if (arSymbolIndexToDelete.indexOf(nSymbol) != -1) {// depends on symbol which we want to delete
                if (arLineToDelete.indexOf(i) == -1 && i!=-1) arLineToDelete.push(i);
                if (arIDsToDelete.indexOf(id) == -1) arIDsToDelete.push(id);
            //    var sName = arNameFormula[i][0];///////////  
            //    if (arNamesOnPane.indexOf(sName) == -1) arNamesOnPane.push();//////////////////////
            }
        }
            // if Function
        else if (arAllDs[id].type == "Function") {
            var bFound = false;
//alert("Function: id=" + id + " arAllDs[id].arDepend.length=" + arAllDs[id].arDepend.length);
            for (var n = 0; n < arAllDs[id].arDepend.length; n++) {
                var argID = arAllDs[id].arDepend[n];
//alert("n=" + n + " argID=" + argID);
                if (arIDsToDelete.indexOf(argID) != -1) {//dependes on argument which we want to delete
                    bFound = true;
                    break;
                }
                if (arAllDs[argID].type == "Data") {
                    var nSymbol = arAllDs[argID].nSymbol;
                    if (arSymbolIndexToDelete.indexOf(nSymbol) != -1) {// depends on symbol which we want to delete
                        bFound = true;
                        break;
                    }
                }
            }
            if (bFound) {
                if (arLineToDelete.indexOf(i) == -1 && i != -1) arLineToDelete.push(i);
                if (arIDsToDelete.indexOf(id) == -1) arIDsToDelete.push(id);
             //   var sName = arNameFormula[i][0];///////////
             //   if (arNamesOnPane.indexOf(sName) == -1) arNamesOnPane.push();//////////////////////
            }
        }
    }
    //alert("1. nLeftIndex=" + nLeftIndex + "nRightIndex=" + nRightIndex);
//show("arIDsToDelete", arIDsToDelete);
//show("arLineToDelete", arLineToDelete);
 //   show("arNamesOnPane", arNamesOnPane);/////////////////
    //////////////////////////////////////////////////////////////////////////////  sPresentationSymbolDefault
    //arSymbolList arSymbolPresentation

//alert("1. arFromSymbolListToAvailableIndex=" + arFromSymbolListToAvailableIndex);
    for (var i = 0; i < arSymbolList.length; i++) {
//alert("arSymbolList[i]=" + arSymbolList[i] + " arSymbolPresentation[i]=" + arSymbolPresentation[i]);
        if(arSymbolIndexToDelete.indexOf(i) != -1){
            arSymbolList[i] = "";
            //arSymbolPresentation[i] = sPresentationSymbolDefault;
        }
        arSymbolPresentation[i] = doRemovePaneFromPresentationLine(arSymbolPresentation[i], iPane);

        //arFromSymbolListToAvailableIndex[i] = findNameInAvailableArray(arSymbolList[i]);////1/11/2018
    }
    //alert("2. arFromSymbolListToAvailableIndex=" + arFromSymbolListToAvailableIndex);

    // trimm the last enpty symbols:
    var Len=arSymbolList.length;
    for (var i = arSymbolList.length - 1; i >= 0 ; i--) {
        if (arSymbolList[i] == "") {
            Len--;
            arSymbolPresentation.length = Len;
        }
        else break;
    }
    arSymbolList.length = Len;
   // arSymbolPresentation.length = Len;
    
//alert("arSymbolList=" + arSymbolList + " arSymbolPresentation=" + arSymbolPresentation);


    var nShift = 0;
    //    arFormulasChain    arFormulaPresentation 
    for (var i = 0; i < arFormulasChain.length; i++) {


        while (arLineToDelete.indexOf(i + nShift) != -1) {
            nShift++;
        }
        if (i + nShift >= arFormulasChain.length) break;
        // arFormulasChain[i] = arNameFormula[i][0] + "+";;
  //      var n = arNameFormula[i + nShift][0];
        //      var f = doRemovePaneFromPresentationLine(arNameFormula[i + nShift][1], iPane);
      //  arFormulasChain[i] = n + "=" + f;
  //      var nf = arFormulasChain[i + nShift].split("=");
    //    arFormulasChain[i] = nf[0] + "=" + nf[1];
//alert(i + " Before shift:  arFormulasChain[i] =" + arFormulasChain[i]);
        arFormulasChain[i] = arFormulasChain[i + nShift];
//alert(i + " After shift:  arFormulasChain[i] =" + arFormulasChain[i]);

        arFormulaPresentation[i] = doRemovePaneFromPresentationLine(arFormulaPresentation[i + nShift],iPane);
    }
    arFormulasChain.length=arFormulasChain.length-nShift;
  //  arFormulaPresentation.length = arFormulaPresentation.length - nShift;
    arFormulaPresentation.length = arFormulasChain.length;
    //show("arFormulaPresentation", arFormulaPresentation);
//alert("2. nLeftIndex=" + nLeftIndex + "nRightIndex=" + nRightIndex);
    // arPanes 

    nShift = 0;
    for (var i = 0; i < arPanes.length; i++) {
        if (i == iPane) {
            nShift++;
        }
        if (i + nShift >= arPanes.length) break;
        arPanes[i] = arPanes[i + nShift];
    }
    arPanes.length = arPanes.length - nShift;

    //arLeftRightAtans
    arLeftRightAtans[0] = arLeftRightAtans[0].slice(0, iPane) + arLeftRightAtans[0].slice(iPane + 1);// "aln"
    arLeftRightAtans[1] = arLeftRightAtans[1].slice(0, iPane) + arLeftRightAtans[1].slice(iPane + 1);//"nna"

//show("1. arPanes", arPanes);
//show("1. arLeftRightAtans", arLeftRightAtans);

    // if everyting is deleted
    if (arPanes.length == 0) {
        arPanes.push("100");
        arLeftRightAtans[0] = "n";
        arLeftRightAtans[1] = "n";
    }

//alert("3. nLeftIndex=" + nLeftIndex + "nRightIndex=" + nRightIndex);

    ////////////
    SetTopPanel();
//alert("4. nLeftIndex=" + nLeftIndex + "nRightIndex=" + nRightIndex);
    setAlgo();
//alert("5. nLeftIndex=" + nLeftIndex + "nRightIndex=" + nRightIndex);
//alert("1. End of doRemovePane");
    getData();
  //  myDrawingFunction1();
    //alert("6. nLeftIndex=" + nLeftIndex + "nRightIndex=" + nRightIndex);
    //alert("6.arSymbolList=" + arSymbolList + " arSymbolPresentation=" + arSymbolPresentation);
    sMarker = "none";
    //alert("2. End of doRemovePane: nLeftIndex=" + nLeftIndex + "nRightIndex=" + nRightIndex);
}
function doRemovePaneFromPresentationLine(sPresLine, iPane) {//"Yes!1!Right!Line!1!Solid!Long!1!#000000",//sFormulaPresentation
    var parts = sPresLine.split("!");
    var nPaneOld = 1 * parts[1] - 1;
    if (nPaneOld > iPane) parts[1] = nPaneOld + "";
    var sPresLineNew = "";
    for (var i = 0; i < parts.length-1; i++) {
        sPresLineNew += parts[i] + "!";
    }
    return sPresLineNew + parts[parts.length - 1];

}
function doInsertPaneBelow(iPane){
//    alert("doInsertPaneBelow " + iPane);
    sMarker = "tbB";
    ///////////////////////////////////
    for (var i = 0; i < arSymbolList.length; i++) {
    //    alert("1. arSymbolList[i]=" + arSymbolList[i] + " arSymbolPresentation[i]=" + arSymbolPresentation[i]);
        arSymbolPresentation[i] = doInsertPaneInPresentationLineBelow(arSymbolPresentation[i], iPane);
   //     alert("2. arSymbolList[i]=" + arSymbolList[i] + " arSymbolPresentation[i]=" + arSymbolPresentation[i]);
    }
    for (var i = 0; i < arFormulasChain.length; i++) {
 //       alert("1. arFormulasChain[i]=" + arFormulasChain[i] + " arFormulaPresentation[i]=" + arFormulaPresentation[i]);
        arFormulaPresentation[i] = doInsertPaneInPresentationLineBelow(arFormulaPresentation[i], iPane);
  //      alert("2. arFormulasChain[i]=" + arFormulasChain[i] + " arFormulaPresentation[i]=" + arFormulaPresentation[i]);
    }
    var avg = 0;
    for (var i = 0; i < arPanes.length; i++) {
        avg += 1*arPanes[i];
    }
    avg /= arPanes.length;
    arPanes.splice(iPane, 0, avg+"");
 //show("1. arPanes", arPanes);

    //arLeftRightAtans
//show("1. arLeftRightAtans", arLeftRightAtans);
     arLeftRightAtans[0] = arLeftRightAtans[0].slice(0, iPane + 1) + "n" + arLeftRightAtans[0].slice(iPane + 1);// "aln"
     arLeftRightAtans[1] = arLeftRightAtans[1].slice(0, iPane + 1) + "n" + arLeftRightAtans[1].slice(iPane + 1);//"nna"
//show("2. arLeftRightAtans", arLeftRightAtans);

    ////////////
    SetTopPanel();
    setAlgo();
    getData();
    sMarker = "none";
}
function doInsertPaneInPresentationLineBelow(sPresLine, iPane) {//"Yes!1!Right!Line!1!Solid!Long!1!#000000",//sFormulaPresentation
    var parts = sPresLine.split("!");
    var nPaneOld = 1 * parts[1] - 1;
    if (nPaneOld > iPane) parts[1] = nPaneOld + 2+"";
    var sPresLineNew = "";
    for (var i = 0; i < parts.length - 1; i++) {
        sPresLineNew += parts[i] + "!";
    }
    return sPresLineNew + parts[parts.length - 1];


}
function doInsertPaneAbove(iPane) {
 //   alert("doInsertPaneAbove " + iPane);
    sMarker = "tbA";
    /////////////////////
    for (var i = 0; i < arSymbolList.length; i++) {
        //    alert("1. arSymbolList[i]=" + arSymbolList[i] + " arSymbolPresentation[i]=" + arSymbolPresentation[i]);
        arSymbolPresentation[i] = doInsertPaneInPresentationLineAbove(arSymbolPresentation[i], iPane);
        //     alert("2. arSymbolList[i]=" + arSymbolList[i] + " arSymbolPresentation[i]=" + arSymbolPresentation[i]);
    }
    for (var i = 0; i < arFormulasChain.length; i++) {
        //       alert("1. arFormulasChain[i]=" + arFormulasChain[i] + " arFormulaPresentation[i]=" + arFormulaPresentation[i]);
        arFormulaPresentation[i] = doInsertPaneInPresentationLineAbove(arFormulaPresentation[i], iPane);
        //      alert("2. arFormulasChain[i]=" + arFormulasChain[i] + " arFormulaPresentation[i]=" + arFormulaPresentation[i]);
    }
    var avg = 0;
    for (var i = 0; i < arPanes.length; i++) {
        avg += 1 * arPanes[i];
    }
    avg /= arPanes.length;
    arPanes.splice(iPane-1, 0, avg + "");
    //show("1. arPanes", arPanes);

    //arLeftRightAtans
    //show("1. arLeftRightAtans", arLeftRightAtans);
    arLeftRightAtans[0] = arLeftRightAtans[0].slice(0, iPane) + "n" + arLeftRightAtans[0].slice(iPane);// "aln"
    arLeftRightAtans[1] = arLeftRightAtans[1].slice(0, iPane) + "n" + arLeftRightAtans[1].slice(iPane);//"nna"
    //show("2. arLeftRightAtans", arLeftRightAtans);

    ////////////
    SetTopPanel();
    setAlgo();
    getData();
    sMarker = "none";
}
function doInsertPaneInPresentationLineAbove(sPresLine, iPane) {//"Yes!1!Right!Line!1!Solid!Long!1!#000000",//sFormulaPresentation
    var parts = sPresLine.split("!");
    var nPaneOld = 1 * parts[1] - 1;
    if (nPaneOld >= iPane) parts[1] = nPaneOld + 2 + "";
    var sPresLineNew = "";
    for (var i = 0; i < parts.length - 1; i++) {
        sPresLineNew += parts[i] + "!";
    }
    return sPresLineNew + parts[parts.length - 1];
}
function changeArPanes() {
  //  alert("listPaneTops.length=" + listPaneTops.length );
    var ar = [];
    for (var i = 0; i < listPaneTops.length; i++) {
        ar.push(listPaneTops[i]);
    }
 
//alert(ar[nSeparatorN - 1] + " " + yOffset + " " + ar[nSeparatorN+1]);

    if (yOffset > ar[nSeparatorN-1] && yOffset <= ar[nSeparatorN+1]){
        ar[nSeparatorN]=yOffset;
    }
    else if (yOffset <= ar[nSeparatorN - 1]) {
//alert(nSeparatorN + " " + ar[nSeparatorN - 1]);
        ar[nSeparatorN]=ar[nSeparatorN-1]+5;
    }
    else {//yOffset<=yOffset > ar[nSeparatorN]
//alert(nSeparatorN + " " + ar[nSeparatorN + 1])
        ar[nSeparatorN]=ar[nSeparatorN+1]-5;
    }

    arPanes.length=0;;
    var max=-1;
    for(var i=1;i<ar.length;i++){
        var h=ar[i]-ar[i-1]
        if(max<h) max=h;
        arPanes.push(h);
    }

    for (var i = 0; i < arPanes.length; i++) {
        arPanes[i] = 100 * arPanes[i]/max;
    }   
  //  show("arPanes", arPanes);
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function updateSlider(slideAmount) {

    var min = document.getElementById("slide").min;
    var max = document.getElementById("slide").max;
  //  alert(minMax);

    var se = arZooms[0].split(";");
    var dZoomStart = 1 * se[0];
    var dZoomEnd = 1 * se[1];
    var delta = dZoomEnd - dZoomStart;
    // if slideAmount==min =>dZoomEnd=delta
    // if slideAmount==max =>dZoomEnd=100
    var i2 = delta + (slideAmount-min) * (100 - delta) /( max-min);
    var i1 = i2 - delta;
    if (i2 > 100) i2 = 100;
    if (i1 < 0) i = 0;
    var s = i1 + ";" + i2;
    arZooms[0] = s;
        
    //  alert(slideAmount);
    myDrawingFunction1();

 //   document.getElementById("slide").value = "100";
  //  document.getElementById("slide").disabled = true;
}
function setSliderValue()
{
    document.getElementById("slide").style.visibility = "visible";
    var se = arZooms[0].split(";");
    dLeftZoom = se[0] / 100;
    dRightZoom = se[1] / 100;
    var min = document.getElementById("slide").min;
    var max = document.getElementById("slide").max;
    var se = arZooms[0].split(";");
    var dZoomStart = 1 * se[0];
    var dZoomEnd = 1 * se[1];
    var delta = dZoomEnd - dZoomStart;
    var i2 = dZoomEnd;
    // i2=100 =>slideAmount=max
    //i2=delta (i1=0) =>slideAmount=min
    var slideAmount = min + (i2 - delta) * (max - min) / (100 - delta);
    document.getElementById("slide").value = slideAmount;
}
function doLegend(xOffset, yOffset) {

   // alert("doLegend: xOffset=" + xOffset + " xDown=" + xDown + " yOffset=" + yOffset + " yDown=" + yDown);
    var k = listPanes.length;
    if (xOffset < listPanes[0].left || xOffset > listPanes[0].width || yOffset < listPanes[0].top || yOffset > listLeftTopPanes[k - 1][1] + listPanes[k - 1].height) {
    //    alert(xOffset + " " + yOffset + "  Delete?");
        myDrawingFunction();// if "no"
        sMarker = "none";
        return;
    }
    else {
        var N = arMyShapes.length;
 //alert("N=" + N);
// alert(" arMyShapes[N - 3].arInfo.length=" + arMyShapes[N - 3].arInfo.length);
 //alert(arMyShapes[N-3].arInfo[0]);

        var symbolFormula = "" + ((arMyShapes[N - 3]).arInfo)[5];

// alert(symbolFormula );
        var iNumber = arMyShapes[N - 3].arInfo[6];

//alert("iNumber=" + iNumber);
            var sNewYAxis = "";
        var nNewPahe = -1;// 0,1, ..   
        var sPres="";
        if (symbolFormula == "symbol") {
            sPres=  arSymbolPresentation[iNumber];
        }
        else{
            sPres=  arFormulaPresentation[iNumber];
        }
//alert(sPres);
        var parts = sPres.split("!");
        var nOldPahe = parts[1] - 1;
        var sOldYAxis=parts[2];




        var n = listPanes.length;
//alert("n="+n+" nOldPahe=" + nOldPahe + " sOldYAxis=" + sOldYAxis);
        for (var i = 0; i < n; i++)
        {
//alert("i=" + i);
            var top = listPanes[i].top;
//alert("i=" + i + " top="+ top);
            var bot = top + listPanes[i].height;
//alert("i=" + i + ": " + bot + " " + yOffset + " " + top);
            if (top < yOffset && yOffset < bot)
            {
                    nNewPahe = i;
                    break;
            }
        }
//alert("nNewPahe=" + nNewPahe);
        if (nNewPahe != nOldPahe)
        {
            sNewYAxis = sOldYAxis;

        }
        else if (Math.abs(xOffset - xDown) > Math.abs(yOffset - yDown)
            && Math.abs(xOffset - xDown) > 5)// new y
        {
            nNewPahe = nOldPahe;
            if (xOffset > xDown) sNewYAxis = "Right";
            else sNewYAxis = "Left";
        }
        else if (Math.abs(yOffset - yDown) > 5)// new pane
        {
       //     alert("doLegend: xOffset=" + xOffset + " xDown=" + xDown + " yOffset=" + yOffset + " yDown=" + yDown);
            sNewYAxis = sOldYAxis;
            if (yOffset > yDown) nNewPahe = nOldPahe + 1;
            else nNewPahe = nOldPahe - 1;
        }
//alert("nNewPahe=" + nNewPahe + " sNewYAxis=" + sNewYAxis);
        var s = "";
        var np=nNewPahe + 1;
        parts[1] = "" + np;
        parts[2] = sNewYAxis;
        s = parts[0];
        for (var i = 1; i < parts.length; i++)
        {
            s = s + "!" + parts[i];
        }
 //alert(iNumber+ " "+s + " " + symbolFormula);
        if (symbolFormula == "symbol") {
            arSymbolPresentation[iNumber]=s;
        }
        else {
            arFormulaPresentation[iNumber]=s;
        }


        myDrawingFunction();
        sMarker = "none";
        return;
    }



}

canvas.addEventListener('mousedown', function (evt) {
    bDown = true;
    var mousePos = getMousePos(canvas, evt);
    xOffset = mousePos.x;
    yOffset = mousePos.y;
    xDown = mousePos.x;
    yDown = mousePos.y;

    for (var i = 0; i < arMyShapes.length; i++) {         
        if (arMyShapes[i].contains(xOffset, yOffset)) {
            idDown = arMyShapes[i].id;
            //alert("idDown=" + idDown + " arMyShapes[i].type=" + arMyShapes[i].type);
            if (arMyShapes[i].shapeType== "MyPolygon") {// change foormula and recalculate a
                doTweak(arMyShapes[i].arInfo);
                return;
            }
            else if (arMyShapes[i].shapeType == "MyTextBlock") {
                if (arMyShapes[i].arInfo[0] == "yScale") {// change Y scale
                    doYScale(arMyShapes[i].arInfo[1], arMyShapes[i].arInfo[2]);
                    return;
                }
                if (arMyShapes[i].arInfo[0] == "tbX") {// remove pane
//alert("arMyShapes[i].arInfo[1]="+arMyShapes[i].arInfo[1]);
                    doRemovePane(arMyShapes[i].arInfo[1]);
                    return;
                }
                if (arMyShapes[i].arInfo[0] == "tbB") {// insert below
                   doInsertPaneBelow(arMyShapes[i].arInfo[1]);
                  //   alert("InsertPaneBelow");
                    return;
                }
                if (arMyShapes[i].arInfo[0] == "tbA") {// insert above
                 doInsertPaneAbove(arMyShapes[i].arInfo[1]);
                   //    alert("InsertPaneAbove");
                    return;
                }
                if (arMyShapes[i].arInfo[0] == "legend") {//move series
                    sMarker = "legend";
                    var N = arMyShapes.length;
                    arMyShapes[N - 3].left = arMyShapes[i].left;
                    arMyShapes[N - 3].width = arMyShapes[i].width;
                    arMyShapes[N - 3].top = arMyShapes[i].top;
                    arMyShapes[N - 3].height = arMyShapes[i].height;// just change left, top,...
                    arMyShapes[N - 3].opacity = 0.5;
                    // ["legend", "symbol", i], actually it is not in N-3, it is in arMyShapes[i], but works,  because [0]="moving", [1] and [2] - empty

                    arMyShapes[N - 3].arInfo[3] = xDown - arMyShapes[N - 3].left;
                    arMyShapes[N - 3].arInfo[4] = yDown - arMyShapes[N - 3].top;
                    arMyShapes[N - 3].arInfo[5] = arMyShapes[i].arInfo[1];// "symbol/formula"
                    arMyShapes[N - 3].arInfo[6] = arMyShapes[i].arInfo[2];// i
                //    alert("xDown=" + xDown + " yDown=" + yDown);
                    drawMyShapes();
                    return;
                }
            }
            else if (arMyShapes[i].shapeType == "MyRectangle") {
                if (arMyShapes[i].arInfo[0] == "separator") {//
                    sMarker = "separator";
                    nSeparatorN = arMyShapes[i].arInfo[1];

                    drawMyShapes();
                    return;
                }
            }
        }
    }


    var x1 = listPanes[0].left;
    xDownShare = (xOffset - x1) / listPanes[0].width;
    if (sMarker == "marker") {
        xPosShare = (xOffset - x1) / listPanes[0].width;
        nMarkerIndex = Math.round(nLeftIndex + xPosShare * (nRightIndex - nLeftIndex));
        var k = listPanes.length;
        yPosShare = (yOffset - listLeftTopPanes[0][1]) / (listLeftTopPanes[k - 1][1] + listPanes[k - 1].height - listLeftTopPanes[0][1]);
        var y = listLeftTopPanes[0][1] + yPosShare * (listLeftTopPanes[k - 1][1] + listPanes[k - 1].height - listLeftTopPanes[0][1]);
        showTraceMesg(y);
        return;
    }


//    var y1 = listPanes[0].top;
 //   var n = listPanes.length;
 //   var y2 = listPanes[n - 1].top + listPanes[n - 1].height;
    else if (xOffset >= listPanes[0].left && xOffset <= listPanes[0].left + listPanes[0].width) {
        // var rZoom = new MyRectangle(arMyShapes.length, xOffset, y1, 1, y2 - y1, "grey", "black", 0.5, "",[]);
        var rZoom= arMyShapes[arMyShapes.length - 3];
        rZoom.opacity = 0.5;
        rZoom.left = xOffset;
if (sMarker=="none") sMarker = "Zoom";
    }
    // sMarker = "" + arMyShapes[i].id;

  //      sMarker = "Zoom";// chnage later ????
   //     xDown = mousePos.x;
   //     yDown = mousePos.y;


        
 //alert(xDownShare + " " + x1 + " " + xOffset + " " + listPanes[0].width);

}, false);
canvas.addEventListener('mousemove', function (evt) {
    document.getElementById("canvasChart").style = "cursor: auto";
    var mousePos = getMousePos(canvas, evt);
    xOffset = mousePos.x;
    yOffset = mousePos.y;

    for (var i = 0; i < arMyShapes.length; i++) {
        if (arMyShapes[i].contains(xOffset, yOffset)) {
            document.getElementById("canvasChart").style = arMyShapes[i].sCursor;
        }
        if (bDown && (sMarker == "Zoom")) {// 
            var x1 = listPanes[0].left;
            var x = x1 + xDownShare * listPanes[0].width;
            xDownShareLast = (xOffset - x1) / listPanes[0].width;
            //alert(bDown +" "+sMarker+" "+xOffset+" "+yOffset);
            if (xOffset > x1 + listPanes[0].width) xOffset = x1 + listPanes[0].width;
            if (xOffset < x1) xOffset = x1;
            var a = Math.min(x, xOffset);
            var b = Math.max(x, xOffset);
            var k = listPanes.length;
            var top = listLeftTopPanes[0][1];
            var h = listLeftTopPanes[k - 1][1] + listPanes[k - 1].height;
            var height=h-top;
              //alert("height=" + height );
            //alert(x1 + " " + y1 + " " + b - a + " " + y2 - y1);
            var N = arMyShapes.length;
            arMyShapes[N - 3].left = a;
            arMyShapes[N - 3].width = b - a;// just change left, top,...
            arMyShapes[N - 3].top = top;
            arMyShapes[N - 3].height = height;

            //  alert("top=" + top + " height=" + height);
            drawMyShapes();

            return;
        }
        if (bDown && sMarker == "marker") {
            xPosShare = (xOffset - listPanes[0].left) / listPanes[0].width;
            nMarkerIndex = Math.round(nLeftIndex + xPosShare * (nRightIndex - nLeftIndex));
            //alert("nMarkerIndex=" + nMarkerIndex + " y=" + y);
            var k = listPanes.length;
            yPosShare = (yOffset - listLeftTopPanes[0][1]) / (listLeftTopPanes[k - 1][1] + listPanes[k - 1].height - listLeftTopPanes[0][1]);
            var y = listLeftTopPanes[0][1] + yPosShare * (listLeftTopPanes[k - 1][1] + listPanes[k - 1].height - listLeftTopPanes[0][1]);

            showTraceMesg(y);
            // drawMyShapes();
            return;
        }
        if (bDown && sMarker == "separator") {
            drawMyShapes();
            //      myDrawingFunction();
            return;
        }
        if (bDown && (sMarker == "legend")) {// 
         //   arMyShapes[N - 3].arInfo[3] = xDown;
         //   arMyShapes[N - 3].arInfo[4] = yDow;
            var N = arMyShapes.length;
        //    alert(arMyShapes[N - 3].arInfo[3] + " " + arMyShapes[N - 3].arInfo[4]);
            arMyShapes[N - 3].left = xOffset - 1*(arMyShapes[N - 3].arInfo[3]);
            arMyShapes[N - 3].top = yOffset - 1*(arMyShapes[N - 3].arInfo[4]);
            drawMyShapes();
            return;
        }
    }
    //    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    //   if (bMouseOn) writeMessage(canvas, message);
}, false);
canvas.addEventListener('mouseup', function (evt) {
//alert("sMarker=" + sMarker);
//alert("mouseup: xOffset=" + xOffset + " xDown=" + xDown + " yOffset=" + yOffset + " yDown=" + yDown);
    bDown = false;
    if (sMarker == "Zoom") {
        var N = arMyShapes.length;
        arMyShapes[N - 3].opacity = 0.0;
        ////////////////////////

        var x1 = listPanes[0].left;
        var x2 = (xOffset - x1) / listPanes[0].width;


        var nStartIndex = nLeftIndex;
        var nEndIndex = nRightIndex;

        var se=arZooms[0].split(";");
        var dZoomStart = 1*se[0];
        var dZoomEnd = 1*se[1];

        var dW =  listPanes[0].width;
        var dStart = nStartIndex;
        var dEnd = nEndIndex;

        var z1 = xDownShare;
        var z2 = x2;
        var dTemp = z1;
        if (z1 > z2) { z1 = z2; z2 = dTemp; }


        var i1 = (dZoomStart + z1 * (dZoomEnd - dZoomStart));
        var i2 = (dZoomEnd - (1.0 - z2) * (dZoomEnd - dZoomStart));

   //     var n1 = Math.floor(nLeftIndex + i1 * (nRightIndex - nLeftIndex) );
   //      var n2 = Math.floor(nLeftIndex + i2 * (nRightIndex - nLeftIndex));

    //   nLeftIndex = Math.floor(minIndex + dLeftZoom * (maxIndex - minIndex));
  //     nRightIndex = Math.floor(minIndex + dRightZoom * (maxIndex - minIndex));

            var n1 = Math.floor((dStart + z1 * 100.0 * (dEnd - dStart) / 100.0));////////////
            var n2 = Math.floor((dStart + z2 * 100.0 * (dEnd - dStart) / 100.0));////////////////
  //      alert("i1=" + i1 + " i2=" + i2 + "n1=" + n1 + " n2=" + n2);
     //       if (n2 - n1 < 1 || Math.abs(xOffset - xDown) < 5)
        if (n2 - n1 < 1 || Math.abs(xOffset - xDown) < 15)
        {
            myDrawingFunction();
            sMarker = "none";
            return;
        }
        var s = i1 + ";" + i2;
        if (n2 - n1 > 0) {
            arZooms.splice(0, 0, s);
        }

        myDrawingFunction();
        sMarker = "none";
      //  alert("call setSliderValue");
        setSliderValue();
        //  drawMyShapes();
   
    }
    if (sMarker == "separator") {
     //   alert("up");
        changeArPanes();
        myDrawingFunction1();
        sMarker = "none";
    }
    if (sMarker == "legend") {



        if (Math.abs(xOffset - xDown) <5 && Math.abs(yOffset - yDown)<5 ) {// new y
        var N = arMyShapes.length;
        var symbolFormula = "" + ((arMyShapes[N - 3]).arInfo)[5];
        var iNumber = arMyShapes[N - 3].arInfo[6];
           // myDrawingFunction1();
            if (symbolFormula == "symbol") {
                EditSymbol(iNumber);
            }
            else {
                EditLine(iNumber);
            }
            sMarker = "none";
            return;
        }



        doLegend(xOffset, yOffset);
        myDrawingFunction();
        sMarker = "none";
    }
    
}, false);
canvas.addEventListener('mouseleave', function (evt) {
    
    //alert("xOffset=" + xOffset);
    if (sMarker == "Zoom" && bDown) {
        var N = arMyShapes.length;
        arMyShapes[N - 3].opacity = 0.0;
        ////////////////////////

        var x1 = listPanes[0].left;
        var x2 = (xOffset - x1) / listPanes[0].width;


        var nStartIndex = nLeftIndex;
        var nEndIndex = nRightIndex;

        var se = arZooms[0].split(";");
        var dZoomStart = 1 * se[0];
        var dZoomEnd = 1 * se[1];

        var dW = listPanes[0].width;
        var dStart = nStartIndex;
        var dEnd = nEndIndex;

        var z1 = xDownShare;
        var z2 = x2;
        var dTemp = z1;
        if (z1 > z2) { z1 = z2; z2 = dTemp; }


        var i1 = (dZoomStart + z1 * (dZoomEnd - dZoomStart));
        var i2 = (dZoomEnd - (1.0 - z2) * (dZoomEnd - dZoomStart));

        //     var n1 = Math.floor(nLeftIndex + i1 * (nRightIndex - nLeftIndex) );
        //      var n2 = Math.floor(nLeftIndex + i2 * (nRightIndex - nLeftIndex));

        //   nLeftIndex = Math.floor(minIndex + dLeftZoom * (maxIndex - minIndex));
        //     nRightIndex = Math.floor(minIndex + dRightZoom * (maxIndex - minIndex));

        var n1 = Math.floor((dStart + z1 * 100.0 * (dEnd - dStart) / 100.0));////////////
        var n2 = Math.floor((dStart + z2 * 100.0 * (dEnd - dStart) / 100.0));////////////////
  //      alert("i1=" + i1 + " i2=" + i2 + "n1=" + n1 + " n2=" + n2);
        if (n2 - n1 < 1 || Math.abs(xOffset - xDown) < 5) {
            myDrawingFunction();
            sMarker = "none";
            return;
        }
        var s = i1 + ";" + i2;
        if (n2 - n1 > 0)
            arZooms.splice(0, 0, s);
        myDrawingFunction();
        sMarker = "none";
        setSliderValue();
    }
    if (sMarker == "legend" && bDown) {
//alert("1.leave legend");
        myDrawingFunction();
    //  doLegend(xOffset, yOffset);
//alert("2.leave legend");
        sMarker = "none";
        //bDown = false;
        return;
    }
    bDown = false;

}, false);


