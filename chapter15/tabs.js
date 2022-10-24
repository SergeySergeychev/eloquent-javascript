// Solution by Marijn Haverbeke
function asTabs(node) {
  const tabs = Array.from(node.children).map((node) => {
    const button = document.createElement("button");
    button.textContent = node.getAttribute("data-tabname");
    let tab = { node, button };
    button.addEventListener("click", () => selectTab(tab));
    return tab;
  });
  let tablist = document.createElement("div");
  for (let { button } of tabs) tablist.appendChild(button);
  node.insertBefore(tablist, node.firstChild);

  function selectTab(selectedTab) {
    for (let tab of tabs) {
      let selected = tab == selectedTab;
      tab.node.style.display = selected ? "" : "none";
      tab.button.style.color = selected ? "red" : "";
    }
  }
}

asTabs(document.querySelector("tab-panel"));
