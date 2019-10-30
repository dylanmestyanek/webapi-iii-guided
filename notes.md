# Middleware Notes

## Jargon

Separation of Concerns

_We do NOT write code for the computer, code is a communication device. A way to reveal our intentions to the next developer._

_Optimize for readability_

**EVERYTHING IS MIDDLEWARE!!**

Well, almost everything. :+)

## Types (Based on how we got it or who built it)

- Built-in (Included with Express) Example: `express.json()`
- Third Party (Must be installed from `npm`)
- Custom (We code these!)

## Types (Based on how it's been used)

- Global (Runs on EVERY request)

Order matters, it goes TOP to BOTTOM && LEFT to RIGHT