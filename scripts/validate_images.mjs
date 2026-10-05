import fs from "fs";

const data = JSON.parse(fs.readFileSync("src/data/ascendra_dataset.json", "utf-8"));
const urls = [];

function findUrls(obj) {
  if (!obj) return;
  if (typeof obj === "string" && obj.includes("images.unsplash.com")) {
    urls.push(obj);
  } else if (Array.isArray(obj)) {
    obj.forEach(findUrls);
  } else if (typeof obj === "object") {
    Object.values(obj).forEach(findUrls);
  }
}
findUrls(data);
console.log("Total image URLs:", urls.length);

async function checkAll() {
  const broken = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (!res.ok) {
        broken.push({ url, status: res.status });
        console.log(`BROKEN [${res.status}]: ${url}`);
      }
    } catch (e) {
      broken.push({ url, error: e.message });
      console.log(`ERROR: ${url} - ${e.message}`);
    }
  }
  console.log("Broken count:", broken.length);
}

checkAll();
