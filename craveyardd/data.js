/*
 * CraveYardd — editable site content
 * ----------------------------------
 * Edit this file to change products, flavours, prices, photos and contact details.
 * No other file needs to change.
 *
 * Category fields
 *   category: heading shown on the menu
 *   price:    price for every item in the category (e.g. 6.49 shows as "£6.49 each")
 *   tagline:  one line under the heading
 *   items:    the products (see below)
 *   groups:   option lists shown as chips, e.g. sauces and toppings
 *
 * Item fields
 *   name, description
 *   price:     overrides the category price (number, or text like "50p")
 *   image:     photo in assets/photos/ ('' = no photo yet)
 *   favourite: a number (1, 2, 3…) shows the item in "Our Favourites" in that order
 *   tag:       small label on the photo, e.g. 'Fully loaded'
 *
 * Prices come from the current CraveYardd menu board.
 */
window.CRAVEYARDD = {
  config: {
    instagram: 'crave.yardd',
    tiktokUrl: '',        // e.g. 'https://www.tiktok.com/@yourhandle'
    email: '',            // e.g. 'hello@example.com'
    phone: '',            // display format, e.g. '07xxx xxxxxx'
    whatsapp: '',         // international digits only, e.g. '447xxxxxxxxx'. Leave '' to hide the WhatsApp button.
    formEndpoint: ''      // optional form service URL (e.g. Formspree). If empty, enquiries open the visitor's email app (needs email above).
  },

  menu: [
    {
      category: 'Chocolate Strawberry Cups',
      price: 6.99,
      tagline: 'Fresh strawberries, smothered in chocolate and built in a cup.',
      items: [
        { name: 'Dubai Chocolate', tag: 'Signature', favourite: 1,
          description: 'The viral one. Juicy strawberries under silky chocolate with a pistachio and crispy kunafa crunch.',
          image: 'assets/photos/dubai-chocolate-cup.webp' },
        { name: 'Biscoff Crunch', favourite: 2,
          description: 'Strawberries and smooth chocolate, finished with caramelised Biscoff for that cookie-butter crunch.',
          image: 'assets/photos/biscoff-crunch-cup.webp' },
        { name: 'Oreo Crunch',
          description: 'Strawberries and chocolate topped with crushed Oreo – cookies and cream in every spoonful.',
          image: 'assets/photos/oreo-crunch-cup.webp' },
        { name: 'Classic Chocolate Strawberry',
          description: 'Where it all started: fresh strawberries layered with rich, melted chocolate. Simple, glossy, irresistible.',
          image: 'assets/photos/classic-chocolate-cup.webp' }
      ]
    },
    {
      category: 'Waffles',
      price: 6.49,
      tagline: 'Warm, golden and made to order.',
      items: [
        { name: 'Chocolate & Strawberry Waffle',
          description: 'A warm golden waffle with fresh strawberries and a generous chocolate drizzle.',
          image: '' },
        { name: 'Biscoff Waffle',
          description: 'Warm waffle smothered in smooth Biscoff sauce for that caramel-biscuit hit.',
          image: '' },
        { name: 'CraveYardd Loaded Waffle', tag: 'Fully loaded', favourite: 3,
          description: 'Our house special – a warm waffle drowned in Biscoff, hazelnut, chocolate and white chocolate sauces. For serious cravings only.',
          image: '' },
        { name: 'Oreo Waffle',
          description: 'Warm waffle loaded with crushed Oreo and a cookies-and-cream finish.',
          image: '' }
      ]
    },
    {
      category: 'Cakes & Desserts',
      tagline: 'Show-stopping slices and dessert pops.',
      items: [
        { name: 'Milk Cake', price: 6.99,
          description: 'Light sponge soaked in sweet milk and crowned with whipped cream. Soft, cold and dreamy.',
          image: '' },
        { name: 'San Sebastian Cheesecake', price: 6.99,
          description: 'Basque-style cheesecake with a deeply caramelised top and a rich, creamy centre.',
          image: '' },
        { name: 'Real Mango Pop', price: 6.99, tag: 'Must try', favourite: 4,
          description: 'A dessert that looks just like a real mango – with a fruity mango centre inside.',
          image: 'assets/photos/real-mango-pop.webp' },
        { name: 'The Espresso Bean', price: 6.99, favourite: 5,
          description: 'A coffee-bean-shaped dessert made for coffee lovers, with a glossy chocolate finish.',
          image: 'assets/photos/espresso-bean.webp' },
        { name: 'Blueberry Cheesecake', price: 6.99, favourite: 6,
          description: 'Smooth, creamy cheesecake with a bright blueberry finish.',
          image: 'assets/photos/blueberry-cheesecake.webp' },
        { name: 'Matilda Cake', price: 7.99, tag: 'Chocolate lovers', favourite: 7,
          description: 'The ultimate chocolate cake – layers of moist chocolate sponge and glossy fudge frosting.',
          image: '' }
      ]
    },
    {
      category: 'Make It Yours',
      tagline: 'Extra sauces & toppings – 50p each.',
      groups: [
        { title: 'Sauces', options: ['Raspberry', 'Pistachio', 'White Chocolate', 'Biscoff', 'Hazelnut'] },
        { title: 'Toppings', options: ['Oreo Crumbs', 'Kunafa', 'Strawberries'] }
      ]
    }
  ],

  // Instagram-style gallery: up to 6 photos from assets/photos/ ('' = placeholder tile).
  gallery: [
    'assets/photos/cups-lineup.webp',
    'assets/photos/cups-and-trays.webp',
    'assets/photos/biscoff-crunch-cup.webp',
    'assets/photos/cups-and-slices.webp',
    'assets/photos/oreo-tray.webp',
    'assets/photos/real-mango-pop.webp'
  ],

  // Brand-story photos for the About section ('' = placeholder).
  about: {
    cart: '',
    team: '',
    customers: ''
  }
};
