import React from 'react'
import { bindActionCreators } from 'redux'
import { connectReadModel } from 'resolve-redux'
import { connect } from 'react-redux'

import * as aggregateActions from '../actions/aggregate-actions'
import Stories from '../components/Stories'
import { ITEMS_PER_PAGE } from '../constants'

const ShowByPage = ({
  isLoading,
  page,
  stories,
  me,
  upvoteStory,
  unvoteStory
}) => (
  <Stories
    isLoading={isLoading}
    items={stories}
    page={page}
    type="show"
    userId={me && me.id}
    upvoteStory={upvoteStory}
    unvoteStory={unvoteStory}
  />
)

export const mapStateToOptions = (
  state,
  { page }
) => ({
  readModelName: 'HackerNews',
  resolverName: 'showStories',
  resolverArgs: {
    offset: ITEMS_PER_PAGE + 1,
    first: (+page - 1) * ITEMS_PER_PAGE
  }
})

export const mapStateToProps = (
  state,
  {
    page,
    data,
    isLoading
  }
) => ({
  isLoading,
  stories: data,
  page,
  me: state.jwt
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(aggregateActions, dispatch)

export default connectReadModel(mapStateToOptions)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ShowByPage)
)
