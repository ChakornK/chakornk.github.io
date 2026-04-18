const generateGraph = (_data?: string) => {
  const data = _data || Array.from({ length: 7 }, () => Array.from({ length: 53 }, () => "0").join("")).join("\n");
  const cellSpacing = 3;
  const cellWidth = 10;
  const cellHeight = 10;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 686 91">
<style>
.t {
  fill: #003943;
  width: ${cellWidth}px; 
  height: ${cellHeight}px; 
  rx: 2px;
}
.a { fill: #d4d4cf33; }
.b { opacity: 0.25; }
.c { opacity: 0.5; }
.d { opacity: 0.75; }
.e { opacity: 1; }
</style>`;

  let x = 0;
  let y = 0;

  for (const row of data.split("\n")) {
    x = 0;
    for (const tile of row.split("")) {
      svg += `<rect class="t ${["a", "b", "c", "d", "e"][+tile]}" x="${x}" y="${y}" />`;
      x += cellWidth + cellSpacing;
    }
    y += cellHeight + cellSpacing;
  }
  svg += "</svg>";

  return svg;
};

let cache = "";
const renderGraph = () => {
  const container = document.getElementById("git-contributions");
  const label = document.getElementById("git-contributions-label");
  if (container && label) {
    container.innerHTML = generateGraph();
    const appendToDom = (data: string) => {
      const lns = data.split("\n");
      label.innerHTML = `${lns[0]} contributions in the last year`;
      container.innerHTML = generateGraph(lns.slice(1).join("\n"));
    };

    if (cache !== "") {
      appendToDom(cache);
      return;
    }
    fetch("https://chakornk.github.io/contrib-graph/graph.txt")
      .then((res) => res.text())
      .then((data) => {
        cache = data;
        appendToDom(data);
      });
  }
};
document.addEventListener("nav:page-load", renderGraph);
renderGraph();
