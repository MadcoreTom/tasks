# What is this
> This is a personal project that might be useful in my day job. If you find it useful too, then that's a bonus

This basically automatios diagrams I'd draw in https://app.diagrams.net/ trying to lay out tasks, link dependencies, and find the "critical path", and big blockers that are holding up other issues. This is primarily for software design/development but I'm sure it has its uses elsewhere

# Stack

Some of these are new

* **language** - typescript
* **build** - esbuild
* **framework** - react
* **drawing** - svg
* **style** - bulma
* **repo/pipeline** - github
* **hosting** - github pages

# Export format

The export is in [trivial graph format](https://en.wikipedia.org/wiki/Trivial_Graph_Format), with comments for the original JSON objects. You could dump it into something like [yed](https://www.yworks.com/products/yed) or easily process it yourself

# Sort

An attempt to untangle/order dependencies. (incomplete)

# Issue list

* Correct cursors
    * "Grab" on drag
    * "Move" on background pan
* Remove IDX that makes its way into export
* Import
* Sorting on y axis
* Swimlanes/Milestones
* CSS for appropriate printing
* Center view