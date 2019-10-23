import React from 'react'
import { useRouter } from 'next/router'

import App from '../containers/App'
import StoryById from '../containers/StoryById'
import CommentsTreeById from '../containers/CommentsTreeById'

export default () => {
  const {
    query: { storyId, commentId }
  } = useRouter()

  return (
    <App>
      {commentId == null
        ? <StoryById storyId={storyId} />
        : <CommentsTreeById storyId={storyId} commentId={commentId} />
      }
    </App>
  )
}
