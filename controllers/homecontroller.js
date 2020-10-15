const { json } = require("body-parser");
const express = require("express");
const fetch = require("node-fetch");

router = express();

const genQR = (data) => {
  var url = new URL("https://api.qrserver.com/v1/create-qr-code/");
  url.searchParams.set("size", "50x50");
  url.searchParams.set("data", data);
  return url;
};

router.get("/", (req, res) => {
  res.render("index", { data: false });
});

router.get("/user", (req, res) => {
  if (req.query.username) {
    // var username = req.query.username;
    // var url = `https://api.github.com/users/${username}`;
    // fetch(url)
    // .then((res) => res.json())
    // .then((data) => {
    // console.log(data);
    data = {
      login: "nirjal",
      id: 5468053,
      node_id: "MDQ6VXNlcjU0NjgwNTM=",
      avatar_url: "https://avatars3.githubusercontent.com/u/5468053?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/nirjal",
      html_url: "https://github.com/nirjal",
      followers_url: "https://api.github.com/users/nirjal/followers",
      following_url:
        "https://api.github.com/users/nirjal/following{/other_user}",
      gists_url: "https://api.github.com/users/nirjal/gists{/gist_id}",
      starred_url: "https://api.github.com/users/nirjal/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/nirjal/subscriptions",
      organizations_url: "https://api.github.com/users/nirjal/orgs",
      repos_url: "https://api.github.com/users/nirjal/repos",
      events_url: "https://api.github.com/users/nirjal/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/nirjal/received_events",
      type: "User",
      site_admin: false,
      name: "Nirjal Khadka",
      company: "Dynabyte AB",
      blog: "",
      location: "Stockholm Sweden",
      email: null,
      hireable: null,
      bio: null,
      twitter_username: null,
      public_repos: 6,
      public_gists: 0,
      followers: 0,
      following: 0,
      created_at: "2013-09-16T08:27:05Z",
      updated_at: "2020-02-27T13:33:52Z",
    };
    res.render("user", { data: data, qr: genQR(data.html_url) });
    // });
  } else {
    res.send("Please provide username as user in GET parameters");
  }
});

module.exports = router;
