import React from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'

import Splitter from './Splitter'

export const PaginationRoot = styled.div`
  padding: 0.5em 0;
`

export const StyledLink = styled.a`
  display: inline;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  ${props =>
    props.disabled
      ? css`
          pointer-events: none;
          cursor: default;
          color: gray;
        `
      : css`
          color: #000;
        `};
`

const Pagination = ({ page, hasNext, location }) => {
  if (page === 1 && !hasNext) {
    return null
  }

  const prevDisabled = page <= 1
  const nextDisabled = !hasNext

  return (
    <PaginationRoot>
      <Link href={`${location}/${Number(page) - 1}`}>
        <StyledLink disabled={prevDisabled}>
          Prev
        </StyledLink>
      </Link>
      <Splitter />
      {page}
      <Splitter />
      <Link href={`${location}/${Number(page) + 1}`}>
        <StyledLink disabled={nextDisabled}>
          More
        </StyledLink>
      </Link>
    </PaginationRoot>
  )
}

Pagination.defaultProps = {
  page: 1
}

export default Pagination
