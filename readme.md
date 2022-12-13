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

The export is a header line (starting with `//`) including a version and a link to the site they were generated from.
This is followed by JSON array lines, with possibly nested arrays (less repeating object keys)

# Sort

An attempt to untangle/order dependencies. (incomplete)

# Issue list

* Correct cursors
    * "Grab" on drag
    * "Move" on background pan
* ✅ Remove IDX that makes its way into export
* ✅ Import
* Sorting on y axis
* Swimlanes/Milestones
* CSS for appropriate printing
* Center view

# Fonts

Assembled via fontello, just the `woff` format for compatbility/simplicity/laziness reasons
```
flow-branch
floppy
doc-add
trash-empty
sort-name-up
download
upload
attention-circled
```