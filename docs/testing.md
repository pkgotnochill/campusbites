# Verification record

Verified on 23 September 2026 on Windows with Node 24.19.0 and pnpm 11.25.0.

## Automated checks

| Command | Result |
| --- | --- |
| `pnpm test:run` | 52 tests passed across 5 files |
| `pnpm lint` | No errors or warnings |
| `pnpm build` | Passed; output in `dist/` |

Coverage includes:
- 36 unique dishes, exactly four per category, all nine reference category names, valid dietary labels, integer-paise pricing and four Popular Picks drawn from the same menu records.
- Immutable reducer updates, removal at quantity one, clear, invalid IDs/actions, maximum quantity 99, and exact INR totals.
- Synchronization between menu cards, Popular Picks and the drawer, with no duplicate heading IDs.
- Keyboard focus recovery after removing the last unit from either a card or the drawer.
- Category filtering without losing cart state, drawer dismissal, restored focus and scrolling.
- Empty cart, maximum quantities, missing-image fallback and fresh-mount reset.
- Combined All/Veg/Non-veg and category filters, keyboard radio navigation, empty-filter recovery and unchanged cart contents.
- Checkout validation, keyboard confirmation, cancellation, duplicate-submit prevention, receipt snapshot and cleared cart.

## Production browser checks

Used the in-app Chromium browser with `pnpm preview --port 4173 --strictPort`.

- All nine category buttons produced four menu cards each. Popular Picks stayed available while filtering.
- Added Classic Cheeseburger through Popular Picks, increased it from the menu, and verified two units and **₹398.00** in the drawer.
- Decreased the drawer quantity twice; the last unit disappeared, total became **₹0.00**, Place Order was disabled and focus moved to the cart heading.
- Added the burger again and removed it using the menu minus button. Both menu and Popular Picks returned to Add; focus stayed on the resulting Add button.
- Desktop: selected Indian, added Chicken Biryani, submitted an empty checkout to see validation, then confirmed a name/table. Success showed a generated CB- order ID and **₹319.00**; reopening the drawer showed an empty cart.
- Mobile: added and increased Flame-Grilled Tandoori Platter through the menu, opened the mobile cart shortcut and confirmed two units for **₹1,098.00**. Checkout and success worked at 320 px; returning to the menu and reopening showed an empty cart.
- Reviewed dietary markers, dish photography and the Chennai footer.
- No console warnings or errors were captured. No broken image elements were observed in the inspected views. All 24 new image files were also decoded successfully during optimization.

## Responsive review

| Viewport | Result |
| --- | --- |
| 320 px | No horizontal page or drawer overflow; checkout and success usable |
| 375 px | Single-column menu, wrapping categories, horizontally scrollable Popular Picks, full-width drawer |
| 768 px | Two menu columns; no page overflow |
| 1280 px | Three menu columns, four Popular Picks columns and four footer columns; no page overflow |

Screenshots in `docs/screenshots/` show the current desktop homepage/menu and mobile menu/cart.

Native buttons, accessible names, visible keyboard focus, dietary shape/text alternatives and existing reduced-motion CSS are retained. Automated tests and manual checks do not constitute screen-reader or cross-browser certification. Safari, Firefox, physical touch hardware, actual 200% browser zoom and live reduced-motion emulation were not tested in this pass.

## Assets and dependencies

- 37 local WebP photographs (36 dishes plus hero), totalling 2,663,434 bytes.
- New photographs are resized to 720 pixels wide; original downloaded JPEGs are excluded from the application.
- Build: JavaScript approximately 253 KB (79 KB gzip); CSS approximately 19 KB (4.8 KB gzip).
- No dependencies were added. No external image/API/font requests are needed at runtime.
- Image sources are recorded in [image-credits.md](image-credits.md).

## Reproduce

1. Run `pnpm test:run`, `pnpm lint`, `pnpm build`, then `pnpm preview`.
2. Visit each category and confirm four dishes. Switch to All dishes and confirm 36.
3. Add a Popular Pick; increase it from its main menu card and check the drawer total.
4. Decrease to one, then press minus again. Confirm removal, an updated total and sensible focus. Repeat from a menu card.
5. Add another dish, open Place Order and submit empty fields. Enter a name and table number, confirm, check the receipt, then return to the menu and verify the cart is empty.
6. Repeat at desktop, tablet and mobile widths; check wrapped filters, reachable controls, footer and no page overflow.
7. Use Tab/Shift+Tab/Enter to navigate; Escape should close the drawer.
8. Refresh: the cart resets by design.

Orders remain a local frontend simulation. No customer information is sent or stored. This pass did not deploy or push changes; CI is defined in `.github/workflows/ci.yml`, but no new hosted run is claimed.
