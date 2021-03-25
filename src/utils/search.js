export const articleSearch = (articleArr, catId, char = "") => {
  let thisPageArticles;
  if (catId > 0) {
    thisPageArticles = [...articleArr].filter(
      (a) =>
        a.category_id == catId &&
        (a.h_title.includes(char) || a.top_title.includes(char))
    );
  } else {
    thisPageArticles = [...articleArr].filter(
      (a) =>
        a.h_title.includes(char) ||
        a.top_title.includes(char) ||
        a.keywords.includes(char)
    );
  }
  return thisPageArticles;
};
