<%*
const editor = this.app.workspace.activeLeaf?.view?.editor;
if(!editor) return;

const linecount = editor.lineCount();
const titles = [];
let titleNext = true
for(i=0;i<linecount;i++) {
  const line = editor.getLine(i);
  if(line.startsWith(`==========`)) {
    titleNext = true;
  } else if(titleNext) {
    titleNext = false;
    if(!titles.includes(line)) {
      titles.push(line);
    }
  }
}

const title = await tp.system.suggester(titles, titles,false,"Select book from list");

const output = [];
let page = 0;
let includeLine = false;
let row = 0;
let data = ``;
titleNext = true;
for(i=0;i<linecount;i++) {
  const line = editor.getLine(i).trim();
  if(line.startsWith(`==========`)) {
    if (includeLine) output.push([page,data]);
    titleNext = true;
    includeLine = false;
  } else if(titleNext) {
    titleNext = false;
    includeLine = (line === title);
    row = 0;
  }
  if (includeLine && row === 1) {
    const p = line.match(/(\d+)/);
	page = p ? parseInt(p[0]) : -1;
	data = line.startsWith("- Your Note")?`> [!note]`:``;
  }
  if (includeLine && row > 1 && line !== "" && line !== "\n") {
  	if (line.match(/^\d+\.\d+\.\d+./)) {
      data = `#### ${line}`;
	} else if (line.match(/^\d+\.\d+./)) {
      data = `### ${line}`;
	} else if (line.match(/^\d+./)) {
      data = `## ${line}`;
	} else {
      data += `\n> ${line}`;
    }
  }
  row++;
}

window.navigator.clipboard.writeText(
  "# "+title+"\n\n" +
  output
    .sort((a,b)=>a[0]>b[0]?1:-1)
    .map(x =>x[1].startsWith(`##`) ? `${x[1]}\n` : `${x[1]} ^${x[0]}\n`)
    .join("\n") +
 "\n"
);
new Notice ("Extracted kindle highlights are available on the clipboard.",4000);
%>