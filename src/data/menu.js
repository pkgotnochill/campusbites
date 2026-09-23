import dish0 from '../assets/images/menu/signature-tandoori.webp'
import dish1 from '../assets/images/menu/signature-kulcha.webp'
import dish2 from '../assets/images/menu/signature-risotto.webp'
import dish3 from '../assets/images/menu/signature-paneer.webp'
import dish4 from '../assets/images/menu/starter-samosa.webp'
import dish5 from '../assets/images/menu/starter-chicken65.webp'
import dish6 from '../assets/images/menu/starter-paneer.webp'
import dish7 from '../assets/images/menu/starter-fish.webp'
import dish8 from '../assets/images/menu/burger-paneer.webp'
import dish9 from '../assets/images/menu/pizza-tandoori.webp'
import dish10 from '../assets/images/menu/indian-butter-chicken.webp'
import dish11 from '../assets/images/menu/indian-palak.webp'
import dish12 from '../assets/images/menu/indian-dal.webp'
import dish13 from '../assets/images/menu/indian-biryani.webp'
import dish14 from '../assets/images/menu/asian-noodles.webp'
import dish15 from '../assets/images/menu/asian-manchurian.webp'
import dish16 from '../assets/images/menu/asian-rice.webp'
import dish17 from '../assets/images/menu/asian-paneer.webp'
import dish18 from '../assets/images/menu/main-chicken.webp'
import dish19 from '../assets/images/menu/main-ravioli.webp'
import dish20 from '../assets/images/menu/main-lamb.webp'
import dish21 from '../assets/images/menu/main-paneer.webp'
import dish22 from '../assets/images/menu/dessert-jamun.webp'
import dish23 from '../assets/images/menu/drink-lassi.webp'
import margherita from '../assets/images/margherita.webp'
import pepperoni from '../assets/images/pepperoni.webp'
import garden from '../assets/images/garden.webp'
import classic from '../assets/images/classic.webp'
import chicken from '../assets/images/chicken.webp'
import bean from '../assets/images/bean.webp'
import lemonade from '../assets/images/lemonade.webp'
import coffee from '../assets/images/coffee.webp'
import shake from '../assets/images/shake.webp'
import brownie from '../assets/images/brownie.webp'
import cheesecake from '../assets/images/cheesecake.webp'
import sundae from '../assets/images/sundae.webp'

export const categories = [
  { id: 'signature', label: 'Signature', icon: 'plate' },
  { id: 'starters', label: 'Starters', icon: 'leaf' },
  { id: 'burgers', label: 'Burgers', icon: 'burger' },
  { id: 'pizza', label: 'Pizza', icon: 'pizza' },
  { id: 'indian', label: 'Indian', icon: 'plate' },
  { id: 'asian', label: 'Asian', icon: 'plate' },
  { id: 'main-course', label: 'Main Course', icon: 'plate' },
  { id: 'desserts', label: 'Desserts', icon: 'cake' },
  { id: 'beverages', label: 'Beverages', icon: 'cup' },
]

export const menu = [
  {
    id: 'pizza-margherita',
    diet: 'veg',
    name: 'Classic Margherita',
    categoryId: 'pizza',
    priceMinor: 24900,
    description: 'Melty mozzarella, rich tomato sauce and a little fresh basil.',
    image: margherita,
    imageAlt: 'Golden pizza topped with mozzarella and fresh basil',
  },
  {
    id: 'pizza-pepperoni',
    diet: 'nonveg',
    name: 'Pepperoni Please',
    categoryId: 'pizza',
    priceMinor: 34900,
    description: 'Crispy pepperoni, generous cheese and our signature tomato base.',
    image: pepperoni,
    imageAlt: 'Sliced pizza with pepperoni and melted cheese',
  },
  {
    id: 'pizza-garden',
    diet: 'veg',
    name: 'Garden Party',
    categoryId: 'pizza',
    priceMinor: 29900,
    description: 'Colourful peppers, sweet corn and onions on a golden crust.',
    image: garden,
    imageAlt: 'Vegetable pizza with colourful toppings on a wooden board',
  },
  {
    id: 'burger-classic',
    diet: 'nonveg',
    popular: true,
    name: 'Classic Cheeseburger',
    categoryId: 'burgers',
    priceMinor: 19900,
    description: 'A grilled chicken patty, cheddar, crisp lettuce and our house sauce.',
    image: classic,
    imageAlt: 'Cheeseburger with lettuce and tomato in a sesame bun',
  },
  {
    id: 'burger-chicken',
    diet: 'nonveg',
    name: 'Crispy Chicken',
    categoryId: 'burgers',
    priceMinor: 21900,
    description: 'Crunchy chicken, fresh slaw and a spoonful of pepper mayo.',
    image: chicken,
    imageAlt: 'Golden crispy chicken burger with lettuce',
  },
  {
    id: 'burger-bean',
    diet: 'veg',
    name: 'The Bean Burger',
    categoryId: 'burgers',
    priceMinor: 17900,
    description: 'A hearty bean patty, garden greens and tangy tomato relish.',
    image: bean,
    imageAlt: 'Burger layered with greens and sliced tomato',
  },
  {
    id: 'drink-lemonade',
    diet: 'veg',
    name: 'Fresh Lemonade',
    categoryId: 'beverages',
    priceMinor: 7900,
    description: 'Fresh lemon, a touch of sweetness and plenty of ice.',
    image: lemonade,
    imageAlt: 'Fresh lemonade served with slices of lemon',
  },
  {
    id: 'drink-coffee',
    diet: 'veg',
    name: 'Iced Coffee',
    categoryId: 'beverages',
    priceMinor: 12900,
    description: 'Smooth coffee poured over ice with creamy chilled milk.',
    image: coffee,
    imageAlt: 'A glass of iced milky coffee',
  },
  {
    id: 'drink-shake',
    diet: 'veg',
    name: 'Chocolate Shake',
    categoryId: 'beverages',
    priceMinor: 15900,
    description: 'Thick chocolate, cold milk and a cookie-crumble finish.',
    image: shake,
    imageAlt: 'Chocolate milkshake topped with cream and cookie crumbs',
  },
  {
    id: 'dessert-brownie',
    diet: 'veg',
    name: 'Fudgy Brownie',
    categoryId: 'desserts',
    priceMinor: 11900,
    description: 'Eggless dark chocolate brownie with a soft centre and a crackly top.',
    image: brownie,
    imageAlt: 'Chocolate brownies with a crackled top',
  },
  {
    id: 'dessert-cheesecake',
    diet: 'veg',
    name: 'Berry Cheesecake',
    categoryId: 'desserts',
    priceMinor: 18900,
    description: 'Eggless cheesecake, a buttery biscuit base and berry topping.',
    image: cheesecake,
    imageAlt: 'A slice of cheesecake with a berry topping',
  },
  {
    id: 'dessert-sundae',
    diet: 'veg',
    name: 'Strawberry Sundae',
    categoryId: 'desserts',
    priceMinor: 13900,
    description: 'Strawberry ice cream with a fruity swirl. A happy ending.',
    image: sundae,
    imageAlt: 'Pink strawberry ice cream',
  },
  {
    id: 'signature-tandoori',
    name: 'Flame-Grilled Tandoori Platter',
    categoryId: 'signature',
    priceMinor: 54900,
    diet: 'nonveg',
    description: 'Tandoori chicken, seekh kebab and paneer tikka with cool mint chutney.',
    image: dish0,
    imageAlt: 'Flame-Grilled Tandoori Platter served ready to eat',
    popular: true,
  },
  {
    id: 'signature-kulcha',
    name: 'Truffle Mushroom Kulcha',
    categoryId: 'signature',
    priceMinor: 34900,
    diet: 'veg',
    description: 'Golden stuffed kulcha with earthy mushrooms, melting mozzarella and truffle oil.',
    image: dish1,
    imageAlt: 'Truffle Mushroom Kulcha served ready to eat',
  },
  {
    id: 'signature-risotto',
    name: 'Butter Chicken Risotto',
    categoryId: 'signature',
    priceMinor: 42900,
    diet: 'nonveg',
    description: 'A creamy rice bowl with tender butter chicken and a parmesan finish.',
    image: dish2,
    imageAlt: 'Butter Chicken Risotto served ready to eat',
    popular: true,
  },
  {
    id: 'signature-paneer',
    name: 'Saffron Paneer Steak',
    categoryId: 'signature',
    priceMinor: 39900,
    diet: 'veg',
    description: 'Saffron-marinated paneer, chargrilled and served with roasted pepper sauce.',
    image: dish3,
    imageAlt: 'Saffron Paneer Steak served ready to eat',
  },
  {
    id: 'starter-samosa',
    name: 'Crispy Samosa Chaat',
    categoryId: 'starters',
    priceMinor: 18900,
    diet: 'veg',
    description:
      'Crisp samosas, cooling yogurt, sweet-tangy chutneys and a generous sprinkle of sev.',
    image: dish4,
    imageAlt: 'Crispy Samosa Chaat served ready to eat',
    popular: true,
  },
  {
    id: 'starter-chicken65',
    name: 'Chicken 65',
    categoryId: 'starters',
    priceMinor: 24900,
    diet: 'nonveg',
    description: 'Crunchy chicken bites tossed with curry leaves, chillies and warming spices.',
    image: dish5,
    imageAlt: 'Chicken 65 served ready to eat',
  },
  {
    id: 'starter-paneer',
    name: 'Paneer Tikka',
    categoryId: 'starters',
    priceMinor: 22900,
    diet: 'veg',
    description: 'Smoky paneer cubes with peppers and onions, fresh from the grill.',
    image: dish6,
    imageAlt: 'Paneer Tikka served ready to eat',
  },
  {
    id: 'starter-fish',
    name: 'Fish Amritsari',
    categoryId: 'starters',
    priceMinor: 28900,
    diet: 'nonveg',
    description: 'Golden fish bites in a lightly spiced batter, with a lemon wedge on the side.',
    image: dish7,
    imageAlt: 'Fish Amritsari served ready to eat',
  },
  {
    id: 'burger-paneer',
    name: 'Paneer Tikka Burger',
    categoryId: 'burgers',
    priceMinor: 22900,
    diet: 'veg',
    description: 'Grilled paneer, crunchy lettuce and tandoori mayo tucked into a soft bun.',
    image: dish8,
    imageAlt: 'Paneer Tikka Burger served ready to eat',
  },
  {
    id: 'pizza-tandoori',
    name: 'Tandoori Chicken Pizza',
    categoryId: 'pizza',
    priceMinor: 37900,
    diet: 'nonveg',
    description: 'Smoky tandoori chicken, peppers, red onion and mozzarella on a crisp base.',
    image: dish9,
    imageAlt: 'Tandoori Chicken Pizza served ready to eat',
  },
  {
    id: 'indian-butter-chicken',
    name: 'Butter Chicken',
    categoryId: 'indian',
    priceMinor: 32900,
    diet: 'nonveg',
    description: 'Tender chicken simmered in a gently spiced tomato gravy with butter and cream.',
    image: dish10,
    imageAlt: 'Butter Chicken served ready to eat',
  },
  {
    id: 'indian-palak',
    name: 'Palak Paneer',
    categoryId: 'indian',
    priceMinor: 26900,
    diet: 'veg',
    description: 'Soft paneer in silky spinach gravy, finished with a garlic and cumin tempering.',
    image: dish11,
    imageAlt: 'Palak Paneer served ready to eat',
  },
  {
    id: 'indian-dal',
    name: 'Dal Makhani',
    categoryId: 'indian',
    priceMinor: 24900,
    diet: 'veg',
    description: 'Slow-simmered black lentils with a buttery, creamy finish. Comfort in a bowl.',
    image: dish12,
    imageAlt: 'Dal Makhani served ready to eat',
  },
  {
    id: 'indian-biryani',
    name: 'Chicken Biryani',
    categoryId: 'indian',
    priceMinor: 31900,
    diet: 'nonveg',
    description:
      'Aromatic basmati rice, spiced chicken and crisp onions, cooked together in layers.',
    image: dish13,
    imageAlt: 'Chicken Biryani served ready to eat',
  },
  {
    id: 'asian-noodles',
    name: 'Szechuan Chicken Noodles',
    categoryId: 'asian',
    priceMinor: 28900,
    diet: 'nonveg',
    description: 'Wok-tossed noodles with chicken, crunchy vegetables and a fiery Szechuan kick.',
    image: dish14,
    imageAlt: 'Szechuan Chicken Noodles served ready to eat',
  },
  {
    id: 'asian-manchurian',
    name: 'Veg Manchurian',
    categoryId: 'asian',
    priceMinor: 21900,
    diet: 'veg',
    description: 'Crispy vegetable dumplings coated in a glossy, tangy garlic-soy sauce.',
    image: dish15,
    imageAlt: 'Veg Manchurian served ready to eat',
  },
  {
    id: 'asian-rice',
    name: 'Thai Basil Chicken Rice',
    categoryId: 'asian',
    priceMinor: 27900,
    diet: 'nonveg',
    description: 'Basil-scented chicken with fresh chillies, served over fluffy jasmine rice.',
    image: dish16,
    imageAlt: 'Thai Basil Chicken Rice served ready to eat',
  },
  {
    id: 'asian-paneer',
    name: 'Chilli Paneer',
    categoryId: 'asian',
    priceMinor: 23900,
    diet: 'veg',
    description: 'Crisp paneer, peppers and onions tossed in our punchy chilli-soy sauce.',
    image: dish17,
    imageAlt: 'Chilli Paneer served ready to eat',
  },
  {
    id: 'main-chicken',
    name: 'Grilled Herb Chicken',
    categoryId: 'main-course',
    priceMinor: 36900,
    diet: 'nonveg',
    description: 'Herb-marinated chicken with roasted potatoes and a side of fresh greens.',
    image: dish18,
    imageAlt: 'Grilled Herb Chicken served ready to eat',
  },
  {
    id: 'main-ravioli',
    name: 'Mushroom & Spinach Ravioli',
    categoryId: 'main-course',
    priceMinor: 32900,
    diet: 'veg',
    description: 'Eggless pasta parcels filled with mushrooms and spinach in a sage cream sauce.',
    image: dish19,
    imageAlt: 'Mushroom & Spinach Ravioli served ready to eat',
  },
  {
    id: 'main-lamb',
    name: 'Lamb Shank Rogan',
    categoryId: 'main-course',
    priceMinor: 44900,
    diet: 'nonveg',
    description: 'Slow-braised lamb with fragrant spices, creamy polenta and fresh herbs.',
    image: dish20,
    imageAlt: 'Lamb Shank Rogan served ready to eat',
  },
  {
    id: 'main-paneer',
    name: 'Paneer Lababdar',
    categoryId: 'main-course',
    priceMinor: 27900,
    diet: 'veg',
    description: 'Soft paneer in a rich onion-tomato sauce with cream and dried fenugreek.',
    image: dish21,
    imageAlt: 'Paneer Lababdar served ready to eat',
  },
  {
    id: 'dessert-jamun',
    name: 'Gulab Jamun',
    categoryId: 'desserts',
    priceMinor: 14900,
    diet: 'veg',
    description: 'Warm, soft milk dumplings in a fragrant rose and cardamom syrup.',
    image: dish22,
    imageAlt: 'Gulab Jamun served ready to eat',
  },
  {
    id: 'drink-lassi',
    name: 'Mango Lassi',
    categoryId: 'beverages',
    priceMinor: 12900,
    diet: 'veg',
    description: 'Sweet mango blended with chilled yogurt. Thick, sunny and refreshing.',
    image: dish23,
    imageAlt: 'Mango Lassi served ready to eat',
  },
]

export const popularFoods = menu.filter((food) => food.popular)

export const menuById = Object.fromEntries(menu.map((item) => [item.id, item]))

export function filterMenu(categoryId, diet = 'all') {
  return menu.filter(
    (item) =>
      (categoryId === 'all' || item.categoryId === categoryId) &&
      (diet === 'all' || item.diet === diet),
  )
}
