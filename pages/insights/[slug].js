import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react';;
import { useState, useEffect } from 'react';
import { Toolbar } from '../../components/toolbar'
import Image from 'next/image'

export const Insight = ({ title, image, content }) => {
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        const imgBuilder = imageUrlBuilder({
            projectId: '9mxd3xoy',
            dataset: 'production'
        })

        setImageUrl(imgBuilder.image(image));
    }, [image]);

    return (
        <div>
            <Toolbar />

            <h1>{title}</h1>
            {/* {imageUrl && <Image src={imageUrl} alt="imageURL" width={500}
                height={500} />} */}
            <div>
                <BlockContent blocks={content} />

            </div>
        </div>
    )
}

export const getServerSideProps = async pageContext => {
    const pageSlug = pageContext.query.slug;

    if (!pageSlug) {
        return {
            notFound: true
        }
    }

    const query = encodeURIComponent(`*[ _type == "insights" && slug.current == "${pageSlug}" ]`);
    const url = `https://9mxd3xoy.api.sanity.io/v1/data/query/production?query=${query}`

    const result = await fetch(url).then(res => res.json());
    const insights = result.result[0]

    if (!insights) {
        return {
            notFound: true
        }
    } else {
        return {
            props: {
                title: insights.title,
                image: insights.bannerImage,
                content: insights.HighlevelContent
            }
        }
    }

}

export default Insight