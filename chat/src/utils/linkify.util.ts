import linkifyStr from "linkify-string";

export class LinkifyUtil {
  public static linkifyMessage(str: string): string {
    return linkifyStr(str, {
      render: ({ tagName, attributes, content }) => {
        return `<a class="font-weight-bold font-italic " target="_blank" href="${attributes.href}">Ссылка</a>`;
      },
    })
  }
}
