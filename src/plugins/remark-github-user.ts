import { visit } from "unist-util-visit";
import type { Root, Text, Parent } from "mdast";

export default function remarkGithubUser() {
  return (tree: Root) => {
    visit(tree, "text", (node: Text, index, parent: Parent | undefined) => {
      if (index === undefined || !parent) return;

      const regex = /@github\(([a-zA-Z0-9-]+)\)/g;

      if (!regex.test(node.value)) return;

      const parts: (Text | { type: "html"; value: string })[] = [];
      let last = 0;

      node.value.replace(regex, (match, username: string, offset: number) => {
        if (offset > last) {
          parts.push({
            type: "text",
            value: node.value.slice(last, offset),
          });
        }

        parts.push({
          type: "html",
          value: `<span class="github-user-chip">
              <span class="inner">
                <img src="https://github.com/${username}.png" alt="" />
                <span>${username}</span>
                <a href="https://github.com/${username}" target="_blank" rel="noopener noreferrer"></a>
              </span>
            </span>`,
        });

        last = offset + match.length;
        return match;
      });

      if (last < node.value.length) {
        parts.push({
          type: "text",
          value: node.value.slice(last),
        });
      }

      parent.children.splice(index, 1, ...parts);
    });
  };
}