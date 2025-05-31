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
      priceRange: "5~7",
      images: [
        "https://images.unsplash.com/photo-1673238104258-38b63f973848?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0"
      ],
      featured: {
        text: "Recommended Yokohama Tempura",
        icon: "stars-02"
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
      priceRange: "4~6",
      images: [
        "https://plus.unsplash.com/premium_photo-1668146932065-d08643791942?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0"
      ],
      featured: {
        text: "Sapporo Sushi Restaurant",
        icon: "stars-02"
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
      priceRange: "2~4",
      images: [
        "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0"
      ],
      featured: {
        text: "Kyoto's best ramen spots",
        icon: "stars-02"
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
      priceRange: "2~4",
      images: [
        "https://images.unsplash.com/photo-1611810175414-1ea054685162?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0"
      ],
      featured: {
        text: "Fukuoka Udon Restaurant",
        icon: "stars-02"
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
      priceRange: "4~6",
      images: [
        "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: {
        text: "Top Sushi Restaurants in Tokyo",
        icon: "stars-02"
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
      priceRange: "2~4",
      images: [
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
      ],
      featured: {
        text: "Hiroshima Ramen Recommendations",
        icon: "stars-02"
      }
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
