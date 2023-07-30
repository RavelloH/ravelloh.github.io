importScripts('../lib/highlight.min.js');
function HTMLDecode(str) {
    var s = '';
    if (str.length == 0) return '';
    s = str.replace(/&amp;/g, '&');
    s = s.replace(/&lt;/g, '<');
    s = s.replace(/&gt;/g, '>');
    s = s.replace(/&nbsp;/g, ' ');
    s = s.replace(/&#39;/g, "'");
    s = s.replace(/&quot;/g, '"');
    s = s.replace(/<br\/>/g, '\n');
    return s;
}

onmessage = (event) => {
    if (/<span(([\s\S])*?)<\/span>/.test(event.data)) {
        var originCode = HTMLDecode(event.data)
            .split('\n')
            .map((e) => ['', ...e.split('')].reduce((p, n) => (!p && n === ' ' ? '' : p + n)))
            .map((e) => e.slice(6, -7))
            .join('\n');
        var result = self.hljs.highlightAuto(originCode);
        var processedCode = result.value
            .split('\n')
            .map((e) => '<span>' + e + '</span>')
            .join('\n');
        postMessage(processedCode.substring(0, processedCode.length - 13));
    } else {
        var result = self.hljs.highlightAuto(event.data);
        postMessage(HTMLDecode(result.value));
    }
};
