const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("This is fetchData");
      resolve("addsada");
    }, 1000);
  });
  return promise;
};

setTimeout(() => {
  console.log("this is setTimeout");
  fetchData
    .then((text) => {
      console.log(text);
      return fetchData();
    })
    .then((newText) => console.log("newText", newText));
}, 1000);

console.log("Hello!");
console.log("Hi");
