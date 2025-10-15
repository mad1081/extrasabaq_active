import { CategoryPageClient } from "@/components/CategoryPageClient"

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Fetch category data from API
  let categoryData = null
  let activeCompetitions = []
  let pastCompetitions = []
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/api/categories/${slug}`, {
      cache: 'no-store' // Ensure fresh data
    })
    if (response.ok) {
      const data = await response.json()
      categoryData = data.category
      activeCompetitions = data.activeCompetitions || []
      pastCompetitions = data.pastCompetitions || []
    }
  } catch (error) {
    console.error('Failed to fetch category data:', error)
  }

  return (
    <CategoryPageClient 
      slug={slug}
      categoryData={categoryData}
      activeCompetitions={activeCompetitions}
      pastCompetitions={pastCompetitions}
    />
  )
}