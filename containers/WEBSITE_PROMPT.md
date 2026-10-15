# Website build prompt: Shivaak Enterprises

Copy everything below the line into an AI website builder or coding assistant. Keep the **Business brief** and **Must-haves**, then keep only the one **Design concept** you want built.

---

Build a single-page, mobile-friendly website for my business.

## Business brief

- **Company:** Shivaak Enterprises
- **What we do:** We supply every type of container to customers. Customers can buy, rent, or have a container custom-built, and we deliver it to their site.
- **Container types:**
  - **Shipping containers:** 20 ft, 40 ft and 40 ft high cube, new (one-trip) and graded used. Cargo-worthy and wind and water tight.
  - **Office containers:** portable site offices and cabins, insulated, with wiring, lights, AC points, windows and flooring.
  - **Custom containers:** cafés, shops, homes, washroom blocks, labs and workshops, built to the customer's drawing, in their colours and branding.
  - **Storage containers:** dry, lockable storage for sites, warehouses, farms and homes, with optional shelving and ventilation.
  - **Refrigerated (reefer) containers:** chilled and frozen units for food, pharma and cold storage.
  - **Special containers:** open top, flat rack, side-door, half-height and 10 ft units.
- **Services:** buy, rent or lease (monthly or long-term), customise (in-house fabrication), and delivery and installation (trailer or crane, placed and levelled).
- **Process (4 steps):** 1) customer tells us the type, size, quantity and location; 2) we send a clear quote with photos of the actual unit; 3) we prepare it (inspection, repairs, paint, or a full custom build); 4) we deliver and place it on site.
- **Why us:** inspected stock, honest grading with real photos, in-house fabrication, fast delivery from ready stock, buy-back options, one point of contact.
- **Audience:** construction companies, businesses, shop and café owners, farms, exporters and homeowners in India.

## Contact details

- Phone and WhatsApp: **+91 99584 46787** (WhatsApp link: `https://wa.me/919958446787`)
- Email: **shivaakenterprises4926@gmail.com**
- Yard address: *[add address]*
- Hours: Monday to Saturday, 9 am to 7 pm

## Size guide (typical ISO dimensions)

| Size | External (L × W × H) | Internal (L × W × H) | Door opening | Capacity | Floor area |
|---|---|---|---|---|---|
| 10 ft | 2.99 × 2.44 × 2.59 m | 2.83 × 2.35 × 2.39 m | 2.34 × 2.28 m | ≈ 16 m³ | ≈ 6.8 m² |
| 20 ft | 6.06 × 2.44 × 2.59 m | 5.90 × 2.35 × 2.39 m | 2.34 × 2.28 m | ≈ 33 m³ | ≈ 13.9 m² (150 sq ft) |
| 40 ft | 12.19 × 2.44 × 2.59 m | 12.03 × 2.35 × 2.39 m | 2.34 × 2.28 m | ≈ 67 m³ | ≈ 28.3 m² (300 sq ft) |
| 40 ft high cube | 12.19 × 2.44 × 2.90 m | 12.03 × 2.35 × 2.69 m | 2.34 × 2.58 m | ≈ 76 m³ | ≈ 28.3 m² (300 sq ft) |

Note under the table: "Dimensions vary slightly by manufacturer."

## Must-haves (every concept)

1. Sections: header with phone number, hero, container types, services (buy / rent / customise / deliver), size guide, 4-step process, why choose us, quote form, FAQ, footer.
2. **Quote form:** name and phone are required. Also ask for buy/rent/custom, container type, size, quantity, delivery city and details. On submit, open WhatsApp to +91 99584 46787 with all the answers pre-filled in the message. Offer email as a second option. Show a clear error if name or phone is missing.
3. Every "Get a price" button on a container type pre-selects that type in the quote form.
4. A floating WhatsApp button in the bottom-right corner on every page.
5. **FAQ:** new vs used, renting, how long custom builds take (simple changes take a few days; full conversions take 2–4 weeks), what's needed on site for delivery (level, firm ground and truck access, with a crane for tight spaces), and delivery outside the city.
6. Works at 390px phone width with no sideways scrolling, a collapsible mobile menu, visible keyboard focus, and respect for "reduced motion" settings.
7. Plain HTML, CSS and JavaScript in one file, with fonts from Google Fonts. Draw the containers as inline SVG illustrations, with no stock photos until I supply real ones.
8. Plain, direct copy written for customers, not marketing fluff. Don't invent statistics or reviews.

## Design concept (keep ONE)

### Option 1: Industrial classic
- Colours: navy `#14213A`, rust orange `#D9531E`, sand `#F4F1EA`, near-black `#121722`.
- Fonts: Archivo (headings and body) and IBM Plex Mono (small labels).
- Hero: "Any box. Any size. Delivered." with an SVG of stacked containers (a rust 40 ft high cube, a navy office container with windows on top, and a crane hook) and a stats row underneath.
- Container types as six cards, each with a small SVG of that container. The size guide uses tabs (20 ft / 40 ft / 40 ft HC), each showing a spec table and a drawing with a length dimension.

### Option 2: Yard configurator (interactive)
- Colours: deep teal `#0E3B43`, signal yellow `#F2C230`, concrete grey `#C9CDCF`, white, black.
- Fonts: Big Shoulders Display (uppercase headings) and Barlow (body).
- **Hero = a working container builder.** The left panel has selectable chips for size (10 / 20 / 40 / 40 HC), use (shipping, storage, office, custom build, refrigerated), add-ons (windows, side door, insulation, electricals, your branding), buy or rent, and a quantity stepper. The right panel has a live SVG container that changes length and height with the size, changes colour with the use, and shows windows, a door, a "YOUR BRAND" label or a cooling unit as they're chosen. Underneath, a readout shows outside length, floor area and inside height.
- The quote section shows a black summary box of the configured spec (for example "2 × 40 ft high cube office container, Buy, Add-ons: Windows, Your branding") and sends it on WhatsApp together with the customer's name, phone and city.
- The rest of the page is simple: a grid of container types, four ways to work with us, a yellow quote band and a black footer.

### Option 3: Stacked
- Colours: sky `#DCE8EE` background, container red `#B8312F`, blue `#1F4E8C`, green `#2F6B4F`, orange `#E07A1F`, steel `#2B2F33`.
- Fonts: Saira Stencil One (headings, like stencilled container markings) and Work Sans (body).
- Hero: one animation on page load, where a crane lowers a red corrugated container that has the headline "Every container you'll ever need" stencilled on its side.
- Each section below looks like the side of a different coloured container, with corrugated stripes and a small ID plate in the corner (for example "SVKU 100201 · 22G1"). The size guide is a table that includes a "Good for" column.

### Option 4: Blueprint
- Colours: blueprint blue `#163A86` with a fine grid, line blue `#B9CCF2`, paper `#F5F7FB`, graphite `#1A2233`, safety yellow `#FFB000`.
- Fonts: Bricolage Grotesque (headings) and Hanken Grotesk (body).
- Positioning: leads with custom builds (offices, cafés, shops, homes, washroom blocks, workshops), with standard containers to buy or rent second.
- Hero: "Offices, shops and homes, built from steel containers." Beside it, a technical floor plan of a 40 ft office (open office, meeting room, washroom, pantry) with dimension lines (12.19 m × 2.44 m) and a side elevation. The lines draw themselves once on load.
- Builds are shown as small blueprint plan drawings with captions. Standard stock is a spec list next to a size table. The process steps read Brief, Drawing & price, Fabrication, Delivery. The enquiry form is labelled "Start a project".
