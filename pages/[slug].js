
import { getAllPosts } from '../lib/posts'
import { useRouter } from 'next/router'

export default function Post({ post }) {
  const router = useRouter()
  
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </div>
  )
}

export async function getStaticPaths() {
  const posts = getAllPosts()
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const posts = getAllPosts()
  const post = posts.find((p) => p.slug === params.slug)

  return {
    props: {
      post,
    },
  }
}
