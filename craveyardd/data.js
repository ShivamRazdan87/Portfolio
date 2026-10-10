/*
 * CraveYardd — editable site content
 * ----------------------------------
 * Edit this file to change products, flavours, prices, photos and contact details.
 * No other file needs to change.
 *
 * price:   a number (e.g. 6.5 shows as £6.50), a string (e.g. "From £5"),
 *          or null to show "Price on request" until the real price is confirmed.
 * image:   path to a photo inside assets/photos/ ('' = soft placeholder).
 * favourite: true shows the item in the "Our Favourites" cards.
 *
 * Prices are null because the final CraveYardd menu has not been supplied yet.
 * Do not fill them in until they are confirmed from the current menu.
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
      category: 'Strawberry Cups',
      items: [
        { name: 'Signature Strawberry Cups', favourite: true, price: null,
          description: 'Fresh strawberries layered with smooth chocolate in a cup.',
          image: 'assets/photos/strawberry-cups.webp' }
      ]
    },
    {
      category: 'Waffles',
      items: [
        { name: 'Loaded Waffles', favourite: true, price: null,
          description: 'Warm waffles, loaded with your favourite sauces and toppings.',
          image: '' }
      ]
    },
    {
      category: 'Skewers',
      items: [
        { name: 'Strawberry Skewers', favourite: true, price: null,
          description: 'Fresh strawberries on a skewer, drizzled with chocolate.',
          image: 'assets/photos/strawberry-skewers.webp' }
      ]
    },
    {
      category: 'Kunafa',
      items: [
        { name: 'Kunafa Cups', favourite: true, price: null,
          description: 'Golden kunafa served in a cup.',
          image: '' }
      ]
    },
    {
      category: 'Cakes',
      items: [
        { name: 'Matilda Cake', favourite: true, price: null,
          description: 'Rich, layered chocolate cake with a glossy fudge coating.',
          image: 'assets/photos/matilda-cake.webp' },
        { name: 'Milk Cake', favourite: true, price: null,
          description: 'Soft sponge soaked in milk, topped with cream.',
          image: 'assets/photos/milk-cake.webp' },
        { name: 'San Sebastian Cheesecake', favourite: true, price: null,
          description: 'Creamy Basque-style cheesecake with a caramelised top.',
          image: 'assets/photos/san-sebastian-cheesecake.webp' }
      ]
    },
    {
      category: 'Sauces and Extras',
      // Flavour options shown as chips. Confirm against the current menu.
      flavours: ['Chocolate', 'Strawberry', 'Biscoff', 'Oreo', 'White chocolate', 'Raspberry'],
      items: []
    }
  ],

  // Instagram-style gallery: up to 6 photos from assets/photos/ ('' = placeholder tile).
  gallery: [
    'assets/photos/strawberry-cups.webp',
    'assets/photos/strawberry-skewers.webp',
    'assets/photos/matilda-cake.webp',
    'assets/photos/milk-cake.webp',
    'assets/photos/san-sebastian-cheesecake.webp',
    ''
  ],

  // Brand-story photos for the About section ('' = placeholder).
  about: {
    cart: '',
    team: '',
    customers: ''
  }
};
