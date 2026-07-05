# Image & Video Prompts — The Calcutta Classics

All primary assets were generated via the **Higgsfield MCP** (model:
`nano_banana_pro`, aspect 4:5, 1k — hero at 2k) and processed by
`scripts/process-images.mjs` (sharp → optimized JPEG + blur placeholders in
`data/images.generated.ts`). Keep this file as the regeneration recipe.

## Global style suffix (append to every image prompt)

> professional food photography, 45-degree overhead angle, dark slate
> surface, warm amber rim light, visible steam, shallow depth of field,
> minimal props, moody Kolkata street-food energy, rich texture, no text,
> no hands, 4:5

## Dishes (`public/images/dishes/<slug>.jpg`)

| Slug | Subject prompt (before suffix) |
| --- | --- |
| steam-momo | A plate of six steamed chicken momos with glossy pleated wrappers, one broken open showing juicy chicken filling, small steel bowl of fiery red chutney beside |
| fried-momo | Golden deep-fried momos with blistered crispy skin, scattered spring onion, red chutney dip in a steel bowl |
| peri-peri-momo | Fried momos dusted heavily in bright red peri peri spice powder, chili flakes scattered around, small chutney bowl |
| sweet-corn-chaat | Buttered sweet corn chaat in a small kraft paper bowl, chaat masala dusting, lime wedge, chopped onion and fresh coriander on top |
| chips-chaat | Crispy potato chips chaat topped with chopped onions, tomato, tangy green and red chutney drizzle, chaat masala and coriander |
| maggi | Steaming plate of masala Maggi instant noodles with vegetables topped with a soft fried egg and chili flakes |
| momo-burger | A street-style burger with a crispy golden fried momo patty, fresh slaw and dripping house sauce in a soft sesame bun |
| french-fries | Golden french fries piled in a paper cone, coarse salt crystals visible, small bowl of red dipping sauce beside |
| royal-chicken-bucket | A small kraft bucket overflowing with crispy spice-rubbed fried chicken pieces, heat shimmer and steam rising, scattered chili flakes |
| cheese-chicken-bombs | Round golden breaded chicken cheese bombs on a plate, one broken open with a molten mozzarella cheese pull |
| bhetki-fish-fry | Two Kolkata-style bhetki fish fry cutlets with dark crispy breadcrumb crust, kashundi mustard dip, lime wedge and onion rings |
| belgian-coffee | A small glass cup of thick dark Belgian coffee with a creamy chocolate-flecked top, steam rising, a few coffee beans scattered |
| crispy-chicken-pizza | A rustic crispy chicken pizza topped with shredded chicken, molten mozzarella, sweet corn, red chilli flakes, oregano and crispy herbs, one slice slightly pulled |

## Combos (`public/images/combos/<slug>.jpg`)

| Slug | Subject prompt |
| --- | --- |
| bhetki-fish-fry-combo | A combo meal spread on a dark wooden tray: two bhetki fish fry cutlets, golden french fries, four steamed momos and a small glass of Belgian coffee |
| crispy-chicken-combo | A combo meal spread on a dark wooden tray: three crispy chicken strips, two breaded cheese bombs, french fries, four momos and a Belgian coffee |
| burger-combo | A combo meal spread on a dark wooden tray: two momo burgers, a pile of fried potato chips and two cups of Belgian coffee |
| signature-meal-box | A generous street-food meal box in kraft packaging: fish fry, french fries, chicken strips, cheese bombs, momos and two Belgian coffees arranged as a feast |

## Hero & mood (`public/images/hero|mood/*.jpg`)

| File | Subject prompt |
| --- | --- |
| hero/momo-basket (2k) | A bamboo steamer basket full of momos with the lid lifted, dramatic thick steam rising into darkness, a small bowl of fiery red chutney beside |
| mood/coffee-pour | Thick dark Belgian coffee pouring from a steel kettle spout into a small glass cup, no person visible, steam curling |
| mood/kitchen-action | Peri peri momos captured mid-toss above a dark carbon-steel wok, motion blur, flame flare below, red spice dust suspended in the air, no person visible |
| mood/storefront-dusk | A small glowing street-food stall at dusk in North Kolkata, warm tungsten bulbs, steam drifting from bamboo steamers, vintage shophouse and tram wires in the soft background, blue hour sky |

## Texture close-ups (`public/images/textures/*.jpg`, section backgrounds)

| File | Subject prompt |
| --- | --- |
| cheese-pull | Extreme macro close-up of a molten mozzarella cheese pull stretching between two halves of a golden breaded chicken bomb |
| fry-crunch | Extreme macro of a golden crispy fried crust mid-shatter, crumbs suspended in the air, dramatic side light |
| chutney-swirl | Extreme close-up of glossy red chili chutney being swirled in a small steel bowl, oil sheen catching warm light, chili flecks visible |

## Hero video (feature 68/99)

Prompt (Higgsfield `generate_video`, start frame = hero/momo-basket):

> Slow cinematic drift over a bamboo steamer basket of momos, thick steam
> rising and curling continuously, warm amber rim light flickering softly,
> seamless loop, no camera cuts, 6–8 seconds

Rules: `<video autoplay muted loop playsinline preload="none" poster=…>`,
WebM+MP4 ≤2MB, mounted only after LCP, paused off-screen, static poster on
`prefers-reduced-motion` / Save-Data. If the encoded file cannot be brought
under 2MB, the layered fallback ships instead: poster + canvas steam
particles + slow Ken Burns (implemented in the hero).

## Pipeline notes

- `scripts/process-images.mjs`: raw downloads → max-width JPEG (hero 1920,
  rest 1280, q82) + 16px WebP `blurDataURL`s → `data/images.generated.ts`.
- Multi-format serving (AVIF/WebP at 640/1080/1920) is delegated to the
  `next/image` optimizer at request time — pre-generating those variants
  would duplicate what Next already does with the committed JPEG masters.
- `TODO(images)`: none — all 24 manifest images generated. If any image is
  regenerated later, re-run `node scripts/process-images.mjs`.
