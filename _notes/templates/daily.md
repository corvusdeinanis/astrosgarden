---
habittracker: ✔️☀️🌙🟠🟣
habits: 
  NO:
  MEH:
  OK: ☀️
  GOOD:
  ALLZEN: 
  
  period: 
  vitamins: ✔️
  no_coffee: ✔️
  
  biking: 
  running: ✔️
  walking: ✔️
  yoga:
  gym:
  
  writing:
  diary:
  reading: ✔️
  
  thesis: 
  coding:
tags:
  - dailies
  - dailyplanner
date: 2021-10-10
---

```dataview
table without id
date.day as "#",
habits.NO as "1",
habits.MEH as "2",
habits.OK as "3",
habits.GOOD as "4",
habits.ALLZEN as "5",
habits.period as "",
habits.vitamins as "vits",
habits.no_coffee as "no coffee",
habits.thesis as thesis
from #dailyplanner and -#template
where date.month = 10
sort date
```
