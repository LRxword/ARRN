document.getElementById('runScriptButton').addEventListener('click', function() {
    var textString = document.getElementById('xmlInput').value;
    textString = textString.replace(/LBody/gm, '_3_Story_text');
    textString = textString.replace(/^(.*Story_Heading.*)$/gm, '@$1');
    textString = textString.replace(/^(.*Story_Author.*)$/gm, '@$1');
    textString = textString.replace(/^(.*Story_text.*)$/gm, '@$1');
    textString = textString.replace(/^(.*Sub_Heading.*)$/gm, '@$1');
    textString = textString.replace(/blue/gm, 'green');
    textString = textString.replace(/_1_Story_Heading/gm, 'h1');
    textString = textString.replace(/_3_Story_text/gm, 'p');
    textString = textString.replace(/<_5_Sub_Heading>/gm, '<p><b>');
    textString = textString.replace(/<\/_5_Sub_Heading>/gm, '</b></p>');
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
    textString = textString.replace(/<\/p>\n<h1>/gm, '</p>\n    </article>\n    <article>\n<h1>');
    textString = textString.replace(/<p>/gm, '     <p>');
    textString = textString.replace(/<h1>/gm, '     <div class="title"><h1>');
    textString = textString.replace(/<\/h1>/gm, '</h1></div>');
    
    const htmlHeaderContent = `
<!DOCTYPE html>
<html>
  <head>
    <title>Lord Howe Island</title>
  </head>
  <body>
    <article>`;
    textString = htmlHeaderContent + textString;
    
    const htmlFooterContent = `
    </article>
  </body>
</html>`;

    textString += htmlFooterContent;    

    document.getElementById('xmlOutput').value = textString;
});
