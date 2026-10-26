// A deliberately small Markdown subset for tutorials. Everything is escaped before
// formatting is applied, so the output is safe to inject as HTML.

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const inline = (s: string) =>
  escapeHtml(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');

export function renderMarkdown(src: string): string {
  const out: string[] = [];
  const lines = src.split('\n');
  let list: string[] | null = null;
  let para: string[] = [];
  const flushPara = () => {
    if (para.length) out.push('<p>' + inline(para.join(' ')) + '</p>');
    para = [];
  };
  const flush = () => {
    flushPara();
    if (list) out.push('<ul>' + list.join('') + '</ul>');
    list = null;
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('```')) {
      flush();
      const code: string[] = [];
      while (++i < lines.length && !lines[i].startsWith('```')) code.push(lines[i]);
      out.push('<pre><code>' + escapeHtml(code.join('\n')) + '</code></pre>');
    } else if (!line.trim()) flush();
    else if (line.startsWith('## ')) {
      flush();
      out.push('<h3>' + inline(line.slice(3)) + '</h3>');
    } else if (line.startsWith('### ')) {
      flush();
      out.push('<h4>' + inline(line.slice(4)) + '</h4>');
    } else if (line.startsWith('> ')) {
      flush();
      out.push('<blockquote>' + inline(line.slice(2)) + '</blockquote>');
    } else if (line.startsWith('- ')) {
      flushPara();
      (list ??= []).push('<li>' + inline(line.slice(2)) + '</li>');
    } else {
      if (list) flush();
      para.push(line);
    }
  }
  flush();
  return out.join('');
}
