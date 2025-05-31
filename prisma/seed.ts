import { PrismaClient, STORE_CATEGORY } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.$connect()
    console.log('Database connection successful')

    // Delete existing data to ensure clean seed
    await prisma.favorite.deleteMany()
    await prisma.restaurant.deleteMany()

    // Create restaurants based on the screenshot and mock data
    const restaurants = [
    {
      name: "Tempura Yamaguchi",
      description: "Serving luxurious tempura sets",
      rating: 4.9,
      ratingCount: 300,
      category: "TEMPURA" as const,
      city: "YOKOHAMA",
      location: "Yokohama",
      priceRange: "25~35",
      images: [
        "https://plus.unsplash.com/premium_photo-1667807522245-ae3de2a7813a?q=80&w=2150&auto=format&fit=crop&ixlib=rb-4.1.0"
      ],
      featured: {
        text: "Recommended Yokohama Tempura",
        icon: "flame"
      }
    },
    {
      name: "Sushi Sato",
      description: "You can enjoy authentic sushi made with fresh seafood",
      rating: 4.8,
      ratingCount: 250,
      category: "SUSHI" as const,
      city: "SAPPORO",
      location: "Sapporo",
      priceRange: "20~30",
      images: [
        "https://plus.unsplash.com/premium_photo-1668146932065-d08643791942?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0"
      ],
      featured: {
        text: "Sapporo Sushi Restaurant",
        icon: "crown"
      }
    },
    {
      name: "Ramen Ichiran",
      description: "Boasting a rich broth and a variety of toppings",
      rating: 4.7,
      ratingCount: 180,
      category: "RAMEN" as const,
      city: "KYOTO",
      location: "Kyoto",
      priceRange: "8~12",
      images: [
        "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0"
      ],
      featured: {
        text: "Kyoto's best ramen spots",
        icon: "sparkles"
      }
    },
    {
      name: "Udon Taro",
      description: "Boasting chewy noodles and rich broth",
      rating: 4.6,
      ratingCount: 190,
      category: "SOBA" as const,
      city: "FUKUOKA",
      location: "Fukuoka",
      priceRange: "6~10",
      images: [
        "https://images.unsplash.com/photo-1611810175414-1ea054685162?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0"
      ],
      featured: {
        text: "Fukuoka Udon Restaurant",
        icon: "sparkles"
      }
    },
    {
      name: "Sushi Ginza Ishikawa",
      description: "Serving fresh seafood and authentic sushi",
      rating: 4.5,
      ratingCount: 200,
      category: "SUSHI" as const,
      city: "TOKYO",
      location: "Tokyo",
      priceRange: "30~45",
      images: [
        "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: {
        text: "Top Sushi Restaurants in Tokyo",
        icon: "trophy"
      }
    },
    {
      name: "Ramen Tatsuya",
      description: "Boasting a deep-flavored broth and chewy noodles",
      rating: 4.4,
      ratingCount: 170,
      category: "RAMEN" as const,
      city: "HIROSHIMA",
      location: "Hiroshima",
      priceRange: "7~11",
      images: [
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: {
        text: "Hiroshima Ramen Recommendations",
        icon: "sparkles"
      }
    },
    // Adding more restaurants to cover all categories
    {
      name: "Unagi Yamato",
      description: "Traditional grilled eel with secret sauce",
      rating: 4.8,
      ratingCount: 165,
      category: "UNAGI" as const,
      city: "TOKYO",
      location: "Tokyo",
      priceRange: "18~25",
      images: [
        "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: {
        text: "Best Unagi in Tokyo",
        icon: "fire"
      }
    },
    {
      name: "Tonkatsu Katsukura",
      description: "Crispy golden tonkatsu with premium pork",
      rating: 4.7,
      ratingCount: 220,
      category: "TONKATSU" as const,
      city: "OSAKA",
      location: "Osaka",
      priceRange: "12~18",
      images: [
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: {
        text: "Osaka Tonkatsu Specialist",
        icon: "medal"
      }
    },
    {
      name: "Yakitori Torikizoku",
      description: "Grilled chicken skewers with authentic flavors",
      rating: 4.6,
      ratingCount: 140,
      category: "YAKITORI" as const,
      city: "SHIBUYA",
      location: "Shibuya",
      priceRange: "5~8",
      images: [
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: null
    },
    {
      name: "Sukiyaki Ningyocho Imahan",
      description: "Premium beef sukiyaki in traditional setting",
      rating: 4.9,
      ratingCount: 95,
      category: "SUKIYAKI" as const,
      city: "TOKYO",
      location: "Tokyo",
      priceRange: "40~60",
      images: [
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2169&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: {
        text: "Premium Sukiyaki Experience",
        icon: "crown"
      }
    },
    {
      name: "Yakisoba Yokocho",
      description: "Street-style yakisoba with fresh vegetables",
      rating: 4.3,
      ratingCount: 130,
      category: "YAKISOBA" as const,
      city: "NAGOYA",
      location: "Nagoya",
      priceRange: "4~7",
      images: [
        "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: null
    },
    {
      name: "Okonomiyaki Mizuno",
      description: "Authentic Osaka-style okonomiyaki",
      rating: 4.7,
      ratingCount: 310,
      category: "OKONOMIYAKI" as const,
      city: "OSAKA",
      location: "Osaka",
      priceRange: "8~12",
      images: [
        "https://images.unsplash.com/photo-1591114320268-fb3aac361d8e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0"
      ],
      featured: {
        text: "Osaka Okonomiyaki Legend",
        icon: "star"
      }
    },
    {
      name: "Donburi Tenya",
      description: "Delicious rice bowls with tempura toppings",
      rating: 4.5,
      ratingCount: 280,
      category: "DONBURI" as const,
      city: "TOKYO",
      location: "Tokyo",
      priceRange: "6~9",
      images: [
        "https://images.unsplash.com/photo-1618889482923-38250401a84e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0"
      ],
      featured: null
    },
    {
      name: "Kaiseki Kikunoi",
      description: "Exquisite multi-course traditional Japanese cuisine",
      rating: 4.9,
      ratingCount: 45,
      category: "KAISEKI" as const,
      city: "KYOTO",
      location: "Kyoto",
      priceRange: "80~120",
      images: [
        "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: {
        text: "Michelin Star Kaiseki",
        icon: "crown"
      }
    },
    {
      name: "Hambagu Kitchen",
      description: "Juicy hamburg steak with demi-glace sauce",
      rating: 4.5,
      ratingCount: 200,
      category: "HAMBAGU" as const,
      city: "SHIBUYA",
      location: "Shibuya",
      priceRange: "10~15",
      images: [
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2169&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: null
    },
    {
      name: "Teppanyaki Ginza Ukai-tei",
      description: "Premium teppanyaki with finest wagyu beef",
      rating: 4.8,
      ratingCount: 120,
      category: "TEPPANYAKI" as const,
      city: "TOKYO",
      location: "Tokyo",
      priceRange: "50~80",
      images: [
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2169&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: {
        text: "Premium Teppanyaki Experience",
        icon: "flame"
      }
    },
    {
      name: "Curry House CoCo Ichibanya",
      description: "Customizable Japanese curry with various toppings",
      rating: 4.4,
      ratingCount: 350,
      category: "CURRY" as const,
      city: "NAGOYA",
      location: "Nagoya",
      priceRange: "5~8",
      images: [
        "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: null
    },
    {
      name: "Yakiniku M",
      description: "Premium wagyu yakiniku with expert preparation",
      rating: 4.8,
      ratingCount: 180,
      category: "YAKINIKU" as const,
      city: "TOKYO",
      location: "Tokyo",
      priceRange: "35~50",
      images: [
        "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: {
        text: "Premium Wagyu Yakiniku",
        icon: "fire"
      }
    },
    {
      name: "Nabe Yokocho",
      description: "Hearty hot pot with fresh seafood and vegetables",
      rating: 4.6,
      ratingCount: 95,
      category: "NABE" as const,
      city: "SAPPORO",
      location: "Sapporo",
      priceRange: "15~25",
      images: [
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2169&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: null
    },
    {
      name: "Cafe Gram",
      description: "Famous fluffy pancakes and specialty coffee",
      rating: 4.5,
      ratingCount: 420,
      category: "CAFE" as const,
      city: "OSAKA",
      location: "Osaka",
      priceRange: "8~15",
      images: [
        "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: {
        text: "Famous Fluffy Pancakes",
        icon: "heart"
      }
    },
    {
      name: "Izakaya Torikizoku",
      description: "Traditional izakaya with sake and small plates",
      rating: 4.6,
      ratingCount: 290,
      category: "IZAKAYA" as const,
      city: "SHIBUYA",
      location: "Shibuya",
      priceRange: "10~20",
      images: [
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: null
    },
    {
      name: "Washoku Sato",
      description: "Traditional Japanese home-style cooking",
      rating: 4.3,
      ratingCount: 150,
      category: "OTHER" as const,
      city: "FUKUOKA",
      location: "Fukuoka",
      priceRange: "12~18",
      images: [
        "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: null
    }
  ]

  for (const restaurant of restaurants) {
    const created = await prisma.restaurant.create({
      data: restaurant
    })
    console.log(`Created restaurant: ${created.name}`)
  }

    console.log('Database seed completed successfully!')
  } catch (error) {
    console.error('Error during seed:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
