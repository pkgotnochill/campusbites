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
  { id: 'pizza', label: 'Pizza', icon: 'pizza' },
  { id: 'burgers', label: 'Burgers', icon: 'burger' },
  { id: 'drinks', label: 'Drinks', icon: 'cup' },
  { id: 'desserts', label: 'Desserts', icon: 'cake' },
]

export const menu = [
  {
    id: 'pizza-margherita',
    name: 'Classic Margherita',
    categoryId: 'pizza',
    priceMinor: 24900,
    description: 'Melty mozzarella, rich tomato sauce and a little fresh basil.',
    image: margherita,
    imageAlt: 'Golden pizza topped with mozzarella and fresh basil',
  },
  {
    id: 'pizza-pepperoni',
    name: 'Pepperoni Please',
    categoryId: 'pizza',
    priceMinor: 34900,
    description: 'Crispy pepperoni, generous cheese and our signature tomato base.',
    image: pepperoni,
    imageAlt: 'Sliced pizza with pepperoni and melted cheese',
  },
  {
    id: 'pizza-garden',
    name: 'Garden Party',
    categoryId: 'pizza',
    priceMinor: 29900,
    description: 'Colourful peppers, sweet corn and onions on a golden crust.',
    image: garden,
    imageAlt: 'Vegetable pizza with colourful toppings on a wooden board',
  },
  {
    id: 'burger-classic',
    name: 'Classic Cheeseburger',
    categoryId: 'burgers',
    priceMinor: 19900,
    description: 'A grilled patty, cheddar, crisp lettuce and our house sauce.',
    image: classic,
    imageAlt: 'Cheeseburger with lettuce and tomato in a sesame bun',
  },
  {
    id: 'burger-chicken',
    name: 'Crispy Chicken',
    categoryId: 'burgers',
    priceMinor: 21900,
    description: 'Crunchy chicken, fresh slaw and a spoonful of pepper mayo.',
    image: chicken,
    imageAlt: 'Golden crispy chicken burger with lettuce',
  },
  {
    id: 'burger-bean',
    name: 'The Bean Burger',
    categoryId: 'burgers',
    priceMinor: 17900,
    description: 'A hearty bean patty, garden greens and tangy tomato relish.',
    image: bean,
    imageAlt: 'Burger layered with greens and sliced tomato',
  },
  {
    id: 'drink-lemonade',
    name: 'Fresh Lemonade',
    categoryId: 'drinks',
    priceMinor: 7900,
    description: 'Fresh lemon, a touch of sweetness and plenty of ice.',
    image: lemonade,
    imageAlt: 'Fresh lemonade served with slices of lemon',
  },
  {
    id: 'drink-coffee',
    name: 'Iced Coffee',
    categoryId: 'drinks',
    priceMinor: 12900,
    description: 'Smooth coffee poured over ice with creamy chilled milk.',
    image: coffee,
    imageAlt: 'A glass of iced milky coffee',
  },
  {
    id: 'drink-shake',
    name: 'Chocolate Shake',
    categoryId: 'drinks',
    priceMinor: 15900,
    description: 'Thick chocolate, cold milk and a cookie-crumble finish.',
    image: shake,
    imageAlt: 'Chocolate milkshake topped with cream and cookie crumbs',
  },
  {
    id: 'dessert-brownie',
    name: 'Fudgy Brownie',
    categoryId: 'desserts',
    priceMinor: 11900,
    description: 'Rich dark chocolate with a soft centre and a crackly top.',
    image: brownie,
    imageAlt: 'Chocolate brownies with a crackled top',
  },
  {
    id: 'dessert-cheesecake',
    name: 'Berry Cheesecake',
    categoryId: 'desserts',
    priceMinor: 18900,
    description: 'Creamy cheesecake, a buttery biscuit base and berry topping.',
    image: cheesecake,
    imageAlt: 'A slice of cheesecake with a berry topping',
  },
  {
    id: 'dessert-sundae',
    name: 'Strawberry Sundae',
    categoryId: 'desserts',
    priceMinor: 13900,
    description: 'Strawberry ice cream with a fruity swirl. A happy ending.',
    image: sundae,
    imageAlt: 'Pink strawberry ice cream',
  },
]

export const menuById = Object.fromEntries(menu.map((item) => [item.id, item]))

export function filterMenu(categoryId) {
  return categoryId === 'all' ? menu : menu.filter((item) => item.categoryId === categoryId)
}
