# mtm6302-capstone-raylui

lui ka wai
student number : 041163917
Pokedex

# Capstone Project - Part 4

## Steps Taken

- Created HTML structure based on mockup
- Designed with CSS Flexbox/Grid
- Used media queries for responsiveness
- Added search filter in JavaScript

## Resources Used

- https://pokeapi.co/
- W3Schools, MDN Web Docs
- Google Fonts

## Challenges

1. Pokémon cards not showing
   • At first, all cards were in HTML, and when switching to fetch(), nothing showed. I didn’t know if the API was working.
   • Fixed by checking the console and making sure cards were created inside JavaScript after data loaded.
2. Pagination didn’t work
   • Load More and Back buttons didn’t show the right cards. Sometimes all cards disappeared or showed at once.
   • I fixed this by using currentPage, limit, and offset to load 15 cards per page.
3. Popup issues
   • Clicking images didn’t open the popup, or it opened but couldn’t close.
   • I fixed it by only adding the click event to the image, and made the popup close on ESC or clicking outside. 4. Checkbox didn’t remember selection
   • The “catched” toggle didn’t stay checked after reloading the page.
   • I solved this with localStorage, saving by Pokémon ID and checking it when rendering. 5. File and path problems
   • Sometimes images or scripts didn’t load because I had the wrong file path.
   • I checked the file names and made sure the folder structure matched the links in HTML.
