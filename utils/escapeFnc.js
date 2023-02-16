const escapeFnc = function(strArr) {
  const res = strArr.map((str) => {

    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  });
  return res;
};

module.exports = escapeFnc;
