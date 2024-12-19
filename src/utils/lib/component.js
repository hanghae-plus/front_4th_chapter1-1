export class Component {
  constructor() {
    this.router = null;
  }

  setHTMLContent(html) {
    document.getElementById("root").innerHTML = html;
  }

  setRouter(router) {
    this.router = router;
  }
}
