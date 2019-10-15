import React from 'react'
import { graphql } from 'gatsby'
import styles from '../css/image.module.css'

const Project = ({data}) => {
  const {html} = data.markdownRemark
  const {title, slug, date, period, image} = data.markdownRemark.frontmatter
  const {alt, caption, file} = image
console.log(data)
  return (
    <div>
      <h1>{title}</h1>
      <h4>{period}</h4>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div className={styles.imgContainer}>
        <img src={file} />
      </div>
    </div>
  )
}

export const query = graphql`
query($slug: String!) {
	markdownRemark(frontmatter: {slug:{eq: $slug}}) {
    html
    frontmatter{
      title
      slug
      date
      period
    	image{
        alt
        caption
        file {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    }
  }
}
`

export default Project
