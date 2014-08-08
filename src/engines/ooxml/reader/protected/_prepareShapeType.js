/**
 *
 * @param type
 * @return {String}
 * @private
 */
OOXML.prototype._prepareShapeType = function (type) {
    var result = "";

    if (typeof type !== 'string')
        return "";

    switch (type) {
    case "line":
    case "lineInv":
        result = "line";
        break;
    case "triangle":
    case "rtTriangle":
        result = "triangle";
        break;
    case "rect":
        result = "rectangle";
        break;
    case "diamond":
        result = "diamond";
        break;
    case "parallelogram":
        result = "parallelogram";
        break;
    case "pentagon":
        result = "pentagon";
        break;
    case "hexagon":
        result = "hexagon";
        break;
    case "heptagon":
        result = "heptagon";
        break;
    case "octagon":
        result = "octagon";
        break;
    case "ellipse":
        result = "ellipse";
        break;
    case "decagon":
        result = "decagon";
        break;
    case "dodecagon":
        result = "dodecagon";
        break;
    case "plaque":
        result = "plaque";
        break;
    case "trapezoid":
    case "nonIsoscelesTrapezoid":
        result = "trapezoid";
        break;
    default:
        result = "rectangle";
        break;
    }
    return result;
    /*
     star4 Four Pointed Star Shape
     star5 Five Pointed Star Shape
     star6 Six Pointed Star Shape
     star7 Seven Pointed Star Shape
     star8 Eight Pointed Star Shape
     star10 Ten Pointed Star Shape
     star12 Twelve Pointed Star Shape
     star16 Sixteen Pointed Star Shape
     star24 Twenty Four Pointed Star Shape
     star32 Thirty Two Pointed Star Shape
     roundRect Round Corner Rectangle Shape
     round1Rect One Round Corner Rectangle Shape
     round2SameRect Two Same-side Round Corner Rectangle Shape
     round2DiagRect Two Diagonal Round Corner Rectangle Shape
     snipRoundRect One Snip One Round Corner Rectangle Shape
     snip1Rect One Snip Corner Rectangle Shape
     snip2SameRect Two Same-side Snip Corner Rectangle Shape
     snip2DiagRect Two Diagonal Snip Corner Rectangle Shape
     teardrop Teardrop Shape
     homePlate Home Plate Shape
     chevron Chevron Shape
     pieWedge Pie Wedge Shape
     pie Pie Shape
     blockArc Block Arc Shape
     donut Donut Shape
     noSmoking No Smoking Shape
     rightArrow Right Arrow Shape
     leftArrow Left Arrow Shape
     upArrow Up Arrow Shape
     downArrow Down Arrow Shape
     stripedRightArrow Striped Right Arrow Shape
     notchedRightArrow Notched Right Arrow Shape
     bentUpArrow Bent Up Arrow Shape
     leftRightArrow Left Right Arrow Shape
     upDownArrow Up Down Arrow Shape
     leftUpArrow Left Up Arrow Shape
     leftRightUpArrow Left Right Up Arrow Shape
     quadArrow Quad-Arrow Shape
     leftArrowCallout Callout Left Arrow Shape
     rightArrowCallout Callout Right Arrow Shape
     upArrowCallout Callout Up Arrow Shape
     downArrowCallout Callout Down Arrow Shape
     leftRightArrowCallout Callout Left Right Arrow Shape
     upDownArrowCallout Callout Up Down Arrow Shape
     quadArrowCallout Callout Quad-Arrow Shape
     bentArrow Bent Arrow Shape
     uturnArrow U-Turn Arrow Shape
     circularArrow Circular Arrow Shape
     leftCircularArrow Left Circular Arrow Shape
     leftRightCircularArrow Left Right Circular Arrow Shape
     curvedRightArrow Curved Right Arrow Shape
     curvedLeftArrow Curved Left Arrow Shape
     curvedUpArrow Curved Up Arrow Shape
     curvedDownArrow Curved Down Arrow Shape
     swooshArrow Swoosh Arrow Shape
     cube Cube Shape
     can Can Shape
     lightningBolt Lightning Bolt Shape
     heart Heart Shape
     sun Sun Shape
     moon Moon Shape
     smileyFace Smiley Face Shape
     irregularSeal1 Irregular Seal 1 Shape
     irregularSeal2 Irregular Seal 2 Shape
     foldedCorner Folded Corner Shape
     bevel Bevel Shape
     frame Frame Shape
     halfFrame Half Frame Shape
     corner Corner Shape
     diagStripe Diagonal Stripe Shape
     chord Chord Shape
     arc Curved Arc Shape
     leftBracket Left Bracket Shape
     rightBracket Right Bracket Shape
     leftBrace Left Brace Shape
     rightBrace Right Brace Shape
     bracketPair Bracket Pair Shape
     bracePair Brace Pair Shape
     straightConnector1 Straight Connector 1 Shape
     bentConnector2 Bent Connector 2 Shape
     bentConnector3 Bent Connector 3 Shape
     bentConnector4 Bent Connector 4 Shape
     bentConnector5 Bent Connector 5 Shape
     curvedConnector2 Curved Connector 2 Shape
     curvedConnector3 Curved Connector 3 Shape
     curvedConnector4 Curved Connector 4 Shape
     curvedConnector5 Curved Connector 5 Shape
     callout1 Callout 1 Shape
     callout2 Callout 2 Shape
     callout3 Callout 3 Shape
     accentCallout1 Callout 1 Shape
     accentCallout2 Callout 2 Shape
     accentCallout3 Callout 3 Shape
     borderCallout1 Callout 1 with Border Shape
     borderCallout2 Callout 2 with Border Shape
     borderCallout3 Callout 3 with Border Shape
     accentBorderCallout1 Callout 1 with Border and Accent Shape
     accentBorderCallout2 Callout 2 with Border and Accent Shape
     accentBorderCallout3 Callout 3 with Border and Accent Shape
     wedgeRectCallout Callout Wedge Rectangle Shape
     wedgeRoundRectCallout Callout Wedge Round Rectangle Shape
     wedgeEllipseCallout Callout Wedge Ellipse Shape
     cloudCallout Callout Cloud Shape
     cloud Cloud Shape
     ribbon Ribbon Shape
     ribbon2 Ribbon 2 Shape
     ellipseRibbon Ellipse Ribbon Shape
     ellipseRibbon2 Ellipse Ribbon 2 Shape
     leftRightRibbon Left Right Ribbon Shape
     verticalScroll Vertical Scroll Shape
     horizontalScroll Horizontal Scroll Shape
     wave Wave Shape
     doubleWave Double Wave Shape
     plus Plus Shape
     flowChartProcess Process Flow Shape
     flowChartDecision Decision Flow Shape
     flowChartInputOutput Input Output Flow Shape
     flowChartPredefinedProcess Predefined Process Flow Shape
     flowChartInternalStorage Internal Storage Flow Shape
     flowChartDocument Document Flow Shape
     flowChartMultidocument Multi-Document Flow Shape
     flowChartTerminator Terminator Flow Shape
     flowChartPreparation Preparation Flow Shape
     flowChartManualInput Manual Input Flow Shape
     flowChartManualOperation Manual Operation Flow Shape
     flowChartConnector Connector Flow Shape
     flowChartPunchedCard Punched Card Flow Shape
     flowChartPunchedTape Punched Tape Flow Shape
     flowChartSummingJunction Summing Junction Flow Shape
     flowChartOr Or Flow Shape
     flowChartCollate Collate Flow Shape
     flowChartSort Sort Flow Shape
     flowChartExtract Extract Flow Shape
     flowChartMerge Merge Flow Shape
     flowChartOfflineStorage Offline Storage Flow Shape
     flowChartOnlineStorage Online Storage Flow Shape
     flowChartMagneticTape Magnetic Tape Flow Shape
     flowChartMagneticDisk Magnetic Disk Flow Shape
     flowChartMagneticDrum Magnetic Drum Flow Shape
     flowChartDisplay Display Flow Shape
     flowChartDelay Delay Flow Shape
     flowChartAlternateProcess Alternate Process Flow Shape
     flowChartOffpageConnector Off-Page Connector Flow Shape
     actionButtonBlank Blank Button Shape
     actionButtonHome Home Button Shape
     actionButtonHelp Help Button Shape
     actionButtonInformation Information Button Shape
     actionButtonForwardNext Forward or Next Button Shape
     actionButtonBackPrevious Back or Previous Button Shape
     actionButtonEnd End Button Shape
     actionButtonBeginning Beginning Button Shape
     actionButtonReturn Return Button Shape
     actionButtonDocument Document Button Shape
     actionButtonSound Sound Button Shape
     actionButtonMovie Movie Button Shape
     gear6 Gear 6 Shape
     gear9 Gear 9 Shape
     funnel Funnel Shape
     mathPlus Plus Math Shape
     mathMinus Minus Math Shape
     mathMultiply Multiply Math Shape
     mathDivide Divide Math Shape
     mathEqual Equal Math Shape
     mathNotEqual Not Equal Math Shape
     cornerTabs Corner Tabs Shape
     squareTabs Square Tabs Shape
     plaqueTabs Plaque Tabs Shape
     chartX Chart X Shape
     chartStar Chart Star Shape
     chartPlus Chart Plus Shape
     */
};