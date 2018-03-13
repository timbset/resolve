import { createActions } from 'resolve-redux'
import aggregates from '../../common/aggregates'

const [todoAggregate] = aggregates

export const todoActions = createActions(todoAggregate)
