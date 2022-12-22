# What is this even?

This is a small and very rough tool which makes it easier to manage your spell list for prepared casters in Pathfinder 2e when using the Roll20 VTT. The tool highlights spells you have prepared or have already used todays (based on the "DAILY-USES" inputs for the spell entry) making your character sheet easier to parse.

## How to use?

- Open your pathfinder2e character sheet
- Navigate to the spell list page
- Open your browser console for your character sheet page, note that this is different from the main roll20 page. You can do this by right clicking anywhere on your character sheet, selecting "Inspect" and then navigating to the console window in the developer tools that just poppoed up.
- Paste the entire text from the "highlight_usable_spells.js" text file into the console and press Enter.
- You should now have additional buttons on your character sheet, if you press them you will see what they do.

## Special Notes

- If you reload your character sheet you have to repeat this process, the script doesn't actually change anything about your character sheet, it only modifies its presentation on your screen
- If the spells name contains any of the following words (capitalization matters) the spell field will be highlighted a different color: "Staff", "Mask", "Item", "Wand".
