const languages = ['ar', 'fr', 'en'];
export default (type, options) => {
  const toReturn = {};
  languages.forEach((lang) => {
    toReturn[lang] = Object.assign({
      type
    }, options);
  });
  return toReturn;
};
