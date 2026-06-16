// //string to slug

// const slugify = (text) => {
//   return text
//     .normalize("NFD")
//     .replace((/[\u0300-\u036f]/g, ""))
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+ /g, "-");
// };

// const result = slugify("alkdfj lkdjf23 23 &(*");
// console.log(result);

const slugify = (text) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Fixed: Removed extra parentheses
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-"); // Fixed: Removed the accidental space
};

const result = slugify("alkdfj      ----lkdjf23 23 &(*");
console.log(result); // Output: "alkdfj-lkdjf23-23"
