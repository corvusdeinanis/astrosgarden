---<%* 
let url = await tp.system.clipboard()
let page = await tp.obsidian.request({url})
let p = new DOMParser()
let doc = p.parseFromString(page, "text/html")
let $ = s => doc.querySelector(s) 
let $A = s => doc.querySelectorAll(s)
%>
title: "<% $("h1[id='bookTitle']").innerHTML.trim() %>"
authors: [<%* let authors = $A("span[itemprop=name]")
var keys = Array.from(authors, authors => authors.textContent)
tR += keys.join(', ') %>]
isbn: <% $("meta[property='books:isbn']").content %>
genres: [<%* let genres = $A("a[class='actionLinkLite bookPageGenreLink']")
var keys = Array.from(genres, genres => genres.textContent.toLowerCase())
tR += keys.join(', ') %>]
cover: "<% $("img[id='coverImage']").src %>"
%>---