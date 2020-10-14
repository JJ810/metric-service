# Sum Metric Service Code Challenge

## Problem

Build a metric logging and reporting service that sums metrics by time window for the most
recent hour. You will build a lightweight web server that implements the two main APIs defined
below.

## APIs

### POST metric

Request

```
POST /metric/{key}
{
"value": 30
}
```

Response (200)

```
{}
```

### GET metric sum

Returns the sum of all metrics reported for this key over the past hour

Request

```
GET /metric/{key}/sum
```

Response (200)

```
{
"value": 400
}
```

## Example

Imagine these are the events logged to your service for a metric “active_visitors”

```
// 2 hours ago **
POST /metric/active_visitors { "value" = 4 }
// 30 minutes ago
POST /metric/active_visitors { "value" = 3 }
// 40 seconds ago
POST /metric/active_visitors { "value" = 7 }
// 5 seconds ago
POST /metric/active_visitors { "value" = 2 }
```

These are the results expected from calling get aggregates:

```
GET /metric/active_visitors/sum // returns 12
```

\*\* Note that the metric posted 2 hours ago is not included in the sum since we only care about
data in the most recent hour for these APIs.
