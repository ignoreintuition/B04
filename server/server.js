const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const { expressjwt: exjwt } = require("express-jwt");

const app = express();
const port = 3000;
const secretKey = "secret key";

const users = [
  { id: 1, username: "fabio", password: "123" },
  { id: 2, username: "brian", password: "456" },
];

const data = [
  {
    title: `Campus Squirrel Elected Student Body President in Landslide Victory`,
    body: `In a shocking turn of events, Nutters the Squirrel has been elected as the new Student Body President after an aggressive campaign involving free acorns and spontaneous tree-climbing performances. Opposing candidates are still recovering from the embarrassment, while Nutters’ approval rating soars. His first order of business? “More trees, less tuition.”`,
  },
  {
    title: `Cafeteria Introduces ‘Mystery Meat Monday,’ Students Bravely Taste the Unknown`,
    body: `The dining hall has launched “Mystery Meat Monday,” a culinary adventure for the brave-hearted. No one knows what the meat is—faculty included. Sophomore Jess R. reported, “It tasted like chicken, beef, and existential dread all at once.” Campus doctors are on standby with Pepto and emotional support plushies.`,
  },
  {
    title: `Student Accidentally Declares War on Canada After Misclick in International Relations Simulation`,
    body: `While playing a diplomacy simulation for class, junior Zach K. meant to send a trade proposal to Canada but accidentally triggered a "military incursion." The Canadian embassy has since responded with a strongly worded email and a maple syrup gift basket. Zach has been banned from simulations and now majors in Art History.`,
  },
  {
    title: `Philosophy Department Still Debating If Final Exam Truly Exists`,
    body: `With finals week approaching, the Philosophy Department remains undecided on whether the final exam is a tangible reality or a construct of the academic-industrial complex. “If a test falls in the woods and no one studies for it, does it still fail you?” pondered Professor Zelton as students slowly backed out of the room.`,
  },
  {
    title: `Local Student Discovers Secret 13th Floor in Library—Finds Ancient Copy of Freshman Year Without Regret`,
    body: `Reports have surfaced of a hidden 13th floor in the library only accessible during full moons and high stress. Senior Linda A. claims she found a dusty scroll titled "How to Avoid Freshman Mistakes". She attempted to take it, but the floor disappeared. “Honestly, I still would’ve dated that guy,” she admitted.`,
  },
];

const jwtMW = exjwt({
  secret: secretKey,
  algorithms: ["HS256"],
});

__dirname = path.resolve();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
  next();
  return;
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
    inflate: true,
    limit: "1mb",
    parameterLimit: 5000,
    type: "application/x-www-form-urlencoded",
  }),
);

app.listen(port, () => {
  console.log(`Example port listening on http://localhost:${port}`);
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  for (let user of users) {
    if (username == user.username && password == user.password) {
      let token = jwt.sign(
        { id: user.id, username: user.username },
        secretKey,
        { expiresIn: "180000" },
      );
      res.json({
        success: true,
        err: null,
        token,
      });
      break;
    }
  }
  res.status(401).json({
    success: false,
    token: null,
    err: "incorrect username or password",
  });
});

app.use(function (err, req, res, next) {
  if (err.name === "Unauthorized") {
    res.status(401).json({
      success: false,
      err,
    });
  } else {
    next(err);
  }
});

app.get("/api/", jwtMW, (req, res) => {
  res.json({
    success: true,
    data: data,
  });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
