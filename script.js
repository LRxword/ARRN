<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Super XML Magic Tool</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f9;
        color: #333;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    textarea {
        width: 90%;
        height: 300px;
        margin: 10px;
        display: block;
        padding: 10px;
        border-radius: 8px;
        border: 2px solid #005A9C;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .controls {
        width: 90%;
        margin: 10px auto;
        display: flex;
        justify-content: space-around; /* Distributes space evenly around items */
        align-items: center; /* Aligns items vertically */
    }
    select, input[type="date"], input[type="time"], button {
        padding: 8px 16px;
        font-size: 14px;
        border-radius: 8px;
        border: 2px solid #005A9C;
        background-color: #ffffff;
    }
    button {
        background-color: #007BFF;
        color: #ffffff;
        cursor: pointer;
        display: inline-block;
    }
    button:hover {
        background-color: #0056b3;
    }
    h3 {
        text-align: center;
        color: #005A9C;
    }
</style>
</head>
<body>
    <textarea id="xmlInput" placeholder="Paste your XML here..."></textarea>
    <select id="scriptSelector">
        <option value="script1">Lord Howe</option>
        <option value="script2">Clarence Valley</option>
        <option value="script3">Dunoon Gazette</option>
    </select>
    </br>
    <input type="date" id="publishDate" placeholder="Select publish date">
    </br>
    <input type="time" id="publishTime" placeholder="Select publish time">
    </br>
    <button id="runScriptButton">Run Script</button>
    <h3>Output:</h3>
    <textarea id="xmlOutput" readonly></textarea>

    <script>
        document.getElementById('runScriptButton').addEventListener('click', function() {
            var scriptType = document.getElementById('scriptSelector').value;
            var publishDate = document.getElementById('publishDate').value;
            var publishTime = document.getElementById('publishTime').value;
            var textString = document.getElementById('xmlInput').value;

            // Prepend publish date and time to the output
            const dateTimeString = "Publish Date: " + publishDate + " at " + publishTime + "\n";
            textString = dateTimeString + textString;

            // Depending on the script selected, modify the text
            switch(scriptType) {
                case 'script1':
                     // Apply Script 1 modifications
 textString = textString.replace(/LBody/gm, '_3_Story_text');
    textString = textString.replace(/<Figure>[\s\S]*?<\/Figure>\n*/gi, '');
    textString = textString.replace(/<_3_Story_text><\/_3_Story_text>\n/gi, '');
    textString = textString.replace(/<_1_Story_Heading><\/_1_Story_Heading>\n/gi, '');
    textString = textString.replace(/^(.*Story_Heading.*)$/gm, '@$1');
    textString = textString.replace(/^(.*Story_Author.*)$/gm, '@$1');
    textString = textString.replace(/^(.*Story_text.*)$/gm, '@$1');
    textString = textString.replace(/^(.*Sub_Heading.*)$/gm, '@$1');
    textString = textString.replace(/blue/gm, 'green');
    textString = textString.replace(/_1_Story_Heading/gm, 'h1');
    textString = textString.replace(/Author>By /gm, 'Author>');
    textString = textString.replace(/_3_Story_text/gm, 'p');
    textString = textString.replace(/<_5_Sub_Heading>/gm, '<p><b>');
    textString = textString.replace(/<\/_5_Sub_Heading>/gm, '</b></p>');
    textString = textString.replace(/<_2_Story_Author>/gm, '<div class="author"><p><b>');
    textString = textString.replace(/<\/_2_Story_Author>/gm, '</b></p></div>');
    
    textString = textString.split('\n').filter(line => 
        !line.includes('<Figure>') && line.startsWith('@')
    ).join('\n');

    textString = textString.replace(/^@(.)/gm, '$1');
    textString = textString.replace(/\n([^<])/gm, '$1');
    textString = textString.replace(/^\s*<\/p>\s*$\n/gm, '');
    textString = textString.replace(/^\s*<p\/>\s*$\n/gm, '');
    textString = textString.replace(/^\s*<p>\s*$\n/gm, '');
    textString = textString.replace(/^\s*<\/h1>\s*$\n/gm, '');
    textString = textString.replace(/^\s*<h1\/>\s*$\n/gm, '');
    textString = textString.replace(/^\s*<h1>\s*$\n/gm, '');
    textString = textString.replace(/<h1>.*\n(<h1>)/g, '$1');
    textString = textString.replace(/(<div.+)\n(<h1.+)/g, '$2\n$1');
    textString = textString.replace(/<\/p>\n<h1>/gm, '</p>\n    </div>\n     </article>\n    <article>\n<h1>');
    textString = textString.replace(/^<p>/gm, '     <p>');
    textString = textString.replace(/^<h1>/gm, '     <div class="title">\n<h1>');
    textString = textString.replace(/<\/h1>/gm, '</h1>\n      </div>\n<div class="author"><p><b>Stephen Sia, The Lord Howe Island Signal</b></p></div>');
    textString = textString.replace(/(<div class="author".+)\n(<div class="author".+)/g, '$2');
    textString = textString.replace(/(<article>).+(<div)/g, '$1\n      ($2)');
    textString = textString.replace(/^<h1>/gm, '       <h1>');
    textString = textString.replace(/^<div class="author"/gm, '      <div class="author"');
    textString = textString.replace(/><\/div>/gm, '>\n      </div>');
    textString = textString.replace(/<div class="author">/gm, '<div class="author">\n      ');
    textString = textString.replace(/(<div class="author".+\n.+\n.+)/g, `$1\n      <div class="publish-date">\n      <p>Published on ${publishDate} ${publishTime}</p>\n      </div>\n      <div class="article-content">`);

    
    const htmlHeaderContent = `
<!DOCTYPE html>
<html>
  <head>
    <title>Lord Howe Island</title>
  </head>
  <body>
    <article>\n`;
    textString = htmlHeaderContent + textString;
    
    const htmlFooterContent = `
    </article>
  </body>
</html>`;

    textString += htmlFooterContent;
                    break;
                case 'script2':
                    // Modifications for script 2
                    textString = modifyTextForScript2(textString);
                    break;
                case 'script3':
                    // Modifications for script 3
                    textString = modifyTextForScript3(textString);
                    break;
            }

            document.getElementById('xmlOutput').value = textString;
        });

        function modifyTextForScript1(text) {
            // Implement modifications specific to script 1
            return text.replace(/example/g, 'replacement');
        }

        function modifyTextForScript2(text) {
            // Implement modifications specific to script 2
            return text.replace(/example/g, 'replacement');
        }

        function modifyTextForScript3(text) {
            // Implement modifications specific to script 3
            return text.replace(/example/g, 'replacement');
        }
    </script>
</body>
</html>
