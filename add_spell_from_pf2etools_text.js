const maxLine = 99999

createOverrideButton()

function createOverrideButton(){

    let wrapper = document.createElement("label")

    let spellsectiontoggles = document.querySelector('div[class="spellsectiontoggles background-color"]')
    spellsectiontoggles.appendChild(wrapper)

    let btn = document.createElement("button")
    btn.className = "pc-spellcaster-field btn"
    btn.style= "margin: auto; width: 100%";
    btn.type = "roll"

    btn.addEventListener("click", overrideFinalSpell)

    let span = document.createElement("span")
    span.innerHTML = "Override Last Spell"

    btn.appendChild(span)

    wrapper.appendChild(btn)

    let spellTextInput = document.createElement("textarea")
    spellTextInput.id = "spell-text-input"
    wrapper.appendChild(spellTextInput)
}

function overrideFinalSpell(){
    let spellText = document.getElementById("spell-text-input").value
    let parsedSpell = parseSpell(spellText)

    let rows = document.querySelectorAll('div[class="spell-panel-row"]')
    let row = rows[rows.length-1]

    for (const [key, value] of Object.entries(parsedSpell.textInputs)) {
        trySetInputValue(row, parsedSpell.textInputs, key)
    }

    for (const [key, value] of Object.entries(parsedSpell.textAreas)) {
        trySetInputValueTextArea(row, parsedSpell.textAreas, key)
    }

    for (const [key, value] of Object.entries(parsedSpell.dropdowns)) {
        trySetInputValueDropdown(row, parsedSpell.dropdowns, key)
    }

    focusOnField(row, "name")
}

function parseSpell(spellText){
    let spell = {}
    spell.textInputs = {}
    spell.textAreas = {}
    spell.dropdowns = {}
    let lines = spellText.split("\n");

    spell.textInputs.name = titleCase(lines[0])
    let spellLevel=lines[2].split(" ")[1];

    spell.textInputs.current_level = spellLevel
    spell.textInputs.traits = titleCase(lines[4])

    let castLine = getFirstLineWhichContainsWord(lines, "cast")    
    //let actions = getActionsFromLine(castLine)
    if(castLine!=null){
        let castTextDivided = castLine.split("] ")
        spell.textInputs.cast = castTextDivided[castTextDivided.length-1]
    }
    

    let rangeLine = getFirstLineWhichContainsWord(lines, "range")
    if(rangeLine!=null){
        let rangeTextDivided = rangeLine.split(";")
        spell.textInputs.range = rangeTextDivided[0].substring(6)
    }

    let areaLine = getFirstLineWhichContainsWord(lines, "area")
    if(areaLine!=null){
        let areaTextDivided = areaLine.split("Area ")
        spell.textInputs.area = areaTextDivided[areaTextDivided.length-1]
    }

    let targetLine = getFirstLineWhichContainsWord(lines, "target")
    if(targetLine!=null){
        let targetTextDivided = targetLine.split("Targets ")
        spell.textInputs.target = targetTextDivided[targetTextDivided.length-1]
    }

    let durationLine = getFirstLineWhichContainsWord(lines, "duration")
    if(durationLine!=null){
        let durationTextDivided = durationLine.split("Duration ")
        spell.textInputs.duration = durationTextDivided[durationTextDivided.length-1]
    }

    let critSuccessStartIndex = getIndexOfLineThatStartsWith(lines, "Critical Success")
    let successStartIndex = getIndexOfLineThatStartsWith(lines, "Success")
    let failureStartIndex = getIndexOfLineThatStartsWith(lines, "Failure")
    let critFailureStartIndex = getIndexOfLineThatStartsWith(lines, "Critical Failure")
    let hightenedSectionIndex = getIndexOfLineThatStartsWith(lines, "Heightened (")

    if(critSuccessStartIndex!=maxLine){
        let critSuccess = concatStringsBetweenIndexes(lines, critSuccessStartIndex, Math.min(successStartIndex - 1, failureStartIndex - 1, critFailureStartIndex - 1, hightenedSectionIndex - 1, lines.length - 1))
        spell.textAreas.save_critical_success = critSuccess.slice("Critical Success ".length);
    }
    if(successStartIndex!=maxLine){
        let success = concatStringsBetweenIndexes(lines, successStartIndex, Math.min(failureStartIndex - 1, critFailureStartIndex - 1, hightenedSectionIndex - 1, lines.length - 1))
        spell.textAreas.save_success = success.slice("Success ".length);
    }
    if(failureStartIndex!=maxLine){
        let fail = concatStringsBetweenIndexes(lines, failureStartIndex, Math.min(critFailureStartIndex - 1, hightenedSectionIndex - 1, lines.length - 1))
        spell.textAreas.save_failure = fail.slice("Failure ".length);
    }
    if(critFailureStartIndex!=maxLine){
        let critFail = concatStringsBetweenIndexes(lines, critFailureStartIndex, Math.min(hightenedSectionIndex - 1))
        spell.textAreas.save_critical_failure = critFail.slice("Critical Failure ".length);
    }

    if(hightenedSectionIndex!=maxLine){
        spell.textAreas.heightened = concatStringsBetweenIndexes(lines, hightenedSectionIndex, lines.length - 1)
    }

    let descStart = (Math.max(4, getIndexOfLineThatStartsWith(lines, "Cast", -1), getIndexOfLineThatStartsWith(lines, "Range", -1), getIndexOfLineThatStartsWith(lines, "Targets", -1), getIndexOfLineThatStartsWith(lines, "Saving Throw", -1), getIndexOfLineThatStartsWith(lines, "Duration", -1)) + 2);
    let descEnd = (Math.min(critSuccessStartIndex -1, successStartIndex - 1, failureStartIndex - 1, critFailureStartIndex - 1, hightenedSectionIndex - 1, lines.length - 1))
    let description = concatStringsBetweenIndexes(lines, descStart, descEnd
        )
    spell.textAreas.description = description
    
    let castActionsString = castLine.slice(
        castLine.indexOf('[') + 1,
        castLine.lastIndexOf(']'),
      );
    var castActions = getCastActionsFromString(castActionsString)
    if(castActions!=null){
        spell.dropdowns.cast_actions = castActions;
    }

    return spell
}

function getFirstLineWhichContainsWord(lines, word){
    for (let index = 0; index < lines.length; index++) {
        const element = lines[index]
        if(element.toLowerCase().includes(word.toLowerCase())){
            return element
        }
    }
    return null
}

function getIndexOfLineThatStartsWith(lines, word, defaultVal = maxLine){
    for (let index = 0; index < lines.length; index++) {
        const element = lines[index]
        if(element.startsWith(word)){
            return index
        }
    }
    return defaultVal
}

function concatStringsBetweenIndexes(lines, first, last){
    let str = ""
    for (let index = first; index <= last; index++) {
        const element = lines[index]
        str += element + "\n"
    }
    return str;
}

function getCastActionsFromString(str){
    if(str == "F"){
        return "free_action"
    }
    if(str == "R"){
        return "reaction"
    }
    if(str == ">"){
        return "1-action"
    }
    if(str == ">>"){
        return "2-action"
    }
    if(str == ">>>"){
        return "3-action"
    }
    if(str == ">] to [>>>"){
        return "1-to-3-actions"
    }
    if(str == ">>] to [>>>"){
        return "2-to-3-actions"
    }
    return "other"
}

//--------------------------------------------

function trySetInputValue(row, spell, inputTitle){
    let value = spell[inputTitle]
    if(value == null){
        return
    }
    
    
    let input = row.querySelector('input[title="@{'+inputTitle+'}"]')
    input.value = value
    input.focus()
}

function trySetInputValueTextArea(row, spell, inputTitle){
    let value = spell[inputTitle]
    if(value == null){
        return
    }
    
    
    let input = row.querySelector('textarea[title="@{'+inputTitle+'}"]')
    input.value = value
    input.focus()
}

function trySetInputValueDropdown(row, spell, inputTitle){
    let value = spell[inputTitle]
    if(value == null){
        return
    }
    
    
    let input = row.querySelector('select[title="@{'+inputTitle+'}"]')
    input.value = value
    input.focus()
}

function focusOnField(row, inputTitle){
    let input = row.querySelector('input[title="@{'+inputTitle+'}"]')
    input.focus()
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }