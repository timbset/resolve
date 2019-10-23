import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const StyledLink = styled.a`
  text-decoration: underline;
  margin-top: 0.33em;
  color: #000;
`

const ReplyLink = ({ storyId, commentId }) => (
  <Link href={`/storyDetails/${storyId}/comments/${commentId}`}>
    <StyledLink>
      reply
    </StyledLink>
  </Link>
)

export default ReplyLink
