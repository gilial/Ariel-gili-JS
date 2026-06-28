let tipIndex = 0;

let tips = [
    "צאו להליכה של 20 דקות בלי אוזניות ובלי גלילה בטלפון.",
    "קחו בקבוק מים ושבו כמה דקות במקום ירוק ורגוע.",
    "קבעו עם חבר סיבוב קצר בחוץ במקום עוד שיחה בוואטסאפ.",
    "צאו לראות שקיעה במקום קרוב לבית.",
    "בחרו פארק קרוב וצאו אליו גם אם יש לכם רק חצי שעה."
];

function showTip() {
    document.getElementById("tipResult").innerHTML = tips[tipIndex];

    tipIndex = tipIndex + 1;

    if (tipIndex == tips.length) {
        tipIndex = 0;
    }
}

let travelerName = "";
let trailNotes = "";
let chosenArea = "", chosenTime = "", chosenWith = "";
let chosenNature = "", chosenNatureType = "", chosenEffort = "", chosenSeason = "", chosenSeasonType = "";
let areaChoices = ["", "", "", ""];
let natureLabels = ["💧 מים", "🌳 יער וצל", "🏞️ נוף", "🌵 מדבר"];
let effortDimIds = ["effortGreenDim", "effortYellowDim", "effortOrangeDim", "effortRedDim"];
let effortFullIds = ["effortGreenFull", "effortYellowFull", "effortOrangeFull", "effortRedFull"];
let effortArrowIds = ["effortArrowGreen", "effortArrowYellow", "effortArrowOrange", "effortArrowRed"];

function putInfo(id, text) {
    document.getElementById(id).innerHTML = text;
    document.getElementById(id).hidden = false;
}

function writeTravelerName() {
    travelerName = document.getElementById("travelerName").value;
    checkTrailReady();
}

function writeTrailNotes() {
    trailNotes = document.getElementById("trailNotes").value;
}

function joinChoices(list) {
    let text = "";

    for (let i = 0; i < list.length; i++) {
        if (list[i] != "") {
            if (text != "") {
                text = text + ", ";
            }
            text = text + list[i];
        }
    }

    return text;
}

function checkTrailReady() {
    if (travelerName != "" && chosenArea != "" && chosenTime != "" && chosenWith != "" && chosenNature != "" && chosenEffort != "" && chosenSeason != "") {
        document.getElementById("findTrailButton").disabled = false;
    }
    else {
        document.getElementById("findTrailButton").disabled = true;
    }
}

function showOneMapPart(dimId, brightId, showBright) {
    if (showBright == true) {
        document.getElementById(dimId).hidden = true;
        document.getElementById(brightId).hidden = false;
    }
    else {
        document.getElementById(dimId).hidden = false;
        document.getElementById(brightId).hidden = true;
    }
}

function updateEffortScale(place) {
    for (let i = 0; i < effortDimIds.length; i++) {
        document.getElementById(effortDimIds[i]).hidden = false;
        document.getElementById(effortFullIds[i]).hidden = true;
        document.getElementById(effortArrowIds[i]).hidden = true;
    }

    document.getElementById(effortDimIds[place]).hidden = true;
    document.getElementById(effortFullIds[place]).hidden = false;
    document.getElementById(effortArrowIds[place]).hidden = false;
}

function updateAreaMapParts() {
    let showNorth = false;
    let showCenter = false;
    let showSouth = false;

    if (areaChoices[0] != "" || areaChoices[3] != "") {
        showNorth = true;
    }
    if (areaChoices[1] != "" || areaChoices[3] != "") {
        showCenter = true;
    }
    if (areaChoices[2] != "" || areaChoices[3] != "") {
        showSouth = true;
    }

    showOneMapPart("mapNorthDim", "mapNorthFull", showNorth);
    showOneMapPart("mapCenterDim", "mapCenterFull", showCenter);
    showOneMapPart("mapSouthDim", "mapSouthFull", showSouth);
}

function chooseAreaBox(area, place) {
    if (areaChoices[place] == "") {
        areaChoices[place] = area;
    }
    else {
        areaChoices[place] = "";
    }

    chosenArea = joinChoices(areaChoices);
    updateAreaMapParts();
    checkTrailReady();
}

function chooseTime(time, text) {
    chosenTime = time;
    putInfo("timeInfo", text);
    checkTrailReady();
}

function chooseWith(tripWith, text) {
    chosenWith = tripWith;
    putInfo("withInfo", text);
    checkTrailReady();
}

function chooseNature(nature, type, place) {
    chosenNature = nature;
    chosenNatureType = type;
    putInfo("natureInfo", natureLabels[place]);
    checkTrailReady();
}

function chooseEffort(effort, place) {
    chosenEffort = effort;
    updateEffortScale(place);
    checkTrailReady();
}

function chooseSeason(season, type, text) {
    chosenSeason = season;
    chosenSeasonType = type;
    putInfo("seasonInfo", text);
    checkTrailReady();
}

function getTrailTip() {
    let tip = "כדאי לבחור מסלול קרוב ונוח שמאפשר לכם לצאת בלי יותר מדי תכנון.";

    if (chosenNatureType == "water") {
        tip = "כדאי להתחיל ממסלול נחל קצר, מעיין נגיש או מקום עם מים שאפשר לעצור בו.";
    }
    if (chosenNatureType == "forest") {
        tip = "כדאי לבחור חורשה, יער מוצל או פארק טבע עם שביל הליכה רגוע.";
    }
    if (chosenNatureType == "view") {
        tip = "כדאי לחפש תצפית יפה, שביל נוף או מסלול עם נקודת עצירה לתמונה.";
    }
    if (chosenNatureType == "desert") {
        tip = "כדאי לבחור מסלול פתוח ושקט, במיוחד בשעות נעימות ולא חמות מדי.";
    }

    if (chosenSeasonType == "summer") {
        tip = tip + " בקיץ עדיף לחפש צל, מים ושעות בוקר מוקדמות.";
    }
    if (chosenSeasonType == "winter") {
        tip = tip + " בחורף כדאי לבדוק מזג אוויר ולהעדיף שביל בטוח ולא חלק.";
    }
    if (chosenSeasonType == "spring") {
        tip = tip + " באביב מומלץ לחפש פריחה, נחלים זורמים ומסלולים ירוקים.";
    }
    if (chosenSeasonType == "autumn") {
        tip = tip + " בסתיו מזג האוויר נוח, אז אפשר לבחור גם מסלול פתוח עם נוף.";
    }

    return tip;
}

function findTrail() {
    if (chosenArea == "" || chosenTime == "" || chosenWith == "" || chosenNature == "" || chosenEffort == "" || chosenSeason == "") {
        document.getElementById("trailResult").innerHTML = "יש לענות על כל השאלות כדי לקבל המלצה מתאימה.";
        document.getElementById("trailResult").hidden = false;
    }
    else {
        let notesText = trailNotes;

        if (notesText == "") {
            notesText = "אין";
        }

        let trailText = "סיכום הבחירות של " + travelerName + "<br>" +
            "אזור: " + chosenArea + "<br>" +
            "זמן: " + chosenTime + "<br>" +
            "עם מי: " + chosenWith + "<br>" +
            "סוג טבע: " + chosenNature + "<br>" +
            "מאמץ: " + chosenEffort + "<br>" +
            "עונה: " + chosenSeason + "<br>" +
            "הערות: " + notesText + "<br><br>" +
            "המלצה קצרה: " + getTrailTip();

        document.getElementById("trailResult").innerHTML = trailText;
        document.getElementById("trailResult").hidden = false;
        updateAreaMapParts();
    }
}
