import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const StyledLink = styled.a`
  display: block;
  padding: 6px;

  &:hover {
    background-color: silver;
    color: black;
  }

  &.active {
    font-weight: bold;
    text-decoration: underline;
  }
`

const SearchResultItem = ({
  data: { type, aggregateId, text },
  onNavigate
}) => (
  <Link
    href={
      type === 'user'
        ? `/user/${aggregateId}`
        : `/storyDetails/${aggregateId}`
    }
  >
    <StyledLink
      onClick={onNavigate}
    >
      {`${type}: ${text}`}
    </StyledLink>
  </Link>
)

export default SearchResultItem
