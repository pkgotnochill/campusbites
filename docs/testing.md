# Verification record

Verified locally on 20 September 2026 using Windows, Node 24.19.0 and pnpm 11.25.0.

## Automated checks

| Check                                           | Result                                    |
| ----------------------------------------------- | ----------------------------------------- |
| `pnpm lint`                                     | Passed with zero errors and zero warnings |
| `pnpm test:run`                                 | 38 tests passed across 4 files            |
| `pnpm build`                                    | Passed; 49 modules transformed            |
| Clean source copy: frozen-lockfile install      | Passed, using the existing package cache  |
| Initial baseline clean copy: lint, tests, build | All passed; 29 tests                      |

The clean copy contained only source files and declared package/configuration files, not the original node_modules. This verifies that the project does not depend on the temporary formatting tool or other workspace tools. It is not a test of an empty network cache or a different operating system.

Test coverage by behavior:

- Menu: unique IDs, required fields, valid categories, positive integer prices, all/category filtering, empty results.
- Cart: first and repeated addition, immutable updates, increment/decrement, explicit removal, absent IDs, unsupported actions, prototype-property IDs, and 99-item limits.
- Totals: zero, mixed items, changes/removal, paise fractions, Indian number grouping, maximum-size cart.
- Interface: full ordering flow, category changes preserving the cart, keyboard filtering, skip navigation, drawer opening/dismissal and focus/scroll restoration, focus recovery after removal, and reset on a fresh mount.
- Edges: disabled upper/lower quantity controls, no-results message, one-time image fallback, decorative alternative text.

## Browser verification

Tested in the Codex in-app Chromium browser, including the production site served by `pnpm preview` at `http://127.0.0.1:4173/`.

- Confirmed two Classic Margheritas plus one Fresh Lemonade show **₹577.00** in the production cart.
- Confirmed filtering to Drinks hides pizza cards while retaining pizza in the cart.
- Confirmed removing lemonade returns the total to ₹498.00 and focuses the remaining Remove button.
- Confirmed the mobile shortcut opens the separate modal cart and focuses Close cart. Escape restores focus to the opener and unlocks background scrolling.
- Confirmed backdrop dismissal, native modal background inertness, and keyboard navigation within the drawer. Chromium may momentarily focus browser chrome when tabbing past an endpoint; background page controls remain inert.
- Confirmed mobile quantity controls update the total visibly.
- All 13 original photo elements and two sample-cart thumbnails loaded successfully in the production page.
- No warning/error console messages were captured during the reviewed flows.

### Layout checks

| Viewport width | Expected cards per row | Cart layout             |
| -------------- | ---------------------- | ----------------------- |
| 320 px         | 1                      | Full-width modal drawer |
| 375 px         | 1                      | Full-width modal drawer |
| 640 px         | 2                      | Full-width modal drawer |
| 768 px         | 2                      | Full-width modal drawer |
| 1024 px        | 3                      | Right-hand modal drawer |
| 1280 px        | 3                      | Right-hand modal drawer |
| 1440 px        | 3                      | Right-hand modal drawer |

Viewport overrides were used for responsive testing. Horizontal overflow is checked against document client width, accounting for the browser scrollbar. A 320 px overflow caused by a minimum body width was found and fixed. Narrow-screen menu headings were also adjusted to keep the count readable.

Screenshots are stored in `docs/screenshots/`. The mobile captures intentionally show the focused menu/cart workflows rather than attempting to compress the entire long mobile page into one image.

### Accessibility review

- JSX accessibility lint passed.
- Semantic landmarks, heading levels, button names, category pressed states, and the cart status region were inspected in the browser's DOM snapshot.
- Keyboard filtering/navigation and removal-focus behavior passed the automated interaction tests; removal focus was also confirmed in the browser.
- Visible focus rings and usable touch controls were inspected on narrow screens.
- Calculated text contrast ratios: body 12.29:1, muted text 5.32:1, primary button 5.94:1, selected category 8.33:1, hero note 4.83:1, cart note 5.44:1.
- The reduced-motion media query was reviewed in source and disables transitions, animations, and smooth scrolling.

**Not verified:** spoken output with a real screen reader, physical touch hardware, Safari/Firefox, actual 200% browser zoom, and the reduced-motion setting in a live browser. The connected browser did not change zoom when the zoom keyboard shortcut was sent. Responsive viewport tests verify reflow but are not claimed as an actual browser-zoom test.

## Asset and build sizes

- 13 WebP photographs total **898,776 bytes** (about 878 KiB).
- Hero: about 235 KiB; each menu image is below 120 KiB.
- Production JavaScript: about 243 KB, 76.3 KB gzip.
- Production CSS: about 17.3 KB, 4.4 KB gzip.
- Photos and the application make no external requests at runtime.

## Reproduce the manual checks

1. Run `pnpm build`, then `pnpm preview`, and open the printed URL.
2. Add Classic Margherita twice, select Drinks, and add Fresh Lemonade. Open Your cart. Expect 3 items and ₹577.00.
3. Decrease the pizza quantity. Expect ₹328.00 and a disabled minus button at quantity 1.
4. Increase it again, remove the lemonade, then remove the pizza. Expect ₹498.00, then an empty cart and ₹0.00.
5. Use only Tab, Shift+Tab, Enter and Space to navigate filters and buttons. Verify focus remains visible and meaningful after removing a row.
6. Close and reopen the drawer; verify preserved contents, Escape/backdrop dismissal, restored focus and page scrolling. Try the widths in the table. Confirm wrapping filters, column counts, no page overflow, and the mobile shortcut.
7. In a browser with these controls, additionally check 200% zoom and an emulated reduced-motion preference.
8. Test with a screen reader if available; announcements should be concise and controls named for the dish.
9. Refresh the page. The cart should reset by design.

## CI and repository limitations

GitHub Actions is configured but has not run on GitHub: no remote was supplied or published. Its install/lint/test/build commands have passed locally.

The repository was initialized on `main` and the initial tooling commit was created. Later Git writes are blocked by Windows sandbox deny rules on `.git/index.lock`, even after filesystem permission grants. Application files remain intact. The task's `outputs/finish-git.ps1` provides scoped, meaningful commits to run from a normal PowerShell terminal outside that sandbox. This is a tooling limitation, not a failure of the application checks.

ESLint 9 is compatible with the installed JSX accessibility plugin but deprecated by the registry; a future compatible tooling update is recommended. This does not affect the browser bundle.

## Drawer revision

The cart reducer, menu data and dependencies are unchanged. Footer branding now reads Campus Bites. The Vitest include pattern is restricted to src tests so temporary verification copies are not collected. jsdom mocks only dialog open/close; native modality and Escape were checked in the real browser. The clean-copy result above refers to the initial implementation; current drawer changes passed the main workspace checks.

No custom cursor or stuck top-left marker was found in source or reproduced in the inspected browser. The orange utensils mark belongs to the existing brand logo.

## Demo checkout revision

- Added five integration tests for empty-cart gating, required/invalid fields, keyboard confirmation with a mixed ₹577 receipt, cancellation/back navigation, and repeated-submit prevention. Added a reducer test for clearing the cart. All 38 tests across four files, lint and production build passed after the final code changes.
- Verified Menu → Add item → Cart → Place Order → Fill form → Confirm Order → Success → Back to menu → empty cart in the production browser at desktop (1440 px) and mobile (375 px) sizes. The receipt displayed ₹249.00 and a generated CB- reference; reopening the cart displayed ₹0.00 with Place Order disabled.
- Verified field errors focus the first invalid input and clear when edited, keyboard Tab/Enter confirmation focuses the success heading, and Escape cancels checkout while retaining the cart.
- Checked the checkout and success panels at 320 px without horizontal drawer overflow. Back to cart restores focus to its heading and preserves the current total.
- Confirmation is synchronous and local: no network request, payment, storage or restaurant submission occurs. Receipt details are cleared when the drawer closes. The historical clean-copy check above predates checkout.
