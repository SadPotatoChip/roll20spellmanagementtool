# What is this even?
Just the ravings of madman really. Future employers please don't take this code into consideration if you are considering hiring me.

## The Spell Manager
This is a small and very rough tool which makes it easier to manage your spell list for prepared casters in Pathfinder 2e when using the Roll20 VTT. The tool highlights spells you have prepared or have already used todays (based on the "DAILY-USES" inputs for the spell entry) making your character sheet easier to parse.
### How to use?

- Open your pathfinder2e character sheet
- Navigate to the spell list page
- Open your browser console for your character sheet page, note that this is different from the main roll20 page. You can do this by right clicking anywhere on your character sheet, selecting "Inspect" and then navigating to the console window in the developer tools that just poppoed up.
- Paste the entire text from the "highlight_usable_spells.js" text file into the console and press Enter.
- You should now have additional toggles and dropdowns in your spells tab, if you press them you will see what they do.

### Special Notes

- If you reload your character sheet you have to repeat this process, the script doesn't actually change anything about your character sheet, it only modifies its presentation on your screen
- If the spells name contains any of the following words (capitalization matters) the spell field will be highlighted a different color: "Staff", "Mask", "Item", "Wand".

## The Spell Adding Tool
If you don't wanna install 3rd party extensions to your browser or pay the absurd amounts of money Roll20 asks for the pf2e content on its platform this tool allows you to copy paste spells from pf2etools directly into your character sheet.

### How to Use?
- Open your pathfinder2e character sheet
- Navigate to the spell list page
- Open your browser console for your character sheet page, note that this is different from the main roll20 page. You can do this by right clicking anywhere on your character sheet, selecting "Inspect" and then navigating to the console window in the developer tools that just poppoed up.
- Paste the entire text from the "add_spell_from_pf2etools_text.js" text file into the console and press Enter.
- A button and a text box should now be added to your spells tab, copy the whole text of the spell from pf2e tools and paste it into the text box.
- Create a new spell in your sheet and open it for editing.
- Press the newly created OVERRIDE LAST SPELL button.

### Special Notes
- This tool is R O U G H, it won't mess up too much of your sheet even if you do something wrong but it will likely malfunction and will become completely obsolete if pf2e tools changes anything.
- Here is an example of what the text you are pasting should look like:
```
DISTRACTING CHATTER

SPELL 3

AUDITORY ILLUSION 
Traditions arcane, occult

Cast [>>] somatic, verbal

Range 30 feet; Targets 1 creature

Saving Throw Will; Duration varies

You bombard a target with distracting auditory illusions, surrounding them with a tumultuous cacophony of overlapping speech, whispers, screams, and muttering.

The target is flat-footed, takes a –2 status penalty to purely auditory Perception checks, and must succeed at a DC 5 flat check to use auditory abilities or verbal spell components. Similarly, a creature who attempts to affect the target with an auditory effect must succeed at a DC 5 flat check or the attempt fails. The duration depends on the target's Will save.

Critical Success The creature is unaffected.
Success The duration is 1 round.
Failure The duration is 3 rounds.
Critical Failure The duration is 1 minute.
Heightened (7th) You can target up to five creatures.
```