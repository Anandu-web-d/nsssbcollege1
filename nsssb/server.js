const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

let activities = [
  // Example activity
  {
    id: "1",
    title: "Blood Donation Camp",
    date: "2025-08-01",
    location: "College Campus",
    participants: 150,
    description: "Organized blood donation camp in collaboration with Red Cross Society",
    category: "Health",
  },
]

// Get all activities
app.get("/api/activities", (req, res) => {
  res.json(activities)
})

// Add new activity
app.post("/api/activities", (req, res) => {
  const activity = { ...req.body, id: Date.now().toString() }
  activities.unshift(activity)
  res.json(activity)
})

// Edit activity
app.put("/api/activities/:id", (req, res) => {
  const idx = activities.findIndex(a => a.id === req.params.id)
  if (idx === -1) return res.status(404).send("Not found")
  activities[idx] = { ...activities[idx], ...req.body }
  res.json(activities[idx])
})

// Delete activity
app.delete("/api/activities/:id", (req, res) => {
  activities = activities.filter(a => a.id !== req.params.id)
  res.sendStatus(204)
})

app.listen(4000, () => console.log("API running on http://localhost:4000"))