import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Toolbar } from '../components/toolbar'
import imageUrlBuilder from '@sanity/image-url'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useNextSanityImage } from 'next-sanity-image';


export default function Home({ insights }) {
  const router = useRouter();
  const [mappedPosts, setMappedPosts] = useState([]);
  useEffect(() => {
    if (insights.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: '9mxd3xoy',
        dataset: 'production',
        useCdn: true
      })


      setMappedPosts(
        insights.map(p => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.bannerImage).width(500).height(250)
          }
        })
      )
    } else {
      setMappedPosts([])
    }
  }, [insights])

  return (
    <div className={styles.container}>
      <Toolbar />
      <div>
        <h1>Recent Insights:</h1>
        <div>
          {mappedPosts.length ? mappedPosts.map((p, index) => (

            <div div onClick={() => router.push(`/insights/${p.slug.current}`)} key={index}>

              <h1>{p.title}</h1>

              {/* {p.mainImage && <Image src={p.mainImage} alt="imageURL" />} */}
              {/* <Image src={p.mainImage} alt="imageURL" /> */}
            </div>

          )) : <>No posts</>}
        </div>
      </div >
    </div >
  )
}


export const getServerSideProps = async pageContext => {

  const query = encodeURIComponent('*[ _type == "insights" ]');
  const url = `https://9mxd3xoy.api.sanity.io/v1/data/query/production?query=${query}`

  const result = await fetch(url).then(res => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        insights: []
      }
    }
  } else {
    return {
      props: {
        insights: result.result
      }
    }
  }

}
