    const preparedColor ="green";
    const usedColor = "#AA7A00";
    const grayedOutColor = "#333333";
    var highlightPreparedToggle = false;
    var unpreparedSpellsHidden = false;
    var nonOneActionSpellsHidden = false;
    var customFontActive = false;

    var spellButtons = document.querySelectorAll('button[name="roll_spellroll"]');
    createBtn("Toggle Highlights", highlightPreparedSpells)
    createBtn("Toggle Visbility", toggleUnpreparedSpellsVisbility)
    createBtn("One Action", toggleOneActionSpellsVisbility)
    createBtn("Toggle Font", toggleFont)

    function createBtn(title, onClickFunction){

      var wrapper = document.createElement("label")

      let spellsectiontoggles = document.querySelector('div[class="spellsectiontoggles background-color"]')
      spellsectiontoggles.appendChild(wrapper)

      var btn = document.createElement("button")
      btn.className = "pc-spellcaster-field btn"
      btn.style= "margin: auto; width: 100%";
      btn.type = "roll"

      btn.addEventListener("click", onClickFunction)

      var span = document.createElement("span")
      span.innerHTML = title

      btn.appendChild(span)
      
      wrapper.appendChild(btn)

    }

    function toggleOneActionSpellsVisbility(){
        for (i = 0; i < spellButtons.length; i++) {
            let parent = spellButtons[i].parentElement
            let span = parent.querySelector('span[name="attr_name"]')
            if(span.innerHTML.includes("---")){
              continue;
            }
    
            let selectElement = parent.querySelector('select[name="attr_cast_actions"]')

            parent.style.visibility = "visible";
            if(false == nonOneActionSpellsHidden && (selectElement.value != "1-action" && selectElement.value != "1-to-2-actions" && selectElement.value != "1-to-3-actions" )){
                parent.style.visibility = "hidden";
            }   
        }
        nonOneActionSpellsHidden = !nonOneActionSpellsHidden;
    }

    function toggleUnpreparedSpellsVisbility(){

        for (i = 0; i < spellButtons.length; i++) {
            let parent = spellButtons[i].parentElement
            let span = parent.querySelector('span[name="attr_name"]')
            if(span.innerHTML.includes("---")){
              continue;
            }
    
            let attr_uses = parent.querySelector('input[name="attr_uses"]')
            let attr_uses_max = parent.querySelector('input[name="attr_uses_max"]')

            parent.style.visibility = "visible";
            if(false == unpreparedSpellsHidden && attr_uses != null && attr_uses.value == 0 && attr_uses_max != null && attr_uses_max.value == 0){
                parent.style.visibility = "hidden";
            }   
        }
        unpreparedSpellsHidden = !unpreparedSpellsHidden;
    }

    function highlightPreparedSpells(){
      
        for (i = 0; i < spellButtons.length; i++) {
            let parent = spellButtons[i].parentElement
            let span = parent.querySelector('span[name="attr_name"]')

            if(highlightPreparedToggle){
                spellButtons[i].removeAttribute("style")
                continue;
            }

            if(span.innerHTML.includes("---")){
                spellButtons[i].style.backgroundColor = "black";
                continue;
            }
            

            let attr_uses = parent.querySelector('input[name="attr_uses"]')
            let attr_uses_max = parent.querySelector('input[name="attr_uses_max"]')

            if(attr_uses == null){
                let attr_focus_points = document.querySelector('input[name="attr_focus_points"]')
                if(attr_focus_points!= null && attr_focus_points.value > 0){
                    spellButtons[i].style.backgroundColor = preparedColor
                }else{
                    spellButtons[i].style.backgroundColor = usedColor
                }       
            }else{
                if(attr_uses.value > 0){
                    if(span.innerHTML.includes("Staff") || span.innerHTML.includes("Mask") || span.innerHTML.includes("Item") || span.innerHTML.includes("Wand")){
                        spellButtons[i].style.backgroundColor = "darkred";
                        continue;
                    }
                    spellButtons[i].style.backgroundColor = preparedColor
                }else if (attr_uses_max.value > 0){
                    spellButtons[i].style.backgroundColor = usedColor

                }else{
                    spellButtons[i].style.backgroundColor = grayedOutColor        

                }        
            }      
        }

        highlightPreparedToggle = !highlightPreparedToggle;
    }

    function toggleFont(){

        for (i = 0; i < spellButtons.length; i++) {
            let parent = spellButtons[i].parentElement
            let span = parent.querySelector('span[name="attr_name"]')
    
            //span.style.fontFamily = "sans-serif"
            span.style.textTransform = "none"
            if(customFontActive){
                //span.style.fontFamily = null
                span.style.textTransform = null
            }   
        }
        customFontActive = !customFontActive;
    }

