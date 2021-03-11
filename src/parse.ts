function isHeaderLine(line: string): boolean {
  return line.match(/^#{1,2}[^#]/) !== null;
}

export default function parse(md: string): string[] {
  const result: string[] = [];

  let buf: string = "";

  const lines = md.trim().split(/\n/);

  lines.forEach((line) => {
    if (buf.length > 0 && isHeaderLine(line)) {
      result.push(buf);
      buf = "";
    }
    buf += line + "\n";
  });

  if (buf.length > 0) {
    result.push(buf);
  }

  return result;
}
