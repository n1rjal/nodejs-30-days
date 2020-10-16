//lets parse the data
var canvas = document.getElementById("poster");
var ctx = canvas.getContext("2d");

const data = {
  login: "n1rjal",
  id: 60036262,
  node_id: "MDQ6VXNlcjYwMDM2MjYy",
  avatar_url: "https://avatars2.githubusercontent.com/u/60036262?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/n1rjal",
  html_url: "https://github.com/n1rjal",
  followers_url: "https://api.github.com/users/n1rjal/followers",
  following_url: "https://api.github.com/users/n1rjal/following{/other_user}",
  gists_url: "https://api.github.com/users/n1rjal/gists{/gist_id}",
  starred_url: "https://api.github.com/users/n1rjal/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/n1rjal/subscriptions",
  organizations_url: "https://api.github.com/users/n1rjal/orgs",
  repos_url: "https://api.github.com/users/n1rjal/repos",
  events_url: "https://api.github.com/users/n1rjal/events{/privacy}",
  received_events_url: "https://api.github.com/users/n1rjal/received_events",
  type: "User",
  site_admin: false,
  name: "Nirjal Paudel",
  company: null,
  blog: "http://nirjal.herokuapp.com",
  location: "Nepal",
  email: null,
  hireable: true,
  bio:
    "Nirjal Paudel wants to be a freelancer  Fullstack Developer later in his life.",
  twitter_username: null,
  public_repos: 42,
  public_gists: 0,
  followers: 21,
  following: 27,
  created_at: "2020-01-18T13:07:44Z",
  updated_at: "2020-10-14T12:10:13Z",
};

canvas.width = 1200;
canvas.height = 450;

const genQR = (data) => {
  var url = new URL("https://api.qrserver.com/v1/create-qr-code/");
  url.searchParams.set("size", "50x50");
  url.searchParams.set("data", data);
  return url;
};

const drawImage = (imgUrl, height, width, positionObj = {}) => {
  var avatar = new Image();
  avatar.src = imgUrl;
  console.log(positionObj);
  if (Object.keys(positionObj).length === 0) {
    avatar.onload = () => {
      console.log("data not provided");
      ctx.drawImage(avatar, 5, 5, height, width);
    };
  } else {
    avatar.onload = () => {
      ctx.drawImage(avatar, positionObj.posX, positionObj.posY, height, width);
    };
  }
  console.log("Image Drawn");
};

const makeTitle = (text, x, y, color) => {
  // Title or the name
  ctx.fillStyle = color;
  ctx.font = "30px Commissioner bold";
  ctx.fillText(text.toUpperCase(), x, y, 200);
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect(x, y + 3, 40, 3);
  ctx.stroke();
};

const writeText = (text, x, y, color, quote = false) => {
  ctx.fillStyle = color;
  ctx.font = quote === false ? "14px sans-serif" : "italic 14px sans-serif";

  if (quote) {
    var quotedBio = text !== null ? '"' + text + '"' : "Not provided";
  } else {
    var quotedBio = text !== null ? text : "Not provided";
  }
  ctx.fillText(quotedBio, x, y);
  ctx.stroke();
};

const makeHR = (x, y, mx = 0, color = "#fff") => {
  ctx.fillStyle = color;
  ctx.fillRect(x + mx, y, canvas.width - x - 2 * mx, 2);
  ctx.stroke();
};

makeTitle(data.name, 180, 60, "#fef6eb");
writeText(data.bio, 180 + 10, 60 + 30, "#fef6eb", { quote: true });
writeText(`Site : ${data.blog}`, 220, 130, "white");
writeText(`Location : ${data.location}`, 520, 130, "white");
writeText(`Email : ${data.email}`, 720, 130, "white");

// lets draw his/her face
drawImage(data.avatar_url, 150, 150);

//QR code for users github url
qrPositionObj = {
  posX: canvas.width - 50,
  posY: 0,
};
qrCode = genQR(data.html_url);
drawImage(qrCode, 50, 50, qrPositionObj);

// lets make a line from image end to canvas end
makeHR(0, 155, 10, "white");
// Follower Following
writeText(`Public Repos : ${data.public_repos}`, 100, 180, "#fff");
writeText(`Following : ${data.following}`, 500, 180, "#fff");
writeText(`Followers : ${data.followers}`, 900, 180, "#fff");
makeHR(0, 195, 10, "white");
