    const preparedColor ="green";
    const usedColor = "#AA7A00";
    const grayedOutColor = "#333333";
    const itemColor = "#a133a5"

    const unversalDropdownValue = "All";

    var spellButtons = document.querySelectorAll('button[name="roll_spellroll"]');
    createToggle("Highlight", toggleHighlightPreparedSpells)
    createToggle("Hide", toggleUnpreparedSpellsVisbility)
    createToggle("Custom Font", toggleFont)
    createDropdown("Save Type", "@{save_type}")
    createDropdown("Action", "@{cast_actions}")
    //createDropdown("School", "@{school}")


    function createToggle(title, onToggleFunction, enabledByDefault = false){

        let wrapper = document.createElement("label")
        wrapper.className = "spellsectiontoggles-row"

        let spellsectiontoggles = document.querySelector('div[class="spellsectiontoggles background-color"]')
        spellsectiontoggles.appendChild(wrapper)
        
        //<span class="checkbox">
        let toggleSpan = document.createElement("span")
        toggleSpan.className = "checkbox"
        wrapper.appendChild(toggleSpan)
        
        //<label class="switch" data-i18-titlen="spells" title="spells">
        let label = document.createElement("label")
        label.className = "switch"
        label.setAttribute("title", title)
        toggleSpan.appendChild(label)

        //<input name="attr_toggle_normalspells" title="@{toggle_normalspells}" type="checkbox" value="spells" checked="checked"> 
        let checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = enabledByDefault
        checkbox.addEventListener('change', onToggleFunction)
        label.appendChild(checkbox)

        //<span class="slider"></span>
        let slider = document.createElement("span")
        slider.className = "slider"
        //slider.innerHTML = "::before"
        label.appendChild(slider)

        //<span data-i18n="spells">spells</span>
        let textSpan = document.createElement("span")
        textSpan.innerHTML = title
        textSpan.setAttribute("data-i18n", title)
        wrapper.appendChild(textSpan)

        
    }

    function createDropdown(title, dropdownTitle){
        let wrapper = document.createElement("label")
        wrapper.className = "spellsectiontoggles-row"

        let spellsectiontoggles = document.querySelector('div[class="spellsectiontoggles background-color"]')
        spellsectiontoggles.appendChild(wrapper)
        
        let selectSpan = document.createElement("span")
        //toggleSpan.className = "checkbox"
        wrapper.appendChild(selectSpan)

        //<label class="switch" data-i18-titlen="spells" title="spells">
        let label = document.createElement("label")
        label.className = "switch"
        label.setAttribute("title", title)
        selectSpan.appendChild(label)
        
        let options = getOptionsForDropdownTitle(dropdownTitle)
        let select = document.createElement("select")
        select.className = "simple"
        select.name = "custom-dropdown"
        for (let i = 0; i < options.length; i++) {
            //<option value="fortitude" data-i18n="fortitude">fortitude</option>
            let option = document.createElement("option")
            option.value = options[i]
            option.innerHTML = options[i]
            select.appendChild(option)
        }
        select.addEventListener('change', function() {
            hideByDropdown(this.value, dropdownTitle)
        });
        label.appendChild(select)

        //<span data-i18n="spells">spells</span>
        var textSpan = document.createElement("span")
        textSpan.innerHTML = title
        textSpan.setAttribute("data-i18n", title)
        wrapper.appendChild(textSpan)
    }

    function getOptionsForDropdownTitle(dropdownTitle){
        let selectElement = document.querySelector('select[title="'+dropdownTitle+'"]')
        return [unversalDropdownValue].concat([...selectElement.options].map(o => o.value))       
    }

    function hideByDropdown(value, dropdownTitle){
        for (i = 0; i < spellButtons.length; i++) {
            let parent = spellButtons[i].parentElement.parentElement
            let span = parent.querySelector('span[name="attr_name"]')
            if(value == unversalDropdownValue){
                parent.style.visibility = "visible"
                continue
            }

            if(span.innerHTML.includes("---")){
              continue
            }
    
            let dropdown = parent.querySelector('select[title="'+dropdownTitle+'"]')

            parent.style.visibility = "visible";
            if(dropdown != null && dropdown.value != value){
                parent.style.visibility = "hidden";
            }   
        }
    }

    //----------------------------------------------------------------------------------------------------

    function toggleHighlightPreparedSpells(event){
        let isActive = event.currentTarget.checked

        for (i = 0; i < spellButtons.length; i++) {
            let parent = spellButtons[i].parentElement.parentElement
            let span = parent.querySelector('span[name="attr_name"]')

            if(false == isActive){
                removeColorFromButton(spellButtons[i])
                continue;
            }

            if(span.innerHTML.includes("---")){
                colorButton(spellButtons[i], "black");
                continue;
            }            

            if(span.innerHTML.includes("Mask") || span.innerHTML.includes("Item") || span.innerHTML.includes("Wand") || span.innerHTML.includes("Scroll") || span.innerHTML.includes("Feat")){
                colorButton(spellButtons[i], itemColor);
                continue;
            }

            let attr_uses = parent.querySelector('input[name="attr_uses"]')
            let attr_uses_max = parent.querySelector('input[name="attr_uses_max"]')

            if(attr_uses == null){
                let attr_focus_points = document.querySelector('input[name="attr_focus_points"]')
                if(attr_focus_points!= null && attr_focus_points.value > 0){
                    colorButton(spellButtons[i], preparedColor)
                }else{
                    colorButton(spellButtons[i], usedColor)
                }       
            }else{
                if(span.innerHTML.includes("Staff") ){
                    colorButton(spellButtons[i], "#50aeb5");
                    continue;
                }
                if(attr_uses.value > 0){
                    colorButton(spellButtons[i], preparedColor)
                }else if (attr_uses_max.value > 0){
                    colorButton(spellButtons[i], usedColor)

                }else{
                    colorButton(spellButtons[i], grayedOutColor)        

                }        
            }      
        }
    }

    function toggleUnpreparedSpellsVisbility(event){
        let isActive = event.currentTarget.checked

        for (i = 0; i < spellButtons.length; i++) {
            let parent = spellButtons[i].parentElement.parentElement
            let span = parent.querySelector('span[name="attr_name"]')
            if(span.innerHTML.includes("---") || span.innerHTML.includes("Staff")){
              continue;
            }
    
            let attr_uses = parent.querySelector('input[name="attr_uses"]')
            let attr_uses_max = parent.querySelector('input[name="attr_uses_max"]')

            parent.style.visibility = "visible";
            if(isActive && attr_uses != null && attr_uses.value == 0 && attr_uses_max != null && attr_uses_max.value == 0){
                parent.style.visibility = "hidden";
            }   
        }
    }

    function toggleFont(event){
        let isActive = event.currentTarget.checked

        for (i = 0; i < spellButtons.length; i++) {
            let parent = spellButtons[i].parentElement.parentElement
            let span = parent.querySelector('span[name="attr_name"]')
    
            //span.style.fontFamily = "sans-serif"
            span.style.textTransform = "none"
            if(false == isActive){
                //span.style.fontFamily = null
                span.style.textTransform = null
            }   
        }
    }

    function colorButton(button, color){
        if(button == undefined){
            return;
        }

        button.style.backgroundColor = color
        let parent = button.parentElement.parentElement
        let num2 = parent.querySelector('button[name="roll_spellroll2"]')
        if(num2){
            num2.style.backgroundColor = color
        }
        let num3 = parent.querySelector('button[name="roll_spellroll3"]')
        if(num3){
            num3.style.backgroundColor = color
        }
    }

    function removeColorFromButton(button){
        if(button == undefined){
            return;
        }
        
        button.removeAttribute("style")
        let parent = button.parentElement.parentElement
        let num2 = parent.querySelector('button[name="roll_spellroll2"]')
        if(num2){
            num2.removeAttribute("style")
        }
        let num3 = parent.querySelector('button[name="roll_spellroll3"]')
        if(num3){
            num3.removeAttribute("style")
        }
        
    }

    
