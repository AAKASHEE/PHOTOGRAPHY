"use client"

import { Reveal } from '@/components/parallax-section'
import { EnhancedGallery } from '@/components/enhanced-gallery'

// Sample extended portfolio data
const portfolioItems = [
  {
    id: 1,
    title: 'Sky Is the Limit',
    category: 'landscape',
    image: '/img/IMG_0277.jpg',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: 2,
    title: 'Glasses but fragile',
    category: 'urban',
    image: '/img/IMG_0313.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 3,
    title: 'Portrait of Me',
    category: 'portrait',
    image: '/img/00562eb5-e56e-4884-880a-dcc474e3c445.JPG',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: 4,
    title: 'Desert Solitude',
    category: 'landscape',
    image: 'https://images.pexels.com/photos/1592119/pexels-photo-1592119.jpeg',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 5,
    title: 'Leisure',
    category: 'event',
    image: '/img/IMG_0539.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 6,
    title: 'Street Light',
    category: 'urban',
    image: '/img/IMG_0553.jpg',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: 7,
    title: 'Birthday Celebration',
    category: 'event',
    image: '/img/IMG_1392.JPG',
    aspectRatio: 'portrait',
  },
  {
    id: 8,
    title: 'Taste buds',
    category: 'Foodie',
    image: '/img/IMG_1217.JPG',
    aspectRatio: 'aspect-square',
  },
  {
    id: 9,
    title: 'Dominoes',
    category: 'Pleasure',
    image: '/img/IMG_6504.JPG',
    aspectRatio: 'aspect-square',
  },
  {
    id: 10,
    title: 'Taste Buds',
    category: 'Foodie',
    image: '/img/IMG_0554.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 11,
    title: 'Blossoms',
    category: 'landscape',
    image: '/img/IMG_0290.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 12,
    title: 'Enjoy the View',
    category: 'landscape',
    image: '/img/IMG_1721.JPG',
    aspectRatio: 'aspect-square',
  },
  {
    id: 13,
    title: 'dance by thy rhythm',
    category: 'happiness',
    image: '/img/IMG_1454.JPG',
    aspectRatio: 'aspect-square',
  },
  {
    id: 14,
    title: 'Sit by thy silence',
    category: 'self portrait',
    image: '/img/IMG_2249.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 15,
    title: 'Creativity',
    category: 'fun',
    image: '/img/IMG_0187.jpg',
    aspectRatio: 'aspect-square',
  },
   {
    id: 16,
    title: 'Cat and Mouse',
    category: 'landscape',
    image: '/img/IMG_6563.JPG',
    aspectRatio: 'aspect-square',
  },
  {
    id: 17,
    title: 'New Horizons',
    category: 'Escape',
    image: '/img/IMG_1247.JPG',
    aspectRatio: 'aspect-square',
  },
   {
    id: 18,
    title: 'Thy Within',
    category: 'Greater Good',
    image: '/img/IMG_2184.JPG',
    aspectRatio: 'aspect-square',
  },
   {
    id: 19,
    title: 'Funky Vibes',
    category: 'Restro',
    image: '/img/IMG_0310.jpg',
    aspectRatio: 'aspect-square',
  },
   {
    id: 20,
    title: 'Fly me to the Moon',
    category: 'And let me play among the Stars',
    image: '/img/IMG_1733.JPG',
    aspectRatio: 'aspect-square',
  },
  {
    id: 21,
    title: 'Neither here nor there',
    category: 'Inside your mind',
    image: '/img/IMG_2187.JPG',
    aspectRatio: 'aspect-square',
  },
   {
    id: 22,
    title: 'Ice cream or cake',
    category: 'OFC ',
    image: '/img/IMG_0375.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 23,
    title: 'Stay with me ',
    category: 'Hold My Hand',
    image: '/img/IMG_6164.JPG',
    aspectRatio: 'aspect-square',
  },
  {
    id: 24,
    title: 'SPACE',
    category: 'STILLNESS',
    image: '/img/IMG_1915.JPG',
    aspectRatio: 'aspect-square',
  },
  {
    id: 25,
    title: 'Serenity',
    category: 'You have my heart',
    image: '/img/IMG_0343.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 26,
    title: 'Boom',
    category: 'Baam',
    image: '/img/IMG_0385.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 27,
    title: 'CARS',
    category: 'Crazzzzzyy',
    image: '/img/IMG_0408.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 28,
    title: 'Tick Tock',
    category: 'Timeless',
    image: '/img/IMG_0844.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 29,
    title: 'SHIT',
    category: 'SASSY',
    image: '/img/IMG_1191.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 30,
    title: 'Cute',
    category: 'Smoocchch',
    image: '/img/IMG_1059.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 31,
    title: 'Silence',
    category: 'I AM',
    image: '/img/IMG_1521.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id:32,
    title:'I Am',
    category:'Inevitable',
    image:'/img/IMG_2163.jpg',
    aspectRatio:'aspect-square',
  },
  {
    id:33,
    title:'',
    category:'',
    image:'/img/IMG_8344.JPG',
    aspectRatio:'aspect-square',
  },
  {
    id:34,
    title:'',
    category:'',
    image:'/img/IMG_2352.jpg',
    aspectRatio:'aspect-square',
  },
  {
    id:35,
    title:'',
    category:'',
    image:'/img/IMG_6552.JPG',
    aspectRatio:'aspect-square',
  },
  {
    id:36,
    title:'',
    category:'',
    image:'/img/IMG_6886.JPG',
    aspectRatio:'aspect-square',
  },
  {
    id:37,
    title:'',
    category:'',
    image:'/img/IMG_6910.JPG',
    aspectRatio:'aspect-square',
  },
   {
    id:38,
    title:'',
    category:'',
    image:'/img/IMG_2349.jpg',
    aspectRatio:'aspect-square',
  },
  {
    id:39,
    title:'',
    category:'',
    image:'/img/IMG_8345.JPG',
    aspectRatio:'aspect-square',
  },
  {
    id:40,
    title:'',
    category:'',
    image:'/img/IMG_8353.JPG',
    aspectRatio:'aspect-square',
  },
   {
    id:41,
    title:'',
    category:'',
    image:'/img/IMG_8067.JPG',
    aspectRatio:'aspect-square',
  },
  {
    id:42,
    title:'',
    category:'',
    image:'/img/IMG_7631.JPG',
    aspectRatio:'aspect-square',
  },
  {
    id:43,
    title:'',
    category:'',
    image:'/img/IMG_1085.jpg',
    aspectRatio:'aspect-square',
  },

  {
    id:44,
    title:'',
    category:'',
    image:'/img/IMG_2310.jpg',
    aspectRatio:'aspect-square',
  },

  {
    id:45,
    title:'',
    category:'',
    image:'/img/IMG_7494.JPG',
    aspectRatio:'aspect-square',
  },
  {
    id:46,
    title:'',
    category:'',
    image:'/img/120579fa-e3ee-45ed-9126-dc917760fd39.JPG',
    aspectRatio:'aspect-square',
  },
  {
    id:47,
    title:'',
    category:'',
    image:'/img/IMG_5348.JPG',
    aspectRatio:'aspect-square',
  },
]

const categories = [
  { id: 'all', name: 'All' },
  { id: 'landscape', name: 'Landscape' },
  { id: 'portrait', name: 'Portrait' },
  { id: 'self portrait', name: 'Self Portrait' },
  { id: 'urban', name: 'Urban' },
  { id: 'event', name: 'Event' },
  { id: 'Foodie', name: 'Food' },
  { id: 'Pleasure', name: 'Leisure' },
  { id: 'happiness', name: 'Joy' },
  { id: 'fun', name: 'Fun' },
  { id: 'Escape', name: 'Travel' },
  { id: 'Greater Good', name: 'Spiritual' },
  { id: 'Restro', name: 'Restaurant' },
  { id: 'And let me play among the Stars', name: 'Space' },
  { id: 'Inside your mind', name: 'Mindful' },
  { id: 'OFC', name: 'Sweet Treats' },
  { id: 'Hold My Hand', name: 'Connection' },
  { id: 'STILLNESS', name: 'Peace' },
  { id: 'You have my heart', name: 'Love' },
  { id: 'Baam', name: 'Action' },
  { id: 'Crazzzzzyy', name: 'Cars' },
  { id: 'Timeless', name: 'Time' },
  { id: 'SASSY', name: 'Attitude' },
  { id: 'Smoocchch', name: 'Cute' },
  { id: 'I AM', name: 'Identity' },
  { id: 'Inevitable', name: 'Destiny' }
]

export default function PortfolioPage() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Reveal>
            <h1 className="font-playfair text-4xl md:text-5xl mb-4">Our Portfolio</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted-foreground">
              Explore our diverse collection of photography work across various styles and subjects.
              Click on any photo to view it in full size and navigate using arrow keys.
            </p>
          </Reveal>
        </div>
        
        <EnhancedGallery photos={portfolioItems} categories={categories} />
      </div>
    </section>
  )
}